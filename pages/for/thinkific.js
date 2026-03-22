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
        <div className="w-12 h-12 rounded-full bg-brand-purple-light border-2 border-brand-purple flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-brand-purple shrink-0">
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
        <div className="bg-brand-purple-light border border-brand-purple/20 rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-brand-purple">
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
        <span className="text-brand-purple text-[1.2rem] font-bold shrink-0">
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

export default function ThinkificLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Thinkific Course Creators | ChurnRecovery</title>
        <meta name="description" content="Stop losing Thinkific subscription students at the cancel button. ChurnRecovery works natively with Thinkific's Stripe payments to save students before they leave." />
        <link rel="canonical" href="https://churnrecovery.com/for/thinkific" />
        <meta property="og:title" content="Churn Recovery for Thinkific Course Creators | ChurnRecovery" />
        <meta property="og:description" content="Students cancel without warning. ChurnRecovery intercepts Thinkific cancellations at the Stripe level and gives you a chance to win them back." />
        <meta property="og:url" content="https://churnrecovery.com/for/thinkific" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Thinkific Course Creators" />
        <meta name="twitter:description" content="Stop losing subscription students silently. ChurnRecovery works natively with Thinkific via Stripe." />
      </Head>

      <Header />

      <main className="font-sans bg-brand-bg pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 pb-[100px] relative overflow-hidden bg-[linear-gradient(135deg,#1A0A3E_0%,#2D1A5E_50%,#1A0A3E_100%)]">
          <div className="absolute -top-[80px] -right-[80px] w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(124,58,237,0.2)_0%,transparent_70%)]" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(124,58,237,0.2)] border border-[rgba(124,58,237,0.4)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#C4B5FD] mb-7">
              <span>✓</span> Built for Thinkific Creators · Free During Beta
            </div>

            <h1 className="lp-hero-heading text-brand-white m-0 mb-5">
              Stop Losing Thinkific<br />
              <span className="text-[#C4B5FD]">Subscription Students at the Cancel Button</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-white/75 m-0 mb-10 leading-[1.7] max-w-[600px] mx-auto">
              Students who paid for your course bundle or membership cancel without warning — and without giving you a chance to save them.
              ChurnRecovery works natively with Thinkific&apos;s Stripe payments to intercept at the exact moment of cancel.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-thinkific" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-white/50">
                🆓 Free forever under $1k/month MRR
              </span>
              <span className="font-sans text-[0.8rem] text-white/50">
                ⚡ Works natively with Thinkific
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-sans text-[0.9rem] text-white/60 no-underline border-b border-white/30">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PAIN POINTS ─────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-bg">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-brand-orange uppercase tracking-[0.08em] mb-3">
                The Course Creator Blind Spot
              </div>
              <h2 className="section-heading-lg text-brand-text m-0 mb-4">
                Your Best Students Are Canceling<br />Without Saying Goodbye
              </h2>
              <p className="font-serif text-base text-brand-gray max-w-[540px] mx-auto leading-[1.7] m-0">
                Thinkific tells you when a subscription ends. It doesn&apos;t tell you <em>why</em> — and it gives you no way to intervene.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="📚"
                title="Students Ghost Without Warning"
                description="A student who enrolled in your premium bundle 3 months ago just cancels. No message, no complaint, no chance for you to offer help. They're gone before you even know something was wrong."
              />
              <PainCard
                icon="💸"
                title="Each Cancel = Lost LTV"
                stat="3–8%"
                statLabel="monthly churn on subscription courses"
                description="A student worth $50/month who cancels after month 2 could have been worth $600/year. Multiply that across your subscriber base and the numbers get painful fast."
              />
              <PainCard
                icon="🚫"
                title="No 'Are You Sure?' Moment"
                description="Thinkific has no native cancel flow. No exit survey, no pause option, no retention offer. Students click cancel and the subscription ends. You find out later in your dashboard."
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-[80px] px-6 bg-brand-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-brand-purple uppercase tracking-[0.08em] mb-3">
                Native Thinkific Integration
              </div>
              <h2 className="section-heading-lg text-brand-text m-0 mb-4">
                Thinkific Uses Stripe. So Does ChurnRecovery.
              </h2>
              <p className="font-serif text-base text-brand-gray max-w-[480px] mx-auto leading-[1.7] m-0">
                No custom code. No Thinkific API needed. We intercept at the Stripe layer — where cancellations actually happen.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect to Your Stripe Account"
                description="Thinkific subscription payments flow through Stripe. Connect ChurnRecovery to the same Stripe account, and we immediately start listening for cancellation signals. 5-minute setup."
                callout="✓ No Thinkific developer account or API keys required."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="Catch the Cancel Signal Instantly"
                description="When a student initiates a subscription cancellation, Stripe fires a webhook. ChurnRecovery intercepts it in real time — before the cancellation is final and before the student closes the tab."
              />
              <HowStep
                number="3"
                icon="🎯"
                title="Deliver Your Recovery Offer"
                description="Your student sees a personalized message — a discount on their next billing cycle, an option to pause for 30 days, or a personal note from you. Configured once, automated forever."
                callout="🎯 Avg save rate: 20–35% of at-risk students"
              />
            </div>

            <div className="mt-8 bg-brand-purple-light border border-brand-purple/20 border-l-4 border-l-brand-purple rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-brand-text m-0 mb-2 text-[0.95rem]">
                &ldquo;Thinkific already has subscription management...&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-brand-gray m-0 mb-2.5 leading-[1.7]">
                Thinkific manages subscriptions — but it has no cancel flow. There&apos;s no pause option, no exit survey, no intervention moment. ChurnRecovery adds that missing layer between &quot;I&apos;m thinking about canceling&quot; and &quot;I&apos;m gone.&quot;
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-brand-purple no-underline font-semibold">
                Read the technical integration docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-brand-purple-light border border-brand-purple/25 rounded-[10px] py-3.5 px-7 font-sans font-bold text-brand-purple no-underline text-[0.95rem]">
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
              <div className="font-sans text-[0.75rem] font-bold text-brand-purple uppercase tracking-[0.08em] mb-3">
                What You Get
              </div>
              <h2 className="section-heading-lg text-brand-text m-0">
                Everything a Thinkific Creator Needs to Reduce Churn
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard icon="⚡" title="Real-Time Cancel Detection" description="Stop finding out about cancellations in your Stripe dashboard the next day. Know the moment it starts." />
              <BenefitCard icon="⏸" title="Subscription Pause Option" description="Students who cancel because they're overwhelmed often just need a break. A 30-day pause keeps them from leaving permanently." />
              <BenefitCard icon="💬" title="Personalized Win-Back Messages" description="A message in your voice, not corporate software language. Students feel heard, not trapped." />
              <BenefitCard icon="📉" title="Automated Discount Offers" description="One-time discount at the cancel moment. Keep students at a lower price — better than zero." />
              <BenefitCard icon="📊" title="Revenue Recovery Dashboard" description="Track exactly how many students you saved and how much revenue was recovered. See what messages work best." />
              <BenefitCard icon="🎓" title="Course Creator Templates" description="Pre-written messages for subscription courses and membership programs. Warm, personal, effective — and customizable." />
              <BenefitCard icon="🆓" title="Free Under $1k/Month MRR" description="Building your subscription course business? Free until $1k/month. No credit card, no trial expiration." />
              <BenefitCard icon="🔒" title="No Code Setup" description="Connect Stripe, write your message, go live. No developer. No API calls. Step-by-step guide included." />
            </div>
          </div>
        </section>

        {/* ─── PRICING ─────────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="section-heading-lg text-brand-text m-0 mb-5">
              Built for Course Creators — Not Enterprise SaaS
            </h2>
            <p className="font-serif text-base text-brand-gray leading-[1.7] m-0 mb-8">
              Free while you grow. Scales affordably when you do.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { tier: 'Starter', price: '$0/month', range: 'Under $1k MRR', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} className={`rounded-[10px] p-[18px] relative ${highlight ? 'bg-brand-purple-light border border-brand-purple' : 'bg-brand-bg border border-brand-border'}`}>
                  {highlight && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand-purple text-brand-white font-sans text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">
                      START HERE FREE
                    </div>
                  )}
                  <div className="font-sans font-bold text-brand-text text-[0.9rem]">{tier}</div>
                  <div className={`font-sans font-extrabold text-[1.4rem] my-1 ${highlight ? 'text-brand-purple' : 'text-brand-text'}`}>{price}</div>
                  <div className="font-serif text-[0.78rem] text-brand-gray">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-brand-green-light border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-brand-green mb-6">
              Enterprise churn tools start at $400–$800/month. ChurnRecovery starts at $0. The math is easy. 😊
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-brand-bg">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="section-heading-lg text-brand-text m-0">
                Questions From Thinkific Creators
              </h2>
            </div>

            {[
              {
                q: 'Does ChurnRecovery work with Thinkific subscriptions?',
                a: "Yes. Thinkific processes subscription payments through Stripe. ChurnRecovery connects to your Stripe account and listens for cancellation events — no Thinkific API or custom integration needed.",
              },
              {
                q: 'Which Thinkific products work with this?',
                a: "Any Thinkific product with recurring billing — subscription courses, membership access, course bundles with monthly payments. One-time course purchases don't have anything to cancel.",
              },
              {
                q: 'Do I need a developer to set this up?',
                a: "No developer needed. If you can log into Stripe and copy a webhook URL, you can set up ChurnRecovery. Our step-by-step guide walks you through the whole thing in about 10 minutes.",
              },
              {
                q: 'Can I customize the message students see?',
                a: "Yes — 100% customizable. Write it in your own voice. Choose what offer to show (discount, pause, personal message, or all three). Preview it before going live.",
              },
              {
                q: 'What happens to students who still want to cancel?',
                a: "They cancel. ChurnRecovery is not a dark pattern — students can always complete their cancellation. We just give you one chance to change their mind before they go.",
              },
              {
                q: 'Will this slow down the cancellation process for students?',
                a: "No. The recovery flow appears immediately and students can dismiss it instantly if they want. We respect their time — we just ask for 10 extra seconds.",
              },
              {
                q: "What if my Thinkific school doesn't have subscriptions yet?",
                a: "Then bookmark this for when you add them. ChurnRecovery only applies to recurring subscription products. One-time course purchases don't need churn recovery.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
        <section className="py-[80px] px-6 bg-[linear-gradient(135deg,#1A0A3E_0%,#2D1A5E_100%)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-brand-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Thinkific Student Is<br />Canceling Right Now.
              <br /><span className="text-[#C4B5FD]">Will You Be There to Stop It?</span>
            </h2>
            <p className="font-serif text-base text-white/70 m-0 mb-9 leading-[1.7]">
              Sign up for free. Free for Thinkific course creators — no credit card required.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-thinkific" dark={true} />
            </div>

            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-white/45">Free during beta</span>
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
