import type { User } from '@story/types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      storyId?: number;
    }
  }
}

export {};