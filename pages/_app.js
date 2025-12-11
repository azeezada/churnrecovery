import Head from 'next/head'
import '../styles/globals.css'
import Header from '../components/Header'

export default function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
