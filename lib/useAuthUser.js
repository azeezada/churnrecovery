/**
 * useAuthUser — returns user + isLoaded from Clerk when available,
 * falls back to demo user when Clerk is not configured.
 */
import { isClerkEnabled, demoUser } from './auth'

export function useAuthUser() {
  if (isClerkEnabled()) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { useUser } = require('@clerk/nextjs')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useUser()
  }
  // Demo mode — return mock user
  return { user: demoUser, isLoaded: true, isSignedIn: true }
}
