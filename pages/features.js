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
  purple: '#6B4FA0',
  purpleLight: '#F5F0FF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const features = [
  {
    category: 'Cancel Flow',
    icon: '🚪',
    color: t.accent,
    colorLight: '#FDF4EF',
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
    color: t.blue,
    colorLight: t.blueLight,
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
    color: t.green,
    colorLight: t.greenLight,
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
    color: t.purple,
    colorLight: t.purpleLight,
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

const pricing = [
  { label: 'Starter', price: '$0', limit: 'Up to 1,000 customers', features: ['Cancel flow', 'Basic analytics', 'Email win-back', 'Stripe integration'] },
  { label: 'Growth', price: '$0', limit: 'Up to 10,000 customers', features: ['Everything in Starter', 'A/B testing', 'Advanced analytics', 'Priority support'] },
  { label: 'Scale', price: '$0', limit: 'Unlimited customers', features: ['Everything in Growth', 'Custom branding', 'Dedicated support', 'SLA guarantee'] },
]

function Nav() {
  return (
    <nav style={{
      borderBottom: `1px solid ${t.border}`,
      background: t.white,
      padding: '0 20px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/" style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.1rem', color: t.text, textDecoration: 'none', letterSpacing: '-0.01em' }}>
        ChurnRecovery
      </Link>
      <div className="nav-links" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="/features" style={{ color: t.accent, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans, fontWeight: 600 }}>Features</Link>
        <Link href="/docs" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans }}>Docs</Link>
        <Link href="/demo" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans }}>Demo</Link>
        <Link href="/blog" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans }}>Blog</Link>
        <a href="/#waitlist" style={{
          background: t.accent, color: t.white, padding: '8px 18px', borderRadius: '6px',
          textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, fontFamily: t.fontSans,
        }}>Join Waitlist</a>
      </div>
    </nav>
  )
}

export default function FeaturesPage() {
  const title = 'Features — ChurnRecovery Free SaaS Churn Reduction Platform'
  const description = 'Everything you need to stop losing customers. Cancel flow interception, smart offers, churn analytics, win-back emails, and Stripe integration — all completely free.'

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

      <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
        <Nav />

        {/* Hero */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 24px 56px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', background: '#F0EBE5', color: t.accent,
            padding: '4px 14px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px',
          }}>
            Full Feature Set
          </div>
          <h1 style={{
            fontFamily: t.fontSans, fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
            color: t.text, letterSpacing: '-0.04em', margin: '0 0 16px', lineHeight: 1.1,
          }}>
            Everything you need to stop losing customers
          </h1>
          <p style={{
            fontFamily: t.fontSerif, fontSize: '1.15rem', color: t.gray,
            lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 40px',
          }}>
            ChurnRecovery is a complete churn reduction platform — cancel flow interception, analytics, win-back automation, and deep integrations. Completely free, forever.
          </p>

          {/* Category jump links */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {features.map(f => (
              <a key={f.category} href={`#${f.category.toLowerCase().replace(' ', '-')}`} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '6px', border: `1px solid ${t.border}`,
                background: t.white, textDecoration: 'none', color: t.text,
                fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.15s',
              }}>
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
            style={{
              background: ci % 2 === 0 ? t.white : t.bg,
              borderTop: `1px solid ${t.border}`,
              padding: '80px 24px',
            }}
          >
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              {/* Category header */}
              <div style={{ marginBottom: '56px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: category.colorLight, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.2rem',
                  }}>
                    {category.icon}
                  </div>
                  <span style={{
                    fontFamily: t.fontSans, fontSize: '0.75rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em', color: category.color,
                  }}>
                    {category.category}
                  </span>
                </div>
              </div>

              {/* Feature grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(480px, 100%), 1fr))',
                gap: '24px',
              }}>
                {category.items.map(feature => (
                  <div key={feature.title} style={{
                    border: `1px solid ${t.border}`,
                    borderRadius: '12px',
                    padding: '28px',
                    background: ci % 2 === 0 ? t.bg : t.white,
                  }}>
                    <h3 style={{
                      fontFamily: t.fontSans, fontSize: '1.05rem', fontWeight: 700,
                      color: t.text, letterSpacing: '-0.02em', margin: '0 0 10px',
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray,
                      lineHeight: 1.7, margin: '0 0 20px',
                    }}>
                      {feature.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {feature.details.map(d => (
                        <span key={d} style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          fontSize: '0.78rem', color: t.gray, fontFamily: t.fontSans,
                        }}>
                          <span style={{ color: category.color, fontWeight: 700 }}>✓</span>
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

        {/* Comparison callout */}
        <section style={{ background: t.text, padding: '80px 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700,
              color: t.white, letterSpacing: '-0.03em', margin: '0 0 16px',
            }}>
              Churnkey charges $825/mo for the same features
            </h2>
            <p style={{
              fontFamily: t.fontSerif, fontSize: '1rem', color: 'rgba(255,255,255,0.65)',
              margin: '0 0 32px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7,
            }}>
              ChurnRecovery is free. The only difference is our business model — we believe churn recovery tools should be accessible to every SaaS company, not just the ones that can afford $10k/year in software.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#waitlist" style={{
                display: 'inline-block', background: t.accent, color: t.white,
                padding: '14px 32px', borderRadius: '8px', fontFamily: t.fontSans,
                fontWeight: 700, fontSize: '1rem', textDecoration: 'none', letterSpacing: '-0.01em',
              }}>
                Join Waitlist — Free
              </a>
              <Link href="/compare/churnkey" style={{
                display: 'inline-block', background: 'transparent', color: 'rgba(255,255,255,0.7)',
                padding: '14px 32px', borderRadius: '8px', fontFamily: t.fontSans,
                fontWeight: 600, fontSize: '1rem', textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                See Full Comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* Quick feature checklist */}
        <section style={{ padding: '80px 24px', background: t.bg }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{
                fontFamily: t.fontSans, fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700,
                color: t.text, letterSpacing: '-0.03em', margin: '0 0 12px',
              }}>
                Everything, at a glance
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '8px' }}>
              {[
                'Cancel flow modal', 'Reason picker', 'Discount offers', 'Pause offers',
                'Human escalation', 'Feedback collection', 'A/B testing', 'Save rate analytics',
                'Revenue recovered tracking', 'Churn reason intelligence', 'Offer performance reports',
                'Win-back email sequences', 'Failed payment recovery', 'Re-engagement offers',
                'JavaScript SDK', 'REST API', 'Stripe integration', 'Paddle integration',
                'Webhooks', 'Slack notifications', 'Custom branding', 'White-label mode',
                'GDPR compliant', 'SOC 2 (planned)', 'Unlimited customers', 'Free forever',
              ].map(item => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', borderRadius: '6px', background: t.white,
                  border: `1px solid ${t.border}`,
                }}>
                  <span style={{ color: t.green, fontWeight: 700, fontSize: '0.9rem' }}>✓</span>
                  <span style={{ fontFamily: t.fontSans, fontSize: '0.85rem', color: t.text }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: t.white, borderTop: `1px solid ${t.border}`, padding: '64px 24px', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: t.fontSans, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700,
            color: t.text, letterSpacing: '-0.03em', margin: '0 0 12px',
          }}>
            Ready to start recovering customers?
          </h2>
          <p style={{
            fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
            margin: '0 0 28px', lineHeight: 1.7,
          }}>
            Join the waitlist and be among the first to go live. Free forever.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/#waitlist" style={{
              background: t.accent, color: t.white, padding: '13px 28px', borderRadius: '8px',
              fontFamily: t.fontSans, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            }}>
              Join Waitlist
            </a>
            <Link href="/demo" style={{
              background: t.bg, color: t.text, padding: '13px 28px', borderRadius: '8px',
              fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
              border: `1px solid ${t.border}`,
            }}>
              Try the Demo →
            </Link>
            <Link href="/docs" style={{
              background: t.bg, color: t.text, padding: '13px 28px', borderRadius: '8px',
              fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
              border: `1px solid ${t.border}`,
            }}>
              Read the Docs →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
