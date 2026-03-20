import { NextResponse } from 'next/server'

/**
 * Middleware — currently a passthrough.
 * 
 * Clerk auth middleware is disabled because placeholder API keys are configured.
 * When real Clerk keys are set (pk_test_xxx / pk_live_xxx), replace this file with:
 *
 *   import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
 *   const isProtectedRoute = createRouteMatcher(['/app(.*)'])
 *   export default clerkMiddleware(async (auth, req) => {
 *     if (isProtectedRoute(req)) await auth.protect()
 *   })
 *
 * For now, /app/* routes use client-side demo auth (see lib/auth.js).
 */

export default function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
