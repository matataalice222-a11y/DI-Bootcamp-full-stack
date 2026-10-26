import type { NextFunction, Request, Response } from 'express';
import type { Pool } from 'pg';
import type { Server } from 'socket.io';
import { commentSchema, contributorSchema, storyPatchSchema, storySchema } from '../helpers/validation.js';
import { findUserIdByEmail } from '../models/userModel.js';
import {
  addComment,
  addContributor,
  createStory,
  deleteComment,
  deleteStory,
  getStories,
  getStory,
  getStoryRevisions,
  listComments,
  listContributors,
  removeContributor,
  restoreStoryRevision,
  updateStory,
} from '../models/storyModel.js';

function sendValidationError(response: Response, error: { issues: Array<{ message: string; path: PropertyKey[] }> }) {
  response.status(400).json({
    message: 'Please check the submitted information.',
    errors: error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })),
  });
}

export function createStoryController(pool: Pool) {
  return {
    list: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const ownOnly = request.query.own === 'true';
        response.json({ stories: await getStories(pool, request.user!.id, ownOnly) });
      } catch (error) {
        next(error);
      }
    },

    create: async (request: Request, response: Response, next: NextFunction) => {
      const parsed = storySchema.safeParse(request.body);
      if (!parsed.success) {
        sendValidationError(response, parsed.error);
        return;
      }
      try {
        const story = await createStory(pool, request.user!.id, parsed.data.title, parsed.data.content);
        broadcastStoryChange(request, story.id, 'created');
        response.status(201).json({ story });
      } catch (error) {
        next(error);
      }
    },

    get: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const story = await getStory(pool, Number(request.params.id));
        if (!story) {
          response.status(404).json({ message: 'Story not found.' });
          return;
        }
        response.json({ story });
      } catch (error) {
        next(error);
      }
    },

    update: async (request: Request, response: Response, next: NextFunction) => {
      const parsed = storyPatchSchema.safeParse(request.body);
      if (!parsed.success) {
        sendValidationError(response, parsed.error);
        return;
      }
      try {
        const story = await updateStory(pool, Number(request.params.id), parsed.data, request.user!.id);
        if (story) broadcastStoryChange(request, story.id, 'updated');
        response.json({ story });
      } catch (error) {
        next(error);
      }
    },

    remove: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const deleted = await deleteStory(pool, request.storyId!, request.user!.id);
        if (!deleted) {
          response.status(404).json({ message: 'Story not found or you are not its author.' });
          return;
        }
        broadcastStoryChange(request, request.storyId!, 'deleted');
        response.status(204).end();
      } catch (error) {
        next(error);
      }
    },

    contributors: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const story = await getStory(pool, Number(request.params.storyId));
        if (!story) {
          response.status(404).json({ message: 'Story not found.' });
          return;
        }
        response.json({ contributors: await listContributors(pool, story.id) });
      } catch (error) {
        next(error);
      }
    },

    addContributor: async (request: Request, response: Response, next: NextFunction) => {
      const parsed = contributorSchema.safeParse(request.body);
      if (!parsed.success) {
        sendValidationError(response, parsed.error);
        return;
      }
      try {
        const story = await getStory(pool, parsed.data.storyId);
        if (!story) {
          response.status(404).json({ message: 'Story not found.' });
          return;
        }
        if (story.authorId !== request.user!.id) {
          response.status(403).json({ message: 'Only the story author can add contributors.' });
          return;
        }
        const userId = parsed.data.userId ?? await findUserIdByEmail(pool, parsed.data.email!);
        if (!userId) {
          response.status(404).json({ message: 'No user was found for that email.' });
          return;
        }
        if (userId === story.authorId) {
          response.status(400).json({ message: 'The story author is already a member.' });
          return;
        }
        const contributor = await addContributor(pool, story.id, userId);
        if (!contributor) {
          response.status(404).json({ message: 'User not found.' });
          return;
        }
        broadcastStoryChange(request, story.id, 'contributors');
        response.status(201).json({ contributor });
      } catch (error) {
        next(error);
      }
    },

    removeContributor: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const removed = await removeContributor(
          pool,
          Number(request.params.id),
          request.storyId!,
        );
        if (!removed) {
          response.status(404).json({ message: 'Contributor not found on this story.' });
          return;
        }
        broadcastStoryChange(request, request.storyId!, 'contributors');
        response.status(204).end();
      } catch (error) {
        next(error);
      }
    },

    comments: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const story = await getStory(pool, Number(request.params.storyId));
        if (!story) {
          response.status(404).json({ message: 'Story not found.' });
          return;
        }
        response.json({ comments: await listComments(pool, story.id) });
      } catch (error) {
        next(error);
      }
    },

    addComment: async (request: Request, response: Response, next: NextFunction) => {
      const parsed = commentSchema.safeParse(request.body);
      if (!parsed.success) {
        sendValidationError(response, parsed.error);
        return;
      }
      try {
        const story = await getStory(pool, Number(request.params.storyId));
        if (!story) {
          response.status(404).json({ message: 'Story not found.' });
          return;
        }
        const comment = await addComment(pool, story.id, request.user!.id, parsed.data.content);
        broadcastStoryChange(request, story.id, 'comments');
        response.status(201).json({ comment });
      } catch (error) {
        next(error);
      }
    },

    removeComment: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const storyId = await deleteComment(pool, Number(request.params.id), request.user!.id);
        if (!storyId) {
          response.status(404).json({ message: 'Comment not found or you cannot remove it.' });
          return;
        }
        broadcastStoryChange(request, storyId, 'comments');
        response.status(204).end();
      } catch (error) {
        next(error);
      }
    },

    revisions: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const story = await getStory(pool, Number(request.params.storyId));
        if (!story) {
          response.status(404).json({ message: 'Story not found.' });
          return;
        }
        response.json({ revisions: await getStoryRevisions(pool, story.id) });
      } catch (error) {
        next(error);
      }
    },

    restoreRevision: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const story = await restoreStoryRevision(
          pool,
          Number(request.params.storyId),
          Number(request.params.revisionId),
          request.user!.id,
        );
        if (!story) {
          response.status(404).json({ message: 'Story revision not found.' });
          return;
        }
        broadcastStoryChange(request, story.id, 'restored');
        response.json({ story });
      } catch (error) {
        next(error);
      }
    },
  };
}

function broadcastStoryChange(request: Request, storyId: number, change: string) {
  const io = request.app.get('io') as Server | null;
  io?.to('story-shelf').emit('stories:changed', { storyId, change });
  io?.to(`story:${storyId}`).emit('story:changed', { storyId, change });
}