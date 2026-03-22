import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const changelog = [
  {
    version: '0.9.0',
    date: 'March 20, 2026',
    label: 'Latest',
    labelColor: '#2D7A4F',
    labelBg: '#EDF7F1',
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
    labelColor: '#2563EB',
    labelBg: '#EFF6FF',
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
    labelColor: '#7C3AED',
    labelBg: '#F5F3FF',
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
    labelColor: '#7C3AED',
    labelBg: '#F5F3FF',
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
    labelColor: '#666666',
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
  new: { label: 'New', color: '#2D7A4F', bg: '#EDF7F1' },
  improved: { label: 'Improved', color: '#2563EB', bg: '#EFF6FF' },
  fixed: { label: 'Fixed', color: '#D97757', bg: '#FDF4F0' },
}

function ChangeSection({ type, items }) {
  const cfg = typeConfig[type] || typeConfig.new
  return (
    <div className="mb-5">
      <div className="inline-block font-sans font-semibold text-[0.72rem] tracking-[0.06em] uppercase px-[10px] py-[3px] rounded-[20px] mb-[10px]" style={{ background: cfg.bg, color: cfg.color }}>
        {cfg.label}
      </div>
      <ul className="m-0 pl-5">
        {items.map((item, i) => (
          <li key={i} className="font-serif text-[0.9rem] text-brand-gray leading-[1.8] mb-[2px]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChangelogEntry({ entry }) {
  return (
    <div className="grid grid-cols-[200px_1fr] gap-12 pb-[60px] border-b border-brand-border changelog-entry">
      {/* Left sidebar — version info */}
      <div className="pt-1">
        <div className="inline-block font-sans font-semibold text-[0.72rem] tracking-[0.06em] uppercase px-[10px] py-[3px] rounded-[20px] mb-2" style={{ background: entry.labelBg, color: entry.labelColor }}>
          {entry.label}
        </div>
        <div className="font-sans font-extrabold text-[1.1rem] text-brand-text mb-1">
          v{entry.version}
        </div>
        <div className="font-serif text-[0.8rem] text-brand-gray-light">
          {entry.date}
        </div>
      </div>

      {/* Right — changes */}
      <div>
        <h3 className="font-sans font-bold text-[1.2rem] text-brand-text mb-3 tracking-[-0.02em]">
          {entry.headline}
        </h3>
        <p className="font-serif text-[0.93rem] text-brand-gray leading-[1.8] mb-6">
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
      <main className="bg-brand-bg min-h-screen">

        {/* Hero */}
        <section className="max-w-[900px] mx-auto pt-[72px] px-6 pb-14">
          <div className="inline-block bg-[#FDF4F0] text-brand-accent font-sans font-semibold text-[0.78rem] tracking-[0.08em] uppercase px-[14px] py-[6px] rounded-[20px] mb-6">
            Changelog
          </div>
          <h1 className="font-sans font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-brand-text mb-4 tracking-[-0.03em] leading-[1.15]">
            What's new in ChurnRecovery
          </h1>
          <p className="font-serif text-[1.05rem] text-brand-gray leading-[1.8] mb-7 max-w-[600px]">
            Follow our development as we build the free alternative to Churnkey.
            New features, improvements, and fixes — all documented here.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="https://github.com/churnrecovery/churnrecovery" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-[0.85rem] text-brand-gray no-underline border border-brand-border bg-brand-white px-4 py-2 rounded-lg font-medium">
              ⭐ Star on GitHub
            </a>
            <a href="/rss.xml" className="inline-flex items-center gap-2 font-sans text-[0.85rem] text-brand-gray no-underline border border-brand-border bg-brand-white px-4 py-2 rounded-lg font-medium">
              📡 RSS Feed
            </a>
          </div>
        </section>

        {/* Changelog entries */}
        <section className="max-w-[900px] mx-auto px-6 pb-20">
          <div className="flex flex-col gap-[60px]">
            {changelog.map((entry, i) => (
              <ChangelogEntry key={i} entry={entry} />
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-[60px] p-6 bg-brand-white border border-brand-border rounded-[10px] text-center">
            <div className="font-sans font-semibold text-[0.9rem] text-brand-text mb-2">
              Building in public
            </div>
            <p className="font-serif text-[0.85rem] text-brand-gray leading-[1.7] mb-4">
              ChurnRecovery is built in public. Follow the{' '}
              <Link href="/blog" className="text-brand-accent no-underline">blog</Link>{' '}
              for deeper dives into our decisions and technical choices.
            </p>
            <Link href="/app/sign-up" className="inline-block bg-brand-accent text-brand-white px-6 py-[10px] rounded-lg no-underline font-sans font-semibold text-[0.9rem]">
              Get Started Free →
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
