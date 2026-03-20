import { getPostSlugs, getPostBySlugWithHtml, getAllPosts, getReadingTime } from '../../lib/posts'
import Head from 'next/head'
import Link from 'next/link'

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

export default function Post({ post, readingTime, relatedPosts }) {
  if (!post) return <div className="container">Post not found</div>

  const formattedDate = post.meta.date
    ? new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <>
      <Head>
        <title>{post.meta.title} — ChurnRecovery</title>
        <meta name="description" content={post.meta.excerpt || post.meta.title} />
        <meta property="og:title" content={`${post.meta.title} — ChurnRecovery`} />
        <meta property="og:description" content={post.meta.excerpt || post.meta.title} />
        <meta property="og:url" content={`https://churnrecovery.com/posts/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.meta.title} />
        <meta name="twitter:description" content={post.meta.excerpt || post.meta.title} />
        {post.meta.date && <meta property="article:published_time" content={new Date(post.meta.date).toISOString()} />}
        {post.meta.tags && post.meta.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://churnrecovery.com/posts/${post.slug}`} />
      </Head>

      <article style={{ background: t.bg, paddingTop: '100px' }}>
        <div style={{
          maxWidth: '740px',
          margin: '0 auto',
          padding: '64px 24px 40px',
        }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '40px' }}>
            <Link href="/blog" style={{
              fontFamily: t.fontSans,
              fontSize: '0.85rem',
              color: t.gray,
              textDecoration: 'none',
            }}>
              ← Blog
            </Link>
          </nav>

          {/* Tags */}
          {post.meta.tags && post.meta.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {post.meta.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: t.accent,
                  background: `${t.accent}18`,
                  padding: '4px 10px',
                  borderRadius: '100px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>{tag}</span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 600,
            color: t.text,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: '0 0 16px 0',
          }}>
            {post.meta.title}
          </h1>

          {/* Excerpt */}
          {post.meta.excerpt && (
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '1.15rem',
              color: t.gray,
              margin: '0 0 24px 0',
              lineHeight: 1.5,
            }}>
              {post.meta.excerpt}
            </p>
          )}

          {/* Meta line */}
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            fontFamily: t.fontSans,
            fontSize: '0.85rem',
            color: t.grayLight,
            paddingBottom: '32px',
            borderBottom: `1px solid ${t.border}`,
            marginBottom: '40px',
          }}>
            {formattedDate && <time>{formattedDate}</time>}
            {readingTime && <span>· {readingTime}</span>}
          </div>

          {/* Article body */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            style={{
              fontFamily: t.fontSerif,
              fontSize: '1.1rem',
              color: t.text,
              lineHeight: 1.75,
            }}
          />
        </div>

        {/* Related posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div style={{
            maxWidth: '740px',
            margin: '0 auto',
            padding: '0 24px 80px',
          }}>
            <div style={{
              borderTop: `1px solid ${t.border}`,
              paddingTop: '40px',
              marginTop: '48px',
            }}>
              <h3 style={{
                fontFamily: t.fontSans,
                fontSize: '1rem',
                fontWeight: 600,
                color: t.text,
                margin: '0 0 24px 0',
                letterSpacing: '-0.01em',
              }}>Continue reading</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {relatedPosts.map(rp => (
                  <Link
                    key={rp.slug}
                    href={`/posts/${rp.slug}`}
                    style={{
                      display: 'block',
                      padding: '20px',
                      background: t.white,
                      border: `1px solid ${t.border}`,
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{
                      fontFamily: t.fontSans,
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: t.text,
                      marginBottom: '4px',
                    }}>{rp.title}</div>
                    {rp.excerpt && (
                      <div style={{
                        fontFamily: t.fontSerif,
                        fontSize: '0.85rem',
                        color: t.gray,
                        lineHeight: 1.5,
                      }}>{rp.excerpt}</div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getPostSlugs().map(f => f.replace(/\.md$/, ''))
  return { paths: slugs.map(s => ({ params: { slug: s } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlugWithHtml(params.slug)
  const readingTime = getReadingTime(post.content)
  
  // Get related posts (other posts, excluding current)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 3)

  return { props: { post, readingTime, relatedPosts } }
}
