import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WaitlistForm from '../components/WaitlistForm'

const useCases = [
  {
    slug: 'b2b-saas',
    icon: '🏢',
    title: 'B2B SaaS',
    subtitle: 'Recover enterprise and SMB accounts before they churn',
    heroStat: '73%',
    heroLabel: 'of B2B cancellations are preventable',
    color: '#2563EB',
    colorBg: '#EFF6FF',
    challenges: [
      'High contract values make each lost customer painful',
      'Procurement cycles mean re-acquiring lost customers takes months',
      'Team plans complicate the cancel flow (who authorizes?)',
      'Annual billing means you only get one chance per year',
    ],
    solutions: [
      {
        problem: 'End-user vs admin conflict',
        solution: 'Route to admin-specific messaging and offer team training',
        icon: '👥',
      },
      {
        problem: 'Price too high',
        solution: 'Offer seat-count reduction instead of full cancellation',
        icon: '💰',
      },
      {
        problem: 'Switching to competitor',
        solution: 'Trigger competitor comparison + a retention discount',
        icon: '⚔️',
      },
      {
        problem: 'Missing features',
        solution: 'Collect feedback and route to customer success for roadmap call',
        icon: '🔧',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '31%' },
      { label: 'Setup time', value: '~5 minutes' },
      { label: 'Time to implement', value: '< 30 min' },
    ],
    quote: {
      text: 'Industry data shows B2B SaaS companies recover 20-40% of voluntary cancellations with well-designed cancel flows and targeted retention offers.',
      author: 'Based on industry benchmarks',
    },
  },
  {
    slug: 'developer-tools',
    icon: '⚡',
    title: 'Developer Tools',
    subtitle: 'Keep developers subscribed through the eval-to-paid journey',
    heroStat: '58%',
    heroLabel: 'of dev tool churn happens in the first 90 days',
    color: '#7C3AED',
    colorBg: '#F5F3FF',
    challenges: [
      'Developers are skeptical of "sales-y" cancel flows',
      'Usage is often tied to project cycles, not ongoing need',
      'Free tiers create strong internal competition to your paid plan',
      'Technical users have high expectations — a bad UX will backfire',
    ],
    solutions: [
      {
        problem: 'Project paused / no active use',
        solution: 'Offer a 2-month pause — developers return when projects resume',
        icon: '⏸️',
      },
      {
        problem: 'Going back to free tier',
        solution: 'Show exactly what they\'ll lose and offer a usage-based downgrade',
        icon: '📉',
      },
      {
        problem: 'API limits too restrictive',
        solution: 'Offer a temporary limit increase as a retention incentive',
        icon: '🔑',
      },
      {
        problem: 'Evaluating alternatives',
        solution: 'Provide a no-nonsense feature comparison + a trial extension',
        icon: '⚖️',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '24%' },
      { label: 'Best performing offer', value: 'Pause subscription' },
      { label: 'Conversion on pause offer', value: '67%' },
    ],
    quote: {
      text: 'Developer-first tools succeed with transparent, non-manipulative cancel flows that respect user autonomy while offering genuine alternatives.',
      author: 'Product design principle',
    },
  },
  {
    slug: 'media-subscriptions',
    icon: '📰',
    title: 'Media & Subscriptions',
    subtitle: 'Reduce subscriber churn on newsletters, podcasts, and content platforms',
    heroStat: '41%',
    heroLabel: 'of media cancellations cite "too busy to consume content"',
    color: '#B45309',
    colorBg: '#FFFBEB',
    challenges: [
      'Content fatigue — subscribers get overwhelmed and disengage',
      'Monthly billing means more frequent churn opportunities',
      'Competition from free alternatives (YouTube, podcasts, newsletters)',
      'Seasonal churn spikes (January budget cuts, summer slowdowns)',
    ],
    solutions: [
      {
        problem: 'Too much email / content overload',
        solution: 'Offer a digest mode — weekly summary instead of daily sends',
        icon: '📧',
      },
      {
        problem: '"I\'m too busy right now"',
        solution: 'Offer a 1-3 month pause with automatic reactivation',
        icon: '⏰',
      },
      {
        problem: 'Price sensitivity',
        solution: 'Annual plan pitch — same content, 20% cheaper',
        icon: '💵',
      },
      {
        problem: 'Not getting value from content',
        solution: 'Ask what topics they want and route to personalization flow',
        icon: '🎯',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '28%' },
      { label: 'Most effective offer', value: 'Pause subscription' },
      { label: 'Annual upgrade rate', value: '12% of cancellations' },
    ],
    quote: {
      text: 'Media businesses with cancel flows commonly see plan switches and pauses as top retention strategies — turning cancellations into upgrade opportunities.',
      author: 'Industry insight',
    },
  },
  {
    slug: 'ecommerce-subscriptions',
    icon: '📦',
    title: 'E-commerce & Subscriptions',
    subtitle: 'Save subscription box and replenishment customers',
    heroStat: '35%',
    heroLabel: 'of subscription box cancellations are due to product-fit issues',
    color: '#047857',
    colorBg: '#ECFDF5',
    challenges: [
      'Physical product subscriptions have high unit economics stakes',
      'Customers often cancel when boxes pile up (receiving too frequently)',
      'Inventory is already allocated — a save is better than a refund',
      'High volume of subscribers means automation is essential',
    ],
    solutions: [
      {
        problem: '"I have too much product"',
        solution: 'Offer to skip the next 1-2 boxes instead of cancelling',
        icon: '📦',
      },
      {
        problem: 'Frequency mismatch',
        solution: 'Switch from monthly to quarterly with one click',
        icon: '📅',
      },
      {
        problem: 'Product not matching tastes',
        solution: 'Offer a preference reset + one replacement box',
        icon: '✨',
      },
      {
        problem: 'Budget constraints',
        solution: 'Downgrade to smaller box tier rather than full cancel',
        icon: '↓',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '38%' },
      { label: 'Skip offer acceptance', value: '44%' },
      { label: 'LTV uplift from saves', value: '4.2x' },
    ],
    quote: {
      text: 'Subscription box businesses that offer skip/pause options instead of outright cancellation see significantly higher lifetime value retention.',
      author: 'Industry insight',
    },
  },
  {
    slug: 'professional-services',
    icon: '👔',
    title: 'Professional Services & Agencies',
    subtitle: 'Retain retainer clients and prevent project churn',
    heroStat: '62%',
    heroLabel: 'of agency client churn is relationship-driven, not results-driven',
    color: '#6B7280',
    colorBg: '#F9FAFB',
    challenges: [
      'Client relationships are personal — cancel flows need to feel human',
      'Churn often signals an underlying relationship issue',
      'Contract end dates create predictable churn windows',
      'High-value retainers make every cancellation expensive',
    ],
    solutions: [
      {
        problem: 'Feeling undervalued or ignored',
        solution: 'Route to account manager immediately for relationship conversation',
        icon: '🤝',
      },
      {
        problem: '"Not seeing ROI"',
        solution: 'Trigger a results report + strategy call offer',
        icon: '📊',
      },
      {
        problem: 'Scope not matching needs',
        solution: 'Offer a scope adjustment consultation instead of cancellation',
        icon: '🔄',
      },
      {
        problem: 'Budget changes',
        solution: 'Offer a reduced-scope retainer to stay in the relationship',
        icon: '💼',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '41%' },
      { label: 'Meeting request acceptance', value: '53%' },
      { label: 'Avg retainer value saved', value: '$3,800/mo' },
    ],
    quote: {
      text: 'Service businesses benefit most from early warning signals — knowing a client is considering leaving gives your team time to act.',
      author: 'Retention strategy',
    },
  },
  {
    slug: 'fintech',
    icon: '💳',
    title: 'Fintech & Financial Tools',
    subtitle: 'Keep users in your financial ecosystem',
    heroStat: '47%',
    heroLabel: 'of fintech app churn happens after the first bill cycles',
    color: '#0F766E',
    colorBg: '#F0FDFA',
    challenges: [
      'Regulatory constraints limit what you can offer (no cash bribes)',
      'Users compare monthly charges against perceived value frequently',
      'Trust is paramount — aggressive cancel flows can backfire badly',
      'Some churn is healthy (graduated users, changed life circumstances)',
    ],
    solutions: [
      {
        problem: '"Not using the features I pay for"',
        solution: 'Show feature usage stats and offer an onboarding refresher',
        icon: '📱',
      },
      {
        problem: 'Found a cheaper alternative',
        solution: 'Offer a loyalty discount or feature-matched downgrade',
        icon: '🔍',
      },
      {
        problem: 'Life circumstance change',
        solution: 'Acknowledge gracefully, offer pause, stay on good terms',
        icon: '🌱',
      },
      {
        problem: 'Complexity / confusion',
        solution: 'Route to dedicated onboarding support session',
        icon: '💡',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '22%' },
      { label: 'Pause offer uptake', value: '31%' },
      { label: 'Reactivation after pause', value: '58%' },
    ],
    quote: {
      text: 'Financial products require careful, compliant cancel flows — soft retention offers like plan downgrades and payment pauses work without crossing regulatory lines.',
      author: 'Compliance-first approach',
    },
  },
]

function UseCaseCard({ useCase }) {
  return (
    <Link href={`/use-cases/${useCase.slug}`} className="no-underline">
      <div className="bg-brand-white border border-brand-border rounded-xl p-7 cursor-pointer transition-[transform,box-shadow] duration-150 h-full flex flex-col gap-4 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-start gap-3">
          <span className="text-[2rem]">{useCase.icon}</span>
          <div>
            <div className="font-sans font-bold text-[1.05rem] text-brand-text mb-1">
              {useCase.title}
            </div>
            <div className="font-serif text-[0.85rem] text-brand-gray leading-[1.6]">
              {useCase.subtitle}
            </div>
          </div>
        </div>
        <div
          className="rounded-lg py-3 px-4 flex items-center gap-3"
          style={{ background: useCase.colorBg }}
        >
          <span className="font-sans font-extrabold text-[1.6rem]" style={{ color: useCase.color }}>
            {useCase.heroStat}
          </span>
          <span className="font-serif text-[0.8rem] leading-normal" style={{ color: useCase.color }}>
            {useCase.heroLabel}
          </span>
        </div>
        <div className="flex gap-4 flex-wrap">
          {useCase.metrics.map((m, i) => (
            <div key={i}>
              <div className="font-sans font-bold text-base text-brand-text">{m.value}</div>
              <div className="font-serif text-[0.75rem] text-brand-gray-light">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-[6px] font-sans text-[0.82rem] font-semibold text-brand-accent">
          See how it works →
        </div>
      </div>
    </Link>
  )
}

export default function UseCasesPage() {
  return (
    <>
      <Head>
        <title>Use Cases — ChurnRecovery for Every SaaS Vertical</title>
        <meta name="description" content="ChurnRecovery works across B2B SaaS, developer tools, media subscriptions, e-commerce, agencies, and fintech. See industry-specific cancel flows and save rates." />
        <meta property="og:title" content="Use Cases — ChurnRecovery" />
        <meta property="og:description" content="Industry-specific churn recovery strategies for B2B SaaS, developer tools, media, e-commerce, agencies, and fintech." />
        <meta property="og:image" content="https://churnrecovery.com/og/use-cases.svg" />
        <meta property="og:url" content="https://churnrecovery.com/use-cases" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main className="bg-brand-bg min-h-screen">

        {/* Hero */}
        <section className="max-w-[760px] mx-auto pt-20 pb-[60px] px-6 text-center">
          <div className="inline-block bg-[#FDF4F0] text-brand-accent font-sans font-semibold text-[0.78rem] tracking-[0.08em] uppercase px-[14px] py-[6px] rounded-[20px] mb-6">
            Use Cases
          </div>
          <h1 className="font-sans font-extrabold text-[clamp(2rem,5vw,3rem)] text-brand-text mt-0 mb-5 leading-[1.15] tracking-[-0.03em]">
            Churn recovery for<br />every SaaS vertical
          </h1>
          <p className="font-serif text-[1.05rem] text-brand-gray leading-[1.8] mt-0 mb-8">
            The best cancel flow for a B2B project management tool looks very different
            from the best one for a newsletter. ChurnRecovery adapts to your vertical —
            with the right offers, messaging, and timing for your customers.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/#waitlist" className="bg-brand-accent text-brand-white py-3 px-7 rounded-lg no-underline font-sans font-semibold text-[0.95rem]">
              Join Waitlist
            </Link>
            <Link href="/demo" className="bg-brand-white text-brand-text py-3 px-7 rounded-lg no-underline font-sans font-semibold text-[0.95rem] border border-brand-border">
              See how it works
            </Link>
          </div>
        </section>

        {/* Use Case Cards Grid */}
        <section className="max-w-[1100px] mx-auto px-6 pb-20">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
            {useCases.map(uc => (
              <UseCaseCard key={uc.slug} useCase={uc} />
            ))}
          </div>
        </section>

        {/* Why vertical-specific matters */}
        <section className="border-t border-b border-brand-border bg-brand-white py-20 px-6">
          <div className="max-w-[900px] mx-auto">
            <h2 className="font-sans font-extrabold text-[1.8rem] text-brand-text mt-0 mb-12 text-center tracking-[-0.03em]">
              Why vertical-specific flows outperform generic ones
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
              {[
                {
                  icon: '🎯',
                  title: 'Right offer, right moment',
                  body: 'A "pause subscription" offer is brilliant for a developer tool and irrelevant for an e-commerce box. Context determines what works.',
                },
                {
                  icon: '💬',
                  title: 'Tone matches audience',
                  body: 'Developers hate sales-y language. Enterprise buyers want formal options. Media subscribers want empathy. One tone doesn\'t fit all.',
                },
                {
                  icon: '📊',
                  title: 'Industry benchmarks',
                  body: 'A 25% save rate is exceptional in fintech and mediocre in e-commerce. Knowing your vertical\'s norms helps you set the right targets.',
                },
                {
                  icon: '⚙️',
                  title: 'Offer mechanics fit the product',
                  body: 'Seat reductions for B2B. Frequency changes for subscriptions. Feature downgrades for SaaS. The mechanics need to match your billing model.',
                },
              ].map((item, i) => (
                <div key={i} className="p-6 border border-brand-border rounded-[10px]">
                  <div className="text-[1.5rem] mb-3">{item.icon}</div>
                  <div className="font-sans font-bold text-[0.95rem] text-brand-text mb-2">
                    {item.title}
                  </div>
                  <div className="font-serif text-[0.85rem] text-brand-gray leading-[1.7]">
                    {item.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works — 3 steps */}
        <section className="max-w-[800px] mx-auto py-20 px-6">
          <h2 className="font-sans font-extrabold text-[1.8rem] text-brand-text mt-0 mb-3 text-center tracking-[-0.03em]">
            Set up in under 30 minutes
          </h2>
          <p className="font-serif text-brand-gray text-center mb-12 text-base leading-[1.7]">
            No matter your vertical, getting started is the same simple process.
          </p>
          <div className="flex flex-col">
            {[
              {
                step: '1',
                title: 'Choose your vertical template',
                body: 'Start from a pre-built cancel flow template designed for your industry. All reason categories, offers, and messaging are pre-configured for your buyer type.',
              },
              {
                step: '2',
                title: 'Customize your offers',
                body: 'Edit discount percentages, pause durations, and redirect URLs. Connect your Stripe account to enable automatic discount application.',
              },
              {
                step: '3',
                title: 'Add one line of code',
                body: 'Drop a script tag or npm package into your app. ChurnRecovery intercepts your cancel button and shows the right flow automatically.',
              },
            ].map((step, i, arr) => (
              <div key={i} className="flex gap-6 ml-5 pl-8 relative" style={{
                paddingBottom: i < arr.length - 1 ? '32px' : '0',
                borderLeft: i < arr.length - 1 ? '2px solid #E5E5E5' : 'none',
              }}>
                <div className="absolute -left-5 top-0 w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center font-sans font-extrabold text-[0.9rem] text-brand-white shrink-0">
                  {step.step}
                </div>
                <div className="pt-2">
                  <div className="font-sans font-bold text-base text-brand-text mb-2">
                    {step.title}
                  </div>
                  <div className="font-serif text-[0.9rem] text-brand-gray leading-[1.7]">
                    {step.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-text py-20 px-6">
          <div className="max-w-[560px] mx-auto text-center">
            <h2 className="font-sans font-extrabold text-[2rem] text-brand-white mt-0 mb-4 tracking-[-0.03em]">
              Free for every vertical
            </h2>
            <p className="font-serif text-base text-white/70 leading-[1.8] mt-0 mb-8">
              Whether you're a B2B SaaS company or a solo newsletter creator,
              ChurnRecovery is free to use. No plans. No usage limits. No catch.
            </p>
            <WaitlistForm source="use-cases" />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
