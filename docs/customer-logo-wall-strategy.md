# Customer Logo Wall Strategy

## Goal
Display real customer logos as trust signals on the ChurnRecovery homepage. Nothing converts cold visitors like recognizing a brand they know.

---

## How to Collect Real Logos from Beta Users

### Step 1: Identify Who to Ask
- Any paying customer (priority)
- Active waitlist signups who've referred others
- Beta testers who gave written testimonials
- Anyone who mentioned ChurnRecovery publicly (tweets, blog posts, IH comments)

### Step 2: Timing
**Don't ask too early.** Wait until:
- User has been active for **14+ days**, OR
- Has seen a successful churn recovery (dunning email sent, cancel flow triggered), OR
- Has left a written testimonial

**Don't wait too long.** Ask while the excitement is fresh — within 60 days of first activation.

### Step 3: Where to Get the Logo
Most companies have logos in:
- Their website `/about` or `/press` page
- A Notion public media kit
- Their Twitter/LinkedIn profile banner
- Just Google image search `[company name] logo PNG transparent`

Ask for a **square or horizontal SVG/PNG** with transparent background, ideally on a white or light background so it reads well on the homepage.

---

## Email/DM Template to Ask Permission

### Email Version
```
Subject: Quick favor — can I feature [Company] on our site?

Hi [Name],

Really glad [Company] has been getting value from ChurnRecovery.

I'm adding a "Trusted by" section to the homepage and would love to include [Company] — it helps other business owners feel confident trying it out.

If you're open to it, I'd just need:
1. Your company logo (PNG/SVG, transparent background preferred)
2. Your OK to display it publicly on churnrecovery.com

No quote needed, just your logo. And I'll remove it anytime you ask.

Reply with "yes!" and attach the logo if you have it, or I can grab it from your website.

Thanks,
Dawood
```

### Twitter/Discord DM Version
```
Hey [Name]! Quick ask — building out a "Trusted by" section on the ChurnRecovery homepage. 
Would you be okay with us featuring [Company]'s logo? 
Just need: ✅ your logo file + ✅ your OK. 
Can remove it anytime. Let me know!
```

---

## "As Seen In" vs "Trusted by" Framing

| Frame | When to Use | Tone |
|---|---|---|
| **"Trusted by"** | When you have paying customers or active users | Authority, relationship |
| **"Used by teams at"** | If users are at recognizable companies | Social proof via association |
| **"As seen in"** | For press mentions (IH, HN, newsletters) | Media credibility |
| **"Join [N]+ businesses"** | When logo count is low (<5) | Momentum, FOMO |

**Recommendation**: Use **"Trusted by"** once you have 3+ logos. Before that, use **"Join [N]+ businesses saving subscribers"** with a counter.

---

## Fallback Options (Before Real Logos Come In)

### Option A: Industry-Type Placeholder Slots (Current Implementation)
Show greyed-out placeholder boxes labeled by industry:
- "Newsletter Creator"
- "Course Seller"
- "SaaS Founder"
- "Business Coach"
- "Membership Site"

These set the expectation without fake logos.

### Option B: "Join X+ Businesses" Counter
```
Join 50+ business owners already recovering lost subscribers
```
Start at a honest number (even 12 is fine — "12 early adopters" > fake "500+").

### Option C: Testimonial Quote Cards
Display 2–3 short quotes with name + role (no photo needed) in the logo wall area. This is what the current homepage does. It's honest and converts.

### Option D: Illustrated Industry Icons
Commission or use free icons representing:
- 📧 Newsletter
- 🎓 Course
- 💬 Community
- 💼 Coach

Labeled with the user type. Softer than logos but still segments the audience.

---

## Timeline: When to Add Real Logos

| Milestone | Action |
|---|---|
| 0 users | Use placeholder slots + "Join the waitlist" framing |
| 5 waitlist activations | Add "Join 50+ businesses" counter |
| 1st paying customer | Ask permission immediately; if granted, publish |
| 3 logos collected | Switch to "Trusted by" with real logos |
| 5+ logos | Full logo wall, remove placeholders |
| 10+ logos | Consider 2-row scrolling marquee strip |

**Hard rule**: Never show a logo without written permission. Screenshot the DM/email where they said yes.

---

## Logo Display Best Practices

- **Grayscale by default**, color on hover — keeps visual hierarchy clean
- Max height: 36–48px (standardize across logos)
- White or transparent background only
- Link to their site (good will + SEO)
- Add `alt` text for accessibility
- Store logos in `/public/logos/` with filename format: `[company-slug].png`

---

## File Naming Convention
```
/public/logos/
  marc-k-newsletter.png
  priya-n-courses.png
  james-w-coaching.png
```
