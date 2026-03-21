# Welcome Email Sequence — ChurnRecovery

## Overview

This sequence is triggered by product activity, not waitlist signup. These emails go to users who have **installed the widget and connected Stripe** — they're active customers, not just interested leads.

**Platform:** Resend (primary) or ConvertKit (secondary)
**Trigger system:** Stripe webhooks → ChurnRecovery API → Resend/ConvertKit

---

## Trigger Events

| Email | Trigger | Delay |
|-------|---------|-------|
| Email 1: Welcome | First Stripe webhook received (any event) | Immediately |
| Email 2: Day 3 Check-in | 3 days after Email 1 | +72 hours |
| Email 3: Day 14 Review | 14 days after Email 1 | +14 days |

### Resend Implementation

```javascript
// In your Stripe webhook handler (pages/api/webhooks/stripe.js or Cloudflare Worker)
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

async function handleFirstWebhook(user) {
  // Email 1: Send immediately
  await resend.emails.send({
    from: 'Dawood at ChurnRecovery <dawood@churnrecovery.com>',
    to: user.email,
    subject: 'Your first Stripe event just came in 🎉',
    html: email1Html(user),
  });

  // Schedule Email 2 (Day 3) — use Resend scheduled sending or a queue
  await resend.emails.send({
    from: 'Dawood at ChurnRecovery <dawood@churnrecovery.com>',
    to: user.email,
    subject: 'How\'s your first week going?',
    html: email2Html(user),
    scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  });

  // Schedule Email 3 (Day 14)
  await resend.emails.send({
    from: 'Dawood at ChurnRecovery <dawood@churnrecovery.com>',
    to: user.email,
    subject: 'Are you getting saves?',
    html: email3Html(user),
    scheduledAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  });
}
```

### ConvertKit Implementation

1. Create a sequence named "Welcome — Widget Installed"
2. Add 3 emails with the content below
3. Set delays: Email 1 (immediate), Email 2 (+3 days), Email 3 (+14 days)
4. Create a tag: `widget-installed`
5. In your webhook handler, subscribe the user to the sequence:

```javascript
// POST to ConvertKit API
await fetch(`https://api.convertkit.com/v3/sequences/${SEQUENCE_ID}/subscribe`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    api_key: process.env.CONVERTKIT_API_KEY,
    email: user.email,
    first_name: user.name,
    tags: ['widget-installed'],
  }),
});
```

---

## Email 1: Welcome to ChurnRecovery

**Trigger:** First Stripe webhook received
**Subject:** Your first Stripe event just came in 🎉
**Preview text:** ChurnRecovery is now live and listening. Here's what to expect.

---

Hi {{first_name || "there"}},

Your first Stripe event just came in — which means ChurnRecovery is live and connected.

Here's what's happening behind the scenes right now:

**What ChurnRecovery is doing:**
- Listening to every cancel attempt on your Stripe subscription
- Showing your custom cancel flow to subscribers who try to leave
- Tracking who pauses, accepts a discount, or still cancels
- Logging the reasons people give so you can spot patterns

**How to read your dashboard:**

Head to [your dashboard →](https://churnrecovery.com/app/dashboard)

- **Save Rate** — percentage of cancel attempts that were saved (pause, discount, or persuaded to stay). Industry average is 20–35%. Top performers hit 50%+.
- **Revenue Recovered** — actual MRR that would have churned if ChurnRecovery wasn't there.
- **Cancel Reasons** — the top reasons customers cite. This is gold for product decisions.
- **Recent Activity** — live feed of every cancel attempt and outcome.

**Tips to maximize your save rate:**

1. **Offer a pause, not just a cancel.** "Pause for 1 month" saves 15–20% of cancellations by itself. It's the single highest-ROI thing you can add to your cancel flow.

2. **Make the discount feel exclusive.** "Stay and get 25% off — this offer expires in 10 minutes" outperforms a generic discount. Urgency matters.

3. **Ask why before offering anything.** A one-question "What's the main reason you're canceling?" step improves saves because you can tailor the offer to the reason.

4. **Don't offer a discount to everyone.** Only show the discount offer to customers who cite "price" as a reason. For "too busy" or "not using it," offer a pause instead.

**See the flow yourself:**
Not sure what your subscribers are seeing? Try the [live demo →](https://churnrecovery.com/demo) — it's the exact 4-step flow your customers go through.

Any questions? Reply to this email. I read every one.

— Dawood
ChurnRecovery

P.S. Your cancel flow is already active. If you want to customize the offer amounts, wording, or steps, go to [Cancel Flow →](https://churnrecovery.com/app/cancel-flow) in your dashboard.

---

## Email 2: Day 3 Check-in ("Your first week results")

**Trigger:** 3 days after Email 1
**Subject:** How's your first week going?
**Preview text:** Check your save rate — here's what the numbers mean.

---

Hi {{first_name || "there"}},

It's been 3 days since ChurnRecovery went live. By now you should have some data to look at.

[Check your dashboard →](https://churnrecovery.com/app/analytics)

**What you might be seeing:**

- **0 cancel attempts:** That's normal if you have a small subscriber base. The widget only activates when someone tries to cancel. Keep it running — it'll pay off.

- **Cancel attempts, low save rate (under 20%):** Your flow might need tuning. The most common fix: add a pause offer as the first step before any discount.

- **Cancel attempts, solid save rate (20%+):** Nice. That's already better than "doing nothing." Let's see if we can push it higher.

**One thing to check:**

Go to [Cancel Reasons →](https://churnrecovery.com/app/analytics) and look at the top reason people are canceling.

- If it's **price** → make sure you have a discount offer step
- If it's **not using it** or **too busy** → try adding a pause offer (1–3 months, free)
- If it's **missing feature** → that's product feedback, not something ChurnRecovery can fix, but good to know

**Quick win this week:**
If you haven't already, add a pause offer to your cancel flow. It takes 2 minutes to configure and typically adds 10–15 percentage points to your save rate.

[Configure your cancel flow →](https://churnrecovery.com/app/cancel-flow)

If you have questions or want me to look at your setup, just reply. I'm hands-on with early users.

— Dawood

---

## Email 3: Day 14 Review ("Are you getting saves?")

**Trigger:** 14 days after Email 1
**Subject:** Are you getting saves?
**Preview text:** Two weeks in — let's talk about what's working and what's not.

---

Hi {{first_name || "there"}},

Two weeks in. Let's take stock.

[Pull up your analytics →](https://churnrecovery.com/app/analytics)

**The question that matters:**

Is your save rate trending up week over week? If yes — keep doing what you're doing. If not, here's a quick diagnostic:

**Save rate under 15%?**
This usually means one of three things:
1. Your cancel flow has too many steps — simplify to 2 steps max
2. The offer isn't compelling enough — try 30% off instead of 10%, or a 2-month free pause instead of 1 month
3. The timing is off — the flow is loading too slow or appearing after the cancellation is already processed

**Save rate 15–30%?**
You're in the normal range. The next lever is personalization — showing different offers based on the cancel reason. This alone typically adds 10+ points.

**Save rate 30%+?**
You're crushing it. At this point, the next move is to look at which subscriber segments churn most and think about proactive retention (email campaigns before they hit the cancel button).

**What others are doing:**

The highest-performing cancel flows we've seen have these in common:
- Simple: 2 steps, clear offer
- Fast: loads in under 500ms
- Relevant: offer matches the stated reason
- Human: sounds like it's from a person, not a robot

If you want me to review your cancel flow personally, reply to this email with "review my flow" and I'll take a look.

Otherwise — thanks for being an early user. You're helping shape what ChurnRecovery becomes.

— Dawood

P.S. If ChurnRecovery has saved you money, I'd love a quick testimonial or a mention to another founder who might benefit. It helps a lot at this stage.

---

## Notes for Implementation

### Resend Setup
- Use Resend's `scheduledAt` parameter for delayed emails
- Create a Resend audience called "Widget Installed"
- Set `from` address to a verified domain (e.g., `dawood@churnrecovery.com`)
- Enable reply tracking to capture responses

### ConvertKit Setup
- Create automation: Tag added "widget-installed" → Enter sequence "Welcome — Widget Installed"
- Use custom fields: `{{subscriber.fields.company}}`, `{{subscriber.fields.mrr}}`
- Enable click tracking on dashboard links to measure engagement

### Deduplication
- Store a `welcome_email_sent_at` timestamp per user in D1
- Check this before triggering — only send once per user
- If user reconnects Stripe or reinstalls, don't retrigger

### Unsubscribe / Compliance
- All emails must have one-click unsubscribe (required by CAN-SPAM / GDPR)
- Resend handles this automatically with managed unsubscribes
- ConvertKit includes unsubscribe links automatically in sequences
