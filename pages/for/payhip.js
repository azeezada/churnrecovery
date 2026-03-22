import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PainCard from '../../components/for/PainCard'
import HowStep from '../../components/for/HowStep'
import BenefitCard from '../../components/for/BenefitCard'
import FAQItem from '../../components/for/FAQItem'
import SignUpCTA from '../../components/SignUpCTA'

const ACCENT = '#10b981'
const ACCENT_LIGHT = '#6ee7b7'
const ACCENT_BG = 'rgba(16,185,129,0.08)'
const ACCENT_DARK_BG = 'rgba(16,185,129,0.15)'

export default function PayhipLandingPage() {
  return (
    <>
      <Head>
        <title>Keep More Payhip Subscribers. Add a Cancel Recovery Flow. | ChurnRecovery</title>
        <meta name="description" content="Payhip doesn't do retention. ChurnRecovery does. Connect your Stripe account and start recovering failed payments and cancellations automatically — free to start." />
        <link rel="canonical" href="https://churnrecovery.com/for/payhip" />
        <meta property="og:title" content="Keep More Payhip Subscribers. Add a Cancel Recovery Flow. | ChurnRecovery" />
        <meta property="og:description" content="Payhip connects to your Stripe for subscriptions. ChurnRecovery plugs into that Stripe and intercepts cancellations and failed payments — automatically, in your brand." />
        <meta property="og:url" content="https://churnrecovery.com/for/payhip" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Keep More Payhip Subscribers. Add a Cancel Recovery Flow." />
        <meta name="twitter:description" content="130k+ Payhip sellers have no cancel recovery. ChurnRecovery adds one — branded dunning emails, pause offers, and exit surveys. Free to start." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section
          className="bg-[linear-gradient(135deg,#071a12_0%,#0d2e1e_50%,#071a12_100%)] py-20 px-6 pb-[100px] relative overflow-hidden"
        >
          <div
            style={{ background: `radial-gradient(circle, ${ACCENT_DARK_BG} 0%, transparent 70%)` }}
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div
              style={{ color: ACCENT_LIGHT }}
              className="inline-flex items-center gap-[6px] bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.35)] rounded-full py-[6px] px-4 font-sans text-[0.78rem] font-semibold mb-7"
            >
              <span>✓</span> Built for Payhip Sellers · Free During Beta
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Payhip Doesn&apos;t Do Retention.<br />
              <span style={{ color: ACCENT_LIGHT }}>We Do.</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] mx-auto">
              Payhip is great for selling digital products and subscriptions. But when a subscriber&apos;s card fails or they click cancel, you&apos;re completely on your own. ChurnRecovery adds automatic dunning and cancel recovery — in your brand — so you keep the revenue you already earned.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-payhip" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ Works with Payhip + Stripe
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🌍 Strong for UK &amp; EU creators
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
              <div style={{ color: ACCENT }} className="font-sans text-xs font-bold uppercase tracking-[0.08em] mb-3">The Payhip Revenue Gap</div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                You&apos;re Losing Subscription Revenue<br />You Didn&apos;t Know You Could Keep
              </h2>
              <p className="font-serif text-base text-[#666] max-w-[540px] mx-auto leading-[1.7] m-0">
                Payhip handles checkout brilliantly. But the moment a payment fails or someone clicks cancel, there&apos;s nothing in place to save them — and you find out after it&apos;s too late.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="💳"
                title="Failed Payments Go Unrecovered"
                stat="5–10%"
                statLabel="of subscriptions fail every month"
                description="When a card fails on Payhip, Stripe sends a generic dunning email — not from you, not personalized, not in your brand. Most subscribers don&apos;t even connect it to your product. They churn without meaning to."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🚪"
                title="No Cancel Flow Built In"
                description="Payhip has no cancel flow. A subscriber who clicks cancel sees no pause offer, no discount, no exit question. They just leave. You find out days later when your Stripe dashboard updates."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🔕"
                title="No Notification Until It&apos;s Over"
                description="By the time you notice a subscriber is gone, Stripe has already tried 3+ times and given up. You&apos;ve lost weeks of payment attempts and the subscriber feels abandoned — not retained."
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
                Works With Payhip in Minutes
              </h2>
              <p className="font-serif text-base text-[#666] max-w-[480px] mx-auto leading-[1.7] m-0">
                Payhip connects to your Stripe account for subscription payments. ChurnRecovery connects to that same Stripe — no Payhip integration, no developer, no code.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect the same Stripe account Payhip uses for your subscriptions. One OAuth click — no API keys to copy, no developer required."
                callout="✓ Payhip supports Stripe for subscription billing — you're already set."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
              <HowStep
                number="2"
                icon="⚡"
                title="Automatic Dunning &amp; Cancel Interception"
                description="First failed payment: ChurnRecovery sends a branded email from you — not Stripe. Cancel attempt: we intercept before it&apos;s final and show your custom recovery flow. All automatic."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
              <HowStep
                number="3"
                icon="✅"
                title="Recovered Subscribers Continue Normally in Payhip"
                description="When we save a subscriber — either through dunning or a cancel offer — they continue as normal in Payhip. No disruption, no manual work. The revenue just keeps flowing."
                callout="🎯 5–10% of subscriptions fail monthly. ~70% are recoverable with smart dunning."
                accentColor={ACCENT}
                theme={{ accentBg: ACCENT_BG, orange: ACCENT }}
              />
            </div>

            <div
              style={{
                background: ACCENT_BG,
                borderLeft: `4px solid ${ACCENT}`,
              }}
              className="mt-8 border border-[rgba(16,185,129,0.25)] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto"
            >
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Do I need to change how I use Payhip?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666] m-0 mb-[10px] leading-[1.7]">
                No. ChurnRecovery works at the Stripe layer — completely separate from Payhip. You don&apos;t change any Payhip settings. Payhip doesn&apos;t know ChurnRecovery exists. Your subscribers continue as normal after recovery.
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
                className="inline-flex items-center gap-2 border border-[rgba(16,185,129,0.3)] rounded-[10px] py-[14px] px-7 font-sans font-bold no-underline text-[0.95rem]"
              >
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999] mt-2">
                See a live cancel and dunning flow — no signup required
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
                Everything Payhip Doesn&apos;t Include
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[14px]">
              <BenefitCard
                icon="📬"
                title="Branded Dunning Emails"
                description="Replace Stripe&apos;s generic payment failure emails with branded messages in your voice: 'Hey, looks like there was a hiccup with your payment.' Friendlier, earlier, more effective."
              />
              <BenefitCard
                icon="⏸"
                title="Pause Offer on Cancel"
                description="Give subscribers a pause option before they cancel. Many cancels are temporary — a 1-month pause keeps the subscriber and brings them back automatically."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a discount to price-sensitive subscribers at the cancel screen. Better to keep them at 20% off than lose them to a competitor permanently."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out exactly why subscribers leave with a quick exit question. The feedback tells you what to fix — so fewer people cancel next month."
              />
              <BenefitCard
                icon="📊"
                title="Recovery Dashboard"
                description="See recovered revenue, dunning success rates, and cancel recovery rates — in one clean dashboard built for digital product sellers."
              />
              <BenefitCard
                icon="🌍"
                title="Works for UK &amp; EU Sellers"
                description="Payhip is especially popular with UK and EU creators. ChurnRecovery works wherever Stripe is supported — which covers all major Payhip markets."
              />
            </div>
          </div>
        </section>

        {/* ─── PRICING ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Free for Payhip Sellers
            </h2>
            <p className="font-serif text-base text-[#666] leading-[1.7] m-0 mb-8">
              130,000+ Payhip sellers sell digital products. If you have subscriptions, you&apos;re losing revenue to churn you could recover. ChurnRecovery starts free.
            </p>

            <div
              style={{ background: ACCENT_BG }}
              className="border border-[rgba(16,185,129,0.25)] rounded-xl p-6 mb-7 text-center"
            >
              <div style={{ color: ACCENT }} className="font-sans text-[0.8rem] font-semibold mb-2 uppercase tracking-[0.06em]">By the numbers</div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { stat: '5–10%', label: 'fail monthly' },
                  { stat: '~70%', label: 'are recoverable' },
                  { stat: '20–35%', label: 'cancel saves' },
                ].map(({ stat, label }) => (
                  <div key={label}>
                    <div style={{ color: ACCENT }} className="font-sans font-extrabold text-[1.6rem]">{stat}</div>
                    <div className="font-serif text-[0.78rem] text-[#666]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

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
              Recovering 1 failed payment per month more than pays for ChurnRecovery. Most sellers save far more.
            </div>
          </div>
        </section>

        {/* ─── FAQ ──────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Payhip Sellers
              </h2>
            </div>

            {[
              {
                q: 'Does ChurnRecovery work with Payhip?',
                a: "Yes — for Payhip sellers who use Stripe as their payment method. Payhip lets you connect your own Stripe account for checkout. ChurnRecovery connects to that same Stripe account and intercepts cancellations and failed payment events.",
              },
              {
                q: 'Do I need to change how I use Payhip?',
                a: "No. You don't change a single setting in Payhip. ChurnRecovery works at the Stripe layer — completely invisible to Payhip. Your subscribers see your branded recovery flow, but everything continues normally in Payhip afterward.",
              },
              {
                q: "What if I use PayPal through Payhip?",
                a: "PayPal subscriptions aren't supported yet — ChurnRecovery currently works with Stripe only. If you're using Payhip with Stripe for subscriptions, you're fully supported.",
              },
              {
                q: 'Does this work for courses, memberships, and digital downloads?',
                a: "ChurnRecovery specifically helps with subscription-based Payhip products — recurring memberships, course subscriptions, ongoing digital access. One-time product sales don't have a recurring cancel event to intercept.",
              },
              {
                q: 'Can I customize the messages subscribers see?',
                a: "Yes, completely. The dunning emails and cancel flow messages are fully editable. We provide templates built for digital product sellers, but you can change every word to match your brand and voice.",
              },
              {
                q: 'How do branded dunning emails work?',
                a: "Instead of Stripe's generic 'Your payment failed' email, ChurnRecovery sends a branded email from your address: 'Hey, it looks like there was a hiccup with your subscription payment.' It's friendly, personal, and dramatically more effective than Stripe's default.",
              },
              {
                q: 'What if a subscriber still cancels after seeing my offer?',
                a: "They leave — and you get their exit reason from the survey. 20–35% of cancel attempts are saved by a well-timed offer. The rest give you valuable feedback. Both are better than the current situation where they just disappear silently.",
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

        {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
        <section
          className="bg-[linear-gradient(135deg,#071a12_0%,#0d2e1e_100%)] py-20 px-6"
        >
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              You Earned That Subscriber.<br />
              <span style={{ color: ACCENT_LIGHT }}>Don&apos;t Let Them Slip Away.</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Sign up for free. Add automatic cancel recovery and dunning to your Payhip store. Free to start — no Payhip approval, no code, no credit card.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-payhip" dark={true} />
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
