# Fable Commons

A collaborative storytelling app monorepo with a React and TypeScript client, an Express and TypeScript API, PostgreSQL persistence, Redux Toolkit state, and shared contracts in `types/`.

## Requirements

- Node.js 20 or newer
- PostgreSQL 14 or newer

## Local Setup

Create a PostgreSQL database named `fable_commons`, then copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL`, `JWT_SECRET`, `REFRESH_SECRET`, and `FRONTEND_URL`. Use different, randomly generated JWT secrets of at least 32 characters. The `.env` file is ignored by Git.

```sh
npm install
npm run migrate
npm run dev
```

The API runs at `http://localhost:4000`; Vite serves the frontend at `http://localhost:5173`. Vite proxies `/api` and `/socket.io` to the local API. For a deployed frontend, copy `frontend/.env.example` to `frontend/.env.local` and set the deployed API base:

```env
VITE_API_URL=http://localhost:4000/api
```

Run production builds and backend validation tests with:

```sh
npm run build
npm test
```

## Project Layout

- `backend/src/routes`: Express route registration
- `backend/src/controllers`: request validation and responses
- `backend/src/models`: PostgreSQL queries and entity operations
- `backend/src/db`: shared connection pool and schema migration
- `backend/src/middleware`: authentication and story authorization
- `frontend/src/features`: Redux authentication state
- `frontend/src/services`: RTK Query endpoints and refresh/retry base query
- `frontend/src/pages`: sign-in, sign-up, story feed, story viewer, and profile
- `types/src`: shared user, story, contributor, comment, and API contracts

## API

All paths are under `/api`. Protected requests send `Authorization: Bearer <accessToken>`; refresh tokens are only sent in an HTTP-only cookie.

| Method | Route | Behavior |
| --- | --- | --- |
| `GET` | `/health` | Health check |
| `POST` | `/auth/register` | Validate and create an account; automatically sign in |
| `POST` | `/auth/login` | Verify email and password; return an access token |
| `POST` | `/auth/refresh` | Rotate the refresh session and issue a new access token |
| `POST` | `/auth/logout` | Revoke the current refresh session |
| `POST` | `/auth/logout-all` | Revoke every refresh session for the current user |
| `GET` / `PATCH` | `/auth/me` | Read or update the signed-in profile |
| `GET` | `/stories?own=true` | List all stories, or only stories in the user's circle |
| `GET` | `/stories/:id` | Read a story |
| `POST` | `/stories` | Create a story |
| `PATCH` / `DELETE` | `/stories/:id` | Edit as author/contributor; delete as author only |
| `GET` | `/stories/:storyId/contributors` | List collaborators |
| `POST` | `/contributors` | Add a collaborator by email or user ID; author only |
| `GET` | `/contributors/:storyId` | List collaborators for a story |
| `DELETE` | `/contributors/:id` | Remove a collaborator; author only |
| `GET` | `/stories/:storyId/revisions` | List saved versions |
| `POST` | `/stories/:storyId/revisions/:revisionId/restore` | Restore a version as author/contributor |
| `GET` / `POST` | `/stories/:storyId/comments` | Read or add story comments |
| `DELETE` | `/comments/:id` | Delete your own comment or, as author, any comment on your story |

Registration JSON: `{ "username": "writer", "email": "writer@example.com", "password": "Strong-Passphrase-42!", "displayName": "Writer" }`. Passwords must be at least 12 characters with lowercase, uppercase, numeric, and symbol characters. Story writes and profile updates are validated on the server; database queries use parameters.

## Authentication Notes

Access tokens live only in Redux memory and are attached as bearer tokens. On a 401, RTK Query calls the refresh route with credentials, updates Redux, and retries the failed request. A refresh token is stored only in an HTTP-only cookie. Refresh-token hashes are stored in PostgreSQL; rotation is transactional, replay revokes the session, and logout can revoke one or all sessions. Cookies are `Secure` and `SameSite=None` in production to support a separately hosted Render frontend; use HTTPS and keep `FRONTEND_URL` restricted to the exact frontend origin.

Story creation, edits, comments, contributor changes, deletion, and version restores emit authenticated Socket.IO updates. Clients join the shared shelf and current-story rooms; other open clients invalidate RTK Query caches and reload the latest server state. A revision snapshot is stored transactionally before each edit, and restoring a prior version creates another snapshot first.

## Render Deployment

Deploy PostgreSQL, the API, and the frontend as separate Render services. The monorepo root directory for each service is `WEEK 10/day 5`.

1. Create a Render PostgreSQL database. Copy its **internal** connection string into the API service's `DATABASE_URL`.
2. Create a Node web service for the backend. Build command: `npm install && npm run build --workspace @story/types && npm run build --workspace @story/backend`. Start command: `npm run start --workspace @story/backend`. Add `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET`, `REFRESH_SECRET`, and the deployed frontend origin as `FRONTEND_URL`.
3. Run the schema migration against the production database with `npm run migrate --workspace @story/backend` before the first deploy and after schema changes.
4. Create a Render Static Site for the frontend. Build command: `npm install && npm run build --workspace @story/types && npm run build --workspace @story/frontend`. Publish directory: `frontend/dist`. Set `VITE_API_URL` to the deployed backend URL ending in `/api`.
5. Set `FRONTEND_URL` to the deployed static-site origin, redeploy the API, then test sign-up, refresh after reload, story creation, contributor permissions, and logout.

Use Render's HTTPS URLs, never expose database credentials or JWT secrets in frontend variables, and do not commit `.env` files. Live synchronization refreshes server state after edits; it does not merge simultaneous keystrokes or provide cursor presence. Email confirmation and password recovery are follow-on exercises.