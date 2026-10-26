import type { NextFunction, Request, Response } from 'express';
import { verifyTypedToken } from '../helpers/tokens.js';
import { findUserById } from '../models/userModel.js';
import { pool } from '../db/pool.js';
import { isAllowedOrigin } from '../helpers/origin.js';

export function requireTrustedOrigin(request: Request, response: Response, next: NextFunction) {
  if (!isAllowedOrigin(request.get('origin'))) {
    response.status(403).json({ message: 'Request origin is not allowed.' });
    return;
  }
  next();
}

export async function authenticate(request: Request, response: Response, next: NextFunction) {
  const authorization = request.get('authorization');
  const match = authorization?.match(/^Bearer ([^\s]+)$/);
  const token = match?.[1];
  if (!token) {
    response.status(401).json({ message: 'Authentication required.' });
    return;
  }

  try {
    const payload = verifyTypedToken(token, process.env.JWT_SECRET!, 'access');
    const user = await findUserById(pool, Number(payload.sub));
    if (!user) {
      response.status(401).json({ message: 'Authentication required.' });
      return;
    }

    request.user = user;
    next();
  } catch {
    response.status(401).json({ message: 'Access token is invalid or expired.' });
  }
}