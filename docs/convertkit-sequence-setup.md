# ConvertKit Sequence Setup — ChurnRecovery Waitlist Drip

This guide walks through how to configure the 5-email nurture sequence (see `email-nurture-sequence.md`) in ConvertKit, including tags, timing, and conversion tracking.

---

## How Waitlist Signups Get Into ConvertKit

The waitlist API (`functions/api/waitlist/index.js`) automatically subscribes each new signup to your ConvertKit form via the `/v3/forms/:formId/subscribe` endpoint. It also applies a source tag from this map:

| Source param | ConvertKit tag applied |
|---|---|
| `product-hunt` / `producthunt` | `product-hunt-waitlist` |
| `reddit` | `reddit-waitlist` |
| `alternativeto` | `alternativeto-waitlist` |
| `betalist` | `betalist-waitlist` |
| `organic` (default) | `organic-waitlist` |
| `/for/` landing page sources (`kajabi-lp`, `ghost-lp`, etc.) | `organic-waitlist` |

Every signup that enters ConvertKit will have **exactly one of these source tags**. Use this for segmentation (see below).

---

## Step 1: Create the Sequence

1. In ConvertKit, go to **Automations → Sequences**
2. Click **New Sequence**
3. Name it: `ChurnRecovery Waitlist Nurture`
4. Add 5 emails using the content from `email-nurture-sequence.md`

### Email timing settings:

| Email | Send timing |
|---|---|
| Email 1 | Immediately (Day 0) |
| Email 2 | 3 days after previous |
| Email 3 | 4 days after previous (Day 7 total) |
| Email 4 | 7 days after previous (Day 14 total) |
| Email 5 | 7 days after previous (Day 21 total) |

### Recommended send window:
- **Send time:** 9:00–10:00 AM in subscriber's local timezone (ConvertKit's Smart Sending can handle this)
- **Day restriction:** Avoid Sundays — open rates drop ~15%
- If Smart Sending isn't available, default to **10:00 AM Eastern**

---

## Step 2: Create the Automation Trigger

1. Go to **Automations → Visual Automations**
2. Click **New Automation**
3. Name: `Waitlist → Nurture Sequence`
4. Trigger: **Subscribes to a form** → select your waitlist form (the one whose ID is in `CONVERTKIT_FORM_ID` env var)
5. Action: **Add to sequence** → `ChurnRecovery Waitlist Nurture`

This means every new waitlist signup automatically enters the 5-email sequence.

---

## Step 3: Tag Setup for Segmentation

Beyond the source tags already applied by the API, create these additional tags in ConvertKit for tracking:

| Tag | When to apply |
|---|---|
| `early-access-claimed` | When someone clicks through and creates an account |
| `email-2-clicked` | Clicked link in Day 3 email (case study) |
| `email-3-clicked` | Clicked link in Day 7 email (demo) |
| `email-4-clicked` | Clicked link in Day 14 email (free tier explainer) |
| `email-5-clicked` | Clicked CTA in Day 21 email (launch) |
| `converted` | Created account + connected Stripe |

To apply the click-tracking tags automatically:
- In each sequence email, go to the link settings
- Under "Link actions," add: **Add tag: `email-N-clicked`**

---

## Step 4: A/B Subject Line Testing

ConvertKit supports A/B subject testing on sequences. For each email:

1. Edit the sequence email
2. Click **A/B Test Subject Lines**
3. Enter the B variant from `email-nurture-sequence.md`
4. Set split: 50/50
5. Let ConvertKit auto-pick winner after 4 hours (by open rate)

**Priority emails to A/B test first:** Email 2 (social proof) and Email 5 (launch CTA) — these have the highest conversion impact.

---

## Step 5: Recommended Segmentation by Source Tag

Use ConvertKit segments to personalize emails for different traffic sources:

### Product Hunt / BetaList subscribers (`product-hunt-waitlist`, `betalist-waitlist`)
These are discovery-mode users — they're comparing options. In Email 4 (Why It's Free), add a line:
> "If you found us on Product Hunt, you've probably seen $250/month tools doing similar things. That's exactly why we built this."

Create a segment: **Tag contains `product-hunt-waitlist` OR `betalist-waitlist`** → customize Email 4 body.

### Reddit subscribers (`reddit-waitlist`)
More skeptical, technical-leaning. In Email 3 (walkthrough), be more direct and mechanical.

### Organic subscribers (`organic-waitlist`)
Likely searched for a solution — most intent. Can be slightly faster to launch email (shorten to Day 18 instead of Day 21).

---

## Step 6: Track Which Emails Convert

### In ConvertKit:
- Sequence → click **Stats** on each individual email
- Watch **Open rate**, **Click rate**, and **Unsubscribes**
- Healthy open rates for this type of sequence: 35–55% (Email 1), declining to 25–35% by Email 5
- Click rates: 5–15% per email is solid

### Conversion funnel to track:

| Metric | How to track |
|---|---|
| Waitlist signup | D1 DB `waitlist` table (already logging) |
| ConvertKit subscriber | ConvertKit subscriber count |
| Demo page visit | Google Analytics / Cloudflare Analytics event on `/demo` |
| Account created | Add to `converted` tag via ConvertKit API on account creation |
| Stripe connected | Add to `stripe-connected` tag on connect flow completion |

### Weekly review questions:
1. Which email has the highest unsubscribe rate? (Content mismatch)
2. Which email has the highest click rate? (Best conversion point — double down here)
3. What's the Email 1 → Email 5 open rate drop-off? (Normal: 30–40% drop; anything >50% means earlier emails aren't building interest)

---

## Environment Variables Required

The waitlist API reads these from your Cloudflare Pages environment:

```
CONVERTKIT_API_KEY=<your ConvertKit API key>
CONVERTKIT_FORM_ID=<your waitlist form ID>
```

Set these in Cloudflare Pages → Settings → Environment Variables (Production).

---

## Quick Reference: Tag Inventory

All tags currently in use or recommended:

| Tag name | Source | Purpose |
|---|---|---|
| `product-hunt-waitlist` | API auto-apply | Source tracking |
| `reddit-waitlist` | API auto-apply | Source tracking |
| `alternativeto-waitlist` | API auto-apply | Source tracking |
| `betalist-waitlist` | API auto-apply | Source tracking |
| `organic-waitlist` | API auto-apply (default) | Source tracking |
| `early-access-claimed` | Manual / app event | Conversion tracking |
| `email-2-clicked` | ConvertKit link action | Engagement tracking |
| `email-3-clicked` | ConvertKit link action | Engagement tracking |
| `email-4-clicked` | ConvertKit link action | Engagement tracking |
| `email-5-clicked` | ConvertKit link action | Engagement tracking |
| `converted` | App event | Full conversion tracking |
| `stripe-connected` | App event | Activation tracking |
