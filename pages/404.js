import Head from 'next/head'
import Link from 'next/link'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found | ChurnRecovery</title>
        <meta name="description" content="The page you're looking for doesn't exist. Let's get you back on track." />
      </Head>

      <div style={{
        background: t.bg, minHeight: '80vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: t.fontSans, padding: '40px 24px',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{
            fontSize: '5rem', fontWeight: 800, color: t.accent,
            letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '16px',
          }}>
            404
          </div>
          <h1 style={{
            fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700,
            color: t.text, letterSpacing: '-0.03em', margin: '0 0 12px',
          }}>
            This page churned
          </h1>
          <p style={{
            fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
            lineHeight: 1.7, margin: '0 0 32px',
          }}>
            Looks like this page doesn&apos;t exist anymore. Maybe we can help you find what you&apos;re looking for.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{
              display: 'inline-block', background: t.accent, color: t.white,
              padding: '12px 24px', borderRadius: '8px', fontWeight: 700,
              fontSize: '0.9rem', textDecoration: 'none',
            }}>
              Go Home
            </Link>
            <Link href="/features" style={{
              display: 'inline-block', background: t.white, color: t.text,
              padding: '12px 24px', borderRadius: '8px', fontWeight: 600,
              fontSize: '0.9rem', textDecoration: 'none',
              border: `1px solid ${t.border}`,
            }}>
              View Features
            </Link>
            <Link href="/docs" style={{
              display: 'inline-block', background: t.white, color: t.text,
              padding: '12px 24px', borderRadius: '8px', fontWeight: 600,
              fontSize: '0.9rem', textDecoration: 'none',
              border: `1px solid ${t.border}`,
            }}>
              Read Docs
            </Link>
          </div>

          <div style={{
            marginTop: '48px', padding: '20px', borderRadius: '10px',
            background: t.white, border: `1px solid ${t.border}`,
          }}>
            <p style={{
              fontFamily: t.fontSans, fontSize: '0.82rem', color: t.gray,
              margin: '0 0 12px',
            }}>
              Looking for something specific?
            </p>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center',
            }}>
              {[
                { label: 'Demo', href: '/demo' },
                { label: 'Blog', href: '/blog' },
                { label: 'Templates', href: '/templates' },
                { label: 'Calculator', href: '/tools/churn-calculator' },
                { label: 'Compare', href: '/compare/churnkey' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{
                  padding: '6px 14px', borderRadius: '6px',
                  background: t.bg, border: `1px solid ${t.border}`,
                  fontSize: '0.8rem', color: t.text, textDecoration: 'none',
                  fontWeight: 500,
                }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
