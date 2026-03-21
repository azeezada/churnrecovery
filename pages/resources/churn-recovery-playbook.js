import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WaitlistForm from '../../components/WaitlistForm'

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

const playbookContents = [
  {
    emoji: '🔍',
    title: 'Why subscribers really cancel',
    description:
      'The difference between voluntary and involuntary churn — and why 20–40% of your losses are probably recoverable right now.',
  },
  {
    emoji: '🛑',
    title: 'The cancel flow blueprint',
    description:
      'Exactly what to show subscribers before they leave: when to offer a pause, when to offer a discount, and when to just ask why.',
  },
  {
    emoji: '📧',
    title: 'Dunning emails that actually work',
    description:
      'The 4-email sequence that recovers failed payments — with copy you can steal and timing windows that work.',
  },
  {
    emoji: '⏸️',
    title: 'The pause offer strategy',
    description:
      'Why a pause option outperforms discounts for most creator subscriptions, and how to set one up without any technical knowledge.',
  },
  {
    emoji: '📊',
    title: 'Measuring your churn recovery ROI',
    description:
      'The four numbers you need to track, what good looks like for a 500–2,000 subscriber business, and how to know if it\'s actually working.',
  },
]

export default function ChurnRecoveryPlaybook() {
  return (
    <>
      <Head>
        <title>Free Churn Recovery Playbook — Membership Site Tactics That Work | ChurnRecovery</title>
        <meta
          name="description"
          content="The Membership Site Churn Recovery Playbook: the exact tactics to stop subscriber cancellations before they happen. Free download — no fluff, just what works."
        />
        <meta property="og:title" content="The Membership Site Churn Recovery Playbook — Free" />
        <meta
          property="og:description"
          content="Tactics for newsletter creators, coaches, and membership site owners to recover canceled subscribers and failed payments. Practical and free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://churnrecovery.com/resources/churn-recovery-playbook" />
        <link rel="canonical" href="https://churnrecovery.com/resources/churn-recovery-playbook" />
      </Head>

      <Header />

      <main style={{ background: t.bg, minHeight: '100vh', paddingTop: 60 }}>
        {/* Hero section */}
        <section style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '80px 24px 64px',
          textAlign: 'center',
        }}>
          {/* Label */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: t.greenLight,
            border: `1px solid #C6E6D4`,
            borderRadius: 20,
            padding: '6px 16px',
            marginBottom: 28,
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: t.fontSans, color: t.green, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Free Resource
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: t.fontSerif,
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 700,
            color: t.text,
            lineHeight: 1.2,
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}>
            The Membership Site<br />Churn Recovery Playbook
          </h1>

          {/* Subheadline */}
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: t.gray,
            lineHeight: 1.7,
            margin: '0 0 48px',
          }}>
            The exact tactics to stop subscriber cancellations before they happen — free
          </p>

          {/* What's inside */}
          <div style={{
            background: t.white,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            padding: '32px',
            marginBottom: 48,
            textAlign: 'left',
          }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: t.grayLight,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '0 0 20px',
            }}>
              What's inside
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {playbookContents.map((item) => (
                <li key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0, marginTop: 2 }}>{item.emoji}</span>
                  <div>
                    <p style={{
                      fontFamily: t.fontSans,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: t.text,
                      margin: '0 0 4px',
                    }}>
                      {item.title}
                    </p>
                    <p style={{
                      fontFamily: t.fontSerif,
                      fontSize: '0.85rem',
                      color: t.gray,
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form section */}
          <div style={{
            background: t.white,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            padding: '32px',
            textAlign: 'left',
          }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: '1.1rem',
              fontWeight: 700,
              color: t.text,
              margin: '0 0 8px',
            }}>
              Get the free playbook
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.875rem',
              color: t.gray,
              lineHeight: 1.6,
              margin: '0 0 20px',
            }}>
              Enter your email and we'll send it right over. No spam — just the playbook, then our weekly churn reduction tips.
            </p>
            <WaitlistForm source="playbook" />
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              color: t.grayLight,
              margin: '16px 0 0',
            }}>
              ~2,000 words. Plain language. No fluff. Written by the founder of ChurnRecovery.
            </p>
          </div>
        </section>

        {/* Social proof section */}
        <section style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '0 24px 80px',
        }}>
          <div style={{
            borderTop: `1px solid ${t.border}`,
            paddingTop: 48,
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.9rem',
              color: t.gray,
              lineHeight: 1.7,
              margin: '0 0 24px',
            }}>
              This playbook is the foundation of how ChurnRecovery works. If you want to see these tactics in action — with a live demo, no signup required:
            </p>
            <a
              href="/demo"
              style={{
                fontFamily: t.fontSans,
                fontSize: '0.9rem',
                fontWeight: 600,
                color: t.accent,
                textDecoration: 'none',
              }}
            >
              See the cancel flow demo →
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: ${t.bg}; }
      `}</style>
    </>
  )
}
