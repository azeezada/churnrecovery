import Link from 'next/link'
import Head from 'next/head'

// Option C: Data / Dashboard — analytical, numbers-first, credibility through data

function MetricCard({ label, value, change, changeType, subtitle }) {
  const isPositive = changeType === 'positive'
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <div className="font-sans text-[0.75rem] font-semibold text-[#64748B] tracking-[0.06em] uppercase mb-3">{label}</div>
      <div className="font-sans text-[2.4rem] font-bold text-[#0F172A] tracking-[-0.03em] leading-none mb-2">{value}</div>
      <div className="flex items-center gap-1.5">
        <span
          className="font-sans text-[0.8rem] font-semibold px-2 py-0.5 rounded-md"
          style={{ color: isPositive ? '#10B981' : '#EF4444', background: isPositive ? '#D1FAE5' : '#FEE2E2' }}
        >{change}</span>
        {subtitle && (
          <span className="font-sans text-[0.8rem] text-[#94A3B8]">{subtitle}</span>
        )}
      </div>
    </div>
  )
}

function TableRow({ feature, churnrecovery, churnkey, isHighlighted }) {
  return (
    <tr style={{ background: isHighlighted ? '#E0F2FE' : 'transparent' }}>
      <td
        className="px-5 py-3.5 font-sans text-[0.9rem] text-[#0F172A] border-b border-[#E2E8F0]"
        style={{ fontWeight: isHighlighted ? 600 : 400 }}
      >{feature}</td>
      <td className="px-5 py-3.5 font-sans text-[0.9rem] text-[#10B981] font-semibold border-b border-[#E2E8F0] text-center">{churnrecovery}</td>
      <td className="px-5 py-3.5 font-sans text-[0.9rem] text-[#64748B] border-b border-[#E2E8F0] text-center">{churnkey}</td>
    </tr>
  )
}

function DataBar({ label, value, percentage, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="font-sans text-[0.85rem] text-[#0F172A]">{label}</span>
        <span className="font-sans text-[0.85rem] font-semibold text-[#0F172A]">{value}</span>
      </div>
      <div className="h-2 bg-[#E2E8F0] rounded overflow-hidden">
        <div
          className="h-full rounded transition-[width] duration-[600ms] ease-out"
          style={{ width: `${percentage}%`, background: color || '#0EA5E9' }}
        />
      </div>
    </div>
  )
}

export default function DataForwardStyle() {
  return (
    <>
      <Head>
        <title>ChurnRecovery — Data-Forward Style (Option C)</title>
        <meta name="description" content="Data-driven, analytical homepage concept for ChurnRecovery — for growth teams who want proof before they integrate." />
      </Head>

      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Nav */}
        <nav className="sticky top-0 z-[100] bg-[#0F172A] border-b border-[#334155]">
          <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#0EA5E9] rounded-md flex items-center justify-center">
                <span className="text-[0.75rem] text-white font-bold">CR</span>
              </div>
              <span className="font-sans text-base font-semibold text-[#F1F5F9]">ChurnRecovery</span>
            </div>
            <div className="flex gap-6 items-center">
              {['Features', 'Integrations', 'Docs', 'Blog'].map(item => (
                <span key={item} className="font-sans text-[0.85rem] text-[#94A3B8] cursor-pointer">{item}</span>
              ))}
              <span className="font-sans text-[0.85rem] font-semibold text-white bg-[#0EA5E9] px-[18px] py-2 rounded-lg cursor-pointer">Get Started</span>
            </div>
          </div>
        </nav>

        {/* Hero — data dashboard style */}
        <section style={{ background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 40%, #F8FAFC 100%)' }}>
          <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
            <div className="inline-flex items-center gap-2 bg-[rgba(14,165,233,0.15)] border border-[rgba(14,165,233,0.3)] text-[#0EA5E9] font-sans text-[0.8rem] font-semibold px-3.5 py-1.5 rounded-full mb-7 tracking-[0.04em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
              LIVE PLATFORM · Free churn recovery
            </div>

            <h1 className="font-sans text-[clamp(2.5rem,5vw,4rem)] font-bold text-[#F1F5F9] tracking-[-0.04em] leading-[1.08] mb-5 max-w-[700px]">
              The churn recovery platform<br />
              <span className="text-[#0EA5E9]">with data that proves it works.</span>
            </h1>
            <p className="font-sans text-[1.1rem] text-[#94A3B8] mb-12 max-w-[560px] leading-relaxed">
              Industry data shows 20–40% of cancellations can be recovered with the right cancel flow.
              ChurnRecovery gives you those tools — and it costs you exactly $0.
            </p>

            <div className="flex gap-3 mb-[60px]">
              <span className="font-sans text-[0.95rem] font-semibold text-white bg-[#0EA5E9] px-6 py-3 rounded-lg cursor-pointer">Start for free →</span>
              <span className="font-sans text-[0.95rem] font-medium text-[#94A3B8] px-6 py-3 rounded-lg border border-[#334155] cursor-pointer">View live dashboard</span>
            </div>

            {/* Dashboard preview — metric cards */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-12">
              <MetricCard label="Cancellations Saved" value="34.2%" change="+6.1%" changeType="positive" subtitle="vs last month" />
              <MetricCard label="Revenue Recovered" value="$8.2M" change="+$1.4M" changeType="positive" subtitle="this year" />
              <MetricCard label="Avg Save Value" value="$124" change="+$18" changeType="positive" subtitle="per saved customer" />
              <MetricCard label="Voluntary Churn" value="2.8%" change="-0.9%" changeType="positive" subtitle="down from 3.7%" />
            </div>
          </div>
        </section>

        {/* Recovery Breakdown */}
        <section>
          <div className="max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-2 gap-12 items-start">
            <div>
              <span className="font-sans text-[0.75rem] font-bold text-[#0EA5E9] tracking-[0.08em] uppercase block mb-4">Recovery breakdown</span>
              <h2 className="font-sans text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-[#0F172A] tracking-[-0.03em] mb-4 leading-[1.2]">Understand exactly where your revenue goes</h2>
              <p className="font-sans text-base text-[#64748B] mb-8 leading-relaxed">
                ChurnRecovery breaks down your churn into voluntary (customers who choose to leave)
                and involuntary (failed payments). Different problems, different solutions.
              </p>

              <div className="bg-white border border-[#E2E8F0] rounded-xl p-7">
                <div className="font-sans text-[0.8rem] font-semibold text-[#64748B] tracking-[0.06em] uppercase mb-5">Cancellation save rates by offer type</div>
                <DataBar label="Pause subscription (1-3 months)" value="51%" percentage={51} color="#10B981" />
                <DataBar label="Discount offer (20% off)" value="38%" percentage={38} color="#0EA5E9" />
                <DataBar label="Plan downgrade option" value="28%" percentage={28} color="#8B5CF6" />
                <DataBar label="No offer (control)" value="12%" percentage={12} color="#94A3B8" />
              </div>
            </div>

            {/* Comparison table */}
            <div>
              <span className="font-sans text-[0.75rem] font-bold text-[#0EA5E9] tracking-[0.08em] uppercase block mb-4">Feature comparison</span>
              <h2 className="font-sans text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-[#0F172A] tracking-[-0.03em] mb-6 leading-[1.2]">vs Churnkey</h2>

              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <th className="px-5 py-3.5 font-sans text-[0.8rem] font-semibold text-[#64748B] text-left border-b-2 border-[#E2E8F0]">Feature</th>
                      <th className="px-5 py-3.5 font-sans text-[0.8rem] font-bold text-[#0EA5E9] text-center border-b-2 border-[#E2E8F0]">ChurnRecovery</th>
                      <th className="px-5 py-3.5 font-sans text-[0.8rem] font-semibold text-[#64748B] text-center border-b-2 border-[#E2E8F0]">Churnkey</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow feature="Cancel flow builder" churnrecovery="✓ Free" churnkey="✓ $250/mo+" />
                    <TableRow feature="Exit surveys" churnrecovery="✓ Free" churnkey="✓ $250/mo+" />
                    <TableRow feature="Smart offers" churnrecovery="✓ Free" churnkey="✓ $250/mo+" />
                    <TableRow feature="Dunning management" churnrecovery="✓ Free" churnkey="✓ $250/mo+" />
                    <TableRow feature="Recovery analytics" churnrecovery="✓ Free" churnkey="✓ $250/mo+" />
                    <TableRow feature="A/B testing" churnrecovery="✓ Free" churnkey="✗ Enterprise only" />
                    <TableRow feature="API access" churnrecovery="✓ Free" churnkey="✗ Enterprise only" />
                    <TableRow feature="Open source (MIT)" churnrecovery="✓ Yes" churnkey="✗ No" isHighlighted={true} />
                    <TableRow feature="Monthly cost" churnrecovery="$0 forever" churnkey="$250–$825/mo" isHighlighted={true} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Integration strip */}
        <section className="bg-white border-y border-[#E2E8F0]">
          <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-[auto_1fr] gap-12 items-center">
            <div>
              <div className="font-sans text-[0.8rem] font-bold text-[#64748B] tracking-[0.06em] uppercase mb-3">Integrates with</div>
              <div className="flex gap-3 flex-wrap">
                {['Stripe', 'Paddle', 'Lemon Squeezy', 'Recurly', 'Chargebee'].map(name => (
                  <span key={name} className="font-sans text-[0.85rem] font-semibold text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2 rounded-lg">{name}</span>
                ))}
              </div>
            </div>
            <div className="font-sans text-[0.9rem] text-[#64748B] leading-relaxed max-w-[440px]">
              Connect to your billing provider in minutes. No webhooks to configure manually —
              our SDK handles everything automatically.
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0F172A]">
          <div className="max-w-[800px] mx-auto px-6 py-20 text-center">
            <div className="font-sans text-[0.8rem] font-bold text-[#0EA5E9] tracking-[0.08em] uppercase mb-4">Get started in 10 minutes</div>
            <h2 className="font-sans text-[clamp(2rem,4vw,3rem)] font-bold text-[#F1F5F9] tracking-[-0.03em] mb-4">Start recovering revenue</h2>
            <p className="font-sans text-base text-[#94A3B8] mx-auto mb-9 max-w-[480px] leading-relaxed">
              Free forever. No credit card. Works with your existing Stripe setup.
              Join early and help shape the product.
            </p>
            <div className="flex gap-3 justify-center">
              <span className="font-sans text-[0.95rem] font-bold text-white bg-[#0EA5E9] px-7 py-3.5 rounded-lg cursor-pointer">Create free account →</span>
              <span className="font-sans text-[0.95rem] font-medium text-[#94A3B8] px-6 py-3.5 rounded-lg border border-[#334155] cursor-pointer">View docs</span>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <Link href="/styles" className="font-sans text-[0.9rem] text-[#0EA5E9] no-underline font-medium">← Back to style explorer</Link>
        </div>
      </div>
    </>
  )
}
