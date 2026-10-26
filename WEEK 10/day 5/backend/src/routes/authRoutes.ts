import { Router } from 'express';
import type { Pool } from 'pg';
import { rateLimit } from 'express-rate-limit';
import { createAuthController } from '../controllers/authController.js';
import { authenticate, requireTrustedOrigin } from '../middleware/authenticate.js';

export function createAuthRoutes(pool: Pool): Router {
  const router = Router();
  const controller = createAuthController(pool);
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { message: 'Too many authentication attempts. Please try again later.' },
  });

  router.post('/register', authLimiter, controller.register);
  router.post('/login', authLimiter, controller.login);
  router.post('/refresh', requireTrustedOrigin, authLimiter, controller.refresh);
  router.post('/logout', requireTrustedOrigin, controller.logout);
  router.post('/logout-all', authenticate, controller.logoutAll);
  router.get('/me', authenticate, controller.me);
  router.patch('/me', authenticate, controller.updateProfile);
  return router;
}