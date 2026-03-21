# Trust Signals Strategy
## ChurnRecovery — Pre-Launch Credibility Playbook

---

## 🎯 The Problem

You're asking people to:
1. Give you their email (low trust required)
2. Connect their Stripe account (HIGH trust required)
3. Eventually pay you money (highest trust required)

You have zero customers, zero press, zero case studies. What do you do?

**Answer:** You build credibility with what you *do* have — founder story, technical depth, community proof, and radical transparency.

---

## 📊 Trust Signal Priority Matrix (Pre-Launch)

Ranked by: **impact × cost to produce**

| Trust Signal | Impact | Cost | Priority |
|---|---|---|---|
| Founder story (authentic, specific) | 🔥 Very High | Low | **#1** |
| Waitlist count (real number) | High | Zero | **#2** |
| Technical transparency (how it works) | High | Low | **#3** |
| Community posts / discussions | High | Low | **#4** |
| Beta user testimonials (even 2–3) | 🔥 Very High | Medium | **#5** |
| Press mentions | Medium | High | #6 |
| Customer logos | Medium | Medium | #7 |
| Review site scores (G2, etc.) | Low | High | #8 |

---

## 🧑‍💻 Recommended Approach: Founder Credibility First

### The Core Narrative

> "I was a developer at a SaaS company. We were paying $825/month for Churnkey. I looked at the invoice, I looked at what it actually did, and I built a better version for 1/10th the price. That's ChurnRecovery."

This narrative works because:
- **It's specific.** $825/month is a real number. Specificity = credibility.
- **It explains the "why."** Founders who built something because they needed it are more trustworthy than those who identified a "market opportunity."
- **It positions against the enemy.** The villain (overpriced churn tools) creates instant alignment with the audience.
- **It's verifiable.** Anyone can check Churnkey pricing and see the contrast.

### Founder Credibility Checklist

- [ ] Photo of actual founder (not stock photo, not illustration)
- [ ] Real name, real LinkedIn
- [ ] Specific story: the invoice, the decision, the build
- [ ] Technical proof: GitHub (even private with public readme), deployment screenshots, architecture overview
- [ ] Optional: "Building in public" — Twitter/X thread showing the build process

---

## 🔄 Social Proof Without Users: 7 Alternatives

### 1. Waitlist Count (Use It Aggressively)
- "Join 200+ newsletter creators waiting for access"
- Show this number prominently. Update it. It's real social proof.
- **On waitlist form:** Add a "recently joined" counter if possible (e.g., "47 joined in the last 7 days")

### 2. Community Discussions
- Post on IH, Reddit, Hacker News — then screenshot/quote the positive responses
- "Discussed by 150+ founders on Indie Hackers" (link to thread)
- "Top-voted on r/SaaS this week"
- These are real proof of interest even without paying customers

### 3. Comparison Credibility
- Comprehensive comparison pages prove you know the space deeply
- "We've analyzed Churnkey, ProfitWell, Baremetrics, and ProsperStack so you don't have to"
- Being the person who explains competitors clearly = authority signal

### 4. Transparent Pricing Contrast
- The pricing table itself is a trust signal: "Churnkey charges $100–$800/month. We charge $0–$79/month."
- Showing this boldly says: "We have nothing to hide, and we know exactly why we're better."

### 5. Technical Transparency
- Publish a "How It Works" technical explainer — even non-technical users trust founders who can explain the tech clearly
- "Under the hood" section, architecture diagram, security policy
- This signals you're serious, not vaporware

### 6. Beta User Access Numbers
- Even if no one has reviewed you yet: "12 beta users currently testing"
- Then: send every beta user a short testimonial request within 48 hours of their first use

### 7. "Building in Public" Timeline
- Even if launched last week, show the journey: "Started: Feb 2026 → Beta: March 2026 → Public: April 2026"
- Shows momentum. Shows this is real.

---

## 📝 Testimonial Collection: Template & Process

### Email to Beta Users (Send After 7 Days of Access)

**Subject:** Quick question about your ChurnRecovery experience

> Hey [Name],
>
> You've been using ChurnRecovery for about a week now — I'd love to know how it's going.
>
> Would you be willing to answer one or two questions? Takes 2 minutes:
>
> 1. What problem were you trying to solve when you signed up?
> 2. Has ChurnRecovery helped? If so, what specifically?
>
> If you're happy to share your thoughts publicly, I'd love to feature your response on our website (first name + newsletter/business name only, or anonymous if you prefer).
>
> Either way, I read every reply personally.
>
> — [Founder name]

### What Makes a Great Testimonial

**Bad:** "Great tool! Very useful."
**Good:** "I was losing $400/month in cancellations and didn't even know it. ChurnRecovery caught 3 subscribers in the first week — I kept two of them. That's $80/month saved for a $29 tool."

**Template for prompting specific quotes:**
> "Can you tell me: before ChurnRecovery, what was happening? After using it, what changed? Feel free to include numbers if you have them."

### Post-Interview Testimonial Request

At the end of every user interview:
> "I'm going to email you a summary of what you shared today. If anything resonates as something you'd be comfortable sharing publicly, I'll include a quick opt-in. No pressure — even an anonymous quote helps."

---

## 🧪 A/B Test Plan: Trust Signal Formats

### Hypothesis
Different trust signals work for different buyer types. Test to find which drives the most waitlist conversions.

### Test 1: Founder Story vs. Waitlist Count
- **Variant A:** Hero section features founder photo + story ("I was paying $825/month...")
- **Variant B:** Hero section features social proof number ("Join 200+ newsletter creators")
- **Metric:** Email submission rate
- **Duration:** 2 weeks, minimum 500 visitors each
- **Prediction:** Founder story wins for cold traffic; waitlist count wins for warm (referral) traffic

### Test 2: Logo Wall vs. Quote Testimonials vs. Stats
- **Variant A:** Logo wall (company logos of beta users — even small ones)
- **Variant B:** 3 testimonial quotes with photo + name
- **Variant C:** Stats block ("$12,400 recovered across 47 beta users")
- **Metric:** Scroll depth past this section + email submission rate
- **Duration:** 2 weeks, minimum 300 visitors each
- **Prediction:** Quotes win when they're specific and include numbers

### Test 3: Pricing Page Trust — Guarantee vs. No Guarantee
- **Variant A:** No guarantee language
- **Variant B:** "Cancel anytime. No contracts. No questions."
- **Variant C:** "If you don't recover your first subscriber in 30 days, your first month is free."
- **Metric:** Upgrade rate from free to paid
- **Prediction:** Specific guarantee (Variant C) outperforms generic (Variant B)

### Implementation Notes
- Use simple URL-based splits or a flag in feature config
- Track with Plausible/PostHog goals
- Don't run more than 1 test at a time on the same page section

---

## ✍️ Homepage Trust Section — Specific Copy

### Option A: Founder Story Block
```
WHY WE BUILT THIS

I was paying $825/month for churn retention software.
Then I looked at what it actually did.

I'm a developer. So I built a better version.
ChurnRecovery does everything Churnkey does — at 1/10th the price —
because I got tired of watching small businesses get overcharged for software
that should be simple.

— [Founder Name], Founder & Developer
[Photo] [Twitter] [LinkedIn]
```

### Option B: Community Proof Block
```
WHAT THE COMMUNITY IS SAYING

"Finally — a churn tool that doesn't cost more than my churn does."
— IH thread with 47 upvotes

"Been waiting for something like this. Churnkey pricing is ridiculous for indie founders."
— r/SaaS (312 upvotes)

"Added to my stack immediately. Setup was 10 minutes."
— Waitlist member, newsletter creator
```

### Option C: Stats Block (for when you have data)
```
THE NUMBERS DON'T LIE

$[X]+ recovered
across [Y] beta users

[Z]% average recovery rate
on attempted cancellations

[A] minutes
average setup time

[B]x cheaper
than Churnkey at equivalent features
```

### Recommended: Use All Three Stacked
1. **Founder story** — sets the "why," creates emotional connection
2. **Community proof** — shows others are paying attention
3. **Stats** — closes with hard evidence

---

## 📋 Pre-Launch Trust Signal Checklist

### Week 1 (Do Now)
- [ ] Write/publish the founder story paragraph (50–100 words, specific, personal)
- [ ] Add founder photo to homepage (real photo, not avatar)
- [ ] Display waitlist count prominently ("Join [X] newsletter creators")
- [ ] Add "Why we built this" section to About page

### Week 2 (After First Beta Users)
- [ ] Send testimonial request to first 10 beta users
- [ ] Screenshot any positive IH/Reddit/Twitter responses to ChurnRecovery mentions
- [ ] Create "Building in Public" timeline block on homepage or dedicated page

### Week 3 (Before Product Hunt Launch)
- [ ] Have at least 3 real testimonials with photos and specifics
- [ ] Set up A/B test on founder story vs. waitlist count
- [ ] Publish "How It Works" technical explainer (builds authority)
- [ ] Add press/community mention logos if applicable

---

*Created: 2026-03-21 | Owner: Marketing | Status: Active strategy — update as proof points are collected*
