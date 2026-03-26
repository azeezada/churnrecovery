import Head from 'next/head'
import Link from 'next/link'

const values = [
  {
    icon: '🔓',
    title: 'Radically open',
    body: 'ChurnRecovery is open source. The code that runs your cancel flows is code you can read, fork, and run yourself. No black boxes, no vendor lock-in.',
  },
  {
    icon: '⚖️',
    title: 'Fair by design',
    body: 'We charge a flat $20/month because your success shouldn\'t increase your costs. No per-subscriber fees, no per-recovery fees, no revenue share. The price stays the same whether you save 10 subscribers or 10,000.',
  },
  {
    icon: '🛠️',
    title: 'Developer-first',
    body: 'Cancel flows are code. They should be version-controlled, testable, and deployable — not point-and-click configured inside a locked dashboard. We build for engineers.',
  },
  {
    icon: '📊',
    title: 'Data you own',
    body: 'Every cancel reason, every offer acceptance, every recovered subscription — your data lives where you control it. Export anytime, connect to any analytics stack.',
  },
]

const timeline = [
  {
    date: 'Q1 2025',
    title: 'The problem becomes personal',
    body: 'Building a SaaS product, we hit the cancel flow wall. Churnkey: $250/month minimum. ProfitWell Retain: $149/month. We were recovering maybe $800/month. The math didn\'t work.',
  },
  {
    date: 'Q2 2025',
    title: 'We built it ourselves',
    body: 'We built our own cancel flow widget on a weekend. It was rough, but it worked. Save rates hit 22%. We thought: why isn\'t this just a standard, free piece of infrastructure?',
  },
  {
    date: 'Q3 2025',
    title: 'Open source + polish',
    body: 'We rebuilt it from scratch, properly. SDK, dashboard, analytics, dunning sequences. Shared it publicly. Other founders started using it. Feedback poured in.',
  },
  {
    date: 'Early 2026',
    title: 'ChurnRecovery launches',
    body: 'Today, ChurnRecovery is a full platform: cancel flows, payment recovery, analytics, templates — everything competitors charge $250–$825/month for, at $20/month with a 30-day free trial. No per-recovery fees. No usage limits.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen font-[Instrument_Sans,sans-serif]">
      <Head>
        <title>About ChurnRecovery — Our Mission and Founding Story</title>
        <meta name="description" content="ChurnRecovery is an affordable, open-source churn recovery platform at $20/month. Learn why we built it, what we believe, and our commitment to making retention tools accessible to every subscription business." />
        <meta property="og:title" content="About ChurnRecovery — Affordable Churn Recovery for SaaS" />
        <meta property="og:description" content="We believe churn recovery tools shouldn't cost more than they recover. Learn our founding story and mission." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://churnrecovery.com/about" />
        <meta property="og:image" content="https://churnrecovery.com/og/default.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://churnrecovery.com/about" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About ChurnRecovery",
          "description": "ChurnRecovery is an affordable, open-source churn recovery platform for subscription businesses. $20/month.",
          "url": "https://churnrecovery.com/about",
          "publisher": {
            "@type": "Organization",
            "name": "ChurnRecovery",
            "url": "https://churnrecovery.com",
          }
        })}} />
      </Head>

      {/* Hero */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[800px] mx-auto px-[32px] pt-[80px] pb-[72px]">
          <div className="inline-block bg-[#EDF7F1] text-[#2D7A4F] rounded-[20px] px-[16px] py-[6px] text-[13px] font-semibold mb-[24px] tracking-[0.02em]">
            Our mission
          </div>
          <h1 className="font-[Merriweather,serif] font-bold text-[#191919] mb-[24px] leading-[1.2] text-[clamp(32px,5vw,48px)]">
            Churn recovery shouldn&apos;t cost more than it recovers.<br />
            <span className="text-[#D97757]">So we built one for $20/month.</span>
          </h1>
          <p className="text-[19px] text-[#444444] leading-[1.75] font-[Merriweather,serif] mb-[20px] max-w-[640px]">
            ChurnRecovery is an open-source platform for cancel flow interception, payment recovery, and win-back automation. We built it because the tools we needed were too expensive — so we made one that&apos;s 10–40x cheaper.
          </p>
          <p className="text-[20px] leading-[1.6] font-[Instrument_Sans,sans-serif] max-w-[640px] font-bold px-[20px] py-[16px] bg-[#EDF7F1] rounded-[10px] border-l-[4px] border-l-[#2D7A4F] text-[#2D7A4F]">
            $20/month. Open source. Built for engineers who want to own their retention stack.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-[800px] mx-auto px-[32px] pt-[48px]">
        <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
          Why we built this
        </h2>
        <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
          <p>
            In 2025, we were building a SaaS product. Customers were churning — some voluntarily, some because their cards failed. We knew we needed a cancel flow and a dunning sequence. We looked at the options.
          </p>
          <div className="mt-[20px] mb-[20px] bg-[#FFF5F2] border border-[#FFDDD5] rounded-[10px] px-[20px] py-[16px]">
            <div className="font-bold text-[#191919] mb-[8px] text-[14px] uppercase tracking-[0.06em]">What we were looking at</div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[12px]">
              {[
                { name: 'Churnkey', price: '$250–825/mo' },
                { name: 'ProfitWell Retain', price: '$149–499/mo' },
                { name: 'Baremetrics', price: '$129+/mo' },
              ].map(({ name, price }) => (
                <div key={name} className="bg-[#FFFFFF] rounded-[8px] px-[14px] py-[10px] border border-[#E5E5E5]">
                  <div className="font-bold text-[#191919] text-[14px] mb-[2px]">{name}</div>
                  <div className="text-[#C4603D] font-bold text-[16px]">{price}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-[16px]">
            For a $3,000 MRR company, paying $250/month for a churn recovery tool is an 8% overhead tax — before you've proven the product delivers ROI. We thought that was backwards.
          </p>
          <p className="mt-[16px]">
            So we built our own. A cancel flow widget, a dunning sequence, a basic dashboard. It wasn't pretty, but it worked. Our save rate hit 22%. We recovered about $600–800/month in revenue that would have churned.
          </p>
          <p className="mt-[16px]">
            Then we asked ourselves: why should every SaaS founder rebuild this from scratch? Why isn't churn recovery just a standard piece of infrastructure — like email, analytics, or payments?
          </p>
          <p className="mt-[16px]">
            <strong className="text-[#191919]">ChurnRecovery is the answer to that question.</strong>
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-[800px] mx-auto mt-[72px] px-[32px]">
        <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[40px]">
          How we got here
        </h2>
        <div className="relative">
          <div className="absolute left-0 top-[8px] bottom-[8px] w-[2px] bg-[#E5E5E5] rounded-[1px]" />
          {timeline.map((item, i) => (
            <div key={i} className="relative pl-[32px] mb-[40px]">
              <div className="absolute left-[-6px] top-[4px] w-[14px] h-[14px] rounded-full bg-[#D97757] border-2 border-[#FAF9F5] shadow-[0_0_0_2px_#D97757]" />
              <div className="text-[13px] text-[#D97757] font-bold mb-[6px] tracking-[0.04em]">
                {item.date}
              </div>
              <h3 className="text-[18px] font-bold text-[#191919] mb-[8px]">
                {item.title}
              </h3>
              <p className="text-[15px] text-[#444444] leading-[1.75] font-[Merriweather,serif] m-0">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="max-w-[1100px] mx-auto mt-[72px] px-[32px]">
        <div className="max-w-[800px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[12px]">
            What we believe
          </h2>
          <p className="text-[#444444] text-[16px] leading-[1.7] font-[Merriweather,serif] mb-[40px]">
            These aren't marketing platitudes — they're the principles that shaped every product decision.
          </p>
        </div>
        <div className="values-grid grid grid-cols-[repeat(2,1fr)] gap-[24px]">
          {values.map((value, i) => (
            <div key={i} className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[12px] p-[28px]">
              <div className="text-[32px] mb-[16px]">{value.icon}</div>
              <h3 className="text-[17px] font-bold text-[#191919] mb-[10px]">
                {value.title}
              </h3>
              <p className="text-[15px] text-[#444444] leading-[1.75] font-[Merriweather,serif] m-0">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open source commitment */}
      <div className="max-w-[800px] mx-auto mt-[72px] px-[32px]">
        <div className="bg-[#1A1A1A] rounded-[16px] p-[48px] text-[#FFFFFF]">
          <div className="text-[36px] mb-[20px]">⚡</div>
          <h2 className="font-[Merriweather,serif] text-[26px] font-bold mb-[16px]">
            Our open-source commitment
          </h2>
          <p className="text-[16px] text-[rgba(255,255,255,0.75)] leading-[1.8] font-[Merriweather,serif] mb-[20px]">
            The ChurnRecovery JavaScript SDK, cancel flow renderer, and dunning engine are open source. Not open-core — actually open. The code that processes your cancellations is code you can read, audit, fork, and self-host.
          </p>
          <p className="text-[16px] text-[rgba(255,255,255,0.75)] leading-[1.8] font-[Merriweather,serif] mb-[32px]">
            We believe in building in public. Our roadmap is public. Our metrics will be public when we have them worth sharing. Transparency isn't a marketing tactic — it's how we earn the right to handle your customer cancellations.
          </p>
          <div className="flex gap-[12px] flex-wrap">
            <a
              href="https://github.com/churnrecovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[8px] bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] px-[20px] py-[12px] rounded-[8px] font-semibold no-underline text-[15px] border border-[rgba(255,255,255,0.15)]"
            >
              ⭐ Star on GitHub
            </a>
            <Link href="/docs" className="inline-flex items-center gap-[8px] bg-[#D97757] text-[#FFFFFF] px-[20px] py-[12px] rounded-[8px] font-semibold no-underline text-[15px]">
              Read the docs →
            </Link>
          </div>
        </div>
      </div>

      {/* Team placeholder */}
      <div className="max-w-[800px] mx-auto mt-[72px] px-[32px]">
        <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
          Who's building this
        </h2>
        <p className="text-[16px] text-[#444444] leading-[1.8] font-[Merriweather,serif] mb-[32px]">
          ChurnRecovery is built by Dawood Azeeza and a small team of engineers who&apos;ve shipped SaaS products and lived the churn problem firsthand. We&apos;re not a VC-backed company with a retention sales team — we&apos;re builders who got frustrated with expensive tooling and decided to fix it.
        </p>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[12px] p-[32px] flex items-center gap-[24px] founder-card">
          <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-[28px] text-[#FFFFFF] font-bold shrink-0 bg-gradient-to-br from-[#D97757] to-[#C4603D]">
            🛠
          </div>
          <div>
            <div className="font-bold text-[17px] text-[#191919] mb-[4px]">
              The ChurnRecovery Team
            </div>
            <div className="text-[14px] text-[#888888] mb-[10px]">
              Builders. Founders. Former churners.
            </div>
            <p className="text-[14px] text-[#444444] leading-[1.65] font-[Merriweather,serif] m-0">
              Start your 30-day free trial and join the founding user community. Help shape the product with direct access to the team building it.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-[800px] mx-auto mt-[72px] px-[32px]">
        <div className="stats-grid grid grid-cols-[repeat(3,1fr)] gap-[24px]">
          {[
            { value: '$20', label: 'Per month. All features.', sub: '30-day free trial, no credit card required' },
            { value: '6+', label: 'Payment processors', sub: 'Stripe, Paddle, Braintree, and more' },
            { value: '100%', label: 'Open source SDK', sub: 'MIT license, fork freely' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[12px] p-[24px] text-center">
              <div className="font-[Merriweather,serif] text-[36px] font-bold text-[#D97757] mb-[8px]">
                {stat.value}
              </div>
              <div className="font-bold text-[15px] text-[#191919] mb-[4px]">
                {stat.label}
              </div>
              <div className="text-[13px] text-[#888888]">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[800px] mx-auto mt-[72px] mb-[80px] px-[32px]">
        <div className="bg-[#D97757] rounded-[16px] px-[40px] py-[56px] text-center text-[#FFFFFF]">
          <h2 className="font-[Merriweather,serif] font-bold mb-[16px] text-[clamp(24px,4vw,34px)]">
            Join us in fixing churn
          </h2>
          <p className="text-[16px] text-[rgba(255,255,255,0.85)] mb-[32px] max-w-[480px] mx-auto font-[Merriweather,serif] leading-[1.7]">
            Start recovering customers today. Help us shape the product. Keep your feedback loop short with the people building it.
          </p>
          <div className="flex gap-[12px] justify-center flex-wrap">
            <Link href="/app/sign-up" className="bg-[#FFFFFF] text-[#D97757] px-[32px] py-[14px] rounded-[8px] font-bold no-underline text-[16px]">
              Start Free Trial →
            </Link>
            <Link href="/demo" className="bg-[rgba(255,255,255,0.15)] text-[#FFFFFF] px-[32px] py-[14px] rounded-[8px] font-semibold no-underline text-[16px] border border-[rgba(255,255,255,0.3)]">
              See it in action
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .founder-card { flex-direction: column !important; text-align: center !important; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  )
}
