# Integration Marketplace Strategy — ChurnRecovery

**Goal:** Get ChurnRecovery listed in the marketplaces where our target customers (Stripe users, small SaaS founders, newsletter creators) already discover tools. Each listing is a passive, compounding distribution channel.

**Priority order:** Stripe → Zapier → Make.com → Paddle

---

## Why Marketplace Listings Matter

- **Stripe App Marketplace:** ~4M active Stripe users. If they're looking for churn tools, they'll find Stripe-native solutions first.
- **Zapier:** ~2M active users building automations. Our audience (non-technical business owners) lives here.
- **Make.com:** 500K+ users, more technical than Zapier but growing fast.
- **Paddle:** Smaller but highly relevant — their customers are exactly our target (SaaS, subscriptions).

---

## 1. Stripe App Marketplace

### What It Is
Stripe's App Marketplace lists third-party apps that integrate natively with the Stripe Dashboard. Users discover, install, and connect apps without leaving Stripe.

### Why This Is Priority #1
Our audience already uses Stripe. They're looking at Stripe's ecosystem first. A Stripe App listing means discovery at the exact moment they're thinking about their subscription business — not a random Google search.

### Two Paths: App Listing vs. Partner Page

**Stripe App (Dashboard Extension):**
- Built using Stripe Apps SDK
- Appears inside the Stripe Dashboard
- Requires building a UI extension (React components that run in Stripe's context)
- Higher technical bar, higher visibility, more trusted

**Partner Page (Directory Listing):**
- Simpler listing page on stripe.com/partners
- No SDK requirement — just API integration + approved listing
- Lower bar, still valuable for discovery

**Recommendation:** Apply for the Partner directory first (immediate) while building toward a full App listing (next 60–90 days).

### Requirements: Stripe Partner Directory

**Eligibility:**
- [ ] Active Stripe integration (webhooks, API — we have this)
- [ ] Public-facing product with pricing page
- [ ] Privacy policy and terms of service
- [ ] Supported use case: subscription management, churn recovery fits "Billing & Subscriptions"

**Application checklist:**
- [ ] Go to stripe.com/partners and click "Become a Partner"
- [ ] Select "Technology Partner" → "App / Integration"
- [ ] Complete the partner application form:
  - Company name: ChurnRecovery
  - Integration type: Webhook-based (subscription cancellation events, payment failure events)
  - Use case: Churn recovery, cancel flow optimization, failed payment recovery
  - Customer type: Small businesses, newsletter creators, SaaS founders
- [ ] Attach: demo video or screenshots of Stripe integration in action
- [ ] Integration description (see copy below)

### Requirements: Stripe App Marketplace (Full App)

**Technical requirements:**
- [ ] Built with Stripe Apps SDK (React-based UI extensions)
- [ ] App must run inside Stripe Dashboard
- [ ] Must pass Stripe's security review
- [ ] Must handle OAuth-based installation flow
- [ ] Must follow Stripe Apps UX guidelines

**Application steps:**
1. [ ] Install Stripe Apps CLI: `stripe apps create`
2. [ ] Build UI extension (dashboard widget showing recovery stats)
3. [ ] Submit for review at stripe.com/docs/stripe-apps/submit
4. [ ] Pass security review (typically 2–4 weeks)
5. [ ] Go live in App Marketplace

**Estimated timeline:** 60–90 days for full App listing

### ChurnRecovery Copy for Stripe Listing

**Tagline:** Stop losing subscribers at the cancel button — affordable churn recovery for Stripe users ($20/month)

**Description:**
> ChurnRecovery adds a smart cancel flow to your Stripe subscriptions in minutes. When a customer tries to cancel, we show them personalized retention offers — a pause, a discount, or a plan downgrade — instead of sending them straight to the exit. Failed payments are automatically retried with recovery emails. No code required. No monthly fees.
>
> Built for: SaaS founders, newsletter creators, and subscription businesses who want enterprise-grade churn recovery without enterprise pricing.

**Key integration points to highlight:**
- Stripe webhook events: `customer.subscription.deleted`, `invoice.payment_failed`
- No data stored outside Stripe
- 5-minute setup with Stripe Connect
- Real-time recovery analytics

---

## 2. Paddle Marketplace

### What It Is
Paddle's integration partner directory lists tools that work with Paddle's billing platform. Smaller than Stripe but Paddle's audience skews toward exactly our type of customer: software businesses, often bootstrapped, international-friendly.

### Requirements

**Eligibility:**
- [ ] Working integration with Paddle's API or webhooks
- [ ] Paddle is our secondary integration priority — build this after Stripe listing is live

**Paddle webhook events to handle:**
- `subscription_cancelled`
- `subscription_payment_failed`
- `subscription_payment_refunded`

**Application steps:**
1. [ ] Build Paddle webhook integration (parallel to Stripe, different event names)
2. [ ] Go to paddle.com/partners and apply as a Technology Partner
3. [ ] Complete partner form: company info, integration type, use case
4. [ ] Submit integration documentation showing webhook usage
5. [ ] Get listed in the Paddle Ecosystem directory

**Copy for Paddle:**
> ChurnRecovery helps Paddle merchants recover churning subscribers before they cancel. Add a smart retention flow to your subscription cancellation — offer pauses, discounts, and alternatives automatically. $20/month — affordable for any size.

**Timeline:** After Stripe Partner listing is approved (estimated +30 days)

---

## 3. Zapier Integration

### What It Is
Zapier lets non-technical users connect apps with "Zaps" (automated workflows). A public Zapier integration means ~2M users can build automations with ChurnRecovery as a trigger or action.

### Public App vs. Private App

**Private App:**
- Available only to you or people you invite
- No review required
- Good for internal testing or specific customers

**Public App (listed in Zapier marketplace):**
- Available to all Zapier users
- Requires Zapier's app review and approval
- Higher bar, much higher discoverability

**Recommendation:** Build private app first, test it, then apply for public listing.

### Technical Requirements for Public Zapier App

- [ ] REST API with authentication (OAuth 2.0 preferred, or API Key)
- [ ] At least 3 triggers or actions (Zapier requires multiple)
- [ ] Webhook support for real-time triggers
- [ ] Zapier app must pass their review process

**Proposed triggers/actions:**

| Trigger / Action | Description |
|---|---|
| **Trigger:** New Cancellation Attempt | Fires when a subscriber starts the cancel flow |
| **Trigger:** Subscriber Retained | Fires when a cancellation is recovered |
| **Trigger:** Payment Failed | Fires when a subscriber has a failed payment |
| **Action:** Tag Subscriber | Add a tag to a subscriber in ChurnRecovery |
| **Action:** Create Retention Offer | Programmatically create a retention offer |

**Application steps:**
1. [ ] Create Zapier developer account at developer.zapier.com
2. [ ] Build the integration using Zapier's Platform CLI or UI
3. [ ] Test with at least 2–3 real Zaps (internal testing)
4. [ ] Apply for public listing: developer.zapier.com → "Request Public Launch"
5. [ ] Complete Zapier's review checklist (documentation, branding, help text)
6. [ ] Zapier review typically takes 2–4 weeks

**Copy for Zapier listing:**
> **ChurnRecovery** connects your subscription business to your favorite tools when subscribers are at risk. Trigger automations when someone starts the cancel flow, gets retained, or has a payment fail. Add recovery subscribers to your CRM, send Slack alerts, update spreadsheets, or trigger email sequences — automatically.

**Timeline:** 45–60 days (API work + Zapier review)

---

## 4. Make.com (formerly Integromat)

### What It Is
Make.com is a workflow automation platform with 1,000+ integrations. More technical than Zapier, with a visual builder that supports complex multi-step automations. Popular with power users and agencies.

### Requirements

**Technical:**
- [ ] REST API (same as Zapier — shared API infrastructure)
- [ ] OAuth 2.0 or API Key authentication
- [ ] Webhook support for real-time triggers

**Application steps:**
1. [ ] Sign up at make.com/en/partners
2. [ ] Apply as an "App Partner"
3. [ ] Build Make app using their custom app builder (no-code/JSON-based)
4. [ ] Submit for review via partner program
5. [ ] Make.com review is typically faster than Zapier (1–2 weeks)

**Proposed modules:**

| Module Type | Name |
|---|---|
| Trigger | Watch Cancellation Attempts |
| Trigger | Watch Retained Subscribers |
| Action | Get Subscriber Details |
| Action | Add Tag to Subscriber |

**Copy for Make.com:**
> ChurnRecovery triggers powerful automations when subscribers are at risk of leaving. React instantly to cancellation attempts, payment failures, or successful retentions — sync data to your CRM, alert your team, or trigger drip campaigns.

**Timeline:** After Zapier API is built (shared infrastructure, +2 weeks)

---

## Priority Timeline

| Week | Milestone |
|---|---|
| Week 1 | Apply for Stripe Partner directory listing (no build required) |
| Week 2–4 | Build Zapier private app (using existing webhook infrastructure) |
| Week 4 | Apply for Zapier public listing |
| Week 5–6 | Build Paddle webhook integration |
| Week 6 | Apply for Paddle partner listing |
| Week 6–7 | Submit Make.com app (reuses Zapier API work) |
| Week 8–12 | Build Stripe App (SDK) for full Dashboard listing |

---

## ChurnRecovery-Specific Pitch: Why We're Marketplace-Worthy

**For Stripe:**
- Native Stripe integration (webhooks, Connect) — not a bolt-on
- We handle the exact use case Stripe's customers ask about most: "how do I reduce churn?"
- Free product means high adoption, no barrier to install
- Clean API, proper event handling, no data exported outside Stripe's ecosystem

**For Zapier/Make.com:**
- Non-technical business owners (our audience) are exactly who uses Zapier
- Cancel flow events are high-value triggers — when someone's about to leave, you want every tool in your stack to know
- Easy to build compelling "Zap templates" that market themselves: "When subscriber cancels → add to win-back email list"

**For Paddle:**
- Paddle's audience is international-first SaaS — they often lack good churn tooling
- We're the first free, purpose-built churn recovery tool to support Paddle

---

## Copy Bank: Marketplace-Ready Descriptions

**Short (50 words):**
> ChurnRecovery adds smart cancel flows to your subscription business. When subscribers try to cancel, show them personalized retention offers — pause, downgrade, discount. Recover churning subscribers automatically. $20/month with 30-day free trial. Built for small businesses.

**Medium (100 words):**
> ChurnRecovery helps subscription businesses and newsletter creators recover subscribers at the moment they decide to cancel. Add a no-code cancel flow to your Stripe or Paddle account: when someone clicks "cancel," they see targeted retention offers — a pause, a plan switch, or a discount — instead of an instant goodbye. Failed payments are handled with automated recovery emails. 
>
> Most churn recovery tools start at $250/month. ChurnRecovery is $20/month with a 30-day free trial. No hidden costs, no revenue share. Setup takes 5 minutes.

**Keywords:** churn recovery, cancel flow, subscription retention, failed payment recovery, churn tool, Stripe churn, newsletter churn
