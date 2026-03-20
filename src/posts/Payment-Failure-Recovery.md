---
title: "Payment Failure Recovery: A Technical Playbook"
date: "2026-03-19"
excerpt: "How to build a dunning system that actually recovers failed payments and keeps revenue flowing."
---

# Payment Failure Recovery: A Technical Playbook

In the [last post](/posts/Subscription-Revenue), we covered the two types of churn — intentional and unintentional. This time, we're going deeper on the unintentional side: **payment failures**.

If you're running a subscription business, failed payments are probably leaking more revenue than you think. Industry data suggests **5–10% of recurring charges fail** on any given billing cycle. Most of that is recoverable.

---

## The Anatomy of a Failed Payment

Not all failures are equal. Understanding the decline code is the first step to recovering the charge.

### Hard Declines
These are permanent. The card is stolen, the account is closed, or the bank has blocked the merchant entirely.

* **Do not retry.** You'll burn your retry budget and hurt your processor reputation.
* **Action:** Immediately notify the user and ask them to update their payment method.

### Soft Declines
These are temporary. Insufficient funds, processor timeout, or a rate limit hit.

* **Retry with a strategy.** The timing and frequency of retries matters enormously.
* **Action:** Implement smart dunning (see below).

---

## Building a Dunning System

"Dunning" is the process of systematically retrying failed payments and communicating with users about the failure. Here's what a good system looks like:

### 1. Retry Schedule
Don't retry immediately after a failure. The optimal pattern we've seen:

| Attempt | Timing | Why |
|---------|--------|-----|
| 1st retry | 24 hours later | Gives time for funds to clear |
| 2nd retry | 3 days later | Catches next-day deposits |
| 3rd retry | 7 days later | Aligns with weekly pay cycles |
| 4th retry | 14 days later | Last attempt before grace period ends |

### 2. Smart Retry Timing
Retry at the time of day when the original successful charge went through. If someone's card works at 9 AM on payday, retry at 9 AM.

### 3. Communication Sequence
Each retry should be paired with a user notification:

* **Day 0:** In-app banner + email: "Your payment failed. Update your card to keep access."
* **Day 3:** Push notification + email with a direct link to update payment.
* **Day 7:** Email from a real person (or one that looks like it). Empathetic tone.
* **Day 14:** Final warning. "Your account will be paused tomorrow."

---

## The Numbers That Matter

Track these metrics weekly:

* **Involuntary churn rate:** Failed payments that weren't recovered / total subscribers
* **Recovery rate:** Successfully retried payments / total failed payments
* **Time to recovery:** Average days between failure and successful retry

A good recovery rate is **40–60%**. If you're below 30%, your dunning system needs work. If you're above 60%, you're doing well — focus your energy elsewhere.

---

## Quick Wins

If you haven't done any of this yet, here's the priority order:

1. **Turn on Stripe's Smart Retries** (or equivalent). This alone can recover 10–15% of failures.
2. **Add a payment failure email** with a one-click update link. No login required.
3. **Show an in-app banner** when a payment is past due. Don't let users discover it by losing access.
4. **Ask for a backup payment method** during onboarding or after a successful first charge.

These four things take a week to implement and will meaningfully move your retention numbers.

---

**Next time:** We'll cover proactive retention — how to identify at-risk users before they even think about canceling.
