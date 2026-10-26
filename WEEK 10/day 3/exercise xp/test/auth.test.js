import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { createDatabase } from '../src/database.js';

const accessSecret = 'test-access-secret-that-is-at-least-32-characters-long';
const refreshSecret = 'test-refresh-secret-that-is-at-least-32-characters-long';
const database = createDatabase(':memory:');
const app = createApp({ database, accessSecret, refreshSecret });
const agent = request.agent(app);

after(() => database.close());

test('rejects weak registration input', async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({ username: 'ab', password: 'password' })
    .expect(400);

  assert.match(response.body.error, /Username must be/);
});

test('registers a user, protects and updates the profile, then rotates and revokes refresh tokens', async () => {
  const registration = await agent
    .post('/api/auth/register')
    .send({ username: 'recipe_user', password: 'Strong-Passphrase-42!', displayName: 'Recipe User' })
    .expect(201);

  assert.deepEqual(registration.body.user, {
    id: 1,
    username: 'recipe_user',
    displayName: 'Recipe User',
  });
  assert.ok(registration.headers['set-cookie'].some((cookie) => cookie.includes('HttpOnly')));

  const unauthorized = await request(app).get('/api/profile').expect(401);
  assert.equal(unauthorized.body.error, 'Authentication required.');

  await agent.get('/api/profile').expect(200, {
    user: { id: 1, username: 'recipe_user', displayName: 'Recipe User' },
  });

  await agent.patch('/api/profile')
    .send({ displayName: 'Updated Name' })
    .expect(200, { user: { id: 1, username: 'recipe_user', displayName: 'Updated Name' } });

  const refreshCookie = registration.headers['set-cookie']
    .find((cookie) => cookie.startsWith('refresh_token='))
    .split(';')[0];

  await agent.post('/api/auth/refresh').expect(200);
  await request(app)
    .post('/api/auth/refresh')
    .set('Cookie', refreshCookie)
    .expect(401);

  await agent.post('/api/auth/logout').expect(204);
  await agent.get('/api/profile').expect(401);
});

test('returns a generic error for an unknown login', async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({ username: 'missing_user', password: 'Strong-Passphrase-42!' })
    .expect(401);

  assert.equal(response.body.error, 'Invalid username or password.');
});