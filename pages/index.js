import Link from 'next/link'
import {getAllPosts} from '../lib/posts'

export default function Home({posts}){
  return (
    <main className="container">
      <h1 className="site-title">Churn Recovery</h1>
      <p className="post-meta">A lightweight blog — minimal theme</p>

      <ul className="post-list">
        {posts.map(post => (
          <li className="post-item" key={post.slug}>
            <h2><Link href={`/posts/${post.slug}`}>{post.title}</Link></h2>
            {post.date && <div className="post-meta">{post.date}</div>}
            {post.excerpt && <p>{post.excerpt}</p>}
          </li>
        ))}
      </ul>
    </main>
  )
}

export async function getStaticProps(){
  const posts = getAllPosts()
  return {props:{posts}}
}
