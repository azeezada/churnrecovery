import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
  blue: '#2563EB',
  blueBg: '#EFF6FF',
  purple: '#7C3AED',
  purpleBg: '#F5F3FF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const changelog = [
  {
    version: '0.9.0',
    date: 'March 20, 2026',
    label: 'Latest',
    labelColor: t.green,
    labelBg: t.greenBg,
    headline: 'Full product launch — dashboard, widget, and API',
    summary: 'ChurnRecovery is now a complete product. After months of building, we\'re opening access to the full platform — including the dashboard, embeddable widget, and REST API.',
    changes: [
      {
        type: 'new',
        items: [
          'Dashboard with projects, cancel flow builder, and analytics',
          'Embeddable widget (widget.js) — drop one script tag to activate',
          'Cancel flow builder — visual editor with live preview',
          'Analytics: see save rates, reasons, and trends in real-time',
          'Projects — manage multiple cancel flows for different products',
          'Settings — API key management, Stripe connection, webhooks',
        ],
      },
      {
        type: 'improved',
        items: [
          'Redesigned marketing site with editorial layout',
          'New /use-cases section for industry-specific flows',
          'Integration guides for Stripe, Paddle, Braintree, Chargebee, Recurly',
          'Expanded documentation with full API reference and SDK docs',
        ],
      },
    ],
  },
  {
    version: '0.8.0',
    date: 'March 15, 2026',
    label: 'Beta',
    labelColor: t.blue,
    labelBg: t.blueBg,
    headline: 'Interactive demo and tools',
    summary: 'Added an interactive cancel flow demo and churn calculator to help prospects understand ChurnRecovery before signing up.',
    changes: [
      {
        type: 'new',
        items: [
          'Interactive cancel flow demo at /demo — click through a real flow',
          'Churn calculator at /tools/churn-calculator — estimate your potential savings',
          'Template gallery at /templates — 6 pre-built cancel flow templates',
          'Comparison pages — detailed comparisons vs Churnkey, ProfitWell, Churnbuster, and more',
        ],
      },
      {
        type: 'improved',
        items: [
          'Homepage redesign — editorial style with social proof and feature highlights',
          'Mobile responsiveness pass across all pages',
          'SEO improvements: sitemap, robots.txt, structured data, OG images',
        ],
      },
    ],
  },
  {
    version: '0.7.0',
    date: 'March 10, 2026',
    label: 'Alpha',
    labelColor: t.purple,
    labelBg: t.purpleBg,
    headline: 'Blog, docs, and content foundation',
    summary: 'Built the content engine — blog with RSS, developer docs, and SEO-optimized posts targeting key churn recovery keywords.',
    changes: [
      {
        type: 'new',
        items: [
          'Blog system with tags, pagination, and RSS feed',
          'Developer docs page with full SDK documentation and code examples',
          'Features page with detailed feature descriptions',
          '6 SEO blog posts covering churn benchmarks, cancel flows, and recovery strategies',
          'Pricing page clarifying the free model',
          'About page with founding story and open-source commitment',
        ],
      },
      {
        type: 'fixed',
        items: [
          'RSS feed now correctly generates on build',
          'OG image paths fixed across all pages',
        ],
      },
    ],
  },
  {
    version: '0.6.0',
    date: 'March 5, 2026',
    label: 'Alpha',
    labelColor: t.purple,
    labelBg: t.purpleBg,
    headline: 'Cloudflare D1 + waitlist API',
    summary: 'Added the data persistence layer — Cloudflare D1 database and a waitlist API for early access sign-ups.',
    changes: [
      {
        type: 'new',
        items: [
          'Cloudflare D1 database integration',
          'Waitlist API (POST /api/waitlist) with email deduplication',
          'WaitlistForm component integrated across site',
          'Waitlist counter for social proof',
        ],
      },
      {
        type: 'improved',
        items: [
          'Cloudflare Pages deployment with GitHub Actions CI/CD',
          'Static export optimized for edge delivery',
        ],
      },
    ],
  },
  {
    version: '0.5.0',
    date: 'February 28, 2026',
    label: 'Pre-launch',
    labelColor: t.gray,
    labelBg: '#F5F5F5',
    headline: 'Project foundation and design system',
    summary: 'Kicked off the project. Established the tech stack, design system, and component library.',
    changes: [
      {
        type: 'new',
        items: [
          'Next.js 14 project setup with Cloudflare Pages deployment',
          'Design system with Instrument Sans + Merriweather typography',
          'CSS custom properties for consistent theming',
          'Header and Footer components',
          'Playwright installed for visual testing',
        ],
      },
    ],
  },
]

const typeConfig = {
  new: { label: 'New', color: t.green, bg: t.greenBg },
  improved: { label: 'Improved', color: t.blue, bg: t.blueBg },
  fixed: { label: 'Fixed', color: t.accent, bg: t.accentBg },
}

function ChangeSection({ type, items }) {
  const cfg = typeConfig[type] || typeConfig.new
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{
        display: 'inline-block',
        background: cfg.bg,
        color: cfg.color,
        fontFamily: t.fontSans,
        fontWeight: 600,
        fontSize: '0.72rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '3px 10px',
        borderRadius: '20px',
        marginBottom: '10px',
      }}>
        {cfg.label}
      </div>
      <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
        {items.map((item, i) => (
          <li key={i} style={{
            fontFamily: t.fontSerif,
            fontSize: '0.9rem',
            color: t.gray,
            lineHeight: 1.8,
            marginBottom: '2px',
          }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChangelogEntry({ entry }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: '48px',
      paddingBottom: '60px',
      borderBottom: `1px solid ${t.border}`,
    }}
    className="changelog-entry"
    >
      {/* Left sidebar — version info */}
      <div style={{ paddingTop: '4px' }}>
        <div style={{
          display: 'inline-block',
          background: entry.labelBg,
          color: entry.labelColor,
          fontFamily: t.fontSans,
          fontWeight: 600,
          fontSize: '0.72rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: '3px 10px',
          borderRadius: '20px',
          marginBottom: '8px',
        }}>
          {entry.label}
        </div>
        <div style={{
          fontFamily: t.fontSans,
          fontWeight: 800,
          fontSize: '1.1rem',
          color: t.text,
          marginBottom: '4px',
        }}>
          v{entry.version}
        </div>
        <div style={{
          fontFamily: t.fontSerif,
          fontSize: '0.8rem',
          color: t.grayLight,
        }}>
          {entry.date}
        </div>
      </div>

      {/* Right — changes */}
      <div>
        <h3 style={{
          fontFamily: t.fontSans,
          fontWeight: 700,
          fontSize: '1.2rem',
          color: t.text,
          margin: '0 0 12px',
          letterSpacing: '-0.02em',
        }}>
          {entry.headline}
        </h3>
        <p style={{
          fontFamily: t.fontSerif,
          fontSize: '0.93rem',
          color: t.gray,
          lineHeight: 1.8,
          margin: '0 0 24px',
        }}>
          {entry.summary}
        </p>
        {entry.changes.map((section, i) => (
          <ChangeSection key={i} type={section.type} items={section.items} />
        ))}
      </div>
    </div>
  )
}

export default function ChangelogPage() {
  return (
    <>
      <Head>
        <title>Changelog — ChurnRecovery</title>
        <meta name="description" content="ChurnRecovery product changelog. Follow our development progress from alpha to launch. New features, improvements, and fixes." />
        <meta property="og:title" content="Changelog — ChurnRecovery" />
        <meta property="og:description" content="Follow ChurnRecovery's development. Version history, new features, and what's coming next." />
        <meta property="og:url" content="https://churnrecovery.com/changelog" />
        <meta property="og:image" content="https://churnrecovery.com/og/default.svg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main style={{ background: t.bg, minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 24px 56px' }}>
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
            Changelog
          </div>
          <h1 style={{
            fontFamily: t.fontSans,
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: t.text,
            margin: '0 0 16px',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
          }}>
            What's new in ChurnRecovery
          </h1>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1.05rem',
            color: t.gray,
            lineHeight: 1.8,
            margin: '0 0 28px',
            maxWidth: '600px',
          }}>
            Follow our development as we build the free alternative to Churnkey.
            New features, improvements, and fixes — all documented here.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="https://github.com/churnrecovery/churnrecovery" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: t.fontSans,
              fontSize: '0.85rem',
              color: t.gray,
              textDecoration: 'none',
              border: `1px solid ${t.border}`,
              background: t.white,
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 500,
            }}>
              ⭐ Star on GitHub
            </a>
            <a href="/rss.xml" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: t.fontSans,
              fontSize: '0.85rem',
              color: t.gray,
              textDecoration: 'none',
              border: `1px solid ${t.border}`,
              background: t.white,
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 500,
            }}>
              📡 RSS Feed
            </a>
          </div>
        </section>

        {/* Changelog entries */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {changelog.map((entry, i) => (
              <ChangelogEntry key={i} entry={entry} />
            ))}
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: '60px',
            padding: '24px',
            background: t.white,
            border: `1px solid ${t.border}`,
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.9rem', color: t.text, marginBottom: '8px' }}>
              Building in public
            </div>
            <p style={{ fontFamily: t.fontSerif, fontSize: '0.85rem', color: t.gray, lineHeight: 1.7, margin: '0 0 16px' }}>
              ChurnRecovery is built in public. Follow the{' '}
              <Link href="/blog" style={{ color: t.accent, textDecoration: 'none' }}>blog</Link>{' '}
              for deeper dives into our decisions and technical choices.
            </p>
            <Link href="/app/sign-up" style={{
              display: 'inline-block',
              background: t.accent,
              color: t.white,
              padding: '10px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: t.fontSans,
              fontWeight: 600,
              fontSize: '0.9rem',
            }}>
              Join Waitlist — It's Free
            </Link>
          </div>
        </section>

      </main>
      <style jsx global>{`
        @media (max-width: 640px) {
          .changelog-entry {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
      <Footer />
    </>
  )
}
