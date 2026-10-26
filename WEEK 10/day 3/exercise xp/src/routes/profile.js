import { Router } from 'express';

export function createProfileRouter({ database, authenticate }) {
  const router = Router();

  router.get('/', authenticate, (request, response) => {
    response.json({
      user: {
        id: request.user.id,
        username: request.user.username,
        displayName: request.user.display_name,
      },
    });
  });

  router.patch('/', authenticate, (request, response) => {
    const { displayName } = request.body ?? {};
    if (typeof displayName !== 'string' || !displayName.trim() || displayName.trim().length > 60) {
      response.status(400).json({ error: 'Display name must be between 1 and 60 characters.' });
      return;
    }

    database.updateDisplayName.run(displayName.trim(), request.user.id);
    const user = database.findUserById.get(request.user.id);
    response.json({
      user: {
        id: user.id,
        username: user.username,
        displayName: user.display_name,
      },
    });
  });

  return router;
}