import Head from 'next/head'
import Link from 'next/link'
import WaitlistForm from '../components/WaitlistForm'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentLight: '#FDF0EB',
  border: '#E5E5E5',
  borderLight: '#F0EFEC',
  white: '#FFFFFF',
  purple: '#7C3AED',
  purpleLight: '#F5F0FF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// ─── Testimonial Placeholder ─────────────────────────────────────────────────
function TestimonialPlaceholder({ platform, role }) {
  return (
    <div style={{
      border: `1.5px dashed ${t.border}`,
      borderRadius: '12px',
      padding: '28px',
      background: t.white,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Placeholder badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: t.borderLight,
        color: t.grayLight,
        fontSize: '0.7rem',
        fontFamily: t.fontSans,
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        padding: '4px 8px',
        borderRadius: '4px',
      }}>
        Coming soon
      </div>

      {/* Quote icon */}
      <div style={{
        fontSize: '1.8rem',
        color: t.borderLight,
        fontFamily: 'Georgia, serif',
        lineHeight: 1,
        marginBottom: '12px',
      }}>
        &ldquo;
      </div>

      {/* Placeholder lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        {[90, 100, 75].map((w, i) => (
          <div key={i} style={{
            height: '14px',
            width: `${w}%`,
            background: t.borderLight,
            borderRadius: '4px',
          }} />
        ))}
      </div>

      {/* Author area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: t.borderLight,
          flexShrink: 0,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ height: '12px', width: '120px', background: t.borderLight, borderRadius: '3px' }} />
          <div style={{ height: '11px', width: '80px', background: t.borderLight, borderRadius: '3px' }} />
        </div>
      </div>

      {/* Platform tag */}
      {platform && (
        <div style={{
          marginTop: '16px',
          display: 'inline-block',
          background: t.accentLight,
          color: t.accent,
          fontSize: '0.75rem',
          fontFamily: t.fontSans,
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: '20px',
        }}>
          {platform}
        </div>
      )}
    </div>
  )
}

// ─── Real Testimonial (for when we have them) ─────────────────────────────────
function Testimonial({ quote, name, role, platform, avatar }) {
  return (
    <div style={{
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      padding: '28px',
      background: t.white,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        fontSize: '1.8rem',
        color: t.accent,
        fontFamily: 'Georgia, serif',
        lineHeight: 1,
        marginBottom: '12px',
      }}>
        &ldquo;
      </div>
      <p style={{
        fontFamily: t.fontSerif,
        fontSize: '0.95rem',
        color: t.text,
        lineHeight: 1.65,
        margin: '0 0 20px 0',
        fontStyle: 'italic',
      }}>
        {quote}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {avatar ? (
          <img src={avatar} alt={name} style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            objectFit: 'cover',
          }} />
        ) : (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: t.accentLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '0.85rem',
            color: t.accent,
            flexShrink: 0,
          }}>
            {name.charAt(0)}
          </div>
        )}
        <div>
          <div style={{ fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.875rem', color: t.text }}>
            {name}
          </div>
          <div style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.grayLight }}>
            {role}
          </div>
        </div>
        {platform && (
          <div style={{
            marginLeft: 'auto',
            background: t.accentLight,
            color: t.accent,
            fontSize: '0.75rem',
            fontFamily: t.fontSans,
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: '20px',
            flexShrink: 0,
          }}>
            {platform}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Twitter Mention (embed-ready) ───────────────────────────────────────────
function TwitterMentionPlaceholder() {
  return (
    <div style={{
      border: `1.5px dashed ${t.border}`,
      borderRadius: '12px',
      padding: '20px',
      background: t.white,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: t.borderLight,
          flexShrink: 0,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div style={{ height: '12px', width: '140px', background: t.borderLight, borderRadius: '3px' }} />
          <div style={{ height: '11px', width: '90px', background: t.borderLight, borderRadius: '3px' }} />
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill={t.borderLight}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[100, 85, 60].map((w, i) => (
          <div key={i} style={{
            height: '13px',
            width: `${w}%`,
            background: t.borderLight,
            borderRadius: '4px',
          }} />
        ))}
      </div>
      <div style={{
        marginTop: '14px',
        fontSize: '0.75rem',
        color: t.grayLight,
        fontFamily: t.fontSans,
        fontStyle: 'italic',
      }}>
        Twitter mention — coming soon
      </div>
    </div>
  )
}

// ─── Press Mention ────────────────────────────────────────────────────────────
function PressMentionPlaceholder({ outlet }) {
  return (
    <div style={{
      border: `1.5px dashed ${t.border}`,
      borderRadius: '10px',
      padding: '20px 24px',
      background: t.white,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        background: t.borderLight,
        borderRadius: '8px',
        flexShrink: 0,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: t.fontSans,
          fontWeight: 600,
          fontSize: '0.875rem',
          color: t.grayLight,
          marginBottom: '6px',
        }}>
          {outlet}
        </div>
        <div style={{ height: '12px', width: '70%', background: t.borderLight, borderRadius: '3px' }} />
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: t.grayLight,
        fontFamily: t.fontSans,
        whiteSpace: 'nowrap',
      }}>
        Coverage pending
      </div>
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ number, label, sublabel }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '32px 20px',
      background: t.white,
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
    }}>
      <div style={{
        fontFamily: t.fontSans,
        fontWeight: 700,
        fontSize: '2.5rem',
        color: t.accent,
        lineHeight: 1,
        marginBottom: '8px',
      }}>
        {number}
      </div>
      <div style={{
        fontFamily: t.fontSans,
        fontWeight: 600,
        fontSize: '0.9rem',
        color: t.text,
        marginBottom: '4px',
      }}>
        {label}
      </div>
      {sublabel && (
        <div style={{
          fontFamily: t.fontSans,
          fontSize: '0.8rem',
          color: t.grayLight,
        }}>
          {sublabel}
        </div>
      )}
    </div>
  )
}

// ─── Community Reaction ───────────────────────────────────────────────────────
function CommunityReaction({ community, type, summary, link }) {
  return (
    <div style={{
      border: `1px solid ${t.border}`,
      borderRadius: '10px',
      padding: '20px',
      background: t.white,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: t.fontSans,
          fontWeight: 600,
          fontSize: '0.875rem',
          color: t.text,
        }}>
          {community}
        </span>
        <span style={{
          background: t.purpleLight,
          color: t.purple,
          fontSize: '0.72rem',
          fontFamily: t.fontSans,
          fontWeight: 600,
          padding: '3px 9px',
          borderRadius: '20px',
        }}>
          {type}
        </span>
      </div>
      <p style={{
        fontFamily: t.fontSerif,
        fontSize: '0.875rem',
        color: t.gray,
        margin: 0,
        lineHeight: 1.6,
        fontStyle: 'italic',
      }}>
        &ldquo;{summary}&rdquo;
      </p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: t.fontSans,
            fontSize: '0.8rem',
            color: t.accent,
            textDecoration: 'none',
          }}
        >
          Read thread →
        </a>
      )}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function SocialProofPage() {
  // Real testimonials go here as they come in
  const realTestimonials = []

  // Community reactions (update as they come in)
  const communityReactions = [
    {
      community: 'Indie Hackers',
      type: 'Discussion',
      summary: 'Thread coming after launch. Watch this space.',
      link: null,
    },
    {
      community: 'r/SaaS',
      type: 'Discussion',
      summary: 'Thread coming after launch. Watch this space.',
      link: null,
    },
    {
      community: 'Hacker News',
      type: 'Show HN',
      summary: 'Show HN submission coming. Watch this space.',
      link: null,
    },
  ]

  return (
    <>
      <Head>
        <title>What People Are Saying — ChurnRecovery</title>
        <meta
          name="description"
          content="Testimonials, community reactions, and press mentions for ChurnRecovery — the free churn recovery tool for newsletters, coaches, and subscription businesses."
        />
        <link rel="canonical" href="https://churnrecovery.com/social-proof" />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>

        {/* Nav */}
        <nav style={{
          borderBottom: `1px solid ${t.border}`,
          background: t.white,
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <Link href="/" style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.1rem', color: t.text, textDecoration: 'none' }}>
            ChurnRecovery
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/features" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Features</Link>
            <Link href="/pricing" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Pricing</Link>
            <a href="/#waitlist" style={{
              background: t.accent,
              color: t.white,
              padding: '8px 18px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}>
              Join Waitlist
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '80px 24px 40px',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: t.accentLight,
            color: t.accent,
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '24px',
          }}>
            <span>🎙️</span>
            <span>500+ business owners on the waitlist</span>
          </div>

          <h1 style={{
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: t.text,
            lineHeight: 1.15,
            margin: '0 0 20px 0',
            letterSpacing: '-0.02em',
          }}>
            What People Are Saying<br />About ChurnRecovery
          </h1>

          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1.1rem',
            color: t.gray,
            lineHeight: 1.65,
            margin: '0 auto',
            maxWidth: '560px',
          }}>
            Real reactions from newsletter operators, coaches, and indie founders who are tired of paying $250/mo just to keep their subscribers.
          </p>
        </section>

        {/* Social proof stats bar */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px 60px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
          }}>
            <StatCard number="500+" label="Waitlist Members" sublabel="and growing" />
            <StatCard number="~30%" label="Avg. Save Rate" sublabel="of at-risk subscribers" />
            <StatCard number="$0" label="Cost to Start" sublabel="free forever core tier" />
            <StatCard number="10+" label="Platforms Supported" sublabel="Stripe-connected tools" />
          </div>
        </section>

        {/* Testimonials */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontWeight: 700,
              fontSize: '1.5rem',
              color: t.text,
              margin: '0 0 8px 0',
            }}>
              Customer Testimonials
            </h2>
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.9rem',
              color: t.grayLight,
              margin: 0,
            }}>
              We&apos;re in pre-launch. Real quotes are on their way — sign up to be one of the first.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {realTestimonials.length > 0 ? (
              realTestimonials.map((t, i) => (
                <Testimonial key={i} {...t} />
              ))
            ) : (
              <>
                <TestimonialPlaceholder platform="Newsletter creator" />
                <TestimonialPlaceholder platform="Coaching business" />
                <TestimonialPlaceholder platform="SaaS founder" />
                <TestimonialPlaceholder platform="Membership community" />
                <TestimonialPlaceholder platform="Online course creator" />
                <TestimonialPlaceholder platform="Indie hacker" />
              </>
            )}
          </div>

          <div style={{
            marginTop: '24px',
            padding: '16px 20px',
            background: t.accentLight,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ fontSize: '1.2rem' }}>✉️</span>
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.875rem',
              color: t.accent,
              margin: 0,
              fontWeight: 500,
            }}>
              Are you on the waitlist? We&apos;d love to feature your story.{' '}
              <a href="mailto:hello@churnrecovery.com?subject=I want to share my story" style={{ color: t.accent, fontWeight: 700 }}>
                Reach out
              </a>
              .
            </p>
          </div>
        </section>

        {/* Twitter Mentions */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '60px 24px',
          }}>
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill={t.text}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <div>
                <h2 style={{
                  fontFamily: t.fontSans,
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: t.text,
                  margin: 0,
                }}>
                  Twitter Mentions
                </h2>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}>
              <TwitterMentionPlaceholder />
              <TwitterMentionPlaceholder />
              <TwitterMentionPlaceholder />
            </div>

            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.85rem',
              color: t.grayLight,
              marginTop: '20px',
              textAlign: 'center',
            }}>
              Mentioned us on Twitter?{' '}
              <a
                href="https://twitter.com/intent/tweet?text=Just+discovered+%40ChurnRecovery+%E2%80%94+free+churn+recovery+for+subscription+businesses.+%F0%9F%92%8C&url=https%3A%2F%2Fchurnrecovery.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: t.accent, textDecoration: 'none', fontWeight: 600 }}
              >
                Share the news
              </a>{' '}
              and tag{' '}
              <a
                href="https://twitter.com/ChurnRecovery"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: t.accent, textDecoration: 'none' }}
              >
                @ChurnRecovery
              </a>
              .
            </p>
          </div>
        </section>

        {/* Press Mentions */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '60px 24px',
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontWeight: 700,
              fontSize: '1.5rem',
              color: t.text,
              margin: '0 0 8px 0',
            }}>
              Press &amp; Coverage
            </h2>
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.9rem',
              color: t.grayLight,
              margin: 0,
            }}>
              Pre-launch. Coverage coming as we grow.{' '}
              <Link href="/press" style={{ color: t.accent, textDecoration: 'none', fontWeight: 600 }}>
                Press kit →
              </Link>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <PressMentionPlaceholder outlet="Indie Hackers" />
            <PressMentionPlaceholder outlet="Hacker News" />
            <PressMentionPlaceholder outlet="Product Hunt" />
            <PressMentionPlaceholder outlet="Newsletter Creator community" />
          </div>
        </section>

        {/* Community Reactions */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '60px 24px',
          }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontFamily: t.fontSans,
                fontWeight: 700,
                fontSize: '1.5rem',
                color: t.text,
                margin: '0 0 8px 0',
              }}>
                Community Reactions
              </h2>
              <p style={{
                fontFamily: t.fontSans,
                fontSize: '0.9rem',
                color: t.grayLight,
                margin: 0,
              }}>
                What the indie builder community is saying about the churn recovery gap.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}>
              {communityReactions.map((reaction, i) => (
                <CommunityReaction key={i} {...reaction} />
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '80px 24px 100px',
          textAlign: 'center',
        }}>
          <div style={{
            background: t.white,
            border: `1px solid ${t.border}`,
            borderRadius: '16px',
            padding: '48px 40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🚀</div>
            <h2 style={{
              fontFamily: t.fontSans,
              fontWeight: 700,
              fontSize: '1.6rem',
              color: t.text,
              margin: '0 0 12px 0',
              lineHeight: 1.25,
            }}>
              Join 500+ business owners on the waitlist
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.95rem',
              color: t.gray,
              lineHeight: 1.65,
              margin: '0 0 32px 0',
            }}>
              ChurnRecovery is free forever. No credit card. No $250/mo Churnkey contract.
              Just a cancel flow that keeps your subscribers.
            </p>

            <WaitlistForm source="social-proof" />

            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.8rem',
              color: t.grayLight,
              marginTop: '16px',
              marginBottom: 0,
            }}>
              Free forever. Unsubscribe anytime.
            </p>
          </div>
        </section>

      </div>
    </>
  )
}
