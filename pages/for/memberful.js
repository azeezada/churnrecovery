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

  const bgColor = dark ? 'rgba(255,255,255,0.08)' : '#FFFFFF'
  const borderColor = dark ? 'rgba(255,255,255,0.15)' : '#E5E5E5'
  const textColor = dark ? '#FFFFFF' : '#191919'
  const subtextColor = dark ? 'rgba(255,255,255,0.6)' : '#666666'

  if (status === 'success' || status === 'duplicate') {
    return (
      <div style={{
        background: dark ? 'rgba(45,122,79,0.15)' : '#EDF7F1',
        border: `1px solid ${dark ? 'rgba(45,122,79,0.3)' : '#C6E6D4'}`,
      }} className="text-center p-6 rounded-xl">
        <div className="text-[2rem] mb-2">
          {status === 'duplicate' ? '👋' : '🎉'}
        </div>
        <p style={{ color: dark ? '#FFFFFF' : '#191919' }} className="font-sans font-bold text-base m-0 mb-[6px]">
          {status === 'duplicate' ? "You're already on the list!" : "You're in! We'll be in touch soon."}
        </p>
        <p style={{ color: subtextColor }} className="font-serif text-[0.85rem] m-0">
          {status === 'duplicate'
            ? "We've got your email — we'll reach out when we launch."
            : 'Free beta access for Memberful creators. We\'ll email you when we\'re ready.'}
        </p>
        {count && (
          <p style={{ color: subtextColor }} className="font-sans text-xs mt-[10px] mb-0 mx-0">
            Join {count.toLocaleString()} creators on the waitlist
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoComplete="email"
          aria-label="Email address"
          style={{
            border: `1px solid ${error ? '#DC2626' : borderColor}`,
            background: bgColor,
            color: textColor,
          }}
          className="py-[13px] px-4 rounded-lg font-sans text-[0.95rem] outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            background: status === 'loading' ? '#999999' : ACCENT,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          }}
          className="py-[14px] px-7 rounded-lg border-none text-white font-sans font-bold text-base transition-[background] duration-150"
        >
          {status === 'loading' ? 'Joining...' : 'Catch My Cancellations — Join Free →'}
        </button>
        <input type="hidden" name="source" value="memberful-lp" />
        <input type="hidden" name="tag" value="memberful-creator" />
      </form>
      {error && (
        <p className="font-sans text-[0.8rem] text-red-600 mt-2 mb-0">
          ⚠ {error}
        </p>
      )}
      <div className="flex gap-4 mt-3 flex-wrap">
        <span style={{ color: subtextColor }} className="font-sans text-[0.78rem]">🆓 Free during beta</span>
        <span style={{ color: subtextColor }} className="font-sans text-[0.78rem]">🔒 No credit card required</span>
        {count && (
          <span style={{ color: subtextColor }} className="font-sans text-[0.78rem]">
            <span className="text-[#2D7A4F]">●</span> {count.toLocaleString()} on waitlist
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

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section
          style={{ background: 'linear-gradient(135deg, #0f0c2a 0%, #1a1550 50%, #0f0c2a 100%)' }}
          className="py-20 px-6 pb-[100px] relative overflow-hidden"
        >
          <div
            style={{ background: `radial-gradient(circle, ${ACCENT_DARK_BG} 0%, transparent 70%)` }}
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div
              style={{ color: ACCENT_LIGHT }}
              className="inline-flex items-center gap-[6px] bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.35)] rounded-full py-[6px] px-4 font-sans text-[0.78rem] font-semibold mb-7"
            >
              <span>✓</span> Built for Memberful Creators · Free During Beta
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Your Memberful Subscribers<br />
              <span style={{ color: ACCENT_LIGHT }}>Are Canceling Silently.</span><br />
              Catch Them.
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] mx-auto">
              Memberful connects directly to your Stripe account — and so does ChurnRecovery. The moment a member initiates a cancel, we intercept with a branded recovery flow: a pause offer, a discount, or a simple &quot;why are you leaving?&quot; All without touching Memberful&apos;s settings.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <MemberfulWaitlistForm dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ Works alongside Memberful — no changes needed
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🎙 Perfect for podcasters &amp; newsletters
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-sans text-[0.9rem] text-[rgba(255,255,255,0.6)] no-underline border-b border-[rgba(255,255,255,0.3)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PAIN POINTS ─────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div style={{ color: ACCENT }} className="font-sans text-xs font-bold uppercase tracking-[0.08em] mb-3">The Hidden Revenue Leak</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Every Silent Cancel Is<br />Revenue You&apos;ll Never Get Back
              </h2>
              <p className="font-serif text-base text-[#666] max-w-[540px] mx-auto leading-[1.7] m-0">
                Memberful gives you beautiful membership tools — but when a subscriber clicks cancel, there&apos;s no safety net. No second chance. No offer. Just gone.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
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
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div style={{ color: ACCENT }} className="font-sans text-xs font-bold uppercase tracking-[0.08em] mb-3">3 Steps, No Code</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Works With Memberful in Minutes
              </h2>
              <p className="font-serif text-base text-[#666] max-w-[480px] mx-auto leading-[1.7] m-0">
                Memberful requires Stripe for payments. ChurnRecovery connects to that same Stripe account — completely separate from Memberful.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
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

            <div
              style={{
                background: ACCENT_BG,
                borderLeft: `4px solid ${ACCENT}`,
              }}
              className="mt-8 border border-[rgba(99,102,241,0.25)] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto"
            >
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does this require changes in Memberful?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666] m-0 mb-[10px] leading-[1.7]">
                No. ChurnRecovery operates entirely at the Stripe level. Memberful uses your Stripe account to process payments — we just listen to the same Stripe events. No Memberful API access, no plugin, no approval from Memberful required.
              </p>
              <Link href="/docs" style={{ color: ACCENT }} className="font-sans text-[0.82rem] no-underline font-semibold">
                Technical integration docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/demo"
                style={{
                  background: ACCENT_BG,
                  color: ACCENT,
                }}
                className="inline-flex items-center gap-2 border border-[rgba(99,102,241,0.3)] rounded-[10px] py-[14px] px-7 font-sans font-bold no-underline text-[0.95rem]"
              >
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999] mt-2">
                See a live cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div style={{ color: ACCENT }} className="font-sans text-xs font-bold uppercase tracking-[0.08em] mb-3">What You Get</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Everything to Protect Your Memberful Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[14px]">
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
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Priced for Independent Creators
            </h2>
            <p className="font-serif text-base text-[#666] leading-[1.7] m-0 mb-8">
              Memberful charges per-subscriber after free tier. ChurnRecovery starts free — and pays for itself the first time you save a subscriber.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { tier: 'Starter', price: '$0/month', range: 'Free to start', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} style={{
                  background: highlight ? ACCENT_BG : '#FAF9F5',
                  border: `1px solid ${highlight ? ACCENT : '#E5E5E5'}`,
                }} className="rounded-[10px] p-[18px] relative">
                  {highlight && (
                    <div style={{ background: ACCENT }} className="absolute -top-[10px] left-1/2 -translate-x-1/2 text-white font-sans text-[0.7rem] font-bold py-[3px] px-[10px] rounded-full">START HERE</div>
                  )}
                  <div className="font-sans font-bold text-[#191919] text-[0.9rem]">{tier}</div>
                  <div style={{ color: highlight ? ACCENT : '#191919' }} className="font-sans font-extrabold text-[1.4rem] my-1">{price}</div>
                  <div className="font-serif text-[0.78rem] text-[#666]">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-[14px] px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              One recovered subscriber per month covers ChurnRecovery&apos;s cost entirely. The math is always in your favor.
            </div>
          </div>
        </section>

        {/* ─── FAQ ──────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
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
        <section
          style={{ background: 'linear-gradient(135deg, #0f0c2a 0%, #1a1550 100%)' }}
          className="py-20 px-6"
        >
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Memberful Subscriber Is<br />About to Cancel.
              <br /><span style={{ color: ACCENT_LIGHT }}>Will You Be Ready?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Join the waitlist. Be first to protect your Memberful membership revenue with automated cancel recovery. Free to start — no Memberful approval, no code.
            </p>

            <div className="max-w-[480px] mx-auto">
              <MemberfulWaitlistForm dark={true} />
            </div>

            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">Free during beta</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">Cancel anytime</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">No spam, ever</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
