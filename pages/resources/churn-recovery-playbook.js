import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WaitlistForm from '../../components/WaitlistForm'

const chapters = [
  {
    num: '01',
    title: 'Understanding Why Subscribers Cancel',
    desc: 'The psychology behind churn — value gaps, life friction, forgotten engagement, and how to diagnose which problem you actually have.',
  },
  {
    num: '02',
    title: 'The Cancel Flow: Your Last Line of Defense',
    desc: 'Step-by-step anatomy of a cancel flow that saves 15–35% of would-be cancellations. With benchmarks and what to avoid.',
  },
  {
    num: '03',
    title: 'Pause vs. Cancel: Giving Subscribers a Lifeline',
    desc: "Why pause is the single highest-ROI retention feature you can add — and how 25–40% of cancelers will take it.",
  },
  {
    num: '04',
    title: 'Smart Offers That Win Back Subscribers',
    desc: 'The win-back window, offer types that actually convert, and what not to do when trying to recover churned subscribers.',
  },
  {
    num: '05',
    title: 'Email Recovery Sequences That Work',
    desc: 'Pre-cancellation at-risk sequences, post-cancellation win-back flows, subject lines that get opens, and timing that matters.',
  },
  {
    num: '06',
    title: 'Tracking Churn: Metrics Every Owner Should Know',
    desc: 'Monthly churn rate, NRR, cohort retention, save rate — the six numbers that tell you everything about your membership health.',
  },
  {
    num: '07',
    title: 'Platform-Specific Tips',
    desc: 'Tailored tactics for Substack, Kajabi, Ghost, Memberful, Circle, and more. What each platform does well and where you need workarounds.',
  },
  {
    num: '08',
    title: '30-Day Churn Reduction Action Plan',
    desc: 'A week-by-week action plan to measurably reduce churn in the next 30 days. Prioritized by impact, not complexity.',
  },
]

const testimonials = [
  {
    quote: "Our save rate jumped from basically zero to 22% after implementing a proper cancel flow. The pause offer alone saved us hundreds of dollars a month.",
    author: "Sarah K.",
    role: "Membership site owner, 800+ subscribers",
    avatar: "SK",
    color: '#D97757',
  },
  {
    quote: "I didn't realize how much money I was leaving on the table until I started measuring cohort retention. The playbook made it simple to understand what to fix first.",
    author: "Marcus T.",
    role: "Newsletter operator, Substack",
    avatar: "MT",
    color: '#2D7A4F',
  },
  {
    quote: "The win-back email sequence brought back 18% of canceled members in the first month. That's real money from a few hours of setup.",
    author: "Priya N.",
    role: "Course creator, Kajabi",
    avatar: "PN",
    color: '#5B4FCF',
  },
]

const stats = [
  { value: '15–35%', label: 'Average cancel flow save rate' },
  { value: '25%', label: 'Of cancelers choose to pause instead' },
  { value: '10–18%', label: 'Win-back rate with email sequence' },
  { value: '5×', label: 'LTV increase from 1% churn reduction' },
]

export default function ChurnRecoveryPlaybook() {
  const title = 'The Membership Site Churn Recovery Playbook — Free PDF Guide'
  const description = 'A comprehensive guide to stopping subscriber cancellations and recovering lost revenue. 8 chapters covering cancel flows, pause strategies, win-back sequences, and platform-specific tactics. Free download.'
  const url = 'https://churnrecovery.com/resources/churn-recovery-playbook'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content="The Membership Site Churn Recovery Playbook" />
        <meta property="og:description" content="Stop losing subscribers. This free 8-chapter guide covers cancel flows, pause strategies, win-back sequences, and platform-specific tactics that actually work." />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://churnrecovery.com/og/default.svg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Membership Site Churn Recovery Playbook — Free" />
        <meta name="twitter:description" content="8-chapter guide to reducing churn for membership site owners. Cancel flows, pause options, win-back emails, and platform tips. Free download." />
        <meta name="twitter:image" content="https://churnrecovery.com/og/default.svg" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Book',
              name: 'The Membership Site Churn Recovery Playbook',
              description,
              url,
              author: {
                '@type': 'Organization',
                name: 'ChurnRecovery',
                url: 'https://churnrecovery.com',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              genre: 'Business',
            }),
          }}
        />
      </Head>

      <Header />

      <main className="bg-brand-bg min-h-screen">

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#191919] to-[#2A1A12] pt-[100px] px-6 pb-20 relative overflow-hidden mt-[60px]">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(217,119,87,0.15)_0%,transparent_60%)] pointer-events-none" />

          <div className="max-w-[1100px] mx-auto relative">
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,400px)] gap-14 items-center">

              {/* Left: Copy */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[rgba(217,119,87,0.15)] border border-[rgba(217,119,87,0.3)] rounded-full px-[14px] py-[6px] mb-6">
                  <span className="text-[0.7rem] text-brand-accent font-sans font-bold tracking-[0.08em] uppercase">
                    Free Resource · PDF Guide
                  </span>
                </div>

                <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-bold text-brand-white leading-[1.2] mb-5">
                  The Membership Site<br />
                  <span className="text-brand-accent">Churn Recovery</span><br />
                  Playbook
                </h1>

                <p className="font-sans text-[1.05rem] text-[rgba(255,255,255,0.7)] leading-[1.7] mb-8 max-w-[500px]">
                  Everything you need to stop losing subscribers, recover churned members, and build a membership that retains. 8 chapters, real benchmarks, actionable tactics.
                </p>

                {/* Stats row */}
                <div className="flex gap-8 flex-wrap mb-9">
                  {[
                    { v: '8 Chapters', l: 'of actionable content' },
                    { v: '3,000+', l: 'words of tactics' },
                    { v: '100% Free', l: 'no credit card' },
                  ].map(s => (
                    <div key={s.v}>
                      <div className="font-sans font-bold text-[1.05rem] text-brand-white">
                        {s.v}
                      </div>
                      <div className="font-sans text-[0.75rem] text-[rgba(255,255,255,0.5)] mt-[2px]">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {['S', 'M', 'P', 'J', 'A'].map((initial, i) => (
                      <div key={i} className="w-[30px] h-[30px] rounded-full border-2 border-[#2A1A12] flex items-center justify-center font-sans font-bold text-[0.65rem] text-brand-white" style={{
                        background: ['#D97757', '#2D7A4F', '#5B4FCF', '#C9A227', '#3B7DD8'][i],
                        marginLeft: i > 0 ? '-8px' : 0,
                      }}>
                        {initial}
                      </div>
                    ))}
                  </div>
                  <span className="font-sans text-[0.82rem] text-[rgba(255,255,255,0.6)]">
                    Join <strong className="text-brand-white">500+ membership site owners</strong> who've downloaded this guide
                  </span>
                </div>
              </div>

              {/* Right: Book mockup + form */}
              <div>
                {/* Book cover mockup */}
                <div className="bg-gradient-to-br from-[#D97757] to-[#B85E3A] rounded-xl pt-9 px-7 pb-9 mb-5 relative" style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05), 6px 6px 0 rgba(0,0,0,0.3)',
                  transform: 'perspective(1000px) rotateY(-3deg)',
                }}>
                  {/* Spine */}
                  <div className="absolute left-0 top-0 bottom-0 w-[7px] bg-[rgba(0,0,0,0.25)] rounded-l-xl" />

                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-base">📉</span>
                    <span className="font-sans text-[0.65rem] font-bold text-[rgba(255,255,255,0.6)] tracking-[0.1em] uppercase">
                      ChurnRecovery.com
                    </span>
                  </div>

                  <h2 className="font-serif text-[1.45rem] font-bold text-brand-white leading-[1.25] mb-[10px]">
                    The Membership Site<br />Churn Recovery<br />Playbook
                  </h2>

                  <p className="font-sans text-[0.78rem] text-[rgba(255,255,255,0.8)] mb-7 leading-[1.5]">
                    Stop losing subscribers.<br />Recover lost revenue.<br />Build for retention.
                  </p>

                  <div className="border-t border-[rgba(255,255,255,0.2)] pt-[18px]">
                    {['Cancel Flow Tactics', 'Pause Strategies', 'Win-Back Sequences', 'Platform Tips'].map(item => (
                      <div key={item} className="flex items-center gap-2 font-sans text-[0.72rem] text-[rgba(255,255,255,0.8)] mb-[6px]">
                        <span className="text-[rgba(255,255,255,0.45)] text-[0.6rem]">▸</span>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* FREE badge */}
                  <div className="absolute top-[14px] right-[14px] bg-[#C9A227] rounded-full w-12 h-12 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                    <span className="font-sans font-extrabold text-[0.85rem] text-[#2A1A12] leading-none">FREE</span>
                  </div>
                </div>

                {/* Email form */}
                <div className="bg-brand-white rounded-xl p-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
                  <p className="font-sans text-[0.82rem] font-semibold text-brand-text mb-3 text-center">
                    Enter your email to get instant access ↓
                  </p>
                  <WaitlistForm source="playbook-download" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-[#FDF6E3] border-t border-b border-brand-border py-7 px-6">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 text-center">
              {stats.map(s => (
                <div key={s.value}>
                  <div className="font-serif font-bold text-[1.7rem] text-brand-accent mb-1">
                    {s.value}
                  </div>
                  <div className="font-sans text-[0.78rem] text-brand-gray leading-[1.4]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapters Section */}
        <section className="py-[72px] px-6 bg-brand-bg">
          <div className="max-w-[860px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold text-brand-text mb-[14px]">
                What's Inside
              </h2>
              <p className="font-sans text-base text-brand-gray max-w-[500px] mx-auto leading-[1.6]">
                8 chapters covering every aspect of membership retention — from the psychology of cancellation to a step-by-step 30-day action plan.
              </p>
            </div>

            <div>
              {chapters.map((ch, i) => (
                <div key={ch.num} className={`grid grid-cols-[52px_1fr] gap-5 py-6 items-start ${i < chapters.length - 1 ? 'border-b border-brand-border' : ''}`}>
                  <div className="w-11 h-11 rounded-[10px] bg-[#FDF0EA] border border-[rgba(217,119,87,0.2)] flex items-center justify-center font-sans font-extrabold text-[0.75rem] text-brand-accent shrink-0">
                    {ch.num}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-[0.95rem] text-brand-text mb-[5px]">
                      {ch.title}
                    </h3>
                    <p className="font-sans text-[0.85rem] text-brand-gray m-0 leading-[1.6]">
                      {ch.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-[72px] px-6 bg-[#F4F1EC] border-t border-brand-border">
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-serif text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold text-brand-text text-center mb-10">
              What Membership Operators Are Saying
            </h2>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
              {testimonials.map((tm, i) => (
                <div key={i} className="bg-brand-white rounded-xl p-6 border border-brand-border shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="text-[1.2rem] mb-[10px] text-brand-accent">❝</div>
                  <p className="font-serif text-[0.875rem] text-brand-text leading-[1.7] mb-[18px] italic">
                    {tm.quote}
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center font-sans font-bold text-[0.7rem] text-white shrink-0" style={{ background: tm.color }}>
                      {tm.avatar}
                    </div>
                    <div>
                      <div className="font-sans font-semibold text-[0.82rem] text-brand-text">{tm.author}</div>
                      <div className="font-sans text-[0.72rem] text-brand-gray-light">{tm.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-[72px] px-6 bg-[#191919] text-center">
          <div className="max-w-[520px] mx-auto">
            <div className="text-[2.2rem] mb-[14px]">📘</div>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold text-brand-white mb-[14px] leading-[1.3]">
              Ready to Stop Losing Subscribers?
            </h2>
            <p className="font-sans text-[0.95rem] text-[rgba(255,255,255,0.65)] mb-8 leading-[1.7]">
              Download the free playbook and start reducing churn this week. No fluff, no upsells — just the tactics that work.
            </p>
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-6">
              <WaitlistForm source="playbook-download" dark={true} />
            </div>
            <p className="font-sans text-[0.72rem] text-[rgba(255,255,255,0.35)] mt-[14px]">
              500+ membership site owners have already downloaded this guide.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
