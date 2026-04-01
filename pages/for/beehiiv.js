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
        <div className="w-12 h-12 rounded-full bg-[#FDF4F0] border-2 border-[#D97757] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#D97757] shrink-0">{number}</div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-sans text-[1.05rem] font-bold text-[#191919] m-0">
            {title}
          </h3>
        </div>
      </div>
      <p className="font-serif text-[0.9rem] text-[#666666] mb-3 leading-[1.7]">
        {description}
      </p>
      {callout && (
        <div className="bg-[#FDF4F0] border border-[#D9775730] rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-[#EA580C]">
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
        <h4 className="font-sans text-[0.92rem] font-bold text-[#191919] mb-1">
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
        <span className="text-[#D97757] text-[1.2rem] font-bold shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 bg-[#FAF9F5]">
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
    q: 'Does this work with Beehiiv?',
    a: "Yes. Beehiiv Scale uses Stripe to process paid subscriptions. ChurnRecovery connects to your Stripe account and listens for cancellation events — no special Beehiiv integration needed. As long as your paid newsletter runs through Stripe, it works.",
  },
  {
    q: 'Do I need to know how to code?',
    a: "Not at all. If you can copy-paste a webhook URL, you can set up ChurnRecovery. The whole process takes about 10 minutes, and we have step-by-step guides with screenshots.",
  },
  {
    q: "Will subscribers know it's a third-party tool?",
    a: "You control the messages. They'll see your words, your tone, your offer — not a generic SaaS popup. We're invisible infrastructure. Your subscribers just feel like you care about them.",
  },
  {
    q: "What if I'm on the free Beehiiv plan?",
    a: "Free Beehiiv newsletters don't have paid subscribers, so ChurnRecovery wouldn't apply. This is specifically for Beehiiv Scale creators who have paying subscribers processed through Stripe.",
  },
  {
    q: 'How is this different from what Beehiiv offers?',
    a: "Beehiiv doesn't have a cancellation flow for premium subscribers. When someone cancels, they just cancel. ChurnRecovery adds the missing layer — a moment between 'I'm thinking about canceling' and 'I'm gone.'",
  },
  {
    q: "What's the save rate?",
    a: "It depends on your newsletter and offers, but typical save rates are 20–35% of at-risk subscribers. On a $5,000/month newsletter, that can mean $1,000–$1,750/month recovered that you would have lost.",
  },
  {
    q: 'What if I want to cancel ChurnRecovery?',
    a: "Cancel any time. No contracts. Start with a 30-day free trial — you risk nothing by trying.",
  },
]

export default function BeehiivLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing Beehiiv Premium Subscribers | ChurnRecovery</title>
        <meta name="description" content="Beehiiv creators: stop losing paid newsletter subscribers at the cancel screen. ChurnRecovery works with Stripe to intercept cancellations and win them back automatically." />
        <link rel="canonical" href="https://churnrecovery.com/for/beehiiv" />
        <meta property="og:title" content="Stop Losing Beehiiv Premium Subscribers | ChurnRecovery" />
        <meta property="og:description" content="Catch Beehiiv cancellations in real-time. Automatically win back paid subscribers with personalized offers — no code required." />
        <meta property="og:url" content="https://churnrecovery.com/for/beehiiv" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing Beehiiv Premium Subscribers" />
        <meta name="twitter:description" content="Stop losing paid Beehiiv subscribers silently. ChurnRecovery catches cancellations in real-time." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#0A0A00_0%,#1A1A00_50%,#0A0A00_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,204,0,0.10)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(255,204,0,0.12)] border border-[rgba(255,204,0,0.25)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#FFE066] mb-7">
              <span>✓</span> 30-Day Free Trial · No Credit Card Required
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white mb-5 leading-[1.15] tracking-[-0.02em]">
              Stop Losing Beehiiv Premium<br />
              <span className="text-[#FFE066]">Subscribers at the Cancel Screen</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] mb-10 leading-[1.7] max-w-[600px] mx-auto">
              You&apos;ve built a real paid newsletter on Beehiiv. Now ChurnRecovery intercepts cancellations the moment they happen — and automatically offers the right message, discount, or pause to win subscribers back. Before they&apos;re gone.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-beehiiv" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 30-day free trial — no credit card required
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ 10-minute setup via Stripe
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-sans text-[0.9rem] text-[rgba(255,255,255,0.6)] no-underline border-b border-[rgba(255,255,255,0.3)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PAIN POINTS ─────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#EA580C] uppercase tracking-[0.08em] mb-3">The Paid Newsletter Problem</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] mb-4 tracking-[-0.02em]">
                Beehiiv Scale Is $99/Month.<br />Every Cancellation Feels Personal.
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[560px] mx-auto leading-[1.7]">
                You work hard on your newsletter. When a paid subscriber leaves, Beehiiv shows you a number drop — but gives you no way to stop it or understand why.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="💸"
                title="Subscribers Leave Silently"
                stat="3–8%"
                statLabel="monthly churn rate for paid newsletters"
                description="On a 500-subscriber paid newsletter at $10/month, that's $150–$400 disappearing every month. Quietly. Without warning."
              />
              <PainCard
                icon="🚪"
                title="Beehiiv Gives You No Cancel Flow"
                description="When a premium subscriber clicks cancel on Beehiiv, they're gone. No friction. No offer. No chance to save them. Beehiiv doesn't give you a cancel screen — we do."
              />
              <PainCard
                icon="📊"
                title="You Find Out Too Late"
                description="Your MRR drops in the dashboard. By then, the subscriber has moved on. You missed the one window where you could have changed their mind — the moment they almost left."
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#D97757] uppercase tracking-[0.08em] mb-3">Dead Simple Setup</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] mb-4 tracking-[-0.02em]">
                Works With Beehiiv in 10 Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                No developer. No code. Just connect your Stripe account and go.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect via Stripe"
                description="Beehiiv processes paid subscriptions through Stripe. Connect ChurnRecovery to your Stripe account — we listen for cancellation signals in real-time. Takes 2 minutes, no developer needed."
                callout="✓ Beehiiv Scale uses Stripe under the hood. We plug right in."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a subscriber starts to cancel their Beehiiv premium subscription, ChurnRecovery detects the signal. We intercept it before it's final and trigger your recovery flow automatically."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Message Wins Them Back"
                description="Subscribers see a personal message from you: a pause option, a discount, a note explaining what's coming in your newsletter. Many will stay. You'll be surprised how many."
                callout="🎯 Avg save rate: 20–35% of at-risk subscribers"
              />
            </div>

            <div className="mt-8 bg-[#FFFDF0] border border-[#FFCC0040] border-l-[4px] border-l-[#FFCC00] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] mb-2 text-[0.95rem]">
                &ldquo;Does ChurnRecovery work with Beehiiv?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] mb-2.5 leading-[1.7]">
                Yes. Beehiiv Scale uses Stripe to process paid subscriptions. ChurnRecovery hooks into Stripe webhooks to detect cancellations — no Beehiiv API integration required. If your Beehiiv newsletter is paid and running on Stripe, it works.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#D97757] no-underline font-semibold">
                See technical docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[#FDF4F0] border border-[#D9775740] rounded-[10px] py-3.5 px-7 font-sans font-bold text-[#D97757] no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999999] mt-2">
                See a live cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#D97757] uppercase tracking-[0.08em] mb-3">What You Get</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Keep the Subscribers You Worked Hard to Get
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Instead of Cancel"
                description="Offer subscribers a 1–2 month pause. Many people cancel because life got busy, not because they hate your content. A pause saves them."
              />
              <BenefitCard
                icon="💬"
                title="Understand Why People Leave"
                description="Collect cancellation reasons automatically. Is it price? No time? Missing content? You'll finally know — and you can fix it."
              />
              <BenefitCard
                icon="💰"
                title="Recover Revenue Automatically"
                description="Offer a discount at exactly the right moment — when they're about to leave. 20–35% of at-risk subscribers accept and stay."
              />
              <BenefitCard
                icon="📊"
                title="Revenue Recovery Dashboard"
                description="See how much you've saved, which messages work, and what your recovery rate is. Real data, not guesses."
              />
              <BenefitCard
                icon="✉️"
                title="Personal, On-Brand Messaging"
                description="Your messages sound like you — warm, creator-to-reader. Not a generic SaaS popup. Subscribers appreciate the human touch."
              />
              <BenefitCard
                icon="🆓"
                title="$20/month — Flat"
                description="One simple price after your 30-day free trial. All features included, no per-subscriber fees. Cancel anytime."
              />
            </div>
          </div>
        </section>

        {/* ─── PRICING ─────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] mb-5 tracking-[-0.02em]">
              Pricing That Makes Sense for Newsletter Creators
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] mb-8">
              Beehiiv Scale costs $99/month. ChurnRecovery is $20/month — a fraction of what tools like Churnkey charge.
            </p>

            <div className="max-w-[380px] mx-auto mb-7">
              <div className="rounded-[10px] p-[18px] relative" style={{
                background: '#FDF4F0',
                border: '1px solid #D97757',
              }}>
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#D97757] text-white font-sans text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">SIMPLE PRICING</div>
                <div className="font-sans font-bold text-[#191919] text-[0.9rem]">All Features</div>
                <div className="font-sans font-extrabold text-[1.4rem] my-1" style={{ color: '#D97757' }}>$20/month</div>
                <div className="font-serif text-[0.78rem] text-[#666666]">30-day free trial · No credit card required</div>
              </div>
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              Beehiiv Scale is $99/month. ChurnRecovery is just $20/month with a 30-day free trial. No brainer.
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Beehiiv Creators
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
                  Beehiiv-compatible tactics to keep paid subscribers
                </div>
              </a>
              <a
                href="/posts/newsletter-creator-case-study-saved-3600-year"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Case Study: Saving $3,600/Year on Churn Tools
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Real story of a Beehiiv newsletter operator
                </div>
              </a>
              <a
                href="/posts/cancellation-emails-that-win-back-subscribers"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  5 Cancellation Emails That Win Back Subscribers
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Templates for newsletter win-back sequences
                </div>
              </a>
            </div>
          </div>
        </section>
        {/* ─── FINAL CTA ───────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#0A0A00_0%,#1A1A00_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white mb-5 leading-[1.2] tracking-[-0.02em]">
              A Beehiiv Subscriber Is Canceling<br />Right Now.
              <br /><span className="text-[#FFE066]">Are You Going to Catch Them?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] mb-9 leading-[1.7]">
              Start your free trial. Stop Beehiiv cancellations automatically.
              $20/month after your 30-day trial.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-beehiiv" dark={true} />
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
