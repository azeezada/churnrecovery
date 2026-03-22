import Head from 'next/head'
import Link from 'next/link'
import { getCompetitor, getAllCompetitorSlugs } from '../../lib/comparisons'

const churnRecoveryFeatures = [
  {
    icon: '🎯',
    title: 'Smart Cancel Flows',
    description: 'Present the right offer at the right moment. Discount, pause, or downgrade — dynamically based on what the customer actually said.',
  },
  {
    icon: '💳',
    title: 'Involuntary Churn Recovery',
    description: 'Automatically retry failed payments with smart scheduling. Recover 30-60% of churned revenue you would have written off.',
  },
  {
    icon: '🔬',
    title: 'A/B Testing Built-In',
    description: 'Test different cancel flow variants, offers, and messaging. Let data drive your retention strategy.',
  },
  {
    icon: '🛠',
    title: 'Developer API',
    description: 'Full REST API. Integrate in an afternoon. Works with Stripe, Paddle, Braintree, and custom billing setups.',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'See exactly what is happening. Save rate by segment, revenue saved over time, offer performance.',
  },
  {
    icon: '🔓',
    title: 'Open Source',
    description: 'Audit the logic, self-host if you want, contribute improvements. No black boxes.',
  },
]

function FeatureCard({ icon, title, description }) {
  return (
    <div className="border border-brand-border rounded-[10px] p-6 bg-brand-white">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-sans text-[0.95rem] font-bold text-brand-text mb-2 tracking-[-0.01em]">{title}</h3>
      <p className="font-serif text-[0.85rem] text-brand-gray leading-[1.7] m-0">{description}</p>
    </div>
  )
}

export default function AlternativePage({ competitor }) {
  if (!competitor) return null

  const title = `Best ${competitor.name} Alternative in 2025 — ChurnRecovery`
  const description = `Looking for a ${competitor.name} alternative? ChurnRecovery offers cancel flows, failed payment recovery, A/B testing, and a developer API — completely free.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://churnrecovery.com/alternatives/${competitor.slug}`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://churnrecovery.com/alternatives/${competitor.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: title,
              description,
              url: `https://churnrecovery.com/alternatives/${competitor.slug}`,
              publisher: {
                '@type': 'Organization',
                name: 'ChurnRecovery',
                url: 'https://churnrecovery.com',
              },
            }),
          }}
        />
      </Head>

      <div className="bg-brand-bg min-h-screen font-sans">
        {/* Nav */}
        <nav className="border-b border-brand-border bg-brand-white px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
          <Link href="/" className="font-sans font-bold text-[1.1rem] text-brand-text no-underline tracking-[-0.01em]">
            ChurnRecovery
          </Link>
          <div className="nav-links flex gap-6 items-center">
            <Link href="/blog" className="text-brand-gray no-underline text-[0.9rem]">Blog</Link>
            <Link href={`/compare/${competitor.slug}`} className="text-brand-gray no-underline text-[0.9rem]">
              Full Comparison →
            </Link>
            <a href="/app/sign-up" className="bg-brand-accent text-brand-white px-[18px] py-2 rounded-[6px] no-underline text-[0.85rem] font-semibold">Get Started Free</a>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-[860px] mx-auto pt-5 px-6">
          <div className="text-[0.8rem] text-brand-gray font-sans">
            <Link href="/" className="text-brand-gray no-underline">Home</Link>
            {' → '}
            <span>Alternatives</span>
            {' → '}
            <span className="text-brand-text">{competitor.name} Alternative</span>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-[860px] mx-auto px-6 pt-12 pb-14">
          <div className="inline-flex items-center gap-2 bg-[#F0EBE5] px-[14px] py-[6px] rounded-[20px] mb-6">
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-brand-accent">
              {competitor.name} Alternative
            </span>
          </div>

          <h1 className="font-sans font-extrabold text-brand-text leading-[1.15] tracking-[-0.04em] mb-6 max-w-[720px] text-[clamp(2rem,5.5vw,3.2rem)]">
            The free alternative to {competitor.name} your SaaS has been waiting for
          </h1>

          <p className="font-serif text-[1.15rem] text-brand-gray leading-[1.7] max-w-[600px] mb-10">
            {competitor.name} starts at {competitor.pricing.label}. ChurnRecovery gives you every feature you need to reduce churn — cancel flows, dunning, A/B testing, analytics — completely free.
          </p>

          <div className="flex gap-4 flex-wrap mb-10">
            <a href="/app/sign-up" className="inline-block bg-brand-accent text-brand-white px-7 py-[14px] rounded-lg font-sans font-bold text-base no-underline tracking-[-0.01em]">
              Get Started Free →
            </a>
            <Link href={`/compare/${competitor.slug}`} className="inline-block bg-transparent text-brand-text px-7 py-[14px] rounded-lg font-sans font-semibold text-base no-underline border border-brand-border">
              See Full Comparison →
            </Link>
          </div>

          {/* Social proof bar */}
          <div className="flex gap-8 flex-wrap pt-8 border-t border-brand-border">
            {[
              { stat: '$0/mo', label: 'Forever free' },
              { stat: '< 1 day', label: 'Integration time' },
              { stat: '100%', label: 'Revenue kept' },
              { stat: 'Open source', label: 'Full transparency' },
            ].map(item => (
              <div key={item.stat}>
                <div className="font-sans font-bold text-[1.1rem] text-brand-text tracking-[-0.02em]">
                  {item.stat}
                </div>
                <div className="font-sans text-[0.8rem] text-brand-gray-light uppercase tracking-[0.04em] mt-[2px]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why switch section */}
        <section className="bg-brand-white border-y border-brand-border py-14 px-6">
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-sans text-[1.6rem] font-bold text-brand-text tracking-[-0.03em] mb-2">
              Why teams switch from {competitor.name}
            </h2>
            <p className="font-serif text-[0.95rem] text-brand-gray mb-8 leading-[1.7]">
              These are the most common reasons SaaS founders look for a {competitor.name} alternative.
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
              {competitor.weaknesses.map((w, i) => (
                <div key={i} className="p-5 bg-[#FDF8F5] rounded-lg border border-[#F0E8E0] flex gap-3 items-start">
                  <span className="text-brand-accent font-bold text-base shrink-0 mt-[1px]">→</span>
                  <div>
                    <p className="font-sans text-[0.88rem] text-brand-text m-0 leading-[1.5] font-medium">{w}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-[860px] mx-auto py-14 px-6">
          <h2 className="font-sans text-[1.6rem] font-bold text-brand-text tracking-[-0.03em] mb-2">
            Everything you need. Nothing you don't.
          </h2>
          <p className="font-serif text-[0.95rem] text-brand-gray mb-8 leading-[1.7]">
            ChurnRecovery includes all the features that make cancel flows and churn recovery work.
          </p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {churnRecoveryFeatures.map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="bg-[#FDF8F5] border-y border-[#F0E8E0] py-14 px-6">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-sans text-[1.4rem] font-bold text-brand-text tracking-[-0.02em] mb-4">
              The bottom line
            </h2>
            <p className="font-serif text-[1.05rem] text-brand-text leading-[1.8] mb-0">
              {competitor.verdict}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-text py-20 px-6 text-center">
          <h2 className="font-sans font-bold text-brand-white tracking-[-0.03em] mb-4 text-[clamp(1.5rem,4vw,2.2rem)]">
            Ready to switch from {competitor.name}?
          </h2>
          <p className="font-serif text-base text-[rgba(255,255,255,0.7)] mb-8 max-w-[460px] mx-auto leading-[1.7]">
            Start using the churn recovery tool that doesn't cost you anything.
          </p>
          <a href="/app/sign-up" className="inline-block bg-brand-accent text-brand-white px-8 py-[14px] rounded-lg font-sans font-bold text-base no-underline tracking-[-0.01em]">
            Get Started Free →
          </a>
          <div className="mt-5">
            <Link href={`/compare/${competitor.slug}`} className="font-sans text-[0.85rem] text-[rgba(255,255,255,0.5)] no-underline">
              See the full comparison →
            </Link>
          </div>
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
