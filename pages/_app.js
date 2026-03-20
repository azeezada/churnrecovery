import Head from 'next/head'
import { ClerkProvider } from '@clerk/nextjs'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  // App pages use their own layout (no marketing header/footer)
  const isAppPage = Component.isAppPage

  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="cCAZpDlVK-QR4d6LRkvvBRonJmsCtHtEdkGzH_DsNSs" />

        {/* Default SEO — pages can override these */}
        <meta name="theme-color" content="#D97757" />
        <meta property="og:site_name" content="ChurnRecovery" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://churnrecovery.com/og/default.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://churnrecovery.com/og/default.svg" />

        {/* JSON-LD Organization (site-wide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ChurnRecovery',
              url: 'https://churnrecovery.com',
              logo: 'https://churnrecovery.com/logo.png',
              description: 'Free churn recovery platform for SaaS companies. Cancel flow interception, smart offers, analytics, and win-back automation.',
              sameAs: [],
            }),
          }}
        />

        {/* JSON-LD WebSite (for sitelinks search) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ChurnRecovery',
              url: 'https://churnrecovery.com',
              description: 'Free churn recovery platform for SaaS companies.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://churnrecovery.com/blog?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </Head>
      {isAppPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </>
      )}
    </ClerkProvider>
  )
}
