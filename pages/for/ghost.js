import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// ─── Waitlist Form (ghost-specific) ──────────────────────────────────────────
function GhostWaitlistForm({ dark = false }) {
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
          source: 'ghost-lp',
          tag: 'ghost-publisher',
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
          background: dark ? 'rgba(45,122,79,0.15)' : '#EDF7F1',
          border: `1px solid ${dark ? 'rgba(45,122,79,0.3)' : '#C6E6D4'}`,
        }}
      >
        <div className="text-[2rem] mb-2">
          {status === 'duplicate' ? '👋' : '🎉'}
        </div>
        <p className="font-sans font-bold text-base m-0 mb-[6px]" style={{ color: dark ? '#FFFFFF' : '#191919' }}>
          {status === 'duplicate' ? "You're already on the list!" : "You're in! We'll be in touch soon."}
        </p>
        <p className="font-serif text-[0.85rem] m-0" style={{ color: subtextColor }}>
          {status === 'duplicate'
            ? "We've got your email — we'll reach out when we launch."
            : "Free beta access for Ghost publishers. We'll email you when we're ready."}
        </p>
        {count && (
          <p className="font-sans text-[0.75rem] mt-2.5 mb-0 mx-0" style={{ color: subtextColor }}>
            Join {count.toLocaleString()} independent publishers on the waitlist
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
          className="py-[13px] px-4 rounded-lg font-sans text-[0.95rem] outline-none"
          style={{
            border: `1px solid ${error ? '#DC2626' : borderColor}`,
            background: bgColor, color: textColor,
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="py-3.5 px-7 rounded-lg border-none font-sans font-bold text-base text-[#15171A] transition-[background] duration-150"
          style={{
            background: status === 'loading' ? '#999999' : '#FFFFFF',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'loading' ? 'Joining...' : 'Keep My Readers — Join Free →'}
        </button>
        <input type="hidden" name="source" value="ghost-lp" />
        <input type="hidden" name="tag" value="ghost-publisher" />
      </form>
      {error && (
        <p className="font-sans text-[0.8rem] text-[#DC2626] mt-2 mb-0 mx-0">
          ⚠ {error}
        </p>
      )}
      <div className="flex gap-4 mt-3 flex-wrap">
        <span className="font-sans text-[0.78rem]" style={{ color: subtextColor }}>
          🆓 Free during beta
        </span>
        <span className="font-sans text-[0.78rem]" style={{ color: subtextColor }}>
          🔒 No credit card required
        </span>
        {count && (
          <span className="font-sans text-[0.78rem]" style={{ color: subtextColor }}>
            <span className="text-[#2D7A4F]">●</span> {count.toLocaleString()} on waitlist
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Pain card ──────────────────────────────────────────────────────────────
function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6 border-t-[3px] border-t-[#15171A]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] m-0 mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-sans font-extrabold text-[2rem] text-[#15171A] my-1">
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-sans text-[0.8rem] text-[#666666] mb-2">
          {statLabel}
        </div>
      )}
      <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-[1.6]">
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
        <div className="w-12 h-12 rounded-full bg-[#F0F2F4] border-2 border-[#15171A] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#15171A] shrink-0">
          {number}
        </div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-sans text-[1.05rem] font-bold text-[#191919] m-0">
            {title}
          </h3>
        </div>
      </div>
      <p className="font-serif text-[0.9rem] text-[#666666] m-0 mb-3 leading-[1.7]">
        {description}
      </p>
      {callout && (
        <div className="bg-[#F0F2F4] border border-[#E5E5E5] rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-[#191919]">
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
        <h4 className="font-sans text-[0.92rem] font-bold text-[#191919] m-0 mb-1">
          {title}
        </h4>
        <p className="font-serif text-[0.82rem] text-[#666666] m-0 leading-[1.55]">
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
        <span className="font-sans font-semibold text-[0.93rem] text-[#191919]">
          {q}
        </span>
        <span className="text-[#15171A] text-[1.2rem] font-bold shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="pt-0 px-5 pb-4 bg-[#FAF9F5]">
          <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-[1.7]">
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function GhostLandingPage() {
  return (
    <>
      <Head>
        <title>Keep Your Ghost Members From Canceling Their Subscriptions | ChurnRecovery</title>
        <meta name="description" content="Ghost uses Stripe natively for paid memberships. ChurnRecovery integrates directly — connect in 3 clicks and intercept cancellations with a pause option, a discount, or an exit survey." />
        <link rel="canonical" href="https://churnrecovery.com/for/ghost" />
        <meta property="og:title" content="Keep Your Ghost Members From Canceling Their Subscriptions | ChurnRecovery" />
        <meta property="og:description" content="Ghost runs on Stripe natively. ChurnRecovery plugs in directly — offer your readers a pause, a discount, or ask why they're leaving. Every canceled membership is lost reader revenue." />
        <meta property="og:url" content="https://churnrecovery.com/for/ghost" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Keep Your Ghost Members From Canceling Their Subscriptions" />
        <meta name="twitter:description" content="Ghost + Stripe + ChurnRecovery. Stop the silent exits. Give your readers a reason to stay." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#0A0C0E_0%,#15171A_50%,#0A0C0E_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          {/* Ghost subtle glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(160,173,184,0.08)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(160,173,184,0.12)] border border-[rgba(160,173,184,0.25)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#C8D5E0] mb-[28px]">
              <span>✓</span> Free for Ghost Publishers · Connects via Stripe in 3 Clicks
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Keep Your Ghost Members<br />
              <span className="text-[#C8D5E0]">From Canceling Their Subscriptions</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.72)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Ghost uses Stripe natively for paid memberships — which means ChurnRecovery integrates directly. When a reader tries to cancel, show them a pause option, a temporary discount, or ask why they&apos;re leaving. Keep your independent media business alive.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <GhostWaitlistForm dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.45)]">
                🆓 Free — far less than Ghost Pro ($36+/mo)
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.45)]">
                ⚡ Connect Stripe in 3 clicks
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-sans text-[0.9rem] text-[rgba(255,255,255,0.5)] no-underline border-b border-b-[rgba(255,255,255,0.25)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: PAIN POINTS ──────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#666666] uppercase tracking-[0.08em] mb-3">
                The Independent Media Problem
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Every Canceled Membership<br />Is Lost Reader Revenue
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Ghost is built for serious independent media. Your paid memberships are the foundation of that independence. When readers cancel silently, you lose more than a subscription — you lose a supporter.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="💸"
                title="Financial Pressure Cancellations"
                stat="40%"
                statLabel="of subscription cancellations cite financial pressure"
                description="Many of your readers cancel not because they don't value your work — they cancel because money got tight that month. A pause option would have kept them. Now they're gone."
              />
              <PainCard
                icon="⏸"
                title="No Native Pause Option"
                description="Ghost doesn't offer a built-in subscription pause. That means your only options are &quot;keep paying&quot; or &quot;cancel entirely.&quot; For readers who just need a break, that's an unnecessary goodbye."
              />
              <PainCard
                icon="🌑"
                title="The Dark Exit"
                description="Right now, when a Ghost member cancels, they disappear. No survey, no message, no second chance. You don't know why they left, what would have kept them, or if they'd come back with the right offer."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#666666] uppercase tracking-[0.08em] mb-3">
                Native Stripe Integration
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Ghost + Stripe + ChurnRecovery<br />Works Natively
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Ghost uses Stripe as its payment backbone. ChurnRecovery connects to that same Stripe account. No plugins, no workarounds — it just works.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Ghost uses Stripe natively for all paid memberships. Connect ChurnRecovery to the same Stripe account your Ghost site uses. One click, one OAuth flow, done."
                callout="✓ The same Stripe account Ghost already uses. No new setup."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Listen for Cancellations"
                description="When a Ghost member initiates a cancellation, Stripe fires a webhook event. ChurnRecovery catches that event before the subscription ends and triggers your recovery flow in real time."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Readers See Your Message — Not a Dead End"
                description="Instead of an instant cancellation, readers see a thoughtful message from you: pause for a month, take a reduced rate, or share what made them want to leave. Your voice, your offer."
                callout="🎯 Average recovery rate: 20–35% of at-risk members"
              />
            </div>

            <div className="mt-8 bg-[#F5F6F7] border border-[#E5E5E5] border-l-4 border-l-[#15171A] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does Ghost use Stripe?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                Yes — Ghost uses Stripe natively for all paid memberships and subscriptions. This isn&apos;t a workaround. ChurnRecovery connects to the exact same Stripe account your Ghost publication already uses, with no extra configuration needed on the Ghost side.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#191919] no-underline font-semibold">
                Ghost integration docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[#F0F2F4] border border-[#E5E5E5] rounded-[10px] py-3.5 px-7 font-sans font-bold text-[#15171A] no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999999] mt-2">
                See a live cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: BENEFITS ─────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#666666] uppercase tracking-[0.08em] mb-3">
                What You Get
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                The Retention Layer Ghost Doesn&apos;t Have
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Instead of Cancel"
                description="Give readers the option to pause their membership for 1–3 months. For readers going through a rough patch, this is the difference between a temporary break and a permanent goodbye."
              />
              <BenefitCard
                icon="💳"
                title='"Pay What You Can" Temporary Discount'
                description="Offer a reduced rate for a limited time — 50% off for 2 months, then back to normal. Keeps your most financially-pressed readers in your community."
              />
              <BenefitCard
                icon="📝"
                title="Exit Survey to Improve Your Content"
                description="Ask canceling readers one question: &quot;Why are you leaving?&quot; The answers tell you exactly what to improve — content quality, cadence, pricing, or something else entirely."
              />
              <BenefitCard
                icon="📊"
                title="Revenue Recovery Dashboard"
                description="Track exactly how much you've saved, which offers resonate with Ghost readers, and your overall recovery rate. Data-driven editorial decisions start with understanding your audience."
              />
              <BenefitCard
                icon="🆓"
                title="Starts Free"
                description="Ghost Pro starts at $36/month. ChurnRecovery starts free — and only costs money when your publication is large enough for it to matter. No catch."
              />
              <BenefitCard
                icon="⚡"
                title="3-Click Setup"
                description="Connect your Stripe account, customize your message, and go live. Ghost's native Stripe integration means there's nothing extra to configure on the Ghost side."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Less Than Ghost Pro. Keeps More of Your Revenue.
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              Ghost Pro starts at $36/month to host your publication. ChurnRecovery starts free
              — and helps you keep the memberships you&apos;ve worked hard to earn.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { tier: 'Starter', price: '$0/month', range: 'Free to start', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} className={`rounded-[10px] p-[18px] relative ${highlight ? 'bg-[#F0F2F4] border border-[#15171A]' : 'bg-[#FAF9F5] border border-[#E5E5E5]'}`}>
                  {highlight && (
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#15171A] text-white font-sans text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">
                      START HERE
                    </div>
                  )}
                  <div className="font-sans font-bold text-[#191919] text-[0.9rem]">{tier}</div>
                  <div className={`font-sans font-extrabold text-[1.4rem] my-1 ${highlight ? 'text-[#15171A]' : 'text-[#191919]'}`}>{price}</div>
                  <div className="font-serif text-[0.78rem] text-[#666666]">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              You&apos;re already paying for Ghost Pro ($36+/mo). ChurnRecovery is free to start — and pays for itself the first time you save a reader who would have churned.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Ghost Publishers
              </h2>
            </div>

            {[
              {
                q: 'Does Ghost use Stripe?',
                a: "Yes — Ghost uses Stripe natively for all paid memberships and subscriptions. This isn't an integration or a workaround. It's Ghost's official payment system, which means ChurnRecovery connects directly to the same Stripe account your Ghost publication already uses.",
              },
              {
                q: 'Is this easy to set up?',
                a: "Very. Connect your Stripe account (one OAuth click), customize your cancel message, and you're live. The whole setup takes about 5 minutes. No code, no Ghost admin changes needed, no developer required.",
              },
              {
                q: "Will this interfere with Ghost's membership experience?",
                a: "No. ChurnRecovery operates at the Stripe webhook level, not inside the Ghost admin UI. Your Ghost site runs exactly as it did before — ChurnRecovery just adds a recovery layer that activates when a cancellation event fires.",
              },
              {
                q: 'What types of Ghost publications does this work for?',
                a: "Any Ghost publication with paid memberships or subscriptions — independent newsletters, journalism sites, niche media, creator publications. If you have recurring revenue through Ghost, ChurnRecovery protects it.",
              },
              {
                q: 'What if my readers cancel because of financial hardship?',
                a: "That's exactly what the pause option and 'pay what you can' discount are for. Instead of a permanent cancellation, you can offer a 1-month pause or a reduced rate for 2 months. Many financially-stressed readers will take that option gratefully.",
              },
              {
                q: 'How much does it cost?',
                a: "Free to start. Our free tier covers smaller publications — no credit card required. You only pay when your Ghost publication grows to the point where a paid plan makes sense. Compare that to Churnkey at $250+/month.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#0A0C0E_0%,#15171A_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Ghost Reader Is About to Cancel.<br />
              <span className="text-[#C8D5E0]">Don&apos;t Let Them Leave in Silence.</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.65)] m-0 mb-9 leading-[1.7]">
              Join the waitlist. Free beta access for Ghost publishers. Be first to give your readers a reason to stay — with a pause, a discount, or just a real conversation.
            </p>

            <div className="max-w-[480px] mx-auto">
              <GhostWaitlistForm dark={true} />
            </div>

            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">
                Free during beta
              </span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">
                Cancel anytime
              </span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">
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
