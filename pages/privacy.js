import Head from 'next/head'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen font-[Instrument_Sans,sans-serif]">
      <Head>
        <title>Privacy Policy — ChurnRecovery</title>
        <meta name="description" content="ChurnRecovery's privacy policy. We collect minimal data, don't use tracking cookies, and never sell your information." />
        <meta property="og:title" content="Privacy Policy — ChurnRecovery" />
        <meta property="og:description" content="We collect minimal data, don't use tracking cookies, and never sell your information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://churnrecovery.com/privacy" />
        <meta property="og:image" content="https://churnrecovery.com/og/default.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://churnrecovery.com/privacy" />
      </Head>

      {/* Hero */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[800px] mx-auto px-[32px] pt-[80px] pb-[72px]">
          <h1 className="font-[Merriweather,serif] font-bold text-[#191919] mb-[24px] leading-[1.2] text-[clamp(32px,5vw,48px)]">
            Privacy Policy
          </h1>
          <p className="text-[19px] text-[#444444] leading-[1.75] font-[Merriweather,serif] mb-[20px] max-w-[640px]">
            We keep things simple. We collect as little data as possible, we don&apos;t track you with cookies, and we never sell your information to anyone.
          </p>
          <p className="text-[14px] text-[#888888] font-[Instrument_Sans,sans-serif]">
            Last updated: March 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-[32px] pt-[48px] pb-[80px]">

        {/* What we collect */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            What we collect
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              When you sign up, we collect your <strong className="text-[#191919]">email address</strong>. That&apos;s the core personal data we store.
            </p>
            <p className="mt-[16px]">
              For usage analytics, we use <strong className="text-[#191919]">Cloudflare Web Analytics</strong> — a privacy-first analytics service that doesn&apos;t use cookies, doesn&apos;t collect personal data, and doesn&apos;t track you across sites. We get aggregate page views and performance data without compromising your privacy.
            </p>
          </div>
        </section>

        {/* Payment processing */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            Payment processing
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              All payment processing is handled by <strong className="text-[#191919]">Stripe</strong>. We never see or store your credit card numbers, bank account details, or any sensitive payment information. Stripe is PCI Level 1 certified — the highest level of certification in the payments industry.
            </p>
            <p className="mt-[16px]">
              You can review Stripe&apos;s privacy policy at{' '}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#D97757] underline">
                stripe.com/privacy
              </a>.
            </p>
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            Authentication
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              Sign-in and authentication are handled by <strong className="text-[#191919]">Clerk</strong>. They manage session tokens, password hashing, and identity verification on our behalf. We chose Clerk because they take security seriously so we don&apos;t have to roll our own auth.
            </p>
            <p className="mt-[16px]">
              You can review Clerk&apos;s privacy policy at{' '}
              <a href="https://clerk.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[#D97757] underline">
                clerk.com/legal/privacy
              </a>.
            </p>
          </div>
        </section>

        {/* Email */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            Email
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              Transactional emails — things like account confirmations, billing receipts, and product updates — are sent through <strong className="text-[#191919]">Resend</strong> on our behalf. We only send emails that are directly related to your account or the service.
            </p>
          </div>
        </section>

        {/* What we don't do */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            What we don&apos;t do
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              We want to be clear about what we <em>don&apos;t</em> do with your data:
            </p>
            <ul className="mt-[16px] ml-[24px] list-disc flex flex-col gap-[10px]">
              <li>We <strong className="text-[#191919]">don&apos;t sell</strong> your data to anyone, ever.</li>
              <li>We <strong className="text-[#191919]">don&apos;t use tracking cookies</strong> or fingerprinting.</li>
              <li>We <strong className="text-[#191919]">don&apos;t share your data</strong> with advertisers or ad networks.</li>
              <li>We <strong className="text-[#191919]">don&apos;t run retargeting</strong> or behavioral advertising.</li>
            </ul>
          </div>
        </section>

        {/* Data retention */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            Data retention
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              We keep your account data for as long as your account is active. If you decide to delete your account, we&apos;ll remove your data upon request. No hoops, no retention tricks — just email us and it&apos;s done.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            Contact
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              Questions about our privacy practices? Reach us at{' '}
              <a href="mailto:hello@churnrecovery.com" className="text-[#D97757] underline">
                hello@churnrecovery.com
              </a>.
            </p>
          </div>
        </section>

        {/* Back link */}
        <div className="border-t border-[#E5E5E5] pt-[32px]">
          <Link href="/" className="text-[#D97757] font-semibold no-underline text-[15px]">
            &larr; Back to ChurnRecovery
          </Link>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
      `}</style>
    </div>
  )
}
