import Head from 'next/head'
import Link from 'next/link'

const features = [
  { category: 'Cancel Flow Engine', items: ['Drag-and-drop flow builder', 'Reason-based dynamic offers', 'Pause / downgrade / discount offers', 'Custom branding & white-label', 'A/B test multiple flows'] },
  { category: 'Payment Recovery', items: ['Smart retry scheduling', 'Automated dunning email sequences', 'In-app payment update prompts', 'Card updater (Stripe Radar)', '90-day recovery window'] },
  { category: 'Analytics & Insights', items: ['Save rate dashboard', 'Revenue recovered tracking', 'Reason-breakdown reports', 'Cohort churn analysis', 'CSV export'] },
  { category: 'Integrations', items: ['Stripe (native)', 'Paddle', 'Braintree', 'Chargebee', 'Recurly', 'Webhooks & Zapier'] },
  { category: 'Developer Tools', items: ['React SDK', 'JavaScript embed', 'REST API', 'Thorough documentation', 'Open-source components'] },
  { category: 'Support', items: ['Community Discord', 'GitHub issues', 'Email support', 'Onboarding walkthrough', 'Setup video library'] },
]

const comparisons = [
  { name: 'ChurnRecovery', price: '$0 / forever', highlight: true, users: 'Unlimited', flows: 'Unlimited', integrations: 'All', support: 'Community + Email' },
  { name: 'Churnkey', price: '$250 – $825 / mo', highlight: false, users: 'Limited', flows: 'Unlimited', integrations: 'Stripe only', support: 'Email' },
  { name: 'ProfitWell Retain', price: '$149 – $499 / mo', highlight: false, users: 'Limited', flows: 'Limited', integrations: 'Some', support: 'Email' },
  { name: 'Churnbuster', price: '$47 – $197 / mo', highlight: false, users: 'Unlimited', flows: 'Basic', integrations: 'Stripe only', support: 'Email' },
]

const faqs = [
  {
    q: 'Is this actually free? What\'s the catch?',
    a: 'Yes, genuinely free. We make money through optional managed services, priority support plans, and enterprise contracts with large teams. The core product — cancel flows, payment recovery, analytics — is free for everyone, forever. We believe the best way to build trust is to give real value upfront.'
  },
  {
    q: 'How do you compare to Churnkey?',
    a: 'Churnkey starts at $250/month and goes up to $825+/month. ChurnRecovery has the same core features at $0. If you\'re paying more than $50/month in SaaS fees per recovered churner, the math already works in our favor. We also support more payment processors out of the box.'
  },
  {
    q: 'What payment processors do you support?',
    a: 'We natively support Stripe, Paddle, Braintree, Chargebee, and Recurly. Webhook-based integrations work with any processor. Stripe integration takes about 5 minutes; others take under an hour.'
  },
  {
    q: 'How long does setup take?',
    a: 'Most teams are live within 2 hours. If you\'re using Stripe, it\'s closer to 30 minutes. We have step-by-step guides for every major integration, a React SDK for component-based setups, and plain JavaScript for everything else.'
  },
  {
    q: 'Do I need technical skills to set up ChurnRecovery?',
    a: 'Basic JavaScript helps but isn\'t required. Non-technical teams can use our hosted embed (one script tag). Developers get more control via the React SDK and REST API. The flow builder is entirely visual — no code needed for cancel flows.'
  },
  {
    q: 'What kind of save rates can I expect?',
    a: 'Results vary, but our users typically see 20–40% of would-be churners saved through cancel flows, and 30–60% of failed payments recovered through dunning. Run our churn calculator to estimate your potential savings.'
  },
  {
    q: 'Can I use this for involuntary churn only?',
    a: 'Yes. Many teams start with just payment recovery (the easiest win), then add cancel flows later. You can enable features incrementally — no commitment to use everything at once.'
  },
  {
    q: 'Is there a limit on the number of customers or recoveries?',
    a: 'No limits. Whether you\'re recovering 10 churners or 10,000 per month, the product is the same. We don\'t charge per-recovery fees or take a percentage of saved revenue.'
  },
]

export default function Pricing() {
  return (
    <div className="bg-brand-bg min-h-screen font-sans">
      <Head>
        <title>Pricing — ChurnRecovery is Free Forever | No Monthly Fees</title>
        <meta name="description" content="ChurnRecovery is completely free. Cancel flows, payment recovery, analytics, and integrations at $0/month — no catch, no per-recovery fees, no revenue share." />
        <meta property="og:title" content="Pricing — ChurnRecovery is Free Forever" />
        <meta property="og:description" content="Cancel flows, payment recovery, analytics at $0/month. No catch." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://churnrecovery.com/pricing" />
        <meta property="og:image" content="https://churnrecovery.com/og/pricing.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ChurnRecovery — Free Churn Recovery Platform" />
        <link rel="canonical" href="https://churnrecovery.com/pricing" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "ChurnRecovery",
          "description": "Free churn recovery platform for SaaS",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        })}} />
      </Head>

      {/* Hero */}
      <div className="border-b border-brand-border bg-brand-white">
        <div className="pricing-hero max-w-[1100px] mx-auto px-8 pt-[72px] pb-16 text-center">
          <div className="inline-block bg-brand-green-light text-brand-green rounded-[20px] px-4 py-1.5 text-[13px] font-semibold mb-5 tracking-[0.02em]">
            ✓ Always free — no credit card required
          </div>
          <h1 className="font-serif text-[clamp(36px,6vw,58px)] font-bold text-brand-text mb-5 leading-[1.1]">
            Simple pricing.<br />
            <span className="text-brand-accent">It's free.</span>
          </h1>
          <p className="text-[20px] text-brand-gray max-w-[560px] mx-auto mb-9 leading-relaxed font-serif">
            Every feature, every integration, unlimited customers. No monthly fees, no per-recovery charges, no revenue share.
          </p>
          <div className="pricing-hero-btns flex gap-3 justify-center flex-wrap">
            <Link href="/app/sign-up" className="bg-brand-accent text-brand-white px-8 py-3.5 rounded-lg font-bold no-underline text-base">
              Get Started Free →
            </Link>
            <Link href="/demo" className="bg-brand-white text-brand-text px-8 py-3.5 rounded-lg font-semibold no-underline text-base border-2 border-brand-border">
              See live demo
            </Link>
          </div>
        </div>
      </div>

      {/* Pricing card */}
      <div className="pricing-card-wrap max-w-[1100px] mx-auto px-8 pt-16">
        <div className="bg-brand-white rounded-2xl border-2 border-brand-accent overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          {/* Card header */}
          <div className="bg-brand-accent px-10 py-8 flex items-center justify-between flex-wrap gap-5">
            <div>
              <div className="text-white/80 text-[13px] font-semibold tracking-[0.1em] uppercase mb-2">
                ChurnRecovery
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-brand-white text-[56px] font-extrabold leading-none">$0</span>
                <span className="text-white/80 text-lg">/month</span>
              </div>
              <div className="text-white/90 text-[15px] mt-2">
                Forever. No hidden fees.
              </div>
            </div>
            <div className="text-right">
              <div className="text-brand-white text-sm mb-1">Compare to Churnkey:</div>
              <div className="text-white/70 text-2xl font-bold line-through">$3,000–$9,900/yr</div>
              <div className="text-brand-white text-sm mt-1">You save thousands every year</div>
            </div>
          </div>

          {/* Feature grid */}
          <div className="pricing-feature-grid p-10 grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-10">
            {features.map(cat => (
              <div key={cat.category}>
                <h3 className="text-[13px] font-bold text-brand-gray-light tracking-[0.1em] uppercase mb-4">
                  {cat.category}
                </h3>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  {cat.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-brand-text">
                      <span className="text-brand-green font-bold shrink-0 mt-px">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="pricing-cta-strip bg-[#F5F5F0] border-t border-brand-border px-10 py-6 flex items-center justify-between flex-wrap gap-4">
            <div className="text-[15px] text-brand-gray">
              No credit card. No contracts. Start recovering churn in hours.
            </div>
            <Link href="/app/sign-up" className="bg-brand-accent text-brand-white px-7 py-3 rounded-lg font-bold no-underline text-[15px]">
              Get Started Free →
            </Link>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="max-w-[1100px] mx-auto mt-16 px-8">
        <h2 className="font-serif text-[28px] text-brand-text mb-2 text-center">
          How we stack up
        </h2>
        <p className="text-brand-gray text-center mb-9 text-base">
          Same features. Zero monthly cost.
        </p>
        <div className="bg-brand-white rounded-xl border border-brand-border overflow-hidden overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-[480px] border-collapse text-[15px]">
            <thead>
              <tr className="border-b-2 border-brand-border">
                <th className="px-6 py-4 text-left text-brand-gray font-semibold w-1/4">Platform</th>
                <th className="px-6 py-4 text-center text-brand-gray font-semibold">Monthly Cost</th>
                <th className="px-6 py-4 text-center text-brand-gray font-semibold">Users</th>
                <th className="px-6 py-4 text-center text-brand-gray font-semibold">Integrations</th>
                <th className="px-6 py-4 text-center text-brand-gray font-semibold">Support</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={row.name} className={`${i < comparisons.length - 1 ? 'border-b border-brand-border' : ''} ${row.highlight ? 'bg-[#FFF8F5]' : ''}`}>
                  <td className={`px-6 py-4 ${row.highlight ? 'font-bold text-brand-accent' : 'text-brand-text'}`}>
                    {row.highlight ? '⭐ ' : ''}{row.name}
                  </td>
                  <td className={`px-6 py-4 text-center ${row.highlight ? 'font-bold text-brand-green' : 'text-brand-text'}`}>
                    {row.price}
                  </td>
                  <td className="px-6 py-4 text-center text-brand-gray">{row.users}</td>
                  <td className="px-6 py-4 text-center text-brand-gray">{row.integrations}</td>
                  <td className="px-6 py-4 text-center text-brand-gray">{row.support}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-brand-gray-light text-center mt-3">
          Pricing sourced from competitor websites as of March 2026. Actual pricing may vary.
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-[800px] mx-auto mt-16 px-8">
        <h2 className="font-serif text-[28px] text-brand-text mb-2 text-center">
          Frequently asked questions
        </h2>
        <p className="text-brand-gray text-center mb-12 text-base">
          Still skeptical? We get it.
        </p>
        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <div key={i} className={`border-t border-brand-border py-7 ${i === faqs.length - 1 ? 'border-b border-brand-border' : ''}`}>
              <h3 className="text-[17px] font-bold text-brand-text mb-3">{faq.q}</h3>
              <p className="text-[15px] text-brand-gray leading-[1.7] m-0 font-serif">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[1100px] mx-auto my-16 px-8">
        <div className="bg-brand-text rounded-2xl px-10 py-14 text-center text-brand-white">
          <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-bold mb-4">
            Start recovering churn today — for free
          </h2>
          <p className="text-lg text-white/70 max-w-[520px] mx-auto mb-9 font-serif">
            Start recovering customers today — completely free, forever.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/app/sign-up" className="bg-brand-accent text-brand-white px-8 py-3.5 rounded-lg font-bold no-underline text-base">
              Get Started Free →
            </Link>
            <Link href="/tools/churn-calculator" className="bg-white/10 text-brand-white px-8 py-3.5 rounded-lg font-semibold no-underline text-base border border-white/20">
              Calculate your savings
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          table th:nth-child(3), table td:nth-child(3),
          table th:nth-child(4), table td:nth-child(4) { display: none; }
          .pricing-hero-btns { flex-direction: column !important; }
          .pricing-hero-btns a { text-align: center !important; width: 100% !important; }
          .pricing-card-wrap { padding-top: 32px !important; }
        }
        @media (max-width: 600px) {
          table th:nth-child(5), table td:nth-child(5) { display: none; }
        }
        @media (max-width: 480px) {
          .pricing-hero { padding: 48px 20px 40px !important; }
          .pricing-feature-grid { padding: 24px !important; gap: 24px !important; }
          .pricing-cta-strip { padding: 16px 20px !important; }
        }
      `}</style>
    </div>
  )
}
