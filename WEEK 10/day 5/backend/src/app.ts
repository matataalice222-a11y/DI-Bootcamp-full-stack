import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import type { Server } from 'socket.io';
import type { Pool } from 'pg';
import { isAllowedOrigin } from './helpers/origin.js';
import { createAuthRoutes } from './routes/authRoutes.js';
import { createCommentRoutes } from './routes/commentRoutes.js';
import { createContributorRoutes } from './routes/contributorRoutes.js';
import { createStoryRoutes } from './routes/storyRoutes.js';

export function createApp(pool: Pool) {
  const app = express();
  app.disable('x-powered-by');
  app.set('io', null as Server | null);
  app.use(helmet());
  app.use(cors({
    origin: (origin, callback) => callback(null, !origin || isAllowedOrigin(origin)),
    credentials: true,
  }));
  app.use(express.json({ limit: '50kb' }));
  app.use(cookieParser());

  app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
  app.use('/api/auth', createAuthRoutes(pool));
  app.use('/api/stories', createStoryRoutes(pool));
  app.use('/api/contributors', createContributorRoutes(pool));
  app.use('/api/comments', createCommentRoutes(pool));

  app.use((_request, response) => response.status(404).json({ message: 'Route not found.' }));

  const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
    if (error?.type === 'entity.parse.failed') {
      response.status(400).json({ message: 'Request body must contain valid JSON.' });
      return;
    }
    if (error?.type === 'entity.too.large') {
      response.status(413).json({ message: 'Request body is too large.' });
      return;
    }

    console.error('Request failed.');
    response.status(500).json({ message: 'Something went wrong. Please try again.' });
  };
  app.use(errorHandler);

  return app;
}