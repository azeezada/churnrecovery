---
title: "What Is Voluntary vs Involuntary Churn? (And How to Reduce Both)"
description: "Voluntary churn means a customer chose to leave. Involuntary churn means a payment failed and took them with it. Both cost you money — and both have different solutions. Here's how to handle each."
date: "2026-02-04"
tags: ["churn", "voluntary churn", "involuntary churn", "dunning", "stripe", "subscription"]
author: "ChurnRecovery Team"
readingTime: "5 min read"
---

If you run a subscription business, you're losing customers in two completely different ways — and most people only think about one of them.

**Voluntary churn** is when a customer decides to leave. They make a choice. They click cancel.

**Involuntary churn** is when a customer gets removed from your service even though they didn't choose to leave. Their payment failed — expired card, insufficient funds, bank block — and the subscription was canceled automatically.

Both types cost you real money. But the fixes are completely different. And if you're only focusing on one, you're leaving revenue on the table.

---

## Voluntary Churn: The Deliberate Exit

Voluntary churn is the one most business owners think about. A customer made a decision. They wanted out.

**Why it happens:**
- Price doesn't feel worth it anymore
- They're not using the product enough
- They found something better
- Life circumstances changed (budget cuts, personal situation, etc.)
- They achieved their goal and don't need the service anymore

**Why it matters:**
Every voluntary cancellation represents a customer who was reachable. They were logged in. They clicked a button. They had a thought process that led to that moment.

That moment — right before they cancel — is the highest-leverage point in your entire customer relationship. It's the moment when they're most likely to respond to a relevant offer.

**How to reduce voluntary churn:**
The primary tool is a **cancel flow**: a screen that appears between "I want to cancel" and "you're canceled." A good cancel flow asks why the customer is leaving and makes a relevant offer — pause the subscription, apply a discount, switch plans.

Cancel flows typically save 15–35% of voluntary cancellations. Not by tricking anyone, but by giving fence-sitters a reason to stay and giving you information about why people are leaving.

You can [use our churn rate calculator](/tools/churn-rate-calculator) to see how much voluntary churn is costing you per month.

---

## Involuntary Churn: The Accidental Exit

Involuntary churn is sneaky because the customer never chose to leave. They didn't click cancel. They just... disappeared.

This happens when:
- A customer's credit card expired and they forgot to update it
- Their bank flagged the charge as suspicious
- They got a new card after a fraud incident
- Their card had insufficient funds on billing day
- A corporate card was replaced or closed

The customer still wants your service. They just don't know their payment failed.

**How much involuntary churn is typical?**
Industry estimates suggest involuntary churn accounts for **20–40% of all subscription cancellations**. For some businesses, it's even higher. This isn't edge-case stuff — it's a major revenue hole that most subscription businesses don't measure separately.

**Why it's underestimated:**
Payment failure data is buried in your payment processor dashboard. Most business owners see a cancellation in their subscriber count and assume the customer left deliberately. The payment failure story is invisible unless you go looking for it.

**How to reduce involuntary churn:**
The primary tool is **dunning management**: automatically retrying failed payments, sending smart reminder emails, and giving customers easy ways to update their payment method.

Stripe has built-in smart retry logic that automatically retries failed payments at optimal intervals. Enabling Stripe's retry settings and configuring reminder emails can recover 30–60% of failed payments before the customer ever realizes there was a problem.

---

## Voluntary vs Involuntary Churn: Side-by-Side

| | Voluntary Churn | Involuntary Churn |
|---|---|---|
| **Cause** | Customer made a choice | Payment failed |
| **Customer awareness** | High — they clicked cancel | Low — often don't know |
| **Fix** | Cancel flow | Dunning management |
| **Timing** | At cancellation | Before/after failed payment |
| **Save rate** | 15–35% with cancel flow | 30–60% with smart retry |
| **Data value** | High (why people leave) | Medium (card failure data) |

---

## How to Calculate Your Churn Rate by Type

To get a handle on your numbers, you need to separate voluntary and involuntary cancellations in your data.

**Step 1:** Pull your cancellations from your billing system for the last 3 months.

**Step 2:** Filter for cancellations that were initiated by the customer vs. triggered by payment failure (most billing systems tag these differently).

**Step 3:** Calculate each separately:
- **Voluntary churn rate** = voluntary cancellations ÷ total active subscribers × 100
- **Involuntary churn rate** = payment failure cancellations ÷ total active subscribers × 100

If you're using Stripe, you can find this in the Stripe dashboard under Billing → Customers, filtered by cancellation reason.

Use our [free churn rate calculator](/tools/churn-rate-calculator) to see the total annual revenue impact of your combined churn rate.

---

## Most Subscription Businesses Only Fix One

The pattern we see most often:

Business owners who've thought about retention usually have either a cancel flow *or* dunning emails — rarely both. And businesses new to retention often have neither.

If you only have a cancel flow:
- You're recovering voluntary churners but losing involuntary ones
- Potentially leaving 20–40% of your recoverable revenue untouched

If you only have dunning emails:
- You're catching failed payments but not addressing deliberate cancels
- Missing the highest-leverage retention moment in the customer journey

If you have both:
- You're working every recoverable churn scenario
- Your "true" churn rate is whatever's left after deliberate, irrecoverable decisions

---

## How ChurnRecovery Handles Both

ChurnRecovery connects to Stripe via webhook and addresses both types of churn in one place.

**For voluntary churn:**
When a customer initiates a cancellation through your platform, ChurnRecovery serves a custom cancel flow before the cancellation is finalized. You choose the questions and offers. Saves typically run 15–35%.

**For involuntary churn:**
ChurnRecovery monitors payment failure events and can trigger automated recovery sequences — retry notifications, update-card emails, and pause offers for customers who've hit a temporary cash-flow issue.

Both use the same Stripe connection. Setup is under an hour for the basic configuration.

---

## Where to Start

If you've never addressed churn directly, here's the priority order:

1. **Calculate your total churn rate** — [use the calculator](/tools/churn-rate-calculator)
2. **Find out your voluntary vs. involuntary split** — pull the last 90 days from your billing system
3. **Set up Stripe's smart retry** — if you're on Stripe, this is free and takes 5 minutes
4. **Add a cancel flow** — this is where the biggest saves come from for most businesses

You don't need to solve everything at once. Even addressing one type of churn meaningfully moves your monthly revenue.

---

**Ready to stop losing subscribers — both kinds?**

[Book a free demo →](/demo) and we'll walk through your specific setup, look at your churn data together, and show you exactly what ChurnRecovery would do for your numbers.

Also see: [Involuntary Churn Recovery Guide →](/posts/Involuntary-Churn-Recovery) and [Payment Failure Recovery →](/posts/Payment-Failure-Recovery)

---

## Fix Churn on Your Platform

- [ChurnRecovery for Stripe businesses](/for/stripe)
- [ChurnRecovery for Chargebee](/for/chargebee)
- [ChurnRecovery for Kajabi](/for/kajabi)
