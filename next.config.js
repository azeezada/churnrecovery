/**
 * Next.js config — static export for Cloudflare Pages deployment.
 *
 * Marketing pages are statically exported to ./out for Cloudflare Pages.
 * API routes are handled by the Cloudflare Worker (workers-site/index.js + D1).
 * Dashboard API routes (server/api/) use better-sqlite3 for local dev only.
 */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig
