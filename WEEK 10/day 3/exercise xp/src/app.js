import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { createAuthenticate } from './middleware/authenticate.js';
import { createAuthRouter } from './routes/auth.js';
import { createProfileRouter } from './routes/profile.js';
import { validateJwtSecrets } from './auth.js';

export function createApp({ database, accessSecret, refreshSecret }) {
  if (!database || !validateJwtSecrets(accessSecret, refreshSecret)) {
    throw new Error('Provide a database and two different JWT secrets of at least 32 characters.');
  }

  const app = express();
  const authenticate = createAuthenticate(database, accessSecret);

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(bodyParser.json({ limit: '10kb' }));
  app.use(cookieParser());

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
  });
  app.use('/api/auth', createAuthRouter({ database, accessSecret, refreshSecret, authenticate }));
  app.use('/api/profile', createProfileRouter({ database, authenticate }));

  app.use((_request, response) => {
    response.status(404).json({ error: 'Route not found.' });
  });

  app.use((error, _request, response, _next) => {
    if (error?.type === 'entity.parse.failed') {
      response.status(400).json({ error: 'Request body must contain valid JSON.' });
      return;
    }

    response.status(500).json({ error: 'An unexpected server error occurred.' });
  });

  return app;
}