import Link from 'next/link'
import Head from 'next/head'
import { getAllPosts } from '../lib/posts'

// 1. The Missing "Brand Moment" - This SVG mimics the Anthropic abstract style
const HeroGraphic = () => (
  <svg 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="glyph-svg"
  >
    {/* Lavender Accent Block */}
    <rect x="20" y="100" width="60" height="60" fill="#C7C8D5" />
    
    {/* Strong Black Strokes */}
    <path d="M50 100 V40 C50 20 110 20 110 50 V100" stroke="#191919" strokeWidth="6" strokeLinecap="round" />
    <path d="M80 40 C80 30 110 30 110 40" stroke="#191919" strokeWidth="6" strokeLinecap="round" />
    <path d="M20 40 C20 10 140 10 140 50" stroke="#191919" strokeWidth="6" strokeLinecap="round" />
    
    {/* Nodes & Connectors */}
    <circle cx="160" cy="40" r="4" fill="#191919" />
    <circle cx="160" cy="80" r="4" fill="#191919" />
    <line x1="160" y1="40" x2="160" y2="80" stroke="#191919" strokeWidth="3" />
    
    {/* Bottom Details */}
    <rect x="140" y="100" width="40" height="40" stroke="#191919" strokeWidth="4" rx="2" />
  </svg>
)

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Churn Recovery — Engineering Blog</title>
        <meta name="description" content="Insights and best practices on customer retention and churn recovery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        {/* HERO SECTION: Strict Grid Layout */}
        <div className="hero-wrapper">
          
          {/* Left Column: The Art */}
          <div className="hero-art">
            <HeroGraphic />
          </div>

          {/* Right Column: The Content */}
          <div className="hero-content">
            <h1 className="site-title">Churn<br />Recovery</h1>
            <p className="lead-text">
              Insights and best practices on customer retention and churn recovery. 
              Direct tool calls consume context for each definition and result.
            </p>
          </div>
        </div>

        <hr className="divider" />

        {/* POST LIST */}
        <ul className="post-list">
          {posts.map(post => (
            <li className="post-item" key={post.slug}>
              {/* Date is strictly 150px wide */}
              <div className="post-date">
                {post.date || '2025-12-10'}
              </div>
              
              <div className="post-details">
                <h2>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h2>
                {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  return { props: { posts } }
}