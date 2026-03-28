---
title: "How to Set Up a Cancel Flow for Your WooCommerce Subscription Site"
description: "Step-by-step guide to adding a cancel flow to your WooCommerce + Stripe subscription site. No coding required. Reduce churn and find out exactly why customers are leaving."
date: "2026-03-12"
tags: ["woocommerce", "wordpress", "subscriptions", "cancel flow", "stripe", "tutorial"]
author: "ChurnRecovery Team"
readingTime: "6 min read"
---

WooCommerce is one of the most powerful platforms for selling subscriptions on WordPress. The plugin ecosystem is massive, the flexibility is unmatched, and you own everything.

But there's one thing WooCommerce doesn't give you out of the box: a cancel flow.

When a subscriber wants to cancel, WooCommerce Subscriptions lets them do exactly that — no questions, no offers, no second chance. They click cancel, and they're gone.

This guide walks you through adding a cancel flow to your WooCommerce subscription site using ChurnRecovery and Stripe. No coding required. No developer needed. You can be live by the end of today.

---

## What Is a Cancel Flow and Why Does WooCommerce Need One?

A cancel flow is the screen that appears when someone is about to cancel a subscription — before the cancellation actually happens.

Instead of an immediate "you're canceled" message, the customer sees:
- A question asking why they're leaving
- An offer tailored to their reason (pause, discount, swap plan, etc.)
- A clear choice to proceed or stay

Done well, a cancel flow saves 15–35% of would-be cancellations. These aren't customers you convinced against their will — they were genuinely on the fence, and a relevant offer gave them a reason to stay.

WooCommerce Subscriptions has no native cancel flow. You either build one yourself (requires a developer) or you use a tool built for this.

---

## What You'll Need Before You Start

This setup requires:
- **WooCommerce** with **WooCommerce Subscriptions** installed
- **Stripe** as your payment gateway (via the WooCommerce Stripe plugin)
- A **ChurnRecovery account** ($20/month with 30-day free trial, [see plans](/for/wordpress))

If you're using PayPal, Braintree, or another processor instead of Stripe, the ChurnRecovery Stripe integration won't apply directly — contact us and we'll walk through your options.

Most WooCommerce subscription setups do use Stripe, since it's by far the most common processor for WooCommerce merchants. If you're not sure, check your WooCommerce → Settings → Payments screen.

---

## Step 1: Connect Stripe to ChurnRecovery

ChurnRecovery works by connecting to your Stripe account and intercepting cancellation events before they're finalized. Here's how to connect:

1. Sign up at ChurnRecovery (free)
2. In your dashboard, go to **Settings → Payment Processors**
3. Click **Connect Stripe**
4. You'll be redirected to Stripe's authorization page — log in with your Stripe account and authorize the connection
5. ChurnRecovery will pull in your active subscription products automatically

This connection uses Stripe's official OAuth flow. ChurnRecovery never stores your Stripe secret keys.

**What happens after you connect:**
ChurnRecovery listens for `customer.subscription.deleted` and `customer.subscription.updated` webhook events from Stripe. When a cancellation is initiated, ChurnRecovery intercepts it and serves your cancel flow before the cancellation is processed.

---

## Step 2: Build Your Cancel Flow

Once Stripe is connected, go to **Cancel Flows → Create New Flow** in your ChurnRecovery dashboard.

**Name your flow** (something like "WooCommerce Subscription Cancel Flow — Main")

**Step 2a: Add a cancellation reason question**

Pick a multiple-choice format. Good options for WooCommerce subscription stores:

- "It's too expensive right now"
- "I'm not using it enough"
- "I found a better option"
- "I only needed it for a short time"
- "Something else"

Keep it to 4–5 options. More choices leads to more friction, which actually *helps* here — but only up to a point.

**Step 2b: Set up offers per reason**

For each cancellation reason, you can configure a specific offer:

| Reason | Suggested Offer |
|--------|----------------|
| Too expensive | 20% off for 3 months, or pause for 30 days |
| Not using it enough | Pause for 60 days + reminder email |
| Found a better option | Plain "what would it take to stay?" message |
| Only needed short-term | Offer to pause or downgrade |

You don't have to create an offer for every reason. A plain "thank you for your feedback" screen with a "complete cancellation" button still gives you the data.

**Step 2c: Write your offer copy**

Keep it human. "Hey — before you go, can we help?" converts better than "WAIT! Don't cancel!"

A few copy tips:
- Be specific about what they're giving up ("You'll lose access to X and Y")
- Frame the pause as a benefit ("Take a break and come back when you're ready")
- Make the discount feel generous, not desperate ("Since you've been with us, here's 30% off for 3 months")

---

## Step 3: Connect the Flow to Your WooCommerce Products

In ChurnRecovery, go to your flow settings and select which Stripe subscription products it applies to. If you have multiple subscription tiers in WooCommerce, you can have different flows for each.

Common setup:
- One flow for your main subscription product
- A different (lighter) flow for annual subscribers (who are less price-sensitive)
- Skip the flow entirely for very low-value subscriptions where the save isn't worth the friction

Save your settings. The flow is now live.

---

## Step 4: Test the Flow End-to-End

Before you declare victory, test the whole experience:

1. Create a test subscription in your WooCommerce store using a Stripe test card
2. Log in as that test customer and attempt to cancel
3. Confirm the ChurnRecovery cancel flow appears
4. Walk through each option — does the offer appear? Does accepting the offer work?
5. Walk through to full cancellation — does the subscription actually cancel correctly?

This takes about 10 minutes and will catch any configuration issues before your real customers see them.

---

## Step 5: Monitor Your Save Rate

ChurnRecovery's dashboard shows you:
- How many subscribers saw the cancel flow
- How many clicked through each offer
- How many accepted an offer vs. canceled anyway
- The revenue saved per week/month

The save rate data usually takes 2–4 weeks to become meaningful (you need enough volume). But the cancellation reason data starts being useful immediately.

**What to look for:**
- If "too expensive" is the top reason, test a lower discount threshold
- If "not using it enough" dominates, that's a product/onboarding issue (not a cancel flow issue)
- If "found a better option" is high, that's a competitive positioning question

---

## What Results Should You Expect?

WooCommerce subscription stores using cancel flows typically see:

- **10–25% of cancellation attempts saved** with a basic flow (single offer, no personalization)
- **20–40% saved** with a well-tuned flow (multiple offers, reason-based personalization)

For a store with 200 subscribers at $49/month and 5% monthly churn (10 cancellations/month):
- 10 monthly cancellations × average 15-month remaining lifetime × $49 = ~$7,350 monthly churn impact
- Saving 20% of those (2 customers/month) = ~$1,470/month recovered
- That's over **$17,000/year from a setup that took you an afternoon**

---

## Ready to Get Started?

If you're running a WooCommerce subscription site on Stripe, a cancel flow is the highest-ROI retention tool you can add today.

[See how ChurnRecovery works for WordPress →](/for/wordpress)

Or [join the waitlist](/waitlist) to get early access and we'll walk you through the setup personally.

Also worth reading: [What Is a Cancel Flow? →](/posts/what-is-a-cancel-flow) and [Stripe Subscription Cancellations: How to Stop Them →](/posts/stripe-subscription-cancellations-how-to-stop-them)
