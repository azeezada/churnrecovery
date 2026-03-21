# Google Search Console Monitoring Guide — ChurnRecovery

> A practical, non-technical guide to monitoring ChurnRecovery's search visibility using Google Search Console (GSC).

---

## 1. Initial Setup

### Verify Ownership

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add Property** → enter `https://churnrecovery.com`
3. Choose **HTML tag** verification method
4. Add the meta tag to your site's `<head>` (in `_document.tsx` or equivalent)
5. Click **Verify** in GSC

### Submit Your Sitemap

1. In GSC left sidebar, click **Sitemaps**
2. Enter: `sitemap.xml`
3. Click **Submit**
4. GSC will crawl and report how many URLs were indexed

**Expected sitemap URL:** `https://churnrecovery.com/sitemap.xml`

Verify it loads in your browser before submitting. If it returns a 404, generate it via your framework (Next.js has built-in sitemap support).

---

## 2. What to Watch For

### Indexed Pages

- **Goal:** All key pages should be indexed within 1–2 weeks of publishing
- **Check:** Coverage → Indexed → count should grow as you publish content
- **Red flag:** Pages in "Excluded" or "Error" buckets that should be live

### Key pages to confirm are indexed:
- `churnrecovery.com` (homepage)
- `churnrecovery.com/for/substack`
- `churnrecovery.com/tools/roi-calculator`
- `churnrecovery.com/posts/*` (all blog posts)
- Any landing pages you've created

### Click-Through Rates (CTR)

- **Average CTR** for position 1–3: 20–35%
- **Average CTR** for position 4–10: 5–15%
- **Red flag:** High impressions + low CTR → your title/description isn't compelling
- **Fix:** Update `<title>` tags and meta descriptions for low-CTR pages

### Search Terms (Queries)

This is the most valuable data in GSC. It shows exactly what people type before finding you.

**Check:** Performance → Queries tab

Look for:
- **Branded queries** ("churnrecovery" searches) — indicates brand awareness growing
- **High-impression, low-click queries** — you're ranking but not converting; improve meta description
- **Unexpected queries** — someone found you with a term you didn't target; consider writing content for it
- **Competitor queries** ("churnkey alternative", "churnkey pricing") — huge opportunity if ranking

---

## 3. Weekly Monitoring Checklist

Run this every Monday morning. Takes ~15 minutes.

```
WEEKLY GSC CHECKLIST
=====================

[ ] Coverage: Any new errors or excluded pages?
    → GSC → Coverage → Error/Excluded counts changed?

[ ] New indexed pages this week?
    → Coverage → Valid → count up from last week?

[ ] Top queries this week (last 7 days)
    → Performance → Date: Last 7 days → Queries tab
    → Screenshot/note top 10 queries

[ ] Click trend: up, flat, or down vs. last week?
    → Performance → Compare: last 7 days vs. prior 7 days

[ ] Any pages with impressions > 100 but CTR < 3%?
    → Performance → Pages tab → sort by impressions → look for low CTR
    → Action: rewrite title + meta description

[ ] Core Web Vitals: any new issues?
    → Core Web Vitals → check for "Poor" URLs

[ ] Manual Actions: any penalties?
    → Security & Manual Actions → Manual Actions (should say "No issues detected")
```

---

## 4. Interpreting Coverage Errors

### "Discovered — currently not indexed"
**Meaning:** Google found the URL but hasn't crawled it yet.
**Action:** Request indexing (URL Inspection tool → Request indexing). Normal for new pages.

### "Crawled — currently not indexed"
**Meaning:** Google crawled it but decided not to index it (thin content, duplicate, or low quality signal).
**Action:** Improve content quality and length. Add more original insights. Wait 2–3 weeks and request reindexing.

### "Duplicate, submitted URL not selected as canonical"
**Meaning:** Google found similar pages and picked a different one as the "main" version.
**Action:** Add `<link rel="canonical" href="[preferred URL]" />` to the page's head.

### "Page with redirect"
**Meaning:** The URL redirects to another page.
**Action:** Usually fine. Only investigate if it's redirecting somewhere unexpected.

### "Blocked by robots.txt"
**Meaning:** Your robots.txt is telling Google not to crawl this page.
**Action:** Check `churnrecovery.com/robots.txt` — make sure no important pages are accidentally blocked.

### "404 Not Found" in Coverage
**Meaning:** Google tried to crawl a URL that doesn't exist.
**Action:** If it was a real page you removed, set up a 301 redirect to the closest relevant page.

---

## 5. Priority Queries to Track

Set up a filter in Performance for these high-value searches:

| Query | Why It Matters |
|-------|---------------|
| `churnkey alternative` | High-intent competitor traffic |
| `cancel flow software` | Core product category |
| `reduce subscription churn` | Problem-aware searchers |
| `churnkey pricing` | Price-sensitive competitor shoppers |
| `subscription cancellation tool` | Direct product match |
| `newsletter subscriber retention` | Target audience match |
| `saas churn recovery` | Branded category term |

If you're not ranking for these yet: write content that targets them directly (blog posts, comparison pages).

---

## 6. Monthly Actions

- **Review top 5 performing pages** → double down with internal links pointing to them
- **Identify 3 queries with rank 8–15** → these are close to page 1; improve those pages
- **Check mobile usability** → GSC → Mobile Usability → fix any issues
- **Export data to spreadsheet** → track month-over-month trends

---

*Last updated: March 2026 | ChurnRecovery Marketing Team*
