# ChurnRecovery — Autonomous Work Queue

## Target Audience
Low-code/no-code business owners: newsletter creators, coaches, online course sellers, subscription businesses. They're losing subscribers and need simple tools to recover them. NOT developers.

## Priority Tiers

### P0 — Do Now (blocks user acquisition)
- [ ] **🤖 Add Cloudflare Web Analytics snippet** — Just a `<script>` tag in `_document.js` or `_app.js`. Free, no signup needed (uses the existing CF account). This is the minimum to know which pages get traffic. **Agent can do this RIGHT NOW.** Get the beacon token from CF dashboard or use the site token approach.
- [ ] **🤖 Add UTM parameter capture to waitlist form** — When someone hits `/for/substack?utm_source=reddit`, store that source in D1 alongside the signup. Without this we can't tell which marketing channel works.
- [ ] **🚨 Execute manual marketing submissions** — IH post (docs/indie-hackers-post-final.md), BetaList (marketing/betalist-submission.md), Reddit posts (docs/reddit-execution-playbook.md) are ALL written and ready. Dawood needs to paste and publish. **This has been the #1 blocker for days.** MANUAL ACTION REQUIRED.
- [ ] **Product Hunt launch prep (April 1 target)** — Pre-launch checklist at docs/product-hunt-prelaunch-checklist.md. Day-by-day from March 25 → April 1. Key tasks: gather 5+ upvoter commitments, prep launch day assets, coordinate timing per docs/launch-timing-analysis.md (Tuesday April 7 may be better per analysis). **Decision needed: April 1 or April 7?** ⏰ March 25 is 4 days away.

### P1 — This Week (first users → first signal)
- [ ] **Waitlist signup funnel audit** — Test every waitlist form on every landing page. Verify D1 writes work, ConvertKit tags fire, source tracking is accurate. One broken form = lost signups we'll never know about.
- [ ] **Internal linking pass** — 20+ blog posts and 15+ /for/ pages exist but may not cross-link well. Each post should link to 2-3 relevant /for/ pages and vice versa. SEO multiplier.
- [ ] **Sitemap submission to Google Search Console** — Sitemap exists (100 URLs) but needs to be submitted + monitored per docs/google-search-console-monitoring.md. Pages won't rank until indexed.
- [ ] **Set up Resend for waitlist confirmation emails** — Waitlist signups should get an instant confirmation email. Currently silent after signup = bad UX.
- [ ] **Social media presence** — Create/claim Twitter/X account for ChurnRecovery. Start posting threads from docs/twitter-thread-templates.md. The content exists, just needs to be published.

### P2 — Next 2 Weeks (growth + retention)
- [ ] **Automated email nurture for waitlist** — 5-email sequence written at docs/email-nurture-sequence.md. Needs Resend/ConvertKit implementation to actually send.
- [ ] **Stripe App Marketplace listing** — Strategy at docs/integration-marketplace-strategy.md. High-leverage: Stripe users searching for churn tools find us directly.
- [ ] **Guest posts on SaaS newsletters** — Strategy + pitches at docs/guest-post-strategy.md. 15 targets identified. Start outreach.
- [ ] **Collect first testimonials** — Playbook at docs/testimonial-collection-playbook.md. Need actual users first (blocked by P0).
- [ ] **Community engagement** — Playbook at docs/community-engagement-playbook.md. 15 communities identified. Start participating (not spamming).

### P3 — Ongoing (continuous improvement)
- [ ] Error handling + rate limiting improvements
- [ ] E2E test coverage for new features (current: 142 tests, all passing)
- [ ] Performance optimization — docs/performance-todo.md has items
- [ ] Video testimonials from beta users (blocked by having beta users)

## What's Been Built (Summary)
Everything below is DONE. This is not a todo list — it's context for what exists.

**Pages:** 100+ static pages including homepage, pricing, /demo, /changelog, /status, /press, /social-proof, /resources/churn-recovery-playbook, /tools/roi-calculator, /tools/churn-rate-calculator

**Landing pages (15):** /for/substack, /for/kajabi, /for/teachable, /for/ghost, /for/memberful, /for/stan-store, /for/payhip, /for/podia, /for/thinkific, /for/circle, /for/patreon, /for/stripe, /for/squarespace, /for/chargebee, /for/lemon-squeezy, /for/wix, /for/wordpress

**Comparison pages (8):** /compare/churnkey, /compare/profitwell, /compare/churnbuster, /compare/stunning, /compare/baremetrics, /compare/raaft, /compare/prosperstack, /compare/chargebee, /compare/brightback, /compare/paddle-retain, /compare/stripe-billing, /compare/recurly, /compare/zuora

**Blog posts (20+):** SEO-optimized, targeting platform-specific + general churn keywords

**Marketing docs (ready to execute):** IH post, Reddit playbook, BetaList submission, HN Show post, PH launch kit, podcast outreach, guest post pitches, Twitter threads, community engagement playbook, press kit

**Technical:** Stripe webhooks, dunning emails (Resend), cancel flow widget, referral tracking, A/B testing, schema markup (FAQ + HowTo), ConvertKit integration, D1 database, 142 Playwright tests (all passing)

**Design:** Migrated to shadcn/ui + Tailwind (1,770 inline styles eliminated), mobile UX audit complete, all P1/P2 fixes applied

## Content Ideas Backlog
- "SaaS Pricing Audit: Tools That Should Cost 90% Less" — controversial take
- Platform-specific case studies (once we have real users)
- Video walkthroughs of cancel flow setup
- Comparison: "Free vs Paid churn tools — what do you actually need?"
- Industry benchmark reports (churn rates by vertical)

## Meta Tasks (self-improvement)
- [x] Review agent performance — concurrent edit failures documented in AGENTS.md
- [x] Update AGENTS.md with stale cache fix + known issues
- [x] Improve deploy-and-verify pipeline — added cache-clear step (2026-03-21)
- [ ] **Review: Are we building too much before validating?** — 100+ pages, 20+ blog posts, 15+ landing pages... but zero users. The next phase must be distribution, not more building.
