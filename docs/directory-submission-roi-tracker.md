# Directory Submission ROI Tracker — ChurnRecovery
*Created: March 2026 | Updated: check date on last commit*

---

## Overview

You can't optimize what you don't measure. Directory submissions take real time — submitting, writing copy, following up, engaging with communities. Without tracking, you'll keep investing time in channels that send zero qualified signups while ignoring the ones that actually convert.

This tracker tells you one thing clearly: **which directories send people who actually join the waitlist.** Everything else is vanity.

**Key metric:** Conversion rate = Waitlist signups ÷ Total clicks × 100

A click that doesn't become a signup is worthless for user acquisition. Track both.

---

## UTM Parameter Reference

Every directory link should use UTMs so Cloudflare Analytics and your email tool can attribute signups correctly. These are already set up based on the submission execution guide.

| Directory | UTM Source | UTM Medium | UTM Campaign | Full UTM String |
|-----------|-----------|------------|--------------|-----------------|
| Indie Hackers | `indiehackers` | `community` | `launch` | `?utm_source=indiehackers&utm_medium=community&utm_campaign=launch` |
| AlternativeTo | `alternativeto` | `directory` | `launch` | `?utm_source=alternativeto&utm_medium=directory&utm_campaign=launch` |
| BetaList | `betalist` | `directory` | `launch` | `?utm_source=betalist&utm_medium=directory&utm_campaign=launch` |
| Product Hunt | `producthunt` | `directory` | `launch` | `?utm_source=producthunt&utm_medium=directory&utm_campaign=launch` |
| Hacker News | `hackernews` | `social` | `launch` | `?utm_source=hackernews&utm_medium=social&utm_campaign=launch` |
| G2 | `g2` | `directory` | `launch` | `?utm_source=g2&utm_medium=directory&utm_campaign=launch` |
| Capterra | `capterra` | `directory` | `launch` | `?utm_source=capterra&utm_medium=directory&utm_campaign=launch` |
| SaaSHub | `saashub` | `directory` | `launch` | `?utm_source=saashub&utm_medium=directory&utm_campaign=launch` |
| Crunchbase | `crunchbase` | `directory` | `launch` | `?utm_source=crunchbase&utm_medium=directory&utm_campaign=launch` |
| StartupBase | `startupbase` | `directory` | `launch` | `?utm_source=startupbase&utm_medium=directory&utm_campaign=launch` |

> **ConvertKit / email tool tag naming convention:** Each UTM source maps to a subscriber tag: `[source]-waitlist` (e.g., `alternativeto-waitlist`, `producthunt-waitlist`). Filter by tag to count signups per channel.

---

## Tracking Table

Update this weekly. Pull data from Cloudflare Analytics (clicks) and ConvertKit subscriber tags (signups).

| Directory | Submitted | Live Date | UTM Source | Total Clicks | Waitlist Signups | Conversion Rate | Notes |
|-----------|-----------|-----------|------------|:------------:|:----------------:|:---------------:|-------|
| AlternativeTo | 2026-03-21 | 2026-03-21 | `alternativeto` | — | — | — | Submitted as Churnkey alternative; listed on Churnkey competitor page |
| Indie Hackers | 2026-03-21 | — | `indiehackers` | — | — | — | Post drafted in docs/indie-hackers-post-final.md; manual publish required |
| BetaList | 2026-03-21 | — | `betalist` | — | — | — | Review takes 1–3 days |
| Product Hunt | — | 2026-04-01 | `producthunt` | — | — | — | Coordinated launch April 1st |
| Hacker News (Show HN) | — | — | `hackernews` | — | — | — | Post Monday AM (weekday 8–10 AM EST) |
| G2 | 2026-03-21 | — | `g2` | — | — | — | Need 5 authentic reviews before showing up; guide at docs/g2-capterra-profiles.md |
| Capterra / GetApp | 2026-03-21 | — | `capterra` | — | — | — | GetApp auto-populates when Capterra is live |
| SaaSHub | — | — | `saashub` | — | — | — | Dedicated SaaS marketplace |
| Crunchbase | — | — | `crunchbase` | — | — | — | Business credibility; not a traffic driver |
| StartupBase | — | — | `startupbase` | — | — | — | Early-stage founder community |

> **How to fill in:** Click count comes from Cloudflare (see below). Signup count comes from ConvertKit tag filter. Conversion rate = signups ÷ clicks × 100, round to 1 decimal.

---

## How to Pull Data

### Step 1 — Get Click Counts (Cloudflare Analytics)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Select `churnrecovery.com`
2. Click **Analytics & Logs → Web Analytics**
3. Set date range to "Last 30 days" (or since submission date)
4. Click **Referrers** tab — look for each directory domain in the list
   - `alternativeto.net` = AlternativeTo traffic
   - `indiehackers.com` = IH traffic
   - etc.
5. The number shown is your **Total Clicks** for that source

> **Alt method — D1 query:** If you're capturing UTM params in the waitlist signup form submission, you can query D1 directly:
> ```sql
> SELECT utm_source, COUNT(*) as signups 
> FROM waitlist_signups 
> GROUP BY utm_source 
> ORDER BY signups DESC;
> ```
> Run via Wrangler: `npx wrangler d1 execute churnrecovery-db --command "SELECT utm_source, COUNT(*) FROM waitlist_signups GROUP BY utm_source"`

### Step 2 — Get Signup Counts (ConvertKit / email tool)

1. Open ConvertKit (or your email tool)
2. Go to **Subscribers → Filter by Tag**
3. Select tag: `[directory]-waitlist` (e.g., `alternativeto-waitlist`)
4. Count shows total signups from that source

> **If tags aren't set up yet:** Filter subscribers by join date range, then check their form source field. Or use the D1 query above if UTM params are stored on signup.

### Step 3 — Calculate Conversion Rate

```
Conversion Rate = (Waitlist Signups ÷ Total Clicks) × 100

Example: 12 signups ÷ 280 clicks × 100 = 4.3%
```

Enter result as a percentage in the table (e.g., `4.3%`).

### Step 4 — Update Table

Fill in the tracking table above. Add any notes about what's different (e.g., "got featured in BetaList newsletter", "posted in IH thread").

---

## Decision Framework

Use this to decide where to invest more time vs. move on.

### 🟢 Double Down (>2% conversion rate)

The directory is sending genuinely interested users. Actions:
- Engage actively with comments and questions on that platform
- Ask satisfied users to upvote/review there
- Create more content for that platform's audience
- Consider paid promotion if available (e.g., BetaList featured)

### 🟡 Monitor (0.5%–2% conversion rate)

Decent but not great. Give it 2–4 more weeks before deciding:
- Check if traffic is still growing (new listings take time to rank)
- Try improving the listing description or screenshots
- Engage with any comments to build credibility

### 🔴 Move On (<0.5% after 2 weeks of steady traffic)

The audience doesn't match or the listing isn't visible enough. Actions:
- Stop investing time here
- Don't delete the listing (passive SEO value), just deprioritize
- Redirect that time to higher-converting channels

### Special Cases

| Situation | Decision |
|-----------|----------|
| Traffic is high but conversion is low | Check if the landing page matches what the directory describes. Disconnect between promise and landing = fix the page |
| Traffic is low but conversion is high | The channel is good but needs more exposure — ask for upvotes, engage in community |
| No traffic after 2 weeks | Listing may not be live yet (review pending) or not indexed — follow up |
| G2 / Capterra | Don't judge by clicks. Value is in review collection for trust signals. Keep these regardless |
| Crunchbase | Not a traffic source. Keep for legitimacy. Ignore in conversion analysis |

---

## Monthly Review Template

Copy this block at the start of each month. Fill it in after pulling data.

```markdown
## Monthly ROI Review — [Month YYYY]
Review date: [YYYY-MM-DD]

### Performance Summary

| Directory | Monthly Clicks | Monthly Signups | Conversion Rate | Trend vs Last Month | Action |
|-----------|:--------------:|:---------------:|:---------------:|:-------------------:|--------|
| AlternativeTo | | | | ⬆/⬇/➡ | |
| Indie Hackers | | | | ⬆/⬇/➡ | |
| BetaList | | | | ⬆/⬇/➡ | |
| Product Hunt | | | | ⬆/⬇/➡ | |
| Hacker News | | | | ⬆/⬇/➡ | |
| G2 | | | | n/a | Reviews: [count] |
| Capterra | | | | n/a | Reviews: [count] |
| SaaSHub | | | | ⬆/⬇/➡ | |

### Top Performer This Month
**Directory:** [Name]
**Why it's working:** [1–2 sentences]
**Action: [What you're doing to double down]**

### Biggest Surprise (Up or Down)
**Directory:** [Name]
**What happened:** [1–2 sentences]

### Time Invested This Month
| Directory | Hours spent | Worth it? (Y/N) |
|-----------|:-----------:|:---------------:|
| | | |

### Next Month Focus
- [ ] [Action 1]
- [ ] [Action 2]
- [ ] [Action 3]
```

---

## Quick Reference

| Metric | Where to Find It |
|--------|-----------------|
| Clicks per directory | Cloudflare Analytics → Referrers |
| Signups per directory | ConvertKit tag filter OR D1 query on `utm_source` |
| Conversion rate | Signups ÷ Clicks × 100 |
| AlternativeTo upvotes | https://alternativeto.net (your listing) |
| Product Hunt upvotes | producthunt.com (your product page) |

**Review cadence:** Pull data every Monday. Do the full monthly review on the first Monday of each month.
