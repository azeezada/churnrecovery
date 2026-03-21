import { useState } from 'react'
import Head from 'next/head'

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function ReferralGenerator() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const slug = slugify(input)
  const referralUrl = slug ? `https://churnrecovery.com/refer/${slug}` : ''

  const handleCopy = async () => {
    if (!referralUrl) return
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = referralUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <Head>
        <title>Generate Your Referral Link — ChurnRecovery</title>
        <meta name="description" content="Generate your personal ChurnRecovery referral link to share with your audience." />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-[40px_20px] font-sans">
        {/* Logo */}
        <div className="mb-8 text-center">
          <a href="/" className="no-underline">
            <span className="font-sans font-extrabold text-[1.4rem] text-brand-accent tracking-[-0.02em]">
              ChurnRecovery
            </span>
          </a>
        </div>

        {/* Card */}
        <div className="bg-brand-white border border-brand-border rounded-2xl p-[48px_40px] max-w-[540px] w-full shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h1 className="font-sans text-2xl font-bold text-brand-text mb-2">
            Your Referral Link
          </h1>
          <p className="font-serif text-[0.9rem] text-brand-gray mb-8 leading-[1.6]">
            Enter your name or a custom code to generate your shareable link.
            Anyone who signs up through it will be tagged as referred by you.
          </p>

          {/* Input */}
          <div className="mb-4">
            <label className="block font-sans text-[0.82rem] font-semibold text-brand-text mb-[6px]">
              Your name or code
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. dawood, john-smith, newsletter-pro"
              className="w-full px-4 py-3 rounded-lg border border-brand-border bg-brand-white font-sans text-[0.9rem] text-brand-text outline-none box-border"
            />
          </div>

          {/* Generated URL */}
          {slug && (
            <div className="bg-[#F5F5F0] border border-brand-border rounded-[10px] p-4 mb-4">
              <p className="font-sans text-[0.75rem] font-semibold text-brand-gray mb-[6px] uppercase tracking-[0.05em]">
                Your referral link
              </p>
              <p className="font-sans text-[0.9rem] text-brand-accent m-0 break-all font-semibold">
                {referralUrl}
              </p>
            </div>
          )}

          {/* Copy button */}
          <button
            onClick={handleCopy}
            disabled={!slug}
            className={`w-full px-6 py-3 rounded-lg border-none text-brand-white font-sans font-bold text-[0.9rem] transition-[background] duration-150 mb-6 ${
              !slug ? 'bg-[#ccc] cursor-not-allowed' : copied ? 'bg-brand-green cursor-pointer' : 'bg-brand-accent cursor-pointer'
            }`}
          >
            {copied ? '✓ Copied!' : 'Copy Link'}
          </button>

          {/* How to use */}
          <div className="border-t border-brand-border pt-6">
            <p className="font-sans text-[0.8rem] font-semibold text-brand-text mb-3 uppercase tracking-[0.05em]">
              How it works
            </p>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {[
                '1. Share your link with your audience',
                '2. When they sign up, they\'re tagged as referred by you',
                '3. You get credit — and they get Founding Member perks',
              ].map((step, i) => (
                <li key={i} className="font-serif text-[0.85rem] text-brand-gray leading-[1.5]">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {slug && (
            <div className="mt-5 p-[14px_16px] bg-brand-green-light border border-[#C6E6D4] rounded-lg">
              <p className="font-sans text-[0.82rem] text-brand-green m-0">
                💡 <strong>Share tip:</strong> "Check out ChurnRecovery — it's free and saves canceling subscribers automatically. Sign up through my link: {referralUrl}"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 font-sans text-[0.75rem] text-[#999] text-center">
          <a href="/" className="text-brand-accent no-underline">← Back to ChurnRecovery</a>
        </p>
      </div>
    </>
  )
}
