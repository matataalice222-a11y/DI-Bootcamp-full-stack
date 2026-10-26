import { randomUUID } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Pool } from 'pg';
import {
  hashRefreshToken,
  matchesRefreshToken,
  signAccessToken,
  signRefreshToken,
  verifyTypedToken,
} from '../helpers/tokens.js';
import { loginSchema, profileSchema, registrationSchema } from '../helpers/validation.js';
import {
  createRefreshSession,
  revokeAllUserSessions,
  revokeRefreshSession,
  rotateRefreshSession,
} from '../models/sessionModel.js';
import { createUser, findUserByEmail, findUserById, toUser, updateDisplayName } from '../models/userModel.js';

const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
  path: '/',
  maxAge: 15 * 60 * 1000,
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
  path: '/api/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function setCookies(response: Response, accessToken: string, refreshToken: string) {
  response.cookie('access_token', accessToken, accessCookieOptions);
  response.cookie('refresh_token', refreshToken, refreshCookieOptions);
}

function clearCookies(response: Response) {
  response.clearCookie('access_token', accessCookieOptions);
  response.clearCookie('refresh_token', refreshCookieOptions);
}

async function issueSession(pool: Pool, userId: number) {
  const sessionId = randomUUID();
  const refreshToken = signRefreshToken(userId, sessionId, process.env.REFRESH_SECRET!);
  const expiresAt = new Date(Date.now() + refreshCookieOptions.maxAge);
  await createRefreshSession(pool, userId, hashRefreshToken(refreshToken), expiresAt);
  return { accessToken: signAccessToken(userId, process.env.JWT_SECRET!), refreshToken };
}

function sendValidationError(response: Response, error: { issues: Array<{ message: string; path: PropertyKey[] }> }) {
  response.status(400).json({
    message: 'Please check the submitted information.',
    errors: error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })),
  });
}

export function createAuthController(pool: Pool) {
  return {
    register: async (request: Request, response: Response, next: NextFunction) => {
      const parsed = registrationSchema.safeParse(request.body);
      if (!parsed.success) {
        sendValidationError(response, parsed.error);
        return;
      }

      try {
        const { username, email, password, displayName } = parsed.data;
        const user = await createUser(pool, {
          username,
          email,
          displayName: displayName ?? username,
          passwordHash: await bcrypt.hash(password, 12),
        });
        const tokens = await issueSession(pool, user.id);
        setCookies(response, tokens.accessToken, tokens.refreshToken);
        response.status(201).json({ user, accessToken: tokens.accessToken });
      } catch (error) {
        if ((error as { code?: string }).code === '23505') {
          response.status(409).json({ message: 'That username or email is already registered.' });
          return;
        }
        next(error);
      }
    },

    login: async (request: Request, response: Response, next: NextFunction) => {
      const parsed = loginSchema.safeParse(request.body);
      if (!parsed.success) {
        sendValidationError(response, parsed.error);
        return;
      }

      try {
        const userRecord = await findUserByEmail(pool, parsed.data.email);
        const validPassword = userRecord
          ? await bcrypt.compare(parsed.data.password, userRecord.password_hash!)
          : false;
        if (!userRecord || !validPassword) {
          response.status(401).json({ message: 'Invalid email or password.' });
          return;
        }

        const user = toUser(userRecord);
        const tokens = await issueSession(pool, user.id);
        setCookies(response, tokens.accessToken, tokens.refreshToken);
        response.json({ user, accessToken: tokens.accessToken });
      } catch (error) {
        next(error);
      }
    },

    refresh: async (request: Request, response: Response, next: NextFunction) => {
      const token = request.cookies.refresh_token as string | undefined;
      if (!token) {
        response.status(401).json({ message: 'Refresh token required.' });
        return;
      }

      try {
        const payload = verifyTypedToken(token, process.env.REFRESH_SECRET!, 'refresh');
        const userId = Number(payload.sub);
        const sessionId = payload.sid as string;
        const user = await findUserById(pool, userId);
        if (!user) {
          clearCookies(response);
          response.status(401).json({ message: 'Session is no longer valid.' });
          return;
        }

        const refreshToken = signRefreshToken(userId, sessionId, process.env.REFRESH_SECRET!);
        const expiresAt = new Date(Date.now() + refreshCookieOptions.maxAge);
        const rotated = await rotateRefreshSession(pool, {
          id: sessionId,
          userId,
          tokenHash: hashRefreshToken(token),
          nextTokenHash: hashRefreshToken(refreshToken),
          expiresAt,
        });
        if (!rotated) {
          clearCookies(response);
          response.status(401).json({ message: 'Refresh token is invalid, expired, or already used.' });
          return;
        }

        const accessToken = signAccessToken(userId, process.env.JWT_SECRET!);
        setCookies(response, accessToken, refreshToken);
        response.json({ user, accessToken });
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
          clearCookies(response);
          response.status(401).json({ message: 'Refresh token is invalid or expired.' });
          return;
        }
        next(error);
      }
    },

    logout: async (request: Request, response: Response, next: NextFunction) => {
      const token = request.cookies.refresh_token as string | undefined;
      if (token) {
        let payload;
        try {
          payload = verifyTypedToken(token, process.env.REFRESH_SECRET!, 'refresh', true);
        } catch {
          clearCookies(response);
          response.status(204).end();
          return;
        }
        try {
          await revokeRefreshSession(pool, payload.sid as string, Number(payload.sub));
        } catch (error) {
          next(error);
          return;
        }
      }

      clearCookies(response);
      response.status(204).end();
    },

    logoutAll: async (request: Request, response: Response, next: NextFunction) => {
      try {
        await revokeAllUserSessions(pool, request.user!.id);
        clearCookies(response);
        response.status(204).end();
      } catch (error) {
        next(error);
      }
    },

    me: (request: Request, response: Response) => {
      response.json({ user: request.user });
    },

    updateProfile: async (request: Request, response: Response, next: NextFunction) => {
      const parsed = profileSchema.safeParse(request.body);
      if (!parsed.success) {
        sendValidationError(response, parsed.error);
        return;
      }
      try {
        const user = await updateDisplayName(pool, request.user!.id, parsed.data.displayName);
        response.json({ user });
      } catch (error) {
        next(error);
      }
    },
  };
}