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
export default function WooCommerceLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing WooCommerce Subscribers at the Cancel Screen | ChurnRecovery</title>
        <meta name="description" content="ChurnRecovery connects to your WooCommerce Subscriptions Stripe account and intercepts cancellations in real-time. Offer a pause, a discount, or ask why — before they're gone. 30-day free trial, then $20/month." />
        <link rel="canonical" href="https://churnrecovery.com/for/woocommerce" />
        <meta property="og:title" content="Stop Losing WooCommerce Subscribers at the Cancel Screen | ChurnRecovery" />
        <meta property="og:description" content="WooCommerce Subscriptions runs on Stripe. ChurnRecovery connects directly and intercepts cancellations before they happen. No WordPress plugin needed." />
        <meta property="og:url" content="https://churnrecovery.com/for/woocommerce" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing WooCommerce Subscribers at the Cancel Screen" />
        <meta name="twitter:description" content="Most WooCommerce store owners don't realize they can intercept cancellations. ChurnRecovery plugs directly into Stripe — no WordPress plugin, no code." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_50%,#1A1200_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          {/* WooCommerce gold glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,160,0,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(232,160,0,0.15)] border border-[rgba(232,160,0,0.35)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#F5C842] mb-[28px]">
              <span>✓</span> 30-Day Free Trial · No Credit Card Required
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Stop Losing WooCommerce Subscribers<br />
              <span className="text-[#F5C842]">at the Cancel Screen</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              WooCommerce Subscriptions processes payments through Stripe. That means you can intercept cancellations with a smooth cancel flow — a pause offer, a discount, or a quick &quot;why are you leaving?&quot; All without touching a line of WordPress code.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-woocommerce" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 30-day free trial — no WordPress plugin needed
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
                Every WooCommerce Cancellation =<br />Lost Recurring Revenue
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                WooCommerce Subscriptions gives you a powerful store — but zero protection against subscribers walking out the door. Plugin conflicts, failed payments, and a bare-bones cancel screen are silently draining your revenue.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="🔌"
                title="Plugin Conflicts Cause Failed Payments"
                stat="5–15%"
                statLabel="of WooCommerce subscriptions fail due to technical issues"
                description="WordPress updates, plugin conflicts, and payment gateway mismatches silently kill subscriptions. Customers assume the charge failed and never come back — but it was your stack, not their intent."
              />
              <PainCard
                icon="🚪"
                title="No Built-In Cancel Flow"
                description="When a WooCommerce subscriber clicks &quot;Cancel Subscription,&quot; they get a bare confirmation dialog. No pause option. No discount. No &quot;here&apos;s what you&apos;ll lose.&quot; Just an instant, silent goodbye."
              />
              <PainCard
                icon="⚙️"
                title="Technical Complexity Drives Customers Away"
                description="Slow checkout pages, confusing account portals, and plugin-heavy sites frustrate subscribers. Many cancellations aren&apos;t about your product — they&apos;re about the friction of your WordPress setup."
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
                Works With WooCommerce in Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                WooCommerce Subscriptions uses Stripe for payments. ChurnRecovery connects to Stripe — not WordPress. No plugins, no theme edits, no server access needed.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. We read cancellation signals from Stripe — the same payment processor powering your WooCommerce Subscriptions store."
                callout="✓ No WordPress plugin to install. No FTP access required."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a subscriber initiates a cancellation, ChurnRecovery fires before it&apos;s final. We intercept the Stripe webhook event and trigger your custom recovery flow — automatically."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Message — Automated"
                description="Subscribers see a personalized message: a pause option, a special discount, or a quick exit survey. Set it up once. It runs on every cancellation, forever."
                callout="🎯 Average recovery rate: 20–35% of at-risk subscribers"
              />
            </div>

            {/* Technical callout */}
            <div className="mt-8 bg-[rgba(232,160,0,0.05)] border border-[rgba(232,160,0,0.25)] border-l-4 border-l-[#E8A000] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Do I really need another WordPress plugin?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                No — and that&apos;s the point. ChurnRecovery works at the Stripe level, not the WordPress level. WooCommerce Subscriptions routes your recurring payments through Stripe. By connecting directly to your Stripe account via webhooks, we can listen for cancellation events and respond — completely outside your WordPress environment. No plugin conflicts, no updates to manage.
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
                icon="⏸"
                title="Pause Offer"
                description="Give subscribers the option to pause instead of cancel. Many people leave during a slow month — not because they dislike your products or service."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a 20% discount or 1 month free to at-risk subscribers. Keeping them at a discount beats losing them to a competitor forever."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out why subscribers leave with a quick 1-question survey. Use the answers to improve your product, pricing, and customer experience."
              />
              <BenefitCard
                icon="📊"
                title="Dashboard Insights"
                description="Track how much revenue you&apos;ve saved, which offers perform best, and your overall churn recovery rate — all in one clean dashboard."
              />
              <BenefitCard
                icon="🆓"
                title="$20/month — Flat"
                description="30-day free trial, then $20/month. All features included — no per-subscriber fees, no transaction cuts. Cancel anytime."
              />
              <BenefitCard
                icon="🚫"
                title="No WordPress Plugin Needed"
                description="This works entirely through Stripe webhooks. No WordPress plugin to install, no theme conflicts to worry about, no WooCommerce app approval required."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              A Fraction of What Churn Costs You
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              WooCommerce Subscriptions can cost $199/year just for the plugin license. ChurnRecovery is just $20/month — and helps you actually keep the recurring revenue you&apos;ve worked hard to build.
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
              Compare to enterprise churn tools that charge $250+/month and require developer integrations. ChurnRecovery is just $20/month and pays for itself the first time you save a subscriber.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From WooCommerce Store Owners
              </h2>
            </div>

            {[
              {
                q: 'Does this work with WooCommerce Subscriptions?',
                a: "Yes. WooCommerce Subscriptions processes recurring payments through Stripe (or PayPal). ChurnRecovery connects to your Stripe account directly and listens for cancellation events via webhooks. No WooCommerce API access needed — it works entirely at the Stripe level.",
              },
              {
                q: 'Do I need to install a WordPress plugin?',
                a: "No — and that's intentional. ChurnRecovery operates at the Stripe webhook level, completely outside your WordPress environment. There's nothing to install on your server, no plugin conflicts to manage, and no WordPress updates that can break it.",
              },
              {
                q: 'Will this conflict with my other WooCommerce plugins?',
                a: "It can't conflict with your plugins because it doesn't run inside WordPress at all. ChurnRecovery is a separate web service that connects to Stripe independently. Your WordPress stack never knows it exists.",
              },
              {
                q: 'Does it work with PayPal as well as Stripe?',
                a: "Currently, ChurnRecovery works with Stripe. If your WooCommerce Subscriptions store uses the WooCommerce Payments gateway or the Stripe for WooCommerce plugin, you're fully supported. PayPal support is on our roadmap.",
              },
              {
                q: 'My store has a lot of plugins — will setup be complicated?',
                a: "Not at all. Setup takes about 5–10 minutes regardless of how many plugins your store has. You connect your Stripe account, configure your cancel flow message and offer, and you're live. No server access, no FTP, no developer required.",
              },
              {
                q: 'Can I customize what subscribers see when they try to cancel?',
                a: "Completely. Your message, your offer, your tone. We provide templates designed for subscription store owners, but you can edit every word. Your subscribers will feel like they're hearing from you — not a generic software product.",
              },
              {
                q: "What happens if a subscriber still cancels after seeing the offer?",
                a: "That's fine. If they want to leave, they leave. You still receive their exit survey response — which is more than you had before. And you've made the attempt, which 20–35% of at-risk subscribers respond to positively.",
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
              <a
                href="/posts/Involuntary-Churn-Recovery"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Involuntary Churn Recovery: Recovering Failed Payments
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  How to recover subscribers lost to payment failures and card declines
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
                  The silent revenue drains most subscription owners never see
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A WooCommerce Subscriber Is About to Cancel.<br />
              <span className="text-[#F5C842]">Will You Be Ready?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your free trial. Protect your WooCommerce subscription revenue with automated churn recovery. $20/month after 30 days — no WordPress plugin needed.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-woocommerce" dark={true} />
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
