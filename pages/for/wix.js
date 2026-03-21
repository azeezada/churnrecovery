import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PainCard from '../../components/for/PainCard'
import HowStep from '../../components/for/HowStep'
import BenefitCard from '../../components/for/BenefitCard'
import FAQItem from '../../components/for/FAQItem'

const ACCENT = '#0099FF'
const ACCENT_LIGHT = '#33AAFF'
const ACCENT_DARK_BG = 'rgba(0,153,255,0.15)'
const ACCENT_BG = 'rgba(0,153,255,0.08)'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: ACCENT,
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenBg: '#EDF7F1',
  red: '#DC2626',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function WixWaitlistForm({ dark = false }) {
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
          source: 'wix-lp',
          tag: 'wix-seller',
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
            : "Free beta access for Wix sellers. We'll email you when we're ready."}
        </p>
        {count && (
          <p style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: subtextColor, margin: '10px 0 0' }}>
            Join {count.toLocaleString()} sellers on the waitlist
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
            background: status === 'loading' ? t.grayLight : ACCENT,
            color: t.white, fontFamily: t.fontSans, fontWeight: 700,
            fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {status === 'loading' ? 'Joining...' : 'Stop the Cancellations — Join Free →'}
        </button>
        <input type="hidden" name="source" value="wix-lp" />
        <input type="hidden" name="tag" value="wix-seller" />
      </form>
      {error && (
        <p style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.red, margin: '8px 0 0' }}>
          ⚠ {error}
        </p>
      )}
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: subtextColor }}>🆓 Free during beta</span>
        <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: subtextColor }}>🔒 No credit card required</span>
        {count && (
          <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: subtextColor }}>
            <span style={{ color: t.green }}>●</span> {count.toLocaleString()} on waitlist
          </span>
        )}
      </div>
    </div>
  )
}

export default function WixLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing Wix Subscribers at the Cancel Screen | ChurnRecovery</title>
        <meta name="description" content="Wix doesn't show you who's about to cancel — and there's no native cancel flow. ChurnRecovery connects to your Stripe account and catches cancellations before they're final. Free to start." />
        <link rel="canonical" href="https://churnrecovery.com/for/wix" />
        <meta property="og:title" content="Stop Losing Wix Subscribers at the Cancel Screen | ChurnRecovery" />
        <meta property="og:description" content="Wix has no built-in cancel flow or churn recovery. ChurnRecovery plugs into Stripe — the payment processor behind your Wix subscriptions — and intercepts cancellations automatically." />
        <meta property="og:url" content="https://churnrecovery.com/for/wix" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing Wix Subscribers at the Cancel Screen" />
        <meta name="twitter:description" content="Wix Payments has no cancel flow. ChurnRecovery connects to Stripe and catches cancellations with pause offers, discounts, and exit surveys — automatically." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #001933 0%, #002d5c 50%, #001933 100%)',
          padding: '80px 24px 100px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT_DARK_BG} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(0,153,255,0.15)', border: '1px solid rgba(0,153,255,0.35)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: ACCENT_LIGHT, marginBottom: '28px',
            }}>
              <span>✓</span> Built for Wix Sellers · Free During Beta
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Wix Doesn&apos;t Show You<br />
              <span style={{ color: ACCENT_LIGHT }}>Who&apos;s About to Cancel.</span><br />
              We Do.
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              Wix Payments has no native cancel flow. When a subscriber clicks &quot;cancel,&quot; they&apos;re gone instantly — no pause offer, no discount, no exit survey. ChurnRecovery connects to your Stripe account and intercepts cancellations before they&apos;re final. We don&apos;t touch Wix at all.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <WixWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                ⚡ Works alongside Wix — no changes needed
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                🔌 We connect to Stripe, not Wix
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

        {/* ─── PAIN POINTS ─────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px',
              }}>The Hidden Revenue Leak</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Wix Lets Your Subscribers Walk Out.<br />No Warning, No Second Chance.
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Wix is great for building websites. But when it comes to keeping subscribers, it&apos;s completely silent. You find out about cancellations in a Stripe email — by then, it&apos;s already over.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="👻"
                title="No Visibility Before Cancel"
                stat="3–8%"
                statLabel="of subscribers cancel silently every month"
                description="Wix Payments doesn't give you any signal that a subscriber is thinking about leaving. You can't intervene if you don't know it's happening — and by the time you do, they're already gone."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🚪"
                title="No Native Cancel Flow"
                description="When a subscriber hits 'cancel' in Wix, they're immediately taken to a confirmation screen with no alternative. No pause option, no discount, no exit survey. Wix doesn't offer these features — and probably never will."
                accentColor={ACCENT}
              />
              <PainCard
                icon="💸"
                title="Every Cancellation = Lost Recurring Revenue"
                description="Losing one $50/month subscriber doesn't sound like much. But at 5% monthly churn on 100 subscribers, you're losing $3,000+ per year in recurring revenue — without a single marketing dollar to replace it."
                accentColor={ACCENT}
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
                color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px',
              }}>3 Steps, No Code</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Works With Wix Subscriptions in Minutes
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
              }}>
                We connect to your Stripe account — not Wix. Wix Payments runs on Stripe under the hood. That&apos;s how we catch cancellations before they happen, without needing any Wix access.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. If your Wix subscriptions run through Wix Payments, your Stripe account is already there — you may just need to find it in your Wix dashboard."
                callout="✓ Takes about 2 minutes. No developer needed."
                accentColor={ACCENT}
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Every Cancellation"
                description="The moment a subscriber initiates a cancel, ChurnRecovery fires before it's final. We listen for Stripe cancellation events and trigger your custom recovery flow — instantly and automatically."
                accentColor={ACCENT}
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer Runs on Autopilot"
                description="Subscribers see a branded screen with your offer: a pause option, a discount, or a quick 'why are you leaving?' question. Set it up once. It works for every cancellation from that point on."
                callout="🎯 Average recovery rate: 20–35% of at-risk subscribers"
                accentColor={ACCENT}
              />
            </div>

            <div style={{
              marginTop: '32px',
              background: ACCENT_BG,
              border: `1px solid rgba(0,153,255,0.25)`,
              borderLeft: `4px solid ${ACCENT}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Does this require a Wix developer or app?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                No. ChurnRecovery connects to Stripe directly — it has nothing to do with Wix&apos;s app marketplace or their developer platform. We don&apos;t need Wix API access. We just need your Stripe account, which is what actually processes your subscription payments.
              </p>
              <Link href="/docs" style={{
                fontFamily: t.fontSans, fontSize: '0.82rem', color: ACCENT,
                textDecoration: 'none', fontWeight: 600,
              }}>
                See the integration guide →
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/demo" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: ACCENT_BG, border: `1px solid rgba(0,153,255,0.3)`,
                borderRadius: '10px', padding: '14px 28px',
                fontFamily: t.fontSans, fontWeight: 700, color: ACCENT,
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

        {/* ─── BENEFITS ─────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px',
              }}>What You Get</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                Everything Wix Doesn&apos;t Give You
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Give subscribers the option to pause instead of cancel. Many people leave during a busy month — not because they don't value what you offer."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a discount or a free month to at-risk subscribers. Keeping someone at a lower price is almost always better than losing them entirely."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out exactly why subscribers leave with a one-question exit survey. These answers are gold — they tell you what to improve in your product and pricing."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="📊"
                title="Recovery Dashboard"
                description="See how much revenue you've saved, which offers are working, and your overall churn rate — all in one clear dashboard designed for non-technical owners."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🆓"
                title="Free to Start"
                description="No credit card, no trial period, no setup fees. Start free and only pay as your subscription business grows."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🔌"
                title="No Wix App or Plugin"
                description="This works entirely through Stripe. No Wix App Market approval needed, no plugin to install, no waiting. Connect your Stripe account and you're live."
                accentColor={ACCENT}
              />
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.white }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                Questions From Wix Sellers
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Wix Payments?',
                a: "Yes. Wix Payments processes subscription payments through Stripe. ChurnRecovery connects to your underlying Stripe account and listens for cancellation events — completely outside Wix's system.",
              },
              {
                q: "What if I don't know my Stripe account details?",
                a: "If you use Wix Payments, you have a Stripe account — Wix creates one for you when you set up payments. You can find your Stripe login by going to your Wix dashboard → Payments → Wix Payments → Settings. From there, you can access Stripe directly.",
              },
              {
                q: 'Do I need a Wix developer or Wix Velo to set this up?',
                a: "Not at all. ChurnRecovery works at the Stripe level, completely separate from Wix. If you can click a button and copy a link, you can set this up in about 10 minutes — no code required.",
              },
              {
                q: 'Will this interfere with my Wix website?',
                a: "No. ChurnRecovery only interacts with your Stripe account. It doesn't touch your Wix site, your pages, your checkout flow, or any Wix settings. Your Wix site works exactly as it does today.",
              },
              {
                q: 'What types of Wix subscriptions does this work for?',
                a: "Any Wix subscription that runs through Stripe — including service plans, membership programs, digital content subscriptions, and any recurring billing you've set up through Wix Payments.",
              },
              {
                q: 'What if a subscriber cancels through Wix directly?',
                a: "When a subscriber cancels via Wix, Wix sends a cancellation event to Stripe. ChurnRecovery intercepts that Stripe event before the cancellation is finalized and shows your recovery flow. This happens regardless of where in Wix they initiated the cancel.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} accentColor={ACCENT} />
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #001933 0%, #002d5c 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              A Wix Subscriber Is About to Cancel.<br />
              <span style={{ color: ACCENT_LIGHT }}>Will You Be Ready?</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Be first to protect your Wix subscription revenue with automated churn recovery. Free to start — no Wix approval needed.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <WixWaitlistForm dark={true} />
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
