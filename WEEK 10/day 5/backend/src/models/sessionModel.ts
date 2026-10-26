import { randomUUID } from 'node:crypto';
import type { Pool } from 'pg';

export interface RefreshSession {
  id: string;
  user_id: number;
  token_hash: string;
  expires_at: Date;
  revoked_at: Date | null;
}

export async function createRefreshSession(
  pool: Pool,
  userId: number,
  tokenHash: string,
  expiresAt: Date,
): Promise<string> {
  const id = randomUUID();
  await pool.query(
    'INSERT INTO refresh_sessions (id, user_id, token_hash, expires_at) VALUES ($1, $2, $3, $4)',
    [id, userId, tokenHash, expiresAt],
  );
  return id;
}

export async function rotateRefreshSession(
  pool: Pool,
  input: { id: string; userId: number; tokenHash: string; nextTokenHash: string; expiresAt: Date },
): Promise<boolean> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query<RefreshSession>(
      'SELECT * FROM refresh_sessions WHERE id = $1 AND user_id = $2 FOR UPDATE',
      [input.id, input.userId],
    );
    const session = result.rows[0];
    if (!session || session.revoked_at || new Date(session.expires_at).getTime() <= Date.now()) {
      await client.query('ROLLBACK');
      return false;
    }

    if (session.token_hash !== input.tokenHash) {
      await client.query('UPDATE refresh_sessions SET revoked_at = NOW() WHERE id = $1', [input.id]);
      await client.query('COMMIT');
      return false;
    }

    await client.query(
      `UPDATE refresh_sessions SET token_hash = $1, expires_at = $2
       WHERE id = $3 AND revoked_at IS NULL`,
      [input.nextTokenHash, input.expiresAt, input.id],
    );
    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function revokeRefreshSession(pool: Pool, id: string, userId: number): Promise<void> {
  await pool.query(
    'UPDATE refresh_sessions SET revoked_at = NOW() WHERE id = $1 AND user_id = $2 AND revoked_at IS NULL',
    [id, userId],
  );
}

export async function revokeAllUserSessions(pool: Pool, userId: number): Promise<void> {
  await pool.query(
    'UPDATE refresh_sessions SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL',
    [userId],
  );
}