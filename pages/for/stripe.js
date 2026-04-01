import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'
import { buildFAQSchema } from '../../lib/faq-schema'

function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl px-6 py-7 border-t-[3px] border-t-[#635BFF]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] m-0 mb-2">{title}</h3>
      {stat && <div className="font-sans font-extrabold text-[2rem] text-[#635BFF] my-1">{stat}</div>}
      {statLabel && <div className="font-sans text-[0.8rem] text-[#666666] mb-2">{statLabel}</div>}
      <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-relaxed">{description}</p>
    </div>
  )
}

function HowStep({ number, icon, title, description, callout }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl px-6 py-7">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-[rgba(99,91,255,0.1)] border-2 border-[#635BFF] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#635BFF] shrink-0">{number}</div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-sans text-[1.05rem] font-bold text-[#191919] m-0">{title}</h3>
        </div>
      </div>
      <p className="font-serif text-[0.9rem] text-[#666666] mt-0 mb-3 leading-[1.7]">{description}</p>
      {callout && <div className="bg-[rgba(99,91,255,0.06)] border border-[rgba(99,91,255,0.2)] rounded-lg px-[14px] py-[10px] font-sans text-[0.8rem] text-[#635BFF]">{callout}</div>}
    </div>
  )
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="flex gap-[14px] items-start bg-white border border-[#E5E5E5] rounded-[10px] p-5">
      <span className="text-[1.4rem] shrink-0">{icon}</span>
      <div>
        <h4 className="font-sans text-[0.92rem] font-bold text-[#191919] m-0 mb-1">{title}</h4>
        <p className="font-serif text-[0.82rem] text-[#666666] m-0 leading-[1.55]">{description}</p>
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden mb-2">
      <button onClick={() => setOpen(!open)} className="w-full bg-white border-none cursor-pointer px-5 py-4 flex justify-between items-center gap-3 text-left">
        <span className="font-sans font-semibold text-[0.93rem] text-[#191919]">{q}</span>
        <span className="text-[#635BFF] text-[1.2rem] font-bold shrink-0">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 bg-[#F5F4FF]">
          <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-[1.7]">{a}</p>
        </div>
      )}
    </div>
  )
}

const faqs = [
  { q: 'Does Stripe have a built-in cancel flow?', a: "No. Stripe's Customer Portal allows subscribers to cancel their subscription in a few clicks, but there's no mechanism to show them an offer, ask why they're leaving, or give them a pause option. The cancellation is processed immediately. ChurnRecovery adds that missing layer." },
  { q: 'How does ChurnRecovery connect to Stripe?', a: "ChurnRecovery uses Stripe's official webhook API to listen for subscription cancellation events. When we detect one, we trigger your cancel flow before the cancellation is finalized. The integration uses official Stripe OAuth — the same mechanism used by thousands of Stripe-compatible apps. Your Stripe credentials are never stored on our servers." },
  { q: 'Will this break my existing Stripe setup?', a: "No. ChurnRecovery is additive — it adds a layer on top of your existing Stripe configuration without changing anything. Your billing, invoicing, and subscription management all work exactly as before. The only change is that subscribers see your cancel flow when they try to cancel." },
  { q: 'What if I use Stripe with a platform like Kajabi, Ghost, or Teachable?', a: "ChurnRecovery works with Stripe regardless of what platform sits on top. If your subscriptions process through Stripe — whether directly or through a platform that uses Stripe — we can integrate with them. See our dedicated pages for Kajabi, Ghost, Teachable, and other platforms." },
  { q: "Can I customize the cancel flow message and offers?", a: "Completely. Your cancel flow can have your brand name, your voice, and your exact offer. You choose whether to show a pause option, a discount, a survey, or a combination. We provide templates, but you can edit every word. Your subscribers will feel like they're hearing from you." },
  { q: 'What happens if a subscriber declines my offer?', a: "They complete the cancellation normally. ChurnRecovery doesn't block cancellations — it gives you a chance to save the subscription first. If they still want to leave, they leave. But you get their exit survey response, which tells you why — and that's data Stripe never gives you." },
  { q: 'How much does ChurnRecovery cost?', a: "$20/month with a 30-day free trial. No credit card required to start. No per-subscriber fees, no per-recovery fees. All features included. Cancel anytime." },
  { q: "Does this work for B2B Stripe subscriptions?", a: "Yes. ChurnRecovery works for any Stripe subscription — B2B, B2C, monthly, annual, or usage-based. The cancel flow experience can be customized for your audience: a B2B tool might offer a call with your team instead of a discount, while a B2C product might lead with a pause offer." },
]

export default function StripeLandingPage() {
  return (
    <>
      <Head>
        <title>Stripe Cancel Flow & Churn Recovery | ChurnRecovery</title>
        <meta name="description" content="Stripe processes your payments — but it doesn't save them. ChurnRecovery adds a cancel flow to your Stripe subscriptions in 10 minutes. Pause offers, discounts, exit surveys. $20/month flat." />
        <link rel="canonical" href="https://churnrecovery.com/for/stripe" />
        <meta property="og:title" content="Stripe Processes Payments. We Save Them. | ChurnRecovery" />
        <meta property="og:description" content="Stripe doesn't have a built-in cancel flow. When subscribers cancel, it happens instantly and silently. ChurnRecovery adds the missing layer: a cancel flow with pause offers, discounts, and exit surveys." />
        <meta property="og:url" content="https://churnrecovery.com/for/stripe" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stripe Cancel Flow & Churn Recovery | ChurnRecovery" />
        <meta name="twitter:description" content="Add a cancel flow to your Stripe subscriptions in 10 minutes. Pause offers, discounts, exit surveys. 20–35% of churning subscribers can be saved. $20/month flat, 30-day free trial." />
        <meta name="keywords" content="stripe churn recovery, stripe cancel flow, stripe subscription cancellations, churn recovery stripe, cancel flow stripe" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      </Head>

      <Header />

      <main className="font-sans bg-[#F5F4FF] pt-[60px]">

        {/* HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0D0C1A_0%,#1A1640_50%,#0D0C1A_100%)] pt-20 px-6 pb-[100px]">
          {/* Stripe purple glow */}
          <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(99,91,255,0.2)_0%,transparent_70%)]" />
          <div className="absolute -bottom-[80px] -left-[80px] w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(99,91,255,0.1)_0%,transparent_70%)]" />

          <div className="max-w-[760px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-[6px] bg-[rgba(99,91,255,0.2)] border border-[rgba(99,91,255,0.4)] rounded-full px-4 py-[6px] font-sans text-[0.78rem] font-semibold text-[#8B85FF] mb-7">
              <span>⚡</span> Built for Stripe subscriptions · $20/month flat
            </div>

            <h1 className="font-sans font-extrabold text-white m-0 mb-6 leading-[1.1] tracking-[-0.03em] text-[clamp(2.4rem,6vw,4rem)]">
              Stripe Processes Payments.<br />
              <span className="text-[#8B85FF]">We Save Them.</span>
            </h1>

            <p className="font-serif text-[rgba(255,255,255,0.72)] m-0 mb-4 leading-[1.7] max-w-[620px] mx-auto text-[clamp(1rem,2.5vw,1.25rem)]">
              Stripe is the best payment processor in the world. But when a subscriber decides to cancel, Stripe just processes it — silently, instantly, with no way for you to intervene. ChurnRecovery adds the missing piece: a cancel flow that intercepts cancellations before they&apos;re final.
            </p>

            <p className="font-sans text-[1.05rem] text-[rgba(255,255,255,0.5)] m-0 mb-10 italic">
              Pause offers. Discounts. Exit surveys. Set up in 10 minutes.
            </p>

            <div className="max-w-[500px] mx-auto mb-7">
              <SignUpCTA source="for-stripe" dark={true} />
            </div>

            <div className="flex gap-6 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.45)]">💳 $20/month flat</span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.45)]">⚡ 10-minute setup</span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.45)]">🎯 20–35% save rate</span>
            </div>

            <div className="mt-6">
              <Link href="/demo" className="font-sans text-[0.9rem] text-[rgba(255,255,255,0.5)] no-underline border-b border-[rgba(255,255,255,0.2)]">
                See a live Stripe cancel flow ↓
              </Link>
            </div>
          </div>
        </section>

        {/* STRIPE'S BLIND SPOT */}
        <section className="py-20 px-6 bg-[#F5F4FF]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#635BFF] uppercase tracking-[0.08em] mb-3">Stripe&apos;s Blind Spot</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.6rem)]">
                Stripe Is World-Class at Payments.<br />
                It Has Zero Churn Recovery Tools.
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[580px] mx-auto leading-[1.7]">
                Stripe&apos;s Customer Portal lets subscribers cancel their subscription in two clicks. There&apos;s no pause offer. No discount. No &quot;are you sure?&quot; You just get a cancellation notification — and the revenue is gone.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard icon="🔕" title="Silent Cancellations" stat="100%" statLabel="of Stripe cancellations go uncontested" description="When a subscriber cancels through Stripe's Customer Portal, it's processed immediately with no friction, no offer, and no opportunity for you to step in. Stripe sends you an email after the fact." />
              <PainCard icon="🚪" title="No Built-In Retention Layer" description="Stripe has dunning for failed payments, but nothing for voluntary cancellations. There's no way to show a pause offer, a discount, or even a survey inside the default Stripe cancel flow — without a third-party tool." />
              <PainCard icon="📉" title="Voluntary Churn Is Killing Your MRR" stat="3–8%" statLabel="monthly voluntary churn for most subscription businesses" description="For every 100 subscribers, 3–8 cancel each month by choice — not because their card failed. Without a cancel flow, every single one of them walks out the door unopposed." />
            </div>

            {/* The math */}
            <div className="mt-10 bg-white border border-[#E5E5E5] rounded-2xl p-8 max-w-[680px] mx-auto">
              <h3 className="font-sans font-extrabold text-[1.2rem] text-[#191919] m-0 mb-5 tracking-[-0.01em]">
                The Math on Stripe Churn
              </h3>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
                {[
                  { label: '100 subscribers', sub: 'at $49/month' },
                  { label: '5 cancel/month', sub: '5% monthly churn' },
                  { label: '$2,940/year', sub: 'lost revenue' },
                  { label: '2 saved/month', sub: 'with 40% save rate' },
                  { label: '$1,176/year', sub: 'revenue recovered' },
                ].map(({ label, sub }) => (
                  <div key={label} className="text-center p-4 bg-[#F5F4FF] rounded-[10px]">
                    <div className="font-sans font-extrabold text-[1.1rem] text-[#635BFF]">{label}</div>
                    <div className="font-serif text-[0.78rem] text-[#666666] mt-1">{sub}</div>
                  </div>
                ))}
              </div>
              <p className="font-serif text-sm text-[#666666] mt-4 mb-0 leading-relaxed text-center">
                A cancel flow that saves 2 subscribers per month at $49 adds <strong>$1,176/year</strong> back to your business — from something that runs automatically.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#635BFF] uppercase tracking-[0.08em] mb-3">The Missing Layer for Stripe</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                ChurnRecovery Plugs Into Stripe<br />in 3 Steps
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[520px] mx-auto leading-[1.7]">
                No code required. No developer needed. If you can connect an app and type a message, you can set this up in under 10 minutes.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep number="1" icon="🔗" title="Connect Your Stripe Account" description="Sign in with your Stripe credentials. ChurnRecovery gets read access to your subscription events. We listen for the moment a cancellation is triggered — nothing else." callout="✓ Read-only permissions. We never modify subscriptions without subscriber action." />
              <HowStep number="2" icon="⚡" title="We Intercept the Cancellation" description="The moment a subscriber initiates a cancellation through Stripe's Customer Portal or your product, ChurnRecovery fires before it's finalized. We show them your custom cancel flow — automatically, in real time." />
              <HowStep number="3" icon="🎯" title="Your Offer Saves the Subscription" description="The subscriber sees a pause option, a discount, or a quick exit survey. If they accept, the subscription is saved automatically. If they decline, they complete the cancellation. You win either way — you either keep them or learn why they left." callout="🎯 Average save rate: 20–35% of at-risk subscribers" />
            </div>

            {/* Technical note */}
            <div className="mt-8 bg-[rgba(99,91,255,0.04)] border border-[rgba(99,91,255,0.15)] border-l-4 border-l-[#635BFF] rounded-[10px] px-6 py-5 max-w-[720px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                How we integrate with Stripe (the non-technical version)
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] mt-0 mb-[10px] leading-[1.7]">
                Stripe sends &quot;webhook events&quot; when things happen in your account — like a subscription being canceled. ChurnRecovery registers as a webhook listener for those events. When a cancellation event fires, we intercept it and show your cancel flow before the cancellation is processed. This is the same mechanism Stripe uses for all its integrations — it&apos;s secure, standard, and doesn&apos;t require any changes to your Stripe setup.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#635BFF] no-underline font-semibold">
                Read the full technical integration docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[rgba(99,91,255,0.08)] border border-[rgba(99,91,255,0.25)] rounded-[10px] px-8 py-[14px] font-sans font-bold text-[#635BFF] no-underline text-base">
                🎮 Try the Interactive Demo — See a Live Stripe Cancel Flow
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999999] mt-2">No signup required. See exactly what your subscribers would see.</p>
            </div>
          </div>
        </section>

        {/* WHAT YOU CAN DO */}
        <section className="py-20 px-6 bg-[#F5F4FF]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#635BFF] uppercase tracking-[0.08em] mb-3">What ChurnRecovery Adds to Stripe</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Everything Stripe Doesn&apos;t Do
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[14px]">
              <BenefitCard icon="⏸" title="Pause Offer — The Subscription Lifeline" description="Most people who cancel during a busy month would have stayed if you'd offered a pause. A 1–3 month pause costs you nothing and saves a subscriber who'll return." />
              <BenefitCard icon="🏷" title="Discount Offer — For Price-Sensitive Subscribers" description="Automatically offer 20–30% off to subscribers who are leaving over price. Keeping them at a discount is worth more than losing them completely." />
              <BenefitCard icon="📋" title="Exit Survey — Learn Why People Leave" description="A one-question survey at the cancel screen tells you what Stripe never will: why subscribers are actually leaving. Use that data to improve your product and reduce future churn." />
              <BenefitCard icon="📊" title="Churn Recovery Dashboard" description="Track exactly how much revenue you've saved, which offers work best, and your overall churn recovery rate — in a clean dashboard built for subscription businesses." />
              <BenefitCard icon="🤖" title="Automatic — Runs While You Sleep" description="Set it up once and forget it. Every cancellation attempt triggers your cancel flow automatically, 24/7. No manual work, no chasing individual subscribers." />
              <BenefitCard icon="💳" title="$20/Month — No Hidden Costs" description="ChurnRecovery is $20/month flat. No per-subscriber fees, no percentage-of-revenue fee, no surprise bills. 30-day free trial to get started." />
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Who Uses ChurnRecovery with Stripe
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
              {[
                { icon: '📰', title: 'Newsletter Creators', desc: 'If you have a paid newsletter on Ghost, Beehiiv, or your own Stripe setup, ChurnRecovery catches cancellations before they happen.' },
                { icon: '🎓', title: 'Course & Membership Businesses', desc: 'Kajabi, Teachable, Thinkific — if your memberships run through Stripe, ChurnRecovery plugs in without touching your platform.' },
                { icon: '💼', title: 'SaaS Founders', desc: 'Even early-stage SaaS with 50–200 subscribers can benefit. Every saved subscriber at $49–$299/month adds up fast.' },
                { icon: '🧑‍🏫', title: 'Coaches & Consultants', desc: 'Recurring coaching programs, mastermind groups, and consulting retainers on Stripe all qualify. Your cancel flow can offer a pause instead of a goodbye.' },
                { icon: '🛒', title: 'Subscription Box & eCommerce', desc: 'Physical subscription boxes and digital product subscriptions on Stripe both benefit from a cancel flow with discount or pause offers.' },
                { icon: '🏢', title: 'Small & Mid-Size B2B SaaS', desc: "If you're not big enough for Chargebee Retain ($500+/mo) but want enterprise-grade churn recovery — ChurnRecovery is built for you." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#F5F4FF] border border-[#E5E5E5] rounded-xl p-5">
                  <div className="text-[1.8rem] mb-[10px]">{icon}</div>
                  <h4 className="font-sans font-bold text-[0.95rem] text-[#191919] m-0 mb-2">{title}</h4>
                  <p className="font-serif text-[0.83rem] text-[#666666] m-0 leading-[1.55]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-20 px-6 bg-[#F5F4FF]">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[#191919] m-0 mb-5 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
              Priced for Real Businesses, Not Enterprises
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              The tools Stripe doesn&apos;t include shouldn&apos;t cost $500+/month. ChurnRecovery is $20/month — flat pricing that scales with your business.
            </p>

            <div className="max-w-[380px] mx-auto mb-7">
              {[
                { tier: 'All Features', price: '$20/month', range: '30-day free trial', highlight: true },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} className={`rounded-[10px] p-[18px] relative ${highlight ? 'bg-[rgba(99,91,255,0.08)] border border-[#635BFF]' : 'bg-white border border-[#E5E5E5]'}`}>
                  {highlight && <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 bg-[#635BFF] text-white font-sans text-[0.7rem] font-bold px-[10px] py-[3px] rounded-full">SIMPLE PRICING</div>}
                  <div className="font-sans font-bold text-[#191919] text-[0.9rem]">{tier}</div>
                  <div className={`font-sans font-extrabold text-[1.4rem] my-1 ${highlight ? 'text-[#635BFF]' : 'text-[#191919]'}`}>{price}</div>
                  <div className="font-serif text-[0.78rem] text-[#666666]">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] px-5 py-[14px] font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              Compare to Chargebee Retain ($500+/mo) or Churnkey ($250+/mo). ChurnRecovery pays for itself the first subscriber you save.
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Questions About Stripe Churn Recovery
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
                href="/posts/voluntary-vs-involuntary-churn"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Voluntary vs Involuntary Churn: What's the Difference?
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  How to tackle both types of churn for Stripe businesses
                </div>
              </a>
              <a
                href="/posts/Payment-Failure-Recovery"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Payment Failure Recovery: The Complete Guide
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Smart retry strategies and dunning best practices
                </div>
              </a>
              <a
                href="/posts/Involuntary-Churn-Recovery"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Involuntary Churn Recovery: What Actually Works
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Technical guide to recovering failed Stripe payments
                </div>
              </a>
            </div>
          </div>
        </section>
        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0D0C1A_0%,#1A1640_100%)] py-20 px-6">
          <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(99,91,255,0.15)_0%,transparent_70%)]" />
          <div className="max-w-[640px] mx-auto text-center relative z-[1]">
            <h2 className="font-sans font-extrabold text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.8rem)]">
              A Stripe Subscriber Is<br />
              About to Cancel.<br />
              <span className="text-[#8B85FF]">Are You Ready to Save Them?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.65)] m-0 mb-9 leading-[1.7]">
              Add a cancel flow to your Stripe subscriptions in 10 minutes. $20/month flat, 30-day free trial. No code, no developer required.
            </p>

            <div className="max-w-[500px] mx-auto mb-7">
              <SignUpCTA source="for-stripe" dark={true} />
            </div>

            <div className="flex gap-6 justify-center flex-wrap mb-8">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">30-day free trial</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">Cancel anytime</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">No spam, ever</span>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/demo" className="inline-flex items-center gap-[6px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-lg px-5 py-[10px] font-sans font-semibold text-[rgba(255,255,255,0.8)] no-underline text-[0.9rem]">
                🎮 Try the Demo
              </Link>
              <Link href="/blog" className="inline-flex items-center gap-[6px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-lg px-5 py-[10px] font-sans font-semibold text-[rgba(255,255,255,0.8)] no-underline text-[0.9rem]">
                📖 Read the Blog
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
