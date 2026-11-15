/**
 * Prefixes a public asset path with the deployment base path.
 *
 * GitHub Pages project sites are served from /<repo>/, so every file in
 * /public needs that prefix at build time. When NEXT_PUBLIC_BASE_PATH is
 * empty (local dev, custom domain) the path is returned untouched.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function asset(path) {
  return `${basePath}${path}`;
}
