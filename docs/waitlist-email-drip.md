# ChurnRecovery — Waitlist Email Drip Sequence

5-email sequence for waitlist subscribers. Tone: founder-to-founder, plain text, conversational. No marketing blast vibes.

**Integration note:** Waitlist signups are handled by `functions/api/waitlist/index.js` (POST endpoint). On successful signup (201 response), the API stores email + source in the D1 database. The email sequence should be triggered by your ESP (ConvertKit, Mailchimp, etc.) via webhook or periodic export from the DB. Tag subscribers with `source` field for segmentation.

---

## Email 1 — Immediate (send on signup)

**Subject A:** You're on the list — here's what ChurnRecovery actually does  
**Subject B:** Welcome to ChurnRecovery (the honest version)

**Preview text:** No sales pitch. Just what this is and why I built it.

---

Hey,

You just joined the ChurnRecovery waitlist — thank you.

I'm going to skip the usual "you're going to love this!" opener and just tell you what this actually is.

ChurnRecovery is churn recovery software for small subscription businesses. Newsletter creators, coaches, course sellers, indie founders — people running subscriptions where every subscriber matters.

Here's what it does:

**1. Cancel flows** — When a subscriber clicks "Cancel," they see a customizable offer instead of an immediate cancellation. A discount, a pause, a quick survey. Some will reconsider. You keep the subscriber, they get something they needed.

**2. Payment failure recovery** — When a payment fails (and it will — cards expire, limits hit), ChurnRecovery sends a sequence of recovery emails automatically. Most failed payments are involuntary. Most can be recovered with the right nudge at the right time.

**3. Churn analytics** — A dashboard that shows you who canceled, why, and what revenue you recovered. Simple numbers, no enterprise-grade complexity.

That's it. No complex setup, no 90-minute onboarding call, no enterprise contract.

And it's free.

I'll explain more about why it's free in a future email. The short answer: we think churn recovery tools should be accessible to businesses of every size, not just the ones that can afford $250/month for software.

We're letting early access in soon. I'll be in touch.

— The ChurnRecovery Team

---

## Email 2 — Day 2

**Subject A:** What churn is actually costing you (the math is bad)  
**Subject B:** Here's what happens when you don't have a cancel flow

**Preview text:** One canceled subscriber doesn't sound like much. Until you run the numbers.

---

Hey,

Quick math problem.

You have a newsletter. $10/month per subscriber. You have 500 paid subscribers.

That's $5,000/month in recurring revenue. Nice.

Your churn rate is 5% per month. (Industry average for newsletters is 3-8%, so this is realistic.)

That means 25 subscribers cancel every single month.

In a year: **300 subscribers churned. $3,000/month in recurring revenue lost.**

Now here's the part most people don't think about: if even 20% of those cancellations could have been prevented with a well-timed offer, that's 60 subscribers per year. $600/month in recovered revenue. **$7,200/year.**

That's the value sitting in your cancel button right now.

And it's not hypothetical. Cancel flows — those popups that show up when a user clicks "Cancel" — routinely recover 15-30% of attempted cancellations across subscription businesses of all sizes. The math above is conservative.

There's also the involuntary churn problem. 20-40% of subscription churn is involuntary — customers who *wanted* to stay but whose payment failed and didn't get recovered. Expired card. Hit limit. Bank flagged an unusual charge. They would have resubscribed if asked. Nobody asked.

Fixing both of these isn't complicated. It doesn't require an enterprise tool or a growth team. It requires a couple of automations that run in the background while you focus on everything else.

That's what ChurnRecovery does. More on the mechanics tomorrow.

— The ChurnRecovery Team

---

## Email 3 — Day 5

**Subject A:** How our cancel flows work (no tech jargon, I promise)  
**Subject B:** What happens when your subscriber clicks "Cancel"

**Preview text:** Here's the 60-second version of how this actually works.

---

Hey,

Let me show you what actually happens when ChurnRecovery is running.

A subscriber on your newsletter (or coaching program, or course membership) decides they want to cancel. They find the cancel button, click it.

**Without ChurnRecovery:** They're immediately canceled. Gone. You find out in your Stripe dashboard a day later. There was nothing you could do.

**With ChurnRecovery:** Before the cancellation goes through, they see a short screen. You control what it says. Some options people use:

- "Before you go — want to pause instead?" (subscribers who are overwhelmed often prefer a 30-day pause to a full cancel)
- "We'd love to keep you. Here's 50% off your next 3 months." (works best when you know the subscriber is price-sensitive)
- "Can you tell us why you're leaving?" (a quick 3-question survey — the feedback alone is valuable, and some people change their mind when asked to reflect)

If they take the offer: they stay. Revenue kept.  
If they decline: they cancel, same as before. No friction, no resentment.

You don't code this. You don't hire a developer. You fill in a form, pick your offer, and turn it on. The whole setup takes about 10 minutes.

The payment failure side works similarly. When a payment fails, ChurnRecovery sends a sequence of emails over 7 days — a gentle reminder, a "hey your card might need updating," a final notice. Each email is customizable with your voice. Most people recover within the first two emails.

That's the whole product. No complexity hidden somewhere. No features you have to pay extra to unlock.

— The ChurnRecovery Team

P.S. We're getting ready to open early access. If you have questions before then, just reply to this email.

---

## Email 4 — Day 10

**Subject A:** How a newsletter creator would actually use ChurnRecovery  
**Subject B:** "I almost hit pause on everything" — a story

**Preview text:** She almost shut down her paid newsletter. Here's what changed.

---

Hey,

Let me tell you about a scenario I hear a lot.

Sarah runs a paid newsletter. 400 subscribers at $12/month. It took her 18 months to build to that point — consistent publishing, word of mouth, one guest post that went viral.

Last December, she had a rough month. Life stuff. She published less. A few subscribers emailed asking where she'd been. And then, over two weeks, 34 subscribers canceled.

That's $408/month gone. In two weeks.

She almost shut the whole thing down. Decided the paid tier wasn't worth the pressure.

Here's what she didn't know: 12 of those 34 cancellations were failed payments. Cards that expired over the holidays. She didn't have dunning emails set up, so nobody was notified. Those subscribers probably would have updated their cards if asked. They just weren't asked.

Of the remaining 22 cancellations — real, intentional ones — she had no cancel flow. No offer to pause. No discount. No "why are you leaving?" survey. They clicked Cancel and were gone in 10 seconds.

She's not the exception. This is the default for most subscription businesses.

ChurnRecovery doesn't fix a bad newsletter or a quiet month. But it does mean that when someone tries to leave, you have one more conversation before they're gone. And for the ones who didn't really want to leave — just had a card expire, or needed a break, or needed a small price break — it means keeping them.

For Sarah, running the numbers: if a cancel flow had saved 5 of those 22 subscribers, and dunning emails had recovered 8 of the 12 failed payments — that's $156/month kept. $1,872/year. Not life-changing, but real.

Small subscription businesses lose thousands of dollars a year to problems with simple solutions. That's what we're trying to fix.

— The ChurnRecovery Team

---

## Email 5 — Day 14

**Subject A:** You're getting early access before everyone else  
**Subject B:** ChurnRecovery early access — you're in

**Preview text:** The waitlist is going live. Here's your link.

---

Hey,

We're opening early access, and you're first.

As a waitlist member, you get in before we announce publicly — which means no waitlist, no queue, no "we'll email you when your spot is ready."

You can set up ChurnRecovery right now:

👉 **[Claim your early access →](https://churnrecovery.com)**

What to expect when you get in:

**Setup takes 10-15 minutes.** Connect your Stripe account, customize your cancel flow offer, and turn on payment failure recovery emails. That's the whole process.

**It works immediately.** The next subscriber who tries to cancel will see your cancel flow. No waiting, no indexing delay, no "results in 30-60 days."

**It's free.** Early access is free. As we add premium features over time, I'll always tell you what's changing and give you advance notice. Nothing disappears without warning.

A few things I want to be honest about as we launch:

This is early software. It works well — we've tested it thoroughly — but there will be rough edges. If you hit something that doesn't work right, please email me directly. I read every message.

We're a small team building something we believe in. We're not trying to get acquired or raise a Series A. We're building a tool we wish had existed when we started our own subscription businesses, and we want it to be accessible to people like us.

If you have questions before setting up — about how it works, whether it fits your situation, anything — just reply to this email. No support ticket, no chat bot. Just me.

Go claim your spot: **[churnrecovery.com](https://churnrecovery.com)**

Thank you for being here from the beginning.

— The ChurnRecovery Team

---

## Sequence Summary

| # | Trigger | Subject (A) | Goal |
|---|---------|-------------|------|
| 1 | Immediate | You're on the list — here's what ChurnRecovery actually does | Orient, set expectations |
| 2 | Day 2 | What churn is actually costing you (the math is bad) | Establish problem urgency |
| 3 | Day 5 | How our cancel flows work (no tech jargon, I promise) | Explain product mechanics |
| 4 | Day 10 | How a newsletter creator would actually use ChurnRecovery | Make it concrete/relatable |
| 5 | Day 14 | You're getting early access before everyone else | Convert to activation |

## Implementation Notes

- **ESP recommendation:** ConvertKit (best for creator economy) or Loops (built for SaaS)
- **Trigger:** POST to `/api/waitlist` → 201 response → add to drip sequence
- **Segmentation:** Use `source` field from waitlist DB to segment by channel (e.g., newsletter vs. Product Hunt vs. AlternativeTo)
- **From name:** "ChurnRecovery Team" or just "Dawood" for higher open rates (personal name wins)
- **Plain text vs HTML:** These emails are written as plain text. Do not format as HTML newsletters — the founder voice is the point.
- **Unsubscribe:** Include standard unsubscribe footer on all emails (legally required + good practice)
