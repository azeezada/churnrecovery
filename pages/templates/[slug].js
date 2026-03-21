import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { templates, getTemplateBySlug, getAllTemplateSlugs } from '../../lib/templates'

const offerTypeLabels = {
  discount: { label: 'Discount', icon: '💰', color: '#D97757' },
  pause: { label: 'Pause', icon: '⏸️', color: '#2563EB' },
  human: { label: 'Human', icon: '💬', color: '#6B4FA0' },
  feedback: { label: 'Feedback', icon: '📝', color: '#2D7A4F' },
  downgrade: { label: 'Downgrade', icon: '⬇️', color: '#EA580C' },
  skip: { label: 'Skip', icon: '⏭️', color: '#2563EB' },
  swap: { label: 'Swap', icon: '🔄', color: '#6B4FA0' },
  'big-discount': { label: 'Big Discount', icon: '💰', color: '#DC2626' },
  'pause-long': { label: 'Long Pause', icon: '⏸️', color: '#2563EB' },
  'human-priority': { label: 'Priority Support', icon: '🚀', color: '#6B4FA0' },
}

function Nav() {
  return (
    <nav className="border-b border-[#E5E5E5] bg-white px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
      <Link href="/" className="font-sans font-bold text-[1.1rem] text-[#191919] no-underline tracking-[-0.01em]">
        ChurnRecovery
      </Link>
      <div className="nav-links flex gap-6 items-center">
        <Link href="/features" className="text-[#666] no-underline text-[0.9rem] font-sans">Features</Link>
        <Link href="/docs" className="text-[#666] no-underline text-[0.9rem] font-sans">Docs</Link>
        <Link href="/templates" className="text-[#D97757] no-underline text-[0.9rem] font-sans font-semibold">Templates</Link>
        <Link href="/blog" className="text-[#666] no-underline text-[0.9rem] font-sans">Blog</Link>
        <a href="/#waitlist" className="bg-[#D97757] text-white px-[18px] py-2 rounded-[6px] no-underline text-[0.85rem] font-semibold font-sans">Join Waitlist</a>
      </div>
    </nav>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllTemplateSlugs().map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const template = getTemplateBySlug(params.slug)
  if (!template) return { notFound: true }
  return { props: { template } }
}

export default function TemplatePage({ template }) {
  const [activeStep, setActiveStep] = useState(0) // 0=reasons, 1=offer
  const [selectedReason, setSelectedReason] = useState(null)

  const title = `${template.name} Cancel Flow Template — ChurnRecovery`
  const description = `${template.description} Expected save rate: ${template.saveRate}. Best for: ${template.bestFor}.`

  const handleReasonClick = (reason) => {
    setSelectedReason(reason)
    setActiveStep(1)
  }

  const resetFlow = () => {
    setActiveStep(0)
    setSelectedReason(null)
  }

  const activeOffer = selectedReason
    ? template.preview.offers[selectedReason.offer]
    : null

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://churnrecovery.com/templates/${template.slug}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://churnrecovery.com/templates/${template.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: title,
              description: template.description,
              url: `https://churnrecovery.com/templates/${template.slug}`,
              step: template.preview.reasons.map((r, i) => ({
                '@type': 'HowToStep',
                position: i + 1,
                name: r.label,
              })),
            }),
          }}
        />
      </Head>

      <div className="bg-[#FAF9F5] min-h-screen font-sans">
        <Nav />

        {/* Breadcrumb */}
        <div className="max-w-[1100px] mx-auto pt-5 px-6">
          <div className="flex gap-2 items-center text-[0.82rem] text-[#999]">
            <Link href="/templates" className="text-[#666] no-underline">Templates</Link>
            <span>→</span>
            <span className="text-[#191919] font-semibold">{template.name}</span>
          </div>
        </div>

        {/* Header */}
        <section className="max-w-[1100px] mx-auto pt-8 px-6 pb-12">
          <div className="flex items-start gap-10 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <h1 className="font-sans font-extrabold text-[#191919] tracking-[-0.04em] mb-3 leading-[1.1]" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                {template.name}
              </h1>
              <p className="font-serif text-[1.05rem] text-[#666] leading-[1.7] mb-6">
                {template.description}
              </p>
              <div className="flex gap-6 flex-wrap">
                <div>
                  <div className="text-[0.72rem] uppercase tracking-[0.08em] text-[#999] font-semibold mb-1">Save Rate</div>
                  <div className="text-[1.2rem] font-bold text-[#2D7A4F]">{template.saveRate}</div>
                </div>
                <div>
                  <div className="text-[0.72rem] uppercase tracking-[0.08em] text-[#999] font-semibold mb-1">Best For</div>
                  <div className="text-[0.9rem] font-medium text-[#191919]">{template.bestFor}</div>
                </div>
                <div>
                  <div className="text-[0.72rem] uppercase tracking-[0.08em] text-[#999] font-semibold mb-1">Category</div>
                  <div className="text-[0.9rem] font-medium text-[#191919]">{template.category}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Preview + Code side by side */}
        <section className="max-w-[1100px] mx-auto px-6 pb-16">
          <div className="template-detail-grid grid grid-cols-[1fr_1fr] gap-8 items-start">
            {/* Interactive preview */}
            <div>
              <h2 className="font-sans text-[1.1rem] font-bold text-[#191919] mb-4 tracking-[-0.02em]">
                Interactive Preview
              </h2>
              <div className="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
                {/* Browser chrome */}
                <div className="bg-[#F5F5F5] py-[10px] px-[14px] flex items-center gap-2 border-b border-[#E5E5E5]">
                  <div className="flex gap-[6px]">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                    <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
                    <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white rounded-[4px] py-1 px-3 text-[0.72rem] text-[#999] text-center">
                    yourapp.com/settings/subscription
                  </div>
                </div>

                {/* Cancel flow modal */}
                <div className="py-8 px-6 min-h-[380px]">
                  {activeStep === 0 ? (
                    <>
                      <h3 className="font-sans text-[1.1rem] font-bold text-[#191919] mb-1 text-center">
                        We&apos;re sorry to see you go
                      </h3>
                      <p className="font-serif text-[0.85rem] text-[#666] text-center mb-6">
                        Tell us why you&apos;re leaving — we might be able to help.
                      </p>
                      <div className="flex flex-col gap-2">
                        {template.preview.reasons.map(reason => (
                          <button
                            key={reason.id}
                            onClick={() => handleReasonClick(reason)}
                            className="flex items-center gap-3 py-3 px-4 rounded-lg border border-[#E5E5E5] bg-[#FAF9F5] cursor-pointer text-[0.88rem] font-sans text-[#191919] text-left transition-all duration-150 w-full"
                          >
                            <span className="text-[1.1rem]">{reason.icon}</span>
                            <span className="font-medium">{reason.label}</span>
                            <span className="ml-auto text-[#999] text-[0.8rem]">→</span>
                          </button>
                        ))}
                      </div>
                      <button className="block mx-auto mt-4 bg-transparent border-none text-[#999] text-[0.8rem] cursor-pointer underline font-sans">
                        Cancel anyway →
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-[#FDF4EF] flex items-center justify-center mx-auto mb-4 text-2xl">
                          {activeOffer && (activeOffer.type === 'discount' ? '💰' : activeOffer.type === 'pause' ? '⏸️' : activeOffer.type === 'human' ? '💬' : '📝')}
                        </div>
                        <h3 className="font-sans text-[1.1rem] font-bold text-[#191919] mb-2">
                          {activeOffer?.headline || 'We have an offer for you'}
                        </h3>
                        {activeOffer?.message && (
                          <p className="font-serif text-[0.85rem] text-[#666] mb-2 leading-[1.6]">
                            {activeOffer.message}
                          </p>
                        )}
                        {activeOffer?.subtext && (
                          <p className="font-serif text-[0.82rem] text-[#999] mb-2">
                            {activeOffer.subtext}
                          </p>
                        )}
                        {activeOffer?.prompt && (
                          <div className="my-4 p-3 rounded-lg border border-[#E5E5E5] bg-[#FAF9F5] font-serif text-[0.82rem] text-[#999] text-left min-h-[60px]">
                            {activeOffer.prompt}
                          </div>
                        )}
                        <div className="flex gap-[10px] justify-center mt-6">
                          <button className="bg-[#D97757] text-white border-none py-[10px] px-6 rounded-lg font-sans font-semibold text-[0.88rem] cursor-pointer">
                            {activeOffer?.type === 'feedback' ? 'Submit Feedback' : activeOffer?.type === 'human' ? 'Talk to Us' : 'Accept Offer'}
                          </button>
                          <button
                            onClick={resetFlow}
                            className="bg-transparent text-[#999] border border-[#E5E5E5] py-[10px] px-6 rounded-lg font-sans text-[0.85rem] cursor-pointer"
                          >
                            No thanks
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Code snippet */}
            <div>
              <h2 className="font-sans text-[1.1rem] font-bold text-[#191919] mb-4 tracking-[-0.02em]">
                Code
              </h2>
              <div className="rounded-[10px] overflow-hidden border border-white/5">
                <div className="bg-[#181825] py-[10px] px-4 flex items-center justify-between">
                  <span className="font-mono text-[0.78rem] text-[#6C7086]">
                    cancel-flow.js
                  </span>
                  <span className="text-[0.65rem] font-sans text-[#6C7086] uppercase tracking-[0.08em]">
                    javascript
                  </span>
                </div>
                <pre className="bg-[#1E1E2E] p-5 m-0 overflow-x-auto text-[0.82rem] leading-[1.7] text-[#CDD6F4]" style={{ fontFamily: '"SF Mono", "Fira Code", "JetBrains Mono", monospace' }}>
                  <code>{template.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Reason → Offer mapping table */}
        <section className="max-w-[1100px] mx-auto px-6 pb-16">
          <h2 className="font-sans text-[1.3rem] font-bold text-[#191919] mb-6 tracking-[-0.03em]">
            Reason → Offer Mapping
          </h2>
          <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_1fr_2fr] py-3 px-5 bg-[#F5F3EF] border-b border-[#E5E5E5]">
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[#666]">Reason</span>
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[#666]">Offer Type</span>
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[#666]">What the customer sees</span>
            </div>
            {template.preview.reasons.map((reason, i) => {
              const offer = template.preview.offers[reason.offer]
              const offerInfo = offerTypeLabels[reason.offer] || { label: reason.offer, icon: '🎁', color: '#D97757' }
              return (
                <div key={reason.id} style={{
                  borderBottom: i < template.preview.reasons.length - 1 ? '1px solid #E5E5E5' : 'none',
                  background: i % 2 === 0 ? '#FFFFFF' : '#FAF9F5',
                }} className="grid grid-cols-[1fr_1fr_2fr] py-[14px] px-5 items-center">
                  <div className="flex items-center gap-2">
                    <span>{reason.icon}</span>
                    <span className="text-[0.85rem] font-medium text-[#191919]">{reason.label}</span>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-[5px] py-[3px] px-[10px] rounded-[4px] text-[0.78rem] font-semibold" style={{
                      background: `${offerInfo.color}15`,
                      color: offerInfo.color,
                    }}>
                      {offerInfo.icon} {offerInfo.label}
                    </span>
                  </div>
                  <div className="text-[0.83rem] text-[#666] font-serif">
                    {offer?.headline || 'Custom offer'}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Other templates */}
        <section className="max-w-[1100px] mx-auto px-6 pb-16">
          <h2 className="font-sans text-[1.3rem] font-bold text-[#191919] mb-6 tracking-[-0.03em]">
            Other Templates
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {templates.filter(t2 => t2.slug !== template.slug).slice(0, 3).map(t2 => (
              <Link key={t2.slug} href={`/templates/${t2.slug}`} className="no-underline text-inherit">
                <div className="p-5 border border-[#E5E5E5] rounded-[10px] bg-white transition-all duration-150">
                  <h3 className="font-sans text-[0.95rem] font-bold text-[#191919] mb-[6px]">
                    {t2.name}
                  </h3>
                  <p className="font-serif text-[0.82rem] text-[#666] leading-[1.6] mb-[10px]">
                    {t2.description.substring(0, 100)}...
                  </p>
                  <span className="text-[#D97757] text-[0.8rem] font-semibold">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#191919] py-16 px-6 text-center">
          <h2 className="font-sans font-bold text-white tracking-[-0.03em] mb-3" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
            Use this template — free
          </h2>
          <p className="font-serif text-[0.95rem] text-white/65 mb-6 leading-[1.7]">
            Copy the code above, join the waitlist for your API key, and start saving customers today.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="/#waitlist" className="inline-block bg-[#D97757] text-white py-[13px] px-7 rounded-lg font-sans font-bold text-[0.95rem] no-underline">
              Join Waitlist
            </a>
            <Link href="/docs" className="inline-block bg-transparent text-white/70 py-[13px] px-7 rounded-lg font-sans font-semibold text-[0.95rem] no-underline border border-white/20">
              Read the Docs →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
