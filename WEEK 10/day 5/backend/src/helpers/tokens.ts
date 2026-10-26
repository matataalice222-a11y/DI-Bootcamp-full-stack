import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import jwt, { type JwtPayload } from 'jsonwebtoken';

const issuer = 'collaborative-storytelling';
const audience = 'collaborative-storytelling-api';

export function signAccessToken(userId: number, secret: string): string {
  return jwt.sign({ type: 'access' }, secret, {
    subject: String(userId),
    issuer,
    audience,
    expiresIn: '15m',
  });
}

export function signRefreshToken(userId: number, sessionId: string, secret: string): string {
  return jwt.sign({ type: 'refresh', sid: sessionId, jti: randomUUID() }, secret, {
    subject: String(userId),
    issuer,
    audience,
    expiresIn: '7d',
  });
}

export function verifyTypedToken(token: string, secret: string, type: 'access' | 'refresh', ignoreExpiration = false): JwtPayload {
  const payload = jwt.verify(token, secret, { issuer, audience, ignoreExpiration });
  if (typeof payload === 'string' || payload.type !== type || typeof payload.sub !== 'string') {
    throw new Error('Invalid token claims.');
  }
  if (type === 'refresh' && typeof payload.sid !== 'string') throw new Error('Invalid refresh token claims.');
  return payload;
}

export function hashRefreshToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function matchesRefreshToken(token: string, storedHash: string): boolean {
  const tokenHash = Buffer.from(hashRefreshToken(token));
  const expectedHash = Buffer.from(storedHash);
  return tokenHash.length === expectedHash.length && timingSafeEqual(tokenHash, expectedHash);
}