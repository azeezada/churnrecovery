# Substack-Specific Landing Page Copy
## Route: `/for/substack`
## Page Title: "Affordable Churn Recovery for Substack Creators"

---

## 🗂 Page Structure & Component Spec

This document is a **developer-ready component spec** + **full marketing copy** for the `/for/substack` landing page. Each section maps to a reusable page component.

---

## Section 1: HERO

### Component: `HeroSection`
- **Layout:** Full-width, centered, dark background (or brand gradient)
- **Trust badge:** Small pill above headline: "✓ Built for Substack • Free During Beta"

### Copy:

```
TRUST BADGE: ✓ Free for Substack Creators · No Credit Card Required

HEADLINE:
Stop Losing Paid Subscribers
Before They Even Cancel

SUBHEADLINE:
ChurnRecovery catches Substack cancellations in real-time — then automatically offers the right discount, pause option, or personal message to win them back. Recover revenue you didn't even know you were losing.

PRIMARY CTA BUTTON: "Protect My Substack Revenue →"
SECONDARY LINK: "See how it works" (scrolls to demo section)

MICROCOPY BELOW CTA:
$20/month with 30-day free trial. No setup fee. Takes 10 minutes.
```

---

## Section 2: PAIN POINT HOOK

### Component: `PainPointSection`
- **Layout:** 3-column cards or a scrolling stat strip
- **Visual tone:** Slightly alarming, empathetic. Red/amber numbers.

### Copy:

```
SECTION LABEL: The Silent Revenue Leak

HEADLINE: Every Substack Cancellation = Money Walking Out the Door

SUBTEXT:
Substack shows you when someone cancels. It doesn't tell you *why* — or give you a chance to change their mind.

PAIN CARDS:

Card 1 — "The Invisible Leak"
💸
The average newsletter loses 3–8% of paid subscribers every month.
On a $5,000/month Substack, that's $150–$400 disappearing quietly — every single month.

Card 2 — "No Second Chance"
🚪
Right now, when someone clicks "Cancel Subscription" on Substack, they're gone.
No pause option. No discount offer. No "why are you leaving?" — just gone.

Card 3 — "You're Flying Blind"
📊
You find out in your Stripe dashboard, days later.
By then, they've already moved on.
```

---

## Section 3: HOW IT WORKS (Integration)

### Component: `HowItWorksSection`
- **Layout:** 3-step visual flow with icons
- **Substack-specific:** Explain the webhook integration clearly in non-technical terms

### Copy:

```
SECTION LABEL: Dead Simple Setup

HEADLINE: Works With Substack in 10 Minutes

SUBTEXT:
No code. No developer. Just connect and go.

STEP 1:
🔗 Connect to Substack
Paste your Substack webhook URL into ChurnRecovery. We listen for cancellation signals from Stripe — the payment processor Substack uses under the hood.
Takes 2 minutes.

STEP 2:
⚡ We Catch Cancellations in Real-Time
The moment a subscriber starts to cancel, ChurnRecovery fires. We intercept the signal before it's final and trigger your personalized recovery flow.

STEP 3:
💬 Your Message, Your Offer — Automatically
Subscribers see a custom message from YOU: a pause option, a discount, a heartfelt note — whatever you've set up. Many will stay.

CALLOUT BOX:
"But Substack doesn't have a cancel flow..."
Right — that's exactly the problem. ChurnRecovery uses Stripe webhook events (which Substack fires behind the scenes) to detect cancellations and trigger recovery before the payment stops.

LINK: "Technical integration docs →" (for curious creators)
```

---

## Section 4: BENEFITS (Feature → Benefit framing)

### Component: `BenefitsSection`
- **Layout:** 2-column grid, icon + headline + 1-sentence description
- **Tone:** Business-owner focused, no tech jargon

### Copy:

```
SECTION LABEL: What You Get

HEADLINE: Everything You Need to Stop the Bleed

BENEFIT CARDS:

✅ Real-Time Cancellation Detection
Know the moment someone tries to leave — not days later in Stripe.

💬 Automated Win-Back Messages
Set up once: a personal note, a discount offer, or a "take a break" option — automatically shown to canceling subscribers.

⏸ Pause Instead of Cancel
Give subscribers a 1-month pause option. Many people cancel because life got busy — not because they hate your newsletter.

📉 Discount Offers on Autopilot
Offer 20% off or 1 month free to at-risk subscribers. Keep them at a discount. Better than losing them forever.

📊 Revenue Recovery Dashboard
See exactly how much revenue you've saved. Track which messages work. Know your recovery rate.

🏷 Substack-Specific Templates
Pre-written messages designed for newsletter creators. Warm, personal, not salesy.

💰 Affordable for All Newsletters
$20/month with 30-day free trial. All features included. No catch.

🔒 No Code Required
You write newsletters, not code. We keep it that way.
```

---

## Section 5: SOCIAL PROOF

### Component: `SocialProofSection`
- **Pre-launch state:** Show waitlist count + community credibility
- **Post-launch state:** Swap in real testimonials + logos

### Copy (Pre-Launch Version):

```
SECTION LABEL: You're Not Alone

HEADLINE: 200+ Newsletter Creators Are Waiting for This

SUBTEXT:
Creators from Substack, Beehiiv, and ConvertKit have joined the waitlist.
Here's what they're saying:

WAITLIST SOCIAL PROOF CARDS:
(Use real quotes from waitlist signup form — ask "What's your biggest churn problem?" on signup)

PLACEHOLDER CARD FORMAT:
"[Quote about pain point or excitement]"
— [First name], [newsletter niche] creator, [# subscribers] subscribers

METRICS TO HIGHLIGHT AT LAUNCH:
- # of waitlist signups
- # of newsletters represented
- Avg MRR of waitlist members (if collected)
- Countries represented

COMMUNITY PROOF (if applicable):
"Discussed in [Substack Notes / Creator Economy Reddit / IH] by [X] founders"

FOUNDER CREDIBILITY BLOCK:
Built by a developer who was paying $825/month for Churnkey.
I got the invoice, I did the math, and I built an alternative.
ChurnRecovery is what I wish existed.
— [Founder name], [title]
[Photo] [LinkedIn or Twitter link]
```

---

## Section 6: PRICING CALLOUT

### Component: `PricingCallout`
- **Layout:** Simple, highlighted box
- **Tone:** Reassuring, no-risk

### Copy:

```
HEADLINE: Affordable for Newsletter Creators. Seriously.

BODY:
ChurnRecovery is $20/month after a 30-day free trial. All features included.
No credit card to start. No gotchas.

Compare that to Churnkey ($100–$800/month) or ProfitWell Retain ($400+/month).
You're welcome. 😊

CTA: "Start Your 30-Day Free Trial"
```

---

## Section 7: FAQ (Substack-Specific)

### Component: `FAQSection`
- **Layout:** Accordion
- **Focus:** Answer the objections unique to Substack creators

### Copy:

```
HEADLINE: Questions From Newsletter Creators

Q: Does this work with Substack?
A: Yes. Substack processes payments through Stripe. ChurnRecovery connects to your Stripe account and listens for cancellation webhooks — no Substack API access needed.

Q: Do I need a developer to set this up?
A: Nope. If you can copy-paste a URL, you can install ChurnRecovery. The whole setup takes about 10 minutes, and we have step-by-step guides.

Q: Will my subscribers see a corporate-looking cancel flow?
A: No. Your messages are fully customizable. Your voice, your brand, your tone. It'll feel like a personal note from you, not a popup from some software company.

Q: What if I only have a few hundred paid subscribers?
A: That's exactly who this is built for. Even recovering 1–2 subscribers per month at $5–$10 each adds up. And it's free under $1k/month, so there's zero risk.

Q: How is this different from what Substack offers?
A: Substack has no cancel flow. When someone clicks cancel, they're gone. ChurnRecovery adds that missing layer — the moment between "I'm thinking about canceling" and "I'm gone."

Q: Does ChurnRecovery store my subscribers' data?
A: We receive webhook events from Stripe — subscriber IDs and subscription status. We don't store payment info or email addresses beyond what's needed to trigger your recovery flow. See our privacy policy.

Q: What if it doesn't work for me?
A: Cancel anytime. No contracts. Start with a 30-day free trial — you have nothing to lose by trying.
```

---

## Section 8: FINAL CTA (Bottom of page)

### Component: `FinalCTASection`
- **Layout:** Full-width, high-contrast
- **Urgency:** Soft urgency (beta pricing, not fake countdown)

### Copy:

```
HEADLINE:
Your Next Cancellation Is Happening Right Now.
Are You Going to Catch It?

SUBTEXT:
Join the waitlist. Be first to recover Substack cancellations automatically.
Free beta access for newsletter creators who sign up today.

CTA BUTTON: "Protect My Newsletter Revenue →"
FORM FIELD: Email address
HIDDEN TAG: substack-lp (for segmenting this waitlist group)
MICROCOPY: Free during beta · Cancel anytime · No spam, ever

SOCIAL PROOF NUDGE:
"Join [X] newsletter creators already on the waitlist"
```

---

## Developer Implementation Notes

### Route
```
/for/substack
```

### Waitlist Form Config
- **Email field:** required
- **Hidden field:** `source=substack-lp` (pass to ConvertKit/Mailchimp)
- **Hidden field:** `tag=substack-creator`
- **Optional field:** "What's your Substack URL?" (for outreach)
- **Optional field:** "Monthly paid subscriber count" (for segmentation)

### SEO Metadata
```
title: "Affordable Churn Recovery for Substack Creators | ChurnRecovery"
description: "Stop losing paid Substack subscribers. ChurnRecovery detects cancellations in real-time and automatically wins them back. Free for newsletters under $1k/month."
og:image: /images/substack-og.png (create: newsletter creator + recovery flow visual)
canonical: https://churnrecovery.com/for/substack
```

### Target Keywords
- "substack churn recovery"
- "substack cancel flow"
- "reduce substack cancellations"
- "newsletter subscriber retention"
- "substack paid subscriber retention"

### Conversion Goal
Primary: Email signup with `substack-lp` tag
Secondary: Visit to `/for/substack/how-it-works` (deeper funnel)

### Analytics Events to Fire
- `page_view: substack_landing`
- `cta_click: hero_primary`
- `cta_click: bottom_cta`
- `form_submit: waitlist_substack`
- `scroll_depth: 25/50/75/100`

---

*Created: 2026-03-21 | Owner: Marketing | Status: Ready for dev implementation*
