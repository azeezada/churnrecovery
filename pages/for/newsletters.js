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
export default function NewslettersLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Paid Newsletters | ChurnRecovery</title>
        <meta name="description" content="Failed payments and silent cancellations are killing your newsletter revenue — and your platform has zero tools to stop it. ChurnRecovery connects to Stripe and recovers subscribers automatically. 30-day free trial, then $20/month." />
        <link rel="canonical" href="https://churnrecovery.com/for/newsletters" />
        <meta property="og:title" content="Churn Recovery for Paid Newsletters | ChurnRecovery" />
        <meta property="og:description" content="Substack, beehiiv, Ghost, and ConvertKit have no cancel flow. ChurnRecovery connects directly to Stripe and intercepts cancellations before they happen. No code required." />
        <meta property="og:url" content="https://churnrecovery.com/for/newsletters" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Paid Newsletters | ChurnRecovery" />
        <meta name="twitter:description" content="Newsletter platforms give you zero churn tools. ChurnRecovery plugs directly into Stripe — works with Substack, beehiiv, Ghost, and ConvertKit." />
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
              Your Paid Subscribers Are<br />
              <span className="text-[#F5C842]">Silently Churning Right Now</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Substack, beehiiv, Ghost, and ConvertKit were built to help you grow — not to help you keep the subscribers you already have. When a paid reader clicks cancel, there&apos;s no offer, no pause option, no exit survey. Just silence. ChurnRecovery fixes that.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-newsletters" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 30-day free trial — works with all major newsletter platforms
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
                Newsletter Platforms Give You<br />Zero Churn Protection
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                You spend months building an audience, converting free readers to paid — and then watch them quietly leave with no chance to save them. Newsletter tools are great at acquisition. They&apos;re silent on retention.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="👻"
                title="Silent Subscriber Loss"
                stat="3–7%"
                statLabel="of paid subscribers cancel every month on average"
                description="Paid newsletter churn is invisible. You get a Stripe notification that a subscriber cancelled — no context, no warning, no chance to intervene. Month after month, your MRR slowly bleeds."
              />
              <PainCard
                icon="💳"
                title="Failed Payments You Never See"
                description="Credit cards expire. Banks decline charges. When a payment fails on Substack or beehiiv, your subscriber downgrades silently to free — and most never come back. Involuntary churn is often bigger than voluntary churn."
              />
              <PainCard
                icon="🚫"
                title="No Cancel Flow on Any Newsletter Platform"
                description="Substack, beehiiv, Ghost, and ConvertKit all send cancelling subscribers straight to a confirmation screen. There is no pause option, no discount, no &quot;why are you leaving?&quot; — just an instant goodbye."
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
                Works With Your Newsletter Platform in Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Every major newsletter platform uses Stripe for paid subscriptions. ChurnRecovery connects to Stripe — not your platform. No plugins, no approval needed.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. We read cancellation signals from Stripe — the same payment processor your newsletter platform uses under the hood."
                callout="✓ No platform settings to change. No developer needed."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Intercept Cancellations Instantly"
                description="The moment a paid subscriber initiates a cancellation, ChurnRecovery fires before it&apos;s final. We intercept the Stripe event and trigger your custom recovery flow — automatically, in real time."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Voice — Automated"
                description="Subscribers see a message from you: a pause option, a special discount, or a quick &quot;why are you leaving?&quot; survey. Set it up once. It runs for every future cancellation."
                callout="🎯 Average recovery rate: 20–35% of at-risk subscribers"
              />
            </div>

            {/* Technical callout */}
            <div className="mt-8 bg-[rgba(232,160,0,0.05)] border border-[rgba(232,160,0,0.25)] border-l-4 border-l-[#E8A000] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                Works with Substack, beehiiv, Ghost, and ConvertKit
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                All four platforms process paid subscriptions through Stripe. By connecting directly to your Stripe account, ChurnRecovery intercepts cancellation events regardless of which newsletter tool your subscribers are using — completely outside the platform&apos;s ecosystem.
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
                Everything to Protect Your Newsletter Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Give subscribers the option to pause instead of cancel. Many readers leave during a busy stretch — not because they don&apos;t value your work."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a 20% discount or 1 month free to at-risk subscribers. Keeping them at a discount is far better than losing them permanently."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out why subscribers leave with a quick 1-question survey. Use the answers to improve your content, frequency, and pricing strategy."
              />
              <BenefitCard
                icon="📊"
                title="Dashboard Insights"
                description="Track how much MRR you&apos;ve saved, which offers convert best, and your overall recovery rate — all in one clean dashboard."
              />
              <BenefitCard
                icon="🆓"
                title="$20/month — Flat"
                description="30-day free trial, then $20/month. All features included — no per-subscriber fees, no percentage of revenue. Cancel anytime."
              />
              <BenefitCard
                icon="🌐"
                title="Works Across All Newsletter Platforms"
                description="One integration covers Substack, beehiiv, Ghost, ConvertKit, and any other platform that uses Stripe. Switch platforms without re-configuring anything."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Less Than One Subscriber&apos;s Monthly Fee
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              ChurnRecovery costs $20/month — flat. If you recover even one $10/month subscriber per month, it pays for itself twice over. Most creators recover dozens.
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
              Newsletter platforms charge you nothing extra — because they offer zero churn tools. ChurnRecovery is just $20/month and pays for itself the first time you save a subscriber.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Newsletter Creators
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Substack?',
                a: "Yes. Substack processes paid subscriptions through Stripe. ChurnRecovery connects to your Stripe account directly and listens for cancellation events. No Substack API access, no Substack approval — it works entirely at the Stripe level.",
              },
              {
                q: 'Does this work with beehiiv?',
                a: "Yes. beehiiv's paid subscription feature uses Stripe for payment processing. Connect your Stripe account to ChurnRecovery and it will intercept cancellations from beehiiv paid subscribers automatically.",
              },
              {
                q: 'Does this work with Ghost?',
                a: "Yes. Ghost memberships and paid subscriptions run on Stripe. ChurnRecovery connects directly to Stripe — so it works with Ghost whether you&apos;re on Ghost.org or self-hosted.",
              },
              {
                q: 'Does this work with ConvertKit (Kit)?',
                a: "Yes. ConvertKit's paid newsletter and community features use Stripe for billing. ChurnRecovery hooks into Stripe and catches cancellation events regardless of which platform initiated the subscription.",
              },
              {
                q: 'Will my subscribers see third-party branding?',
                a: "No. Your cancel flow is fully branded with your newsletter name, your message, and your tone. Subscribers see a message from you — not from ChurnRecovery. We stay invisible.",
              },
              {
                q: 'Do I need developer help to set this up?',
                a: "Not at all. If you can copy-paste a URL and click a few buttons, you can set this up in under 10 minutes. We have step-by-step guides with screenshots for Substack, beehiiv, Ghost, and ConvertKit.",
              },
              {
                q: "What if a subscriber still cancels after seeing the offer?",
                a: "That&apos;s fine. If they want to leave, they leave. You still capture their exit survey response — which is more than you had before. And 20–35% of people who see a well-crafted offer will reconsider.",
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
                href="/posts/newsletter-creator-guide-reducing-churn"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  The Newsletter Creator&apos;s Guide to Reducing Churn
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Tactics for paid newsletter creators to retain more subscribers
                </div>
              </a>
              <a
                href="/posts/ghost-vs-substack-vs-beehiiv-paid-subscribers"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Ghost vs Substack vs beehiiv: Which Platform Loses Fewer Paid Subscribers?
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  A deep comparison of how the major newsletter platforms handle paid subscriber churn
                </div>
              </a>
              <a
                href="/posts/newsletter-creator-case-study-saved-3600-year"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Case Study: How One Newsletter Creator Saved $3,600/Year
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Real numbers from a creator who added a cancel flow to their paid newsletter
                </div>
              </a>
              <a
                href="/posts/cancellation-emails-that-win-back-subscribers"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Cancellation Emails That Win Back Subscribers
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Copy-and-paste email templates for winning back cancelled newsletter subscribers
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Paid Subscriber Is About to Cancel.<br />
              <span className="text-[#F5C842]">Will You Be Ready?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your free trial. Protect your newsletter revenue with automated churn recovery. $20/month after 30 days — works with Substack, beehiiv, Ghost, and ConvertKit.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-newsletters" dark={true} />
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
