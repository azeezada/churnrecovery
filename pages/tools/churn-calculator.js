import Head from 'next/head'
import Link from 'next/link'
import ChurnCalculator from '../../components/ChurnCalculator'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

export default function ChurnCalculatorPage() {
  const title = 'SaaS Churn Revenue Calculator — How Much Are You Losing?'
  const description = 'Calculate how much revenue you\'re losing to churn every month. See how much ChurnRecovery could save you — for free. Takes 30 seconds.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://churnrecovery.com/tools/churn-calculator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://churnrecovery.com/tools/churn-calculator" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'SaaS Churn Revenue Calculator',
              description,
              url: 'https://churnrecovery.com/tools/churn-calculator',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
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
          padding: '0 20px',
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
          <div className="nav-links" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/demo" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Demo</Link>
            <Link href="/blog" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Blog</Link>
            <a href="https://tally.so/r/churnrecovery" style={{
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

        {/* Hero */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 48px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: '#F0EBE5',
            color: t.accent,
            padding: '4px 14px',
            borderRadius: '4px',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px',
          }}>
            Free Tool
          </div>
          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 800,
            color: t.text,
            letterSpacing: '-0.04em',
            margin: '0 0 16px',
            lineHeight: 1.15,
          }}>
            How much revenue are you losing to churn?
          </h1>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1.1rem',
            color: t.gray,
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 48px',
          }}>
            Drag the sliders. See the real cost of churn — and how much you could recover with a cancel flow. Takes 30 seconds.
          </p>
        </section>

        {/* Calculator */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 80px' }}>
          <ChurnCalculator />
        </section>

        {/* Context / explanation */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '72px 24px',
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              marginBottom: '48px',
              textAlign: 'center',
            }}>
              Understanding your churn numbers
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
              {[
                {
                  stat: '5%',
                  label: 'Average B2B SaaS monthly churn',
                  body: 'Industry benchmark. If you\'re above this, you have a churn problem. Below 2% is excellent.',
                },
                {
                  stat: '25-45%',
                  label: 'Typical cancel flow save rate',
                  body: 'How many customers a well-implemented cancel flow retains. The right offer at the right moment makes the difference.',
                },
                {
                  stat: '5x',
                  label: 'Cost to acquire vs. retain',
                  body: 'It costs 5x more to acquire a new customer than retain an existing one. Every save is 5x more efficient than a new sale.',
                },
                {
                  stat: '80%',
                  label: 'Of churned customers who respond to offers',
                  body: 'Most customers who cancel aren\'t anti-your-product. They\'re price-sensitive, busy, or confused. The right offer brings them back.',
                },
              ].map(item => (
                <div key={item.stat} style={{
                  padding: '24px',
                  border: `1px solid ${t.border}`,
                  borderRadius: '10px',
                }}>
                  <div style={{
                    fontFamily: t.fontSans,
                    fontWeight: 800,
                    fontSize: '2rem',
                    color: t.accent,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}>
                    {item.stat}
                  </div>
                  <div style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: t.text,
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    {item.label}
                  </div>
                  <p style={{
                    fontFamily: t.fontSerif,
                    fontSize: '0.82rem',
                    color: t.gray,
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 24px' }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.03em',
            marginBottom: '40px',
          }}>
            Common questions about churn recovery
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                q: 'Is a 30% save rate realistic?',
                a: 'Yes — and many companies do better. The key is matching the offer to the reason. A customer who says "it\'s too expensive" responds to a discount. One who says "I\'m not using it" needs a pause offer. ChurnRecovery handles this automatically based on the reason selected.',
              },
              {
                q: 'What counts as "recovered revenue"?',
                a: 'A customer who accepts your offer and stays subscribed. Whether that\'s a discounted plan, a paused account that later resumes, or a downgrade that prevents full cancellation — all of these preserve some MRR and keep the customer in your ecosystem.',
              },
              {
                q: 'How does ChurnRecovery compare to Churnkey at $250/mo?',
                a: 'On features, they\'re comparable — Churnkey is a solid product. The difference is cost. If you\'re recovering $500/mo in revenue, Churnkey takes half of it. ChurnRecovery keeps 100% in your pocket. At any MRR level, free wins.',
              },
              {
                q: 'What about involuntary churn (failed payments)?',
                a: 'The calculator focuses on voluntary churn. Involuntary churn (failed payments) adds another 20-40% on top of this — smart retry logic and dunning sequences can recover most of it. ChurnRecovery handles both.',
              },
            ].map(item => (
              <div key={item.q} style={{
                borderBottom: `1px solid ${t.border}`,
                paddingBottom: '24px',
              }}>
                <h3 style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: t.text,
                  margin: '0 0 10px',
                  letterSpacing: '-0.01em',
                }}>
                  {item.q}
                </h3>
                <p style={{
                  fontFamily: t.fontSerif,
                  fontSize: '0.9rem',
                  color: t.gray,
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related resources */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          padding: '64px 24px',
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: '1.2rem',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}>
              Dig deeper
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {[
                { href: '/demo', label: '→ Try the cancel flow demo' },
                { href: '/posts/Ultimate-Guide-SaaS-Churn', label: '→ Ultimate guide to SaaS churn' },
                { href: '/posts/Cancel-Flow-Examples', label: '→ Cancel flow examples' },
                { href: '/posts/Involuntary-Churn-Recovery', label: '→ Involuntary churn recovery' },
                { href: '/compare/churnkey', label: '→ ChurnRecovery vs Churnkey' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{
                  display: 'block',
                  padding: '12px 16px',
                  border: `1px solid ${t.border}`,
                  borderRadius: '8px',
                  fontFamily: t.fontSans,
                  fontSize: '0.85rem',
                  color: t.text,
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'border-color 0.15s',
                }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
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
            Stop watching revenue walk out the door.
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
            Join the waitlist for early access to ChurnRecovery — the free churn recovery platform built for SaaS founders.
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
            Join the Waitlist — Free
          </a>
        </section>
      </div>
    </>
  )
}
