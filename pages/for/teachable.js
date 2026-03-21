import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// ─── Waitlist Form (teachable-specific) ─────────────────────────────────────
function TeachableWaitlistForm({ dark = false }) {
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
          source: 'teachable-lp',
          tag: 'teachable-creator',
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
      <div
        className="text-center p-6 rounded-xl"
        style={{
          background: dark ? 'rgba(26,158,110,0.15)' : '#E8F9F3',
          border: `1px solid ${dark ? 'rgba(26,158,110,0.3)' : '#A8E8D0'}`,
        }}
      >
        <div className="text-[2rem] mb-2">
          {status === 'duplicate' ? '👋' : '🎉'}
        </div>
        <p className="font-['Instrument_Sans',sans-serif] font-bold text-base m-0 mb-[6px]" style={{ color: dark ? '#FFFFFF' : '#191919' }}>
          {status === 'duplicate' ? "You're already on the list!" : "You're in! We'll be in touch soon."}
        </p>
        <p className="font-['Merriweather',serif] text-[0.85rem] m-0" style={{ color: subtextColor }}>
          {status === 'duplicate'
            ? "We've got your email — we'll reach out when we launch."
            : "Free beta access for Teachable creators. We'll email you when we're ready."}
        </p>
        {count && (
          <p className="font-['Instrument_Sans',sans-serif] text-[0.75rem] mt-2.5 mb-0 mx-0" style={{ color: subtextColor }}>
            Join {count.toLocaleString()} course creators on the waitlist
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
        <button
          type="submit"
          disabled={status === 'loading'}
          className="py-3.5 px-7 rounded-lg border-none font-['Instrument_Sans',sans-serif] font-bold text-base text-white transition-[background] duration-150"
          style={{
            background: status === 'loading' ? '#999999' : '#1A9E6E',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'loading' ? 'Joining...' : 'Recover My Course Revenue →'}
        </button>
        <input type="hidden" name="source" value="teachable-lp" />
        <input type="hidden" name="tag" value="teachable-creator" />
      </form>
      {error && (
        <p className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[#DC2626] mt-2 mb-0 mx-0">
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
            <span className="text-[#1A9E6E]">●</span> {count.toLocaleString()} on waitlist
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Pain card ──────────────────────────────────────────────────────────────
function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6 border-t-[3px] border-t-[#1A9E6E]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] m-0 mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-['Instrument_Sans',sans-serif] font-extrabold text-[2rem] text-[#1A9E6E] my-1">
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[#2D7A4F] mb-2">
          {statLabel}
        </div>
      )}
      <p className="font-['Merriweather',serif] text-[0.88rem] text-[#666666] m-0 leading-[1.6]">
        {description}
      </p>
    </div>
  )
}

// ─── How it works step ──────────────────────────────────────────────────────
function HowStep({ number, icon, title, description, callout }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-[#E8F9F3] border-2 border-[#1A9E6E] flex items-center justify-center font-['Instrument_Sans',sans-serif] font-extrabold text-[1.1rem] text-[#1A9E6E] shrink-0">
          {number}
        </div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-['Instrument_Sans',sans-serif] text-[1.05rem] font-bold text-[#191919] m-0">
            {title}
          </h3>
        </div>
      </div>
      <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] m-0 mb-3 leading-[1.7]">
        {description}
      </p>
      {callout && (
        <div className="bg-[#E8F9F3] border border-[rgba(26,158,110,0.25)] rounded-lg py-2.5 px-3.5 font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[#1A9E6E]">
          {callout}
        </div>
      )}
    </div>
  )
}

// ─── Benefit card ───────────────────────────────────────────────────────────
function BenefitCard({ icon, title, description }) {
  return (
    <div className="flex gap-3.5 items-start bg-white border border-[#E5E5E5] rounded-[10px] p-5">
      <span className="text-[1.4rem] shrink-0">{icon}</span>
      <div>
        <h4 className="font-['Instrument_Sans',sans-serif] text-[0.92rem] font-bold text-[#191919] m-0 mb-1">
          {title}
        </h4>
        <p className="font-['Merriweather',serif] text-[0.82rem] text-[#666666] m-0 leading-[1.55]">
          {description}
        </p>
      </div>
    </div>
  )
}

// ─── FAQ item ────────────────────────────────────────────────────────────────
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
        <span className="text-[#1A9E6E] text-[1.2rem] font-bold shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="pt-0 px-5 pb-4 bg-[#FAF9F5]">
          <p className="font-['Merriweather',serif] text-[0.88rem] text-[#666666] m-0 leading-[1.7]">
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function TeachableLandingPage() {
  return (
    <>
      <Head>
        <title>Recover Teachable Students Who Are About to Cancel | ChurnRecovery</title>
        <meta name="description" content="Turn Teachable cancellation moments into conversations. ChurnRecovery lets you offer a pause, a discount, or ask why — before your students walk away for good." />
        <link rel="canonical" href="https://churnrecovery.com/for/teachable" />
        <meta property="og:title" content="Recover Teachable Students Who Are About to Cancel | ChurnRecovery" />
        <meta property="og:description" content="Students dropping silently from your Teachable subscription? ChurnRecovery turns that moment into a conversation. Offer a pause, discount, or exit survey — automatically." />
        <meta property="og:url" content="https://churnrecovery.com/for/teachable" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Recover Teachable Students Who Are About to Cancel" />
        <meta name="twitter:description" content="Stop losing recurring course revenue in silence. ChurnRecovery intercepts cancellations and gives your students a reason to stay." />
      </Head>

      <Header />

      <main className="font-['Instrument_Sans',sans-serif] bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#061A12_0%,#0D2B1D_50%,#061A12_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          {/* Teachable green glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(26,158,110,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(26,158,110,0.15)] border border-[rgba(26,158,110,0.35)] rounded-full py-1.5 px-4 font-['Instrument_Sans',sans-serif] text-[0.78rem] font-semibold text-[#34C98A] mb-[28px]">
              <span>✓</span> Free for Teachable Creators · No Credit Card Required
            </div>

            <h1 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Recover Teachable Students<br />
              <span className="text-[#34C98A]">Who Are About to Cancel</span>
            </h1>

            <p className="font-['Merriweather',serif] text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Turn cancellation moments into conversations. When a student tries to leave your Teachable subscription, ChurnRecovery shows them a personalized offer — a pause, a discount, or a quick &quot;what happened?&quot; Many will stay. All will be heard.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <TeachableWaitlistForm dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 Free to start — save your first student today
              </span>
              <span className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ No code required
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-['Instrument_Sans',sans-serif] text-[0.9rem] text-[rgba(255,255,255,0.6)] no-underline border-b border-b-[rgba(255,255,255,0.3)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: PAIN POINTS ──────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-['Instrument_Sans',sans-serif] text-[0.75rem] font-bold text-[#1A9E6E] uppercase tracking-[0.08em] mb-3">
                The Recurring Revenue Problem
              </div>
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Students Are Dropping Out.<br />You Don&apos;t Know Why — or When.
              </h2>
              <p className="font-['Merriweather',serif] text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                You built something valuable. But Teachable doesn&apos;t give you a second chance when a student decides to cancel. That&apos;s revenue walking out the door, quietly, with no warning.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="🤫"
                title="The Silent Drop-Out"
                stat="5–10%"
                statLabel="of subscription students churn every month on average"
                description="Students cancel without a word. No email. No feedback. No heads-up. One day they&apos;re enrolled; the next your MRR just dropped and you&apos;re none the wiser."
              />
              <PainCard
                icon="🔁"
                title="No Second Chance"
                description="Right now, the cancel button on Teachable is a one-way door. No pause option, no win-back offer, no &quot;are you sure?&quot; — just instant cancellation. You get zero opportunity to change their mind."
              />
              <PainCard
                icon="📉"
                title="Losing Recurring Revenue"
                description="Monthly subscriptions are the lifeblood of a sustainable course business. Every cancellation isn't just lost income — it's the compounding value of that student over time. The real cost is much higher than one month."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-['Instrument_Sans',sans-serif] text-[0.75rem] font-bold text-[#1A9E6E] uppercase tracking-[0.08em] mb-3">
                Simple Setup
              </div>
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Connect and Start Recovering Students
              </h2>
              <p className="font-['Merriweather',serif] text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                No code. No developer. No complicated integrations. Just connect and watch it work.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Payment Account"
                description="Connect ChurnRecovery to your Stripe account (for advanced Teachable plans) or your Teachable payment settings. We detect when a student initiates a cancellation before it's final."
                callout="✓ Works with Teachable's Stripe integration on Pro plans."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Intercept the Cancellation"
                description="The moment a student clicks to cancel, ChurnRecovery fires — before the subscription ends. We trigger your custom recovery flow automatically, in real time."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Message Converts Them"
                description="The student sees a personalized offer from you: pause for a month, take a discount, or simply share why they're leaving. You keep more students. You understand the ones who still go."
                callout="🎯 Average save rate: 20–35% of at-risk students"
              />
            </div>

            <div className="mt-8 bg-[#E8F9F3] border border-[rgba(26,158,110,0.25)] border-l-4 border-l-[#1A9E6E] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-['Instrument_Sans',sans-serif] font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does Teachable support this?&rdquo;
              </p>
              <p className="font-['Merriweather',serif] text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                Teachable has its own payment system, but many creators on Pro and Business plans use Stripe. ChurnRecovery integrates at the Stripe level for those plans. We&apos;re actively expanding support for all Teachable payment types — join the waitlist to get early access.
              </p>
              <Link href="/docs" className="font-['Instrument_Sans',sans-serif] text-[0.82rem] text-[#1A9E6E] no-underline font-semibold">
                Check compatibility for your plan →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[#E8F9F3] border border-[rgba(26,158,110,0.3)] rounded-[10px] py-3.5 px-7 font-['Instrument_Sans',sans-serif] font-bold text-[#1A9E6E] no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-['Instrument_Sans',sans-serif] text-[0.78rem] text-[#999999] mt-2">
                See a live cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: BENEFITS ─────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-['Instrument_Sans',sans-serif] text-[0.75rem] font-bold text-[#1A9E6E] uppercase tracking-[0.08em] mb-3">
                What You Get
              </div>
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Save Revenue. Understand Your Students. Improve Your Course.
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="💰"
                title="Save Recurring Course Revenue"
                description="Every subscription you recover is compounding monthly income. ChurnRecovery gives you the tools to keep more students longer — automatically."
              />
              <BenefitCard
                icon="🔍"
                title="Understand Why Students Leave"
                description="An optional exit survey tells you why students cancel. Price? Time? Content gaps? Use those answers to fix your course and reduce future churn."
              />
              <BenefitCard
                icon="🔄"
                title="Offer Alternatives to Canceling"
                description="A pause option, a discount, or a plan downgrade can keep a student who just needs a break. Most creators never offer this. Now you can."
              />
              <BenefitCard
                icon="⏸"
                title="Pause Instead of Cancel"
                description="Life gets busy. Students disappear not because they hate your course but because they're overwhelmed. A 1-month pause option saves subscriptions that would otherwise be lost."
              />
              <BenefitCard
                icon="🏷"
                title="Automatic Discount Offers"
                description="Offer a limited-time discount to at-risk students. Keeping them at 80% revenue beats losing them and their lifetime value entirely."
              />
              <BenefitCard
                icon="📊"
                title="Revenue Recovery Dashboard"
                description="See how much you've saved, which offers work best, and where students are dropping off. Real data to improve your retention strategy."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Simple Pricing. Free to Start.
            </h2>
            <p className="font-['Merriweather',serif] text-base text-[#666666] leading-[1.7] m-0 mb-8">
              Start free and grow into a paid plan only when your course revenue grows.
              No contracts, no gotchas.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { tier: 'Starter', price: '$0/month', range: 'Free to start', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} className={`rounded-[10px] p-[18px] relative ${highlight ? 'bg-[#E8F9F3] border border-[#1A9E6E]' : 'bg-[#FAF9F5] border border-[#E5E5E5]'}`}>
                  {highlight && (
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#1A9E6E] text-white font-['Instrument_Sans',sans-serif] text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">
                      START HERE
                    </div>
                  )}
                  <div className="font-['Instrument_Sans',sans-serif] font-bold text-[#191919] text-[0.9rem]">{tier}</div>
                  <div className={`font-['Instrument_Sans',sans-serif] font-extrabold text-[1.4rem] my-1 ${highlight ? 'text-[#1A9E6E]' : 'text-[#191919]'}`}>{price}</div>
                  <div className="font-['Merriweather',serif] text-[0.78rem] text-[#666666]">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-['Instrument_Sans',sans-serif] text-[0.88rem] text-[#2D7A4F] mb-6">
              Compare to Churnkey ($250+/mo) or ProfitWell Retain ($400+/mo). ChurnRecovery pays for itself the first time you save a student.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Teachable Creators
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Teachable?',
                a: "Teachable has its own payment system by default, but many advanced plan users integrate Stripe directly. ChurnRecovery works with Teachable's Stripe integration. We're also building native support for Teachable's payment system — join the waitlist for early access.",
              },
              {
                q: 'Do I need a developer to set this up?',
                a: "Not at all. The setup is copy-paste simple. If you can log into Stripe and click a few buttons, you can install ChurnRecovery. No code, no developer, no waiting.",
              },
              {
                q: 'What if my students are on one-time course purchases, not subscriptions?',
                a: "ChurnRecovery is built for subscription and membership products — recurring monthly or annual billing. If you sell one-time courses, it won't apply. But if you have a Teachable subscription plan, monthly coaching, or membership community, this is for you.",
              },
              {
                q: 'What will my students see when they try to cancel?',
                a: "A personalized message from you — not a generic popup. You set the tone: warm, direct, honest. Options typically include a pause, a discount, or a short survey. It feels like a personal note, not corporate retention software.",
              },
              {
                q: "How do I know if it's working?",
                a: "Your ChurnRecovery dashboard shows every recovery attempt, the outcome, and how much revenue was saved. You'll see your save rate, your top-performing offers, and the reasons students say they leave.",
              },
              {
                q: "What if students still cancel after seeing the offer?",
                a: "That's okay. You still learn why they left (if they filled out the survey), and you've given them a better experience than a cold, silent cancellation. Many will remember that and come back later.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#061A12_0%,#0D2B1D_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-['Instrument_Sans',sans-serif] font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Student Is About to Cancel.<br />
              <span className="text-[#34C98A]">Give Them a Reason to Stay.</span>
            </h2>
            <p className="font-['Merriweather',serif] text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Join the waitlist. Free beta access for Teachable course creators. Be the first to turn cancellation moments into conversations — and revenue saved.
            </p>

            <div className="max-w-[480px] mx-auto">
              <TeachableWaitlistForm dark={true} />
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
