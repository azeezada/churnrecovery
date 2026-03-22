# Google Search Console Setup — ChurnRecovery

Step-by-step guide to verify churnrecovery.com in Google Search Console and submit the sitemap.

**Time required:** 10 minutes setup + 24-48 hours for initial crawl data.

---

## Step 1: Go to Google Search Console

1. Open your browser and go to **[search.google.com/search-console](https://search.google.com/search-console)**
2. Sign in with the Google account you want to manage the property under
   - Use a team/company Google account if you have one, not a personal one

> **What you'll see:** The Search Console dashboard. If this is your first time, you'll see a welcome screen prompting you to add a property. If you already have other properties, you'll see a property selector dropdown in the top-left.

---

## Step 2: Add a New Property

1. Click the **property selector dropdown** in the top-left corner (shows your current property name or "Search Console")
2. Click **"+ Add property"**

> **What you'll see:** A modal with two options:
> - **Domain** — covers all subdomains and protocols (requires DNS verification)
> - **URL prefix** — covers a specific URL pattern (multiple verification methods)

---

## Step 3: Choose URL Prefix

1. Select **"URL prefix"** (right side)
2. Enter: `https://churnrecovery.com`
3. Click **"Continue"**

> **Why URL prefix?** It's simpler — you can verify with the HTML meta tag that's already in the code. Domain-level verification requires DNS TXT record changes, which is unnecessary here.

> **What you'll see:** A verification methods panel with multiple options:
> - HTML file upload
> - **HTML tag** ← we're using this one
> - Google Analytics
> - Google Tag Manager
> - Domain name provider (DNS)

---

## Step 4: Verify with HTML Tag

1. Expand the **"HTML tag"** section
2. You'll see a meta tag like:
   ```html
   <meta name="google-site-verification" content="cCAZpDlVK-QR4d6LRkvvBRonJmsCtHtEdkGzH_DsNSs" />
   ```
3. **This is already in the codebase!** It's in `pages/_app.js`:
   ```jsx
   <meta name="google-site-verification" content="cCAZpDlVK-QR4d6LRkvvBRonJmsCtHtEdkGzH_DsNSs" />
   ```
4. Click **"Verify"**

> **What you'll see:** A green checkmark with "Ownership verified" message. If verification fails, make sure:
> - The site is deployed and the meta tag is live (check view-source on https://churnrecovery.com)
> - There are no typos in the verification code
> - The page returns a 200 status code

> **Troubleshooting:** If it says "Verification failed," visit `https://churnrecovery.com` in your browser, right-click → View Page Source, and search for `google-site-verification`. If it's there, try verifying again — sometimes Google's crawler needs a second attempt.

---

## Step 5: Submit the Sitemap

1. After verification, you'll land on the property overview dashboard
2. In the left sidebar, click **"Sitemaps"**
3. In the "Add a new sitemap" field, enter: `https://churnrecovery.com/sitemap.xml`
4. Click **"Submit"**

> **What you'll see:** The sitemap will appear in a table below with a status column. Initially it will say:
> - **"Pending"** — Google has received the sitemap but hasn't processed it yet
> - After processing (minutes to hours): **"Success"** with a count of discovered URLs
>
> If it says **"Couldn't fetch"**: Make sure `https://churnrecovery.com/sitemap.xml` is accessible in your browser. It should show an XML document with all your page URLs.

---

## Step 6: Request Indexing for Key Pages (Optional but Recommended)

While waiting for the crawl, you can manually request indexing for your most important pages:

1. In the top search bar (URL Inspection tool), paste a URL:
   - `https://churnrecovery.com`
   - `https://churnrecovery.com/pricing`
   - `https://churnrecovery.com/blog`
2. Press Enter
3. You'll see "URL is not on Google" (expected for a new site)
4. Click **"Request Indexing"**
5. Wait for the "Indexing requested" confirmation (takes 1-2 minutes of processing)

> **Limit:** You can request indexing for ~10-20 URLs per day. Prioritize:
> - Homepage
> - Pricing page
> - Top blog posts
> - Feature pages
> - Comparison/alternatives pages

---

## Step 7: Wait for Initial Data

- **Indexing:** 24-48 hours for Google to crawl and index your submitted pages
- **Search data:** 2-3 days before any impression/click data appears in the Performance report
- **Full data:** 2-4 weeks for comprehensive search performance data

> **What you'll see after a few days:**
> - **Performance tab:** Shows impressions, clicks, CTR, and average position for queries
> - **Coverage/Pages tab:** Shows which pages are indexed, which have errors
> - **Experience tab:** Core Web Vitals and mobile usability reports

---

## Step 8: Set Up Email Alerts

Google Search Console sends email notifications automatically for:
- Coverage issues (pages that can't be indexed)
- Manual actions (penalties)
- Security issues

Make sure the email associated with your Google account is one you check regularly.

---

## What to Monitor Weekly

Once data starts flowing:

| Report | What to Look For | Where |
|--------|-----------------|-------|
| **Performance** | Top queries, impressions, CTR, position | Performance → Search results |
| **Pages** | Indexed vs not indexed pages | Pages (Indexing) |
| **Core Web Vitals** | LCP, FID, CLS scores | Experience → Core Web Vitals |
| **Sitemaps** | All URLs discovered and indexed | Sitemaps |
| **Links** | External sites linking to you | Links |

---

## Quick Reference

| Item | Value |
|------|-------|
| **Search Console URL** | https://search.google.com/search-console |
| **Property URL** | https://churnrecovery.com |
| **Verification method** | HTML tag (already in `_app.js`) |
| **Verification code** | `cCAZpDlVK-QR4d6LRkvvBRonJmsCtHtEdkGzH_DsNSs` |
| **Sitemap URL** | https://churnrecovery.com/sitemap.xml |
| **Expected initial data** | 2-3 days after verification |

---

## Related

- [Submit Sitemap to Google](./submit-sitemap-to-google.md) — Additional details on sitemap submission
- [SEO Audit](./seo-audit.md) — Full SEO audit checklist
- [AI Answer Optimization](./ai-answer-optimization.md) — Getting cited by AI search engines
