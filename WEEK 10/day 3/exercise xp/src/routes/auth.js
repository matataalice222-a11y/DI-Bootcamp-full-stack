import { Router } from 'express';
import bcrypt from 'bcrypt';
import { rateLimit } from 'express-rate-limit';
import {
  accessTokenLifetime,
  checkPassword,
  createSessionTokens,
  hashToken,
  refreshTokenLifetime,
  signAccessToken,
  signRefreshToken,
  tokenHashMatches,
  validateRegistration,
  verifyToken,
} from '../auth.js';

const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60;

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    displayName: user.display_name,
  };
}

function setAuthCookies(response, accessToken, refreshToken) {
  const secure = process.env.NODE_ENV === 'production';
  response.cookie('access_token', accessToken, {
    httpOnly: true,
    secure,
    sameSite: 'strict',
    path: '/',
    maxAge: accessTokenLifetime(),
  });
  response.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure,
    sameSite: 'strict',
    path: '/api/auth',
    maxAge: refreshTokenLifetime(),
  });
}

function clearAuthCookies(response) {
  const secure = process.env.NODE_ENV === 'production';
  response.clearCookie('access_token', { httpOnly: true, secure, sameSite: 'strict', path: '/' });
  response.clearCookie('refresh_token', { httpOnly: true, secure, sameSite: 'strict', path: '/api/auth' });
}

export function createAuthRouter({ database, accessSecret, refreshSecret, authenticate }) {
  const router = Router();
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many authentication attempts. Please try again later.' },
  });

  router.post('/register', authLimiter, async (request, response, next) => {
    try {
      const body = request.body ?? {};
      const validationError = validateRegistration(body);
      if (validationError) {
        response.status(400).json({ error: validationError });
        return;
      }

      const username = body.username.trim();
      const displayName = typeof body.displayName === 'string' && body.displayName.trim()
        ? body.displayName.trim()
        : username;
      if (displayName.length > 60) {
        response.status(400).json({ error: 'Display name must be 60 characters or fewer.' });
        return;
      }

      if (database.findUserByUsername.get(username)) {
        response.status(409).json({ error: 'That username is already taken.' });
        return;
      }

      const passwordHash = await bcrypt.hash(body.password, 12);
      const result = database.insertUser.run(username, passwordHash, displayName, Date.now());
      const user = database.findUserById.get(Number(result.lastInsertRowid));
      const tokens = createSessionTokens(user.id, database, accessSecret, refreshSecret);
      setAuthCookies(response, tokens.accessToken, tokens.refreshToken);
      response.status(201).json({ user: publicUser(user) });
    } catch (error) {
      if (error?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        response.status(409).json({ error: 'That username is already taken.' });
        return;
      }
      next(error);
    }
  });

  router.post('/login', authLimiter, async (request, response, next) => {
    try {
      const { username, password } = request.body ?? {};
      if (typeof username !== 'string' || typeof password !== 'string') {
        response.status(400).json({ error: 'Username and password are required.' });
        return;
      }

      const user = database.findUserByUsername.get(username.trim());
      const passwordMatches = await checkPassword(password, user?.password_hash);
      if (!user || !passwordMatches) {
        response.status(401).json({ error: 'Invalid username or password.' });
        return;
      }

      const tokens = createSessionTokens(user.id, database, accessSecret, refreshSecret);
      setAuthCookies(response, tokens.accessToken, tokens.refreshToken);
      response.json({ user: publicUser(user) });
    } catch (error) {
      next(error);
    }
  });

  router.post('/refresh', authLimiter, (request, response) => {
    const token = request.cookies?.refresh_token;
    if (!token) {
      response.status(401).json({ error: 'Refresh token required.' });
      return;
    }

    try {
      const payload = verifyToken(token, refreshSecret, 'refresh');
      const session = database.findActiveSession.get(payload.sid);
      if (
        !session || session.user_id !== Number(payload.sub) ||
        session.expires_at <= Date.now() || !tokenHashMatches(token, session.token_hash)
      ) {
        clearAuthCookies(response);
        response.status(401).json({ error: 'Refresh token is invalid, expired, or already used.' });
        return;
      }

      const accessToken = signAccessToken(session.user_id, accessSecret);
      const refreshToken = signRefreshToken(session.user_id, session.id, refreshSecret);
      const now = Date.now();
      const nextExpiresAt = now + REFRESH_TTL_SECONDS * 1000;
      const rotation = database.rotateSession.run(
        hashToken(refreshToken), nextExpiresAt, session.id, session.token_hash,
      );

      if (rotation.changes !== 1) {
        clearAuthCookies(response);
        response.status(401).json({ error: 'Refresh token has already been used.' });
        return;
      }

      setAuthCookies(response, accessToken, refreshToken);
      response.json({ message: 'Session refreshed.' });
    } catch {
      clearAuthCookies(response);
      response.status(401).json({ error: 'Refresh token is invalid or expired.' });
    }
  });

  router.post('/logout', (request, response) => {
    const token = request.cookies?.refresh_token;
    if (token) {
      try {
        const payload = verifyToken(token, refreshSecret, 'refresh', { ignoreExpiration: true });
        const session = database.findActiveSession.get(payload.sid);
        if (session && tokenHashMatches(token, session.token_hash)) {
          database.revokeSession.run(Date.now(), session.id);
        }
      } catch {
        clearAuthCookies(response);
        response.status(204).end();
        return;
      }
    }

    clearAuthCookies(response);
    response.status(204).end();
  });

  router.get('/me', authenticate, (request, response) => {
    response.json({ user: publicUser(request.user) });
  });

  return router;
}