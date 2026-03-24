# Dawood Action Items — Knock These Out in One Sitting

All agent-automatable work is done. These items require your manual action (logins, accounts, dashboard clicks). Estimated total time: ~2 hours.

---

## P0 — Do These First (blocks launch)

### 1. Cloudflare Web Analytics beacon token
**Why:** We have zero analytics on the live site. Can't measure anything.
1. Go to https://dash.cloudflare.com → Web Analytics → Add site
2. Enter `churnrecovery.com`
3. Copy the beacon token (looks like `abc123def456...`)
4. Go to Cloudflare Pages → churnrecovery → Settings → Environment variables
5. Add `CF_ANALYTICS_TOKEN` = your beacon token
6. The snippet is already wired in `_document.js` — just needs the token

### 2. Set environment variables in Cloudflare Pages
**Why:** Welcome emails and webhook verification won't work without these.
1. Go to https://dash.cloudflare.com → Pages → churnrecovery → Settings → Environment variables
2. Set these (Production + Preview):
   - `CLERK_WEBHOOK_SECRET` — Get from Clerk dashboard (step 3 below)
   - `RESEND_API_KEY` — Get from https://resend.com/api-keys
   - `CLERK_JWKS_URL` — Get from Clerk dashboard → API Keys → JWKS URL

### 3. Create Clerk webhook endpoint
**Why:** Triggers welcome email + nurture sequence for new sign-ups.
1. Go to https://dashboard.clerk.com → Webhooks → Add endpoint
2. URL: `https://churnrecovery.app/api/clerk-webhook`
3. Events: select `user.created`
4. Copy the signing secret → use as `CLERK_WEBHOOK_SECRET` in step 2

### 4. Verify Resend sender domain
**Why:** Emails from `dawood@churnrecovery.com` will bounce without this.
1. Go to https://resend.com/domains
2. Add `churnrecovery.com`
3. Add the DNS records (MX, TXT, DKIM) to Cloudflare DNS
4. Wait for verification (usually <5 min)

### 5. Submit sitemap to Google Search Console
**Why:** Google won't index new pages without this.
1. Go to https://search.google.com/search-console
2. Add property `https://churnrecovery.com` (URL prefix method)
3. Verify via DNS TXT record (add to Cloudflare DNS)
4. Go to Sitemaps → Submit `https://churnrecovery.com/sitemap.xml`
5. Full guide: `docs/gsc-submission-guide.md`

---

## P1 — Do This Week (first users → first signal)

### 6. Post marketing content (content is ready, just publish)
**Where the content lives:**
- **Indie Hackers:** `docs/indie-hackers-post-final.md` — copy-paste the post
- **BetaList:** `docs/betalist-execution-guide.md` — follow the steps
- **Reddit:** `docs/reddit-execution-playbook.md` — has subreddits + post templates
- **Hacker News:** `docs/hacker-news-show-hn.md` — Show HN post ready

### 7. Create/claim Twitter/X account
1. Create `@ChurnRecovery` (or closest available handle)
2. Set up profile (logo at `public/logo.webp`, bio in press kit)
3. Post first threads from `docs/twitter-thread-templates.md`

### 8. Product Hunt prep (launch April 7)
**Deadline: Create upcoming page by March 25 (TOMORROW)**
1. Go to https://producthunt.com → create upcoming page
2. All assets ready at `public/ph-assets/` (1270x760px gallery images)
3. Copy-paste listing copy from `docs/product-hunt-action-brief.md`
4. DM hunters by March 27 (hunter list in the action brief)
5. Full checklist: `docs/product-hunt-prelaunch-checklist.md`

---

## P2 — Next 2 Weeks (growth)

### 9. Stripe App Marketplace listing
- Strategy: `docs/stripe-partner-action-brief.md`
- Application template: `docs/stripe-partner-application.md`
- Code ready at `stripe-app/`

### 10. Guest post outreach
- 15 targets with pitches: `docs/guest-post-strategy.md`
- Start outreach emails

### 11. Community engagement
- Playbook: `docs/community-engagement-playbook.md`
- 15 communities identified — start participating (not spamming)

### 12. Collect first testimonials
- Playbook: `docs/testimonial-collection-playbook.md`
- Need actual users first — revisit after PH launch

---

## Quick Reference — All Doc Locations

| Action | Doc |
|--------|-----|
| PH launch | `docs/product-hunt-action-brief.md` |
| PH checklist | `docs/product-hunt-prelaunch-checklist.md` |
| GSC setup | `docs/gsc-submission-guide.md` |
| IH post | `docs/indie-hackers-post-final.md` |
| BetaList | `docs/betalist-execution-guide.md` |
| Reddit | `docs/reddit-execution-playbook.md` |
| HN Show | `docs/hacker-news-show-hn.md` |
| Twitter threads | `docs/twitter-thread-templates.md` |
| Stripe marketplace | `docs/stripe-partner-action-brief.md` |
| Guest posts | `docs/guest-post-strategy.md` |
| Communities | `docs/community-engagement-playbook.md` |
| Testimonials | `docs/testimonial-collection-playbook.md` |
| Press kit | `docs/press-kit.md` |
