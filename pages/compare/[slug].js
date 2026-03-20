import Head from 'next/head'
import Link from 'next/link'
import { getCompetitor, getAllCompetitorSlugs, featureLabels, getFeatureValue } from '../../lib/comparisons'

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
  red: '#C0392B',
  redLight: '#FDECEA',
  yellowLight: '#FEF9EC',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function FeatureRow({ label, crValue, themValue }) {
  const cr = getFeatureValue(crValue)
  const them = getFeatureValue(themValue)

  const badge = (v) => {
    const colors = {
      yes: { bg: t.greenLight, color: t.green },
      no: { bg: t.redLight, color: t.red },
      partial: { bg: t.yellowLight, color: '#856404' },
    }
    const style = colors[v.type] || colors.partial
    return (
      <span style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '0.82rem',
        fontWeight: 600,
        fontFamily: t.fontSans,
        background: style.bg,
        color: style.color,
      }}>
        {v.type === 'yes' ? '✓ ' : v.type === 'no' ? '✗ ' : '~ '}{v.label}
      </span>
    )
  }

  return (
    <tr style={{ borderBottom: `1px solid ${t.border}` }}>
      <td style={{
        padding: '14px 20px',
        fontFamily: t.fontSans,
        fontSize: '0.9rem',
        color: t.text,
        fontWeight: 500,
      }}>{label}</td>
      <td style={{ padding: '14px 20px', textAlign: 'center' }}>{badge(cr)}</td>
      <td style={{ padding: '14px 20px', textAlign: 'center' }}>{badge(them)}</td>
    </tr>
  )
}

export default function ComparePage({ competitor }) {
  if (!competitor) return null

  const title = `ChurnRecovery vs ${competitor.name}: Honest Comparison (2025)`
  const description = `How does ChurnRecovery compare to ${competitor.name}? Feature-by-feature breakdown covering pricing, cancel flows, integrations, and developer experience.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://churnrecovery.com/compare/${competitor.slug}`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://churnrecovery.com/compare/${competitor.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: title,
              description,
              url: `https://churnrecovery.com/compare/${competitor.slug}`,
              publisher: {
                '@type': 'Organization',
                name: 'ChurnRecovery',
                url: 'https://churnrecovery.com',
              },
            }),
          }}
        />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
        {/* Nav */}
        <nav style={{
          borderBottom: `1px solid ${t.border}`,
          background: t.white,
          padding: '0 40px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <Link href="/" style={{
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '1.1rem',
            color: t.text,
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            ChurnRecovery
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/blog" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Blog</Link>
            <a href="#waitlist" style={{
              background: t.accent,
              color: t.white,
              padding: '8px 18px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}>Get Early Access</a>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 24px 0' }}>
          <div style={{ fontSize: '0.8rem', color: t.gray, fontFamily: t.fontSans }}>
            <Link href="/" style={{ color: t.gray, textDecoration: 'none' }}>Home</Link>
            {' → '}
            <span>Compare</span>
            {' → '}
            <span style={{ color: t.text }}>vs {competitor.name}</span>
          </div>
        </div>

        {/* Hero */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px 40px' }}>
          <div style={{
            display: 'inline-block',
            background: '#F0EBE5',
            color: t.accent,
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px',
          }}>
            Comparison
          </div>
          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 700,
            color: t.text,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            ChurnRecovery vs {competitor.name}
          </h1>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1.1rem',
            color: t.gray,
            lineHeight: 1.7,
            margin: '0 0 40px',
            maxWidth: '620px',
          }}>
            {description}
          </p>

          {/* Quick verdict cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '48px',
          }}>
            {/* ChurnRecovery */}
            <div style={{
              border: `2px solid ${t.accent}`,
              borderRadius: '12px',
              padding: '24px',
              background: t.white,
            }}>
              <div style={{
                fontFamily: t.fontSans,
                fontWeight: 700,
                fontSize: '1rem',
                color: t.text,
                marginBottom: '4px',
              }}>ChurnRecovery</div>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '0.82rem',
                color: t.accent,
                fontWeight: 700,
                marginBottom: '12px',
              }}>FREE — Always</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Cancel flows', 'Failed payment recovery', 'Open source', 'Developer API', 'A/B testing'].map(item => (
                  <li key={item} style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.85rem',
                    color: t.green,
                    padding: '3px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <span>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Competitor */}
            <div style={{
              border: `1px solid ${t.border}`,
              borderRadius: '12px',
              padding: '24px',
              background: t.white,
            }}>
              <div style={{
                fontFamily: t.fontSans,
                fontWeight: 700,
                fontSize: '1rem',
                color: t.text,
                marginBottom: '4px',
              }}>{competitor.name}</div>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '0.82rem',
                color: t.gray,
                fontWeight: 600,
                marginBottom: '12px',
              }}>{competitor.pricing.label}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {competitor.strengths.slice(0, 3).map(item => (
                  <li key={item} style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.85rem',
                    color: t.gray,
                    padding: '3px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <span style={{ color: t.grayLight }}>•</span> {item}
                  </li>
                ))}
                {competitor.weaknesses.slice(0, 2).map(item => (
                  <li key={item} style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.85rem',
                    color: t.red,
                    padding: '3px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <span>✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Feature Matrix */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px 48px' }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: '1.4rem',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}>Feature Comparison</h2>

          <div style={{
            border: `1px solid ${t.border}`,
            borderRadius: '12px',
            overflow: 'hidden',
            background: t.white,
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F5F4F0', borderBottom: `2px solid ${t.border}` }}>
                  <th style={{
                    padding: '14px 20px',
                    textAlign: 'left',
                    fontFamily: t.fontSans,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: t.gray,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    width: '40%',
                  }}>Feature</th>
                  <th style={{
                    padding: '14px 20px',
                    textAlign: 'center',
                    fontFamily: t.fontSans,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: t.accent,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    width: '30%',
                  }}>ChurnRecovery</th>
                  <th style={{
                    padding: '14px 20px',
                    textAlign: 'center',
                    fontFamily: t.fontSans,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: t.gray,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    width: '30%',
                  }}>{competitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(competitor.features).map(([key, values]) => (
                  <FeatureRow
                    key={key}
                    label={featureLabels[key] || key}
                    crValue={values.churnrecovery}
                    themValue={values.them}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing section */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '48px 24px',
          margin: '0 0 48px',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: '1.4rem',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.02em',
              marginBottom: '8px',
            }}>Pricing</h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.95rem',
              color: t.gray,
              marginBottom: '32px',
              lineHeight: 1.7,
            }}>
              The most honest comparison we can make. {competitor.pricing.notes}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{
                border: `2px solid ${t.accent}`,
                borderRadius: '12px',
                padding: '28px',
                background: '#FDF8F5',
              }}>
                <div style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.1rem', color: t.text, marginBottom: '8px' }}>
                  ChurnRecovery
                </div>
                <div style={{
                  fontFamily: t.fontSans,
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: t.accent,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  $0
                </div>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.85rem', color: t.gray, marginBottom: '16px' }}>
                  Forever. No credit card required.
                </div>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.85rem', color: t.green, fontWeight: 600 }}>
                  ✓ Full feature access on free tier
                </div>
              </div>

              <div style={{
                border: `1px solid ${t.border}`,
                borderRadius: '12px',
                padding: '28px',
                background: t.white,
              }}>
                <div style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.1rem', color: t.text, marginBottom: '8px' }}>
                  {competitor.name}
                </div>
                <div style={{
                  fontFamily: t.fontSans,
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: t.text,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  {competitor.pricing.entry > 0 ? `$${competitor.pricing.entry}` : competitor.pricing.label}
                </div>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.85rem', color: t.gray, marginBottom: '16px' }}>
                  {competitor.pricing.entry > 0 ? 'per month, entry plan' : 'Pricing varies'}
                </div>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.85rem', color: t.red, fontWeight: 600 }}>
                  ✗ No free tier
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the competitor */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px 48px' }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: '1.4rem',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}>About {competitor.name}</h2>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1rem',
            color: t.text,
            lineHeight: 1.8,
            marginBottom: '32px',
          }}>
            {competitor.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
            <div>
              <h3 style={{ fontFamily: t.fontSans, fontSize: '0.95rem', fontWeight: 700, color: t.text, marginBottom: '12px' }}>
                {competitor.name} Strengths
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {competitor.strengths.map(s => (
                  <li key={s} style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.85rem',
                    color: t.text,
                    padding: '5px 0',
                    borderBottom: `1px solid ${t.border}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}>
                    <span style={{ color: t.green, fontWeight: 700, flexShrink: 0 }}>+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontFamily: t.fontSans, fontSize: '0.95rem', fontWeight: 700, color: t.text, marginBottom: '12px' }}>
                {competitor.name} Weaknesses
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {competitor.weaknesses.map(w => (
                  <li key={w} style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.85rem',
                    color: t.text,
                    padding: '5px 0',
                    borderBottom: `1px solid ${t.border}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}>
                    <span style={{ color: t.red, fontWeight: 700, flexShrink: 0 }}>−</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verdict */}
          <div style={{
            background: '#FDF8F5',
            border: `1px solid ${t.accent}`,
            borderLeft: `4px solid ${t.accent}`,
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '48px',
          }}>
            <div style={{
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: t.accent,
              marginBottom: '8px',
            }}>Our Honest Verdict</div>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1rem',
              color: t.text,
              lineHeight: 1.7,
              margin: 0,
            }}>
              {competitor.verdict}
            </p>
          </div>
        </section>

        {/* More comparisons */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          padding: '48px 24px',
          marginBottom: '0',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: '1.2rem',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}>More Comparisons</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['churnkey', 'profitwell', 'churnbuster', 'stunning', 'baremetrics']
                .filter(slug => slug !== competitor.slug)
                .map(slug => {
                  const names = {
                    churnkey: 'Churnkey',
                    profitwell: 'ProfitWell Retain',
                    churnbuster: 'Churn Buster',
                    stunning: 'Stunning',
                    baremetrics: 'Baremetrics',
                  }
                  return (
                    <Link key={slug} href={`/compare/${slug}`} style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      border: `1px solid ${t.border}`,
                      borderRadius: '6px',
                      fontFamily: t.fontSans,
                      fontSize: '0.85rem',
                      color: t.text,
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}>
                      vs {names[slug]}
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="waitlist" style={{
          background: t.text,
          padding: '80px 24px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 700,
            color: t.white,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
          }}>
            Stop paying for churn recovery.
          </h2>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 32px',
            maxWidth: '460px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.7,
          }}>
            ChurnRecovery gives you everything {competitor.name} charges for — at zero cost. Join the waitlist for early access.
          </p>
          <a href="https://tally.so/r/churnrecovery" style={{
            display: 'inline-block',
            background: t.accent,
            color: t.white,
            padding: '14px 32px',
            borderRadius: '8px',
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            Join the Waitlist — It's Free
          </a>
        </section>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getAllCompetitorSlugs()
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const competitor = getCompetitor(params.slug)
  if (!competitor) return { notFound: true }
  return { props: { competitor } }
}
