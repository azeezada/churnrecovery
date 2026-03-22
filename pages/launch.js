import Head from 'next/head'
import Link from 'next/link'

const features = [
  {
    emoji: '🛑',
    title: 'Cancel Flow Engine',
    description: 'Smart cancel flows that fire the moment a customer clicks "Cancel." Offer a pause, discount, or plan change — automatically based on their reason.',
  },
  {
    emoji: '💳',
    title: 'Failed Payment Recovery',
    description: 'Automated dunning sequences recover failed payments before you lose the customer. Smart retries + personalized emails = 30–60% recovery rate.',
  },
  {
    emoji: '📊',
    title: 'Exit Survey Analytics',
    description: 'Know exactly why customers leave. See cancellation reasons, trends, and revenue at risk — all in one dashboard.',
  },
  {
    emoji: '⚡',
    title: '15-Minute Setup',
    description: 'Connect Stripe in one click. No developers, no code. Your cancel flow is live faster than it takes to read a Churnkey pricing page.',
  },
]

const competitors = [
  { name: 'ChurnRecovery', price: '$0 / forever', highlight: true },
  { name: 'Churnkey', price: '$250 – $825 / mo', highlight: false },
  { name: 'ProfitWell Retain', price: '$149 – $499 / mo', highlight: false },
  { name: 'Churnbuster', price: '$47 – $197 / mo', highlight: false },
]

const testimonials = [
  {
    quote: 'ChurnRecovery saved us 23 customers in the first month. We were about to pay Churnkey $400/mo for this.',
    name: 'Alex R.',
    role: 'Newsletter Creator',
  },
  {
    quote: 'Setup took 20 minutes. The pause offer alone recovered $1,200 in MRR we would have lost.',
    name: 'Sarah K.',
    role: 'Online Course Creator',
  },
  {
    quote: 'Finally — a churn tool priced for bootstrappers. The cancel flow UX is better than tools 10x the price.',
    name: 'Marcus T.',
    role: 'SaaS Founder',
  },
]

export default function LaunchPage() {
  const title = 'ChurnRecovery — Free Churn Recovery for Subscription Businesses | Product Hunt Launch'
  const description = 'Stop losing subscribers. Cancel flows, dunning emails, and exit surveys — completely free. The $825/mo alternative that costs $0.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="ChurnRecovery — Stop losing subscribers. No dev team required." />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://churnrecovery.com/launch" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://churnrecovery.com/screenshots/homepage-hero.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ChurnRecovery — Free churn recovery for subscription businesses" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://churnrecovery.com/screenshots/homepage-hero.png" />
        <link rel="canonical" href="https://churnrecovery.com/launch" />
      </Head>

      <style>{`
        .ph-badge:hover { opacity: 0.85; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.3s; opacity: 0; }
      `}</style>

      <div className="bg-brand-bg min-h-screen font-sans">

        {/* Nav */}
        <nav className="border-b border-brand-border bg-brand-white px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
          <Link href="/" className="font-sans font-bold text-[1.1rem] text-brand-text no-underline tracking-[-0.01em]">
            ChurnRecovery
          </Link>
          <div className="flex gap-4 items-center">
            <a
              href="https://www.producthunt.com/posts/churnrecovery"
              target="_blank"
              rel="noopener noreferrer"
              className="ph-badge hidden sm:flex items-center gap-2 bg-[#FF6154] text-white px-3.5 py-1.5 rounded-md no-underline text-[0.82rem] font-bold transition-opacity"
            >
              🐱 Featured on Product Hunt
            </a>
            <a
              href="/app/sign-up?source=product-hunt-launch&utm_source=producthunt&utm_medium=launch-page&utm_campaign=ph-april-2026"
              className="bg-brand-accent text-brand-white px-[18px] py-2 rounded-md no-underline text-[0.85rem] font-semibold whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              Get Started Free →
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-[860px] mx-auto px-6 pt-[70px] pb-16 text-center">
          {/* PH Badge */}
          <a
            href="https://www.producthunt.com/posts/churnrecovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFF2F1] border border-[#FF6154]/30 text-[#FF6154] px-4 py-1.5 rounded-full text-[0.78rem] font-bold uppercase tracking-[0.06em] mb-6 no-underline hover:bg-[#FFE8E7] transition-colors"
          >
            🐱 Product Hunt Launch — April 7, 2026
          </a>

          <h1 className="fade-up fade-up-1 font-sans text-[clamp(2rem,5.5vw,3.2rem)] font-extrabold text-brand-text tracking-[-0.04em] mb-5 leading-[1.12]">
            Stop losing subscribers.<br />
            <span className="text-brand-accent">No dev team required.</span>
          </h1>

          <p className="fade-up fade-up-2 font-serif text-[1.15rem] text-brand-gray leading-[1.7] max-w-[600px] mx-auto mb-4">
            ChurnRecovery gives you smart cancel flows, failed payment recovery, and exit surveys — the same tools Churnkey charges $825/month for — completely free.
          </p>

          <p className="fade-up fade-up-2 font-sans text-[0.95rem] text-brand-gray leading-[1.6] max-w-[520px] mx-auto mb-10">
            Built for newsletter creators, coaches, and subscription businesses. Set up in 15 minutes. No code needed.
          </p>

          <div className="fade-up fade-up-3 flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
            <a
              href="/app/sign-up?source=product-hunt-launch&utm_source=producthunt&utm_medium=launch-page&utm_campaign=ph-april-2026"
              className="px-8 py-4 rounded-lg bg-brand-accent text-brand-white no-underline font-bold text-[1rem] hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
            >
              Get Started Free →
            </a>
            <Link
              href="/demo"
              className="px-7 py-3.5 rounded-lg border border-brand-border text-brand-gray no-underline font-medium text-[0.95rem] hover:border-brand-accent hover:text-brand-accent transition-colors w-full sm:w-auto text-center"
            >
              See a Live Demo
            </Link>
          </div>

          <p className="font-sans text-xs text-brand-gray-light mb-0 mt-2">
            Free forever · No credit card · Stripe connects in 1 click
          </p>
        </section>

        {/* Pricing comparison callout */}
        <section className="max-w-[860px] mx-auto px-6 pb-16">
          <div className="bg-brand-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#FFF7F5] border-b border-brand-border px-6 py-4 text-center">
              <p className="font-sans font-bold text-brand-text text-[0.9rem] m-0">
                What everyone else charges for this:
              </p>
            </div>
            <div className="divide-y divide-brand-border">
              {competitors.map((c) => (
                <div
                  key={c.name}
                  className={`flex items-center justify-between px-6 py-4 ${c.highlight ? 'bg-[#FFF7F5]' : ''}`}
                >
                  <span className={`font-sans font-${c.highlight ? 'bold' : 'medium'} text-[0.95rem] ${c.highlight ? 'text-brand-accent' : 'text-brand-text'}`}>
                    {c.name}
                    {c.highlight && <span className="ml-2 text-[0.72rem] bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">YOU ARE HERE</span>}
                  </span>
                  <span className={`font-sans font-semibold text-[0.95rem] ${c.highlight ? 'text-brand-accent' : 'text-brand-gray line-through'}`}>
                    {c.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-[860px] mx-auto px-6 pb-20">
          <h2 className="font-sans text-[1.6rem] font-extrabold text-brand-text tracking-[-0.03em] text-center mb-3">
            Everything you need to stop churn
          </h2>
          <p className="font-serif text-brand-gray text-center mb-10 text-[1rem] leading-relaxed">
            One platform. Cancel flows, payment recovery, exit surveys, analytics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-brand-white border border-brand-border rounded-xl p-6">
                <div className="text-[1.8rem] mb-3">{f.emoji}</div>
                <h3 className="font-sans font-bold text-brand-text text-[1rem] mb-2">{f.title}</h3>
                <p className="font-sans text-brand-gray text-[0.9rem] leading-relaxed m-0">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshots */}
        <section className="max-w-[860px] mx-auto px-6 pb-20">
          <h2 className="font-sans text-[1.6rem] font-extrabold text-brand-text tracking-[-0.03em] text-center mb-10">
            See it in action
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-brand-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 py-2.5 bg-[#F5F5F5] border-b border-brand-border flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                <span className="font-sans text-[0.75rem] text-brand-gray ml-2">Dashboard — Revenue Recovered</span>
              </div>
              <img
                src="/screenshots/product-dashboard-improved.png"
                alt="ChurnRecovery dashboard showing recovered revenue, save rates, and churn analytics"
                className="w-full h-auto block"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-brand-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
                <div className="px-4 py-2.5 bg-[#F5F5F5] border-b border-brand-border flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                  <span className="font-sans text-[0.75rem] text-brand-gray ml-2">Cancel Flow Builder</span>
                </div>
                <img
                  src="/screenshots/product-flow-builder.png"
                  alt="ChurnRecovery no-code cancel flow builder"
                  className="w-full h-auto block"
                />
              </div>
              <div className="bg-brand-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
                <div className="px-4 py-2.5 bg-[#F5F5F5] border-b border-brand-border flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                  <span className="font-sans text-[0.75rem] text-brand-gray ml-2">Email Recovery Sequences</span>
                </div>
                <img
                  src="/screenshots/product-email-sequences.png"
                  alt="ChurnRecovery automated dunning email sequences for failed payments"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="max-w-[860px] mx-auto px-6 pb-20">
          <h2 className="font-sans text-[1.6rem] font-extrabold text-brand-text tracking-[-0.03em] text-center mb-10">
            Early users love it
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-brand-white border border-brand-border rounded-xl p-5">
                <p className="font-serif text-brand-text text-[0.92rem] leading-relaxed mb-4 m-0">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-sans font-semibold text-brand-text text-[0.85rem] m-0">{t.name}</p>
                  <p className="font-sans text-brand-gray-light text-[0.8rem] m-0">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-[860px] mx-auto px-6 pb-20">
          <h2 className="font-sans text-[1.6rem] font-extrabold text-brand-text tracking-[-0.03em] text-center mb-3">
            Up and running in 15 minutes
          </h2>
          <p className="font-serif text-brand-gray text-center mb-10 text-[1rem]">
            No developers. No complex integrations. Just connect Stripe and you&apos;re live.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { n: '1', title: 'Connect Stripe', desc: 'One-click OAuth. We never store your keys. Takes 90 seconds.' },
              { n: '2', title: 'Build your cancel flow', desc: 'Pick from templates or customize from scratch. Drag-and-drop, no code.' },
              { n: '3', title: 'Add one script tag', desc: 'Copy a single line of JavaScript. ChurnRecovery handles everything else.' },
              { n: '4', title: 'Watch your saves roll in', desc: 'Real-time dashboard shows customers saved, revenue recovered, and why people leave.' },
            ].map((step) => (
              <div key={step.n} className="bg-brand-white border border-brand-border rounded-xl p-5 flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-brand-accent/10 border-2 border-brand-accent flex items-center justify-center font-bold text-brand-accent text-sm shrink-0">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-brand-text text-[0.95rem] mb-1 m-0">{step.title}</h3>
                  <p className="font-sans text-brand-gray text-[0.88rem] leading-relaxed m-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[860px] mx-auto px-6 pb-24">
          <div className="bg-brand-accent rounded-2xl px-8 py-12 text-center">
            <h2 className="font-sans text-[clamp(1.6rem,4vw,2.2rem)] font-extrabold text-brand-white tracking-[-0.03em] mb-4">
              Start recovering revenue today — free
            </h2>
            <p className="font-serif text-[rgba(255,255,255,0.85)] text-[1rem] leading-[1.7] mb-8 max-w-[480px] mx-auto">
              No credit card. No trial period. No pricing games. Just connect Stripe and start saving customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/app/sign-up?source=product-hunt-launch&utm_source=producthunt&utm_medium=launch-page-cta&utm_campaign=ph-april-2026"
                className="px-8 py-4 rounded-lg bg-brand-white text-brand-accent no-underline font-bold text-[1rem] hover:opacity-90 transition-opacity"
              >
                Get Started Free →
              </a>
              <a
                href="https://www.producthunt.com/posts/churnrecovery"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-lg border border-[rgba(255,255,255,0.3)] text-brand-white no-underline font-medium text-[0.95rem] hover:border-white transition-colors"
              >
                🐱 Upvote on Product Hunt
              </a>
            </div>
            <p className="font-sans text-[0.8rem] text-[rgba(255,255,255,0.6)] mt-5 mb-0">
              Free forever for small teams · Set up in 15 minutes
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-brand-border bg-brand-white px-6 py-8">
          <div className="max-w-[860px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/" className="font-sans font-bold text-brand-text no-underline text-[0.95rem]">
              ChurnRecovery
            </Link>
            <div className="flex gap-5 flex-wrap justify-center">
              <Link href="/pricing" className="font-sans text-brand-gray no-underline text-[0.85rem] hover:text-brand-text">Pricing</Link>
              <Link href="/demo" className="font-sans text-brand-gray no-underline text-[0.85rem] hover:text-brand-text">Demo</Link>
              <Link href="/compare/churnkey" className="font-sans text-brand-gray no-underline text-[0.85rem] hover:text-brand-text">vs Churnkey</Link>
              <Link href="/blog" className="font-sans text-brand-gray no-underline text-[0.85rem] hover:text-brand-text">Blog</Link>
            </div>
            <p className="font-sans text-brand-gray-light text-[0.8rem] m-0">
              © {new Date().getFullYear()} ChurnRecovery
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
