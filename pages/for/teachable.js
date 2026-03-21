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
  teachableGreen: '#1A9E6E',
  teachableGreenLight: '#34C98A',
  teachableGreenBg: '#E8F9F3',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// ─── Waitlist Form (teachable-specific) ─────────────────────────────────────
function TeachableWaitlistForm({ dark = false }) {
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
          source: 'teachable-lp',
          tag: 'teachable-creator',
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
        background: dark ? 'rgba(26,158,110,0.15)' : t.teachableGreenBg,
        border: `1px solid ${dark ? 'rgba(26,158,110,0.3)' : '#A8E8D0'}`,
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
            : "Free beta access for Teachable creators. We'll email you when we're ready."}
        </p>
        {count && (
          <p style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: subtextColor, margin: '10px 0 0' }}>
            Join {count.toLocaleString()} course creators on the waitlist
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
            background: status === 'loading' ? t.grayLight : t.teachableGreen,
            color: t.white, fontFamily: t.fontSans, fontWeight: 700,
            fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {status === 'loading' ? 'Joining...' : 'Recover My Course Revenue →'}
        </button>
        <input type="hidden" name="source" value="teachable-lp" />
        <input type="hidden" name="tag" value="teachable-creator" />
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
            <span style={{ color: t.teachableGreen }}>●</span> {count.toLocaleString()} on waitlist
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
      borderTop: `3px solid ${t.teachableGreen}`,
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
        {title}
      </h3>
      {stat && (
        <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '2rem', color: t.teachableGreen, margin: '4px 0' }}>
          {stat}
        </div>
      )}
      {statLabel && (
        <div style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.green, marginBottom: '8px' }}>
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
          background: t.teachableGreenBg, border: `2px solid ${t.teachableGreen}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem',
          color: t.teachableGreen, flexShrink: 0,
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
          background: t.teachableGreenBg, border: `1px solid rgba(26,158,110,0.25)`,
          borderRadius: '8px', padding: '10px 14px',
          fontFamily: t.fontSans, fontSize: '0.8rem', color: t.teachableGreen,
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
        <span style={{ color: t.teachableGreen, fontSize: '1.2rem', fontWeight: 700, flexShrink: 0 }}>
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
export default function TeachableLandingPage() {
  return (
    <>
      <Head>
        <title>Recover Teachable Students Who Are About to Cancel | ChurnRecovery</title>
        <meta name="description" content="Turn Teachable cancellation moments into conversations. ChurnRecovery lets you offer a pause, a discount, or ask why — before your students walk away for good." />
        <link rel="canonical" href="https://churnrecovery.com/for/teachable" />
        <meta property="og:title" content="Recover Teachable Students Who Are About to Cancel | ChurnRecovery" />
        <meta property="og:description" content="Students dropping silently from your Teachable subscription? ChurnRecovery turns that moment into a conversation. Offer a pause, discount, or exit survey — automatically." />
        <meta property="og:url" content="https://churnrecovery.com/for/teachable" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Recover Teachable Students Who Are About to Cancel" />
        <meta name="twitter:description" content="Stop losing recurring course revenue in silence. ChurnRecovery intercepts cancellations and gives your students a reason to stay." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #061A12 0%, #0D2B1D 50%, #061A12 100%)',
          padding: '80px 24px 100px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Teachable green glow */}
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,158,110,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Trust badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(26,158,110,0.15)', border: '1px solid rgba(26,158,110,0.35)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: t.teachableGreenLight, marginBottom: '28px',
            }}>
              <span>✓</span> Free for Teachable Creators · No Credit Card Required
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Recover Teachable Students<br />
              <span style={{ color: t.teachableGreenLight }}>Who Are About to Cancel</span>
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              Turn cancellation moments into conversations. When a student tries to leave your Teachable subscription, ChurnRecovery shows them a personalized offer — a pause, a discount, or a quick &quot;what happened?&quot; Many will stay. All will be heard.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <TeachableWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                🆓 Free to start — save your first student today
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                ⚡ No code required
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
                color: t.teachableGreen, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>The Recurring Revenue Problem</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Students Are Dropping Out.<br />You Don&apos;t Know Why — or When.
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
              }}>
                You built something valuable. But Teachable doesn&apos;t give you a second chance when a student decides to cancel. That&apos;s revenue walking out the door, quietly, with no warning.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="🤫"
                title="The Silent Drop-Out"
                stat="5–10%"
                statLabel="of subscription students churn every month on average"
                description="Students cancel without a word. No email. No feedback. No heads-up. One day they&apos;re enrolled; the next your MRR just dropped and you&apos;re none the wiser."
              />
              <PainCard
                icon="🔁"
                title="No Second Chance"
                description="Right now, the cancel button on Teachable is a one-way door. No pause option, no win-back offer, no &quot;are you sure?&quot; — just instant cancellation. You get zero opportunity to change their mind."
              />
              <PainCard
                icon="📉"
                title="Losing Recurring Revenue"
                description="Monthly subscriptions are the lifeblood of a sustainable course business. Every cancellation isn't just lost income — it's the compounding value of that student over time. The real cost is much higher than one month."
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
                color: t.teachableGreen, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>Simple Setup</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Connect and Start Recovering Students
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
              }}>
                No code. No developer. No complicated integrations. Just connect and watch it work.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Payment Account"
                description="Connect ChurnRecovery to your Stripe account (for advanced Teachable plans) or your Teachable payment settings. We detect when a student initiates a cancellation before it's final."
                callout="✓ Works with Teachable's Stripe integration on Pro plans."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Intercept the Cancellation"
                description="The moment a student clicks to cancel, ChurnRecovery fires — before the subscription ends. We trigger your custom recovery flow automatically, in real time."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Message Converts Them"
                description="The student sees a personalized offer from you: pause for a month, take a discount, or simply share why they're leaving. You keep more students. You understand the ones who still go."
                callout="🎯 Average save rate: 20–35% of at-risk students"
              />
            </div>

            <div style={{
              marginTop: '32px',
              background: t.teachableGreenBg,
              border: `1px solid rgba(26,158,110,0.25)`,
              borderLeft: `4px solid ${t.teachableGreen}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Does Teachable support this?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                Teachable has its own payment system, but many creators on Pro and Business plans use Stripe. ChurnRecovery integrates at the Stripe level for those plans. We&apos;re actively expanding support for all Teachable payment types — join the waitlist to get early access.
              </p>
              <Link href="/docs" style={{
                fontFamily: t.fontSans, fontSize: '0.82rem', color: t.teachableGreen,
                textDecoration: 'none', fontWeight: 600,
              }}>
                Check compatibility for your plan →
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/demo" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: t.teachableGreenBg, border: `1px solid rgba(26,158,110,0.3)`,
                borderRadius: '10px', padding: '14px 28px',
                fontFamily: t.fontSans, fontWeight: 700, color: t.teachableGreen,
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
                color: t.teachableGreen, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '12px',
              }}>What You Get</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                Save Revenue. Understand Your Students. Improve Your Course.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="💰"
                title="Save Recurring Course Revenue"
                description="Every subscription you recover is compounding monthly income. ChurnRecovery gives you the tools to keep more students longer — automatically."
              />
              <BenefitCard
                icon="🔍"
                title="Understand Why Students Leave"
                description="An optional exit survey tells you why students cancel. Price? Time? Content gaps? Use those answers to fix your course and reduce future churn."
              />
              <BenefitCard
                icon="🔄"
                title="Offer Alternatives to Canceling"
                description="A pause option, a discount, or a plan downgrade can keep a student who just needs a break. Most creators never offer this. Now you can."
              />
              <BenefitCard
                icon="⏸"
                title="Pause Instead of Cancel"
                description="Life gets busy. Students disappear not because they hate your course but because they're overwhelmed. A 1-month pause option saves subscriptions that would otherwise be lost."
              />
              <BenefitCard
                icon="🏷"
                title="Automatic Discount Offers"
                description="Offer a limited-time discount to at-risk students. Keeping them at 80% revenue beats losing them and their lifetime value entirely."
              />
              <BenefitCard
                icon="📊"
                title="Revenue Recovery Dashboard"
                description="See how much you've saved, which offers work best, and where students are dropping off. Real data to improve your retention strategy."
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
              Simple Pricing. Free to Start.
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
              lineHeight: 1.7, margin: '0 0 32px',
            }}>
              Start free and grow into a paid plan only when your course revenue grows.
              No contracts, no gotchas.
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
                  background: highlight ? t.teachableGreenBg : t.bg,
                  border: `1px solid ${highlight ? t.teachableGreen : t.border}`,
                  borderRadius: '10px', padding: '18px',
                  position: 'relative',
                }}>
                  {highlight && (
                    <div style={{
                      position: 'absolute', top: '-10px', left: '50%',
                      transform: 'translateX(-50%)',
                      background: t.teachableGreen, color: t.white,
                      fontFamily: t.fontSans, fontSize: '0.7rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '100px',
                    }}>START HERE</div>
                  )}
                  <div style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, fontSize: '0.9rem' }}>{tier}</div>
                  <div style={{ fontFamily: t.fontSans, fontWeight: 800, color: highlight ? t.teachableGreen : t.text, fontSize: '1.4rem', margin: '4px 0' }}>{price}</div>
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
              Compare to Churnkey ($250+/mo) or ProfitWell Retain ($400+/mo). ChurnRecovery pays for itself the first time you save a student.
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
                Questions From Teachable Creators
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Teachable?',
                a: "Teachable has its own payment system by default, but many advanced plan users integrate Stripe directly. ChurnRecovery works with Teachable's Stripe integration. We're also building native support for Teachable's payment system — join the waitlist for early access.",
              },
              {
                q: 'Do I need a developer to set this up?',
                a: "Not at all. The setup is copy-paste simple. If you can log into Stripe and click a few buttons, you can install ChurnRecovery. No code, no developer, no waiting.",
              },
              {
                q: 'What if my students are on one-time course purchases, not subscriptions?',
                a: "ChurnRecovery is built for subscription and membership products — recurring monthly or annual billing. If you sell one-time courses, it won't apply. But if you have a Teachable subscription plan, monthly coaching, or membership community, this is for you.",
              },
              {
                q: 'What will my students see when they try to cancel?',
                a: "A personalized message from you — not a generic popup. You set the tone: warm, direct, honest. Options typically include a pause, a discount, or a short survey. It feels like a personal note, not corporate retention software.",
              },
              {
                q: "How do I know if it's working?",
                a: "Your ChurnRecovery dashboard shows every recovery attempt, the outcome, and how much revenue was saved. You'll see your save rate, your top-performing offers, and the reasons students say they leave.",
              },
              {
                q: "What if students still cancel after seeing the offer?",
                a: "That's okay. You still learn why they left (if they filled out the survey), and you've given them a better experience than a cold, silent cancellation. Many will remember that and come back later.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #061A12 0%, #0D2B1D 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              A Student Is About to Cancel.<br />
              <span style={{ color: t.teachableGreenLight }}>Give Them a Reason to Stay.</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Free beta access for Teachable course creators. Be the first to turn cancellation moments into conversations — and revenue saved.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <TeachableWaitlistForm dark={true} />
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
