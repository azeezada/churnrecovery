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
  // simple sort by date desc if date field exists
  posts.sort((a, b) => {
    if (a.date && b.date) return new Date(b.date) - new Date(a.date)
    return 0
  })
  return posts
}
