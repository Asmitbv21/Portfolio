/**
 * The site is exported as static HTML so it can keep being hosted on
 * GitHub Pages (see .github/workflows/static.yml).
 *
 * NEXT_PUBLIC_BASE_PATH is only needed for GitHub Pages *project* sites,
 * where the site lives at https://<user>.github.io/<repo>/ — the workflow
 * sets it to "/<repo>". Local development leaves it empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    // Static export has no image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
