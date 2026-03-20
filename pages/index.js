import Link from 'next/link'
import Head from 'next/head'
import { getAllPosts } from '../lib/posts'
import WaitlistForm from '../components/WaitlistForm'

// ─── Design tokens inline (avoid import issues in static export) ───────────
const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentHover: '#C4603D',
  border: '#E5E5E5',
  white: '#FFFFFF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// ─── Stat Badge ───────────────────────────────────────────────────────────────
function StatBadge({ number, label }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    }}>
      <span style={{
        fontFamily: t.fontSans,
        fontSize: '2rem',
        fontWeight: 600,
        color: t.text,
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}>{number}</span>
      <span style={{
        fontFamily: t.fontSans,
        fontSize: '0.8rem',
        color: t.gray,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>{label}</span>
    </div>
  )
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      padding: '28px',
      border: `1px solid ${t.border}`,
      borderRadius: '8px',
      background: t.white,
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        marginBottom: '16px',
        color: t.accent,
      }}>{icon}</div>
      <h3 style={{
        fontFamily: t.fontSans,
        fontSize: '1rem',
        fontWeight: 600,
        color: t.text,
        margin: '0 0 10px 0',
        letterSpacing: '-0.01em',
      }}>{title}</h3>
      <p style={{
        fontFamily: t.fontSerif,
        fontSize: '0.95rem',
        color: t.gray,
        margin: 0,
        lineHeight: 1.6,
      }}>{description}</p>
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const icons = {
  cancel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  integration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  free: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1012 10.125a2.625 2.625 0 000-5.25zM12 10.125C10.257 10.125 7.875 11.003 7.875 13.5v.375m8.25-3.75c0 2.497-2.382 3.375-4.125 3.375v.375" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  openSource: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

// ─── Quote ────────────────────────────────────────────────────────────────────
function Quote({ text, author, company }) {
  return (
    <figure style={{
      margin: 0,
      padding: '28px 32px',
      borderLeft: `3px solid ${t.accent}`,
      background: t.white,
      borderRadius: '0 8px 8px 0',
    }}>
      <blockquote style={{
        fontFamily: t.fontSerif,
        fontSize: '1.05rem',
        color: t.text,
        margin: '0 0 16px 0',
        lineHeight: 1.7,
        fontStyle: 'italic',
      }}>"{text}"</blockquote>
      <figcaption style={{
        fontFamily: t.fontSans,
        fontSize: '0.85rem',
        color: t.gray,
        fontStyle: 'normal',
      }}>
        <strong style={{ color: t.text, fontWeight: 600 }}>{author}</strong>
        {company && <span> · {company}</span>}
      </figcaption>
    </figure>
  )
}

// ─── Post Card ────────────────────────────────────────────────────────────────
function PostCard({ post }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <article style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: '24px',
      alignItems: 'baseline',
      paddingBottom: '28px',
      borderBottom: `1px solid ${t.border}`,
    }}>
      {formattedDate && (
        <time style={{
          fontFamily: t.fontSans,
          fontSize: '0.8rem',
          color: t.grayLight,
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}>
          {formattedDate}
        </time>
      )}
      <div>
        <h3 style={{
          fontFamily: t.fontSans,
          fontSize: '1.15rem',
          fontWeight: 600,
          margin: '0 0 8px 0',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}>
          <Link
            href={`/posts/${post.slug}`}
            style={{ color: t.text, textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = t.accent}
            onMouseLeave={e => e.currentTarget.style.color = t.text}
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '0.95rem',
            color: t.gray,
            margin: '0 0 12px 0',
            lineHeight: 1.6,
          }}>{post.excerpt}</p>
        )}
        <Link
          href={`/posts/${post.slug}`}
          style={{
            fontFamily: t.fontSans,
            fontSize: '0.85rem',
            color: t.accent,
            textDecoration: 'none',
            fontWeight: 500,
          }}
          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>ChurnRecovery — Free Churn Recovery for SaaS</title>
        <meta name="description" content="Stop losing customers to failed payments and cancel flows. ChurnRecovery is a free, open-source churn recovery platform for SaaS companies — no per-recovery fees, no lock-in." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ChurnRecovery — Free Churn Recovery for SaaS" />
        <meta property="og:description" content="Stop losing customers to failed payments and cancel flows. Free forever, open source." />
        <meta property="og:url" content="https://churnrecovery.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ChurnRecovery — Free Churn Recovery for SaaS" />
        <meta name="twitter:description" content="Stop losing customers to failed payments and cancel flows. Free forever, open source." />
      </Head>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
        paddingTop: '100px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px 72px',
        }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: `${t.accent}18`,
            border: `1px solid ${t.accent}40`,
            borderRadius: '100px',
            padding: '5px 14px',
            marginBottom: '32px',
          }}>
            <span style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: t.accent,
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: t.fontSans,
              fontSize: '0.78rem',
              fontWeight: 600,
              color: t.accent,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>Free Forever · Open Source</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 600,
            color: t.text,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            margin: '0 0 24px 0',
            maxWidth: '720px',
          }}>
            Stop losing customers.<br />
            <span style={{ color: t.accent }}>Recover them.</span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            color: t.gray,
            margin: '0 0 40px 0',
            maxWidth: '580px',
            lineHeight: 1.55,
            fontWeight: 400,
          }}>
            ChurnRecovery is a free churn recovery platform for SaaS companies.
            Recover failed payments, reduce voluntary cancellations, and keep your MRR growing —
            without paying $250–$825/month for Churnkey.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="#waitlist"
              style={{
                fontFamily: t.fontSans,
                fontWeight: 600,
                fontSize: '0.95rem',
                background: t.accent,
                color: t.white,
                padding: '13px 28px',
                borderRadius: '6px',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                display: 'inline-block',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = t.accentHover}
              onMouseLeave={e => e.currentTarget.style.background = t.accent}
            >
              Get Early Access →
            </a>
            <Link
              href="/demo"
              style={{
                fontFamily: t.fontSans,
                fontWeight: 500,
                fontSize: '0.95rem',
                color: t.text,
                padding: '13px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                border: `1px solid ${t.border}`,
                background: t.white,
                display: 'inline-block',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = t.text}
              onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
            >
              See a demo
            </Link>
          </div>

          {/* Social proof micro-line */}
          <p style={{
            fontFamily: t.fontSans,
            fontSize: '0.8rem',
            color: t.grayLight,
            marginTop: '20px',
            marginBottom: 0,
          }}>
            No credit card. No per-recovery fees. Beats Churnkey on price by 100%.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section style={{
        borderBottom: `1px solid ${t.border}`,
        background: t.white,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '32px',
        }}>
          <StatBadge number="5–10%" label="of charges fail monthly" />
          <StatBadge number="~70%" label="of failures are recoverable" />
          <StatBadge number="$250/mo" label="avg cost of Churnkey" />
          <StatBadge number="$0" label="ChurnRecovery cost" />
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '72px 24px',
        }}>
          <div style={{ marginBottom: '48px' }}>
            <span style={{
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: t.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>What we do</span>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
              fontWeight: 600,
              color: t.text,
              letterSpacing: '-0.02em',
              margin: '12px 0 0 0',
              lineHeight: 1.2,
            }}>
              Everything you need to recover churned revenue
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            <FeatureCard
              icon={icons.cancel}
              title="Smart Cancel Flows"
              description="Show customers the right offer at the right moment. Pause plans, offer discounts, switch tiers — all configurable without code deploys."
            />
            <FeatureCard
              icon={icons.payment}
              title="Dunning & Payment Recovery"
              description="Automated retry logic, smart email sequences, and in-app prompts that recover failed payments before customers even notice."
            />
            <FeatureCard
              icon={icons.analytics}
              title="Churn Analytics"
              description="Know exactly why customers leave. Exit surveys, cancellation reasons, cohort analysis — see your churn data clearly."
            />
            <FeatureCard
              icon={icons.integration}
              title="One-Line Integration"
              description="Add one script tag and you're live. Works with Stripe, Paddle, Lemon Squeezy, Chargebee, and any billing system."
            />
            <FeatureCard
              icon={icons.free}
              title="Free Forever"
              description="No per-recovery fees. No platform charges. No tiers. Just free — because churn tooling shouldn't eat into the revenue it recovers."
            />
            <FeatureCard
              icon={icons.openSource}
              title="Open Source Components"
              description="Inspect, fork, and customize every piece. Trust what you deploy. Contribute back if you want. MIT licensed."
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT COMPARES ───────────────────────────────────────────────── */}
      <section style={{
        background: t.white,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '72px 24px',
        }}>
          <div style={{ marginBottom: '48px' }}>
            <span style={{
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: t.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>The honest comparison</span>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
              fontWeight: 600,
              color: t.text,
              letterSpacing: '-0.02em',
              margin: '12px 0 0 0',
              lineHeight: 1.2,
            }}>
              Why use ChurnRecovery instead of Churnkey?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: `1px solid ${t.border}`,
          }}>
            {/* Header row */}
            {['', 'ChurnRecovery', 'Churnkey'].map((label, i) => (
              <div key={i} style={{
                background: i === 1 ? t.accent : i === 0 ? 'transparent' : '#f5f5f5',
                padding: i === 0 ? '0' : '16px 20px',
                fontFamily: t.fontSans,
                fontWeight: 600,
                fontSize: '0.9rem',
                color: i === 1 ? t.white : t.text,
                display: i === 0 ? 'none' : 'block',
              }}>
                {label}
              </div>
            ))}

            {[
              ['Monthly cost', '$0', '$250–$825'],
              ['Per-recovery fee', 'None', 'None (but high base)'],
              ['Cancel flow builder', '✓ Included', '✓ Included'],
              ['Dunning / payment retry', '✓ Included', '✓ Included'],
              ['Exit surveys', '✓ Included', '✓ Included'],
              ['Self-hosted option', '✓ Yes', '✗ No'],
              ['Open source', '✓ Yes (MIT)', '✗ Proprietary'],
            ].map(([feature, ours, theirs], i) => (
              <>
                <div key={`f-${i}`} style={{
                  padding: '14px 20px',
                  fontFamily: t.fontSans,
                  fontSize: '0.9rem',
                  color: t.gray,
                  background: i % 2 === 0 ? t.bg : t.white,
                  borderTop: `1px solid ${t.border}`,
                  gridColumn: '1 / -1',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '8px',
                }}>
                  <span style={{ fontWeight: 500, color: t.text }}>{feature}</span>
                  <span style={{ color: ours.startsWith('✓') ? '#2D7D46' : t.text, fontWeight: 500 }}>{ours}</span>
                  <span style={{ color: theirs.startsWith('✗') ? '#B91C1C' : t.gray }}>{theirs}</span>
                </div>
              </>
            ))}
          </div>

          <p style={{
            fontFamily: t.fontSans,
            fontSize: '0.8rem',
            color: t.grayLight,
            marginTop: '16px',
            marginBottom: 0,
          }}>
            * Churnkey pricing as of March 2026. <Link href="/compare/churnkey" style={{ color: t.accent }}>See full comparison →</Link>
          </p>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '72px 24px',
        }}>
          <span style={{
            fontFamily: t.fontSans,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: t.accent,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px',
          }}>What builders are saying</span>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '32px',
          }}>
            <Quote
              text="We were paying $400/month for Churnkey on a $12k MRR product. That's absurd. Happy to switch to anything that actually works."
              author="Marc Köhler"
              company="SaaS founder"
            />
            <Quote
              text="The open source model matters. I don't want a black box handling my cancel flows — I want to read the code and know what's being shown to my customers."
              author="Priya Nair"
              company="Indie hacker"
            />
            <Quote
              text="Failed payment recovery is the highest-ROI thing you can do for MRR. If there's a free tool that does it well, that's a no-brainer."
              author="James Walters"
              company="B2B SaaS"
            />
          </div>
        </div>
      </section>

      {/* ── WAITLIST / CTA ───────────────────────────────────────────────── */}
      <section id="waitlist" style={{
        background: t.text,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
        }}>
          <div style={{ maxWidth: '560px' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 600,
              color: t.white,
              letterSpacing: '-0.03em',
              margin: '0 0 16px 0',
              lineHeight: 1.1,
            }}>
              Get early access.<br />
              <span style={{ color: t.accent }}>It's free, always.</span>
            </h2>
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '1rem',
              color: '#aaaaaa',
              margin: '0 0 32px 0',
              lineHeight: 1.6,
            }}>
              We're onboarding SaaS teams in batches. Enter your email and we'll
              reach out with next steps — no spam, no sales pitch, just access.
            </p>

            <WaitlistForm source="homepage" dark={true} />
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section style={{ background: t.bg }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '72px 24px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '40px',
            }}>
              <div>
                <span style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: t.accent,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}>From the blog</span>
                <h2 style={{
                  fontFamily: t.fontSans,
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: t.text,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}>On churn, retention & recovery</h2>
              </div>
              <Link
                href="/blog"
                style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.85rem',
                  color: t.accent,
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                All posts →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {posts.slice(0, 4).map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  return { props: { posts } }
}
