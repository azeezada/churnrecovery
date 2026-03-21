import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PainCard from '../../components/for/PainCard'
import HowStep from '../../components/for/HowStep'
import BenefitCard from '../../components/for/BenefitCard'
import FAQItem from '../../components/for/FAQItem'

const ACCENT = '#10b981'
const ACCENT_LIGHT = '#6ee7b7'
const ACCENT_BG = 'rgba(16,185,129,0.08)'
const ACCENT_DARK_BG = 'rgba(16,185,129,0.15)'

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

function PayhipWaitlistForm({ dark = false }) {
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
        body: JSON.stringify({ email: email.trim(), source: 'payhip-lp', tag: 'payhip-seller' }),
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
            : 'Free beta access for Payhip sellers. We\'ll email you when we\'re ready.'}
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
          {status === 'loading' ? 'Joining...' : 'Keep More Subscribers — Join Free →'}
        </button>
        <input type="hidden" name="source" value="payhip-lp" />
        <input type="hidden" name="tag" value="payhip-seller" />
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

export default function PayhipLandingPage() {
  return (
    <>
      <Head>
        <title>Keep More Payhip Subscribers. Add a Cancel Recovery Flow. | ChurnRecovery</title>
        <meta name="description" content="Payhip doesn't do retention. ChurnRecovery does. Connect your Stripe account and start recovering failed payments and cancellations automatically — free to start." />
        <link rel="canonical" href="https://churnrecovery.com/for/payhip" />
        <meta property="og:title" content="Keep More Payhip Subscribers. Add a Cancel Recovery Flow. | ChurnRecovery" />
        <meta property="og:description" content="Payhip connects to your Stripe for subscriptions. ChurnRecovery plugs into that Stripe and intercepts cancellations and failed payments — automatically, in your brand." />
        <meta property="og:url" content="https://churnrecovery.com/for/payhip" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Keep More Payhip Subscribers. Add a Cancel Recovery Flow." />
        <meta name="twitter:description" content="130k+ Payhip sellers have no cancel recovery. ChurnRecovery adds one — branded dunning emails, pause offers, and exit surveys. Free to start." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #071a12 0%, #0d2e1e 50%, #071a12 100%)',
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
              background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: ACCENT_LIGHT, marginBottom: '28px',
            }}>
              <span>✓</span> Built for Payhip Sellers · Free During Beta
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Payhip Doesn&apos;t Do Retention.<br />
              <span style={{ color: ACCENT_LIGHT }}>We Do.</span>
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              Payhip is great for selling digital products and subscriptions. But when a subscriber&apos;s card fails or they click cancel, you&apos;re completely on your own. ChurnRecovery adds automatic dunning and cancel recovery — in your brand — so you keep the revenue you already earned.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <PayhipWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                ⚡ Works with Payhip + Stripe
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                🌍 Strong for UK &amp; EU creators
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
              }}>The Payhip Revenue Gap</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                You&apos;re Losing Subscription Revenue<br />You Didn&apos;t Know You Could Keep
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Payhip handles checkout brilliantly. But the moment a payment fails or someone clicks cancel, there&apos;s nothing in place to save them — and you find out after it&apos;s too late.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="💳"
                title="Failed Payments Go Unrecovered"
                stat="5–10%"
                statLabel="of subscriptions fail every month"
                description="When a card fails on Payhip, Stripe sends a generic dunning email — not from you, not personalized, not in your brand. Most subscribers don&apos;t even connect it to your product. They churn without meaning to."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🚪"
                title="No Cancel Flow Built In"
                description="Payhip has no cancel flow. A subscriber who clicks cancel sees no pause offer, no discount, no exit question. They just leave. You find out days later when your Stripe dashboard updates."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🔕"
                title="No Notification Until It&apos;s Over"
                description="By the time you notice a subscriber is gone, Stripe has already tried 3+ times and given up. You&apos;ve lost weeks of payment attempts and the subscriber feels abandoned — not retained."
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
                Works With Payhip in Minutes
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Payhip connects to your Stripe account for subscription payments. ChurnRecovery connects to that same Stripe — no Payhip integration, no developer, no code.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect the same Stripe account Payhip uses for your subscriptions. One OAuth click — no API keys to copy, no developer required."
                callout="✓ Payhip supports Stripe for subscription billing — you're already set."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
              <HowStep
                number="2"
                icon="⚡"
                title="Automatic Dunning &amp; Cancel Interception"
                description="First failed payment: ChurnRecovery sends a branded email from you — not Stripe. Cancel attempt: we intercept before it&apos;s final and show your custom recovery flow. All automatic."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
              <HowStep
                number="3"
                icon="✅"
                title="Recovered Subscribers Continue Normally in Payhip"
                description="When we save a subscriber — either through dunning or a cancel offer — they continue as normal in Payhip. No disruption, no manual work. The revenue just keeps flowing."
                callout="🎯 5–10% of subscriptions fail monthly. ~70% are recoverable with smart dunning."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
            </div>

            <div style={{
              marginTop: '32px',
              background: ACCENT_BG,
              border: `1px solid rgba(16,185,129,0.25)`,
              borderLeft: `4px solid ${ACCENT}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Do I need to change how I use Payhip?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                No. ChurnRecovery works at the Stripe layer — completely separate from Payhip. You don&apos;t change any Payhip settings. Payhip doesn&apos;t know ChurnRecovery exists. Your subscribers continue as normal after recovery.
              </p>
              <Link href="/docs" style={{
                fontFamily: t.fontSans, fontSize: '0.82rem', color: ACCENT,
                textDecoration: 'none', fontWeight: 600,
              }}>
                Technical integration docs →
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/demo" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: ACCENT_BG, border: `1px solid rgba(16,185,129,0.3)`,
                borderRadius: '10px', padding: '14px 28px',
                fontFamily: t.fontSans, fontWeight: 700, color: ACCENT,
                textDecoration: 'none', fontSize: '0.95rem',
              }}>
                🎮 Try the Interactive Demo
              </Link>
              <p style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: t.grayLight, marginTop: '8px' }}>
                See a live cancel and dunning flow — no signup required
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
                color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px',
              }}>What You Get</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                Everything Payhip Doesn&apos;t Include
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="📬"
                title="Branded Dunning Emails"
                description="Replace Stripe&apos;s generic payment failure emails with branded messages in your voice: 'Hey, looks like there was a hiccup with your payment.' Friendlier, earlier, more effective."
              />
              <BenefitCard
                icon="⏸"
                title="Pause Offer on Cancel"
                description="Give subscribers a pause option before they cancel. Many cancels are temporary — a 1-month pause keeps the subscriber and brings them back automatically."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a discount to price-sensitive subscribers at the cancel screen. Better to keep them at 20% off than lose them to a competitor permanently."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out exactly why subscribers leave with a quick exit question. The feedback tells you what to fix — so fewer people cancel next month."
              />
              <BenefitCard
                icon="📊"
                title="Recovery Dashboard"
                description="See recovered revenue, dunning success rates, and cancel recovery rates — in one clean dashboard built for digital product sellers."
              />
              <BenefitCard
                icon="🌍"
                title="Works for UK &amp; EU Sellers"
                description="Payhip is especially popular with UK and EU creators. ChurnRecovery works wherever Stripe is supported — which covers all major Payhip markets."
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
              Free for Payhip Sellers
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
              lineHeight: 1.7, margin: '0 0 32px',
            }}>
              130,000+ Payhip sellers sell digital products. If you have subscriptions, you&apos;re losing revenue to churn you could recover. ChurnRecovery starts free.
            </p>

            <div style={{
              background: ACCENT_BG, border: `1px solid rgba(16,185,129,0.25)`,
              borderRadius: '12px', padding: '24px', marginBottom: '28px',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: t.fontSans, fontSize: '0.8rem', fontWeight: 600, color: ACCENT, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>By the numbers</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                  { stat: '5–10%', label: 'fail monthly' },
                  { stat: '~70%', label: 'are recoverable' },
                  { stat: '20–35%', label: 'cancel saves' },
                ].map(({ stat, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.6rem', color: ACCENT }}>{stat}</div>
                    <div style={{ fontFamily: t.fontSerif, fontSize: '0.78rem', color: t.gray }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '28px' }}>
              {[
                { tier: 'Starter', price: '$0/month', range: 'Free to start', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} style={{
                  background: highlight ? ACCENT_BG : t.bg,
                  border: `1px solid ${highlight ? ACCENT : t.border}`,
                  borderRadius: '10px', padding: '18px',
                  position: 'relative',
                }}>
                  {highlight && (
                    <div style={{
                      position: 'absolute', top: '-10px', left: '50%',
                      transform: 'translateX(-50%)',
                      background: ACCENT, color: t.white,
                      fontFamily: t.fontSans, fontSize: '0.7rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '100px',
                    }}>START HERE</div>
                  )}
                  <div style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, fontSize: '0.9rem' }}>{tier}</div>
                  <div style={{ fontFamily: t.fontSans, fontWeight: 800, color: highlight ? ACCENT : t.text, fontSize: '1.4rem', margin: '4px 0' }}>{price}</div>
                  <div style={{ fontFamily: t.fontSerif, fontSize: '0.78rem', color: t.gray }}>{range}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: t.greenBg, border: '1px solid #C6E6D4',
              borderRadius: '10px', padding: '14px 20px',
              fontFamily: t.fontSans, fontSize: '0.88rem', color: t.green, marginBottom: '24px',
            }}>
              Recovering 1 failed payment per month more than pays for ChurnRecovery. Most sellers save far more.
            </div>
          </div>
        </section>

        {/* ─── FAQ ──────────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: 0, letterSpacing: '-0.02em',
              }}>
                Questions From Payhip Sellers
              </h2>
            </div>

            {[
              {
                q: 'Does ChurnRecovery work with Payhip?',
                a: "Yes — for Payhip sellers who use Stripe as their payment method. Payhip lets you connect your own Stripe account for checkout. ChurnRecovery connects to that same Stripe account and intercepts cancellations and failed payment events.",
              },
              {
                q: 'Do I need to change how I use Payhip?',
                a: "No. You don't change a single setting in Payhip. ChurnRecovery works at the Stripe layer — completely invisible to Payhip. Your subscribers see your branded recovery flow, but everything continues normally in Payhip afterward.",
              },
              {
                q: "What if I use PayPal through Payhip?",
                a: "PayPal subscriptions aren't supported yet — ChurnRecovery currently works with Stripe only. If you're using Payhip with Stripe for subscriptions, you're fully supported.",
              },
              {
                q: 'Does this work for courses, memberships, and digital downloads?',
                a: "ChurnRecovery specifically helps with subscription-based Payhip products — recurring memberships, course subscriptions, ongoing digital access. One-time product sales don't have a recurring cancel event to intercept.",
              },
              {
                q: 'Can I customize the messages subscribers see?',
                a: "Yes, completely. The dunning emails and cancel flow messages are fully editable. We provide templates built for digital product sellers, but you can change every word to match your brand and voice.",
              },
              {
                q: 'How do branded dunning emails work?',
                a: "Instead of Stripe's generic 'Your payment failed' email, ChurnRecovery sends a branded email from your address: 'Hey, it looks like there was a hiccup with your subscription payment.' It's friendly, personal, and dramatically more effective than Stripe's default.",
              },
              {
                q: 'What if a subscriber still cancels after seeing my offer?',
                a: "They leave — and you get their exit reason from the survey. 20–35% of cancel attempts are saved by a well-timed offer. The rest give you valuable feedback. Both are better than the current situation where they just disappear silently.",
              },
            ].map(faq => (
              <FAQItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                theme={{ accent: ACCENT }}
              />
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #071a12 0%, #0d2e1e 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              You Earned That Subscriber.<br />
              <span style={{ color: ACCENT_LIGHT }}>Don&apos;t Let Them Slip Away.</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Be first to add automatic cancel recovery and dunning to your Payhip store. Free to start — no Payhip approval, no code, no credit card.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <PayhipWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>Free during beta</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>Cancel anytime</span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>No spam, ever</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
