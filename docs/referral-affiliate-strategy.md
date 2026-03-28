# Referral & Affiliate Strategy

ChurnRecovery is free. That changes how referral programs work. This doc covers three things:
1. How to build a referral program around a free product
2. Affiliate and partnership channels that make sense for our audience
3. First 10 affiliate partners + outreach templates

---

## Part 1: Referral Program Design

### The Problem With Traditional Referral Programs

Traditional referral programs work by giving referrers a percentage of the revenue their referral generates. But ChurnRecovery is free. No subscription = no commissions.

That's actually fine — because our users don't need money. They need:
- Early access to features before public release
- Input into what gets built next
- Status ("I'm a beta tester / early adopter")
- Tools that make their business better

We give them those instead.

---

### What We're Offering

**ChurnRecovery Pro Early Access**
A "Pro" tier is the plan. Referrers get first access when it launches. We create scarcity without charging anything.

**Feature Vote Credits**
Each referral = 1 vote on the public roadmap. Top 10 referrers get veto power over feature prioritization (or at minimum, a 1:1 with the founder to discuss the roadmap).

**Beta Perks (Extended)**
Referrers stay in the beta program longer, get access to A/B testing features before others, and are the first to try new integrations.

**"Founding Member" Badge**
A cosmetic but meaningful status badge in their account profile. People love being early.

---

### How It Works (User Flow)

1. User signs up for the waitlist
2. Confirmation page shows their unique referral link: `churnrecovery.com/refer/[code]`
3. They share it. When a friend clicks it:
   - Cookie set: `ref=[code]` with 30-day expiry
   - Redirect to `/` or `/for/[platform]` landing page
4. When the referred user submits the waitlist form, the `ref` cookie value is appended to their submission
5. Both original user and referred user get tagged in ConvertKit

---

### Tech Implementation

**Referral page route:** `/refer/[code]`
```js
// pages/refer/[code].js
// On load: document.cookie = `ref=${code}; max-age=${30 * 24 * 60 * 60}; path=/`
// Then: router.push('/')
```

**Waitlist form:** Read cookie at submission time, append as hidden field `ref_code`

**ConvertKit tags:**
- Referred user: `referred` + `ref:[referrer_code]`
- Referrer (on first successful referral): `referrer` + `referral-count:[N]`

**UTM tracking:** All referral links also get `?utm_source=referral&utm_medium=share&utm_campaign=[code]` appended so Cloudflare Analytics shows referral traffic.

---

### Referral Page Copy

**Headline:**
> Know someone losing subscribers?

**Sub:**
> Share ChurnRecovery and they'll thank you. (And you'll get early access to Pro features before anyone else.)

**CTA button:** "Get Your Referral Link"

**Body copy:**
> ChurnRecovery is free — so there's nothing to sell. This is just about helping other creators and business owners stop losing paying subscribers.
>
> When you refer someone who joins the waitlist, you both move up in line for beta access. You also earn feature votes: every referral gives you a say in what we build next.
>
> Your referral link: [personalized URL]

---

### ConvertKit Automation

**Sequence trigger:** Tag `referrer` added
**Email 1 (immediate):** "Here's your referral link + what you earn for each signup"
**Email 2 (day 7):** "You've referred [N] people — here's your current Pro access status"
**Email 3 (on milestone — 3 referrals):** "You've unlocked ChurnRecovery Pro early access 🎉"

---

## Part 2: Affiliate & Partnership Channels

### Channel 1: Newsletter Sponsorships (Small Creator Newsletters)

**Target:** Newsletters with 100–5,000 subscribers in the creator economy / SaaS / indie business space
**Why this works:** Highly targeted, cheap, and our offer (free tool) is extremely easy to sponsor

**Rates:** Newsletters under 5k subs typically charge $25–$150 per issue
**What we're offering:** $0 cash (to start) or small budget ($50–$150 per placement) in exchange for a featured placement

**Placement copy template:**
> **Losing subscribers every month?** ChurnRecovery is an affordable cancel flow tool for newsletters and subscription businesses. When someone tries to cancel, it shows them a pause or discount offer — and saves 15–25% of them. $20/month with 30-day free trial. → churnrecovery.com

**Target categories:**
- Newsletters about running a newsletter business
- "Building your creator business" newsletters
- SaaS / bootstrapped founder newsletters
- Productivity-for-creators newsletters

---

### Channel 2: Podcast Interview Strategy

**Target:** Creator economy + solopreneur podcasts (5k–50k listeners)
**Format:** Founder interview — "how I built a free alternative to Churnkey"
**Pitch angle:** "I quit paying $250/month for a churn tool and built my own — now it's free for everyone"

**Podcast categories to target:**
- Indie Hackers / bootstrapped founder podcasts
- Creator economy shows (The Creator Economy, Creator Science, etc.)
- Newsletter-specific podcasts
- "Building in public" shows

**Outreach hook:**
> "I built a free alternative to Churnkey while building in public. Happy to talk about the math behind churn recovery, SEO-first GTM strategy, or the free tier as a moat — whatever's useful for your audience."

---

### Channel 3: Content Swap Partnerships

**Format:** Guest post on their blog/newsletter; they share a piece of our content
**Best fit:** Content creators who write about running subscription businesses

**What we offer:**
- A data-driven guest post (e.g., "How Much Revenue You're Losing to Churn — and 3 Ways to Stop It")
- One of our blog posts promoted to their audience (we write, they send)
- Mutual back-link exchange

**What they get:**
- Free, high-quality content their audience actually wants
- A tool their readers can use immediately (conversion asset)

---

### Channel 4: Integration Partner Co-Marketing

**Tier 1 targets:** ConvertKit, Beehiiv, Ghost (direct integration value)
**Tier 2 targets:** Kajabi, Teachable, Substack (landing pages exist, soft integration)

**Co-marketing options:**
- Mutual listing in each other's integrations/partner pages
- Co-authored blog post: "How to Reduce Churn for [Platform] Users"
- Co-hosted webinar: "3 Things That Kill Subscriber Retention (And How to Fix Them)"
- Featured placement in their newsletter/emails to users

**Outreach approach:**
- Email the partnerships or integrations team (not support)
- Lead with the mutual value: "Your users are cancelling — we help recover them. Joint interest?"
- Offer: free co-webinar + cross-promo + back-link, zero cash

---

### Target List: 20 Creator-Economy Newsletters

Newsletters under 5k subscribers that reach our exact audience. These should be your first partnership conversations.

| Newsletter | Focus | Est. Subs | Approach |
|------------|-------|-----------|----------|
| The Bootstrapped Founder (Arvid Kahl) | Bootstrapped SaaS | ~30k | Podcast pitch + guest post |
| Indie Bites | Indie hackers | ~10k | Sponsorship or content swap |
| Creator Science (Jay Clouse) | Creator business | ~15k | Content swap |
| The Newsletter Network | Newsletter operators | ~5k | Sponsorship |
| Creator Wizard | Creator monetization | ~20k | Guest post |
| Make Your Mark Online | Online business | ~3k | Sponsorship ($50–75/issue) |
| Flounder Forward | Bootstrapped founders | ~2k | Content swap (free) |
| Subscription News | Sub box / subscription biz | ~4k | Sponsorship |
| The Solopreneur | Solo business | ~8k | Content swap |
| No CS Degree | Self-taught devs | ~25k | Guest post angle |
| The Profit Lab | Course creator | ~3k | Sponsorship |
| The Creator Brief | Creator business | ~2k | Content swap |
| Monday Marketer | Small biz marketing | ~4k | Sponsorship |
| Indie Worldwide | Indie SaaS | ~6k | Guest post |
| Newsletter Operator | Newsletter biz ops | ~5k | Content swap + referral partner |
| Ship30for30 | Creators | ~40k | Larger pitch — podcast |
| Small Business Brief | SMB owners | ~3k | Sponsorship |
| Resting Business Face | Online business | ~2k | Content swap |
| Teachable Times | Course creators | ~4k | Integration co-marketing angle |
| Growth In Reverse | Newsletter growth | ~6k | Content swap / referral partner |

---

## Part 3: First 10 Affiliate Partners

### Partner Categories

**Category A: Newsletter Operators**
People who run newsletters teaching others how to grow/monetize newsletters. Their audience has subscriptions. They understand churn.

**Category B: Course Business Coaches**
Coaches who help course creators build and scale their businesses. Often on Kajabi, Teachable, or Thinkific. Subscription tiers are common.

**Category C: Subscription Box Consultants**
People in the subscription box / physical product subscription space. High churn, often underserved by software tools.

---

### First 10 Target Partners

| # | Name / Handle | Category | Platform | Audience Size | Approach |
|---|---------------|----------|----------|---------------|----------|
| 1 | Newsletter operator with 1k–5k subs teaching newsletter growth | Newsletter Op | Beehiiv/CK | <5k | Content swap + referral |
| 2 | Kajabi coach (helps course creators with funnels) | Course Coach | Kajabi | 2k–10k | Guest post + co-marketing |
| 3 | Teachable-focused business coach | Course Coach | Teachable | 1k–5k | Guest post |
| 4 | Subscription box consultant with blog/newsletter | Sub Box | Substack/Ghost | <5k | Sponsorship ($75/issue) |
| 5 | Ghost-focused newsletter consultant | Newsletter Op | Ghost | <3k | Content swap |
| 6 | Creator economy educator (YouTube/newsletter combo) | Creator | YouTube/newsletter | 2k–10k | Interview outreach |
| 7 | Indie hacker with a newsletter about SaaS | Indie Hacker | Substack | <10k | Referral partner + feature vote |
| 8 | Membership site consultant | Membership | Memberful/Circle | <5k | Content swap |
| 9 | Bootstrapped SaaS founder educator | SaaS | Newsletter | <8k | Guest post + referral |
| 10 | Patreon coach (helps creators move to paid memberships) | Creator | Newsletter | <3k | Sponsorship |

---

### Outreach Email Templates

**Template A: Newsletter Operators**

Subject: Free tool for your newsletter subscribers (+ content swap idea)

> Hi [Name],
>
> I've been reading [Newsletter] for a few months — your recent piece on [specific topic] was exactly the kind of thing I share with my own network.
>
> I built ChurnRecovery — a free cancel flow tool for newsletter and subscription businesses. When someone tries to cancel, it shows a pause or discount offer and saves 15–25% of them. No monthly fee, just a 10-minute setup.
>
> I'm reaching out because your readers are exactly who this helps — people running paid subscriptions who are silently losing subscribers every month.
>
> Two ideas, take either or both:
> 1. **Content swap** — I write a piece on churn recovery for your newsletter, you mention ChurnRecovery to your audience. I'll make it genuinely useful, not a sales pitch.
> 2. **Referral partner** — You share your referral link, anyone who signs up from you gets you Pro early access credits. No cash involved.
>
> Either way, happy to send over the tool first so you can actually use it before mentioning it.
>
> Worth a 15-minute chat?
>
> [Your name]
> churnrecovery.com

---

**Template B: Course Business Coaches**

Subject: Quick question about your Kajabi/Teachable students

> Hi [Name],
>
> Love what you're building with [newsletter/program/course]. Your content on [specific topic] is exactly right — most course creators underestimate the subscription side of the business.
>
> I built ChurnRecovery specifically for Kajabi and Teachable users. It's a free tool that installs in 10 minutes and shows a pause/discount offer when someone tries to cancel a course subscription. Saves 15–25% of them.
>
> I'd love to explore whether there's a fit for your audience — either a guest post, a mention, or a simple referral arrangement (I'll give anyone you refer early access to our Pro tier when it launches).
>
> No cost, no catch. Just trying to get it in front of people who actually need it.
>
> Happy to send you access to test it yourself first. Interested?
>
> [Your name]

---

**Template C: Subscription Box Consultants**

Subject: Recovering cancelled subscription box customers (free tool)

> Hi [Name],
>
> I found you through [context] and noticed your work focuses on helping subscription box businesses scale.
>
> Churn is a painful problem for subscription boxes — and most tools designed to solve it (Churnkey, ProfitWell) are priced for enterprise SaaS, not $50/month box businesses.
>
> I built ChurnRecovery as the free alternative. It's a cancel flow widget that works with Stripe billing — when someone tries to cancel, they see a pause or discount offer. Average save rate: 15–25%.
>
> Given your audience, I think a short feature or co-created piece could be genuinely useful. Or a referral arrangement — anyone who signs up through you gets Pro early access when it launches.
>
> Open to a quick chat to see if it makes sense?
>
> [Your name]
> churnrecovery.com

---

### Commission-Equivalent Structure

Since ChurnRecovery is free, here's what partners get:

| Milestone | Reward |
|-----------|--------|
| Partner joins program | Featured on our partners page + back-link |
| 5 referrals | "Pro Founding Partner" status — first access to Pro tier |
| 10 referrals | Co-marketing opportunity (joint blog post, email to our list) |
| 25 referrals | 1:1 with founder + roadmap input, featured case study |
| 50+ referrals | Permanent "Powered by ChurnRecovery" certification for their community |

When Pro launches with paid tiers: top 10 referrers get perpetual free Pro access regardless of pricing.

---

*Last updated: 2026-03-21*
