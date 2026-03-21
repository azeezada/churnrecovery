import Link from 'next/link'
import { tokens } from '../lib/design-tokens'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'Cancel Flow Demo', href: '/demo' },
    { label: 'Churn Calculator', href: '/tools/churn-calculator' },
    { label: 'ROI Calculator', href: '/tools/roi-calculator' },
    { label: 'Templates', href: '/templates' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Resources: [
    { label: 'Free Playbook', href: '/resources/churn-recovery-playbook' },
    { label: 'Blog', href: '/blog' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Use Cases', href: '/use-cases' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Churn Guide', href: '/posts/Ultimate-Guide-SaaS-Churn' },
    { label: 'Cancel Flow Examples', href: '/posts/Cancel-Flow-Examples' },
  ],
  Compare: [
    { label: 'vs Churnkey', href: '/compare/churnkey' },
    { label: 'vs ProfitWell', href: '/compare/profitwell' },
    { label: 'vs Churnbuster', href: '/compare/churnbuster' },
    { label: 'vs Baremetrics', href: '/compare/baremetrics' },
    { label: 'Alternatives', href: '/alternatives/churnkey' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Press', href: '/press' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'GitHub', href: 'https://github.com/churnrecovery', target: '_blank' },
    { label: 'Contact', href: 'mailto:hello@churnrecovery.com' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: `1px solid ${tokens.colors.border}`,
      background: tokens.colors.bg,
      marginTop: '80px',
    }}>
      <div style={{
        maxWidth: tokens.layout.containerMax,
        margin: '0 auto',
        padding: `64px ${tokens.layout.containerPadding} 40px`,
      }}>
        {/* Top row: brand + links grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          marginBottom: '48px',
        }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: tokens.fonts.sans,
                fontWeight: tokens.fontWeights.semibold,
                fontSize: tokens.fontSizes.lg,
                color: tokens.colors.text,
                letterSpacing: tokens.letterSpacings.snug,
              }}>
                ChurnRecovery
              </span>
            </Link>
            <p style={{
              fontFamily: tokens.fonts.serif,
              fontSize: tokens.fontSizes.sm,
              color: tokens.colors.gray,
              marginTop: '12px',
              lineHeight: tokens.lineHeights.relaxed,
              maxWidth: '240px',
            }}>
              Free churn recovery for SaaS. Stop losing customers to failed payments and cancel flows.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <a
                href="https://github.com/churnrecovery"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: tokens.fonts.sans,
                  fontSize: tokens.fontSizes.sm,
                  color: tokens.colors.gray,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: `color ${tokens.transitions.base}`,
                }}
                onMouseEnter={e => e.currentTarget.style.color = tokens.colors.text}
                onMouseLeave={e => e.currentTarget.style.color = tokens.colors.gray}
              >
                <GitHubIcon />
                GitHub
              </a>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{
                fontFamily: tokens.fonts.sans,
                fontWeight: tokens.fontWeights.semibold,
                fontSize: tokens.fontSizes.xs,
                letterSpacing: tokens.letterSpacings.wider,
                textTransform: 'uppercase',
                color: tokens.colors.text,
                margin: '0 0 16px 0',
              }}>
                {section}
              </h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.target}
                      style={{
                        fontFamily: tokens.fonts.sans,
                        fontSize: tokens.fontSizes.sm,
                        color: tokens.colors.gray,
                        textDecoration: 'none',
                        transition: `color ${tokens.transitions.base}`,
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = tokens.colors.text}
                      onMouseLeave={e => e.currentTarget.style.color = tokens.colors.gray}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row: copyright + legal */}
        <div style={{
          borderTop: `1px solid ${tokens.colors.border}`,
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
          <p style={{
            fontFamily: tokens.fonts.sans,
            fontSize: tokens.fontSizes.xs,
            color: tokens.colors.grayLight,
            margin: 0,
          }}>
            © {currentYear} ChurnRecovery. Free forever. Open source.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Design Exploration', href: '/styles' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'RSS', href: '/rss.xml' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: tokens.fonts.sans,
                  fontSize: tokens.fontSizes.xs,
                  color: tokens.colors.grayLight,
                  textDecoration: 'none',
                  transition: `color ${tokens.transitions.base}`,
                }}
                onMouseEnter={e => e.currentTarget.style.color = tokens.colors.text}
                onMouseLeave={e => e.currentTarget.style.color = tokens.colors.grayLight}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 280px repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </footer>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
