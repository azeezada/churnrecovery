import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'
import { buildFAQSchema } from '../../lib/faq-schema'

// ─── Pain card ──────────────────────────────────────────────────────────────
function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6 border-t-[3px] border-t-[#E8A000]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] m-0 mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-sans font-extrabold text-[2rem] text-[#E8A000] my-1">
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-sans text-[0.8rem] text-[#D97706] mb-2">
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
        <div className="w-12 h-12 rounded-full bg-[rgba(232,160,0,0.1)] border-2 border-[#E8A000] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#E8A000] shrink-0">
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
        <div className="bg-[rgba(232,160,0,0.08)] border border-[rgba(232,160,0,0.25)] rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-[#D97706]">
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
        <span className="text-[#E8A000] text-[1.2rem] font-bold shrink-0">
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

const faqs = [
  {
    q: 'Does this work for both 1-on-1 and group coaching?',
    a: "Yes. ChurnRecovery works with any recurring subscription processed through Stripe — whether you charge individual coaching clients or run a group program with monthly membership fees. The cancel flow triggers for any Stripe subscription cancellation.",
  },
  {
    q: 'My clients have a personal relationship with me. Will a cancel flow feel impersonal?',
    a: "Not at all — in fact, the opposite. You control every word in your cancel flow message. Write it in your own voice, reference your program by name, and make the offer feel like it\u0027s coming directly from you. Most coaches find their clients respond better to a cancel flow than they expect, precisely because the relationship is already strong.",
  },
  {
    q: 'What coaching platforms does ChurnRecovery support?',
    a: "Any platform that processes payments through Stripe. This includes Kajabi, Teachable, Thinkific, Podia, Circle, and any custom setup using Stripe Checkout or Stripe payment links. If Stripe is involved, ChurnRecovery works — no platform-specific integration needed.",
  },
  {
    q: 'Do I need a developer to set this up?',
    a: "No. If you can click a button and copy a URL, you can set this up in 5–10 minutes. We have step-by-step guides with screenshots. No code, no API configuration, no developer required.",
  },
  {
    q: 'What if a client really does want to cancel — will the cancel flow just frustrate them?',
    a: "If a client genuinely wants to leave, they leave — the cancel flow just adds one respectful moment before the decision is final. And you still capture their exit survey response. The 20–35% recovery rate means most clients who see the flow either didn\u0027t know about the pause option or were on the fence about price.",
  },
  {
    q: 'Can I offer a pause for clients who just need a break?',
    a: "Yes — pause offers are one of the most effective tools for coaching businesses. Coaching clients often cancel during a busy period, a vacation, or a life change — not because they\u0027re unhappy. A pause keeps the relationship intact and means they come back when they\u0027re ready, rather than going through the effort of re-enrolling.",
  },
  {
    q: 'How does ChurnRecovery handle failed payments?',
    a: "ChurnRecovery listens for Stripe events including failed payment signals. When a card declines, you can trigger automated recovery flows — including a notification to the client and a smooth path to update their payment method. Involuntary churn (failed payments) accounts for a significant portion of coaching client losses and is often entirely preventable.",
  },
]

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CoachingLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Coaching Businesses | ChurnRecovery</title>
        <meta name="description" content="High-ticket coaching clients leave silently — and each one costs you $200–$2,000/month. ChurnRecovery connects to Stripe and intercepts cancellations before they're final. 30-day free trial, then $20/month." />
        <link rel="canonical" href="https://churnrecovery.com/for/coaching" />
        <meta property="og:title" content="Churn Recovery for Coaching Businesses | ChurnRecovery" />
        <meta property="og:description" content="Every coaching client who cancels takes hundreds or thousands in monthly recurring revenue with them. ChurnRecovery plugs into Stripe to catch cancellations before they happen — no code required." />
        <meta property="og:url" content="https://churnrecovery.com/for/coaching" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Coaching Businesses | ChurnRecovery" />
        <meta name="twitter:description" content="High-ticket coaching clients cancel silently. ChurnRecovery intercepts cancellations through Stripe and gives you one last chance to save the relationship." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_50%,#1A1200_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          {/* Amber gold glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,160,0,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(232,160,0,0.15)] border border-[rgba(232,160,0,0.35)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#F5C842] mb-[28px]">
              <span>✓</span> 30-Day Free Trial · No Credit Card Required
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Your High-Ticket Clients Are Leaving<br />
              <span className="text-[#F5C842]">Without Saying a Word</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Each coaching client who cancels takes $200–$2,000 in monthly recurring revenue with them. The personal relationship you&apos;ve built makes a well-timed cancel flow far more effective than in any other business. ChurnRecovery connects through Stripe and gives you one last chance to save it.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-coaching" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 30-day free trial — no code required
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ 3 steps, works with any platform using Stripe
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-sans text-[0.9rem] text-[rgba(255,255,255,0.6)] no-underline border-b border-b-[rgba(255,255,255,0.3)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: PAIN POINTS ──────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#D97706] uppercase tracking-[0.08em] mb-3">
                The Hidden Revenue Leak
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Every Coaching Client Who Leaves =<br />Hundreds of Dollars Gone Monthly
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                High-ticket coaching is the hardest business to recover from churn. One client cancelling can erase weeks of acquisition effort. And right now, they can walk away in seconds — and you&apos;ll never know why.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="👻"
                title="High-Ticket Clients Vanish Silently"
                stat="$200–$2,000"
                statLabel="lost per client per month — without warning"
                description="Coaching clients don&apos;t send a note before they cancel. One day they&apos;re on a call with you, the next their subscription has quietly lapsed. By the time you notice in Stripe, it&apos;s already too late to intervene."
              />
              <PainCard
                icon="🤝"
                title="No Chance for Personal Intervention"
                description="You built a real relationship with this client. That relationship is your biggest asset at the cancel screen — but without a cancel flow, that moment never happens. They click cancel and disappear before you can even offer to talk."
              />
              <PainCard
                icon="💳"
                title="Failed Payments Go Unnoticed"
                description="Involuntary churn is just as damaging. A card decline quietly ends a $500/month retainer and neither you nor your client may realize for weeks. Every day of delay is revenue that&apos;s gone for good."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#E8A000] uppercase tracking-[0.08em] mb-3">
                3 Steps, No Code
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Works With Your Coaching Platform in Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Most coaching platforms — Kajabi, Teachable, Thinkific, custom setups — process payments through Stripe. ChurnRecovery connects to Stripe directly. No plugin, no approval needed.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. We listen for cancellation signals from Stripe — the same payment processor your coaching platform relies on under the hood."
                callout="✓ No platform settings to change. No developer needed."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a client initiates a cancellation, ChurnRecovery fires before it&apos;s final. We intercept the Stripe event and trigger your custom recovery flow — using the trust your client already has in you."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Voice — Automated"
                description="Clients see a personalized message: a pause option, a discount on their retainer, or a quick question about why they&apos;re leaving. Set it up once. It runs every time a cancellation is triggered."
                callout="🎯 Average recovery rate: 20–35% of at-risk clients"
              />
            </div>

            {/* Technical callout */}
            <div className="mt-8 bg-[rgba(232,160,0,0.05)] border border-[rgba(232,160,0,0.25)] border-l-4 border-l-[#E8A000] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does this work with my coaching platform?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                If your coaching clients pay through Stripe — whether via Kajabi, a custom checkout, or a payment link — ChurnRecovery works. We operate at the Stripe level, not the platform level. That means no waiting for app approvals, no plugin installs, no API keys from your coaching tool.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#E8A000] no-underline font-semibold">
                Technical integration docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[rgba(232,160,0,0.1)] border border-[rgba(232,160,0,0.3)] rounded-[10px] py-3.5 px-7 font-sans font-bold text-[#E8A000] no-underline text-[0.95rem]">
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
              <div className="font-sans text-[0.75rem] font-bold text-[#E8A000] uppercase tracking-[0.08em] mb-3">
                What You Get
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Everything to Protect Your Coaching Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Give clients the option to pause instead of cancel. Coaching clients often need a break — not a permanent exit. A pause keeps the relationship alive and the revenue on the books."
              />
              <BenefitCard
                icon="🏷"
                title="Personal Discount Offers"
                description="Automatically offer a reduced rate to clients on the fence. The personal trust you&apos;ve built makes a one-time discount far more compelling than it would be with any other subscription product."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Understand exactly why clients are leaving with a quick 1-question survey. Is it price, results, time, or something else? Use the answers to improve your offer and reduce future churn."
              />
              <BenefitCard
                icon="📊"
                title="Dashboard Insights"
                description="See how much revenue you&apos;ve saved, which recovery offers perform best, and your overall churn rate — all in a single dashboard built for solo coaches and small teams."
              />
              <BenefitCard
                icon="🆓"
                title="$20/month — Flat"
                description="30-day free trial, then $20/month. All features included — no per-client fees, no percentage of recovered revenue. One flat rate, no surprises."
              />
              <BenefitCard
                icon="🔌"
                title="Works With Any Coaching Platform Using Stripe"
                description="Kajabi, Teachable, Thinkific, Podia, custom payment links — if your clients pay through Stripe, ChurnRecovery works. No platform-specific integrations or approvals needed."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              One Recovered Client Pays for a Year
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              At $20/month, ChurnRecovery costs $240/year. If you charge $200/month per client, recovering just one client for two months covers the entire year. At $500 or $1,000/month per client, recovering a single cancellation pays for ChurnRecovery many times over.
            </p>

            <div className="max-w-[380px] mx-auto mb-7">
              <div className="rounded-[10px] p-[18px] relative bg-[rgba(232,160,0,0.08)] border border-[#E8A000]">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#E8A000] text-[#1A1200] font-sans text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">
                  SIMPLE PRICING
                </div>
                <div className="font-sans font-bold text-[#191919] text-[0.9rem]">All Features</div>
                <div className="font-sans font-extrabold text-[1.4rem] my-1 text-[#E8A000]">$20/month</div>
                <div className="font-serif text-[0.78rem] text-[#666666]">30-day free trial · No credit card required</div>
              </div>
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              Recovering just one $200/month coaching client for two months pays for the entire year. For higher-ticket clients, the math is even more compelling — recovering one $1,000/month retainer covers 4 years of ChurnRecovery.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Coaches
              </h2>
            </div>

            {faqs.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </section>

        {/* ─── SECTION 6.5: RELATED RESOURCES ──────────────────────────── */}
        <section className="py-[60px] px-6 bg-brand-white border-t border-brand-border">
          <div className="max-w-[720px] mx-auto">
            <h2 className="font-sans font-bold text-[1.2rem] text-brand-text mb-6 tracking-[-0.01em]">
              📖 Related Reading
            </h2>
            <div className="grid gap-3">
              <a
                href="/posts/coaching-business-churn"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  How to Reduce Churn in Your Coaching Business
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Tactics specific to 1-on-1 and group coaching programs
                </div>
              </a>
              <a
                href="/posts/what-is-a-cancel-flow"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  What Is a Cancel Flow? (And Why You Need One)
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  The case for adding a cancel flow to any subscription business
                </div>
              </a>
              <a
                href="/posts/Involuntary-Churn-Recovery"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Involuntary Churn Recovery: Recovering Failed Payments
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  How to recover coaching clients lost to card declines and payment failures
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Coaching Client Is About to Cancel.<br />
              <span className="text-[#F5C842]">Will You Be Ready?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your free trial. Protect your coaching revenue with an automated cancel flow that works through Stripe. $20/month after 30 days — no platform approval, no code, no credit card required to start.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-coaching" dark={true} />
            </div>

            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                30-day free trial
              </span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                Cancel anytime
              </span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">
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
