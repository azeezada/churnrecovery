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
  accent: '#FF424D',
  accentHover: '#E63440',
  accentBg: '#FFF5F5',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenBg: '#EDF7F1',
  red: '#DC2626',
  orange: '#EA580C',
  amber: '#D97706',
  patreonRed: '#FF424D',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function PatreonWaitlistForm({ dark = false }) {
  const [email, setEmail] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
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
          source: 'patreon-lp',
          tag: 'patreon-creator',
          websiteUrl: websiteUrl.trim(),
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
            : "Free beta access for content creators. We'll email you when we're ready."}
        </p>
        {count && (
          <p style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: subtextColor, margin: '10px 0 0' }}>
            Join {count.toLocaleString()} creators on the waitlist
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
          type="url"
          value={websiteUrl}
          onChange={e => setWebsiteUrl(e.target.value)}
          placeholder="your website or Patreon URL (optional)"
          aria-label="Your website or Patreon URL"
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
          {status === 'loading' ? 'Joining...' : 'Reduce Patron Cancellations →'}
        </button>
        <input type="hidden" name="source" value="patreon-lp" />
        <input type="hidden" name="tag" value="patreon-creator" />
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
          fontFamily: t.fontSans, fontSize: '0.8rem', color: t.accent,
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

export default function PatreonLandingPage() {
  return (
    <>
      <Head>
        <title>Reduce Patron Cancellations | ChurnRecovery for Patreon Creators</title>
        <meta name="description" content="Reduce patron cancellations with a smarter cancel flow. ChurnRecovery works for creators with their own Stripe subscriptions — and helps Patreon creators build off-platform income." />
        <link rel="canonical" href="https://churnrecovery.com/for/patreon" />
        <meta property="og:title" content="Reduce Patron Cancellations | ChurnRecovery" />
        <meta property="og:description" content="Smarter cancel flows for content creators. Works for creators with Stripe subscriptions alongside Patreon." />
        <meta property="og:url" content="https://churnrecovery.com/for/patreon" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reduce Patron Cancellations with a Smarter Cancel Flow" />
        <meta name="twitter:description" content="ChurnRecovery for content creators — reduce cancellations on your own Stripe subscriptions." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #1A0000 0%, #2E0507 50%, #1A0000 100%)',
          padding: '80px 24px 100px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,66,77,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,66,77,0.2)', border: '1px solid rgba(255,66,77,0.4)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: '#FCA5A5', marginBottom: '28px',
            }}>
              <span>✓</span> For Content Creators · Free During Beta
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Reduce Patron Cancellations<br />
              <span style={{ color: '#FCA5A5' }}>With a Smarter Cancel Flow</span>
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              Patreon doesn&apos;t give you control over your cancel flow — but your own website can.
              ChurnRecovery works for creators who run Stripe subscriptions directly, giving you a smarter
              cancel experience that saves patrons before they&apos;re gone.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <PatreonWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                🆓 Free forever under $1k/month MRR
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                💡 Works with your own Stripe subscriptions
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

        {/* ─── HONEST NOTE ─────────────────────────────────────────────── */}
        <section style={{ padding: '40px 24px', background: '#FFFBEB', borderBottom: `1px solid #FDE68A` }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{
              display: 'flex', gap: '16px', alignItems: 'flex-start',
              background: t.white, border: '1px solid #FDE68A',
              borderLeft: `4px solid #D97706`,
              borderRadius: '10px', padding: '20px 24px',
            }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>💡</span>
              <div>
                <h3 style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                  Quick heads-up about Patreon
                </h3>
                <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                  Patreon uses its own proprietary payment system — not Stripe. This means ChurnRecovery
                  can&apos;t directly intercept cancellations that happen inside Patreon&apos;s platform.
                </p>
                <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: 0, lineHeight: 1.7 }}>
                  ChurnRecovery works for Patreon creators who <strong>also run their own Stripe subscriptions</strong> —
                  either on their website or as an off-platform membership. If you&apos;re ready to bring your audience
                  to a subscription you control (where you keep more money and own your relationships),
                  we&apos;re built for exactly that transition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PAIN POINTS ─────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: t.orange, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>The Platform Dependency Problem</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                On Patreon, You Don&apos;t Control<br />the Cancel Moment
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Patreon owns the cancel flow. Patreon owns the relationship. Patreon takes 8–12% of your revenue.
                The good news: you can change all three.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="🔒"
                title="No Control Over Your Cancel Flow"
                description="When a patron cancels on Patreon, Patreon handles it entirely — their UI, their copy, their options. You have no intervention point, no pause offer, no custom message. Zero control."
              />
              <PainCard
                icon="💸"
                title="Patreon Takes 8–12% of Everything"
                stat="8–12%"
                statLabel="of every dollar your patrons pay — goes to Patreon"
                description="On $5,000/month, that's $400–$600 per month going to a platform you don't own. A direct Stripe subscription keeps more of that in your pocket."
              />
              <PainCard
                icon="🚪"
                title="You Don't Own the Relationship"
                description="If Patreon changes its algorithm, terms, or fee structure — or shuts down — your patron relationships go with it. Creators who build on owned platforms have full control forever."
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────────── */}
        <section id="how-it-works" style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>How Patreon Creators Use ChurnRecovery</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Bring Your Audience Off-Platform.<br />Own the Relationship. Keep the Revenue.
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
              }}>
                The most successful Patreon creators run their own subscription alongside Patreon — and gradually migrate their best patrons there.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🌐"
                title="Set Up Your Own Stripe Subscription"
                description="Launch a direct membership on your own website — using Stripe directly. Same content, same tiers, but you keep 97% of the revenue (Stripe's rate) instead of 88–92% (after Patreon fees). We help you set up the cancel flow."
                callout="✓ Patreon and your own subscription can run simultaneously."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="ChurnRecovery Protects Your Direct Subscribers"
                description="When a subscriber on your own Stripe membership initiates a cancel, ChurnRecovery intercepts it in real time. They see your pause offer, your discount, your personal note — before the cancel is final."
              />
              <HowStep
                number="3"
                icon="🔄"
                title="Gradually Invite Patrons to Your Direct Membership"
                description="Offer your top Patreon patrons early access to your direct membership — lower price for them, more revenue for you. Over time, your dependency on Patreon decreases while your control increases."
                callout="🎯 Creators report keeping 15–20% more revenue per patron on direct subscriptions"
              />
            </div>

            <div style={{
              marginTop: '32px',
              background: t.accentBg,
              border: `1px solid ${t.accent}30`,
              borderLeft: `4px solid ${t.accent}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                Why Patreon creators move off-platform
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                It&apos;s not about abandoning Patreon — many creators run both simultaneously. It&apos;s about building a subscription business that you own, where you control the cancel flow, keep more of the revenue, and aren&apos;t dependent on platform decisions you can&apos;t control.
              </p>
              <Link href="/docs" style={{
                fontFamily: t.fontSans, fontSize: '0.82rem', color: t.accent,
                textDecoration: 'none', fontWeight: 600,
              }}>
                Read the migration guide →
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
                See a live cancel flow — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ────────────────────────────────────────────────── */}
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
                Everything You Need to Own Your Subscriber Relationships
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="⚡"
                title="Real-Time Cancel Interception"
                description="For your direct Stripe subscriptions: intercept the cancel moment in real time and respond before it's final."
              />
              <BenefitCard
                icon="⏸"
                title="Pause Option for Your Subscribers"
                description="Give subscribers a 30-day break instead of a permanent goodbye. Especially powerful for content creators — fans come back."
              />
              <BenefitCard
                icon="💬"
                title="Personalized Win-Back Messages"
                description="Your voice, your brand. A message that sounds like it came from you — not a software company popup."
              />
              <BenefitCard
                icon="📉"
                title="Discount Offers at the Cancel Moment"
                description="One-time discount when someone starts to cancel. Keeping them at a lower tier beats losing them to Patreon completely."
              />
              <BenefitCard
                icon="📊"
                title="Revenue Recovery Dashboard"
                description="See exactly how much revenue you've protected on your direct subscriptions. Track save rates and what works."
              />
              <BenefitCard
                icon="🔓"
                title="Platform Independence"
                description="Own your subscriber list. Own the cancel flow. Keep more of what you earn. No platform can take that away."
              />
              <BenefitCard
                icon="🆓"
                title="Free Under $1k/Month MRR"
                description="Just getting your direct subscription started? ChurnRecovery is free until you hit $1k/month in recurring revenue."
              />
              <BenefitCard
                icon="🔒"
                title="No Code Required"
                description="Connect Stripe, write your message, go live. 10 minutes. Step-by-step guide included. No developer needed."
              />
            </div>
          </div>
        </section>

        {/* ─── PRICING ─────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: t.text, margin: '0 0 20px', letterSpacing: '-0.02em',
            }}>
              Priced for Independent Creators
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
              lineHeight: 1.7, margin: '0 0 32px',
            }}>
              Free while you build your direct subscription. Scales as your revenue grows.
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
                    }}>START HERE FREE</div>
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
              Patreon takes 8–12% of your revenue forever. ChurnRecovery charges a flat fee — and starts free. 😊
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                Questions From Patreon Creators
              </h2>
            </div>

            {[
              {
                q: 'Does ChurnRecovery work directly with Patreon?',
                a: "Important note: Patreon uses its own proprietary payment system — not Stripe. ChurnRecovery works at the Stripe level, so it cannot directly intercept cancellations that happen inside Patreon's platform. ChurnRecovery works for Patreon creators who also run a direct Stripe subscription (on their own website or alongside Patreon).",
              },
              {
                q: 'What if I only have Patreon right now?',
                a: "Then ChurnRecovery isn't the right fit for you yet — and we'd rather be honest about that than sign you up for something that doesn't work. When you're ready to launch a direct subscription alongside Patreon, come back and we'll be here.",
              },
              {
                q: "Why would I run a subscription outside of Patreon?",
                a: "Control and revenue. On Patreon, you pay 8–12% in fees and have zero control over the cancel flow, the subscriber relationship, or what happens if Patreon changes its terms. A direct Stripe subscription lets you keep 97% of revenue, own your subscriber list, and control every touchpoint — including what happens when someone tries to cancel.",
              },
              {
                q: 'Can I run both Patreon and a direct subscription simultaneously?',
                a: "Yes — and many creators do. You can offer exclusive perks on your direct subscription (earlier access, lower price, more intimate community) while keeping Patreon for discoverability. Over time, your most loyal fans migrate where you make more and control more.",
              },
              {
                q: "Isn't migrating off Patreon risky?",
                a: "It can feel risky, but not moving is also a risk — you're building on a platform you don't control. The smart approach is gradual: start a direct subscription, run both in parallel, invite your top patrons, and migrate slowly. No cliff jumps required.",
              },
              {
                q: 'What does the migration actually look like?',
                a: "Typically: (1) Set up a Stripe subscription on your website. (2) Add ChurnRecovery to protect new direct subscribers from day one. (3) Offer existing Patreon patrons an exclusive deal to join your direct subscription. (4) Over 6–12 months, your direct revenue grows while Patreon becomes optional.",
              },
              {
                q: 'Will Patreon penalize me for having a direct subscription?',
                a: "No. Patreon's terms allow creators to have subscriptions on other platforms simultaneously. Many top creators run both. What matters is delivering value to your supporters wherever they are.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #1A0000 0%, #2E0507 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              Own Your Subscriber Relationships.<br />Control the Cancel Flow.
              <br /><span style={{ color: '#FCA5A5' }}>Keep More of What You Earn.</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Free beta access for content creators ready to build beyond Patreon.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <PatreonWaitlistForm dark={true} />
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
