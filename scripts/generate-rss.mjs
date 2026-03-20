import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'src', 'posts')
const outDir = path.join(process.cwd(), 'public')
const siteUrl = 'https://churnrecovery.com'

function getAllPosts() {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const posts = files.map(filename => {
    const content = fs.readFileSync(path.join(postsDir, filename), 'utf8')
    const { data } = matter(content)
    return { slug: filename.replace(/\.md$/, ''), ...data }
  })
  posts.sort((a, b) => {
    if (a.date && b.date) return new Date(b.date) - new Date(a.date)
    return 0
  })
  return posts
}

const posts = getAllPosts()

const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/posts/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : ''}</pubDate>
      ${post.tags ? post.tags.map(t => `<category>${t}</category>`).join('\n      ') : ''}
    </item>`).join('')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ChurnRecovery Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Insights on churn recovery, payment failures, and SaaS retention</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`

fs.writeFileSync(path.join(outDir, 'rss.xml'), rss)
console.log('✓ Generated rss.xml')
