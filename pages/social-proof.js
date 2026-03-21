import Head from 'next/head'
import Link from 'next/link'
import WaitlistForm from '../components/WaitlistForm'

// ─── Testimonial Placeholder ─────────────────────────────────────────────────
function TestimonialPlaceholder({ platform, role }) {
  return (
    <div className="border-[1.5px] border-dashed border-[#E5E5E5] rounded-xl p-7 bg-white relative overflow-hidden">
      {/* Placeholder badge */}
      <div className="absolute top-4 right-4 bg-[#F0EFEC] text-[#999999] text-[0.7rem] font-[Instrument_Sans,sans-serif] font-semibold tracking-[0.05em] uppercase px-2 py-1 rounded">
        Coming soon
      </div>

      {/* Quote icon */}
      <div className="text-[1.8rem] text-[#F0EFEC] font-[Georgia,serif] leading-none mb-3">
        &ldquo;
      </div>

      {/* Placeholder lines */}
      <div className="flex flex-col gap-2 mb-5">
        {[90, 100, 75].map((w, i) => (
          <div key={i} className="h-[14px] bg-[#F0EFEC] rounded" style={{ width: `${w}%` }} />
        ))}
      </div>

      {/* Author area */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#F0EFEC] shrink-0" />
        <div className="flex flex-col gap-[6px]">
          <div className="h-3 w-[120px] bg-[#F0EFEC] rounded-[3px]" />
          <div className="h-[11px] w-[80px] bg-[#F0EFEC] rounded-[3px]" />
        </div>
      </div>

      {/* Platform tag */}
      {platform && (
        <div className="mt-4 inline-block bg-[#FDF0EB] text-[#D97757] text-xs font-[Instrument_Sans,sans-serif] font-semibold px-[10px] py-[3px] rounded-[20px]">
          {platform}
        </div>
      )}
    </div>
  )
}

// ─── Real Testimonial (for when we have them) ─────────────────────────────────
function Testimonial({ quote, name, role, platform, avatar }) {
  return (
    <div className="border border-[#E5E5E5] rounded-xl p-7 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="text-[1.8rem] text-[#D97757] font-[Georgia,serif] leading-none mb-3">
        &ldquo;
      </div>
      <p className="font-[Merriweather,serif] text-[0.95rem] text-[#191919] leading-[1.65] m-0 mb-5 italic">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        {avatar ? (
          <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#FDF0EB] flex items-center justify-center font-[Instrument_Sans,sans-serif] font-bold text-[0.85rem] text-[#D97757] shrink-0">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-[Instrument_Sans,sans-serif] font-semibold text-sm text-[#191919]">
            {name}
          </div>
          <div className="font-[Instrument_Sans,sans-serif] text-[0.8rem] text-[#999999]">
            {role}
          </div>
        </div>
        {platform && (
          <div className="ml-auto bg-[#FDF0EB] text-[#D97757] text-xs font-[Instrument_Sans,sans-serif] font-semibold px-[10px] py-[3px] rounded-[20px] shrink-0">
            {platform}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Twitter Mention (embed-ready) ───────────────────────────────────────────
function TwitterMentionPlaceholder() {
  return (
    <div className="border-[1.5px] border-dashed border-[#E5E5E5] rounded-xl p-5 bg-white">
      <div className="flex items-center gap-[10px] mb-3">
        <div className="w-10 h-10 rounded-full bg-[#F0EFEC] shrink-0" />
        <div className="flex flex-col gap-[6px] flex-1">
          <div className="h-3 w-[140px] bg-[#F0EFEC] rounded-[3px]" />
          <div className="h-[11px] w-[90px] bg-[#F0EFEC] rounded-[3px]" />
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#F0EFEC">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        {[100, 85, 60].map((w, i) => (
          <div key={i} className="h-[13px] bg-[#F0EFEC] rounded" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-[14px] text-xs text-[#999999] font-[Instrument_Sans,sans-serif] italic">
        Twitter mention — coming soon
      </div>
    </div>
  )
}

// ─── Press Mention ────────────────────────────────────────────────────────────
function PressMentionPlaceholder({ outlet }) {
  return (
    <div className="border-[1.5px] border-dashed border-[#E5E5E5] rounded-[10px] px-6 py-5 bg-white flex items-center gap-4">
      <div className="w-12 h-12 bg-[#F0EFEC] rounded-lg shrink-0" />
      <div className="flex-1">
        <div className="font-[Instrument_Sans,sans-serif] font-semibold text-sm text-[#999999] mb-[6px]">
          {outlet}
        </div>
        <div className="h-3 w-[70%] bg-[#F0EFEC] rounded-[3px]" />
      </div>
      <div className="text-xs text-[#999999] font-[Instrument_Sans,sans-serif] whitespace-nowrap">
        Coverage pending
      </div>
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ number, label, sublabel }) {
  return (
    <div className="text-center py-8 px-5 bg-white border border-[#E5E5E5] rounded-xl">
      <div className="font-[Instrument_Sans,sans-serif] font-bold text-[2.5rem] text-[#D97757] leading-none mb-2">
        {number}
      </div>
      <div className="font-[Instrument_Sans,sans-serif] font-semibold text-[0.9rem] text-[#191919] mb-1">
        {label}
      </div>
      {sublabel && (
        <div className="font-[Instrument_Sans,sans-serif] text-[0.8rem] text-[#999999]">
          {sublabel}
        </div>
      )}
    </div>
  )
}

// ─── Community Reaction ───────────────────────────────────────────────────────
function CommunityReaction({ community, type, summary, link }) {
  return (
    <div className="border border-[#E5E5E5] rounded-[10px] p-5 bg-white flex flex-col gap-[10px]">
      <div className="flex items-center justify-between">
        <span className="font-[Instrument_Sans,sans-serif] font-semibold text-sm text-[#191919]">
          {community}
        </span>
        <span className="bg-[#F5F0FF] text-[#7C3AED] text-[0.72rem] font-[Instrument_Sans,sans-serif] font-semibold px-[9px] py-[3px] rounded-[20px]">
          {type}
        </span>
      </div>
      <p className="font-[Merriweather,serif] text-sm text-[#666666] m-0 leading-relaxed italic">
        &ldquo;{summary}&rdquo;
      </p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[Instrument_Sans,sans-serif] text-[0.8rem] text-[#D97757] no-underline"
        >
          Read thread →
        </a>
      )}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function SocialProofPage() {
  // Real testimonials go here as they come in
  const realTestimonials = []

  // Community reactions (update as they come in)
  const communityReactions = [
    {
      community: 'Indie Hackers',
      type: 'Discussion',
      summary: 'Thread coming after launch. Watch this space.',
      link: null,
    },
    {
      community: 'r/SaaS',
      type: 'Discussion',
      summary: 'Thread coming after launch. Watch this space.',
      link: null,
    },
    {
      community: 'Hacker News',
      type: 'Show HN',
      summary: 'Show HN submission coming. Watch this space.',
      link: null,
    },
  ]

  return (
    <>
      <Head>
        <title>What People Are Saying — ChurnRecovery</title>
        <meta
          name="description"
          content="Testimonials, community reactions, and press mentions for ChurnRecovery — the free churn recovery tool for newsletters, coaches, and subscription businesses."
        />
        <link rel="canonical" href="https://churnrecovery.com/social-proof" />
      </Head>

      <div className="bg-[#FAF9F5] min-h-screen font-[Instrument_Sans,sans-serif]">

        {/* Nav */}
        <nav className="border-b border-[#E5E5E5] bg-white px-6 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
          <Link href="/" className="font-[Instrument_Sans,sans-serif] font-bold text-[1.1rem] text-[#191919] no-underline">
            ChurnRecovery
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/features" className="text-[#666666] no-underline text-[0.9rem]">Features</Link>
            <Link href="/pricing" className="text-[#666666] no-underline text-[0.9rem]">Pricing</Link>
            <a href="/#waitlist" className="bg-[#D97757] text-white px-[18px] py-2 rounded-[6px] no-underline text-sm font-semibold">
              Join Waitlist
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-[860px] mx-auto px-6 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FDF0EB] text-[#D97757] px-4 py-[6px] rounded-[20px] text-[0.8rem] font-semibold mb-6">
            <span>🎙️</span>
            <span>500+ business owners on the waitlist</span>
          </div>

          <h1 className="font-[Instrument_Sans,sans-serif] font-bold text-[#191919] leading-[1.15] m-0 mb-5 tracking-[-0.02em] text-[clamp(2rem,5vw,3rem)]">
            What People Are Saying<br />About ChurnRecovery
          </h1>

          <p className="font-[Merriweather,serif] text-[1.1rem] text-[#666666] leading-[1.65] mx-auto max-w-[560px]">
            Real reactions from newsletter operators, coaches, and indie founders who are tired of paying $250/mo just to keep their subscribers.
          </p>
        </section>

        {/* Social proof stats bar */}
        <section className="max-w-[900px] mx-auto px-6 pb-[60px]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
            <StatCard number="500+" label="Waitlist Members" sublabel="and growing" />
            <StatCard number="~30%" label="Avg. Save Rate" sublabel="of at-risk subscribers" />
            <StatCard number="$0" label="Cost to Start" sublabel="free forever core tier" />
            <StatCard number="10+" label="Platforms Supported" sublabel="Stripe-connected tools" />
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-[900px] mx-auto px-6 pb-20">
          <div className="mb-8">
            <h2 className="font-[Instrument_Sans,sans-serif] font-bold text-[1.5rem] text-[#191919] m-0 mb-2">
              Customer Testimonials
            </h2>
            <p className="font-[Instrument_Sans,sans-serif] text-[0.9rem] text-[#999999] m-0">
              We&apos;re in pre-launch. Real quotes are on their way — sign up to be one of the first.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
            {realTestimonials.length > 0 ? (
              realTestimonials.map((t, i) => (
                <Testimonial key={i} {...t} />
              ))
            ) : (
              <>
                <TestimonialPlaceholder platform="Newsletter creator" />
                <TestimonialPlaceholder platform="Coaching business" />
                <TestimonialPlaceholder platform="SaaS founder" />
                <TestimonialPlaceholder platform="Membership community" />
                <TestimonialPlaceholder platform="Online course creator" />
                <TestimonialPlaceholder platform="Indie hacker" />
              </>
            )}
          </div>

          <div className="mt-6 px-5 py-4 bg-[#FDF0EB] rounded-lg flex items-center gap-3">
            <span className="text-[1.2rem]">✉️</span>
            <p className="font-[Instrument_Sans,sans-serif] text-sm text-[#D97757] m-0 font-medium">
              Are you on the waitlist? We&apos;d love to feature your story.{' '}
              <a href="mailto:hello@churnrecovery.com?subject=I want to share my story" className="text-[#D97757] font-bold">
                Reach out
              </a>
              .
            </p>
          </div>
        </section>

        {/* Twitter Mentions */}
        <section className="bg-white border-y border-[#E5E5E5]">
          <div className="max-w-[900px] mx-auto px-6 py-[60px]">
            <div className="mb-8 flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#191919">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <div>
                <h2 className="font-[Instrument_Sans,sans-serif] font-bold text-[1.5rem] text-[#191919] m-0">
                  Twitter Mentions
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
              <TwitterMentionPlaceholder />
              <TwitterMentionPlaceholder />
              <TwitterMentionPlaceholder />
            </div>

            <p className="font-[Instrument_Sans,sans-serif] text-[0.85rem] text-[#999999] mt-5 text-center">
              Mentioned us on Twitter?{' '}
              <a
                href="https://twitter.com/intent/tweet?text=Just+discovered+%40ChurnRecovery+%E2%80%94+free+churn+recovery+for+subscription+businesses.+%F0%9F%92%8C&url=https%3A%2F%2Fchurnrecovery.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D97757] no-underline font-semibold"
              >
                Share the news
              </a>{' '}
              and tag{' '}
              <a
                href="https://twitter.com/ChurnRecovery"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D97757] no-underline"
              >
                @ChurnRecovery
              </a>
              .
            </p>
          </div>
        </section>

        {/* Press Mentions */}
        <section className="max-w-[900px] mx-auto px-6 py-[60px]">
          <div className="mb-8">
            <h2 className="font-[Instrument_Sans,sans-serif] font-bold text-[1.5rem] text-[#191919] m-0 mb-2">
              Press &amp; Coverage
            </h2>
            <p className="font-[Instrument_Sans,sans-serif] text-[0.9rem] text-[#999999] m-0">
              Pre-launch. Coverage coming as we grow.{' '}
              <Link href="/press" className="text-[#D97757] no-underline font-semibold">
                Press kit →
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <PressMentionPlaceholder outlet="Indie Hackers" />
            <PressMentionPlaceholder outlet="Hacker News" />
            <PressMentionPlaceholder outlet="Product Hunt" />
            <PressMentionPlaceholder outlet="Newsletter Creator community" />
          </div>
        </section>

        {/* Community Reactions */}
        <section className="bg-white border-y border-[#E5E5E5]">
          <div className="max-w-[900px] mx-auto px-6 py-[60px]">
            <div className="mb-8">
              <h2 className="font-[Instrument_Sans,sans-serif] font-bold text-[1.5rem] text-[#191919] m-0 mb-2">
                Community Reactions
              </h2>
              <p className="font-[Instrument_Sans,sans-serif] text-[0.9rem] text-[#999999] m-0">
                What the indie builder community is saying about the churn recovery gap.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
              {communityReactions.map((reaction, i) => (
                <CommunityReaction key={i} {...reaction} />
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="max-w-[640px] mx-auto px-6 py-20 text-center">
          <div className="bg-white border border-[#E5E5E5] rounded-2xl px-10 py-12 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="text-[2rem] mb-4">🚀</div>
            <h2 className="font-[Instrument_Sans,sans-serif] font-bold text-[1.6rem] text-[#191919] m-0 mb-3 leading-[1.25]">
              Join 500+ business owners on the waitlist
            </h2>
            <p className="font-[Merriweather,serif] text-[0.95rem] text-[#666666] leading-[1.65] m-0 mb-8">
              ChurnRecovery is free forever. No credit card. No $250/mo Churnkey contract.
              Just a cancel flow that keeps your subscribers.
            </p>

            <WaitlistForm source="social-proof" />

            <p className="font-[Instrument_Sans,sans-serif] text-[0.8rem] text-[#999999] mt-4 mb-0">
              Free forever. Unsubscribe anytime.
            </p>
          </div>
        </section>

      </div>
    </>
  )
}
