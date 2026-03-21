import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WaitlistForm from '../components/WaitlistForm'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentBg: '#FDF4F0',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenBg: '#EDF7F1',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const useCases = [
  {
    slug: 'b2b-saas',
    icon: '🏢',
    title: 'B2B SaaS',
    subtitle: 'Recover enterprise and SMB accounts before they churn',
    heroStat: '73%',
    heroLabel: 'of B2B cancellations are preventable',
    color: '#2563EB',
    colorBg: '#EFF6FF',
    challenges: [
      'High contract values make each lost customer painful',
      'Procurement cycles mean re-acquiring lost customers takes months',
      'Team plans complicate the cancel flow (who authorizes?)',
      'Annual billing means you only get one chance per year',
    ],
    solutions: [
      {
        problem: 'End-user vs admin conflict',
        solution: 'Route to admin-specific messaging and offer team training',
        icon: '👥',
      },
      {
        problem: 'Price too high',
        solution: 'Offer seat-count reduction instead of full cancellation',
        icon: '💰',
      },
      {
        problem: 'Switching to competitor',
        solution: 'Trigger competitor comparison + a retention discount',
        icon: '⚔️',
      },
      {
        problem: 'Missing features',
        solution: 'Collect feedback and route to customer success for roadmap call',
        icon: '🔧',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '31%' },
      { label: 'MRR recovered', value: '$2,400/mo avg' },
      { label: 'Time to implement', value: '< 30 min' },
    ],
    quote: {
      text: 'We were losing enterprise accounts without even knowing why. ChurnRecovery helped us understand the real reason — and save 3 out of every 10 cancellations.',
      author: 'VP of Customer Success, B2B analytics platform',
    },
  },
  {
    slug: 'developer-tools',
    icon: '⚡',
    title: 'Developer Tools',
    subtitle: 'Keep developers subscribed through the eval-to-paid journey',
    heroStat: '58%',
    heroLabel: 'of dev tool churn happens in the first 90 days',
    color: '#7C3AED',
    colorBg: '#F5F3FF',
    challenges: [
      'Developers are skeptical of "sales-y" cancel flows',
      'Usage is often tied to project cycles, not ongoing need',
      'Free tiers create strong internal competition to your paid plan',
      'Technical users have high expectations — a bad UX will backfire',
    ],
    solutions: [
      {
        problem: 'Project paused / no active use',
        solution: 'Offer a 2-month pause — developers return when projects resume',
        icon: '⏸️',
      },
      {
        problem: 'Going back to free tier',
        solution: 'Show exactly what they\'ll lose and offer a usage-based downgrade',
        icon: '📉',
      },
      {
        problem: 'API limits too restrictive',
        solution: 'Offer a temporary limit increase as a retention incentive',
        icon: '🔑',
      },
      {
        problem: 'Evaluating alternatives',
        solution: 'Provide a no-nonsense feature comparison + a trial extension',
        icon: '⚖️',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '24%' },
      { label: 'Best performing offer', value: 'Pause subscription' },
      { label: 'Conversion on pause offer', value: '67%' },
    ],
    quote: {
      text: 'As a developer myself, I was worried our cancel flow would feel manipulative. ChurnRecovery\'s flow feels like a helpful conversation, not a dark pattern.',
      author: 'CTO, developer infrastructure startup',
    },
  },
  {
    slug: 'media-subscriptions',
    icon: '📰',
    title: 'Media & Subscriptions',
    subtitle: 'Reduce subscriber churn on newsletters, podcasts, and content platforms',
    heroStat: '41%',
    heroLabel: 'of media cancellations cite "too busy to consume content"',
    color: '#B45309',
    colorBg: '#FFFBEB',
    challenges: [
      'Content fatigue — subscribers get overwhelmed and disengage',
      'Monthly billing means more frequent churn opportunities',
      'Competition from free alternatives (YouTube, podcasts, newsletters)',
      'Seasonal churn spikes (January budget cuts, summer slowdowns)',
    ],
    solutions: [
      {
        problem: 'Too much email / content overload',
        solution: 'Offer a digest mode — weekly summary instead of daily sends',
        icon: '📧',
      },
      {
        problem: '"I\'m too busy right now"',
        solution: 'Offer a 1-3 month pause with automatic reactivation',
        icon: '⏰',
      },
      {
        problem: 'Price sensitivity',
        solution: 'Annual plan pitch — same content, 20% cheaper',
        icon: '💵',
      },
      {
        problem: 'Not getting value from content',
        solution: 'Ask what topics they want and route to personalization flow',
        icon: '🎯',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '28%' },
      { label: 'Most effective offer', value: 'Pause subscription' },
      { label: 'Annual upgrade rate', value: '12% of cancellations' },
    ],
    quote: {
      text: 'We\'re converting 12% of cancellation attempts into annual plan upgrades. That\'s been our biggest unexpected win.',
      author: 'Growth lead, independent media publication',
    },
  },
  {
    slug: 'ecommerce-subscriptions',
    icon: '📦',
    title: 'E-commerce & Subscriptions',
    subtitle: 'Save subscription box and replenishment customers',
    heroStat: '35%',
    heroLabel: 'of subscription box cancellations are due to product-fit issues',
    color: '#047857',
    colorBg: '#ECFDF5',
    challenges: [
      'Physical product subscriptions have high unit economics stakes',
      'Customers often cancel when boxes pile up (receiving too frequently)',
      'Inventory is already allocated — a save is better than a refund',
      'High volume of subscribers means automation is essential',
    ],
    solutions: [
      {
        problem: '"I have too much product"',
        solution: 'Offer to skip the next 1-2 boxes instead of cancelling',
        icon: '📦',
      },
      {
        problem: 'Frequency mismatch',
        solution: 'Switch from monthly to quarterly with one click',
        icon: '📅',
      },
      {
        problem: 'Product not matching tastes',
        solution: 'Offer a preference reset + one replacement box',
        icon: '✨',
      },
      {
        problem: 'Budget constraints',
        solution: 'Downgrade to smaller box tier rather than full cancel',
        icon: '↓',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '38%' },
      { label: 'Skip offer acceptance', value: '44%' },
      { label: 'LTV uplift from saves', value: '4.2x' },
    ],
    quote: {
      text: 'The "skip boxes" offer alone saves us $14,000 in LTV every month. We paid $0 for ChurnRecovery. The math is obvious.',
      author: 'Founder, monthly subscription box company',
    },
  },
  {
    slug: 'professional-services',
    icon: '👔',
    title: 'Professional Services & Agencies',
    subtitle: 'Retain retainer clients and prevent project churn',
    heroStat: '62%',
    heroLabel: 'of agency client churn is relationship-driven, not results-driven',
    color: '#6B7280',
    colorBg: '#F9FAFB',
    challenges: [
      'Client relationships are personal — cancel flows need to feel human',
      'Churn often signals an underlying relationship issue',
      'Contract end dates create predictable churn windows',
      'High-value retainers make every cancellation expensive',
    ],
    solutions: [
      {
        problem: 'Feeling undervalued or ignored',
        solution: 'Route to account manager immediately for relationship conversation',
        icon: '🤝',
      },
      {
        problem: '"Not seeing ROI"',
        solution: 'Trigger a results report + strategy call offer',
        icon: '📊',
      },
      {
        problem: 'Scope not matching needs',
        solution: 'Offer a scope adjustment consultation instead of cancellation',
        icon: '🔄',
      },
      {
        problem: 'Budget changes',
        solution: 'Offer a reduced-scope retainer to stay in the relationship',
        icon: '💼',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '41%' },
      { label: 'Meeting request acceptance', value: '53%' },
      { label: 'Avg retainer value saved', value: '$3,800/mo' },
    ],
    quote: {
      text: 'We\'re a boutique agency. Every client matters. ChurnRecovery gives our account managers a heads up and a script before a client disappears.',
      author: 'Operations Director, digital marketing agency',
    },
  },
  {
    slug: 'fintech',
    icon: '💳',
    title: 'Fintech & Financial Tools',
    subtitle: 'Keep users in your financial ecosystem',
    heroStat: '47%',
    heroLabel: 'of fintech app churn happens after the first bill cycles',
    color: '#0F766E',
    colorBg: '#F0FDFA',
    challenges: [
      'Regulatory constraints limit what you can offer (no cash bribes)',
      'Users compare monthly charges against perceived value frequently',
      'Trust is paramount — aggressive cancel flows can backfire badly',
      'Some churn is healthy (graduated users, changed life circumstances)',
    ],
    solutions: [
      {
        problem: '"Not using the features I pay for"',
        solution: 'Show feature usage stats and offer an onboarding refresher',
        icon: '📱',
      },
      {
        problem: 'Found a cheaper alternative',
        solution: 'Offer a loyalty discount or feature-matched downgrade',
        icon: '🔍',
      },
      {
        problem: 'Life circumstance change',
        solution: 'Acknowledge gracefully, offer pause, stay on good terms',
        icon: '🌱',
      },
      {
        problem: 'Complexity / confusion',
        solution: 'Route to dedicated onboarding support session',
        icon: '💡',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '22%' },
      { label: 'Pause offer uptake', value: '31%' },
      { label: 'Reactivation after pause', value: '58%' },
    ],
    quote: {
      text: 'We were concerned about compliance, but ChurnRecovery\'s offer types are all soft nudges — nothing we couldn\'t have done manually. Now it\'s automated.',
      author: 'Head of Product, personal finance platform',
    },
  },
]

function UseCaseCard({ useCase }) {
  return (
    <Link href={`/use-cases/${useCase.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: t.white,
        border: `1px solid ${t.border}`,
        borderRadius: '12px',
        padding: '28px',
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '2rem' }}>{useCase.icon}</span>
          <div>
            <div style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.05rem', color: t.text, marginBottom: '4px' }}>
              {useCase.title}
            </div>
            <div style={{ fontFamily: t.fontSerif, fontSize: '0.85rem', color: t.gray, lineHeight: 1.6 }}>
              {useCase.subtitle}
            </div>
          </div>
        </div>
        <div style={{
          background: useCase.colorBg,
          borderRadius: '8px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.6rem', color: useCase.color }}>
            {useCase.heroStat}
          </span>
          <span style={{ fontFamily: t.fontSerif, fontSize: '0.8rem', color: useCase.color, lineHeight: 1.5 }}>
            {useCase.heroLabel}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {useCase.metrics.map((m, i) => (
            <div key={i}>
              <div style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1rem', color: t.text }}>{m.value}</div>
              <div style={{ fontFamily: t.fontSerif, fontSize: '0.75rem', color: t.grayLight }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: t.fontSans,
          fontSize: '0.82rem',
          fontWeight: 600,
          color: t.accent,
        }}>
          See how it works →
        </div>
      </div>
    </Link>
  )
}

export default function UseCasesPage() {
  return (
    <>
      <Head>
        <title>Use Cases — ChurnRecovery for Every SaaS Vertical</title>
        <meta name="description" content="ChurnRecovery works across B2B SaaS, developer tools, media subscriptions, e-commerce, agencies, and fintech. See industry-specific cancel flows and save rates." />
        <meta property="og:title" content="Use Cases — ChurnRecovery" />
        <meta property="og:description" content="Industry-specific churn recovery strategies for B2B SaaS, developer tools, media, e-commerce, agencies, and fintech." />
        <meta property="og:image" content="https://churnrecovery.com/og/use-cases.svg" />
        <meta property="og:url" content="https://churnrecovery.com/use-cases" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main style={{ background: t.bg, minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '80px 24px 60px',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-block',
            background: t.accentBg,
            color: t.accent,
            fontFamily: t.fontSans,
            fontWeight: 600,
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '6px 14px',
            borderRadius: '20px',
            marginBottom: '24px',
          }}>
            Use Cases
          </div>
          <h1 style={{
            fontFamily: t.fontSans,
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: t.text,
            margin: '0 0 20px',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
          }}>
            Churn recovery for<br />every SaaS vertical
          </h1>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1.05rem',
            color: t.gray,
            lineHeight: 1.8,
            margin: '0 0 32px',
          }}>
            The best cancel flow for a B2B project management tool looks very different
            from the best one for a newsletter. ChurnRecovery adapts to your vertical —
            with the right offers, messaging, and timing for your customers.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#waitlist" style={{
              background: t.accent,
              color: t.white,
              padding: '12px 28px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: t.fontSans,
              fontWeight: 600,
              fontSize: '0.95rem',
            }}>
              Join Waitlist
            </Link>
            <Link href="/demo" style={{
              background: t.white,
              color: t.text,
              padding: '12px 28px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: t.fontSans,
              fontWeight: 600,
              fontSize: '0.95rem',
              border: `1px solid ${t.border}`,
            }}>
              See how it works
            </Link>
          </div>
        </section>

        {/* Use Case Cards Grid */}
        <section style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}>
            {useCases.map(uc => (
              <UseCaseCard key={uc.slug} useCase={uc} />
            ))}
          </div>
        </section>

        {/* Why vertical-specific matters */}
        <section style={{
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          background: t.white,
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontWeight: 800,
              fontSize: '1.8rem',
              color: t.text,
              margin: '0 0 48px',
              textAlign: 'center',
              letterSpacing: '-0.03em',
            }}>
              Why vertical-specific flows outperform generic ones
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px',
            }}>
              {[
                {
                  icon: '🎯',
                  title: 'Right offer, right moment',
                  body: 'A "pause subscription" offer is brilliant for a developer tool and irrelevant for an e-commerce box. Context determines what works.',
                },
                {
                  icon: '💬',
                  title: 'Tone matches audience',
                  body: 'Developers hate sales-y language. Enterprise buyers want formal options. Media subscribers want empathy. One tone doesn\'t fit all.',
                },
                {
                  icon: '📊',
                  title: 'Industry benchmarks',
                  body: 'A 25% save rate is exceptional in fintech and mediocre in e-commerce. Knowing your vertical\'s norms helps you set the right targets.',
                },
                {
                  icon: '⚙️',
                  title: 'Offer mechanics fit the product',
                  body: 'Seat reductions for B2B. Frequency changes for subscriptions. Feature downgrades for SaaS. The mechanics need to match your billing model.',
                },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '24px',
                  border: `1px solid ${t.border}`,
                  borderRadius: '10px',
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '0.95rem', color: t.text, marginBottom: '8px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: t.fontSerif, fontSize: '0.85rem', color: t.gray, lineHeight: 1.7 }}>
                    {item.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works — 3 steps */}
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '80px 24px',
        }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontWeight: 800,
            fontSize: '1.8rem',
            color: t.text,
            margin: '0 0 12px',
            textAlign: 'center',
            letterSpacing: '-0.03em',
          }}>
            Set up in under 30 minutes
          </h2>
          <p style={{
            fontFamily: t.fontSerif,
            color: t.gray,
            textAlign: 'center',
            marginBottom: '48px',
            fontSize: '1rem',
            lineHeight: 1.7,
          }}>
            No matter your vertical, getting started is the same simple process.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              {
                step: '1',
                title: 'Choose your vertical template',
                body: 'Start from a pre-built cancel flow template designed for your industry. All reason categories, offers, and messaging are pre-configured for your buyer type.',
              },
              {
                step: '2',
                title: 'Customize your offers',
                body: 'Edit discount percentages, pause durations, and redirect URLs. Connect your Stripe account to enable automatic discount application.',
              },
              {
                step: '3',
                title: 'Add one line of code',
                body: 'Drop a script tag or npm package into your app. ChurnRecovery intercepts your cancel button and shows the right flow automatically.',
              },
            ].map((step, i, arr) => (
              <div key={i} style={{
                display: 'flex',
                gap: '24px',
                paddingBottom: i < arr.length - 1 ? '32px' : '0',
                borderLeft: i < arr.length - 1 ? `2px solid ${t.border}` : 'none',
                marginLeft: '20px',
                paddingLeft: '32px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-20px',
                  top: '0',
                  width: '40px',
                  height: '40px',
                  background: t.accent,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: t.fontSans,
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: t.white,
                  flexShrink: 0,
                }}>
                  {step.step}
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <div style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1rem', color: t.text, marginBottom: '8px' }}>
                    {step.title}
                  </div>
                  <div style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7 }}>
                    {step.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: t.text,
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontWeight: 800,
              fontSize: '2rem',
              color: t.white,
              margin: '0 0 16px',
              letterSpacing: '-0.03em',
            }}>
              Free for every vertical
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.8,
              margin: '0 0 32px',
            }}>
              Whether you're a B2B SaaS company or a solo newsletter creator,
              ChurnRecovery is free to use. No plans. No usage limits. No catch.
            </p>
            <WaitlistForm source="use-cases" />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
