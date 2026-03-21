import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const t = {
  bg: '#FFFDF0',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D4A900',
  accentBright: '#FFD234',
  accentHover: '#B89000',
  accentBg: '#FFFBEB',
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
        body: JSON.stringify({ email: email.trim(), source: 'lemon-squeezy-lp', tag: 'lemon-squeezy-seller' }),
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
          We&apos;ll let you know when ChurnRecovery supports your setup.
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
          style={{ padding: '14px 28px', borderRadius: '8px', border: 'none', background: status === 'loading' ? t.grayLight : t.accentBright, color: '#1A1000', fontFamily: t.fontSans, fontWeight: 700, fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
          {status === 'loading' ? 'Joining...' : 'Get Notified When We Support Lemon Squeezy →'}
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
    <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '28px 24px', borderTop: `3px solid ${t.accentBright}` }}>
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
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,210,52,0.15)', border: `2px solid ${t.accentBright}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem', color: t.accent, flexShrink: 0 }}>{number}</div>
        <div>
          <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{icon}</div>
          <h3 style={{ fontFamily: t.fontSans, fontSize: '1.05rem', fontWeight: 700, color: t.text, margin: 0 }}>{title}</h3>
        </div>
      </div>
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 12px', lineHeight: 1.7 }}>{description}</p>
      {callout && <div style={{ background: 'rgba(255,210,52,0.1)', border: '1px solid rgba(255,210,52,0.3)', borderRadius: '8px', padding: '10px 14px', fontFamily: t.fontSans, fontSize: '0.8rem', color: t.accent }}>{callout}</div>}
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

export default function LemonSqueezyLandingPage() {
  return (
    <>
      <Head>
        <title>Using Lemon Squeezy? Here's the Honest Truth About Churn Recovery | ChurnRecovery</title>
        <meta name="description" content="Lemon Squeezy is a merchant of record — which means ChurnRecovery can't hook into it directly. But if you're thinking about moving to direct Stripe billing, ChurnRecovery is the reason to make the switch." />
        <link rel="canonical" href="https://churnrecovery.com/for/lemon-squeezy" />
        <meta property="og:title" content="Using Lemon Squeezy? Here's the Honest Truth About Churn Recovery" />
        <meta property="og:description" content="ChurnRecovery works with Stripe-based subscriptions. If you're on Lemon Squeezy's merchant-of-record plan, we'll be honest about what works and what doesn't." />
        <meta property="og:url" content="https://churnrecovery.com/for/lemon-squeezy" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Using Lemon Squeezy? Here's the Honest Truth About Churn Recovery" />
        <meta name="twitter:description" content="We won't pretend to work with Lemon Squeezy's MoR setup. But if you use your own Stripe, or want to switch — ChurnRecovery is your churn recovery layer." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #1A1300 0%, #2D2000 100%)', padding: '80px 24px 100px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,210,52,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,210,52,0.15)', border: '1px solid rgba(255,210,52,0.3)', borderRadius: '100px', padding: '6px 16px', fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600, color: t.accentBright, marginBottom: '28px' }}>
              🍋 Honest guide for Lemon Squeezy creators
            </div>

            <h1 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: t.white, margin: '0 0 20px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Using Lemon Squeezy?<br />
              <span style={{ color: t.accentBright }}>Here&apos;s the Honest Truth</span><br />
              About Churn Recovery.
            </h1>

            <p style={{ fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.7)', margin: '0 0 28px', lineHeight: 1.7, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
              We won&apos;t overpromise. Lemon Squeezy is a merchant of record — they own the Stripe connection, not you. That means ChurnRecovery can&apos;t plug directly into most Lemon Squeezy setups. But read on, because there&apos;s a real path forward.
            </p>

            {/* Honest limitation callout */}
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '20px 24px', maxWidth: '560px', margin: '0 auto 32px', textAlign: 'left' }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.accentBright, margin: '0 0 8px', fontSize: '0.88rem' }}>⚠ Honest limitation</p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>
                If you use Lemon Squeezy&apos;s standard merchant-of-record plan, your Stripe account is Lemon Squeezy&apos;s — not yours. ChurnRecovery can&apos;t connect to it. <strong style={{ color: 'rgba(255,255,255,0.85)' }}>However:</strong> if you&apos;re on a plan that lets you connect your own Stripe, or you&apos;re considering switching to direct Stripe billing, ChurnRecovery works perfectly.
              </p>
            </div>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <WaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>🆓 Free during beta</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>⚡ Works with direct Stripe</span>
            </div>
          </div>
        </section>

        {/* THE REAL SITUATION */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700, color: t.gray, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>The Real Situation</div>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Lemon Squeezy vs. Direct Stripe:<br />What Actually Changes
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray, maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
                Lemon Squeezy is great for tax compliance and quick product launches. But as a merchant of record, they&apos;re between you and your subscribers. That has real consequences when it comes to churn recovery.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard icon="🔒" title="Lemon Squeezy Owns the Stripe" stat="0" statLabel="access to cancellation events for you" description="On Lemon Squeezy's standard plan, they're the merchant of record. They hold the Stripe connection. You can't install webhooks, intercept events, or add a cancel flow — because it's not technically your Stripe account." />
              <PainCard icon="🚪" title="Cancellations Still Happen Silently" description="Just like with any other platform without a cancel flow, subscribers can leave without you ever having a chance to make them an offer. Lemon Squeezy doesn't have built-in retention tools either." />
              <PainCard icon="💡" title="There's a Way Out" description="If you move to direct Stripe billing — even just for your subscription products — you own the Stripe connection. You control the webhooks. And ChurnRecovery plugs right in. Many creators make this switch for exactly this reason." />
            </div>
          </div>
        </section>

        {/* HOW TO MAKE IT WORK */}
        <section style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Your Options</div>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Three Paths Forward
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep number="A" icon="🔗" title="Use Lemon Squeezy with Your Own Stripe" description="Some Lemon Squeezy plans allow you to connect your own Stripe account instead of using their merchant-of-record setup. If you're on one of those plans, ChurnRecovery connects directly to your Stripe and works as normal." callout="✓ Check your Lemon Squeezy plan settings for 'custom Stripe' or 'BYOS' options." />
              <HowStep number="B" icon="🔀" title="Move Subscriptions to Direct Stripe" description="Keep Lemon Squeezy for one-time digital products (where their tax handling is great). Migrate your subscription products to direct Stripe billing. Then connect ChurnRecovery for full cancel flow coverage." callout="💡 Many creators use both: LS for products, Stripe for subscriptions." />
              <HowStep number="C" icon="📬" title="Join the Waitlist Anyway" description="We're actively exploring native Lemon Squeezy integration. It's technically complex because of the merchant-of-record structure, but we're working on it. Join the waitlist and we'll tell you the moment it's possible." callout="🔔 We'll reach out first when Lemon Squeezy support lands." />
            </div>
          </div>
        </section>

        {/* WHY DIRECT STRIPE IS WORTH IT */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                Why Creators Switch to Direct Stripe
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard icon="🎛" title="Full Control" description="Your Stripe account, your webhooks, your data. You're not locked into a platform's terms of service for your payment infrastructure." />
              <BenefitCard icon="⏸" title="Cancel Flows That Actually Work" description="With direct Stripe, you can add a pause offer, a discount, or an exit survey to every cancellation — automatically. That's 20–35% of churning subscribers you can save." />
              <BenefitCard icon="📊" title="Better Revenue Data" description="See exactly what's happening with your MRR, churn rate, and subscriber LTV — directly in Stripe or connected tools. Not filtered through a third-party platform." />
              <BenefitCard icon="💸" title="Lower Fees on Higher Volume" description="Lemon Squeezy charges 5% + payment fees. Direct Stripe is 2.9% + 30¢. At scale, that difference pays for a lot of tools." />
              <BenefitCard icon="🔧" title="Integrates With Everything" description="Stripe connects directly with ChurnRecovery, your email platform, your analytics, and hundreds of other tools. No middleware, no translation layer." />
              <BenefitCard icon="🆓" title="ChurnRecovery Is Free to Start" description="Once you're on direct Stripe, ChurnRecovery is free during beta. The cancel flow you add can pay for the migration cost in the first month." />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                Questions About Lemon Squeezy + ChurnRecovery
              </h2>
            </div>

            {[
              { q: 'Can ChurnRecovery work with Lemon Squeezy right now?', a: "Not on standard Lemon Squeezy MoR (merchant of record) plans — because the Stripe connection belongs to Lemon Squeezy, not you. However, if your plan lets you use your own Stripe account, ChurnRecovery works. We're also working on a native Lemon Squeezy integration for the future." },
              { q: "Why is Lemon Squeezy's MoR setup a problem for cancel flows?", a: "As the merchant of record, Lemon Squeezy handles the Stripe payment infrastructure on your behalf. That means you can't install webhooks or intercept cancellation events — those go to Lemon Squeezy's servers, not yours. It's the tradeoff for their tax compliance features." },
              { q: 'Is it hard to migrate subscriptions from Lemon Squeezy to Stripe?', a: "It depends on your subscriber count. For small subscriber bases (under 200), many creators handle the migration manually or with a simple export/import. We have guides for this migration in our docs. The bigger the subscriber base, the more careful the migration needs to be." },
              { q: 'Will I lose subscribers if I migrate to direct Stripe?', a: "A thoughtful migration won't cause cancellations. The key is to communicate with subscribers, give them time to re-subscribe through your new Stripe-powered flow, and offer a seamless transition. Many creators do this without losing a single subscriber." },
              { q: 'Can I keep using Lemon Squeezy for one-time products?', a: "Absolutely. Many creators use Lemon Squeezy for digital downloads and one-time purchases (where their tax handling is genuinely useful), while using direct Stripe for subscriptions. You don't have to go all-or-nothing." },
            ].map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ background: 'linear-gradient(135deg, #1A1300 0%, #2D2000 100%)', padding: '80px 24px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: t.white, margin: '0 0 20px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Ready to Own Your<br />
              <span style={{ color: t.accentBright }}>Subscription Revenue?</span>
            </h2>
            <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7 }}>
              Join the waitlist. Whether you&apos;re on Lemon Squeezy now or thinking about moving to direct Stripe, we&apos;ll help you set up a cancel flow that saves subscribers automatically.
            </p>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <WaitlistForm dark={true} />
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Free during beta</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>No spam, ever</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
