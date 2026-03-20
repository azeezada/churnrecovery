/**
 * Next.js config — hybrid mode (SSR + static)
 * Removed output: 'export' to enable API routes and server-side auth
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
