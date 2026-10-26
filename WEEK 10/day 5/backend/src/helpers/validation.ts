import { z } from 'zod';

export const registrationSchema = z.object({
  username: z.string().trim().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/),
  email: z.string().trim().toLowerCase().email().max(255),
  password: z.string().min(12).max(128)
    .regex(/[a-z]/, 'Password must include a lowercase letter.')
    .regex(/[A-Z]/, 'Password must include an uppercase letter.')
    .regex(/[0-9]/, 'Password must include a number.')
    .regex(/[^a-zA-Z0-9]/, 'Password must include a symbol.'),
  displayName: z.string().trim().min(1).max(80).optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  password: z.string().min(1).max(128),
});

export const profileSchema = z.object({
  displayName: z.string().trim().min(1).max(80),
});

export const storySchema = z.object({
  title: z.string().trim().min(1).max(180),
  content: z.string().trim().min(1).max(50_000),
});

export const storyPatchSchema = storySchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'Provide a title or content to update.',
);

export const contributorSchema = z.object({
  storyId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive().optional(),
  email: z.string().trim().toLowerCase().email().optional(),
}).refine((value) => value.userId !== undefined || value.email !== undefined, 'Provide a userId or email.');

export const commentSchema = z.object({
  content: z.string().trim().min(1).max(5_000),
});