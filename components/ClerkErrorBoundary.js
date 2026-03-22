import { Component } from 'react'

/**
 * Error boundary that catches Clerk JS crashes (e.g. test key on production domain).
 * Shows a friendly fallback instead of "Application error: a client-side exception".
 */
export default class ClerkErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ClerkErrorBoundary] Clerk failed to load:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const isSignUp = this.props.mode === 'sign-up'
      return (
        <div className="bg-white border border-brand-border rounded-2xl p-10 max-w-[400px] w-full text-center">
          <div className="text-[2rem] mb-4">{isSignUp ? '🚀' : '🔑'}</div>
          <h1 className="text-[1.3rem] font-bold text-brand-text m-0 mb-3 tracking-[-0.03em]">
            {isSignUp ? 'Unable to Load Sign Up' : 'Unable to Load Sign In'}
          </h1>
          <p className="text-[0.88rem] text-brand-gray leading-[1.6] m-0 mb-6">
            There was a problem loading authentication.
            Please refresh the page or try again in a moment.
          </p>
          <a
            href="/app/dashboard"
            className="inline-block bg-brand-accent text-white px-5 py-[10px] rounded-lg no-underline text-[0.88rem] font-semibold mb-4"
          >
            Explore Demo →
          </a>
          <br />
          <a href="/" className="text-[0.82rem] text-brand-accent no-underline">
            ← Back to home
          </a>
        </div>
      )
    }

    return this.props.children
  }
}
