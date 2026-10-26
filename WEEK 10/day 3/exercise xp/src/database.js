import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

export function createDatabase(databasePath = './data/auth.sqlite') {
  const resolvedPath = databasePath === ':memory:' ? databasePath : resolve(databasePath);
  if (resolvedPath !== ':memory:') mkdirSync(dirname(resolvedPath), { recursive: true });

  const database = new DatabaseSync(resolvedPath);
  database.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL COLLATE NOCASE UNIQUE,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS refresh_sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      revoked_at INTEGER
    );

    CREATE INDEX IF NOT EXISTS refresh_sessions_user_id_idx
      ON refresh_sessions(user_id);
  `);

  return {
    database,
    findUserByUsername: database.prepare('SELECT * FROM users WHERE username = ?'),
    findUserById: database.prepare('SELECT id, username, display_name FROM users WHERE id = ?'),
    insertUser: database.prepare(
      'INSERT INTO users (username, password_hash, display_name, created_at) VALUES (?, ?, ?, ?)',
    ),
    updateDisplayName: database.prepare('UPDATE users SET display_name = ? WHERE id = ?'),
    insertSession: database.prepare(
      'INSERT INTO refresh_sessions (id, user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?, ?)',
    ),
    findActiveSession: database.prepare(
      'SELECT * FROM refresh_sessions WHERE id = ? AND revoked_at IS NULL',
    ),
    rotateSession: database.prepare(
      'UPDATE refresh_sessions SET token_hash = ?, expires_at = ? WHERE id = ? AND token_hash = ? AND revoked_at IS NULL',
    ),
    revokeSession: database.prepare(
      'UPDATE refresh_sessions SET revoked_at = ? WHERE id = ? AND revoked_at IS NULL',
    ),
    cleanOldSessions: database.prepare(
      'DELETE FROM refresh_sessions WHERE expires_at < ? OR revoked_at < ?',
    ),
    close: () => database.close(),
  };
}