import { getPostSlugs, getPostBySlugWithHtml, getReadingTime } from '../../lib/posts'
import { postSchemas } from '../../lib/post-schemas'
import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

export default function Post({ post, readingTime }) {
  if (!post) return <div style={{ padding: '80px', textAlign: 'center' }}>Post not found</div>

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
            font-family: ${t.fontSans};
            color: ${t.text};
            letter-spacing: -0.02em;
            line-height: 1.2;
            margin-top: 2em;
            margin-bottom: 0.6em;
          }
          .article-prose h1 { font-size: 2rem; font-weight: 700; }
          .article-prose h2 { font-size: 1.5rem; font-weight: 700; }
          .article-prose h3 { font-size: 1.2rem; font-weight: 600; }
          .article-prose p {
            font-family: ${t.fontSerif};
            font-size: 1.05rem;
            color: #333;
            line-height: 1.75;
            margin-bottom: 1.4em;
          }
          .article-prose ul, .article-prose ol {
            font-family: ${t.fontSerif};
            font-size: 1rem;
            color: #333;
            line-height: 1.7;
            padding-left: 1.5em;
            margin-bottom: 1.4em;
          }
          .article-prose li { margin-bottom: 0.4em; }
          .article-prose strong { color: ${t.text}; font-weight: 700; }
          .article-prose em { font-style: italic; }
          .article-prose a {
            color: ${t.accent};
            text-decoration: underline;
            text-decoration-color: ${t.accent}60;
          }
          .article-prose a:hover { text-decoration-color: ${t.accent}; }
          .article-prose blockquote {
            border-left: 3px solid ${t.accent};
            padding: 12px 24px;
            margin: 1.5em 0;
            background: #fff;
            border-radius: 0 8px 8px 0;
          }
          .article-prose blockquote p {
            font-size: 1rem;
            color: ${t.gray};
            margin: 0;
          }
          .article-prose code {
            font-family: "SF Mono", "Fira Code", monospace;
            font-size: 0.875em;
            background: #F0EDE8;
            padding: 2px 6px;
            border-radius: 4px;
            color: ${t.accent};
          }
          .article-prose pre {
            background: ${t.text};
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
            border-top: 1px solid ${t.border};
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
            font-family: ${t.fontSans};
            font-size: 0.9rem;
          }
          .article-prose th {
            background: #F0EDE8;
            padding: 10px 14px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid ${t.border};
          }
          .article-prose td {
            padding: 10px 14px;
            border-bottom: 1px solid ${t.border};
          }
          @media (max-width: 768px) {
            .article-prose h1 { font-size: 1.6rem; }
            .article-prose h2 { font-size: 1.3rem; }
            .article-prose p, .article-prose ul, .article-prose ol { font-size: 0.98rem; }
          }
        `}</style>
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh' }}>
        {/* Nav */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: `${t.bg}EE`,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${t.border}`,
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 24px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: t.fontSans,
                fontSize: '1.1rem',
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.02em',
              }}>ChurnRecovery</span>
            </Link>
            <Link href="/blog" style={{
              fontFamily: t.fontSans,
              fontSize: '0.9rem',
              color: t.accent,
              textDecoration: 'none',
              fontWeight: 500,
            }}>← All posts</Link>
          </div>
        </nav>

        {/* Article header */}
        <header style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '64px 24px 40px',
        }}>
          {/* Tags */}
          {meta.tags && meta.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {meta.tags.map(tag => (
                <Link key={tag} href={`/blog?tag=${tag}`} style={{ textDecoration: 'none' }}>
                  <span style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: t.accent,
                    background: `${t.accent}18`,
                    padding: '4px 12px',
                    borderRadius: '100px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}>{tag}</span>
                </Link>
              ))}
            </div>
          )}

          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.03em',
            margin: '0 0 20px 0',
            lineHeight: 1.1,
          }}>{meta.title}</h1>

          {meta.excerpt && (
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1.1rem',
              color: t.gray,
              margin: '0 0 24px 0',
              lineHeight: 1.65,
            }}>{meta.excerpt}</p>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            paddingTop: '20px',
            borderTop: `1px solid ${t.border}`,
          }}>
            {meta.date && (
              <span style={{
                fontFamily: t.fontSans,
                fontSize: '0.85rem',
                color: t.grayLight,
              }}>
                {new Date(meta.date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            )}
            {readingTime && (
              <>
                <span style={{ color: t.border }}>·</span>
                <span style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.85rem',
                  color: t.grayLight,
                }}>{readingTime}</span>
              </>
            )}
          </div>
        </header>

        {/* Divider */}
        <div style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          <hr style={{ border: 'none', borderTop: `1px solid ${t.border}`, margin: 0 }} />
        </div>

        {/* Article body */}
        <main style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '48px 24px 80px',
        }}>
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </main>

        {/* Footer nav */}
        <div style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 24px 80px',
          borderTop: `1px solid ${t.border}`,
          paddingTop: '40px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <Link href="/blog" style={{
              fontFamily: t.fontSans,
              fontSize: '0.9rem',
              color: t.accent,
              textDecoration: 'none',
              fontWeight: 500,
            }}>← Back to all posts</Link>
            <Link href="/" style={{
              fontFamily: t.fontSans,
              fontSize: '0.9rem',
              color: t.gray,
              textDecoration: 'none',
            }}>ChurnRecovery →</Link>
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
