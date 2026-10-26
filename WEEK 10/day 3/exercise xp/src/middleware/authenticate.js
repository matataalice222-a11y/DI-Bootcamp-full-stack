import { verifyToken } from '../auth.js';

export function createAuthenticate(database, accessSecret) {
  return function authenticate(request, response, next) {
    const token = request.cookies?.access_token;
    if (!token) {
      response.status(401).json({ error: 'Authentication required.' });
      return;
    }

    try {
      const payload = verifyToken(token, accessSecret, 'access');
      const user = database.findUserById.get(Number(payload.sub));
      if (!user) {
        response.status(401).json({ error: 'Authentication required.' });
        return;
      }

      request.user = user;
      next();
    } catch {
      response.status(401).json({ error: 'The access token is invalid or expired.' });
    }
  };
}