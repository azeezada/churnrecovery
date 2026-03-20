import Head from 'next/head'
import Link from 'next/link'
import { templates } from '../../lib/templates'

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
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const categoryColors = {
  General: { bg: '#FDF4EF', text: t.accent },
  Enterprise: { bg: '#F5F0FF', text: '#6B4FA0' },
  Consumer: { bg: '#EFF6FF', text: '#2563EB' },
  'Early Stage': { bg: '#FFF7ED', text: '#EA580C' },
  'E-Commerce': { bg: '#EDF7F1', text: t.green },
  'High LTV': { bg: '#FEF2F2', text: '#DC2626' },
}

function Nav() {
  return (
    <nav style={{
      borderBottom: `1px solid ${t.border}`, background: t.white,
      padding: '0 20px', height: '60px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link href="/" style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.1rem', color: t.text, textDecoration: 'none', letterSpacing: '-0.01em' }}>
        ChurnRecovery
      </Link>
      <div className="nav-links" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
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

      <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
        <Nav />

        {/* Hero */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 24px 56px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', background: '#F0EBE5', color: t.accent,
            padding: '4px 14px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px',
          }}>
            Templates Gallery
          </div>
          <h1 style={{
            fontFamily: t.fontSans, fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
            color: t.text, letterSpacing: '-0.04em', margin: '0 0 16px', lineHeight: 1.1,
          }}>
            Cancel flow templates for every business
          </h1>
          <p style={{
            fontFamily: t.fontSerif, fontSize: '1.1rem', color: t.gray,
            lineHeight: 1.7, maxWidth: '580px', margin: '0 auto',
          }}>
            Pick a template, customize it, and start recovering churned customers in minutes. Each template is battle-tested and optimized for specific business types.
          </p>
        </section>

        {/* Templates Grid */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '24px' }}>
            {templates.map(tmpl => {
              const catColor = categoryColors[tmpl.category] || { bg: '#F0EBE5', text: t.accent }
              return (
                <Link key={tmpl.slug} href={`/templates/${tmpl.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    border: `1px solid ${t.border}`, borderRadius: '12px',
                    background: t.white, overflow: 'hidden',
                    transition: 'all 0.2s', cursor: 'pointer',
                  }}>
                    {/* Preview header */}
                    <div style={{
                      background: t.text, padding: '24px', position: 'relative',
                    }}>
                      <div style={{
                        display: 'flex', gap: '6px', marginBottom: '16px',
                      }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
                      </div>
                      {/* Mini cancel flow preview */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{
                          color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem',
                          fontWeight: 600, marginBottom: '4px',
                        }}>
                          Why are you canceling?
                        </div>
                        {tmpl.preview.reasons.slice(0, 4).map(r => (
                          <div key={r.id} style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '6px 10px', borderRadius: '6px',
                            background: 'rgba(255,255,255,0.08)',
                            fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)',
                          }}>
                            <span>{r.icon}</span> {r.label}
                          </div>
                        ))}
                        {tmpl.preview.reasons.length > 4 && (
                          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '2px 0' }}>
                            +{tmpl.preview.reasons.length - 4} more options
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <h3 style={{
                          fontFamily: t.fontSans, fontSize: '1.05rem', fontWeight: 700,
                          color: t.text, margin: 0, letterSpacing: '-0.02em',
                        }}>
                          {tmpl.name}
                        </h3>
                        <span style={{
                          fontSize: '0.68rem', fontWeight: 600, padding: '3px 8px',
                          borderRadius: '4px', background: catColor.bg, color: catColor.text,
                          textTransform: 'uppercase', letterSpacing: '0.05em',
                        }}>
                          {tmpl.category}
                        </span>
                      </div>
                      <p style={{
                        fontFamily: t.fontSerif, fontSize: '0.85rem', color: t.gray,
                        lineHeight: 1.6, margin: '0 0 16px',
                      }}>
                        {tmpl.description}
                      </p>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: t.green, fontWeight: 700, fontSize: '0.85rem' }}>↑</span>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: t.green }}>{tmpl.saveRate}</span>
                          <span style={{ fontSize: '0.75rem', color: t.grayLight }}>save rate</span>
                        </div>
                        <span style={{ color: t.accent, fontSize: '0.82rem', fontWeight: 600, marginLeft: 'auto' }}>
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
        <section style={{
          background: t.white, borderTop: `1px solid ${t.border}`,
          padding: '64px 24px', textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: t.fontSans, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700,
            color: t.text, letterSpacing: '-0.03em', margin: '0 0 12px',
          }}>
            Don&apos;t see your use case?
          </h2>
          <p style={{
            fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray,
            margin: '0 0 24px', lineHeight: 1.7, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto',
          }}>
            Build a completely custom cancel flow with our SDK. Mix and match reasons, offers, and branding to match your product perfectly.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs" style={{
              background: t.accent, color: t.white, padding: '13px 28px', borderRadius: '8px',
              fontFamily: t.fontSans, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            }}>
              Read the Docs →
            </Link>
            <Link href="/demo" style={{
              background: t.bg, color: t.text, padding: '13px 28px', borderRadius: '8px',
              fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
              border: `1px solid ${t.border}`,
            }}>
              Try the Demo
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
