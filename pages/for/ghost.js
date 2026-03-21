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
  ghostDark: '#15171A',
  ghostMid: '#1F2428',
  ghostAccent: '#A0ADB8',
  ghostAccentLight: '#C8D5E0',
  ghostBorder: 'rgba(255,255,255,0.1)',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// ─── Waitlist Form (ghost-specific) ──────────────────────────────────────────
function GhostWaitlistForm({ dark = false }) {
  const [email, setEmail] = useState('')
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
          source: 'ghost-lp',
          tag: 'ghost-publisher',
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
            : "Free beta access for Ghost publishers. We'll email you when we're ready."}
        </p>
        {count && (
          <p style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: subtextColor, margin: '10px 0 0' }}>
            Join {count.toLocaleString()} independent publishers on the waitlist
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
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '14px 28px', borderRadius: '8px', border: 'none',
            background: status === 'loading' ? t.grayLight : t.white,
            color: t.ghostDark, fontFamily: t.fontSans, fontWeight: 700,
            fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {status === 'loading' ? 'Joining...' : 'Keep My Readers — Join Free →'}
        </button>
        <input type="hidden" name="source" value="ghost-lp" />
        <input type="hidden" name="tag" value="ghost-publisher" />
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

// ─── Pain card ──────────────────────────────────────────────────────────────
function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div style={{
      background: t.white, border: `1px solid ${t.border}`,
      borderRadius: '12px', padding: '28px 24px',
      borderTop: `3px solid ${t.ghostDark}`,
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
        {title}
      </h3>
      {stat && (
        <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '2rem', color: t.ghostDark, margin: '4px 0' }}>
          {stat}
        </div>
      )}
      {statLabel && (
        <div style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.gray, marginBottom: '8px' }}>
          {statLabel}
        </div>
      )}
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: 0, lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  )
}

// ─── How it works step ──────────────────────────────────────────────────────
function HowStep({ number, icon, title, description, callout }) {
  return (
    <div style={{
      background: t.white, border: `1px solid ${t.border}`,
      borderRadius: '12px', padding: '28px 24px',
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: '#F0F2F4', border: `2px solid ${t.ghostDark}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem',
          color: t.ghostDark, flexShrink: 0,
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
          background: '#F0F2F4', border: `1px solid ${t.border}`,
          borderRadius: '8px', padding: '10px 14px',
          fontFamily: t.fontSans, fontSize: '0.8rem', color: t.text,
        }}>
          {callout}
        </div>
      )}
    </div>
  )
}

// ─── Benefit card ───────────────────────────────────────────────────────────
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

// ─── FAQ item ────────────────────────────────────────────────────────────────
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
        <span style={{ color: t.ghostDark, fontSize: '1.2rem', fontWeight: 700, flexShrink: 0 }}>
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

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function GhostLandingPage() {
  return (
    <>
      <Head>
        <title>Keep Your Ghost Members From Canceling Their Subscriptions | ChurnRecovery</title>
        <meta name="description" content="Ghost uses Stripe natively for paid memberships. ChurnRecovery integrates directly — connect in 3 clicks and intercept cancellations with a pause option, a discount, or an exit survey." />
        <link rel="canonical" href="https://churnrecovery.com/for/ghost" />
        <meta property="og:title" content="Keep Your Ghost Members From Canceling Their Subscriptions | ChurnRecovery" />
        <meta property="og:description" content="Ghost runs on Stripe natively. ChurnRecovery plugs in directly — offer your readers a pause, a discount, or ask why they're leaving. Every canceled membership is lost reader revenue." />
        <meta property="og:url" content="https://churnrecovery.com/for/ghost" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Keep Your Ghost Members From Canceling Their Subscriptions" />
        <meta name="twitter:description" content="Ghost + Stripe + ChurnRecovery. Stop the silent exits. Give your readers a reason to stay." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #0A0C0E 0%, #15171A 50%, #0A0C0E 100%)',
          padding: '80px 24px 100px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Ghost subtle glow */}
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(160,173,184,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Trust badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(160,173,184,0.12)', border: '1px solid rgba(160,173,184,0.25)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: t.ghostAccentLight, marginBottom: '28px',
            }}>
              <span>✓</span> Free for Ghost Publishers · Connects via Stripe in 3 Clicks
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Keep Your Ghost Members<br />
              <span style={{ color: t.ghostAccentLight }}>From Canceling Their Subscriptions</span>
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.72)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              Ghost uses Stripe natively for paid memberships — which means ChurnRecovery integrates directly. When a reader tries to cancel, show them a pause option, a temporary discount, or ask why they&apos;re leaving. Keep your independent media business alive.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <GhostWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>
                🆓 Free — far less than Ghost Pro ($36+/mo)
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>
                ⚡ Connect Stripe in 3 clicks
              </span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <Link href="/demo" style={{
                fontFamily: t.fontSans, fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.25)',
              }}>
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: PAIN POINTS ──────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: t.gray, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>The Independent Media Problem</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Every Canceled Membership<br />Is Lost Reader Revenue
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Ghost is built for serious independent media. Your paid memberships are the foundation of that independence. When readers cancel silently, you lose more than a subscription — you lose a supporter.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="💸"
                title="Financial Pressure Cancellations"
                stat="40%"
                statLabel="of subscription cancellations cite financial pressure"
                description="Many of your readers cancel not because they don't value your work — they cancel because money got tight that month. A pause option would have kept them. Now they're gone."
              />
              <PainCard
                icon="⏸"
                title="No Native Pause Option"
                description="Ghost doesn't offer a built-in subscription pause. That means your only options are &quot;keep paying&quot; or &quot;cancel entirely.&quot; For readers who just need a break, that's an unnecessary goodbye."
              />
              <PainCard
                icon="🌑"
                title="The Dark Exit"
                description="Right now, when a Ghost member cancels, they disappear. No survey, no message, no second chance. You don't know why they left, what would have kept them, or if they'd come back with the right offer."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: t.gray, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>Native Stripe Integration</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Ghost + Stripe + ChurnRecovery<br />Works Natively
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Ghost uses Stripe as its payment backbone. ChurnRecovery connects to that same Stripe account. No plugins, no workarounds — it just works.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Ghost uses Stripe natively for all paid memberships. Connect ChurnRecovery to the same Stripe account your Ghost site uses. One click, one OAuth flow, done."
                callout="✓ The same Stripe account Ghost already uses. No new setup."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Listen for Cancellations"
                description="When a Ghost member initiates a cancellation, Stripe fires a webhook event. ChurnRecovery catches that event before the subscription ends and triggers your recovery flow in real time."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Readers See Your Message — Not a Dead End"
                description="Instead of an instant cancellation, readers see a thoughtful message from you: pause for a month, take a reduced rate, or share what made them want to leave. Your voice, your offer."
                callout="🎯 Average recovery rate: 20–35% of at-risk members"
              />
            </div>

            <div style={{
              marginTop: '32px',
              background: '#F5F6F7',
              border: `1px solid ${t.border}`,
              borderLeft: `4px solid ${t.ghostDark}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Does Ghost use Stripe?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                Yes — Ghost uses Stripe natively for all paid memberships and subscriptions. This isn&apos;t a workaround. ChurnRecovery connects to the exact same Stripe account your Ghost publication already uses, with no extra configuration needed on the Ghost side.
              </p>
              <Link href="/docs" style={{
                fontFamily: t.fontSans, fontSize: '0.82rem', color: t.text,
                textDecoration: 'none', fontWeight: 600,
              }}>
                Ghost integration docs →
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/demo" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#F0F2F4', border: `1px solid ${t.border}`,
                borderRadius: '10px', padding: '14px 28px',
                fontFamily: t.fontSans, fontWeight: 700, color: t.ghostDark,
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

        {/* ─── SECTION 4: BENEFITS ─────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: t.gray, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>What You Get</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                The Retention Layer Ghost Doesn&apos;t Have
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="⏸"
                title="Pause Instead of Cancel"
                description="Give readers the option to pause their membership for 1–3 months. For readers going through a rough patch, this is the difference between a temporary break and a permanent goodbye."
              />
              <BenefitCard
                icon="💳"
                title='"Pay What You Can" Temporary Discount'
                description="Offer a reduced rate for a limited time — 50% off for 2 months, then back to normal. Keeps your most financially-pressed readers in your community."
              />
              <BenefitCard
                icon="📝"
                title="Exit Survey to Improve Your Content"
                description="Ask canceling readers one question: &quot;Why are you leaving?&quot; The answers tell you exactly what to improve — content quality, cadence, pricing, or something else entirely."
              />
              <BenefitCard
                icon="📊"
                title="Revenue Recovery Dashboard"
                description="Track exactly how much you've saved, which offers resonate with Ghost readers, and your overall recovery rate. Data-driven editorial decisions start with understanding your audience."
              />
              <BenefitCard
                icon="🆓"
                title="Starts Free"
                description="Ghost Pro starts at $36/month. ChurnRecovery starts free — and only costs money when your publication is large enough for it to matter. No catch."
              />
              <BenefitCard
                icon="⚡"
                title="3-Click Setup"
                description="Connect your Stripe account, customize your message, and go live. Ghost's native Stripe integration means there's nothing extra to configure on the Ghost side."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: t.text, margin: '0 0 20px', letterSpacing: '-0.02em',
            }}>
              Less Than Ghost Pro. Keeps More of Your Revenue.
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
              lineHeight: 1.7, margin: '0 0 32px',
            }}>
              Ghost Pro starts at $36/month to host your publication. ChurnRecovery starts free
              — and helps you keep the memberships you&apos;ve worked hard to earn.
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px', marginBottom: '28px',
            }}>
              {[
                { tier: 'Starter', price: '$0/month', range: 'Free to start', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} style={{
                  background: highlight ? '#F0F2F4' : t.bg,
                  border: `1px solid ${highlight ? t.ghostDark : t.border}`,
                  borderRadius: '10px', padding: '18px',
                  position: 'relative',
                }}>
                  {highlight && (
                    <div style={{
                      position: 'absolute', top: '-10px', left: '50%',
                      transform: 'translateX(-50%)',
                      background: t.ghostDark, color: t.white,
                      fontFamily: t.fontSans, fontSize: '0.7rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '100px',
                    }}>START HERE</div>
                  )}
                  <div style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, fontSize: '0.9rem' }}>{tier}</div>
                  <div style={{ fontFamily: t.fontSans, fontWeight: 800, color: highlight ? t.ghostDark : t.text, fontSize: '1.4rem', margin: '4px 0' }}>{price}</div>
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
              You&apos;re already paying for Ghost Pro ($36+/mo). ChurnRecovery is free to start — and pays for itself the first time you save a reader who would have churned.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                Questions From Ghost Publishers
              </h2>
            </div>

            {[
              {
                q: 'Does Ghost use Stripe?',
                a: "Yes — Ghost uses Stripe natively for all paid memberships and subscriptions. This isn't an integration or a workaround. It's Ghost's official payment system, which means ChurnRecovery connects directly to the same Stripe account your Ghost publication already uses.",
              },
              {
                q: 'Is this easy to set up?',
                a: "Very. Connect your Stripe account (one OAuth click), customize your cancel message, and you're live. The whole setup takes about 5 minutes. No code, no Ghost admin changes needed, no developer required.",
              },
              {
                q: "Will this interfere with Ghost's membership experience?",
                a: "No. ChurnRecovery operates at the Stripe webhook level, not inside the Ghost admin UI. Your Ghost site runs exactly as it did before — ChurnRecovery just adds a recovery layer that activates when a cancellation event fires.",
              },
              {
                q: 'What types of Ghost publications does this work for?',
                a: "Any Ghost publication with paid memberships or subscriptions — independent newsletters, journalism sites, niche media, creator publications. If you have recurring revenue through Ghost, ChurnRecovery protects it.",
              },
              {
                q: 'What if my readers cancel because of financial hardship?',
                a: "That's exactly what the pause option and 'pay what you can' discount are for. Instead of a permanent cancellation, you can offer a 1-month pause or a reduced rate for 2 months. Many financially-stressed readers will take that option gratefully.",
              },
              {
                q: 'How much does it cost?',
                a: "Free to start. Our free tier covers smaller publications — no credit card required. You only pay when your Ghost publication grows to the point where a paid plan makes sense. Compare that to Churnkey at $250+/month.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #0A0C0E 0%, #15171A 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              A Ghost Reader Is About to Cancel.<br />
              <span style={{ color: t.ghostAccentLight }}>Don&apos;t Let Them Leave in Silence.</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.65)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Free beta access for Ghost publishers. Be first to give your readers a reason to stay — with a pause, a discount, or just a real conversation.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <GhostWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                Free during beta
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                Cancel anytime
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
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
