import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'

function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl px-6 py-7 border-t-[3px] border-t-[#FFD234]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] m-0 mb-2">{title}</h3>
      {stat && <div className="font-sans font-extrabold text-[2rem] text-[#D4A900] my-1">{stat}</div>}
      {statLabel && <div className="font-sans text-[0.8rem] text-[#666666] mb-2">{statLabel}</div>}
      <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-relaxed">{description}</p>
    </div>
  )
}

function HowStep({ number, icon, title, description, callout }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl px-6 py-7">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-[rgba(255,210,52,0.15)] border-2 border-[#FFD234] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#D4A900] shrink-0">{number}</div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-sans text-[1.05rem] font-bold text-[#191919] m-0">{title}</h3>
        </div>
      </div>
      <p className="font-serif text-[0.9rem] text-[#666666] mt-0 mb-3 leading-[1.7]">{description}</p>
      {callout && <div className="bg-[rgba(255,210,52,0.1)] border border-[rgba(255,210,52,0.3)] rounded-lg px-[14px] py-[10px] font-sans text-[0.8rem] text-[#D4A900]">{callout}</div>}
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
        <span className="text-[#D4A900] text-[1.2rem] font-bold shrink-0">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 bg-[#FFFDF0]">
          <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-[1.7]">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function LemonSqueezyLandingPage() {
  return (
    <>
      <Head>
        <title>Using Lemon Squeezy? Here's the Honest Truth About Churn Recovery | ChurnRecovery</title>
        <meta name="description" content="Lemon Squeezy is a merchant of record — which means ChurnRecovery can't hook into it directly. But if you're thinking about moving to direct Stripe billing, ChurnRecovery is the reason to make the switch." />
        <link rel="canonical" href="https://churnrecovery.com/for/lemon-squeezy" />
        <meta property="og:title" content="Using Lemon Squeezy? Here's the Honest Truth About Churn Recovery" />
        <meta property="og:description" content="ChurnRecovery works with Stripe-based subscriptions. If you're on Lemon Squeezy's merchant-of-record plan, we'll be honest about what works and what doesn't." />
        <meta property="og:url" content="https://churnrecovery.com/for/lemon-squeezy" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Using Lemon Squeezy? Here's the Honest Truth About Churn Recovery" />
        <meta name="twitter:description" content="We won't pretend to work with Lemon Squeezy's MoR setup. But if you use your own Stripe, or want to switch — ChurnRecovery is your churn recovery layer." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FFFDF0] pt-[60px]">

        {/* HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1A1300_0%,#2D2000_100%)] pt-20 px-6 pb-[100px]">
          <div className="absolute -top-[80px] -right-[80px] w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,210,52,0.12)_0%,transparent_70%)]" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-[6px] bg-[rgba(255,210,52,0.15)] border border-[rgba(255,210,52,0.3)] rounded-full px-4 py-[6px] font-sans text-[0.78rem] font-semibold text-[#FFD234] mb-7">
              🍋 Honest guide for Lemon Squeezy creators
            </div>

            <h1 className="font-sans font-extrabold text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em] text-[clamp(2.2rem,5vw,3.5rem)]">
              Using Lemon Squeezy?<br />
              <span className="text-[#FFD234]">Here&apos;s the Honest Truth</span><br />
              About Churn Recovery.
            </h1>

            <p className="font-serif text-[rgba(255,255,255,0.7)] m-0 mb-7 leading-[1.7] max-w-[620px] mx-auto text-[clamp(1rem,2.5vw,1.2rem)]">
              We won&apos;t overpromise. Lemon Squeezy is a merchant of record — they own the Stripe connection, not you. That means ChurnRecovery can&apos;t plug directly into most Lemon Squeezy setups. But read on, because there&apos;s a real path forward.
            </p>

            {/* Honest limitation callout */}
            <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-xl px-6 py-5 max-w-[560px] mx-auto mb-8 text-left">
              <p className="font-sans font-bold text-[#FFD234] m-0 mb-2 text-[0.88rem]">⚠ Honest limitation</p>
              <p className="font-serif text-sm text-[rgba(255,255,255,0.65)] m-0 leading-relaxed">
                If you use Lemon Squeezy&apos;s standard merchant-of-record plan, your Stripe account is Lemon Squeezy&apos;s — not yours. ChurnRecovery can&apos;t connect to it. <strong className="text-[rgba(255,255,255,0.85)]">However:</strong> if you&apos;re on a plan that lets you connect your own Stripe, or you&apos;re considering switching to direct Stripe billing, ChurnRecovery works perfectly.
              </p>
            </div>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-lemon-squeezy" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.4)]">🆓 30-day free trial</span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.4)]">⚡ Works with direct Stripe</span>
            </div>
          </div>
        </section>

        {/* THE REAL SITUATION */}
        <section className="py-20 px-6 bg-[#FFFDF0]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#666666] uppercase tracking-[0.08em] mb-3">The Real Situation</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Lemon Squeezy vs. Direct Stripe:<br />What Actually Changes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[580px] mx-auto leading-[1.7]">
                Lemon Squeezy is great for tax compliance and quick product launches. But as a merchant of record, they&apos;re between you and your subscribers. That has real consequences for churn recovery.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard icon="🔒" title="Lemon Squeezy Owns the Stripe" stat="0" statLabel="access to cancellation events for you" description="On Lemon Squeezy's standard plan, they're the merchant of record. They hold the Stripe connection. You can't install webhooks, intercept events, or add a cancel flow — because it's not technically your Stripe account." />
              <PainCard icon="🚪" title="Cancellations Still Happen Silently" description="Just like with any other platform without a cancel flow, subscribers can leave without you ever having a chance to make them an offer. Lemon Squeezy doesn't have built-in retention tools either." />
              <PainCard icon="💡" title="There's a Way Out" description="If you move to direct Stripe billing — even just for your subscription products — you own the Stripe connection. You control the webhooks. And ChurnRecovery plugs right in. Many creators make this switch for exactly this reason." />
            </div>
          </div>
        </section>

        {/* HOW TO MAKE IT WORK */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#D4A900] uppercase tracking-[0.08em] mb-3">Your Options</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Three Paths Forward
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep number="A" icon="🔗" title="Use Lemon Squeezy with Your Own Stripe" description="Some Lemon Squeezy plans allow you to connect your own Stripe account instead of using their merchant-of-record setup. If you're on one of those plans, ChurnRecovery connects directly to your Stripe and works as normal." callout="✓ Check your Lemon Squeezy plan settings for 'custom Stripe' or 'BYOS' options." />
              <HowStep number="B" icon="🔀" title="Move Subscriptions to Direct Stripe" description="Keep Lemon Squeezy for one-time digital products (where their tax handling is great). Migrate your subscription products to direct Stripe billing. Then connect ChurnRecovery for full cancel flow coverage." callout="💡 Many creators use both: LS for products, Stripe for subscriptions." />
              <HowStep number="C" icon="📬" title="Start Your Free Trial Anyway" description="We're actively exploring native Lemon Squeezy integration. It's technically complex because of the merchant-of-record structure, but we're working on it. Start your free trial and we'll tell you the moment it's possible." callout="🔔 We'll reach out first when Lemon Squeezy support lands." />
            </div>
          </div>
        </section>

        {/* WHY DIRECT STRIPE IS WORTH IT */}
        <section className="py-20 px-6 bg-[#FFFDF0]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Why Creators Switch to Direct Stripe
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[14px]">
              <BenefitCard icon="🎛" title="Full Control" description="Your Stripe account, your webhooks, your data. You're not locked into a platform's terms of service for your payment infrastructure." />
              <BenefitCard icon="⏸" title="Cancel Flows That Actually Work" description="With direct Stripe, you can add a pause offer, a discount, or an exit survey to every cancellation — automatically. That's 20–35% of churning subscribers you can save." />
              <BenefitCard icon="📊" title="Better Revenue Data" description="See exactly what's happening with your MRR, churn rate, and subscriber LTV — directly in Stripe or connected tools. Not filtered through a third-party platform." />
              <BenefitCard icon="💸" title="Lower Fees on Higher Volume" description="Lemon Squeezy charges 5% + payment fees. Direct Stripe is 2.9% + 30¢. At scale, that difference pays for a lot of tools." />
              <BenefitCard icon="🔧" title="Integrates With Everything" description="Stripe connects directly with ChurnRecovery, your email platform, your analytics, and hundreds of other tools. No middleware, no translation layer." />
              <BenefitCard icon="🆓" title="ChurnRecovery Is $20/month" description="Once you're on direct Stripe, ChurnRecovery is just $20/month with a 30-day free trial. The cancel flow you add can pay for the migration cost in the first month." />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Questions About Lemon Squeezy + ChurnRecovery
              </h2>
            </div>

            {[
              { q: 'Can ChurnRecovery work with Lemon Squeezy right now?', a: "Not on standard Lemon Squeezy MoR (merchant of record) plans — because the Stripe connection belongs to Lemon Squeezy, not you. However, if your plan lets you use your own Stripe account, ChurnRecovery works. We're also working on a native Lemon Squeezy integration for the future." },
              { q: "Why is Lemon Squeezy's MoR setup a problem for cancel flows?", a: "As the merchant of record, Lemon Squeezy handles the Stripe payment infrastructure on your behalf. That means you can't install webhooks or intercept cancellation events — those go to Lemon Squeezy's servers, not yours. It's the tradeoff for their tax compliance features." },
              { q: 'Is it hard to migrate subscriptions from Lemon Squeezy to Stripe?', a: "It depends on your subscriber count. For small subscriber bases (under 200), many creators handle the migration manually or with a simple export/import. We have guides for this migration in our docs. The bigger the subscriber base, the more careful the migration needs to be." },
              { q: 'Will I lose subscribers if I migrate to direct Stripe?', a: "A thoughtful migration won't cause cancellations. The key is to communicate with subscribers, give them time to re-subscribe through your new Stripe-powered flow, and offer a seamless transition. Many creators do this without losing a single subscriber." },
              { q: 'Can I keep using Lemon Squeezy for one-time products?', a: "Absolutely. Many creators use Lemon Squeezy for digital downloads and one-time purchases (where their tax handling is genuinely useful), while using direct Stripe for subscriptions. You don't have to go all-or-nothing." },
            ].map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
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
                  Voluntary vs Involuntary Churn: How to Fix Both
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Framework for subscription businesses on any platform
                </div>
              </a>
              <a
                href="/posts/what-is-a-cancel-flow"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  What Is a Cancel Flow?
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  The basics of building a retention flow
                </div>
              </a>
              <a
                href="/posts/free-alternatives-churnkey-profitwell-baremetrics"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Free Alternatives to Churnkey and ProfitWell
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Why paying $250/month for churn tools is optional
                </div>
              </a>
            </div>
          </div>
        </section>
        {/* FINAL CTA */}
        <section className="py-20 px-6 bg-[linear-gradient(135deg,#1A1300_0%,#2D2000_100%)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.6rem)]">
              Ready to Own Your<br />
              <span className="text-[#FFD234]">Subscription Revenue?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your free trial. Whether you&apos;re on Lemon Squeezy now or thinking about moving to direct Stripe, we&apos;ll help you set up a cancel flow that saves subscribers automatically. $20/month after 30 days.
            </p>
            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-lemon-squeezy" dark={true} />
            </div>
            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">30-day free trial</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">No spam, ever</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
