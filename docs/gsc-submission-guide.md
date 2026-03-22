# Google Search Console — Sitemap Submission & Monitoring Guide

> Practical, step-by-step guide for submitting ChurnRecovery's sitemap and monitoring search visibility.

---

## Quick Facts

- **Sitemap URL:** `https://churnrecovery.com/sitemap.xml` (118 URLs)
- **Robots.txt:** ✅ Already references sitemap
- **Ping script:** Run `node scripts/submit-sitemap.mjs` to ping Google + Bing

---

## 1. Submit Sitemap to Google Search Console

### Step 1: Verify Ownership
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add Property** → enter `https://churnrecovery.com`
3. Choose **HTML tag** verification method
4. Add the `<meta name="google-site-verification" content="..." />` tag to `pages/_document.tsx` (or `pages/_document.js`)
5. Click **Verify** in GSC

### Step 2: Submit the Sitemap
1. In the GSC left sidebar, click **Sitemaps**
2. Enter: `sitemap.xml`
3. Click **Submit**
4. Wait 24–72 hours for GSC to crawl and report indexed URLs

### Step 3: Run the Ping Script (immediate, no GSC account needed)
```bash
node scripts/submit-sitemap.mjs
```
This pings Google and Bing's sitemap ping endpoints directly.

---

## 2. Weekly Monitoring Checklist (~15 min every Monday)

```
WEEKLY GSC CHECKLIST
=====================

[ ] Coverage: Any new errors or excluded pages?
    → GSC → Coverage → Error/Excluded counts changed?

[ ] New indexed pages this week?
    → Coverage → Valid → count up from last week?

[ ] Top queries this week (last 7 days)
    → Performance → Date: Last 7 days → Queries tab
    → Note top 10 queries

[ ] Click trend: up, flat, or down vs. last week?
    → Performance → Compare: last 7 days vs. prior 7 days

[ ] Any pages with impressions > 100 but CTR < 3%?
    → Performance → Pages tab → sort by impressions → look for low CTR
    → Action: rewrite title + meta description

[ ] Core Web Vitals: any new issues?
    → Core Web Vitals → check for "Poor" URLs

[ ] Manual Actions: any penalties?
    → Security & Manual Actions → "No issues detected" expected
```

---

## 3. Priority Queries to Track

| Query | Why It Matters |
|-------|----------------|
| `churnkey alternative` | High-intent competitor traffic |
| `cancel flow software` | Core product category |
| `reduce subscription churn` | Problem-aware searchers |
| `churnkey pricing` | Price-sensitive competitor shoppers |
| `subscription cancellation tool` | Direct product match |
| `newsletter subscriber retention` | Target audience match |
| `saas churn recovery` | Branded category term |

---

## 4. Interpreting Coverage Errors

| Error | Meaning | Fix |
|-------|---------|-----|
| Discovered — not indexed | Found but not crawled yet | Request indexing via URL Inspection tool |
| Crawled — not indexed | Crawled but low quality signal | Improve content, request reindex in 2–3 weeks |
| Duplicate, submitted URL not selected | Google picked another canonical | Add `<link rel="canonical" />` to the page |
| Blocked by robots.txt | robots.txt blocking Google | Review `/robots.txt` for accidental blocks |
| 404 Not Found | Dead URL Google remembers | Add 301 redirect to nearest relevant page |

---

## 5. Monthly Actions

- Review top 5 performing pages → add more internal links pointing to them
- Identify 3 queries ranked 8–15 → improve those pages to break into page 1
- Check Mobile Usability → GSC → Mobile Usability
- Export data to spreadsheet for month-over-month tracking

---

*Last updated: 2026-03-22 | ChurnRecovery*
