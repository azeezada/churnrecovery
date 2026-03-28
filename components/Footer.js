import Link from 'next/link'

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
    { label: 'Status', href: '/status' },
    { label: 'Contact', href: 'mailto:hello@churnrecovery.com' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-border bg-brand-bg mt-20">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        {/* Top row: brand + links grid */}
        <div className="grid grid-cols-1 gap-12 mb-12 footer-grid">
          {/* Brand column */}
          <div>
            <Link href="/" className="no-underline">
              <span className="font-sans font-semibold text-lg text-brand-text tracking-[-0.02em]">
                ChurnRecovery
              </span>
            </Link>
            <p className="font-serif text-sm text-brand-gray mt-3 leading-relaxed max-w-[240px]">
              Churn recovery for SaaS. Cancel flows, payment recovery, and analytics — $20/month.
            </p>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-sans font-semibold text-xs tracking-[0.08em] uppercase text-brand-text mb-4 mt-0">
                {section}
              </h4>
              <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.target}
                      className="font-sans text-sm text-brand-gray no-underline transition-colors duration-200 hover:text-brand-text"
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
        <div className="border-t border-brand-border pt-6 flex flex-wrap justify-between items-center gap-4">
          <p className="font-sans text-xs text-brand-gray-light m-0">
            © {currentYear} ChurnRecovery. 30-day free trial · $20/month after.
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs text-brand-gray-light no-underline transition-colors duration-200 hover:text-brand-text"
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
