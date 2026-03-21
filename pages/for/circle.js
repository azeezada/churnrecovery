import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function CircleWaitlistForm({ dark = false }) {
  const [email, setEmail] = useState('')
  const [circleUrl, setCircleUrl] = useState('')
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
          source: 'circle-lp',
          tag: 'circle-community',
          circleUrl: circleUrl.trim(),
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
        <p className="font-['Instrument_Sans',sans-serif] font-bold text-base mb-1.5" style={{ color: dark ? '#FFFFFF' : '#191919' }}>
          {status === 'duplicate' ? "You're already on the list!" : "You're in! We'll be in touch soon."}
        </p>
        <p className="font-['Merriweather',serif] text-[0.85rem] m-0" style={{ color: subtextColor }}>
          {status === 'duplicate'
            ? "We've got your email — we'll reach out when we launch."
            : "Free beta access for Circle community builders. We'll email you when we're ready."}
        </p>
        {count && (
          <p className="font-['Instrument_Sans',sans-serif] text-xs mt-2.5" style={{ color: subtextColor }}>
            Join {count.toLocaleString()} creators on the waitlist
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
            background: bgColor,
            color: textColor,
          }}
        />
        <input
          type="url"
          value={circleUrl}
          onChange={e => setCircleUrl(e.target.value)}
          placeholder="your-community.circle.so (optional)"
          aria-label="Circle community URL"
          className="py-[13px] px-4 rounded-lg font-['Instrument_Sans',sans-serif] text-[0.95rem] outline-none"
          style={{
            border: `1px solid ${borderColor}`,
            background: bgColor,
            color: textColor,
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="py-3.5 px-7 rounded-lg border-none text-white font-['Instrument_Sans',sans-serif] font-bold text-base transition-[background] duration-150"
          style={{
            background: status === 'loading' ? '#999999' : '#F97316',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'loading' ? 'Joining...' : 'Rescue My Community Members →'}
        </button>
        <input type="hidden" name="source" value="circle-lp" />
        <input type="hidden" name="tag" value="circle-community" />
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
        <div className="w-12 h-12 rounded-full bg-[#FFF7ED] border-2 border-[#F97316] flex items-center justify-center font-['Instrument_Sans',sans-serif] font-extrabold text-[1.1rem] text-[#F97316] shrink-0">{number}</div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-['Instrument_Sans',sans-serif] text-[1.05rem] font-bold text-[#191919] m-0">
            {title}
          </h3>
        </div>
      </div>
      <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] mb-3 leading-[1.7]">
        {description}
      </p>
      {callout && (
        <div className="bg-[#FFF7ED] border border-[#F9731630] rounded-lg py-2.5 px-3.5 font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[#F97316]">
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
        <h4 className="font-['Instrument_Sans',sans-serif] text-[0.92rem] font-bold text-[#191919] mb-1">
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
        <span className="text-[#F97316] text-[1.2rem] font-bold shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 bg-[#FAF9F5]" style={{ paddingTop: 0 }}>
          <p className="font-['Merriweather',serif] text-[0.88rem] text-[#666666] m-0 leading-[1.7]">
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function CircleLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Circle Community Builders | ChurnRecovery</title>
        <meta name="description" content="Rescue Circle community members before they cancel. Intercept paid membership cancellations with a pause offer — 30 days is better than losing them forever." />
        <link rel="canonical" href="https://churnrecovery.com/for/circle" />
        <meta property="og:title" content="Churn Recovery for Circle Community Builders | ChurnRecovery" />
        <meta property="og:description" content="Circle paid memberships run on Stripe. ChurnRecovery intercepts cancellations with a pause offer before members are gone forever." />
        <meta property="og:url" content="https://churnrecovery.com/for/circle" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Circle Community Builders" />
        <meta name="twitter:description" content="Rescue Circle members before they cancel. A 30-day pause is better than losing them forever." />
      </Head>

      <Header />

      <main className="font-['Instrument_Sans',sans-serif] bg-[#FAF9F5] pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1C0A00_0%,#2E1500_50%,#1C0A00_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(249,115,22,0.2)] border border-[rgba(249,115,22,0.4)] rounded-full py-1.5 px-4 font-['Instrument_Sans',sans-serif] text-[0.78rem] font-semibold text-[#FDBA74] mb-7">
              <span>✓</span> Built for Circle Communities · Free During Beta
            </div>

            <h1 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white mb-5 leading-[1.15] tracking-[-0.02em]">
              Rescue Circle Community Members<br />
              <span className="text-[#FDBA74]">Before They Cancel</span>
            </h1>

            <p className="font-['Merriweather',serif] text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] mb-10 leading-[1.7] max-w-[600px] mx-auto">
              Community members who lose momentum cancel. But a 30-day pause is better than losing them forever.
              ChurnRecovery intercepts Circle cancellations at the Stripe level — and offers the pause before they walk out the door.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <CircleWaitlistForm dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 Free forever under $1k/month MRR
              </span>
              <span className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⏸ Pause beats cancel every time
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-['Instrument_Sans',sans-serif] text-[0.9rem] text-[rgba(255,255,255,0.6)] no-underline border-b border-[rgba(255,255,255,0.3)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PAIN POINTS ─────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-['Instrument_Sans',sans-serif] text-xs font-bold text-[#EA580C] uppercase tracking-[0.08em] mb-3">The Community Builder Problem</div>
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] mb-4 tracking-[-0.02em]">
                Members Don&apos;t Leave Because<br />They Hate Your Community
              </h2>
              <p className="font-['Merriweather',serif] text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                They leave because life gets busy, momentum dips, or the price feels hard to justify this month. A pause — not a cancel — is what they actually need.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="🌊"
                title="The Momentum Dip is Real"
                description="Community engagement follows a curve. Members who joined excited can go weeks without logging in — and when the renewal hits, they cancel on reflex. Not because the community isn't valuable. Because they forgot."
              />
              <PainCard
                icon="💸"
                title="Forever Cancels Cost More Than Pauses"
                stat="5–10×"
                statLabel="cost to acquire a new member vs. retaining an existing one"
                description="A member who pauses for 30 days and comes back costs you nothing. A member who cancels and you have to re-acquire costs you $30–$100 in marketing. The math is clear."
              />
              <PainCard
                icon="🚫"
                title="Circle Gives You No Cancel Intervention"
                description="When a Circle member clicks cancel, the membership ends. No pause option in the flow, no exit question, no second chance. You find out in your Stripe dashboard when the revenue is already gone."
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-['Instrument_Sans',sans-serif] text-xs font-bold text-[#F97316] uppercase tracking-[0.08em] mb-3">How It Works</div>
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] mb-4 tracking-[-0.02em]">
                Circle Paid Memberships Run on Stripe.<br />So Does ChurnRecovery.
              </h2>
              <p className="font-['Merriweather',serif] text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                We intercept at the payment layer — before Circle processes the cancellation.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Circle paid memberships are processed through Stripe. Connect ChurnRecovery to that same Stripe account, and we start listening for cancellation webhooks immediately. No Circle API needed."
                callout="✓ 5-minute setup. Copy-paste simple."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="Catch the Cancel in Real Time"
                description="The moment a member initiates a cancellation on Circle, Stripe fires a webhook. ChurnRecovery intercepts it instantly — before it's processed, before the member is gone."
              />
              <HowStep
                number="3"
                icon="⏸"
                title="Offer a Pause, Not a Goodbye"
                description="Instead of a cancel confirmation, your member sees a pause option: take 30 days off, keep their spot, come back when they're ready. Many say yes. Those who don't can still cancel."
                callout="🎯 Pause converts 20–35% of at-risk members who would have canceled"
              />
            </div>

            <div className="mt-8 bg-[#FFF7ED] border border-[#F9731630] border-l-[4px] border-l-[#F97316] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-['Instrument_Sans',sans-serif] font-bold text-[#191919] mb-2 text-[0.95rem]">
                Why the pause offer works for communities
              </p>
              <p className="font-['Merriweather',serif] text-[0.88rem] text-[#666666] mb-2.5 leading-[1.7]">
                Unlike courses (where you consume content and move on), communities are ongoing. A member who pauses still identifies as part of your community. They&apos;re likely to return when their schedule clears or a hot topic resurfaces in your space. The pause is a permission slip — and it works far better for community than for any other subscription type.
              </p>
              <Link href="/docs" className="font-['Instrument_Sans',sans-serif] text-[0.82rem] text-[#F97316] no-underline font-semibold">
                Read the technical docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[#FFF7ED] border border-[#F9731640] rounded-[10px] py-3.5 px-7 font-['Instrument_Sans',sans-serif] font-bold text-[#F97316] no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-['Instrument_Sans',sans-serif] text-[0.78rem] text-[#999999] mt-2">
                See a live pause/cancel flow — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-['Instrument_Sans',sans-serif] text-xs font-bold text-[#F97316] uppercase tracking-[0.08em] mb-3">What You Get</div>
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Everything a Circle Community Builder Needs to Retain Members
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="30-Day Pause Option"
                description="Your most powerful retention tool for communities. Members who need a break get one — without losing access to their spot when they return."
              />
              <BenefitCard
                icon="⚡"
                title="Real-Time Cancel Interception"
                description="Don't find out tomorrow. Know the instant a member starts to cancel and respond immediately with your recovery flow."
              />
              <BenefitCard
                icon="💬"
                title="Personal Win-Back Message"
                description="A message from you, not a software popup. Community-specific language that resonates: 'Your spot will be here when you're ready.'"
              />
              <BenefitCard
                icon="📉"
                title="Discount Offers for Price-Sensitive Members"
                description="Some members cancel because the monthly cost felt hard to justify. A one-time 20% discount in the cancel moment converts more than you'd think."
              />
              <BenefitCard
                icon="📊"
                title="Member Retention Dashboard"
                description="See how many members you rescued, what offers they accepted, and how much recurring revenue you protected."
              />
              <BenefitCard
                icon="🏷"
                title="Community-Specific Templates"
                description="Pre-written messages designed for community builders — warmer tone, community-specific framing, pause-first messaging."
              />
              <BenefitCard
                icon="🆓"
                title="Free Under $1k/Month MRR"
                description="Growing your Circle community? ChurnRecovery is free until you hit $1k/month in recurring revenue."
              />
              <BenefitCard
                icon="🔒"
                title="No Code Setup"
                description="Connect Stripe, write your message, choose your offer. Done in 10 minutes. No developer, no integrations, no technical headaches."
              />
            </div>
          </div>
        </section>

        {/* ─── PRICING ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] mb-5 tracking-[-0.02em]">
              Fair Pricing for Community Builders
            </h2>
            <p className="font-['Merriweather',serif] text-base text-[#666666] leading-[1.7] mb-8">
              Free while you build. Scales affordably when your community grows.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { tier: 'Starter', price: '$0/month', range: 'Under $1k MRR', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} className="rounded-[10px] p-[18px] relative" style={{
                  background: highlight ? '#FFF7ED' : '#FAF9F5',
                  border: `1px solid ${highlight ? '#F97316' : '#E5E5E5'}`,
                }}>
                  {highlight && (
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#F97316] text-white font-['Instrument_Sans',sans-serif] text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">START HERE FREE</div>
                  )}
                  <div className="font-['Instrument_Sans',sans-serif] font-bold text-[#191919] text-[0.9rem]">{tier}</div>
                  <div className="font-['Instrument_Sans',sans-serif] font-extrabold text-[1.4rem] my-1" style={{ color: highlight ? '#F97316' : '#191919' }}>{price}</div>
                  <div className="font-['Merriweather',serif] text-[0.78rem] text-[#666666]">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-['Instrument_Sans',sans-serif] text-[0.88rem] text-[#2D7A4F] mb-6">
              Enterprise churn tools charge $400–$800/month. We start free and stay affordable. 😊
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Circle Builders
              </h2>
            </div>

            {[
              {
                q: 'Does ChurnRecovery work with Circle paid memberships?',
                a: "Yes. Circle processes paid memberships through Stripe. ChurnRecovery connects to your Stripe account and intercepts cancellation webhooks — no Circle API or special Circle integration needed.",
              },
              {
                q: 'What if Circle adds its own cancel flow someday?',
                a: "Great news for everyone. Until then, ChurnRecovery fills that gap. And even if Circle adds a basic exit survey, ChurnRecovery gives you custom recovery flows, pause options, discount automation, and recovery analytics — beyond what any platform would build natively.",
              },
              {
                q: 'Does the pause option actually work for communities?',
                a: "Yes — and it works especially well for communities. Unlike a course (where you finish and leave), a community member who pauses still identifies as a member. They return when life settles. A 30-day pause converts 20–35% of at-risk members who would otherwise have canceled permanently.",
              },
              {
                q: 'Will this feel pushy or manipulative to my members?',
                a: "No. The pause offer is genuine — members can take a real break and return. They can also still cancel if they want. We believe in transparent, honest retention. No dark patterns.",
              },
              {
                q: 'What if my Circle community uses a different payment processor?',
                a: "Circle paid memberships use Stripe. If you're using Circle's paid membership feature, you're already on Stripe — and ChurnRecovery works natively.",
              },
              {
                q: 'How is this different from just emailing members after they cancel?',
                a: "Night and day. Post-cancel email win-back rates are typically 2–5%. Intercept at the cancel moment before it's final and you're looking at 20–35% retention. The timing is everything.",
              },
              {
                q: "What if I'm just getting started with paid memberships?",
                a: "Perfect time to set this up. It takes 10 minutes and it's free under $1k/month. You'll have retention working from your very first paid member.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1C0A00_0%,#2E1500_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white mb-5 leading-[1.2] tracking-[-0.02em]">
              A Circle Member Is Canceling<br />Right Now — But They&apos;d Pause
              <br /><span className="text-[#FDBA74]">If You Gave Them the Option.</span>
            </h2>
            <p className="font-['Merriweather',serif] text-base text-[rgba(255,255,255,0.7)] mb-9 leading-[1.7]">
              Join the waitlist. Free beta access for Circle community builders — no credit card required.
            </p>

            <div className="max-w-[480px] mx-auto">
              <CircleWaitlistForm dark={true} />
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
