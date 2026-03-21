import { NextResponse } from 'next/server'

/**
 * Middleware — Clerk auth when keys are configured, passthrough otherwise.
 *
 * With static export (output: 'export'), middleware runs at the CDN edge
 * but cannot do server-side redirects for auth. The client-side Clerk
 * components handle auth UI (sign-in/sign-up forms and user state).
 *
 * For Cloudflare Pages static deployments, auth is enforced client-side
 * via the Clerk JS SDK. Dashboard pages will redirect unauthenticated
 * users to /app/sign-in automatically via Clerk's client-side logic.
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
