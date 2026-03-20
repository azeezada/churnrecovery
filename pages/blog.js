import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAllPosts, getAllTags, getReadingTime } from '../lib/posts'
import fs from 'fs'
import path from 'path'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentHover: '#C4603D',
  border: '#E5E5E5',
  white: '#FFFFFF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const POSTS_PER_PAGE = 6

function TagPill({ tag, active, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-block',
        fontFamily: t.fontSans,
        fontSize: '0.8rem',
        fontWeight: 500,
        color: active ? '#fff' : t.gray,
        background: active ? t.accent : t.white,
        border: `1px solid ${active ? t.accent : t.border}`,
        padding: '5px 14px',
        borderRadius: '100px',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}>{tag}</span>
  )
}

function PostCard({ post, readingTime, featured }) {
  return (
    <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article style={{
        background: t.white,
        border: `1px solid ${t.border}`,
        borderRadius: '12px',
        padding: featured ? '36px' : '28px',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: t.fontSans,
                fontSize: '0.72rem',
                fontWeight: 600,
                color: t.accent,
                background: `${t.accent}15`,
                padding: '3px 10px',
                borderRadius: '100px',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
              }}>{tag}</span>
            ))}
          </div>
        )}

        <h2 style={{
          fontFamily: t.fontSans,
          fontSize: featured ? '1.6rem' : '1.2rem',
          fontWeight: 700,
          color: t.text,
          letterSpacing: '-0.02em',
          margin: '0 0 12px 0',
          lineHeight: 1.25,
        }}>{post.title}</h2>

        {post.excerpt && (
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '0.92rem',
            color: t.gray,
            margin: '0 0 20px 0',
            lineHeight: 1.65,
          }}>{post.excerpt}</p>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          {post.date && (
            <span style={{
              fontFamily: t.fontSans,
              fontSize: '0.8rem',
              color: t.grayLight,
            }}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          )}
          {readingTime && (
            <>
              <span style={{ color: t.border }}>·</span>
              <span style={{
                fontFamily: t.fontSans,
                fontSize: '0.8rem',
                color: t.grayLight,
              }}>{readingTime}</span>
            </>
          )}
          <span style={{
            fontFamily: t.fontSans,
            fontSize: '0.85rem',
            color: t.accent,
            fontWeight: 500,
            marginLeft: 'auto',
          }}>Read →</span>
        </div>
      </article>
    </Link>
  )
}

export default function Blog({ posts: allPosts, tags }) {
  const router = useRouter()
  const [activeTag, setActiveTag] = useState(null)

  // Read tag from URL query param (client-side, for static export compatibility)
  useEffect(() => {
    const tag = router.query.tag || null
    setActiveTag(tag)
  }, [router.query.tag])

  // Filter posts by active tag
  const posts = activeTag
    ? allPosts.filter(p => p.tags && p.tags.includes(activeTag))
    : allPosts

  const currentTag = activeTag
  const title = currentTag
    ? `#${currentTag} — ChurnRecovery Blog`
    : 'Blog — ChurnRecovery'
  const description = 'Insights on churn recovery, subscription retention, payment failure management, and SaaS growth strategies.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://churnrecovery.com/blog" />
        <link rel="alternate" type="application/rss+xml" title="ChurnRecovery Blog" href="/rss.xml" />
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
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link href="/blog" style={{
                fontFamily: t.fontSans,
                fontSize: '0.9rem',
                color: t.accent,
                textDecoration: 'none',
                fontWeight: 600,
              }}>Blog</Link>
              <Link href="/" style={{
                fontFamily: t.fontSans,
                fontSize: '0.9rem',
                color: t.gray,
                textDecoration: 'none',
              }}>Home</Link>
              <Link href="/rss.xml" style={{
                fontFamily: t.fontSans,
                fontSize: '0.85rem',
                color: t.gray,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span>RSS</span>
                <span style={{ fontSize: '0.8em' }}>🔗</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '64px 24px 40px',
          }}>
            <span style={{
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              fontWeight: 700,
              color: t.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '12px',
            }}>The ChurnRecovery Blog</span>
            <h1 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              margin: '0 0 16px 0',
              lineHeight: 1.1,
            }}>
              {currentTag ? `Posts tagged #${currentTag}` : 'Insights on churn recovery'}
            </h1>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1.05rem',
              color: t.gray,
              margin: '0 0 36px 0',
              maxWidth: '560px',
              lineHeight: 1.65,
            }}>
              Practical guides on reducing churn, recovering failed payments, and building
              retention systems that actually work.
            </p>

            {/* Tags filter */}
            {tags.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <TagPill
                  tag="All posts"
                  active={!currentTag}
                  onClick={() => router.push('/blog', undefined, { shallow: true })}
                />
                {tags.map(tag => (
                  <TagPill
                    key={tag}
                    tag={`#${tag}`}
                    active={currentTag === tag}
                    onClick={() => router.push(`/blog?tag=${tag}`, undefined, { shallow: true })}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Posts */}
        <section>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 24px 80px',
          }}>
            {posts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 24px',
                color: t.gray,
                fontFamily: t.fontSans,
              }}>
                No posts found{currentTag ? ` for #${currentTag}` : ''}.
              </div>
            ) : (
              <>
                {/* Featured post (first) */}
                {posts[0] && (
                  <div style={{ marginBottom: '24px' }}>
                    <PostCard post={posts[0]} featured={true} />
                  </div>
                )}

                {/* Grid for remaining */}
                {posts.length > 1 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                  }}>
                    {posts.slice(1).map(post => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                )}

                {/* Static export: no pagination needed for current post count */}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts')
  const allPosts = getAllPosts()
  const allTags = getAllTags()

  // Read content for reading time estimates
  const postsWithReadTime = allPosts.map(post => {
    try {
      const fullPath = path.join(postsDirectory, `${post.slug}.md`)
      const content = fs.readFileSync(fullPath, 'utf8')
      return { ...post, readingTime: getReadingTime(content) }
    } catch {
      return post
    }
  })

  return {
    props: {
      posts: postsWithReadTime,
      tags: allTags,
    },
  }
}

// Note: Tag filtering happens client-side via URL params since this is a static export.
// The page reads window.location.search on mount for tag filtering.
