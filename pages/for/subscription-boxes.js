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
export default function SubscriptionBoxesLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing Subscription Box Customers Before They Cancel | ChurnRecovery</title>
        <meta name="description" content="Subscription box businesses run on thin margins — every lost subscriber hurts. ChurnRecovery intercepts cancellations via Stripe and Shopify, offering a skip, a discount, or an exit survey before they're gone. 30-day free trial, then $20/month." />
        <link rel="canonical" href="https://churnrecovery.com/for/subscription-boxes" />
        <meta property="og:title" content="Stop Losing Subscription Box Customers Before They Cancel | ChurnRecovery" />
        <meta property="og:description" content="Physical subscription businesses can't afford silent churn. ChurnRecovery connects to Stripe and Shopify to recover subscribers before they cancel — no code required." />
        <meta property="og:url" content="https://churnrecovery.com/for/subscription-boxes" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing Subscription Box Customers Before They Cancel" />
        <meta name="twitter:description" content="Thin margins mean you can't afford silent churn. ChurnRecovery plugs into Stripe and Shopify to intercept cancellations — no code, no waiting." />
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
              Your Subscribers Cancel Silently.<br />
              <span className="text-[#F5C842]">Your Margins Can&apos;t Afford That.</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Subscription box businesses already have thin margins — you&apos;ve bought the inventory, packed the box, and lined up fulfillment. When a subscriber cancels without warning, that revenue is gone and the box is still on its way. ChurnRecovery intercepts cancellations via Stripe and Shopify before they&apos;re final, so you can offer a skip, a discount, or ask why they&apos;re leaving.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-subscription-boxes" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 30-day free trial — works with Shopify &amp; Stripe
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
                Every Subscription Box Cancellation =<br />Wasted Inventory and Lost Revenue
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Physical subscriptions are harder to run than digital ones — higher costs, more logistics, thinner margins. When a subscriber cancels without warning, you often lose money on that final box. Yet most subscription box businesses have no protection at the cancel screen.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="📦"
                title="Failed Payments Waste Inventory"
                stat="5–10%"
                statLabel="of subscription box revenue lost to failed payments monthly"
                description="You&apos;ve already sourced the products, packed the box, and arranged fulfillment — then the card declines. Without automated failed payment recovery, that box ships at a loss or sits in your warehouse."
              />
              <PainCard
                icon="📉"
                title="High Churn in Physical Subscriptions"
                description="Physical subscription boxes churn faster than digital products. Subscribers cancel after a bad box, a price increase, or simply when life gets busy. Without a cancel flow, there&apos;s no chance to win them back."
              />
              <PainCard
                icon="🚪"
                title="No Intervention Before Cancel"
                description="Right now, a subscriber can hit &quot;Cancel Subscription&quot; and walk out in seconds. No offer to skip a month. No discount. No &quot;wait, here&apos;s what&apos;s coming next box.&quot; Just a silent cancellation you find out about later."
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
                Works With Shopify and Stripe in Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Most subscription box platforms — Shopify, ReCharge, Bold Subscriptions — run billing through Stripe. ChurnRecovery connects to Stripe directly. No new platform, no developer, no waiting.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. Whether you use Shopify Subscriptions, ReCharge, or direct Stripe billing, we listen for cancellation signals at the payment layer."
                callout="✓ Works with Shopify, ReCharge, Bold, and direct Stripe billing."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a subscriber initiates a cancellation, ChurnRecovery fires before it&apos;s final. We intercept the Stripe cancellation event and trigger your custom recovery flow — automatically, every time."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Message — Automated"
                description="Subscribers see a personalized message: skip this month, get 20% off their next box, or a quick survey asking why they&apos;re leaving. Set it up once. It runs in the background forever."
                callout="🎯 Average recovery rate: 20–35% of at-risk subscribers"
              />
            </div>

            {/* Technical callout */}
            <div className="mt-8 bg-[rgba(232,160,0,0.05)] border border-[rgba(232,160,0,0.25)] border-l-4 border-l-[#E8A000] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does this work with my Shopify subscription app?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                Yes — if your subscriptions are billed through Stripe (which most Shopify subscription apps use), ChurnRecovery connects at the Stripe level. That means ReCharge, Bold Subscriptions, Shopify Subscriptions, and most other apps are all supported. No app store installation required.
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
                Everything to Protect Your Subscription Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏭"
                title="Skip-a-Month Offer"
                description="Give subscribers the option to skip their next box instead of cancelling outright. It&apos;s the most powerful retention tool for physical subscriptions — many people cancel during busy or tight months, not because they dislike your product."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a discount on the next box to at-risk subscribers. Even a small price reduction keeps them in your pipeline — and a long-term subscriber is worth far more than a one-time saving."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out exactly why subscribers leave — bad box, price, too much stuff, changed interests. Exit survey data from real cancellations is the most valuable product feedback you can collect."
              />
              <BenefitCard
                icon="📊"
                title="Recovery Dashboard"
                description="Track saved revenue, recovery rates by offer type, and common cancellation reasons — all in one place. Know exactly how much ChurnRecovery is earning you each month."
              />
              <BenefitCard
                icon="🆓"
                title="$20/Month — Flat"
                description="30-day free trial, then $20/month. All features included — no per-subscriber fees, no percentage of recovered revenue. For thin-margin businesses, a flat fee matters."
              />
              <BenefitCard
                icon="🛒"
                title="Works With Shopify and Stripe"
                description="Compatible with Shopify Subscriptions, ReCharge, Bold Subscriptions, and any subscription tool that processes payments through Stripe. No new platform to learn."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              $20/Month Pays for Itself With One Saved Subscriber
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              Subscription box businesses run on thin margins. A flat $20/month fee means you keep everything you recover. Save one subscriber at $39/month and ChurnRecovery has already paid for itself — twice over.
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
              Unlike percentage-based tools that take a cut of your recovered revenue, ChurnRecovery charges a flat $20/month. On thin subscription box margins, that difference adds up fast.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Subscription Box Operators
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Shopify subscriptions?',
                a: "Yes. If your Shopify subscription app processes payments through Stripe — which includes ReCharge, Bold Subscriptions, Shopify Subscriptions, and most others — ChurnRecovery connects at the Stripe level and intercepts cancellations automatically. No Shopify app installation needed.",
              },
              {
                q: 'What about failed payment recovery?',
                a: "ChurnRecovery helps with voluntary cancellations — when a subscriber actively chooses to cancel. For failed payments (involuntary churn), Stripe's built-in Smart Retries handle automatic retries, and ChurnRecovery's dashboard helps you monitor recovery rates across both types.",
              },
              {
                q: 'Can I offer a skip instead of a discount?',
                a: "Absolutely. For subscription boxes, the skip-a-month offer is often more effective than a discount — it keeps the subscriber in your pipeline without cutting into already-thin margins. You can configure which offers appear and in what order.",
              },
              {
                q: 'Do I need a developer to set this up?',
                a: "No. Setup takes about 5–10 minutes and requires no code. You connect your Stripe account, customize your cancel flow message and offers, and you&apos;re live. We have step-by-step guides with screenshots for every common subscription platform.",
              },
              {
                q: 'What if my subscription box is lower-priced?',
                a: "Even at $25–$35/month price points, recovering 2–3 subscribers per month more than covers the $20/month ChurnRecovery fee. And the exit survey data you collect is valuable regardless of price point — it tells you which boxes or themes are driving cancellations.",
              },
              {
                q: 'Can I customize the cancel flow for my brand?',
                a: "Completely. Your message, your tone, your offer. Subscription box customers respond best to copy that feels personal and specific to your box — we give you full control over every word, plus templates designed for physical subscription businesses.",
              },
              {
                q: "What if they still cancel after seeing the offer?",
                a: "That&apos;s fine — if they want to leave, they leave. But you still capture their exit survey response, which is real product feedback you can act on. And 20–35% of subscribers who see a recovery offer choose to stay or pause, which is revenue you would have lost with no cancel flow at all.",
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
                href="/posts/Involuntary-Churn-Recovery"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Involuntary Churn Recovery: Failed Payments and What to Do
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  How to recover revenue lost to declined cards and expired payment methods
                </div>
              </a>
              <a
                href="/posts/subscription-business-leaking-revenue-every-month"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Is Your Subscription Business Leaking Revenue Every Month?
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  The silent ways subscription businesses lose money without realizing it
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
              A Subscriber Is About to Cancel.<br />
              <span className="text-[#F5C842]">The Box Is Already Packed.</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your free trial today. Protect your subscription box revenue with automated churn recovery that works with Shopify and Stripe. $20/month after 30 days — flat fee, no percentage cuts.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-subscription-boxes" dark={true} />
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
