import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isClerkEnabled } from '../lib/auth'
import { useAuthUser } from '../lib/useAuthUser'

const navItems = [
  { href: '/app/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/app/onboarding', label: 'Setup Wizard', icon: '🚀' },
  { href: '/app/projects', label: 'Projects', icon: '📂' },
  { href: '/app/cancel-flow', label: 'Cancel Flow', icon: '🚪' },
  { href: '/app/analytics', label: 'Analytics', icon: '📈' },
  { href: '/app/recovery', label: 'Payment Recovery', icon: '💳' },
  { href: '/app/install', label: 'Install Widget', icon: '📦' },
  { href: '/app/settings', label: 'Settings', icon: '⚙️' },
]

function UserArea() {
  if (isClerkEnabled()) {
    const { UserButton } = require('@clerk/nextjs')
    return (
      <div className="px-5 py-4 border-t border-brand-border flex items-center gap-3">
        <UserButton afterSignOutUrl="/" />
        <span className="text-[0.82rem] text-brand-gray">Account</span>
      </div>
    )
  }
  return (
    <div className="px-5 py-4 border-t border-brand-border flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-full bg-brand-accent text-white flex items-center justify-center text-xs font-bold">D</div>
      <span className="text-[0.82rem] text-brand-gray">Demo Mode</span>
    </div>
  )
}

export default function AppLayout({ children, title }) {
  const router = useRouter()
  const { user, isLoaded } = useAuthUser()

  // Client-side auth guard: redirect unauthenticated users to sign-in
  useEffect(() => {
    if (isClerkEnabled() && isLoaded && !user) {
      router.replace('/app/sign-in')
    }
  }, [isLoaded, user, router])

  // Show nothing while auth state is loading (prevents flash of protected content)
  if (isClerkEnabled() && !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="text-brand-gray text-sm font-sans">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#F5F4F0] font-sans">
      {/* Sidebar */}
      <aside className="w-[240px] bg-brand-white border-r border-brand-border flex flex-col fixed top-0 left-0 bottom-0 z-[100]">
        {/* Logo */}
        <div className="px-5 pt-5 pb-4 border-b border-brand-border">
          <Link href="/" className="font-sans font-[800] text-[1.1rem] text-brand-text no-underline tracking-[-0.03em]">
            ChurnRecovery
          </Link>
        </div>

        {/* Nav */}
        <nav className="px-2 py-3 flex-1">
          {navItems.map(item => {
            const isActive = router.pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg no-underline text-[0.88rem] mb-0.5 transition-all duration-150 ${
                  isActive
                    ? 'font-semibold text-brand-accent bg-[#FDF4EF]'
                    : 'font-normal text-brand-gray bg-transparent'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <UserArea />
      </aside>

      {/* Main content */}
      <main className="ml-[240px] flex-1 px-10 py-8 max-w-[1100px]">
        {title && (
          <h1 className="font-sans text-[1.6rem] font-[800] text-brand-text tracking-[-0.04em] mb-2 mt-0">
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  )
}
