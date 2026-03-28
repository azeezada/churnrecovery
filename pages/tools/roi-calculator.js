import Head from 'next/head'
import Link from 'next/link'
import { useState, useCallback } from 'react'

function fmt(n) {
  return Math.round(n).toLocaleString('en-US')
}

function fmtDollar(n) {
  if (n >= 1000) return '$' + (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return '$' + Math.round(n).toLocaleString('en-US')
}

function InputRow({ label, value, onChange, min, max, step, prefix, suffix, helpText }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between items-baseline mb-2">
        <label className="font-sans text-[0.9rem] font-semibold text-brand-text">{label}</label>
        <div className="flex items-center gap-1">
          {prefix && <span className="font-sans text-base font-bold text-brand-accent">{prefix}</span>}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={e => onChange(parseFloat(e.target.value) || 0)}
            className="font-sans text-base font-bold text-brand-accent bg-transparent border-0 border-b-2 border-brand-accent outline-none w-[90px] text-right py-[2px]"
          />
          {suffix && <span className="font-sans text-base font-bold text-brand-accent">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full accent-brand-accent cursor-pointer"
      />
      {helpText && (
        <p className="font-sans text-[0.78rem] text-brand-gray-light mt-[6px] leading-[1.5]">{helpText}</p>
      )}
    </div>
  )
}

function ResultCard({ label, value, sub, highlight, positive }) {
  return (
    <div className={`p-6 rounded-xl flex-1 min-w-[160px] ${highlight ? 'border-2 border-brand-accent bg-[#D9775708]' : 'border border-brand-border bg-brand-white'}`}>
      <div className={`font-sans text-[0.75rem] font-semibold uppercase tracking-[0.06em] mb-2 ${highlight ? 'text-brand-accent' : 'text-brand-gray-light'}`}>{label}</div>
      <div className={`font-sans text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold tracking-[-0.04em] leading-none ${positive === false ? 'text-brand-red' : positive === true ? 'text-brand-green' : highlight ? 'text-brand-accent' : 'text-brand-text'}`}>{value}</div>
      {sub && (
        <div className="font-sans text-[0.78rem] text-brand-gray mt-[6px] leading-[1.4]">{sub}</div>
      )}
    </div>
  )
}

export default function ROICalculatorPage() {
  const [subscribers, setSubscribers] = useState(500)
  const [churnRate, setChurnRate] = useState(5)
  const [arpu, setArpu] = useState(25)
  const [toolCost, setToolCost] = useState(0)
  const [recoveryRate, setRecoveryRate] = useState(15)

  // Calculations
  const subscribersLost = subscribers * (churnRate / 100)
  const revenueLostMonthly = subscribersLost * arpu
  const revenueLostAnnual = revenueLostMonthly * 12
  const revenueRecoveredMonthly = revenueLostMonthly * (recoveryRate / 100)
  const revenueRecoveredAnnual = revenueRecoveredMonthly * 12

  // ChurnRecovery cost
  const churnRecoveryCostMonthly = 20
  const churnRecoveryCostAnnual = 20 * 12

  // vs doing nothing (paying nothing, recovering nothing)
  const netVsNothingAnnual = revenueRecoveredAnnual - churnRecoveryCostAnnual

  // vs Churnkey at $250/mo
  const churnkeyCostAnnual = 250 * 12 // $3,000/year
  const netVsChurnkeyAnnual = revenueRecoveredAnnual - churnkeyCostAnnual + (toolCost * 12)

  // vs current tool
  const currentToolAnnual = toolCost * 12
  const netVsCurrentToolAnnual = revenueRecoveredAnnual - 0 + currentToolAnnual // savings from switching + recovered revenue

  const verdict = netVsChurnkeyAnnual > 0
    ? `ChurnRecovery saves you ${fmtDollar(netVsChurnkeyAnnual)}/year vs. Churnkey`
    : `ChurnRecovery recovers ${fmtDollar(revenueRecoveredAnnual)}/year at just $20/month`

  const title = 'Churn Recovery ROI Calculator — Does Your Tool Actually Pay For Itself?'
  const description = 'Find out if your cancel-flow tool is worth the cost — or if you\'re paying $250/mo to recover $300. Real numbers, instant results. Free calculator.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://churnrecovery.com/tools/roi-calculator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://churnrecovery.com/tools/roi-calculator" />
      </Head>

      <div className="bg-brand-bg min-h-screen font-sans">
        {/* Nav */}
        <nav className="border-b border-brand-border bg-brand-white px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
          <Link href="/" className="font-sans font-bold text-[1.1rem] text-brand-text no-underline tracking-[-0.01em]">
            ChurnRecovery
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/tools/churn-calculator" className="text-brand-gray no-underline text-[0.9rem]">Churn Calculator</Link>
            <Link href="/demo" className="text-brand-gray no-underline text-[0.9rem]">Demo</Link>
            <a href="/app/sign-up" className="bg-brand-accent text-brand-white px-[18px] py-2 rounded-[6px] no-underline text-[0.85rem] font-semibold">Start Free Trial →</a>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-[760px] mx-auto pt-[60px] px-6 pb-12 text-center">
          <div className="inline-block bg-[#F0EBE5] text-brand-accent px-[14px] py-1 rounded text-[0.72rem] font-bold uppercase tracking-[0.08em] mb-5">
            Free Calculator
          </div>
          <h1 className="font-sans text-[clamp(1.8rem,5vw,2.8rem)] font-extrabold text-brand-text tracking-[-0.04em] mb-4 leading-[1.15]">
            Does your churn tool actually pay for itself?
          </h1>
          <p className="font-serif text-[1.1rem] text-brand-gray leading-[1.7] max-w-[540px] mx-auto mb-4">
            Small businesses often pay $250/month for tools that recover $180/month in revenue.
            Plug in your numbers and find out if you're coming out ahead — or getting ripped off.
          </p>
          <p className="font-sans text-[0.82rem] text-brand-gray-light">
            Takes 30 seconds. Updates in real time.
          </p>
        </section>

        {/* Calculator */}
        <section className="max-w-[900px] mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 gap-8 calculator-grid">

            {/* Inputs */}
            <div className="bg-brand-white rounded-2xl border border-brand-border p-8">
              <h2 className="font-sans text-[0.78rem] font-bold text-brand-gray-light uppercase tracking-[0.06em] mb-7">Your Numbers</h2>

              <InputRow
                label="Monthly subscribers / customers"
                value={subscribers}
                onChange={setSubscribers}
                min={10}
                max={10000}
                step={10}
                suffix=" subs"
                helpText="How many paying subscribers do you have right now?"
              />

              <InputRow
                label="Monthly churn rate"
                value={churnRate}
                onChange={setChurnRate}
                min={0.5}
                max={30}
                step={0.5}
                suffix="%"
                helpText="What % of subscribers cancel each month? Industry avg is 5%."
              />

              <InputRow
                label="Average revenue per subscriber / month"
                value={arpu}
                onChange={setArpu}
                min={1}
                max={500}
                step={1}
                prefix="$"
                helpText="What does a typical subscriber pay per month?"
              />

              <InputRow
                label="Current churn tool cost / month"
                value={toolCost}
                onChange={setToolCost}
                min={0}
                max={1000}
                step={10}
                prefix="$"
                helpText="What do you currently pay for a cancel-flow tool? (0 if none)"
              />

              <InputRow
                label="Expected cancel-flow save rate"
                value={recoveryRate}
                onChange={setRecoveryRate}
                min={1}
                max={50}
                step={1}
                suffix="%"
                helpText="What % of at-risk subscribers does your cancel flow save? 15% is a conservative estimate."
              />
            </div>

            {/* Results */}
            <div className="flex flex-col gap-4">

              {/* The problem */}
              <div className="bg-[#FEF2F2] rounded-2xl border border-[#FECACA] p-6">
                <h2 className="font-sans text-[0.78rem] font-bold text-brand-red uppercase tracking-[0.06em] mb-4">Without a cancel flow</h2>
                <div className="flex flex-wrap gap-3">
                  <ResultCard
                    label="Subscribers lost / month"
                    value={fmt(subscribersLost)}
                    sub="people walking out the door"
                    positive={false}
                  />
                  <ResultCard
                    label="Revenue lost / month"
                    value={fmtDollar(revenueLostMonthly)}
                    sub={`= ${fmtDollar(revenueLostAnnual)}/year down the drain`}
                    positive={false}
                  />
                </div>
              </div>

              {/* ChurnRecovery results */}
              <div className="bg-brand-green-light rounded-2xl border border-[#A7F3D0] p-6">
                <h2 className="font-sans text-[0.78rem] font-bold text-brand-green uppercase tracking-[0.06em] mb-4">With ChurnRecovery ($20/mo)</h2>
                <div className="flex flex-wrap gap-3">
                  <ResultCard
                    label="Revenue recovered / month"
                    value={fmtDollar(revenueRecoveredMonthly)}
                    sub="recovered vs. doing nothing"
                    positive={true}
                  />
                  <ResultCard
                    label="Net annual savings"
                    value={fmtDollar(netVsNothingAnnual)}
                    sub="vs. no cancel flow (after $20/mo cost)"
                    positive={true}
                    highlight={false}
                  />
                </div>
              </div>

              {/* Vs Churnkey */}
              <div className="rounded-2xl border-2 border-brand-accent p-6" style={{ background: netVsChurnkeyAnnual > 0 ? '#D9775708' : '#FFF' }}>
                <h2 className="font-sans text-[0.78rem] font-bold text-brand-accent uppercase tracking-[0.06em] mb-2">vs. Churnkey at $250/month</h2>
                <p className="font-sans text-[0.8rem] text-brand-gray mb-4">
                  Churnkey costs ${fmt(250 * 12)}/year.
                  {toolCost > 0 && ` You're currently paying $${fmt(toolCost * 12)}/year on tools.`}
                  {' '}ChurnRecovery costs $240/year ($20/mo).
                </p>

                <div className="mb-4">
                  <div className="font-sans text-[clamp(2rem,6vw,3rem)] font-extrabold tracking-[-0.04em] leading-none" style={{ color: netVsChurnkeyAnnual > 0 ? '#2D7A4F' : '#DC2626' }}>
                    {netVsChurnkeyAnnual > 0 ? '+' : ''}{fmtDollar(Math.abs(netVsChurnkeyAnnual))}/yr
                  </div>
                  <div className="font-sans text-[0.85rem] text-brand-gray mt-1">
                    {netVsChurnkeyAnnual > 0
                      ? 'more money in your pocket vs. Churnkey'
                      : 'Churnkey costs more than it recovers at your scale'}
                  </div>
                </div>

                {/* Verdict */}
                <div className="text-brand-white rounded-lg px-4 py-3 font-sans text-[0.88rem] font-bold leading-[1.4]" style={{ background: netVsChurnkeyAnnual > 0 ? '#2D7A4F' : '#DC2626' }}>
                  {verdict}
                </div>

                {toolCost > 0 && (
                  <p className="font-sans text-[0.78rem] text-brand-gray mt-3">
                    Switching to ChurnRecovery also saves you ${fmt(toolCost * 12)}/yr in tool costs.
                    Combined: {fmtDollar(netVsCurrentToolAnnual)}/year better off.
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* CTA */}
          <div className="bg-brand-text rounded-2xl pt-12 px-10 pb-12 text-center mt-8">
            <h2 className="font-sans text-[clamp(1.4rem,3.5vw,2rem)] font-extrabold text-brand-white tracking-[-0.03em] mb-3">
              Start your free trial
            </h2>
            <p className="font-serif text-base text-[rgba(255,255,255,0.65)] mb-7 leading-[1.7]">
              30-day free trial. Then $20/month — flat. No per-subscriber charges, no per-recovery fees. Every dollar you recover stays with you.
            </p>
            <a
              href="https://tally.so/r/churnrecovery"
              className="inline-block bg-brand-accent text-brand-white px-9 py-[15px] rounded-lg font-sans font-bold text-base no-underline tracking-[-0.01em]"
            >
              Start Free Trial →
            </a>
            <p className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.4)] mt-4">
              Already using a churn tool?{' '}
              <Link href="/compare/churnkey" className="text-brand-accent no-underline">
                See how we compare →
              </Link>
            </p>
          </div>
        </section>

        {/* Explainer section */}
        <section className="bg-brand-white border-t border-b border-brand-border py-[72px] px-6">
          <div className="max-w-[760px] mx-auto">
            <h2 className="font-sans text-[clamp(1.3rem,3vw,1.8rem)] font-bold text-brand-text tracking-[-0.03em] mb-4">
              Why small businesses lose money on churn tools
            </h2>
            <p className="font-serif text-base text-brand-gray leading-[1.8] mb-8">
              The math is brutal for small subscription businesses. A newsletter creator with 300 paid subscribers
              at $15/month and 5% churn loses about $225/month to voluntary churn. If a cancel-flow tool
              recovers 15% of that, they get back ~$34/month. But if the tool costs $250/month...
              <strong className="text-brand-text"> they're paying $216/month to recover $34.</strong>
            </p>
            <p className="font-serif text-base text-brand-gray leading-[1.8] mb-8">
              This is the business model of enterprise churn tools sold down-market. They price for
              million-dollar MRR companies, and smaller businesses pay the same rate while recovering
              a tiny fraction of what the tool costs.
            </p>
            <p className="font-serif text-base text-brand-gray leading-[1.8]">
              ChurnRecovery costs $20/month — a fraction of enterprise tools. At that price,
              it pays for itself if it saves just one subscriber.
            </p>
          </div>
        </section>

        {/* Related links */}
        <section className="max-w-[760px] mx-auto py-16 px-6">
          <h2 className="font-sans text-[1.1rem] font-bold text-brand-text tracking-[-0.02em] mb-5">
            More tools & resources
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
            {[
              { href: '/tools/churn-calculator', label: '→ Churn Revenue Calculator' },
              { href: '/demo', label: '→ See the cancel flow demo' },
              { href: '/compare/churnkey', label: '→ ChurnRecovery vs Churnkey' },
              { href: '/pricing', label: '→ See our pricing ($20/mo)' },
              { href: '/posts/Ultimate-Guide-SaaS-Churn', label: '→ Ultimate churn guide' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block py-3 px-4 border border-brand-border rounded-lg font-sans text-[0.85rem] text-brand-text no-underline font-medium">
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        @media (max-width: 700px) {
          .calculator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
