/**
 * Next.js config — static export for Cloudflare Pages deployment.
 *
 * output: 'export' generates the `out/` directory that gets deployed.
 * API routes are handled by Cloudflare Pages Functions in `functions/api/`.
 * Auth middleware is a passthrough (Clerk uses placeholder keys for now).
 * Dashboard pages are client-side rendered — static HTML shells that hydrate.
 */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig
