# AlternativeTo Monitoring Strategy

Ongoing strategy for tracking, engaging, and growing ChurnRecovery's AlternativeTo presence. The listing is live — now the work is maintaining momentum and expanding to more competitor pages.

---

## Overview

**Current status:** Listing submitted and live (March 21, 2026)
**AlternativeTo URL:** https://alternativeto.net (search "ChurnRecovery" to find your listing)
**UTM for tracking:** `?utm_source=alternativeto&utm_medium=directory&utm_campaign=launch`

AlternativeTo is a slow-burn channel. It compounds over time: more upvotes → higher ranking → more organic discovery → more upvotes. The goal is to be the **#1 result for "Churnkey alternatives"** within 3 months.

---

## Weekly Monitoring Checklist

Run this every Monday morning. Takes ~15 minutes.

### Metrics to Check

**On AlternativeTo:**
- [ ] Log in to AlternativeTo → Your profile → Your apps
- [ ] Record current **upvote count** (target: +5 per week minimum)
- [ ] Record **"alternatives to [your app]" suggestions count**
- [ ] Check for **new comments** → respond within 24 hours (see response templates below)
- [ ] Check **listing rank** on Churnkey alternatives page: https://alternativeto.net/software/churnkey/about/ — are you in the top 5?

**In your analytics:**
- [ ] Cloudflare Analytics → Referrers → look for `alternativeto.net` in traffic sources
- [ ] Count new subscribers tagged `alternativeto-waitlist` in ConvertKit this week

**Record in `marketing/performance-tracker.md`:**
```
## AlternativeTo — Week of [DATE]
- Upvotes: [current total]
- New upvotes this week: [delta]
- Comments: [count]
- Weekly traffic from AlternativeTo: [sessions]
- New subscribers (alternativeto-waitlist tag): [count]
- Rank on Churnkey alternatives page: [position]
```

### Monthly Deep-Check (First Monday of Each Month)

- [ ] Are there new competitor tools listed that ChurnRecovery should be listed as alternative to?
- [ ] Any user reviews or detailed comments to respond to?
- [ ] Update screenshots if product has changed significantly
- [ ] Check if listing description still matches current product capabilities
- [ ] Look for "suggested" listings where your community has recommended ChurnRecovery on other tool pages — accept/confirm these

---

## Responding to Comments and Questions

**Rule:** Always respond within 24 hours. AlternativeTo comments are often visible in Google search results, so your responses are public-facing marketing.

**Tone:** Friendly, specific, honest. Don't be salesy. The AlternativeTo audience is technical and skeptical.

### Copy-Paste Response Templates

#### "How is this actually free?"

```
Good question — we get asked this a lot. The core product (cancel flows, dunning emails, exit surveys, analytics) is free and will stay free. 

Our model is similar to how Plausible or Cal.com work: free open-source core, optional paid features for larger teams as we grow. The segment we serve — bootstrapped founders under $5k/month in churn — is genuinely underserved by existing tools like Churnkey ($250-$825/month). We built what we needed and decided to make it free.

If you're worried about bait-and-switch, we've committed to giving advance notice before any pricing changes, and the repo is open-source so you can self-host if you prefer.
```

#### "How does this compare to Churnkey?"

```
The core functionality is similar: cancel flows, payment failure recovery, exit surveys. The main differences:

- Price: ChurnRecovery is free. Churnkey starts at $250/month and requires $5k+/month in churn volume to justify.
- Complexity: We're designed for 10-minute setup. Churnkey has more enterprise features (if you need them).
- Scale: Churnkey makes sense at $50k+/month in MRR. We're built for $1k-$50k/month.
- Open source: ChurnRecovery is MIT licensed. Churnkey is proprietary.

If you're doing $50k+/month in MRR and need enterprise SLAs, Churnkey might be worth the cost. Under that, we'd argue you're overpaying.
```

#### "Does it work with [Stripe / Paddle / Lemon Squeezy]?"

```
Yes — ChurnRecovery integrates with Stripe, Paddle, and Lemon Squeezy. 

For Stripe: one webhook configuration + one JS snippet for the cancel flow. 
For Paddle/Lemon Squeezy: similar webhook setup. Setup guide in our docs.

If you're on a different payment processor, reply here or email us at [your email] and we'll tell you what's possible.
```

#### "Is the self-hosted version as good as the cloud version?"

```
Yes, feature parity. The repo is at github.com/[your-repo] — you get the full product. The only difference is you manage your own infrastructure (we use Cloudflare Workers + D1 on the hosted version, so it's cheap to run yourself too).
```

#### "I tried signing up but [problem]"

```
Sorry about that! Can you describe what happened? You can also email me directly at [your email] — I respond to everything. We're in early access so there are rough edges, and I want to know about them.
```

#### General positive comment / "looks interesting"

```
Thanks! Happy to answer any questions about how it works or help you evaluate if it's the right fit. What kind of subscription business are you running?
```

---

## Expanding to Competitor Alternative Pages

**Goal:** Get ChurnRecovery listed as an alternative on every major competitor's page. This creates multiple entry points for people searching for alternatives.

### Target Competitor Pages

| Competitor | AlternativeTo URL | Priority | Status |
|---|---|---|---|
| Churnkey | https://alternativeto.net/software/churnkey/ | 🔴 CRITICAL | ✅ Done |
| ProfitWell Retain | https://alternativeto.net/software/profitwell/ | 🔴 HIGH | [ ] TODO |
| Baremetrics | https://alternativeto.net/software/baremetrics/ | 🟡 MEDIUM | [ ] TODO |
| Paddle Retain / Paddle | https://alternativeto.net/software/paddle/ | 🟡 MEDIUM | [ ] TODO |
| Chargebee Retain | https://alternativeto.net/software/chargebee/ | 🟡 MEDIUM | [ ] TODO |
| Stripe Billing Portal | https://alternativeto.net/software/stripe-billing/ | 🟡 MEDIUM | [ ] TODO |
| Brightback | https://alternativeto.net/software/brightback/ | 🟠 LOW | [ ] TODO |
| Recurly | https://alternativeto.net/software/recurly/ | 🟠 LOW | [ ] TODO |

### How to Add ChurnRecovery to a Competitor's Alternative List

1. **Go to the competitor's AlternativeTo page** (URLs above)
2. **Scroll down** to find the "Alternatives to [Competitor]" section
3. **Click "Suggest an alternative"** button (usually visible if logged in)
4. **Search for "ChurnRecovery"** in the search field
5. **Select ChurnRecovery** from the results
6. **Add a note** (optional but recommended): 
   ```
   Free, open-source alternative. Cancel flows + dunning sequences + exit surveys. 
   $20/month with 30-day free trial. All features included.
   ```
7. Submit

> **Note:** You may need to be logged in with a regular user account, not the ChurnRecovery account, for this to look organic. Consider having a few trusted users/beta testers do this for you — it looks more credible coming from multiple accounts.

### Execution Schedule

Do 2-3 competitor pages per week to avoid looking spammy:

- **Week 1 (do now):** ProfitWell Retain + Baremetrics
- **Week 2:** Paddle + Chargebee
- **Week 3:** Stripe Billing Portal + Brightback
- **Week 4:** Recurly + any others

### Positioning Copy for Each Competitor Type

**For expensive enterprise tools (Churnkey, ProfitWell, Baremetrics):**
```
Free alternative for bootstrapped SaaS. Cancel flows, dunning sequences, analytics — 
everything [Competitor] does, without the $250-$825/month price tag.
```

**For payment platform native tools (Stripe Billing, Paddle Retain):**
```
Dedicated churn recovery on top of [Competitor]'s billing. More customization, 
more recovery options, and free. Works alongside [Competitor].
```

**For mid-market tools (Chargebee, Recurly):**
```
Focused churn recovery without the full subscription management overhead. 
Free cancel flows + dunning + analytics for companies that just need the 
retention layer, not the full billing stack.
```

---

## Growing Upvotes

AlternativeTo rank is driven primarily by upvote count. Here's how to grow upvotes legitimately:

### From Existing Subscribers

Email the waitlist (especially `alternativeto-waitlist` segment):
```
Subject: Quick 10-second favor?

Hey,

If ChurnRecovery has been useful or looks like something you'd use, would you mind upvoting us on AlternativeTo? It helps other founders find us when they're looking for Churnkey alternatives.

👍 Upvote here: [your AlternativeTo listing URL]

That's it. Thanks.

— Dawood
```

### From Community

When mentioning ChurnRecovery in:
- Reddit posts → add AlternativeTo link as social proof
- Indie Hackers posts → link to listing
- Twitter/X → "you can also find us on AlternativeTo"
- BetaList listing → mention AlternativeTo presence

### From Beta Users

When someone has a positive experience, ask directly:
```
Glad it's working for you! If you have a minute, an upvote on AlternativeTo 
would help other founders find us: [link]. Takes 10 seconds.
```

---

## Tracking Referral Traffic

### UTM Setup Verification

All traffic from AlternativeTo should arrive with:
```
?utm_source=alternativeto&utm_medium=directory&utm_campaign=launch
```

If your AlternativeTo listing links directly to `https://churnrecovery.com` (without UTM), you can still catch this traffic via referrer analysis.

### In Cloudflare Analytics

Dashboard → Analytics → Traffic → Referrers → look for `alternativeto.net`

Track weekly: sessions from alternativeto.net → waitlist signups → conversion rate

### In ConvertKit

Subscribers tagged `alternativeto-waitlist` = signups that came through with `utm_source=alternativeto`

ConvertKit → Subscribers → filter by tag `alternativeto-waitlist` → count total

### Monthly Reporting

Add to `marketing/performance-tracker.md` each month:

```
## AlternativeTo — [Month] Summary
- Upvotes: [total] (+[delta] from last month)
- Competitor pages listed on: [count]
- Monthly traffic from AlternativeTo: [sessions]
- Monthly signups from AlternativeTo: [count]
- Conversion rate (visits → signups): [%]
- Estimated monthly value: [signups × LTV estimate]
```

---

## Quick Reference

| Task | Frequency | Time Required |
|---|---|---|
| Check upvote count | Weekly (Monday) | 2 minutes |
| Respond to comments | Within 24 hours | 5-10 minutes per comment |
| Check traffic in analytics | Weekly | 5 minutes |
| Add to competitor page | Weekly (2-3 per week) | 10 minutes |
| Email waitlist for upvotes | Monthly | 30 minutes |
| Update listing screenshots | Quarterly | 20 minutes |

| Resource | URL / Value |
|---|---|
| ChurnRecovery listing | https://alternativeto.net (search ChurnRecovery) |
| UTM source | `alternativeto` |
| UTM medium | `directory` |
| ConvertKit tag | `alternativeto-waitlist` |
| Track results in | `marketing/performance-tracker.md` |
