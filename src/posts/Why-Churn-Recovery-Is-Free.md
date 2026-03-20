---
title: "Why ChurnRecovery Is Free (And How We Plan to Stay That Way)"
date: "2026-03-12"
excerpt: "The business model behind giving away churn recovery tooling for free. No, it's not a bait-and-switch. Here's exactly how it works."
tags: ["churnrecovery", "open-source", "business-model"]
---

# Why ChurnRecovery Is Free (And How We Plan to Stay That Way)

When we tell people ChurnRecovery is free, the first question is always: "What's the catch?"

Fair question. In SaaS, "free" usually means one of three things: it's a trial, it's freemium with crippled features, or you're the product. ChurnRecovery is none of those.

This post explains our business model, why we believe churn recovery tooling should be free, and how we plan to sustain it.

---

## The Problem With Current Pricing

Let's talk about what churn recovery costs today.

**Churnkey** is the market leader. Their pricing starts at $250/month for the Startup plan and goes up to $825/month for the Growth plan. Enterprise is custom pricing. They do excellent work — we're not disparaging their product. But their pricing model has a fundamental problem.

Consider a SaaS company with $20K MRR:
- Churnkey costs $250/month = $3,000/year
- That's 15% of their monthly revenue going to a tool that recovers revenue
- If Churnkey recovers $500/month for them, they're keeping $250 and paying $250 to Churnkey
- The net benefit is only $3,000/year instead of $6,000

For larger companies with $100K+ MRR, the economics work fine. But for early-stage SaaS companies — the ones who need churn recovery the most — the cost is hard to justify.

**Other options:**
- **ProfitWell Retain** (now part of Paddle): Free dunning, but only works with Paddle billing
- **Chargebee Retention** (formerly Brightback): Bundled with Chargebee's billing platform
- **Custom build:** Engineers spend weeks building what's essentially a solved problem

The market has consolidation happening, with churn recovery tooling being absorbed into larger billing platforms. Independent, affordable options are disappearing.

---

## Our Thesis: Churn Recovery Should Be Infrastructure

Here's our core belief: **churn recovery is infrastructure, not a premium product.**

Think about it like this. Email delivery used to be expensive. Then SendGrid and Mailgun drove prices toward zero because the marginal cost of sending an email is essentially nothing. Authentication used to be a paid service. Then Auth0 had a generous free tier, and now Clerk and Supabase Auth give it away because the marginal cost is near zero.

Churn recovery follows the same pattern:
- **Cancel flows** are client-side JavaScript. The cost of serving them is zero.
- **Dunning emails** are triggered emails. Cost: fractions of a cent.
- **Retry logic** is API calls to Stripe. Cost: zero (Stripe doesn't charge for retry attempts).
- **Analytics** is aggregating webhook data. Cost: minimal compute and storage.

The entire churn recovery stack can run on Cloudflare's free tier. The infrastructure cost for serving a customer is effectively zero. So why does it cost $250-$825/month?

Because the incumbents priced based on value delivered, not cost of delivery. And that's a legitimate pricing strategy — but it creates an opening for someone willing to compete on price.

---

## How ChurnRecovery Makes Money (Eventually)

We're playing a long game. Here's the honest roadmap:

### Phase 1: Build the best free churn recovery platform (Now)

Give away the core product. Cancel flows, dunning, payment recovery, exit surveys, basic analytics. All free, all open source, all self-hostable.

The goal: become the default choice for SaaS companies that need churn recovery but can't or won't pay $250+/month.

### Phase 2: Offer premium features for larger teams (Future)

Once we have a significant user base, we'll offer paid features that matter to bigger companies:

- **Advanced A/B testing** for cancel flow optimization
- **AI-powered offer recommendations** based on customer behavior patterns
- **White-glove onboarding** and dedicated support
- **Custom integrations** for enterprise billing systems
- **SLA guarantees** for mission-critical deployments
- **Team collaboration** features (multiple users, approval workflows)

The core product stays free forever. Premium features are for companies where churn recovery is a strategic function managed by a dedicated team.

### Phase 3: Become a platform (Long-term)

The real opportunity isn't in churn recovery alone — it's in the broader retention stack. Companies that use ChurnRecovery for cancel flows will also need:

- Customer health scoring
- Expansion revenue tools
- Win-back campaigns
- Lifecycle email automation
- Product analytics

We can build or partner for these adjacent tools, creating a retention platform where ChurnRecovery is the entry point.

---

## Why Open Source?

We're not just free — we're open source (MIT license). This is a deliberate strategic choice.

### Trust
Churn recovery tooling handles sensitive customer interactions. When a customer is about to cancel, what they see matters. With closed-source tools, you're trusting a vendor's code to have the right conversation with your customers. With open source, you can read every line.

### Customization
Every SaaS product is different. The cancel flow that works for a project management tool won't work for a billing platform. Open source means you can fork the code and customize everything — copy, design, logic, offers — without waiting for a vendor to add a feature.

### Community
Open source creates a flywheel. Developers contribute cancel flow templates, integration adapters, and analytics dashboards. The product gets better faster than any single team could build it. Contributors become advocates. Advocates bring users. Users become contributors.

### Competitive moat
This is counterintuitive, but open source is actually a competitive advantage. Here's why:

1. **Incumbents can't copy the model.** Churnkey can't open-source their product without destroying their revenue. We can.
2. **Community contributions compound.** Every cancel flow template, every billing adapter, every bug fix — it all accumulates.
3. **Lock-in is impossible.** Customers trust us more because they know they can leave. Paradoxically, this makes them stay longer.
4. **Hiring pipeline.** Contributors who love the product become the best employees.

---

## The Economics: How Free Can Work

Let's run the numbers to show this isn't naive optimism.

### Infrastructure costs per customer

| Component | Cost |
|-----------|------|
| Cancel flow JS (CDN) | ~$0 (Cloudflare free tier) |
| Webhook processing | ~$0.001/event (Workers free tier) |
| Data storage | ~$0.01/month (D1 free tier) |
| Email sending (dunning) | ~$0.001/email (via customer's own ESP) |
| **Total per customer** | **< $0.05/month** |

At 10,000 free customers, our infrastructure cost is less than $500/month. That's manageable with a small team and minimal funding.

### Revenue model projections

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Free users | 1,000 | 10,000 | 50,000 |
| Premium conversion | 0% | 2% | 3% |
| Premium ARPU | $0 | $99/month | $149/month |
| Premium MRR | $0 | $19,800 | $223,500 |
| Infrastructure cost | $50/mo | $500/mo | $2,500/mo |

The math works because the infrastructure cost of the free tier is nearly zero, and premium conversion from a large base generates meaningful revenue.

### Comparison to VC-funded approach

We could raise money and give the product away while burning cash. We choose not to. Instead:

1. **Keep the team small.** 2-3 people can build and maintain the core product.
2. **Use free infrastructure.** Cloudflare's free tier is remarkably generous.
3. **Let the community do marketing.** Word-of-mouth from free users is the best marketing.
4. **Be patient on monetization.** Premium features come when the free base is large enough.

This means slower growth but sustainable economics. We're not racing to raise a Series A. We're building a company that works from day one.

---

## What "Free Forever" Actually Means

Let's be specific about our commitment:

**Free forever means:**
- Cancel flow builder: always free
- Dunning / payment recovery: always free
- Exit surveys: always free
- Basic analytics dashboard: always free
- Stripe integration: always free
- Self-hosting: always free
- MIT license: permanent

**What might be paid in the future:**
- Advanced A/B testing engine
- AI offer recommendations
- Priority support / SLA
- Enterprise SSO
- Custom integrations beyond Stripe
- Advanced analytics and cohort tools
- Managed hosting (we run it for you)

The core churn recovery workflow — the thing that saves your revenue — will never be paywalled. We're committing to that publicly, in writing, and in our open-source license.

---

## Aren't You Just Creating Your Own Competition?

A common concern: "If you're open source, won't someone just take your code and compete with you?"

Yes, they can. And that's fine.

Here's the thing about open-source competition: the project with the most active community wins. Code is easy to fork; community, documentation, integrations, and trust are hard to replicate.

MongoDB is open source. Dozens of MongoDB-compatible databases exist. MongoDB still dominates because they have the ecosystem.

WordPress is open source. Thousands of clones exist. WordPress powers 43% of the web because they have the community.

If someone forks ChurnRecovery and makes it better, that's good for SaaS companies everywhere. Our goal isn't to own churn recovery — it's to make it accessible.

---

## The Bigger Picture: Why This Matters

SaaS has a churn problem, and it's getting worse. As the market matures and competition increases, retention becomes more important than acquisition. But the tools to fight churn are priced for companies that already have resources.

Early-stage companies — the ones with $5K-$50K MRR, the ones building in their apartments, the ones who can't afford $250/month for churn tooling — are left to either build their own (expensive in engineer time) or ignore the problem (expensive in lost revenue).

We think there should be a third option: a free tool that just works.

That's ChurnRecovery.

---

## What Happens Next

We're currently onboarding SaaS teams for early access. Here's the timeline:

1. **Now:** Core platform in development. Cancel flows, dunning, basic analytics.
2. **Q2 2026:** Public beta. Stripe integration, self-hosting docs, community launch.
3. **Q3 2026:** V1 release. Production-ready, battle-tested, documented.
4. **Q4 2026:** Premium features begin rolling out for larger teams.

If you're a SaaS company dealing with churn (and you are — everyone is), [join the waitlist](/). We'll reach out with access as soon as your batch opens.

---

## FAQ

**Q: If it's free, who's paying the bills?**
A: Right now, the founders. Infrastructure costs are minimal (< $100/month on Cloudflare's free tier). Long-term, premium features will fund the company.

**Q: Can I really self-host this?**
A: Yes. The entire codebase is MIT licensed. Clone the repo, deploy to your own infrastructure, customize as needed. We'll provide Docker images and deployment guides.

**Q: Will you sell my data?**
A: No. Never. We don't even store your customers' personal data on our servers — everything runs client-side or in your own infrastructure.

**Q: What if you go out of business?**
A: The code is open source and MIT licensed. It can't be un-open-sourced. Even if ChurnRecovery the company disappears, ChurnRecovery the software lives on.

**Q: Why should I trust a free tool with my cancel flows?**
A: Because you can read the code. Every line. Every offer logic branch. Every API call. Open source means you never have to trust — you can verify.

**Q: How do you compare to Churnkey technically?**
A: Honestly, Churnkey has a more mature product right now. They've been building for years. We're newer, but we're iterating fast, and our core cancel flow and dunning features are production-ready. [See the full comparison](/compare/churnkey).

---

*ChurnRecovery is free, open-source churn recovery for SaaS companies. [Join the waitlist](/) — we'll never charge for the core product.*
