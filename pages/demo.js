import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import CancelFlowDemo from '../components/CancelFlowDemo'

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

export default function DemoPage() {
  const title = 'See ChurnRecovery in Action — Interactive Cancel Flow Demo'
  const description = 'Try a live cancel flow demo. See how ChurnRecovery presents the right offer at the right moment to save canceling customers — completely free.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://churnrecovery.com/demo" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://churnrecovery.com/demo" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: title,
              description,
              url: 'https://churnrecovery.com/demo',
              publisher: {
                '@type': 'Organization',
                name: 'ChurnRecovery',
                url: 'https://churnrecovery.com',
              },
            }),
          }}
        />
      </Head>

      <style>{`
        @media (max-width: 640px) {
          .demo-nav-text { display: none !important; }
          .demo-nav-links { gap: 8px !important; }
        }
      `}</style>

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
          <div className="demo-nav-links" style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/blog" className="demo-nav-text" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Blog</Link>
            <Link href="/compare/churnkey" className="demo-nav-text" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Compare</Link>
            <a href="/#waitlist" style={{
              background: t.accent,
              color: t.white,
              padding: '8px 18px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>Join Waitlist</a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 48px', textAlign: 'center' }}>
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
            Interactive Demo
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
            See what your customers see when they try to cancel
          </h1>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1.1rem',
            color: t.gray,
            lineHeight: 1.7,
            maxWidth: '580px',
            margin: '0 auto 40px',
          }}>
            ChurnRecovery shows a cancel flow the moment a customer clicks "Cancel subscription." Click through the demo below — pick a reason and see the offer that fires.
          </p>

          {/* How it works bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}>
            {[
              { step: '1', label: 'Customer clicks cancel' },
              { step: '2', label: 'Cancel flow appears' },
              { step: '3', label: 'Smart offer fires' },
              { step: '4', label: 'Save or log + analyze' },
            ].map((item, i) => (
              <div key={item.step} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  fontFamily: t.fontSans,
                  fontSize: '0.82rem',
                  color: t.gray,
                }}>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: t.accent,
                    color: t.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    flexShrink: 0,
                  }}>
                    {item.step}
                  </div>
                  {item.label}
                </div>
                {i < 3 && (
                  <span style={{ color: t.grayLight, fontSize: '1rem' }}>→</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Demo Widget */}
        <section style={{ padding: '0 24px 80px' }}>
          <CancelFlowDemo />
        </section>

        {/* What you get section */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '72px 24px',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{
                fontFamily: t.fontSans,
                fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.03em',
                margin: '0 0 12px',
              }}>
                What happens behind the scenes
              </h2>
              <p style={{
                fontFamily: t.fontSerif,
                fontSize: '1rem',
                color: t.gray,
                lineHeight: 1.7,
                maxWidth: '520px',
                margin: '0 auto',
              }}>
                Every cancel attempt is tracked, analyzed, and turned into actionable insight — whether you save the customer or not.
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
            }}>
              {[
                {
                  icon: '🎯',
                  title: 'Reason-based offers',
                  body: 'The right offer fires based on the cancel reason. Price-sensitive? Discount. Churning from inactivity? Pause offer. Switching? Win-back deal.',
                },
                {
                  icon: '⚡',
                  title: 'Fires in milliseconds',
                  body: 'ChurnRecovery intercepts the cancel action before it completes. Zero latency, seamless UX. Customers never leave your product to see the flow.',
                },
                {
                  icon: '📊',
                  title: 'Every click tracked',
                  body: 'Save rate, offer acceptance by reason, revenue recovered, time-to-cancel. Your analytics dashboard updates in real time.',
                },
                {
                  icon: '🔄',
                  title: 'A/B test everything',
                  body: 'Run multiple offer variants. Test discount amounts, copy, timing. Let the data decide what saves the most customers.',
                },
                {
                  icon: '🔗',
                  title: 'One line of code',
                  body: 'Integrate with a single JS snippet or API call. Works with Stripe, Paddle, Braintree, and custom billing. Up in an afternoon.',
                },
                {
                  icon: '🤖',
                  title: 'Win-back sequences',
                  body: 'Even when a customer cancels, ChurnRecovery queues a smart win-back email sequence for day 7, 14, and 30 post-cancellation.',
                },
              ].map(card => (
                <div key={card.title} style={{
                  border: `1px solid ${t.border}`,
                  borderRadius: '10px',
                  padding: '24px',
                  background: t.bg,
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{card.icon}</div>
                  <h3 style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: t.text,
                    letterSpacing: '-0.01em',
                    margin: '0 0 8px',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontFamily: t.fontSerif,
                    fontSize: '0.85rem',
                    color: t.gray,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              margin: '0 0 12px',
            }}>
              The numbers speak for themselves
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '24px',
            textAlign: 'center',
          }}>
            {[
              { stat: '67%', label: 'Average save rate with targeted offers', color: t.accent },
              { stat: '$0', label: 'Cost to run ChurnRecovery, forever', color: t.green },
              { stat: '< 1 day', label: 'Typical integration time', color: t.text },
              { stat: '2-5x', label: 'ROI vs doing nothing', color: t.text },
            ].map(item => (
              <div key={item.label} style={{
                padding: '32px 20px',
                border: `1px solid ${t.border}`,
                borderRadius: '12px',
                background: t.white,
              }}>
                <div style={{
                  fontFamily: t.fontSans,
                  fontWeight: 800,
                  fontSize: '2.2rem',
                  color: item.color,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '10px',
                }}>
                  {item.stat}
                </div>
                <div style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.82rem',
                  color: t.gray,
                  lineHeight: 1.5,
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Integration code snippet */}
        <section style={{
          background: '#1A1A2E',
          padding: '72px 24px',
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{
                fontFamily: t.fontSans,
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                fontWeight: 700,
                color: t.white,
                letterSpacing: '-0.03em',
                margin: '0 0 12px',
              }}>
                One line to add it to your app
              </h2>
              <p style={{
                fontFamily: t.fontSerif,
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
              }}>
                Drop in the snippet. Configure your offers. Watch the saves roll in.
              </p>
            </div>

            {/* Code block */}
            <div style={{
              background: '#0D0D1A',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', opacity: 0.7 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E', opacity: 0.7 }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', opacity: 0.7 }} />
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                  your-app.js
                </span>
              </div>
              <div style={{ padding: '24px' }}>
                <pre style={{
                  margin: 0,
                  fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
                  fontSize: '0.82rem',
                  lineHeight: 1.7,
                  color: '#E8E8E8',
                  overflow: 'auto',
                }}>
{`// 1. Add the snippet to your cancel button handler
import { ChurnRecovery } from '@churnrecovery/js'

// 2. Initialize once
const cr = new ChurnRecovery({ apiKey: 'your_key' })

// 3. Intercept cancel attempts
cancelButton.addEventListener('click', async (e) => {
  e.preventDefault()
  
  const result = await cr.showCancelFlow({
    customerId: currentUser.id,
    planId: currentUser.plan,
  })
  
  if (result.action === 'saved') {
    // Customer accepted offer — apply it
    await applyOffer(result.offer)
  } else {
    // Customer canceled — reason is logged automatically
    await processCancel()
  }
})`}
                </pre>
              </div>
            </div>

            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.35)',
              textAlign: 'center',
              marginTop: '20px',
            }}>
              Works with React, Vue, vanilla JS, and any backend. REST API + webhooks available.
            </p>
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
            Ready to stop losing customers?
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
            Join the waitlist and be first to integrate ChurnRecovery. Free forever. No credit card required.
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
            <Link href="/compare/churnkey" style={{
              fontFamily: t.fontSans,
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
            }}>
              Compare with Churnkey →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
