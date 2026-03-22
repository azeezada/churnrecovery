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
export default function KajabiLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing Kajabi Members at the Cancel Screen | ChurnRecovery</title>
        <meta name="description" content="ChurnRecovery connects to your Kajabi Stripe account and intercepts cancellations in real-time. Offer a pause, a discount, or ask why — before they're gone. Free to start." />
        <link rel="canonical" href="https://churnrecovery.com/for/kajabi" />
        <meta property="og:title" content="Stop Losing Kajabi Members at the Cancel Screen | ChurnRecovery" />
        <meta property="og:description" content="Kajabi memberships run on Stripe. ChurnRecovery connects directly and intercepts cancellations before they happen. No code, no Kajabi approval needed." />
        <meta property="og:url" content="https://churnrecovery.com/for/kajabi" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing Kajabi Members at the Cancel Screen" />
        <meta name="twitter:description" content="Most Kajabi creators don't realize they can intercept cancellations. ChurnRecovery plugs directly into Stripe — no code, no Kajabi approval." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_50%,#1A1200_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          {/* Kajabi gold glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,160,0,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(232,160,0,0.15)] border border-[rgba(232,160,0,0.35)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#F5C842] mb-[28px]">
              <span>✓</span> Free for Kajabi Creators · No Credit Card Required
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Stop Losing Kajabi Members<br />
              <span className="text-[#F5C842]">at the Cancel Screen</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Most Kajabi creators don&apos;t realize it — but their memberships run on Stripe. That means you can intercept cancellations with a smooth cancel flow: a pause offer, a discount, or a simple &quot;why are you leaving?&quot; All without touching Kajabi&apos;s settings.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-kajabi" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 Free tier available — no Kajabi approval needed
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
                Every Kajabi Cancellation =<br />Lost Recurring Revenue
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Kajabi gives you beautiful course pages — but zero protection against members walking out the door. Right now, they can cancel in seconds and you&apos;ll never know why.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="👻"
                title="Invisible Churn"
                stat="3–8%"
                statLabel="of members cancel every month — silently"
                description="There's no warning before a member cancels. No signal. No chance to intervene. One minute they're in your community, the next they're gone — and you find out in a Stripe email."
              />
              <PainCard
                icon="🚪"
                title="No Win-Back Offer"
                description="When a Kajabi member clicks &quot;Cancel Membership,&quot; they hit a dead end. No pause option. No discount. No &quot;here's what you'll miss.&quot; Just an immediate, silent goodbye."
              />
              <PainCard
                icon="❓"
                title="No Insight Into Why"
                description="Was it price? Time? The content itself? You'll never know. Without an exit survey, you're guessing — which means you can't fix what's driving your members away."
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
                Works With Kajabi in Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Kajabi uses Stripe for payments. ChurnRecovery connects to Stripe — not Kajabi. No plugins, no approval needed.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. We read cancellation signals from Stripe — the same payment processor Kajabi uses under the hood."
                callout="✓ No Kajabi settings to change. No developer needed."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a member initiates a cancellation, ChurnRecovery fires before it's final. We intercept the Stripe event and trigger your custom recovery flow — automatically."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Message — Automated"
                description="Members see a personalized message from you: a pause option, a special discount, or a quick exit survey. Set it up once. It runs forever."
                callout="🎯 Average recovery rate: 20–35% of at-risk members"
              />
            </div>

            {/* Technical callout */}
            <div className="mt-8 bg-[rgba(232,160,0,0.05)] border border-[rgba(232,160,0,0.25)] border-l-4 border-l-[#E8A000] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does Kajabi even let you do this?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                Yes — because ChurnRecovery works at the Stripe level, not the Kajabi level. Kajabi uses Stripe to process your membership payments. By connecting directly to your Stripe account, we can listen for cancellation events and respond — completely outside Kajabi&apos;s ecosystem.
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
                Everything to Protect Your Membership Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Give members the option to pause instead of cancel. Many people leave during a busy month — not because they hate your content."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a 20% discount or 1 month free to at-risk members. Keeping them at a discount beats losing them forever."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out why members leave with a quick 1-question survey. Use the answers to improve your course, community, and content."
              />
              <BenefitCard
                icon="📊"
                title="Dashboard Insights"
                description="Track how much revenue you've saved, which offers work best, and your overall churn recovery rate — all in one dashboard."
              />
              <BenefitCard
                icon="🆓"
                title="Free Tier"
                description="Free to start — no credit card, no trial period. We grow with you. You only pay when your membership business grows."
              />
              <BenefitCard
                icon="🚫"
                title="No Kajabi Approval Needed"
                description="This works entirely through Stripe. No Kajabi plugin, no app store approval, no waiting. Connect and go."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              A Fraction of What Kajabi Costs You
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              Kajabi charges $119/month just to run your courses. ChurnRecovery starts free — and helps you actually keep the revenue you&apos;re earning.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { tier: 'Starter', price: '$0/month', range: 'Free to start', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} className={`rounded-[10px] p-[18px] relative ${highlight ? 'bg-[rgba(232,160,0,0.08)] border border-[#E8A000]' : 'bg-[#FAF9F5] border border-[#E5E5E5]'}`}>
                  {highlight && (
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#E8A000] text-[#1A1200] font-sans text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">
                      START HERE
                    </div>
                  )}
                  <div className="font-sans font-bold text-[#191919] text-[0.9rem]">{tier}</div>
                  <div className={`font-sans font-extrabold text-[1.4rem] my-1 ${highlight ? 'text-[#E8A000]' : 'text-[#191919]'}`}>{price}</div>
                  <div className="font-serif text-[0.78rem] text-[#666666]">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              Compare to Kajabi ($119–$399/mo) which has zero built-in churn recovery. ChurnRecovery pays for itself the first time you save a member.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Kajabi Creators
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Kajabi?',
                a: "Yes. Kajabi processes payments through Stripe. ChurnRecovery connects to your Stripe account directly and listens for cancellation events. No Kajabi API access needed — it works entirely at the Stripe level.",
              },
              {
                q: 'Will Kajabi block this?',
                a: "No. ChurnRecovery operates at the Stripe level, not inside Kajabi. Kajabi has no visibility into or control over Stripe webhook events. This is like setting up a smoke detector in a building — the landlord doesn't need to approve it.",
              },
              {
                q: 'Do I need developer help to set this up?',
                a: "Not at all. If you can click a button and copy-paste a URL, you can set this up. It takes about 5–10 minutes, and we have step-by-step guides with screenshots for every step.",
              },
              {
                q: 'What if my Kajabi membership is at a lower price point?',
                a: "Even recovering 1–2 members per month at $47 or $97/month adds up fast. At lower price points, it's even more important to have a cancel flow — because volume matters more.",
              },
              {
                q: 'Can I customize the cancel flow message?',
                a: "Completely. Your message, your offer, your tone. We provide templates designed for course creators and coaches, but you can edit every word. Your members will feel like they're hearing from you — not a software company.",
              },
              {
                q: 'Does ChurnRecovery work with Kajabi memberships and courses?',
                a: "Yes — any Kajabi product that uses Stripe for recurring billing. This includes membership sites, coaching programs, mastermind groups, and any subscription-based Kajabi offer.",
              },
              {
                q: "What happens if someone still cancels after seeing the offer?",
                a: "That's fine. If they want to leave, they leave. You still get their exit survey response — which is more than you had before. And you've made the attempt, which 20–35% of people respond to positively.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Kajabi Member Is About to Cancel.<br />
              <span className="text-[#F5C842]">Will You Be Ready?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Sign up for free. Protect your Kajabi membership revenue with automated churn recovery. Free to start — no Kajabi approval needed.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-kajabi" dark={true} />
            </div>

            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                Free during beta
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
