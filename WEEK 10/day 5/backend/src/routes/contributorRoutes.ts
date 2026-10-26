import { Router } from 'express';
import type { Pool } from 'pg';
import { createStoryController } from '../controllers/storyController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeContributorRemoval } from '../middleware/authorize.js';

export function createContributorRoutes(pool: Pool): Router {
  const router = Router();
  const controller = createStoryController(pool);
  router.use(authenticate);
  router.post('/', controller.addContributor);
  router.get('/:storyId', controller.contributors);
  router.get('/:storyId', controller.contributors);
  router.delete('/:id', authorizeContributorRemoval, controller.removeContributor);
  return router;
}