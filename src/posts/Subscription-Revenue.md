---
title: "Subscription Revenue: Protecting the Asset"
date: "2025-12-10"
excerpt: "A guide to managing Intentional vs. Unintentional Churn in subscription models."
tags: ["churn", "retention", "strategy"]
---

# Subscription Revenue: Protecting the Asset (Intentional vs. Unintentional Churn)

Appreciate the comments and questions on the last note. It helps keep the momentum up.

> **Note:** There was a lot of context in **Post #1** that I’m not going to rehash here. I’d suggest reading that first if you want the full picture of the framework.

We are working from the bottom up in this funnel. This guide is a best fit for **"steady state" products** that are live and monetized; the best practices here are pretty established and we aren't dealing with a lot of product development unknowns.

And frankly, you likely spent a lot of capital on marketing or product dev to get these paying users. The highest ROI work you can do right now is setting up the basics to ensure you don't lose them. Especially for preventable reasons. It’s just basic asset management.

There are two scenarios where people leave your product. They need to be handled differently:

1.  **Intentional Churn:** Someone actively canceling.
2.  **Unintentional Churn:** A technical problem breaks the service (usually payment-related).

---

## Before We Start: A Hard Lesson

Before we go down the rabbit hole, here is a lesson I learned the hard way:

> **The best way to decrease churn is by building a better product.**
>
> Once someone has decided to cancel, it's very hard to change their mind. You should implement all the best practices here, but don't get lost in the weeds. The product itself is the asset that matters.

Depending on the use case, there will be an unavoidable "natural" churn. Most users won't stay around longer than the problem exists for them.

---

## 1. Intentional Churn
This is where the user actively cancels. I look at this in two sub-categories: **Happy churn** and **Unhappy churn**.

### A. "Happy" Churn
This is when the user utilizes your product to solve a problem, the product works, and they leave satisfied.

* **Example:** An interview prep product. A user came to you to prep for an interview; they got the job. They don't need your product anymore.
* **Strategy:** There isn't a lot you can do for this user in the short term. The best move is to make cancellation easy so they remember the experience fondly. You want them to recommend it to their friends.

**Action items:**
* Try to capture reviews on the way out.
* Make re-activation easy if their need reoccurs.
* *Long term:* Build secondary products to extend LTV (e.g., a salary monitoring tool), but focus on cash flowing the main product first.

### B. "Unhappy" Churn
This is where something went wrong. There are basically two steps here.

#### Step 1: Understand why they are leaving
Many companies have a cancellation survey. But the key is ensuring you have the full universe of reasons. If the data isn't accurate, it's useless.

* **The Trap:** There is a high likelihood that your guesses for why they are leaving are wrong.
* **The Fix:** Start with an open-ended text field. Manually compile this every month. Once you see a consistent grouping of answers, build a multiple-choice quiz. *Always keep an "Other" open-ended option.*

#### Step 2: Mitigate based on the "Why"
Once you understand the reason, see if there is a mitigating step. You can take action right before cancellation within that survey:

* **"I am too busy right now"** $\rightarrow$ Offer to pause subscription and auto-restart in 1, 2, or 3 months.
* **"Your product costs too much"** $\rightarrow$ Discount the next two months, then revert to full price.
* **"I had technical problems"** $\rightarrow$ Book the user time with a support team to get this fixed.
* **"I no longer need X feature"** $\rightarrow$ Down-sell them to a cheaper plan that only has what they need.

> The *NY Times* runs this version of the cancellation flow. Needless to say, make sure you're using this data in your product roadmaps to fix anything fixable.

---

## 2. Unintentional Churn
This is when something breaks and users can't use the service anymore. In the subscription world, this is almost always **payment failures**.

The more individual transactions that make up your revenue base, the more payment failures become a problem. But this is also a big opportunity.

**Common Scenarios:**
* Cards don't have enough balance.
* Credit cards expire and don't get updated.
* APIs time out before transactions get completed.
* Fraud detection models throw a false positive and block a legitimate transaction.

Payments are the most boring place to work. But it's practical. There is literally no user intent to manage here; people are *trying* to pay you money. You just have to collect it.

> Every failing payment you don't save is a user who might have stayed for two more years.

### The Major Levers

#### 1. Systematically re-trying failed cards (Dunning)
This is a feature you can enable in most subscription management platforms like Stripe. Most platforms have an algorithm that will do things like waiting a few days to recharge, or guessing a new expiration date if the card expired.

* **Result:** We got advice to set this up early. Eventually, this was winning back hundreds of thousands of dollars a month.

#### 2. "Update Your Payment" messaging
The best implementation has as little friction as possible.
* Don't force the user to log back in to do it (especially on mobile).
* Ideally, the product itself shows a user they need to update payments.
* If you can get them to add a **secondary payment method** as a backup, that helps de-risk the transaction significantly.

#### 3. Testing new payment gateway combinations
Of all the areas in this guide, this is the deepest and the place where my understanding is shallowest. The overall goal is to prevent false positives in the risk models banks use.

These models take inputs like your location, user location, legal entity, etc.
* **Guidance:** Set up legal entities in countries you are focused on and update the providers.
* **Redundancy:** Using at least two payment processors is a good idea. One will inevitably go down. They all claim 99.99% uptime, but across a long enough timeline, you'll have outages.

---

Hope that helps. More than happy to answer any questions.

**Next time:** I'll be covering ways of extending LTV for active users.