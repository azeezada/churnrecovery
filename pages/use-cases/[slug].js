import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WaitlistForm from '../../components/WaitlistForm'
import { useCases, getUseCaseBySlug, getAllUseCaseSlugs } from '../../lib/use-cases'

export async function getStaticPaths() {
  const slugs = getAllUseCaseSlugs()
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const useCase = getUseCaseBySlug(params.slug)
  if (!useCase) return { notFound: true }
  const others = useCases.filter(uc => uc.slug !== params.slug).slice(0, 3)
  return { props: { useCase, others } }
}

export default function UseCaseDetailPage({ useCase, others }) {
  return (
    <>
      <Head>
        <title>{useCase.title} — ChurnRecovery Use Cases</title>
        <meta name="description" content={`ChurnRecovery for ${useCase.title}: ${useCase.subtitle}. ${useCase.heroStat} ${useCase.heroLabel}. See cancel flow strategies, typical save rates, and code examples.`} />
        <meta property="og:title" content={`${useCase.title} Churn Recovery — ChurnRecovery`} />
        <meta property="og:description" content={`${useCase.subtitle}. Avg save rate: ${useCase.metrics[0].value}. Free to use.`} />
        <meta property="og:url" content={`https://churnrecovery.com/use-cases/${useCase.slug}`} />
        <meta property="og:image" content="https://churnrecovery.com/og/use-cases.svg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main className="bg-brand-bg min-h-screen">

        {/* Hero */}
        <section className="max-w-[760px] mx-auto pt-[60px] pb-12 px-6">
          <Link href="/use-cases" className="inline-flex items-center gap-[6px] font-sans text-[0.82rem] text-brand-gray-light no-underline mb-8">
            ← All use cases
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[3rem]">{useCase.icon}</span>
            <div>
              <div className="font-sans font-extrabold text-[clamp(1.6rem,4vw,2.5rem)] text-brand-text tracking-[-0.03em] leading-[1.1]">
                {useCase.title}
              </div>
              <div className="font-serif text-base text-brand-gray mt-[6px]">
                {useCase.subtitle}
              </div>
            </div>
          </div>
          <div
            className="rounded-xl py-5 px-6 flex items-center gap-4 mb-6"
            style={{ background: useCase.colorBg }}
          >
            <span className="font-sans font-extrabold text-[2.5rem]" style={{ color: useCase.color }}>
              {useCase.heroStat}
            </span>
            <span className="font-serif text-base leading-[1.6]" style={{ color: useCase.color }}>
              {useCase.heroLabel}
            </span>
          </div>
          <p className="font-serif text-base text-brand-gray leading-[1.8] m-0">
            {useCase.description}
          </p>
        </section>

        {/* Key metrics */}
        <section className="max-w-[760px] mx-auto px-6 pb-12">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
            {useCase.metrics.map((m, i) => (
              <div key={i} className="bg-brand-white border border-brand-border rounded-[10px] p-5 text-center">
                <div className="font-sans font-extrabold text-[1.5rem] mb-1" style={{ color: useCase.color }}>
                  {m.value}
                </div>
                <div className="font-serif text-[0.78rem] text-brand-gray-light">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="bg-brand-white border-t border-b border-brand-border py-12 px-6">
          <div className="max-w-[760px] mx-auto">
            <h2 className="font-sans font-bold text-[1.3rem] text-brand-text mt-0 mb-6 tracking-[-0.02em]">
              The {useCase.title} churn challenge
            </h2>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {useCase.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-3 font-serif text-[0.95rem] text-brand-gray leading-[1.7]">
                  <span className="text-[#DC2626] mt-[3px] shrink-0">✗</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Solutions */}
        <section className="max-w-[760px] mx-auto py-12 px-6">
          <h2 className="font-sans font-bold text-[1.3rem] text-brand-text mt-0 mb-6 tracking-[-0.02em]">
            How ChurnRecovery handles it
          </h2>
          <div className="flex flex-col gap-4">
            {useCase.solutions.map((s, i) => (
              <div key={i} className="bg-brand-white border border-brand-border rounded-[10px] py-5 px-6 flex gap-4 items-start">
                <span className="text-[1.8rem] shrink-0">{s.icon}</span>
                <div>
                  <div className="font-sans font-semibold text-[0.85rem] text-[#DC2626] mb-[6px]">
                    Problem: {s.problem}
                  </div>
                  <div className="font-serif text-[0.95rem] text-brand-text leading-[1.6]">
                    <span className="font-semibold text-brand-green">→ </span>
                    {s.solution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section
          className="border-t border-b border-brand-border py-12 px-6"
          style={{ background: useCase.colorBg }}
        >
          <div className="max-w-[640px] mx-auto text-center">
            <div className="text-[2rem] mb-4" style={{ color: useCase.color }}>❝</div>
            <blockquote className="font-serif text-[1.1rem] text-brand-text leading-[1.8] mt-0 mb-4 italic">
              {useCase.quote.text}
            </blockquote>
            <div className="font-sans text-[0.82rem] font-semibold" style={{ color: useCase.color }}>
              — {useCase.quote.author}
            </div>
          </div>
        </section>

        {/* Code example */}
        <section className="max-w-[760px] mx-auto py-12 px-6">
          <h2 className="font-sans font-bold text-[1.3rem] text-brand-text mt-0 mb-4 tracking-[-0.02em]">
            Implementation example
          </h2>
          <p className="font-serif text-[0.9rem] text-brand-gray leading-[1.7] mt-0 mb-5">
            Get a cancel flow working in under 30 minutes:
          </p>
          <div className="bg-[#1A1A2E] rounded-[10px] p-6 overflow-auto">
            <pre className="m-0 font-mono text-[0.8rem] text-[#E2E8F0] leading-[1.7] whitespace-pre-wrap break-words">
              {useCase.codeExample}
            </pre>
          </div>
          <div className="mt-4 flex gap-3 flex-wrap">
            <Link href="/docs" className="font-sans text-[0.85rem] text-brand-accent no-underline font-semibold">
              Full documentation →
            </Link>
            <Link href="/integrations" className="font-sans text-[0.85rem] text-brand-gray-light no-underline">
              See integrations
            </Link>
          </div>
        </section>

        {/* Other use cases */}
        {others.length > 0 && (
          <section className="border-t border-brand-border py-12 px-6">
            <div className="max-w-[760px] mx-auto">
              <h2 className="font-sans font-bold text-[1.1rem] text-brand-text mt-0 mb-5 tracking-[-0.02em]">
                Other verticals
              </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                {others.map(uc => (
                  <Link key={uc.slug} href={`/use-cases/${uc.slug}`} className="bg-brand-white border border-brand-border rounded-lg p-4 no-underline flex items-center gap-3">
                    <span className="text-[1.3rem]">{uc.icon}</span>
                    <div>
                      <div className="font-sans font-semibold text-[0.85rem] text-brand-text">{uc.title}</div>
                      <div className="font-sans font-bold text-[0.78rem]" style={{ color: uc.color }}>{uc.metrics[0].value} saved</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-brand-text py-16 px-6">
          <div className="max-w-[480px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[1.8rem] text-brand-white mt-0 mb-3 tracking-[-0.03em]">
              Ready to recover {useCase.title} churn?
            </h2>
            <p className="font-serif text-[0.95rem] text-white/65 leading-[1.7] mt-0 mb-7">
              Free to use. No contracts. Set up in under 30 minutes.
            </p>
            <WaitlistForm source={`use-case-${useCase.slug}`} />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
