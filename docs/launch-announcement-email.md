# Launch Announcement Email

This is the email to send when ChurnRecovery goes live and you're opening up beta access to the waitlist.

Not a launch blast. Not a product announcement. A message from a person to a person.

---

## Subject Line Options (A/B Test These)

Pick two and split your list 50/50.

| # | Subject | Notes |
|---|---------|-------|
| A | It's live. Here's your access. | Short, direct, implies they've been waiting |
| B | ChurnRecovery is finally ready — here's how to set it up | Specificity + "finally" acknowledges the wait |
| C | I finished building the thing you signed up for | Personal, founder-voice, unusual framing |
| D | Your subscribers are still cancelling. Now you can stop them. | Problem-first, slightly urgent — good for less-engaged segment |
| E | [First name], your free cancel flow is ready | Personalized, clear benefit, no hype |

**Recommended for first send:** Subject A or E (test these against each other)
**For re-send to non-openers (3 days later):** Subject D

---

## Plain-Text Version

*(Use this as-is or paste into ConvertKit as a plain-text email. Feels personal. Converts well.)*

---

Subject: It's live. Here's your access.

Hey [First Name],

ChurnRecovery is live, and you're on the early access list — so you're in.

Here's what it is in one sentence: when someone tries to cancel a subscription to your product, they see a screen with an offer to pause or get a discount. You set it up once. It runs automatically. You keep subscribers you would have lost.

That's it.

---

**Why it's free**

I built this because I couldn't afford Churnkey ($250/month) when my newsletter was doing $1,800/month in revenue. That's absurd. A churn recovery tool should cost less than the subscribers it saves you in week one.

So I built it on Cloudflare Workers, which costs basically nothing to run. That means I can give it away free while I'm building the audience and proving it works.

No catch. No "free trial." No credit card. Just free.

---

**How to install it (2 steps)**

1. Add your Stripe API key in the ChurnRecovery dashboard
2. Paste one line of JavaScript into your site

That's it. It takes about 10 minutes. Most people do it in less.

Setup guide: https://churnrecovery.com/docs/getting-started

---

**What if it doesn't work?**

If you set it up and don't save a single subscriber in the first 30 days, email me personally: [your email]. I'll look at your config, tell you what's off, and fix it with you.

And since it's free, the worst-case scenario is: it didn't work and you wasted 10 minutes of setup time.

---

**Your early access link:**

→ https://churnrecovery.com/login (use the email this was sent to)

If you have questions or run into anything, just reply to this email. I read every one.

Thanks for waiting. Hope this is worth it.

[Your name]
Founder, ChurnRecovery

P.S. — If you know anyone else losing subscribers (newsletter, coaching program, subscription box), forward this to them. It's free, and the more people using it, the better the product gets.

---

## HTML-Friendly Version

*(Formatted for email clients that render HTML. Same content, cleaner visual hierarchy. Works in ConvertKit, Beehiiv, Mailchimp.)*

---

Subject: It's live. Here's your access.

---

Hey {{first_name}},

ChurnRecovery is live — and you're on the early access list, so you're in.

**What it does in one sentence:** When someone tries to cancel a subscription to your product, they see a screen with an offer to pause or get a discount. You set it up once. It runs automatically. You keep subscribers you would have lost.

That's it.

---

**Why it's free**

I built this because I couldn't afford Churnkey when I was doing $1,800/month. A churn recovery tool that costs $250/month is only useful if you're already big enough not to need it.

I built ChurnRecovery on Cloudflare Workers — which costs me almost nothing to run. That means I can give the core product away free while I prove it works.

No credit card to start. 30-day free trial. Then $20/month — all features included. No gotchas.

---

**How to set it up (10 minutes)**

**Step 1:** Add your Stripe API key in the dashboard

**Step 2:** Paste one line of JavaScript into your site

That's all. Full guide here: [Getting Started →](https://churnrecovery.com/docs/getting-started)

---

**What if it doesn't work?**

If you set it up and don't save a single subscriber in the first 30 days, email me directly: [your email]. I'll look at your setup personally and help you fix it.

Worst case: you spent 10 minutes and it didn't work. No cost, no contract, no obligation.

---

**[→ Get Your Early Access](https://churnrecovery.com/login)**

*(Use the email this was sent to)*

---

Questions? Just reply to this email. I read everything.

[Your name]  
Founder, ChurnRecovery

*P.S. If you know someone losing subscribers — a newsletter, a coaching program, a subscription box — forward this to them. It's free, and they'll thank you.*

---

*You're receiving this because you signed up for early access at churnrecovery.com.*  
*[Unsubscribe]({{unsubscribe_url}}) | [Manage preferences]({{preferences_url}})*

---

## Sending Notes

**Timing:**
- Send Tuesday–Thursday, 9–11 AM EST (best open rates for B2B)
- Don't send Monday (competitive inbox) or Friday (low engagement)

**Segmentation:**
- If your list is tagged by platform (substack-creator, kajabi-user, etc.), consider sending platform-specific versions with slightly adjusted step 2 instructions
- Send to full waitlist first, then re-send to non-openers 3 days later with Subject D

**Follow-up email (Day 3, non-openers):**
> Subject: Your subscribers are still cancelling. Now you can stop them.
>
> (Same body, but add at the top: "Hey [name] — sending this again in case my first email got buried. ChurnRecovery launched this week and your early access is ready.")

**Follow-up email (Day 7, everyone who didn't click):**
> Subject: Quick question
>
> "Hey [name] — you signed up for early access to ChurnRecovery but haven't installed it yet. Is there something stopping you? Honestly curious. Hit reply and tell me — I read every response."

This follow-up sequence typically recovers 15–25% of people who didn't act on the launch email.

---

## Personalization Tokens

Using ConvertKit:
- `{{first_name}}` — first name (fallback: "there")
- `{{subscriber.churnrecovery_platform_tag}}` — platform tag if you have it
- `{{unsubscribe_url}}` — required legal footer

---

*Last updated: 2026-03-21*
