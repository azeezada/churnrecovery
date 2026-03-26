import Link from 'next/link'
import Head from 'next/head'
import { getAllPosts } from '../lib/posts'
import SignUpCTA from '../components/SignUpCTA'
import LogoWall from '../components/LogoWall'
import { AnimatedHero, AnimatedHeroText } from '../components/ui/animated-hero'

// ─── How It Works Step ────────────────────────────────────────────────────
function Step({ number, title, description, screenshot, screenshotAlt }) {
  return (
    <div className="grid grid-cols-1 gap-6 step-card">
      <div className="flex gap-5 items-start">
        <div className="w-[44px] h-[44px] rounded-full bg-brand-accent/[0.08] border-2 border-brand-accent flex items-center justify-center font-sans font-bold text-lg text-brand-accent shrink-0">
          {number}
        </div>
        <div>
          <h3 className="font-sans text-lg font-semibold text-brand-text m-0 mb-1.5">
            {title}
          </h3>
          <p className="font-sans text-base text-gray-700 m-0 leading-[1.6]">
            {description}
          </p>
        </div>
      </div>
      {screenshot && (
        <div className="rounded-xl overflow-hidden border border-brand-border shadow-[0_4px_16px_rgba(0,0,0,0.07)]">
          <img
            src={screenshot}
            alt={screenshotAlt}
            className="w-full h-auto block"
          />
        </div>
      )}
    </div>
  )
}

// ─── Benefit Card ─────────────────────────────────────────────────────────
function BenefitCard({ emoji, title, description }) {
  return (
    <div className="p-6 sm:p-7 border border-brand-border rounded-xl bg-brand-white">
      <div className="text-[2rem] mb-3.5">{emoji}</div>
      <h3 className="font-sans text-lg font-semibold text-brand-text m-0 mb-2">
        {title}
      </h3>
      <p className="font-sans text-base text-gray-700 m-0 leading-[1.6]">
        {description}
      </p>
    </div>
  )
}

// ─── Post Card ────────────────────────────────────────────────────────────
function PostCard({ post }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <article className="home-post-card grid grid-cols-[120px_1fr] sm:gap-6 gap-3 items-baseline pb-7 border-b border-brand-border">
      {formattedDate && (
        <time className="font-sans text-sm text-gray-500 font-medium tracking-[0.02em]">
          {formattedDate}
        </time>
      )}
      <div>
        <h3 className="font-sans text-lg font-semibold m-0 mb-2 tracking-[-0.01em] leading-[1.3]">
          <Link
            href={`/posts/${post.slug}`}
            className="link-hover-accent"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="font-serif text-base text-gray-700 m-0 mb-3 leading-[1.6]">
            {post.excerpt}
          </p>
        )}
        <Link
          href={`/posts/${post.slug}`}
          className="link-hover-underline font-sans text-base text-brand-accent font-medium min-h-[44px] inline-flex items-center"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>ChurnRecovery — Stop Losing Subscribers You Already Earned</title>
        <meta name="description" content="Your subscribers are canceling and their payments are failing — but most of them would stay if you asked the right way. ChurnRecovery saves them automatically. 30-day free trial, then $20/month." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ChurnRecovery — Stop Losing Subscribers You Already Earned" />
        <meta property="og:description" content="Your subscribers are leaving — but most would stay if you asked the right way. Cancel flows, payment recovery, and analytics — $20/month." />
        <meta property="og:url" content="https://churnrecovery.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://churnrecovery.com/og/home.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ChurnRecovery — Stop Losing Subscribers You Already Earned" />
        <meta name="twitter:description" content="Your subscribers are leaving — but most would stay if you asked the right way. Cancel flows, payment recovery, and analytics — $20/month." />
        <meta name="twitter:image" content="https://churnrecovery.com/og/home.png" />
      </Head>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-brand-bg border-b border-brand-border pt-[100px]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 pt-[80px] pb-[72px]">
          <AnimatedHero
            eyebrow={
              <div className="inline-flex items-center gap-2 bg-brand-accent/[0.09] border border-brand-accent/25 rounded-full py-[5px] px-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
                <span className="font-sans text-[0.8rem] sm:text-[0.78rem] font-semibold text-brand-accent tracking-[0.06em] uppercase">
                  30-day free trial · No credit card required
                </span>
              </div>
            }
            headline={
              <h1 className="hero-heading text-brand-text m-0 max-w-[760px]">
                Your subscribers are leaving.<br />
                <AnimatedHeroText>Most would stay if you asked.</AnimatedHeroText>
              </h1>
            }
            subheadline={
              <p className="font-sans text-[clamp(1.15rem,2.5vw,1.35rem)] text-gray-700 m-0 max-w-[600px] leading-[1.55]">
                If you have 500 subscribers at $10/month and 5% monthly churn, you&apos;re
                losing <strong className="text-brand-text">$250 every month — $3,000/year</strong> — to
                cancellations alone. ChurnRecovery catches them before they&apos;re gone and
                wins them back automatically. <strong className="text-brand-text">$20/month after a 30-day free trial</strong>.
              </p>
            }
            cta={
              <>
                <div className="flex gap-3 flex-wrap items-center">
                  <a href="/app/sign-up" className="btn-accent min-h-[44px] flex items-center">
                    Start Saving Subscribers →
                  </a>
                  <Link href="/demo" className="btn-outline min-h-[44px] flex items-center">
                    See how it works
                  </Link>
                </div>
                <p className="font-sans text-base text-gray-600 mt-5 mb-0">
                  Works with newsletters, courses, coaching, memberships — any subscription business.
                </p>
              </>
            }
          />
        </div>

        {/* ── Hero Product Screenshot ─────────────────────────────────── */}
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8 pb-[72px]">
          <div className="rounded-2xl overflow-hidden border border-brand-border shadow-[0_8px_40px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)] bg-brand-white">
            {/* Browser chrome mockup */}
            <div className="bg-[#F0EFE9] border-b border-brand-border py-2.5 px-4 flex items-center gap-2">
              <span className="browser-dot bg-[#FF5F57]" />
              <span className="browser-dot bg-[#FEBC2E]" />
              <span className="browser-dot bg-[#28C840]" />
              <span className="flex-1 bg-brand-white rounded-[6px] py-1 px-3 text-sm text-gray-600 font-sans ml-2">
                app.churnrecovery.com/dashboard
              </span>
            </div>
            <img
              src="/screenshots/homepage-hero.webp"
              alt="ChurnRecovery dashboard showing recovered revenue, active cancel flows, and subscriber analytics — all in one place"
              className="w-full h-auto block"
            />
          </div>
          <p className="font-sans text-sm text-gray-600 text-center mt-3.5">
            The ChurnRecovery dashboard — see recovered revenue, cancel reasons, and active flows at a glance.
          </p>
        </div>
      </section>

      {/* ── LOGO WALL — add real logos to logos array to display; empty = hidden ── */}
      {/*
        To add a real logo:
          { name: 'Acme Newsletter', src: '/logos/acme.png', href: 'https://acme.com', type: 'Newsletter Creator' }
        See docs/customer-logo-wall-strategy.md for full guide.
      */}
      <LogoWall logos={[]} showPlaceholders={false} />

      {/* ── THE PROBLEM ──────────────────────────────────────────────────── */}
      <section className="border-b border-brand-border bg-brand-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 py-[72px]">
          <div className="max-w-[700px] mx-auto text-center">
            <span className="eyebrow text-brand-accent">The problem nobody talks about</span>
            <h2 className="section-heading text-brand-text mt-3 mb-5 mx-0">
              You&apos;re losing money every single month — and you might not even know it
            </h2>
            <p className="font-sans text-lg text-gray-700 leading-[1.7] m-0 mb-10">
              Credit cards expire. Banks decline charges. Subscribers forget to update their payment details.
              Others hit &ldquo;cancel&rdquo; on a bad day — even though they&apos;d stay if you offered a pause or a discount.
              These aren&apos;t lost causes. They&apos;re <strong className="text-brand-text">recoverable revenue</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 max-w-[900px] mx-auto text-center">
            {[
              { number: '5–10%', label: 'of payments fail every month — that\'s $500–$1,000/mo lost on a $10k MRR business' },
              { number: '~70%', label: 'of failed payments can be recovered — thousands in revenue you\'re leaving on the table' },
              { number: '20–40%', label: 'of cancels can be saved with the right offer — a $50k MRR business could save $10k–$20k/year' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-sans text-[2.2rem] font-semibold text-brand-accent tracking-[-0.03em] leading-none">
                  {stat.number}
                </div>
                <div className="font-sans text-base text-gray-600 mt-2 leading-[1.4]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IT DOES (benefits, not features) ────────────────────────── */}
      <section className="bg-brand-bg border-b border-brand-border">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 py-[72px]">
          <div className="mb-12">
            <span className="eyebrow text-brand-accent">What ChurnRecovery does for you</span>
            <h2 className="section-heading text-brand-text mt-3 m-0">
              Keep more subscribers without more work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <BenefitCard
              emoji="🛑"
              title="Subscribers cancel on impulse — and you lose them forever"
              description="Most cancels happen on a bad day. ChurnRecovery intercepts that moment with a friendly screen that asks why — then offers the right save: a pause, a discount, a plan switch. You decide what to offer."
            />
            <BenefitCard
              emoji="💳"
              title="Failed payments silently drain your revenue every month"
              description="Expired cards, bank declines, insufficient funds — you're losing subscribers who never meant to leave. ChurnRecovery retries payments at the right time and reminds subscribers to update their info before they even notice."
            />
            <BenefitCard
              emoji="📊"
              title="You're flying blind on why people leave"
              description="Without data, you can't fix churn — you can only watch it happen. ChurnRecovery shows you exactly why subscribers cancel, which offers work best, and how much revenue you've recovered."
            />
            <BenefitCard
              emoji="⚡"
              title="Enterprise tools take weeks to set up"
              description="You don't have an engineering team to integrate complex retention software. ChurnRecovery takes 5 minutes: copy one line into your site, connect your payment provider, and you're live."
            />
            <BenefitCard
              emoji="💰"
              title="$20/month. No per-subscriber fees. No revenue share."
              description="Cancel flows, payment recovery, and analytics — $20/month. No per-subscriber fees, no per-recovery fees, no 'upgrade to unlock' tricks. Your cost stays flat no matter how much you grow."
            />
            <BenefitCard
              emoji="🎨"
              title="Generic popups erode trust with your audience"
              description="Your subscribers should see your colors, your logo, your voice — not a generic popup from some tool they've never heard of. ChurnRecovery's cancel flow and recovery emails match your brand completely."
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-brand-white border-b border-brand-border">
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 lg:px-8 py-[72px]">
          <div className="mb-12 text-center">
            <span className="eyebrow text-brand-accent">How it works</span>
            <h2 className="section-heading text-brand-text mt-3 m-0">
              Three steps. Five minutes. More revenue.
            </h2>
          </div>

          <div className="flex flex-col gap-12">
            <Step
              number="1"
              title="Connect your payment provider"
              description="Link your Stripe, Paddle, or other payment account. Takes about 60 seconds — just click 'connect' and authorize."
              screenshot="/screenshots/product-flow-builder.webp"
              screenshotAlt="ChurnRecovery cancel flow builder — customize save offers, pause options, and cancellation reasons with a visual editor"
            />
            <Step
              number="2"
              title="Choose what to offer"
              description="Pick from proven templates: offer a discount, suggest a pause, switch their plan, or ask for feedback. Customize the message in your voice. No design skills needed."
              screenshot="/screenshots/product-dashboard-improved.webp"
              screenshotAlt="ChurnRecovery dashboard showing recovered revenue metrics, subscriber save rate, and payment recovery statistics"
            />
            <Step
              number="3"
              title="Start recovering revenue"
              description="That's it. When someone tries to cancel, they'll see your custom save flow. When a payment fails, we handle retries and reminders. You just watch the recovered revenue in your dashboard."
              screenshot="/screenshots/product-email-sequences.webp"
              screenshotAlt="ChurnRecovery automated email sequences — dunning emails for failed payments sent at the right time to recover subscribers"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/demo"
              className="link-hover-underline font-sans font-semibold text-base text-brand-accent min-h-[44px] inline-flex items-center"
            >
              See a live demo of the cancel flow →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section className="bg-brand-bg border-b border-brand-border">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 py-[72px]">
          <div className="mb-12 text-center">
            <span className="eyebrow text-brand-accent">Built for subscription businesses</span>
            <h2 className="section-heading text-brand-text mt-3 m-0">
              Perfect for creators, coaches, and small businesses
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                emoji: '📧',
                title: 'Newsletter creators',
                desc: 'Paid Substack, Beehiiv, ConvertKit — keep readers subscribed when their card expires or they think about leaving.'
              },
              {
                emoji: '🎓',
                title: 'Online course sellers',
                desc: 'Teachable, Kajabi, Thinkific — recover payments on monthly access plans and save students who want to cancel mid-course.'
              },
              {
                emoji: '🏋️',
                title: 'Coaches & consultants',
                desc: 'Running a membership or group coaching program? Keep clients enrolled with smart save offers when they try to cancel.'
              },
              {
                emoji: '📦',
                title: 'Subscription boxes & memberships',
                desc: "Whether it's a community, a box, or a service — ChurnRecovery works with any recurring billing."
              },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-brand-border rounded-xl bg-brand-white">
                <div className="text-[1.8rem] mb-3">{item.emoji}</div>
                <h3 className="font-sans text-base font-semibold text-brand-text m-0 mb-1.5">
                  {item.title}
                </h3>
                <p className="font-sans text-base text-gray-700 m-0 leading-[1.6]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROP ──────────────────────────────────────────────── */}
      <section className="bg-brand-white border-b border-brand-border">
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 lg:px-8 py-[72px] text-center">
          <span className="eyebrow text-brand-accent">Simple, affordable pricing</span>
          <h2 className="section-heading text-brand-text mt-3 mb-5 mx-0">
            Cancel flows, payment recovery, and analytics — $20/month.
          </h2>
          <p className="font-sans text-lg text-gray-700 leading-[1.7] m-0 mb-10 max-w-[600px] mx-auto">
            No per-subscriber fees. No revenue share. Cancel anytime.
            Most churn tools charge $250–$825/month — ChurnRecovery is 10–40x cheaper
            with the same features.
          </p>

          {/* Value prop card */}
          <div className="max-w-[480px] mx-auto py-8 px-6 rounded-xl border-2 border-brand-accent bg-brand-white">
            <div className="font-sans text-sm font-semibold text-brand-accent tracking-[0.06em] uppercase mb-2">
              ChurnRecovery
            </div>
            <div className="font-sans text-[3rem] font-bold text-brand-text tracking-[-0.03em]">
              $20
            </div>
            <div className="font-sans text-base text-gray-600 mt-1">
              per month · 30-day free trial
            </div>
            <div className="font-sans text-sm text-brand-green font-semibold mt-3">
              ✓ All features included · No credit card to start
            </div>
          </div>

          <p className="font-sans text-sm text-gray-600 mt-4">
            <Link href="/compare/churnkey" className="text-brand-accent min-h-[44px] inline-flex items-center">See detailed comparison →</Link>
          </p>
        </div>
      </section>

      {/* ── GET STARTED CTA ──────────────────────────────────────────────── */}
      <section className="bg-brand-bg border-b border-brand-border">
        <div className="max-w-[700px] mx-auto px-5 sm:px-6 lg:px-8 py-[72px] text-center">
          <span className="eyebrow text-brand-accent block mb-3">Start today</span>
          <h2 className="font-sans text-[clamp(1.4rem,3vw,1.8rem)] font-semibold text-brand-text tracking-[-0.02em] mt-3 mb-4 mx-0">
            Start recovering churned customers in minutes
          </h2>
          <p className="font-sans text-base text-gray-700 m-0 mb-8 leading-[1.65] max-w-[520px] mx-auto">
            Start recovering churned customers in minutes — 30-day free trial, no credit card required.
          </p>
          <a href="/app/sign-up" className="btn-accent min-h-[44px] inline-flex items-center">
            Start Free Trial →
          </a>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-brand-white border-b border-brand-border">
        <div className="max-w-[700px] mx-auto px-5 sm:px-6 lg:px-8 py-[72px]">
          <div className="mb-10 text-center">
            <span className="eyebrow text-brand-accent">Common questions</span>
            <h2 className="font-sans text-[clamp(1.4rem,3vw,1.8rem)] font-semibold text-brand-text tracking-[-0.02em] mt-3 m-0">
              You&apos;re probably wondering...
            </h2>
          </div>

          {[
            {
              q: 'Why only $20/month?',
              a: 'We charge a flat $20/month because your success shouldn\'t increase your costs. No per-subscriber fees, no per-recovery fees, no revenue share. The price stays the same whether you have 100 subscribers or 100,000.'
            },
            {
              q: 'Do I need a developer to set this up?',
              a: 'No. If you can copy and paste a line of text, you can set this up. We give you step-by-step instructions, and it works with the tools you already use — Stripe, Paddle, and more.'
            },
            {
              q: 'Will my subscribers see your branding?',
              a: 'No. Everything is customized to match your business. Your subscribers will never know you\'re using a third-party tool.'
            },
            {
              q: 'What kind of results can I expect?',
              a: 'Most businesses recover 20–40% of subscribers who try to cancel, and 50–70% of failed payments. That could mean thousands of dollars in recovered revenue per year, depending on your size.'
            },
            {
              q: 'What if I use Substack / Beehiiv / Teachable / Kajabi?',
              a: 'We integrate with any platform that uses Stripe or another supported payment processor under the hood. If your subscribers pay through Stripe (most do), it works.'
            },
          ].map((faq, i) => (
            <div key={i} className="py-6 border-b border-brand-border">
              <h3 className="font-sans text-lg font-semibold text-brand-text m-0 mb-2">
                {faq.q}
              </h3>
              <p className="font-sans text-base text-gray-700 m-0 leading-[1.65]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SIGN UP / CTA ────────────────────────────────────────────────── */}
      <section className="bg-brand-text border-b border-brand-border">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 py-[80px] grid grid-cols-1 gap-10">
          <div className="max-w-[560px]">
            <h2 className="font-sans text-[clamp(1.8rem,4vw,2.75rem)] font-semibold text-brand-white tracking-[-0.03em] m-0 mb-4 leading-[1.1]">
              Stop losing subscribers.<br />
              <span className="text-brand-accent">Start recovering revenue.</span>
            </h2>
            <p className="font-sans text-lg text-[#aaaaaa] m-0 mb-8 leading-[1.6]">
              Start recovering customers today — no credit card, no sales calls,
              no surprises. Just a simple tool that saves your subscribers.
            </p>

            <SignUpCTA source="homepage" />

            <p className="font-sans text-base text-[#888888] mt-4">
              Not ready to sign up?{' '}
              <Link
                href="/demo"
                className="text-brand-accent no-underline font-medium min-h-[44px] inline-flex items-center"
              >
                Try the interactive demo first →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="bg-brand-bg">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 py-[72px]">
            <div className="flex justify-between items-baseline mb-10">
              <div>
                <span className="eyebrow text-brand-accent block mb-2">From the blog</span>
                <h2 className="font-sans text-[1.75rem] font-semibold text-brand-text tracking-[-0.02em] m-0">
                  Tips to keep more subscribers
                </h2>
              </div>
              <Link
                href="/blog"
                className="link-hover-underline font-sans text-base text-brand-accent font-medium min-h-[44px] flex items-center"
              >
                All posts →
              </Link>
            </div>

            <div className="flex flex-col gap-7">
              {posts.slice(0, 3).map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  return { props: { posts } }
}
