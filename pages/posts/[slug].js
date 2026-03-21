import { getPostSlugs, getPostBySlugWithHtml, getReadingTime } from '../../lib/posts'
import { postSchemas } from '../../lib/post-schemas'
import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export default function Post({ post, readingTime }) {
  if (!post) return <div className="p-20 text-center">Post not found</div>

  const { meta, contentHtml } = post
  const siteUrl = 'https://churnrecovery.com'
  const postUrl = `${siteUrl}/posts/${post.slug}`

  // Structured data schemas for this post (defined in lib/post-schemas.js)
  const schemaObjects = postSchemas[post.slug] || []

  return (
    <>
      <Head>
        <title>{meta.title} — ChurnRecovery Blog</title>
        <meta name="description" content={meta.excerpt || meta.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {schemaObjects.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {/* OG Tags */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.excerpt || ''} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:site_name" content="ChurnRecovery Blog" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.excerpt || ''} />
        {/* Article meta */}
        {meta.date && <meta property="article:published_time" content={meta.date} />}
        {meta.tags && meta.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={postUrl} />
        <link rel="alternate" type="application/rss+xml" title="ChurnRecovery Blog" href="/rss.xml" />
        <style>{`
          .article-prose h1, .article-prose h2, .article-prose h3, .article-prose h4 {
            font-family: "Instrument Sans", sans-serif;
            color: #191919;
            letter-spacing: -0.02em;
            line-height: 1.2;
            margin-top: 2em;
            margin-bottom: 0.6em;
          }
          .article-prose h1 { font-size: 2rem; font-weight: 700; }
          .article-prose h2 { font-size: 1.5rem; font-weight: 700; }
          .article-prose h3 { font-size: 1.2rem; font-weight: 600; }
          .article-prose p {
            font-family: "Merriweather", serif;
            font-size: 1.05rem;
            color: #333;
            line-height: 1.75;
            margin-bottom: 1.4em;
          }
          .article-prose ul, .article-prose ol {
            font-family: "Merriweather", serif;
            font-size: 1rem;
            color: #333;
            line-height: 1.7;
            padding-left: 1.5em;
            margin-bottom: 1.4em;
          }
          .article-prose li { margin-bottom: 0.4em; }
          .article-prose strong { color: #191919; font-weight: 700; }
          .article-prose em { font-style: italic; }
          .article-prose a {
            color: #D97757;
            text-decoration: underline;
            text-decoration-color: #D9775760;
          }
          .article-prose a:hover { text-decoration-color: #D97757; }
          .article-prose blockquote {
            border-left: 3px solid #D97757;
            padding: 12px 24px;
            margin: 1.5em 0;
            background: #fff;
            border-radius: 0 8px 8px 0;
          }
          .article-prose blockquote p {
            font-size: 1rem;
            color: #666666;
            margin: 0;
          }
          .article-prose code {
            font-family: "SF Mono", "Fira Code", monospace;
            font-size: 0.875em;
            background: #F0EDE8;
            padding: 2px 6px;
            border-radius: 4px;
            color: #D97757;
          }
          .article-prose pre {
            background: #191919;
            color: #E5E5E5;
            padding: 24px;
            border-radius: 10px;
            overflow-x: auto;
            margin-bottom: 1.4em;
          }
          .article-prose pre code {
            background: none;
            padding: 0;
            color: #E5E5E5;
            font-size: 0.9rem;
          }
          .article-prose hr {
            border: none;
            border-top: 1px solid #E5E5E5;
            margin: 2.5em 0;
          }
          .article-prose img {
            max-width: 100%;
            border-radius: 8px;
            margin: 1em 0;
          }
          .article-prose table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.4em;
            font-family: "Instrument Sans", sans-serif;
            font-size: 0.9rem;
          }
          .article-prose th {
            background: #F0EDE8;
            padding: 10px 14px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid #E5E5E5;
          }
          .article-prose td {
            padding: 10px 14px;
            border-bottom: 1px solid #E5E5E5;
          }
          @media (max-width: 768px) {
            .article-prose h1 { font-size: 1.6rem; }
            .article-prose h2 { font-size: 1.3rem; }
            .article-prose p, .article-prose ul, .article-prose ol { font-size: 0.98rem; }
          }
        `}</style>
      </Head>

      <div className="bg-brand-bg min-h-screen">
        {/* Nav */}
        <nav className="sticky top-0 z-[100] bg-[#FAF9F5EE] backdrop-blur-[12px] border-b border-brand-border">
          <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">
            <Link href="/" className="no-underline">
              <span className="font-sans text-[1.1rem] font-bold text-brand-text tracking-[-0.02em]">ChurnRecovery</span>
            </Link>
            <Link href="/blog" className="font-sans text-[0.9rem] text-brand-accent no-underline font-medium">← All posts</Link>
          </div>
        </nav>

        {/* Article header */}
        <header className="max-w-[720px] mx-auto px-6 pt-16 pb-10">
          {/* Tags */}
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-5">
              {meta.tags.map(tag => (
                <Link key={tag} href={`/blog?tag=${tag}`} className="no-underline">
                  <span className="font-sans text-[0.75rem] font-bold text-brand-accent bg-[#D9775718] px-3 py-1 rounded-[100px] tracking-[0.05em] uppercase cursor-pointer">{tag}</span>
                </Link>
              ))}
            </div>
          )}

          <h1 className="font-sans font-bold text-brand-text tracking-[-0.03em] mb-5 leading-[1.1] text-[clamp(1.8rem,4vw,3rem)]">{meta.title}</h1>

          {meta.excerpt && (
            <p className="font-serif text-[1.1rem] text-brand-gray mb-6 leading-[1.65]">{meta.excerpt}</p>
          )}

          <div className="flex items-center gap-3 flex-wrap pt-5 border-t border-brand-border">
            {meta.date && (
              <span className="font-sans text-[0.85rem] text-brand-gray-light">
                {new Date(meta.date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            )}
            {readingTime && (
              <>
                <span className="text-brand-border">·</span>
                <span className="font-sans text-[0.85rem] text-brand-gray-light">{readingTime}</span>
              </>
            )}
          </div>
        </header>

        {/* Divider */}
        <div className="max-w-[720px] mx-auto px-6">
          <hr className="border-none border-t border-brand-border m-0" />
        </div>

        {/* Article body */}
        <main className="max-w-[720px] mx-auto px-6 pt-12 pb-20">
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </main>

        {/* Footer nav */}
        <div className="max-w-[720px] mx-auto px-6 pb-20 border-t border-brand-border pt-10">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <Link href="/blog" className="font-sans text-[0.9rem] text-brand-accent no-underline font-medium">← Back to all posts</Link>
            <Link href="/" className="font-sans text-[0.9rem] text-brand-gray no-underline">ChurnRecovery →</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getPostSlugs().map(f => f.replace(/\.md$/, ''))
  return { paths: slugs.map(s => ({ params: { slug: s } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlugWithHtml(params.slug)

  let readingTime = null
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts')
    const content = fs.readFileSync(path.join(postsDirectory, `${params.slug}.md`), 'utf8')
    readingTime = getReadingTime(content)
  } catch {}

  return { props: { post, readingTime } }
}
