import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const t = {
  bg: '#F5F4FF',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#635BFF',
  accentHover: '#4E47E0',
  accentBg: '#EEF0FF',
  accentLight: '#8B85FF',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenBg: '#EDF7F1',
  red: '#DC2626',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function StripeWaitlistForm({ dark = false }) {
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
        body: JSON.stringify({ email: email.trim(), source: 'stripe-lp', tag: 'stripe-direct' }),
      })
      const data = await res.json()
      if (res.status === 201) { setStatus('success'); if (data.count) setCount(data.count) }
      else if (data.duplicate) { setStatus('duplicate') }
      else { setStatus('error'); setError(data.error || 'Something went wrong.') }
    } catch { setStatus('error'); setError('Network error. Please try again.') }
  }

  const bgColor = dark ? 'rgba(255,255,255,0.08)' : t.white
  const borderColor = dark ? 'rgba(255,255,255,0.15)' : t.border
  const textColor = dark ? t.white : t.text
  const subtextColor = dark ? 'rgba(255,255,255,0.6)' : t.gray

  if (status === 'success' || status === 'duplicate') {
    return (
      <div style={{ textAlign: 'center', padding: '24px', borderRadius: '12px', background: dark ? 'rgba(45,122,79,0.15)' : t.greenBg, border: `1px solid ${dark ? 'rgba(45,122,79,0.3)' : '#C6E6D4'}` }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{status === 'duplicate' ? '👋' : '🎉'}</div>
        <p style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1rem', color: dark ? t.white : t.text, margin: '0 0 6px' }}>
          {status === 'duplicate' ? "You're already on the list!" : "You're in! We'll be in touch."}
        </p>
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.85rem', color: subtextColor, margin: 0 }}>
          Free beta access. We&apos;ll email you when your Stripe cancel flow is ready to go.
        </p>
        {count && <p style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: subtextColor, margin: '10px 0 0' }}>Join {count.toLocaleString()} businesses on the waitlist</p>}
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required autoComplete="email"
          style={{ padding: '13px 16px', borderRadius: '8px', border: `1px solid ${error ? t.red : borderColor}`, background: bgColor, fontFamily: t.fontSans, fontSize: '0.95rem', color: textColor, outline: 'none' }} />
        <button type="submit" disabled={status === 'loading'}
          style={{ padding: '14px 28px', borderRadius: '8px', border: 'none', background: status === 'loading' ? t.grayLight : t.accent, color: t.white, fontFamily: t.fontSans, fontWeight: 700, fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer', transition: 'background 0.15s' }}>
          {status === 'loading' ? 'Joining...' : 'Stop Stripe Churn for Free →'}
        </button>
      </form>
      {error && <p style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.red, margin: '8px 0 0' }}>⚠ {error}</p>}
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: subtextColor }}>🆓 Free during beta</span>
        <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: subtextColor }}>🔒 No credit card required</span>
        {count && <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: subtextColor }}><span style={{ color: t.green }}>●</span> {count.toLocaleString()} on waitlist</span>}
      </div>
    </div>
  )
}

function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '28px 24px', borderTop: `3px solid ${t.accent}` }}>
      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>{title}</h3>
      {stat && <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '2rem', color: t.accent, margin: '4px 0' }}>{stat}</div>}
      {statLabel && <div style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.gray, marginBottom: '8px' }}>{statLabel}</div>}
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: 0, lineHeight: 1.6 }}>{description}</p>
    </div>
  )
}

function HowStep({ number, icon, title, description, callout }) {
  return (
    <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '28px 24px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(99,91,255,0.1)', border: `2px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem', color: t.accent, flexShrink: 0 }}>{number}</div>
        <div>
          <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{icon}</div>
          <h3 style={{ fontFamily: t.fontSans, fontSize: '1.05rem', fontWeight: 700, color: t.text, margin: 0 }}>{title}</h3>
        </div>
      </div>
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 12px', lineHeight: 1.7 }}>{description}</p>
      {callout && <div style={{ background: 'rgba(99,91,255,0.06)', border: '1px solid rgba(99,91,255,0.2)', borderRadius: '8px', padding: '10px 14px', fontFamily: t.fontSans, fontSize: '0.8rem', color: t.accent }}>{callout}</div>}
    </div>
  )
}

function BenefitCard({ icon, title, description }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: t.white, border: `1px solid ${t.border}`, borderRadius: '10px', padding: '20px' }}>
      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{icon}</span>
      <div>
        <h4 style={{ fontFamily: t.fontSans, fontSize: '0.92rem', fontWeight: 700, color: t.text, margin: '0 0 4px' }}>{title}</h4>
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.82rem', color: t.gray, margin: 0, lineHeight: 1.55 }}>{description}</p>
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: `1px solid ${t.border}`, borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', background: t.white, border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
        <span style={{ fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.93rem', color: t.text }}>{q}</span>
        <span style={{ color: t.accent, fontSize: '1.2rem', fontWeight: 700, flexShrink: 0 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 16px', background: t.bg }}>
          <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: 0, lineHeight: 1.7 }}>{a}</p>
        </div>
      )}
    </div>
  )
}

export default function StripeLandingPage() {
  return (
    <>
      <Head>
        <title>Stripe Cancel Flow & Churn Recovery | ChurnRecovery</title>
        <meta name="description" content="Stripe processes your payments — but it doesn't save them. ChurnRecovery adds a cancel flow to your Stripe subscriptions in 10 minutes. Pause offers, discounts, exit surveys. Free to start." />
        <link rel="canonical" href="https://churnrecovery.com/for/stripe" />
        <meta property="og:title" content="Stripe Processes Payments. We Save Them. | ChurnRecovery" />
        <meta property="og:description" content="Stripe doesn't have a built-in cancel flow. When subscribers cancel, it happens instantly and silently. ChurnRecovery adds the missing layer: a cancel flow with pause offers, discounts, and exit surveys." />
        <meta property="og:url" content="https://churnrecovery.com/for/stripe" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stripe Cancel Flow & Churn Recovery | ChurnRecovery" />
        <meta name="twitter:description" content="Add a cancel flow to your Stripe subscriptions in 10 minutes. Pause offers, discounts, exit surveys. 20–35% of churning subscribers can be saved. Free to start." />
        {/* SEO: target stripe churn recovery and stripe cancel flow */}
        <meta name="keywords" content="stripe churn recovery, stripe cancel flow, stripe subscription cancellations, churn recovery stripe, cancel flow stripe" />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #0D0C1A 0%, #1A1640 50%, #0D0C1A 100%)', padding: '80px 24px 100px', position: 'relative', overflow: 'hidden' }}>
          {/* Stripe purple glow */}
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,91,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,91,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(99,91,255,0.2)', border: '1px solid rgba(99,91,255,0.4)', borderRadius: '100px', padding: '6px 16px', fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600, color: t.accentLight, marginBottom: '28px' }}>
              <span>⚡</span> Built for Stripe subscriptions · Free to start
            </div>

            <h1 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: t.white, margin: '0 0 24px', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Stripe Processes Payments.<br />
              <span style={{ color: t.accentLight }}>We Save Them.</span>
            </h1>

            <p style={{ fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'rgba(255,255,255,0.72)', margin: '0 0 16px', lineHeight: 1.7, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
              Stripe is the best payment processor in the world. But when a subscriber decides to cancel, Stripe just processes it — silently, instantly, with no way for you to intervene. ChurnRecovery adds the missing piece: a cancel flow that intercepts cancellations before they&apos;re final.
            </p>

            <p style={{ fontFamily: t.fontSans, fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 40px', fontStyle: 'italic' }}>
              Pause offers. Discounts. Exit surveys. Set up in 10 minutes.
            </p>

            <div style={{ maxWidth: '500px', margin: '0 auto 28px' }}>
              <StripeWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>🆓 Free tier — always</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>⚡ 10-minute setup</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>🎯 20–35% save rate</span>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Link href="/demo" style={{ fontFamily: t.fontSans, fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                See a live Stripe cancel flow ↓
              </Link>
            </div>
          </div>
        </section>

        {/* STRIPE'S BLIND SPOT */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Stripe&apos;s Blind Spot</div>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Stripe Is World-Class at Payments.<br />
                It Has Zero Churn Recovery Tools.
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray, maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
                Stripe&apos;s Customer Portal lets subscribers cancel their subscription in two clicks. There&apos;s no pause offer. No discount. No &quot;are you sure?&quot; You just get a cancellation notification — and the revenue is gone.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard icon="🔕" title="Silent Cancellations" stat="100%" statLabel="of Stripe cancellations go uncontested" description="When a subscriber cancels through Stripe's Customer Portal, it's processed immediately with no friction, no offer, and no opportunity for you to step in. Stripe sends you an email after the fact." />
              <PainCard icon="🚪" title="No Built-In Retention Layer" description="Stripe has dunning for failed payments, but nothing for voluntary cancellations. There's no way to show a pause offer, a discount, or even a survey inside the default Stripe cancel flow — without a third-party tool." />
              <PainCard icon="📉" title="Voluntary Churn Is Killing Your MRR" stat="3–8%" statLabel="monthly voluntary churn for most subscription businesses" description="For every 100 subscribers, 3–8 cancel each month by choice — not because their card failed. Without a cancel flow, every single one of them walks out the door unopposed." />
            </div>

            {/* The math */}
            <div style={{ marginTop: '40px', background: t.white, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '32px', maxWidth: '680px', margin: '40px auto 0' }}>
              <h3 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.2rem', color: t.text, margin: '0 0 20px', letterSpacing: '-0.01em' }}>
                The Math on Stripe Churn
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                {[
                  { label: '100 subscribers', sub: 'at $49/month' },
                  { label: '5 cancel/month', sub: '5% monthly churn' },
                  { label: '$2,940/year', sub: 'lost revenue' },
                  { label: '2 saved/month', sub: 'with 40% save rate' },
                  { label: '$1,176/year', sub: 'revenue recovered' },
                ].map(({ label, sub }) => (
                  <div key={label} style={{ textAlign: 'center', padding: '16px', background: t.bg, borderRadius: '10px' }}>
                    <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem', color: t.accent }}>{label}</div>
                    <div style={{ fontFamily: t.fontSerif, fontSize: '0.78rem', color: t.gray, marginTop: '4px' }}>{sub}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.85rem', color: t.gray, margin: '16px 0 0', lineHeight: 1.6, textAlign: 'center' }}>
                A cancel flow that saves 2 subscribers per month at $49 adds <strong>$1,176/year</strong> back to your business — from something that runs automatically.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>The Missing Layer for Stripe</div>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                ChurnRecovery Plugs Into Stripe<br />in 3 Steps
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
                No code required. No developer needed. If you can connect an app and type a message, you can set this up in under 10 minutes.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep number="1" icon="🔗" title="Connect Your Stripe Account" description="Sign in with your Stripe credentials. ChurnRecovery gets read access to your subscription events. We listen for the moment a cancellation is triggered — nothing else." callout="✓ Read-only permissions. We never modify subscriptions without subscriber action." />
              <HowStep number="2" icon="⚡" title="We Intercept the Cancellation" description="The moment a subscriber initiates a cancellation through Stripe's Customer Portal or your product, ChurnRecovery fires before it's finalized. We show them your custom cancel flow — automatically, in real time." />
              <HowStep number="3" icon="🎯" title="Your Offer Saves the Subscription" description="The subscriber sees a pause option, a discount, or a quick exit survey. If they accept, the subscription is saved automatically. If they decline, they complete the cancellation. You win either way — you either keep them or learn why they left." callout="🎯 Average save rate: 20–35% of at-risk subscribers" />
            </div>

            {/* Technical note */}
            <div style={{ marginTop: '32px', background: 'rgba(99,91,255,0.04)', border: '1px solid rgba(99,91,255,0.15)', borderLeft: `4px solid ${t.accent}`, borderRadius: '10px', padding: '20px 24px', maxWidth: '720px', margin: '32px auto 0' }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                How we integrate with Stripe (the non-technical version)
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                Stripe sends &quot;webhook events&quot; when things happen in your account — like a subscription being canceled. ChurnRecovery registers as a webhook listener for those events. When a cancellation event fires, we intercept it and show your cancel flow before the cancellation is processed. This is the same mechanism Stripe uses for all its integrations — it&apos;s secure, standard, and doesn&apos;t require any changes to your Stripe setup.
              </p>
              <Link href="/docs" style={{ fontFamily: t.fontSans, fontSize: '0.82rem', color: t.accent, textDecoration: 'none', fontWeight: 600 }}>
                Read the full technical integration docs →
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/demo" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,91,255,0.08)', border: '1px solid rgba(99,91,255,0.25)', borderRadius: '10px', padding: '14px 32px', fontFamily: t.fontSans, fontWeight: 700, color: t.accent, textDecoration: 'none', fontSize: '1rem' }}>
                🎮 Try the Interactive Demo — See a Live Stripe Cancel Flow
              </Link>
              <p style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: t.grayLight, marginTop: '8px' }}>No signup required. See exactly what your subscribers would see.</p>
            </div>
          </div>
        </section>

        {/* WHAT YOU CAN DO */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>What ChurnRecovery Adds to Stripe</div>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                Everything Stripe Doesn&apos;t Do
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard icon="⏸" title="Pause Offer — The Subscription Lifeline" description="Most people who cancel during a busy month would have stayed if you'd offered a pause. A 1–3 month pause costs you nothing and saves a subscriber who'll return." />
              <BenefitCard icon="🏷" title="Discount Offer — For Price-Sensitive Subscribers" description="Automatically offer 20–30% off to subscribers who are leaving over price. Keeping them at a discount is worth more than losing them completely." />
              <BenefitCard icon="📋" title="Exit Survey — Learn Why People Leave" description="A one-question survey at the cancel screen tells you what Stripe never will: why subscribers are actually leaving. Use that data to improve your product and reduce future churn." />
              <BenefitCard icon="📊" title="Churn Recovery Dashboard" description="Track exactly how much revenue you've saved, which offers work best, and your overall churn recovery rate — in a clean dashboard built for subscription businesses." />
              <BenefitCard icon="🤖" title="Automatic — Runs While You Sleep" description="Set it up once and forget it. Every cancellation attempt triggers your cancel flow automatically, 24/7. No manual work, no chasing individual subscribers." />
              <BenefitCard icon="🆓" title="Free to Start — No Hidden Costs" description="ChurnRecovery is free during beta. There's no catch, no credit card required, and no percentage-of-revenue fee. You grow, we grow with you." />
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                Who Uses ChurnRecovery with Stripe
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {[
                { icon: '📰', title: 'Newsletter Creators', desc: 'If you have a paid newsletter on Ghost, Beehiiv, or your own Stripe setup, ChurnRecovery catches cancellations before they happen.' },
                { icon: '🎓', title: 'Course & Membership Businesses', desc: 'Kajabi, Teachable, Thinkific — if your memberships run through Stripe, ChurnRecovery plugs in without touching your platform.' },
                { icon: '💼', title: 'SaaS Founders', desc: 'Even early-stage SaaS with 50–200 subscribers can benefit. Every saved subscriber at $49–$299/month adds up fast.' },
                { icon: '🧑‍🏫', title: 'Coaches & Consultants', desc: 'Recurring coaching programs, mastermind groups, and consulting retainers on Stripe all qualify. Your cancel flow can offer a pause instead of a goodbye.' },
                { icon: '🛒', title: 'Subscription Box & eCommerce', desc: 'Physical subscription boxes and digital product subscriptions on Stripe both benefit from a cancel flow with discount or pause offers.' },
                { icon: '🏢', title: 'Small & Mid-Size B2B SaaS', desc: "If you're not big enough for Chargebee Retain ($500+/mo) but want enterprise-grade churn recovery — ChurnRecovery is built for you." },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{icon}</div>
                  <h4 style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '0.95rem', color: t.text, margin: '0 0 8px' }}>{title}</h4>
                  <p style={{ fontFamily: t.fontSerif, fontSize: '0.83rem', color: t.gray, margin: 0, lineHeight: 1.55 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
              Priced for Real Businesses, Not Enterprises
            </h2>
            <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray, lineHeight: 1.7, margin: '0 0 32px' }}>
              The tools Stripe doesn&apos;t include shouldn&apos;t cost $500+/month. ChurnRecovery starts free and scales with your business.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '28px' }}>
              {[
                { tier: 'Starter', price: '$0/month', range: 'Free forever', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Scale', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} style={{ background: highlight ? 'rgba(99,91,255,0.08)' : t.white, border: `1px solid ${highlight ? t.accent : t.border}`, borderRadius: '10px', padding: '18px', position: 'relative' }}>
                  {highlight && <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: t.accent, color: t.white, fontFamily: t.fontSans, fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '100px' }}>START FREE</div>}
                  <div style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, fontSize: '0.9rem' }}>{tier}</div>
                  <div style={{ fontFamily: t.fontSans, fontWeight: 800, color: highlight ? t.accent : t.text, fontSize: '1.4rem', margin: '4px 0' }}>{price}</div>
                  <div style={{ fontFamily: t.fontSerif, fontSize: '0.78rem', color: t.gray }}>{range}</div>
                </div>
              ))}
            </div>

            <div style={{ background: t.greenBg, border: '1px solid #C6E6D4', borderRadius: '10px', padding: '14px 20px', fontFamily: t.fontSans, fontSize: '0.88rem', color: t.green, marginBottom: '24px' }}>
              Compare to Chargebee Retain ($500+/mo) or Churnkey ($250+/mo). ChurnRecovery pays for itself the first subscriber you save.
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                Questions About Stripe Churn Recovery
              </h2>
            </div>

            {[
              { q: 'Does Stripe have a built-in cancel flow?', a: "No. Stripe's Customer Portal allows subscribers to cancel their subscription in a few clicks, but there's no mechanism to show them an offer, ask why they're leaving, or give them a pause option. The cancellation is processed immediately. ChurnRecovery adds that missing layer." },
              { q: 'How does ChurnRecovery connect to Stripe?', a: "ChurnRecovery uses Stripe's official webhook API to listen for subscription cancellation events. When we detect one, we trigger your cancel flow before the cancellation is finalized. The integration uses official Stripe OAuth — the same mechanism used by thousands of Stripe-compatible apps. Your Stripe credentials are never stored on our servers." },
              { q: 'Will this break my existing Stripe setup?', a: "No. ChurnRecovery is additive — it adds a layer on top of your existing Stripe configuration without changing anything. Your billing, invoicing, and subscription management all work exactly as before. The only change is that subscribers see your cancel flow when they try to cancel." },
              { q: 'What if I use Stripe with a platform like Kajabi, Ghost, or Teachable?', a: "ChurnRecovery works with Stripe regardless of what platform sits on top. If your subscriptions process through Stripe — whether directly or through a platform that uses Stripe — we can integrate with them. See our dedicated pages for Kajabi, Ghost, Teachable, and other platforms." },
              { q: "Can I customize the cancel flow message and offers?", a: "Completely. Your cancel flow can have your brand name, your voice, and your exact offer. You choose whether to show a pause option, a discount, a survey, or a combination. We provide templates, but you can edit every word. Your subscribers will feel like they're hearing from you." },
              { q: 'What happens if a subscriber declines my offer?', a: "They complete the cancellation normally. ChurnRecovery doesn't block cancellations — it gives you a chance to save the subscription first. If they still want to leave, they leave. But you get their exit survey response, which tells you why — and that's data Stripe never gives you." },
              { q: 'Is ChurnRecovery really free?', a: "During our beta, yes — completely free. No credit card, no surprise bills. We're focused on building the best Stripe churn recovery tool and learning from real users. After beta, we'll offer paid plans, but beta users get favorable rates and advance notice." },
              { q: "Does this work for B2B Stripe subscriptions?", a: "Yes. ChurnRecovery works for any Stripe subscription — B2B, B2C, monthly, annual, or usage-based. The cancel flow experience can be customized for your audience: a B2B tool might offer a call with your team instead of a discount, while a B2C product might lead with a pause offer." },
            ].map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ background: 'linear-gradient(135deg, #0D0C1A 0%, #1A1640 100%)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,91,255,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: t.white, margin: '0 0 20px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              A Stripe Subscriber Is<br />
              About to Cancel.<br />
              <span style={{ color: t.accentLight }}>Are You Ready to Save Them?</span>
            </h2>
            <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: 'rgba(255,255,255,0.65)', margin: '0 0 36px', lineHeight: 1.7 }}>
              Join the waitlist. Be first to add a cancel flow to your Stripe subscriptions — for free. 10-minute setup, no code, no developer.
            </p>

            <div style={{ maxWidth: '500px', margin: '0 auto 28px' }}>
              <StripeWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Free during beta</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Cancel anytime</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>No spam, ever</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/demo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 20px', fontFamily: t.fontSans, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
                🎮 Try the Demo
              </Link>
              <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 20px', fontFamily: t.fontSans, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
                📖 Read the Blog
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
