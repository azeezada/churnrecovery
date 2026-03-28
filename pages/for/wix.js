import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PainCard from '../../components/for/PainCard'
import HowStep from '../../components/for/HowStep'
import BenefitCard from '../../components/for/BenefitCard'
import FAQItem from '../../components/for/FAQItem'
import SignUpCTA from '../../components/SignUpCTA'

const ACCENT = '#0099FF'
const ACCENT_LIGHT = '#33AAFF'
const ACCENT_DARK_BG = 'rgba(0,153,255,0.15)'
const ACCENT_BG = 'rgba(0,153,255,0.08)'

export default function WixLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing Wix Subscribers at the Cancel Screen | ChurnRecovery</title>
        <meta name="description" content="Wix doesn't show you who's about to cancel — and there's no native cancel flow. ChurnRecovery connects to your Stripe account and catches cancellations before they're final. $20/month with 30-day free trial." />
        <link rel="canonical" href="https://churnrecovery.com/for/wix" />
        <meta property="og:title" content="Stop Losing Wix Subscribers at the Cancel Screen | ChurnRecovery" />
        <meta property="og:description" content="Wix has no built-in cancel flow or churn recovery. ChurnRecovery plugs into Stripe — the payment processor behind your Wix subscriptions — and intercepts cancellations automatically." />
        <meta property="og:url" content="https://churnrecovery.com/for/wix" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing Wix Subscribers at the Cancel Screen" />
        <meta name="twitter:description" content="Wix Payments has no cancel flow. ChurnRecovery connects to Stripe and catches cancellations with pause offers, discounts, and exit surveys — automatically." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="px-6 pt-20 pb-[100px] relative overflow-hidden bg-[linear-gradient(135deg,#001933_0%,#002d5c_50%,#001933_100%)]">
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${ACCENT_DARK_BG} 0%, transparent 70%)` }} />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-[6px] bg-[rgba(0,153,255,0.15)] border border-[rgba(0,153,255,0.35)] rounded-[100px] px-[16px] py-[6px] font-sans text-[0.78rem] font-semibold text-[#33AAFF] mb-[28px]">
              <span>✓</span> Built for Wix Sellers · Free During Beta
            </div>

            <h1 className="font-sans font-extrabold text-[#FFFFFF] mb-5 leading-[1.15] tracking-[-0.02em] text-[clamp(2.2rem,5vw,3.5rem)]">
              Wix Doesn&apos;t Show You<br />
              <span className="text-[#33AAFF]">Who&apos;s About to Cancel.</span><br />
              We Do.
            </h1>

            <p className="font-serif text-[rgba(255,255,255,0.75)] mb-10 leading-[1.7] max-w-[600px] mx-auto text-[clamp(1rem,2.5vw,1.2rem)]">
              Wix Payments has no native cancel flow. When a subscriber clicks &quot;cancel,&quot; they&apos;re gone instantly — no pause offer, no discount, no exit survey. ChurnRecovery connects to your Stripe account and intercepts cancellations before they&apos;re final. We don&apos;t touch Wix at all.
            </p>

            <div className="max-w-[480px] mx-auto mb-[24px]">
              <SignUpCTA source="for-wix" dark={true} />
            </div>

            <div className="flex gap-[20px] justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ Works alongside Wix — no changes needed
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🔌 We connect to Stripe, not Wix
              </span>
            </div>

            <div className="mt-[20px]">
              <Link href="/demo" className="font-sans text-[0.9rem] text-[rgba(255,255,255,0.6)] no-underline border-b border-[rgba(255,255,255,0.3)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PAIN POINTS ─────────────────────────────────────────────── */}
        <section className="px-[24px] py-[80px] bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-[48px]">
              <div className="font-sans text-[0.75rem] font-bold text-[#0099FF] uppercase tracking-[0.08em] mb-[12px]">The Hidden Revenue Leak</div>
              <h2 className="font-sans font-extrabold text-[#191919] mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Wix Lets Your Subscribers Walk Out.<br />No Warning, No Second Chance.
              </h2>
              <p className="font-serif text-[1rem] text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Wix is great for building websites. But it does nothing to keep subscribers &mdash; it&apos;s completely silent. You find out about cancellations in a Stripe email, and by then, it&apos;s already over.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[20px]">
              <PainCard
                icon="👻"
                title="No Visibility Before Cancel"
                stat="3–8%"
                statLabel="of subscribers cancel silently every month"
                description="Wix Payments doesn't give you any signal that a subscriber is thinking about leaving. You can't intervene if you don't know it's happening — and by the time you do, they're already gone."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🚪"
                title="No Native Cancel Flow"
                description="When a subscriber hits 'cancel' in Wix, they're immediately taken to a confirmation screen with no alternative. No pause option, no discount, no exit survey. Wix doesn't offer these features — and probably never will."
                accentColor={ACCENT}
              />
              <PainCard
                icon="💸"
                title="Every Cancellation = Lost Recurring Revenue"
                description="Losing one $50/month subscriber doesn't sound like much. But at 5% monthly churn on 100 subscribers, you're losing $3,000+ per year in recurring revenue — without a single marketing dollar to replace it."
                accentColor={ACCENT}
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────────── */}
        <section id="how-it-works" className="px-[24px] py-[80px] bg-[#FFFFFF]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-[48px]">
              <div className="font-sans text-[0.75rem] font-bold text-[#0099FF] uppercase tracking-[0.08em] mb-[12px]">3 Steps, No Code</div>
              <h2 className="font-sans font-extrabold text-[#191919] mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Works With Wix Subscriptions in Minutes
              </h2>
              <p className="font-serif text-[1rem] text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                We connect to your Stripe account — not Wix. Wix Payments runs on Stripe under the hood. That&apos;s how we catch cancellations before they happen, without needing any Wix access.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[20px]">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. If your Wix subscriptions run through Wix Payments, your Stripe account is already there — you may just need to find it in your Wix dashboard."
                callout="✓ Takes about 2 minutes. No developer needed."
                accentColor={ACCENT}
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Every Cancellation"
                description="The moment a subscriber initiates a cancel, ChurnRecovery fires before it's final. We listen for Stripe cancellation events and trigger your custom recovery flow — instantly and automatically."
                accentColor={ACCENT}
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer Runs on Autopilot"
                description="Subscribers see a branded screen with your offer: a pause option, a discount, or a quick 'why are you leaving?' question. Set it up once. It works for every cancellation from that point on."
                callout="🎯 Average recovery rate: 20–35% of at-risk subscribers"
                accentColor={ACCENT}
              />
            </div>

            <div className="mt-[32px] bg-[rgba(0,153,255,0.08)] border border-[rgba(0,153,255,0.25)] border-l-[4px] border-l-[#0099FF] rounded-[10px] px-[24px] py-[20px] max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] mb-[8px] mt-0 text-[0.95rem]">
                &ldquo;Does this require a Wix developer or app?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] mb-[10px] mt-0 leading-[1.7]">
                No. ChurnRecovery connects to Stripe directly — it has nothing to do with Wix&apos;s app marketplace or their developer platform. We don&apos;t need Wix API access. We just need your Stripe account, which is what actually processes your subscription payments.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#0099FF] no-underline font-semibold">
                See the integration guide →
              </Link>
            </div>

            <div className="text-center mt-[40px]">
              <Link href="/demo" className="inline-flex items-center gap-[8px] bg-[rgba(0,153,255,0.08)] border border-[rgba(0,153,255,0.3)] rounded-[10px] px-[28px] py-[14px] font-sans font-bold text-[#0099FF] no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999999] mt-[8px]">
                See a live cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ─────────────────────────────────────────────────── */}
        <section className="px-[24px] py-[80px] bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-[48px]">
              <div className="font-sans text-[0.75rem] font-bold text-[#0099FF] uppercase tracking-[0.08em] mb-[12px]">What You Get</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Everything Wix Doesn&apos;t Give You
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[14px]">
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Give subscribers the option to pause instead of cancel. Many people leave during a busy month — not because they don't value what you offer."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a discount or a free month to at-risk subscribers. Keeping someone at a lower price is almost always better than losing them entirely."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="Find out exactly why subscribers leave with a one-question exit survey. These answers are gold — they tell you what to improve in your product and pricing."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="📊"
                title="Recovery Dashboard"
                description="See how much revenue you've saved, which offers are working, and your overall churn rate — all in one clear dashboard designed for non-technical owners."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🆓"
                title="30-Day Free Trial"
                description="$20/month after a 30-day free trial — no credit card to start, no setup fees. All features included."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🔌"
                title="No Wix App or Plugin"
                description="This works entirely through Stripe. No Wix App Market approval needed, no plugin to install, no waiting. Connect your Stripe account and you're live."
                accentColor={ACCENT}
              />
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────────── */}
        <section className="px-[24px] py-[80px] bg-[#FFFFFF]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-[40px]">
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Questions From Wix Sellers
              </h2>
            </div>

            {[
              {
                q: 'Does this work with Wix Payments?',
                a: "Yes. Wix Payments processes subscription payments through Stripe. ChurnRecovery connects to your underlying Stripe account and listens for cancellation events — completely outside Wix's system.",
              },
              {
                q: "What if I don't know my Stripe account details?",
                a: "If you use Wix Payments, you have a Stripe account — Wix creates one for you when you set up payments. You can find your Stripe login by going to your Wix dashboard → Payments → Wix Payments → Settings. From there, you can access Stripe directly.",
              },
              {
                q: 'Do I need a Wix developer or Wix Velo to set this up?',
                a: "Not at all. ChurnRecovery works at the Stripe level, completely separate from Wix. If you can click a button and copy a link, you can set this up in about 10 minutes — no code required.",
              },
              {
                q: 'Will this interfere with my Wix website?',
                a: "No. ChurnRecovery only interacts with your Stripe account. It doesn't touch your Wix site, your pages, your checkout flow, or any Wix settings. Your Wix site works exactly as it does today.",
              },
              {
                q: 'What types of Wix subscriptions does this work for?',
                a: "Any Wix subscription that runs through Stripe — including service plans, membership programs, digital content subscriptions, and any recurring billing you've set up through Wix Payments.",
              },
              {
                q: 'What if a subscriber cancels through Wix directly?',
                a: "When a subscriber cancels via Wix, Wix sends a cancellation event to Stripe. ChurnRecovery intercepts that Stripe event before the cancellation is finalized and shows your recovery flow. This happens regardless of where in Wix they initiated the cancel.",
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} accentColor={ACCENT} />
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
                  What Is a Cancel Flow?
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Add a retention layer to your Wix subscriptions
                </div>
              </a>
              <a
                href="/posts/voluntary-vs-involuntary-churn"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  Voluntary vs Involuntary Churn: Fix Both
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Framework for any subscription business
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
                  The math behind monthly churn and how to stop it
                </div>
              </a>
            </div>
          </div>
        </section>
        {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
        <section className="px-6 py-20 bg-[linear-gradient(135deg,#001933_0%,#002d5c_100%)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[#FFFFFF] mb-5 leading-[1.2] tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.6rem)]">
              A Wix Subscriber Is About to Cancel.<br />
              <span className="text-[#33AAFF]">Will You Be Ready?</span>
            </h2>
            <p className="font-serif text-[1rem] text-[rgba(255,255,255,0.7)] mb-[36px] leading-[1.7]">
              Start your 30-day free trial. Protect your Wix subscription revenue with automated churn recovery. $20/month after trial — no Wix approval needed.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-wix" dark={true} />
            </div>

            <div className="flex gap-[24px] justify-center mt-[24px] flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                Free during beta
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
