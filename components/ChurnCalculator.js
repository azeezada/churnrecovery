import { useState, useEffect } from 'react'

function formatCurrency(n) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${Math.round(n).toLocaleString()}`
}

function formatNumber(n) {
  return Math.round(n).toLocaleString()
}

function SliderInput({ label, value, min, max, step, onChange, format, hint }) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="mb-7">
      <div className="flex justify-between items-baseline mb-2">
        <label className="font-sans text-[0.88rem] font-semibold text-brand-text">
          {label}
        </label>
        <span className="font-sans text-[1.1rem] font-extrabold text-brand-accent tracking-[-0.02em]">
          {format(value)}
        </span>
      </div>
      <div className="relative h-1.5">
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-[3px] bg-brand-border" />
        <div
          className="absolute top-0 left-0 h-1.5 rounded-[3px] bg-brand-accent transition-[width] duration-100 ease-out"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute top-[-5px] left-0 right-0 w-full h-4 opacity-0 cursor-pointer m-0"
        />
        <div
          className="absolute top-[-5px] w-4 h-4 rounded-full bg-brand-accent border-2 border-white shadow-[0_1px_4px_rgba(0,0,0,0.15)] pointer-events-none transition-[left] duration-100 ease-out"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      {hint && (
        <div className="font-sans text-[0.75rem] text-brand-gray-light mt-1.5">
          {hint}
        </div>
      )}
    </div>
  )
}

function ResultCard({ label, value, sublabel, highlight = false, green = false }) {
  return (
    <div className={`rounded-xl px-6 py-5 text-center ${highlight ? 'border-2 border-brand-accent bg-[#FDF8F5]' : 'border border-brand-border bg-brand-white'}`}>
      <div className={`font-sans text-[0.75rem] font-semibold uppercase tracking-[0.06em] mb-2 ${highlight ? 'text-brand-accent' : 'text-brand-gray-light'}`}>
        {label}
      </div>
      <div className={`font-sans font-extrabold text-[clamp(1.4rem,3vw,2rem)] tracking-[-0.04em] leading-none mb-1.5 ${green ? 'text-brand-green' : highlight ? 'text-brand-accent' : 'text-brand-text'}`}>
        {value}
      </div>
      {sublabel && (
        <div className="font-sans text-[0.75rem] text-brand-gray-light leading-snug">
          {sublabel}
        </div>
      )}
    </div>
  )
}

export default function ChurnCalculator() {
  const [mrr, setMrr] = useState(10000)
  const [churnRate, setChurnRate] = useState(5)
  const [saveRate, setSaveRate] = useState(30)

  const monthlyChurnedRevenue = mrr * (churnRate / 100)
  const annualChurnedRevenue = monthlyChurnedRevenue * 12
  const monthlySaved = monthlyChurnedRevenue * (saveRate / 100)
  const annualSaved = monthlySaved * 12
  const churnRecoveryCostAnnual = 20 * 12
  const costOfCompetitor = 250 * 12
  const netBenefitVsCompetitor = annualSaved - costOfCompetitor

  return (
    <div className="max-w-[700px] mx-auto w-full">
      <div className="bg-brand-white border border-brand-border rounded-2xl p-8 mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h3 className="font-sans text-base font-bold text-brand-text mb-6 tracking-[-0.01em]">
          Your numbers
        </h3>
        <SliderInput label="Monthly Recurring Revenue (MRR)" value={mrr} min={1000} max={500000} step={1000} onChange={setMrr} format={formatCurrency} hint="Your current total MRR" />
        <SliderInput label="Monthly Churn Rate" value={churnRate} min={0.5} max={20} step={0.5} onChange={setChurnRate} format={v => `${v}%`} hint="Industry average for B2B SaaS is 2-7%" />
        <SliderInput label="Expected Cancel Flow Save Rate" value={saveRate} min={5} max={70} step={5} onChange={setSaveRate} format={v => `${v}%`} hint="ChurnRecovery customers typically achieve 25-45% save rates" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <ResultCard label="Monthly revenue at risk" value={formatCurrency(monthlyChurnedRevenue)} sublabel="Lost every month without action" />
        <ResultCard label="Annual revenue at risk" value={formatCurrency(annualChurnedRevenue)} sublabel="Per year if churn goes unchecked" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <ResultCard label="Monthly revenue recoverable" value={formatCurrency(monthlySaved)} sublabel={`At ${saveRate}% save rate`} highlight />
        <ResultCard label="Annual revenue recoverable" value={formatCurrency(annualSaved)} sublabel="With ChurnRecovery ($20/mo)" highlight />
      </div>

      <div className="bg-brand-green-light border border-[#B8DFC9] rounded-xl px-6 py-5 mb-3">
        <div className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.08em] text-brand-green mb-2.5">
          ChurnRecovery ($20/mo) vs. Churnkey ($250/mo)
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-sans font-extrabold text-2xl text-brand-green tracking-[-0.03em]">
              {formatCurrency(annualSaved - churnRecoveryCostAnnual)}
            </div>
            <div className="font-sans text-[0.78rem] text-brand-green mt-[3px]">
              Net gain with ChurnRecovery ($20/mo)
            </div>
          </div>
          <div>
            <div className={`font-sans font-extrabold text-2xl tracking-[-0.03em] ${netBenefitVsCompetitor >= 0 ? 'text-brand-green' : 'text-[#C0392B]'}`}>
              {formatCurrency(Math.abs(netBenefitVsCompetitor))}
              {netBenefitVsCompetitor < 0 ? ' loss' : ' ahead'}
            </div>
            <div className="font-sans text-[0.78rem] text-brand-gray mt-[3px]">
              vs. paying $250/mo for Churnkey
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <p className="font-serif text-[0.88rem] text-brand-gray mb-4 leading-relaxed">
          {formatCurrency(annualSaved - 240)} net per year with ChurnRecovery at $20/month.
        </p>
        <a href="https://tally.so/r/churnrecovery" className="inline-block bg-brand-accent text-brand-white px-7 py-3 rounded-lg font-sans font-bold text-[0.92rem] no-underline tracking-[-0.01em]">
          Start Free Trial →
        </a>
      </div>
    </div>
  )
}
