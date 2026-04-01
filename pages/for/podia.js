import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'
import { buildFAQSchema } from '../../lib/faq-schema'

function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6 border-t-[3px] border-t-[#D97706]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-sans font-extrabold text-[2rem] text-[#D97706] my-1">
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-sans text-[0.8rem] text-[#EA580C] mb-2">
          {statLabel}
        </div>
      )}
      <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-[1.6]">
        {description}
      </p>
    </div>
  )
}

function HowStep({ number, icon, title, description, callout }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-[#EEF2FF] border-2 border-[#4F46E5] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#4F46E5] shrink-0">{number}</div>
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
        <div className="bg-[#EEF2FF] border border-[#4F46E530] rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-[#4F46E5]">
          {callout}
        </div>
      )}
    </div>
  )
}

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
        <span className="text-[#4F46E5] text-[1.2rem] font-bold shrink-0">
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
    q: 'Does ChurnRecovery work with Podia?',
    a: "Yes. Podia uses Stripe to process all subscription and membership payments. ChurnRecovery connects to your Stripe account and intercepts cancellation webhooks — no Podia-specific integration or API needed.",
  },
  {
    q: 'Do I need to change anything in my Podia store?',
    a: "No changes to Podia required. You connect ChurnRecovery directly to your Stripe account (the same one Podia uses). Everything happens at the payment layer.",
  },
  {
    q: 'Will my members see something that looks like a third-party popup?',
    a: "No. The experience is fully branded. Your colors, your message, your offer. Members will think it came from you — because it did.",
  },
  {
    q: 'What types of Podia products work with this?',
    a: "Any Podia product with recurring billing — memberships, subscription bundles, recurring course access. One-time purchases don't apply since there's nothing to cancel.",
  },
  {
    q: 'What if a member really wants to cancel?',
    a: "Then they cancel. ChurnRecovery never traps anyone or makes canceling impossible. It just gives your member one moment to reconsider — and gives you a shot at keeping them.",
  },
  {
    q: 'How much setup time does this actually take?',
    a: "About 10 minutes. Connect Stripe (5 min), configure your recovery message (3 min), test it (2 min). We have a step-by-step guide. No developer needed.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "Cancel anytime. No contracts, no lock-in. Start with a 30-day free trial — there's nothing to lose.",
  },
]

export default function PodiaLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Podia Creators | ChurnRecovery</title>
        <meta name="description" content="Keep your Podia members from canceling their subscriptions. ChurnRecovery intercepts at the Stripe level — before members are gone for good." />
        <link rel="canonical" href="https://churnrecovery.com/for/podia" />
        <meta property="og:title" content="Churn Recovery for Podia Creators | ChurnRecovery" />
        <meta property="og:description" content="Membership cancels on Podia happen silently. ChurnRecovery intercepts at the Stripe level and gives you a chance to win them back." />
        <meta property="og:url" content="https://churnrecovery.com/for/podia" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Podia Creators" />
        <meta name="twitter:description" content="Keep your Podia members from canceling. Intercept at the Stripe level before it's too late." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#0F0B2E_0%,#1E1A4A_50%,#0F0B2E_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.2)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(79,70,229,0.2)] border border-[rgba(79,70,229,0.4)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#A5B4FC] mb-7">
              <span>✓</span> Built for Podia Creators · 30-Day Free Trial
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Keep Your Podia Members<br />
              <span className="text-[#A5B4FC]">From Canceling Their Subscriptions</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] mx-auto">
              When a Podia member cancels, it happens silently — no warning, no intervention point, no second chance.
              ChurnRecovery intercepts at the Stripe level before the cancel is final, giving you a real shot at keeping them.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-podia" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 30-day free trial — no credit card required
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ Set up in 10 minutes
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-sans text-[0.9rem] text-[rgba(255,255,255,0.6)] no-underline border-b border-[rgba(255,255,255,0.3)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PAIN POINTS ─────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#EA580C] uppercase tracking-[0.08em] mb-3">The Silent Membership Drain</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Podia Cancellations Happen<br />Without a Single Warning
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7] m-0">
                Podia gives you a beautiful storefront. It doesn&apos;t give you a way to save a member who&apos;s about to leave.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="🚪"
                title="Zero Intervention Point"
                description="A member clicks cancel — and that's it. Podia doesn't ask why. It doesn't offer a pause. It doesn't give you a chance to say anything. They're gone before you even know they were thinking about leaving."
              />
              <PainCard
                icon="💸"
                title="Every Cancel Compounds"
                stat="3–8%"
                statLabel="monthly churn rate for online memberships"
                description="Lose 5% of your members every month and in a year you've replaced your entire list — just to stay flat. The math is brutal."
              />
              <PainCard
                icon="😶"
                title="No 'Why' Either"
                description="You won't know if they left because life got busy, because the price felt too high, or because they got the value they needed. No data. No signal. Just a cancellation notification."
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#4F46E5] uppercase tracking-[0.08em] mb-3">How It Works</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Works With Podia Because Podia Runs on Stripe
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7] m-0">
                Podia uses Stripe to process all subscription payments. ChurnRecovery hooks into Stripe — no Podia integration needed.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Link ChurnRecovery to the Stripe account connected to your Podia store. We listen for cancellation webhooks from Stripe — the same ones Podia fires when a member cancels. Takes 5 minutes."
                callout="✓ Works with Podia's existing Stripe connection. No extra setup on Podia's side."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="Intercept Before It's Final"
                description="The moment a member initiates a cancellation, ChurnRecovery catches the Stripe webhook. We trigger your recovery flow instantly — before the cancel is processed and the member is gone."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Automatically Delivered"
                description="Your member sees a personalized message: a 30-day pause option, a discount offer, a personal note from you. Configured once, runs automatically forever."
                callout="🎯 Avg save rate: 20–35% of at-risk members"
              />
            </div>

            <div className="mt-8 bg-[#EEF2FF] border border-[#4F46E530] border-l-4 border-l-[#4F46E5] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                Why does this work with Podia?
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] leading-[1.7] m-0 mb-[10px]">
                Podia processes all subscription payments through Stripe. That means every cancellation fires a Stripe webhook — and that&apos;s exactly where ChurnRecovery operates. We don&apos;t need a Podia API or any special Podia integration. We work at the payment layer.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#4F46E5] no-underline font-semibold">
                Read the technical docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[#EEF2FF] border border-[#4F46E540] rounded-[10px] py-3.5 px-7 font-sans font-bold text-[#4F46E5] no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999999] mt-2">
                See a live cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#4F46E5] uppercase tracking-[0.08em] mb-3">What You Get</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Everything You Need to Protect Your Podia Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⚡"
                title="Real-Time Cancel Detection"
                description="Know the instant a member starts to cancel — not after you check your Stripe dashboard tomorrow."
              />
              <BenefitCard
                icon="⏸"
                title="Pause Option Instead of Cancel"
                description="Give burned-out members a 30-day breather. Pausing feels easier than canceling — and most people come back after a break."
              />
              <BenefitCard
                icon="💬"
                title="Personalized Win-Back Messages"
                description="A message that sounds like it came from you, not a software popup. Warm, human, and effective."
              />
              <BenefitCard
                icon="📉"
                title="Automated Discount Offers"
                description="Offer a limited discount at the exact moment someone is about to leave. One-time, automatic, no manual work required."
              />
              <BenefitCard
                icon="📊"
                title="Revenue Saved Dashboard"
                description="See exactly how many members you recovered and how much revenue you protected. Know your numbers."
              />
              <BenefitCard
                icon="🏷"
                title="Course & Membership Templates"
                description="Pre-written messages designed for course creators and membership site owners. Customizable in minutes."
              />
              <BenefitCard
                icon="🆓"
                title="$20/month — Flat"
                description="30-day free trial, then $20/month. All features included — no per-subscriber fees. Cancel anytime."
              />
              <BenefitCard
                icon="🔒"
                title="No Code, No Developer"
                description="You create courses. You don't write code. ChurnRecovery keeps it that way — setup is copy-paste simple."
              />
            </div>
          </div>
        </section>

        {/* ─── PRICING ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Priced for Creators, Not Enterprises
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              30-day free trial. $20/month after. All features included.
            </p>

            <div className="max-w-[380px] mx-auto mb-7">
              {[
                { tier: 'All Features', price: '$20/month', range: '30-day free trial', highlight: true },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} className="rounded-[10px] p-[18px] relative" style={{
                  background: highlight ? '#EEF2FF' : '#FAF9F5',
                  border: `1px solid ${highlight ? '#4F46E5' : '#E5E5E5'}`,
                }}>
                  {highlight && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#4F46E5] text-white font-sans text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">SIMPLE PRICING</div>
                  )}
                  <div className="font-sans font-bold text-[#191919] text-[0.9rem]">{tier}</div>
                  <div className="font-sans font-extrabold text-[1.4rem] my-1" style={{ color: highlight ? '#4F46E5' : '#191919' }}>{price}</div>
                  <div className="font-serif text-[0.78rem] text-[#666666]">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              Churnkey charges $100–$800/month. ProfitWell Retain starts at $400+. ChurnRecovery is just $20/month.
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Podia Creators
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
                  Tactics for Podia course and membership creators
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
                  Add a retention flow to any Stripe-powered platform
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
                  Pick the right offer for your Podia audience
                </div>
              </a>
            </div>
          </div>
        </section>
        {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#0F0B2E_0%,#1E1A4A_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              Someone Is Canceling<br />Their Podia Membership Right Now.
              <br /><span className="text-[#A5B4FC]">Are You Going to Catch It?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your 30-day free trial — no credit card, no contracts.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-podia" dark={true} />
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
