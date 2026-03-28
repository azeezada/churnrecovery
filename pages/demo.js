import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import CancelFlowDemo from '../components/CancelFlowDemo'

function IntegrationSection() {
  const [tab, setTab] = useState('quick')
  return (
    <section className="bg-[#1A1A2E] py-[72px] px-6">
      <div className="max-w-[760px] mx-auto">
        <div className="mb-8 text-center">
          <h2 className="font-sans text-[clamp(1.3rem,3vw,1.8rem)] font-bold text-brand-white tracking-[-0.03em] mb-3">
            {tab === 'quick' ? 'Up and running in 5 minutes' : 'One line to add it to your app'}
          </h2>
          <p className="font-serif text-[0.95rem] text-white/55 leading-[1.7]">
            {tab === 'quick'
              ? 'No code required. Connect your payment provider and start saving customers.'
              : 'Drop in the snippet. Configure your offers. Watch the saves roll in.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setTab('quick')}
            className={`font-sans text-[0.85rem] font-semibold px-5 py-2.5 rounded-lg border transition-all duration-150 cursor-pointer ${
              tab === 'quick'
                ? 'bg-brand-accent text-white border-brand-accent'
                : 'bg-transparent text-white/50 border-white/15 hover:text-white/70 hover:border-white/25'
            }`}
          >
            Quick Setup
          </button>
          <button
            onClick={() => setTab('dev')}
            className={`font-sans text-[0.85rem] font-semibold px-5 py-2.5 rounded-lg border transition-all duration-150 cursor-pointer ${
              tab === 'dev'
                ? 'bg-brand-accent text-white border-brand-accent'
                : 'bg-transparent text-white/50 border-white/15 hover:text-white/70 hover:border-white/25'
            }`}
          >
            Developer
          </button>
        </div>

        {tab === 'quick' ? (
          /* Quick Setup — visual walkthrough */
          <div className="bg-[#0D0D1A] rounded-xl border border-white/10 p-8">
            <div className="flex flex-col gap-8">
              {[
                {
                  step: '1',
                  title: 'Sign up and connect Stripe',
                  desc: 'Create your account (no credit card needed) and authorize your Stripe account with one click. Takes 60 seconds.',
                },
                {
                  step: '2',
                  title: 'Customize your cancel flow',
                  desc: 'Use the visual flow builder to pick which offers to show: pause, discount, plan switch. Write the copy in your voice. Match your brand colors.',
                },
                {
                  step: '3',
                  title: 'Set up payment recovery',
                  desc: 'Turn on dunning emails with one toggle. We handle retry timing and send branded reminders when cards fail.',
                },
                {
                  step: '4',
                  title: 'Go live',
                  desc: 'Paste one embed script into your site. Works with WordPress, Kajabi, Teachable, Shopify, and any platform with custom code support.',
                },
              ].map(item => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center font-sans font-bold text-white text-[0.8rem] shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-sans text-[1rem] font-semibold text-white m-0 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[0.88rem] text-white/50 m-0 leading-[1.6]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
              <a href="/app/sign-up" className="inline-block bg-brand-accent text-white px-6 py-3 rounded-lg font-sans font-bold text-[0.9rem] no-underline">
                Start Free Trial →
              </a>
            </div>
          </div>
        ) : (
          /* Developer — code snippet */
          <>
            <div className="bg-[#0D0D1A] rounded-xl overflow-hidden overflow-x-auto [-webkit-overflow-scrolling:touch] border border-white/10 max-w-full">
              <div className="bg-white/5 px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.08]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] opacity-70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] opacity-70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] opacity-70" />
                </div>
                <span className="font-mono text-[0.75rem] text-white/30">
                  your-app.js
                </span>
              </div>
              <div className="p-6">
                <pre className="m-0 font-[Fira_Code,Cascadia_Code,Consolas,monospace] text-[0.82rem] leading-[1.7] text-[#E8E8E8] overflow-auto overflow-x-auto [-webkit-overflow-scrolling:touch] max-w-full">
{`// 1. Add the snippet to your cancel button handler
import { ChurnRecovery } from '@churnrecovery/js'

// 2. Initialize once
const cr = new ChurnRecovery({ apiKey: 'your_key' })

// 3. Intercept cancel attempts
cancelButton.addEventListener('click', async (e) => {
  e.preventDefault()

  const result = await cr.showCancelFlow({
    customerId: currentUser.id,
    planId: currentUser.plan,
  })

  if (result.action === 'saved') {
    // Customer accepted offer — apply it
    await applyOffer(result.offer)
  } else {
    // Customer canceled — reason is logged automatically
    await processCancel()
  }
})`}
                </pre>
              </div>
            </div>
            <p className="font-sans text-[0.82rem] text-white/35 text-center mt-5">
              Works with React, Vue, vanilla JS, and any backend. REST API + webhooks available.
            </p>
          </>
        )}
      </div>
    </section>
  )
}

export default function DemoPage() {
  const title = 'See ChurnRecovery in Action — Interactive Cancel Flow Demo'
  const description = 'Try a live cancel flow demo. See how ChurnRecovery presents the right offer at the right moment to save canceling customers — $20/month with a 30-day free trial.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://churnrecovery.com/demo" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://churnrecovery.com/demo" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: title,
              description,
              url: 'https://churnrecovery.com/demo',
              publisher: {
                '@type': 'Organization',
                name: 'ChurnRecovery',
                url: 'https://churnrecovery.com',
              },
            }),
          }}
        />
      </Head>

      <style>{`
        @media (max-width: 640px) {
          .demo-nav-text { display: none !important; }
          .demo-nav-links { gap: 8px !important; }
        }
      `}</style>

      <div className="bg-brand-bg min-h-screen font-sans">
        {/* Nav */}
        <nav className="border-b border-brand-border bg-brand-white px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
          <Link href="/" className="font-sans font-bold text-[1.1rem] text-brand-text no-underline tracking-[-0.01em]">
            ChurnRecovery
          </Link>
          <div className="demo-nav-links flex gap-6 items-center flex-wrap">
            <Link href="/blog" className="demo-nav-text text-brand-gray no-underline text-[0.9rem]">Blog</Link>
            <Link href="/compare/churnkey" className="demo-nav-text text-brand-gray no-underline text-[0.9rem]">Compare</Link>
            <a href="/app/sign-up" className="bg-brand-accent text-brand-white px-[18px] py-2 rounded-md no-underline text-[0.85rem] font-semibold whitespace-nowrap">Start Free Trial →</a>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-[900px] mx-auto px-6 pt-[60px] pb-12 text-center">
          <div className="inline-block bg-[#F0EBE5] text-brand-accent px-3.5 py-1 rounded-[4px] text-[0.72rem] font-bold uppercase tracking-[0.08em] mb-5">
            Interactive Demo
          </div>
          <h1 className="font-sans text-[clamp(1.8rem,5vw,2.8rem)] font-extrabold text-brand-text tracking-[-0.04em] mb-4 leading-[1.15]">
            See what your customers see when they try to cancel
          </h1>
          <p className="font-serif text-[1.1rem] text-brand-gray leading-[1.7] max-w-[580px] mx-auto mb-10">
            ChurnRecovery shows a cancel flow the moment a customer clicks "Cancel subscription." Click through the demo below — pick a reason and see the offer that fires.
          </p>

          {/* How it works bar */}
          <div className="flex justify-center gap-0 mb-12 flex-wrap">
            {[
              { step: '1', label: 'Customer clicks cancel' },
              { step: '2', label: 'Cancel flow appears' },
              { step: '3', label: 'Smart offer fires' },
              { step: '4', label: 'Save or log + analyze' },
            ].map((item, i) => (
              <div key={item.step} className="flex items-center">
                <div className="flex items-center gap-2 px-4 py-2 font-sans text-[0.82rem] text-brand-gray">
                  <div className="w-[22px] h-[22px] rounded-full bg-brand-accent text-brand-white flex items-center justify-center font-bold text-[0.72rem] shrink-0">
                    {item.step}
                  </div>
                  {item.label}
                </div>
                {i < 3 && (
                  <span className="text-brand-gray-light text-base">→</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Demo Widget */}
        <section className="px-6 pb-20">
          <CancelFlowDemo />
        </section>

        {/* What you get section */}
        <section className="bg-brand-white border-t border-b border-brand-border py-[72px] px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-sans text-[clamp(1.4rem,3.5vw,2rem)] font-bold text-brand-text tracking-[-0.03em] mb-3">
                What happens behind the scenes
              </h2>
              <p className="font-serif text-base text-brand-gray leading-[1.7] max-w-[520px] mx-auto">
                Every cancel attempt generates 12+ data points — reason, plan, tenure, offer shown, offer accepted — whether you save the customer or not.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
              {[
                {
                  icon: '🎯',
                  title: 'Reason-based offers',
                  body: 'The right offer fires based on the cancel reason. Price-sensitive? Discount. Churning from inactivity? Pause offer. Switching? Win-back deal.',
                },
                {
                  icon: '⚡',
                  title: 'Fires in milliseconds',
                  body: 'ChurnRecovery intercepts the cancel action in under 50ms — before it completes. Zero latency, no page redirect. Customers never leave your product to see the flow.',
                },
                {
                  icon: '📊',
                  title: 'Every click tracked',
                  body: 'Save rate, offer acceptance by reason, revenue recovered, time-to-cancel. Your analytics dashboard updates in real time.',
                },
                {
                  icon: '🔄',
                  title: 'A/B test everything',
                  body: 'Run multiple offer variants. Test discount amounts, copy, timing. Let the data decide what saves the most customers.',
                },
                {
                  icon: '🔗',
                  title: 'One line of code',
                  body: 'Integrate with a single JS snippet or API call. Works with Stripe, Paddle, Braintree, and custom billing. Up in an afternoon.',
                },
                {
                  icon: '🤖',
                  title: 'Win-back sequences',
                  body: 'Even when a customer cancels, ChurnRecovery queues a smart win-back email sequence for day 7, 14, and 30 post-cancellation.',
                },
              ].map(card => (
                <div key={card.title} className="border border-brand-border rounded-[10px] p-6 bg-brand-bg">
                  <div className="text-[1.4rem] mb-3">{card.icon}</div>
                  <h3 className="font-sans text-[0.95rem] font-bold text-brand-text tracking-[-0.01em] mb-2">
                    {card.title}
                  </h3>
                  <p className="font-serif text-[0.85rem] text-brand-gray leading-[1.7] m-0">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="max-w-[900px] mx-auto py-[72px] px-6">
          <div className="text-center mb-12">
            <h2 className="font-sans text-[clamp(1.4rem,3.5vw,2rem)] font-bold text-brand-text tracking-[-0.03em] mb-3">
              The numbers speak for themselves
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 text-center">
            {[
              { stat: 'Up to 30%', label: 'Save rate with targeted offers', color: 'text-brand-accent' },
              { stat: '$20/mo', label: '10–40x cheaper than alternatives', color: 'text-brand-green' },
              { stat: '< 1 day', label: 'Typical integration time', color: 'text-brand-text' },
              { stat: '2-5x', label: 'ROI vs doing nothing', color: 'text-brand-text' },
            ].map(item => (
              <div key={item.label} className="px-5 py-8 border border-brand-border rounded-xl bg-brand-white">
                <div className={`font-sans font-extrabold text-[2.2rem] ${item.color} tracking-[-0.04em] leading-none mb-2.5`}>
                  {item.stat}
                </div>
                <div className="font-sans text-[0.82rem] text-brand-gray leading-normal">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Integration — tabbed: Quick Setup vs Developer */}
        <IntegrationSection />

        {/* CTA */}
        <section className="bg-brand-text py-20 px-6 text-center">
          <h2 className="font-sans text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-brand-white tracking-[-0.03em] mb-4">
            Ready to stop losing customers?
          </h2>
          <p className="font-serif text-base text-white/70 max-w-[460px] mx-auto mb-8 leading-[1.7]">
            Start recovering customers today. 30-day free trial, then $20/month. No credit card required.
          </p>
          <a href="/app/sign-up" className="inline-block bg-brand-accent text-brand-white px-8 py-3.5 rounded-lg font-sans font-bold text-base no-underline tracking-[-0.01em]">
            Start Free Trial →
          </a>
          <div className="mt-5">
            <Link href="/compare/churnkey" className="font-sans text-[0.85rem] text-white/40 no-underline">
              Compare with Churnkey →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
