/**
 * Server-side auth helper for API routes.
 * This file is server-only — never import from client components or _app.js.
 * Returns { userId } from Clerk when enabled, or demo userId when not.
 */
import { isClerkEnabled, demoUser } from './auth'

export function getServerAuth(req) {
  if (isClerkEnabled()) {
    const { getAuth } = require('@clerk/nextjs/server')
    return getAuth(req)
  }
  return { userId: demoUser.id }
}
