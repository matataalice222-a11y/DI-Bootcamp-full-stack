import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hashRefreshToken, matchesRefreshToken, signAccessToken, signRefreshToken, verifyTypedToken } from '../src/helpers/tokens.js';

const accessSecret = 'access-secret-used-only-by-the-auth-unit-tests';
const refreshSecret = 'a-separate-refresh-secret-used-by-the-auth-tests';

test('access tokens are short-lived and cannot be used as refresh tokens', () => {
  const token = signAccessToken(42, accessSecret);
  const payload = verifyTypedToken(token, accessSecret, 'access');
  assert.equal(payload.sub, '42');
  assert.ok(Number(payload.exp) - Number(payload.iat) <= 15 * 60);
  assert.throws(() => verifyTypedToken(token, refreshSecret, 'refresh'));
});

test('refresh tokens have unique IDs and stored hashes do not reveal the token', () => {
  const first = signRefreshToken(42, 'session-1', refreshSecret);
  const second = signRefreshToken(42, 'session-1', refreshSecret);
  const storedHash = hashRefreshToken(first);

  assert.notEqual(first, second);
  assert.notEqual(storedHash, first);
  assert.equal(matchesRefreshToken(first, storedHash), true);
  assert.equal(matchesRefreshToken(second, storedHash), false);
  assert.equal(verifyTypedToken(first, refreshSecret, 'refresh').sid, 'session-1');
});