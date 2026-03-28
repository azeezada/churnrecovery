# Stripe Partner Program — Action Brief for Dawood

**Status:** Backend complete ✅ | Human action required for partner application + env vars

---

## What Was Built (2026-03-23)

### 1. Stripe Connect OAuth Backend (`/api/stripe-connect`)
- **GET** `/api/stripe-connect?project_id=xxx` — generates OAuth authorize URL, returns connection status
- **POST** `/api/stripe-connect` — exchanges OAuth code for access token, saves to D1
- **DELETE** `/api/stripe-connect` — deauthorizes and clears tokens

All endpoints require JWT auth (Clerk), rate-limited, standard error shapes.

### 2. D1 Migration (`migrations/0003_stripe_connect.sql`)
Adds to projects table:
- `stripe_connect_account_id` — the connected Stripe account ID (`acct_xxx`)
- `stripe_connect_access_token` — platform token for acting on behalf of user
- `stripe_connect_scope` — OAuth scopes granted
- `stripe_connect_livemode` — 1 = live, 0 = test
- `stripe_connected_at` — timestamp

### 3. Connect-Stripe Page Wired to Real API
`/app/connect-stripe` now:
- Fetches connection status from `/api/stripe-connect` on load
- Redirects to real Stripe OAuth URL (instead of simulating it)
- Exchanges code via backend after redirect callback
- Shows account ID, live/test mode, connected-at date

---

## Actions Required from Dawood

### Step 1: Run D1 Migration
```bash
cd /Users/dawoodazeeza/.openclaw/workspace/churnrecovery
npx wrangler d1 execute churnrecovery-db --file=migrations/0003_stripe_connect.sql --remote
```

### Step 2: Set Cloudflare Pages Environment Variables
Go to Cloudflare Dashboard → Pages → churnrecovery → Settings → Environment Variables

Add:
| Variable | Value | Notes |
|---|---|---|
| `STRIPE_CLIENT_ID` | `ca_xxx...` | From Stripe Dashboard → Connect → Settings → Client ID |
| `STRIPE_SECRET_KEY` | `sk_live_xxx...` | Your Stripe platform secret key |
| `NEXT_PUBLIC_APP_URL` | `https://churnrecovery.com` | Already set? Verify |

### Step 3: Create Stripe Connect Application
1. Go to [dashboard.stripe.com/connect/settings](https://dashboard.stripe.com/connect/settings)
2. If you don't have a Connect application yet, click "Get started with Connect"
3. Choose **Standard accounts** (simplest — users connect their existing Stripe accounts)
4. Set redirect URI: `https://churnrecovery.com/app/connect-stripe`
5. Copy the **Client ID** (looks like `ca_xxx...`) → add to CF Pages env as `STRIPE_CLIENT_ID`

### Step 4: Apply for Stripe Partner Directory
The easiest path to marketplace visibility — no SDK required.

1. Go to [stripe.com/partners](https://stripe.com/partners)
2. Click **"Become a Partner"**
3. Select: **Technology Partner** → **App / Integration**
4. Fill out the form:
   - **Company:** ChurnRecovery
   - **Website:** https://churnrecovery.com
   - **Integration type:** Webhook-based (subscription cancellation events, payment failure events)
   - **Use case:** Churn recovery, cancel flow optimization, failed payment recovery
   - **Customer type:** Small businesses, newsletter creators, SaaS founders
   - **Stripe features used:** Connect, Webhooks (customer.subscription.deleted, invoice.payment_failed)
5. Upload: a screenshot of the cancel flow in action (use screenshots from /public/screenshots/)
6. Paste the listing copy below

### Listing Copy (ready to paste)

**Tagline:**
> Stop losing subscribers at the cancel button — affordable churn recovery for Stripe users ($20/month)

**Short description (50 words):**
> ChurnRecovery adds smart cancel flows to your Stripe subscriptions in minutes. When a customer tries to cancel, show them personalized retention offers — a pause, a discount, or a plan downgrade. Recover churning subscribers automatically. $20/month with 30-day free trial. No code required.

**Full description (100 words):**
> ChurnRecovery helps subscription businesses and newsletter creators recover subscribers at the moment they decide to cancel. Add a no-code cancel flow to your Stripe account: when someone clicks "cancel," they see targeted retention offers — a pause, a plan switch, or a discount — instead of an instant goodbye. Failed payments are handled with automated recovery emails.
>
> Most churn recovery tools start at $250/month. ChurnRecovery is $20/month with a 30-day free trial. No hidden costs, no revenue share. Setup takes 5 minutes.

**Keywords:** churn recovery, cancel flow, subscription retention, failed payment recovery, Stripe churn

---

## Step 5: Stripe App Marketplace (Longer term — 60-90 days)

Once you have users and the Connect integration is live, build toward a full Stripe App listing:
- Uses Stripe Apps SDK (React UI extensions inside Stripe Dashboard)
- Install: `stripe apps create` CLI
- See [stripe.com/docs/stripe-apps](https://stripe.com/docs/stripe-apps)
- Shows ChurnRecovery stats directly inside the Stripe Dashboard — highest-value listing

---

## Priority Order
1. ✅ Run migration (5 min)
2. ✅ Set env vars (5 min)
3. ✅ Create Stripe Connect application (15 min)
4. ✅ Apply for Stripe Partner Directory (30 min)
5. 📋 Stripe App Marketplace (future, after users)
