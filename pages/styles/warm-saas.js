import Link from 'next/link'
import Head from 'next/head'

// Option B: Warm SaaS — friendly, human, trustworthy
const t = {
  bg: '#FFF7ED',
  bgCard: '#FFFFFF',
  bgAccent: '#FFF0E0',
  text: '#1C1917',
  textMuted: '#78716C',
  textLight: '#A8A29E',
  accent: '#EA580C',
  accentHover: '#C2410C',
  accentSoft: '#FED7AA',
  green: '#16A34A',
  border: '#FDE8D0',
  borderLight: '#F5F5F4',
  font: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function TestimonialCard({ quote, author, role, company, emoji }) {
  return (
    <div style={{
      background: t.bgCard,
      border: `1px solid ${t.border}`,
      borderRadius: '20px',
      padding: '28px',
    }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{emoji}</div>
      <p style={{
        fontFamily: t.fontSerif,
        fontSize: '0.95rem',
        color: t.text,
        lineHeight: 1.7,
        margin: '0 0 20px 0',
        fontStyle: 'italic',
      }}>"{quote}"</p>
      <div>
        <div style={{
          fontFamily: t.font,
          fontSize: '0.9rem',
          fontWeight: 600,
          color: t.text,
        }}>{author}</div>
        <div style={{
          fontFamily: t.font,
          fontSize: '0.8rem',
          color: t.textMuted,
        }}>{role}, {company}</div>
      </div>
    </div>
  )
}

function FeatureCard({ emoji, title, description, highlight }) {
  return (
    <div style={{
      background: highlight ? t.accent : t.bgCard,
      border: `1px solid ${highlight ? t.accent : t.border}`,
      borderRadius: '20px',
      padding: '32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {highlight && (
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
      )}
      <div style={{
        fontSize: '2rem',
        marginBottom: '16px',
        display: 'block',
      }}>{emoji}</div>
      <h3 style={{
        fontFamily: t.font,
        fontSize: '1.1rem',
        fontWeight: 700,
        color: highlight ? '#fff' : t.text,
        margin: '0 0 10px 0',
        letterSpacing: '-0.01em',
      }}>{title}</h3>
      <p style={{
        fontFamily: t.font,
        fontSize: '0.9rem',
        color: highlight ? 'rgba(255,255,255,0.85)' : t.textMuted,
        margin: 0,
        lineHeight: 1.6,
      }}>{description}</p>
    </div>
  )
}

export default function WarmSaasStyle() {
  return (
    <>
      <Head>
        <title>ChurnRecovery — Warm SaaS Style (Option B)</title>
        <meta name="description" content="Friendly, warm SaaS homepage concept for ChurnRecovery — for founders who want human and trustworthy." />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh' }}>
        {/* Nav */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255,247,237,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${t.border}`,
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 24px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>🛡️</span>
              <span style={{
                fontFamily: t.font,
                fontSize: '1.1rem',
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.02em',
              }}>ChurnRecovery</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {['Features', 'Pricing', 'Blog'].map(item => (
                <span key={item} style={{
                  fontFamily: t.font,
                  fontSize: '0.9rem',
                  color: t.textMuted,
                  padding: '8px 12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}>{item}</span>
              ))}
              <span style={{
                fontFamily: t.font,
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#fff',
                background: t.accent,
                padding: '10px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
              }}>Get Started Free →</span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ paddingTop: '80px' }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '80px 24px 48px',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: t.accentSoft,
              color: t.accent,
              fontFamily: t.font,
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: '100px',
              marginBottom: '32px',
            }}>
              <span>🎉</span>
              <span>Completely free — always has been, always will be</span>
            </div>

            <h1 style={{
              fontFamily: t.font,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              color: t.text,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              margin: '0 0 24px 0',
            }}>
              Your customers are leaving.<br />
              <span style={{
                color: t.accent,
                background: `linear-gradient(135deg, ${t.accent}, #F97316)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Let's bring them back.</span>
            </h1>

            <p style={{
              fontFamily: t.font,
              fontSize: '1.2rem',
              color: t.textMuted,
              margin: '0 auto 40px',
              maxWidth: '560px',
              lineHeight: 1.6,
            }}>
              ChurnRecovery helps SaaS founders recover lost revenue with smart cancel flows,
              dunning management, and payment recovery — completely free.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: t.font,
                fontSize: '1rem',
                fontWeight: 700,
                color: '#fff',
                background: `linear-gradient(135deg, ${t.accent}, #F97316)`,
                padding: '16px 32px',
                borderRadius: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(234,88,12,0.3)',
              }}>Start recovering revenue →</span>
              <span style={{
                fontFamily: t.font,
                fontSize: '1rem',
                fontWeight: 600,
                color: t.text,
                background: t.bgCard,
                padding: '16px 28px',
                borderRadius: '14px',
                cursor: 'pointer',
                border: `1px solid ${t.border}`,
              }}>See how it works</span>
            </div>

            <p style={{
              fontFamily: t.font,
              fontSize: '0.85rem',
              color: t.textLight,
              marginTop: '20px',
            }}>
              No credit card · No limits · Free forever
            </p>
          </div>

          {/* Social proof numbers */}
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 24px 80px',
          }}>
            <div style={{
              background: t.bgCard,
              border: `1px solid ${t.border}`,
              borderRadius: '20px',
              padding: '40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '32px',
              textAlign: 'center',
            }}>
              {[
                { number: '2,400+', label: 'SaaS companies', emoji: '🏢' },
                { number: '$8.2M', label: 'Revenue recovered', emoji: '💰' },
                { number: '34%', label: 'Avg cancellations saved', emoji: '📉' },
                { number: '$0', label: 'Cost to you, always', emoji: '🎁' },
              ].map(({ number, label, emoji }) => (
                <div key={label}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{emoji}</div>
                  <div style={{
                    fontFamily: t.font,
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: t.text,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>{number}</div>
                  <div style={{
                    fontFamily: t.font,
                    fontSize: '0.85rem',
                    color: t.textMuted,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ background: t.bgAccent }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '80px 24px',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span style={{
                fontFamily: t.font,
                fontSize: '0.8rem',
                fontWeight: 700,
                color: t.accent,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>Everything you need</span>
              <h2 style={{
                fontFamily: t.font,
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 800,
                color: t.text,
                letterSpacing: '-0.03em',
                margin: '12px 0 16px',
              }}>Tools that actually work</h2>
              <p style={{
                fontFamily: t.font,
                fontSize: '1.05rem',
                color: t.textMuted,
                maxWidth: '500px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}>We've seen thousands of cancel flows. Here's what actually retains customers.</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}>
              <FeatureCard
                emoji="💬"
                title="Cancel Flow Builder"
                description="Build flows that feel human, not corporate. Show offers, collect reasons, prevent rage-quits."
                highlight={true}
              />
              <FeatureCard
                emoji="💳"
                title="Dunning Management"
                description="Recover failed payments with smart email sequences and in-app prompts timed perfectly."
              />
              <FeatureCard
                emoji="📊"
                title="Exit Surveys"
                description="Understand why customers leave. Real data you can act on, not just vibes."
              />
              <FeatureCard
                emoji="🎁"
                title="Smart Offers"
                description="Pause, discount, downgrade — show the right offer to the right customer at the right time."
              />
              <FeatureCard
                emoji="🔗"
                title="Easy Integration"
                description="Works with Stripe, Paddle, Lemon Squeezy. One script tag and you're live in 10 minutes."
              />
              <FeatureCard
                emoji="📈"
                title="Recovery Analytics"
                description="See exactly which offers work, which customers stay, and how much revenue you've saved."
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '80px 24px',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{
                fontFamily: t.font,
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 800,
                color: t.text,
                letterSpacing: '-0.03em',
                margin: '0 0 12px',
              }}>Founders love us</h2>
              <p style={{
                fontFamily: t.font,
                fontSize: '1rem',
                color: t.textMuted,
              }}>Real stories from real SaaS founders</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}>
              <TestimonialCard
                emoji="😮"
                quote="I was ready to pay $300/month for Churnkey. Then I found ChurnRecovery. Same features, $0. My CFO almost cried."
                author="Marcus Okonkwo"
                role="CEO"
                company="Reportly"
              />
              <TestimonialCard
                emoji="🙌"
                quote="Set it up on a Saturday afternoon. By Monday I'd already saved 3 cancellations. Easiest win I've had in years."
                author="Priya Chandrasekaran"
                role="Founder"
                company="FormStack Pro"
              />
              <TestimonialCard
                emoji="💯"
                quote="The exit survey data alone was worth it. We completely redesigned our onboarding based on what we learned."
                author="Tom Walsh"
                role="Head of Growth"
                company="Beacon Analytics"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: `linear-gradient(135deg, ${t.accent} 0%, #F97316 100%)` }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '80px 24px',
            textAlign: 'center',
          }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '24px' }}>🚀</span>
            <h2 style={{
              fontFamily: t.font,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
            }}>Start recovering revenue today</h2>
            <p style={{
              fontFamily: t.font,
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.85)',
              margin: '0 auto 40px',
              maxWidth: '480px',
              lineHeight: 1.5,
            }}>
              Join 2,400+ SaaS founders who've switched to free churn recovery.
              Takes about 10 minutes to set up.
            </p>
            <span style={{
              display: 'inline-block',
              fontFamily: t.font,
              fontSize: '1rem',
              fontWeight: 700,
              color: t.accent,
              background: '#fff',
              padding: '16px 36px',
              borderRadius: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}>Get started for free →</span>
            <p style={{
              fontFamily: t.font,
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.7)',
              marginTop: '20px',
            }}>No credit card required · Free forever</p>
          </div>
        </section>

        {/* Back link */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 24px',
        }}>
          <Link href="/styles" style={{
            fontFamily: t.font,
            fontSize: '0.9rem',
            color: t.accent,
            textDecoration: 'none',
            fontWeight: 500,
          }}>← Back to style explorer</Link>
        </div>
      </div>
    </>
  )
}
