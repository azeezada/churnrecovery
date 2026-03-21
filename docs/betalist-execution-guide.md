# BetaList Submission Execution Guide

Step-by-step execution guide for submitting ChurnRecovery to BetaList.com. Copy from `marketing/betalist-submission.md` is ready — this guide tells you exactly what to do with it.

---

## TL;DR — Do This Now

**Ideal submission window:** March 15-18, 2026 (2-3 weeks before April 1 Product Hunt launch)
**Time required:** 20-30 minutes
**Submission URL:** https://betalist.com/submit

If you're reading this after March 18, submit immediately anyway — every day of BetaList exposure before PH launch helps.

---

## Part 1: Timing Strategy

### Why 2-3 Weeks Before Product Hunt

BetaList works as a **warm-up audience** for Product Hunt:

1. **BetaList → early signups** — You get 50-200 new subscribers before PH day
2. **Those subscribers become PH upvoters** — Email them on April 1: "We're live on Product Hunt today — would you upvote us?"
3. **Early upvotes = algorithm boost** — Product Hunt ranks by velocity of early votes; BetaList subscribers are pre-warmed and more likely to act

### Timing Window

| Date | Action |
|---|---|
| **March 15-18** ← IDEAL | Submit to BetaList |
| March 18-25 | BetaList review + publishing (typically 3-7 days) |
| March 25 - April 1 | BetaList traffic + signups flowing in |
| **April 1** | Product Hunt launch — email BetaList subscribers to upvote |

> If you submit today (March 21), you're slightly late but still within a workable window. BetaList typically publishes within 3-5 days, giving you ~7 days of BetaList traffic before PH launch. Submit now.

---

## Part 2: Before You Submit

### Checklist — Have These Ready

- [ ] **BetaList account** — Create one at betalist.com/users/sign_up (takes 2 minutes)
- [ ] **Logo file** — `/public/logo.png` (should be square, min 200x200px)
- [ ] **Hero screenshot** — `product-dashboard-improved.png` (from the screenshots folder)
- [ ] **Feature screenshots** (3) — `product-flow-builder.png`, `product-integrations.png`, `product-email-sequences.png`
- [ ] **Landing page ready** — `churnrecovery.com` loads fast and shows "early access" messaging
- [ ] **UTM link ready** — `https://churnrecovery.com?utm_source=betalist&utm_medium=directory&utm_campaign=early-access`

### Landing Page Quick Check

Open https://churnrecovery.com and verify:
- [ ] Hero CTA says "Join Early Access" or "Get Early Access" (not "Sign up")
- [ ] Page loads in under 3 seconds
- [ ] Signup form is visible above the fold on mobile
- [ ] No broken images or console errors

---

## Part 3: Submission — Field-by-Field

Go to: **https://betalist.com/submit**

### Field 1: Startup Name
```
ChurnRecovery
```

### Field 2: Tagline / Headline
```
Early access to the free alternative to Churnkey ($825/month → $0)
```

### Field 3: Short Description (50 words)
```
ChurnRecovery helps SaaS companies recover failed payments and reduce cancellations without monthly fees. Smart cancel flows, dunning sequences, and exit surveys — everything expensive tools do, but free. Get early access before our Product Hunt launch.
```
> **Word count:** 44 words. You have room to add: *"Join 300+ founders already on the waitlist."*

### Field 4: Long Description (200 words)
```
ChurnRecovery is the free, open-source alternative to expensive churn prevention tools like Churnkey, ProfitWell Retain, and Brightback.

What we solve: Newsletter creators, coaches, and small SaaS companies lose hundreds of dollars monthly to failed payments and cancellations, but existing solutions cost $250-$825/month — often more than the churn they prevent.

How we solve it:
• Smart cancel flows that intercept cancellations with personalized retention offers
• Automated dunning email sequences to recover failed payments
• Exit surveys to understand why customers leave
• One-line integration with Stripe, Paddle, and Lemon Squeezy
• Detailed analytics to track recovery performance

Why free: The segment under $5k/month churn volume is ignored by existing tools. We're building for bootstrapped founders who can't justify expensive monthly SaaS fees but still need professional churn recovery.

Early access includes:
• Free forever core features
• Priority support during beta
• Input on feature roadmap
• First access to premium features when launched

Join 300+ founders already on the waitlist. Perfect for newsletter platforms, online courses, subscription apps, and any recurring revenue business.
```

### Field 5: Website URL
```
https://churnrecovery.com?utm_source=betalist&utm_medium=directory&utm_campaign=early-access
```
> Using the UTM link (not bare domain) so you can track BetaList traffic in analytics.

### Field 6: Category
Select: **Business & Productivity** → **SaaS Tools**
*(If that exact path isn't available, choose: Business, Productivity, or Developer Tools)*

### Field 7: Tags / Keywords
Enter these one at a time:
```
saas
churn
retention
free
alternative
startup
subscription
billing
analytics
automation
```

### Field 8: Target Audience
```
SaaS founders, newsletter creators, course sellers, subscription businesses
```

### Field 9: Beta Length
```
60 days (March - April 2026)
```

### Field 10: Launch Date
```
April 1, 2026
```

### Field 11: Pricing Model
Select: **Free** or **Freemium**

### Field 12: Logo
Upload: `/public/logo.png`

### Field 13: Screenshots
Upload in this order:
1. `product-dashboard-improved.png` — main hero screenshot
2. `product-flow-builder.png` — cancel flow builder
3. `product-integrations.png` — integrations
4. `product-email-sequences.png` — email sequences

### Submit

Click **Submit** or **Create Listing**. BetaList will review within 3-7 business days.

---

## Part 4: After Submission

### Immediate (within 24 hours)

- [ ] **Screenshot the confirmation** — Save the BetaList submission confirmation page/email
- [ ] **Check your email** — BetaList will send a confirmation; reply promptly if they ask questions
- [ ] **Note submission date** — Add to `marketing/performance-tracker.md`

### While Waiting for Approval (3-7 days)

- [ ] **Engage with BetaList community** — Log in daily, browse other startups, leave genuine comments
- [ ] **Follow @BetaList on Twitter** — Retweet/reply to their posts to build familiarity
- [ ] **Prepare the BetaList subscriber email** — Draft the "We're live on Product Hunt" email (see Part 6 below)

### When Approved + Published

- [ ] **Share the BetaList listing** — Twitter, LinkedIn, relevant Slack groups
- [ ] **Email your existing waitlist** — "We're featured on BetaList! Share with a founder who might benefit: [link]"
- [ ] **Reply to every comment** on your BetaList listing within 24 hours
- [ ] **Add BetaList badge** to churnrecovery.com: `<a href="[your betalist url]"><img src="betalist-badge.png"></a>`

---

## Part 5: Maximizing BetaList Conversions

### Landing Page Optimization for BetaList Traffic

BetaList visitors are early adopter developers and founders. They're skeptical but receptive to:
- **Specific cost savings** ("saves you $825/month" > "saves you money")
- **Free and open-source** credentials (huge for this audience)
- **Real problem framing** (they've felt the pain of expensive SaaS)

**Quick wins to implement before BetaList traffic arrives:**

1. **Add "As seen on BetaList" or "Featured on BetaList"** to social proof section (after you're published)
2. **Create a `/betalist` landing page** with headline: *"You found us on BetaList — here's your exclusive early access"*
   - This page converts better because it's personalized to the channel
   - Add a note: "Skip the waitlist — BetaList visitors get immediate beta access"
3. **Show subscriber count** on homepage ("Join 300+ founders") — social proof matters
4. **Make pricing crystal clear** — "Free forever" in large text, not buried in FAQ

### The BetaList-Specific Landing Page

Create `/betalist` with this structure:

```
HEADLINE: 
"You found ChurnRecovery on BetaList — here's your early access"

SUBHEAD:
"The free alternative to Churnkey. Stop losing subscribers to failed payments and cancellations — for $0/month."

[Signup form — email only, single field]

Button: "Claim your early access spot →"

Below form:
"300+ founders already signed up. No credit card. No trial period. Free."
```

### Email Capture Optimization

- Single-field form (email only) converts 2-3x better than multi-field
- CTA: "Claim early access" > "Sign up" > "Subscribe"
- Below the button: add "No spam. Unsubscribe anytime." (reduces friction)

---

## Part 6: Engaging BetaList Subscribers

### Product Hunt Launch Email (send April 1)

When your Product Hunt launch goes live, email all BetaList subscribers:

**Subject:** `We're live on Product Hunt today — you helped make this happen`

```
Hey,

Quick note — ChurnRecovery just went live on Product Hunt today.

You signed up early through BetaList. That early belief matters more than you know.

If you've tried the product and found it useful, an upvote would mean a lot:
👉 [Product Hunt link]

Takes 10 seconds. No account needed to upvote.

And if you have feedback — anything that's not working, features you wish existed — just reply to this email. I read every message.

Thank you for being early.

— Dawood
```

### Comment Response Template

When someone comments on your BetaList listing:

**For general interest:**
```
Thanks for checking out ChurnRecovery! Happy to answer any questions about how it works or how to get set up. What kind of subscription business are you running?
```

**For "how does it integrate?" questions:**
```
It's a one-line JavaScript snippet for the cancel flow (similar to how Stripe's payment form works), and a Stripe webhook for payment failure recovery. Setup takes about 10-15 minutes. Full docs at churnrecovery.com/docs — let me know if you get stuck on anything.
```

**For "is it really free?" questions:**
```
Yes, the core product is free — cancel flows, dunning sequences, exit surveys, and analytics. We'll add premium features over time, but the core will stay free. We believe churn recovery tools shouldn't cost more than the churn they prevent, especially for small businesses.
```

---

## Part 7: Tracking BetaList Performance

### UTM Tracking

All traffic from BetaList will hit your site with:
```
?utm_source=betalist&utm_medium=directory&utm_campaign=early-access
```

Check weekly in:
- **Cloudflare Analytics** → Traffic by referrer (or use the D1 database source field)
- **ConvertKit** → Subscribers with `betalist-waitlist` tag → count over time

### BetaList-Native Metrics

Log in to betalist.com weekly and record:
- **Profile views:** Visible on your listing dashboard
- **Subscriber count:** How many BetaList users have "followed" your startup
- **Comments:** Check for new questions to respond to

### Success Benchmarks

| Metric | Conservative | Good | Excellent |
|---|---|---|---|
| Week 1 signups from BetaList | 20-50 | 50-100 | 100+ |
| Month 1 signups | 100-200 | 200-500 | 500+ |
| PH day upvotes from BetaList subscribers | 5-10% of list | 10-20% | 20%+ |

---

## Quick Reference

| Item | Value |
|---|---|
| Submission URL | https://betalist.com/submit |
| Website UTM | `https://churnrecovery.com?utm_source=betalist&utm_medium=directory&utm_campaign=early-access` |
| Category | Business & Productivity → SaaS Tools |
| Beta length | 60 days |
| Launch date | April 1, 2026 |
| Tag in ConvertKit | `betalist-waitlist` |
| Track in | performance-tracker.md |
