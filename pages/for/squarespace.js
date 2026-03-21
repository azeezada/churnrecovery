import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const t = {
  bg: '#F7F7F7',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#000000',
  accentHover: '#333333',
  accentBg: '#F0F0F0',
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
        body: JSON.stringify({ email: email.trim(), source: 'squarespace-lp', tag: 'squarespace-seller' }),
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
          We&apos;ll reach out when your Squarespace cancel flow is ready.
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
          style={{ padding: '14px 28px', borderRadius: '8px', border: 'none', background: status === 'loading' ? t.grayLight : (dark ? t.white : t.accent), color: dark ? t.accent : t.white, fontFamily: t.fontSans, fontWeight: 700, fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
          {status === 'loading' ? 'Joining...' : 'Add a Cancel Flow to Squarespace →'}
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
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.06)', border: `2px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem', color: t.accent, flexShrink: 0 }}>{number}</div>
        <div>
          <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{icon}</div>
          <h3 style={{ fontFamily: t.fontSans, fontSize: '1.05rem', fontWeight: 700, color: t.text, margin: 0 }}>{title}</h3>
        </div>
      </div>
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 12px', lineHeight: 1.7 }}>{description}</p>
      {callout && <div style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', padding: '10px 14px', fontFamily: t.fontSans, fontSize: '0.8rem', color: t.text }}>{callout}</div>}
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

export default function SquarespaceLandingPage() {
  return (
    <>
      <Head>
        <title>Squarespace Doesn't Have a Cancel Flow. We Add One in 10 Minutes. | ChurnRecovery</title>
        <meta name="description" content="Squarespace subscription cancellations are completely silent — no pause offer, no discount, no exit survey. ChurnRecovery connects to your Stripe and adds a cancel flow in 10 minutes. Free to start." />
        <link rel="canonical" href="https://churnrecovery.com/for/squarespace" />
        <meta property="og:title" content="Squarespace Doesn't Have a Cancel Flow. We Add One in 10 Minutes." />
        <meta property="og:description" content="If you sell subscriptions or memberships through Squarespace + Stripe, ChurnRecovery can intercept cancellations before they happen. No code, no plugins needed." />
        <meta property="og:url" content="https://churnrecovery.com/for/squarespace" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Squarespace Doesn't Have a Cancel Flow. We Add One in 10 Minutes." />
        <meta name="twitter:description" content="Stop losing Squarespace subscribers silently. ChurnRecovery adds a pause offer, discount, or exit survey before they go." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', padding: '80px 24px 100px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '6px 16px', fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>
              <span>✓</span> Built for Squarespace + Stripe sellers
            </div>

            <h1 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: t.white, margin: '0 0 20px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Squarespace Doesn&apos;t Give You<br />
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>a Cancel Flow.</span><br />
              <span style={{ color: t.white }}>We Add One in 10 Minutes.</span>
            </h1>

            <p style={{ fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.7)', margin: '0 0 40px', lineHeight: 1.7, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              When a subscriber cancels on Squarespace, it happens silently. No pause option. No discount. No &quot;are you sure?&quot; They&apos;re just gone. ChurnRecovery connects to your Stripe account and gives you a fighting chance before they leave.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <WaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>🆓 Free to start</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>⚡ No code, no plugins</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>🔗 Works with Stripe</span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <Link href="/demo" style={{ fontFamily: t.fontSans, fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>
                See a live demo ↓
              </Link>
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700, color: t.gray, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>The Problem</div>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Every Squarespace Cancellation<br />Happens Without Warning
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray, maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
                Squarespace is a beautiful platform — but it was built for websites, not subscription retention. There&apos;s no built-in way to catch a cancellation before it&apos;s final.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard icon="🔇" title="Silent Cancellations" stat="100%" statLabel="of Squarespace cancellations go uncontested" description="There's no friction, no offer, no ask. One click and they're gone. Squarespace shows you the cancellation notification hours later — and by then, it's too late." />
              <PainCard icon="🚫" title="No Built-In Retention Tools" description="Squarespace has no cancel flow feature. No pause offer. No discount popup. No exit survey. If you want to save a subscriber, you have to do it manually — after the fact, when they're already gone." />
              <PainCard icon="💸" title="You're Losing Real Money" stat="$1,164" statLabel="lost per $97/mo subscriber who cancels" description="One cancellation sounds small. But if 3–5 people cancel per month, that's thousands of dollars leaking out annually. Without a cancel flow, you have zero chance to stop it." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700, color: t.gray, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>How It Works</div>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Works With Squarespace in 10 Minutes
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray, maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
                Squarespace uses Stripe for subscription payments. ChurnRecovery connects to Stripe — not Squarespace. No plugins, no approval, no developers.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep number="1" icon="🔗" title="Connect Your Stripe Account" description="Squarespace uses Stripe to process your subscription payments. Link your Stripe account to ChurnRecovery with one click — it takes 60 seconds." callout="✓ No Squarespace settings to touch. No developer needed." />
              <HowStep number="2" icon="⚡" title="We Watch for Cancellations" description="ChurnRecovery monitors your Stripe account for cancellation events in real time. The moment someone starts the cancellation process, we trigger your recovery flow automatically." />
              <HowStep number="3" icon="💬" title="They See Your Offer — Not a Dead End" description="Instead of an instant cancellation, subscribers see a personalized message: a pause option, a discount, or a quick exit survey. Set it up once and it runs on its own." callout="🎯 20–35% of at-risk subscribers accept an offer" />
            </div>

            <div style={{ marginTop: '32px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)', borderLeft: `4px solid ${t.accent}`, borderRadius: '10px', padding: '20px 24px', maxWidth: '680px', margin: '32px auto 0' }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Does this actually work with Squarespace?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                Yes — if your Squarespace memberships or subscriptions are connected to Stripe (which most are), ChurnRecovery works. We operate entirely at the Stripe level, so Squarespace doesn&apos;t need to approve or install anything.
              </p>
              <Link href="/docs" style={{ fontFamily: t.fontSans, fontSize: '0.82rem', color: t.accent, textDecoration: 'none', fontWeight: 600 }}>
                See the technical setup docs →
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/demo" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '10px', padding: '14px 28px', fontFamily: t.fontSans, fontWeight: 700, color: t.text, textDecoration: 'none', fontSize: '0.95rem' }}>
                🎮 Try the Interactive Demo
              </Link>
              <p style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: t.grayLight, marginTop: '8px' }}>See a real cancel flow — no signup required</p>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700, color: t.gray, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>What You Get</div>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                Everything Squarespace Forgot to Build
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard icon="⏸" title="Pause Offer" description="Let subscribers pause for 1–3 months instead of canceling. Most people who leave during a busy period would have stayed if you'd offered a break." />
              <BenefitCard icon="🏷" title="Discount Offer" description="Automatically offer a discount to price-sensitive subscribers at the cancel screen — before they're gone. You decide the offer." />
              <BenefitCard icon="📋" title="Exit Survey" description="Find out exactly why people are leaving with a one-question exit survey. This alone is worth the setup — you'll know what to fix." />
              <BenefitCard icon="📊" title="Recovery Dashboard" description="Track saved subscribers, revenue recovered, and which offers work best — all in one clean dashboard." />
              <BenefitCard icon="🆓" title="Free to Start" description="No credit card. No trial period. ChurnRecovery is free during beta. You pay only when you grow." />
              <BenefitCard icon="🚫" title="No Squarespace Approval" description="No plugin to install. No app marketplace. No waiting. ChurnRecovery works outside of Squarespace entirely, through Stripe." />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                Questions About Squarespace + ChurnRecovery
              </h2>
            </div>

            {[
              { q: 'Does ChurnRecovery work with all Squarespace subscriptions?', a: "It works with Squarespace subscriptions that process payments through Stripe. Most Squarespace membership sites and recurring digital products use Stripe. If you're unsure, check your Squarespace payment settings — if Stripe is listed, you're set." },
              { q: 'Does Squarespace need to approve this?', a: "No. ChurnRecovery works at the Stripe level, completely outside of Squarespace. Squarespace has no visibility into Stripe webhook events. You don't need Squarespace's permission or any app installation." },
              { q: 'Will this interfere with my Squarespace site?', a: "Not at all. ChurnRecovery doesn't touch your Squarespace site, theme, or settings. Your site looks and functions exactly the same. We add a layer at the payment processor level — invisible to your site, visible to your subscribers when they try to cancel." },
              { q: 'How quickly can I set this up?', a: "Most Squarespace sellers are set up in under 10 minutes. You connect your Stripe account, choose your recovery offer (pause, discount, or survey), and you're live. No code, no design work, no developer." },
              { q: "What if someone wants to cancel even after seeing my offer?", a: "They can still cancel. ChurnRecovery doesn't block cancellations — it intercepts them with an offer first. If the subscriber declines, they complete the cancellation normally. You still get the exit survey data, which is valuable on its own." },
              { q: 'Does this work with Squarespace Scheduling (Acuity)?', a: "ChurnRecovery works with any Squarespace product that uses Stripe for recurring billing — membership sites, digital subscriptions, and recurring service plans connected to Stripe. Squarespace Scheduling appointments (one-time bookings) aren't subscription-based, so those wouldn't apply." },
            ].map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', padding: '80px 24px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: t.white, margin: '0 0 20px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              A Squarespace Subscriber Is<br />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>About to Cancel Silently.</span><br />
              Be Ready.
            </h2>
            <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7 }}>
              Join the waitlist and be first to protect your Squarespace subscription revenue with a real cancel flow. Free to start.
            </p>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <WaitlistForm dark={true} />
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Free during beta</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Cancel anytime</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>No spam, ever</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
