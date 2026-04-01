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
    q: 'Does this work with Circle?',
    a: "Yes. Circle processes membership payments through Stripe. ChurnRecovery connects to your Stripe account directly and intercepts cancellation events before they finalize. No Circle API access or approval needed — it works entirely at the Stripe level.",
  },
  {
    q: 'Does this work with Skool?',
    a: "Yes. Skool uses Stripe for paid community memberships. ChurnRecovery connects to Stripe and catches cancellations in real time — completely outside Skool's ecosystem. No Skool plugin or developer required.",
  },
  {
    q: 'What about Discord-based communities?',
    a: "If your Discord community charges memberships through Stripe — whether directly or via a tool like Memberful, Whop, or a custom checkout — ChurnRecovery can intercept those cancellations. The key is that billing flows through Stripe.",
  },
  {
    q: 'Do I need to change my community platform to use this?',
    a: "Not at all. ChurnRecovery works through Stripe, not through your community platform. You keep Circle, Skool, Mighty Networks, or whatever you\u0027re using. All you do is connect your Stripe account to ChurnRecovery — that\u0027s it.",
  },
  {
    q: 'Does it work with Mighty Networks?',
    a: "Yes. Mighty Networks uses Stripe for paid plan billing. ChurnRecovery plugs into Stripe directly, so it catches cancellations on Mighty Networks memberships the same way it does for any other Stripe-powered community platform.",
  },
  {
    q: 'Can I customize what members see when they try to cancel?',
    a: "Completely. Your message, your offer, your tone. You can offer a pause, a discount, a free month, or just ask a single exit survey question. We provide templates designed for community operators, but every word is editable. Your members will feel like they\u0027re hearing from you directly.",
  },
  {
    q: "What if a member still cancels after seeing the offer?",
    a: "That\u0027s fine. If they want to leave, they leave. You still capture their exit survey response — which tells you why your community isn\u0027t retaining them. And 20–35% of members who see an offer do stay, so the attempt is always worth making.",
  },
]

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CommunitiesLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing Community Members at the Cancel Screen | ChurnRecovery</title>
        <meta name="description" content="Circle, Skool, and Mighty Networks have zero built-in churn prevention. ChurnRecovery connects through Stripe and catches cancellations before they happen. 30-day free trial, then $20/month." />
        <link rel="canonical" href="https://churnrecovery.com/for/communities" />
        <meta property="og:title" content="Stop Losing Community Members at the Cancel Screen | ChurnRecovery" />
        <meta property="og:description" content="Community platforms like Circle, Skool, and Mighty Networks have no cancel flow. ChurnRecovery connects directly through Stripe and intercepts cancellations before they happen." />
        <meta property="og:url" content="https://churnrecovery.com/for/communities" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing Community Members at the Cancel Screen" />
        <meta name="twitter:description" content="Circle, Skool, and Mighty Networks have no churn tools. ChurnRecovery plugs directly into Stripe — no code, no platform approval needed." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_50%,#1A1200_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          {/* Amber glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,160,0,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(232,160,0,0.15)] border border-[rgba(232,160,0,0.35)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#F5C842] mb-[28px]">
              <span>✓</span> 30-Day Free Trial · No Credit Card Required
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Your Community Members Are Churning Silently.<br />
              <span className="text-[#F5C842]">Your Platform Won&apos;t Tell You.</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Circle, Skool, Mighty Networks — these platforms are great at building community, but terrible at preventing members from leaving. They offer zero cancel flows, zero win-back tools, and zero exit surveys. ChurnRecovery fixes that, through Stripe, in minutes.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-communities" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 30-day free trial — no platform approval needed
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ 3 steps, no code
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
                Every Community Cancellation =<br />Lost Recurring Revenue
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Community platforms focus on engagement — not retention. When a member decides to leave, they click cancel and they&apos;re gone. No intervention. No offer. No feedback. Just silence.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="👻"
                title="Members Disengage, Then Cancel"
                stat="5–10%"
                statLabel="of community members churn every month without warning"
                description="Community members don&apos;t rage-quit — they quietly stop showing up, then cancel weeks later. By the time you notice, they&apos;re already gone. There&apos;s no alert, no signal, no second chance."
              />
              <PainCard
                icon="🚪"
                title="No Cancel Flow on Circle, Skool, or Mighty Networks"
                description="Circle, Skool, and Mighty Networks all let members cancel instantly with zero friction. No pause option. No discount offer. No &quot;are you sure?&quot; Just an immediate cancellation — and a lost subscriber."
              />
              <PainCard
                icon="💳"
                title="Failed Payments Cause Silent Loss"
                description="Involuntary churn is just as painful. When a payment fails, most community platforms simply cancel the membership after a few retries. ChurnRecovery intercepts failed payments too — giving members a chance to update before they lose access."
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
                Works With Your Community Platform in Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Circle, Skool, and Mighty Networks all use Stripe for payments. ChurnRecovery connects to Stripe — not your community platform. No plugins, no approval needed.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. We read cancellation signals from Stripe — the same payment processor that powers Circle, Skool, and Mighty Networks memberships."
                callout="✓ No platform settings to change. No developer needed."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a member initiates a cancellation, ChurnRecovery fires before it&apos;s final. We intercept the Stripe event and trigger your custom recovery flow — automatically, in real time."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Message — Automated"
                description="Members see a personalized message from you: a pause option, a special discount, or a quick exit survey asking why they&apos;re leaving. Set it up once. It runs forever."
                callout="🎯 Average recovery rate: 20–35% of at-risk members"
              />
            </div>

            {/* Technical callout */}
            <div className="mt-8 bg-[rgba(232,160,0,0.05)] border border-[rgba(232,160,0,0.25)] border-l-4 border-l-[#E8A000] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does this work with Circle, Skool, and Mighty Networks?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                Yes — all three. Circle, Skool, and Mighty Networks use Stripe to process membership payments. ChurnRecovery connects directly to your Stripe account and listens for cancellation events — completely outside your community platform&apos;s ecosystem. No integration approval, no plugin required.
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
                Everything to Protect Your Community Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Offer for Seasonal Members"
                description="Community engagement ebbs and flows. Give members the option to pause for a month instead of canceling outright — ideal for communities with seasonal rhythms or busy periods."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a discount or a free month to members who are on the fence. Keeping them at a reduced rate beats losing them — and their network effect — entirely."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey to Understand Community Gaps"
                description="Find out exactly why members are leaving: too expensive, not enough value, community not active enough? Exit survey data tells you what to fix so you can stop losing members for the same reason twice."
              />
              <BenefitCard
                icon="📊"
                title="Dashboard Insights"
                description="Track how much revenue you&apos;ve saved, which recovery offers perform best, and your overall churn rate — all in one clean dashboard built for community operators."
              />
              <BenefitCard
                icon="🆓"
                title="$20/month — Flat"
                description="30-day free trial, then $20/month. All features included — no per-member fees, no percentage of revenue taken. Cancel anytime."
              />
              <BenefitCard
                icon="🌐"
                title="Works Across Community Platforms"
                description="Running Circle today, thinking about switching to Skool? ChurnRecovery works with any community platform that processes payments through Stripe — so your churn recovery setup moves with you."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              One Recovered Member Pays for a Year
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              At $20/month flat, ChurnRecovery pays for itself the first time it saves a member. Most community operators recover dozens of members per month — at zero additional cost.
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
              Circle, Skool, and Mighty Networks charge nothing for churn tools — because they don&apos;t have any. ChurnRecovery fills the gap for $20/month and pays for itself the first time you save a member.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Community Operators
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
                href="/posts/membership-site-churn-rate"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  What Is a Good Membership Site Churn Rate?
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Benchmarks and tactics for online community operators
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
                  The case for adding a cancel flow to any membership or community
                </div>
              </a>
              <a
                href="/posts/Involuntary-Churn-Recovery"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Involuntary Churn Recovery: How to Win Back Failed Payments
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Stop losing members to failed payments and card declines
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Community Member Is About to Cancel.<br />
              <span className="text-[#F5C842]">Will You Be Ready?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your free trial. Protect your community&apos;s recurring revenue with automated churn recovery. $20/month after 30 days — works with Circle, Skool, Mighty Networks, and any Stripe-powered community.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-communities" dark={true} />
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
