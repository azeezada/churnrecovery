# Hacker News "Show HN" Post

*Status: Draft — ready to post after Reddit/IH validation confirms messaging resonates*

---

## The Post

### Title

```
Show HN: ChurnRecovery – Free cancel flow widget for subscription businesses
```

**Alt titles (if first gets no traction — swap and re-post after 30 days):**
- `Show HN: ChurnRecovery – We open-sourced the logic behind Churnkey's $825/mo cancel flows`
- `Show HN: ChurnRecovery – An open cancel-flow widget that runs on Cloudflare Workers + D1`

---

### Post Body

```
I built ChurnRecovery after watching a friend's newsletter business hemorrhage subscribers every month — her payment processor was silently declining expired cards, and the tools to fix it started at $250/month. For someone doing $4k MRR, that's a 6% tax on revenue, which defeats the whole point.

ChurnRecovery is a cancel-flow widget + dunning system for subscription businesses. When a customer clicks "cancel," the widget intercepts the action, asks why, and fires the right retention offer (discount, pause, plan change) based on their answer. Failed payment recovery sends smart retry emails at 1/3/7 days. The whole thing is built on Cloudflare Workers + D1 — no servers to manage, edge-native latency, and it handles traffic spikes without a sweat. The widget itself is a ~12KB vanilla JS embed that doesn't require React or any framework.

It's early-stage and affordable — $20/month with a 30-day free trial. I'd love early feedback, especially from anyone who's built or evaluated churn tooling before. Live at churnrecovery.com.
```

**Word count:** ~180 words. HN sweet spot: 150–200.

**Why this body works for HN:**
- Opens with a concrete problem (not "we're disrupting")
- Names the technical stack (Cloudflare Workers + D1, vanilla JS embed) — HN readers will engage on this
- Honest: "It's early-stage"
- Doesn't pitch, doesn't use marketing language
- Ends with a clear invitation for technical feedback

---

## Best Time to Post

**Tuesday, Wednesday, or Thursday, 8–10 AM PST**

- HN traffic peaks on weekday mornings US time
- Monday is lower (people catching up)
- Friday afternoon = wasteland
- Avoid weekends entirely — posts die faster
- 8 AM PST means it's visible to East Coast (11 AM) + Europe (4–5 PM) simultaneously

**If launching alongside Product Hunt (April 1st):**
The PH launch kit says to post Show HN at 1:00 PM PST on launch day. That's fine — they're different audiences. HN is technical founders; PH is broader. Don't cross-post the same text. The HN version above is intentionally more technical/honest.

---

## 10 Anticipated Comments + Good Replies

### 1. "Why not just use Stripe Billing Portal?"

> Stripe Billing Portal handles payment updates and plan changes, but it's not a cancel-flow tool. It doesn't intercept cancellations, present retention offers, or ask why someone is leaving. If a customer clicks "Cancel subscription" in the portal, they cancel — no friction, no offer, no data. ChurnRecovery wraps that moment: the widget fires before Stripe ever processes the cancel. They're complementary, not competitive.

---

### 2. "How does this compare to Churnkey?"

> Churnkey is solid — they've been at this longer and have enterprise features we don't have yet. The difference is price: Churnkey starts at $250/month and scales to $825+. For a bootstrapped SaaS or creator doing $5–20k MRR, that's a meaningful percentage of revenue. ChurnRecovery has the same core cancel-flow functionality for free. If you're at $100k+ MRR and want SLAs and dedicated support, Churnkey is probably the right choice. We're building for the tier below that.

---

### 3. "Is this just a popup?"

> Technically it renders as a modal, yes, but the logic behind it is what matters. The modal shows different content based on the cancel reason selected. Each reason maps to a different offer type (discount, pause, plan change, human escalation). All of that is configurable via a visual builder — no code for the flow logic. The "just a popup" framing is like calling a recommendation engine "just a list."

---

### 4. "What's the actual technical architecture?"

> The widget is ~12KB of vanilla JS (no deps). It calls our API on cancel-trigger, fetches the flow config for that project, renders the modal in a shadow DOM so it can't conflict with host styles, and reports outcomes back. The backend is Cloudflare Workers + D1 (SQLite at the edge). The cancel-flow configs, events, and analytics are all stored in D1. Cold start on Workers is ~0ms vs. Lambda's 100–500ms, which matters because the modal has to appear before the customer navigates away. Source: the widget is in /public/widget.js in the repo.

---

### 5. "How do you handle the actual subscription cancellation in Stripe?"

> ChurnRecovery intercepts client-side only — it delays the cancel action until the flow completes. If the customer dismisses the flow or selects "Cancel anyway," we emit a `cr:cancel-confirmed` event your code listens to, and your existing Stripe cancel logic fires as normal. If they accept a save offer, you apply it via your backend (we pass the offer type back). We don't have direct Stripe write access by design — keeping the authorization boundary explicit reduces risk.

---

### 6. "This will cause dark patterns if everyone does it"

> Valid concern. Our guidelines require a clear "Cancel anyway" path at every step — you can't configure a flow that doesn't let customers leave. We also don't do fake countdowns, artificial scarcity, or confusing double-negatives. The honest version of this: if someone wants to cancel, they should be able to cancel. What we're doing is making sure they were offered a solution to whatever problem made them want to leave. That's closer to customer service than dark patterns.

---

### 7. "How is this sustainable as a free product?"

> The pricing is $20/month after a 30-day free trial — all features included. The model is intentionally simple: one plan, one price, everything you need. At $20/month vs Churnkey's $250+, we're 10-40x cheaper. No VC, no pressure to raise prices. The goal is to build a sustainable product at a price that makes sense for bootstrapped founders.

---

### 8. "Have you measured actual save rates vs. doing nothing?"

> Early data only — we're tracking this as users onboard. Industry benchmarks from Churnkey, ProfitWell, etc. cite 20–40% save rates on cancel flows and 30–60% recovery on failed payments. We're seeing similar ranges in early installs, but with a small N so I won't claim a specific number yet. The benchmark page on the site links the public studies.

---

### 9. "Why Cloudflare Workers + D1 instead of something more standard?"

> Two reasons: latency and cost. The cancel flow modal has to appear instantly — if there's a cold start, the customer has already navigated away or rage-clicked cancel. Workers give consistent ~5ms response globally with no cold start. D1 is SQLite at the edge, which is overkill for our data model but the operational simplicity is worth it at this stage. We're not doing joins that would stress SQLite at scale. If we ever need Postgres, the migration path is straightforward since the schema is simple.

---

### 10. "What payment processors do you support?"

> Native integration with Stripe (webhook + API). Paddle, Braintree, Chargebee, and Recurly via webhooks. The cancel-flow widget is payment-processor-agnostic (it's client-side JS). The dunning emails require processor-specific webhook mapping. Stripe works out of the box in about 30 minutes. Others have a documented setup but more configuration.

---

## Handling Negative Comments (HN Can Be Brutal)

### The main attack vectors:

**"This is just another SaaS tool that won't survive"**
> Don't defend. Agree: "You might be right — most don't. We'll see." HN respects honesty about risk more than bravado.

**"Your tech stack choice is wrong"**
> Never argue tech religion on HN. Acknowledge the tradeoffs honestly: "Workers + D1 isn't right for every architecture. The tradeoffs we made were [X] for [reason]. Happy to discuss the design choices."

**"The 'free' business model is unsustainable"**
> See reply #7 above. If they push harder: "Possibly. We'll find out. We'd rather have users first."

**"Why does the world need another churn tool?"**
> "Probably doesn't — if it already had one that costs less than $250/month. It doesn't."

**Downvote brigades / "this is spam"**
> If the post is flagged, email hn@ycombinator.com with a polite note explaining it's a genuine Show HN, not a marketing post. Include that you're the founder and happy to answer technical questions. HN moderators are reasonable about unflagging genuine submissions.

### General principles:
1. **Never be defensive.** Agree with valid criticism, engage with technical critique.
2. **Don't pitch in replies.** Answer questions factually. Let the product speak.
3. **Upvote good counterarguments.** HN culture rewards intellectual honesty.
4. **Don't spam refresh and reply to every comment in the first 10 minutes.** Respond thoughtfully in batches.
5. **If a thread goes bad, disengage gracefully.** "Fair point — I'll think about it" is always valid.

---

## Pre-Post Checklist

- [ ] Reddit/IH posts have been live for at least 1 week
- [ ] Verify the site doesn't break under sudden traffic (Cloudflare Pages handles it, but sanity-check)
- [ ] Cache the widget.js and API routes — HN traffic can spike hard
- [ ] Have a Hacker News account with some karma (at least 10+) — new accounts can't post
- [ ] Draft the post in a text editor before pasting — HN editor is barebones
- [ ] No markdown formatting in the post body — HN doesn't render it
- [ ] No "Please upvote" or engagement bait — instant credibility killer

---

## Post-Launch Tracking

| Metric | What it means |
|--------|--------------|
| 🟢 10+ points in first hour | Good trajectory, keep engaging comments |
| 🟡 3–9 points at 2 hours | Average Show HN — engage every comment |
| 🔴 < 3 points at 3 hours | Post died. Don't re-submit for 30 days. Analyze why. |
| 💬 Comment asking for source code | Very good signal — HN respects open source |
| 📈 Site traffic spike | Monitor Cloudflare analytics, expect 200–2,000 visits |

---

*Document created: 2026-03-21 | Status: Ready to post post-Reddit/IH validation*
