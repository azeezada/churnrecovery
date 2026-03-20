import { SignIn } from '@clerk/nextjs'
import Head from 'next/head'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  accent: '#D97757',
  fontSans: '"Instrument Sans", sans-serif',
}

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In — ChurnRecovery</title>
        <meta name="description" content="Sign in to your ChurnRecovery dashboard to manage cancel flows, view analytics, and recover churned customers." />
      </Head>
      <div style={{
        minHeight: '100vh',
        background: t.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: t.fontSans,
        padding: '40px 20px',
      }}>
        <a href="/" style={{
          fontFamily: t.fontSans,
          fontWeight: 800,
          fontSize: '1.4rem',
          color: t.text,
          textDecoration: 'none',
          marginBottom: '32px',
          letterSpacing: '-0.03em',
        }}>
          ChurnRecovery
        </a>
        <SignIn
          path="/app/sign-in"
          routing="path"
          signUpUrl="/app/sign-up"
          afterSignInUrl="/app/dashboard"
          appearance={{
            variables: {
              colorPrimary: t.accent,
              fontFamily: t.fontSans,
            },
          }}
        />
      </div>
    </>
  )
}

SignInPage.isAppPage = true
