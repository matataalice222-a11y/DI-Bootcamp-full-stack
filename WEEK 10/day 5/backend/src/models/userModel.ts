import type { Pool } from 'pg';
import type { User } from '@story/types';

interface UserRow {
  id: number;
  username: string;
  email: string;
  display_name: string;
  password_hash?: string;
}

export function toUser(row: UserRow): User {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    displayName: row.display_name,
  };
}

export async function findUserByEmail(pool: Pool, email: string): Promise<UserRow | undefined> {
  const result = await pool.query<UserRow & { password_hash: string }>(
    'SELECT id, username, email, display_name, password_hash FROM users WHERE email = $1',
    [email],
  );
  return result.rows[0];
}

export async function findUserById(pool: Pool, id: number): Promise<User | undefined> {
  const result = await pool.query<UserRow>(
    'SELECT id, username, email, display_name FROM users WHERE id = $1',
    [id],
  );
  return result.rows[0] ? toUser(result.rows[0]) : undefined;
}

export async function createUser(
  pool: Pool,
  input: { username: string; email: string; displayName: string; passwordHash: string },
): Promise<User> {
  const result = await pool.query<UserRow>(
    `INSERT INTO users (username, email, display_name, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username, email, display_name`,
    [input.username, input.email, input.displayName, input.passwordHash],
  );
  const user = result.rows[0];
  if (!user) throw new Error('Created user could not be loaded.');
  return toUser(user);
}

export async function updateDisplayName(pool: Pool, userId: number, displayName: string): Promise<User | undefined> {
  const result = await pool.query<UserRow>(
    `UPDATE users SET display_name = $1 WHERE id = $2
     RETURNING id, username, email, display_name`,
    [displayName, userId],
  );
  return result.rows[0] ? toUser(result.rows[0]) : undefined;
}

export async function findUserIdByEmail(pool: Pool, email: string): Promise<number | undefined> {
  const result = await pool.query<{ id: number }>('SELECT id FROM users WHERE email = $1', [email]);
  return result.rows[0]?.id;
}