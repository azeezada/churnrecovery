import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PainCard from '../../components/for/PainCard'
import HowStep from '../../components/for/HowStep'
import BenefitCard from '../../components/for/BenefitCard'
import FAQItem from '../../components/for/FAQItem'

const ACCENT = '#3858E9'
const ACCENT_LIGHT = '#6B8BFF'
const ACCENT_DARK_BG = 'rgba(56,88,233,0.15)'
const ACCENT_BG = 'rgba(56,88,233,0.08)'

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

function WordPressWaitlistForm({ dark = false }) {
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
          source: 'wordpress-lp',
          tag: 'wordpress-seller',
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
            : "Free beta access for WordPress membership owners. We'll email you when we're ready."}
        </p>
        {count && (
          <p style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: subtextColor, margin: '10px 0 0' }}>
            Join {count.toLocaleString()} site owners on the waitlist
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
          {status === 'loading' ? 'Joining...' : 'Protect My Members — Join Free →'}
        </button>
        <input type="hidden" name="source" value="wordpress-lp" />
        <input type="hidden" name="tag" value="wordpress-seller" />
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

export default function WordPressLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing WooCommerce & WordPress Members Silently | ChurnRecovery</title>
        <meta name="description" content="WooCommerce Subscriptions cancels happen silently — no pause offer, no discount, no exit survey. ChurnRecovery works with any Stripe-connected WordPress setup: WooCommerce, MemberPress, Paid Memberships Pro." />
        <link rel="canonical" href="https://churnrecovery.com/for/wordpress" />
        <meta property="og:title" content="Stop Losing WooCommerce & WordPress Members Silently | ChurnRecovery" />
        <meta property="og:description" content="WooCommerce Subscriptions has no built-in cancel flow. ChurnRecovery connects to Stripe and catches cancellations before they're final — for WooCommerce, MemberPress, Paid Memberships Pro, and more." />
        <meta property="og:url" content="https://churnrecovery.com/for/wordpress" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing WooCommerce & WordPress Members Silently" />
        <meta name="twitter:description" content="WordPress memberships cancel silently. ChurnRecovery works with WooCommerce, MemberPress, and Paid Memberships Pro to catch cancellations and offer pauses, discounts, and exit surveys." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #0D1B4B 0%, #1a2a6c 50%, #0D1B4B 100%)',
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
              background: 'rgba(56,88,233,0.2)', border: '1px solid rgba(107,139,255,0.4)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: ACCENT_LIGHT, marginBottom: '28px',
            }}>
              <span>✓</span> WooCommerce · MemberPress · Paid Memberships Pro · Free During Beta
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              WooCommerce Cancellations<br />
              <span style={{ color: ACCENT_LIGHT }}>Happen Silently.</span><br />
              Not Anymore.
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              When a WooCommerce Subscriptions member cancels, it&apos;s instant and silent — no pause option, no discount offer, no &quot;why are you leaving?&quot; ChurnRecovery works with any Stripe-connected WordPress setup and catches those cancellations before they&apos;re final. WooCommerce, MemberPress, Paid Memberships Pro — we work with all of them.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <WordPressWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                🔌 Works with any Stripe-connected WordPress setup
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                ⚡ No WordPress plugin required
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
              }}>The Problem With WordPress Memberships</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                WooCommerce Was Built to Sell.<br />Not to Retain.
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '560px', margin: '0 auto', lineHeight: 1.7,
              }}>
                WooCommerce Subscriptions and most WordPress membership plugins are excellent at processing recurring payments. But none of them have a built-in cancel flow. When a member decides to leave, they can — instantly and silently.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="🔇"
                title="Silent Cancellations"
                stat="3–8%"
                statLabel="of members cancel silently every month"
                description="WooCommerce Subscriptions sends you a notification email when someone cancels — after the fact. MemberPress and Paid Memberships Pro are the same. There's no intervention point, no second chance, and no record of why they left."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🚪"
                title="No Pause, Discount, or Exit Survey"
                description="WooCommerce doesn't offer a pause option or a discount screen when members cancel. There's no exit survey built in either. The only thing a canceling member sees is a confirmation button — and then they're gone."
                accentColor={ACCENT}
              />
              <PainCard
                icon="📉"
                title="Churn Compounds Quietly"
                description="At 5% monthly churn, a 200-member site loses 10 people every month. In a year, that's 120 cancellations — nearly two-thirds of your original member base. Without intervention, you're running on a treadmill: always recruiting, never growing."
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
              }}>3 Steps, No WordPress Developer</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Works With Any Stripe-Connected WordPress Setup
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '560px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Whether you use WooCommerce Subscriptions, MemberPress, or Paid Memberships Pro — if your members pay through Stripe, ChurnRecovery can protect that revenue. We connect to Stripe directly. No WordPress plugin, no theme changes, no developer.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. This is the same Stripe account your WooCommerce, MemberPress, or Paid Memberships Pro plugin sends payments to."
                callout="✓ Takes about 5 minutes. No WordPress access required."
                accentColor={ACCENT}
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Intercept Every Cancellation"
                description="When a member initiates a cancellation through your WordPress membership plugin, that event hits Stripe. ChurnRecovery catches it before it's final and fires your recovery flow — automatically."
                accentColor={ACCENT}
              />
              <HowStep
                number="3"
                icon="💬"
                title="Members See Your Offer, Not a Blank Screen"
                description="Instead of a silent cancellation, members see a branded screen with your message: a pause option, a discount offer, or a quick exit survey. You configure it once. It runs on autopilot from there."
                callout="🎯 Average recovery rate: 20–35% of at-risk members"
                accentColor={ACCENT}
              />
            </div>

            <div style={{
              marginTop: '32px',
              background: ACCENT_BG,
              border: `1px solid rgba(56,88,233,0.25)`,
              borderLeft: `4px solid ${ACCENT}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                Supported WordPress setups
              </p>
              <ul style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li><strong>WooCommerce Subscriptions</strong> with Stripe payment gateway</li>
                <li><strong>MemberPress</strong> with Stripe integration</li>
                <li><strong>Paid Memberships Pro</strong> with Stripe gateway</li>
                <li>Any custom WordPress setup that routes recurring payments through Stripe</li>
              </ul>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.82rem', color: t.gray, margin: 0, lineHeight: 1.6 }}>
                Not sure if yours qualifies? If you use Stripe for billing, it almost certainly does.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/demo" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: ACCENT_BG, border: `1px solid rgba(56,88,233,0.3)`,
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
                The Retention Layer Your WordPress Membership Plugin Is Missing
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Let members pause their membership instead of canceling. Many people leave during a busy period — a pause keeps them in your ecosystem without the pressure to cancel permanently."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Offer a temporary discount to price-sensitive members instead of losing them entirely. A member at 50% of their full price is infinitely more valuable than no member at all."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="One-question exit surveys tell you exactly why members are leaving. Over time, this data becomes your roadmap for improving your content, pricing, and member experience."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="📊"
                title="Simple Recovery Dashboard"
                description="Track saved revenue, offer acceptance rates, and cancellation reasons — in a clear, non-technical dashboard. No spreadsheets, no WooCommerce reports, no SQL queries."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🆓"
                title="Free to Start"
                description="Free during beta — no credit card, no setup fee. Upgrade only when your membership business grows. Our free tier covers small sites completely."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🔌"
                title="No WordPress Plugin Required"
                description="ChurnRecovery doesn't need a WordPress plugin. It connects to Stripe directly, which means it works regardless of which theme, page builder, or membership plugin you're using."
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
                Questions From WordPress Membership Owners
              </h2>
            </div>

            {[
              {
                q: 'Does this work with WooCommerce Subscriptions?',
                a: "Yes, as long as you're using the Stripe gateway for WooCommerce. When a member cancels in WooCommerce, that event passes through Stripe. ChurnRecovery listens for it and intercepts it before the cancellation is finalized.",
              },
              {
                q: 'Does this work with MemberPress?',
                a: "Yes. MemberPress with the Stripe gateway is fully supported. The integration is identical — ChurnRecovery connects to your Stripe account and listens for cancellation events regardless of which WordPress plugin initiated them.",
              },
              {
                q: 'Does this work with Paid Memberships Pro?',
                a: "Yes. Paid Memberships Pro with Stripe works the same way. If your recurring payments run through Stripe, ChurnRecovery can intercept and recover those cancellations.",
              },
              {
                q: 'Do I need to install a WordPress plugin?',
                a: "No. ChurnRecovery doesn't require any WordPress plugin. It works at the Stripe level, which is completely separate from your WordPress installation. You don't need to touch your theme, your plugins, or your hosting.",
              },
              {
                q: 'What if my members manage their subscriptions through their WooCommerce account?',
                a: "When a member cancels through their WooCommerce account dashboard, WooCommerce sends the cancellation to Stripe. ChurnRecovery catches the Stripe event and triggers the recovery flow at that point — regardless of where in your WordPress site the cancellation was initiated.",
              },
              {
                q: 'Will this interfere with my existing WooCommerce or WordPress setup?',
                a: "No. ChurnRecovery only interacts with your Stripe account. It doesn't modify any WordPress files, WooCommerce settings, or membership plugin configurations. Your WordPress site continues to work exactly as it does today.",
              },
              {
                q: "My WordPress site is custom-built. Will it still work?",
                a: "If your custom WordPress site routes subscription payments through Stripe, yes — ChurnRecovery will work. The integration is at the Stripe level, not the WordPress level. If you're unsure, reach out and we'll confirm your setup is supported.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} accentColor={ACCENT} />
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #0D1B4B 0%, #1a2a6c 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              A WordPress Member Is About to Cancel.<br />
              <span style={{ color: ACCENT_LIGHT }}>Will You Catch Them?</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Be first to add a cancel flow to your WordPress membership site — without a WordPress plugin, without a developer, and without touching your existing setup. Free to start.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <WordPressWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                Free during beta
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                No WordPress plugin needed
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
