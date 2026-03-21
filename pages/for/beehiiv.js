import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentHover: '#C4603D',
  accentBg: '#FDF4F0',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenBg: '#EDF7F1',
  red: '#DC2626',
  orange: '#EA580C',
  amber: '#D97706',
  beehiivYellow: '#FFCC00',
  beehiivDark: '#1A1A1A',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// ─── Waitlist Form (beehiiv-specific) ──────────────────────────────────────
function BeehiivWaitlistForm({ dark = false }) {
  const [email, setEmail] = useState('')
  const [newsletterName, setNewsletterName] = useState('')
  const [status, setStatus] = useState('idle')
  const [count, setCount] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then(r => r.json())
      .then(d => { if (d.count > 0) setCount(d.count) })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Please enter a valid email address')
      return
    }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: 'beehiiv-lp',
          tag: 'beehiiv-creator',
          newsletterName: newsletterName.trim(),
        }),
      })
      const data = await res.json()
      if (res.status === 201) {
        setStatus('success')
        if (data.count) setCount(data.count)
      } else if (data.duplicate) {
        setStatus('duplicate')
      } else {
        setStatus('error')
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setError('Network error. Please check your connection.')
    }
  }

  const bgColor = dark ? 'rgba(255,255,255,0.08)' : t.white
  const borderColor = dark ? 'rgba(255,255,255,0.15)' : t.border
  const textColor = dark ? t.white : t.text
  const subtextColor = dark ? 'rgba(255,255,255,0.6)' : t.gray

  if (status === 'success' || status === 'duplicate') {
    return (
      <div style={{
        textAlign: 'center', padding: '24px', borderRadius: '12px',
        background: dark ? 'rgba(45,122,79,0.15)' : t.greenBg,
        border: `1px solid ${dark ? 'rgba(45,122,79,0.3)' : '#C6E6D4'}`,
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
          {status === 'duplicate' ? '👋' : '🎉'}
        </div>
        <p style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1rem', color: dark ? t.white : t.text, margin: '0 0 6px' }}>
          {status === 'duplicate' ? "You're already on the list!" : "You're in! We'll be in touch soon."}
        </p>
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.85rem', color: subtextColor, margin: 0 }}>
          {status === 'duplicate'
            ? "We've got your email — we'll reach out when we launch."
            : "Free beta access for Beehiiv creators. We'll email you when we're ready."}
        </p>
        {count && (
          <p style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: subtextColor, margin: '10px 0 0' }}>
            Join {count.toLocaleString()} newsletter creators on the waitlist
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoComplete="email"
          aria-label="Email address"
          style={{
            padding: '13px 16px', borderRadius: '8px',
            border: `1px solid ${error ? t.red : borderColor}`,
            background: bgColor, fontFamily: t.fontSans,
            fontSize: '0.95rem', color: textColor, outline: 'none',
          }}
        />
        <input
          type="text"
          value={newsletterName}
          onChange={e => setNewsletterName(e.target.value)}
          placeholder="Your newsletter name (optional)"
          aria-label="Newsletter name"
          style={{
            padding: '13px 16px', borderRadius: '8px',
            border: `1px solid ${borderColor}`,
            background: bgColor, fontFamily: t.fontSans,
            fontSize: '0.95rem', color: textColor, outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '14px 28px', borderRadius: '8px', border: 'none',
            background: status === 'loading' ? t.grayLight : t.accent,
            color: t.white, fontFamily: t.fontSans, fontWeight: 700,
            fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {status === 'loading' ? 'Joining...' : 'Protect My Beehiiv Revenue →'}
        </button>
        <input type="hidden" name="source" value="beehiiv-lp" />
        <input type="hidden" name="tag" value="beehiiv-creator" />
      </form>
      {error && (
        <p style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.red, margin: '8px 0 0' }}>
          ⚠ {error}
        </p>
      )}
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: subtextColor }}>
          🆓 Free during beta
        </span>
        <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: subtextColor }}>
          🔒 No credit card required
        </span>
        {count && (
          <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: subtextColor }}>
            <span style={{ color: t.green }}>●</span> {count.toLocaleString()} on waitlist
          </span>
        )}
      </div>
    </div>
  )
}

function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div style={{
      background: t.white, border: `1px solid ${t.border}`,
      borderRadius: '12px', padding: '28px 24px',
      borderTop: `3px solid ${t.amber}`,
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
        {title}
      </h3>
      {stat && (
        <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '2rem', color: t.amber, margin: '4px 0' }}>
          {stat}
        </div>
      )}
      {statLabel && (
        <div style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.orange, marginBottom: '8px' }}>
          {statLabel}
        </div>
      )}
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: 0, lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  )
}

function HowStep({ number, icon, title, description, callout }) {
  return (
    <div style={{
      background: t.white, border: `1px solid ${t.border}`,
      borderRadius: '12px', padding: '28px 24px',
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: t.accentBg, border: `2px solid ${t.accent}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem',
          color: t.accent, flexShrink: 0,
        }}>{number}</div>
        <div>
          <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{icon}</div>
          <h3 style={{ fontFamily: t.fontSans, fontSize: '1.05rem', fontWeight: 700, color: t.text, margin: 0 }}>
            {title}
          </h3>
        </div>
      </div>
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 12px', lineHeight: 1.7 }}>
        {description}
      </p>
      {callout && (
        <div style={{
          background: t.accentBg, border: `1px solid ${t.accent}30`,
          borderRadius: '8px', padding: '10px 14px',
          fontFamily: t.fontSans, fontSize: '0.8rem', color: t.orange,
        }}>
          {callout}
        </div>
      )}
    </div>
  )
}

function BenefitCard({ icon, title, description }) {
  return (
    <div style={{
      display: 'flex', gap: '14px', alignItems: 'flex-start',
      background: t.white, border: `1px solid ${t.border}`,
      borderRadius: '10px', padding: '20px',
    }}>
      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{icon}</span>
      <div>
        <h4 style={{ fontFamily: t.fontSans, fontSize: '0.92rem', fontWeight: 700, color: t.text, margin: '0 0 4px' }}>
          {title}
        </h4>
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.82rem', color: t.gray, margin: 0, lineHeight: 1.55 }}>
          {description}
        </p>
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      border: `1px solid ${t.border}`, borderRadius: '10px',
      overflow: 'hidden', marginBottom: '8px',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: t.white, border: 'none', cursor: 'pointer',
          padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: '12px', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.93rem', color: t.text }}>
          {q}
        </span>
        <span style={{ color: t.accent, fontSize: '1.2rem', fontWeight: 700, flexShrink: 0 }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 16px', background: t.bg }}>
          <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: 0, lineHeight: 1.7 }}>
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function BeehiivLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing Beehiiv Premium Subscribers | ChurnRecovery</title>
        <meta name="description" content="Beehiiv creators: stop losing paid newsletter subscribers at the cancel screen. ChurnRecovery works with Stripe to intercept cancellations and win them back automatically." />
        <link rel="canonical" href="https://churnrecovery.com/for/beehiiv" />
        <meta property="og:title" content="Stop Losing Beehiiv Premium Subscribers | ChurnRecovery" />
        <meta property="og:description" content="Catch Beehiiv cancellations in real-time. Automatically win back paid subscribers with personalized offers — no code required." />
        <meta property="og:url" content="https://churnrecovery.com/for/beehiiv" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing Beehiiv Premium Subscribers" />
        <meta name="twitter:description" content="Stop losing paid Beehiiv subscribers silently. ChurnRecovery catches cancellations in real-time." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #0A0A00 0%, #1A1A00 50%, #0A0A00 100%)',
          padding: '80px 24px 100px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,204,0,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,204,0,0.12)', border: '1px solid rgba(255,204,0,0.25)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: '#FFE066', marginBottom: '28px',
            }}>
              <span>✓</span> Free for Beehiiv Creators · No Credit Card Required
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Stop Losing Beehiiv Premium<br />
              <span style={{ color: '#FFE066' }}>Subscribers at the Cancel Screen</span>
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              You&apos;ve built a real paid newsletter on Beehiiv. Now ChurnRecovery intercepts cancellations the moment they happen — and automatically offers the right message, discount, or pause to win subscribers back. Before they&apos;re gone.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <BeehiivWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                🆓 Free for newsletters under $1k/month MRR
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                ⚡ 10-minute setup via Stripe
              </span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <Link href="/demo" style={{
                fontFamily: t.fontSans, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)',
              }}>
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PAIN POINTS ─────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: t.orange, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>The Paid Newsletter Problem</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Beehiiv Scale Is $99/Month.<br />Every Cancellation Feels Personal.
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '560px', margin: '0 auto', lineHeight: 1.7,
              }}>
                You work hard on your newsletter. When a paid subscriber leaves, Beehiiv shows you a number drop — but gives you no way to stop it or understand why.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="💸"
                title="Subscribers Leave Silently"
                stat="3–8%"
                statLabel="monthly churn rate for paid newsletters"
                description="On a 500-subscriber paid newsletter at $10/month, that's $150–$400 disappearing every month. Quietly. Without warning."
              />
              <PainCard
                icon="🚪"
                title="Beehiiv Gives You No Cancel Flow"
                description="When a premium subscriber clicks cancel on Beehiiv, they're gone. No friction. No offer. No chance to save them. Beehiiv doesn't give you a cancel screen — we do."
              />
              <PainCard
                icon="📊"
                title="You Find Out Too Late"
                description="Your MRR drops in the dashboard. By then, the subscriber has moved on. You missed the one window where you could have changed their mind — the moment they almost left."
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────── */}
        <section id="how-it-works" style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>Dead Simple Setup</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Works With Beehiiv in 10 Minutes
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
              }}>
                No developer. No code. Just connect your Stripe account and go.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🔗"
                title="Connect via Stripe"
                description="Beehiiv processes paid subscriptions through Stripe. Connect ChurnRecovery to your Stripe account — we listen for cancellation signals in real-time. Takes 2 minutes, no developer needed."
                callout="✓ Beehiiv Scale uses Stripe under the hood. We plug right in."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a subscriber starts to cancel their Beehiiv premium subscription, ChurnRecovery detects the signal. We intercept it before it's final and trigger your recovery flow automatically."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Message Wins Them Back"
                description="Subscribers see a personal message from you: a pause option, a discount, a note explaining what's coming in your newsletter. Many will stay. You'll be surprised how many."
                callout="🎯 Avg save rate: 20–35% of at-risk subscribers"
              />
            </div>

            <div style={{
              marginTop: '32px',
              background: '#FFFDF0',
              border: `1px solid ${t.beehiivYellow}40`,
              borderLeft: `4px solid ${t.beehiivYellow}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Does ChurnRecovery work with Beehiiv?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                Yes. Beehiiv Scale uses Stripe to process paid subscriptions. ChurnRecovery hooks into Stripe webhooks to detect cancellations — no Beehiiv API integration required. If your Beehiiv newsletter is paid and running on Stripe, it works.
              </p>
              <Link href="/docs" style={{
                fontFamily: t.fontSans, fontSize: '0.82rem', color: t.accent,
                textDecoration: 'none', fontWeight: 600,
              }}>
                See technical docs →
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/demo" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: t.accentBg, border: `1px solid ${t.accent}40`,
                borderRadius: '10px', padding: '14px 28px',
                fontFamily: t.fontSans, fontWeight: 700, color: t.accent,
                textDecoration: 'none', fontSize: '0.95rem',
              }}>
                🎮 Try the Interactive Demo
              </Link>
              <p style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: t.grayLight, marginTop: '8px' }}>
                See a live cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>What You Get</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                Keep the Subscribers You Worked Hard to Get
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="⏸"
                title="Pause Instead of Cancel"
                description="Offer subscribers a 1–2 month pause. Many people cancel because life got busy, not because they hate your content. A pause saves them."
              />
              <BenefitCard
                icon="💬"
                title="Understand Why People Leave"
                description="Collect cancellation reasons automatically. Is it price? No time? Missing content? You'll finally know — and you can fix it."
              />
              <BenefitCard
                icon="💰"
                title="Recover Revenue Automatically"
                description="Offer a discount at exactly the right moment — when they're about to leave. 20–35% of at-risk subscribers accept and stay."
              />
              <BenefitCard
                icon="📊"
                title="Revenue Recovery Dashboard"
                description="See how much you've saved, which messages work, and what your recovery rate is. Real data, not guesses."
              />
              <BenefitCard
                icon="✉️"
                title="Personal, On-Brand Messaging"
                description="Your messages sound like you — warm, creator-to-reader. Not a generic SaaS popup. Subscribers appreciate the human touch."
              />
              <BenefitCard
                icon="🆓"
                title="Free for Growing Newsletters"
                description="Under $1k/month MRR? Completely free. No trial. No gotcha. We grow when you grow."
              />
            </div>
          </div>
        </section>

        {/* ─── PRICING ─────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: t.text, margin: '0 0 20px', letterSpacing: '-0.02em',
            }}>
              Pricing That Makes Sense for Newsletter Creators
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
              lineHeight: 1.7, margin: '0 0 32px',
            }}>
              Beehiiv Scale costs $99/month. ChurnRecovery is free until you&apos;re earning $1,000/month — and a fraction of what tools like Churnkey charge after that.
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px', marginBottom: '28px',
            }}>
              {[
                { tier: 'Starter', price: '$0/month', range: 'Under $1k MRR', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} style={{
                  background: highlight ? t.accentBg : t.bg,
                  border: `1px solid ${highlight ? t.accent : t.border}`,
                  borderRadius: '10px', padding: '18px',
                  position: 'relative',
                }}>
                  {highlight && (
                    <div style={{
                      position: 'absolute', top: '-10px', left: '50%',
                      transform: 'translateX(-50%)',
                      background: t.accent, color: t.white,
                      fontFamily: t.fontSans, fontSize: '0.7rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '100px',
                    }}>MOST CREATORS START HERE</div>
                  )}
                  <div style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, fontSize: '0.9rem' }}>{tier}</div>
                  <div style={{ fontFamily: t.fontSans, fontWeight: 800, color: highlight ? t.accent : t.text, fontSize: '1.4rem', margin: '4px 0' }}>{price}</div>
                  <div style={{ fontFamily: t.fontSerif, fontSize: '0.78rem', color: t.gray }}>{range}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: t.greenBg, border: '1px solid #C6E6D4',
              borderRadius: '10px', padding: '14px 20px',
              fontFamily: t.fontSans, fontSize: '0.88rem', color: t.green,
              marginBottom: '24px',
            }}>
              Beehiiv Scale is $99/month. ChurnRecovery is free until you hit $1k MRR — and $29/month after that. No brainer.
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                Questions From Beehiiv Creators
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Beehiiv?',
                a: "Yes. Beehiiv Scale uses Stripe to process paid subscriptions. ChurnRecovery connects to your Stripe account and listens for cancellation events — no special Beehiiv integration needed. As long as your paid newsletter runs through Stripe, it works.",
              },
              {
                q: 'Do I need to know how to code?',
                a: "Not at all. If you can copy-paste a webhook URL, you can set up ChurnRecovery. The whole process takes about 10 minutes, and we have step-by-step guides with screenshots.",
              },
              {
                q: "Will subscribers know it's a third-party tool?",
                a: "You control the messages. They'll see your words, your tone, your offer — not a generic SaaS popup. We're invisible infrastructure. Your subscribers just feel like you care about them.",
              },
              {
                q: "What if I'm on the free Beehiiv plan?",
                a: "Free Beehiiv newsletters don't have paid subscribers, so ChurnRecovery wouldn't apply. This is specifically for Beehiiv Scale creators who have paying subscribers processed through Stripe.",
              },
              {
                q: 'How is this different from what Beehiiv offers?',
                a: "Beehiiv doesn't have a cancellation flow for premium subscribers. When someone cancels, they just cancel. ChurnRecovery adds the missing layer — a moment between 'I'm thinking about canceling' and 'I'm gone.'",
              },
              {
                q: "What's the save rate?",
                a: "It depends on your newsletter and offers, but typical save rates are 20–35% of at-risk subscribers. On a $5,000/month newsletter, that can mean $1,000–$1,750/month recovered that you would have lost.",
              },
              {
                q: 'What if I want to cancel ChurnRecovery?',
                a: "Cancel any time. No contracts, no fees on the free tier. You risk nothing by trying.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ───────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #0A0A00 0%, #1A1A00 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              A Beehiiv Subscriber Is Canceling<br />Right Now.
              <br /><span style={{ color: '#FFE066' }}>Are You Going to Catch Them?</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Be first to stop Beehiiv cancellations automatically.
              Free beta access for newsletter creators who sign up today.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <BeehiivWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                Free during beta
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                Cancel anytime
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                No spam, ever
              </span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
