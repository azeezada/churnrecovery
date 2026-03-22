import Head from 'next/head'
import dynamic from 'next/dynamic'
import { isClerkEnabled } from '../../../lib/auth'
import ClerkErrorBoundary from '../../../components/ClerkErrorBoundary'

// Dynamic import so Clerk only loads client-side (safe for static export)
const ClerkSignIn = dynamic(
  () => import('@clerk/nextjs').then(mod => {
    const { SignIn, ClerkProvider } = mod;
    // Static export requires its own ClerkProvider for dynamic imports.
    // We pass signInUrl/signUpUrl to override Clerk Account Portal redirects.
    const WrappedSignIn = (props) => (
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        signInUrl="/app/sign-in"
        signUpUrl="/app/sign-up"
        afterSignInUrl="/app/dashboard"
        afterSignUpUrl="/app/dashboard"
      >
        <SignIn {...props} />
      </ClerkProvider>
    );
    return { default: WrappedSignIn };
  }),
  { ssr: false, loading: () => <div style={{minHeight:'400px',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div> }
)

function DemoSignIn() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center font-sans px-5 py-10">
      <a href="/" className="font-[800] text-[1.4rem] text-brand-text no-underline mb-8 tracking-[-0.03em]">
        ChurnRecovery
      </a>
      <div className="bg-white border border-brand-border rounded-2xl p-10 max-w-[400px] w-full text-center">
        <div className="text-[2rem] mb-4">🔑</div>
        <h1 className="text-[1.3rem] font-bold text-brand-text m-0 mb-3 tracking-[-0.03em]">
          Authentication Not Configured
        </h1>
        <p className="text-[0.88rem] text-brand-gray leading-[1.6] m-0 mb-6">
          To enable sign-in, add your Clerk publishable key to <code className="bg-[#f5f5f5] px-1.5 py-[2px] rounded">.env.local</code>.
        </p>
        <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-accent text-white px-5 py-[10px] rounded-lg no-underline text-[0.88rem] font-semibold mb-4">
          Get Clerk Keys (Free)
        </a>
        <br />
        <a href="/app/dashboard" className="text-[0.82rem] text-brand-accent no-underline">
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
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center font-sans px-5 py-10">
        <a href="/" className="font-[800] text-[1.4rem] text-brand-text no-underline mb-8 tracking-[-0.03em]">
          ChurnRecovery
        </a>
        <ClerkErrorBoundary mode="sign-in">
          <ClerkSignIn
            path="/app/sign-in"
            routing="path"
            signUpUrl="/app/sign-up"
            afterSignInUrl="/app/dashboard"
            appearance={{ variables: { colorPrimary: '#D97757', fontFamily: '"Instrument Sans", sans-serif' } }}
          />
        </ClerkErrorBoundary>
      </div>
    </>
  )
}

SignInPage.isAppPage = true
