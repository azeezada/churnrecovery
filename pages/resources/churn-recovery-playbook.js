import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WaitlistForm from '../../components/WaitlistForm'

const t = {
  bg: '#FAF9F5',
  bgDark: '#191919',
  text: '#191919',
  gray: '#555555',
  grayLight: '#888888',
  accent: '#D97757',
  accentDark: '#B85E3A',
  accentLight: '#FDF0EA',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  gold: '#C9A227',
  goldLight: '#FDF6E3',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

const chapters = [
  {
    num: '01',
    title: 'Understanding Why Subscribers Cancel',
    desc: 'The psychology behind churn — value gaps, life friction, forgotten engagement, and how to diagnose which problem you actually have.',
  },
  {
    num: '02',
    title: 'The Cancel Flow: Your Last Line of Defense',
    desc: 'Step-by-step anatomy of a cancel flow that saves 15–35% of would-be cancellations. With benchmarks and what to avoid.',
  },
  {
    num: '03',
    title: 'Pause vs. Cancel: Giving Subscribers a Lifeline',
    desc: "Why pause is the single highest-ROI retention feature you can add — and how 25–40% of cancelers will take it.",
  },
  {
    num: '04',
    title: 'Smart Offers That Win Back Subscribers',
    desc: 'The win-back window, offer types that actually convert, and what not to do when trying to recover churned subscribers.',
  },
  {
    num: '05',
    title: 'Email Recovery Sequences That Work',
    desc: 'Pre-cancellation at-risk sequences, post-cancellation win-back flows, subject lines that get opens, and timing that matters.',
  },
  {
    num: '06',
    title: 'Tracking Churn: Metrics Every Owner Should Know',
    desc: 'Monthly churn rate, NRR, cohort retention, save rate — the six numbers that tell you everything about your membership health.',
  },
  {
    num: '07',
    title: 'Platform-Specific Tips',
    desc: 'Tailored tactics for Substack, Kajabi, Ghost, Memberful, Circle, and more. What each platform does well and where you need workarounds.',
  },
  {
    num: '08',
    title: '30-Day Churn Reduction Action Plan',
    desc: 'A week-by-week action plan to measurably reduce churn in the next 30 days. Prioritized by impact, not complexity.',
  },
]

const testimonials = [
  {
    quote: "Our save rate jumped from basically zero to 22% after implementing a proper cancel flow. The pause offer alone saved us hundreds of dollars a month.",
    author: "Sarah K.",
    role: "Membership site owner, 800+ subscribers",
    avatar: "SK",
    color: '#D97757',
  },
  {
    quote: "I didn't realize how much money I was leaving on the table until I started measuring cohort retention. The playbook made it simple to understand what to fix first.",
    author: "Marcus T.",
    role: "Newsletter operator, Substack",
    avatar: "MT",
    color: '#2D7A4F',
  },
  {
    quote: "The win-back email sequence brought back 18% of canceled members in the first month. That's real money from a few hours of setup.",
    author: "Priya N.",
    role: "Course creator, Kajabi",
    avatar: "PN",
    color: '#5B4FCF',
  },
]

const stats = [
  { value: '15–35%', label: 'Average cancel flow save rate' },
  { value: '25%', label: 'Of cancelers choose to pause instead' },
  { value: '10–18%', label: 'Win-back rate with email sequence' },
  { value: '5×', label: 'LTV increase from 1% churn reduction' },
]

export default function ChurnRecoveryPlaybook() {
  const title = 'The Membership Site Churn Recovery Playbook — Free PDF Guide'
  const description = 'A comprehensive guide to stopping subscriber cancellations and recovering lost revenue. 8 chapters covering cancel flows, pause strategies, win-back sequences, and platform-specific tactics. Free download.'
  const url = 'https://churnrecovery.com/resources/churn-recovery-playbook'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content="The Membership Site Churn Recovery Playbook" />
        <meta property="og:description" content="Stop losing subscribers. This free 8-chapter guide covers cancel flows, pause strategies, win-back sequences, and platform-specific tactics that actually work." />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://churnrecovery.com/og/default.svg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Membership Site Churn Recovery Playbook — Free" />
        <meta name="twitter:description" content="8-chapter guide to reducing churn for membership site owners. Cancel flows, pause options, win-back emails, and platform tips. Free download." />
        <meta name="twitter:image" content="https://churnrecovery.com/og/default.svg" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Book',
              name: 'The Membership Site Churn Recovery Playbook',
              description,
              url,
              author: {
                '@type': 'Organization',
                name: 'ChurnRecovery',
                url: 'https://churnrecovery.com',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              genre: 'Business',
            }),
          }}
        />
      </Head>

      <Header />

      <main style={{ background: t.bg, minHeight: '100vh' }}>

        {/* Hero Section */}
        <section style={{
          background: `linear-gradient(135deg, ${t.bgDark} 0%, #2A1A12 100%)`,
          padding: '100px 24px 80px',
          position: 'relative',
          overflow: 'hidden',
          marginTop: 60,
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 70% 50%, rgba(217,119,87,0.15) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,400px)',
              gap: '56px',
              alignItems: 'center',
            }}>

              {/* Left: Copy */}
              <div>
                {/* Badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(217,119,87,0.15)',
                  border: '1px solid rgba(217,119,87,0.3)',
                  borderRadius: '100px',
                  padding: '6px 14px',
                  marginBottom: '24px',
                }}>
                  <span style={{ fontSize: '0.7rem', color: t.accent, fontFamily: t.fontSans, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Free Resource · PDF Guide
                  </span>
                </div>

                <h1 style={{
                  fontFamily: t.fontSerif,
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: t.white,
                  lineHeight: 1.2,
                  margin: '0 0 20px',
                }}>
                  The Membership Site<br />
                  <span style={{ color: t.accent }}>Churn Recovery</span><br />
                  Playbook
                </h1>

                <p style={{
                  fontFamily: t.fontSans,
                  fontSize: '1.05rem',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.7,
                  margin: '0 0 32px',
                  maxWidth: '500px',
                }}>
                  Everything you need to stop losing subscribers, recover churned members, and build a membership that retains. 8 chapters, real benchmarks, actionable tactics.
                </p>

                {/* Stats row */}
                <div style={{
                  display: 'flex', gap: '32px', flexWrap: 'wrap',
                  marginBottom: '36px',
                }}>
                  {[
                    { v: '8 Chapters', l: 'of actionable content' },
                    { v: '3,000+', l: 'words of tactics' },
                    { v: '100% Free', l: 'no credit card' },
                  ].map(s => (
                    <div key={s.v}>
                      <div style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.05rem', color: t.white }}>
                        {s.v}
                      </div>
                      <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social proof */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex' }}>
                    {['S', 'M', 'P', 'J', 'A'].map((initial, i) => (
                      <div key={i} style={{
                        width: '30px', height: '30px',
                        borderRadius: '50%',
                        background: ['#D97757', '#2D7A4F', '#5B4FCF', '#C9A227', '#3B7DD8'][i],
                        border: '2px solid #2A1A12',
                        marginLeft: i > 0 ? '-8px' : 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: t.fontSans, fontWeight: 700, fontSize: '0.65rem', color: t.white,
                      }}>
                        {initial}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontFamily: t.fontSans, fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
                    Join <strong style={{ color: t.white }}>500+ membership site owners</strong> who've downloaded this guide
                  </span>
                </div>
              </div>

              {/* Right: Book mockup + form */}
              <div>
                {/* Book cover mockup */}
                <div style={{
                  background: `linear-gradient(145deg, ${t.accent} 0%, ${t.accentDark} 100%)`,
                  borderRadius: '12px',
                  padding: '36px 28px',
                  marginBottom: '20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05), 6px 6px 0 rgba(0,0,0,0.3)',
                  position: 'relative',
                  transform: 'perspective(1000px) rotateY(-3deg)',
                }}>
                  {/* Spine */}
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: '7px',
                    background: 'rgba(0,0,0,0.25)',
                    borderRadius: '12px 0 0 12px',
                  }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '1rem' }}>📉</span>
                    <span style={{ fontFamily: t.fontSans, fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      ChurnRecovery.com
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: t.fontSerif, fontSize: '1.45rem', fontWeight: 700,
                    color: t.white, lineHeight: 1.25, margin: '0 0 10px',
                  }}>
                    The Membership Site<br />Churn Recovery<br />Playbook
                  </h2>

                  <p style={{
                    fontFamily: t.fontSans, fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.8)', margin: '0 0 28px', lineHeight: 1.5,
                  }}>
                    Stop losing subscribers.<br />Recover lost revenue.<br />Build for retention.
                  </p>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '18px' }}>
                    {['Cancel Flow Tactics', 'Pause Strategies', 'Win-Back Sequences', 'Platform Tips'].map(item => (
                      <div key={item} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        fontFamily: t.fontSans, fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)',
                        marginBottom: '6px',
                      }}>
                        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.6rem' }}>▸</span>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* FREE badge */}
                  <div style={{
                    position: 'absolute', top: '14px', right: '14px',
                    background: t.gold,
                    borderRadius: '50%', width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}>
                    <span style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '0.85rem', color: '#2A1A12', lineHeight: 1 }}>FREE</span>
                  </div>
                </div>

                {/* Email form */}
                <div style={{
                  background: t.white, borderRadius: '12px', padding: '22px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                }}>
                  <p style={{
                    fontFamily: t.fontSans, fontSize: '0.82rem', fontWeight: 600,
                    color: t.text, margin: '0 0 12px', textAlign: 'center',
                  }}>
                    Enter your email to get instant access ↓
                  </p>
                  <WaitlistForm source="playbook-download" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{
          background: t.goldLight,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '28px 24px',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              textAlign: 'center',
            }}>
              {stats.map(s => (
                <div key={s.value}>
                  <div style={{ fontFamily: t.fontSerif, fontWeight: 700, fontSize: '1.7rem', color: t.accent, marginBottom: '4px' }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: t.gray, lineHeight: 1.4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapters Section */}
        <section style={{ padding: '72px 24px', background: t.bg }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{
                fontFamily: t.fontSerif, fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700, color: t.text, margin: '0 0 14px',
              }}>
                What's Inside
              </h2>
              <p style={{
                fontFamily: t.fontSans, fontSize: '1rem', color: t.gray,
                maxWidth: '500px', margin: '0 auto', lineHeight: 1.6,
              }}>
                8 chapters covering every aspect of membership retention — from the psychology of cancellation to a step-by-step 30-day action plan.
              </p>
            </div>

            <div>
              {chapters.map((ch, i) => (
                <div key={ch.num} style={{
                  display: 'grid', gridTemplateColumns: '52px 1fr', gap: '20px',
                  padding: '24px 0',
                  borderBottom: i < chapters.length - 1 ? `1px solid ${t.border}` : 'none',
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: t.accentLight, border: `1px solid rgba(217,119,87,0.2)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: t.fontSans, fontWeight: 800, fontSize: '0.75rem', color: t.accent,
                    flexShrink: 0,
                  }}>
                    {ch.num}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '0.95rem', color: t.text, margin: '0 0 5px' }}>
                      {ch.title}
                    </h3>
                    <p style={{ fontFamily: t.fontSans, fontSize: '0.85rem', color: t.gray, margin: 0, lineHeight: 1.6 }}>
                      {ch.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: '72px 24px', background: '#F4F1EC', borderTop: `1px solid ${t.border}` }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
              fontWeight: 700, color: t.text, textAlign: 'center', margin: '0 0 40px',
            }}>
              What Membership Operators Are Saying
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {testimonials.map((tm, i) => (
                <div key={i} style={{
                  background: t.white, borderRadius: '12px', padding: '24px',
                  border: `1px solid ${t.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '10px', color: t.accent }}>❝</div>
                  <p style={{
                    fontFamily: t.fontSerif, fontSize: '0.875rem', color: t.text,
                    lineHeight: 1.7, margin: '0 0 18px', fontStyle: 'italic',
                  }}>
                    {tm.quote}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '50%',
                      background: tm.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: t.fontSans, fontWeight: 700, fontSize: '0.7rem', color: '#fff', flexShrink: 0,
                    }}>
                      {tm.avatar}
                    </div>
                    <div>
                      <div style={{ fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.82rem', color: t.text }}>{tm.author}</div>
                      <div style={{ fontFamily: t.fontSans, fontSize: '0.72rem', color: t.grayLight }}>{tm.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: '72px 24px', background: t.bgDark, textAlign: 'center' }}>
          <div style={{ maxWidth: '520px', margin: '0 auto' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '14px' }}>📘</div>
            <h2 style={{
              fontFamily: t.fontSerif, fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700, color: t.white, margin: '0 0 14px', lineHeight: 1.3,
            }}>
              Ready to Stop Losing Subscribers?
            </h2>
            <p style={{
              fontFamily: t.fontSans, fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.65)', margin: '0 0 32px', lineHeight: 1.7,
            }}>
              Download the free playbook and start reducing churn this week. No fluff, no upsells — just the tactics that work.
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', padding: '24px',
            }}>
              <WaitlistForm source="playbook-download" dark={true} />
            </div>
            <p style={{ fontFamily: t.fontSans, fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', margin: '14px 0 0' }}>
              500+ membership site owners have already downloaded this guide.
            </p>
          </div>
        </section>

      </main>

      <Footer />

      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: ${t.bg}; }
      `}</style>
    </>
  )
}
