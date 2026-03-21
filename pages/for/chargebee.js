import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

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
        body: JSON.stringify({ email: email.trim(), source: 'chargebee-lp', tag: 'chargebee-user' }),
      })
      const data = await res.json()
      if (res.status === 201) { setStatus('success'); if (data.count) setCount(data.count) }
      else if (data.duplicate) { setStatus('duplicate') }
      else { setStatus('error'); setError(data.error || 'Something went wrong.') }
    } catch { setStatus('error'); setError('Network error. Please try again.') }
  }

  const bgColor = dark ? 'rgba(255,255,255,0.08)' : '#FFFFFF'
  const borderColor = dark ? 'rgba(255,255,255,0.15)' : '#E5E5E5'
  const textColor = dark ? '#FFFFFF' : '#191919'
  const subtextColor = dark ? 'rgba(255,255,255,0.6)' : '#666666'

  if (status === 'success' || status === 'duplicate') {
    return (
      <div className="text-center p-6 rounded-xl" style={{ background: dark ? 'rgba(45,122,79,0.15)' : '#EDF7F1', border: `1px solid ${dark ? 'rgba(45,122,79,0.3)' : '#C6E6D4'}` }}>
        <div className="text-[2rem] mb-2">{status === 'duplicate' ? '👋' : '🎉'}</div>
        <p className="font-sans font-bold text-base m-0 mb-[6px]" style={{ color: dark ? '#FFFFFF' : '#191919' }}>
          {status === 'duplicate' ? "You're already on the list!" : "You're in!"}
        </p>
        <p className="font-serif text-sm m-0" style={{ color: subtextColor }}>
          We&apos;ll email you when ChurnRecovery launches for Chargebee users.
        </p>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required autoComplete="email"
          className="px-4 py-[13px] rounded-lg font-sans text-[0.95rem] outline-none" style={{ border: `1px solid ${error ? '#DC2626' : borderColor}`, background: bgColor, color: textColor }} />
        <button type="submit" disabled={status === 'loading'}
          className="py-[14px] px-7 rounded-lg border-none font-sans font-bold text-base text-white" style={{ background: status === 'loading' ? '#999999' : '#FF6B35', cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
          {status === 'loading' ? 'Joining...' : 'Get Chargebee Retain Features for Free →'}
        </button>
      </form>
      {error && <p className="font-sans text-[0.8rem] text-[#DC2626] mt-2 mb-0">⚠ {error}</p>}
      <div className="flex gap-4 mt-3 flex-wrap">
        <span className="font-sans text-[0.78rem]" style={{ color: subtextColor }}>🆓 Free during beta</span>
        <span className="font-sans text-[0.78rem]" style={{ color: subtextColor }}>🔒 No credit card required</span>
        {count && <span className="font-sans text-[0.78rem]" style={{ color: subtextColor }}><span className="text-[#2D7A4F]">●</span> {count.toLocaleString()} on waitlist</span>}
      </div>
    </div>
  )
}

function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl px-6 py-7 border-t-[3px] border-t-[#FF6B35]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] m-0 mb-2">{title}</h3>
      {stat && <div className="font-sans font-extrabold text-[2rem] text-[#FF6B35] my-1">{stat}</div>}
      {statLabel && <div className="font-sans text-[0.8rem] text-[#666666] mb-2">{statLabel}</div>}
      <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-relaxed">{description}</p>
    </div>
  )
}

function HowStep({ number, icon, title, description, callout }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl px-6 py-7">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-[rgba(255,107,53,0.1)] border-2 border-[#FF6B35] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#FF6B35] shrink-0">{number}</div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-sans text-[1.05rem] font-bold text-[#191919] m-0">{title}</h3>
        </div>
      </div>
      <p className="font-serif text-[0.9rem] text-[#666666] mt-0 mb-3 leading-[1.7]">{description}</p>
      {callout && <div className="bg-[rgba(255,107,53,0.06)] border border-[rgba(255,107,53,0.2)] rounded-lg px-[14px] py-[10px] font-sans text-[0.8rem] text-[#FF6B35]">{callout}</div>}
    </div>
  )
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="flex gap-[14px] items-start bg-white border border-[#E5E5E5] rounded-[10px] p-5">
      <span className="text-[1.4rem] shrink-0">{icon}</span>
      <div>
        <h4 className="font-sans text-[0.92rem] font-bold text-[#191919] m-0 mb-1">{title}</h4>
        <p className="font-serif text-[0.82rem] text-[#666666] m-0 leading-[1.55]">{description}</p>
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden mb-2">
      <button onClick={() => setOpen(!open)} className="w-full bg-white border-none cursor-pointer px-5 py-4 flex justify-between items-center gap-3 text-left">
        <span className="font-sans font-semibold text-[0.93rem] text-[#191919]">{q}</span>
        <span className="text-[#FF6B35] text-[1.2rem] font-bold shrink-0">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 bg-[#FDF6F0]">
          <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-[1.7]">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function ChargbeeLandingPage() {
  return (
    <>
      <Head>
        <title>Get Chargebee Retain Features for $0/Month | ChurnRecovery</title>
        <meta name="description" content="Chargebee Retain costs $500+/month and requires an enterprise contract. ChurnRecovery gives you the same cancel flow, pause offers, and exit surveys — free to start. Works with your existing Stripe." />
        <link rel="canonical" href="https://churnrecovery.com/for/chargebee" />
        <meta property="og:title" content="Get Chargebee Retain Features for $0/Month" />
        <meta property="og:description" content="Chargebee Retain starts at $500/month. ChurnRecovery is free. Both connect to Stripe and add a cancel flow to your subscriptions — we just don't charge enterprise prices for it." />
        <meta property="og:url" content="https://churnrecovery.com/for/chargebee" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Chargebee Retain Features for $0/Month | ChurnRecovery" />
        <meta name="twitter:description" content="Skip the $500/mo Chargebee Retain contract. ChurnRecovery adds cancel flows, pause offers, and churn analytics to your Stripe subscriptions for free." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FDF6F0] pt-[60px]">

        {/* HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1A0A00_0%,#2D1500_50%,#1A0A00_100%)] pt-20 px-6 pb-[100px]">
          <div className="absolute -top-[80px] -right-[80px] w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,107,53,0.15)_0%,transparent_70%)]" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-[6px] bg-[rgba(255,107,53,0.15)] border border-[rgba(255,107,53,0.35)] rounded-full px-4 py-[6px] font-sans text-[0.78rem] font-semibold text-[#FF6B35] mb-7">
              <span>✓</span> The affordable alternative to Chargebee Retain
            </div>

            <h1 className="font-sans font-extrabold text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em] text-[clamp(2.2rem,5vw,3.5rem)]">
              Get Chargebee Retain Features<br />
              <span className="text-[#FF6B35]">for $0/Month.</span>
            </h1>

            <p className="font-serif text-[rgba(255,255,255,0.7)] m-0 mb-7 leading-[1.7] max-w-[600px] mx-auto text-[clamp(1rem,2.5vw,1.2rem)]">
              Chargebee Retain costs $500+ per month and requires you to talk to their sales team. ChurnRecovery gives you cancel flows, pause offers, and exit surveys — the exact same retention tools — free to start. Works with your existing Stripe account.
            </p>

            {/* Price comparison */}
            <div className="grid grid-cols-2 gap-3 max-w-[440px] mx-auto mb-8">
              <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[10px] p-[14px] text-center">
                <div className="font-sans text-xs text-[rgba(255,255,255,0.5)] mb-1">Chargebee Retain</div>
                <div className="font-sans font-extrabold text-[1.4rem] text-[rgba(255,255,255,0.4)] line-through">$500+/mo</div>
                <div className="font-sans text-[0.7rem] text-[rgba(255,255,255,0.3)]">Enterprise contract required</div>
              </div>
              <div className="bg-[rgba(255,107,53,0.15)] border border-[#FF6B35] rounded-[10px] p-[14px] text-center">
                <div className="font-sans text-xs text-[rgba(255,255,255,0.7)] mb-1">ChurnRecovery</div>
                <div className="font-sans font-extrabold text-[1.4rem] text-[#FF6B35]">$0/mo</div>
                <div className="font-sans text-[0.7rem] text-[rgba(255,255,255,0.5)]">Free to start, no contract</div>
              </div>
            </div>

            <div className="max-w-[480px] mx-auto mb-6">
              <WaitlistForm dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.4)]">🆓 Free during beta</span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.4)]">⚡ Works with existing Stripe</span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.4)]">🚫 No sales calls</span>
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="py-20 px-6 bg-[#FDF6F0]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#FF6B35] uppercase tracking-[0.08em] mb-3">The Problem with Chargebee Retain</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Great Features. Terrible Pricing<br />for Small Businesses.
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Chargebee is excellent billing software. But Chargebee Retain — their churn recovery add-on — is priced for enterprise. Small businesses on Chargebee have been left out until now.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard icon="💰" title="Priced Out of Reach" stat="$500+" statLabel="per month minimum for Chargebee Retain" description="Chargebee Retain starts at $500/month — and that's before you factor in their percentage-of-revenue fee. For a small business making $10k MRR, you'd be paying 5–10% of revenue just for a cancel flow." />
              <PainCard icon="📞" title="Requires a Sales Contract" description="You can't just sign up for Chargebee Retain. You have to talk to their sales team, go through a demo, negotiate a contract, and wait. Meanwhile, your subscribers are still canceling with no intervention." />
              <PainCard icon="🔒" title="Still Missing a Cancel Flow Without It" description="Base Chargebee doesn't include churn recovery tools. If you're on Chargebee and haven't paid for Retain, your subscribers can cancel with zero friction — silently, instantly, with no offer from you." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#FF6B35] uppercase tracking-[0.08em] mb-3">How It Works</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Set Up in 10 Minutes. No Sales Call.
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Chargebee uses Stripe as a payment gateway. ChurnRecovery connects directly to your Stripe — so it works alongside Chargebee without touching your billing setup.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep number="1" icon="🔗" title="Connect Your Stripe Account" description="Your Chargebee subscriptions process payments through Stripe. Connect your Stripe account to ChurnRecovery in one click — it reads your cancellation events directly from Stripe." callout="✓ Your Chargebee setup stays exactly as-is. Nothing changes there." />
              <HowStep number="2" icon="⚡" title="Cancellations Get Intercepted" description="When a subscriber starts to cancel — whether through your portal or directly — ChurnRecovery fires automatically. We intercept the Stripe cancellation event and show your recovery flow." />
              <HowStep number="3" icon="💬" title="Your Custom Offer Runs Automatically" description="The subscriber sees a pause option, a discount, or a quick exit survey — in your name, with your message. You set it up once. It runs for every cancellation, forever." callout="🎯 20–35% of at-risk subscribers accept an offer" />
            </div>

            <div className="mt-8 bg-[rgba(255,107,53,0.04)] border border-[rgba(255,107,53,0.15)] border-l-4 border-l-[#FF6B35] rounded-[10px] px-6 py-5 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does this conflict with Chargebee?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] mt-0 mb-[10px] leading-[1.7]">
                No. ChurnRecovery operates at the Stripe level, completely independent of Chargebee. Chargebee doesn&apos;t need to know ChurnRecovery exists. Both tools connect to the same Stripe account and do completely different things — Chargebee handles billing, ChurnRecovery handles retention.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#FF6B35] no-underline font-semibold">
                Read the integration guide →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[rgba(255,107,53,0.08)] border border-[rgba(255,107,53,0.25)] rounded-[10px] px-7 py-[14px] font-sans font-bold text-[#FF6B35] no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999999] mt-2">See a cancel flow in action — no signup required</p>
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="py-20 px-6 bg-[#FDF6F0]">
          <div className="max-w-[860px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                ChurnRecovery vs. Chargebee Retain
              </h2>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
              {[
                { feature: 'Cancel flow with offers', cr: '✅ Yes', cb: '✅ Yes' },
                { feature: 'Pause subscription offer', cr: '✅ Yes', cb: '✅ Yes' },
                { feature: 'Discount offer at cancel screen', cr: '✅ Yes', cb: '✅ Yes' },
                { feature: 'Exit survey', cr: '✅ Yes', cb: '✅ Yes' },
                { feature: 'Works with Stripe', cr: '✅ Yes', cb: '✅ Yes' },
                { feature: 'Starting price', cr: '🆓 $0/month', cb: '💸 $500+/month' },
                { feature: 'Sales call required', cr: '🚫 No', cb: '📞 Yes' },
                { feature: 'Enterprise contract', cr: '🚫 No', cb: '📄 Yes' },
                { feature: 'Setup time', cr: '⚡ 10 minutes', cb: '⏳ Days/weeks' },
              ].map(({ feature, cr, cb }, i) => (
                <div key={feature} className="grid grid-cols-3" style={{ borderBottom: i < 8 ? '1px solid #E5E5E5' : 'none' }}>
                  <div className="px-5 py-[14px] font-sans text-[0.88rem] text-[#191919] font-medium">{feature}</div>
                  <div className="px-5 py-[14px] font-sans text-[0.88rem] text-[#2D7A4F] bg-[rgba(45,122,79,0.04)] border-l border-[#E5E5E5] font-semibold">{cr}</div>
                  <div className="px-5 py-[14px] font-sans text-[0.88rem] text-[#666666] border-l border-[#E5E5E5]">{cb}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Everything Chargebee Retain Offers.<br />Without the Contract.
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[14px]">
              <BenefitCard icon="⏸" title="Pause Offer" description="Let subscribers pause for 1–3 months instead of canceling. Keeps the revenue relationship alive for when they're ready to come back." />
              <BenefitCard icon="🏷" title="Discount at Cancel Screen" description="Automatically offer a discount to price-sensitive subscribers the moment they click cancel — when they're most likely to accept it." />
              <BenefitCard icon="📋" title="Exit Survey" description="A one-question exit survey tells you exactly why subscribers are leaving. Fix the right problems instead of guessing." />
              <BenefitCard icon="📊" title="Recovery Analytics" description="Track saved revenue, offer acceptance rates, and churn reasons — all in a clean dashboard that shows you what's working." />
              <BenefitCard icon="🆓" title="Free to Start" description="$0 to get started. No credit card required. No sales call. No waiting. Just connect Stripe and set up your cancel flow." />
              <BenefitCard icon="⚡" title="10-Minute Setup" description="Connect Stripe, choose your offer, go live. No developer needed. No Chargebee configuration to touch. Just your Stripe account." />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-[#FDF6F0]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Questions from Chargebee Users
              </h2>
            </div>

            {[
              { q: 'Does ChurnRecovery work alongside Chargebee?', a: "Yes, completely. ChurnRecovery connects to your Stripe account, which is the same payment processor Chargebee uses. Both tools can be connected to the same Stripe account simultaneously — Chargebee handles billing management, ChurnRecovery handles cancellation recovery. They don't interfere with each other." },
              { q: "Will this break anything in Chargebee?", a: "No. ChurnRecovery listens to Stripe webhook events but doesn't modify your subscriptions unless a subscriber accepts an offer (like a pause or discount). Even then, the change happens through Stripe's API, which Chargebee syncs with. Your Chargebee dashboard stays accurate." },
              { q: 'Is ChurnRecovery really free?', a: "During our beta, yes — completely free. No credit card, no trial, no surprise bills. We're building our user base and collecting feedback. After beta, we'll have paid plans, but we'll grandfather in beta users at favorable rates and give you plenty of notice." },
              { q: "What's the difference between ChurnRecovery and Chargebee Retain?", a: "Functionally, they're very similar — both add a cancel flow, pause offers, and exit surveys to your subscriptions. The difference is price and accessibility. Chargebee Retain starts at $500/month and requires an enterprise sales process. ChurnRecovery is free to start and takes 10 minutes to set up." },
              { q: 'What if I want to move away from Chargebee entirely?', a: "That's a bigger conversation, but ChurnRecovery actually works better with direct Stripe billing (without a billing platform layer). If you're considering migrating from Chargebee to Stripe directly, we can work with you on that transition. Either way, ChurnRecovery will work with your setup." },
            ].map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[linear-gradient(135deg,#1A0A00_0%,#2D1500_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.6rem)]">
              Stop Paying $500/Month<br />
              <span className="text-[#FF6B35]">for Features You Can Get Free.</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Join the waitlist. Get cancel flows, pause offers, and exit surveys — the same tools as Chargebee Retain, at zero cost. No sales call. No contract. Just better retention.
            </p>
            <div className="max-w-[480px] mx-auto">
              <WaitlistForm dark={true} />
            </div>
            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">Free during beta</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">No sales call</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">Cancel anytime</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
