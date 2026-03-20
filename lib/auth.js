/**
 * Auth wrapper — provides Clerk hooks or demo-mode fallback.
 * When NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is a real key (pk_test_* or pk_live_*),
 * Clerk is used normally. Otherwise, a demo user is returned so app pages render.
 */

// Real Clerk publishable keys are base64-encoded and much longer than "placeholder"
// e.g. pk_test_aWxsLmNsZXJrLmRldiQ (20+ chars after prefix)
const REAL_KEY_PATTERN = /^pk_(test|live)_[A-Za-z0-9]{20,}$/
const isClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''
  return REAL_KEY_PATTERN.test(key) && !key.includes('placeholder')
}

export { isClerkEnabled }

// Demo user for when Clerk is not configured
export const demoUser = {
  id: 'demo_user',
  firstName: 'Demo',
  lastName: 'User',
  emailAddresses: [{ emailAddress: 'demo@example.com' }],
  imageUrl: null,
}


