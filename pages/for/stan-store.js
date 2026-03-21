import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PainCard from '../../components/for/PainCard'
import HowStep from '../../components/for/HowStep'
import BenefitCard from '../../components/for/BenefitCard'
import FAQItem from '../../components/for/FAQItem'

const ACCENT = '#ec4899'
const ACCENT_LIGHT = '#f9a8d4'
const ACCENT_BG = 'rgba(236,72,153,0.08)'
const ACCENT_DARK_BG = 'rgba(236,72,153,0.15)'

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

function StanWaitlistForm({ dark = false }) {
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
        body: JSON.stringify({ email: email.trim(), source: 'stan-store-lp', tag: 'stan-store-creator' }),
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
            : 'Free beta access for Stan Store creators. We\'ll email you when we\'re ready.'}
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
            background: status === 'loading' ? t.grayLight : ACCENT,
            color: t.white, fontFamily: t.fontSans, fontWeight: 700,
            fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {status === 'loading' ? 'Joining...' : 'Stop the Churn — Join Free →'}
        </button>
        <input type="hidden" name="source" value="stan-store-lp" />
        <input type="hidden" name="tag" value="stan-store-creator" />
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

export default function StanStoreLandingPage() {
  return (
    <>
      <Head>
        <title>Stan Store Subscribers Canceling? Here's How to Stop It. | ChurnRecovery</title>
        <meta name="description" content="When a Stan Store subscriber hits cancel, they usually just need a pause — not a goodbye. ChurnRecovery intercepts the cancel and offers a deal, in your voice, automatically." />
        <link rel="canonical" href="https://churnrecovery.com/for/stan-store" />
        <meta property="og:title" content="Stan Store Subscribers Canceling? Here's How to Stop It. | ChurnRecovery" />
        <meta property="og:description" content="Stan Store connects to your Stripe. ChurnRecovery plugs into that same Stripe and catches subscription cancellations before they're final. No code, no Stan approval needed." />
        <meta property="og:url" content="https://churnrecovery.com/for/stan-store" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stan Store Subscribers Canceling? Here's How to Stop It." />
        <meta name="twitter:description" content="80k+ creators use Stan Store. Most of them have no cancel recovery. ChurnRecovery adds one automatically — pause offers, discounts, exit surveys." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #1a0a12 0%, #2d0f20 50%, #1a0a12 100%)',
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
              background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.35)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: ACCENT_LIGHT, marginBottom: '28px',
            }}>
              <span>✓</span> Built for Stan Store Creators · Free During Beta
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Stan Store Subscribers Canceling?<br />
              <span style={{ color: ACCENT_LIGHT }}>Here&apos;s How to Stop It.</span>
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              Your subscribers don&apos;t want to leave — they&apos;re just having a rough week. Stan Store has no cancel flow. ChurnRecovery adds one automatically: a pause, a deal, or a check-in from you — before they&apos;re gone.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <StanWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                ⚡ Works with Stan Creator Pro &amp; Stripe
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                💕 No Stan approval needed
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
              }}>The Creator Churn Problem</div>
              <h2 style={{
                fontFamily: t.fontSans, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Every Cancel Is Revenue<br />That Didn&apos;t Have to Leave
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Stan Store is incredible for turning followers into paying subscribers. But when someone clicks cancel, there&apos;s nothing between you and losing them forever.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="💸"
                title="Subscription Revenue Just Disappears"
                stat="5–10%"
                statLabel="of subscribers cancel every month on average"
                description="You work hard to convert a follower into a paying subscriber. Then one bad week hits, they click cancel, and $29/month walks out the door — with no warning and no chance to keep them."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🤷"
                title="No Visibility Into Why They Leave"
                description="Stan Store doesn&apos;t give you a cancel reason. They just… leave. Was it price? Overwhelm? A slow week of content? You&apos;ll never know — and you can&apos;t fix what you can&apos;t see."
                accentColor={ACCENT}
              />
              <PainCard
                icon="👆"
                title="One Click and They&apos;re Gone"
                description="A Stan subscriber can cancel in one tap from the app. No confirmation. No &lsquo;are you sure?&rsquo; No offer. This is an impulse cancel — and impulse cancels are exactly what a pause offer stops."
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
                Works With Stan Store in Minutes
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Stan Store Creator Pro connects to your Stripe account. ChurnRecovery connects to that same Stripe — no Stan integration, no developer needed.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect the same Stripe account you use with Stan Store. One OAuth click — no keys, no code. If you&apos;re on Creator Pro, you already have direct Stripe."
                callout="✓ Stan Creator Pro requires Stripe — you're already halfway there."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Every Cancel in Real Time"
                description="The moment a subscriber initiates a cancel — in the app, on desktop, anywhere — ChurnRecovery fires. We intercept the Stripe event before it&apos;s final and trigger your recovery flow."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Voice — Automated"
                description="They see a message from you: take a month off, get a deal, or tell us what&apos;s up. Set it once and it runs forever — saving subscribers even while you&apos;re creating content."
                callout="🎯 Average recovery rate: 20–35% of at-risk subscribers"
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
            </div>

            <div style={{
              marginTop: '32px',
              background: ACCENT_BG,
              border: `1px solid rgba(236,72,153,0.25)`,
              borderLeft: `4px solid ${ACCENT}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Does Stan Store allow this?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                ChurnRecovery doesn&apos;t touch Stan Store — it works at the Stripe level. Stan connects your subscriptions to your Stripe account. We connect to that same Stripe account and listen for cancel events. Stan doesn&apos;t know we exist, and no approval is needed.
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
                background: ACCENT_BG, border: `1px solid rgba(236,72,153,0.3)`,
                borderRadius: '10px', padding: '14px 28px',
                fontFamily: t.fontSans, fontWeight: 700, color: ACCENT,
                textDecoration: 'none', fontSize: '0.95rem',
              }}>
                🎮 Try the Interactive Demo
              </Link>
              <p style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: t.grayLight, marginTop: '8px' }}>
                See a live cancel flow — no signup required
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
                Everything to Keep Your Stan Subscribers
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Subscribers can pause instead of cancel. Most impulse cancels happen during busy weeks — a 1-month pause keeps them and brings them back."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a deal to price-sensitive subscribers. A subscriber at 20% off is worth infinitely more than one who canceled."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Capture why subscribers leave with a 1-question survey. Use the answers to improve your content and offers — and stop guessing."
              />
              <BenefitCard
                icon="💌"
                title="Personal Check-In Flow"
                description="Send a personalized message when someone cancels: 'Hey, I noticed you canceled — is everything okay?' The personal touch that converts browsers into loyal fans back into subscribers."
              />
              <BenefitCard
                icon="📊"
                title="Creator Dashboard"
                description="See how much revenue you&apos;ve saved, which offers work best, and your overall recovery rate — in a dashboard built for creators, not engineers."
              />
              <BenefitCard
                icon="🚀"
                title="No Stan Approval Needed"
                description="ChurnRecovery works entirely through Stripe. Stan doesn&apos;t know we exist. No app store, no partner approval, no waiting around."
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
              Priced for Creators, Not Enterprises
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
              lineHeight: 1.7, margin: '0 0 32px',
            }}>
              $200M was paid out to Stan creators in 2024. ChurnRecovery helps you keep more of it — starting free.
            </p>

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
              Saving 1 subscriber per month at $29 covers ChurnRecovery entirely. Most creators save dozens.
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
                Questions From Stan Creators
              </h2>
            </div>

            {[
              {
                q: 'Does ChurnRecovery work with Stan Store?',
                a: "Yes — specifically for creators on the Creator Pro plan who have their own Stripe account connected. ChurnRecovery connects to that Stripe account and intercepts cancellation events before they're finalized.",
              },
              {
                q: "Does this work with Stan's Creator Pro plan?",
                a: "Yes. Creator Pro connects your own Stripe account with no Stan transaction fee. ChurnRecovery plugs into that same Stripe connection. If you're on the free Stan plan with Stan's built-in payments, you'd need to upgrade to Creator Pro first.",
              },
              {
                q: 'Do my subscribers have to do anything different?',
                a: "No. From their side, they just see your branded recovery message when they try to cancel. It feels like a personal message from you — not a third-party app. Everything is seamless.",
              },
              {
                q: 'Can I customize what my subscribers see?',
                a: "Yes, completely. Write your own message, choose your offer (pause, discount, personal check-in), and set the timing. We provide templates built for creator businesses, but every word is editable.",
              },
              {
                q: 'How is this different from Stan Store just having a cancel flow?',
                a: "Stan doesn't have a cancel flow — that's exactly the problem. ChurnRecovery adds one. And because we work at the Stripe level, it works for any Stan Store regardless of how they've built their site.",
              },
              {
                q: 'What if I sell courses and coaching on Stan, not subscriptions?',
                a: "ChurnRecovery specifically helps with subscription-based Stan products — monthly memberships, recurring coaching programs, content subscription tiers. One-time purchases don't have a recurring cancel event to intercept.",
              },
              {
                q: "What if someone still cancels after seeing my offer?",
                a: "They leave — but you still got their exit reason, and you made the attempt. 20–35% of the time the offer works. The rest of the time, you learn something valuable. That's a win either way.",
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
          background: 'linear-gradient(135deg, #1a0a12 0%, #2d0f20 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              Your Subscribers Don&apos;t Want to Leave.<br />
              <span style={{ color: ACCENT_LIGHT }}>Give Them a Reason to Stay.</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Be first to add a cancel recovery flow to your Stan Store. Free to start — works with Creator Pro, no Stan approval needed.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <StanWaitlistForm dark={true} />
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
