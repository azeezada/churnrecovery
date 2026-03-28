import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PainCard from '../../components/for/PainCard'
import HowStep from '../../components/for/HowStep'
import BenefitCard from '../../components/for/BenefitCard'
import FAQItem from '../../components/for/FAQItem'
import SignUpCTA from '../../components/SignUpCTA'

const ACCENT = '#3858E9'
const ACCENT_LIGHT = '#6B8BFF'
const ACCENT_DARK_BG = 'rgba(56,88,233,0.15)'
const ACCENT_BG = 'rgba(56,88,233,0.08)'

export default function WordPressLandingPage() {
  return (
    <>
      <Head>
        <title>Stop Losing WooCommerce & WordPress Members Silently | ChurnRecovery</title>
        <meta name="description" content="WooCommerce Subscriptions cancels happen silently — no pause offer, no discount, no exit survey. ChurnRecovery works with any Stripe-connected WordPress setup: WooCommerce, MemberPress, Paid Memberships Pro." />
        <link rel="canonical" href="https://churnrecovery.com/for/wordpress" />
        <meta property="og:title" content="Stop Losing WooCommerce & WordPress Members Silently | ChurnRecovery" />
        <meta property="og:description" content="WooCommerce Subscriptions has no built-in cancel flow. ChurnRecovery connects to Stripe and catches cancellations before they're final — for WooCommerce, MemberPress, Paid Memberships Pro, and more." />
        <meta property="og:url" content="https://churnrecovery.com/for/wordpress" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing WooCommerce & WordPress Members Silently" />
        <meta name="twitter:description" content="WordPress memberships cancel silently. ChurnRecovery works with WooCommerce, MemberPress, and Paid Memberships Pro to catch cancellations and offer pauses, discounts, and exit surveys." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="px-6 pt-20 pb-[100px] relative overflow-hidden bg-[linear-gradient(135deg,#0D1B4B_0%,#1a2a6c_50%,#0D1B4B_100%)]">
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${ACCENT_DARK_BG} 0%, transparent 70%)` }} />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            <div className="inline-flex items-center gap-[6px] bg-[rgba(56,88,233,0.2)] border border-[rgba(107,139,255,0.4)] rounded-[100px] px-[16px] py-[6px] font-sans text-[0.78rem] font-semibold text-[#6B8BFF] mb-[28px]">
              <span>✓</span> WooCommerce · MemberPress · Paid Memberships Pro · Free During Beta
            </div>

            <h1 className="font-sans font-extrabold text-[#FFFFFF] mb-5 leading-[1.15] tracking-[-0.02em] text-[clamp(2.2rem,5vw,3.5rem)]">
              WooCommerce Cancellations<br />
              <span className="text-[#6B8BFF]">Happen Silently.</span><br />
              Not Anymore.
            </h1>

            <p className="font-serif text-[rgba(255,255,255,0.75)] mb-10 leading-[1.7] max-w-[620px] mx-auto text-[clamp(1rem,2.5vw,1.2rem)]">
              When a WooCommerce Subscriptions member cancels, it&apos;s instant and silent — no pause option, no discount offer, no &quot;why are you leaving?&quot; ChurnRecovery works with any Stripe-connected WordPress setup and catches those cancellations before they&apos;re final. WooCommerce, MemberPress, Paid Memberships Pro — we work with all of them.
            </p>

            <div className="max-w-[480px] mx-auto mb-[24px]">
              <SignUpCTA source="for-wordpress" dark={true} />
            </div>

            <div className="flex gap-[20px] justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🔌 Works with any Stripe-connected WordPress setup
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ No WordPress plugin required
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
              <div className="font-sans text-[0.75rem] font-bold text-[#3858E9] uppercase tracking-[0.08em] mb-[12px]">The Problem With WordPress Memberships</div>
              <h2 className="font-sans font-extrabold text-[#191919] mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                WooCommerce Was Built to Sell.<br />Not to Retain.
              </h2>
              <p className="font-serif text-[1rem] text-[#666666] max-w-[560px] mx-auto leading-[1.7]">
                WooCommerce Subscriptions and most WordPress membership plugins are excellent at processing recurring payments. But none of them have a built-in cancel flow. When a member decides to leave, they can — instantly and silently.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[20px]">
              <PainCard
                icon="🔇"
                title="Silent Cancellations"
                stat="3–8%"
                statLabel="of members cancel silently every month"
                description="WooCommerce Subscriptions sends you a notification email when someone cancels — after the fact. MemberPress and Paid Memberships Pro are the same. There's no intervention point, no second chance, and no record of why they left."
                accentColor={ACCENT}
              />
              <PainCard
                icon="🚪"
                title="No Pause, Discount, or Exit Survey"
                description="WooCommerce doesn't offer a pause option or a discount screen when members cancel. There's no exit survey built in either. The only thing a canceling member sees is a confirmation button — and then they're gone."
                accentColor={ACCENT}
              />
              <PainCard
                icon="📉"
                title="Churn Compounds Quietly"
                description="At 5% monthly churn, a 200-member site loses 10 people every month. In a year, that's 120 cancellations — nearly two-thirds of your original member base. Without intervention, you're running on a treadmill: always recruiting, never growing."
                accentColor={ACCENT}
              />
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ────────────────────────────────────────────── */}
        <section id="how-it-works" className="px-[24px] py-[80px] bg-[#FFFFFF]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-[48px]">
              <div className="font-sans text-[0.75rem] font-bold text-[#3858E9] uppercase tracking-[0.08em] mb-[12px]">3 Steps, No WordPress Developer</div>
              <h2 className="font-sans font-extrabold text-[#191919] mb-4 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                Works With Any Stripe-Connected WordPress Setup
              </h2>
              <p className="font-serif text-[1rem] text-[#666666] max-w-[560px] mx-auto leading-[1.7]">
                Whether you use WooCommerce Subscriptions, MemberPress, or Paid Memberships Pro — if your members pay through Stripe, ChurnRecovery can protect that revenue. We connect to Stripe directly. No WordPress plugin, no theme changes, no developer.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[20px]">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. This is the same Stripe account your WooCommerce, MemberPress, or Paid Memberships Pro plugin sends payments to."
                callout="✓ Takes about 5 minutes. No WordPress access required."
                accentColor={ACCENT}
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Intercept Every Cancellation"
                description="When a member initiates a cancellation through your WordPress membership plugin, that event hits Stripe. ChurnRecovery catches it before it's final and fires your recovery flow — automatically."
                accentColor={ACCENT}
              />
              <HowStep
                number="3"
                icon="💬"
                title="Members See Your Offer, Not a Blank Screen"
                description="Instead of a silent cancellation, members see a branded screen with your message: a pause option, a discount offer, or a quick exit survey. You configure it once. It runs on autopilot from there."
                callout="🎯 Average recovery rate: 20–35% of at-risk members"
                accentColor={ACCENT}
              />
            </div>

            <div className="mt-[32px] bg-[rgba(56,88,233,0.08)] border border-[rgba(56,88,233,0.25)] border-l-[4px] border-l-[#3858E9] rounded-[10px] px-[24px] py-[20px] max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] mb-[8px] mt-0 text-[0.95rem]">
                Supported WordPress setups
              </p>
              <ul className="font-serif text-[0.88rem] text-[#666666] mb-[10px] mt-0 leading-[1.8] pl-[20px]">
                <li><strong>WooCommerce Subscriptions</strong> with Stripe payment gateway</li>
                <li><strong>MemberPress</strong> with Stripe integration</li>
                <li><strong>Paid Memberships Pro</strong> with Stripe gateway</li>
                <li>Any custom WordPress setup that routes recurring payments through Stripe</li>
              </ul>
              <p className="font-serif text-[0.82rem] text-[#666666] m-0 leading-[1.6]">
                Not sure if yours qualifies? If you use Stripe for billing, it almost certainly does.
              </p>
            </div>

            <div className="text-center mt-[40px]">
              <Link href="/demo" className="inline-flex items-center gap-[8px] bg-[rgba(56,88,233,0.08)] border border-[rgba(56,88,233,0.3)] rounded-[10px] px-[28px] py-[14px] font-sans font-bold text-[#3858E9] no-underline text-[0.95rem]">
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
              <div className="font-sans text-[0.75rem] font-bold text-[#3858E9] uppercase tracking-[0.08em] mb-[12px]">What You Get</div>
              <h2 className="font-sans font-extrabold text-[#191919] m-0 tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.5rem)]">
                The Retention Layer Your WordPress Membership Plugin Is Missing
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[14px]">
              <BenefitCard
                icon="⏸"
                title="Pause Offer"
                description="Let members pause their membership instead of canceling. Many people leave during a busy period — a pause keeps them in your ecosystem without the pressure to cancel permanently."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Offer a temporary discount to price-sensitive members instead of losing them entirely. A member at 50% of their full price is infinitely more valuable than no member at all."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey"
                description="One-question exit surveys tell you exactly why members are leaving. Over time, this data becomes your roadmap for improving your content, pricing, and member experience."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="📊"
                title="Simple Recovery Dashboard"
                description="Track saved revenue, offer acceptance rates, and cancellation reasons — in a clear, non-technical dashboard. No spreadsheets, no WooCommerce reports, no SQL queries."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🆓"
                title="30-Day Free Trial"
                description="$20/month after a 30-day free trial — no credit card to start, no setup fee. All features included from day one."
                accentColor={ACCENT}
              />
              <BenefitCard
                icon="🔌"
                title="No WordPress Plugin Required"
                description="ChurnRecovery doesn't need a WordPress plugin. It connects to Stripe directly, which means it works regardless of which theme, page builder, or membership plugin you're using."
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
                Questions From WordPress Membership Owners
              </h2>
            </div>

            {[
              {
                q: 'Does this work with WooCommerce Subscriptions?',
                a: "Yes, as long as you're using the Stripe gateway for WooCommerce. When a member cancels in WooCommerce, that event passes through Stripe. ChurnRecovery listens for it and intercepts it before the cancellation is finalized.",
              },
              {
                q: 'Does this work with MemberPress?',
                a: "Yes. MemberPress with the Stripe gateway is fully supported. The integration is identical — ChurnRecovery connects to your Stripe account and listens for cancellation events regardless of which WordPress plugin initiated them.",
              },
              {
                q: 'Does this work with Paid Memberships Pro?',
                a: "Yes. Paid Memberships Pro with Stripe works the same way. If your recurring payments run through Stripe, ChurnRecovery can intercept and recover those cancellations.",
              },
              {
                q: 'Do I need to install a WordPress plugin?',
                a: "No. ChurnRecovery doesn't require any WordPress plugin. It works at the Stripe level, which is completely separate from your WordPress installation. You don't need to touch your theme, your plugins, or your hosting.",
              },
              {
                q: 'What if my members manage their subscriptions through their WooCommerce account?',
                a: "When a member cancels through their WooCommerce account dashboard, WooCommerce sends the cancellation to Stripe. ChurnRecovery catches the Stripe event and triggers the recovery flow at that point — regardless of where in your WordPress site the cancellation was initiated.",
              },
              {
                q: 'Will this interfere with my existing WooCommerce or WordPress setup?',
                a: "No. ChurnRecovery only interacts with your Stripe account. It doesn't modify any WordPress files, WooCommerce settings, or membership plugin configurations. Your WordPress site continues to work exactly as it does today.",
              },
              {
                q: "My WordPress site is custom-built. Will it still work?",
                a: "If your custom WordPress site routes subscription payments through Stripe, yes — ChurnRecovery will work. The integration is at the Stripe level, not the WordPress level. If you're unsure, reach out and we'll confirm your setup is supported.",
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
                href="/posts/woocommerce-subscription-cancel-flow"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  WooCommerce Subscription Cancel Flow: Full Setup Guide
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Step-by-step guide for WordPress/WooCommerce operators
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
                  Framework for WordPress subscription businesses
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
                  The case for adding a cancel flow to any membership
                </div>
              </a>
            </div>
          </div>
        </section>
        {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
        <section className="px-6 py-20 bg-[linear-gradient(135deg,#0D1B4B_0%,#1a2a6c_100%)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[#FFFFFF] mb-5 leading-[1.2] tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.6rem)]">
              A WordPress Member Is About to Cancel.<br />
              <span className="text-[#6B8BFF]">Will You Catch Them?</span>
            </h2>
            <p className="font-serif text-[1rem] text-[rgba(255,255,255,0.7)] mb-[36px] leading-[1.7]">
              Start your 30-day free trial. Add a cancel flow to your WordPress membership site — without a WordPress plugin, without a developer, and without touching your existing setup. $20/month after trial.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-wordpress" dark={true} />
            </div>

            <div className="flex gap-[24px] justify-center mt-[24px] flex-wrap">
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                Free during beta
              </span>
              <span className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.45)]">
                No WordPress plugin needed
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
