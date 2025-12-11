---
title: "Subscription Revenue"
date: "2025-12-10"
excerpt: "Protecting the Asset (Intentional vs. Unintentional Churn)"
---

Subscription Revenue: Protecting the Asset (Intentional vs. Unintentional Churn)
Appreciate the comments and questions on the last note. It helps keep the momentum up.

There was a lot of context in Post #1 that I’m not going to rehash here. I’d suggest reading that first if you want the full picture of the framework.

We are working from the bottom up in this funnel. This guide is a best fit for "steady state" products that are live and monetized; the best practices here are pretty established and we aren't dealing with a lot of product development unknowns.

And frankly, you likely spent a lot of capital on marketing or product dev to get these paying users. The highest ROI work you can do right now is setting up the basics to ensure you don't lose them. Especially for preventable reasons. It’s just basic asset management.

There are two scenarios where people leave your product. They need to be handled differently:

Intentional Churn: Someone actively canceling.

Unintentional Churn: A technical problem breaks the service (usually payment-related).

Before we go down the rabbit hole; a few lessons I learned the hard way.

The best way to decrease churn is by building a better product. Once someone has decided to cancel, it's very hard to change their mind. You should implement all the best practices here, but don't get lost in the weeds. The product itself is the asset that matters.

Depending on the use case, there will be an unavoidable "natural" churn. Most users won't stay around longer than the problem exists for them.

INTENTIONAL CHURN
This is where the user actively cancels. I look at this in two sub-categories: Happy churn and Unhappy churn.

"Happy" churn is when the user utilizes your product to solve a problem, the product works, and they leave satisfied.

A good example is an interview prep product. A user came to you to prep for an interview; they got the job. They don't need your product anymore. There isn't a lot you can do for this user in the short term. The best move is to make cancellation easy so they remember the experience fondly. You want them to recommend it to their friends.

Try to capture reviews on the way out. Make re-activation easy if their need reoccurs.

Long term, you can build secondary products that keep them engaged until they have the problem again. In the interview example, maybe a salary monitoring tool. But how to do that is a different topic. I would focus on making your main product cash flow as much as possible first.

"Unhappy" churn is where something went wrong.

There are basically two steps here.

1. Get good at understanding why they are leaving.

Many companies have a cancellation survey. But the key is ensuring you have the full universe of reasons that a customer is actually leaving. If the data isn't accurate, it's useless.

There is a high likelihood that your guesses for why they are leaving are wrong.

The best way to find the truth is by starting with an open-ended text field. Manually compile this every month. Once you see a consistent grouping of answers, build a multiple-choice quiz at the end. I suggest you always keep an open-ended question in there; reasons evolve.

2. Once you understand the "why," see if there is a mitigating step.

You can take action right before cancellation within that survey:

"I am too busy right now" -> Can they pause their subscription and auto-restart in 1, 2, or 3 months?

"Your product costs too much" -> Can you discount the next two months and then revert to full price?

"I had technical problems" -> Can you book the user time with a support team to get this fixed?

"I no longer need X feature" -> Can you down-sell them to a cheaper plan that only has what they need?

The NY Times runs this version of the cancellation flow. It’s unclear from the outside if it’s working, but I suspect it is. Needless to say, make sure you're using this data in your product roadmaps to fix anything fixable.

UNINTENTIONAL CHURN
This is when something breaks and users can't use the service anymore. In the subscription world, this is almost always payment failures.

The more individual transactions that make up your revenue base, the more payment failures become a problem. But also a big opportunity.

These are scenarios like:

Cards don't have enough balance.

Credit cards expire and don't get updated.

APIs time out before transactions get completed.

Fraud detection models throw a false positive and block a legitimate transaction.

Payments are the most boring place to work. But it's practical. There is literally no user intent to manage here; people are trying to pay you money. You just have to collect it.

Every failing payment you don't save is a user who might have stayed for two more years. The upside is hard to measure but it's definitely there to be captured.

If you’ve ever bought something on Amazon and got an email 20 minutes later saying you need to update your payment method, you are seeing this at work. They are likely trying your card through multiple processing systems to maximize the chance the transaction goes through. At their scale, this adds up to hundreds of millions of dollars.

There are a few major levers you can pull here.

Systematically re-trying failed cards (Dunning)

This is a feature you can enable in most subscription management platforms like Stripe. Most platforms have an algorithm that will do things like waiting a few days to recharge, or guessing a new expiration date if the card expired.

We got some advice to set this up early. It paid off. Eventually, this was winning back hundreds of thousands of dollars a month.

"Update Your Payment" messaging

The best implementation has as little friction as possible. Don't force the user to log back in to do it; especially if they open emails on their phone. Ideally, the product itself shows a user they need to update payments.

If you can get them to add a secondary payment method as a backup, that helps de-risk the transaction significantly.

Testing new payment gateway combinations

If you watch companies evolve, they use many different payment gateways as they grow.

Of all the areas in this guide, this is the deepest and the place where my understanding is shallowest. Take that into account. The overall goal is to prevent false positives in the risk models banks use.

These models take inputs like your location, user location, legal entity, etc. No one can really tell you the right combination for your business. But some processors are generally accepted to be more effective in certain countries.

We got guidance to set up legal entities in countries we were focused on and update the providers. We couldn't A/B test this so it's tough to say if it worked. We didn't get statistically significant results when we split-test processors at around 50M in ARR; this is likely a move that happens after that stage.

But using at least two payment processors is a good idea. One will inevitably go down. They all claim 99.99% uptime, but across a long enough timeline, you'll have outages. You might as well not lose that money.

Hope that helps. More than happy to answer any questions.

Next time I'll be covering ways of extending LTV for active users.