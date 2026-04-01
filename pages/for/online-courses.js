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
    q: 'Does this work with Teachable, Kajabi, and Thinkific?',
    a: "Yes. All three platforms process subscription payments through Stripe. ChurnRecovery connects to your Stripe account directly and listens for cancellation events — no course platform API access needed, and no approval required.",
  },
  {
    q: 'Will my course platform block this?',
    a: "No. ChurnRecovery operates at the Stripe level, completely outside your course platform. Your platform has no visibility into or control over Stripe webhook events. It\u0027s like installing a smoke alarm in a rented building — the landlord doesn\u0027t need to approve it.",
  },
  {
    q: 'My students pay a one-time fee, not monthly. Does this apply to me?',
    a: "ChurnRecovery works specifically with recurring subscription plans. If you sell one-time courses, there\u0027s nothing to cancel. But if you offer a monthly membership, a learning community, or an ongoing subscription tier, this is exactly what you need.",
  },
  {
    q: 'Does completion rate really affect churn that much?',
    a: "Significantly. Students who haven\u0027t started or who stall early are the most likely to cancel. A cancel flow lets you step in at that exact moment — with a pause offer that buys them time, or a discount that resets their commitment.",
  },
  {
    q: 'Can I customize the cancel flow message for my course audience?',
    a: "Completely. Your message, your offer, your tone. We provide templates designed for course creators and educators, but you can edit every word. Your students will feel like they\u0027re hearing from you — not a software company.",
  },
  {
    q: 'What if my course is priced below $50/month?',
    a: "Even at lower price points, recovering 1–2 students per month adds up fast — especially with seasonal enrollment where each cohort is harder to replace. Volume matters, and a cancel flow works at every price point.",
  },
  {
    q: "What happens if a student still cancels after seeing the offer?",
    a: "That\u0027s fine. If they want to leave, they leave. You still get their exit survey response — which is more than you had before. And you\u0027ve made the attempt, which 20–35% of students respond to positively.",
  },
]

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function OnlineCoursesLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Online Courses | ChurnRecovery</title>
        <meta name="description" content="Course students cancel silently — and your platform offers zero protection. ChurnRecovery connects to Stripe and intercepts cancellations before they're final. Offer a pause, a discount, or ask why. 30-day free trial, then $20/month." />
        <link rel="canonical" href="https://churnrecovery.com/for/online-courses" />
        <meta property="og:title" content="Churn Recovery for Online Courses | ChurnRecovery" />
        <meta property="og:description" content="Teachable, Kajabi, and Thinkific don't protect you from cancellations. ChurnRecovery connects to Stripe and catches at-risk students before they leave — no code needed." />
        <meta property="og:url" content="https://churnrecovery.com/for/online-courses" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Online Courses | ChurnRecovery" />
        <meta name="twitter:description" content="Your course platform has no cancel flow. ChurnRecovery plugs directly into Stripe — and intercepts cancellations with a pause offer, discount, or exit survey." />
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
              Course Students Cancel Silently.<br />
              <span className="text-[#F5C842]">No Platform Will Stop Them.</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Teachable, Kajabi, and Thinkific don&apos;t intercept cancellations — they just let students walk. ChurnRecovery connects to Stripe and steps in at the last moment: a pause offer, a discount, or a simple &quot;why are you leaving?&quot; All without touching your course platform&apos;s settings.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-online-courses" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 30-day free trial — works with any Stripe-powered course platform
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
                Every Course Cancellation =<br />Lost Recurring Revenue
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Course platforms give you beautiful content pages — but zero protection against students walking out the door. Seasonal enrollment makes every paying student harder to replace than you think.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="📦"
                title="Students Cancel After the First Module"
                stat="40–60%"
                statLabel="of course cancellations happen in the first 30 days"
                description="Low completion rates aren&apos;t just a content problem — they&apos;re a revenue problem. Students who disengage early cancel fast, and no platform gives you a chance to intervene before it&apos;s final."
              />
              <PainCard
                icon="📅"
                title="Seasonal Enrollment Makes Every Student Count"
                description="Course enrollment spikes in January, September, and around big launches. Outside those windows, cancellations hurt more because new students are harder to come by. Recovering even a few per month compounds over time."
              />
              <PainCard
                icon="🚫"
                title="No Intervention on Any Course Platform"
                description="Teachable, Kajabi, Thinkific — none of them offer a cancel flow. Students click cancel and they&apos;re gone in seconds. No pause option, no discount offer, no exit question. Just a lost subscription."
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
                Works With Any Course Platform in Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Teachable, Kajabi, and Thinkific all use Stripe for payments. ChurnRecovery connects to Stripe — not your course platform. No plugins, no platform approval needed.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. We listen for cancellation signals from Stripe — the same payment processor your course platform uses under the hood."
                callout="✓ No platform settings to change. No developer needed."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a student initiates a cancellation, ChurnRecovery fires before it&apos;s final. We intercept the Stripe event and trigger your custom recovery flow — automatically, every time."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Message — Automated"
                description="Students see a personalized message from you: a pause option, a special discount, or a quick exit survey. Set it up once. It runs on every cancellation, forever."
                callout="🎯 Average recovery rate: 20–35% of at-risk students"
              />
            </div>

            {/* Technical callout */}
            <div className="mt-8 bg-[rgba(232,160,0,0.05)] border border-[rgba(232,160,0,0.25)] border-l-4 border-l-[#E8A000] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does this work with Teachable / Kajabi / Thinkific?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                Yes — because ChurnRecovery works at the Stripe level, not the platform level. All major course platforms use Stripe to process subscription payments. By connecting directly to your Stripe account, we can listen for cancellation events and respond — completely outside your course platform&apos;s ecosystem.
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
                Everything to Protect Your Course Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Give students the option to pause instead of cancel. Many people leave during a busy season — not because they hate your course. A pause keeps them on the books."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a 20% discount or 1 month free to at-risk students. Keeping them at a discount beats losing them forever — especially outside enrollment season."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out why students leave with a quick 1-question survey. Was it completion rate? Price? Pacing? Use the answers to improve your course and reduce future churn."
              />
              <BenefitCard
                icon="📊"
                title="Dashboard Insights"
                description="Track how much revenue you&apos;ve saved, which offers resonate with your students, and your overall churn recovery rate — all in one clean dashboard."
              />
              <BenefitCard
                icon="🆓"
                title="$20/month — Flat"
                description="30-day free trial, then $20/month. All features included — no per-student fees, no per-platform fees. Works across all your Stripe-connected courses."
              />
              <BenefitCard
                icon="🎓"
                title="Works With Teachable, Kajabi &amp; Thinkific"
                description="Any course platform that processes payments through Stripe is supported. That includes Teachable, Kajabi, Thinkific, Podia, and more — connect once and protect them all."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              One Recovered Student Pays for a Year
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              At $97/month per student, recovering just one cancellation covers ChurnRecovery for almost five months. At higher price points, a single save covers the whole year.
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
              Compare to Teachable ($39–$299/mo) or Kajabi ($119–$399/mo) — neither includes churn recovery. ChurnRecovery is just $20/month and pays for itself the first time you save a student.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Course Creators
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
                href="/posts/reduce-churn-online-course-business"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  How to Reduce Churn in Your Online Course Business
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Tactics specific to course creators and educators
                </div>
              </a>
              <a
                href="/posts/kajabi-cancel-flow-setup-without-coding"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  How to Set Up a Cancel Flow for Kajabi (No Coding)
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Step-by-step guide with copy-paste scripts
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
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Course Student Is About to Cancel.<br />
              <span className="text-[#F5C842]">Will You Be Ready?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your free trial. Protect your course revenue with automated churn recovery. $20/month after 30 days — works with Teachable, Kajabi, Thinkific, and any Stripe-powered platform.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-online-courses" dark={true} />
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
