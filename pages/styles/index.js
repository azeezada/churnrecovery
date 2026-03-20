import Link from 'next/link'
import Head from 'next/head'

const styles = [
  {
    slug: 'developer',
    title: 'Option A: Developer / Stripe',
    description: 'Dark mode, code-forward, technical credibility. Appeals to developers who want to see the code before they believe the marketing.',
    preview: {
      bg: '#0A0A0A',
      accent: '#635BFF',
      text: '#FFFFFF',
    },
  },
  {
    slug: 'warm-saas',
    title: 'Option B: Warm SaaS',
    description: 'Friendly gradients, rounded shapes, approachable tone. For SaaS founders who want something that feels human and trustworthy.',
    preview: {
      bg: '#FFF7ED',
      accent: '#EA580C',
      text: '#1C1917',
    },
  },
  {
    slug: 'data-forward',
    title: 'Option C: Data / Dashboard',
    description: 'Numbers-first, analytical, credibility through data. For growth teams who want proof before they integrate anything.',
    preview: {
      bg: '#F8FAFC',
      accent: '#0EA5E9',
      text: '#0F172A',
    },
  },
]

export default function StylesIndex() {
  return (
    <>
      <Head>
        <title>Design Explorations — ChurnRecovery</title>
        <meta name="description" content="Explore alternative homepage designs for ChurnRecovery: developer-focused, warm SaaS, and data-forward styles." />
      </Head>

      <section style={{
        background: '#FAF9F5',
        paddingTop: '100px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px',
        }}>
          <span style={{
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#D97757',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px',
          }}>Design Exploration</span>
          <h1 style={{
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 600,
            color: '#191919',
            letterSpacing: '-0.03em',
            margin: '0 0 16px 0',
            lineHeight: 1.1,
          }}>
            Alternative Homepage Styles
          </h1>
          <p style={{
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: '1.1rem',
            color: '#666666',
            margin: '0 0 48px 0',
            maxWidth: '600px',
            lineHeight: 1.5,
          }}>
            Three alternative directions for ChurnRecovery's homepage. The main site uses
            <strong style={{ color: '#191919' }}> Option D (Editorial)</strong> — these are the roads not taken.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {styles.map(s => (
              <Link
                key={s.slug}
                href={`/styles/${s.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  transition: 'box-shadow 0.2s',
                }}>
                  {/* Preview swatch */}
                  <div style={{
                    height: '140px',
                    background: s.preview.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '24px',
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      background: s.preview.accent,
                    }} />
                    <div style={{
                      fontFamily: '"Instrument Sans", sans-serif',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: s.preview.text,
                      letterSpacing: '-0.02em',
                    }}>
                      ChurnRecovery
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h2 style={{
                      fontFamily: '"Instrument Sans", sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#191919',
                      margin: '0 0 8px 0',
                    }}>{s.title}</h2>
                    <p style={{
                      fontFamily: '"Merriweather", serif',
                      fontSize: '0.9rem',
                      color: '#666666',
                      margin: 0,
                      lineHeight: 1.6,
                    }}>{s.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '48px' }}>
            <Link
              href="/"
              style={{
                fontFamily: '"Instrument Sans", sans-serif',
                fontSize: '0.9rem',
                color: '#D97757',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              ← Back to main site (Option D)
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
