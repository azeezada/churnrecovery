import Link from 'next/link'
import { useState } from 'react'
import { useAuthUser } from '../lib/useAuthUser'

const navLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/integrations', label: 'Integrations' },
  { href: '/demo', label: 'Demo' },
  { href: '/tools/roi-calculator', label: 'ROI Calculator' },
  { href: '/blog', label: 'Blog' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isSignedIn } = useAuthUser()

  return (
    <header className="fixed top-0 left-0 right-0 bg-brand-bg z-[1000] border-b border-brand-border font-sans overflow-visible">
      <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-7 h-7 rounded-[6px] bg-brand-accent flex items-center justify-center text-brand-white font-[800] text-sm shrink-0">C</div>
          <span className="text-[15px] font-semibold text-brand-text tracking-[-0.01em]">
            ChurnRecovery
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="flex items-center gap-1 desktop-nav">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="text-sm font-medium text-brand-gray no-underline px-3 py-1.5 rounded-[6px] transition-[color,background] duration-150 hover:text-brand-text hover:bg-brand-border"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + contact + mobile toggle */}
        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <Link href="/app/dashboard" className="bg-brand-accent text-brand-white px-[18px] py-2 rounded-[7px] font-semibold no-underline text-sm whitespace-nowrap header-cta">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/app/sign-in" className="text-brand-gray no-underline text-sm font-medium px-3 py-2 header-signin">
                Sign in
              </Link>
              <Link href="/#waitlist" className="bg-brand-accent text-brand-white px-[18px] py-2 rounded-[7px] font-semibold no-underline text-sm whitespace-nowrap header-cta">
                Join Waitlist
              </Link>
            </>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn hidden bg-transparent border-none cursor-pointer p-2 text-brand-text text-xl"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="mobile-nav bg-brand-bg border-t border-brand-border px-6 pt-3 pb-5">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 border-b border-brand-border text-base font-medium text-brand-text no-underline"
            >
              {link.label}
            </Link>
          ))}
          {isSignedIn ? (
            <Link href="/app/dashboard" onClick={() => setMobileOpen(false)}
              className="block mt-4 bg-brand-accent text-brand-white p-3 rounded-lg font-bold no-underline text-center text-[15px]">
              Dashboard →
            </Link>
          ) : (
            <>
              <Link href="/app/sign-in" onClick={() => setMobileOpen(false)}
                className="block py-3 border-b border-brand-border text-base font-medium text-brand-text no-underline">
                Sign in
              </Link>
              <Link href="/#waitlist" onClick={() => setMobileOpen(false)}
                className="block mt-4 bg-brand-accent text-brand-white p-3 rounded-lg font-bold no-underline text-center text-[15px]">
                Join Waitlist →
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .header-cta { display: none !important; }
          .header-signin { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        .mobile-nav {
          display: block;
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
          z-index: 999;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
      `}</style>
    </header>
  )
}
