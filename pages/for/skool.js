import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'

// ─── Pain card ──────────────────────────────────────────────────────────────
function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6 border-t-[3px] border-t-[#0066FF]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] m-0 mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-sans font-extrabold text-[2rem] text-[#0066FF] my-1">
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-sans text-[0.8rem] text-[#0052CC] mb-2">
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
        <div className="w-12 h-12 rounded-full bg-[rgba(0,102,255,0.1)] border-2 border-[#0066FF] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#0066FF] shrink-0">
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
        <div className="bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.25)] rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-[#0052CC]">
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
        <span className="text-[#0066FF] text-[1.2rem] font-bold shrink-0">
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
export default function SkoolLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Skool — Keep Your Community Members Paying | ChurnRecovery</title>
        <meta name="description" content="Skool communities charging $29-99/month lose thousands yearly to silent cancellations. ChurnRecovery intercepts cancellations at the Stripe level with pause offers, discounts, and exit surveys. $20/month flat." />
        <link rel="canonical" href="https://churnrecovery.com/for/skool" />
        <meta property="og:title" content="Churn Recovery for Skool — Keep Your Community Members Paying | ChurnRecovery" />
        <meta property="og:description" content="At 5% churn on 200 Skool members at $49/mo, you lose $5,880/year. ChurnRecovery connects to Stripe and intercepts cancellations before they finalize." />
        <meta property="og:url" content="https://churnrecovery.com/for/skool" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Skool Communities" />
        <meta name="twitter:description" content="Skool has no cancel flow. Members leave without explanation. ChurnRecovery fixes that via Stripe — $20/month flat." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#001433_0%,#002966_50%,#001433_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.2)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(0,102,255,0.2)] border border-[rgba(0,102,255,0.4)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#66A3FF] mb-[28px]">
              <span>✓</span> 30-Day Free Trial · No Credit Card Required
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Your Skool Community Is Leaking<br />
              <span className="text-[#66A3FF]">$5,880/Year in Silent Cancellations</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Skool communities typically charge $29&ndash;$99/month. At just 5% churn on 200 members at $49/mo, you&apos;re losing $490 every month &mdash; $5,880 per year. Skool has no cancel flow. Members leave without explanation. ChurnRecovery intercepts those cancellations at Stripe and gives you a shot at saving them.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-skool" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                Works via Stripe — no Skool API needed
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                Recover 20–35% of cancelling members
              </span>
            </div>

            <div className="mt-5">
              <Link href="#how-it-works" className="font-sans text-[0.9rem] text-[rgba(255,255,255,0.6)] no-underline border-b border-b-[rgba(255,255,255,0.3)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: PAIN POINTS ──────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#0052CC] uppercase tracking-[0.08em] mb-3">
                The Revenue You&apos;re Leaving on the Table
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Skool Members Cancel in One Click.<br />You Get Zero Chance to Respond.
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Skool is built for simplicity &mdash; which means the cancellation process is simple too. One click and they&apos;re gone. No friction, no offer, no feedback. That simplicity costs you thousands.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="💸"
                title="The Math Is Brutal"
                stat="$5,880"
                statLabel="lost per year at 5% churn on 200 members at $49/mo"
                description="Most Skool community owners don't track churn closely. They see the occasional cancellation notification but don't add it up. Over 12 months, even modest churn compounds into serious revenue loss."
              />
              <PainCard
                icon="🚪"
                title="No Cancel Flow Exists"
                description="Skool's platform has no built-in retention mechanism. When a member decides to leave, there's no pause option, no discount offer, no 'are you sure?' prompt. They click cancel and the subscription ends. Period."
              />
              <PainCard
                icon="🔇"
                title="Members Leave Without a Word"
                description="Why did they cancel? Was it the content? The price? A bad experience with another member? Without an exit survey, you're flying blind. You can't fix problems you don't know about."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#0066FF] uppercase tracking-[0.08em] mb-3">
                Stripe-Level Integration
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Add a Cancel Flow to Skool in 10 Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Skool processes payments through Stripe. ChurnRecovery connects directly to your Stripe account &mdash; no Skool API access needed.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Stripe in One Click"
                description="Log into ChurnRecovery and connect your Stripe account — the same one Skool uses to process your community payments. One OAuth click. No API keys, no webhook configuration, no developer needed."
                callout="✓ Skool doesn't need to approve this. It's your Stripe account."
              />
              <HowStep
                number="2"
                icon="🛡"
                title="Cancellations Get Intercepted"
                description="When a Skool member cancels their subscription, the event flows through Stripe. ChurnRecovery catches that event in real-time — before the subscription actually ends — and triggers your custom cancel flow."
              />
              <HowStep
                number="3"
                icon="🎯"
                title="Members See Your Retention Offer"
                description="Instead of a silent cancellation, members see a branded message from you. Offer a pause, a discount, or a free month. Ask why they're leaving. The flow takes 30 seconds — and saves 20–35% of cancelling members on average."
                callout="You keep the member. They keep the community. Everyone wins."
              />
            </div>

            <div className="mt-8 bg-[rgba(0,102,255,0.05)] border border-[rgba(0,102,255,0.25)] border-l-4 border-l-[#0066FF] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Will Skool block this?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                No. ChurnRecovery operates at the Stripe level, not inside Skool. Your Stripe account is yours &mdash; Skool has no control over what third-party tools you connect to it. This is similar to connecting accounting software or analytics to your Stripe account.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#0066FF] no-underline font-semibold">
                Technical integration docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[rgba(0,102,255,0.1)] border border-[rgba(0,102,255,0.3)] rounded-[10px] py-3.5 px-7 font-sans font-bold text-[#0066FF] no-underline text-[0.95rem]">
                Try the Interactive Demo
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
              <div className="font-sans text-[0.75rem] font-bold text-[#0066FF] uppercase tracking-[0.08em] mb-3">
                What You Get
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                The Cancel Flow Skool Should Have Built
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Offers"
                description="Members often cancel during a busy month, not because they dislike your community. Give them the option to pause for 30, 60, or 90 days and come back when they're ready."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offers"
                description="Automatically present a discount — 20% off, a free month, a reduced rate — to members who are about to leave. You keep the member; they keep your community at a price that works."
              />
              <BenefitCard
                icon="📋"
                title="Exit Surveys"
                description="A quick 1-question survey when someone cancels reveals exactly why. Is it price? Content? Engagement? With real data, you can fix the root causes of churn, not just treat the symptoms."
              />
              <BenefitCard
                icon="📊"
                title="Churn Analytics"
                description="See your save rate, top cancellation reasons, revenue recovered, and churn trends over time. Finally, real numbers instead of gut feelings about your community health."
              />
              <BenefitCard
                icon="🎨"
                title="Fully Customizable Flows"
                description="Your cancel flow, your voice, your brand. Customize every message, offer, and survey question. Members should feel like they're hearing from you — not from software."
              />
              <BenefitCard
                icon="💰"
                title="$20/month — Flat"
                description="One price. No per-member fees, no tiers, no percentage of recovered revenue. $20/month after your 30-day free trial. It pays for itself with a single saved member."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Less Than Half a Member&apos;s Monthly Fee
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              Most Skool communities charge $29&ndash;$99/month. ChurnRecovery costs $20/month &mdash; less than half of what a single member pays you. Recover one member and you&apos;re in profit.
            </p>

            <div className="bg-[rgba(0,102,255,0.05)] border-2 border-[#0066FF] rounded-xl p-8 mb-7">
              <div className="font-sans text-[0.85rem] font-bold text-[#0066FF] uppercase tracking-[0.08em] mb-2">
                One Plan. Everything Included.
              </div>
              <div className="font-sans font-extrabold text-[3rem] text-[#191919] my-2">
                $20<span className="text-[1.2rem] font-bold text-[#666666]">/month</span>
              </div>
              <div className="font-serif text-[0.95rem] text-[#666666] mb-4">
                30-day free trial, then $20/month
              </div>
              <ul className="text-left max-w-[360px] mx-auto mb-6 list-none p-0">
                {['Cancel flows with pause & discount offers', 'Exit surveys on every cancellation', 'Fully customizable messaging', 'Retention analytics dashboard', 'Unlimited community members', 'Email support'].map(item => (
                  <li key={item} className="font-sans text-[0.88rem] text-[#444444] py-1.5 flex gap-2 items-start">
                    <span className="text-[#0066FF] shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="max-w-[320px] mx-auto">
                <SignUpCTA source="for-skool-pricing" />
              </div>
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              At $49/mo per member, recovering just one member pays for 2.5 months of ChurnRecovery. Most community owners recover 3&ndash;8 members in the first month.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Skool Community Owners
              </h2>
            </div>

            {[
              {
                q: 'Does this actually work with Skool?',
                a: "Yes. Skool processes all payments through Stripe. ChurnRecovery connects to your Stripe account and intercepts cancellation events in real-time. No Skool API access is needed — everything happens at the Stripe payment layer.",
              },
              {
                q: 'Will Skool block or restrict this?',
                a: "No. ChurnRecovery doesn't interact with Skool's platform at all. It connects to your Stripe account, which you own and control independently. Skool has no visibility into or control over your Stripe integrations.",
              },
              {
                q: 'Can I customize the cancel flow?',
                a: "Yes, fully. You control the messaging, the offers (pause, discount, free month), and the exit survey questions. We provide templates optimized for communities, but you can edit every word to match your brand voice.",
              },
              {
                q: 'What happens to the Skool community access if someone pauses?',
                a: "When a member accepts a pause, ChurnRecovery pauses the Stripe subscription. Their Skool access will reflect whatever Stripe reports. When the pause ends and billing resumes, access continues automatically.",
              },
              {
                q: 'How quickly can I set this up?',
                a: "Under 10 minutes. Connect Stripe, configure your cancel flow (we have templates), and you're live. No code, no developer, no Skool admin changes needed.",
              },
              {
                q: 'What if I have both free and paid Skool members?',
                a: "ChurnRecovery only triggers on paid subscription cancellations through Stripe. Free members can come and go without any intervention. The tool is designed exclusively for protecting paid recurring revenue.",
              },
              {
                q: 'Is there a per-member fee?',
                a: "No. $20/month flat, regardless of how many members you have or how many cancellations you intercept. No hidden fees, no percentage of recovered revenue. Start with a 30-day free trial — no credit card required.",
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
              Related Reading
            </h2>
            <div className="grid gap-3">
              <a
                href="/posts/what-is-a-cancel-flow"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  What Is a Cancel Flow? (And Why You Need One)
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  The essential guide to cancel flows for community owners
                </div>
              </a>
              <a
                href="/posts/reduce-churn-online-community"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  How to Reduce Churn in Your Online Community
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Proven strategies for improving community retention rates
                </div>
              </a>
              <a
                href="/posts/community-churn-benchmarks"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Community Churn Benchmarks: What&apos;s Normal?
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Industry data on churn rates for paid online communities
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#001433_0%,#002966_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              Another Skool Member Is About to Cancel.<br />
              <span className="text-[#66A3FF]">What Will They See?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Right now, the answer is nothing. Start your free trial and give every cancelling member a reason to stay. No credit card required.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-skool-bottom" dark={true} />
            </div>

            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                30-day free trial, then $20/month
              </span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                Cancel anytime
              </span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                No credit card required
              </span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
