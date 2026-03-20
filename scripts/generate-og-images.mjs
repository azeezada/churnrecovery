import fs from 'fs'
import path from 'path'

const outDir = path.join(process.cwd(), 'public', 'og')

// Create og directory
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

// Generate SVG-based OG images (these work as OG images since most platforms render SVGs,
// but we also provide a fallback PNG-like approach with inline SVG data)
const pages = [
  { slug: 'default', title: 'ChurnRecovery', subtitle: 'Stop losing customers. Free forever.' },
  { slug: 'features', title: 'Features', subtitle: 'Everything you need to stop churn' },
  { slug: 'docs', title: 'Developer Docs', subtitle: 'Integrate in under 10 minutes' },
  { slug: 'demo', title: 'Interactive Demo', subtitle: 'See the cancel flow in action' },
  { slug: 'templates', title: 'Cancel Flow Templates', subtitle: 'Ready-to-use retention flows' },
  { slug: 'calculator', title: 'Churn Calculator', subtitle: 'Calculate your revenue at risk' },
  { slug: 'blog', title: 'Blog', subtitle: 'SaaS churn reduction insights' },
  { slug: 'compare', title: 'Compare', subtitle: 'ChurnRecovery vs competitors' },
]

pages.forEach(page => {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#191919;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2A2A2A;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="580" width="1200" height="50" fill="#D97757"/>
  <text x="80" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="800" fill="#FFFFFF" letter-spacing="-2">${page.title}</text>
  <text x="80" y="270" font-family="Georgia, serif" font-size="28" fill="rgba(255,255,255,0.6)">${page.subtitle}</text>
  <text x="80" y="540" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#D97757">churnrecovery.com</text>
  <text x="1120" y="540" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="rgba(255,255,255,0.4)" text-anchor="end">Free forever</text>
</svg>`

  fs.writeFileSync(path.join(outDir, `${page.slug}.svg`), svg)
})

console.log(`✓ Generated ${pages.length} OG images`)
