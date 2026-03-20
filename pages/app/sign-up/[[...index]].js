import { SignUp } from '@clerk/nextjs'
import Head from 'next/head'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  accent: '#D97757',
  fontSans: '"Instrument Sans", sans-serif',
}

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up — ChurnRecovery</title>
        <meta name="description" content="Create your free ChurnRecovery account. Set up cancel flows, recover churned customers, and grow your SaaS revenue." />
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
        <SignUp
          path="/app/sign-up"
          routing="path"
          signInUrl="/app/sign-in"
          afterSignUpUrl="/app/dashboard"
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

SignUpPage.isAppPage = true
