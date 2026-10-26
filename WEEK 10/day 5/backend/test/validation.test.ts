import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loginSchema, registrationSchema, storyPatchSchema, storySchema } from '../src/helpers/validation.js';
import { signAccessToken, signRefreshToken, verifyTypedToken } from '../src/helpers/tokens.js';

const accessSecret = 'access-secret-for-tests-that-is-more-than-32-characters';
const refreshSecret = 'refresh-secret-for-tests-that-is-more-than-32-characters';

test('registration validates username, normalized email, and password strength', () => {
  const valid = registrationSchema.parse({
    username: 'story_keeper',
    email: '  WRITER@example.com ',
    password: 'Strong-Passphrase-42!',
  });
  assert.equal(valid.email, 'writer@example.com');
  assert.equal(registrationSchema.safeParse({ username: 'ab', email: 'not-email', password: 'password' }).success, false);
});

test('login and story schemas reject empty or malformed data', () => {
  assert.equal(loginSchema.safeParse({ email: 'person@example.com', password: 'ok' }).success, true);
  assert.equal(storySchema.safeParse({ title: '  ', content: 'A first line' }).success, false);
  assert.equal(storyPatchSchema.safeParse({}).success, false);
  assert.equal(storySchema.safeParse({ title: 'A beginning', content: 'Once upon a time.' }).success, true);
});

test('access and refresh tokens have distinct token types and refresh identifiers', () => {
  const accessToken = signAccessToken(17, accessSecret);
  const access = verifyTypedToken(accessToken, accessSecret, 'access');
  assert.equal(access.sub, '17');
  assert.throws(() => verifyTypedToken(accessToken, accessSecret, 'refresh'));

  const refreshA = signRefreshToken(17, 'session-id', refreshSecret);
  const refreshB = signRefreshToken(17, 'session-id', refreshSecret);
  assert.notEqual(refreshA, refreshB);
  assert.equal(verifyTypedToken(refreshA, refreshSecret, 'refresh').sid, 'session-id');
});