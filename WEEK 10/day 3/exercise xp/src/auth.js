import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const ACCESS_TTL_SECONDS = 15 * 60;
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60;
const dummyPasswordHash = bcrypt.hash(randomUUID(), 10);

export function validateRegistration({ username, password }) {
  if (typeof username !== 'string' || !/^[a-zA-Z0-9_-]{3,30}$/.test(username.trim())) {
    return 'Username must be 3–30 characters and use only letters, numbers, underscores, or hyphens.';
  }

  if (
    typeof password !== 'string' || password.length < 12 ||
    !/[a-z]/.test(password) || !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) || !/[^a-zA-Z0-9]/.test(password)
  ) {
    return 'Password must be at least 12 characters and include lowercase, uppercase, a number, and a symbol.';
  }

  return null;
}

export function validateJwtSecrets(accessSecret, refreshSecret) {
  return typeof accessSecret === 'string' && accessSecret.length >= 32 &&
    typeof refreshSecret === 'string' && refreshSecret.length >= 32 &&
    accessSecret !== refreshSecret;
}

export async function checkPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash ?? await dummyPasswordHash);
}

export function hashToken(token) {
  return createHash('sha256').update(token).digest('base64url');
}

export function tokenHashMatches(token, expectedHash) {
  const actual = Buffer.from(hashToken(token));
  const expected = Buffer.from(expectedHash);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function signAccessToken(userId, secret) {
  return jwt.sign({ type: 'access' }, secret, {
    subject: String(userId),
    expiresIn: ACCESS_TTL_SECONDS,
    issuer: 'jwt-auth-exercise',
    audience: 'jwt-auth-api',
  });
}

export function signRefreshToken(userId, sessionId, secret) {
  return jwt.sign({ type: 'refresh', sid: sessionId, jti: randomUUID() }, secret, {
    subject: String(userId),
    expiresIn: REFRESH_TTL_SECONDS,
    issuer: 'jwt-auth-exercise',
    audience: 'jwt-auth-api',
  });
}

export function verifyToken(token, secret, type, { ignoreExpiration = false } = {}) {
  const payload = jwt.verify(token, secret, {
    issuer: 'jwt-auth-exercise',
    audience: 'jwt-auth-api',
    ignoreExpiration,
  });

  if (
    typeof payload === 'string' || payload.type !== type ||
    typeof payload.sub !== 'string' || (type === 'refresh' && typeof payload.sid !== 'string')
  ) {
    throw new Error('Invalid token claims.');
  }

  return payload;
}

export function createSessionTokens(userId, database, accessSecret, refreshSecret) {
  const sessionId = randomUUID();
  const refreshToken = signRefreshToken(userId, sessionId, refreshSecret);
  const now = Date.now();
  const expiresAt = now + REFRESH_TTL_SECONDS * 1000;

  database.cleanOldSessions.run(now, now - 30 * 24 * 60 * 60 * 1000);
  database.insertSession.run(sessionId, userId, hashToken(refreshToken), expiresAt, now);

  return {
    accessToken: signAccessToken(userId, accessSecret),
    refreshToken,
    refreshExpiresAt: expiresAt,
  };
}

export function accessTokenLifetime() {
  return ACCESS_TTL_SECONDS * 1000;
}

export function refreshTokenLifetime() {
  return REFRESH_TTL_SECONDS * 1000;
}