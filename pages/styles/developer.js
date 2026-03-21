import Link from 'next/link'
import Head from 'next/head'

// Option A: Developer / Stripe-inspired dark theme

function CodeBlock({ children }) {
  return (
    <pre className="bg-[#1A1A2E] border border-[#2A2A2A] rounded-lg px-6 py-5 font-mono text-[0.85rem] text-[#A0A0A0] leading-[1.7] overflow-x-auto m-0">
      <code>{children}</code>
    </pre>
  )
}

function TerminalLine({ prompt, command, output }) {
  return (
    <div className="mb-1">
      <span className="text-[#00D4AA]">{prompt || '$'}</span>{' '}
      <span className="text-[#F5F5F5]">{command}</span>
      {output && <div className="text-[#A0A0A0] mt-0.5">{output}</div>}
    </div>
  )
}

function FeatureRow({ icon, title, desc }) {
  return (
    <div className="grid grid-cols-[48px_1fr] gap-4 items-start py-6 border-b border-[#2A2A2A]">
      <div className="w-12 h-12 rounded-[10px] bg-[#635BFF20] flex items-center justify-center text-[1.3rem]">{icon}</div>
      <div>
        <h3 className="font-sans text-base font-semibold text-[#F5F5F5] mb-1.5">{title}</h3>
        <p className="font-sans text-[0.9rem] text-[#A0A0A0] m-0 leading-normal">{desc}</p>
      </div>
    </div>
  )
}

export default function DeveloperStyle() {
  return (
    <>
      <Head>
        <title>ChurnRecovery — Developer Style (Option A)</title>
        <meta name="description" content="Developer-focused dark theme homepage concept for ChurnRecovery." />
      </Head>

      <div className="bg-[#0A0A0A] min-h-screen">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0A0A0AE6] backdrop-blur-[12px] border-b border-[#2A2A2A]">
          <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
            <span className="font-sans text-base font-bold text-[#F5F5F5] tracking-[-0.02em]">
              <span className="text-[#635BFF]">{'>'}</span> churnrecovery
            </span>
            <div className="flex gap-6 items-center">
              {['Docs', 'Pricing', 'GitHub'].map(item => (
                <span key={item} className="font-sans text-[0.85rem] text-[#A0A0A0] cursor-pointer">{item}</span>
              ))}
              <span className="font-sans text-[0.85rem] font-semibold text-[#0A0A0A] bg-[#635BFF] px-4 py-2 rounded-md cursor-pointer">Get Started</span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-40">
          <div className="max-w-[1200px] mx-auto px-6 pb-20 grid grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-sans text-[0.75rem] font-semibold text-[#00D4AA] tracking-[0.08em] uppercase mb-5">
                ● OPEN SOURCE · FREE FOREVER
              </div>
              <h1 className="font-sans text-[clamp(2.5rem,5vw,4rem)] font-bold text-[#F5F5F5] tracking-[-0.04em] leading-[1.05] mb-5">
                Recover churned revenue<br />
                <span className="text-[#635BFF]">with one line of code.</span>
              </h1>
              <p className="font-sans text-[1.1rem] text-[#A0A0A0] mb-8 leading-normal max-w-[480px]">
                Cancel flows, dunning, payment recovery — all free.
                Drop in the script, configure your flows, ship.
              </p>
              <div className="flex gap-3">
                <span className="font-sans text-[0.9rem] font-semibold text-white bg-[#635BFF] px-6 py-3 rounded-md cursor-pointer">npm install churnrecovery</span>
                <span className="font-sans text-[0.9rem] font-medium text-[#A0A0A0] px-6 py-3 rounded-md border border-[#2A2A2A] cursor-pointer">Read Docs →</span>
              </div>
            </div>

            {/* Terminal */}
            <div className="bg-[#1A1A2E] border border-[#2A2A2A] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[#2A2A2A] flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="px-6 py-5 font-mono text-[0.82rem] leading-[1.8]">
                <TerminalLine command="npm install churnrecovery" />
                <TerminalLine prompt=" " command="" output="✓ added 3 packages in 1.2s" />
                <br />
                <TerminalLine command="cat app.js" />
                <div className="text-[#A0A0A0] mt-1">
                  <span className="text-[#C678DD]">import</span>{' '}
                  <span className="text-[#F5F5F5]">{'{ CancelFlow }'}</span>{' '}
                  <span className="text-[#C678DD]">from</span>{' '}
                  <span className="text-[#98C379]">'churnrecovery'</span>
                </div>
                <div className="text-[#A0A0A0] mt-0.5">
                  <span className="text-[#F5F5F5]">CancelFlow</span>
                  <span className="text-[#E5C07B]">.init</span>
                  <span className="text-[#A0A0A0]">({'{'} </span>
                  <span className="text-[#E06C75]">apiKey</span>
                  <span className="text-[#A0A0A0]">: </span>
                  <span className="text-[#98C379]">'cr_live_...'</span>
                  <span className="text-[#A0A0A0]"> {'}'})</span>
                </div>
                <br />
                <TerminalLine prompt=" " command="" output="✓ Cancel flow active — recovering revenue 🚀" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-[#2A2A2A]">
          <div className="max-w-[800px] mx-auto px-6 py-[72px]">
            <h2 className="font-sans text-[1.8rem] font-bold text-[#F5F5F5] tracking-[-0.03em] mb-2">Built for developers.</h2>
            <p className="font-sans text-base text-[#A0A0A0] mb-8">Everything you need. Nothing you don't.</p>

            <FeatureRow icon="⚡" title="Cancel Flow Builder" desc="Visual editor or code config. Show offers, collect feedback, retain customers — all customizable." />
            <FeatureRow icon="💳" title="Payment Recovery" desc="Smart retry logic, email sequences, in-app prompts. Recovers failed payments automatically." />
            <FeatureRow icon="📊" title="Analytics" desc="Exit surveys, cancellation reasons, cohort analysis. Know why customers leave." />
            <FeatureRow icon="🔌" title="One-Line Integration" desc="Works with Stripe, Paddle, Lemon Squeezy. Add a script tag and you're live." />
            <FeatureRow icon="🆓" title="$0 Forever" desc="No per-recovery fees. No tiers. No gotchas. Free because we believe churn tooling should be accessible." />
            <FeatureRow icon="🔓" title="Open Source (MIT)" desc="Read the code. Fork it. Self-host. Contribute. Full transparency." />
          </div>
        </section>

        {/* Code example */}
        <section className="border-t border-[#2A2A2A]">
          <div className="max-w-[800px] mx-auto px-6 py-[72px]">
            <h2 className="font-sans text-2xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-6">Quick start</h2>
            <CodeBlock>{`// 1. Install
npm install churnrecovery

// 2. Initialize
import { ChurnRecovery } from 'churnrecovery'

ChurnRecovery.init({
  apiKey: 'cr_live_...',
  cancelFlow: {
    offers: ['pause', 'discount_20', 'downgrade'],
    exitSurvey: true,
  },
  dunning: {
    retrySchedule: [1, 3, 5, 7],
    emailSequence: true,
  }
})

// 3. That's it. You're recovering revenue.`}</CodeBlock>
          </div>
        </section>

        {/* Back link */}
        <div className="max-w-[800px] mx-auto px-6 pt-10 pb-20">
          <Link href="/styles" className="font-sans text-[0.85rem] text-[#635BFF] no-underline">← Back to style explorer</Link>
        </div>
      </div>
    </>
  )
}
