import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { templates, getTemplateBySlug, getAllTemplateSlugs } from '../../lib/templates'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentHover: '#C4603D',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  purple: '#6B4FA0',
  purpleLight: '#F5F0FF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
  codeBg: '#1E1E2E',
  codeText: '#CDD6F4',
}

const offerTypeLabels = {
  discount: { label: 'Discount', icon: '💰', color: t.accent },
  pause: { label: 'Pause', icon: '⏸️', color: t.blue },
  human: { label: 'Human', icon: '💬', color: t.purple },
  feedback: { label: 'Feedback', icon: '📝', color: t.green },
  downgrade: { label: 'Downgrade', icon: '⬇️', color: '#EA580C' },
  skip: { label: 'Skip', icon: '⏭️', color: t.blue },
  swap: { label: 'Swap', icon: '🔄', color: t.purple },
  'big-discount': { label: 'Big Discount', icon: '💰', color: '#DC2626' },
  'pause-long': { label: 'Long Pause', icon: '⏸️', color: t.blue },
  'human-priority': { label: 'Priority Support', icon: '🚀', color: t.purple },
}

function Nav() {
  return (
    <nav style={{
      borderBottom: `1px solid ${t.border}`, background: t.white,
      padding: '0 40px', height: '60px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link href="/" style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.1rem', color: t.text, textDecoration: 'none', letterSpacing: '-0.01em' }}>
        ChurnRecovery
      </Link>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="/features" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans }}>Features</Link>
        <Link href="/docs" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans }}>Docs</Link>
        <Link href="/templates" style={{ color: t.accent, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans, fontWeight: 600 }}>Templates</Link>
        <Link href="/blog" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans }}>Blog</Link>
        <a href="https://tally.so/r/churnrecovery" style={{
          background: t.accent, color: t.white, padding: '8px 18px', borderRadius: '6px',
          textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, fontFamily: t.fontSans,
        }}>Get Early Access</a>
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

      <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
        <Nav />

        {/* Breadcrumb */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px 24px 0' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.82rem', color: t.grayLight }}>
            <Link href="/templates" style={{ color: t.gray, textDecoration: 'none' }}>Templates</Link>
            <span>→</span>
            <span style={{ color: t.text, fontWeight: 600 }}>{template.name}</span>
          </div>
        </div>

        {/* Header */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h1 style={{
                fontFamily: t.fontSans, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800,
                color: t.text, letterSpacing: '-0.04em', margin: '0 0 12px', lineHeight: 1.1,
              }}>
                {template.name}
              </h1>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '1.05rem', color: t.gray,
                lineHeight: 1.7, margin: '0 0 24px',
              }}>
                {template.description}
              </p>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: t.grayLight, fontWeight: 600, marginBottom: '4px' }}>Save Rate</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: t.green }}>{template.saveRate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: t.grayLight, fontWeight: 600, marginBottom: '4px' }}>Best For</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500, color: t.text }}>{template.bestFor}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: t.grayLight, fontWeight: 600, marginBottom: '4px' }}>Category</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500, color: t.text }}>{template.category}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Preview + Code side by side */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
            {/* Interactive preview */}
            <div>
              <h2 style={{
                fontFamily: t.fontSans, fontSize: '1.1rem', fontWeight: 700,
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Interactive Preview
              </h2>
              <div style={{
                border: `1px solid ${t.border}`, borderRadius: '12px',
                overflow: 'hidden', background: t.white,
              }}>
                {/* Browser chrome */}
                <div style={{
                  background: '#F5F5F5', padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  borderBottom: `1px solid ${t.border}`,
                }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
                  </div>
                  <div style={{
                    flex: 1, background: t.white, borderRadius: '4px', padding: '4px 12px',
                    fontSize: '0.72rem', color: t.grayLight, textAlign: 'center',
                  }}>
                    yourapp.com/settings/subscription
                  </div>
                </div>

                {/* Cancel flow modal */}
                <div style={{ padding: '32px 24px', minHeight: '380px' }}>
                  {activeStep === 0 ? (
                    <>
                      <h3 style={{
                        fontFamily: t.fontSans, fontSize: '1.1rem', fontWeight: 700,
                        color: t.text, margin: '0 0 4px', textAlign: 'center',
                      }}>
                        We&apos;re sorry to see you go
                      </h3>
                      <p style={{
                        fontFamily: t.fontSerif, fontSize: '0.85rem', color: t.gray,
                        textAlign: 'center', margin: '0 0 24px',
                      }}>
                        Tell us why you&apos;re leaving — we might be able to help.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {template.preview.reasons.map(reason => (
                          <button
                            key={reason.id}
                            onClick={() => handleReasonClick(reason)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '12px',
                              padding: '12px 16px', borderRadius: '8px',
                              border: `1px solid ${t.border}`, background: t.bg,
                              cursor: 'pointer', fontSize: '0.88rem',
                              fontFamily: t.fontSans, color: t.text,
                              textAlign: 'left', transition: 'all 0.15s',
                              width: '100%',
                            }}
                          >
                            <span style={{ fontSize: '1.1rem' }}>{reason.icon}</span>
                            <span style={{ fontWeight: 500 }}>{reason.label}</span>
                            <span style={{ marginLeft: 'auto', color: t.grayLight, fontSize: '0.8rem' }}>→</span>
                          </button>
                        ))}
                      </div>
                      <button style={{
                        display: 'block', margin: '16px auto 0', background: 'none',
                        border: 'none', color: t.grayLight, fontSize: '0.8rem',
                        cursor: 'pointer', textDecoration: 'underline',
                        fontFamily: t.fontSans,
                      }}>
                        Cancel anyway →
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          width: '48px', height: '48px', borderRadius: '50%',
                          background: '#FDF4EF', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.5rem',
                        }}>
                          {activeOffer && (activeOffer.type === 'discount' ? '💰' : activeOffer.type === 'pause' ? '⏸️' : activeOffer.type === 'human' ? '💬' : '📝')}
                        </div>
                        <h3 style={{
                          fontFamily: t.fontSans, fontSize: '1.1rem', fontWeight: 700,
                          color: t.text, margin: '0 0 8px',
                        }}>
                          {activeOffer?.headline || 'We have an offer for you'}
                        </h3>
                        {activeOffer?.message && (
                          <p style={{
                            fontFamily: t.fontSerif, fontSize: '0.85rem', color: t.gray,
                            margin: '0 0 8px', lineHeight: 1.6,
                          }}>
                            {activeOffer.message}
                          </p>
                        )}
                        {activeOffer?.subtext && (
                          <p style={{
                            fontFamily: t.fontSerif, fontSize: '0.82rem', color: t.grayLight,
                            margin: '0 0 8px',
                          }}>
                            {activeOffer.subtext}
                          </p>
                        )}
                        {activeOffer?.prompt && (
                          <div style={{
                            margin: '16px 0', padding: '12px', borderRadius: '8px',
                            border: `1px solid ${t.border}`, background: t.bg,
                            fontFamily: t.fontSerif, fontSize: '0.82rem', color: t.grayLight,
                            textAlign: 'left', minHeight: '60px',
                          }}>
                            {activeOffer.prompt}
                          </div>
                        )}
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '24px' }}>
                          <button style={{
                            background: t.accent, color: t.white, border: 'none',
                            padding: '10px 24px', borderRadius: '8px', fontFamily: t.fontSans,
                            fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
                          }}>
                            {activeOffer?.type === 'feedback' ? 'Submit Feedback' : activeOffer?.type === 'human' ? 'Talk to Us' : 'Accept Offer'}
                          </button>
                          <button
                            onClick={resetFlow}
                            style={{
                              background: 'none', color: t.grayLight, border: `1px solid ${t.border}`,
                              padding: '10px 24px', borderRadius: '8px', fontFamily: t.fontSans,
                              fontSize: '0.85rem', cursor: 'pointer',
                            }}
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
              <h2 style={{
                fontFamily: t.fontSans, fontSize: '1.1rem', fontWeight: 700,
                color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em',
              }}>
                Code
              </h2>
              <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{
                  background: '#181825', padding: '10px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#6C7086' }}>
                    cancel-flow.js
                  </span>
                  <span style={{ fontSize: '0.65rem', fontFamily: t.fontSans, color: '#6C7086', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    javascript
                  </span>
                </div>
                <pre style={{
                  background: t.codeBg, padding: '20px', margin: 0,
                  overflowX: 'auto', fontSize: '0.82rem', lineHeight: 1.7,
                  fontFamily: '"SF Mono", "Fira Code", "JetBrains Mono", monospace',
                  color: t.codeText,
                }}>
                  <code>{template.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Reason → Offer mapping table */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 64px' }}>
          <h2 style={{
            fontFamily: t.fontSans, fontSize: '1.3rem', fontWeight: 700,
            color: t.text, margin: '0 0 24px', letterSpacing: '-0.03em',
          }}>
            Reason → Offer Mapping
          </h2>
          <div style={{
            border: `1px solid ${t.border}`, borderRadius: '10px',
            overflow: 'hidden',
          }}>
            {/* Header row */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 2fr',
              padding: '12px 20px', background: '#F5F3EF',
              borderBottom: `1px solid ${t.border}`,
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.gray }}>Reason</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.gray }}>Offer Type</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.gray }}>What the customer sees</span>
            </div>
            {template.preview.reasons.map((reason, i) => {
              const offer = template.preview.offers[reason.offer]
              const offerInfo = offerTypeLabels[reason.offer] || { label: reason.offer, icon: '🎁', color: t.accent }
              return (
                <div key={reason.id} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 2fr',
                  padding: '14px 20px',
                  borderBottom: i < template.preview.reasons.length - 1 ? `1px solid ${t.border}` : 'none',
                  background: i % 2 === 0 ? t.white : t.bg,
                  alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{reason.icon}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: t.text }}>{reason.label}</span>
                  </div>
                  <div>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '3px 10px', borderRadius: '4px',
                      background: `${offerInfo.color}15`, color: offerInfo.color,
                      fontSize: '0.78rem', fontWeight: 600,
                    }}>
                      {offerInfo.icon} {offerInfo.label}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.83rem', color: t.gray, fontFamily: t.fontSerif }}>
                    {offer?.headline || 'Custom offer'}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Other templates */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 64px' }}>
          <h2 style={{
            fontFamily: t.fontSans, fontSize: '1.3rem', fontWeight: 700,
            color: t.text, margin: '0 0 24px', letterSpacing: '-0.03em',
          }}>
            Other Templates
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {templates.filter(t2 => t2.slug !== template.slug).slice(0, 3).map(t2 => (
              <Link key={t2.slug} href={`/templates/${t2.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  padding: '20px', border: `1px solid ${t.border}`, borderRadius: '10px',
                  background: t.white, transition: 'all 0.15s',
                }}>
                  <h3 style={{
                    fontFamily: t.fontSans, fontSize: '0.95rem', fontWeight: 700,
                    color: t.text, margin: '0 0 6px',
                  }}>
                    {t2.name}
                  </h3>
                  <p style={{
                    fontFamily: t.fontSerif, fontSize: '0.82rem', color: t.gray,
                    lineHeight: 1.6, margin: '0 0 10px',
                  }}>
                    {t2.description.substring(0, 100)}...
                  </p>
                  <span style={{ color: t.accent, fontSize: '0.8rem', fontWeight: 600 }}>View →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: t.text, padding: '64px 24px', textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: t.fontSans, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700,
            color: t.white, letterSpacing: '-0.03em', margin: '0 0 12px',
          }}>
            Use this template — free
          </h2>
          <p style={{
            fontFamily: t.fontSerif, fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)',
            margin: '0 0 24px', lineHeight: 1.7,
          }}>
            Copy the code above, join the waitlist for your API key, and start saving customers today.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://tally.so/r/churnrecovery" style={{
              display: 'inline-block', background: t.accent, color: t.white,
              padding: '13px 28px', borderRadius: '8px', fontFamily: t.fontSans,
              fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            }}>
              Get Early Access
            </a>
            <Link href="/docs" style={{
              display: 'inline-block', background: 'transparent', color: 'rgba(255,255,255,0.7)',
              padding: '13px 28px', borderRadius: '8px', fontFamily: t.fontSans,
              fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              Read the Docs →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
