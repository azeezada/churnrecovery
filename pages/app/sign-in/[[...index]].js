import Head from 'next/head'
import dynamic from 'next/dynamic'
import { isClerkEnabled } from '../../../lib/auth'

// Dynamic import so Clerk only loads client-side (safe for static export)
const ClerkSignIn = dynamic(
  () => import('@clerk/nextjs').then(mod => mod.SignIn),
  { ssr: false }
)

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  accent: '#D97757',
  gray: '#666666',
  border: '#E5E5E5',
  fontSans: '"Instrument Sans", sans-serif',
}

function DemoSignIn() {
  return (
    <div style={{
      minHeight: '100vh', background: t.bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: t.fontSans, padding: '40px 20px',
    }}>
      <a href="/" style={{ fontWeight: 800, fontSize: '1.4rem', color: t.text, textDecoration: 'none', marginBottom: '32px', letterSpacing: '-0.03em' }}>
        ChurnRecovery
      </a>
      <div style={{
        background: '#fff', border: `1px solid ${t.border}`, borderRadius: '16px',
        padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🔑</div>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: t.text, margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Authentication Not Configured
        </h1>
        <p style={{ fontSize: '0.88rem', color: t.gray, lineHeight: 1.6, margin: '0 0 24px' }}>
          To enable sign-in, add your Clerk publishable key to <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>.env.local</code>.
        </p>
        <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block', background: t.accent, color: '#fff', padding: '10px 20px',
          borderRadius: '8px', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600,
          marginBottom: '16px',
        }}>
          Get Clerk Keys (Free)
        </a>
        <br />
        <a href="/app/dashboard" style={{ fontSize: '0.82rem', color: t.accent, textDecoration: 'none' }}>
          → Continue in demo mode
        </a>
      </div>
    </div>
  )
}

export default function SignInPage() {
  const clerkEnabled = isClerkEnabled()

  if (!clerkEnabled) {
    return (
      <>
        <Head>
          <title>Sign In — ChurnRecovery</title>
        </Head>
        <DemoSignIn />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Sign In — ChurnRecovery</title>
        <meta name="description" content="Sign in to your ChurnRecovery dashboard to manage cancel flows, view analytics, and recover churned customers." />
      </Head>
      <div style={{
        minHeight: '100vh', background: t.bg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: t.fontSans, padding: '40px 20px',
      }}>
        <a href="/" style={{ fontWeight: 800, fontSize: '1.4rem', color: t.text, textDecoration: 'none', marginBottom: '32px', letterSpacing: '-0.03em' }}>
          ChurnRecovery
        </a>
        <ClerkSignIn
          path="/app/sign-in"
          routing="path"
          signUpUrl="/app/sign-up"
          afterSignInUrl="/app/dashboard"
          appearance={{ variables: { colorPrimary: t.accent, fontFamily: t.fontSans } }}
        />
      </div>
    </>
  )
}

SignInPage.isAppPage = true
