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
  kajabiGold: '#E8A000',
  kajabiGoldLight: '#F5C842',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// ─── Waitlist Form (kajabi-specific) ────────────────────────────────────────
function KajabiWaitlistForm({ dark = false }) {
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
          source: 'kajabi-lp',
          tag: 'kajabi-creator',
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
            : "Free beta access for Kajabi creators. We'll email you when we're ready."}
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
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '14px 28px', borderRadius: '8px', border: 'none',
            background: status === 'loading' ? t.grayLight : t.kajabiGold,
            color: '#1A1200', fontFamily: t.fontSans, fontWeight: 700,
            fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {status === 'loading' ? 'Joining...' : 'Stop the Churn — Join Free →'}
        </button>
        <input type="hidden" name="source" value="kajabi-lp" />
        <input type="hidden" name="tag" value="kajabi-creator" />
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
      borderTop: `3px solid ${t.kajabiGold}`,
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
        {title}
      </h3>
      {stat && (
        <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '2rem', color: t.kajabiGold, margin: '4px 0' }}>
          {stat}
        </div>
      )}
      {statLabel && (
        <div style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.amber, marginBottom: '8px' }}>
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
          background: 'rgba(232,160,0,0.1)', border: `2px solid ${t.kajabiGold}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem',
          color: t.kajabiGold, flexShrink: 0,
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
          background: 'rgba(232,160,0,0.08)', border: `1px solid rgba(232,160,0,0.25)`,
          borderRadius: '8px', padding: '10px 14px',
          fontFamily: t.fontSans, fontSize: '0.8rem', color: t.amber,
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
        <span style={{ color: t.kajabiGold, fontSize: '1.2rem', fontWeight: 700, flexShrink: 0 }}>
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
export default function KajabiLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing Kajabi Members at the Cancel Screen | ChurnRecovery</title>
        <meta name="description" content="ChurnRecovery connects to your Kajabi Stripe account and intercepts cancellations in real-time. Offer a pause, a discount, or ask why — before they're gone. Free to start." />
        <link rel="canonical" href="https://churnrecovery.com/for/kajabi" />
        <meta property="og:title" content="Stop Losing Kajabi Members at the Cancel Screen | ChurnRecovery" />
        <meta property="og:description" content="Kajabi memberships run on Stripe. ChurnRecovery connects directly and intercepts cancellations before they happen. No code, no Kajabi approval needed." />
        <meta property="og:url" content="https://churnrecovery.com/for/kajabi" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing Kajabi Members at the Cancel Screen" />
        <meta name="twitter:description" content="Most Kajabi creators don't realize they can intercept cancellations. ChurnRecovery plugs directly into Stripe — no code, no Kajabi approval." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #1A1200 0%, #2D1E00 50%, #1A1200 100%)',
          padding: '80px 24px 100px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Kajabi gold glow */}
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,160,0,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Trust badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(232,160,0,0.15)', border: '1px solid rgba(232,160,0,0.35)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: t.kajabiGoldLight, marginBottom: '28px',
            }}>
              <span>✓</span> Free for Kajabi Creators · No Credit Card Required
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Stop Losing Kajabi Members<br />
              <span style={{ color: t.kajabiGoldLight }}>at the Cancel Screen</span>
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              Most Kajabi creators don&apos;t realize it — but their memberships run on Stripe. That means you can intercept cancellations with a smooth cancel flow: a pause offer, a discount, or a simple &quot;why are you leaving?&quot; All without touching Kajabi&apos;s settings.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <KajabiWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                🆓 Free tier available — no Kajabi approval needed
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                ⚡ 3 steps, no code
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

        {/* ─── SECTION 2: PAIN POINTS ──────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: t.amber, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>The Hidden Revenue Leak</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Every Kajabi Cancellation =<br />Lost Recurring Revenue
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Kajabi gives you beautiful course pages — but zero protection against members walking out the door. Right now, they can cancel in seconds and you&apos;ll never know why.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="👻"
                title="Invisible Churn"
                stat="3–8%"
                statLabel="of members cancel every month — silently"
                description="There's no warning before a member cancels. No signal. No chance to intervene. One minute they're in your community, the next they're gone — and you find out in a Stripe email."
              />
              <PainCard
                icon="🚪"
                title="No Win-Back Offer"
                description="When a Kajabi member clicks &quot;Cancel Membership,&quot; they hit a dead end. No pause option. No discount. No &quot;here's what you'll miss.&quot; Just an immediate, silent goodbye."
              />
              <PainCard
                icon="❓"
                title="No Insight Into Why"
                description="Was it price? Time? The content itself? You'll never know. Without an exit survey, you're guessing — which means you can't fix what's driving your members away."
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
                color: t.kajabiGold, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>3 Steps, No Code</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Works With Kajabi in Minutes
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Kajabi uses Stripe for payments. ChurnRecovery connects to Stripe — not Kajabi. No plugins, no approval needed.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. We read cancellation signals from Stripe — the same payment processor Kajabi uses under the hood."
                callout="✓ No Kajabi settings to change. No developer needed."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a member initiates a cancellation, ChurnRecovery fires before it's final. We intercept the Stripe event and trigger your custom recovery flow — automatically."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Message — Automated"
                description="Members see a personalized message from you: a pause option, a special discount, or a quick exit survey. Set it up once. It runs forever."
                callout="🎯 Average recovery rate: 20–35% of at-risk members"
              />
            </div>

            {/* Technical callout */}
            <div style={{
              marginTop: '32px',
              background: 'rgba(232,160,0,0.05)',
              border: `1px solid rgba(232,160,0,0.25)`,
              borderLeft: `4px solid ${t.kajabiGold}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Does Kajabi even let you do this?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                Yes — because ChurnRecovery works at the Stripe level, not the Kajabi level. Kajabi uses Stripe to process your membership payments. By connecting directly to your Stripe account, we can listen for cancellation events and respond — completely outside Kajabi&apos;s ecosystem.
              </p>
              <Link href="/docs" style={{
                fontFamily: t.fontSans, fontSize: '0.82rem', color: t.kajabiGold,
                textDecoration: 'none', fontWeight: 600,
              }}>
                Technical integration docs →
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/demo" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(232,160,0,0.1)', border: `1px solid rgba(232,160,0,0.3)`,
                borderRadius: '10px', padding: '14px 28px',
                fontFamily: t.fontSans, fontWeight: 700, color: t.kajabiGold,
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
                color: t.kajabiGold, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>What You Get</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                Everything to Protect Your Membership Revenue
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Give members the option to pause instead of cancel. Many people leave during a busy month — not because they hate your content."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a 20% discount or 1 month free to at-risk members. Keeping them at a discount beats losing them forever."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out why members leave with a quick 1-question survey. Use the answers to improve your course, community, and content."
              />
              <BenefitCard
                icon="📊"
                title="Dashboard Insights"
                description="Track how much revenue you've saved, which offers work best, and your overall churn recovery rate — all in one dashboard."
              />
              <BenefitCard
                icon="🆓"
                title="Free Tier"
                description="Free to start — no credit card, no trial period. We grow with you. You only pay when your membership business grows."
              />
              <BenefitCard
                icon="🚫"
                title="No Kajabi Approval Needed"
                description="This works entirely through Stripe. No Kajabi plugin, no app store approval, no waiting. Connect and go."
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
              A Fraction of What Kajabi Costs You
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
              lineHeight: 1.7, margin: '0 0 32px',
            }}>
              Kajabi charges $119/month just to run your courses. ChurnRecovery starts free — and helps you actually keep the revenue you&apos;re earning.
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
                  background: highlight ? 'rgba(232,160,0,0.08)' : t.bg,
                  border: `1px solid ${highlight ? t.kajabiGold : t.border}`,
                  borderRadius: '10px', padding: '18px',
                  position: 'relative',
                }}>
                  {highlight && (
                    <div style={{
                      position: 'absolute', top: '-10px', left: '50%',
                      transform: 'translateX(-50%)',
                      background: t.kajabiGold, color: '#1A1200',
                      fontFamily: t.fontSans, fontSize: '0.7rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '100px',
                    }}>START HERE</div>
                  )}
                  <div style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, fontSize: '0.9rem' }}>{tier}</div>
                  <div style={{ fontFamily: t.fontSans, fontWeight: 800, color: highlight ? t.kajabiGold : t.text, fontSize: '1.4rem', margin: '4px 0' }}>{price}</div>
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
              Compare to Kajabi ($119–$399/mo) which has zero built-in churn recovery. ChurnRecovery pays for itself the first time you save a member.
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
                Questions From Kajabi Creators
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Kajabi?',
                a: "Yes. Kajabi processes payments through Stripe. ChurnRecovery connects to your Stripe account directly and listens for cancellation events. No Kajabi API access needed — it works entirely at the Stripe level.",
              },
              {
                q: 'Will Kajabi block this?',
                a: "No. ChurnRecovery operates at the Stripe level, not inside Kajabi. Kajabi has no visibility into or control over Stripe webhook events. This is like setting up a smoke detector in a building — the landlord doesn't need to approve it.",
              },
              {
                q: 'Do I need developer help to set this up?',
                a: "Not at all. If you can click a button and copy-paste a URL, you can set this up. It takes about 5–10 minutes, and we have step-by-step guides with screenshots for every step.",
              },
              {
                q: 'What if my Kajabi membership is at a lower price point?',
                a: "Even recovering 1–2 members per month at $47 or $97/month adds up fast. At lower price points, it's even more important to have a cancel flow — because volume matters more.",
              },
              {
                q: 'Can I customize the cancel flow message?',
                a: "Completely. Your message, your offer, your tone. We provide templates designed for course creators and coaches, but you can edit every word. Your members will feel like they're hearing from you — not a software company.",
              },
              {
                q: 'Does ChurnRecovery work with Kajabi memberships and courses?',
                a: "Yes — any Kajabi product that uses Stripe for recurring billing. This includes membership sites, coaching programs, mastermind groups, and any subscription-based Kajabi offer.",
              },
              {
                q: "What happens if someone still cancels after seeing the offer?",
                a: "That's fine. If they want to leave, they leave. You still get their exit survey response — which is more than you had before. And you've made the attempt, which 20–35% of people respond to positively.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #1A1200 0%, #2D1E00 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              A Kajabi Member Is About to Cancel.<br />
              <span style={{ color: t.kajabiGoldLight }}>Will You Be Ready?</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Be first to protect your Kajabi membership revenue with automated churn recovery. Free to start — no Kajabi approval needed.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <KajabiWaitlistForm dark={true} />
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
