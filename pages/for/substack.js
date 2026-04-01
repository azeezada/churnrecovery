import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'
import { buildFAQSchema } from '../../lib/faq-schema'

// ─── Pain card ──────────────────────────────────────────────────────────────
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

// ─── How it works step ──────────────────────────────────────────────────────
function HowStep({ number, icon, title, description, callout }) {
  return (
    <div className="bg-brand-white border border-brand-border rounded-xl py-7 px-6">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-substack-bg border-2 border-brand-accent flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-brand-accent shrink-0">
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
        <div className="bg-substack-bg border border-brand-accent/20 rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-brand-orange">
          {callout}
        </div>
      )}
    </div>
  )
}

// ─── Benefit card ───────────────────────────────────────────────────────────
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

// ─── FAQ item ────────────────────────────────────────────────────────────────
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
        <span className="text-brand-accent text-[1.2rem] font-bold shrink-0">
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

const faqs = [
  {
    q: 'Does this work with Substack?',
    a: "Yes. Substack processes payments through Stripe. ChurnRecovery connects to your Stripe account and listens for cancellation webhooks — no Substack API access needed.",
  },
  {
    q: 'Do I need a developer to set this up?',
    a: "Nope. If you can copy-paste a URL, you can install ChurnRecovery. The whole setup takes about 10 minutes, and we have step-by-step guides.",
  },
  {
    q: 'Will my subscribers see a corporate-looking cancel flow?',
    a: "No. Your messages are fully customizable. Your voice, your brand, your tone. It'll feel like a personal note from you, not a popup from some software company.",
  },
  {
    q: 'What if I only have a few hundred paid subscribers?',
    a: "That's exactly who this is built for. Even recovering 1–2 subscribers per month at $5–$10 each adds up. And with a 30-day free trial, there's zero risk.",
  },
  {
    q: 'How is this different from what Substack offers?',
    a: "Substack has no cancel flow. When someone clicks cancel, they're gone. ChurnRecovery adds that missing layer — the moment between 'I'm thinking about canceling' and 'I'm gone.'",
  },
  {
    q: 'Does ChurnRecovery store my subscribers\' data?',
    a: "We receive webhook events from Stripe — subscriber IDs and subscription status. We don't store payment info or email addresses beyond what's needed to trigger your recovery flow.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "Cancel anytime. No contracts. Start with a 30-day free trial — you have nothing to lose.",
  },
]

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function SubstackLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Substack Creators | ChurnRecovery</title>
        <meta name="description" content="Stop losing paid Substack subscribers. ChurnRecovery detects cancellations in real-time and automatically wins them back. 30-day free trial, then $20/month." />
        <link rel="canonical" href="https://churnrecovery.com/for/substack" />
        <meta property="og:title" content="Churn Recovery for Substack Creators | ChurnRecovery" />
        <meta property="og:description" content="Catch Substack cancellations in real-time. Automatically win back paid subscribers with personalized offers — no code required." />
        <meta property="og:url" content="https://churnrecovery.com/for/substack" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Substack Creators" />
        <meta name="twitter:description" content="Stop losing paid subscribers silently. ChurnRecovery catches cancellations in real-time." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      </Head>

      <Header />

      <main className="font-sans bg-brand-bg pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="py-[80px] px-6 pb-[100px] relative overflow-hidden bg-[linear-gradient(135deg,#1A0A00_0%,#2D1200_50%,#1A0A00_100%)]">
          {/* Substack orange glow */}
          <div className="absolute -top-[80px] -right-[80px] w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,103,25,0.12)_0%,transparent_70%)]" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(255,103,25,0.15)] border border-[rgba(255,103,25,0.3)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#FF9A6A] mb-7">
              <span>✓</span> 30-Day Free Trial · No Credit Card Required
            </div>

            <h1 className="lp-hero-heading text-brand-white m-0 mb-5">
              Stop Losing Paid Subscribers<br />
              <span className="text-[#FF9A6A]">Before They Even Cancel</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-white/75 m-0 mb-10 leading-[1.7] max-w-[600px] mx-auto">
              ChurnRecovery catches Substack cancellations in real-time — then automatically offers the right discount, pause option, or personal message to win them back. Recover revenue you didn&apos;t even know you were losing.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-substack" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-white/50">
                🆓 30-day free trial — no credit card required
              </span>
              <span className="font-sans text-[0.8rem] text-white/50">
                ⚡ Takes 10 minutes to set up
              </span>
            </div>

            {/* Secondary link */}
            <div className="mt-5">
              <Link href="/demo" className="font-sans text-[0.9rem] text-white/60 no-underline border-b border-white/30">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: PAIN POINTS ──────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-bg">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-brand-orange uppercase tracking-[0.08em] mb-3">
                The Silent Revenue Leak
              </div>
              <h2 className="section-heading-lg text-brand-text m-0 mb-4">
                Every Substack Cancellation =<br />Money Walking Out the Door
              </h2>
              <p className="font-serif text-base text-brand-gray max-w-[540px] mx-auto leading-[1.7] m-0">
                Substack shows you when someone cancels. It doesn&apos;t tell you <em>why</em> — or give you a chance to change their mind.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="💸"
                title="The Invisible Leak"
                stat="3–8%"
                statLabel="of paid subscribers lost every month — average"
                description="On a $5,000/month Substack, that's $150–$400 disappearing quietly every single month. Compounding."
              />
              <PainCard
                icon="🚪"
                title="No Second Chance"
                description='Right now, when someone clicks "Cancel Subscription" on Substack, they&apos;re gone. No pause option. No discount offer. No "why are you leaving?" — just gone.'
              />
              <PainCard
                icon="📊"
                title="You're Flying Blind"
                description="You find out in your Stripe dashboard, days later. By then, they've already moved on — and you've missed your only window to save them."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" className="py-[80px] px-6 bg-brand-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-brand-accent uppercase tracking-[0.08em] mb-3">
                Dead Simple Setup
              </div>
              <h2 className="section-heading-lg text-brand-text m-0 mb-4">
                Works With Substack in 10 Minutes
              </h2>
              <p className="font-serif text-base text-brand-gray max-w-[480px] mx-auto leading-[1.7] m-0">
                No code. No developer. Just connect and go.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect to Substack"
                description="Paste your Substack webhook URL into ChurnRecovery. We listen for cancellation signals from Stripe — the payment processor Substack uses under the hood. Takes 2 minutes."
                callout="✓ No developer needed. Copy-paste is all it takes."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations in Real-Time"
                description="The moment a subscriber starts to cancel, ChurnRecovery fires. We intercept the signal before it's final and trigger your personalized recovery flow — automatically."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Message, Your Offer — Automatically"
                description="Subscribers see a custom message from YOU: a pause option, a discount, a heartfelt note — whatever you've set up. Many will stay. You'll be surprised."
                callout="🎯 Avg save rate: 20–35% of at-risk subscribers"
              />
            </div>

            {/* Technical callout box */}
            <div className="mt-8 bg-[#FFF8F5] border border-brand-accent/20 border-l-4 border-l-brand-accent rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-brand-text m-0 mb-2 text-[0.95rem]">
                &ldquo;But Substack doesn&apos;t have a cancel flow...&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-brand-gray m-0 mb-2.5 leading-[1.7]">
                Right — that&apos;s exactly the problem. ChurnRecovery uses Stripe webhook events (which Substack fires behind the scenes) to detect cancellations and trigger recovery before the payment stops.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-brand-accent no-underline font-semibold">
                Technical integration docs →
              </Link>
            </div>

            {/* Demo link */}
            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-substack-bg border border-brand-accent/25 rounded-[10px] py-3.5 px-7 font-sans font-bold text-brand-accent no-underline text-[0.95rem] transition-all duration-150">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-brand-gray-light mt-2">
                See a live cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: BENEFITS ─────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-bg">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-brand-accent uppercase tracking-[0.08em] mb-3">
                What You Get
              </div>
              <h2 className="section-heading-lg text-brand-text m-0">
                Everything You Need to Stop the Bleed
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard icon="✅" title="Real-Time Cancellation Detection" description="Know the moment someone tries to leave — not days later in Stripe." />
              <BenefitCard icon="💬" title="Automated Win-Back Messages" description="Set up once: a personal note, a discount offer, or a 'take a break' option — automatically shown to canceling subscribers." />
              <BenefitCard icon="⏸" title="Pause Instead of Cancel" description="Give subscribers a 1-month pause option. Many people cancel because life got busy — not because they hate your newsletter." />
              <BenefitCard icon="📉" title="Discount Offers on Autopilot" description="Offer 20% off or 1 month free to at-risk subscribers. Keep them at a discount — better than losing them forever." />
              <BenefitCard icon="📊" title="Revenue Recovery Dashboard" description="See exactly how much revenue you've saved. Track which messages work. Know your recovery rate." />
              <BenefitCard icon="🏷" title="Substack-Specific Templates" description="Pre-written messages designed for newsletter creators. Warm, personal, not salesy. Sounds like you, not a software company." />
              <BenefitCard icon="🏷" title="$20/month — Flat" description="30-day free trial, then $20/month. All features included — no per-subscriber fees. Cancel anytime." />
              <BenefitCard icon="🔒" title="No Code Required" description="You write newsletters, not code. We keep it that way. The whole setup takes about 10 minutes, with step-by-step guides." />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="section-heading-lg text-brand-text m-0 mb-5">
              Simple Pricing for Newsletter Creators
            </h2>
            <p className="font-serif text-base text-brand-gray leading-[1.7] m-0 mb-8">
              30-day free trial, then $20/month. All features included. No credit card required to start.
            </p>

            <div className="max-w-[380px] mx-auto mb-7">
              {[
                { tier: 'All Features', price: '$20/month', range: '30-day free trial', highlight: true },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} className={`rounded-[10px] p-[18px] relative ${highlight ? 'bg-substack-bg border border-brand-accent' : 'bg-brand-bg border border-brand-border'}`}>
                  {highlight && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-white font-sans text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">
                      SIMPLE PRICING
                    </div>
                  )}
                  <div className="font-sans font-bold text-brand-text text-[0.9rem]">{tier}</div>
                  <div className={`font-sans font-extrabold text-[1.4rem] my-1 ${highlight ? 'text-brand-accent' : 'text-brand-text'}`}>{price}</div>
                  <div className="font-serif text-[0.78rem] text-brand-gray">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-brand-green-light border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-brand-green mb-6">
              Compare to Churnkey ($100–$800/month) or ProfitWell Retain ($400+/month).
              You&apos;re welcome. 😊
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-bg">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="section-heading-lg text-brand-text m-0">
                Questions From Newsletter Creators
              </h2>
            </div>

            {faqs.map(faq => (
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
                  The Newsletter Creator's Guide to Reducing Churn
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  6 proven tactics for keeping paid subscribers
                </div>
              </a>
              <a
                href="/posts/newsletter-creator-case-study-saved-3600-year"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Case Study: How to Save $3,600/Year on Churn Tools
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Real numbers from a Beehiiv newsletter operator
                </div>
              </a>
              <a
                href="/posts/cancellation-emails-that-win-back-subscribers"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  5 Cancellation Emails That Actually Win Back Subscribers
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Copy-paste templates with proven win-back rates
                </div>
              </a>
            </div>
          </div>
        </section>
        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-[linear-gradient(135deg,#1A0A00_0%,#2D1200_100%)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-brand-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              Your Next Cancellation<br />Is Happening Right Now.
              <br /><span className="text-[#FF9A6A]">Are You Going to Catch It?</span>
            </h2>
            <p className="font-serif text-base text-white/70 m-0 mb-9 leading-[1.7]">
              Start your 30-day free trial. Start recovering Substack cancellations automatically.
              No credit card required.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-substack" dark={true} />
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
