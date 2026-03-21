import { useState, useEffect } from 'react'

/**
 * useABTest — 50/50 A/B test for homepage waitlist CTA copy
 *
 * WHAT WE'RE TESTING:
 *   Variant A (control): "Join Waitlist"
 *   Variant B (test):    "Start Saving Subscribers"
 *
 * HYPOTHESIS: "Start Saving Subscribers" communicates the core value prop directly
 * and will outperform the generic "Join Waitlist" on click-through and form submission rate.
 *
 * WHEN TO DECLARE A WINNER:
 *   - Minimum 100 conversions per variant (waitlist sign-ups)
 *   - At least 2 weeks of data to account for day-of-week variation
 *   - Use 95% confidence threshold (p < 0.05) via a chi-squared or z-test
 *   - Track variant in the form submission body → query your database by variant column
 *   - If no significant difference after 500 total conversions, keep Variant A (simpler)
 *
 * STORAGE: localStorage key `cr_ab_cta` — persists variant across sessions for same user.
 * Assignment is random on first visit; subsequent visits use the stored value.
 */

const AB_KEY = 'cr_ab_cta'

const VARIANTS = {
  A: { variant: 'A', cta: 'Join Waitlist' },
  B: { variant: 'B', cta: 'Start Saving Subscribers' },
}

export function useABTest() {
  const [result, setResult] = useState({ variant: 'A', cta: VARIANTS.A.cta })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AB_KEY)
      if (stored === 'A' || stored === 'B') {
        setResult(VARIANTS[stored])
      } else {
        // First visit — assign 50/50 randomly
        const assigned = Math.random() < 0.5 ? 'A' : 'B'
        localStorage.setItem(AB_KEY, assigned)
        setResult(VARIANTS[assigned])
      }
    } catch {
      // localStorage unavailable (SSR, private mode) — fall back to control
      setResult(VARIANTS.A)
    }
  }, [])

  return result
}
