import {getPostSlugs, getPostBySlugWithHtml} from '../../lib/posts'
import Head from 'next/head'
import Link from 'next/link'

export default function Post({post}){
  if(!post) return <div className="container">Post not found</div>
  return (
    <>
      <Head>
        <title>{post.meta.title} — Churn Recovery</title>
        <meta name="description" content={post.meta.excerpt || post.meta.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container">
        <Link href="/" style={{color: 'var(--text-tertiary)', textDecoration: 'none', fontSize: '14px', marginBottom: '32px', display: 'block'}}>
          ← Back to all posts
        </Link>
        <h1>{post.meta.title}</h1>
        {post.meta.date && <div className="post-meta">{post.meta.date}</div>}
        <article className="post-content" dangerouslySetInnerHTML={{__html: post.contentHtml}} />
      </main>
    </>
  )
}

export async function getStaticPaths(){
  const slugs = getPostSlugs().map(f => f.replace(/\.md$/, ''))
  return {paths: slugs.map(s => ({params:{slug:s}})), fallback:false}
}

export async function getStaticProps({params}){
  const post = await getPostBySlugWithHtml(params.slug)
  return {props:{post}}
}
