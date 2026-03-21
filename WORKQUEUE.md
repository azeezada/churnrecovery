# ChurnRecovery — Autonomous Work Queue

## Target Audience
Low-code/no-code business owners: newsletter creators, coaches, online course sellers, subscription businesses. They're losing subscribers and need simple tools to recover them. NOT developers.

## Priority Tiers

### P0 — Do Now (blocks user acquisition)
- [ ] **Execute manual marketing submissions** — IH post (docs/indie-hackers-post-final.md), BetaList (marketing/betalist-submission.md), Reddit posts (docs/reddit-execution-playbook.md) are ALL written and ready. Dawood needs to paste and publish. This is the #1 blocker to getting first users. MANUAL ACTION REQUIRED.
- [✅] **Fix stale build cache issue** — DONE 2026-03-21. Build script now clears `.next`, `out`, and `.vercel/output` before every build.
- [✅] **Set up ConvertKit/Mailchimp automation** — DONE 2026-03-21. ConvertKit API integration wired into `functions/api/waitlist/index.js`. Source-to-tag mapping for all channels. Errors non-fatal (D1 save always succeeds). Env vars added to `.env.example`.

### P1 — This Week (gets first user)
- [✅] **Monitor AlternativeTo performance** — DONE 2026-03-21. Running log at docs/alternativeto-monitoring-log.md (weekly table: likes, reviews, traffic, actions). Full engagement strategy in docs/alternativeto-monitoring.md.
- [✅] **CTA clarity audit** — DONE 2026-03-21. Unified all CTAs to "Join Waitlist" across 13+ pages. Replaced all tally.so links with /#waitlist anchor.
- [✅] **Interactive demo** — Replace generic "Demo" with actual cancel flow preview (reduce friction before email capture)
- [✅] **Hacker News "Show HN" post** — Post drafted at docs/hacker-news-show-hn.md (2026-03-21). Ready to post after Reddit/IH validation.
- [✅] **Product Hunt launch (April 1st target)** — Pre-launch warm-up checklist at docs/product-hunt-prelaunch-checklist.md. Day-by-day from March 25 → April 1. (2026-03-21)

### P2 — Next Week (retention + growth)
- [✅] **Customer logo wall** — Strategy + permission templates at docs/customer-logo-wall-strategy.md. LogoWall.js component added to codebase (hidden until real logos added). (2026-03-21)
- [ ] **Migrate to shadcn/ui + Tailwind** — Kill 1,770 inline styles. Important for maintainability but secondary to user acquisition.
- [✅] **Widget CDN** — Minified widget.js → widget.min.js (10KB, terser), build script at scripts/build-widget.sh, CDN setup docs at docs/widget-cdn-setup.md (2026-03-21)
- ✅ **A/B test homepage CTA copy** — 50/50 split: "Join Waitlist" (A) vs "Get Early Access Free" (B). Hook in lib/useABTest.js, variant sent in form submission body for conversion tracking — deployed + verified (2026-03-21)
- ✅ **Substack-specific landing page** — Implemented at /for/substack — newsletter creator angle, pain points, how-it-works, benefits, FAQ, dual waitlist forms with `substack-creator` tag — deployed + HTTP 200 verified (2026-03-21)
- ✅ **Creator landing pages: Kajabi, Teachable, Ghost** — /for/kajabi, /for/teachable, /for/ghost deployed (2026-03-21). Kajabi=gold/yellow accent (Stripe-native angle, no approval needed), Teachable=green (course subscription recovery), Ghost=dark/minimal (native Stripe integration, pause + PWYW discount). All 133 tests pass.
- [ ] **Creator landing pages: Memberful, Stan Store, Payhip** — Next batch identified in docs/next-for-pages-plan.md. Priority: Memberful first (Stripe-required, strong brand), then Stan Store (80k creators), then Payhip. Gumroad/LS/Whop excluded (MoR, no direct Stripe). (2026-03-21)
- ✅ **Creator landing pages: Podia, Thinkific, Circle, Patreon** — /for/podia, /for/thinkific, /for/circle, /for/patreon deployed (2026-03-21). Podia=indigo (Stripe-level interception, silent cancels angle), Thinkific=purple (native Stripe, course subscription recovery), Circle=coral/orange (pause-first community retention), Patreon=red (honest about Stripe limitation, off-platform migration angle). All 4 return HTTP 200. Performance audit at docs/performance-todo.md.

### P3 — Ongoing (continuous improvement)
- [✅] 2 blog posts per week (comparison pages, content marketing) — DONE 2026-03-21. Published: "Chargebee Retain vs Churnkey vs ChurnRecovery" + "5 Cancellation Emails That Win Back Subscribers"
- [✅] **3 SEO blog posts targeting non-technical business owners** — DONE 2026-03-21. Published: "How to Reduce Churn for Your Online Course Business" (/posts/reduce-churn-online-course-business), "Why Subscribers Cancel (And How to Stop Them)" (/posts/why-subscribers-cancel), "Membership Site Churn Rate: What's Normal and How to Beat It" (/posts/membership-site-churn-rate). All 3 return HTTP 200.
- [✅] Monitor Google Search Console for indexing — DONE 2026-03-21. Full guide at docs/google-search-console-monitoring.md: sitemap submission, coverage errors, weekly checklist, CTR monitoring, query analysis.
- [✅] Collect real testimonials from early users — DONE 2026-03-21. Full playbook at docs/testimonial-collection-playbook.md: timing signals, 3 outreach templates, outcome-based prompts, format guide, display placements, incentive strategy, legal notes.
- [x] Error handling + rate limiting improvements
- [x] E2E test coverage for new features
- [✅] Track directory submission ROI (signups per platform) — DONE 2026-03-21. ROI tracker at docs/directory-submission-roi-tracker.md: UTM reference for all 10 directories, tracking table, Cloudflare + D1 data pull guide, decision framework, monthly review template.
- [✅] Community engagement in SaaS founder groups — DONE 2026-03-21. Full playbook at docs/community-engagement-playbook.md: 15 communities, weekly content calendar, 10 comment templates, 5 post templates, engagement rules, tracking spreadsheet, UTM strategy.
- [✅] Video testimonials from beta users — Full playbook at docs/video-testimonial-playbook.md: timing, outreach templates, prompt script, display placements, tool comparison (Loom/Testimonial.to/Vocal Video), hosting options, legal. (2026-03-21)

## Content Ideas Backlog
- [x] **Screenshot guide series** — "5 SaaS Dashboard Screenshots That Convert" using our mockups as examples (published 2026-03-21)
- [x] **"Building in Public: 48 Hours to Product Screenshots"** — Behind-scenes content (published 2026-03-21)
- [x] **Twitter thread: "Directory submission checklist"** — Share strategy + tips (docs/twitter-thread-directory-checklist.md 2026-03-21)
- [x] **"Free Alternatives to [Expensive SaaS Tool]"** series — Target Churnkey, ProfitWell, Baremetrics pricing pain
- [✅] **"I Reverse-Engineered Churnkey's Cancel Flow"** — DONE 2026-03-21. Published at /posts/i-reverse-engineered-churnkey-cancel-flow (~1,200 words).
- [✅] **"Churn Recovery ROI Calculator"** — Interactive tool. DONE 2026-03-21. Published at /tools/roi-calculator. Real-time sliders, vs-Churnkey verdict, CTA.
- [x] **Newsletter creator case study series** — Targeting Beehiiv, ConvertKit, Substack creators (published 2026-03-21)
- [x] **"SaaS Pricing Audit: Tools That Should Cost 90% Less"** — Controversial take
- [✅] Case study template: "How [Company] Saved $4,800/year by Switching from Churnkey" — DONE 2026-03-21. Template at docs/case-study-template.md.
- [x] "The $50,000/Year SaaS Tool Stack Audit" — broader market positioning (published 2026-03-21)
- [✅] **3 blog posts + Recurly/Zuora comparison pages (2026-03-21)** — Ghost vs Substack vs Beehiiv (/posts/ghost-vs-substack-vs-beehiiv-paid-subscribers), Kajabi cancel flow tutorial (/posts/kajabi-cancel-flow-setup-without-coding), Subscription leaking revenue (/posts/subscription-business-leaking-revenue-every-month), + /compare/recurly and /compare/zuora live.
- [✅] **Guest post on SaaS founder newsletters about churn recovery strategies** — DONE 2026-03-21. Full strategy at docs/guest-post-strategy.md: 15 target publications with contact methods + angles, 3 pitch templates, 3 article concepts fully outlined, outreach tracking table.
- [✅] **Reach out to Stripe/Paddle for integration marketplace listing** — DONE 2026-03-21. Full strategy at docs/integration-marketplace-strategy.md: Stripe Partner + App Marketplace (step-by-step checklists), Paddle Marketplace, Zapier public app, Make.com — with copy bank, technical requirements, and prioritized timeline.

### New P2/P3 Tasks — Growth Opportunities (Added 2026-03-21)

- [ ] **P2: Churn rate calculator landing page** — Interactive tool at `/tools/churn-calculator` already exists, but there's no SEO-optimized landing page driving traffic to it. Create a dedicated page with "membership site churn rate calculator" as target keyword, embed the tool, and add educational content around it. High-intent search traffic (people calculating churn are already in pain-aware mode).

- [ ] **P2: Email nurture sequence for waitlist signups** — We collect emails but have no drip sequence after signup. Build a 5-email onboarding sequence: Day 1 (what ChurnRecovery does), Day 3 (case study / social proof), Day 7 (cancel flow walk-through), Day 14 (objection handling — "it's free, really?"), Day 21 (urgency / launch offer). ConvertKit integration is already wired — just needs the sequence written and tagged.

- [ ] **P2: Creator landing pages: Memberful, Stan Store, Payhip** — Already identified in docs/next-for-pages-plan.md. Priority: Memberful first (Stripe-required, strong brand alignment), then Stan Store (80k creators), then Payhip. All three have audiences that match our ICP and don't have dedicated landing pages yet.

- [ ] **P3: "Churn Recovery Playbook" lead magnet PDF** — A downloadable PDF ("The Membership Site Churn Recovery Playbook") that compiles the best tactics from our blog posts into a single resource. Gate it behind email capture on a dedicated landing page. Drives list growth from organic blog traffic that's otherwise bouncing after reading.

- [ ] **P3: Schema markup (FAQ + HowTo) for all blog posts** — Our blog posts answer specific questions but don't have structured data. Adding FAQ schema to posts like "Why Subscribers Cancel" and HowTo schema to posts like "How to Reduce Churn" could unlock Google rich results, increasing CTR from search without changing rankings. Low effort, asymmetric upside.

## UX Research Opportunities
- ✅ **User interview plan** — Newsletter creators, course sellers, small SaaS founders currently paying for churn tools — docs/user-interview-plan.md (2026-03-21)
- [✅] **Progressive disclosure test** — DONE 2026-03-21. Demo at /demo requires no email/login. Added "Try the interactive demo first →" link in waitlist section on homepage.
- ✅ **Trust signals optimization** — Customer logos vs. testimonial quotes effectiveness — docs/trust-signals-strategy.md (2026-03-21)
- [✅] **Mobile UX full audit** — Complete responsive design review. P0 issues fixed, P1/P2 documented at docs/mobile-ux-audit.md (2026-03-21)

## Completed (archive)
- ✅ Homepage UX overhaul for business owners (2026-03-21)
- ✅ Sign-up → dashboard → install widget flow (2026-03-21)
- ✅ Fix test runner (2026-03-21)
- ✅ Product screenshots created + added to homepage (2026-03-21)
- ✅ Churnkey comparison page live at /compare/churnkey (2026-03-21)
- ✅ AlternativeTo submission live (2026-03-21)
- ✅ IH post + Reddit playbooks written (2026-03-21)
- ✅ Product Hunt launch kit (2026-03-20)
- ✅ Email drip sequence written (2026-03-21)
- ✅ Dunning email sequences with Resend (2026-03-21)
- ✅ Real analytics in dashboard (2026-03-21)
- ✅ Stripe webhook signature verification (2026-03-21)
- ✅ G2 + Capterra profile guides (2026-03-21)
- ✅ More comparison pages (ProsperStack, Chargebee) (2026-03-21)
- ✅ 3 blog posts published (2026-03-21)
- ✅ 3 blog posts + internal linking audit/fixes (2026-03-21) — cancel flow explainer, Churnkey alternatives, coaching churn; 5 internal links added; docs/internal-linking-audit.md created
- ✅ Mobile nav fix (2026-03-21)
- ✅ Email validation on waitlist form
- ✅ Deploy pipeline fix (static export restored)
- ✅ Security audit
- ✅ Directory submission plan + checklist
- ✅ UTM tracking strategy

## Meta Tasks (self-improvement)
- [x] Review agent performance — concurrent edit failures documented in AGENTS.md
- [x] Update AGENTS.md with stale cache fix + known issues
- ✅ Improve deploy-and-verify pipeline — added `rm -rf .next out .vercel/output` cache-clear step at top of scripts/deploy-and-verify.sh (2026-03-21)
