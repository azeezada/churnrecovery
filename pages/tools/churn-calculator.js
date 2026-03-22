import Head from 'next/head'
import Link from 'next/link'
import ChurnCalculator from '../../components/ChurnCalculator'

export default function ChurnCalculatorPage() {
  const title = 'SaaS Churn Revenue Calculator — How Much Are You Losing?'
  const description = 'Calculate how much revenue you\'re losing to churn every month. See how much ChurnRecovery could save you — for free. Takes 30 seconds.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://churnrecovery.com/tools/churn-calculator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://churnrecovery.com/tools/churn-calculator" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'SaaS Churn Revenue Calculator',
              description,
              url: 'https://churnrecovery.com/tools/churn-calculator',
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
            <Link href="/demo" className="text-brand-gray no-underline text-[0.9rem]">Demo</Link>
            <Link href="/blog" className="text-brand-gray no-underline text-[0.9rem]">Blog</Link>
            <a href="/app/sign-up" className="bg-brand-accent text-brand-white px-[18px] py-2 rounded-[6px] no-underline text-[0.85rem] font-semibold">Get Started Free</a>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-[760px] mx-auto pt-[60px] px-6 pb-12 text-center">
          <div className="inline-block bg-[#F0EBE5] text-brand-accent px-[14px] py-1 rounded text-[0.72rem] font-bold uppercase tracking-[0.08em] mb-5">
            Free Tool
          </div>
          <h1 className="font-sans text-[clamp(1.8rem,5vw,2.8rem)] font-extrabold text-brand-text tracking-[-0.04em] mb-4 leading-[1.15]">
            How much revenue are you losing to churn?
          </h1>
          <p className="font-serif text-[1.1rem] text-brand-gray leading-[1.7] max-w-[520px] mx-auto mb-12">
            Drag the sliders. See the real cost of churn — and how much you could recover with a cancel flow. Takes 30 seconds.
          </p>
        </section>

        {/* Calculator */}
        <section className="max-w-[760px] mx-auto px-6 pb-20">
          <ChurnCalculator />
        </section>

        {/* Context / explanation */}
        <section className="bg-brand-white border-t border-b border-brand-border py-[72px] px-6">
          <div className="max-w-[760px] mx-auto">
            <h2 className="font-sans text-[clamp(1.3rem,3vw,1.8rem)] font-bold text-brand-text tracking-[-0.03em] mb-12 text-center">
              Understanding your churn numbers
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
              {[
                {
                  stat: '5%',
                  label: 'Average B2B SaaS monthly churn',
                  body: 'Industry benchmark. If you\'re above this, you have a churn problem. Below 2% is excellent.',
                },
                {
                  stat: '25-45%',
                  label: 'Typical cancel flow save rate',
                  body: 'How many customers a well-implemented cancel flow retains. The right offer at the right moment makes the difference.',
                },
                {
                  stat: '5x',
                  label: 'Cost to acquire vs. retain',
                  body: 'It costs 5x more to acquire a new customer than retain an existing one. Every save is 5x more efficient than a new sale.',
                },
                {
                  stat: '80%',
                  label: 'Of churned customers who respond to offers',
                  body: 'Most customers who cancel aren\'t anti-your-product. They\'re price-sensitive, busy, or confused. The right offer brings them back.',
                },
              ].map(item => (
                <div key={item.stat} className="p-6 border border-brand-border rounded-[10px]">
                  <div className="font-sans font-extrabold text-[2rem] text-brand-accent tracking-[-0.04em] leading-none mb-2">
                    {item.stat}
                  </div>
                  <div className="font-sans text-[0.85rem] font-semibold text-brand-text mb-2 leading-[1.3]">
                    {item.label}
                  </div>
                  <p className="font-serif text-[0.82rem] text-brand-gray leading-[1.6] m-0">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-[760px] mx-auto py-[72px] px-6">
          <h2 className="font-sans text-[clamp(1.3rem,3vw,1.7rem)] font-bold text-brand-text tracking-[-0.03em] mb-10">
            Common questions about churn recovery
          </h2>
          <div className="flex flex-col gap-6">
            {[
              {
                q: 'Is a 30% save rate realistic?',
                a: 'Yes — and many companies do better. The key is matching the offer to the reason. A customer who says "it\'s too expensive" responds to a discount. One who says "I\'m not using it" needs a pause offer. ChurnRecovery handles this automatically based on the reason selected.',
              },
              {
                q: 'What counts as "recovered revenue"?',
                a: 'A customer who accepts your offer and stays subscribed. Whether that\'s a discounted plan, a paused account that later resumes, or a downgrade that prevents full cancellation — all of these preserve some MRR and keep the customer in your ecosystem.',
              },
              {
                q: 'How does ChurnRecovery compare to Churnkey at $250/mo?',
                a: 'On features, they\'re comparable — Churnkey is a solid product. The difference is cost. If you\'re recovering $500/mo in revenue, Churnkey takes half of it. ChurnRecovery keeps 100% in your pocket. At any MRR level, free wins.',
              },
              {
                q: 'What about involuntary churn (failed payments)?',
                a: 'The calculator focuses on voluntary churn. Involuntary churn (failed payments) adds another 20-40% on top of this — smart retry logic and dunning sequences can recover most of it. ChurnRecovery handles both.',
              },
            ].map(item => (
              <div key={item.q} className="border-b border-brand-border pb-6">
                <h3 className="font-sans text-[0.95rem] font-bold text-brand-text mb-[10px] tracking-[-0.01em]">
                  {item.q}
                </h3>
                <p className="font-serif text-[0.9rem] text-brand-gray leading-[1.7] m-0">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related resources */}
        <section className="bg-brand-white border-t border-brand-border py-16 px-6">
          <div className="max-w-[760px] mx-auto">
            <h2 className="font-sans text-[1.2rem] font-bold text-brand-text tracking-[-0.02em] mb-6">
              Dig deeper
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
              {[
                { href: '/demo', label: '→ Try the cancel flow demo' },
                { href: '/posts/Ultimate-Guide-SaaS-Churn', label: '→ Ultimate guide to SaaS churn' },
                { href: '/posts/Cancel-Flow-Examples', label: '→ Cancel flow examples' },
                { href: '/posts/Involuntary-Churn-Recovery', label: '→ Involuntary churn recovery' },
                { href: '/compare/churnkey', label: '→ ChurnRecovery vs Churnkey' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="block py-3 px-4 border border-brand-border rounded-lg font-sans text-[0.85rem] text-brand-text no-underline font-medium transition-colors duration-150">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-text py-20 px-6 text-center">
          <h2 className="font-sans text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-brand-white tracking-[-0.03em] mb-4">
            Stop watching revenue walk out the door.
          </h2>
          <p className="font-serif text-base text-[rgba(255,255,255,0.7)] mb-8 max-w-[460px] mx-auto leading-[1.7]">
            Get started free with ChurnRecovery — the free churn recovery platform built for SaaS founders.
          </p>
          <a href="/app/sign-up" className="inline-block bg-brand-accent text-brand-white px-8 py-[14px] rounded-lg font-sans font-bold text-base no-underline tracking-[-0.01em]">
            Get Started Free →
          </a>
        </section>
      </div>
    </>
  )
}
