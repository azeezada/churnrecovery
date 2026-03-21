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
  kitBlue: '#3B82F6',
  kitDark: '#0F172A',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// ─── Waitlist Form (convertkit/Kit-specific) ────────────────────────────────
function KitWaitlistForm({ dark = false }) {
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
          source: 'convertkit-lp',
          tag: 'convertkit-creator',
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
            : "Free beta access for Kit creators. We'll email you when we're ready."}
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
          {status === 'loading' ? 'Joining...' : 'Keep My Kit Subscribers →'}
        </button>
        <input type="hidden" name="source" value="convertkit-lp" />
        <input type="hidden" name="tag" value="convertkit-creator" />
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

export default function ConvertKitLandingPage() {
  return (
    <>
      <Head>
        <title>Keep Your Kit (ConvertKit) Paid Subscribers From Canceling | ChurnRecovery</title>
        <meta name="description" content="Kit (formerly ConvertKit) creators: stop losing paid newsletter subscribers at cancellation. ChurnRecovery integrates with Stripe to intercept cancellations and win them back automatically." />
        <link rel="canonical" href="https://churnrecovery.com/for/convertkit" />
        <meta property="og:title" content="Keep Your Kit Paid Subscribers From Canceling | ChurnRecovery" />
        <meta property="og:description" content="Stop losing Kit/ConvertKit paid subscribers silently. ChurnRecovery catches cancellations in real-time and wins them back." />
        <meta property="og:url" content="https://churnrecovery.com/for/convertkit" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Keep Your Kit Paid Subscribers From Canceling" />
        <meta name="twitter:description" content="ChurnRecovery for Kit (ConvertKit) creators — catch cancellations and recover revenue automatically." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #020817 0%, #0F172A 50%, #020817 100%)',
          padding: '80px 24px 100px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: '#93C5FD', marginBottom: '28px',
            }}>
              <span>✓</span> For Kit (ConvertKit) Creators · No Credit Card Required
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Keep Your Kit Paid Subscribers<br />
              <span style={{ color: '#93C5FD' }}>From Canceling</span>
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              You built an audience on Kit (formerly ConvertKit). Now paid subscribers are canceling — and you&apos;re finding out after the fact. ChurnRecovery intercepts cancellations in real-time and automatically tries to win them back with personalized offers before they&apos;re gone.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <KitWaitlistForm dark={true} />
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
              }}>The Creator Economy Problem</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                You Built the Audience.<br />Now They&apos;re Leaving.
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '560px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Kit is great for building a creator business. But when paid subscribers cancel, Kit shows you the number drop — not why it happened, and not how to stop it.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="💸"
                title="Monthly Revenue Is Always at Risk"
                stat="3–8%"
                statLabel="of paid subscribers churn every month on average"
                description="A 500-subscriber paid newsletter at $10/month loses $150–$400 every month to churn. That's $1,800–$4,800 per year — quietly disappearing."
              />
              <PainCard
                icon="🚪"
                title="No Cancel Flow = No Second Chance"
                description="Kit doesn't give you a cancellation flow for paid subscribers. The moment someone decides to cancel, they're gone. No discount offer, no pause, no &quot;here's what you're missing.&quot;"
              />
              <PainCard
                icon="❓"
                title="You Don't Know Why They Leave"
                description="Is it price? Did they find a competitor? Did life get busy? You can't fix what you don't know. Right now you're flying blind every time someone churns."
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
              }}>Simple Setup</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Works With Kit in 10 Minutes
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
              }}>
                No developer. No code. Connect your Stripe account and we handle the rest.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🔗"
                title="Connect via Stripe"
                description="Kit Commerce (paid subscriptions) processes payments through Stripe. Connect ChurnRecovery to your Stripe account — we start listening for cancellation signals immediately. No developer needed."
                callout="✓ Kit Commerce uses Stripe. We plug in directly."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="Cancellations Detected in Real-Time"
                description="The moment a subscriber starts to cancel their paid Kit subscription, ChurnRecovery knows. We intercept the event before it's final and automatically trigger your recovery flow."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Win Them Back Automatically"
                description="Subscribers see a message that sounds like it came from you — a pause offer, a discount, a personal note about what's coming. Many will stay. No manual work on your end."
                callout="🎯 Typical save rate: 20–35% of at-risk subscribers"
              />
            </div>

            <div style={{
              marginTop: '32px',
              background: '#F0F4FF',
              border: `1px solid ${t.kitBlue}30`,
              borderLeft: `4px solid ${t.kitBlue}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Does ChurnRecovery work with Kit (ConvertKit)?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                Yes. Kit Commerce uses Stripe to process paid subscriptions and recurring charges. ChurnRecovery hooks into Stripe webhook events — no direct Kit API integration needed. If your paid newsletter or product runs through Stripe via Kit, it works.
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
                Rescue Revenue. Understand Your Audience.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="💰"
                title="Rescue Revenue Automatically"
                description="20–35% of subscribers who start to cancel will accept an offer and stay. Set it up once, save money every month."
              />
              <BenefitCard
                icon="🔍"
                title="Understand Why People Leave"
                description="Collect real cancellation reasons. Is it price, content gaps, or timing? Use that data to improve your newsletter and reduce future churn."
              />
              <BenefitCard
                icon="⏸"
                title="Pause Instead of Cancel"
                description="Give subscribers a pause option. Creators who build monthly habits know: sometimes people just need a break, not a permanent exit."
              />
              <BenefitCard
                icon="📊"
                title="Revenue Recovery Dashboard"
                description="Track recovered revenue, see which messages perform, and understand your recovery rate over time. Know your numbers."
              />
              <BenefitCard
                icon="✉️"
                title="Sounds Like You, Not a Robot"
                description="Your messages are customizable — your voice, your brand, your offer. Subscribers feel heard by their creator, not trapped by software."
              />
              <BenefitCard
                icon="🆓"
                title="Free Until You're Earning"
                description="Free for newsletters under $1k/month MRR. No trial period. No credit card. Risk nothing — there's only upside."
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
              Simple Pricing for Creators
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
              lineHeight: 1.7, margin: '0 0 32px',
            }}>
              Free until you hit $1,000/month MRR. Scales with your newsletter — never a barrier to getting started.
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
                    }}>START HERE</div>
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
              Compare to Churnkey ($250+/month) or ProfitWell Retain ($400+/month). Kit creators deserve better.
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
                Questions From Kit Creators
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Kit (ConvertKit)?',
                a: "Yes. Kit Commerce processes paid subscriptions through Stripe. ChurnRecovery connects to Stripe directly and listens for cancellation webhooks — no special Kit API integration needed. If you sell paid newsletters or recurring products through Kit, it works.",
              },
              {
                q: 'Does it matter that ConvertKit rebranded to Kit?',
                a: "Not at all. Whether you call it Kit or ConvertKit, the underlying Stripe integration is the same. ChurnRecovery works with both old and new Kit accounts.",
              },
              {
                q: 'Do I need a developer?',
                a: "No. The setup is copy-paste: add a webhook URL from ChurnRecovery to your Stripe dashboard. Takes about 10 minutes with our step-by-step guide.",
              },
              {
                q: "Will it look like a third-party tool to my subscribers?",
                a: "No — unless you want it to. Your cancel flow messages are fully customizable. Subscribers see your words, your offer, your tone. ChurnRecovery is invisible infrastructure.",
              },
              {
                q: 'What kinds of offers can I show at cancellation?',
                a: "You can offer a pause (1–3 months), a discount (percentage off), a free month, or a personal note. You decide what to offer and when. We handle the delivery and tracking.",
              },
              {
                q: "What's the typical save rate?",
                a: "20–35% of at-risk subscribers accept an offer and stay. On a $3,000/month newsletter, that's $600–$1,050 per month saved that you would have lost.",
              },
              {
                q: 'Can I cancel ChurnRecovery?',
                a: "Yes, any time. No contracts. The free tier is free forever — just disconnect the webhook if you want to stop. Zero risk.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ───────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #020817 0%, #0F172A 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              A Kit Subscriber Is Canceling<br />Right Now.
              <br /><span style={{ color: '#93C5FD' }}>Are You Catching Them?</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Get free beta access to stop Kit cancellations automatically.
              Designed for newsletter creators, coaches, and subscription business owners.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <KitWaitlistForm dark={true} />
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
