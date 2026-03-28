# Analytics Credentials Setup

Step-by-step guide to connect Google Analytics 4 and Google Search Console APIs.

---

## 1. Get Your GA4 Measurement ID

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin** (gear icon, bottom-left)
3. Under **Property** column → **Data Streams**
4. Click your web stream for churnrecovery.com
5. **Measurement ID** is at top-right (format: `G-XXXXXXXXXX`)

Add to `.env.local`:
```
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 2. Get Your GA4 Property ID

1. Same Admin page → **Property Settings**
2. The **Property ID** is the numeric ID shown at the top (e.g., `123456789`)

Add to `.env.local`:
```
GA4_PROPERTY_ID=123456789
```

## 3. Create a Google Cloud Service Account

This gives our scripts API access to pull analytics data.

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select an existing project or create a new one
3. Navigate to **APIs & Services → Library**
4. Search for and enable these two APIs:
   - **Google Analytics Data API** (v1)
   - **Google Search Console API**
5. Navigate to **APIs & Services → Credentials**
6. Click **Create Credentials → Service Account**
7. Name it `churnrecovery-analytics`
8. Skip the optional permissions steps → click **Done**
9. Click on the new service account → **Keys** tab
10. **Add Key → Create new key → JSON** → Download

Save the downloaded file as `.ga-service-account.json` in the project root (already in `.gitignore`).

Add to `.env.local`:
```
GA_SERVICE_ACCOUNT_KEY_PATH=.ga-service-account.json
```

## 4. Grant Service Account Access

### GA4 Access
1. Go to [analytics.google.com](https://analytics.google.com) → **Admin**
2. Under Property → **Property Access Management**
3. Click **+** → **Add users**
4. Enter the service account email (from the JSON file, looks like `churnrecovery-analytics@project-id.iam.gserviceaccount.com`)
5. Set role to **Viewer**
6. Click **Add**

### Google Search Console Access
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Select `churnrecovery.com`
3. **Settings → Users and permissions**
4. Click **Add user**
5. Enter the same service account email
6. Set permission to **Full**
7. Click **Add**

Add to `.env.local`:
```
GSC_SITE_URL=https://churnrecovery.com
```

## 5. Verify Setup

Run the analytics fetcher to verify everything works:

```bash
node scripts/fetch-analytics.mjs
```

If credentials are correct, you'll see a 30-day analytics summary. If not, the script will tell you what's missing.

---

## Environment Variables Summary

```bash
# .env.local
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_PROPERTY_ID=123456789
GA_SERVICE_ACCOUNT_KEY_PATH=.ga-service-account.json
GSC_SITE_URL=https://churnrecovery.com
```

## Security Notes

- `.ga-service-account.json` is in `.gitignore` — never commit it
- The service account has **read-only** access (Viewer role)
- For Cloudflare Pages deployment, set these as environment variables in the Pages dashboard
