import {getPostSlugs, getPostBySlugWithHtml} from '../../lib/posts'
import Head from 'next/head'

export default function Post({post}){
  if(!post) return <div className="container">Post not found</div>
  return (
    <main className="container">
      <Head>
        <title>{post.meta.title} — Churn Recovery</title>
      </Head>
      <h1>{post.meta.title}</h1>
      {post.meta.date && <div className="post-meta">{post.meta.date}</div>}
      <article className="post-content" dangerouslySetInnerHTML={{__html: post.contentHtml}} />
    </main>
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
