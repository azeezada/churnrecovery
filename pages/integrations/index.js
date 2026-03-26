import Head from 'next/head'
import Link from 'next/link'
import { getAllIntegrations } from '../../lib/integrations'

const difficultyColor = {
  Easy: { bg: '#EDF7F1', color: '#2D7A4F' },
  Medium: { bg: '#FEF9EC', color: '#856404' },
  Advanced: { bg: '#FFF0EC', color: '#C4603D' },
}

export default function IntegrationsIndex() {
  const integrationList = getAllIntegrations()

  return (
    <>
      <Head>
        <title>Integrations — ChurnRecovery works with Stripe, Paddle, Braintree & more</title>
        <meta name="description" content="ChurnRecovery integrates natively with Stripe, Paddle, Braintree, Chargebee, Recurly, and any custom billing system. Cancel flows and payment recovery for every payment processor." />
        <meta property="og:title" content="Integrations — ChurnRecovery" />
        <meta property="og:description" content="Native integrations with every major payment processor. Set up cancel flows and payment recovery in minutes." />
        <meta property="og:image" content="https://churnrecovery.com/og/integrations.svg" />
        <meta property="og:url" content="https://churnrecovery.com/integrations" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://churnrecovery.com/integrations" />
      </Head>

      <div className="bg-brand-bg min-h-screen">
        {/* Hero */}
        <div className="border-b border-brand-border pt-20 pb-16 px-6 text-center">
          <div className="max-w-[720px] mx-auto">
            <div className="inline-block bg-brand-green-light text-brand-green font-sans text-[0.8rem] font-bold tracking-[0.08em] uppercase px-[14px] py-[6px] rounded-[20px] mb-6">
              Works with your stack
            </div>
            <h1 className="font-sans text-[clamp(2rem,5vw,3rem)] font-extrabold text-brand-text mt-0 mb-5 leading-[1.15]">
              Integrates with every major<br />payment processor
            </h1>
            <p className="font-serif text-[1.15rem] text-brand-gray leading-[1.7] mt-0 mb-9">
              Whether you're on Stripe, Paddle, Braintree, or a custom billing system,
              ChurnRecovery gives you cancel flows and payment recovery — $20/month with a 30-day free trial.
            </p>
            <div className="hero-ctas flex gap-3 justify-center flex-wrap">
              <Link href="/app/sign-up" className="inline-block bg-brand-accent text-brand-white font-sans font-bold text-[0.95rem] py-[14px] px-7 rounded-lg no-underline">
                Start Free Trial →
              </Link>
              <Link href="/docs" className="inline-block bg-transparent text-brand-text font-sans font-semibold text-[0.95rem] py-[14px] px-7 rounded-lg no-underline border border-brand-border">
                View docs
              </Link>
            </div>
          </div>
        </div>

        {/* Integration cards grid */}
        <div className="max-w-[1100px] mx-auto py-16 px-6">
          <h2 className="font-sans text-[1.4rem] font-bold text-brand-text mt-0 mb-2">All integrations</h2>
          <p className="font-serif text-base text-brand-gray mt-0 mb-10 leading-[1.6]">
            Click any integration to see code snippets, setup guides, and use cases.
          </p>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
            {integrationList.map((integration) => {
              const diff = difficultyColor[integration.difficulty] || difficultyColor.Medium
              return (
                <Link
                  key={integration.slug}
                  href={`/integrations/${integration.slug}`}
                  className="no-underline"
                >
                  <div className="bg-brand-white border border-brand-border rounded-xl p-7 transition-[box-shadow,border-color] duration-200 cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:border-brand-accent">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-[1.6rem] shrink-0"
                        style={{ background: integration.color + '18' }}
                      >
                        {integration.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-sans text-[1.1rem] font-bold text-brand-text m-0">{integration.name}</h3>
                          <span
                            className="font-sans text-[0.7rem] font-bold px-2 py-[2px] rounded-[10px] tracking-[0.03em]"
                            style={{ background: diff.bg, color: diff.color }}
                          >{integration.difficulty}</span>
                        </div>
                        <p className="font-sans text-[0.85rem] text-brand-gray-light m-0">{integration.tagline}</p>
                      </div>
                    </div>

                    <p className="font-serif text-[0.9rem] text-brand-gray leading-[1.65] mt-0 mb-5">
                      {integration.description.substring(0, 130)}…
                    </p>

                    {/* Stats row */}
                    <div className="flex gap-4 pt-4 border-t border-brand-border">
                      <div>
                        <div className="font-sans text-[0.7rem] text-brand-gray-light uppercase tracking-[0.06em] mb-[2px]">Setup</div>
                        <div className="font-sans text-[0.9rem] font-bold text-brand-text">{integration.setupTime}</div>
                      </div>
                      <div>
                        <div className="font-sans text-[0.7rem] text-brand-gray-light uppercase tracking-[0.06em] mb-[2px]">Avg save rate</div>
                        <div className="font-sans text-[0.9rem] font-bold text-brand-green">{integration.stats.avgSaveRate}</div>
                      </div>
                      <div className="ml-auto">
                        <span className="font-sans text-[0.85rem] font-semibold text-brand-accent">View guide →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* How it works section */}
          <div className="mt-20 p-12 bg-brand-white border border-brand-border rounded-2xl">
            <h2 className="font-sans text-[1.5rem] font-bold text-brand-text mt-0 mb-2 text-center">How ChurnRecovery integrates</h2>
            <p className="font-serif text-base text-brand-gray text-center mt-0 mb-10 leading-[1.7]">
              The same three-step pattern works across all payment processors.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
              {[
                { step: '01', title: 'Connect your processor', desc: 'Add your API keys and configure a webhook endpoint. Takes 5–45 minutes depending on the processor.' },
                { step: '02', title: 'Intercept cancellations', desc: 'When a customer triggers cancellation, ChurnRecovery shows a smart cancel flow with targeted offers before it\'s final.' },
                { step: '03', title: 'Recover revenue automatically', desc: 'Accepted offers are applied via the processor\'s API. Analytics track your save rate and revenue recovered.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#D9775718] text-brand-accent font-sans font-extrabold text-base flex items-center justify-center mx-auto mb-4">{step}</div>
                  <h3 className="font-sans text-[1.05rem] font-bold text-brand-text mt-0 mb-2">{title}</h3>
                  <p className="font-serif text-[0.9rem] text-brand-gray leading-[1.65] m-0">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center py-16 px-6 bg-brand-text rounded-2xl">
            <h2 className="font-sans text-[1.8rem] font-extrabold text-brand-white mt-0 mb-4">Start recovering revenue today</h2>
            <p className="font-serif text-[1.05rem] text-white/70 mt-0 mb-8 leading-[1.7]">
              Works with all major payment processors. 30-day free trial. $20/month after — no per-subscriber fees.
            </p>
            <Link href="/app/sign-up" className="inline-block bg-brand-accent text-brand-white font-sans font-bold text-base py-4 px-9 rounded-lg no-underline">
              Start Free Trial →
            </Link>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 640px) {
            .integrations-grid { grid-template-columns: 1fr !important; }
            .hero-ctas { flex-direction: column !important; align-items: stretch !important; width: 100%; max-width: 320px; margin: 0 auto; }
            .hero-ctas a { text-align: center; }
          }
        `}</style>
      </div>
    </>
  )
}
