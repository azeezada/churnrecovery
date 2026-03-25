import Head from 'next/head'
import Link from 'next/link'

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
  { label: 'Active Users', value: '[PLACEHOLDER]', note: 'and growing' },
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
        <meta property="og:title" content="Press Kit — ChurnRecovery" />
        <meta property="og:description" content="Press kit, media assets, founder quotes, and brand guidelines for ChurnRecovery — the free churn recovery platform for subscription businesses." />
        <meta property="og:url" content="https://churnrecovery.com/press" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://churnrecovery.com/og/default.svg" />
        <link rel="canonical" href="https://churnrecovery.com/press" />
      </Head>

      <div className="bg-[#FAF9F5] min-h-screen font-[Instrument_Sans,sans-serif]">
        {/* Nav */}
        <nav className="border-b border-[#E5E5E5] bg-white px-6 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
          <Link href="/" className="font-[Instrument_Sans,sans-serif] font-bold text-[1.1rem] text-[#191919] no-underline">
            ChurnRecovery
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/blog" className="text-[#666666] no-underline text-[0.9rem]">Blog</Link>
            <a href="/app/sign-up" className="bg-[#D97757] text-white px-[18px] py-2 rounded-[6px] no-underline text-[0.85rem] font-semibold">Get Started Free</a>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-[860px] mx-auto px-6 pt-16 pb-12">
          <div className="inline-block bg-[#F5F0FF] text-[#7C3AED] px-3 py-1 rounded text-xs font-bold uppercase tracking-[0.08em] mb-5">
            Press &amp; Media
          </div>
          <h1 className="font-[Instrument_Sans,sans-serif] font-bold text-[#191919] leading-[1.15] tracking-[-0.03em] m-0 mb-5 text-[clamp(1.8rem,5vw,2.8rem)]">
            ChurnRecovery Press Kit
          </h1>
          <p className="font-[Merriweather,serif] text-[1.1rem] text-[#666666] leading-[1.7] max-w-[640px] m-0 mb-8">
            Everything journalists, podcasters, and bloggers need to cover ChurnRecovery. Download assets, grab pre-approved quotes, and reach us directly at{' '}
            <a href="mailto:press@churnrecovery.com" className="text-[#D97757] no-underline">press@churnrecovery.com</a>.
          </p>

          <div className="flex gap-3 flex-wrap">
            <a href="/press-kit.pdf" className="inline-flex items-center gap-2 bg-[#D97757] text-white px-5 py-[10px] rounded-[7px] no-underline font-semibold text-[0.9rem]">
              ↓ Download Press Kit (PDF)
            </a>
            <a href="/public/screenshots" className="inline-flex items-center gap-2 border border-[#E5E5E5] text-[#191919] px-5 py-[10px] rounded-[7px] no-underline font-semibold text-[0.9rem] bg-white">
              ↓ Screenshots &amp; Assets
            </a>
          </div>
        </section>

        {/* One-liner */}
        <section className="bg-[#191919] px-6 py-10">
          <div className="max-w-[860px] mx-auto">
            <p className="font-[Merriweather,serif] text-white italic leading-relaxed m-0 text-center text-[clamp(1.1rem,3vw,1.5rem)]">
              "ChurnRecovery is the free, open-source churn recovery platform that intercepts subscription cancellations with smart save flows — built for newsletter creators, coaches, and subscription businesses who can't afford Churnkey."
            </p>
          </div>
        </section>

        {/* About */}
        <section className="max-w-[860px] mx-auto px-6 py-16">
          <h2 className="font-[Instrument_Sans,sans-serif] text-[1.5rem] font-bold text-[#191919] tracking-[-0.02em] mb-7">
            About ChurnRecovery
          </h2>
          <div className="flex flex-col gap-5">
            {[
              `ChurnRecovery is a free, open-source churn recovery platform built for subscription businesses that can't afford enterprise pricing. It intercepts the cancellation moment — the instant a subscriber clicks "Cancel" — and presents a personalized save flow: a pause option, a discount offer, a plan downgrade, or an exit survey. This is the cancel flow layer that Stripe Billing doesn't provide and that tools like Churnkey charge $250–$500 a month for.`,
              `The product was founded by a bootstrapped developer who was paying over $300/month for churn recovery tooling and realized the math didn't work for small subscription businesses. Newsletter creators, online course sellers, membership site operators, and early-stage SaaS founders were either ignoring churn entirely or overpaying for tools built for enterprises. ChurnRecovery was built to solve that: enterprise-grade cancel flows, completely free, installable in 15 minutes without writing a single line of code.`,
              `ChurnRecovery integrates with Stripe and every major Stripe-powered platform: Substack, Kajabi, Ghost, Memberful, Teachable, Thinkific, Patreon, Circle, Payhip, Stan Store, Podia, and more. The core product — cancel flows, exit surveys, pause offers, failed payment recovery — is permanently free. The project is open source and designed to remain independent, not get acquired and repriced out of reach.`,
            ].map((para, i) => (
              <p key={i} className="font-[Merriweather,serif] text-base text-[#191919] leading-[1.8] m-0">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Founder bio */}
        <section className="bg-white border-y border-[#E5E5E5] px-6 py-16">
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-[Instrument_Sans,sans-serif] text-[1.5rem] font-bold text-[#191919] tracking-[-0.02em] mb-7">
              Founder Bio
            </h2>
            <div className="grid grid-cols-2 gap-12 press-founder-grid">
              <div>
                <p className="font-[Merriweather,serif] text-base text-[#191919] leading-[1.8]">
                  The founder of ChurnRecovery is a bootstrapped software developer and product builder who has spent years building and growing subscription businesses. After paying for churn recovery tools that cost more than many founders earn in monthly revenue, they decided to build the alternative.
                </p>
                <p className="font-[Merriweather,serif] text-base text-[#191919] leading-[1.8] mt-4">
                  ChurnRecovery started as an internal tool and became a product after other founders expressed interest. The vision: make enterprise-grade churn recovery accessible to anyone running a paid newsletter, online community, coaching program, or small SaaS — not just companies with $50k/month in MRR.
                </p>
              </div>
              <div>
                <div className="bg-[#FAF9F5] rounded-xl p-6 border border-[#E5E5E5]">
                  <h3 className="font-[Instrument_Sans,sans-serif] font-bold text-[0.85rem] text-[#666666] uppercase tracking-[0.06em] m-0 mb-4">
                    Quick Facts
                  </h3>
                  {[
                    ['Role', 'Founder & CEO'],
                    ['Background', 'Software developer, bootstrapped founder'],
                    ['Location', 'United States'],
                    ['Focus', 'SaaS, membership businesses, creator economy'],
                    ['Contact', 'press@churnrecovery.com'],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-[#E5E5E5] text-[0.85rem]">
                      <span className="text-[#666666] font-[Instrument_Sans,sans-serif]">{label}</span>
                      <span className="text-[#191919] font-[Instrument_Sans,sans-serif] font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key stats */}
        <section className="max-w-[860px] mx-auto px-6 py-16">
          <h2 className="font-[Instrument_Sans,sans-serif] text-[1.5rem] font-bold text-[#191919] tracking-[-0.02em] mb-7">
            Key Stats to Cite
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
            {stats.map(stat => (
              <div key={stat.label} className="border border-[#E5E5E5] rounded-xl p-6 bg-white text-center">
                <div className="font-[Instrument_Sans,sans-serif] font-extrabold text-[2rem] text-[#D97757] tracking-[-0.04em] leading-none">
                  {stat.value}
                </div>
                <div className="font-[Instrument_Sans,sans-serif] font-semibold text-[0.85rem] text-[#191919] mt-2">
                  {stat.label}
                </div>
                <div className="font-[Instrument_Sans,sans-serif] text-xs text-[#666666] mt-1">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
          <p className="font-[Instrument_Sans,sans-serif] text-[0.8rem] text-[#999999] mt-4">
            * User count is a placeholder. Contact press@churnrecovery.com for current verified figures.
          </p>
        </section>

        {/* Founder quotes */}
        <section className="bg-white border-y border-[#E5E5E5] px-6 py-16">
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-[Instrument_Sans,sans-serif] text-[1.5rem] font-bold text-[#191919] tracking-[-0.02em] mb-2">
              Pre-Approved Founder Quotes
            </h2>
            <p className="font-[Instrument_Sans,sans-serif] text-[0.9rem] text-[#666666] mb-8">
              These quotes may be used in articles, podcasts, and blog posts without additional approval. Please attribute to "ChurnRecovery founder."
            </p>
            <div className="flex flex-col gap-6">
              {quotes.map((q, i) => (
                <blockquote key={i} className="border border-[#E5E5E5] border-l-4 border-l-[#D97757] rounded-lg px-7 pt-7 pb-6 bg-[#FAF9F5] m-0">
                  <p className="font-[Merriweather,serif] text-[1.05rem] text-[#191919] leading-[1.7] m-0 mb-4 italic">
                    "{q.quote}"
                  </p>
                  <cite className="font-[Instrument_Sans,sans-serif] text-[0.82rem] text-[#666666] not-italic font-semibold">
                    — {q.attribution}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Brand colors + screenshots */}
        <section className="max-w-[860px] mx-auto px-6 py-16">
          <h2 className="font-[Instrument_Sans,sans-serif] text-[1.5rem] font-bold text-[#191919] tracking-[-0.02em] mb-7">
            Brand Colors
          </h2>
          <div className="flex flex-wrap gap-3 mb-12">
            {brandColors.map(c => (
              <div key={c.hex} className="border border-[#E5E5E5] rounded-[10px] overflow-hidden w-[140px] bg-white">
                <div className="h-[60px] border-b border-[#E5E5E5]" style={{ background: c.hex }} />
                <div className="px-3 py-[10px]">
                  <div className="font-[Instrument_Sans,sans-serif] font-semibold text-[0.8rem] text-[#191919]">{c.name}</div>
                  <div className="font-mono text-xs text-[#666666] mt-[2px]">{c.hex}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-[Instrument_Sans,sans-serif] text-[1.5rem] font-bold text-[#191919] tracking-[-0.02em] mb-4">
            Product Screenshots
          </h2>
          <p className="font-[Instrument_Sans,sans-serif] text-[0.9rem] text-[#666666] mb-5">
            Screenshots are available in <code className="bg-[#F3F4F6] px-[6px] py-[2px] rounded text-[0.85rem]">public/screenshots/</code>. Contact{' '}
            <a href="mailto:press@churnrecovery.com" className="text-[#D97757]">press@churnrecovery.com</a> for high-resolution assets.
          </p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
            {[
              'dashboard-overview.png',
              'cancel-flow-demo.png',
              'analytics-view.png',
              'offer-builder.png',
            ].map(file => (
              <div key={file} className="border border-[#E5E5E5] rounded-lg bg-white p-4 flex items-center gap-[10px]">
                <span className="text-[1.4rem]">🖼</span>
                <div>
                  <div className="font-mono text-xs text-[#191919]">{file}</div>
                  <a href={`/screenshots/${file}`} className="font-[Instrument_Sans,sans-serif] text-xs text-[#D97757] no-underline">
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured in (placeholder) */}
        <section className="bg-white border-y border-[#E5E5E5] px-6 py-16">
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-[Instrument_Sans,sans-serif] text-[1.5rem] font-bold text-[#191919] tracking-[-0.02em] mb-4">
              Featured In
            </h2>
            <p className="font-[Instrument_Sans,sans-serif] text-[0.9rem] text-[#999999] italic">
              [Feature mentions and press coverage will appear here. Contact press@churnrecovery.com to discuss coverage.]
            </p>
            {/* Placeholder slots */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-dashed border-[#E5E5E5] rounded-lg px-6 py-4 text-[#999999] font-[Instrument_Sans,sans-serif] text-[0.85rem]">
                  [Publication {i}]
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-6 py-20 text-center bg-[#191919]">
          <h2 className="font-[Instrument_Sans,sans-serif] font-bold text-white tracking-[-0.03em] m-0 mb-4 text-[clamp(1.5rem,4vw,2rem)]">
            Writing about ChurnRecovery?
          </h2>
          <p className="font-[Merriweather,serif] text-base text-[rgba(255,255,255,0.7)] m-0 mb-8 max-w-[460px] mx-auto leading-[1.7]">
            We're happy to do interviews, provide quotes, and share more detailed product information. Response time is typically under 24 hours.
          </p>
          <a href="mailto:press@churnrecovery.com" className="inline-block bg-[#D97757] text-white px-8 py-[14px] rounded-lg font-[Instrument_Sans,sans-serif] font-bold text-base no-underline">
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
