import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllCompetitorSlugs } from '../lib/comparisons.js'

const siteUrl = 'https://churnrecovery.com'
const outDir = path.join(process.cwd(), 'public')
const postsDir = path.join(process.cwd(), 'src', 'posts')

// Static pages with priorities
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/features', priority: '0.9', changefreq: 'monthly' },
  { path: '/docs', priority: '0.9', changefreq: 'monthly' },
  { path: '/demo', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/templates', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/churn-calculator', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources/churn-recovery-playbook', priority: '0.8', changefreq: 'monthly' },
  { path: '/styles', priority: '0.3', changefreq: 'monthly' },
  { path: '/styles/developer', priority: '0.3', changefreq: 'monthly' },
  { path: '/styles/warm-saas', priority: '0.3', changefreq: 'monthly' },
  { path: '/styles/data-forward', priority: '0.3', changefreq: 'monthly' },
  { path: '/app/sign-in', priority: '0.5', changefreq: 'monthly' },
  { path: '/app/sign-up', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases', priority: '0.9', changefreq: 'monthly' },
  { path: '/changelog', priority: '0.7', changefreq: 'weekly' },
]

// Comparison pages
const competitors = getAllCompetitorSlugs()
const comparisonPages = competitors.flatMap(c => [
  { path: `/compare/${c}`, priority: '0.7', changefreq: 'monthly' },
  { path: `/alternatives/${c}`, priority: '0.7', changefreq: 'monthly' },
])

// Template pages
const templateSlugs = ['saas-standard', 'high-ticket', 'freemium-upgrade', 'feedback-first', 'ecommerce-subscription', 'aggressive-save']
const templatePages = templateSlugs.map(slug => ({
  path: `/templates/${slug}`, priority: '0.7', changefreq: 'monthly',
}))

// Use case pages
const useCaseSlugs = ['b2b-saas', 'developer-tools', 'media-subscriptions', 'ecommerce-subscriptions', 'professional-services', 'fintech']
const useCasePages = useCaseSlugs.map(slug => ({
  path: `/use-cases/${slug}`, priority: '0.8', changefreq: 'monthly',
}))

// Platform-specific landing pages (/for/*)
const forPageSlugs = [
  'kajabi', 'teachable', 'ghost', 'convertkit', 'substack',
  'beehiiv', 'memberful', 'stan-store', 'payhip', 'podia',
  'thinkific', 'circle', 'patreon', 'wix', 'wordpress',
]
const forPages = forPageSlugs.map(slug => ({
  path: `/for/${slug}`, priority: '0.8', changefreq: 'monthly',
}))

// Blog posts
function getBlogPages() {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files.map(filename => {
    const content = fs.readFileSync(path.join(postsDir, filename), 'utf8')
    const { data } = matter(content)
    const slug = filename.replace(/\.md$/, '')
    return {
      path: `/posts/${slug}`,
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: data.date ? new Date(data.date).toISOString().split('T')[0] : undefined,
    }
  })
}

const today = new Date().toISOString().split('T')[0]

const allPages = [
  ...staticPages,
  ...comparisonPages,
  ...templatePages,
  ...useCasePages,
  ...forPages,
  ...getBlogPages(),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)
console.log(`✓ Generated sitemap.xml with ${allPages.length} URLs`)
