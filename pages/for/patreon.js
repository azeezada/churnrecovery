import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'

function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-brand-white border border-brand-border rounded-xl py-7 px-6 border-t-[3px] border-t-brand-amber">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-brand-text m-0 mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-sans font-extrabold text-[2rem] text-brand-amber my-1">
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-sans text-[0.8rem] text-brand-orange mb-2">
          {statLabel}
        </div>
      )}
      <p className="font-serif text-[0.88rem] text-brand-gray m-0 leading-[1.6]">
        {description}
      </p>
    </div>
  )
}

function HowStep({ number, icon, title, description, callout }) {
  return (
    <div className="bg-brand-white border border-brand-border rounded-xl py-7 px-6">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-patreon-bg border-2 border-patreon flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-patreon shrink-0">
          {number}
        </div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-sans text-[1.05rem] font-bold text-brand-text m-0">
            {title}
          </h3>
        </div>
      </div>
      <p className="font-serif text-[0.9rem] text-brand-gray m-0 mb-3 leading-[1.7]">
        {description}
      </p>
      {callout && (
        <div className="bg-patreon-bg border border-patreon/20 rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-patreon">
          {callout}
        </div>
      )}
    </div>
  )
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="flex gap-3.5 items-start bg-brand-white border border-brand-border rounded-[10px] p-5">
      <span className="text-[1.4rem] shrink-0">{icon}</span>
      <div>
        <h4 className="font-sans text-[0.92rem] font-bold text-brand-text m-0 mb-1">
          {title}
        </h4>
        <p className="font-serif text-[0.82rem] text-brand-gray m-0 leading-[1.55]">
          {description}
        </p>
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-brand-border rounded-[10px] overflow-hidden mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-brand-white border-none cursor-pointer py-4 px-5 flex justify-between items-center gap-3 text-left"
      >
        <span className="font-sans font-semibold text-[0.93rem] text-brand-text">
          {q}
        </span>
        <span className="text-patreon text-[1.2rem] font-bold shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 bg-brand-bg">
          <p className="font-serif text-[0.88rem] text-brand-gray m-0 leading-[1.7]">
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function PatreonLandingPage() {
  return (
    <>
      <Head>
        <title>Reduce Patron Cancellations | ChurnRecovery for Patreon Creators</title>
        <meta name="description" content="Reduce patron cancellations with a smarter cancel flow. ChurnRecovery works for creators with their own Stripe subscriptions — and helps Patreon creators build off-platform income." />
        <link rel="canonical" href="https://churnrecovery.com/for/patreon" />
        <meta property="og:title" content="Reduce Patron Cancellations | ChurnRecovery" />
        <meta property="og:description" content="Smarter cancel flows for content creators. Works for creators with Stripe subscriptions alongside Patreon." />
        <meta property="og:url" content="https://churnrecovery.com/for/patreon" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reduce Patron Cancellations with a Smarter Cancel Flow" />
        <meta name="twitter:description" content="ChurnRecovery for content creators — reduce cancellations on your own Stripe subscriptions." />
      </Head>

      <Header />

      <main className="font-sans bg-brand-bg pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 pb-[100px] relative overflow-hidden bg-[linear-gradient(135deg,#1A0000_0%,#2E0507_50%,#1A0000_100%)]">
          <div className="absolute -top-[80px] -right-[80px] w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,66,77,0.18)_0%,transparent_70%)]" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(255,66,77,0.2)] border border-[rgba(255,66,77,0.4)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#FCA5A5] mb-7">
              <span>✓</span> For Content Creators · 30-Day Free Trial
            </div>

            <h1 className="lp-hero-heading text-brand-white m-0 mb-5">
              Reduce Patron Cancellations<br />
              <span className="text-[#FCA5A5]">With a Smarter Cancel Flow</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-white/75 m-0 mb-10 leading-[1.7] max-w-[600px] mx-auto">
              Patreon doesn&apos;t give you control over your cancel flow — but your own website can.
              ChurnRecovery works for creators who run Stripe subscriptions directly, giving you a smarter
              cancel experience that saves patrons before they&apos;re gone.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-patreon" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-white/50">
                🆓 30-day free trial — no credit card required
              </span>
              <span className="font-sans text-[0.8rem] text-white/50">
                💡 Works with your own Stripe subscriptions
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-sans text-[0.9rem] text-white/60 no-underline border-b border-white/30">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── HONEST NOTE ─────────────────────────────────────────────── */}
        <section className="py-10 px-6 bg-[#FFFBEB] border-b border-[#FDE68A]">
          <div className="max-w-[720px] mx-auto">
            <div className="flex gap-4 items-start bg-brand-white border border-[#FDE68A] border-l-4 border-l-brand-amber rounded-[10px] py-5 px-6">
              <span className="text-[1.4rem] shrink-0">💡</span>
              <div>
                <h3 className="font-sans font-bold text-brand-text m-0 mb-2 text-[0.95rem]">
                  Quick heads-up about Patreon
                </h3>
                <p className="font-serif text-[0.88rem] text-brand-gray m-0 mb-2.5 leading-[1.7]">
                  Patreon uses its own proprietary payment system — not Stripe. This means ChurnRecovery
                  can&apos;t directly intercept cancellations that happen inside Patreon&apos;s platform.
                </p>
                <p className="font-serif text-[0.88rem] text-brand-gray m-0 leading-[1.7]">
                  ChurnRecovery works for Patreon creators who <strong>also run their own Stripe subscriptions</strong> —
                  either on their website or as an off-platform membership. If you&apos;re ready to bring your audience
                  to a subscription you control (where you keep more money and own your relationships),
                  we&apos;re built for exactly that transition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PAIN POINTS ─────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-bg">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-brand-orange uppercase tracking-[0.08em] mb-3">
                The Platform Dependency Problem
              </div>
              <h2 className="section-heading-lg text-brand-text m-0 mb-4">
                On Patreon, You Don&apos;t Control<br />the Cancel Moment
              </h2>
              <p className="font-serif text-base text-brand-gray max-w-[540px] mx-auto leading-[1.7] m-0">
                Patreon owns the cancel flow. Patreon owns the relationship. Patreon takes 8–12% of your revenue.
                The good news: you can change all three.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="🔒"
                title="No Control Over Your Cancel Flow"
                description="When a patron cancels on Patreon, Patreon handles it entirely — their UI, their copy, their options. You have no intervention point, no pause offer, no custom message. Zero control."
              />
              <PainCard
                icon="💸"
                title="Patreon Takes 8–12% of Everything"
                stat="8–12%"
                statLabel="of every dollar your patrons pay — goes to Patreon"
                description="On $5,000/month, that's $400–$600 per month going to a platform you don't own. A direct Stripe subscription keeps more of that in your pocket."
              />
              <PainCard
                icon="🚪"
                title="You Don't Own the Relationship"
                description="If Patreon changes its algorithm, terms, or fee structure — or shuts down — your patron relationships go with it. Creators who build on owned platforms have full control forever."
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-[80px] px-6 bg-brand-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-patreon uppercase tracking-[0.08em] mb-3">
                How Patreon Creators Use ChurnRecovery
              </div>
              <h2 className="section-heading-lg text-brand-text m-0 mb-4">
                Bring Your Audience Off-Platform.<br />Own the Relationship. Keep the Revenue.
              </h2>
              <p className="font-serif text-base text-brand-gray max-w-[540px] mx-auto leading-[1.7] m-0">
                The most successful Patreon creators run their own subscription alongside Patreon — and gradually migrate their best patrons there.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🌐"
                title="Set Up Your Own Stripe Subscription"
                description="Launch a direct membership on your own website — using Stripe directly. Same content, same tiers, but you keep 97% of the revenue (Stripe's rate) instead of 88–92% (after Patreon fees). We help you set up the cancel flow."
                callout="✓ Patreon and your own subscription can run simultaneously."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="ChurnRecovery Protects Your Direct Subscribers"
                description="When a subscriber on your own Stripe membership initiates a cancel, ChurnRecovery intercepts it in real time. They see your pause offer, your discount, your personal note — before the cancel is final."
              />
              <HowStep
                number="3"
                icon="🔄"
                title="Gradually Invite Patrons to Your Direct Membership"
                description="Offer your top Patreon patrons free access to your direct membership — lower price for them, more revenue for you. Over time, your dependency on Patreon decreases while your control increases."
                callout="🎯 Creators report keeping 15–20% more revenue per patron on direct subscriptions"
              />
            </div>

            <div className="mt-8 bg-patreon-bg border border-patreon/20 border-l-4 border-l-patreon rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-brand-text m-0 mb-2 text-[0.95rem]">
                Why Patreon creators move off-platform
              </p>
              <p className="font-serif text-[0.88rem] text-brand-gray m-0 mb-2.5 leading-[1.7]">
                It&apos;s not about abandoning Patreon — many creators run both simultaneously. It&apos;s about building a subscription business that you own, where you control the cancel flow, keep more of the revenue, and aren&apos;t dependent on platform decisions you can&apos;t control.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-patreon no-underline font-semibold">
                Read the migration guide →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-patreon-bg border border-patreon/25 rounded-[10px] py-3.5 px-7 font-sans font-bold text-patreon no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-brand-gray-light mt-2">
                See a live cancel flow — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ────────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-bg">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-patreon uppercase tracking-[0.08em] mb-3">
                What You Get
              </div>
              <h2 className="section-heading-lg text-brand-text m-0">
                Everything You Need to Own Your Subscriber Relationships
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard icon="⚡" title="Real-Time Cancel Interception" description="For your direct Stripe subscriptions: intercept the cancel moment in real time and respond before it's final." />
              <BenefitCard icon="⏸" title="Pause Option for Your Subscribers" description="Give subscribers a 30-day break instead of a permanent goodbye. Especially powerful for content creators — fans come back." />
              <BenefitCard icon="💬" title="Personalized Win-Back Messages" description="Your voice, your brand. A message that sounds like it came from you — not a software company popup." />
              <BenefitCard icon="📉" title="Discount Offers at the Cancel Moment" description="One-time discount when someone starts to cancel. Keeping them at a lower tier beats losing them to Patreon completely." />
              <BenefitCard icon="📊" title="Revenue Recovery Dashboard" description="See exactly how much revenue you've protected on your direct subscriptions. Track save rates and what works." />
              <BenefitCard icon="🔓" title="Platform Independence" description="Own your subscriber list. Own the cancel flow. Keep more of what you earn. No platform can take that away." />
              <BenefitCard icon="🆓" title="$20/month — Flat" description="30-day free trial, then $20/month. All features included. No per-subscriber fees." />
              <BenefitCard icon="🔒" title="No Code Required" description="Connect Stripe, write your message, go live. 10 minutes. Step-by-step guide included. No developer needed." />
            </div>
          </div>
        </section>

        {/* ─── PRICING ─────────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="section-heading-lg text-brand-text m-0 mb-5">
              Priced for Independent Creators
            </h2>
            <p className="font-serif text-base text-brand-gray leading-[1.7] m-0 mb-8">
              One simple price. 30-day free trial to get started — no credit card required.
            </p>

            <div className="max-w-[380px] mx-auto mb-7">
              <div className="rounded-[10px] p-[18px] relative bg-patreon-bg border border-patreon">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-patreon text-brand-white font-sans text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">
                  SIMPLE PRICING
                </div>
                <div className="font-sans font-bold text-brand-text text-[0.9rem]">All Features</div>
                <div className="font-sans font-extrabold text-[1.4rem] my-1 text-patreon">$20/month</div>
                <div className="font-serif text-[0.78rem] text-brand-gray">30-day free trial · No credit card required</div>
              </div>
            </div>

            <div className="bg-brand-green-light border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-brand-green mb-6">
              Patreon takes 8–12% of your revenue forever. ChurnRecovery is just $20/month with a 30-day free trial.
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-bg">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="section-heading-lg text-brand-text m-0">
                Questions From Patreon Creators
              </h2>
            </div>

            {[
              {
                q: 'Does ChurnRecovery work directly with Patreon?',
                a: "Important note: Patreon uses its own proprietary payment system — not Stripe. ChurnRecovery works at the Stripe level, so it cannot directly intercept cancellations that happen inside Patreon's platform. ChurnRecovery works for Patreon creators who also run a direct Stripe subscription (on their own website or alongside Patreon).",
              },
              {
                q: 'What if I only have Patreon right now?',
                a: "Then ChurnRecovery isn't the right fit for you yet — and we'd rather be honest about that than sign you up for something that doesn't work. When you're ready to launch a direct subscription alongside Patreon, come back and we'll be here.",
              },
              {
                q: "Why would I run a subscription outside of Patreon?",
                a: "Control and revenue. On Patreon, you pay 8–12% in fees and have zero control over the cancel flow, the subscriber relationship, or what happens if Patreon changes its terms. A direct Stripe subscription lets you keep 97% of revenue, own your subscriber list, and control every touchpoint — including what happens when someone tries to cancel.",
              },
              {
                q: 'Can I run both Patreon and a direct subscription simultaneously?',
                a: "Yes — and many creators do. You can offer exclusive perks on your direct subscription (earlier access, lower price, more intimate community) while keeping Patreon for discoverability. Over time, your most loyal fans migrate where you make more and control more.",
              },
              {
                q: "Isn't migrating off Patreon risky?",
                a: "It can feel risky, but not moving is also a risk — you're building on a platform you don't control. The smart approach is gradual: start a direct subscription, run both in parallel, invite your top patrons, and migrate slowly. No cliff jumps required.",
              },
              {
                q: 'What does the migration actually look like?',
                a: "Typically: (1) Set up a Stripe subscription on your website. (2) Add ChurnRecovery to protect new direct subscribers from day one. (3) Offer existing Patreon patrons an exclusive deal to join your direct subscription. (4) Over 6–12 months, your direct revenue grows while Patreon becomes optional.",
              },
              {
                q: 'Will Patreon penalize me for having a direct subscription?',
                a: "No. Patreon's terms allow creators to have subscriptions on other platforms simultaneously. Many top creators run both. What matters is delivering value to your supporters wherever they are.",
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
                href="/posts/online-community-churn-rate"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Online Community Churn: Why Members Leave
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Emotional and practical reasons creators lose patrons
                </div>
              </a>
              <a
                href="/posts/why-subscribers-cancel"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  7 Reasons Subscribers Cancel (And What to Say)
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Scripts for handling each type of cancellation
                </div>
              </a>
              <a
                href="/posts/discount-vs-pause-vs-cancel-what-saves-subscribers"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Discount vs Pause vs Cancel: What Saves Subscribers?
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  What offers work best for creator memberships
                </div>
              </a>
            </div>
          </div>
        </section>
        {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-[linear-gradient(135deg,#1A0000_0%,#2E0507_100%)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-brand-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              Own Your Subscriber Relationships.<br />Control the Cancel Flow.
              <br /><span className="text-[#FCA5A5]">Keep More of What You Earn.</span>
            </h2>
            <p className="font-serif text-base text-white/70 m-0 mb-9 leading-[1.7]">
              Start your free trial. $20/month after 30 days — built for content creators ready to own their subscriber relationships.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-patreon" dark={true} />
            </div>

            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-white/45">30-day free trial</span>
              <span className="font-sans text-[0.78rem] text-white/45">Cancel anytime</span>
              <span className="font-sans text-[0.78rem] text-white/45">No spam, ever</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
