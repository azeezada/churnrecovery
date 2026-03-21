import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found | ChurnRecovery</title>
        <meta name="description" content="The page you're looking for doesn't exist. Let's get you back on track." />
      </Head>

      <div className="bg-brand-bg min-h-[80vh] flex items-center justify-center font-sans p-[40px_24px]">
        <div className="text-center max-w-[480px]">
          <div className="text-[5rem] font-extrabold text-brand-accent tracking-[-0.05em] leading-none mb-4">
            404
          </div>
          <h1 className="font-sans text-2xl font-bold text-brand-text tracking-[-0.03em] mb-3">
            This page churned
          </h1>
          <p className="font-serif text-base text-brand-gray leading-[1.7] mb-8">
            Looks like this page doesn&apos;t exist anymore. Maybe we can help you find what you&apos;re looking for.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/" className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-lg font-bold text-[0.9rem] no-underline">
              Go Home
            </Link>
            <Link href="/features" className="inline-block bg-brand-white text-brand-text px-6 py-3 rounded-lg font-semibold text-[0.9rem] no-underline border border-brand-border">
              View Features
            </Link>
            <Link href="/docs" className="inline-block bg-brand-white text-brand-text px-6 py-3 rounded-lg font-semibold text-[0.9rem] no-underline border border-brand-border">
              Read Docs
            </Link>
          </div>

          <div className="mt-12 p-5 rounded-[10px] bg-brand-white border border-brand-border">
            <p className="font-sans text-[0.82rem] text-brand-gray mb-3">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: 'Demo', href: '/demo' },
                { label: 'Blog', href: '/blog' },
                { label: 'Templates', href: '/templates' },
                { label: 'Calculator', href: '/tools/churn-calculator' },
                { label: 'Compare', href: '/compare/churnkey' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="px-[14px] py-[6px] rounded-[6px] bg-brand-bg border border-brand-border text-[0.8rem] text-brand-text no-underline font-medium">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
