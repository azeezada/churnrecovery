import Head from 'next/head'
import Link from 'next/link'
import { getCompetitor, getAllCompetitorSlugs } from '../../lib/comparisons'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const churnRecoveryFeatures = [
  {
    icon: '🎯',
    title: 'Smart Cancel Flows',
    description: 'Present the right offer at the right moment. Discount, pause, or downgrade — dynamically based on what the customer actually said.',
  },
  {
    icon: '💳',
    title: 'Involuntary Churn Recovery',
    description: 'Automatically retry failed payments with smart scheduling. Recover 30-60% of churned revenue you would have written off.',
  },
  {
    icon: '🔬',
    title: 'A/B Testing Built-In',
    description: 'Test different cancel flow variants, offers, and messaging. Let data drive your retention strategy.',
  },
  {
    icon: '🛠',
    title: 'Developer API',
    description: 'Full REST API. Integrate in an afternoon. Works with Stripe, Paddle, Braintree, and custom billing setups.',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'See exactly what is happening. Save rate by segment, revenue saved over time, offer performance.',
  },
  {
    icon: '🔓',
    title: 'Open Source',
    description: 'Audit the logic, self-host if you want, contribute improvements. No black boxes.',
  },
]

function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      border: `1px solid ${t.border}`,
      borderRadius: '10px',
      padding: '24px',
      background: t.white,
    }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{
        fontFamily: t.fontSans,
        fontSize: '0.95rem',
        fontWeight: 700,
        color: t.text,
        marginBottom: '8px',
        letterSpacing: '-0.01em',
      }}>{title}</h3>
      <p style={{
        fontFamily: t.fontSerif,
        fontSize: '0.85rem',
        color: t.gray,
        lineHeight: 1.7,
        margin: 0,
      }}>{description}</p>
    </div>
  )
}

export default function AlternativePage({ competitor }) {
  if (!competitor) return null

  const title = `Best ${competitor.name} Alternative in 2025 — ChurnRecovery`
  const description = `Looking for a ${competitor.name} alternative? ChurnRecovery offers cancel flows, failed payment recovery, A/B testing, and a developer API — completely free.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://churnrecovery.com/alternatives/${competitor.slug}`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://churnrecovery.com/alternatives/${competitor.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: title,
              description,
              url: `https://churnrecovery.com/alternatives/${competitor.slug}`,
              publisher: {
                '@type': 'Organization',
                name: 'ChurnRecovery',
                url: 'https://churnrecovery.com',
              },
            }),
          }}
        />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
        {/* Nav */}
        <nav style={{
          borderBottom: `1px solid ${t.border}`,
          background: t.white,
          padding: '0 40px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <Link href="/" style={{
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '1.1rem',
            color: t.text,
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            ChurnRecovery
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/blog" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Blog</Link>
            <Link href={`/compare/${competitor.slug}`} style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>
              Full Comparison →
            </Link>
            <a href="#waitlist" style={{
              background: t.accent,
              color: t.white,
              padding: '8px 18px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}>Get Early Access</a>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '20px 24px 0' }}>
          <div style={{ fontSize: '0.8rem', color: t.gray, fontFamily: t.fontSans }}>
            <Link href="/" style={{ color: t.gray, textDecoration: 'none' }}>Home</Link>
            {' → '}
            <span>Alternatives</span>
            {' → '}
            <span style={{ color: t.text }}>{competitor.name} Alternative</span>
          </div>
        </div>

        {/* Hero */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 56px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#F0EBE5',
            padding: '6px 14px',
            borderRadius: '20px',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.accent }}>
              {competitor.name} Alternative
            </span>
          </div>

          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
            fontWeight: 800,
            color: t.text,
            lineHeight: 1.15,
            letterSpacing: '-0.04em',
            margin: '0 0 24px',
            maxWidth: '720px',
          }}>
            The free alternative to {competitor.name} your SaaS has been waiting for
          </h1>

          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1.15rem',
            color: t.gray,
            lineHeight: 1.7,
            maxWidth: '600px',
            marginBottom: '40px',
          }}>
            {competitor.name} starts at {competitor.pricing.label}. ChurnRecovery gives you every feature you need to reduce churn — cancel flows, dunning, A/B testing, analytics — completely free.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href="#waitlist" style={{
              display: 'inline-block',
              background: t.accent,
              color: t.white,
              padding: '14px 28px',
              borderRadius: '8px',
              fontFamily: t.fontSans,
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}>
              Start Free — No Card Required
            </a>
            <Link href={`/compare/${competitor.slug}`} style={{
              display: 'inline-block',
              background: 'transparent',
              color: t.text,
              padding: '14px 28px',
              borderRadius: '8px',
              fontFamily: t.fontSans,
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              border: `1px solid ${t.border}`,
            }}>
              See Full Comparison →
            </Link>
          </div>

          {/* Social proof bar */}
          <div style={{
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            paddingTop: '32px',
            borderTop: `1px solid ${t.border}`,
          }}>
            {[
              { stat: '$0/mo', label: 'Forever free' },
              { stat: '< 1 day', label: 'Integration time' },
              { stat: '100%', label: 'Revenue kept' },
              { stat: 'Open source', label: 'Full transparency' },
            ].map(item => (
              <div key={item.stat}>
                <div style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.1rem', color: t.text, letterSpacing: '-0.02em' }}>
                  {item.stat}
                </div>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why switch section */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '56px 24px',
        }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: '1.6rem',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              marginBottom: '8px',
            }}>
              Why teams switch from {competitor.name}
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.95rem',
              color: t.gray,
              marginBottom: '32px',
              lineHeight: 1.7,
            }}>
              These are the most common reasons SaaS founders look for a {competitor.name} alternative.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {competitor.weaknesses.map((w, i) => (
                <div key={i} style={{
                  padding: '20px',
                  background: '#FDF8F5',
                  borderRadius: '8px',
                  border: `1px solid #F0E8E0`,
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}>
                  <span style={{ color: t.accent, fontWeight: 700, fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>→</span>
                  <div>
                    <p style={{
                      fontFamily: t.fontSans,
                      fontSize: '0.88rem',
                      color: t.text,
                      margin: 0,
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}>{w}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 24px' }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: '1.6rem',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.03em',
            marginBottom: '8px',
          }}>
            Everything you need. Nothing you don't.
          </h2>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '0.95rem',
            color: t.gray,
            marginBottom: '32px',
            lineHeight: 1.7,
          }}>
            ChurnRecovery includes all the features that make cancel flows and churn recovery work.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {churnRecoveryFeatures.map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section style={{
          background: '#FDF8F5',
          borderTop: `1px solid #F0E8E0`,
          borderBottom: `1px solid #F0E8E0`,
          padding: '56px 24px',
        }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: '1.4rem',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}>
              The bottom line
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1.05rem',
              color: t.text,
              lineHeight: 1.8,
              marginBottom: '0',
            }}>
              {competitor.verdict}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section id="waitlist" style={{
          background: t.text,
          padding: '80px 24px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 700,
            color: t.white,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
          }}>
            Ready to switch from {competitor.name}?
          </h2>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 32px',
            maxWidth: '460px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.7,
          }}>
            Join the waitlist and get early access to the churn recovery tool that doesn't cost you anything.
          </p>
          <a href="https://tally.so/r/churnrecovery" style={{
            display: 'inline-block',
            background: t.accent,
            color: t.white,
            padding: '14px 32px',
            borderRadius: '8px',
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            Join the Waitlist — It's Free
          </a>
          <div style={{ marginTop: '20px' }}>
            <Link href={`/compare/${competitor.slug}`} style={{
              fontFamily: t.fontSans,
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
            }}>
              See the full comparison →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getAllCompetitorSlugs()
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const competitor = getCompetitor(params.slug)
  if (!competitor) return { notFound: true }
  return { props: { competitor } }
}
