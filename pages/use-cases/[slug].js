import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WaitlistForm from '../../components/WaitlistForm'
import { useCases, getUseCaseBySlug, getAllUseCaseSlugs } from '../../lib/use-cases'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentBg: '#FDF4F0',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenBg: '#EDF7F1',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

export async function getStaticPaths() {
  const slugs = getAllUseCaseSlugs()
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const useCase = getUseCaseBySlug(params.slug)
  if (!useCase) return { notFound: true }
  const others = useCases.filter(uc => uc.slug !== params.slug).slice(0, 3)
  return { props: { useCase, others } }
}

export default function UseCaseDetailPage({ useCase, others }) {
  return (
    <>
      <Head>
        <title>{useCase.title} — ChurnRecovery Use Cases</title>
        <meta name="description" content={`ChurnRecovery for ${useCase.title}: ${useCase.subtitle}. ${useCase.heroStat} ${useCase.heroLabel}. See cancel flow strategies, typical save rates, and code examples.`} />
        <meta property="og:title" content={`${useCase.title} Churn Recovery — ChurnRecovery`} />
        <meta property="og:description" content={`${useCase.subtitle}. Avg save rate: ${useCase.metrics[0].value}. Free to use.`} />
        <meta property="og:url" content={`https://churnrecovery.com/use-cases/${useCase.slug}`} />
        <meta property="og:image" content="https://churnrecovery.com/og/use-cases.svg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main style={{ background: t.bg, minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 48px' }}>
          <Link href="/use-cases" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: t.fontSans,
            fontSize: '0.82rem',
            color: t.grayLight,
            textDecoration: 'none',
            marginBottom: '32px',
          }}>
            ← All use cases
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '3rem' }}>{useCase.icon}</span>
            <div>
              <div style={{
                fontFamily: t.fontSans,
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
                color: t.text,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}>
                {useCase.title}
              </div>
              <div style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray, marginTop: '6px' }}>
                {useCase.subtitle}
              </div>
            </div>
          </div>
          <div style={{
            background: useCase.colorBg,
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}>
            <span style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '2.5rem', color: useCase.color }}>
              {useCase.heroStat}
            </span>
            <span style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: useCase.color, lineHeight: 1.6 }}>
              {useCase.heroLabel}
            </span>
          </div>
          <p style={{ fontFamily: t.fontSerif, fontSize: '1rem', color: t.gray, lineHeight: 1.8, margin: 0 }}>
            {useCase.description}
          </p>
        </section>

        {/* Key metrics */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 48px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
          }}>
            {useCase.metrics.map((m, i) => (
              <div key={i} style={{
                background: t.white,
                border: `1px solid ${t.border}`,
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.5rem', color: useCase.color, marginBottom: '4px' }}>
                  {m.value}
                </div>
                <div style={{ fontFamily: t.fontSerif, fontSize: '0.78rem', color: t.grayLight }}>{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section style={{ background: t.white, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: '48px 24px' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.3rem', color: t.text, margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              The {useCase.title} churn challenge
            </h2>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {useCase.challenges.map((c, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontFamily: t.fontSerif,
                  fontSize: '0.95rem',
                  color: t.gray,
                  lineHeight: 1.7,
                }}>
                  <span style={{ color: '#DC2626', marginTop: '3px', flexShrink: 0 }}>✗</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Solutions */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px' }}>
          <h2 style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.3rem', color: t.text, margin: '0 0 24px', letterSpacing: '-0.02em' }}>
            How ChurnRecovery handles it
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {useCase.solutions.map((s, i) => (
              <div key={i} style={{
                background: t.white,
                border: `1px solid ${t.border}`,
                borderRadius: '10px',
                padding: '20px 24px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.85rem', color: '#DC2626', marginBottom: '6px' }}>
                    Problem: {s.problem}
                  </div>
                  <div style={{ fontFamily: t.fontSerif, fontSize: '0.95rem', color: t.text, lineHeight: 1.6 }}>
                    <span style={{ fontWeight: 600, color: t.green }}>→ </span>
                    {s.solution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section style={{
          background: useCase.colorBg,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '48px 24px',
        }}>
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px', color: useCase.color }}>❝</div>
            <blockquote style={{
              fontFamily: t.fontSerif,
              fontSize: '1.1rem',
              color: t.text,
              lineHeight: 1.8,
              margin: '0 0 16px',
              fontStyle: 'italic',
            }}>
              {useCase.quote.text}
            </blockquote>
            <div style={{ fontFamily: t.fontSans, fontSize: '0.82rem', color: useCase.color, fontWeight: 600 }}>
              — {useCase.quote.author}
            </div>
          </div>
        </section>

        {/* Code example */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px' }}>
          <h2 style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.3rem', color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Implementation example
          </h2>
          <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 20px' }}>
            Get a cancel flow working in under 30 minutes:
          </p>
          <div style={{
            background: '#1A1A2E',
            borderRadius: '10px',
            padding: '24px',
            overflow: 'auto',
          }}>
            <pre style={{
              margin: 0,
              fontFamily: '"Fira Code", "Cascadia Code", monospace',
              fontSize: '0.8rem',
              color: '#E2E8F0',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {useCase.codeExample}
            </pre>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/docs" style={{
              fontFamily: t.fontSans,
              fontSize: '0.85rem',
              color: t.accent,
              textDecoration: 'none',
              fontWeight: 600,
            }}>
              Full documentation →
            </Link>
            <Link href="/integrations" style={{
              fontFamily: t.fontSans,
              fontSize: '0.85rem',
              color: t.grayLight,
              textDecoration: 'none',
            }}>
              See integrations
            </Link>
          </div>
        </section>

        {/* Other use cases */}
        {others.length > 0 && (
          <section style={{
            borderTop: `1px solid ${t.border}`,
            padding: '48px 24px',
          }}>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.1rem', color: t.text, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                Other verticals
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {others.map(uc => (
                  <Link key={uc.slug} href={`/use-cases/${uc.slug}`} style={{
                    background: t.white,
                    border: `1px solid ${t.border}`,
                    borderRadius: '8px',
                    padding: '16px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <span style={{ fontSize: '1.3rem' }}>{uc.icon}</span>
                    <div>
                      <div style={{ fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.85rem', color: t.text }}>{uc.title}</div>
                      <div style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '0.78rem', color: uc.color }}>{uc.metrics[0].value} saved</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section style={{ background: t.text, padding: '64px 24px' }}>
          <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontWeight: 800,
              fontSize: '1.8rem',
              color: t.white,
              margin: '0 0 12px',
              letterSpacing: '-0.03em',
            }}>
              Ready to recover {useCase.title} churn?
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              margin: '0 0 28px',
            }}>
              Free to use. No contracts. Set up in under 30 minutes.
            </p>
            <WaitlistForm source={`use-case-${useCase.slug}`} />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
