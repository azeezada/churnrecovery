# Next Batch of /for/ Creator Pages

**Research date:** 2026-03-21  
**Already live:** /for/substack, /for/kajabi, /for/teachable, /for/ghost, /for/podia, /for/thinkific, /for/circle, /for/patreon, /for/beehiiv, /for/convertkit

---

## Candidate Analysis

> **Filter rule**: Only include platforms where creators have direct Stripe access (we can intercept webhooks). Merchant-of-Record platforms (Gumroad, Lemon Squeezy, Whop) are excluded — creators don't own the Stripe account, so ChurnRecovery can't help them.

---

### 🔴 Excluded: Merchant-of-Record Platforms (No Direct Stripe)

| Platform | Why Excluded |
|---|---|
| **Gumroad** | Acts as MoR. Creators receive payouts; they don't own a Stripe account. No webhook access possible. |
| **Lemon Squeezy** | MoR (acquired by Stripe but runs independently). Creators don't have direct Stripe. |
| **Whop** | Proprietary payment stack, 100+ payment methods. Not Stripe. |

These three represent a huge market (17k Gumroad stores, 27k+ Whop businesses, countless LS users) — but ChurnRecovery fundamentally can't help them today. Consider this a **product opportunity**: build a non-Stripe integration path later. Note it in WORKQUEUE.md.

---

## Included Candidates (Stripe Compatible)

### 1. Memberful
- **Audience size**: Thousands of independent publishers, podcast creators, newsletter writers, and community builders. Used by major independent media (The Dirtbag Left, Reply All alums, etc.)
- **Payment handling**: **Stripe-required**. Memberful connects directly to the creator's Stripe account. All subscription payments and dunning go through creator-owned Stripe. ✅
- **Specific churn pain**: Memberful has basic cancellation surveys but no cancel flow interception (pause offer, discount offer). Failed payment recovery relies on generic Stripe dunning — no branded touch. Podcast creators especially are hit by seasonal churn (show goes on break, people cancel).
- **Priority**: **1** (highest)
- **Key angle**: "Memberful sends Stripe dunning emails — but they're from Stripe, not from you. ChurnRecovery intercepts before the cancel and offers your subscriber a pause or deal — in your voice."

---

### 2. Stan Store
- **Audience size**: **80,000+ creators** (TikTok, Instagram, YouTube creators, coaches, solopreneurs). $200M paid out to creators in 2024. 11,000+ creators earned first $1,000 on Stan.
- **Payment handling**: Stripe-integrated (Creator Pro plan: no Stan transaction fee, just Stripe's 2.9% + $0.30). Also supports PayPal. Creators connect their own Stripe. ✅
- **Specific churn pain**: Stan Store creators sell digital subscriptions and coaching packages. When a subscriber hits "cancel," there's no retention flow — they just leave. These are often impulse cancels after a bad week. A pause offer or "let's check in" flow saves a huge % of them.
- **Priority**: **2**
- **Key angle**: "Your Stan Store subscribers cancel because life got busy — not because they don't love your content. ChurnRecovery gives them a pause option before they go."

---

### 3. Payhip
- **Audience size**: 130,000+ sellers (digital products, courses, memberships, coaching). Strong in UK + EU creator market.
- **Payment handling**: Connects creator's own Stripe or PayPal account for checkout. Creators own their Stripe. ✅
- **Specific churn pain**: Payhip is often used for subscription-based digital products (courses, templates, community access). No built-in dunning or cancel flow — when a payment fails or someone cancels, the creator finds out after the fact in Stripe's dashboard.
- **Priority**: **3**
- **Key angle**: "Payhip doesn't do retention. ChurnRecovery does — automatic dunning emails and a cancel flow that offers deals, in your brand, saving subscribers before they're gone."

---

### 4. Glow.fm
- **Audience size**: Podcast monetization niche. Smaller (thousands, not tens of thousands). Used by podcast creators for paid subscriptions and supporter tiers.
- **Payment handling**: Glow processes payments via Stripe but as a managed service — **unclear if creators own the Stripe account directly**. Likely partial access only. ⚠️
- **Specific churn pain**: Podcast listener churn is seasonal and high. When a show goes on hiatus, listeners cancel. A "pause for 3 months" option would save most of them.
- **Priority**: **4** (deprioritize until payment model is confirmed)
- **Key angle**: "Podcast supporters cancel between seasons. Give them a pause instead of a goodbye."

---

### 5. Transistor.fm
- **Audience size**: 20,000+ podcasters. Well-known in independent podcast community.
- **Payment handling**: Transistor billing is Transistor-native (creators pay Transistor for hosting). For private podcast monetization, they don't offer a native subscription billing layer with direct Stripe access. ❌
- **Specific churn pain**: Private podcasts churn when listeners lose interest or cost-cut. But without direct Stripe access, ChurnRecovery can't plug in.
- **Priority**: **5** (skip for now — no direct Stripe path)
- **Note**: If Transistor adds creator-owned Stripe billing, this becomes a priority immediately.

---

## Top 3 Pages to Build

### Page 1: /for/memberful

**Target**: Independent publishers, newsletter writers, podcast creators, community builders using Memberful

**Headline**: "Stop losing Memberful members to failed payments and impulse cancels"

**Key sections**:
1. **Hero**: "Memberful connects to your Stripe — and so does ChurnRecovery. When a payment fails or a member clicks cancel, we intercept with smart recovery flows — in your brand, not Stripe's."
2. **The problem**: Memberful sends a cancellation survey but no retention offer. Subscribers who'd pause for $0 instead cancel for good because no one offered them a choice.
3. **How it works** (Memberful-specific):
   - Connect your Stripe (same one Memberful uses) in 2 minutes
   - Failed payments: automatic dunning email series, branded, not Stripe's generic email
   - Cancel flow: Memberful triggers a cancel → ChurnRecovery intercepts → offer pause or discount
4. **Social proof**: Quote from newsletter or podcast creator
5. **FAQ**:
   - "Does this work with Memberful's cancellation survey?" → Yes, it works alongside it
   - "Do I need to change anything in Memberful?" → No, connects via Stripe
6. **CTA**: "Join Waitlist — Works with Memberful"

**Design accent color**: Memberful's brand purple (#6C47FF or similar)

---

### Page 2: /for/stan-store

**Target**: TikTok/Instagram/YouTube creators, coaches, and solopreneurs on Stan Store

**Headline**: "Your Stan Store subscribers don't want to leave — they just need a reason to stay"

**Key sections**:
1. **Hero**: "When a Stan subscriber hits cancel, they're usually having a rough week — not actually done with you. ChurnRecovery gives them a pause, a deal, or a check-in instead of a goodbye."
2. **The problem**: Stan's amazing at converting followers into subscribers. But it has no cancel flow. A subscriber who pays $29/mo for your coaching content just cancels with one click — and you lose them forever.
3. **Relatable scenarios**:
   - "They were going to cancel because money was tight — a 1-month pause saved them"
   - "They forgot what they were paying for — a personal check-in from you brought them back"
4. **How it works**: Connect your Stripe account (the same one Stan uses) → ChurnRecovery adds a cancel flow → offer pause or discount → they stay
5. **Creator testimonial** (social proof)
6. **FAQ**:
   - "Does this work with Stan's Creator Pro?" → Yes, same Stripe account
   - "Do my subscribers have to do anything different?" → No, they see a branded flow before they leave
7. **CTA**: "Try ChurnRecovery Free — Works with Stan Store"

**Design accent color**: Stan's gradient pink/purple (#FF5C8D or similar)

---

### Page 3: /for/payhip

**Target**: Digital product sellers, course creators, and membership site owners on Payhip

**Headline**: "Payhip doesn't do retention. We do."

**Key sections**:
1. **Hero**: "Payhip is great for selling. But when a subscriber's card fails or they click cancel, you're on your own. ChurnRecovery handles the awkward recovery so you don't lose a subscriber you already earned."
2. **The problem**: Payhip sellers find out about failed payments after Stripe has already tried 3+ times and given up. By then, the subscriber thinks they cancelled — but you've lost weeks of payment attempts and the subscriber feels abandoned.
3. **What ChurnRecovery adds**:
   - First failed payment → branded email from you ("Hey, looks like there was a hiccup with your payment")
   - Cancel attempt → interception with pause/discount offer
   - Recovered subscriber → continues as normal in Payhip
4. **Stats**: 5–10% of subscriptions fail monthly, ~70% are recoverable with proper dunning
5. **FAQ**:
   - "Do I need to change how I use Payhip?" → No, just connect your Stripe
   - "What if I use PayPal through Payhip?" → PayPal isn't supported yet, Stripe only
6. **CTA**: "Join Waitlist — Free for Payhip Sellers"

**Design accent color**: Payhip blue (#4B88FF or similar)

---

## Implementation Notes

- All three pages follow the same component structure as existing `/for/` pages
- Each page should have its own waitlist form tag: `memberful-creator`, `stan-store-creator`, `payhip-seller`
- Add internal links from the relevant blog posts and comparison pages
- Add these to sitemap after deploy
- Add UTM parameters: `?utm_source=for-page&utm_medium=organic&utm_campaign=memberful` etc.

## Build Order
1. /for/memberful (highest priority — Stripe-required, strong brand name)
2. /for/stan-store (largest audience)
3. /for/payhip (international appeal, digital product niche)

## Excluded from This Batch
- Gumroad, Lemon Squeezy, Whop: No direct Stripe (MoR platforms)
- Transistor.fm: No native creator billing via Stripe
- Glow.fm: Deprioritized until payment model confirmed

## Future Product Opportunity
Build a **non-Stripe** integration path (webhook from Gumroad/LS payout events, or browser-based cancel flow injection) to unlock the MoR creator market. This is a large untapped segment.
