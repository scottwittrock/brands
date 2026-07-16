/**
 * Resolves the public origin used to build absolute asset URLs.
 *
 * Priority:
 *   1. PUBLIC_BASE_URL            — explicit override (any environment)
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the stable production domain on Vercel
 *   3. http://localhost:3000      — local dev fallback
 *
 * Returns an origin with no trailing slash.
 */
export function getBaseUrl(): string {
  const explicit = process.env.PUBLIC_BASE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${stripTrailingSlash(vercel)}`;

  return "http://localhost:3000";
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}
