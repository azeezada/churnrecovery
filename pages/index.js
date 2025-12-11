import Link from 'next/link'
import Head from 'next/head'
import {getAllPosts} from '../lib/posts'

export default function Home({posts}){
  return (
    <>
      <Head>
        <title>Churn Recovery — Engineering Blog</title>
        <meta name="description" content="Insights and best practices on customer retention and churn recovery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container">
        <h1 className="site-title">Churn Recovery</h1>
        <p className="site-description">Insights and best practices on customer retention and churn recovery</p>

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
    </>
  )
}

export async function getStaticProps(){
  const posts = getAllPosts()
  return {props:{posts}}
}
