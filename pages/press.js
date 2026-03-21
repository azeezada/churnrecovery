import Head from 'next/head'
import Link from 'next/link'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  purple: '#7C3AED',
  purpleLight: '#F5F0FF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const quotes = [
  {
    quote: "Churn recovery tooling used to cost $250–$500 a month. That's pricing that only makes sense if you're already generating serious revenue. We built ChurnRecovery because the people who need it most — newsletter creators, coaches, indie founders — couldn't afford it.",
    attribution: 'Founder, ChurnRecovery',
  },
  {
    quote: "The cancel moment is the most valuable moment in a subscription business. It's the last chance to understand why a customer is leaving and offer them something that keeps them. Most tools either ignore this entirely or charge a fortune to handle it. We made it free.",
    attribution: 'Founder, ChurnRecovery',
  },
  {
    quote: "We're not trying to compete with Zuora or Chargebee. We're filling the gap those companies created when they priced out 95% of the market. If you run a Substack, a membership community, a coaching program, or a small SaaS — ChurnRecovery was built for you.",
    attribution: 'Founder, ChurnRecovery',
  },
]

const stats = [
  { label: 'Waitlist Members', value: '[PLACEHOLDER]', note: 'and growing' },
  { label: 'Supported Platforms', value: '10+', note: 'Stripe-connected tools' },
  { label: 'Avg. Save Rate', value: '~30%', note: 'of at-risk subscribers' },
  { label: 'Setup Time', value: '15 min', note: 'no code required' },
  { label: 'Cost', value: '$0', note: 'free forever core tier' },
]

const brandColors = [
  { name: 'Accent Orange', hex: '#D97757', pantone: 'Warm orange' },
  { name: 'Dark Text', hex: '#191919', pantone: 'Near black' },
  { name: 'Background', hex: '#FAF9F5', pantone: 'Warm white' },
  { name: 'Purple', hex: '#7C3AED', pantone: 'Brand purple' },
  { name: 'White', hex: '#FFFFFF', pantone: 'Pure white' },
]

export default function PressPage() {
  return (
    <>
      <Head>
        <title>Press Kit — ChurnRecovery</title>
        <meta name="description" content="Press kit, media assets, founder quotes, and brand guidelines for ChurnRecovery — the free churn recovery platform for subscription businesses." />
        <link rel="canonical" href="https://churnrecovery.com/press" />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
        {/* Nav */}
        <nav style={{
          borderBottom: `1px solid ${t.border}`,
          background: t.white,
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <Link href="/" style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.1rem', color: t.text, textDecoration: 'none' }}>
            ChurnRecovery
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
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

        {/* Hero */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px 48px' }}>
          <div style={{
            display: 'inline-block',
            background: t.purpleLight,
            color: t.purple,
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px',
          }}>
            Press &amp; Media
          </div>
          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 700,
            color: t.text,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            ChurnRecovery Press Kit
          </h1>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1.1rem',
            color: t.gray,
            lineHeight: 1.7,
            maxWidth: '640px',
            margin: '0 0 32px',
          }}>
            Everything journalists, podcasters, and bloggers need to cover ChurnRecovery. Download assets, grab pre-approved quotes, and reach us directly at{' '}
            <a href="mailto:press@churnrecovery.com" style={{ color: t.accent, textDecoration: 'none' }}>press@churnrecovery.com</a>.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/press-kit.pdf" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: t.accent,
              color: t.white,
              padding: '10px 20px',
              borderRadius: '7px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}>
              ↓ Download Press Kit (PDF)
            </a>
            <a href="/public/screenshots" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: `1px solid ${t.border}`,
              color: t.text,
              padding: '10px 20px',
              borderRadius: '7px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              background: t.white,
            }}>
              ↓ Screenshots &amp; Assets
            </a>
          </div>
        </section>

        {/* One-liner */}
        <section style={{
          background: t.text,
          padding: '40px 24px',
          margin: '0 0 0',
        }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              color: t.white,
              fontStyle: 'italic',
              lineHeight: 1.6,
              margin: 0,
              textAlign: 'center',
            }}>
              "ChurnRecovery is the free, open-source churn recovery platform that intercepts subscription cancellations with smart save flows — built for newsletter creators, coaches, and subscription businesses who can't afford Churnkey."
            </p>
          </div>
        </section>

        {/* About */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px' }}>
          <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '28px' }}>
            About ChurnRecovery
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              `ChurnRecovery is a free, open-source churn recovery platform built for subscription businesses that can't afford enterprise pricing. It intercepts the cancellation moment — the instant a subscriber clicks "Cancel" — and presents a personalized save flow: a pause option, a discount offer, a plan downgrade, or an exit survey. This is the cancel flow layer that Stripe Billing doesn't provide and that tools like Churnkey charge $250–$500 a month for.`,
              `The product was founded by a bootstrapped developer who was paying over $300/month for churn recovery tooling and realized the math didn't work for small subscription businesses. Newsletter creators, online course sellers, membership site operators, and early-stage SaaS founders were either ignoring churn entirely or overpaying for tools built for enterprises. ChurnRecovery was built to solve that: enterprise-grade cancel flows, completely free, installable in 15 minutes without writing a single line of code.`,
              `ChurnRecovery integrates with Stripe and every major Stripe-powered platform: Substack, Kajabi, Ghost, Memberful, Teachable, Thinkific, Patreon, Circle, Payhip, Stan Store, Podia, and more. The core product — cancel flows, exit surveys, pause offers, failed payment recovery — is permanently free. The project is open source and designed to remain independent, not get acquired and repriced out of reach.`,
            ].map((para, i) => (
              <p key={i} style={{
                fontFamily: t.fontSerif,
                fontSize: '1rem',
                color: t.text,
                lineHeight: 1.8,
                margin: 0,
              }}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Founder bio */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '64px 24px',
        }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '28px' }}>
              Founder Bio
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="press-founder-grid">
              <div>
                <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.text, lineHeight: 1.8 }}>
                  The founder of ChurnRecovery is a bootstrapped software developer and product builder who has spent years building and growing subscription businesses. After paying for churn recovery tools that cost more than many founders earn in monthly revenue, they decided to build the alternative.
                </p>
                <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.text, lineHeight: 1.8, marginTop: '16px' }}>
                  ChurnRecovery started as an internal tool and became a product after other founders expressed interest. The vision: make enterprise-grade churn recovery accessible to anyone running a paid newsletter, online community, coaching program, or small SaaS — not just companies with $50k/month in MRR.
                </p>
              </div>
              <div>
                <div style={{ background: t.bg, borderRadius: '12px', padding: '24px', border: `1px solid ${t.border}` }}>
                  <h3 style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '0.85rem', color: t.gray, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px' }}>
                    Quick Facts
                  </h3>
                  {[
                    ['Role', 'Founder & CEO'],
                    ['Background', 'Software developer, bootstrapped founder'],
                    ['Location', 'United States'],
                    ['Focus', 'SaaS, membership businesses, creator economy'],
                    ['Contact', 'press@churnrecovery.com'],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${t.border}`, fontSize: '0.85rem' }}>
                      <span style={{ color: t.gray, fontFamily: t.fontSans }}>{label}</span>
                      <span style={{ color: t.text, fontFamily: t.fontSans, fontWeight: 500 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key stats */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px' }}>
          <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '28px' }}>
            Key Stats to Cite
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
            {stats.map(stat => (
              <div key={stat.label} style={{
                border: `1px solid ${t.border}`,
                borderRadius: '12px',
                padding: '24px',
                background: t.white,
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '2rem', color: t.accent, letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.85rem', color: t.text, marginTop: '8px' }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: t.gray, marginTop: '4px' }}>
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.grayLight, marginTop: '16px' }}>
            * Waitlist count is a placeholder. Contact press@churnrecovery.com for current verified figures.
          </p>
        </section>

        {/* Founder quotes */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '64px 24px',
        }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Pre-Approved Founder Quotes
            </h2>
            <p style={{ fontFamily: t.fontSans, fontSize: '0.9rem', color: t.gray, marginBottom: '32px' }}>
              These quotes may be used in articles, podcasts, and blog posts without additional approval. Please attribute to "ChurnRecovery founder."
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {quotes.map((q, i) => (
                <blockquote key={i} style={{
                  border: `1px solid ${t.border}`,
                  borderLeft: `4px solid ${t.accent}`,
                  borderRadius: '8px',
                  padding: '28px 28px 24px',
                  background: t.bg,
                  margin: 0,
                }}>
                  <p style={{
                    fontFamily: t.fontSerif,
                    fontSize: '1.05rem',
                    color: t.text,
                    lineHeight: 1.7,
                    margin: '0 0 16px',
                    fontStyle: 'italic',
                  }}>
                    "{q.quote}"
                  </p>
                  <cite style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.82rem',
                    color: t.gray,
                    fontStyle: 'normal',
                    fontWeight: 600,
                  }}>
                    — {q.attribution}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Brand colors + screenshots */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px' }}>
          <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '28px' }}>
            Brand Colors
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
            {brandColors.map(c => (
              <div key={c.hex} style={{
                border: `1px solid ${t.border}`,
                borderRadius: '10px',
                overflow: 'hidden',
                width: '140px',
                background: t.white,
              }}>
                <div style={{ background: c.hex, height: '60px', borderBottom: `1px solid ${t.border}` }} />
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.8rem', color: t.text }}>{c.name}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: t.gray, marginTop: '2px' }}>{c.hex}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Product Screenshots
          </h2>
          <p style={{ fontFamily: t.fontSans, fontSize: '0.9rem', color: t.gray, marginBottom: '20px' }}>
            Screenshots are available in <code style={{ background: '#F3F4F6', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85rem' }}>public/screenshots/</code>. Contact{' '}
            <a href="mailto:press@churnrecovery.com" style={{ color: t.accent }}>press@churnrecovery.com</a> for high-resolution assets.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              'dashboard-overview.png',
              'cancel-flow-demo.png',
              'analytics-view.png',
              'offer-builder.png',
            ].map(file => (
              <div key={file} style={{
                border: `1px solid ${t.border}`,
                borderRadius: '8px',
                background: t.white,
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{ fontSize: '1.4rem' }}>🖼</span>
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: t.text }}>{file}</div>
                  <a href={`/screenshots/${file}`} style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: t.accent, textDecoration: 'none' }}>
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured in (placeholder) */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '64px 24px',
        }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Featured In
            </h2>
            <p style={{ fontFamily: t.fontSans, fontSize: '0.9rem', color: t.grayLight, fontStyle: 'italic' }}>
              [Feature mentions and press coverage will appear here. Contact press@churnrecovery.com to discuss coverage.]
            </p>
            {/* Placeholder slots */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  border: `1px dashed ${t.border}`,
                  borderRadius: '8px',
                  padding: '16px 24px',
                  color: t.grayLight,
                  fontFamily: t.fontSans,
                  fontSize: '0.85rem',
                }}>
                  [Publication {i}]
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{ padding: '80px 24px', textAlign: 'center', background: t.text }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: t.white,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
          }}>
            Writing about ChurnRecovery?
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
            We're happy to do interviews, provide quotes, and share more detailed product information. Response time is typically under 24 hours.
          </p>
          <a href="mailto:press@churnrecovery.com" style={{
            display: 'inline-block',
            background: t.accent,
            color: t.white,
            padding: '14px 32px',
            borderRadius: '8px',
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
          }}>
            press@churnrecovery.com
          </a>
        </section>
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          .press-founder-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
