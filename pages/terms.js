import Head from 'next/head'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen font-[Instrument_Sans,sans-serif]">
      <Head>
        <title>Terms of Service — ChurnRecovery</title>
        <meta name="description" content="ChurnRecovery's terms of service. Simple, fair terms for using our churn recovery platform." />
        <meta property="og:title" content="Terms of Service — ChurnRecovery" />
        <meta property="og:description" content="Simple, fair terms for using our churn recovery platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://churnrecovery.com/terms" />
        <meta property="og:image" content="https://churnrecovery.com/og/default.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://churnrecovery.com/terms" />
      </Head>

      {/* Hero */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[800px] mx-auto px-[32px] pt-[80px] pb-[72px]">
          <h1 className="font-[Merriweather,serif] font-bold text-[#191919] mb-[24px] leading-[1.2] text-[clamp(32px,5vw,48px)]">
            Terms of Service
          </h1>
          <p className="text-[19px] text-[#444444] leading-[1.75] font-[Merriweather,serif] mb-[20px] max-w-[640px]">
            Straightforward terms for a straightforward product. No 40-page legal documents — just what you need to know.
          </p>
          <p className="text-[14px] text-[#888888] font-[Instrument_Sans,sans-serif]">
            Last updated: March 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-[32px] pt-[48px] pb-[80px]">

        {/* The service */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            The service
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              ChurnRecovery provides churn recovery tools for subscription businesses. That includes cancel flows, payment recovery, analytics, and templates — everything you need to reduce involuntary and voluntary churn.
            </p>
            <p className="mt-[16px]">
              By using ChurnRecovery, you agree to these terms. If you don&apos;t agree, that&apos;s fine — just don&apos;t use the service.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            Pricing
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              ChurnRecovery costs <strong className="text-[#191919]">$20/month</strong> after a <strong className="text-[#191919]">30-day free trial</strong>. No credit card is required to start your trial. You can cancel anytime — no cancellation fees, no long-term contracts.
            </p>
            <p className="mt-[16px]">
              If you cancel, you&apos;ll retain access through the end of your current billing period. We don&apos;t do prorated refunds for partial months, but we also don&apos;t charge you again after cancellation.
            </p>
          </div>
        </section>

        {/* Your responsibilities */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            Your responsibilities
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              When you use ChurnRecovery, you agree to:
            </p>
            <ul className="mt-[16px] ml-[24px] list-disc flex flex-col gap-[10px]">
              <li><strong className="text-[#191919]">Provide accurate information.</strong> Don&apos;t sign up with fake details or misrepresent your business.</li>
              <li><strong className="text-[#191919]">Don&apos;t abuse the service.</strong> No using ChurnRecovery for fraud, spam, or anything that harms other users or our infrastructure.</li>
              <li><strong className="text-[#191919]">Respect your customers&apos; privacy.</strong> You&apos;re responsible for complying with your own privacy obligations to your end users — including GDPR, CCPA, or any other applicable regulations.</li>
              <li><strong className="text-[#191919]">Keep your account secure.</strong> You&apos;re responsible for maintaining the security of your account credentials.</li>
            </ul>
          </div>
        </section>

        {/* Our responsibilities */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            Our responsibilities
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              We take our side of this seriously. Here&apos;s what we commit to:
            </p>
            <ul className="mt-[16px] ml-[24px] list-disc flex flex-col gap-[10px]">
              <li><strong className="text-[#191919]">Keep the service running.</strong> We aim for high availability and will communicate openly about any downtime or incidents.</li>
              <li><strong className="text-[#191919]">Protect your data.</strong> We use industry-standard security practices and trusted third-party providers (Stripe, Clerk, Cloudflare) to keep your data safe.</li>
              <li><strong className="text-[#191919]">Be transparent about changes.</strong> If we make significant changes to the product, pricing, or these terms, we&apos;ll tell you about it in advance.</li>
            </ul>
          </div>
        </section>

        {/* Limitation of liability */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            Limitation of liability
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              ChurnRecovery is provided &ldquo;as is.&rdquo; While we work hard to keep everything running smoothly, we can&apos;t guarantee the service will be error-free or uninterrupted at all times.
            </p>
            <p className="mt-[16px]">
              To the maximum extent permitted by law, ChurnRecovery&apos;s total liability to you for any claims arising from your use of the service is limited to the amount you&apos;ve paid us in the 12 months preceding the claim. We are not liable for indirect, incidental, special, consequential, or punitive damages, including lost revenue or lost data.
            </p>
            <p className="mt-[16px]">
              In plain English: we stand behind our product, but we can&apos;t be held responsible for every possible downstream effect of using it. We think that&apos;s fair.
            </p>
          </div>
        </section>

        {/* Changes to terms */}
        <section className="mb-[48px]">
          <h2 className="font-[Merriweather,serif] text-[28px] text-[#191919] mb-[16px]">
            Changes to these terms
          </h2>
          <div className="font-[Merriweather,serif] text-[16px] text-[#444444] leading-[1.85]">
            <p>
              We may update these terms from time to time. If we make material changes — anything that meaningfully affects your rights or obligations — we&apos;ll email you at least 30 days before the changes take effect.
            </p>
            <p className="mt-[16px]">
              Continued use of ChurnRecovery after changes take effect means you accept the updated terms. If you don&apos;t agree with the changes, you can cancel your account.
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
              Questions about these terms? Reach us at{' '}
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
