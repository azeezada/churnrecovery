import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const t = {
  bg: '#FDF6F0',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#FF6B35',
  accentHover: '#E55A25',
  accentBg: '#FFF0EB',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenBg: '#EDF7F1',
  red: '#DC2626',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function WaitlistForm({ dark = false }) {
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
        body: JSON.stringify({ email: email.trim(), source: 'chargebee-lp', tag: 'chargebee-user' }),
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
          {status === 'duplicate' ? "You're already on the list!" : "You're in!"}
        </p>
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.85rem', color: subtextColor, margin: 0 }}>
          We&apos;ll email you when ChurnRecovery launches for Chargebee users.
        </p>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required autoComplete="email"
          style={{ padding: '13px 16px', borderRadius: '8px', border: `1px solid ${error ? t.red : borderColor}`, background: bgColor, fontFamily: t.fontSans, fontSize: '0.95rem', color: textColor, outline: 'none' }} />
        <button type="submit" disabled={status === 'loading'}
          style={{ padding: '14px 28px', borderRadius: '8px', border: 'none', background: status === 'loading' ? t.grayLight : t.accent, color: t.white, fontFamily: t.fontSans, fontWeight: 700, fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
          {status === 'loading' ? 'Joining...' : 'Get Chargebee Retain Features for Free →'}
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
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,107,53,0.1)', border: `2px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem', color: t.accent, flexShrink: 0 }}>{number}</div>
        <div>
          <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{icon}</div>
          <h3 style={{ fontFamily: t.fontSans, fontSize: '1.05rem', fontWeight: 700, color: t.text, margin: 0 }}>{title}</h3>
        </div>
      </div>
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 12px', lineHeight: 1.7 }}>{description}</p>
      {callout && <div style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: '8px', padding: '10px 14px', fontFamily: t.fontSans, fontSize: '0.8rem', color: t.accent }}>{callout}</div>}
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

export default function ChargbeeLandingPage() {
  return (
    <>
      <Head>
        <title>Get Chargebee Retain Features for $0/Month | ChurnRecovery</title>
        <meta name="description" content="Chargebee Retain costs $500+/month and requires an enterprise contract. ChurnRecovery gives you the same cancel flow, pause offers, and exit surveys — free to start. Works with your existing Stripe." />
        <link rel="canonical" href="https://churnrecovery.com/for/chargebee" />
        <meta property="og:title" content="Get Chargebee Retain Features for $0/Month" />
        <meta property="og:description" content="Chargebee Retain starts at $500/month. ChurnRecovery is free. Both connect to Stripe and add a cancel flow to your subscriptions — we just don't charge enterprise prices for it." />
        <meta property="og:url" content="https://churnrecovery.com/for/chargebee" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Chargebee Retain Features for $0/Month | ChurnRecovery" />
        <meta name="twitter:description" content="Skip the $500/mo Chargebee Retain contract. ChurnRecovery adds cancel flows, pause offers, and churn analytics to your Stripe subscriptions for free." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #1A0A00 0%, #2D1500 50%, #1A0A00 100%)', padding: '80px 24px 100px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.35)', borderRadius: '100px', padding: '6px 16px', fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600, color: t.accent, marginBottom: '28px' }}>
              <span>✓</span> The affordable alternative to Chargebee Retain
            </div>

            <h1 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: t.white, margin: '0 0 20px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Get Chargebee Retain Features<br />
              <span style={{ color: t.accent }}>for $0/Month.</span>
            </h1>

            <p style={{ fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.7)', margin: '0 0 28px', lineHeight: 1.7, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Chargebee Retain costs $500+ per month and requires you to talk to their sales team. ChurnRecovery gives you cancel flows, pause offers, and exit surveys — the exact same retention tools — free to start. Works with your existing Stripe account.
            </p>

            {/* Price comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '440px', margin: '0 auto 32px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Chargebee Retain</div>
                <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.4rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>$500+/mo</div>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>Enterprise contract required</div>
              </div>
              <div style={{ background: 'rgba(255,107,53,0.15)', border: `1px solid ${t.accent}`, borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>ChurnRecovery</div>
                <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.4rem', color: t.accent }}>$0/mo</div>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>Free to start, no contract</div>
              </div>
            </div>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <WaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>🆓 Free during beta</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>⚡ Works with existing Stripe</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>🚫 No sales calls</span>
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>The Problem with Chargebee Retain</div>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Great Features. Terrible Pricing<br />for Small Businesses.
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray, maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
                Chargebee is excellent billing software. But Chargebee Retain — their churn recovery add-on — is priced for enterprise. Small businesses on Chargebee have been left out until now.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard icon="💰" title="Priced Out of Reach" stat="$500+" statLabel="per month minimum for Chargebee Retain" description="Chargebee Retain starts at $500/month — and that's before you factor in their percentage-of-revenue fee. For a small business making $10k MRR, you'd be paying 5–10% of revenue just for a cancel flow." />
              <PainCard icon="📞" title="Requires a Sales Contract" description="You can't just sign up for Chargebee Retain. You have to talk to their sales team, go through a demo, negotiate a contract, and wait. Meanwhile, your subscribers are still canceling with no intervention." />
              <PainCard icon="🔒" title="Still Missing a Cancel Flow Without It" description="Base Chargebee doesn't include churn recovery tools. If you're on Chargebee and haven't paid for Retain, your subscribers can cancel with zero friction — silently, instantly, with no offer from you." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>How It Works</div>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Set Up in 10 Minutes. No Sales Call.
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray, maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
                Chargebee uses Stripe as a payment gateway. ChurnRecovery connects directly to your Stripe — so it works alongside Chargebee without touching your billing setup.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep number="1" icon="🔗" title="Connect Your Stripe Account" description="Your Chargebee subscriptions process payments through Stripe. Connect your Stripe account to ChurnRecovery in one click — it reads your cancellation events directly from Stripe." callout="✓ Your Chargebee setup stays exactly as-is. Nothing changes there." />
              <HowStep number="2" icon="⚡" title="Cancellations Get Intercepted" description="When a subscriber starts to cancel — whether through your portal or directly — ChurnRecovery fires automatically. We intercept the Stripe cancellation event and show your recovery flow." />
              <HowStep number="3" icon="💬" title="Your Custom Offer Runs Automatically" description="The subscriber sees a pause option, a discount, or a quick exit survey — in your name, with your message. You set it up once. It runs for every cancellation, forever." callout="🎯 20–35% of at-risk subscribers accept an offer" />
            </div>

            <div style={{ marginTop: '32px', background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.15)', borderLeft: `4px solid ${t.accent}`, borderRadius: '10px', padding: '20px 24px', maxWidth: '680px', margin: '32px auto 0' }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Does this conflict with Chargebee?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                No. ChurnRecovery operates at the Stripe level, completely independent of Chargebee. Chargebee doesn&apos;t need to know ChurnRecovery exists. Both tools connect to the same Stripe account and do completely different things — Chargebee handles billing, ChurnRecovery handles retention.
              </p>
              <Link href="/docs" style={{ fontFamily: t.fontSans, fontSize: '0.82rem', color: t.accent, textDecoration: 'none', fontWeight: 600 }}>
                Read the integration guide →
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/demo" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.25)', borderRadius: '10px', padding: '14px 28px', fontFamily: t.fontSans, fontWeight: 700, color: t.accent, textDecoration: 'none', fontSize: '0.95rem' }}>
                🎮 Try the Interactive Demo
              </Link>
              <p style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: t.grayLight, marginTop: '8px' }}>See a cancel flow in action — no signup required</p>
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                ChurnRecovery vs. Chargebee Retain
              </h2>
            </div>
            <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', overflow: 'hidden' }}>
              {[
                { feature: 'Cancel flow with offers', cr: '✅ Yes', cb: '✅ Yes' },
                { feature: 'Pause subscription offer', cr: '✅ Yes', cb: '✅ Yes' },
                { feature: 'Discount offer at cancel screen', cr: '✅ Yes', cb: '✅ Yes' },
                { feature: 'Exit survey', cr: '✅ Yes', cb: '✅ Yes' },
                { feature: 'Works with Stripe', cr: '✅ Yes', cb: '✅ Yes' },
                { feature: 'Starting price', cr: '🆓 $0/month', cb: '💸 $500+/month' },
                { feature: 'Sales call required', cr: '🚫 No', cb: '📞 Yes' },
                { feature: 'Enterprise contract', cr: '🚫 No', cb: '📄 Yes' },
                { feature: 'Setup time', cr: '⚡ 10 minutes', cb: '⏳ Days/weeks' },
              ].map(({ feature, cr, cb }, i) => (
                <div key={feature} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < 8 ? `1px solid ${t.border}` : 'none' }}>
                  <div style={{ padding: '14px 20px', fontFamily: t.fontSans, fontSize: '0.88rem', color: t.text, fontWeight: 500 }}>{feature}</div>
                  <div style={{ padding: '14px 20px', fontFamily: t.fontSans, fontSize: '0.88rem', color: t.green, background: 'rgba(45,122,79,0.04)', borderLeft: `1px solid ${t.border}`, fontWeight: 600 }}>{cr}</div>
                  <div style={{ padding: '14px 20px', fontFamily: t.fontSans, fontSize: '0.88rem', color: t.gray, borderLeft: `1px solid ${t.border}` }}>{cb}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                Everything Chargebee Retain Offers.<br />Without the Contract.
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard icon="⏸" title="Pause Offer" description="Let subscribers pause for 1–3 months instead of canceling. Keeps the revenue relationship alive for when they're ready to come back." />
              <BenefitCard icon="🏷" title="Discount at Cancel Screen" description="Automatically offer a discount to price-sensitive subscribers the moment they click cancel — when they're most likely to accept it." />
              <BenefitCard icon="📋" title="Exit Survey" description="A one-question exit survey tells you exactly why subscribers are leaving. Fix the right problems instead of guessing." />
              <BenefitCard icon="📊" title="Recovery Analytics" description="Track saved revenue, offer acceptance rates, and churn reasons — all in a clean dashboard that shows you what's working." />
              <BenefitCard icon="🆓" title="Free to Start" description="$0 to get started. No credit card required. No sales call. No waiting. Just connect Stripe and set up your cancel flow." />
              <BenefitCard icon="⚡" title="10-Minute Setup" description="Connect Stripe, choose your offer, go live. No developer needed. No Chargebee configuration to touch. Just your Stripe account." />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                Questions from Chargebee Users
              </h2>
            </div>

            {[
              { q: 'Does ChurnRecovery work alongside Chargebee?', a: "Yes, completely. ChurnRecovery connects to your Stripe account, which is the same payment processor Chargebee uses. Both tools can be connected to the same Stripe account simultaneously — Chargebee handles billing management, ChurnRecovery handles cancellation recovery. They don't interfere with each other." },
              { q: "Will this break anything in Chargebee?", a: "No. ChurnRecovery listens to Stripe webhook events but doesn't modify your subscriptions unless a subscriber accepts an offer (like a pause or discount). Even then, the change happens through Stripe's API, which Chargebee syncs with. Your Chargebee dashboard stays accurate." },
              { q: 'Is ChurnRecovery really free?', a: "During our beta, yes — completely free. No credit card, no trial, no surprise bills. We're building our user base and collecting feedback. After beta, we'll have paid plans, but we'll grandfather in beta users at favorable rates and give you plenty of notice." },
              { q: "What's the difference between ChurnRecovery and Chargebee Retain?", a: "Functionally, they're very similar — both add a cancel flow, pause offers, and exit surveys to your subscriptions. The difference is price and accessibility. Chargebee Retain starts at $500/month and requires an enterprise sales process. ChurnRecovery is free to start and takes 10 minutes to set up." },
              { q: 'What if I want to move away from Chargebee entirely?', a: "That's a bigger conversation, but ChurnRecovery actually works better with direct Stripe billing (without a billing platform layer). If you're considering migrating from Chargebee to Stripe directly, we can work with you on that transition. Either way, ChurnRecovery will work with your setup." },
            ].map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ background: 'linear-gradient(135deg, #1A0A00 0%, #2D1500 100%)', padding: '80px 24px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: t.white, margin: '0 0 20px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Stop Paying $500/Month<br />
              <span style={{ color: t.accent }}>for Features You Can Get Free.</span>
            </h2>
            <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7 }}>
              Join the waitlist. Get cancel flows, pause offers, and exit surveys — the same tools as Chargebee Retain, at zero cost. No sales call. No contract. Just better retention.
            </p>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <WaitlistForm dark={true} />
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Free during beta</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>No sales call</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Cancel anytime</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
