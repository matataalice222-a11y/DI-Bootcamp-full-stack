import { Router } from 'express';
import type { Pool } from 'pg';
import { createStoryController } from '../controllers/storyController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeStoryAuthor, authorizeStoryEditor } from '../middleware/authorize.js';

export function createStoryRoutes(pool: Pool): Router {
  const router = Router();
  const controller = createStoryController(pool);

  router.use(authenticate);
  router.get('/', controller.list);
  router.post('/', controller.create);
  router.get('/:id', controller.get);
  router.patch('/:id', authorizeStoryEditor, controller.update);
  router.delete('/:id', authorizeStoryAuthor, controller.remove);
  router.get('/:storyId/contributors', controller.contributors);
  router.get('/:storyId/revisions', controller.revisions);
  router.post('/:storyId/revisions/:revisionId/restore', authorizeStoryEditor, controller.restoreRevision);
  router.get('/:storyId/comments', controller.comments);
  router.post('/:storyId/comments', controller.addComment);
  return router;
}