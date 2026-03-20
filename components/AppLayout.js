import Link from 'next/link'
import { useRouter } from 'next/router'
import { isClerkEnabled } from '../lib/auth'

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
}

const navItems = [
  { href: '/app/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/app/projects', label: 'Projects', icon: '📂' },
  { href: '/app/cancel-flow', label: 'Cancel Flow', icon: '🚪' },
  { href: '/app/analytics', label: 'Analytics', icon: '📈' },
  { href: '/app/install', label: 'Install Widget', icon: '📦' },
  { href: '/app/settings', label: 'Settings', icon: '⚙️' },
]

function UserArea() {
  if (isClerkEnabled()) {
    const { UserButton } = require('@clerk/nextjs')
    return (
      <div style={{
        padding: '16px 20px',
        borderTop: `1px solid ${t.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <UserButton afterSignOutUrl="/" />
        <span style={{ fontSize: '0.82rem', color: t.gray }}>Account</span>
      </div>
    )
  }
  return (
    <div style={{
      padding: '16px 20px',
      borderTop: `1px solid ${t.border}`,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%',
        background: t.accent, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.75rem', fontWeight: 700,
      }}>D</div>
      <span style={{ fontSize: '0.82rem', color: t.gray }}>Demo Mode</span>
    </div>
  )
}

export default function AppLayout({ children, title }) {
  const router = useRouter()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F4F0', fontFamily: t.fontSans }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        background: t.white,
        borderRight: `1px solid ${t.border}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: `1px solid ${t.border}`,
        }}>
          <Link href="/" style={{
            fontFamily: t.fontSans,
            fontWeight: 800,
            fontSize: '1.1rem',
            color: t.text,
            textDecoration: 'none',
            letterSpacing: '-0.03em',
          }}>
            ChurnRecovery
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {navItems.map(item => {
            const isActive = router.pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? t.accent : t.gray,
                  background: isActive ? '#FDF4EF' : 'transparent',
                  marginBottom: '2px',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <UserArea />
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '32px 40px', maxWidth: '1100px' }}>
        {title && (
          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: '1.6rem',
            fontWeight: 800,
            color: t.text,
            letterSpacing: '-0.04em',
            margin: '0 0 8px',
          }}>
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  )
}
