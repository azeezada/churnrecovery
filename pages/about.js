import Head from 'next/head'
import Link from 'next/link'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#444444',
  grayLight: '#888888',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const values = [
  {
    icon: '🔓',
    title: 'Radically open',
    body: 'ChurnRecovery is free and open source. The code that runs your cancel flows is code you can read, fork, and run yourself. No black boxes, no vendor lock-in.',
  },
  {
    icon: '⚖️',
    title: 'Fair by design',
    body: 'Charging per recovery creates a perverse incentive: the tool wins more when you lose customers. We broke that model. Free is the only pricing that aligns our interests with yours.',
  },
  {
    icon: '🛠️',
    title: 'Developer-first',
    body: 'Cancel flows are code. They should be version-controlled, testable, and deployable — not point-and-click configured inside a locked dashboard. We build for engineers.',
  },
  {
    icon: '📊',
    title: 'Data you own',
    body: 'Every cancel reason, every offer acceptance, every recovered subscription — your data lives where you control it. Export anytime, connect to any analytics stack.',
  },
]

const timeline = [
  {
    date: 'Q1 2025',
    title: 'The problem becomes personal',
    body: 'Building a SaaS product, we hit the cancel flow wall. Churnkey: $250/month minimum. ProfitWell Retain: $149/month. We were recovering maybe $800/month. The math didn\'t work.',
  },
  {
    date: 'Q2 2025',
    title: 'We built it ourselves',
    body: 'We built our own cancel flow widget on a weekend. It was rough, but it worked. Save rates hit 22%. We thought: why isn\'t this just a standard, free piece of infrastructure?',
  },
  {
    date: 'Q3 2025',
    title: 'Open source + polish',
    body: 'We rebuilt it from scratch, properly. SDK, dashboard, analytics, dunning sequences. Shared it publicly. Other founders started using it. Feedback poured in.',
  },
  {
    date: 'Early 2026',
    title: 'ChurnRecovery launches',
    body: 'Today, ChurnRecovery is a full platform: cancel flows, payment recovery, analytics, templates — everything Churnkey offers, free forever. No per-recovery fees. No monthly minimum.',
  },
]

export default function AboutPage() {
  return (
    <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
      <Head>
        <title>About ChurnRecovery — Our Mission and Founding Story</title>
        <meta name="description" content="ChurnRecovery is a free, open-source churn recovery platform. Learn why we built it, what we believe, and our commitment to making retention tools accessible to every SaaS company." />
        <meta property="og:title" content="About ChurnRecovery — Free Churn Recovery for SaaS" />
        <meta property="og:description" content="We believe churn recovery tools should be free. Learn our founding story and mission." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://churnrecovery.com/about" />
        <meta property="og:image" content="https://churnrecovery.com/og/default.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://churnrecovery.com/about" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About ChurnRecovery",
          "description": "ChurnRecovery is a free, open-source churn recovery platform for SaaS companies.",
          "url": "https://churnrecovery.com/about",
          "publisher": {
            "@type": "Organization",
            "name": "ChurnRecovery",
            "url": "https://churnrecovery.com",
          }
        })}} />
      </Head>

      {/* Hero */}
      <div style={{ background: t.white, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px 72px' }}>
          <div style={{
            display: 'inline-block', background: t.greenLight, color: t.green,
            borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600,
            marginBottom: 24, letterSpacing: '0.02em'
          }}>
            Our mission
          </div>
          <h1 style={{
            fontFamily: t.fontSerif, fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700, color: t.text, margin: '0 0 24px', lineHeight: 1.2
          }}>
            Churn recovery should be free.<br />
            <span style={{ color: t.accent }}>We built it that way.</span>
          </h1>
          <p style={{
            fontSize: 19, color: t.gray, lineHeight: 1.75, fontFamily: t.fontSerif,
            margin: '0 0 20px', maxWidth: 640
          }}>
            ChurnRecovery is an open-source platform for cancel flow interception, payment recovery, and win-back automation. We built it because the tools we needed were too expensive — and we refuse to pass that cost on to other founders.
          </p>
          <p style={{
            fontSize: 20, color: t.text, lineHeight: 1.6, fontFamily: t.fontSans,
            margin: 0, maxWidth: 640, fontWeight: 700,
            padding: '16px 20px', background: t.greenLight, borderRadius: 10,
            borderLeft: `4px solid ${t.green}`, color: t.green
          }}>
            Free. Open source. Built for engineers who want to own their retention stack.
          </p>
        </div>
      </div>

      {/* Story */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 32px 0' }}>
        <h2 style={{ fontFamily: t.fontSerif, fontSize: 28, color: t.text, marginBottom: 16 }}>
          Why we built this
        </h2>
        <div style={{ fontFamily: t.fontSerif, fontSize: 16, color: t.gray, lineHeight: 1.85 }}>
          <p>
            In 2025, we were building a SaaS product. Customers were churning — some voluntarily, some because their cards failed. We knew we needed a cancel flow and a dunning sequence. We looked at the options.
          </p>
          <div style={{
            marginTop: 20, marginBottom: 20,
            background: '#FFF5F2', border: '1px solid #FFDDD5', borderRadius: 10,
            padding: '16px 20px'
          }}>
            <div style={{ fontWeight: 700, color: t.text, marginBottom: 8, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>What we were looking at</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {[
                { name: 'Churnkey', price: '$250–825/mo' },
                { name: 'ProfitWell Retain', price: '$149–499/mo' },
                { name: 'Baremetrics', price: '$129+/mo' },
              ].map(({ name, price }) => (
                <div key={name} style={{ background: t.white, borderRadius: 8, padding: '10px 14px', border: `1px solid ${t.border}` }}>
                  <div style={{ fontWeight: 700, color: t.text, fontSize: 14, marginBottom: 2 }}>{name}</div>
                  <div style={{ color: '#C4603D', fontWeight: 700, fontSize: 16 }}>{price}</div>
                </div>
              ))}
            </div>
          </div>
          <p style={{ marginTop: 16 }}>
            For a $3,000 MRR company, paying $250/month for a churn recovery tool is an 8% overhead tax — before you've proven the product delivers ROI. We thought that was backwards.
          </p>
          <p style={{ marginTop: 16 }}>
            So we built our own. A cancel flow widget, a dunning sequence, a basic dashboard. It wasn't pretty, but it worked. Our save rate hit 22%. We recovered about $600–800/month in revenue that would have churned.
          </p>
          <p style={{ marginTop: 16 }}>
            Then we asked ourselves: why should every SaaS founder rebuild this from scratch? Why isn't churn recovery just a standard piece of infrastructure — like email, analytics, or payments?
          </p>
          <p style={{ marginTop: 16 }}>
            <strong style={{ color: t.text }}>ChurnRecovery is the answer to that question.</strong>
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 800, margin: '72px auto 0', padding: '0 32px' }}>
        <h2 style={{ fontFamily: t.fontSerif, fontSize: 28, color: t.text, marginBottom: 40 }}>
          How we got here
        </h2>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 8, bottom: 8,
            width: 2, background: t.border, borderRadius: 1
          }} />
          {timeline.map((item, i) => (
            <div key={i} style={{
              position: 'relative', paddingLeft: 32, marginBottom: 40
            }}>
              <div style={{
                position: 'absolute', left: -6, top: 4,
                width: 14, height: 14, borderRadius: '50%',
                background: t.accent, border: `2px solid ${t.bg}`,
                boxShadow: `0 0 0 2px ${t.accent}`
              }} />
              <div style={{ fontSize: 13, color: t.accent, fontWeight: 700, marginBottom: 6, letterSpacing: '0.04em' }}>
                {item.date}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 8 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 15, color: t.gray, lineHeight: 1.75, fontFamily: t.fontSerif, margin: 0 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div style={{ maxWidth: 1100, margin: '72px auto 0', padding: '0 32px' }}>
        <div style={{ maxWidth: 800 }}>
          <h2 style={{ fontFamily: t.fontSerif, fontSize: 28, color: t.text, marginBottom: 12 }}>
            What we believe
          </h2>
          <p style={{ color: t.gray, fontSize: 16, lineHeight: 1.7, fontFamily: t.fontSerif, marginBottom: 40 }}>
            These aren't marketing platitudes — they're the principles that shaped every product decision.
          </p>
        </div>
        <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {values.map((value, i) => (
            <div key={i} style={{
              background: t.white, border: `1px solid ${t.border}`,
              borderRadius: 12, padding: '28px'
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{value.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 10 }}>
                {value.title}
              </h3>
              <p style={{ fontSize: 15, color: t.gray, lineHeight: 1.75, fontFamily: t.fontSerif, margin: 0 }}>
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open source commitment */}
      <div style={{ maxWidth: 800, margin: '72px auto 0', padding: '0 32px' }}>
        <div style={{
          background: '#1A1A1A', borderRadius: 16, padding: '48px',
          color: t.white
        }}>
          <div style={{ fontSize: 36, marginBottom: 20 }}>⚡</div>
          <h2 style={{ fontFamily: t.fontSerif, fontSize: 26, fontWeight: 700, marginBottom: 16 }}>
            Our open-source commitment
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontFamily: t.fontSerif, marginBottom: 20 }}>
            The ChurnRecovery JavaScript SDK, cancel flow renderer, and dunning engine are open source. Not open-core — actually open. The code that processes your cancellations is code you can read, audit, fork, and self-host.
          </p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontFamily: t.fontSerif, marginBottom: 32 }}>
            We believe in building in public. Our roadmap is public. Our metrics will be public when we have them worth sharing. Transparency isn't a marketing tactic — it's how we earn the right to handle your customer cancellations.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="https://github.com/churnrecovery"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.1)', color: t.white,
                padding: '12px 20px', borderRadius: 8, fontWeight: 600,
                textDecoration: 'none', fontSize: 15,
                border: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              ⭐ Star on GitHub
            </a>
            <Link href="/docs" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: t.accent, color: t.white,
              padding: '12px 20px', borderRadius: 8, fontWeight: 600,
              textDecoration: 'none', fontSize: 15,
            }}>
              Read the docs →
            </Link>
          </div>
        </div>
      </div>

      {/* Team placeholder */}
      <div style={{ maxWidth: 800, margin: '72px auto 0', padding: '0 32px' }}>
        <h2 style={{ fontFamily: t.fontSerif, fontSize: 28, color: t.text, marginBottom: 16 }}>
          Who's building this
        </h2>
        <p style={{ fontSize: 16, color: t.gray, lineHeight: 1.8, fontFamily: t.fontSerif, marginBottom: 32 }}>
          ChurnRecovery is built by a small team of founders who've shipped SaaS products and lived the churn problem firsthand. We're not a VC-backed company with a retention sales team — we're builders who got frustrated with expensive tooling and decided to fix it.
        </p>
        <div style={{
          background: t.white, border: `1px solid ${t.border}`, borderRadius: 12,
          padding: '32px', display: 'flex', alignItems: 'center', gap: 24
        }} className="founder-card">
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.accent}, #C4603D)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, color: t.white, fontWeight: 700, flexShrink: 0
          }}>
            🛠
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: t.text, marginBottom: 4 }}>
              The ChurnRecovery Team
            </div>
            <div style={{ fontSize: 14, color: t.grayLight, marginBottom: 10 }}>
              Builders. Founders. Former churners.
            </div>
            <p style={{ fontSize: 14, color: t.gray, lineHeight: 1.65, fontFamily: t.fontSerif, margin: 0 }}>
              We're currently in early access. Follow our journey and join the waitlist to be part of the founding user community.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 800, margin: '72px auto 0', padding: '0 32px' }}>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { value: '$0', label: 'Monthly fee. Forever.', sub: 'Not free trial — free product' },
            { value: '6+', label: 'Payment processors', sub: 'Stripe, Paddle, Braintree, and more' },
            { value: '100%', label: 'Open source SDK', sub: 'MIT license, fork freely' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: t.white, border: `1px solid ${t.border}`,
              borderRadius: 12, padding: '24px', textAlign: 'center'
            }}>
              <div style={{
                fontFamily: t.fontSerif, fontSize: 36, fontWeight: 700,
                color: t.accent, marginBottom: 8
              }}>
                {stat.value}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: t.text, marginBottom: 4 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 13, color: t.grayLight }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 800, margin: '72px auto 80px', padding: '0 32px' }}>
        <div style={{
          background: t.accent, borderRadius: 16, padding: '56px 40px',
          textAlign: 'center', color: t.white
        }}>
          <h2 style={{ fontFamily: t.fontSerif, fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 700, marginBottom: 16 }}>
            Join us in fixing churn
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px', fontFamily: t.fontSerif, lineHeight: 1.7 }}>
            Get early access to ChurnRecovery. Help us shape the product. Keep your feedback loop short with the people building it.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#waitlist" style={{
              background: t.white, color: t.accent, padding: '14px 32px',
              borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16
            }}>
              Get early access →
            </Link>
            <Link href="/demo" style={{
              background: 'rgba(255,255,255,0.15)', color: t.white, padding: '14px 32px',
              borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 16,
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              See it in action
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .founder-card { flex-direction: column !important; text-align: center !important; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  )
}
