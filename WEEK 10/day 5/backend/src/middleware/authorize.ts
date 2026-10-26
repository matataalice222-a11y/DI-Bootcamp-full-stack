import type { NextFunction, Request, Response } from 'express';
import { canEditStory } from '../models/storyModel.js';
import { pool } from '../db/pool.js';

export async function authorizeStoryEditor(request: Request, response: Response, next: NextFunction) {
  try {
    const storyId = Number(request.params.storyId ?? request.params.id);
    if (!Number.isInteger(storyId) || storyId < 1) {
      response.status(400).json({ message: 'A valid story ID is required.' });
      return;
    }

    if (!await canEditStory(pool, storyId, request.user!.id)) {
      response.status(403).json({ message: 'Only the author or a contributor can edit this story.' });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
}

export async function authorizeStoryAuthor(request: Request, response: Response, next: NextFunction) {
  try {
    const storyId = Number(request.params.storyId ?? request.params.id ?? request.body?.storyId ?? request.body?.story_id);
    if (!Number.isInteger(storyId) || storyId < 1) {
      response.status(400).json({ message: 'A valid story ID is required.' });
      return;
    }

    const result = await pool.query('SELECT author_id FROM stories WHERE id = $1', [storyId]);
    if (result.rowCount === 0) {
      response.status(404).json({ message: 'Story not found.' });
      return;
    }
    if (result.rows[0].author_id !== request.user!.id) {
      response.status(403).json({ message: 'Only the story author can perform this action.' });
      return;
    }
    request.storyId = storyId;
    next();
  } catch (error) {
    next(error);
  }
}

export async function authorizeContributorRemoval(request: Request, response: Response, next: NextFunction) {
  try {
    const contributorId = Number(request.params.id);
    if (!Number.isInteger(contributorId) || contributorId < 1) {
      response.status(400).json({ message: 'A valid contributor ID is required.' });
      return;
    }

    const result = await pool.query<{ story_id: number; author_id: number }>(
      `SELECT c.story_id, s.author_id
       FROM contributors c JOIN stories s ON s.id = c.story_id
       WHERE c.id = $1`,
      [contributorId],
    );
    const relation = result.rows[0];
    if (!relation) {
      response.status(404).json({ message: 'Contributor not found.' });
      return;
    }
    if (relation.author_id !== request.user!.id) {
      response.status(403).json({ message: 'Only the story author can remove contributors.' });
      return;
    }

    request.storyId = relation.story_id;
    next();
  } catch (error) {
    next(error);
  }
}