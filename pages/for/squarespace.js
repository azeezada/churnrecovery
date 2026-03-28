import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'

function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl px-6 py-7 border-t-[3px] border-t-black">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] m-0 mb-2">{title}</h3>
      {stat && <div className="font-sans font-extrabold text-[2rem] text-black my-1">{stat}</div>}
      {statLabel && <div className="font-sans text-[0.8rem] text-[#666666] mb-2">{statLabel}</div>}
      <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-relaxed">{description}</p>
    </div>
  )
}

function HowStep({ number, icon, title, description, callout }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl px-6 py-7">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-[rgba(0,0,0,0.06)] border-2 border-black flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-black shrink-0">{number}</div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-sans text-[1.05rem] font-bold text-[#191919] m-0">{title}</h3>
        </div>
      </div>
      <p className="font-serif text-[0.9rem] text-[#666666] mt-0 mb-3 leading-[1.7]">{description}</p>
      {callout && <div className="bg-[rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.1)] rounded-lg px-[14px] py-[10px] font-sans text-[0.8rem] text-[#191919]">{callout}</div>}
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
        <span className="text-black text-[1.2rem] font-bold shrink-0">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 bg-[#F7F7F7]">
          <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-[1.7]">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function SquarespaceLandingPage() {
  return (
    <>
      <Head>
        <title>Squarespace Doesn't Have a Cancel Flow. We Add One in 10 Minutes. | ChurnRecovery</title>
        <meta name="description" content="Squarespace subscription cancellations are completely silent — no pause offer, no discount, no exit survey. ChurnRecovery connects to your Stripe and adds a cancel flow in 10 minutes. $20/month with 30-day free trial." />
        <link rel="canonical" href="https://churnrecovery.com/for/squarespace" />
        <meta property="og:title" content="Squarespace Doesn't Have a Cancel Flow. We Add One in 10 Minutes." />
        <meta property="og:description" content="If you sell subscriptions or memberships through Squarespace + Stripe, ChurnRecovery can intercept cancellations before they happen. No code, no plugins needed." />
        <meta property="og:url" content="https://churnrecovery.com/for/squarespace" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Squarespace Doesn't Have a Cancel Flow. We Add One in 10 Minutes." />
        <meta name="twitter:description" content="Stop losing Squarespace subscribers silently. ChurnRecovery adds a pause offer, discount, or exit survey before they go." />
      </Head>

      <Header />

      <main className="font-sans bg-[#F7F7F7] pt-[60px]">

        {/* HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#000000_0%,#1a1a1a_100%)] pt-20 px-6 pb-[100px]">
          <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-[6px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-full px-4 py-[6px] font-sans text-[0.78rem] font-semibold text-[rgba(255,255,255,0.85)] mb-7">
              <span>✓</span> Built for Squarespace + Stripe sellers
            </div>

            <h1 className="font-sans font-extrabold text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em] text-[clamp(2.2rem,5vw,3.5rem)]">
              Squarespace Doesn&apos;t Give You<br />
              <span className="text-[rgba(255,255,255,0.65)]">a Cancel Flow.</span><br />
              <span className="text-white">We Add One in 10 Minutes.</span>
            </h1>

            <p className="font-serif text-[rgba(255,255,255,0.7)] m-0 mb-10 leading-[1.7] max-w-[600px] mx-auto text-[clamp(1rem,2.5vw,1.2rem)]">
              When a subscriber cancels on Squarespace, it happens silently. No pause option. No discount. No &quot;are you sure?&quot; They&apos;re just gone. ChurnRecovery connects to your Stripe account and gives you a fighting chance before they leave.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-squarespace" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">🆓 30-day free trial</span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">⚡ No code, no plugins</span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">🔗 Works with Stripe</span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-sans text-[0.9rem] text-[rgba(255,255,255,0.55)] no-underline border-b border-[rgba(255,255,255,0.25)]">
                See a live demo ↓
              </Link>
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="py-20 px-6 bg-[#F7F7F7]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#666666] uppercase tracking-[0.08em] mb-3">The Problem</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Every Squarespace Cancellation<br />Happens Without Warning
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Squarespace is a beautiful platform — but it was built for websites, not subscription retention. There&apos;s no built-in way to catch a cancellation before it&apos;s final.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard icon="🔇" title="Silent Cancellations" stat="100%" statLabel="of Squarespace cancellations go uncontested" description="There's no friction, no offer, no ask. One click and they're gone. Squarespace shows you the cancellation notification hours later — and by then, it's too late." />
              <PainCard icon="🚫" title="No Built-In Retention Tools" description="Squarespace has no cancel flow feature. No pause offer. No discount popup. No exit survey. If you want to save a subscriber, you have to do it manually — after the fact, when they're already gone." />
              <PainCard icon="💸" title="You're Losing Real Money" stat="$1,164" statLabel="lost per $97/mo subscriber who cancels" description="One cancellation sounds small. But if 3–5 people cancel per month, that's thousands of dollars leaking out annually. Without a cancel flow, you have zero chance to stop it." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#666666] uppercase tracking-[0.08em] mb-3">How It Works</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Works With Squarespace in 10 Minutes
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                Squarespace uses Stripe for subscription payments. ChurnRecovery connects to Stripe — not Squarespace. No plugins, no approval, no developers.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep number="1" icon="🔗" title="Connect Your Stripe Account" description="Squarespace uses Stripe to process your subscription payments. Link your Stripe account to ChurnRecovery with one click — it takes 60 seconds." callout="✓ No Squarespace settings to touch. No developer needed." />
              <HowStep number="2" icon="⚡" title="We Watch for Cancellations" description="ChurnRecovery monitors your Stripe account for cancellation events in real time. The moment someone starts the cancellation process, we trigger your recovery flow automatically." />
              <HowStep number="3" icon="💬" title="They See Your Offer — Not a Dead End" description="Instead of an instant cancellation, subscribers see a personalized message: a pause option, a discount, or a quick exit survey. Set it up once and it runs on its own." callout="🎯 20–35% of at-risk subscribers accept an offer" />
            </div>

            <div className="mt-8 bg-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.08)] border-l-4 border-l-black rounded-[10px] px-6 py-5 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does this actually work with Squarespace?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] mt-0 mb-[10px] leading-[1.7]">
                Yes — if your Squarespace memberships or subscriptions are connected to Stripe (which most are), ChurnRecovery works. We operate entirely at the Stripe level, so Squarespace doesn&apos;t need to approve or install anything.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-black no-underline font-semibold">
                See the technical setup docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.12)] rounded-[10px] px-7 py-[14px] font-sans font-bold text-[#191919] no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999999] mt-2">See a real cancel flow — no signup required</p>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-20 px-6 bg-[#F7F7F7]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold text-[#666666] uppercase tracking-[0.08em] mb-3">What You Get</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Everything Squarespace Forgot to Build
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[14px]">
              <BenefitCard icon="⏸" title="Pause Offer" description="Let subscribers pause for 1–3 months instead of canceling. Most people who leave during a busy period would have stayed if you'd offered a break." />
              <BenefitCard icon="🏷" title="Discount Offer" description="Automatically offer a discount to price-sensitive subscribers at the cancel screen — before they're gone. You decide the offer." />
              <BenefitCard icon="📋" title="Exit Survey" description="Find out exactly why people are leaving with a one-question exit survey. This alone is worth the setup — you'll know what to fix." />
              <BenefitCard icon="📊" title="Recovery Dashboard" description="Track saved subscribers, revenue recovered, and which offers work best — all in one clean dashboard." />
              <BenefitCard icon="🆓" title="30-Day Free Trial" description="$20/month after a 30-day free trial. No credit card to start. All features included from day one." />
              <BenefitCard icon="🚫" title="No Squarespace Approval" description="No plugin to install. No app marketplace. No waiting. ChurnRecovery works outside of Squarespace entirely, through Stripe." />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Questions About Squarespace + ChurnRecovery
              </h2>
            </div>

            {[
              { q: 'Does ChurnRecovery work with all Squarespace subscriptions?', a: "It works with Squarespace subscriptions that process payments through Stripe. Most Squarespace membership sites and recurring digital products use Stripe. If you're unsure, check your Squarespace payment settings — if Stripe is listed, you're set." },
              { q: 'Does Squarespace need to approve this?', a: "No. ChurnRecovery works at the Stripe level, completely outside of Squarespace. Squarespace has no visibility into Stripe webhook events. You don't need Squarespace's permission or any app installation." },
              { q: 'Will this interfere with my Squarespace site?', a: "Not at all. ChurnRecovery doesn't touch your Squarespace site, theme, or settings. Your site looks and functions exactly the same. We add a layer at the payment processor level — invisible to your site, visible to your subscribers when they try to cancel." },
              { q: 'How quickly can I set this up?', a: "Most Squarespace sellers are set up in under 10 minutes. You connect your Stripe account, choose your recovery offer (pause, discount, or survey), and you're live. No code, no design work, no developer." },
              { q: "What if someone wants to cancel even after seeing my offer?", a: "They can still cancel. ChurnRecovery doesn't block cancellations — it intercepts them with an offer first. If the subscriber declines, they complete the cancellation normally. You still get the exit survey data, which is valuable on its own." },
              { q: 'Does this work with Squarespace Scheduling (Acuity)?', a: "ChurnRecovery works with any Squarespace product that uses Stripe for recurring billing — membership sites, digital subscriptions, and recurring service plans connected to Stripe. Squarespace Scheduling appointments (one-time bookings) aren't subscription-based, so those wouldn't apply." },
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
                href="/posts/what-is-a-cancel-flow"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  What Is a Cancel Flow?
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Add a retention layer to Squarespace subscriptions
                </div>
              </a>
              <a
                href="/posts/subscription-business-leaking-revenue-every-month"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Your Subscription Business Is Leaking Revenue
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  The math on monthly churn losses
                </div>
              </a>
              <a
                href="/posts/hidden-revenue-leak-subscription-business"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  The Hidden Revenue Leak in Your Subscription Business
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Find and fix the leaks in your billing
                </div>
              </a>
            </div>
          </div>
        </section>
        {/* FINAL CTA */}
        <section className="py-20 px-6 bg-[linear-gradient(135deg,#000000_0%,#1a1a1a_100%)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.6rem)]">
              A Squarespace Subscriber Is<br />
              <span className="text-[rgba(255,255,255,0.6)]">About to Cancel Silently.</span><br />
              Be Ready.
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your 30-day free trial and be first to protect your Squarespace subscription revenue with a real cancel flow. $20/month after trial.
            </p>
            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-squarespace" dark={true} />
            </div>
            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">Free during beta</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">Cancel anytime</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)]">No spam, ever</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
