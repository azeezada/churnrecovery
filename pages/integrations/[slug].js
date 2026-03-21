import Head from 'next/head'
import Link from 'next/link'
import { getIntegration, getAllIntegrationSlugs } from '../../lib/integrations'

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
  codeBackground: '#1A1A2E',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
  fontMono: '"Fira Code", "Fira Mono", monospace',
}

function CodeBlock({ code, language, title }) {
  return (
    <div style={{ marginBottom: '24px', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${t.border}` }}>
      {title && (
        <div style={{
          background: '#F0EFE9',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${t.border}`,
        }}>
          <span style={{ fontFamily: t.fontSans, fontSize: '0.82rem', fontWeight: 600, color: t.gray }}>{title}</span>
          <span style={{
            fontFamily: t.fontSans,
            fontSize: '0.72rem',
            color: t.grayLight,
            background: t.border,
            padding: '2px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>{language}</span>
        </div>
      )}
      <pre style={{
        background: t.codeBackground,
        margin: 0,
        padding: '20px',
        overflowX: 'auto',
        fontFamily: t.fontMono,
        fontSize: '0.85rem',
        lineHeight: 1.7,
        color: '#E8E8F0',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function IntegrationPage({ integration }) {
  if (!integration) return <div>Integration not found</div>

  return (
    <>
      <Head>
        <title>{integration.name} Integration — ChurnRecovery</title>
        <meta name="description" content={`Add cancel flows and payment recovery to your ${integration.name} billing in ${integration.setupTime}. Free forever. Code snippets and full setup guide included.`} />
        <meta property="og:title" content={`${integration.name} Integration — ChurnRecovery`} />
        <meta property="og:description" content={`Free cancel flows for ${integration.name}. Setup in ${integration.setupTime}.`} />
        <meta property="og:image" content="https://churnrecovery.com/og/integrations.svg" />
        <meta property="og:url" content={`https://churnrecovery.com/integrations/${integration.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://churnrecovery.com/integrations/${integration.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              name: `${integration.name} Integration Guide — ChurnRecovery`,
              description: `How to integrate ChurnRecovery with ${integration.name} for cancel flows and payment recovery`,
              url: `https://churnrecovery.com/integrations/${integration.slug}`,
            })
          }}
        />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh' }}>
        {/* Breadcrumb */}
        <div style={{
          borderBottom: `1px solid ${t.border}`,
          padding: '16px 24px',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <nav style={{ fontFamily: t.fontSans, fontSize: '0.85rem', color: t.grayLight }}>
              <Link href="/" style={{ color: t.grayLight, textDecoration: 'none' }}>Home</Link>
              <span style={{ margin: '0 8px' }}>›</span>
              <Link href="/integrations" style={{ color: t.grayLight, textDecoration: 'none' }}>Integrations</Link>
              <span style={{ margin: '0 8px' }}>›</span>
              <span style={{ color: t.text, fontWeight: 600 }}>{integration.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div style={{
          borderBottom: `1px solid ${t.border}`,
          padding: '60px 24px 48px',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '16px',
                background: integration.color + '18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                flexShrink: 0,
              }}>
                {integration.logo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <h1 style={{
                    fontFamily: t.fontSans,
                    fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                    fontWeight: 800,
                    color: t.text,
                    margin: 0,
                  }}>
                    ChurnRecovery + {integration.name}
                  </h1>
                </div>
                <p className="integration-description" style={{
                  fontFamily: t.fontSerif,
                  fontSize: '1.1rem',
                  color: t.gray,
                  lineHeight: 1.7,
                  margin: '0 0 24px',
                  maxWidth: '700px',
                }}>
                  {integration.description}
                </p>
                {/* Quick stats */}
                <div className="integration-stats-bar" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Setup time', value: integration.setupTime },
                    { label: 'Difficulty', value: integration.difficulty },
                    { label: 'Avg save rate', value: integration.stats.avgSaveRate, highlight: true },
                    { label: 'Price', value: 'Free' },
                  ].map(({ label, value, highlight }) => (
                    <div key={label}>
                      <div style={{ fontFamily: t.fontSans, fontSize: '0.72rem', color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>{label}</div>
                      <div style={{
                        fontFamily: t.fontSans,
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: highlight ? t.green : t.text,
                      }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
          <div className="integration-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'start' }}>
            {/* Left: main content */}
            <div>
              {/* Overview */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontFamily: t.fontSans, fontSize: '1.4rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
                  Overview
                </h2>
                {integration.longDescription.split('\n\n').map((para, i) => (
                  <p key={i} style={{
                    fontFamily: t.fontSerif,
                    fontSize: '1rem',
                    color: t.gray,
                    lineHeight: 1.8,
                    margin: '0 0 16px',
                  }}>{para}</p>
                ))}
              </section>

              {/* Features */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontFamily: t.fontSans, fontSize: '1.4rem', fontWeight: 700, color: t.text, margin: '0 0 20px' }}>
                  What's included
                </h2>
                <div style={{
                  background: t.white,
                  border: `1px solid ${t.border}`,
                  borderRadius: '12px',
                  padding: '24px',
                }}>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {integration.features.map((feature, i) => (
                      <li key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: i > 0 ? '12px 0 0' : '0',
                        marginTop: i > 0 ? '12px' : 0,
                        borderTop: i > 0 ? `1px solid ${t.border}` : 'none',
                      }}>
                        <span style={{
                          color: t.green,
                          fontWeight: 700,
                          fontSize: '1rem',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}>✓</span>
                        <span style={{ fontFamily: t.fontSans, fontSize: '0.95rem', color: t.text, lineHeight: 1.5 }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Use cases */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontFamily: t.fontSans, fontSize: '1.4rem', fontWeight: 700, color: t.text, margin: '0 0 20px' }}>
                  Use cases
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '16px',
                }}>
                  {integration.useCases.map((uc, i) => (
                    <div key={i} style={{
                      background: t.white,
                      border: `1px solid ${t.border}`,
                      borderRadius: '10px',
                      padding: '20px',
                    }}>
                      <h3 style={{
                        fontFamily: t.fontSans,
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: t.text,
                        margin: '0 0 8px',
                      }}>{uc.title}</h3>
                      <p style={{
                        fontFamily: t.fontSerif,
                        fontSize: '0.88rem',
                        color: t.gray,
                        lineHeight: 1.6,
                        margin: 0,
                      }}>{uc.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Code snippets */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontFamily: t.fontSans, fontSize: '1.4rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
                  Code examples
                </h2>
                <p style={{
                  fontFamily: t.fontSerif,
                  fontSize: '0.95rem',
                  color: t.gray,
                  margin: '0 0 24px',
                  lineHeight: 1.7,
                }}>
                  Real code for your {integration.name} integration. Copy and customize.
                </p>
                {integration.codeSnippets.map((snippet, i) => (
                  <CodeBlock key={i} {...snippet} />
                ))}
              </section>
            </div>

            {/* Right sidebar */}
            <div style={{ position: 'sticky', top: '24px' }}>
              {/* Setup steps */}
              <div style={{
                background: t.white,
                border: `1px solid ${t.border}`,
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px',
              }}>
                <h3 style={{
                  fontFamily: t.fontSans,
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: t.text,
                  margin: '0 0 16px',
                }}>Setup checklist</h3>
                <ol style={{ margin: 0, padding: 0, listStyle: 'none', counterReset: 'steps' }}>
                  {integration.setupSteps.map((step, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: i > 0 ? '12px 0 0' : '0',
                      marginTop: i > 0 ? '12px' : 0,
                      borderTop: i > 0 ? `1px solid ${t.border}` : 'none',
                    }}>
                      <span style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: t.accent + '18',
                        color: t.accent,
                        fontFamily: t.fontSans,
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}>{i + 1}</span>
                      <span style={{ fontFamily: t.fontSans, fontSize: '0.88rem', color: t.text, lineHeight: 1.5 }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* CTA card */}
              <div style={{
                background: t.text,
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🚀</div>
                <h3 style={{
                  fontFamily: t.fontSans,
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: t.white,
                  margin: '0 0 8px',
                }}>Ready to get started?</h3>
                <p style={{
                  fontFamily: t.fontSerif,
                  fontSize: '0.88rem',
                  color: 'rgba(255,255,255,0.7)',
                  margin: '0 0 16px',
                  lineHeight: 1.6,
                }}>Free forever. No credit card. Set up in {integration.setupTime}.</p>
                <Link href="/#waitlist" style={{
                  display: 'block',
                  background: t.accent,
                  color: t.white,
                  fontFamily: t.fontSans,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}>
                  Join Waitlist →
                </Link>
              </div>

              {/* Other integrations */}
              <div style={{
                background: t.white,
                border: `1px solid ${t.border}`,
                borderRadius: '12px',
                padding: '20px',
              }}>
                <h3 style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: t.text,
                  margin: '0 0 12px',
                }}>Other integrations</h3>
                {['stripe', 'paddle', 'braintree', 'chargebee', 'recurly', 'custom']
                  .filter(s => s !== integration.slug)
                  .slice(0, 4)
                  .map(slug => (
                    <Link key={slug} href={`/integrations/${slug}`} style={{
                      display: 'block',
                      fontFamily: t.fontSans,
                      fontSize: '0.88rem',
                      color: t.accent,
                      textDecoration: 'none',
                      padding: '6px 0',
                      borderBottom: `1px solid ${t.border}`,
                    }}>
                      {slug.charAt(0).toUpperCase() + slug.slice(1)} integration →
                    </Link>
                  ))
                }
                <Link href="/integrations" style={{
                  display: 'block',
                  fontFamily: t.fontSans,
                  fontSize: '0.85rem',
                  color: t.grayLight,
                  textDecoration: 'none',
                  paddingTop: '8px',
                }}>
                  View all integrations →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          background: t.greenLight,
          borderTop: `1px solid #C8EBD8`,
          padding: '48px 24px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: '1.6rem',
              fontWeight: 700,
              color: t.text,
              margin: '0 0 12px',
            }}>
              Stop losing customers you could keep
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1rem',
              color: t.gray,
              lineHeight: 1.7,
              margin: '0 0 28px',
            }}>
              Most SaaS companies recover 20–30% of would-be churners with cancel flows.
              ChurnRecovery makes this free for {integration.name} users.
            </p>
            <Link href="/#waitlist" style={{
              display: 'inline-block',
              background: t.accent,
              color: t.white,
              fontFamily: t.fontSans,
              fontWeight: 700,
              fontSize: '1rem',
              padding: '14px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              Join Waitlist — It's Free
            </Link>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 768px) {
            .integration-layout { grid-template-columns: 1fr !important; }
            .integration-stats-bar { flex-wrap: wrap; gap: 16px !important; }
            .integration-description { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
          }
        `}</style>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getAllIntegrationSlugs()
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const integration = getIntegration(params.slug)
  return {
    props: { integration: integration || null },
  }
}
