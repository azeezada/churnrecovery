import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// ─── Waitlist Form (convertkit/Kit-specific) ────────────────────────────────
function KitWaitlistForm({ dark = false }) {
  const [email, setEmail] = useState('')
  const [newsletterName, setNewsletterName] = useState('')
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
          source: 'convertkit-lp',
          tag: 'convertkit-creator',
          newsletterName: newsletterName.trim(),
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

  const bgColor = dark ? 'rgba(255,255,255,0.08)' : '#FFFFFF'
  const borderColor = dark ? 'rgba(255,255,255,0.15)' : '#E5E5E5'
  const textColor = dark ? '#FFFFFF' : '#191919'
  const subtextColor = dark ? 'rgba(255,255,255,0.6)' : '#666666'

  if (status === 'success' || status === 'duplicate') {
    return (
      <div className="text-center p-6 rounded-xl" style={{
        background: dark ? 'rgba(45,122,79,0.15)' : '#EDF7F1',
        border: `1px solid ${dark ? 'rgba(45,122,79,0.3)' : '#C6E6D4'}`,
      }}>
        <div className="text-[2rem] mb-2">
          {status === 'duplicate' ? '👋' : '🎉'}
        </div>
        <p className="font-['Instrument_Sans',sans-serif] font-bold text-base mb-1.5" style={{ color: dark ? '#FFFFFF' : '#191919', margin: '0 0 6px' }}>
          {status === 'duplicate' ? "You're already on the list!" : "You're in! We'll be in touch soon."}
        </p>
        <p className="font-['Merriweather',serif] text-[0.85rem] m-0" style={{ color: subtextColor }}>
          {status === 'duplicate'
            ? "We've got your email — we'll reach out when we launch."
            : "Free beta access for Kit creators. We'll email you when we're ready."}
        </p>
        {count && (
          <p className="font-['Instrument_Sans',sans-serif] text-xs mt-2.5" style={{ color: subtextColor, margin: '10px 0 0' }}>
            Join {count.toLocaleString()} newsletter creators on the waitlist
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoComplete="email"
          aria-label="Email address"
          className="py-[13px] px-4 rounded-lg font-['Instrument_Sans',sans-serif] text-[0.95rem] outline-none"
          style={{
            border: `1px solid ${error ? '#DC2626' : borderColor}`,
            background: bgColor, color: textColor,
          }}
        />
        <input
          type="text"
          value={newsletterName}
          onChange={e => setNewsletterName(e.target.value)}
          placeholder="Your newsletter name (optional)"
          aria-label="Newsletter name"
          className="py-[13px] px-4 rounded-lg font-['Instrument_Sans',sans-serif] text-[0.95rem] outline-none"
          style={{
            border: `1px solid ${borderColor}`,
            background: bgColor, color: textColor,
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="py-3.5 px-7 rounded-lg border-none text-white font-['Instrument_Sans',sans-serif] font-bold text-base transition-[background] duration-150"
          style={{
            background: status === 'loading' ? '#999999' : '#D97757',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'loading' ? 'Joining...' : 'Keep My Kit Subscribers →'}
        </button>
        <input type="hidden" name="source" value="convertkit-lp" />
        <input type="hidden" name="tag" value="convertkit-creator" />
      </form>
      {error && (
        <p className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[#DC2626] mt-2">
          ⚠ {error}
        </p>
      )}
      <div className="flex gap-4 mt-3 flex-wrap">
        <span className="font-['Instrument_Sans',sans-serif] text-[0.78rem]" style={{ color: subtextColor }}>
          🆓 Free during beta
        </span>
        <span className="font-['Instrument_Sans',sans-serif] text-[0.78rem]" style={{ color: subtextColor }}>
          🔒 No credit card required
        </span>
        {count && (
          <span className="font-['Instrument_Sans',sans-serif] text-[0.78rem]" style={{ color: subtextColor }}>
            <span className="text-[#2D7A4F]">●</span> {count.toLocaleString()} on waitlist
          </span>
        )}
      </div>
    </div>
  )
}

function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6 border-t-[3px] border-t-[#D97706]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-['Instrument_Sans',sans-serif] font-extrabold text-[2rem] text-[#D97706] my-1">
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[#EA580C] mb-2">
          {statLabel}
        </div>
      )}
      <p className="font-['Merriweather',serif] text-[0.88rem] text-[#666666] m-0 leading-[1.6]">
        {description}
      </p>
    </div>
  )
}

function HowStep({ number, icon, title, description, callout }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-[#FDF4F0] border-2 border-[#D97757] flex items-center justify-center font-['Instrument_Sans',sans-serif] font-extrabold text-[1.1rem] text-[#D97757] shrink-0">{number}</div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-['Instrument_Sans',sans-serif] text-[1.05rem] font-bold text-[#191919] m-0">
            {title}
          </h3>
        </div>
      </div>
      <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] mb-3 leading-[1.7]" style={{ margin: '0 0 12px' }}>
        {description}
      </p>
      {callout && (
        <div className="bg-[#FDF4F0] border border-[#D9775730] rounded-lg py-2.5 px-3.5 font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[#EA580C]">
          {callout}
        </div>
      )}
    </div>
  )
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="flex gap-3.5 items-start bg-white border border-[#E5E5E5] rounded-[10px] p-5">
      <span className="text-[1.4rem] shrink-0">{icon}</span>
      <div>
        <h4 className="font-['Instrument_Sans',sans-serif] text-[0.92rem] font-bold text-[#191919]" style={{ margin: '0 0 4px' }}>
          {title}
        </h4>
        <p className="font-['Merriweather',serif] text-[0.82rem] text-[#666666] m-0 leading-[1.55]">
          {description}
        </p>
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white border-none cursor-pointer py-4 px-5 flex justify-between items-center gap-3 text-left"
      >
        <span className="font-['Instrument_Sans',sans-serif] font-semibold text-[0.93rem] text-[#191919]">
          {q}
        </span>
        <span className="text-[#D97757] text-[1.2rem] font-bold shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 bg-[#FAF9F5]" style={{ padding: '0 20px 16px' }}>
          <p className="font-['Merriweather',serif] text-[0.88rem] text-[#666666] m-0 leading-[1.7]">
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function ConvertKitLandingPage() {
  return (
    <>
      <Head>
        <title>Keep Your Kit (ConvertKit) Paid Subscribers From Canceling | ChurnRecovery</title>
        <meta name="description" content="Kit (formerly ConvertKit) creators: stop losing paid newsletter subscribers at cancellation. ChurnRecovery integrates with Stripe to intercept cancellations and win them back automatically." />
        <link rel="canonical" href="https://churnrecovery.com/for/convertkit" />
        <meta property="og:title" content="Keep Your Kit Paid Subscribers From Canceling | ChurnRecovery" />
        <meta property="og:description" content="Stop losing Kit/ConvertKit paid subscribers silently. ChurnRecovery catches cancellations in real-time and wins them back." />
        <meta property="og:url" content="https://churnrecovery.com/for/convertkit" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Keep Your Kit Paid Subscribers From Canceling" />
        <meta name="twitter:description" content="ChurnRecovery for Kit (ConvertKit) creators — catch cancellations and recover revenue automatically." />
      </Head>

      <Header />

      <main className="font-['Instrument_Sans',sans-serif] bg-[#FAF9F5] pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#020817_0%,#0F172A_50%,#020817_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.10)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(59,130,246,0.12)] border border-[rgba(59,130,246,0.25)] rounded-full py-1.5 px-4 font-['Instrument_Sans',sans-serif] text-[0.78rem] font-semibold text-[#93C5FD] mb-7">
              <span>✓</span> For Kit (ConvertKit) Creators · No Credit Card Required
            </div>

            <h1 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white mb-5 leading-[1.15] tracking-[-0.02em]" style={{ margin: '0 0 20px' }}>
              Keep Your Kit Paid Subscribers<br />
              <span className="text-[#93C5FD]">From Canceling</span>
            </h1>

            <p className="font-['Merriweather',serif] text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] mb-10 leading-[1.7] max-w-[600px] mx-auto" style={{ margin: '0 0 40px' }}>
              You built an audience on Kit (formerly ConvertKit). Now paid subscribers are canceling — and you&apos;re finding out after the fact. ChurnRecovery intercepts cancellations in real-time and automatically tries to win them back with personalized offers before they&apos;re gone.
            </p>

            <div className="max-w-[480px] mx-auto mb-6" style={{ margin: '0 auto 24px' }}>
              <KitWaitlistForm dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 Free for newsletters under $1k/month MRR
              </span>
              <span className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ 10-minute setup via Stripe
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-['Instrument_Sans',sans-serif] text-[0.9rem] text-[rgba(255,255,255,0.6)] no-underline border-b border-[rgba(255,255,255,0.3)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PAIN POINTS ─────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-['Instrument_Sans',sans-serif] text-xs font-bold text-[#EA580C] uppercase tracking-[0.08em] mb-3">The Creator Economy Problem</div>
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] mb-4 tracking-[-0.02em]" style={{ margin: '0 0 16px' }}>
                You Built the Audience.<br />Now They&apos;re Leaving.
              </h2>
              <p className="font-['Merriweather',serif] text-base text-[#666666] max-w-[560px] mx-auto leading-[1.7]" style={{ margin: '0 auto' }}>
                Kit is great for building a creator business. But when paid subscribers cancel, Kit shows you the number drop — not why it happened, and not how to stop it.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="💸"
                title="Monthly Revenue Is Always at Risk"
                stat="3–8%"
                statLabel="of paid subscribers churn every month on average"
                description="A 500-subscriber paid newsletter at $10/month loses $150–$400 every month to churn. That's $1,800–$4,800 per year — quietly disappearing."
              />
              <PainCard
                icon="🚪"
                title="No Cancel Flow = No Second Chance"
                description="Kit doesn't give you a cancellation flow for paid subscribers. The moment someone decides to cancel, they're gone. No discount offer, no pause, no &quot;here's what you're missing.&quot;"
              />
              <PainCard
                icon="❓"
                title="You Don't Know Why They Leave"
                description="Is it price? Did they find a competitor? Did life get busy? You can't fix what you don't know. Right now you're flying blind every time someone churns."
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-['Instrument_Sans',sans-serif] text-xs font-bold text-[#D97757] uppercase tracking-[0.08em] mb-3">Simple Setup</div>
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] mb-4 tracking-[-0.02em]" style={{ margin: '0 0 16px' }}>
                Works With Kit in 10 Minutes
              </h2>
              <p className="font-['Merriweather',serif] text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]" style={{ margin: '0 auto' }}>
                No developer. No code. Connect your Stripe account and we handle the rest.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect via Stripe"
                description="Kit Commerce (paid subscriptions) processes payments through Stripe. Connect ChurnRecovery to your Stripe account — we start listening for cancellation signals immediately. No developer needed."
                callout="✓ Kit Commerce uses Stripe. We plug in directly."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="Cancellations Detected in Real-Time"
                description="The moment a subscriber starts to cancel their paid Kit subscription, ChurnRecovery knows. We intercept the event before it's final and automatically trigger your recovery flow."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Win Them Back Automatically"
                description="Subscribers see a message that sounds like it came from you — a pause offer, a discount, a personal note about what's coming. Many will stay. No manual work on your end."
                callout="🎯 Typical save rate: 20–35% of at-risk subscribers"
              />
            </div>

            <div className="mt-8 bg-[#F0F4FF] border border-[#3B82F630] border-l-4 border-l-[#3B82F6] rounded-[10px] p-5 max-w-[680px]" style={{ padding: '20px 24px', margin: '32px auto 0' }}>
              <p className="font-['Instrument_Sans',sans-serif] font-bold text-[#191919] mb-2 text-[0.95rem]" style={{ margin: '0 0 8px' }}>
                &ldquo;Does ChurnRecovery work with Kit (ConvertKit)?&rdquo;
              </p>
              <p className="font-['Merriweather',serif] text-[0.88rem] text-[#666666] leading-[1.7]" style={{ margin: '0 0 10px' }}>
                Yes. Kit Commerce uses Stripe to process paid subscriptions and recurring charges. ChurnRecovery hooks into Stripe webhook events — no direct Kit API integration needed. If your paid newsletter or product runs through Stripe via Kit, it works.
              </p>
              <Link href="/docs" className="font-['Instrument_Sans',sans-serif] text-[0.82rem] text-[#D97757] no-underline font-semibold">
                See technical docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[#FDF4F0] border border-[#D9775740] rounded-[10px] py-3.5 px-7 font-['Instrument_Sans',sans-serif] font-bold text-[#D97757] no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-['Instrument_Sans',sans-serif] text-[0.78rem] text-[#999999] mt-2">
                See a live cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-['Instrument_Sans',sans-serif] text-xs font-bold text-[#D97757] uppercase tracking-[0.08em] mb-3">What You Get</div>
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Rescue Revenue. Understand Your Audience.
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="💰"
                title="Rescue Revenue Automatically"
                description="20–35% of subscribers who start to cancel will accept an offer and stay. Set it up once, save money every month."
              />
              <BenefitCard
                icon="🔍"
                title="Understand Why People Leave"
                description="Collect real cancellation reasons. Is it price, content gaps, or timing? Use that data to improve your newsletter and reduce future churn."
              />
              <BenefitCard
                icon="⏸"
                title="Pause Instead of Cancel"
                description="Give subscribers a pause option. Creators who build monthly habits know: sometimes people just need a break, not a permanent exit."
              />
              <BenefitCard
                icon="📊"
                title="Revenue Recovery Dashboard"
                description="Track recovered revenue, see which messages perform, and understand your recovery rate over time. Know your numbers."
              />
              <BenefitCard
                icon="✉️"
                title="Sounds Like You, Not a Robot"
                description="Your messages are customizable — your voice, your brand, your offer. Subscribers feel heard by their creator, not trapped by software."
              />
              <BenefitCard
                icon="🆓"
                title="Free Until You're Earning"
                description="Free for newsletters under $1k/month MRR. No trial period. No credit card. Risk nothing — there's only upside."
              />
            </div>
          </div>
        </section>

        {/* ─── PRICING ─────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] mb-5 tracking-[-0.02em]" style={{ margin: '0 0 20px' }}>
              Simple Pricing for Creators
            </h2>
            <p className="font-['Merriweather',serif] text-base text-[#666666] leading-[1.7] mb-8" style={{ margin: '0 0 32px' }}>
              Free until you hit $1,000/month MRR. Scales with your newsletter — never a barrier to getting started.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { tier: 'Starter', price: '$0/month', range: 'Under $1k MRR', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} className="rounded-[10px] p-[18px] relative" style={{
                  background: highlight ? '#FDF4F0' : '#FAF9F5',
                  border: `1px solid ${highlight ? '#D97757' : '#E5E5E5'}`,
                }}>
                  {highlight && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#D97757] text-white font-['Instrument_Sans',sans-serif] text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">START HERE</div>
                  )}
                  <div className="font-['Instrument_Sans',sans-serif] font-bold text-[#191919] text-[0.9rem]">{tier}</div>
                  <div className="font-['Instrument_Sans',sans-serif] font-extrabold text-[1.4rem] my-1" style={{ color: highlight ? '#D97757' : '#191919' }}>{price}</div>
                  <div className="font-['Merriweather',serif] text-[0.78rem] text-[#666666]">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-['Instrument_Sans',sans-serif] text-[0.88rem] text-[#2D7A4F] mb-6">
              Compare to Churnkey ($250+/month) or ProfitWell Retain ($400+/month). Kit creators deserve better.
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Kit Creators
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Kit (ConvertKit)?',
                a: "Yes. Kit Commerce processes paid subscriptions through Stripe. ChurnRecovery connects to Stripe directly and listens for cancellation webhooks — no special Kit API integration needed. If you sell paid newsletters or recurring products through Kit, it works.",
              },
              {
                q: 'Does it matter that ConvertKit rebranded to Kit?',
                a: "Not at all. Whether you call it Kit or ConvertKit, the underlying Stripe integration is the same. ChurnRecovery works with both old and new Kit accounts.",
              },
              {
                q: 'Do I need a developer?',
                a: "No. The setup is copy-paste: add a webhook URL from ChurnRecovery to your Stripe dashboard. Takes about 10 minutes with our step-by-step guide.",
              },
              {
                q: "Will it look like a third-party tool to my subscribers?",
                a: "No — unless you want it to. Your cancel flow messages are fully customizable. Subscribers see your words, your offer, your tone. ChurnRecovery is invisible infrastructure.",
              },
              {
                q: 'What kinds of offers can I show at cancellation?',
                a: "You can offer a pause (1–3 months), a discount (percentage off), a free month, or a personal note. You decide what to offer and when. We handle the delivery and tracking.",
              },
              {
                q: "What's the typical save rate?",
                a: "20–35% of at-risk subscribers accept an offer and stay. On a $3,000/month newsletter, that's $600–$1,050 per month saved that you would have lost.",
              },
              {
                q: 'Can I cancel ChurnRecovery?',
                a: "Yes, any time. No contracts. The free tier is free forever — just disconnect the webhook if you want to stop. Zero risk.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ───────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#020817_0%,#0F172A_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white mb-5 leading-[1.2] tracking-[-0.02em]" style={{ margin: '0 0 20px' }}>
              A Kit Subscriber Is Canceling<br />Right Now.
              <br /><span className="text-[#93C5FD]">Are You Catching Them?</span>
            </h2>
            <p className="font-['Merriweather',serif] text-base text-[rgba(255,255,255,0.7)] mb-9 leading-[1.7]" style={{ margin: '0 0 36px' }}>
              Join the waitlist. Get free beta access to stop Kit cancellations automatically.
              Designed for newsletter creators, coaches, and subscription business owners.
            </p>

            <div className="max-w-[480px] mx-auto">
              <KitWaitlistForm dark={true} />
            </div>

            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-['Instrument_Sans',sans-serif] text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                Free during beta
              </span>
              <span className="font-['Instrument_Sans',sans-serif] text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                Cancel anytime
              </span>
              <span className="font-['Instrument_Sans',sans-serif] text-[0.78rem] text-[rgba(255,255,255,0.45)]">
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
