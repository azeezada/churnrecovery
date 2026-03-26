# ChurnRecovery Pricing Pivot Guide

## Core Change
- **Old:** Free forever, all features, no limits
- **New:** 30-day free trial (full access, no credit card required), then $20/month. One tier. All features. No per-subscriber fees, no per-recovery fees, no usage limits.

## Global String Replacements
- "free forever" → "30-day free trial" or "$20/month"
- "Free forever. Open source." → "30-day free trial. $20/month after."
- "Get Started Free" → "Start Free Trial" 
- "Get Started Free →" → "Start Free Trial →"
- "$0/month" or "$0 / forever" → "$20/month" or "$20 / month"
- "completely free" → "30-day free trial, then $20/month"
- "Free for all payment processors" → "Works with all major payment processors"
- "Free Forever · No Per-Recovery Fees" badge → "30-day free trial · No credit card required"

## Tone Shift
- OLD: Righteous indignation at expensive competitors ("they're ripping you off and we're the free rebel")
- NEW: Confident and trustworthy ("churn recovery shouldn't cost more than it recovers — $20/month works at any scale")
- Still underdog energy but not angry. A business, not a protest.
- The value prop shifts from "free vs expensive" to "10-40x cheaper with the same features"

## Pain-First Messaging
Lead with what the reader is LOSING, not what ChurnRecovery does.
Use concrete dollar amounts. Example:
- "If you have 500 subscribers at $10/month and 5% monthly churn, you're losing $250 every month — $3,000/year — to cancellations alone."

## Key Stats
- $20/month = $240/year
- Churnkey: $250/month = $3,000/year → savings = $2,760/year
- ProfitWell: varies
- "10-40x cheaper than alternatives" is the framing

## Shared Components Already Updated
- Footer.js ✅
- Header.js ✅  
- SignUpCTA.js ✅

## Pages to Remove (redirect to /)
- /press
- /social-proof
- /changelog
- /styles (all variants)
