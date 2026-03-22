import Head from 'next/head'
import Link from 'next/link'
import { templates } from '../../lib/templates'

const categoryColors = {
  General: { bg: '#FDF4EF', text: '#D97757' },
  Enterprise: { bg: '#F5F0FF', text: '#6B4FA0' },
  Consumer: { bg: '#EFF6FF', text: '#2563EB' },
  'Early Stage': { bg: '#FFF7ED', text: '#EA580C' },
  'E-Commerce': { bg: '#EDF7F1', text: '#2D7A4F' },
  'High LTV': { bg: '#FEF2F2', text: '#DC2626' },
}

function Nav() {
  return (
    <nav className="border-b border-brand-border bg-brand-white px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
      <Link href="/" className="font-sans font-bold text-[1.1rem] text-brand-text no-underline tracking-[-0.01em]">
        ChurnRecovery
      </Link>
      <div className="nav-links flex gap-6 items-center">
        <Link href="/features" className="text-brand-gray no-underline text-[0.9rem] font-sans">Features</Link>
        <Link href="/docs" className="text-brand-gray no-underline text-[0.9rem] font-sans">Docs</Link>
        <Link href="/templates" className="text-brand-accent no-underline text-[0.9rem] font-sans font-semibold">Templates</Link>
        <Link href="/blog" className="text-brand-gray no-underline text-[0.9rem] font-sans">Blog</Link>
        <a href="/app/sign-up" className="bg-brand-accent text-brand-white px-[18px] py-2 rounded-[6px] no-underline text-[0.85rem] font-semibold font-sans">Get Started Free</a>
      </div>
    </nav>
  )
}

export default function TemplatesGallery() {
  const title = 'Cancel Flow Templates — Ready-to-Use Retention Flows | ChurnRecovery'
  const description = 'Browse 6 battle-tested cancel flow templates. SaaS, enterprise, e-commerce, freemium — pick a template, customize it, and start saving customers in minutes.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://churnrecovery.com/templates" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://churnrecovery.com/templates" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: title,
              description,
              url: 'https://churnrecovery.com/templates',
              publisher: { '@type': 'Organization', name: 'ChurnRecovery', url: 'https://churnrecovery.com' },
            }),
          }}
        />
      </Head>

      <div className="bg-brand-bg min-h-screen font-sans">
        <Nav />

        {/* Hero */}
        <section className="max-w-[900px] mx-auto px-6 pt-[72px] pb-14 text-center">
          <div className="inline-block bg-[#F0EBE5] text-brand-accent px-[14px] py-1 rounded text-[0.72rem] font-bold uppercase tracking-[0.08em] mb-5">
            Templates Gallery
          </div>
          <h1 className="font-sans font-extrabold text-brand-text tracking-[-0.04em] mb-4 leading-[1.1] text-[clamp(2rem,5vw,3rem)]">
            Cancel flow templates for every business
          </h1>
          <p className="font-serif text-[1.1rem] text-brand-gray leading-[1.7] max-w-[580px] mx-auto">
            Pick a template, customize it, and start recovering churned customers in minutes. Each template is battle-tested and optimized for specific business types.
          </p>
        </section>

        {/* Templates Grid */}
        <section className="max-w-[1100px] mx-auto px-6 pb-20">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(340px,100%),1fr))] gap-6">
            {templates.map(tmpl => {
              const catColor = categoryColors[tmpl.category] || { bg: '#F0EBE5', text: '#D97757' }
              return (
                <Link key={tmpl.slug} href={`/templates/${tmpl.slug}`} className="no-underline text-inherit">
                  <div className="border border-brand-border rounded-xl bg-brand-white overflow-hidden transition-all duration-200 cursor-pointer">
                    {/* Preview header */}
                    <div className="bg-brand-text p-6 relative">
                      <div className="flex gap-[6px] mb-4">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                        <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
                        <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
                      </div>
                      {/* Mini cancel flow preview */}
                      <div className="flex flex-col gap-[6px]">
                        <div className="text-[rgba(255,255,255,0.9)] text-[0.82rem] font-semibold mb-1">
                          Why are you canceling?
                        </div>
                        {tmpl.preview.reasons.slice(0, 4).map(r => (
                          <div key={r.id} className="flex items-center gap-2 py-[6px] px-[10px] rounded-[6px] bg-[rgba(255,255,255,0.08)] text-[0.75rem] text-[rgba(255,255,255,0.7)]">
                            <span>{r.icon}</span> {r.label}
                          </div>
                        ))}
                        {tmpl.preview.reasons.length > 4 && (
                          <div className="text-[0.7rem] text-[rgba(255,255,255,0.4)] text-center py-[2px]">
                            +{tmpl.preview.reasons.length - 4} more options
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6">
                      <div className="flex items-center gap-[10px] mb-[10px]">
                        <h3 className="font-sans text-[1.05rem] font-bold text-brand-text m-0 tracking-[-0.02em]">
                          {tmpl.name}
                        </h3>
                        <span className="text-[0.68rem] font-semibold px-2 py-[3px] rounded uppercase tracking-[0.05em]" style={{ background: catColor.bg, color: catColor.text }}>
                          {tmpl.category}
                        </span>
                      </div>
                      <p className="font-serif text-[0.85rem] text-brand-gray leading-[1.6] mb-4">
                        {tmpl.description}
                      </p>
                      <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-[6px]">
                          <span className="text-brand-green font-bold text-[0.85rem]">↑</span>
                          <span className="text-[0.8rem] font-semibold text-brand-green">{tmpl.saveRate}</span>
                          <span className="text-[0.75rem] text-brand-gray-light">save rate</span>
                        </div>
                        <span className="text-brand-accent text-[0.82rem] font-semibold ml-auto">
                          View template →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-brand-white border-t border-brand-border py-16 px-6 text-center">
          <h2 className="font-sans font-bold text-brand-text tracking-[-0.03em] mb-3 text-[clamp(1.3rem,3vw,1.8rem)]">
            Don&apos;t see your use case?
          </h2>
          <p className="font-serif text-base text-brand-gray mb-6 leading-[1.7] max-w-[480px] mx-auto">
            Build a completely custom cancel flow with our SDK. Mix and match reasons, offers, and branding to match your product perfectly.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/docs" className="bg-brand-accent text-brand-white px-7 py-[13px] rounded-lg font-sans font-bold text-[0.95rem] no-underline">
              Read the Docs →
            </Link>
            <Link href="/demo" className="bg-brand-bg text-brand-text px-7 py-[13px] rounded-lg font-sans font-semibold text-[0.95rem] no-underline border border-brand-border">
              Try the Demo
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
