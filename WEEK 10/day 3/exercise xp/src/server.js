import 'dotenv/config';
import { resolve } from 'node:path';
import { createApp } from './app.js';
import { createDatabase } from './database.js';
import { validateJwtSecrets } from './auth.js';

const { ACCESS_TOKEN_SECRET: accessSecret, REFRESH_TOKEN_SECRET: refreshSecret } = process.env;
if (!validateJwtSecrets(accessSecret, refreshSecret)) {
  throw new Error('JWT secrets must be different values with at least 32 characters. Run npm run setup.');
}

const database = createDatabase(resolve(process.env.DB_PATH ?? './data/auth.sqlite'));
const app = createApp({ database, accessSecret, refreshSecret });
const port = Number(process.env.PORT ?? 3000);
const server = app.listen(port, () => {
  console.log(`JWT auth API listening on http://localhost:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => {
      database.close();
      process.exit(0);
    });
  });
}