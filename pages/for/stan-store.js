import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PainCard from '../../components/for/PainCard'
import HowStep from '../../components/for/HowStep'
import BenefitCard from '../../components/for/BenefitCard'
import FAQItem from '../../components/for/FAQItem'
import SignUpCTA from '../../components/SignUpCTA'

const ACCENT = '#ec4899'
const ACCENT_LIGHT = '#f9a8d4'
const ACCENT_BG = 'rgba(236,72,153,0.08)'
const ACCENT_DARK_BG = 'rgba(236,72,153,0.15)'

export default function StanStoreLandingPage() {
  return (
    <>
      <Head>
        <title>Stan Store Subscribers Canceling? Here's How to Stop It. | ChurnRecovery</title>
        <meta name="description" content="When a Stan Store subscriber hits cancel, they usually just need a pause — not a goodbye. ChurnRecovery intercepts the cancel and offers a deal, in your voice, automatically." />
        <link rel="canonical" href="https://churnrecovery.com/for/stan-store" />
        <meta property="og:title" content="Stan Store Subscribers Canceling? Here's How to Stop It. | ChurnRecovery" />
        <meta property="og:description" content="Stan Store connects to your Stripe. ChurnRecovery plugs into that same Stripe and catches subscription cancellations before they're final. No code, no Stan approval needed." />
        <meta property="og:url" content="https://churnrecovery.com/for/stan-store" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stan Store Subscribers Canceling? Here's How to Stop It." />
        <meta name="twitter:description" content="80k+ creators use Stan Store. Most of them have no cancel recovery. ChurnRecovery adds one automatically — pause offers, discounts, exit surveys." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section
          className="bg-[linear-gradient(135deg,#1a0a12_0%,#2d0f20_50%,#1a0a12_100%)] py-20 px-6 pb-[100px] relative overflow-hidden"
        >
          <div
            style={{ background: `radial-gradient(circle, ${ACCENT_DARK_BG} 0%, transparent 70%)` }}
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div
              style={{ color: ACCENT_LIGHT }}
              className="inline-flex items-center gap-[6px] bg-[rgba(236,72,153,0.15)] border border-[rgba(236,72,153,0.35)] rounded-full py-[6px] px-4 font-sans text-[0.78rem] font-semibold mb-7"
            >
              <span>✓</span> Built for Stan Store Creators · Free During Beta
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Stan Store Subscribers Canceling?<br />
              <span style={{ color: ACCENT_LIGHT }}>Here&apos;s How to Stop It.</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] mx-auto">
              Your subscribers don&apos;t want to leave — they&apos;re just having a rough week. Stan Store has no cancel flow. ChurnRecovery adds one automatically: a pause, a deal, or a check-in from you — before they&apos;re gone.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-stan-store" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ Works with Stan Creator Pro &amp; Stripe
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                💕 No Stan approval needed
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
              <div style={{ color: ACCENT }} className="font-sans text-xs font-bold uppercase tracking-[0.08em] mb-3">The Creator Churn Problem</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Every Cancel Is Revenue<br />That Didn&apos;t Have to Leave
              </h2>
              <p className="font-serif text-base text-[#666] max-w-[540px] mx-auto leading-[1.7] m-0">
                Stan Store is incredible for turning followers into paying subscribers. But when someone clicks cancel, there&apos;s nothing between you and losing them forever.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="💸"
                title="Subscription Revenue Just Disappears"
                stat="5–10%"
                statLabel="of subscribers cancel every month on average"
                description="You work hard to convert a follower into a paying subscriber. Then one bad week hits, they click cancel, and $29/month walks out the door — with no warning and no chance to keep them."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🤷"
                title="No Visibility Into Why They Leave"
                description="Stan Store doesn&apos;t give you a cancel reason. They just… leave. Was it price? Overwhelm? A slow week of content? You&apos;ll never know — and you can&apos;t fix what you can&apos;t see."
                accentColor={ACCENT}
              />
              <PainCard
                icon="👆"
                title="One Click and They&apos;re Gone"
                description="A Stan subscriber can cancel in one tap from the app. No confirmation. No &lsquo;are you sure?&rsquo; No offer. This is an impulse cancel — and impulse cancels are exactly what a pause offer stops."
                accentColor={ACCENT}
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div style={{ color: ACCENT }} className="font-sans text-xs font-bold uppercase tracking-[0.08em] mb-3">3 Steps, No Code</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Works With Stan Store in Minutes
              </h2>
              <p className="font-serif text-base text-[#666] max-w-[480px] mx-auto leading-[1.7] m-0">
                Stan Store Creator Pro connects to your Stripe account. ChurnRecovery connects to that same Stripe — no Stan integration, no developer needed.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect the same Stripe account you use with Stan Store. One OAuth click — no keys, no code. If you&apos;re on Creator Pro, you already have direct Stripe."
                callout="✓ Stan Creator Pro requires Stripe — you're already halfway there."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Every Cancel in Real Time"
                description="The moment a subscriber initiates a cancel — in the app, on desktop, anywhere — ChurnRecovery fires. We intercept the Stripe event before it&apos;s final and trigger your recovery flow."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Voice — Automated"
                description="They see a message from you: take a month off, get a deal, or tell us what&apos;s up. Set it once and it runs forever — saving subscribers even while you&apos;re creating content."
                callout="🎯 Average recovery rate: 20–35% of at-risk subscribers"
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
            </div>

            <div
              style={{
                background: ACCENT_BG,
                borderLeft: `4px solid ${ACCENT}`,
              }}
              className="mt-8 border border-[rgba(236,72,153,0.25)] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto"
            >
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does Stan Store allow this?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666] m-0 mb-[10px] leading-[1.7]">
                ChurnRecovery doesn&apos;t touch Stan Store — it works at the Stripe level. Stan connects your subscriptions to your Stripe account. We connect to that same Stripe account and listen for cancel events. Stan doesn&apos;t know we exist, and no approval is needed.
              </p>
              <Link href="/docs" style={{ color: ACCENT }} className="font-sans text-[0.82rem] no-underline font-semibold">
                Technical integration docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/demo"
                style={{
                  background: ACCENT_BG,
                  color: ACCENT,
                }}
                className="inline-flex items-center gap-2 border border-[rgba(236,72,153,0.3)] rounded-[10px] py-[14px] px-7 font-sans font-bold no-underline text-[0.95rem]"
              >
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999] mt-2">
                See a live cancel flow — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div style={{ color: ACCENT }} className="font-sans text-xs font-bold uppercase tracking-[0.08em] mb-3">What You Get</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Everything to Keep Your Stan Subscribers
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[14px]">
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Subscribers can pause instead of cancel. Most impulse cancels happen during busy weeks — a 1-month pause keeps them and brings them back."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a deal to price-sensitive subscribers. A subscriber at 20% off is worth infinitely more than one who canceled."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Capture why subscribers leave with a 1-question survey. Use the answers to improve your content and offers — and stop guessing."
              />
              <BenefitCard
                icon="💌"
                title="Personal Check-In Flow"
                description="Send a personalized message when someone cancels: 'Hey, I noticed you canceled — is everything okay?' The personal touch that converts browsers into loyal fans back into subscribers."
              />
              <BenefitCard
                icon="📊"
                title="Creator Dashboard"
                description="See how much revenue you&apos;ve saved, which offers work best, and your overall recovery rate — in a dashboard built for creators, not engineers."
              />
              <BenefitCard
                icon="🚀"
                title="No Stan Approval Needed"
                description="ChurnRecovery works entirely through Stripe. Stan doesn&apos;t know we exist. No app store, no partner approval, no waiting around."
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
            <p className="font-serif text-base text-[#666] leading-[1.7] m-0 mb-8">
              $200M was paid out to Stan creators in 2024. ChurnRecovery helps you keep more of it — starting free.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { tier: 'Starter', price: '$0/month', range: 'Free to start', highlight: true },
                { tier: 'Growth', price: '$29/month', range: 'Up to $5k MRR' },
                { tier: 'Pro', price: '$79/month', range: 'Up to $20k MRR' },
                { tier: 'Enterprise', price: 'Custom', range: 'Above $20k MRR' },
              ].map(({ tier, price, range, highlight }) => (
                <div key={tier} style={{
                  background: highlight ? ACCENT_BG : '#FAF9F5',
                  border: `1px solid ${highlight ? ACCENT : '#E5E5E5'}`,
                }} className="rounded-[10px] p-[18px] relative">
                  {highlight && (
                    <div style={{ background: ACCENT }} className="absolute -top-[10px] left-1/2 -translate-x-1/2 text-white font-sans text-[0.7rem] font-bold py-[3px] px-[10px] rounded-full">START HERE</div>
                  )}
                  <div className="font-sans font-bold text-[#191919] text-[0.9rem]">{tier}</div>
                  <div style={{ color: highlight ? ACCENT : '#191919' }} className="font-sans font-extrabold text-[1.4rem] my-1">{price}</div>
                  <div className="font-serif text-[0.78rem] text-[#666]">{range}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-[14px] px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              Saving 1 subscriber per month at $29 covers ChurnRecovery entirely. Most creators save dozens.
            </div>
          </div>
        </section>

        {/* ─── FAQ ──────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Stan Creators
              </h2>
            </div>

            {[
              {
                q: 'Does ChurnRecovery work with Stan Store?',
                a: "Yes — specifically for creators on the Creator Pro plan who have their own Stripe account connected. ChurnRecovery connects to that Stripe account and intercepts cancellation events before they're finalized.",
              },
              {
                q: "Does this work with Stan's Creator Pro plan?",
                a: "Yes. Creator Pro connects your own Stripe account with no Stan transaction fee. ChurnRecovery plugs into that same Stripe connection. If you're on the free Stan plan with Stan's built-in payments, you'd need to upgrade to Creator Pro first.",
              },
              {
                q: 'Do my subscribers have to do anything different?',
                a: "No. From their side, they just see your branded recovery message when they try to cancel. It feels like a personal message from you — not a third-party app. Everything is seamless.",
              },
              {
                q: 'Can I customize what my subscribers see?',
                a: "Yes, completely. Write your own message, choose your offer (pause, discount, personal check-in), and set the timing. We provide templates built for creator businesses, but every word is editable.",
              },
              {
                q: 'How is this different from Stan Store just having a cancel flow?',
                a: "Stan doesn't have a cancel flow — that's exactly the problem. ChurnRecovery adds one. And because we work at the Stripe level, it works for any Stan Store regardless of how they've built their site.",
              },
              {
                q: 'What if I sell courses and coaching on Stan, not subscriptions?',
                a: "ChurnRecovery specifically helps with subscription-based Stan products — monthly memberships, recurring coaching programs, content subscription tiers. One-time purchases don't have a recurring cancel event to intercept.",
              },
              {
                q: "What if someone still cancels after seeing my offer?",
                a: "They leave — but you still got their exit reason, and you made the attempt. 20–35% of the time the offer works. The rest of the time, you learn something valuable. That's a win either way.",
              },
            ].map(faq => (
              <FAQItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                theme={{ accent: ACCENT }}
              />
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
                href="/posts/reduce-churn-online-course-business"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  How to Reduce Churn in Your Online Course Business
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Tactics for digital product creators on Stan Store
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
                  Scripts for handling creator membership cancellations
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
                  Proven offers for creator-led memberships
                </div>
              </a>
            </div>
          </div>
        </section>
        {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
        <section
          className="bg-[linear-gradient(135deg,#1a0a12_0%,#2d0f20_100%)] py-20 px-6"
        >
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              Your Subscribers Don&apos;t Want to Leave.<br />
              <span style={{ color: ACCENT_LIGHT }}>Give Them a Reason to Stay.</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Sign up for free. Add a cancel recovery flow to your Stan Store. Free to start — works with Creator Pro, no Stan approval needed.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-stan-store" dark={true} />
            </div>

            <div className="flex gap-6 justify-center mt-6 flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">Free during beta</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">Cancel anytime</span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">No spam, ever</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
