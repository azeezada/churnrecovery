import Head from 'next/head'
import Link from 'next/link'
import ChurnCalculator from '../../components/ChurnCalculator'

const faqItems = [
  {
    q: 'What is churn rate and how do you calculate it?',
    a: 'Churn rate is the percentage of subscribers or members who cancel their subscription in a given period. To calculate it: divide the number of customers lost during a period by the number of customers at the start of that period, then multiply by 100. For example, if you started with 500 members and lost 25 in a month, your monthly churn rate is 5%. For membership sites, tracking monthly churn is most common since billing cycles are typically monthly.',
  },
  {
    q: 'What is a good churn rate for a membership site?',
    a: 'For membership sites and online communities, a good monthly churn rate is below 3–4%. Elite membership sites target 1–2% monthly churn or less. E-learning platforms typically see 5–8% monthly churn, while content membership sites (newsletters, creator communities) average 3–6%. If you\'re above 7–8% monthly churn on a membership site, that\'s a strong signal to audit your onboarding and value delivery.',
  },
  {
    q: 'Why is churn rate especially important for membership sites?',
    a: 'Membership sites live and die by recurring revenue. Unlike one-time product sales, your revenue depends on keeping members engaged month after month. High churn erodes your MRR, requires constant new member acquisition to stay flat, and signals that members aren\'t finding ongoing value. A membership site with 5% monthly churn loses more than half its members every year — meaning you\'re essentially rebuilding your entire community annually.',
  },
  {
    q: 'How do I reduce churn on my membership site?',
    a: 'The most effective churn reduction strategies for membership sites are: (1) Strong onboarding — members who reach their first "win" in week 1 retain far better; (2) Regular value delivery — consistent new content, community events, or coaching keeps the membership feeling alive; (3) Cancel flow optimization — intercept cancellations with the right offer (pause, discount, downgrade) before they finalize; (4) Win-back emails — a well-timed offer can recover 15–30% of lapsed members. A cancel flow tool like ChurnRecovery handles #3 automatically.',
  },
  {
    q: 'What\'s the difference between voluntary and involuntary churn?',
    a: 'Voluntary churn is when a member actively decides to cancel — they log in and click "cancel subscription." Involuntary churn (also called passive churn) happens when a payment fails and no one follows up — the subscription quietly lapses. On average, 20–40% of total membership site churn is involuntary. Both types can be recovered: voluntary churn with cancel flows and win-back offers, involuntary churn with smart retry logic and dunning emails.',
  },
  {
    q: 'When should I use a membership site churn rate calculator?',
    a: 'Use a churn calculator when: (1) You want to understand the true revenue impact of your current churn rate; (2) You\'re evaluating whether to invest in retention tools; (3) You want to model the ROI of reducing churn by even 1–2 percentage points; (4) You\'re benchmarking against industry standards. The calculator above shows exactly how much revenue you\'re leaving on the table — and how much a basic cancel flow could recover.',
  },
  {
    q: 'Is this calculator free to use?',
    a: 'Yes — completely free, no signup required. ChurnRecovery\'s cancel flow tool is also free (we\'re in early access). We believe founders shouldn\'t have to pay $250/month just to stop losing customers. Use the calculator, understand your numbers, then join the waitlist if you want to plug the leak.',
  },
]

export default function ChurnRateCalculatorPage() {
  const title = 'Membership Site Churn Rate Calculator — Free Tool'
  const description = 'Calculate your membership site churn rate and see how much revenue you\'re losing. Includes industry benchmarks, reduction strategies, and a free cancel flow to stop the bleed.'
  const canonicalUrl = 'https://churnrecovery.com/tools/churn-rate-calculator'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Membership Site Churn Rate Calculator',
    description,
    url: canonicalUrl,
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
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="membership site churn rate calculator, churn rate calculator, membership churn calculator, online community churn, subscription churn calculator, churn rate formula" />
        <link rel="canonical" href={canonicalUrl} />

        {/* OG Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ChurnRecovery" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="bg-[#FAF9F5] min-h-screen font-sans">

        {/* Nav */}
        <nav className="border-b border-[#E5E5E5] bg-white px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
          <Link href="/" className="font-sans font-bold text-[1.1rem] text-[#191919] no-underline tracking-[-0.01em]">
            ChurnRecovery
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/demo" className="text-[#666] no-underline text-[0.9rem]">Demo</Link>
            <Link href="/blog" className="text-[#666] no-underline text-[0.9rem]">Blog</Link>
            <a href="/#waitlist" className="bg-[#D97757] text-white px-[18px] py-2 rounded-[6px] no-underline text-[0.85rem] font-semibold">Join Waitlist</a>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-[760px] mx-auto pt-4 px-6 text-[0.8rem] text-[#999]">
          <Link href="/" className="text-[#999] no-underline">Home</Link>
          {' '}/{' '}
          <span className="text-[#666]">Tools</span>
          {' '}/{' '}
          <span className="text-[#191919]">Churn Rate Calculator</span>
        </div>

        {/* Hero */}
        <section className="max-w-[760px] mx-auto pt-12 px-6 pb-10 text-center">
          <div className="inline-block bg-[#F0EBE5] text-[#D97757] px-[14px] py-1 rounded-[4px] text-[0.72rem] font-bold uppercase tracking-[0.08em] mb-5">
            Free Membership Tool
          </div>
          <h1 className="font-sans font-extrabold text-[#191919] tracking-[-0.04em] mb-4 leading-[1.15]" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
            Membership Site Churn Rate Calculator
          </h1>
          <p className="font-serif text-[1.1rem] text-[#666] leading-[1.7] max-w-[560px] mx-auto mb-3">
            Enter your membership numbers and instantly see your churn rate, the revenue you're losing each month, and how much a cancel flow could save. Free. No signup.
          </p>
          <p className="font-sans text-[0.85rem] text-[#999] mx-auto mb-10">
            Takes 30 seconds · 100% free · No email required
          </p>
        </section>

        {/* Calculator */}
        <section className="max-w-[760px] mx-auto px-6 pb-20">
          <ChurnCalculator />
        </section>

        {/* Post-calculator CTA */}
        <section className="bg-[#F5F0E8] border-t border-b border-[#E5E5E5] py-12 px-6 text-center">
          <div className="max-w-[560px] mx-auto">
            <p className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[#D97757] mb-3">
              Stop the bleed
            </p>
            <h2 className="font-sans font-bold text-[#191919] tracking-[-0.03em] mb-[14px] leading-[1.2]" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
              Now that you know your churn cost — do something about it
            </h2>
            <p className="font-serif text-[0.95rem] text-[#666] leading-[1.7] mb-7">
              ChurnRecovery intercepts cancellations with the right offer — a pause, a discount, a downgrade. Founders using cancel flows save 25–45% of churning members automatically. It's free.
            </p>
            <a href="https://tally.so/r/churnrecovery" className="inline-block bg-[#D97757] text-white px-8 py-[14px] rounded-lg font-sans font-bold text-base no-underline tracking-[-0.01em]">
              Join the Waitlist — It's Free
            </a>
            <p className="font-sans text-[0.78rem] text-[#999] mt-3">
              No credit card. No commitment. Cancel flows that actually work.
            </p>
          </div>
        </section>

        {/* What is churn rate */}
        <section className="max-w-[760px] mx-auto pt-[72px] px-6 pb-12">
          <h2 className="font-sans font-bold text-[#191919] tracking-[-0.03em] mb-5" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
            What is churn rate? And how do you calculate it?
          </h2>
          <div className="font-serif text-[0.95rem] text-[#666] leading-[1.8]">
            <p className="mb-4">
              <strong className="text-[#191919] font-sans">Churn rate</strong> is the percentage of paying members who cancel their subscription during a given time period. It's the single most important health metric for any membership site, community, or subscription business.
            </p>
            <p className="mb-4">
              The churn rate formula is straightforward:
            </p>
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 mb-5 text-center">
              <p className="font-sans text-[1.1rem] font-bold text-[#191919] m-0 tracking-[-0.02em]">
                Churn Rate = (Members Lost ÷ Members at Start of Period) × 100
              </p>
              <p className="font-sans text-[0.82rem] text-[#999] mt-2 mb-0">
                Example: 25 cancellations ÷ 500 members × 100 = 5% monthly churn
              </p>
            </div>
            <p className="mb-4">
              Most membership sites track monthly churn rate because billing is monthly. Annual churn rate is roughly 12× monthly churn for rough benchmarking, though the real number compounds slightly higher.
            </p>
            <p className="m-0">
              The calculator above computes this for you automatically — and goes further by translating churn rate into actual dollars lost per month and per year, which is what motivates action.
            </p>
          </div>
        </section>

        {/* Benchmarks by industry */}
        <section className="bg-white border-t border-b border-[#E5E5E5] py-[72px] px-6">
          <div className="max-w-[760px] mx-auto">
            <h2 className="font-sans font-bold text-[#191919] tracking-[-0.03em] mb-3" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
              What's a good churn rate? Benchmarks by membership type
            </h2>
            <p className="font-serif text-[0.95rem] text-[#666] leading-[1.7] mb-9">
              Churn benchmarks vary significantly by market. Here's what's typical — and what's excellent — across common membership site categories.
            </p>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 mb-10">
              {[
                { type: 'B2B SaaS / Software', avg: '3–5%', excellent: '< 1.5%', bad: '> 7%' },
                { type: 'Online Courses / E-learning', avg: '5–8%', excellent: '< 3%', bad: '> 10%' },
                { type: 'Content / Newsletter Members', avg: '4–7%', excellent: '< 2%', bad: '> 9%' },
                { type: 'Online Communities', avg: '5–9%', excellent: '< 3%', bad: '> 12%' },
                { type: 'Coaching / Mastermind', avg: '3–6%', excellent: '< 2%', bad: '> 8%' },
                { type: 'Fitness / Wellness Subscriptions', avg: '6–10%', excellent: '< 4%', bad: '> 15%' },
              ].map(item => (
                <div key={item.type} className="p-5 border border-[#E5E5E5] rounded-[10px]">
                  <div className="font-sans text-[0.82rem] font-bold text-[#191919] mb-3 leading-[1.3]">
                    {item.type}
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-[0.72rem] text-[#999]">Average</span>
                      <span className="font-sans text-[0.82rem] font-semibold text-[#666]">{item.avg}/mo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-[0.72rem] text-[#999]">Excellent</span>
                      <span className="font-sans text-[0.82rem] font-semibold text-[#2D7A4F]">{item.excellent}/mo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-[0.72rem] text-[#999]">Problem zone</span>
                      <span className="font-sans text-[0.82rem] font-semibold text-[#B91C1C]">{item.bad}/mo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#F0EBE5] rounded-[10px] py-5 px-6 border-l-4 border-l-[#D97757]">
              <p className="font-serif text-[0.9rem] text-[#191919] leading-[1.7] m-0">
                <strong>Rule of thumb:</strong> If your monthly churn is above 5%, you have a retention problem worth fixing today. If it's above 8%, churn is likely your #1 business risk. A cancel flow alone typically saves 25–45% of would-be churners.
              </p>
            </div>
          </div>
        </section>

        {/* How to reduce churn */}
        <section className="max-w-[760px] mx-auto py-[72px] px-6">
          <h2 className="font-sans font-bold text-[#191919] tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
            How to reduce churn on your membership site
          </h2>
          <p className="font-serif text-[0.95rem] text-[#666] leading-[1.7] mb-9">
            Churn has two phases: before someone decides to leave, and the moment they click "cancel." Both are winnable with the right approach.
          </p>

          <div className="flex flex-col gap-8">
            {[
              {
                number: '01',
                title: 'Nail onboarding — the first 7 days matter most',
                body: 'Members who achieve a meaningful outcome in their first week retain at 2–3× the rate of those who don\'t. Map your fastest path to value and make it the default onboarding experience. A single "quick win" email sequence in week 1 can move retention metrics more than months of content production.',
              },
              {
                number: '02',
                title: 'Deliver consistent, predictable value',
                body: 'Churn spikes when members feel the membership has "gone quiet" — no new content, no community activity, no fresh reason to stay. A simple monthly rhythm (one live call, one new module, one community challenge) dramatically increases perceived value even if the total amount of content stays the same.',
              },
              {
                number: '03',
                title: 'Implement a cancel flow before members leave',
                body: 'Most cancellation decisions are emotional and reversible. A cancel flow intercepts the moment someone clicks "cancel" and presents the right offer — a month\'s pause, a 20% discount, a lighter tier. This alone saves 25–45% of would-be churners. It\'s the highest-ROI retention lever available to membership sites, and it\'s what ChurnRecovery automates for free.',
              },
              {
                number: '04',
                title: 'Send win-back campaigns to lapsed members',
                body: 'Members who cancelled 30–90 days ago are 10–15× more likely to resubscribe than cold leads. A simple 3-email win-back sequence with a time-limited offer ("come back for $X this week") recovers 15–30% of lapsed members who open. This is low-hanging fruit that most membership sites ignore.',
              },
              {
                number: '05',
                title: 'Fix involuntary churn (failed payments)',
                body: 'Up to 40% of membership churn is passive — failed payments that no one follows up on. Smart retry logic (retry on different days, at different times) combined with dunning emails ("your card failed, here\'s how to update it") can recover 60–80% of these failed payments automatically.',
              },
            ].map(item => (
              <div key={item.number} className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#F0EBE5] flex items-center justify-center font-sans text-[0.72rem] font-extrabold text-[#D97757] tracking-[0.04em]">
                  {item.number}
                </div>
                <div>
                  <h3 className="font-sans text-[0.95rem] font-bold text-[#191919] mb-2 tracking-[-0.01em] leading-[1.3]">
                    {item.title}
                  </h3>
                  <p className="font-serif text-[0.9rem] text-[#666] leading-[1.7] m-0">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* When to use section */}
        <section className="bg-white border-t border-b border-[#E5E5E5] py-[72px] px-6">
          <div className="max-w-[760px] mx-auto">
            <h2 className="font-sans font-bold text-[#191919] tracking-[-0.03em] mb-5" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
              When to use a membership site churn rate calculator
            </h2>
            <p className="font-serif text-[0.95rem] text-[#666] leading-[1.7] mb-7">
              The calculator above is most useful in these situations:
            </p>
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              {[
                'You\'ve never calculated your churn rate before and want a baseline',
                'You\'re pitching a retention investment (cancel flow, community manager, new content) to a co-founder or team and need the revenue impact in dollars',
                'You want to benchmark against industry standards to know if your churn is a real problem or typical for your category',
                'You\'re modeling what it would be worth to reduce churn by 1–2 percentage points',
                'A member just cancelled and you\'re wondering how much revenue is really at stake per cancellation',
                'You\'re evaluating retention tools and want to know the ROI threshold for when a paid tool makes sense',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[#E8F5ED] flex items-center justify-center text-[0.65rem] text-[#2D7A4F] font-extrabold mt-[2px]">
                    ✓
                  </span>
                  <span className="font-serif text-[0.9rem] text-[#666] leading-[1.6]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-[760px] mx-auto py-[72px] px-6">
          <h2 className="font-sans font-bold text-[#191919] tracking-[-0.03em] mb-10 text-center" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)' }}>
            The numbers behind membership site retention
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
            {[
              {
                stat: '5–7%',
                label: 'Average monthly churn for membership sites',
                body: 'Industry-wide average. If you\'re under 3%, you\'re doing well. If you\'re over 8%, churn is your biggest business problem.',
              },
              {
                stat: '25–45%',
                label: 'Members saved by a good cancel flow',
                body: 'The range across membership sites running cancel flows. The right offer at the moment of cancellation changes minds that are already made up.',
              },
              {
                stat: '5×',
                label: 'More expensive to acquire than retain',
                body: 'Keeping a member costs a fraction of finding a new one. Every cancellation you prevent is worth 5× a new signup.',
              },
              {
                stat: '40%',
                label: 'Of churn that\'s involuntary (failed payments)',
                body: 'Many membership site owners don\'t realize nearly half their lost members never intended to cancel — their cards just declined.',
              },
            ].map(item => (
              <div key={item.stat} className="p-6 border border-[#E5E5E5] rounded-[10px] bg-white">
                <div className="font-sans font-extrabold text-[2rem] text-[#D97757] tracking-[-0.04em] leading-none mb-2">
                  {item.stat}
                </div>
                <div className="font-sans text-[0.82rem] font-semibold text-[#191919] mb-2 leading-[1.3]">
                  {item.label}
                </div>
                <p className="font-serif text-[0.8rem] text-[#666] leading-[1.6] m-0">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border-t border-b border-[#E5E5E5] py-[72px] px-6">
          <div className="max-w-[760px] mx-auto">
            <h2 className="font-sans font-bold text-[#191919] tracking-[-0.03em] mb-10" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)' }}>
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-7">
              {faqItems.map(item => (
                <div key={item.q} className="border-b border-[#E5E5E5] pb-7">
                  <h3 className="font-sans text-[0.95rem] font-bold text-[#191919] mb-[10px] tracking-[-0.01em] leading-[1.4]">
                    {item.q}
                  </h3>
                  <p className="font-serif text-[0.9rem] text-[#666] leading-[1.7] m-0">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related resources */}
        <section className="max-w-[760px] mx-auto pt-16 px-6 pb-12">
          <h2 className="font-sans text-[1.2rem] font-bold text-[#191919] tracking-[-0.02em] mb-6">
            Go deeper on membership site retention
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
            {[
              { href: '/demo', label: '→ Try the cancel flow demo' },
              { href: '/posts/membership-site-churn-rate', label: '→ Membership site churn guide' },
              { href: '/posts/Ultimate-Guide-SaaS-Churn', label: '→ Ultimate guide to churn' },
              { href: '/posts/Cancel-Flow-Examples', label: '→ Cancel flow examples' },
              { href: '/posts/Involuntary-Churn-Recovery', label: '→ Involuntary churn recovery' },
              { href: '/tools/churn-calculator', label: '→ SaaS revenue calculator' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block py-3 px-4 border border-[#E5E5E5] rounded-lg font-sans text-[0.85rem] text-[#191919] no-underline font-medium">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#191919] py-20 px-6 text-center">
          <h2 className="font-sans font-bold text-white tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
            Ready to stop losing members?
          </h2>
          <p className="font-serif text-base text-white/70 mb-8 max-w-[460px] mx-auto leading-[1.7]">
            Join the waitlist for ChurnRecovery — the free cancel flow platform for membership sites, communities, and SaaS founders.
          </p>
          <a href="https://tally.so/r/churnrecovery" className="inline-block bg-[#D97757] text-white px-8 py-[14px] rounded-lg font-sans font-bold text-base no-underline tracking-[-0.01em]">
            Join the Waitlist — Free
          </a>
          <p className="font-sans text-[0.78rem] text-white/40 mt-[14px]">
            No credit card. No commitment. Set up in minutes.
          </p>
        </section>
      </div>
    </>
  )
}
