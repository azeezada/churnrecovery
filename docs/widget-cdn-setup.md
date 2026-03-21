# Widget CDN Setup — cdn.churnrecovery.com

This guide explains how to serve `widget.min.js` from a fast, globally-distributed CDN at `cdn.churnrecovery.com`, using Cloudflare Pages (free tier) or Cloudflare R2.

---

## Option A: Cloudflare Pages (Recommended — Free)

Cloudflare Pages lets you deploy static files to Cloudflare's global edge network with zero cost and automatic SSL.

### Step 1 — Build the widget

```bash
bash scripts/build-widget.sh
```

This outputs `public/widget.min.js` with a date-stamped header comment.

### Step 2 — Deploy to Cloudflare Pages

The project is already configured to deploy via `wrangler`:

```bash
CLOUDFLARE_API_TOKEN=<your-token> \
CLOUDFLARE_ACCOUNT_ID=<your-account-id> \
npx wrangler pages deploy out/ \
  --project-name=churnrecovery \
  --branch=main \
  --commit-dirty=true
```

After deployment, the widget is available at:
```
https://churnrecovery.pages.dev/widget.min.js
```

### Step 3 — Add CNAME record for cdn.churnrecovery.com

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → select the `churnrecovery.com` zone
2. Go to **DNS** → **Add record**
3. Create:

| Type  | Name | Target                       | Proxy status |
|-------|------|------------------------------|--------------|
| CNAME | cdn  | churnrecovery.pages.dev      | Proxied (🟠) |

This maps `cdn.churnrecovery.com` → `churnrecovery.pages.dev` through Cloudflare's proxy, so caching and SSL work automatically.

> **Propagation:** DNS changes take effect within 1–5 minutes when proxied through Cloudflare.

### Step 4 — Configure Custom Domain in Pages

1. In Cloudflare Dashboard → **Pages** → **churnrecovery** project
2. Go to **Custom domains** → **Set up a custom domain**
3. Enter `cdn.churnrecovery.com`
4. Cloudflare will verify and issue the SSL certificate automatically

---

## Option B: Cloudflare R2 (Object Storage)

Use R2 if you want versioned files with fine-grained cache control (e.g., `widget.v20260321.min.js`).

### Setup

1. In Cloudflare Dashboard → **R2** → **Create bucket** → name it `churnrecovery-cdn`
2. Enable **Public access** on the bucket (or set up a custom domain)
3. Upload files:
   ```bash
   # Install Wrangler if needed
   npx wrangler r2 object put churnrecovery-cdn/widget.min.js \
     --file public/widget.min.js \
     --content-type "application/javascript"
   ```
4. Set custom domain: R2 bucket settings → **Custom domain** → `cdn.churnrecovery.com`

---

## Cache Headers Recommendation

### For `widget.min.js` (latest, unversioned)

```
Cache-Control: public, max-age=0, must-revalidate
```

This ensures users always get the latest version. Cloudflare still caches at the edge and uses ETags for efficient revalidation.

### For versioned files (e.g., `widget.v20260321.min.js`)

```
Cache-Control: public, max-age=31536000, immutable
```

One year cache, immutable — never re-fetched. Always use a new filename when content changes.

#### Setting cache rules in Cloudflare Pages

In `public/_headers` (already in the project or create it):

```
/widget.min.js
  Cache-Control: public, max-age=0, must-revalidate

/widget.v*.min.js
  Cache-Control: public, max-age=31536000, immutable
```

---

## Updated Embed Code

Once `cdn.churnrecovery.com` is live, update all install instructions to use:

```html
<script src="https://cdn.churnrecovery.com/widget.min.js" data-project="YOUR_PROJECT_ID" async></script>
```

**Old (self-hosted, do not use):**
```html
<script src="https://churnrecovery.com/widget.js" data-project="YOUR_PROJECT_ID" async></script>
```

---

## Updating Dashboard Install Instructions

The dashboard install snippet is rendered in the app. Update it to use the CDN URL:

1. **File to update:** Look for the install/embed snippet in the dashboard UI (likely `pages/app/` or `components/`)
2. Change `https://churnrecovery.com/widget.js` → `https://cdn.churnrecovery.com/widget.min.js`
3. Rebuild and deploy

---

## Purging the CDN Cache

After deploying a new widget version:

```bash
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/05c71901ffce261e25cb9a0b71279e0a/purge_cache" \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"files":["https://cdn.churnrecovery.com/widget.min.js"]}'
```

Or purge everything:

```bash
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/05c71901ffce261e25cb9a0b71279e0a/purge_cache" \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}'
```

---

## Summary Checklist

- [ ] Run `bash scripts/build-widget.sh` to generate `public/widget.min.js`
- [ ] Deploy to Cloudflare Pages via `wrangler pages deploy`
- [ ] Add CNAME: `cdn` → `churnrecovery.pages.dev` (proxied)
- [ ] Add custom domain `cdn.churnrecovery.com` in Pages settings
- [ ] Update `public/_headers` with cache rules
- [ ] Update dashboard embed snippet to use CDN URL
- [ ] Purge cache after each widget release
- [ ] Verify: `curl -I https://cdn.churnrecovery.com/widget.min.js`
