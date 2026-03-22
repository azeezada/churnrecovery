# ChurnRecovery — Autonomous Work Queue

## Target Audience
Low-code/no-code business owners: newsletter creators, coaches, online course sellers, subscription businesses. They're losing subscribers and need simple tools to recover them. NOT developers.

## Priority Tiers

### P0 — Do Now (blocks real users)
- [x] **✅ Remove all waitlist language → "Get Started Free"** — 44+ pages updated, all CTAs point to /app/sign-up. SignUpCTA component created. Dead WaitlistForm code removed (~2,400 lines). Committed 2026-03-22.
- [ ] **🤖🔥 Wire dashboard pages to D1 API** — `cancel-flow.js`, `settings.js`, `onboarding.js` still use localStorage only. Must use `apiFetch()` like `dashboard.js` and `analytics.js` already do. Without this, cancel flow configs are lost if user switches browser/device. **CRITICAL for real users.**
- [ ] **🔑 Switch Clerk to production keys** — Currently using `pk_test_*`. Need `pk_live_*` from Clerk Dashboard → Production. Update `.env.local` + CF Pages env vars + redeploy. **DAWOOD ACTION: Create Clerk production instance.**
- [ ] **🔐 Add JWT signature verification** — `getUserId()` in `functions/api/_shared.js` decodes JWT without verifying signature. Anyone can forge auth. Must verify against Clerk JWKS endpoint.
- [ ] **🤖🔥 Add Cloudflare Web Analytics snippet** — Just add `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token":"SITE_TOKEN"}'></script>` to `pages/_app.js` or `pages/_document.js`. Get the beacon token from CF dashboard → Web Analytics → Add site. **This has been P0 for 2+ days and is STILL not done. Any agent touching this project should do this FIRST before anything else.** Without analytics we are flying blind.
- [ ] **🤖🔥 Add UTM parameter capture** — When someone hits `/for/substack?utm_source=reddit`, capture UTM params and pass them to Clerk sign-up metadata or store in D1 project record. Without this we can't tell which marketing channel works.
- [ ] **🚨 Execute manual marketing submissions (DAWOOD ACTION)** — IH post (docs/indie-hackers-post-final.md), BetaList (marketing/betalist-submission.md), Reddit posts (docs/reddit-execution-playbook.md) are ALL written and ready. Dawood needs to paste and publish. **This has been the #1 blocker for 3+ days.** MANUAL ACTION REQUIRED. Nothing else matters if nobody sees the site.
- [ ] **Product Hunt launch prep (April 7 target)** — Pre-launch checklist at docs/product-hunt-prelaunch-checklist.md. Per docs/launch-timing-analysis.md, Tuesday April 7 is the better launch day. Prep window: March 25–April 6. Key tasks: gather 5+ upvoter commitments, prep launch day assets, finalize tagline + first comment. ⏰ Prep starts in 3 days.
- [ ] **🤖 Google Search Console sitemap submission** — Sitemap has 118 URLs but needs to be submitted to GSC and monitored. Pages won't rank until indexed. Moved from P1 because SEO is the primary long-term channel and indexing takes weeks — every day of delay costs.

### P1 — This Week (first users → first signal)
- [ ] **Waitlist signup funnel audit** — Test every waitlist form on every landing page. Verify D1 writes work, ConvertKit tags fire, source tracking is accurate. One broken form = lost signups we'll never know about.
- [ ] **Internal linking pass** — 20+ blog posts and 15+ /for/ pages exist but may not cross-link well. Each post should link to 2-3 relevant /for/ pages and vice versa. SEO multiplier.
- [ ] **Set up Resend for waitlist confirmation emails** — Waitlist signups should get an instant confirmation email. Currently silent after signup = bad UX.
- [ ] **Social media presence (DAWOOD ACTION)** — Create/claim Twitter/X account for ChurnRecovery. Start posting threads from docs/twitter-thread-templates.md. The content exists, just needs to be published.

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
- [x] **Review: Are we building too much before validating?** — YES. 100+ pages, 20+ blog posts, 15+ landing pages, zero users. Distribution phase declared in AGENTS.md. ✅
- [x] Meta review 2026-03-22 00:04 — Added priority enforcement rule to AGENTS.md, promoted GSC submission to P0, updated PH target to April 7, flagged analytics+UTM as 3-day overdue
- [ ] **Recurring problem: P0 agent tasks not being picked up** — CF Web Analytics and UTM capture have been P0 for 3+ days. Orchestrator runs but doesn't prioritize them. Added 🔥 flag and priority rule to AGENTS.md. Monitor if this fixes it next cycle.
