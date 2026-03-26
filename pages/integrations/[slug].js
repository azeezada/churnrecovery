import Head from 'next/head'
import Link from 'next/link'
import { getIntegration, getAllIntegrationSlugs } from '../../lib/integrations'

function CodeBlock({ code, language, title }) {
  return (
    <div className="mb-6 rounded-[10px] overflow-hidden border border-brand-border">
      {title && (
        <div className="bg-[#F0EFE9] px-4 py-[10px] flex items-center justify-between border-b border-brand-border">
          <span className="font-sans text-[0.82rem] font-semibold text-brand-gray">{title}</span>
          <span className="font-sans text-[0.72rem] text-brand-gray-light bg-brand-border px-2 py-[2px] rounded uppercase tracking-[0.05em]">{language}</span>
        </div>
      )}
      <pre className="bg-[#1A1A2E] m-0 p-5 overflow-x-auto font-mono text-[0.85rem] leading-[1.7] text-[#E8E8F0]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function IntegrationPage({ integration }) {
  if (!integration) return <div>Integration not found</div>

  return (
    <>
      <Head>
        <title>{integration.name} Integration — ChurnRecovery</title>
        <meta name="description" content={`Add cancel flows and payment recovery to your ${integration.name} billing in ${integration.setupTime}. 30-day free trial, then $20/month. Code snippets and full setup guide included.`} />
        <meta property="og:title" content={`${integration.name} Integration — ChurnRecovery`} />
        <meta property="og:description" content={`Cancel flows for ${integration.name} — $20/month. Setup in ${integration.setupTime}.`} />
        <meta property="og:image" content="https://churnrecovery.com/og/integrations.svg" />
        <meta property="og:url" content={`https://churnrecovery.com/integrations/${integration.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://churnrecovery.com/integrations/${integration.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              name: `${integration.name} Integration Guide — ChurnRecovery`,
              description: `How to integrate ChurnRecovery with ${integration.name} for cancel flows and payment recovery`,
              url: `https://churnrecovery.com/integrations/${integration.slug}`,
            })
          }}
        />
      </Head>

      <div className="bg-brand-bg min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-brand-border px-6 py-4">
          <div className="max-w-[1100px] mx-auto">
            <nav className="font-sans text-[0.85rem] text-brand-gray-light">
              <Link href="/" className="text-brand-gray-light no-underline">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/integrations" className="text-brand-gray-light no-underline">Integrations</Link>
              <span className="mx-2">›</span>
              <span className="text-brand-text font-semibold">{integration.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="border-b border-brand-border pt-[60px] pb-12 px-6">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-start gap-6 flex-wrap">
              <div
                className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-[2.2rem] shrink-0"
                style={{ background: integration.color + '18' }}
              >
                {integration.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="font-sans text-[clamp(1.8rem,4vw,2.4rem)] font-extrabold text-brand-text m-0">
                    ChurnRecovery + {integration.name}
                  </h1>
                </div>
                <p className="integration-description font-serif text-[1.1rem] text-brand-gray leading-[1.7] mt-0 mb-6 max-w-[700px]">
                  {integration.description}
                </p>
                {/* Quick stats */}
                <div className="integration-stats-bar flex gap-8 flex-wrap">
                  {[
                    { label: 'Setup time', value: integration.setupTime },
                    { label: 'Difficulty', value: integration.difficulty },
                    { label: 'Avg save rate', value: integration.stats.avgSaveRate, highlight: true },
                    { label: 'Price', value: '$20/mo' },
                  ].map(({ label, value, highlight }) => (
                    <div key={label}>
                      <div className="font-sans text-[0.72rem] text-brand-gray-light uppercase tracking-[0.07em] mb-1">{label}</div>
                      <div className={`font-sans text-[1.05rem] font-bold ${highlight ? 'text-brand-green' : 'text-brand-text'}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-[1100px] mx-auto py-12 px-6">
          <div className="integration-layout grid grid-cols-[1fr_320px] gap-12 items-start">
            {/* Left: main content */}
            <div>
              {/* Overview */}
              <section className="mb-12">
                <h2 className="font-sans text-[1.4rem] font-bold text-brand-text mt-0 mb-4">
                  Overview
                </h2>
                {integration.longDescription.split('\n\n').map((para, i) => (
                  <p key={i} className="font-serif text-base text-brand-gray leading-[1.8] mt-0 mb-4">{para}</p>
                ))}
              </section>

              {/* Features */}
              <section className="mb-12">
                <h2 className="font-sans text-[1.4rem] font-bold text-brand-text mt-0 mb-5">
                  What's included
                </h2>
                <div className="bg-brand-white border border-brand-border rounded-xl p-6">
                  <ul className="m-0 p-0 list-none">
                    {integration.features.map((feature, i) => (
                      <li key={i} className={`flex items-start gap-3 ${i > 0 ? 'pt-3 mt-3 border-t border-brand-border' : ''}`}>
                        <span className="text-brand-green font-bold text-base shrink-0 mt-[2px]">✓</span>
                        <span className="font-sans text-[0.95rem] text-brand-text leading-normal">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Use cases */}
              <section className="mb-12">
                <h2 className="font-sans text-[1.4rem] font-bold text-brand-text mt-0 mb-5">
                  Use cases
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
                  {integration.useCases.map((uc, i) => (
                    <div key={i} className="bg-brand-white border border-brand-border rounded-[10px] p-5">
                      <h3 className="font-sans text-[0.95rem] font-bold text-brand-text mt-0 mb-2">{uc.title}</h3>
                      <p className="font-serif text-[0.88rem] text-brand-gray leading-[1.6] m-0">{uc.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Code snippets */}
              <section className="mb-12">
                <h2 className="font-sans text-[1.4rem] font-bold text-brand-text mt-0 mb-2">
                  Code examples
                </h2>
                <p className="font-serif text-[0.95rem] text-brand-gray mt-0 mb-6 leading-[1.7]">
                  Real code for your {integration.name} integration. Copy and customize.
                </p>
                {integration.codeSnippets.map((snippet, i) => (
                  <CodeBlock key={i} {...snippet} />
                ))}
              </section>
            </div>

            {/* Right sidebar */}
            <div className="sticky top-6">
              {/* Setup steps */}
              <div className="bg-brand-white border border-brand-border rounded-xl p-6 mb-5">
                <h3 className="font-sans text-base font-bold text-brand-text mt-0 mb-4">Setup checklist</h3>
                <ol className="m-0 p-0 list-none">
                  {integration.setupSteps.map((step, i) => (
                    <li key={i} className={`flex items-start gap-3 ${i > 0 ? 'pt-3 mt-3 border-t border-brand-border' : ''}`}>
                      <span
                        className="w-[22px] h-[22px] rounded-full font-sans text-[0.75rem] font-extrabold flex items-center justify-center shrink-0 mt-[1px] text-brand-accent"
                        style={{ background: '#D9775718' }}
                      >{i + 1}</span>
                      <span className="font-sans text-[0.88rem] text-brand-text leading-normal">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* CTA card */}
              <div className="bg-brand-text rounded-xl p-6 mb-5 text-center">
                <div className="text-[2rem] mb-3">🚀</div>
                <h3 className="font-sans text-base font-bold text-brand-white mt-0 mb-2">Ready to get started?</h3>
                <p className="font-serif text-[0.88rem] text-white/70 mt-0 mb-4 leading-[1.6]">30-day free trial. $20/month after. Set up in {integration.setupTime}.</p>
                <Link href="/app/sign-up" className="block bg-brand-accent text-brand-white font-sans font-bold text-[0.9rem] py-3 px-5 rounded-lg no-underline text-center">
                  Start Free Trial →
                </Link>
              </div>

              {/* Other integrations */}
              <div className="bg-brand-white border border-brand-border rounded-xl p-5">
                <h3 className="font-sans text-[0.9rem] font-bold text-brand-text mt-0 mb-3">Other integrations</h3>
                {['stripe', 'paddle', 'braintree', 'chargebee', 'recurly', 'custom']
                  .filter(s => s !== integration.slug)
                  .slice(0, 4)
                  .map(slug => (
                    <Link key={slug} href={`/integrations/${slug}`} className="block font-sans text-[0.88rem] text-brand-accent no-underline py-[6px] border-b border-brand-border">
                      {slug.charAt(0).toUpperCase() + slug.slice(1)} integration →
                    </Link>
                  ))
                }
                <Link href="/integrations" className="block font-sans text-[0.85rem] text-brand-gray-light no-underline pt-2">
                  View all integrations →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-brand-green-light border-t border-[#C8EBD8] py-12 px-6 text-center">
          <div className="max-w-[600px] mx-auto">
            <h2 className="font-sans text-[1.6rem] font-bold text-brand-text mt-0 mb-3">
              Stop losing customers you could keep
            </h2>
            <p className="font-serif text-base text-brand-gray leading-[1.7] mt-0 mb-7">
              Most SaaS companies recover 20–30% of would-be churners with cancel flows.
              ChurnRecovery makes this affordable for {integration.name} users — $20/month, all features included.
            </p>
            <Link href="/app/sign-up" className="inline-block bg-brand-accent text-brand-white font-sans font-bold text-base py-[14px] px-8 rounded-lg no-underline">
              Start Free Trial →
            </Link>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 768px) {
            .integration-layout { grid-template-columns: 1fr !important; }
            .integration-stats-bar { flex-wrap: wrap; gap: 16px !important; }
            .integration-description { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
          }
        `}</style>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getAllIntegrationSlugs()
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const integration = getIntegration(params.slug)
  return {
    props: { integration: integration || null },
  }
}
