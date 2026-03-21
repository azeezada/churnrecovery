---
title: "Building in Public: How We Created 5 Product Screenshots in 48 Hours"
description: "We needed product screenshots for Product Hunt but had no real users yet. Here's the honest story of how we built mockups in 48 hours — what worked, what didn't, and what we learned about what makes a great screenshot."
date: "2026-02-23"
tags: ["building in public", "product hunt", "design", "mockups", "screenshots", "saas"]
author: "ChurnRecovery Team"
readingTime: "6 min read"
---

Here's a thing nobody tells you about launching on Product Hunt: your screenshots matter more than your product description.

People scroll fast. The image grid is the first thing they see. A blurry screenshot of a half-built dashboard will tank your upvotes before anyone reads a single word you wrote.

We knew this going into our launch. What we didn't know was how fast we'd have to move.

---

## The Problem: We Had No Real Users (Yet)

When we decided to submit ChurnRecovery to Product Hunt, we had a working product but no active users running cancel flows through it. Our dashboard existed. The flows worked. But the data inside was... empty. Zeros everywhere.

You can't ship a screenshot of a dashboard full of zeros. Well, you can — but it communicates "this product has no users" louder than any disclaimer.

So we had two options:

1. Wait until we had real users with real data
2. Build mockups — realistic fake data that shows what the product looks like when it's actually working

We chose option two. And we gave ourselves 48 hours to do it properly.

---

## What We Built

Five screenshots total:

1. **The cancel flow in action** — what a subscriber sees when they try to cancel
2. **The recovery dashboard** — showing recovered subscribers, save rate, and revenue saved
3. **Analytics over time** — a 30-day chart of cancellations vs. recoveries
4. **The flow builder** — the drag-and-drop interface for creating cancel flows
5. **The "win" notification** — the moment a subscriber decides to stay

Each one needed to tell a story in 2 seconds or less.

---

## How We Actually Did It

### Step 1: We Started With Real Data Structures

The temptation with mockups is to make up numbers that sound impressive. "$500k recovered!" "99% save rate!" Nobody believes those numbers, and they make your product look like a scam.

Instead, we started with realistic data for our target user: a newsletter creator with ~10,000 subscribers and about 3% monthly churn.

That works out to roughly 300 cancellations per month. If a cancel flow saves 15–20% of those, you're recovering 45–60 subscribers per month. At $15/month average subscription price, that's $675–$900/month in saved revenue.

*Those* are believable numbers. They're meaningful to a real newsletter creator without sounding fake.

### Step 2: We Seeded the Database

We wrote a simple seed script that created:
- 847 total cancellation events over 30 days (realistic for a mid-size newsletter)
- 143 recoveries (~17% save rate — conservative and believable)
- Revenue recovered: $2,145 for the month
- A mix of outcomes: "stayed," "paused," "downgraded," "left anyway"

The key was making the data *messy*. Real data isn't a perfect curve. Some days had 40 cancellations; some had 8. Some weeks had better save rates than others. Messy = credible.

### Step 3: We Picked Realistic Company Names

The subscriber list in our screenshots needed to feel real. No "ACME Corp" or "Test User 1." We used a mix of:
- First name + last initial (the way most newsletter operators see subscribers)
- Realistic subscription lengths (some 2-month subscribers, some 18-month veterans)
- Realistic cancellation reasons from our exit survey options: "too expensive," "not using it enough," "taking a break"

This sounds like a small detail. It's not. Nothing kills credibility faster than obviously fake names.

### Step 4: Screenshot Composition

We used a combination of tools:
- **The actual product** for UI elements (no point designing something fake when the real thing looks good)
- **[Shots.so](https://shots.so)** for device framing and backgrounds
- **Figma** for any annotation or callout arrows
- **CleanShot X** for actual captures

For each screenshot, we asked one question before finalizing: *What is the single thing this image should communicate?*

- Cancel flow screenshot: "It's friendly, not aggressive"
- Dashboard screenshot: "You can see results immediately"
- Analytics screenshot: "The trend is going in the right direction"
- Flow builder screenshot: "This is simple, not complicated"
- Win notification screenshot: "This actually works"

One idea per image. If we couldn't identify the single idea, we threw out the screenshot and started over.

---

## What We Learned

**Composition beats content.** A well-cropped screenshot of a simple UI beats a zoomed-out screenshot of a complex one. Show less. Show it clearly.

**Use your real product, not Figma.** We spent the first three hours building beautiful Figma mockups of a dashboard that looked nothing like our actual product. Waste of time. Screenshot the real thing, style the background.

**The data tells the story.** Numbers aren't decoration — they're narrative. "$2,145 recovered this month" is a promise. Make sure the numbers in your screenshots are the numbers your target customer cares about.

**Don't overthink the background.** We went through about eight different background options — gradients, solid colors, dark mode, browser chrome. In the end, a simple dark gradient behind each screenshot worked best. Anything fancier competed with the product.

**Export at 2x.** Obvious in hindsight. Retina displays show blurry screenshots at 1x. Always 2x.

---

## The 48-Hour Timeline

- **Hour 0–4:** Planned the five screenshots, wrote the seed data script, seeded the database
- **Hour 4–10:** Took raw screenshots, tried Figma mockups (mostly wasted)
- **Hour 10–14:** Switched to styling real screenshots in CleanShot + Shots.so
- **Hour 14–20:** First drafts done. Showed to two people outside the project for feedback.
- **Hour 20–30:** Revisions. Iterated on crop, background, annotations.
- **Hour 30–42:** Final versions. Exported at 2x. Resized for Product Hunt's exact spec (1270×760px).
- **Hour 42–48:** Added to the homepage. Scheduled Product Hunt submission.

The hardest part wasn't the design — it was making decisions fast. With a real designer and real timeline, this takes two weeks. With one engineer and a 48-hour window, you have to commit to something good enough and move.

---

## Why This Matters for ChurnRecovery

We're building a product for non-technical business owners — newsletter creators, coaches, subscription businesses. These are people who care about design more than the average developer does. They judge tools by how polished they look.

If our screenshots looked half-baked, they'd assume the product was too.

The screenshots we built in those 48 hours still live on our homepage. They show the product working with realistic data. They communicate "this works, you can understand it, and it will look like this when you use it."

That's what a great product screenshot does. It's not a photo of software — it's a promise about the experience.

We care about that promise. Not because it makes us look good at launch, but because a product that's worth caring about is worth showing off properly.

If you're building something for real people, your screenshots should look like it.

---

*ChurnRecovery is a free churn recovery tool for newsletter creators and subscription businesses. Set up your cancel flow in 10 minutes — no monthly fees, no developer required. [Join the waitlist →](/#waitlist)*
