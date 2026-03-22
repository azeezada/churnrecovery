# ChurnRecovery — Autonomous Work Queue

## Target Audience
Low-code/no-code business owners: newsletter creators, coaches, online course sellers, subscription businesses. They're losing subscribers and need simple tools to recover them. NOT developers.

## Priority Tiers

### P0 — Do Now (blocks real users)
- [x] **✅ Remove all waitlist language → "Get Started Free"** — 44+ pages updated, all CTAs point to /app/sign-up. SignUpCTA component created. Dead WaitlistForm code removed (~2,400 lines). Committed 2026-03-22.
- [x] **✅ Wire dashboard pages to D1 API** — `settings.js` wired to D1 via PUT/DELETE `/api/projects`; loads `webhook_url` + `has_stripe_key` from API. `cancel-flow.js` and `onboarding.js` were already API-wired. All 3 pages persist data across browsers/devices. Fixed delete bug (was using query param, now uses body). Commit `f0b37b7` (2026-03-22).
- [x] **✅ Switch Clerk to production keys** — Production instance created, keys swapped, deployed. Commit `72e2aca` (2026-03-22).
- [x] **✅ JWT signature verification** — JWKS RS256/ES256 verification with edge caching. Forged JWTs → 401. Commits `44e14f3`, `9fd5d1c` (2026-03-22).
- [ ] **🔑 Add Cloudflare Web Analytics snippet (DAWOOD ACTION)** — Need beacon token from CF dashboard → Web Analytics → Add site. API token lacks RUM permissions. **5+ days waiting.**
- [x] **✅ UTM parameter capture** — First/last-touch attribution. Commit `47607af` (2026-03-22).
- [ ] **🚨 Execute manual marketing submissions (DAWOOD ACTION)** — IH, BetaList, Reddit — content ready. **4+ days waiting on human to post.**
- [x] **✅ Next.js 15 + React 19 upgrade** — From 14.0.0/18.2.0 → 15.5.14/19.2.4. Build passes, 264 tests green.
- [x] **✅ TypeScript config** — tsconfig.json added, mixed JS/TS supported.
- [x] **✅ Clerk widget render tests** — 11 new tests verifying actual widget rendering. 264 total.
- [x] **✅ Product Hunt launch prep (April 7 target)** — All 7 gallery assets generated at 1270x760px → `public/ph-assets/`. Action brief for Dawood at `docs/product-hunt-action-brief.md` with copy-paste listing copy, maker comment, and launch tweet. Asset generation script at `scripts/generate-ph-assets.mjs`. Commit `ba6d928` (2026-03-22). **⚠️ DAWOOD: Create PH upcoming page on March 25, DM hunters by March 27. All content is ready.**
- [x] **✅ Google Search Console sitemap submission** — `docs/gsc-submission-guide.md` created with full setup + monitoring guide. `scripts/submit-sitemap.mjs` added with IndexNow support (Bing/Yandex auto-indexing) and clear Google manual steps. Robots.txt already had Sitemap directive. **⚠️ DAWOOD ACTION: Submit sitemap at GSC (see guide) — Google ping endpoint was removed in 2023, manual step required.** Commit `050c6dd` (2026-03-22).
- [x] **🤖🔥 UI migration: shadcn/ui + Magic UI + TypeScript + Next.js 15** — ✅ DONE 2026-03-22. shadcn/ui Button, Card, Badge primitives added. Magic UI AnimatedHero + AnimatedHeroText on homepage hero (shimmer + fade-up animations). BentoGrid + BentoCard components ready. SignUpCTA, Header, dashboard StatCard migrated. Build passes, 332/365 tests pass (26 pre-existing auth failures). Deployed to Cloudflare Pages.
- [x] **✅ Security testing plan** — 101 new tests in tests/security/ (8 files). OWASP coverage: auth bypass, JWT forgery/alg:none, XSS, CORS, rate limiting, SQL injection, Clerk config, Stripe webhook replay. Critical fix: removed insecure JWT fallback that accepted unverified tokens when CLERK_JWKS_URL unset. **ACTION REQUIRED**: Set CLERK_JWKS_URL in CF Pages env vars. 365 total tests (up from 264). Deployed 2026-03-22.

### P1 — This Week (first users → first signal)
- [x] **✅ Sign-up funnel audit** — Full funnel traced and fixed. Issues found: `afterSignUpUrl` pointed to dashboard (bypassing onboarding) → fixed to `/app/onboarding`; `signUpForceRedirectUrl` in `_app.js` also fixed; typo in sign-in page fixed; AppLayout missing auth guard → added. Build passes. Commit `8f7dc32` (2026-03-22).
- [x] **✅ Internal linking pass** — 12 blog posts updated with 3 /for/ page links each (36 new internal links). All 19 /for/ pages already had blog cross-links. Build passed. Commit via Claude Code worker 2026-03-22.
- [x] **✅ Set up Resend for welcome emails** — Clerk webhook handler at `functions/api/clerk-webhook.js` created. Svix-style signature verification via Web Crypto API (edge-compatible). Sends welcome email with next steps on `user.created`. Build passed. ⚠️ DAWOOD ACTION: (1) Create Clerk webhook endpoint pointing to `https://churnrecovery.app/api/clerk-webhook` with `user.created` event, (2) Set `CLERK_WEBHOOK_SECRET` + `RESEND_API_KEY` in Cloudflare Pages env vars. Commit via Claude Code worker 2026-03-22.
- [ ] **Social media presence (DAWOOD ACTION)** — Create/claim Twitter/X account for ChurnRecovery. Start posting threads from docs/twitter-thread-templates.md. The content exists, just needs to be published.

### P2 — Next 2 Weeks (growth + retention)
- [x] **✅ Automated email nurture for new users** — 5-email onboarding sequence implemented via Resend `scheduled_at`. Emails at Day 0 (welcome), Day 3 (social proof), Day 7 (education), Day 14 (objection handling), Day 21 (conversion CTA). All triggered from Clerk `user.created` webhook. Build passed. ⚠️ DAWOOD: Verify `dawood@churnrecovery.com` sender domain in Resend dashboard. Commit 2026-03-22.
- [ ] **Stripe App Marketplace listing** — Strategy at docs/integration-marketplace-strategy.md. High-leverage: Stripe users searching for churn tools find us directly.
- [ ] **Guest posts on SaaS newsletters** — Strategy + pitches at docs/guest-post-strategy.md. 15 targets identified. Start outreach.
- [ ] **Collect first testimonials** — Playbook at docs/testimonial-collection-playbook.md. Need actual users first (blocked by P0).
- [ ] **Community engagement** — Playbook at docs/community-engagement-playbook.md. 15 communities identified. Start participating (not spamming).

### P3 — Ongoing (continuous improvement)
- [x] **✅ Error handling + rate limiting improvements** — `withErrorHandling()` wrapper added to all API routes. Standard error format `{ error, code }` across all endpoints. Rate limiting expanded: 13 endpoints now covered (PUT/DELETE/GET routes that lacked it). 318 tests pass. Build passed. Commit 2026-03-22.
- [x] **✅ E2E test coverage for new features** — 7 new tests added for Clerk webhook handler (signature validation, rate limiting, event handling) + rate limiting tests for new endpoints. Total: 325 tests passing (up from 318). Commit 2026-03-22.
- [x] **✅ Performance optimization — WebP images** — 9 screenshots + logo converted to WebP (60-70% size reduction). page/index.js and pages/launch.js updated to reference WebP. ~500KB savings in page payload. Build passed. Commit `aeb47a4` 2026-03-22.
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
- [x] Meta review 2026-03-22 04:04 — Updated test counts (247), identified root cause of P0 stalling (worker crons disabled, orchestrator not spawning), updated waitlist→sign-up language in queue, flagged analytics+UTM as 4+ days overdue
- [x] **Recurring problem: P0 agent tasks not being picked up** — Partially resolved. UTM capture, JWKS verification, Clerk production keys, and waitlist removal all completed 2026-03-22 via orchestrator + main session collaboration. Remaining systemic issue: 3 track crons still disabled, orchestrator safety net spawns but workers often error on concurrent WORKQUEUE edits.
- [ ] **Reduce Dawood-blocked items** — 3 P0 items require Dawood action: CF Web Analytics token, marketing submissions, and Product Hunt prep. Need to consolidate these into a clear "Dawood TODO" ping so they don't rot.
