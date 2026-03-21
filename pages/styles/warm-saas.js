import Link from 'next/link'
import Head from 'next/head'

// Option B: Warm SaaS — friendly, human, trustworthy

function TestimonialCard({ quote, author, role, company, emoji }) {
  return (
    <div className="bg-white border border-[#FDE8D0] rounded-[20px] p-7">
      <div className="text-2xl mb-4">{emoji}</div>
      <p className="font-serif text-[0.95rem] text-[#1C1917] leading-[1.7] mb-5 italic">"{quote}"</p>
      <div>
        <div className="font-sans text-[0.9rem] font-semibold text-[#1C1917]">{author}</div>
        <div className="font-sans text-[0.8rem] text-[#78716C]">{role}, {company}</div>
      </div>
    </div>
  )
}

function FeatureCard({ emoji, title, description, highlight }) {
  return (
    <div
      className="rounded-[20px] p-8 relative overflow-hidden"
      style={{
        background: highlight ? '#EA580C' : '#FFFFFF',
        border: `1px solid ${highlight ? '#EA580C' : '#FDE8D0'}`,
      }}
    >
      {highlight && (
        <div className="absolute -top-5 -right-5 w-[120px] h-[120px] rounded-full bg-white/10" />
      )}
      <div className="text-[2rem] mb-4 block">{emoji}</div>
      <h3
        className="font-sans text-[1.1rem] font-bold mb-2.5 tracking-[-0.01em]"
        style={{ color: highlight ? '#fff' : '#1C1917' }}
      >{title}</h3>
      <p
        className="font-sans text-[0.9rem] m-0 leading-relaxed"
        style={{ color: highlight ? 'rgba(255,255,255,0.85)' : '#78716C' }}
      >{description}</p>
    </div>
  )
}

export default function WarmSaasStyle() {
  return (
    <>
      <Head>
        <title>ChurnRecovery — Warm SaaS Style (Option B)</title>
        <meta name="description" content="Friendly, warm SaaS homepage concept for ChurnRecovery — for founders who want human and trustworthy." />
      </Head>

      <div className="bg-[#FFF7ED] min-h-screen">
        {/* Nav */}
        <nav className="sticky top-0 z-[100] bg-[rgba(255,247,237,0.92)] backdrop-blur-[16px] border-b border-[#FDE8D0]">
          <div className="max-w-[1100px] mx-auto px-6 h-[68px] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[1.4rem]">🛡️</span>
              <span className="font-sans text-[1.1rem] font-bold text-[#1C1917] tracking-[-0.02em]">ChurnRecovery</span>
            </div>
            <div className="flex gap-2 items-center">
              {['Features', 'Pricing', 'Blog'].map(item => (
                <span key={item} className="font-sans text-[0.9rem] text-[#78716C] px-3 py-2 rounded-[10px] cursor-pointer">{item}</span>
              ))}
              <span className="font-sans text-[0.9rem] font-semibold text-white bg-[#EA580C] px-5 py-2.5 rounded-xl cursor-pointer">Get Started Free →</span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-20">
          <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-[#FED7AA] text-[#EA580C] font-sans text-[0.85rem] font-semibold px-4 py-2 rounded-full mb-8">
              <span>🎉</span>
              <span>Completely free — always has been, always will be</span>
            </div>

            <h1 className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-[#1C1917] tracking-[-0.04em] leading-[1.05] mb-6">
              Your customers are leaving.<br />
              <span
                className="bg-clip-text"
                style={{
                  background: 'linear-gradient(135deg, #EA580C, #F97316)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >Let's bring them back.</span>
            </h1>

            <p className="font-sans text-[1.2rem] text-[#78716C] mx-auto mb-10 max-w-[560px] leading-relaxed">
              ChurnRecovery helps SaaS founders recover lost revenue with smart cancel flows,
              dunning management, and payment recovery — completely free.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <span className="font-sans text-base font-bold text-white px-8 py-4 rounded-[14px] cursor-pointer shadow-[0_4px_20px_rgba(234,88,12,0.3)]" style={{ background: 'linear-gradient(135deg, #EA580C, #F97316)' }}>Start recovering revenue →</span>
              <span className="font-sans text-base font-semibold text-[#1C1917] bg-white px-7 py-4 rounded-[14px] cursor-pointer border border-[#FDE8D0]">See how it works</span>
            </div>

            <p className="font-sans text-[0.85rem] text-[#A8A29E] mt-5">
              No credit card · No limits · Free forever
            </p>
          </div>

          {/* Social proof numbers */}
          <div className="max-w-[1100px] mx-auto px-6 pb-20">
            <div className="bg-white border border-[#FDE8D0] rounded-[20px] p-10 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8 text-center">
              {[
                { number: '100%', label: 'Free forever', emoji: '🏢' },
                { number: '5 min', label: 'Setup time', emoji: '⚡' },
                { number: '34%', label: 'Industry avg saves', emoji: '📉' },
                { number: '$0', label: 'Cost to you, always', emoji: '🎁' },
              ].map(({ number, label, emoji }) => (
                <div key={label}>
                  <div className="text-2xl mb-2">{emoji}</div>
                  <div className="font-sans text-[2.2rem] font-extrabold text-[#1C1917] tracking-[-0.04em] leading-none mb-1.5">{number}</div>
                  <div className="font-sans text-[0.85rem] text-[#78716C]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-[#FFF0E0]">
          <div className="max-w-[1100px] mx-auto px-6 py-20">
            <div className="text-center mb-14">
              <span className="font-sans text-[0.8rem] font-bold text-[#EA580C] tracking-[0.08em] uppercase">Everything you need</span>
              <h2 className="font-sans text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-[#1C1917] tracking-[-0.03em] mt-3 mb-4">Tools that actually work</h2>
              <p className="font-sans text-[1.05rem] text-[#78716C] max-w-[500px] mx-auto leading-relaxed">We researched the best cancel flows in the industry. Here&apos;s what actually retains customers.</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              <FeatureCard
                emoji="💬"
                title="Cancel Flow Builder"
                description="Build flows that feel human, not corporate. Show offers, collect reasons, prevent rage-quits."
                highlight={true}
              />
              <FeatureCard
                emoji="💳"
                title="Dunning Management"
                description="Recover failed payments with smart email sequences and in-app prompts timed perfectly."
              />
              <FeatureCard
                emoji="📊"
                title="Exit Surveys"
                description="Understand why customers leave. Real data you can act on, not just vibes."
              />
              <FeatureCard
                emoji="🎁"
                title="Smart Offers"
                description="Pause, discount, downgrade — show the right offer to the right customer at the right time."
              />
              <FeatureCard
                emoji="🔗"
                title="Easy Integration"
                description="Works with Stripe, Paddle, Lemon Squeezy. One script tag and you're live in 10 minutes."
              />
              <FeatureCard
                emoji="📈"
                title="Recovery Analytics"
                description="See exactly which offers work, which customers stay, and how much revenue you've saved."
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="max-w-[1100px] mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2 className="font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-[#1C1917] tracking-[-0.03em] mb-3">Be our first beta users</h2>
              <p className="font-sans text-base text-[#78716C]">We&apos;re in early access — join us and help shape the product</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
              <TestimonialCard
                emoji="🚀"
                quote="We're building ChurnRecovery in the open. Join early and get free access forever — plus direct input on what we build next."
                author="The ChurnRecovery Team"
                role=""
                company=""
              />
              <TestimonialCard
                emoji="🎁"
                quote="Early adopters get priority support, feature requests, and the satisfaction of knowing they helped build something great."
                author="Why join now?"
                role=""
                company=""
              />
              <TestimonialCard
                emoji="💬"
                quote="Have feedback? We want to hear it. Every early user gets a direct line to the team. Your input shapes the roadmap."
                author="Your voice matters"
                role=""
                company=""
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)' }}>
          <div className="max-w-[800px] mx-auto px-6 py-20 text-center">
            <span className="text-[3rem] block mb-6">🚀</span>
            <h2 className="font-sans text-[clamp(2rem,4vw,3rem)] font-extrabold text-white tracking-[-0.03em] mb-4">Start recovering revenue today</h2>
            <p className="font-sans text-[1.1rem] text-white/85 mx-auto mb-10 max-w-[480px] leading-normal">
              Free churn recovery for subscription businesses.
              Takes about 10 minutes to set up.
            </p>
            <span className="inline-block font-sans text-base font-bold text-[#EA580C] bg-white px-9 py-4 rounded-[14px] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)]">Get started for free →</span>
            <p className="font-sans text-[0.85rem] text-white/70 mt-5">No credit card required · Free forever</p>
          </div>
        </section>

        {/* Back link */}
        <div className="max-w-[1100px] mx-auto px-6 py-10">
          <Link href="/styles" className="font-sans text-[0.9rem] text-[#EA580C] no-underline font-medium">← Back to style explorer</Link>
        </div>
      </div>
    </>
  )
}
