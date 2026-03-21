import Link from 'next/link'
import { useState } from 'react'
import { useAuthUser } from '../lib/useAuthUser'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  fontSans: '"Instrument Sans", sans-serif',
}

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
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      background: t.bg, zIndex: 1000,
      borderBottom: `1px solid ${t.border}`,
      fontFamily: t.fontSans,
      overflow: 'visible',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: t.white, fontWeight: 800, fontSize: 14, flexShrink: 0,
          }}>C</div>
          <span style={{ fontSize: 15, fontWeight: 600, color: t.text, letterSpacing: '-0.01em' }}>
            ChurnRecovery
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              fontSize: 14, fontWeight: 500, color: t.gray,
              textDecoration: 'none', padding: '6px 12px', borderRadius: 6,
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = t.text; e.currentTarget.style.background = t.border; }}
            onMouseLeave={e => { e.currentTarget.style.color = t.gray; e.currentTarget.style.background = 'transparent'; }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + contact + mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isSignedIn ? (
            <Link href="/app/dashboard" style={{
              background: t.accent, color: t.white, padding: '8px 18px',
              borderRadius: 7, fontWeight: 600, textDecoration: 'none', fontSize: 14,
              whiteSpace: 'nowrap',
            }} className="header-cta">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/app/sign-in" style={{
                color: t.gray, textDecoration: 'none', fontSize: 14,
                fontWeight: 500, padding: '8px 12px',
              }} className="header-signin">
                Sign in
              </Link>
              <Link href="/#waitlist" style={{
                background: t.accent, color: t.white, padding: '8px 18px',
                borderRadius: 7, fontWeight: 600, textDecoration: 'none', fontSize: 14,
                whiteSpace: 'nowrap',
              }} className="header-cta">
                Join Waitlist
              </Link>
            </>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: 8, color: t.text, fontSize: 20,
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="mobile-nav" style={{
          background: t.bg, borderTop: `1px solid ${t.border}`,
          padding: '12px 24px 20px',
        }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '12px 0',
                borderBottom: `1px solid ${t.border}`,
                fontSize: 16, fontWeight: 500, color: t.text,
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          {isSignedIn ? (
            <Link href="/app/dashboard" onClick={() => setMobileOpen(false)} style={{
              display: 'block', marginTop: 16,
              background: t.accent, color: t.white,
              padding: '12px', borderRadius: 8, fontWeight: 700,
              textDecoration: 'none', textAlign: 'center', fontSize: 15,
            }}>
              Dashboard →
            </Link>
          ) : (
            <>
              <Link href="/app/sign-in" onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '12px 0',
                borderBottom: `1px solid ${t.border}`,
                fontSize: 16, fontWeight: 500, color: t.text,
                textDecoration: 'none',
              }}>
                Sign in
              </Link>
              <Link href="/#waitlist" onClick={() => setMobileOpen(false)} style={{
                display: 'block', marginTop: 16,
                background: t.accent, color: t.white,
                padding: '12px', borderRadius: 8, fontWeight: 700,
                textDecoration: 'none', textAlign: 'center', fontSize: 15,
              }}>
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
