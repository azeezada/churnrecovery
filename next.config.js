/**
 * Next.js config — hybrid rendering for ChurnRecovery app.
 *
 * Removed output: 'export' to enable API routes and server-side auth middleware.
 * Marketing pages still prerender as static HTML.
 * New app pages use client-side rendering with Clerk auth.
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig
