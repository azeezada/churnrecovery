import Head from 'next/head'
import Link from 'next/link'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentHover: '#C4603D',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

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
    <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
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
      <div style={{ borderBottom: `1px solid ${t.border}`, background: t.white }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 32px 64px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', background: t.greenLight, color: t.green,
            borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600,
            marginBottom: 20, letterSpacing: '0.02em'
          }}>
            ✓ Always free — no credit card required
          </div>
          <h1 style={{ fontFamily: t.fontSerif, fontSize: 'clamp(36px, 6vw, 58px)', fontWeight: 700, color: t.text, margin: '0 0 20px', lineHeight: 1.1 }}>
            Simple pricing.<br />
            <span style={{ color: t.accent }}>It's free.</span>
          </h1>
          <p style={{ fontSize: 20, color: t.gray, maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.6, fontFamily: t.fontSerif }}>
            Every feature, every integration, unlimited customers. No monthly fees, no per-recovery charges, no revenue share.
          </p>
          <div className="pricing-hero-btns" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#waitlist" style={{
              background: t.accent, color: t.white, padding: '14px 32px',
              borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16
            }}>
              Join Waitlist →
            </Link>
            <Link href="/demo" style={{
              background: t.white, color: t.text, padding: '14px 32px',
              borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 16,
              border: `2px solid ${t.border}`
            }}>
              See live demo
            </Link>
          </div>
        </div>
      </div>

      {/* Pricing card */}
      <div className="pricing-card-wrap" style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 32px 0' }}>
        <div style={{
          background: t.white, borderRadius: 16, border: `2px solid ${t.accent}`,
          overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
        }}>
          {/* Card header */}
          <div style={{ background: t.accent, padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                ChurnRecovery
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ color: t.white, fontSize: 56, fontWeight: 800, lineHeight: 1 }}>$0</span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18 }}>/month</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, marginTop: 8 }}>
                Forever. No hidden fees.
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: t.white, fontSize: 14, marginBottom: 4 }}>Compare to Churnkey:</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 24, fontWeight: 700, textDecoration: 'line-through' }}>$3,000–$9,900/yr</div>
              <div style={{ color: t.white, fontSize: 14, marginTop: 4 }}>You save thousands every year</div>
            </div>
          </div>

          {/* Feature grid */}
          <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
            {features.map(cat => (
              <div key={cat.category}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: t.grayLight, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                  {cat.category}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {cat.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: t.text }}>
                      <span style={{ color: t.green, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div style={{ background: '#F5F5F0', borderTop: `1px solid ${t.border}`, padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ fontSize: 15, color: t.gray }}>
              No credit card. No contracts. Start recovering churn in hours.
            </div>
            <Link href="/#waitlist" style={{
              background: t.accent, color: t.white, padding: '12px 28px',
              borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15
            }}>
              Join the waitlist →
            </Link>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div style={{ maxWidth: 1100, margin: '64px auto 0', padding: '0 32px' }}>
        <h2 style={{ fontFamily: t.fontSerif, fontSize: 28, color: t.text, marginBottom: 8, textAlign: 'center' }}>
          How we stack up
        </h2>
        <p style={{ color: t.gray, textAlign: 'center', marginBottom: 36, fontSize: 16 }}>
          Same features. Zero monthly cost.
        </p>
        <div style={{ background: t.white, borderRadius: 12, border: `1px solid ${t.border}`, overflow: 'hidden', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', minWidth: '480px', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${t.border}` }}>
                <th style={{ padding: '16px 24px', textAlign: 'left', color: t.gray, fontWeight: 600, width: '25%' }}>Platform</th>
                <th style={{ padding: '16px 24px', textAlign: 'center', color: t.gray, fontWeight: 600 }}>Monthly Cost</th>
                <th style={{ padding: '16px 24px', textAlign: 'center', color: t.gray, fontWeight: 600 }}>Users</th>
                <th style={{ padding: '16px 24px', textAlign: 'center', color: t.gray, fontWeight: 600 }}>Integrations</th>
                <th style={{ padding: '16px 24px', textAlign: 'center', color: t.gray, fontWeight: 600 }}>Support</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={row.name} style={{
                  borderBottom: i < comparisons.length - 1 ? `1px solid ${t.border}` : 'none',
                  background: row.highlight ? '#FFF8F5' : 'transparent'
                }}>
                  <td style={{ padding: '16px 24px', fontWeight: row.highlight ? 700 : 400, color: row.highlight ? t.accent : t.text }}>
                    {row.highlight ? '⭐ ' : ''}{row.name}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'center', fontWeight: row.highlight ? 700 : 400, color: row.highlight ? t.green : t.text }}>
                    {row.price}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'center', color: t.gray }}>{row.users}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'center', color: t.gray }}>{row.integrations}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'center', color: t.gray }}>{row.support}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 13, color: t.grayLight, textAlign: 'center', marginTop: 12 }}>
          Pricing sourced from competitor websites as of March 2026. Actual pricing may vary.
        </p>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 800, margin: '64px auto 0', padding: '0 32px' }}>
        <h2 style={{ fontFamily: t.fontSerif, fontSize: 28, color: t.text, marginBottom: 8, textAlign: 'center' }}>
          Frequently asked questions
        </h2>
        <p style={{ color: t.gray, textAlign: 'center', marginBottom: 48, fontSize: 16 }}>
          Still skeptical? We get it.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              borderTop: `1px solid ${t.border}`,
              padding: '28px 0',
              borderBottom: i === faqs.length - 1 ? `1px solid ${t.border}` : 'none'
            }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 12 }}>{faq.q}</h3>
              <p style={{ fontSize: 15, color: t.gray, lineHeight: 1.7, margin: 0, fontFamily: t.fontSerif }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ maxWidth: 1100, margin: '64px auto', padding: '0 32px' }}>
        <div style={{
          background: t.text, borderRadius: 16, padding: '56px 40px',
          textAlign: 'center', color: t.white
        }}>
          <h2 style={{ fontFamily: t.fontSerif, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: 16 }}>
            Start recovering churn today — for free
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px', fontFamily: t.fontSerif }}>
            Join the waitlist. Be among the first to try ChurnRecovery when we launch.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#waitlist" style={{
              background: t.accent, color: t.white, padding: '14px 32px',
              borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16
            }}>
              Join Waitlist →
            </Link>
            <Link href="/tools/churn-calculator" style={{
              background: 'rgba(255,255,255,0.1)', color: t.white, padding: '14px 32px',
              borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 16,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              Calculate your savings
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          table th:nth-child(3), table td:nth-child(3),
          table th:nth-child(4), table td:nth-child(4) { display: none; }
          /* tighten hero spacing on mobile */
          .pricing-hero-btns { flex-direction: column !important; }
          .pricing-hero-btns a { text-align: center !important; width: 100% !important; }
          /* reduce gap between hero and pricing card */
          .pricing-card-wrap { padding-top: 32px !important; }
        }
        @media (max-width: 600px) {
          table th:nth-child(5), table td:nth-child(5) { display: none; }
        }
      `}</style>
    </div>
  )
}
