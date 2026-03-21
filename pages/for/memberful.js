import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PainCard from '../../components/for/PainCard'
import HowStep from '../../components/for/HowStep'
import BenefitCard from '../../components/for/BenefitCard'
import FAQItem from '../../components/for/FAQItem'

const ACCENT = '#6366f1'
const ACCENT_LIGHT = '#818cf8'
const ACCENT_BG = 'rgba(99,102,241,0.08)'
const ACCENT_DARK_BG = 'rgba(99,102,241,0.15)'

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

function MemberfulWaitlistForm({ dark = false }) {
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
        body: JSON.stringify({ email: email.trim(), source: 'memberful-lp', tag: 'memberful-creator' }),
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
            : 'Free beta access for Memberful creators. We\'ll email you when we\'re ready.'}
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
          {status === 'loading' ? 'Joining...' : 'Catch My Cancellations — Join Free →'}
        </button>
        <input type="hidden" name="source" value="memberful-lp" />
        <input type="hidden" name="tag" value="memberful-creator" />
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

export default function MemberfulLandingPage() {
  return (
    <>
      <Head>
        <title>Your Memberful Subscribers Are Canceling Silently. Catch Them. | ChurnRecovery</title>
        <meta name="description" content="ChurnRecovery connects to the same Stripe account Memberful uses and intercepts cancellations before they're final. Offer a pause, a discount, or ask why — automatically." />
        <link rel="canonical" href="https://churnrecovery.com/for/memberful" />
        <meta property="og:title" content="Your Memberful Subscribers Are Canceling Silently. Catch Them. | ChurnRecovery" />
        <meta property="og:description" content="Memberful is Stripe-native. So is ChurnRecovery. Connect once and start recovering members automatically — no code, no Memberful approval needed." />
        <meta property="og:url" content="https://churnrecovery.com/for/memberful" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Memberful Subscribers Are Canceling Silently. Catch Them." />
        <meta name="twitter:description" content="Memberful runs on your Stripe. ChurnRecovery plugs into Stripe and catches cancellations with a branded recovery flow — pause offers, discounts, and more." />
      </Head>

      <Header />

      <main style={{ fontFamily: t.fontSans, background: t.bg, paddingTop: '60px' }}>

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #0f0c2a 0%, #1a1550 50%, #0f0c2a 100%)',
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
              background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)',
              borderRadius: '100px', padding: '6px 16px',
              fontFamily: t.fontSans, fontSize: '0.78rem', fontWeight: 600,
              color: ACCENT_LIGHT, marginBottom: '28px',
            }}>
              <span>✓</span> Built for Memberful Creators · Free During Beta
            </div>

            <h1 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Your Memberful Subscribers<br />
              <span style={{ color: ACCENT_LIGHT }}>Are Canceling Silently.</span><br />
              Catch Them.
            </h1>

            <p style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)', margin: '0 0 40px', lineHeight: 1.7,
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              Memberful connects directly to your Stripe account — and so does ChurnRecovery. The moment a member initiates a cancel, we intercept with a branded recovery flow: a pause offer, a discount, or a simple &quot;why are you leaving?&quot; All without touching Memberful&apos;s settings.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              <MemberfulWaitlistForm dark={true} />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                ⚡ Works alongside Memberful — no changes needed
              </span>
              <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                🎙 Perfect for podcasters &amp; newsletters
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
                Every Silent Cancel Is<br />Revenue You&apos;ll Never Get Back
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Memberful gives you beautiful membership tools — but when a subscriber clicks cancel, there&apos;s no safety net. No second chance. No offer. Just gone.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <PainCard
                icon="🤫"
                title="They Cancel Without Warning"
                stat="3–8%"
                statLabel="of members cancel every single month"
                description="Memberful notifies you after the cancel — not before. There&apos;s no moment to intervene, no offer to make. They click cancel and they&apos;re just gone. You find out in an email."
                accentColor={ACCENT}
              />
              <PainCard
                icon="⏸"
                title="No Pause Option = Lost Members"
                description="Many podcast listeners and newsletter readers cancel during busy stretches — not because they hate your content. They just need a break. Without a pause option, you lose them entirely when a temporary pause would have saved them."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🔇"
                title="Stripe&apos;s Dunning Emails Aren&apos;t Yours"
                description="When a payment fails, Memberful falls back to generic Stripe dunning emails. They&apos;re not in your voice, don&apos;t mention your show or newsletter, and feel completely disconnected from the relationship you&apos;ve built."
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
                Works With Memberful in Minutes
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
                maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Memberful requires Stripe for payments. ChurnRecovery connects to that same Stripe account — completely separate from Memberful.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect the same Stripe account Memberful uses. One OAuth click — no keys to copy, no code to write. Takes 2 minutes."
                callout="✓ Memberful already requires Stripe — you're already set up."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Intercept Every Cancel Attempt"
                description="The instant a subscriber clicks cancel in Memberful, ChurnRecovery fires. We catch the Stripe event before it&apos;s finalized and trigger your custom recovery flow — automatically."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, In Your Voice — Automatic"
                description="Subscribers see a personalized message from you: pause for a month, get a discount, or tell you why they&apos;re leaving. Set it once. It runs forever — even when you&apos;re recording."
                callout="🎯 Average recovery rate: 20–35% of at-risk members"
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
            </div>

            <div style={{
              marginTop: '32px',
              background: ACCENT_BG,
              border: `1px solid rgba(99,102,241,0.25)`,
              borderLeft: `4px solid ${ACCENT}`,
              borderRadius: '10px', padding: '20px 24px',
              maxWidth: '680px', margin: '32px auto 0',
            }}>
              <p style={{ fontFamily: t.fontSans, fontWeight: 700, color: t.text, margin: '0 0 8px', fontSize: '0.95rem' }}>
                &ldquo;Does this require changes in Memberful?&rdquo;
              </p>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: '0 0 10px', lineHeight: 1.7 }}>
                No. ChurnRecovery operates entirely at the Stripe level. Memberful uses your Stripe account to process payments — we just listen to the same Stripe events. No Memberful API access, no plugin, no approval from Memberful required.
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
                background: ACCENT_BG, border: `1px solid rgba(99,102,241,0.3)`,
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
                Everything to Protect Your Memberful Revenue
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Give members a pause option before they cancel. Podcasters and newsletter readers often cancel during busy weeks — a 1-month pause brings most of them back."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a discount to price-sensitive members. Keeping a supporter at 20% off beats losing them permanently to a competitor."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Capture why members leave with a one-question exit survey. Use the signal to improve your show, newsletter, or community content."
              />
              <BenefitCard
                icon="📬"
                title="Branded Dunning Emails"
                description="Replace Stripe&apos;s generic payment failure emails with branded messages that sound like you — not a payment processor. Recover failed payments before members even notice."
              />
              <BenefitCard
                icon="📊"
                title="Recovery Dashboard"
                description="Track saved revenue, recovery rates, and which offers work best — all in one clean dashboard built for independent creators."
              />
              <BenefitCard
                icon="🚫"
                title="No Memberful Approval Needed"
                description="ChurnRecovery works at the Stripe layer. Memberful doesn&apos;t know we exist. No plugin, no partner approval, no waiting."
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
              Priced for Independent Creators
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
              lineHeight: 1.7, margin: '0 0 32px',
            }}>
              Memberful charges per-subscriber after free tier. ChurnRecovery starts free — and pays for itself the first time you save a subscriber.
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
              One recovered subscriber per month covers ChurnRecovery&apos;s cost entirely. The math is always in your favor.
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
                Questions From Memberful Creators
              </h2>
            </div>

            {[
              {
                q: 'Does ChurnRecovery work with Memberful?',
                a: "Yes. Memberful requires creators to connect their own Stripe account — all payments flow through Stripe. ChurnRecovery connects to that same Stripe account and listens for cancellation events. No Memberful API needed.",
              },
              {
                q: "Does this work alongside Memberful's cancellation survey?",
                a: "Yes — they complement each other. Memberful's survey captures feedback after a cancel. ChurnRecovery intercepts before the cancel is final, giving you a chance to offer a pause or discount first. Both can run together.",
              },
              {
                q: 'Do I need to change anything in Memberful?',
                a: "No. You don't change a single setting in Memberful. ChurnRecovery works at the Stripe layer, completely outside Memberful's ecosystem. It's invisible to Memberful.",
              },
              {
                q: 'Will this work for my podcast membership?',
                a: "Absolutely. ChurnRecovery is especially effective for podcast creators because listener churn is often seasonal — people cancel during show breaks or busy months. A pause offer recovers most of those temporary cancels.",
              },
              {
                q: 'Can I customize the cancel flow message?',
                a: "Yes, completely. Your message, your offer, your tone. We provide templates built for independent creators and publishers, but you can edit every word to match your voice.",
              },
              {
                q: 'What happens when a payment fails?',
                a: "Instead of Stripe's generic dunning emails, ChurnRecovery sends branded emails in your voice: 'Hey, looks like there was a hiccup with your membership payment.' Earlier, friendlier, and more effective.",
              },
              {
                q: "What if a subscriber still cancels after seeing the offer?",
                a: "That's fine. If they want to leave, they leave. You still capture their exit reason — which is more than you had before. And 20–35% of the time, the offer works.",
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
          background: 'linear-gradient(135deg, #0f0c2a 0%, #1a1550 100%)',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: t.white, margin: '0 0 20px', lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              A Memberful Subscriber Is<br />About to Cancel.
              <br /><span style={{ color: ACCENT_LIGHT }}>Will You Be Ready?</span>
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.7,
            }}>
              Join the waitlist. Be first to protect your Memberful membership revenue with automated cancel recovery. Free to start — no Memberful approval, no code.
            </p>

            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <MemberfulWaitlistForm dark={true} />
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
