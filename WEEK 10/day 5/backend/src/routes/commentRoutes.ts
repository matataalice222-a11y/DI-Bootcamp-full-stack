import { Router } from 'express';
import type { Pool } from 'pg';
import { createStoryController } from '../controllers/storyController.js';
import { authenticate } from '../middleware/authenticate.js';

export function createCommentRoutes(pool: Pool): Router {
  const router = Router();
  const controller = createStoryController(pool);
  router.delete('/:id', authenticate, controller.removeComment);
  return router;
}