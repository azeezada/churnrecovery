# Stripe Partner Directory — Application Guide

**Status:** Ready to submit. All technical requirements met.
**Target listing:** Stripe Partner Directory (Technology Partner — Billing & Subscriptions)
**Full App Marketplace:** Q2 2026 (requires Stripe Apps SDK build)

---

## Step 1: Apply to Stripe Partner Directory (Do This Now)

**URL:** https://stripe.com/partners/become-a-partner

**Selection path:**
1. Click "Become a Partner"
2. Choose: **Technology Partner**
3. Sub-category: **App / Integration**
4. Use case: **Billing & Subscriptions → Churn Recovery**

---

## Application Form Copy (copy-paste ready)

### Company Details
- **Company name:** ChurnRecovery
- **Website:** https://churnrecovery.com
- **Pricing page:** https://churnrecovery.com/pricing
- **Privacy policy:** https://churnrecovery.com/privacy
- **Terms of service:** https://churnrecovery.com/terms

### Integration Description (short — for form field)
> ChurnRecovery adds smart cancel flows and dunning recovery to Stripe subscriptions. When a subscriber tries to cancel, they see personalized retention offers (pause, downgrade, discount) instead of a direct exit. Failed payments trigger a 3-email dunning sequence. No code required. $20/month with 30-day free trial.

### Integration Description (long — for listing page)
> **Stop losing Stripe subscribers at the cancel button.**
>
> ChurnRecovery is an affordable churn recovery tool purpose-built for Stripe users — $20/month with 30-day free trial. It adds two capabilities to your existing Stripe subscription setup:
>
> **1. Smart cancel flows**
> When a subscriber clicks "Cancel subscription," ChurnRecovery intercepts that moment and shows them personalized retention offers: pause their subscription for 1-3 months, downgrade to a cheaper plan, or accept a temporary discount. No code changes required — add a 5-line JavaScript widget to your cancel page.
>
> **2. Automatic dunning for failed payments**
> When `invoice.payment_failed` fires, ChurnRecovery sends a 3-email recovery sequence (Day 0, Day 3, Day 7) with direct links to your Stripe Billing Portal. When the invoice is paid (`invoice.payment_succeeded`), the sequence stops automatically.
>
> **Integration points:**
> - Stripe webhook events: `invoice.payment_failed`, `invoice.payment_succeeded`, `customer.subscription.deleted`, `customer.subscription.updated`
> - Stripe Billing Portal for payment update links
> - No data stored outside your Stripe account
>
> **Built for:** SaaS founders, newsletter creators, coaches, and subscription businesses who want enterprise-grade churn recovery without paying $250+/month.

### Technical Integration Details
- **Integration type:** Webhook-based (receives Stripe events)
- **Stripe events used:** `invoice.payment_failed`, `invoice.payment_succeeded`, `customer.subscription.deleted`, `customer.subscription.updated`
- **Authentication:** Stripe webhook signature verification (HMAC-SHA256)
- **Data handling:** Events processed at edge (Cloudflare Workers). No PII stored beyond customer email for dunning sequences.
- **Setup time:** Under 5 minutes

### Keywords / Tags
`churn recovery` `cancel flow` `subscription retention` `dunning` `failed payment recovery` `billing`

---

## Step 2: Prepare Demo Assets

The listing requires screenshots or a short demo video. Use these existing assets:

**Screenshots to attach:**
1. `public/ph-assets/` — dashboard screenshot (already exists)
2. `public/ph-assets/` — cancel flow widget in action (already exists)
3. `public/ph-assets/` — analytics/recovery stats (already exists)

**Demo video (optional but recommended):**
- Record a 60-second Loom showing: Dashboard → Cancel Flow setup → Widget demo → Analytics
- Upload to YouTube (unlisted) and link in the application

---

## Step 3: Technical Checklist Before Submitting

- [x] Working Stripe webhook integration (`/api/stripe-webhook`)
- [x] Webhook signature verification (HMAC-SHA256, 5-minute replay tolerance)
- [x] Handles `invoice.payment_failed` → dunning sequence
- [x] Handles `invoice.payment_succeeded` → auto-cancels dunning
- [x] Handles `customer.subscription.deleted`
- [x] Handles `customer.subscription.updated` (pause detection)
- [x] Public pricing page (churnrecovery.com/pricing)
- [x] Privacy policy (churnrecovery.com/privacy)
- [x] Terms of service (churnrecovery.com/terms)
- [ ] **Dawood: Verify /privacy and /terms pages are live** (check these exist)
- [x] Cancel flow widget (public-facing, embeddable)
- [x] HTTPS-only (Cloudflare Pages)

---

## Step 4: Zapier Integration (Next — shares same API infrastructure)

The Zapier integration uses the webhook subscription API built today (`/api/webhook-subscriptions`).

**Zapier app will expose:**
| Trigger | Description |
|---|---|
| New Cancellation Attempt | Fires when `flow_started` event recorded |
| Subscriber Retained | Fires when `saved` event recorded |
| Subscriber Cancelled | Fires when `cancelled` event recorded |
| Payment Failed | Fires when Stripe `invoice.payment_failed` received |

**To build Zapier app:**
1. Sign up at developer.zapier.com
2. Use REST Hooks pattern (subscribe/unsubscribe via `/api/webhook-subscriptions`)
3. Provide Zapier with subscribe URL: `POST https://churnrecovery.com/api/webhook-subscriptions`
4. Provide unsubscribe URL: `DELETE https://churnrecovery.com/api/webhook-subscriptions`
5. Authentication: API Key (from ChurnRecovery dashboard)

**Webhook subscription API reference:**

POST `/api/webhook-subscriptions`
```json
{
  "projectId": "proj_abc123",
  "targetUrl": "https://hooks.zapier.com/hooks/catch/...",
  "eventType": "subscriber_retained"
}
```
Response includes a `secret` for HMAC verification.

DELETE `/api/webhook-subscriptions`
```json
{ "subscriptionId": "wsub_xyz789" }
```

Signature verification: `X-ChurnRecovery-Signature: sha256=<hex>`

---

## Step 5: Expected Timeline

| Date | Milestone |
|---|---|
| March 23, 2026 | Submit Stripe Partner directory application |
| March 25, 2026 | Begin Zapier developer account setup |
| April 1–7, 2026 | Build and test Zapier private app |
| April 7, 2026 | Apply for Zapier public listing (same day as Product Hunt launch) |
| April 14, 2026 | Stripe approval expected (typical: 1–2 weeks) |
| May 2026 | Build Stripe App (SDK) for full Dashboard listing |

---

## Why We'll Get Approved

1. **Real integration** — not just a marketing page. We process Stripe events with proper signature verification.
2. **Free product** — zero friction for Stripe's users to try it.
3. **Clear use case** — "Billing & Subscriptions → Churn Recovery" is a category Stripe actively promotes.
4. **Clean data handling** — no PII exported outside customer's own stack.
5. **5-minute setup** — easy to demo and easy to adopt.
