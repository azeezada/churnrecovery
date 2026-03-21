import Link from 'next/link'
import Head from 'next/head'
import { getAllPosts } from '../lib/posts'
import WaitlistForm from '../components/WaitlistForm'

// ─── Design tokens ─────────────────────────────────────────────────────────
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

// ─── How It Works Step ────────────────────────────────────────────────────
function Step({ number, title, description, screenshot, screenshotAlt }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '24px',
    }} className="step-card">
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: `${t.accent}15`,
          border: `2px solid ${t.accent}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: t.fontSans,
          fontWeight: 700,
          fontSize: '1.1rem',
          color: t.accent,
          flexShrink: 0,
        }}>{number}</div>
        <div>
          <h3 style={{
            fontFamily: t.fontSans,
            fontSize: '1.1rem',
            fontWeight: 600,
            color: t.text,
            margin: '0 0 6px 0',
          }}>{title}</h3>
          <p style={{
            fontFamily: t.fontSans,
            fontSize: '0.95rem',
            color: t.gray,
            margin: 0,
            lineHeight: 1.6,
          }}>{description}</p>
        </div>
      </div>
      {screenshot && (
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: `1px solid ${t.border}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
        }}>
          <img
            src={screenshot}
            alt={screenshotAlt}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      )}
    </div>
  )
}

// ─── Benefit Card ─────────────────────────────────────────────────────────
function BenefitCard({ emoji, title, description }) {
  return (
    <div style={{
      padding: '28px',
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      background: t.white,
    }}>
      <div style={{
        fontSize: '2rem',
        marginBottom: '14px',
      }}>{emoji}</div>
      <h3 style={{
        fontFamily: t.fontSans,
        fontSize: '1.05rem',
        fontWeight: 600,
        color: t.text,
        margin: '0 0 8px 0',
      }}>{title}</h3>
      <p style={{
        fontFamily: t.fontSans,
        fontSize: '0.93rem',
        color: t.gray,
        margin: 0,
        lineHeight: 1.6,
      }}>{description}</p>
    </div>
  )
}

// ─── Testimonial ──────────────────────────────────────────────────────────
function Testimonial({ text, author, role }) {
  return (
    <figure style={{
      margin: 0,
      padding: '28px 32px',
      borderLeft: `3px solid ${t.accent}`,
      background: t.white,
      borderRadius: '0 12px 12px 0',
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
        {role && <span> · {role}</span>}
      </figcaption>
    </figure>
  )
}

// ─── Post Card ────────────────────────────────────────────────────────────
function PostCard({ post }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <article className="home-post-card" style={{
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

// ─── Main Page ────────────────────────────────────────────────────────────
export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>ChurnRecovery — Stop Losing Subscribers You Already Earned</title>
        <meta name="description" content="Your subscribers are canceling and their payments are failing — but most of them would stay if you asked the right way. ChurnRecovery saves them automatically. Free forever." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ChurnRecovery — Stop Losing Subscribers You Already Earned" />
        <meta property="og:description" content="Your subscribers are leaving — but most would stay if you asked the right way. Free churn recovery for subscription businesses." />
        <meta property="og:url" content="https://churnrecovery.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ChurnRecovery — Stop Losing Subscribers You Already Earned" />
        <meta name="twitter:description" content="Your subscribers are leaving — but most would stay if you asked the right way. Free churn recovery for subscription businesses." />
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
            }}>Free Forever · No Per-Recovery Fees</span>
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
            maxWidth: '760px',
          }}>
            Your subscribers are leaving.<br />
            <span style={{ color: t.accent }}>Most would stay if you asked.</span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            color: t.gray,
            margin: '0 0 40px 0',
            maxWidth: '600px',
            lineHeight: 1.55,
            fontWeight: 400,
          }}>
            Every month, subscribers cancel and payments fail — silently costing you
            thousands. ChurnRecovery catches them before they're gone, wins them back
            automatically, and it's <strong style={{ color: t.text }}>completely free</strong>.
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
              Start Saving Subscribers →
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
              See how it works
            </Link>
          </div>

          {/* Micro-line */}
          <p style={{
            fontFamily: t.fontSans,
            fontSize: '0.8rem',
            color: t.grayLight,
            marginTop: '20px',
            marginBottom: 0,
          }}>
            Works with newsletters, courses, coaching, memberships — any subscription business.
          </p>
        </div>

        {/* ── Hero Product Screenshot ─────────────────────────────────── */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px 72px',
        }}>
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${t.border}`,
            boxShadow: '0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
            background: t.white,
          }}>
            {/* Browser chrome mockup */}
            <div style={{
              background: '#F0EFE9',
              borderBottom: `1px solid ${t.border}`,
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
              <span style={{
                flex: 1, background: t.white, borderRadius: 6, padding: '4px 12px',
                fontSize: '0.75rem', color: t.gray, fontFamily: t.fontSans, marginLeft: 8,
              }}>app.churnrecovery.com/dashboard</span>
            </div>
            <img
              src="/screenshots/homepage-hero.png"
              alt="ChurnRecovery dashboard showing recovered revenue, active cancel flows, and subscriber analytics — all in one place"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
          <p style={{
            fontFamily: t.fontSans,
            fontSize: '0.82rem',
            color: t.grayLight,
            textAlign: 'center',
            marginTop: '14px',
          }}>
            The ChurnRecovery dashboard — see recovered revenue, cancel reasons, and active flows at a glance.
          </p>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────────────── */}
      <section style={{
        borderBottom: `1px solid ${t.border}`,
        background: t.white,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '72px 24px',
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: t.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>The problem nobody talks about</span>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
              fontWeight: 600,
              color: t.text,
              letterSpacing: '-0.02em',
              margin: '12px 0 20px 0',
              lineHeight: 1.2,
            }}>
              You're losing money every single month — and you might not even know it
            </h2>
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '1.05rem',
              color: t.gray,
              lineHeight: 1.7,
              margin: '0 0 40px 0',
            }}>
              Credit cards expire. Banks decline charges. Subscribers forget to update their payment details. 
              Others hit "cancel" on a bad day — even though they'd stay if you offered a pause or a discount. 
              These aren't lost causes. They're <strong style={{ color: t.text }}>recoverable revenue</strong>.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            {[
              { number: '5–10%', label: 'of payments fail every month' },
              { number: '~70%', label: 'of failed payments can be recovered' },
              { number: '20–40%', label: 'of cancels can be saved with the right offer' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: t.fontSans,
                  fontSize: '2.2rem',
                  fontWeight: 600,
                  color: t.accent,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>{stat.number}</div>
                <div style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.88rem',
                  color: t.gray,
                  marginTop: '8px',
                  lineHeight: 1.4,
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IT DOES (benefits, not features) ────────────────────────── */}
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
            }}>What ChurnRecovery does for you</span>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
              fontWeight: 600,
              color: t.text,
              letterSpacing: '-0.02em',
              margin: '12px 0 0 0',
              lineHeight: 1.2,
            }}>
              Keep more subscribers without more work
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            <BenefitCard
              emoji="🛑"
              title="Save subscribers who try to cancel"
              description="When a subscriber clicks 'cancel,' they see a friendly screen that asks why — then offers the right solution. A pause, a discount, a plan switch. You decide what to offer."
            />
            <BenefitCard
              emoji="💳"
              title="Recover failed payments automatically"
              description="Expired cards, bank declines, insufficient funds — ChurnRecovery retries payments at the right time and reminds subscribers to update their info before they even notice."
            />
            <BenefitCard
              emoji="📊"
              title="See why people are leaving"
              description="Stop guessing. Get clear data on why subscribers cancel, which offers work best, and how much revenue you've recovered — all in a simple dashboard."
            />
            <BenefitCard
              emoji="⚡"
              title="Set up in 5 minutes, not 5 hours"
              description="Copy one line into your site, connect your payment provider, and you're live. No hiring a developer. No complicated setup. Works with Stripe, Paddle, and more."
            />
            <BenefitCard
              emoji="💰"
              title="It's free. Seriously."
              description="Other tools charge $250–$800/month for this. We don't charge anything — no monthly fee, no per-subscriber fee, no 'upgrade to unlock' tricks. Free means free."
            />
            <BenefitCard
              emoji="🎨"
              title="Matches your brand"
              description="The cancel flow and recovery emails match your business. Your subscribers see your colors, your logo, your voice — not a generic popup from some tool they've never heard of."
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section style={{
        background: t.white,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '72px 24px',
        }}>
          <div style={{ marginBottom: '48px', textAlign: 'center' }}>
            <span style={{
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: t.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>How it works</span>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
              fontWeight: 600,
              color: t.text,
              letterSpacing: '-0.02em',
              margin: '12px 0 0 0',
              lineHeight: 1.2,
            }}>
              Three steps. Five minutes. More revenue.
            </h2>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}>
            <Step
              number="1"
              title="Connect your payment provider"
              description="Link your Stripe, Paddle, or other payment account. Takes about 60 seconds — just click 'connect' and authorize."
              screenshot="/screenshots/product-flow-builder.png"
              screenshotAlt="ChurnRecovery cancel flow builder — customize save offers, pause options, and cancellation reasons with a visual editor"
            />
            <Step
              number="2"
              title="Choose what to offer"
              description="Pick from proven templates: offer a discount, suggest a pause, switch their plan, or ask for feedback. Customize the message in your voice. No design skills needed."
              screenshot="/screenshots/product-dashboard-improved.png"
              screenshotAlt="ChurnRecovery dashboard showing recovered revenue metrics, subscriber save rate, and payment recovery statistics"
            />
            <Step
              number="3"
              title="Start recovering revenue"
              description="That's it. When someone tries to cancel, they'll see your custom save flow. When a payment fails, we handle retries and reminders. You just watch the recovered revenue in your dashboard."
              screenshot="/screenshots/product-email-sequences.png"
              screenshotAlt="ChurnRecovery automated email sequences — dunning emails for failed payments sent at the right time to recover subscribers"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              href="/demo"
              style={{
                fontFamily: t.fontSans,
                fontWeight: 600,
                fontSize: '0.95rem',
                color: t.accent,
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              See a live demo of the cancel flow →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '72px 24px',
        }}>
          <div style={{ marginBottom: '48px', textAlign: 'center' }}>
            <span style={{
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: t.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>Built for subscription businesses</span>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
              fontWeight: 600,
              color: t.text,
              letterSpacing: '-0.02em',
              margin: '12px 0 0 0',
              lineHeight: 1.2,
            }}>
              Perfect for creators, coaches, and small businesses
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}>
            {[
              {
                emoji: '📧',
                title: 'Newsletter creators',
                desc: 'Paid Substack, Beehiiv, ConvertKit — keep readers subscribed when their card expires or they think about leaving.'
              },
              {
                emoji: '🎓',
                title: 'Online course sellers',
                desc: 'Teachable, Kajabi, Thinkific — recover payments on monthly access plans and save students who want to cancel mid-course.'
              },
              {
                emoji: '🏋️',
                title: 'Coaches & consultants',
                desc: 'Running a membership or group coaching program? Keep clients enrolled with smart save offers when they try to cancel.'
              },
              {
                emoji: '📦',
                title: 'Subscription boxes & memberships',
                desc: "Whether it's a community, a box, or a service — ChurnRecovery works with any recurring billing."
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '24px',
                border: `1px solid ${t.border}`,
                borderRadius: '12px',
                background: t.white,
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{item.emoji}</div>
                <h3 style={{
                  fontFamily: t.fontSans,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 6px 0',
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.9rem',
                  color: t.gray,
                  margin: 0,
                  lineHeight: 1.6,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COST COMPARISON ──────────────────────────────────────────────── */}
      <section style={{
        background: t.white,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '72px 24px',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: t.fontSans,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: t.accent,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>The price difference</span>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
            fontWeight: 600,
            color: t.text,
            letterSpacing: '-0.02em',
            margin: '12px 0 20px 0',
            lineHeight: 1.2,
          }}>
            Other churn tools cost $250–$825/month. We cost $0.
          </h2>
          <p style={{
            fontFamily: t.fontSans,
            fontSize: '1.05rem',
            color: t.gray,
            lineHeight: 1.7,
            margin: '0 0 40px 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Tools like Churnkey, ProfitWell, and Churnbuster charge hundreds per month. 
            That's money that eats into the very revenue they're supposed to recover. 
            ChurnRecovery gives you the same features — cancel flows, payment recovery, 
            analytics — for free.
          </p>

          {/* Side by side price cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            <div style={{
              padding: '32px 24px',
              borderRadius: '12px',
              border: `2px solid ${t.accent}`,
              background: t.white,
            }}>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '0.8rem',
                fontWeight: 600,
                color: t.accent,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>ChurnRecovery</div>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '3rem',
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.03em',
              }}>$0</div>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '0.85rem',
                color: t.gray,
                marginTop: '4px',
              }}>per month, forever</div>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '0.82rem',
                color: '#2D7A4F',
                fontWeight: 600,
                marginTop: '12px',
              }}>✓ All features included</div>
            </div>
            <div style={{
              padding: '32px 24px',
              borderRadius: '12px',
              border: `1px solid ${t.border}`,
              background: '#fafafa',
            }}>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '0.8rem',
                fontWeight: 600,
                color: t.grayLight,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>Other tools</div>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '3rem',
                fontWeight: 700,
                color: t.gray,
                letterSpacing: '-0.03em',
                textDecoration: 'line-through',
                textDecorationColor: '#DC2626',
              }}>$500</div>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '0.85rem',
                color: t.grayLight,
                marginTop: '4px',
              }}>average per month</div>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '0.82rem',
                color: '#DC2626',
                fontWeight: 600,
                marginTop: '12px',
              }}>= $6,000/year you could save</div>
            </div>
          </div>

          <p style={{
            fontFamily: t.fontSans,
            fontSize: '0.8rem',
            color: t.grayLight,
            marginTop: '16px',
          }}>
            <Link href="/compare/churnkey" style={{ color: t.accent }}>See detailed comparison →</Link>
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
          }}>What business owners are saying</span>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '32px',
          }}>
            <Testimonial
              text="We were paying $400/month for churn recovery on a $12k business. That's insane. So glad there's a free option that actually works."
              author="Marc K."
              role="Newsletter creator"
            />
            <Testimonial
              text="I had no idea how many subscribers I was losing to expired credit cards until I set this up. Recovered 23 subscribers in the first month alone."
              author="Priya N."
              role="Online course creator"
            />
            <Testimonial
              text="The cancel flow saved two coaching clients this week. One just needed a payment pause — I never would have known without this tool."
              author="James W."
              role="Business coach"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{
        background: t.white,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '72px 24px',
        }}>
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <span style={{
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: t.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>Common questions</span>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              fontWeight: 600,
              color: t.text,
              letterSpacing: '-0.02em',
              margin: '12px 0 0 0',
            }}>
              You're probably wondering...
            </h2>
          </div>

          {[
            {
              q: 'How is this actually free?',
              a: 'We make money from optional premium features down the road (like white-label branding and priority support). The core product — cancel flows, payment recovery, analytics — will always be free.'
            },
            {
              q: 'Do I need a developer to set this up?',
              a: 'No. If you can copy and paste a line of text, you can set this up. We give you step-by-step instructions, and it works with the tools you already use — Stripe, Paddle, and more.'
            },
            {
              q: 'Will my subscribers see your branding?',
              a: 'No. Everything is customized to match your business. Your subscribers will never know you\'re using a third-party tool.'
            },
            {
              q: 'What kind of results can I expect?',
              a: 'Most businesses recover 20–40% of subscribers who try to cancel, and 50–70% of failed payments. That could mean thousands of dollars in recovered revenue per year, depending on your size.'
            },
            {
              q: 'What if I use Substack / Beehiiv / Teachable / Kajabi?',
              a: 'We integrate with any platform that uses Stripe or another supported payment processor under the hood. If your subscribers pay through Stripe (most do), it works.'
            },
          ].map((faq, i) => (
            <div key={i} style={{
              padding: '24px 0',
              borderBottom: `1px solid ${t.border}`,
            }}>
              <h3 style={{
                fontFamily: t.fontSans,
                fontSize: '1rem',
                fontWeight: 600,
                color: t.text,
                margin: '0 0 8px 0',
              }}>{faq.q}</h3>
              <p style={{
                fontFamily: t.fontSans,
                fontSize: '0.93rem',
                color: t.gray,
                margin: 0,
                lineHeight: 1.65,
              }}>{faq.a}</p>
            </div>
          ))}
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
              Stop losing subscribers.<br />
              <span style={{ color: t.accent }}>Start recovering revenue.</span>
            </h2>
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '1rem',
              color: '#aaaaaa',
              margin: '0 0 32px 0',
              lineHeight: 1.6,
            }}>
              Join the waitlist and we'll set you up — no credit card, no sales calls, 
              no surprises. Just a simple tool that saves your subscribers.
            </p>

            <WaitlistForm source="homepage" dark={true} />

            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.85rem',
              color: '#888888',
              marginTop: '16px',
            }}>
              Not ready to sign up?{' '}
              <Link
                href="/demo"
                style={{
                  color: t.accent,
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Try the interactive demo first →
              </Link>
            </p>
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
                }}>Tips to keep more subscribers</h2>
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
              {posts.slice(0, 3).map(post => (
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
