/**
 * Minimal Next.js config for static export
 */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
