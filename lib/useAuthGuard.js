/**
 * useAuthGuard — redirects unauthenticated Clerk users to sign-in.
 * In demo mode (no Clerk key) it's a no-op — demo user always "authenticated".
 *
 * Usage:
 *   const { isReady } = useAuthGuard()
 *   if (!isReady) return null  // or a spinner
 */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { isClerkEnabled } from './auth'
import { useAuthUser } from './useAuthUser'

export function useAuthGuard() {
  const router = useRouter()
  const { user, isLoaded } = useAuthUser()
  const clerkEnabled = isClerkEnabled()

  useEffect(() => {
    if (!clerkEnabled) return // demo mode — no redirect needed
    if (!isLoaded) return     // still loading Clerk state
    if (!user) {
      // Not signed in — redirect to sign-in, preserve intended destination
      const returnUrl = router.asPath
      router.replace(`/app/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`)
    }
  }, [isLoaded, user, clerkEnabled, router])

  // isReady = true when we know the user is authenticated (or in demo mode)
  const isReady = !clerkEnabled || (isLoaded && !!user)
  return { isReady, user, isLoaded }
}
