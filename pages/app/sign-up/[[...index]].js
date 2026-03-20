import Head from 'next/head'
import { isClerkEnabled } from '../../../lib/auth'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  accent: '#D97757',
  gray: '#666666',
  border: '#E5E5E5',
  fontSans: '"Instrument Sans", sans-serif',
}

function DemoSignUp() {
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
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🚀</div>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: t.text, margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Authentication Not Configured
        </h1>
        <p style={{ fontSize: '0.88rem', color: t.gray, lineHeight: 1.6, margin: '0 0 24px' }}>
          To enable sign-up, add your Clerk publishable key to <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>.env.local</code>.
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

export default function SignUpPage() {
  const clerkEnabled = isClerkEnabled()

  if (!clerkEnabled) {
    return (
      <>
        <Head>
          <title>Sign Up — ChurnRecovery</title>
        </Head>
        <DemoSignUp />
      </>
    )
  }

  const { SignUp } = require('@clerk/nextjs')
  return (
    <>
      <Head>
        <title>Sign Up — ChurnRecovery</title>
        <meta name="description" content="Create your free ChurnRecovery account. Stop losing customers to cancellations with smart cancel flow interception." />
      </Head>
      <div style={{
        minHeight: '100vh', background: t.bg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: t.fontSans, padding: '40px 20px',
      }}>
        <a href="/" style={{ fontWeight: 800, fontSize: '1.4rem', color: t.text, textDecoration: 'none', marginBottom: '32px', letterSpacing: '-0.03em' }}>
          ChurnRecovery
        </a>
        <SignUp
          path="/app/sign-up"
          routing="path"
          signInUrl="/app/sign-in"
          afterSignUpUrl="/app/dashboard"
          appearance={{ variables: { colorPrimary: t.accent, fontFamily: t.fontSans } }}
        />
      </div>
    </>
  )
}

SignUpPage.isAppPage = true
