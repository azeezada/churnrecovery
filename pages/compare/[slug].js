import Head from 'next/head'
import Link from 'next/link'
import { getCompetitor, getAllCompetitorSlugs, featureLabels, getFeatureValue } from '../../lib/comparisons'

function FeatureRow({ label, crValue, themValue }) {
  const cr = getFeatureValue(crValue)
  const them = getFeatureValue(themValue)

  const badge = (v) => {
    const colors = {
      yes: { bg: '#EDF7F1', color: '#2D7A4F' },
      no: { bg: '#FDECEA', color: '#C0392B' },
      partial: { bg: '#FEF9EC', color: '#856404' },
    }
    const s = colors[v.type] || colors.partial
    return (
      <span className="inline-block px-[10px] py-[3px] rounded-[20px] text-[0.82rem] font-semibold font-[Instrument_Sans,sans-serif]" style={{ background: s.bg, color: s.color }}>
        {v.type === 'yes' ? '✓ ' : v.type === 'no' ? '✗ ' : '~ '}{v.label}
      </span>
    )
  }

  return (
    <tr className="border-b border-[#E5E5E5]">
      <td className="px-5 py-[14px] font-[Instrument_Sans,sans-serif] text-[0.9rem] text-[#191919] font-medium">{label}</td>
      <td className="px-5 py-[14px] text-center">{badge(cr)}</td>
      <td className="px-5 py-[14px] text-center">{badge(them)}</td>
    </tr>
  )
}

export default function ComparePage({ competitor }) {
  if (!competitor) return null

  const title = `ChurnRecovery vs ${competitor.name}: Honest Comparison (2025)`
  const description = `How does ChurnRecovery compare to ${competitor.name}? Feature-by-feature breakdown covering pricing, cancel flows, integrations, and developer experience.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://churnrecovery.com/compare/${competitor.slug}`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://churnrecovery.com/compare/${competitor.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: title,
              description,
              url: `https://churnrecovery.com/compare/${competitor.slug}`,
              publisher: {
                '@type': 'Organization',
                name: 'ChurnRecovery',
                url: 'https://churnrecovery.com',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `Is ChurnRecovery better than ${competitor.name}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `ChurnRecovery and ${competitor.name} both offer churn prevention features including cancel flows and payment failure recovery. The key difference is pricing: ChurnRecovery is free to start with no per-MRR fees, while ${competitor.name} ${competitor.pricing ? `starts at ${competitor.pricing.label}` : 'charges based on your MRR'}. For small subscription businesses (newsletters, online courses, membership sites), ChurnRecovery is typically the better fit. See the full feature comparison above.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What does ${competitor.name} cost compared to ChurnRecovery?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${competitor.name} ${competitor.pricing ? `is priced at ${competitor.pricing.label}${competitor.pricing.notes ? '. ' + competitor.pricing.notes : ''}` : 'uses MRR-based pricing that scales with your revenue'}. ChurnRecovery is free — no trial period, no per-MRR fee, no feature gates on the core product (cancel flows, payment failure recovery, analytics). Premium features like A/B testing and advanced reporting are planned as optional paid upgrades.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `Does ChurnRecovery have a free tier unlike ${competitor.name}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Yes. ChurnRecovery's core product is free with no limits on subscribers, cancel flows, or payment recovery emails. ${competitor.name} ${competitor.features && competitor.features.freeTier && !competitor.features.freeTier.them ? 'does not offer a free tier' : 'offers limited free access'}. ChurnRecovery is built for subscription businesses of all sizes — from 50-subscriber newsletters to established membership sites.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `Can ChurnRecovery replace ${competitor.name}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `For most small subscription businesses, yes. ChurnRecovery covers the core use cases: customizable cancel flows with pause, discount, and downgrade offers; automated payment failure recovery emails; and a churn analytics dashboard. If you need enterprise features like white-label portals, dedicated account management, or deep CRM integrations, ${competitor.name} may be a better fit. If you need core churn recovery without enterprise pricing, ChurnRecovery is the better option.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How quickly can I switch from my current tool to ChurnRecovery?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Setup takes 10–15 minutes. Connect your Stripe account, customize your cancel flow offers, and turn on payment failure recovery emails. ChurnRecovery works with any Stripe-powered subscription — no code changes required on your existing setup.',
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <div className="bg-[#FAF9F5] min-h-screen font-[Instrument_Sans,sans-serif]">
        {/* Nav */}
        <nav className="border-b border-[#E5E5E5] bg-white px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
          <Link href="/" className="font-[Instrument_Sans,sans-serif] font-bold text-[1.1rem] text-[#191919] no-underline tracking-[-0.01em]">
            ChurnRecovery
          </Link>
          <div className="compare-nav-links flex gap-6 items-center flex-wrap">
            <Link href="/blog" className="compare-nav-text text-[#666666] no-underline text-[0.9rem]">Blog</Link>
            <a href="/app/sign-up" className="bg-[#D97757] text-white px-[18px] py-2 rounded-[6px] no-underline text-[0.85rem] font-semibold whitespace-nowrap">Get Started Free</a>
          </div>
        </nav>
        <style>{`
          @media (max-width: 640px) {
            .compare-nav-text { display: none !important; }
            .compare-nav-links { gap: 8px !important; }
          }
          /* P1: Verdict cards stack on mobile */
          @media (max-width: 480px) {
            .compare-verdict-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Breadcrumb */}
        <div className="max-w-[800px] mx-auto px-6 pt-5">
          <div className="text-[0.8rem] text-[#666666] font-[Instrument_Sans,sans-serif]">
            <Link href="/" className="text-[#666666] no-underline">Home</Link>
            {' → '}
            <span>Compare</span>
            {' → '}
            <span className="text-[#191919]">vs {competitor.name}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-[800px] mx-auto px-6 pt-12 pb-10">
          <div className="inline-block bg-[#F0EBE5] text-[#D97757] px-3 py-1 rounded text-xs font-bold uppercase tracking-[0.08em] mb-5">
            Comparison
          </div>
          <h1 className="font-[Instrument_Sans,sans-serif] font-bold text-[#191919] leading-[1.2] tracking-[-0.03em] m-0 mb-5 text-[clamp(1.8rem,5vw,2.8rem)]">
            ChurnRecovery vs {competitor.name}
          </h1>
          <p className="font-[Merriweather,serif] text-[1.1rem] text-[#666666] leading-[1.7] m-0 mb-10 max-w-[620px]">
            {description}
          </p>

          {/* Quick verdict cards */}
          <div className="compare-verdict-grid grid grid-cols-2 gap-4 mb-12">
            {/* ChurnRecovery */}
            <div className="border-2 border-[#D97757] rounded-xl p-6 bg-white">
              <div className="font-[Instrument_Sans,sans-serif] font-bold text-base text-[#191919] mb-1">ChurnRecovery</div>
              <div className="font-[Instrument_Sans,sans-serif] text-[0.82rem] text-[#D97757] font-bold mb-3">FREE — Always</div>
              <ul className="list-none p-0 m-0">
                {['Cancel flows', 'Failed payment recovery', 'Open source', 'Developer API', 'A/B testing'].map(item => (
                  <li key={item} className="font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#2D7A4F] py-[3px] flex items-center gap-[6px]">
                    <span>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Competitor */}
            <div className="border border-[#E5E5E5] rounded-xl p-6 bg-white">
              <div className="font-[Instrument_Sans,sans-serif] font-bold text-base text-[#191919] mb-1">{competitor.name}</div>
              <div className="font-[Instrument_Sans,sans-serif] text-[0.82rem] text-[#666666] font-semibold mb-3">{competitor.pricing.label}</div>
              <ul className="list-none p-0 m-0">
                {competitor.strengths.slice(0, 3).map(item => (
                  <li key={item} className="font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#666666] py-[3px] flex items-center gap-[6px]">
                    <span className="text-[#999999]">•</span> {item}
                  </li>
                ))}
                {competitor.weaknesses.slice(0, 2).map(item => (
                  <li key={item} className="font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#C0392B] py-[3px] flex items-center gap-[6px]">
                    <span>✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Feature Matrix */}
        <section className="max-w-[800px] mx-auto px-6 pb-12">
          <h2 className="font-[Instrument_Sans,sans-serif] text-[1.4rem] font-bold text-[#191919] tracking-[-0.02em] mb-6">Feature Comparison</h2>

          <div className="border border-[#E5E5E5] rounded-xl overflow-hidden overflow-x-auto [-webkit-overflow-scrolling:touch] bg-white">
            <table className="w-full min-w-[500px] border-collapse">
              <thead>
                <tr className="bg-[#F5F4F0] border-b-2 border-[#E5E5E5]">
                  <th className="px-5 py-[14px] text-left font-[Instrument_Sans,sans-serif] text-[0.8rem] font-bold text-[#666666] uppercase tracking-[0.05em] w-[40%]">Feature</th>
                  <th className="px-5 py-[14px] text-center font-[Instrument_Sans,sans-serif] text-[0.8rem] font-bold text-[#D97757] uppercase tracking-[0.05em] w-[30%]">ChurnRecovery</th>
                  <th className="px-5 py-[14px] text-center font-[Instrument_Sans,sans-serif] text-[0.8rem] font-bold text-[#666666] uppercase tracking-[0.05em] w-[30%]">{competitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(competitor.features).map(([key, values]) => (
                  <FeatureRow
                    key={key}
                    label={featureLabels[key] || key}
                    crValue={values.churnrecovery}
                    themValue={values.them}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing section */}
        <section className="bg-white border-y border-[#E5E5E5] px-6 py-12 mb-12">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-[Instrument_Sans,sans-serif] text-[1.4rem] font-bold text-[#191919] tracking-[-0.02em] mb-2">Pricing</h2>
            <p className="font-[Merriweather,serif] text-[0.95rem] text-[#666666] mb-8 leading-[1.7]">
              The most honest comparison we can make. {competitor.pricing.notes}
            </p>

            <div className="grid grid-cols-2 gap-5">
              <div className="border-2 border-[#D97757] rounded-xl p-7 bg-[#FDF8F5]">
                <div className="font-[Instrument_Sans,sans-serif] font-bold text-[1.1rem] text-[#191919] mb-2">
                  ChurnRecovery
                </div>
                <div className="font-[Instrument_Sans,sans-serif] text-[2.5rem] font-extrabold text-[#D97757] tracking-[-0.04em] leading-none mb-2">
                  $0
                </div>
                <div className="font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#666666] mb-4">
                  Forever. No credit card required.
                </div>
                <div className="font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#2D7A4F] font-semibold">
                  ✓ Full feature access on free tier
                </div>
              </div>

              <div className="border border-[#E5E5E5] rounded-xl p-7 bg-white">
                <div className="font-[Instrument_Sans,sans-serif] font-bold text-[1.1rem] text-[#191919] mb-2">
                  {competitor.name}
                </div>
                <div className="font-[Instrument_Sans,sans-serif] text-[2.5rem] font-extrabold text-[#191919] tracking-[-0.04em] leading-none mb-2">
                  {competitor.pricing.entry > 0 ? `$${competitor.pricing.entry}` : competitor.pricing.label}
                </div>
                <div className="font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#666666] mb-4">
                  {competitor.pricing.entry > 0 ? 'per month, entry plan' : 'Pricing varies'}
                </div>
                <div className="font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#C0392B] font-semibold">
                  ✗ No free tier
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the competitor */}
        <section className="max-w-[800px] mx-auto px-6 pb-12">
          <h2 className="font-[Instrument_Sans,sans-serif] text-[1.4rem] font-bold text-[#191919] tracking-[-0.02em] mb-4">About {competitor.name}</h2>
          <p className="font-[Merriweather,serif] text-base text-[#191919] leading-[1.8] mb-8">
            {competitor.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div>
              <h3 className="font-[Instrument_Sans,sans-serif] text-[0.95rem] font-bold text-[#191919] mb-3">
                {competitor.name} Strengths
              </h3>
              <ul className="list-none p-0 m-0">
                {competitor.strengths.map(s => (
                  <li key={s} className="font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#191919] py-[5px] border-b border-[#E5E5E5] flex items-start gap-2">
                    <span className="text-[#2D7A4F] font-bold shrink-0">+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-[Instrument_Sans,sans-serif] text-[0.95rem] font-bold text-[#191919] mb-3">
                {competitor.name} Weaknesses
              </h3>
              <ul className="list-none p-0 m-0">
                {competitor.weaknesses.map(w => (
                  <li key={w} className="font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#191919] py-[5px] border-b border-[#E5E5E5] flex items-start gap-2">
                    <span className="text-[#C0392B] font-bold shrink-0">−</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verdict */}
          <div className="bg-[#FDF8F5] border border-[#D97757] border-l-4 rounded-lg p-6 mb-12">
            <div className="font-[Instrument_Sans,sans-serif] text-xs font-bold uppercase tracking-[0.08em] text-[#D97757] mb-2">Our Honest Verdict</div>
            <p className="font-[Merriweather,serif] text-base text-[#191919] leading-[1.7] m-0">
              {competitor.verdict}
            </p>
          </div>
        </section>

        {/* More comparisons */}
        <section className="bg-white border-t border-[#E5E5E5] px-6 py-12">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-[Instrument_Sans,sans-serif] text-[1.2rem] font-bold text-[#191919] tracking-[-0.02em] mb-6">More Comparisons</h2>
            <div className="flex flex-wrap gap-3">
              {['churnkey', 'profitwell', 'churnbuster', 'stunning', 'baremetrics', 'raaft', 'recurly', 'zuora', 'brightback', 'paddle-retain', 'stripe-billing']
                .filter(slug => slug !== competitor.slug)
                .map(slug => {
                  const names = {
                    churnkey: 'Churnkey',
                    profitwell: 'ProfitWell Retain',
                    churnbuster: 'Churn Buster',
                    stunning: 'Stunning',
                    baremetrics: 'Baremetrics',
                    raaft: 'Raaft',
                    recurly: 'Recurly Retain',
                    zuora: 'Zuora',
                    brightback: 'Brightback (Chargebee)',
                    'paddle-retain': 'Paddle Retain',
                    'stripe-billing': 'Stripe Billing',
                  }
                  return (
                    <Link key={slug} href={`/compare/${slug}`} className="inline-block px-4 py-2 border border-[#E5E5E5] rounded-[6px] font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#191919] no-underline font-medium">
                      vs {names[slug]}
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#191919] px-6 py-20 text-center">
          <h2 className="font-[Instrument_Sans,sans-serif] font-bold text-white tracking-[-0.03em] m-0 mb-4 text-[clamp(1.5rem,4vw,2.2rem)]">
            Stop paying for churn recovery.
          </h2>
          <p className="font-[Merriweather,serif] text-base text-[rgba(255,255,255,0.7)] m-0 mb-8 max-w-[460px] mx-auto leading-[1.7]">
            ChurnRecovery gives you everything {competitor.name} charges for — at zero cost. Start for free today.
          </p>
          <a href="/app/sign-up" className="inline-block bg-[#D97757] text-white px-8 py-[14px] rounded-lg font-[Instrument_Sans,sans-serif] font-bold text-base no-underline tracking-[-0.01em]">
            Get Started Free →
          </a>
        </section>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getAllCompetitorSlugs()
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const competitor = getCompetitor(params.slug)
  if (!competitor) return { notFound: true }
  return { props: { competitor } }
}
