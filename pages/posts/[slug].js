import { getPostSlugs, getPostBySlugWithHtml } from '../../lib/posts'
import Head from 'next/head'
import Link from 'next/link'

export default function Post({ post }) {
  if (!post) return <div className="container">Post not found</div>
  
  return (
    <>
      <Head>
        <title>{post.meta.title} — Churn Recovery</title>
        <meta name="description" content={post.meta.excerpt || post.meta.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        
        {/* Navigation */}
        <div style={{ marginBottom: '48px' }}>
          <Link href="/" style={{ 
             color: 'var(--color-anthropic-gray)', 
             textDecoration: 'none', 
             fontFamily: 'var(--font-sans)',
             fontSize: '0.9rem' 
          }}>
            ← Back to all posts
          </Link>
        </div>

        {/* TITLE SECTION (Matches Hero Grid) */}
        <div className="hero-wrapper" style={{ marginBottom: '48px' }}>
          {/* Left Column: Empty (to push Title to the right) */}
          <div aria-hidden="true" className="desktop-only-spacer" /> 
          
          {/* Right Column: Massive Title */}
          <div>
            <h1 className="site-title" style={{ fontSize: '3.5rem' }}>
              {post.meta.title}
            </h1>
          </div>
        </div>

        <hr className="divider" />

        {/* CONTENT SECTION (Matches Content Grid) */}
        <div className="content-grid">
          
          {/* Left Column: Date */}
          <div className="meta-date">
            Published<br />
            {post.meta.date}
          </div>

          {/* Right Column: The Article */}
          {/* We wrap dangerouslySetInnerHTML to apply article-body styles */}
          <article 
            className="article-body" 
            dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
          />
          
        </div>

      </main>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getPostSlugs().map(f => f.replace(/\.md$/, ''))
  return { paths: slugs.map(s => ({ params: { slug: s } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlugWithHtml(params.slug)
  return { props: { post } }
}