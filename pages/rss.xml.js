import { generateRSSFeed } from '../lib/posts'

// This page generates the RSS feed as XML
export default function RSSFeed() {
  // This component is never actually rendered — getServerSideProps handles it
  return null
}

export async function getServerSideProps({ res }) {
  const rss = generateRSSFeed()

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  res.write(rss)
  res.end()

  return { props: {} }
}
