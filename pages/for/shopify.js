import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'

// ─── Pain card ──────────────────────────────────────────────────────────────
function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6 border-t-[3px] border-t-[#96BF48]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] m-0 mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-sans font-extrabold text-[2rem] text-[#6B8E23] my-1">
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-sans text-[0.8rem] text-[#5A7A1E] mb-2">
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
        <div className="w-12 h-12 rounded-full bg-[rgba(150,191,72,0.15)] border-2 border-[#96BF48] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#6B8E23] shrink-0">
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
        <div className="bg-[rgba(150,191,72,0.1)] border border-[rgba(150,191,72,0.3)] rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-[#5A7A1E]">
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
        <span className="text-[#96BF48] text-[1.2rem] font-bold shrink-0">
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
export default function ShopifyLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Shopify Subscriptions — Keep Subscribers, Not Just Customers | ChurnRecovery</title>
        <meta name="description" content="Shopify subscription businesses lose 8-12% of subscribers monthly. Whether you use ReCharge, Bold, or Skio — ChurnRecovery intercepts cancellations at the payment layer with pause offers, skip options, and exit surveys. $20/month flat." />
        <link rel="canonical" href="https://churnrecovery.com/for/shopify" />
        <meta property="og:title" content="Churn Recovery for Shopify Subscriptions | ChurnRecovery" />
        <meta property="og:description" content="Subscription boxes, replenishment products, membership access — all vulnerable to silent cancellations. ChurnRecovery intercepts at Stripe before subscribers disappear." />
        <meta property="og:url" content="https://churnrecovery.com/for/shopify" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Shopify Subscriptions" />
        <meta name="twitter:description" content="Shopify subscription apps lose 8-12% of subscribers monthly. ChurnRecovery adds cancel flows at the Stripe level. $20/month flat." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A2600_0%,#2D4000_50%,#1A2600_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(150,191,72,0.2)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(150,191,72,0.2)] border border-[rgba(150,191,72,0.4)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#C4E87A] mb-[28px]">
              <span>✓</span> 30-Day Free Trial · No Credit Card Required
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Shopify Subscribers Cancel Silently.<br />
              <span className="text-[#C4E87A]">You Lose 8&ndash;12% Every Month.</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Whether you sell subscription boxes, replenishment products, or membership access through Shopify &mdash; your subscription app (ReCharge, Bold, Skio) has no real cancel flow. Subscribers click cancel and they&apos;re gone. ChurnRecovery intercepts at the payment layer and gives you a chance to save them.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-shopify" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                Works with ReCharge, Bold, Skio & more
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                No Shopify store modifications needed
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
              <div className="font-sans text-[0.75rem] font-bold text-[#5A7A1E] uppercase tracking-[0.08em] mb-3">
                The Subscription Revenue Leak
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Your Shopify Subscription App Has<br />No Real Retention Flow
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[560px] mx-auto leading-[1.7]">
                ReCharge, Bold, Skio &mdash; they&apos;re great at billing. But when it comes to keeping subscribers? The cancel button does exactly what it says. No pause, no offer, no data.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="📉"
                title="Brutal Monthly Churn"
                stat="8–12%"
                statLabel="of Shopify subscribers cancel monthly"
                description="Subscription businesses on Shopify see some of the highest churn rates in e-commerce. A 500-subscriber business at $35/month losing 10% is hemorrhaging $1,750 every month — $21,000 per year."
              />
              <PainCard
                icon="📦"
                title="The 'Novelty Cliff'"
                description="Subscription box customers are most likely to cancel after month 3-4 when the novelty wears off. Without a cancel flow, they hit the cancel button and disappear — right when a simple 'skip a month' offer would save them."
              />
              <PainCard
                icon="🔄"
                title="Failed Payments Go Unrecovered"
                description="Up to 9% of subscription payments fail due to expired cards, insufficient funds, or bank declines. Most Shopify subscription apps send a basic email at best. Without proper dunning, these involuntary cancellations pile up silently."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#6B8E23] uppercase tracking-[0.08em] mb-3">
                Payment-Layer Integration
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Works With Any Shopify Subscription App
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[520px] mx-auto leading-[1.7]">
                Most Shopify subscription apps use Stripe under the hood. ChurnRecovery connects to Stripe and intercepts cancellations before they finalize. For stores using other processors, add a small JS snippet.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Stripe (or Add a JS Snippet)"
                description="If your Shopify subscription app uses Stripe (ReCharge, Bold, Skio, and most others do), connect in one click. For other payment processors, paste a lightweight JavaScript snippet into your Shopify theme — takes 2 minutes."
                callout="✓ Works with ReCharge, Bold Subscriptions, Skio, Ordergroove, and more"
              />
              <HowStep
                number="2"
                icon="🛡"
                title="Every Cancellation Gets Intercepted"
                description="When a subscriber hits 'Cancel Subscription' in their account portal, ChurnRecovery catches the event at the payment layer. Before the cancellation processes, your custom retention flow fires automatically."
              />
              <HowStep
                number="3"
                icon="📦"
                title="Subscribers See Subscription-Specific Offers"
                description="Offer to skip the next shipment, switch to every-other-month, apply a discount, or add a bonus item. These offers are designed for subscription commerce — not generic 'are you sure?' prompts."
                callout="Skip-a-month is the #1 retention tool for subscription businesses"
              />
            </div>

            <div className="mt-8 bg-[rgba(150,191,72,0.08)] border border-[rgba(150,191,72,0.3)] border-l-4 border-l-[#96BF48] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Do I need to modify my Shopify store?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                If you use Stripe: No. One-click OAuth connection and you&apos;re done. If you use a different payment processor: just add a small JavaScript snippet to your Shopify theme. No app installation needed, no changes to your product pages or checkout flow.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#6B8E23] no-underline font-semibold">
                Technical integration docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[rgba(150,191,72,0.12)] border border-[rgba(150,191,72,0.35)] rounded-[10px] py-3.5 px-7 font-sans font-bold text-[#6B8E23] no-underline text-[0.95rem]">
                Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999999] mt-2">
                See a subscription cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: BENEFITS ─────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#6B8E23] uppercase tracking-[0.08em] mb-3">
                What You Get
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Built for Subscription Commerce
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏭"
                title="Skip-a-Month Option"
                description="The most effective retention tool in subscription commerce. When subscribers want to cancel because they have 'too much product,' let them skip the next shipment instead of leaving entirely."
              />
              <BenefitCard
                icon="⏸"
                title="Pause Subscriptions"
                description="Let subscribers pause for 30, 60, or 90 days. Perfect for seasonal products or when customers need a breather. They stay on your list and resume automatically."
              />
              <BenefitCard
                icon="🏷"
                title="Discount & Bonus Offers"
                description="Offer a percentage off the next box, a free bonus item, or free shipping. Customizable per product, per plan, or per cancellation reason."
              />
              <BenefitCard
                icon="📋"
                title="Exit Surveys"
                description="'Too much product,' 'Too expensive,' 'Quality declined' — know exactly why subscribers leave so you can fix the root cause. Data drives better products."
              />
              <BenefitCard
                icon="💳"
                title="Failed Payment Recovery"
                description="Automated dunning sequences for expired cards, insufficient funds, and bank declines. Recover the involuntary churn that's quietly eating your subscriber count."
              />
              <BenefitCard
                icon="💰"
                title="$20/month — Flat"
                description="One price for everything. No per-subscriber fees, no percentage of recovered revenue. $20/month after your 30-day free trial. Recover one subscriber and it's paid for."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Costs Less Than a Single Subscription Box
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              Most Shopify subscription products cost $25&ndash;$50/month. ChurnRecovery is $20/month and typically saves 3&ndash;10 subscribers in the first month. That&apos;s $75&ndash;$500 in recovered revenue for $20.
            </p>

            <div className="bg-[rgba(150,191,72,0.08)] border-2 border-[#96BF48] rounded-xl p-8 mb-7">
              <div className="font-sans text-[0.85rem] font-bold text-[#6B8E23] uppercase tracking-[0.08em] mb-2">
                One Plan. Everything Included.
              </div>
              <div className="font-sans font-extrabold text-[3rem] text-[#191919] my-2">
                $20<span className="text-[1.2rem] font-bold text-[#666666]">/month</span>
              </div>
              <div className="font-serif text-[0.95rem] text-[#666666] mb-4">
                30-day free trial, then $20/month
              </div>
              <ul className="text-left max-w-[360px] mx-auto mb-6 list-none p-0">
                {['Cancel flows with skip, pause & discount', 'Exit surveys on every cancellation', 'Failed payment recovery (dunning)', 'Retention analytics dashboard', 'Unlimited subscribers tracked', 'Works with any Shopify subscription app'].map(item => (
                  <li key={item} className="font-sans text-[0.88rem] text-[#444444] py-1.5 flex gap-2 items-start">
                    <span className="text-[#6B8E23] shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="max-w-[320px] mx-auto">
                <SignUpCTA source="for-shopify-pricing" />
              </div>
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              A $35/month subscription box business with 300 subscribers losing 12% churn = $15,120/year lost. ChurnRecovery costs $240/year and typically recovers 20&ndash;35% of those cancellations.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Shopify Subscription Businesses
              </h2>
            </div>

            {[
              {
                q: 'Does this work with ReCharge?',
                a: "Yes. ReCharge processes subscription payments through Stripe. ChurnRecovery connects to your Stripe account and intercepts cancellation events from ReCharge subscriptions. No ReCharge API access or configuration needed.",
              },
              {
                q: 'Does this work with Bold Subscriptions?',
                a: "Yes. Bold Subscriptions also uses Stripe for payment processing. ChurnRecovery operates at the Stripe level, so it works with Bold the same way it works with any Stripe-based subscription app.",
              },
              {
                q: 'Do I need to modify my Shopify store?',
                a: "If your subscription app uses Stripe (most do): No modifications needed at all. Just connect your Stripe account. If you use a different payment processor, you'll paste a small JavaScript snippet into your Shopify theme — takes 2 minutes, no coding knowledge required.",
              },
              {
                q: 'Can I offer skip-a-month as a retention option?',
                a: "Yes — and we highly recommend it. Skip-a-month is the single most effective retention tool for subscription businesses. Subscribers who 'have too much product' aren't unhappy — they just need a break. Skipping keeps them subscribed.",
              },
              {
                q: 'What about failed payment recovery?',
                a: "ChurnRecovery includes automated dunning for failed payments. When a subscriber's card declines, we send a sequence of recovery emails prompting them to update their payment method — before the subscription lapses.",
              },
              {
                q: 'Will this conflict with my existing Shopify apps?',
                a: "No. ChurnRecovery operates at the payment (Stripe) layer, not inside your Shopify admin. It doesn't install as a Shopify app and doesn't interact with your other apps. It's completely independent.",
              },
              {
                q: 'How much does it cost?',
                a: "$20/month flat after a 30-day free trial. No credit card required to start. No per-subscriber fees, no percentage of recovered revenue. If it doesn't save you more than $20/month, cancel anytime.",
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
                  The complete guide to cancel flows for subscription businesses
                </div>
              </a>
              <a
                href="/posts/reduce-churn-subscription-box"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  How to Reduce Churn for Subscription Box Businesses
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Skip offers, pause periods, and other tactics that actually work
                </div>
              </a>
              <a
                href="/posts/failed-payment-recovery-guide"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  The Complete Guide to Failed Payment Recovery
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  How to recover involuntary churn from expired cards and declined payments
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A2600_0%,#2D4000_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              Another Subscriber Just Hit &ldquo;Cancel.&rdquo;<br />
              <span className="text-[#C4E87A]">What If They Saw a Better Option?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your 30-day free trial. Add cancel flows with skip, pause, and discount offers to your Shopify subscriptions. No credit card required. No store modifications.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-shopify-bottom" dark={true} />
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
