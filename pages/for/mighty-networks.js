import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'

// ─── Pain card ──────────────────────────────────────────────────────────────
function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6 border-t-[3px] border-t-[#004AAD]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] m-0 mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-sans font-extrabold text-[2rem] text-[#004AAD] my-1">
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-sans text-[0.8rem] text-[#003580] mb-2">
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
        <div className="w-12 h-12 rounded-full bg-[rgba(0,74,173,0.1)] border-2 border-[#004AAD] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#004AAD] shrink-0">
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
        <div className="bg-[rgba(0,74,173,0.08)] border border-[rgba(0,74,173,0.25)] rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-[#003580]">
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
        <span className="text-[#004AAD] text-[1.2rem] font-bold shrink-0">
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
export default function MightyNetworksLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Mighty Networks — Stop Losing Community Members | ChurnRecovery</title>
        <meta name="description" content="Mighty Networks communities lose 5-10% of members monthly with no built-in cancel flow. ChurnRecovery connects to your Stripe account and intercepts cancellations before members disappear. $20/month flat." />
        <link rel="canonical" href="https://churnrecovery.com/for/mighty-networks" />
        <meta property="og:title" content="Churn Recovery for Mighty Networks — Stop Losing Community Members | ChurnRecovery" />
        <meta property="og:description" content="Mighty Networks uses Stripe for payments. ChurnRecovery intercepts cancellations at the Stripe level — no Mighty Networks API needed. Offer pauses, discounts, and exit surveys." />
        <meta property="og:url" content="https://churnrecovery.com/for/mighty-networks" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Mighty Networks — Stop Losing Community Members" />
        <meta name="twitter:description" content="Members click 'Leave Community' and they're gone instantly. ChurnRecovery intercepts at Stripe before it finalizes. $20/month flat." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#001A3D_0%,#002A6B_50%,#001A3D_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          {/* Mighty Networks blue glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,74,173,0.2)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(0,74,173,0.2)] border border-[rgba(0,74,173,0.4)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#6DB3F2] mb-[28px]">
              <span>✓</span> 30-Day Free Trial · No Credit Card Required
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Stop Losing Mighty Networks Members<br />
              <span className="text-[#6DB3F2]">Before You Even Know They Left</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Mighty Networks communities lose 5&ndash;10% of paid members every month. When someone clicks &ldquo;Leave Community,&rdquo; they&apos;re gone instantly. You find out in a Stripe email days later. ChurnRecovery intercepts that cancellation at Stripe &mdash; before it finalizes &mdash; and gives you a chance to save them.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-mighty-networks" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                Works via Stripe — no Mighty Networks API needed
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                Set up in under 10 minutes
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
              <div className="font-sans text-[0.75rem] font-bold text-[#003580] uppercase tracking-[0.08em] mb-3">
                The Silent Community Killer
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Members Leave Your Mighty Network<br />Without a Word
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Mighty Networks is great for building community &mdash; but it has zero protection against members walking out the door. There&apos;s no cancel flow, no intervention, no second chance.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="👻"
                title="Instant, Silent Departures"
                stat="5–10%"
                statLabel="of paid members vanish every month"
                description="There's no warning when a member cancels on Mighty Networks. They click 'Leave Community' and poof — they're gone. No cancel confirmation, no 'are you sure?' moment, no chance for you to intervene."
              />
              <PainCard
                icon="📧"
                title="You Find Out Too Late"
                description="Your first clue a member left? A Stripe email buried in your inbox, days after the fact. By then, the member has mentally moved on. The window to save them closed before you knew it was open."
              />
              <PainCard
                icon="🤷"
                title="Zero Insight Into Why"
                description="Was it the price? Did they feel disconnected? Were they overwhelmed by notifications? You'll never know. Mighty Networks doesn't ask departing members anything — so you can't fix what you can't measure."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#004AAD] uppercase tracking-[0.08em] mb-3">
                Works at the Stripe Level
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Connect Once. Recover Members Automatically.
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Mighty Networks uses Stripe for payments. ChurnRecovery connects to Stripe directly &mdash; no Mighty Networks API, no platform permission required.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect the Stripe account linked to your Mighty Network. One OAuth click — that's it. We listen for subscription cancellation events from Stripe, the same payment processor Mighty Networks uses behind the scenes."
                callout="✓ No Mighty Networks settings to change. No API keys to find."
              />
              <HowStep
                number="2"
                icon="🛡"
                title="Cancellations Get Intercepted"
                description="When a member initiates a cancellation through Mighty Networks, the event flows through Stripe. ChurnRecovery catches that Stripe event in real-time and triggers your custom retention flow before the subscription is finalized."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Members See Your Cancel Flow"
                description="Instead of an instant goodbye, members see a personalized message from you. Offer to pause their membership, give a discount for the next month, or simply ask why they're leaving. Set it once — it runs on every cancellation automatically."
                callout="Average recovery rate: 20–35% of cancelling members"
              />
            </div>

            {/* Technical callout */}
            <div className="mt-8 bg-[rgba(0,74,173,0.05)] border border-[rgba(0,74,173,0.25)] border-l-4 border-l-[#004AAD] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Do I need Mighty Networks&apos; permission?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                No. ChurnRecovery works entirely at the Stripe level. Mighty Networks uses Stripe to process your membership payments, and your Stripe account is yours. You have full control over it. Connecting ChurnRecovery is like adding fraud protection to your bank account &mdash; the bank doesn&apos;t need to approve it.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#004AAD] no-underline font-semibold">
                Technical integration docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[rgba(0,74,173,0.1)] border border-[rgba(0,74,173,0.3)] rounded-[10px] py-3.5 px-7 font-sans font-bold text-[#004AAD] no-underline text-[0.95rem]">
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
              <div className="font-sans text-[0.75rem] font-bold text-[#004AAD] uppercase tracking-[0.08em] mb-3">
                What You Get
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Everything to Protect Your Community Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Membership Offer"
                description="Members often leave during a busy season, not because they've lost interest. Give them the option to pause for 30, 60, or 90 days instead of cancelling permanently."
              />
              <BenefitCard
                icon="🏷"
                title="Discount to Stay"
                description="Automatically offer a percentage off or a free month to members who are about to cancel. Keeping a member at a discount is always better than losing them forever."
              />
              <BenefitCard
                icon="📋"
                title="Exit Surveys"
                description="Find out exactly why members leave with a quick 1-question survey. Use the data to improve your community, content schedule, and engagement strategy."
              />
              <BenefitCard
                icon="📊"
                title="Retention Analytics Dashboard"
                description="See how much revenue you've saved, which offers perform best, top cancellation reasons, and your recovery rate over time — all in a single dashboard."
              />
              <BenefitCard
                icon="💳"
                title="Failed Payment Recovery"
                description="Not all churn is voluntary. When a member's card declines, ChurnRecovery sends automated dunning emails to recover the payment before the subscription lapses."
              />
              <BenefitCard
                icon="💰"
                title="$20/month — Flat"
                description="One simple price. No tiers, no per-member fees, no surprises. $20/month after your 30-day free trial. ChurnRecovery pays for itself the first time you save a single member."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Simple Pricing. No Surprises.
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              Mighty Networks hosts can charge $39&ndash;$199+/month for their communities. Losing even a few members per month adds up fast. ChurnRecovery costs less than a single recovered member.
            </p>

            <div className="bg-[rgba(0,74,173,0.05)] border-2 border-[#004AAD] rounded-xl p-8 mb-7">
              <div className="font-sans text-[0.85rem] font-bold text-[#004AAD] uppercase tracking-[0.08em] mb-2">
                One Plan. Everything Included.
              </div>
              <div className="font-sans font-extrabold text-[3rem] text-[#191919] my-2">
                $20<span className="text-[1.2rem] font-bold text-[#666666]">/month</span>
              </div>
              <div className="font-serif text-[0.95rem] text-[#666666] mb-4">
                30-day free trial, then $20/month
              </div>
              <ul className="text-left max-w-[360px] mx-auto mb-6 list-none p-0">
                {['Cancel flows with pause & discount offers', 'Exit surveys on every cancellation', 'Failed payment recovery (dunning)', 'Retention analytics dashboard', 'Unlimited members tracked', 'Email support'].map(item => (
                  <li key={item} className="font-sans text-[0.88rem] text-[#444444] py-1.5 flex gap-2 items-start">
                    <span className="text-[#004AAD] shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="max-w-[320px] mx-auto">
                <SignUpCTA source="for-mighty-networks-pricing" />
              </div>
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              If you recover just one $49/month member, ChurnRecovery has paid for itself 2x over. Most hosts recover 3&ndash;5 members in the first month alone.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Mighty Networks Hosts
              </h2>
            </div>

            {[
              {
                q: 'Does ChurnRecovery work with Mighty Networks?',
                a: "Yes. Mighty Networks processes all paid membership payments through Stripe. ChurnRecovery connects to your Stripe account directly and listens for cancellation events. No Mighty Networks API access is needed — it works entirely at the Stripe payment level.",
              },
              {
                q: 'Do I need Mighty Networks\' permission to use this?',
                a: "No. Your Stripe account is yours, and ChurnRecovery connects to Stripe — not to Mighty Networks. You don't need any approval from Mighty Networks. Think of it like adding analytics to your Stripe account — it's your payment data, your choice.",
              },
              {
                q: 'What about free community members?',
                a: "ChurnRecovery only applies to paid subscriptions processed through Stripe. If someone is in your free tier and leaves, there's no Stripe event to intercept. This tool is designed for protecting your paid membership revenue.",
              },
              {
                q: 'How long does setup take?',
                a: "Under 10 minutes. You connect your Stripe account with one click, then configure your cancel flow (pause offer, discount amount, exit survey questions). We provide templates specifically designed for community hosts, so you don't start from scratch.",
              },
              {
                q: 'Will members see the cancel flow inside Mighty Networks?',
                a: "The cancel flow appears as an overlay or redirect when the cancellation event is triggered through Stripe. It's branded with your community name and your message — members feel like it's coming from you, not a third-party tool.",
              },
              {
                q: 'What if a member still wants to cancel after seeing the offer?',
                a: "They cancel. We never trap anyone. If they decline your pause or discount offer, their cancellation goes through as normal. But you still get their exit survey response — which is actionable data you never had before. And you've made the attempt, which 20–35% of people respond to positively.",
              },
              {
                q: 'Is $20/month really all it costs?',
                a: "Yes. $20/month flat after your 30-day free trial. No per-member fees, no tiers, no hidden costs. Cancel anytime. We keep it simple because your focus should be on your community, not on figuring out your churn recovery bill.",
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
                  The case for adding a cancel flow to any membership or community
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
                  Engagement tactics, retention strategies, and cancel flow best practices
                </div>
              </a>
              <a
                href="/posts/stripe-cancel-flow-setup"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  How to Set Up a Cancel Flow via Stripe (Step-by-Step)
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Works with any platform that uses Stripe for billing
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#001A3D_0%,#002A6B_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Community Member Is About to Leave.<br />
              <span className="text-[#6DB3F2]">Will You Have a Chance to Save Them?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your 30-day free trial. Protect your Mighty Networks community revenue with automated cancel flows, exit surveys, and failed payment recovery. No credit card required.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-mighty-networks-bottom" dark={true} />
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
