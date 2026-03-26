import Head from 'next/head'
import Link from 'next/link'

const features = [
  {
    category: 'Cancel Flow',
    icon: '🚪',
    colorClass: 'text-brand-accent',
    colorLightBg: 'bg-[#FDF4EF]',
    painStatement: 'Every unintercepted cancel is revenue you\'ll never get back. 20–40% of subscribers who click "cancel" would stay if you asked the right way.',
    items: [
      {
        title: 'Smart Cancel Interception',
        description: 'ChurnRecovery intercepts the cancel action the moment a customer clicks your cancel button — before any cancellation is processed. The flow appears as a modal overlay, keeping customers inside your product.',
        details: ['Works with any billing provider', 'Zero-latency interception', 'Mobile-responsive modal', 'Keyboard accessible'],
      },
      {
        title: 'Reason-Based Offer Engine',
        description: 'Ask customers why they\'re canceling, then fire the right retention offer based on their answer. Price objections get discount offers. Inactivity gets pause offers. Switching gets win-back deals.',
        details: ['6 built-in cancel reasons', 'Custom reasons + routing', 'Multiple offer types per reason', 'A/B test different offers'],
      },
      {
        title: 'Offer Types: Discount, Pause, Human, Feedback',
        description: 'Four battle-tested offer types cover 95%+ of cancel scenarios. Discounts save price-sensitive customers. Pause offers save busy customers who plan to return. Human escalation saves complex cases.',
        details: ['% or $ discount offers', 'Pause for 1-6 months', 'Live chat escalation', 'Feedback-only mode'],
      },
      {
        title: 'Skip Flow & Immediate Cancel',
        description: 'Never trap customers. ChurnRecovery always includes a clear "Cancel anyway" path — so customers who truly want to leave can. This honesty builds trust and often actually increases the save rate.',
        details: ['Clear dismiss buttons', 'Skip to immediate cancel', 'No dark patterns', 'GDPR compliant'],
      },
    ],
  },
  {
    category: 'Analytics',
    icon: '📊',
    colorClass: 'text-brand-blue',
    colorLightBg: 'bg-brand-blue-light',
    painStatement: 'You can\'t fix what you can\'t measure. Without churn analytics, you\'re guessing why subscribers leave — and guessing wrong costs thousands.',
    items: [
      {
        title: 'Save Rate Dashboard',
        description: 'Track your save rate in real time. See what percentage of customers who see the cancel flow end up staying. Drill down by plan, country, cohort, and cancel reason.',
        details: ['Real-time updates', 'Historical trends', 'Segment filters', 'Export to CSV'],
      },
      {
        title: 'Revenue Recovered Tracking',
        description: 'Know exactly how much MRR ChurnRecovery has saved you. Every saved customer is tagged with their plan value — so you can see the dollar impact, not just the headcount.',
        details: ['MRR saved per customer', 'Monthly/annual revenue impact', 'LTV extension tracking', 'Stripe revenue sync'],
      },
      {
        title: 'Churn Reason Intelligence',
        description: 'Turn cancel reasons into product intelligence. See which reasons are trending up, which plans have the highest price sensitivity, and where your product has gaps that competitors are filling.',
        details: ['Reason trend charts', 'Plan-level breakdowns', 'Competitive switching analysis', 'Feature request aggregation'],
      },
      {
        title: 'Offer Performance Reports',
        description: 'See which offers actually work. Compare acceptance rates across discount amounts, pause durations, and offer copy. Know exactly which variant drives the highest save rate.',
        details: ['Offer acceptance rates', 'A/B test results', 'Variant comparison', 'Statistical significance'],
      },
    ],
  },
  {
    category: 'Win-Back',
    icon: '📧',
    colorClass: 'text-brand-green',
    colorLightBg: 'bg-brand-green-light',
    painStatement: 'A canceled subscriber isn\'t gone forever — but without a win-back sequence, they might as well be. Most businesses never follow up.',
    items: [
      {
        title: 'Automated Win-Back Email Sequences',
        description: 'Even when a customer cancels, ChurnRecovery automatically queues a multi-step win-back sequence. Smart timing: day 7 (check-in), day 14 (product update), day 30 (final offer).',
        details: ['3-email default sequence', 'Customizable timing', 'Personalized with cancel reason', 'Unsubscribe compliant'],
      },
      {
        title: 'Failed Payment Recovery',
        description: 'Involuntary churn from failed payments causes 20-40% of all SaaS cancellations. ChurnRecovery detects failed payments and automatically sends smart dunning emails to recover the card.',
        details: ['Stripe webhook integration', 'Smart retry scheduling', 'Card update links', 'Payment failure analytics'],
      },
      {
        title: 'Re-engagement Offers',
        description: 'Win-back emails can include re-engagement offers — discounts or bonuses that give canceled customers a compelling reason to come back. More effective than generic "we miss you" emails.',
        details: ['Discount codes in emails', 'Time-limited offers', 'One-click reactivation', 'Offer expiry tracking'],
      },
    ],
  },
  {
    category: 'Integration',
    icon: '🔗',
    colorClass: 'text-brand-purple',
    colorLightBg: 'bg-brand-purple-light',
    painStatement: 'Complex integrations that take weeks to set up mean weeks of lost revenue. ChurnRecovery connects in minutes, not months.',
    items: [
      {
        title: 'One-Line JavaScript SDK',
        description: 'Add ChurnRecovery to your app with a single import and two API calls. Seriously — that\'s it. No complex setup, no backend work required. Most teams are live in under an hour.',
        details: ['npm package', 'CDN script tag option', 'TypeScript types included', 'React + Vue + vanilla'],
      },
      {
        title: 'REST API',
        description: 'Full REST API for server-side integrations. Trigger cancel flows, retrieve analytics, manage customers, and configure offers — all via clean, versioned API endpoints.',
        details: ['API key auth', 'Versioned endpoints', 'Idempotent operations', 'Rate limit: 1000 req/min'],
      },
      {
        title: 'Stripe Native Integration',
        description: 'Connect your Stripe account in 30 seconds. ChurnRecovery reads your plans, customers, and subscription data — and automatically applies offers (discounts, pauses) directly in Stripe.',
        details: ['OAuth connection', 'Auto-apply discounts', 'Subscription pause support', 'Webhook sync'],
      },
      {
        title: 'Webhooks',
        description: 'Get notified in real time when customers are saved, when they cancel, when offers are accepted. Send data to your CRM, Slack, or any downstream system.',
        details: ['Cancel events', 'Save events', 'Offer acceptance events', 'Retry with exponential backoff'],
      },
    ],
  },
]

function Nav() {
  return (
    <nav className="border-b border-brand-border bg-brand-white px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
      <Link href="/" className="font-sans font-bold text-[1.1rem] text-brand-text no-underline tracking-[-0.01em]">
        ChurnRecovery
      </Link>
      <div className="nav-links flex gap-6 items-center">
        <Link href="/features" className="text-brand-accent no-underline text-[0.9rem] font-sans font-semibold">Features</Link>
        <Link href="/docs" className="text-brand-gray no-underline text-[0.9rem] font-sans">Docs</Link>
        <Link href="/demo" className="text-brand-gray no-underline text-[0.9rem] font-sans">Demo</Link>
        <Link href="/blog" className="text-brand-gray no-underline text-[0.9rem] font-sans">Blog</Link>
        <a href="/app/sign-up" className="bg-brand-accent text-brand-white py-2 px-[18px] rounded-md no-underline text-[0.85rem] font-semibold font-sans">Start Free Trial</a>
      </div>
    </nav>
  )
}

export default function FeaturesPage() {
  const title = 'Features — ChurnRecovery SaaS Churn Reduction Platform'
  const description = 'Everything you need to stop losing customers. Cancel flow interception, smart offers, churn analytics, win-back emails, and Stripe integration — $20/month with a 30-day free trial.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://churnrecovery.com/features" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://churnrecovery.com/features" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: title,
              description,
              url: 'https://churnrecovery.com/features',
              publisher: { '@type': 'Organization', name: 'ChurnRecovery', url: 'https://churnrecovery.com' },
            }),
          }}
        />
      </Head>

      <div className="bg-brand-bg min-h-screen font-sans">
        <Nav />

        {/* Hero */}
        <section className="max-w-[900px] mx-auto px-6 pt-[72px] pb-14 text-center">
          <div className="inline-block bg-[#F0EBE5] text-brand-accent px-3.5 py-1 rounded text-[0.72rem] font-bold uppercase tracking-[0.08em] mb-5">
            Full Feature Set
          </div>
          <h1 className="font-sans text-[clamp(2rem,5vw,3rem)] font-extrabold text-brand-text tracking-[-0.04em] mb-4 leading-[1.1]">
            Everything you need to stop losing customers
          </h1>
          <p className="font-serif text-[1.15rem] text-brand-gray leading-[1.7] max-w-[600px] mx-auto mb-10">
            ChurnRecovery is a complete churn reduction platform — cancel flow interception, analytics, win-back automation, and deep integrations. 30-day free trial, then $20/month.
          </p>

          {/* Category jump links */}
          <div className="flex gap-3 justify-center flex-wrap">
            {features.map(f => (
              <a key={f.category} href={`#${f.category.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-brand-border bg-brand-white no-underline text-brand-text text-[0.85rem] font-semibold transition-all duration-150">
                <span>{f.icon}</span> {f.category}
              </a>
            ))}
          </div>
        </section>

        {/* Feature categories */}
        {features.map((category, ci) => (
          <section
            key={category.category}
            id={category.category.toLowerCase().replace(' ', '-')}
            className={`${ci % 2 === 0 ? 'bg-brand-white' : 'bg-brand-bg'} border-t border-brand-border py-20 px-6`}
          >
            <div className="max-w-[1100px] mx-auto">
              {/* Category header */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-[10px] ${category.colorLightBg} flex items-center justify-center text-[1.2rem]`}>
                    {category.icon}
                  </div>
                  <span className={`font-sans text-[0.75rem] font-bold uppercase tracking-[0.1em] ${category.colorClass}`}>
                    {category.category}
                  </span>
                </div>
                {category.painStatement && (
                  <p className="font-serif text-[0.95rem] text-brand-gray leading-[1.7] max-w-[600px] mt-2 mb-0">
                    {category.painStatement}
                  </p>
                )}
              </div>

              {/* Feature grid */}
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(480px,100%),1fr))] gap-6">
                {category.items.map(feature => (
                  <div key={feature.title} className={`border border-brand-border rounded-xl p-7 ${ci % 2 === 0 ? 'bg-brand-bg' : 'bg-brand-white'}`}>
                    <h3 className="font-sans text-[1.05rem] font-bold text-brand-text tracking-[-0.02em] mb-2.5">
                      {feature.title}
                    </h3>
                    <p className="font-serif text-[0.88rem] text-brand-gray leading-[1.7] mb-5">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.details.map(d => (
                        <span key={d} className="flex items-center gap-[5px] text-[0.78rem] text-brand-gray font-sans">
                          <span className={`${category.colorClass} font-bold`}>✓</span>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA callout */}
        <section className="bg-brand-text py-20 px-6">
          <div className="max-w-[900px] mx-auto text-center">
            <h2 className="font-sans text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-brand-white tracking-[-0.03em] mb-4">
              All of this for $20/month.
            </h2>
            <p className="font-serif text-base text-white/65 max-w-[520px] mx-auto mb-8 leading-[1.7]">
              Start your free trial — 30 days, full access, no credit card required. Cancel flows, payment recovery, analytics, and integrations. No per-subscriber fees. No revenue share.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/app/sign-up" className="inline-block bg-brand-accent text-brand-white px-8 py-3.5 rounded-lg font-sans font-bold text-base no-underline tracking-[-0.01em]">
                Start Free Trial →
              </a>
              <Link href="/compare/churnkey" className="inline-block bg-transparent text-white/70 px-8 py-3.5 rounded-lg font-sans font-semibold text-base no-underline border border-white/20">
                See Full Comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* Quick feature checklist */}
        <section className="py-20 px-6 bg-brand-bg">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-sans text-[clamp(1.4rem,3.5vw,2rem)] font-bold text-brand-text tracking-[-0.03em] mb-3">
                Everything, at a glance
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-2">
              {[
                'Cancel flow modal', 'Reason picker', 'Discount offers', 'Pause offers',
                'Human escalation', 'Feedback collection', 'A/B testing', 'Save rate analytics',
                'Revenue recovered tracking', 'Churn reason intelligence', 'Offer performance reports',
                'Win-back email sequences', 'Failed payment recovery', 'Re-engagement offers',
                'JavaScript SDK', 'REST API', 'Stripe integration', 'Paddle integration',
                'Webhooks', 'Slack notifications', 'Custom branding', 'White-label mode',
                'GDPR compliant', 'SOC 2 (planned)', 'Unlimited customers', '30-day free trial',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-md bg-brand-white border border-brand-border">
                  <span className="text-brand-green font-bold text-[0.9rem]">✓</span>
                  <span className="font-sans text-[0.85rem] text-brand-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-white border-t border-brand-border py-16 px-6 text-center">
          <h2 className="font-sans text-[clamp(1.3rem,3vw,1.8rem)] font-bold text-brand-text tracking-[-0.03em] mb-3">
            Ready to start recovering customers?
          </h2>
          <p className="font-serif text-base text-brand-gray mb-7 leading-[1.7]">
            Start recovering customers today — 30-day free trial, then $20/month.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="/app/sign-up" className="bg-brand-accent text-brand-white px-7 py-[13px] rounded-lg font-sans font-bold text-[0.95rem] no-underline">
              Start Free Trial
            </a>
            <Link href="/demo" className="bg-brand-bg text-brand-text px-7 py-[13px] rounded-lg font-sans font-semibold text-[0.95rem] no-underline border border-brand-border">
              Try the Demo →
            </Link>
            <Link href="/docs" className="bg-brand-bg text-brand-text px-7 py-[13px] rounded-lg font-sans font-semibold text-[0.95rem] no-underline border border-brand-border">
              Read the Docs →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
