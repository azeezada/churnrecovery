import Head from 'next/head'
import Link from 'next/link'
import { getAllIntegrations } from '../../lib/integrations'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentHover: '#C4603D',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const difficultyColor = {
  Easy: { bg: '#EDF7F1', color: '#2D7A4F' },
  Medium: { bg: '#FEF9EC', color: '#856404' },
  Advanced: { bg: '#FFF0EC', color: '#C4603D' },
}

export default function IntegrationsIndex() {
  const integrationList = getAllIntegrations()

  return (
    <>
      <Head>
        <title>Integrations — ChurnRecovery works with Stripe, Paddle, Braintree & more</title>
        <meta name="description" content="ChurnRecovery integrates natively with Stripe, Paddle, Braintree, Chargebee, Recurly, and any custom billing system. Free cancel flows for every payment processor." />
        <meta property="og:title" content="Integrations — ChurnRecovery" />
        <meta property="og:description" content="Native integrations with every major payment processor. Set up cancel flows and payment recovery in minutes." />
        <meta property="og:image" content="https://churnrecovery.com/og/integrations.svg" />
        <meta property="og:url" content="https://churnrecovery.com/integrations" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://churnrecovery.com/integrations" />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh' }}>
        {/* Hero */}
        <div style={{
          borderBottom: `1px solid ${t.border}`,
          padding: '80px 24px 64px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              background: t.greenLight,
              color: t.green,
              fontFamily: t.fontSans,
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 14px',
              borderRadius: '20px',
              marginBottom: '24px',
            }}>
              Works with your stack
            </div>
            <h1 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: t.text,
              margin: '0 0 20px',
              lineHeight: 1.15,
            }}>
              Integrates with every major<br />payment processor
            </h1>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1.15rem',
              color: t.gray,
              lineHeight: 1.7,
              margin: '0 0 36px',
            }}>
              Whether you're on Stripe, Paddle, Braintree, or a custom billing system,
              ChurnRecovery gives you cancel flows and payment recovery — completely free.
            </p>
            <div className="hero-ctas" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/#waitlist" style={{
                display: 'inline-block',
                background: t.accent,
                color: t.white,
                fontFamily: t.fontSans,
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '14px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}>
                Join Waitlist — It's Free
              </Link>
              <Link href="/docs" style={{
                display: 'inline-block',
                background: 'transparent',
                color: t.text,
                fontFamily: t.fontSans,
                fontWeight: 600,
                fontSize: '0.95rem',
                padding: '14px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                border: `1px solid ${t.border}`,
              }}>
                View docs
              </Link>
            </div>
          </div>
        </div>

        {/* Integration cards grid */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: '1.4rem',
            fontWeight: 700,
            color: t.text,
            margin: '0 0 8px',
          }}>All integrations</h2>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1rem',
            color: t.gray,
            margin: '0 0 40px',
            lineHeight: 1.6,
          }}>
            Click any integration to see code snippets, setup guides, and use cases.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {integrationList.map((integration) => {
              const diff = difficultyColor[integration.difficulty] || difficultyColor.Medium
              return (
                <Link
                  key={integration.slug}
                  href={`/integrations/${integration.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    background: t.white,
                    border: `1px solid ${t.border}`,
                    borderRadius: '12px',
                    padding: '28px',
                    transition: 'box-shadow 0.2s, border-color 0.2s',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
                      e.currentTarget.style.borderColor = t.accent
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = t.border
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '12px',
                        background: integration.color + '18',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.6rem',
                        flexShrink: 0,
                      }}>
                        {integration.logo}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <h3 style={{
                            fontFamily: t.fontSans,
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: t.text,
                            margin: 0,
                          }}>{integration.name}</h3>
                          <span style={{
                            background: diff.bg,
                            color: diff.color,
                            fontFamily: t.fontSans,
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '10px',
                            letterSpacing: '0.03em',
                          }}>{integration.difficulty}</span>
                        </div>
                        <p style={{
                          fontFamily: t.fontSans,
                          fontSize: '0.85rem',
                          color: t.grayLight,
                          margin: 0,
                        }}>{integration.tagline}</p>
                      </div>
                    </div>

                    <p style={{
                      fontFamily: t.fontSerif,
                      fontSize: '0.9rem',
                      color: t.gray,
                      lineHeight: 1.65,
                      margin: '0 0 20px',
                    }}>
                      {integration.description.substring(0, 130)}…
                    </p>

                    {/* Stats row */}
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      paddingTop: '16px',
                      borderTop: `1px solid ${t.border}`,
                    }}>
                      <div>
                        <div style={{ fontFamily: t.fontSans, fontSize: '0.7rem', color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Setup</div>
                        <div style={{ fontFamily: t.fontSans, fontSize: '0.9rem', fontWeight: 700, color: t.text }}>{integration.setupTime}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: t.fontSans, fontSize: '0.7rem', color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Avg save rate</div>
                        <div style={{ fontFamily: t.fontSans, fontSize: '0.9rem', fontWeight: 700, color: t.green }}>{integration.stats.avgSaveRate}</div>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <span style={{
                          fontFamily: t.fontSans,
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: t.accent,
                        }}>View guide →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* How it works section */}
          <div style={{
            marginTop: '80px',
            padding: '48px',
            background: t.white,
            border: `1px solid ${t.border}`,
            borderRadius: '16px',
          }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: '1.5rem',
              fontWeight: 700,
              color: t.text,
              margin: '0 0 8px',
              textAlign: 'center',
            }}>How ChurnRecovery integrates</h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1rem',
              color: t.gray,
              textAlign: 'center',
              margin: '0 0 40px',
              lineHeight: 1.7,
            }}>
              The same three-step pattern works across all payment processors.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '32px',
            }}>
              {[
                { step: '01', title: 'Connect your processor', desc: 'Add your API keys and configure a webhook endpoint. Takes 5–45 minutes depending on the processor.' },
                { step: '02', title: 'Intercept cancellations', desc: 'When a customer triggers cancellation, ChurnRecovery shows a smart cancel flow with targeted offers before it\'s final.' },
                { step: '03', title: 'Recover revenue automatically', desc: 'Accepted offers are applied via the processor\'s API. Analytics track your save rate and revenue recovered.' },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: t.accent + '18',
                    color: t.accent,
                    fontFamily: t.fontSans,
                    fontWeight: 800,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}>{step}</div>
                  <h3 style={{
                    fontFamily: t.fontSans,
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: t.text,
                    margin: '0 0 8px',
                  }}>{title}</h3>
                  <p style={{
                    fontFamily: t.fontSerif,
                    fontSize: '0.9rem',
                    color: t.gray,
                    lineHeight: 1.65,
                    margin: 0,
                  }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: '64px',
            textAlign: 'center',
            padding: '64px 24px',
            background: t.text,
            borderRadius: '16px',
          }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: '1.8rem',
              fontWeight: 800,
              color: t.white,
              margin: '0 0 16px',
            }}>Start recovering revenue today</h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.7)',
              margin: '0 0 32px',
              lineHeight: 1.7,
            }}>
              Free for all payment processors. No credit card required. No monthly fee — ever.
            </p>
            <Link href="/#waitlist" style={{
              display: 'inline-block',
              background: t.accent,
              color: t.white,
              fontFamily: t.fontSans,
              fontWeight: 700,
              fontSize: '1rem',
              padding: '16px 36px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              Join Waitlist — It's Free
            </Link>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 640px) {
            .integrations-grid { grid-template-columns: 1fr !important; }
            .hero-ctas { flex-direction: column !important; align-items: stretch !important; width: 100%; max-width: 320px; margin: 0 auto; }
            .hero-ctas a { text-align: center; }
          }
        `}</style>
      </div>
    </>
  )
}
