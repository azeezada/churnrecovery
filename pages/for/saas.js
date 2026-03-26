import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'

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

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function SaaSLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for SaaS — Stop Losing Subscribers at the Cancel Screen | ChurnRecovery</title>
        <meta name="description" content="SaaS companies lose 5–7% of their MRR every month to churn. ChurnRecovery connects to your Stripe account and intercepts cancellations in real-time — voluntary and involuntary. 30-day free trial, then $20/month." />
        <link rel="canonical" href="https://churnrecovery.com/for/saas" />
        <meta property="og:title" content="Churn Recovery for SaaS — Stop Losing Subscribers at the Cancel Screen | ChurnRecovery" />
        <meta property="og:description" content="Industry churn rates for SaaS run 5–7% monthly. ChurnRecovery plugs directly into Stripe to intercept cancellations before they happen — voluntary and involuntary. No engineering work required." />
        <meta property="og:url" content="https://churnrecovery.com/for/saas" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for SaaS — Stop Losing MRR at the Cancel Screen" />
        <meta name="twitter:description" content="5–7% monthly churn is the SaaS norm. ChurnRecovery connects to Stripe and intercepts cancellations before they're final — for any Stripe-based SaaS product." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_50%,#1A1200_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          {/* SaaS gold glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,160,0,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(232,160,0,0.15)] border border-[rgba(232,160,0,0.35)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#F5C842] mb-[28px]">
              <span>✓</span> 30-Day Free Trial · No Credit Card Required
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              SaaS Churn Is Eating Your MRR.<br />
              <span className="text-[#F5C842]">Intercept It Before It Happens.</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Industry churn rates for SaaS run 5–7% monthly. That means you&apos;re replacing your entire customer base every 14–20 months just to stay flat. ChurnRecovery connects to Stripe and intercepts cancellations — voluntary and involuntary — with a cancel flow that saves real revenue.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-saas" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 30-day free trial — works with any Stripe-based SaaS
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
                Every SaaS Cancellation =<br />Lost Recurring Revenue
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Most SaaS tools are built to acquire customers — not retain them. Right now, subscribers can cancel in seconds and you have no intervention point, no win-back offer, and no way to know why they left.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="📉"
                title="Silent Voluntary Churn"
                stat="5–7%"
                statLabel="of SaaS subscribers cancel every month — silently"
                description="Industry benchmarks put monthly SaaS churn at 5–7%. That&apos;s not a bad month — that&apos;s the norm. Without a cancel flow, every single one of those cancellations happens without any friction, offer, or explanation."
              />
              <PainCard
                icon="💳"
                title="Involuntary Churn from Failed Payments"
                stat="20–40%"
                statLabel="of SaaS churn is involuntary — card declines, expired cards"
                description="Failed payments are silent killers. Cards expire, banks flag charges, limits get hit. Without automated recovery, these customers churn without ever intending to — and most never come back once they&apos;re gone."
              />
              <PainCard
                icon="🚪"
                title="No Intervention Point Before Cancellation"
                description="When a subscriber clicks &quot;Cancel Plan,&quot; they hit a dead end. No pause. No discount. No &quot;can we help?&quot; Just an immediate cancellation and a lost customer — with zero data on why they left or what might have changed their mind."
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
                Works With Any Stripe-Based SaaS in Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                If your SaaS uses Stripe for billing, ChurnRecovery works. No engineering sprint, no SDK integration, no waiting on your dev team.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. We listen for cancellation and payment failure events — the same signals Stripe already tracks for your SaaS subscriptions."
                callout="✓ No code changes. No backend work. No developer needed."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a subscriber initiates a cancellation — or a payment fails — ChurnRecovery fires before it&apos;s final. We intercept the Stripe event and trigger your custom recovery flow automatically."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Automated Recovery Flows Run on Autopilot"
                description="Voluntary churners see a personalized cancel flow: a pause offer, a discount, or a quick exit survey. Involuntary churners get automated dunning emails. Set it up once. It runs forever."
                callout="🎯 Average recovery rate: 20–35% of at-risk subscribers"
              />
            </div>

            {/* Technical callout */}
            <div className="mt-8 bg-[rgba(232,160,0,0.05)] border border-[rgba(232,160,0,0.25)] border-l-4 border-l-[#E8A000] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;We already have billing logic in our app — do I need to change anything?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                No. ChurnRecovery works at the Stripe webhook level — completely outside your application code. You don&apos;t need to modify your billing logic, your cancellation endpoints, or your customer portal. We listen, you recover.
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
                Everything to Protect Your SaaS Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Let subscribers pause instead of cancel. SaaS customers often leave during budget freezes or low-usage periods — not because they hate your product."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a 20% discount or one month free to at-risk subscribers. Retaining a customer at a lower rate beats acquiring a new one at full cost."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out why subscribers cancel with a 1-question exit survey. The answers fuel product improvements, pricing changes, and retention strategy — real signal, not guesses."
              />
              <BenefitCard
                icon="📊"
                title="Recovery Dashboard"
                description="Track saved MRR, recovery rates by offer type, churn reasons, and payment failure trends — all in one dashboard built for SaaS operators."
              />
              <BenefitCard
                icon="🆓"
                title="$20/month — Flat"
                description="30-day free trial, then $20/month. All features included — no per-seat fees, no percentage of recovered revenue. Cancel anytime."
              />
              <BenefitCard
                icon="⚙️"
                title="Works With Any Stripe SaaS"
                description="B2B or B2C, monthly or annual, usage-based or flat-rate — if your SaaS bills through Stripe, ChurnRecovery works. No platform approval needed."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Flat $20/Month. No Hidden Fees.
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              Enterprise churn tools like Churnkey charge $250/month and up. ChurnRecovery is $20/month — all features included, no percentage of recovered revenue, no per-seat pricing.
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
              Compare to Churnkey ($250/mo) and enterprise retention tools that charge 5–10× more. ChurnRecovery pays for itself the first time you save a subscriber.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From SaaS Founders
              </h2>
            </div>

            {[
              {
                q: 'Does this work with any billing system or only Stripe?',
                a: "ChurnRecovery currently works with Stripe-based billing. If your SaaS uses Stripe — directly or through a platform that runs on Stripe under the hood — you're covered. Support for additional payment processors is on the roadmap.",
              },
              {
                q: 'Does it work for B2B SaaS with annual contracts?',
                a: "Yes, with some nuance. For annual subscribers, the cancel flow fires at renewal time or when they request early cancellation. For monthly B2B plans, it works the same as B2C — we intercept the cancellation event and trigger your flow before it finalizes.",
              },
              {
                q: 'How does involuntary churn recovery work?',
                a: "When a payment fails, ChurnRecovery triggers an automated dunning sequence — a series of emails and retry prompts designed to recover the subscription before it churns. Failed payments account for 20–40% of SaaS churn, and most of it is recoverable if you act fast.",
              },
              {
                q: 'Will this conflict with my existing billing portal or cancellation flow?',
                a: "No. ChurnRecovery operates at the Stripe webhook level, outside your application code. It doesn't replace your billing portal — it adds a recovery layer before the cancellation completes. Your existing infrastructure stays exactly as it is.",
              },
              {
                q: 'Do I need to involve my engineering team?',
                a: "Not at all. If you can connect a Stripe account and configure a webhook URL, you can set this up yourself in under 10 minutes. We have step-by-step guides with screenshots for every part of the process.",
              },
              {
                q: 'Can I customize the cancel flow for different plan tiers?',
                a: "Yes. You can create different flows for different subscription plans — offer a pause to monthly users, a discount to annual users, and an exit survey to churning trial users. Every flow is fully customizable.",
              },
              {
                q: "What if a subscriber still cancels after seeing the offer?",
                a: "That's fine. If they want to leave, they leave. You still capture their exit survey response — which is more actionable signal than silence. And you&apos;ve made the attempt, which 20–35% of at-risk subscribers respond to positively.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
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
                href="/posts/Ultimate-Guide-SaaS-Churn"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  The Ultimate Guide to SaaS Churn
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Benchmarks, root causes, and proven retention tactics for SaaS companies
                </div>
              </a>
              <a
                href="/posts/Involuntary-Churn-Recovery"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Involuntary Churn Recovery: How to Stop Losing Subscribers to Failed Payments
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  20–40% of SaaS churn is recoverable — here&apos;s how to capture it
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
                  The case for adding a cancel flow to any SaaS product
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A SaaS Subscriber Is About to Cancel.<br />
              <span className="text-[#F5C842]">Will You Be Ready?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your free trial. Protect your SaaS MRR with automated churn recovery — voluntary and involuntary. $20/month after 30 days, no engineering work required.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-saas" dark={true} />
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
