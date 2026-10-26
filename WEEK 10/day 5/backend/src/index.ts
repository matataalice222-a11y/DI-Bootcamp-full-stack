import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { pool } from './db/pool.js';
import { createApp } from './app.js';
import { attachRealtime } from './realtime.js';

dotenv.config();

function assertEnvironment() {
  const required = ['DATABASE_URL', 'JWT_SECRET', 'REFRESH_SECRET'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  if (process.env.JWT_SECRET!.length < 32 || process.env.REFRESH_SECRET!.length < 32) {
    throw new Error('JWT secrets must each contain at least 32 characters.');
  }
  if (process.env.JWT_SECRET === process.env.REFRESH_SECRET) {
    throw new Error('JWT_SECRET and REFRESH_SECRET must be different values.');
  }
}

assertEnvironment();
const app = createApp(pool);
const port = Number(process.env.PORT ?? 4000);
const server = createServer(app);
const io = attachRealtime(server, pool);
app.set('io', io);
server.listen(port, '0.0.0.0', () => {
  console.log(`Story API listening on port ${port}.`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => {
      void pool.end().finally(() => process.exit(0));
    });
  });
}