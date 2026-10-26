import type { Pool } from 'pg';
import type { Story, StoryComment, StoryContributor, StoryRevision } from '@story/types';

interface StoryRow {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_username: string;
  author_display_name: string;
  created_at: Date;
  updated_at: Date;
  contributors: StoryContributor[];
  comment_count: number;
}

const storySelect = `
  SELECT s.id, s.title, s.content, s.author_id,
    u.username AS author_username, u.display_name AS author_display_name,
    s.created_at, s.updated_at,
    COALESCE((
      SELECT json_agg(json_build_object(
        'id', contributor_link.id,
        'userId', contributor.id,
        'username', contributor.username,
        'displayName', contributor.display_name
      ) ORDER BY contributor.username)
      FROM contributors contributor_link JOIN users contributor ON contributor.id = contributor_link.user_id
      WHERE contributor_link.story_id = s.id
    ), '[]'::json) AS contributors,
    (SELECT COUNT(*)::int FROM comments cm WHERE cm.story_id = s.id) AS comment_count
  FROM stories s JOIN users u ON u.id = s.author_id`;

function toStory(row: StoryRow): Story {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    authorId: row.author_id,
    authorUsername: row.author_username,
    authorDisplayName: row.author_display_name,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
    contributors: row.contributors ?? [],
    commentCount: row.comment_count,
  };
}

export async function getStories(pool: Pool, userId: number, ownOnly: boolean): Promise<Story[]> {
  const result = ownOnly
    ? await pool.query<StoryRow>(
      `${storySelect} WHERE s.author_id = $1 OR EXISTS (
        SELECT 1 FROM contributors c WHERE c.story_id = s.id AND c.user_id = $1
      ) ORDER BY s.updated_at DESC`,
      [userId],
    )
    : await pool.query<StoryRow>(`${storySelect} ORDER BY s.updated_at DESC`);
  return result.rows.map(toStory);
}

export async function createStory(pool: Pool, authorId: number, title: string, content: string): Promise<Story> {
  const client = await pool.connect();
  let storyId: number;
  try {
    await client.query('BEGIN');
    const result = await client.query<{ id: number }>(
      'INSERT INTO stories (title, content, author_id) VALUES ($1, $2, $3) RETURNING id',
      [title, content, authorId],
    );
    const created = result.rows[0];
    if (!created) throw new Error('Created story could not be loaded.');
    storyId = created.id;
    await client.query(
      'INSERT INTO story_revisions (story_id, title, content, editor_user_id) VALUES ($1, $2, $3, $4)',
      [storyId, title, content, authorId],
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
  const story = await getStory(pool, storyId);
  if (!story) throw new Error('Created story could not be loaded.');
  return story;
}

export async function getStory(pool: Pool, storyId: number): Promise<Story | undefined> {
  const result = await pool.query<StoryRow>(`${storySelect} WHERE s.id = $1`, [storyId]);
  return result.rows[0] ? toStory(result.rows[0]) : undefined;
}

export async function canEditStory(pool: Pool, storyId: number, userId: number): Promise<boolean> {
  const result = await pool.query(
    `SELECT 1 FROM stories s WHERE s.id = $1 AND (
      s.author_id = $2 OR EXISTS (
        SELECT 1 FROM contributors c WHERE c.story_id = s.id AND c.user_id = $2
      )
    )`,
    [storyId, userId],
  );
  return (result.rowCount ?? 0) > 0;
}

export async function updateStory(
  pool: Pool,
  storyId: number,
  input: { title?: string; content?: string },
  editorId: number,
): Promise<Story | undefined> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const current = await client.query<{ title: string; content: string }>(
      'SELECT title, content FROM stories WHERE id = $1 FOR UPDATE',
      [storyId],
    );
    const previous = current.rows[0];
    if (!previous) {
      await client.query('ROLLBACK');
      return undefined;
    }

    await client.query(
      'INSERT INTO story_revisions (story_id, title, content, editor_user_id) VALUES ($1, $2, $3, $4)',
      [storyId, previous.title, previous.content, editorId],
    );
    await client.query(
      `UPDATE stories SET title = $1, content = $2, updated_at = NOW() WHERE id = $3`,
      [input.title ?? previous.title, input.content ?? previous.content, storyId],
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
  return getStory(pool, storyId);
}

export async function getStoryRevisions(pool: Pool, storyId: number): Promise<StoryRevision[]> {
  const result = await pool.query<StoryRevision>(
    `SELECT r.id, r.story_id AS "storyId", r.title, r.content,
      r.editor_user_id AS "editorUserId", u.display_name AS "editorDisplayName",
      r.created_at AS "createdAt"
     FROM story_revisions r JOIN users u ON u.id = r.editor_user_id
     WHERE r.story_id = $1 ORDER BY r.created_at DESC, r.id DESC`,
    [storyId],
  );
  return result.rows.map((revision) => ({ ...revision, createdAt: new Date(revision.createdAt).toISOString() }));
}

export async function restoreStoryRevision(
  pool: Pool,
  storyId: number,
  revisionId: number,
  editorId: number,
): Promise<Story | undefined> {
  const result = await pool.query<{ title: string; content: string }>(
    'SELECT title, content FROM story_revisions WHERE id = $1 AND story_id = $2',
    [revisionId, storyId],
  );
  const revision = result.rows[0];
  if (!revision) return undefined;
  return updateStory(pool, storyId, revision, editorId);
}

export async function deleteStory(pool: Pool, storyId: number, authorId: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM stories WHERE id = $1 AND author_id = $2', [storyId, authorId]);
  return (result.rowCount ?? 0) > 0;
}

export async function listContributors(pool: Pool, storyId: number): Promise<StoryContributor[]> {
  const result = await pool.query<StoryContributor>(
    `SELECT c.id, u.id AS "userId", u.username, u.display_name AS "displayName"
     FROM contributors c JOIN users u ON u.id = c.user_id
     WHERE c.story_id = $1 ORDER BY u.username`,
    [storyId],
  );
  return result.rows;
}

export async function addContributor(pool: Pool, storyId: number, userId: number): Promise<StoryContributor | undefined> {
  const result = await pool.query<StoryContributor>(
    `INSERT INTO contributors (story_id, user_id) VALUES ($1, $2)
     ON CONFLICT (story_id, user_id) DO NOTHING
    RETURNING id, user_id AS "userId"`,
    [storyId, userId],
  );
  if (result.rows[0]) {
    const added = result.rows[0];
    const user = await pool.query<Omit<StoryContributor, 'userId'>>(
      'SELECT username, display_name AS "displayName" FROM users WHERE id = $1',
      [added.userId],
    );
    return { ...added, ...user.rows[0] };
  }
  const existing = await pool.query<StoryContributor>(
    `SELECT c.id, u.id AS "userId", u.username, u.display_name AS "displayName"
     FROM contributors c JOIN users u ON u.id = c.user_id
     WHERE c.story_id = $1 AND c.user_id = $2`,
    [storyId, userId],
  );
  return existing.rows[0];
}

export async function removeContributor(pool: Pool, contributorId: number, storyId: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM contributors WHERE id = $1 AND story_id = $2', [contributorId, storyId]);
  return (result.rowCount ?? 0) > 0;
}

export async function listComments(pool: Pool, storyId: number): Promise<StoryComment[]> {
  const result = await pool.query<StoryComment>(
    `SELECT cm.id, cm.story_id AS "storyId", cm.user_id AS "userId",
      u.username, u.display_name AS "displayName", cm.content, cm.created_at AS "createdAt"
     FROM comments cm JOIN users u ON u.id = cm.user_id
     WHERE cm.story_id = $1 ORDER BY cm.created_at ASC`,
    [storyId],
  );
  return result.rows.map((comment) => ({ ...comment, createdAt: new Date(comment.createdAt).toISOString() }));
}

export async function addComment(pool: Pool, storyId: number, userId: number, content: string): Promise<StoryComment> {
  const result = await pool.query<StoryComment>(
    `INSERT INTO comments (story_id, user_id, content) VALUES ($1, $2, $3)
     RETURNING id, story_id AS "storyId", user_id AS "userId", content, created_at AS "createdAt"`,
    [storyId, userId, content],
  );
  const comment = result.rows[0];
  const user = await pool.query<{ username: string; displayName: string }>(
    'SELECT username, display_name AS "displayName" FROM users WHERE id = $1',
    [userId],
  );
  const commentRecord = result.rows[0];
  const userRecord = user.rows[0];
  if (!commentRecord || !userRecord) throw new Error('Created comment could not be loaded.');
  return { ...commentRecord, ...userRecord, createdAt: new Date(commentRecord.createdAt).toISOString() };
}

export async function deleteComment(pool: Pool, commentId: number, userId: number): Promise<number | undefined> {
  const result = await pool.query<{ story_id: number }>(
    `DELETE FROM comments cm USING stories s
     WHERE cm.id = $1 AND cm.story_id = s.id AND (cm.user_id = $2 OR s.author_id = $2)
     RETURNING cm.story_id`,
    [commentId, userId],
  );
  return result.rows[0]?.story_id;
}