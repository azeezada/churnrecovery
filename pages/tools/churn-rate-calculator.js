import Head from 'next/head'
import Link from 'next/link'
import ChurnCalculator from '../../components/ChurnCalculator'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const faqItems = [
  {
    q: 'What is churn rate and how do you calculate it?',
    a: 'Churn rate is the percentage of subscribers or members who cancel their subscription in a given period. To calculate it: divide the number of customers lost during a period by the number of customers at the start of that period, then multiply by 100. For example, if you started with 500 members and lost 25 in a month, your monthly churn rate is 5%. For membership sites, tracking monthly churn is most common since billing cycles are typically monthly.',
  },
  {
    q: 'What is a good churn rate for a membership site?',
    a: 'For membership sites and online communities, a good monthly churn rate is below 3–4%. Elite membership sites target 1–2% monthly churn or less. E-learning platforms typically see 5–8% monthly churn, while content membership sites (newsletters, creator communities) average 3–6%. If you\'re above 7–8% monthly churn on a membership site, that\'s a strong signal to audit your onboarding and value delivery.',
  },
  {
    q: 'Why is churn rate especially important for membership sites?',
    a: 'Membership sites live and die by recurring revenue. Unlike one-time product sales, your revenue depends on keeping members engaged month after month. High churn erodes your MRR, requires constant new member acquisition to stay flat, and signals that members aren\'t finding ongoing value. A membership site with 5% monthly churn loses more than half its members every year — meaning you\'re essentially rebuilding your entire community annually.',
  },
  {
    q: 'How do I reduce churn on my membership site?',
    a: 'The most effective churn reduction strategies for membership sites are: (1) Strong onboarding — members who reach their first "win" in week 1 retain far better; (2) Regular value delivery — consistent new content, community events, or coaching keeps the membership feeling alive; (3) Cancel flow optimization — intercept cancellations with the right offer (pause, discount, downgrade) before they finalize; (4) Win-back emails — a well-timed offer can recover 15–30% of lapsed members. A cancel flow tool like ChurnRecovery handles #3 automatically.',
  },
  {
    q: 'What\'s the difference between voluntary and involuntary churn?',
    a: 'Voluntary churn is when a member actively decides to cancel — they log in and click "cancel subscription." Involuntary churn (also called passive churn) happens when a payment fails and no one follows up — the subscription quietly lapses. On average, 20–40% of total membership site churn is involuntary. Both types can be recovered: voluntary churn with cancel flows and win-back offers, involuntary churn with smart retry logic and dunning emails.',
  },
  {
    q: 'When should I use a membership site churn rate calculator?',
    a: 'Use a churn calculator when: (1) You want to understand the true revenue impact of your current churn rate; (2) You\'re evaluating whether to invest in retention tools; (3) You want to model the ROI of reducing churn by even 1–2 percentage points; (4) You\'re benchmarking against industry standards. The calculator above shows exactly how much revenue you\'re leaving on the table — and how much a basic cancel flow could recover.',
  },
  {
    q: 'Is this calculator free to use?',
    a: 'Yes — completely free, no signup required. ChurnRecovery\'s cancel flow tool is also free (we\'re in early access). We believe founders shouldn\'t have to pay $250/month just to stop losing customers. Use the calculator, understand your numbers, then join the waitlist if you want to plug the leak.',
  },
]

export default function ChurnRateCalculatorPage() {
  const title = 'Membership Site Churn Rate Calculator — Free Tool'
  const description = 'Calculate your membership site churn rate and see how much revenue you\'re losing. Includes industry benchmarks, reduction strategies, and a free cancel flow to stop the bleed.'
  const canonicalUrl = 'https://churnrecovery.com/tools/churn-rate-calculator'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Membership Site Churn Rate Calculator',
    description,
    url: canonicalUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ChurnRecovery',
      url: 'https://churnrecovery.com',
    },
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="membership site churn rate calculator, churn rate calculator, membership churn calculator, online community churn, subscription churn calculator, churn rate formula" />
        <link rel="canonical" href={canonicalUrl} />

        {/* OG Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ChurnRecovery" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>

        {/* Nav */}
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
          <Link href="/" style={{
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '1.1rem',
            color: t.text,
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            ChurnRecovery
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/demo" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Demo</Link>
            <Link href="/blog" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Blog</Link>
            <a href="/#waitlist" style={{
              background: t.accent,
              color: t.white,
              padding: '8px 18px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}>Join Waitlist</a>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '16px 24px 0', fontSize: '0.8rem', color: t.grayLight }}>
          <Link href="/" style={{ color: t.grayLight, textDecoration: 'none' }}>Home</Link>
          {' '}/{' '}
          <span style={{ color: t.gray }}>Tools</span>
          {' '}/{' '}
          <span style={{ color: t.text }}>Churn Rate Calculator</span>
        </div>

        {/* Hero */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 40px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: '#F0EBE5',
            color: t.accent,
            padding: '4px 14px',
            borderRadius: '4px',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px',
          }}>
            Free Membership Tool
          </div>
          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 800,
            color: t.text,
            letterSpacing: '-0.04em',
            margin: '0 0 16px',
            lineHeight: 1.15,
          }}>
            Membership Site Churn Rate Calculator
          </h1>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1.1rem',
            color: t.gray,
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 12px',
          }}>
            Enter your membership numbers and instantly see your churn rate, the revenue you're losing each month, and how much a cancel flow could save. Free. No signup.
          </p>
          <p style={{
            fontFamily: t.fontSans,
            fontSize: '0.85rem',
            color: t.grayLight,
            margin: '0 auto 40px',
          }}>
            Takes 30 seconds · 100% free · No email required
          </p>
        </section>

        {/* Calculator */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 80px' }}>
          <ChurnCalculator />
        </section>

        {/* Post-calculator CTA */}
        <section style={{
          background: '#F5F0E8',
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '48px 24px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: t.accent,
              marginBottom: '12px',
            }}>
              Stop the bleed
            </p>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              margin: '0 0 14px',
              lineHeight: 1.2,
            }}>
              Now that you know your churn cost — do something about it
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.95rem',
              color: t.gray,
              lineHeight: 1.7,
              margin: '0 0 28px',
            }}>
              ChurnRecovery intercepts cancellations with the right offer — a pause, a discount, a downgrade. Founders using cancel flows save 25–45% of churning members automatically. It's free.
            </p>
            <a href="https://tally.so/r/churnrecovery" style={{
              display: 'inline-block',
              background: t.accent,
              color: t.white,
              padding: '14px 32px',
              borderRadius: '8px',
              fontFamily: t.fontSans,
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}>
              Join the Waitlist — It's Free
            </a>
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.78rem',
              color: t.grayLight,
              marginTop: '12px',
            }}>
              No credit card. No commitment. Cancel flows that actually work.
            </p>
          </div>
        </section>

        {/* What is churn rate */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 24px 48px' }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            What is churn rate? And how do you calculate it?
          </h2>
          <div style={{ fontFamily: t.fontSerif, fontSize: '0.95rem', color: t.gray, lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 16px' }}>
              <strong style={{ color: t.text, fontFamily: t.fontSans }}>Churn rate</strong> is the percentage of paying members who cancel their subscription during a given time period. It's the single most important health metric for any membership site, community, or subscription business.
            </p>
            <p style={{ margin: '0 0 16px' }}>
              The churn rate formula is straightforward:
            </p>
            <div style={{
              background: t.white,
              border: `1px solid ${t.border}`,
              borderRadius: '10px',
              padding: '24px',
              margin: '0 0 20px',
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: t.fontSans,
                fontSize: '1.1rem',
                fontWeight: 700,
                color: t.text,
                margin: 0,
                letterSpacing: '-0.02em',
              }}>
                Churn Rate = (Members Lost ÷ Members at Start of Period) × 100
              </p>
              <p style={{
                fontFamily: t.fontSans,
                fontSize: '0.82rem',
                color: t.grayLight,
                margin: '8px 0 0',
              }}>
                Example: 25 cancellations ÷ 500 members × 100 = 5% monthly churn
              </p>
            </div>
            <p style={{ margin: '0 0 16px' }}>
              Most membership sites track monthly churn rate because billing is monthly. Annual churn rate is roughly 12× monthly churn for rough benchmarking, though the real number compounds slightly higher.
            </p>
            <p style={{ margin: 0 }}>
              The calculator above computes this for you automatically — and goes further by translating churn rate into actual dollars lost per month and per year, which is what motivates action.
            </p>
          </div>
        </section>

        {/* Benchmarks by industry */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '72px 24px',
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              margin: '0 0 12px',
            }}>
              What's a good churn rate? Benchmarks by membership type
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.95rem',
              color: t.gray,
              lineHeight: 1.7,
              margin: '0 0 36px',
            }}>
              Churn benchmarks vary significantly by market. Here's what's typical — and what's excellent — across common membership site categories.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {[
                { type: 'B2B SaaS / Software', avg: '3–5%', excellent: '< 1.5%', bad: '> 7%' },
                { type: 'Online Courses / E-learning', avg: '5–8%', excellent: '< 3%', bad: '> 10%' },
                { type: 'Content / Newsletter Members', avg: '4–7%', excellent: '< 2%', bad: '> 9%' },
                { type: 'Online Communities', avg: '5–9%', excellent: '< 3%', bad: '> 12%' },
                { type: 'Coaching / Mastermind', avg: '3–6%', excellent: '< 2%', bad: '> 8%' },
                { type: 'Fitness / Wellness Subscriptions', avg: '6–10%', excellent: '< 4%', bad: '> 15%' },
              ].map(item => (
                <div key={item.type} style={{
                  padding: '20px',
                  border: `1px solid ${t.border}`,
                  borderRadius: '10px',
                }}>
                  <div style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: t.text,
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}>
                    {item.type}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: t.fontSans, fontSize: '0.72rem', color: t.grayLight }}>Average</span>
                      <span style={{ fontFamily: t.fontSans, fontSize: '0.82rem', fontWeight: 600, color: t.gray }}>{item.avg}/mo</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: t.fontSans, fontSize: '0.72rem', color: t.grayLight }}>Excellent</span>
                      <span style={{ fontFamily: t.fontSans, fontSize: '0.82rem', fontWeight: 600, color: t.green }}>{item.excellent}/mo</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: t.fontSans, fontSize: '0.72rem', color: t.grayLight }}>Problem zone</span>
                      <span style={{ fontFamily: t.fontSans, fontSize: '0.82rem', fontWeight: 600, color: '#B91C1C' }}>{item.bad}/mo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: '#F0EBE5',
              borderRadius: '10px',
              padding: '20px 24px',
              borderLeft: `4px solid ${t.accent}`,
            }}>
              <p style={{
                fontFamily: t.fontSerif,
                fontSize: '0.9rem',
                color: t.text,
                lineHeight: 1.7,
                margin: 0,
              }}>
                <strong>Rule of thumb:</strong> If your monthly churn is above 5%, you have a retention problem worth fixing today. If it's above 8%, churn is likely your #1 business risk. A cancel flow alone typically saves 25–45% of would-be churners.
              </p>
            </div>
          </div>
        </section>

        {/* How to reduce churn */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 24px' }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
          }}>
            How to reduce churn on your membership site
          </h2>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '0.95rem',
            color: t.gray,
            lineHeight: 1.7,
            margin: '0 0 36px',
          }}>
            Churn has two phases: before someone decides to leave, and the moment they click "cancel." Both are winnable with the right approach.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              {
                number: '01',
                title: 'Nail onboarding — the first 7 days matter most',
                body: 'Members who achieve a meaningful outcome in their first week retain at 2–3× the rate of those who don\'t. Map your fastest path to value and make it the default onboarding experience. A single "quick win" email sequence in week 1 can move retention metrics more than months of content production.',
              },
              {
                number: '02',
                title: 'Deliver consistent, predictable value',
                body: 'Churn spikes when members feel the membership has "gone quiet" — no new content, no community activity, no fresh reason to stay. A simple monthly rhythm (one live call, one new module, one community challenge) dramatically increases perceived value even if the total amount of content stays the same.',
              },
              {
                number: '03',
                title: 'Implement a cancel flow before members leave',
                body: 'Most cancellation decisions are emotional and reversible. A cancel flow intercepts the moment someone clicks "cancel" and presents the right offer — a month\'s pause, a 20% discount, a lighter tier. This alone saves 25–45% of would-be churners. It\'s the highest-ROI retention lever available to membership sites, and it\'s what ChurnRecovery automates for free.',
              },
              {
                number: '04',
                title: 'Send win-back campaigns to lapsed members',
                body: 'Members who cancelled 30–90 days ago are 10–15× more likely to resubscribe than cold leads. A simple 3-email win-back sequence with a time-limited offer ("come back for $X this week") recovers 15–30% of lapsed members who open. This is low-hanging fruit that most membership sites ignore.',
              },
              {
                number: '05',
                title: 'Fix involuntary churn (failed payments)',
                body: 'Up to 40% of membership churn is passive — failed payments that no one follows up on. Smart retry logic (retry on different days, at different times) combined with dunning emails ("your card failed, here\'s how to update it") can recover 60–80% of these failed payments automatically.',
              },
            ].map(item => (
              <div key={item.number} style={{ display: 'flex', gap: '20px' }}>
                <div style={{
                  flexShrink: 0,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#F0EBE5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: t.fontSans,
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: t.accent,
                  letterSpacing: '0.04em',
                }}>
                  {item.number}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: t.text,
                    margin: '0 0 8px',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: t.fontSerif,
                    fontSize: '0.9rem',
                    color: t.gray,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* When to use section */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '72px 24px',
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              margin: '0 0 20px',
            }}>
              When to use a membership site churn rate calculator
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.95rem',
              color: t.gray,
              lineHeight: 1.7,
              margin: '0 0 28px',
            }}>
              The calculator above is most useful in these situations:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'You\'ve never calculated your churn rate before and want a baseline',
                'You\'re pitching a retention investment (cancel flow, community manager, new content) to a co-founder or team and need the revenue impact in dollars',
                'You want to benchmark against industry standards to know if your churn is a real problem or typical for your category',
                'You\'re modeling what it would be worth to reduce churn by 1–2 percentage points',
                'A member just cancelled and you\'re wondering how much revenue is really at stake per cancellation',
                'You\'re evaluating retention tools and want to know the ROI threshold for when a paid tool makes sense',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#E8F5ED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    color: t.green,
                    fontWeight: 800,
                    marginTop: '2px',
                  }}>
                    ✓
                  </span>
                  <span style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.6 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Stats */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 24px' }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.03em',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            The numbers behind membership site retention
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              {
                stat: '5–7%',
                label: 'Average monthly churn for membership sites',
                body: 'Industry-wide average. If you\'re under 3%, you\'re doing well. If you\'re over 8%, churn is your biggest business problem.',
              },
              {
                stat: '25–45%',
                label: 'Members saved by a good cancel flow',
                body: 'The range across membership sites running cancel flows. The right offer at the moment of cancellation changes minds that are already made up.',
              },
              {
                stat: '5×',
                label: 'More expensive to acquire than retain',
                body: 'Keeping a member costs a fraction of finding a new one. Every cancellation you prevent is worth 5× a new signup.',
              },
              {
                stat: '40%',
                label: 'Of churn that\'s involuntary (failed payments)',
                body: 'Many membership site owners don\'t realize nearly half their lost members never intended to cancel — their cards just declined.',
              },
            ].map(item => (
              <div key={item.stat} style={{
                padding: '24px',
                border: `1px solid ${t.border}`,
                borderRadius: '10px',
                background: t.white,
              }}>
                <div style={{
                  fontFamily: t.fontSans,
                  fontWeight: 800,
                  fontSize: '2rem',
                  color: t.accent,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  {item.stat}
                </div>
                <div style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: t.text,
                  marginBottom: '8px',
                  lineHeight: 1.3,
                }}>
                  {item.label}
                </div>
                <p style={{
                  fontFamily: t.fontSerif,
                  fontSize: '0.8rem',
                  color: t.gray,
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '72px 24px',
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              marginBottom: '40px',
            }}>
              Frequently asked questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {faqItems.map(item => (
                <div key={item.q} style={{
                  borderBottom: `1px solid ${t.border}`,
                  paddingBottom: '28px',
                }}>
                  <h3 style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: t.text,
                    margin: '0 0 10px',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.4,
                  }}>
                    {item.q}
                  </h3>
                  <p style={{
                    fontFamily: t.fontSerif,
                    fontSize: '0.9rem',
                    color: t.gray,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related resources */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 48px' }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: '1.2rem',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}>
            Go deeper on membership site retention
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              { href: '/demo', label: '→ Try the cancel flow demo' },
              { href: '/posts/membership-site-churn-rate', label: '→ Membership site churn guide' },
              { href: '/posts/Ultimate-Guide-SaaS-Churn', label: '→ Ultimate guide to churn' },
              { href: '/posts/Cancel-Flow-Examples', label: '→ Cancel flow examples' },
              { href: '/posts/Involuntary-Churn-Recovery', label: '→ Involuntary churn recovery' },
              { href: '/tools/churn-calculator', label: '→ SaaS revenue calculator' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                display: 'block',
                padding: '12px 16px',
                border: `1px solid ${t.border}`,
                borderRadius: '8px',
                fontFamily: t.fontSans,
                fontSize: '0.85rem',
                color: t.text,
                textDecoration: 'none',
                fontWeight: 500,
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{
          background: t.text,
          padding: '80px 24px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 700,
            color: t.white,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
          }}>
            Ready to stop losing members?
          </h2>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 32px',
            maxWidth: '460px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.7,
          }}>
            Join the waitlist for ChurnRecovery — the free cancel flow platform for membership sites, communities, and SaaS founders.
          </p>
          <a href="https://tally.so/r/churnrecovery" style={{
            display: 'inline-block',
            background: t.accent,
            color: t.white,
            padding: '14px 32px',
            borderRadius: '8px',
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            Join the Waitlist — Free
          </a>
          <p style={{
            fontFamily: t.fontSans,
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '14px',
          }}>
            No credit card. No commitment. Set up in minutes.
          </p>
        </section>
      </div>
    </>
  )
}
