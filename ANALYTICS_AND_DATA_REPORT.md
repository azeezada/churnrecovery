# ChurnRecovery Data & Analytics Report

## Question 1: Where are waitlist emails stored?

### ✅ Answer: They're stored in both places
Waitlist emails are stored in:

1. **D1 Database (Primary storage)**: `churnrecovery-db` (ID: 5a4c00b9-71e7-4cde-9e03-256fc31be806)
2. **ConvertKit (Email automation)**: Automatically synced with tags for segmentation

### Current Data in D1
- **Currently**: 20 test emails (all `playwright-test-*@example.com`)
- **Schema**: `id`, `email`, `source`, `created_at`
- **Growth tracking**: Each signup returns total count

### How to View the Waitlist Anytime

```bash
# View all waitlist entries (replace with real token if different)
CLOUDFLARE_API_TOKEN=cfut_hdShyU98O5bpfpmE9idpwlehNOVXSpo9SDoyGAjmae93c1d8 \
CLOUDFLARE_ACCOUNT_ID=8e09fc813792bf92a0427a673224e37f \
npx wrangler d1 execute churnrecovery-db --command "SELECT * FROM waitlist ORDER BY created_at DESC LIMIT 50" --remote

# Get waitlist count
npx wrangler d1 execute churnrecovery-db --command "SELECT COUNT(*) as total FROM waitlist" --remote

# Filter by source (track where signups come from)
npx wrangler d1 execute churnrecovery-db --command "SELECT source, COUNT(*) as count FROM waitlist GROUP BY source" --remote
```

**Pro tip**: Add this to a script in your project for easy access.

---

## Question 2: Analytics — unique visitors, time on site, clicks

### ✅ Recommendation: Cloudflare Web Analytics (Free & Best)

After research, **Cloudflare Web Analytics** is the perfect choice for pre-launch ChurnRecovery:

- **Free forever** (Cloudflare Web Analytics — not a trial)
- **Privacy-first** (no cookies, GDPR compliant)
- **Zero performance impact** (runs on Cloudflare's edge)
- **Perfect metrics for pre-launch**: page views, unique visitors, referrers, top pages, countries, devices

### ✅ Implementation Done
I've added Cloudflare Web Analytics to your `_app.js`:

```javascript
{/* Cloudflare Web Analytics - Privacy-first analytics */}
{process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN && (
  <script
    defer
    src='https://static.cloudflareinsights.com/beacon.min.js'
    data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN}"}`}
  />
)}
```

### How to Enable It
1. **Log into Cloudflare Dashboard**
2. **Go to**: Workers & Pages → churnrecovery → Metrics 
3. **Click**: "Enable Web Analytics" (one-click setup for Pages)
4. **Alternative**: Analytics & Logs → Web Analytics → Add a site

If you need manual setup, add this to your `.env.local`:
```
NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=your_beacon_token_here
```

### What You'll Get
- **Unique visitors** (daily/weekly/monthly)
- **Page views** and top pages
- **Referrers** (where traffic comes from)
- **Countries** and devices
- **Core Web Vitals** (page performance)
- **Real-time data** (updates every few minutes)

**Why not PostHog/Plausible?**
- PostHog: Overkill for pre-launch, complex setup
- Plausible: $9/month, similar features to free Cloudflare

---

## Question 3: Google search title issue

### ✅ Status: HTML is correct, this is a Google indexing issue

**Current title**: `ChurnRecovery — Stop Losing Subscribers You Already Earned` ✅
**Google shows**: `Churn Recovery — Engineering Blog` ❌

### Root Cause
This is Google caching an old title from before your redesign. The HTML is correct in both:
- `pages/index.js` (homepage)
- `pages/blog.js` (blog page)

### ✅ Solution: This will resolve automatically
1. **Google will re-crawl** the site and update the title
2. **Timeline**: Usually 1-2 weeks for fresh sites
3. **When you set up GSC** (Google Search Console), you can request re-indexing

### Optional: Speed it up
```bash
# Submit sitemap to Google (if you have one)
curl -X POST "https://www.google.com/ping?sitemap=https://churnrecovery.com/sitemap.xml"
```

**Bottom line**: No action needed. The HTML is correct, Google just needs to update its index.

---

## Summary

1. **Waitlist emails**: ✅ Stored in D1 database + ConvertKit, 20 test entries currently
2. **Analytics**: ✅ Cloudflare Web Analytics implemented (free, privacy-first)
3. **Google title**: ✅ HTML correct, Google will update automatically

### Next Steps for Dawood
1. **Enable Cloudflare Web Analytics** (one click in your Cloudflare dashboard)
2. **Optional**: Set up Google Search Console for faster re-indexing
3. **Optional**: Export waitlist from D1 when you're ready to email everyone

Everything is properly implemented and will start tracking data as soon as you enable the analytics token.