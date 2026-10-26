# JWT Authentication Exercise

A small Express API for learning JWT authentication, secure cookies, and refresh-token rotation. It uses a persistent SQLite database through Node's built-in `node:sqlite` module and requires Node.js 24 or newer.

## JWT In Brief

A JWT has three base64url-encoded parts: a header describing the signing algorithm, a payload containing claims, and a signature that lets the server detect changes. The payload is readable, not encrypted, so never put passwords or other secrets in it. This API uses short-lived access tokens to authenticate protected requests and longer-lived refresh tokens to renew sessions.

## Run It

```sh
npm install
npm run dev
```

The first `npm run dev` creates a local `.env` with two different random secrets. The `.env` file and SQLite database are excluded from Git. The server listens on `http://localhost:3000` by default.

Run the automated API tests with:

```sh
npm test
```

## Routes

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Check server status |
| `POST` | `/api/auth/register` | Public | Validate and create a user; start a session |
| `POST` | `/api/auth/login` | Public | Check credentials; start a session |
| `POST` | `/api/auth/refresh` | Refresh cookie | Rotate the refresh token and issue a new access token |
| `POST` | `/api/auth/logout` | Refresh cookie | Revoke the refresh session and clear cookies |
| `GET` | `/api/auth/me` | Access cookie | Return the signed-in user |
| `GET` | `/api/profile` | Access cookie | Read the user's profile |
| `PATCH` | `/api/profile` | Access cookie | Update the display name |

Registration and login accept JSON. Usernames must be 3–30 letters, numbers, underscores, or hyphens. Passwords must be at least 12 characters and include lowercase, uppercase, a number, and a symbol. The username is unique without regard to case.

```json
{
  "username": "recipe_user",
  "password": "Strong-Passphrase-42!",
  "displayName": "Recipe User"
}
```

Profile updates accept `{ "displayName": "A new name" }`. Authenticated routes read the `access_token` HTTP-only cookie; the refresh endpoint reads the `refresh_token` cookie. Cookies use `SameSite=Strict`, and production mode also enables `Secure` (serve the API over HTTPS in production).

## Implementation Notes

- Passwords are hashed with bcrypt. Login returns the same error for an unknown username and a wrong password.
- Access tokens expire after 15 minutes. Refresh tokens expire after 7 days and are rotated on each refresh.
- The database stores only a SHA-256 hash of each refresh token. Reusing an old token fails; logout revokes the active session in the database.
- Authentication endpoints are rate-limited. JSON request bodies are size-limited and Helmet sets common security headers.
- SQLite is built into Node 24, though Node may print an experimental-feature warning for `node:sqlite`.

## Further Exercises

- Add email confirmation with one-time, expiring confirmation tokens.
- Add a CSRF token if you change the cookie policy or allow cross-site clients.
- Add account recovery, password changes, and revocation of all sessions after a password change.
- Replace the local SQLite database with a managed database and add schema migrations.
- Add integration tests for throttling, expiry, invalid cookies, and concurrent refresh attempts.

JWT signatures do not encrypt their contents. Keep signing secrets private, use HTTPS, keep access tokens short-lived, validate authorization on every protected route, and review the deployment's cookie, CSRF, logging, and key-rotation policies.