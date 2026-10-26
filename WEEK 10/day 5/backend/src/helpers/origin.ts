export function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return false;
  const configuredOrigin = process.env.FRONTEND_URL ?? 'http://localhost:5173';
  if (origin === configuredOrigin) return true;
  return process.env.NODE_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1):517\d$/.test(origin);
}