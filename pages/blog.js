import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAllPosts, getAllTags, getReadingTime } from '../lib/posts'
import fs from 'fs'
import path from 'path'

const POSTS_PER_PAGE = 6

function TagPill({ tag, active, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`inline-block font-sans text-[0.8rem] font-medium px-[14px] py-[5px] rounded-full cursor-pointer transition-all duration-150 ${active ? 'text-white bg-brand-accent border border-brand-accent' : 'text-brand-gray bg-brand-white border border-brand-border'}`}
    >{tag}</span>
  )
}

function PostCard({ post, readingTime, featured }) {
  return (
    <Link href={`/posts/${post.slug}`} className="no-underline text-inherit">
      <article className={`bg-brand-white border border-brand-border rounded-xl cursor-pointer transition-[box-shadow,transform] duration-200 ${featured ? 'p-9' : 'p-7'}`}
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
          <div className="flex gap-[6px] flex-wrap mb-[14px]">
            {post.tags.map(tag => (
              <span key={tag} className="font-sans text-[0.72rem] font-semibold text-brand-accent bg-[#D9775715] px-[10px] py-[3px] rounded-full tracking-[0.03em] uppercase">{tag}</span>
            ))}
          </div>
        )}

        <h2 className={`font-sans font-bold text-brand-text tracking-[-0.02em] mb-3 leading-[1.25] ${featured ? 'text-[1.6rem]' : 'text-[1.2rem]'}`}>{post.title}</h2>

        {post.excerpt && (
          <p className="font-serif text-[0.92rem] text-brand-gray mb-5 leading-[1.65]">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          {post.date && (
            <span className="font-sans text-[0.8rem] text-brand-gray-light">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          )}
          {readingTime && (
            <>
              <span className="text-brand-border">·</span>
              <span className="font-sans text-[0.8rem] text-brand-gray-light">{readingTime}</span>
            </>
          )}
          <span className="font-sans text-[0.85rem] text-brand-accent font-medium ml-auto">Read →</span>
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
    ? `${currentTag} — ChurnRecovery Blog`
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

      <div className="bg-brand-bg min-h-screen">
        {/* Nav */}
        <nav className="sticky top-0 z-[100] bg-[#FAF9F5EE] backdrop-blur-[12px] border-b border-brand-border">
          <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">
            <Link href="/" className="no-underline">
              <span className="font-sans text-[1.1rem] font-bold text-brand-text tracking-[-0.02em]">ChurnRecovery</span>
            </Link>
            <div className="flex gap-5 items-center">
              <Link href="/blog" className="font-sans text-[0.9rem] text-brand-accent no-underline font-semibold">Blog</Link>
              <Link href="/" className="font-sans text-[0.9rem] text-brand-gray no-underline">Home</Link>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section>
          <div className="max-w-[1100px] mx-auto pt-16 px-6 pb-10">
            <span className="font-sans text-[0.75rem] font-bold text-brand-accent tracking-[0.08em] uppercase block mb-3">The ChurnRecovery Blog</span>
            <h1 className="font-sans text-[clamp(2rem,4vw,3rem)] font-bold text-brand-text tracking-[-0.03em] mb-4 leading-[1.1]">
              {currentTag ? `${currentTag} posts` : 'Insights on churn recovery'}
            </h1>
            <p className="font-serif text-[1.05rem] text-brand-gray mb-9 max-w-[560px] leading-[1.65]">
              Practical guides on reducing churn, recovering failed payments, and building
              retention systems that actually work.
            </p>

            {/* Tags filter */}
            {tags.length > 0 && (
              <div className="flex gap-2 flex-wrap items-center">
                <TagPill
                  tag="All posts"
                  active={!currentTag}
                  onClick={() => router.push('/blog', undefined, { shallow: true })}
                />
                {tags.map(tag => (
                  <TagPill
                    key={tag}
                    tag={tag}
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
          <div className="max-w-[1100px] mx-auto px-6 pb-20">
            {posts.length === 0 ? (
              <div className="text-center py-20 px-6 text-brand-gray font-sans">
                No posts found{currentTag ? ` for ${currentTag}` : ''}.
              </div>
            ) : (
              <>
                {/* Featured post (first) */}
                {posts[0] && (
                  <div className="mb-6">
                    <PostCard post={posts[0]} featured={true} />
                  </div>
                )}

                {/* Grid for remaining */}
                {posts.length > 1 && (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
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
