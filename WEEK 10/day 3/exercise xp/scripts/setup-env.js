import { randomBytes } from 'node:crypto';
import { existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = resolve(projectRoot, '.env');

if (!existsSync(envPath)) {
  const accessSecret = randomBytes(48).toString('base64url');
  const refreshSecret = randomBytes(48).toString('base64url');
  writeFileSync(
    envPath,
    [
      'PORT=3000',
      'NODE_ENV=development',
      'DB_PATH=./data/auth.sqlite',
      `ACCESS_TOKEN_SECRET=${accessSecret}`,
      `REFRESH_TOKEN_SECRET=${refreshSecret}`,
      '',
    ].join('\n'),
    { flag: 'wx', mode: 0o600 },
  );
  console.log('Created .env with separate, random JWT secrets.');
} else {
  console.log('.env already exists; keeping the current secrets.');
}