import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src', 'posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
}

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)
  return {slug: realSlug, meta: data, content}
}

export async function getPostBySlugWithHtml(slug) {
  const post = getPostBySlug(slug)
  const processed = await remark().use(html).process(post.content)
  const contentHtml = processed.toString()
  return {...post, contentHtml}
}

export function getAllPosts() {
  const slugs = getPostSlugs()
  const posts = slugs.map(filename => {
    const {meta} = getPostBySlug(filename)
    const slug = filename.replace(/\.md$/, '')
    return {slug, ...meta}
  })
  // sort by date desc
  posts.sort((a, b) => {
    if (a.date && b.date) return new Date(b.date) - new Date(a.date)
    return 0
  })
  return posts
}

/**
 * Get all unique tags across posts
 */
export function getAllTags() {
  const posts = getAllPosts()
  const tagSet = new Set()
  posts.forEach(p => {
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach(tag => tagSet.add(tag))
    }
  })
  return Array.from(tagSet).sort()
}

/**
 * Get posts filtered by tag
 */
export function getPostsByTag(tag) {
  return getAllPosts().filter(p => p.tags && p.tags.includes(tag))
}

/**
 * Estimate reading time from word count
 */
export function getReadingTime(content) {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 230)
  return `${minutes} min read`
}

/**
 * Generate RSS XML string
 */
export function generateRSSFeed() {
  const posts = getAllPosts()
  const siteUrl = 'https://churnrecovery.com'
  
  const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/posts/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : ''}</pubDate>
      ${post.tags ? post.tags.map(t => `<category>${t}</category>`).join('\n      ') : ''}
    </item>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
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
}
