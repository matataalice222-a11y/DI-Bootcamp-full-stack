import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import type { Pool } from 'pg';
import { verifyTypedToken } from './helpers/tokens.js';
import { isAllowedOrigin } from './helpers/origin.js';
import { findUserById } from './models/userModel.js';
import { getStory } from './models/storyModel.js';

export function attachRealtime(server: HttpServer, pool: Pool): Server {
  const io = new Server(server, {
    cors: {
      origin: (origin, callback) => callback(null, !origin || isAllowedOrigin(origin)),
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token: unknown = socket.handshake.auth?.accessToken;
      if (typeof token !== 'string') throw new Error('Missing access token.');
      const payload = verifyTypedToken(token, process.env.JWT_SECRET!, 'access');
      const user = await findUserById(pool, Number(payload.sub));
      if (!user) throw new Error('Unknown user.');
      socket.data.userId = user.id;
      next();
    } catch {
      next(new Error('Authentication required.'));
    }
  });

  io.on('connection', (socket) => {
    socket.join('story-shelf');
    socket.on('story:join', async (storyId: unknown) => {
      if (typeof storyId !== 'number' || !Number.isInteger(storyId) || storyId < 1) return;
      try {
        if (await getStory(pool, storyId)) socket.join(`story:${storyId}`);
      } catch {
        socket.emit('story:error', { message: 'Could not join this story.' });
      }
    });
    socket.on('story:leave', (storyId: unknown) => {
      if (typeof storyId === 'number' && Number.isInteger(storyId)) socket.leave(`story:${storyId}`);
    });
  });

  return io;
}