import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SignUpCTA from '../../components/SignUpCTA'

// ─── Pain card ──────────────────────────────────────────────────────────────
function PainCard({ icon, title, stat, statLabel, description }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6 border-t-[3px] border-t-[#E8A000]">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-[#191919] m-0 mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-sans font-extrabold text-[2rem] text-[#E8A000] my-1">
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-sans text-[0.8rem] text-[#D97706] mb-2">
          {statLabel}
        </div>
      )}
      <p className="font-serif text-[0.88rem] text-[#666666] m-0 leading-[1.6]">
        {description}
      </p>
    </div>
  )
}

// ─── How it works step ──────────────────────────────────────────────────────
function HowStep({ number, icon, title, description, callout }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl py-7 px-6">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-[rgba(232,160,0,0.1)] border-2 border-[#E8A000] flex items-center justify-center font-sans font-extrabold text-[1.1rem] text-[#E8A000] shrink-0">
          {number}
        </div>
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
        <div className="bg-[rgba(232,160,0,0.08)] border border-[rgba(232,160,0,0.25)] rounded-lg py-2.5 px-3.5 font-sans text-[0.8rem] text-[#D97706]">
          {callout}
        </div>
      )}
    </div>
  )
}

// ─── Benefit card ───────────────────────────────────────────────────────────
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

// ─── FAQ item ────────────────────────────────────────────────────────────────
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
        <span className="text-[#E8A000] text-[1.2rem] font-bold shrink-0">
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

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function MembershipSitesLandingPage() {
  return (
    <>
      <Head>
        <title>Churn Recovery for Membership Sites | ChurnRecovery</title>
        <meta name="description" content="Membership sites on WordPress, Circle, and Mighty Networks lose members silently. ChurnRecovery connects through Stripe and intercepts cancellations in real-time. Pause, discount, or ask why — before they leave. 30-day free trial, then $20/month." />
        <link rel="canonical" href="https://churnrecovery.com/for/membership-sites" />
        <meta property="og:title" content="Churn Recovery for Membership Sites | ChurnRecovery" />
        <meta property="og:description" content="Most membership platforms have no cancel flow. ChurnRecovery connects through Stripe and catches cancellations before they happen — across WordPress, Circle, Mighty Networks, and more." />
        <meta property="og:url" content="https://churnrecovery.com/for/membership-sites" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Churn Recovery for Membership Sites | ChurnRecovery" />
        <meta name="twitter:description" content="Your membership site is losing members silently. ChurnRecovery plugs into Stripe to intercept cancellations — no platform approval needed." />
      </Head>

      <Header />

      <main className="font-sans bg-[#FAF9F5] pt-[60px]">

        {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_50%,#1A1200_100%)] pt-20 px-6 pb-[100px] relative overflow-hidden">
          {/* Amber glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,160,0,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-[720px] mx-auto text-center relative z-[1]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-[rgba(232,160,0,0.15)] border border-[rgba(232,160,0,0.35)] rounded-full py-1.5 px-4 font-sans text-[0.78rem] font-semibold text-[#F5C842] mb-[28px]">
              <span>✓</span> 30-Day Free Trial · No Credit Card Required
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(2.2rem,5vw,3.5rem)] text-white m-0 mb-5 leading-[1.15] tracking-[-0.02em]">
              Your Membership Site Is Losing<br />
              <span className="text-[#F5C842]">Members Silently</span>
            </h1>

            <p className="font-serif text-[clamp(1rem,2.5vw,1.2rem)] text-[rgba(255,255,255,0.75)] m-0 mb-10 leading-[1.7] max-w-[600px] ml-auto mr-auto">
              Most membership platforms — WordPress, Circle, Mighty Networks — have no built-in cancel flow. Members click &quot;cancel&quot; and they&apos;re gone. ChurnRecovery connects through Stripe and intercepts cancellations before they&apos;re final, giving you one last chance to retain them with a pause, a discount, or an engagement-driven offer.
            </p>

            <div className="max-w-[480px] mx-auto mb-6">
              <SignUpCTA source="for-membership-sites" dark={true} />
            </div>

            <div className="flex gap-5 justify-center flex-wrap">
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                🆓 30-day free trial · works across platforms
              </span>
              <span className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.5)]">
                ⚡ 3 steps, no code
              </span>
            </div>

            <div className="mt-5">
              <Link href="/demo" className="font-sans text-[0.9rem] text-[rgba(255,255,255,0.6)] no-underline border-b border-b-[rgba(255,255,255,0.3)]">
                See how it works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: PAIN POINTS ──────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#D97706] uppercase tracking-[0.08em] mb-3">
                The Hidden Revenue Leak
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Every Silent Cancellation =<br />Lost Recurring Revenue
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[540px] mx-auto leading-[1.7]">
                Membership platforms excel at onboarding — but most leave you completely exposed at the offboarding moment. Members drift away, payments fail, and engagement drops. And you find out too late.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <PainCard
                icon="👻"
                title="Members Drift Away Silently"
                stat="5–10%"
                statLabel="of members disengage before they even cancel"
                description="Engagement drops long before the cancellation click. Members stop opening content, stop showing up to community events, and eventually leave without a word. You never get a chance to re-engage them."
              />
              <PainCard
                icon="📉"
                title="No Engagement-Based Intervention"
                description="Unlike SaaS tools that track feature usage, membership platforms rarely surface disengagement signals. By the time a member cancels, the relationship has already gone cold — and there&apos;s no automated way to step in earlier."
              />
              <PainCard
                icon="💳"
                title="Failed Payments Cause Passive Churn"
                description="Expired cards and failed renewals quietly kill memberships every month. Most platforms retry a few times and then cancel. Without a recovery flow, that passive churn adds up to thousands in lost annual revenue."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#E8A000] uppercase tracking-[0.08em] mb-3">
                3 Steps, No Code
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-4 tracking-[-0.02em]">
                Works With Any Membership Platform via Stripe
              </h2>
              <p className="font-serif text-base text-[#666666] max-w-[480px] mx-auto leading-[1.7]">
                WordPress memberships, Circle, Mighty Networks — they all process payments through Stripe. ChurnRecovery connects to Stripe directly. No platform plugins, no approval required.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <HowStep
                number="1"
                icon="🔗"
                title="Connect Your Stripe Account"
                description="Log into ChurnRecovery and connect your Stripe account with one click. We read cancellation signals from Stripe — the same payment processor your membership platform uses under the hood."
                callout="✓ No platform settings to change. No developer needed."
              />
              <HowStep
                number="2"
                icon="⚡"
                title="We Catch Cancellations Instantly"
                description="The moment a member initiates a cancellation, ChurnRecovery fires before it&apos;s final. We intercept the Stripe event and trigger your custom recovery flow — automatically, every time."
              />
              <HowStep
                number="3"
                icon="💬"
                title="Your Offer, Your Message — Automated"
                description="Members see a personalized message from you: a pause option for seasonal members, a special discount, or a quick exit survey to surface engagement gaps. Set it up once. It runs forever."
                callout="🎯 Average recovery rate: 20–35% of at-risk members"
              />
            </div>

            {/* Technical callout */}
            <div className="mt-8 bg-[rgba(232,160,0,0.05)] border border-[rgba(232,160,0,0.25)] border-l-4 border-l-[#E8A000] rounded-[10px] py-5 px-6 max-w-[680px] mx-auto">
              <p className="font-sans font-bold text-[#191919] m-0 mb-2 text-[0.95rem]">
                &ldquo;Does this work with my membership platform?&rdquo;
              </p>
              <p className="font-serif text-[0.88rem] text-[#666666] m-0 mb-2.5 leading-[1.7]">
                If your platform uses Stripe for recurring billing, yes. This includes WordPress plugins like MemberPress and Restrict Content Pro, Circle communities, Mighty Networks, and most other membership tools. ChurnRecovery operates at the Stripe level — completely outside your platform&apos;s ecosystem.
              </p>
              <Link href="/docs" className="font-sans text-[0.82rem] text-[#E8A000] no-underline font-semibold">
                Technical integration docs →
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link href="/demo" className="inline-flex items-center gap-2 bg-[rgba(232,160,0,0.1)] border border-[rgba(232,160,0,0.3)] rounded-[10px] py-3.5 px-7 font-sans font-bold text-[#E8A000] no-underline text-[0.95rem]">
                🎮 Try the Interactive Demo
              </Link>
              <p className="font-sans text-[0.78rem] text-[#999999] mt-2">
                See a live cancel flow in action — no signup required
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: BENEFITS ─────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-sans text-[0.75rem] font-bold text-[#E8A000] uppercase tracking-[0.08em] mb-3">
                What You Get
              </div>
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Everything to Protect Your Membership Revenue
              </h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5">
              <BenefitCard
                icon="⏸"
                title="Pause Offer for Seasonal Members"
                description="Many membership site members leave during busy seasons — summer, school holidays, tax season. A pause option lets them step away without fully cancelling, so they come back when life settles down."
              />
              <BenefitCard
                icon="🏷"
                title="Discount Offer"
                description="Automatically offer a reduced rate to price-sensitive members before they cancel. Keeping a member at a discount is far better than losing the recurring revenue entirely."
              />
              <BenefitCard
                icon="📋"
                title="Exit Survey to Understand Engagement Gaps"
                description="Is it the content cadence? The community activity? The price? A quick 1-question exit survey tells you why members leave — so you can fix the engagement gaps that drive churn."
              />
              <BenefitCard
                icon="📊"
                title="Dashboard Insights"
                description="Track recovered revenue, which offers convert best, and your overall churn recovery rate — all in one clean dashboard. Know exactly what&apos;s working and where to improve."
              />
              <BenefitCard
                icon="🆓"
                title="$20/month — Flat"
                description="30-day free trial, then $20/month. All features included — no per-member fees, no percentage of revenue. Cancel anytime."
              />
              <BenefitCard
                icon="🌐"
                title="Works Across WordPress, Circle, Mighty Networks"
                description="One integration covers all your Stripe-connected membership platforms. Whether you run a WordPress membership, a Circle community, or a Mighty Networks group, ChurnRecovery has you covered."
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PRICING ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 mb-5 tracking-[-0.02em]">
              Simple Pricing That Pays for Itself
            </h2>
            <p className="font-serif text-base text-[#666666] leading-[1.7] m-0 mb-8">
              Most membership platforms charge $50–$200/month and offer zero churn recovery. ChurnRecovery is just $20/month — and saves you that in the first recovery it makes.
            </p>

            <div className="max-w-[380px] mx-auto mb-7">
              <div className="rounded-[10px] p-[18px] relative bg-[rgba(232,160,0,0.08)] border border-[#E8A000]">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#E8A000] text-[#1A1200] font-sans text-[0.7rem] font-bold py-[3px] px-2.5 rounded-full">
                  SIMPLE PRICING
                </div>
                <div className="font-sans font-bold text-[#191919] text-[0.9rem]">All Features</div>
                <div className="font-sans font-extrabold text-[1.4rem] my-1 text-[#E8A000]">$20/month</div>
                <div className="font-serif text-[0.78rem] text-[#666666]">30-day free trial · No credit card required</div>
              </div>
            </div>

            <div className="bg-[#EDF7F1] border border-[#C6E6D4] rounded-[10px] py-3.5 px-5 font-sans text-[0.88rem] text-[#2D7A4F] mb-6">
              Save just one member per month at $29/month and ChurnRecovery pays for itself — with every subsequent recovery being pure profit.
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#FAF9F5]">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.5rem)] text-[#191919] m-0 tracking-[-0.02em]">
                Questions From Membership Site Owners
              </h2>
            </div>

            {[
              {
                q: 'Which membership platforms does ChurnRecovery support?',
                a: "Any membership platform that processes recurring payments through Stripe. This includes WordPress plugins (MemberPress, Restrict Content Pro, Paid Memberships Pro), Circle communities, Mighty Networks, and most other membership tools that rely on Stripe for billing.",
              },
              {
                q: 'Does my platform need to approve this integration?',
                a: "No. ChurnRecovery connects directly to your Stripe account — not to your membership platform. Your platform has no visibility into or control over how you configure Stripe webhooks. No approval needed, no app store, no waiting.",
              },
              {
                q: 'My members disengage before they cancel. Can this help?',
                a: "ChurnRecovery catches members at the cancellation moment — the best last chance to retain them. While it doesn't trigger on disengagement signals (like login frequency), the exit survey it presents helps you understand engagement gaps so you can address them in your content and community strategy.",
              },
              {
                q: 'What is a pause offer, and why does it matter for membership sites?',
                a: "A pause offer lets a member temporarily suspend their membership instead of cancelling. For membership sites, this is especially powerful — members often leave during busy life periods, not because they dislike the community. A pause means they come back. A cancellation usually means they don't.",
              },
              {
                q: 'Can I customize the cancel flow for my community?',
                a: "Completely. Your message, your offer, your tone. We provide templates designed for community-based memberships, but you can edit every word. Your members will feel like they're hearing from you directly — not a generic software prompt.",
              },
              {
                q: 'Does this work if I run multiple membership tiers?',
                a: "Yes. ChurnRecovery works at the Stripe subscription level. If you have multiple tiers (monthly, annual, founding member), each cancellation event is caught and can trigger a tailored recovery flow based on the subscription details.",
              },
              {
                q: "What if someone still cancels after seeing the offer?",
                a: "That's fine. If they want to leave, they leave — and you still get their exit survey response, which is more than you had before. On average, 20–35% of at-risk members respond positively to recovery offers. The other 65–80% leave, but now you know why.",
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
                href="/posts/membership-site-churn-rate"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  What Is a Good Churn Rate for a Membership Site?
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Benchmarks and tactics for community and content memberships
                </div>
              </a>
              <a
                href="/posts/what-is-a-cancel-flow"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  What Is a Cancel Flow? (And Why You Need One)
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  The case for adding a cancel flow to any membership site
                </div>
              </a>
              <a
                href="/posts/Involuntary-Churn-Recovery"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  How to Recover Failed Payments and Involuntary Churn
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  Stop passive churn from quietly draining your membership revenue
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL CTA ────────────────────────────────────── */}
        <section className="bg-[linear-gradient(135deg,#1A1200_0%,#2D1E00_100%)] py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-white m-0 mb-5 leading-[1.2] tracking-[-0.02em]">
              A Member Is About to Cancel.<br />
              <span className="text-[#F5C842]">Will You Be Ready?</span>
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.7)] m-0 mb-9 leading-[1.7]">
              Start your free trial. Protect your membership revenue with automated churn recovery — across WordPress, Circle, Mighty Networks, and any platform using Stripe. $20/month after 30 days.
            </p>

            <div className="max-w-[480px] mx-auto">
              <SignUpCTA source="for-membership-sites" dark={true} />
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
