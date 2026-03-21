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
- ✅ **Creator landing pages: Memberful, Stan Store, Payhip** — /for/memberful (indigo/purple, Stripe-native podcasters & publishers), /for/stan-store (pink/magenta, 80k+ creators, impulse cancel angle), /for/payhip (green, 130k+ sellers, UK/EU angle). All deployed + HTTP 200 verified. Tags: memberful-creator, stan-store-creator, payhip-seller. Added to sitemap. 133 tests pass. (2026-03-21)
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

- [✅] **Wave 13 — 4 new /for/ pages + 3 blog posts** — DONE 2026-03-21. Deployed + verified HTTP 200.
  - /for/stripe (Stripe direct users, most important — targets "stripe churn recovery" + "stripe cancel flow")
  - /for/squarespace (Squarespace + Stripe subscription sellers)
  - /for/chargebee (Chargebee Retain alternative for small businesses)
  - /for/lemon-squeezy (Honest MoR limitation guide + switching path)
  - posts: stripe-subscription-cancellations-how-to-stop-them
  - posts: dunning-management-guide-small-business
  - posts: cancel-flow-templates (5 ready-to-use templates)
  - All 4 /for/ pages added to sitemap at priority 0.9

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

### Wave 15 — Referral System + Schema Markup (Added 2026-03-21)

- [✅] **Referral tracking system** — DONE 2026-03-21. pages/refer/[code].js (landing page with 30-day cookie, waitlist form inline), pages/refer/index.js (link generator tool), WaitlistForm.js updated (reads cr_referral cookie + accepts referralCode prop), functions/api/waitlist/index.js updated (accepts referral_code, stores in D1 + passes to ConvertKit as tag referred-by-[code] + custom field). migrations/0002_referral_code.sql adds referral_code TEXT column. public/_redirects adds Cloudflare Pages catch-all for /refer/:code. 4 tests in tests/refer.spec.js all pass. HTTP 200 on /refer/testcode verified.
- [✅] **Schema markup for 3 new blog posts** — DONE 2026-03-21. lib/post-schemas.js extended with: HowTo schema for how-to-retain-paying-members (5 steps: cancel flow, pause, value reminders, personal outreach, community), FAQPage schema for hidden-revenue-leak-subscription-business (7 Q&As about voluntary/involuntary churn + retention math), FAQPage schema for discount-vs-pause-vs-cancel-what-saves-subscribers (7 Q&As about cancel flow strategies). All 141 tests pass. Deployed + verified.

### Marketing Wave 14 (Added 2026-03-21)

- [✅] **3 new competitor comparison pages: BrightBack, Paddle Retain, Stripe Billing** — DONE 2026-03-21. /compare/brightback (acquired by Chargebee, free alternative angle), /compare/paddle-retain (Paddle ecosystem lock-in vs Stripe-first ChurnRecovery), /compare/stripe-billing (Stripe has dunning but no cancel flow — ChurnRecovery adds that layer). All HTTP 200. Added to More Comparisons section on all /compare/ pages.
- [✅] **SEO content gap analysis** — DONE 2026-03-21. Full analysis at docs/seo-content-gap-analysis.md: 35+ keyword opportunities (churn+platform, cancel flow+niche, reduce churn+business type, long-tail), competitor content gaps (Churnkey vs ProsperStack), and 10-post priority content calendar.
- [✅] **Press kit + /press page** — DONE 2026-03-21. Press kit at docs/press-kit.md (one-liner, 3-para about, founder bio, key stats, brand colors, 3 pre-approved quotes). Press page live at /press (HTTP 200). "Press" link added to footer Company section.

### Marketing Wave 13 (Added 2026-03-21)

- [✅] **Blog post: how-to-retain-paying-members** — DONE 2026-03-21. ~1,200 words, targets "how to retain paying members", covers cancel flow, pause, value reminders, community, onboarding. CTAs to /demo and /tools/churn-rate-calculator. Live at /posts/how-to-retain-paying-members (HTTP 200).
- [✅] **Blog post: hidden-revenue-leak-subscription-business** — DONE 2026-03-21. ~1,100 words, targets "subscription business revenue leak". Reveals the math behind churn, covers voluntary churn (cancel flow) + involuntary churn (dunning). CTA to /tools/roi-calculator. Live at /posts/hidden-revenue-leak-subscription-business (HTTP 200).
- [✅] **Blog post: discount-vs-pause-vs-cancel-what-saves-subscribers** — DONE 2026-03-21. ~1,000 words, targets "discount vs pause subscription cancel". Data-backed comparison of 3 cancel flow strategies, sequencing guide, segment-based framework. CTA to /demo. Live at /posts/discount-vs-pause-vs-cancel-what-saves-subscribers (HTTP 200).
- [✅] **/for/wix landing page** — DONE 2026-03-21. Wix Payments/Stripe angle, light blue (#0099FF) accent, pain points (no cancel flow, no visibility), waitlist tag: wix-seller. Uses shared PainCard/HowStep/BenefitCard/FAQItem components. Live at /for/wix (HTTP 200).
- [✅] **/for/wordpress landing page** — DONE 2026-03-21. WooCommerce + MemberPress + Paid Memberships Pro angle, indigo (#3858E9) accent, supports all Stripe-connected WordPress setups, waitlist tag: wordpress-seller. Live at /for/wordpress (HTTP 200). generate-sitemap.mjs updated to include all /for/* pages (100 URLs total).

### Marketing Wave 12 (Added 2026-03-21)

- [✅] **Twitter/X thread templates** — DONE 2026-03-21. 5 ready-to-post threads at docs/twitter-thread-templates.md: cancel flow math, Churnkey pricing comparison, cancel flow pattern analysis, ROI math, and building-in-public thread. Each formatted with tweet numbers + char counts + posting tips.
- [✅] **Referral & affiliate strategy** — DONE 2026-03-21. Full strategy at docs/referral-affiliate-strategy.md: referral program design (free-tier-compatible perks + Pro early access), UTM + ConvertKit tracking implementation, 3 affiliate channels (newsletter sponsorships, podcast pitches, content swaps), 20 target newsletters, first 10 partner categories with outreach templates.
- [✅] **Launch announcement email** — DONE 2026-03-21. Full launch email at docs/launch-announcement-email.md: 5 subject line A/B variants, plain-text + HTML-friendly versions, 7-day follow-up sequence, founder-voice tone (no corporate hype), ConvertKit personalization tokens.

### New P2/P3 Tasks — Growth Opportunities (Added 2026-03-21)

- [✅] **P2: Churn rate calculator landing page** — DONE 2026-03-21. `/tools/churn-rate-calculator` deployed (HTTP 200). Full SEO meta, embedded ChurnCalculator, educational benchmarks by membership type, 5-step reduction guide, 7-question FAQ with JSON-LD FAQPage schema, WebApplication schema, waitlist CTAs. Added to sitemap.

- [✅] **P2: Email nurture sequence for waitlist signups** — DONE 2026-03-21. 5-email drip at docs/email-nurture-sequence.md: platform-personalized welcome (Substack/Kajabi/Beehiiv), math email (Day 3 → ROI calculator), cancel flow walkthrough (Day 7 → /demo), "it's really free" objection handling (Day 14), urgency + first-500 perks (Day 21). Full subject lines, preview text, body, CTAs.

- [✅] **P2: Creator landing pages: Memberful, Stan Store, Payhip** — DONE 2026-03-21. /for/memberful (indigo, premium membership), /for/stan-store (pink, 80k+ creators), /for/payhip (teal, indie sellers). All HTTP 200 verified. Tags: memberful-creator, stan-store-creator, payhip-seller.

- [✅] **P3: "Churn Recovery Playbook" lead magnet PDF** — DONE 2026-03-21. Landing page at /resources/churn-recovery-playbook (live, HTTP 200). Content at docs/churn-recovery-playbook-content.md (~2,000 words, 5 sections). "Free Playbook" link added to footer Resources column. WaitlistForm source=playbook for ConvertKit tagging.

- [✅] **P3: Schema markup (FAQ + HowTo) for all blog posts** — DONE 2026-03-21. lib/post-schemas.js with FAQPage (why-subscribers-cancel: 7 Q&As, membership-site-churn-rate: 5 Q&As) + HowTo schemas (reduce-churn-online-course-business: 5 steps, kajabi-cancel-flow: bonus). Dynamic FAQPage schema on all /compare/[slug] pages. Confirmed live in HTML. 134 tests pass.

## UX Research Opportunities
- ✅ **User interview plan** — Newsletter creators, course sellers, small SaaS founders currently paying for churn tools — docs/user-interview-plan.md (2026-03-21)
- [✅] **Progressive disclosure test** — DONE 2026-03-21. Demo at /demo requires no email/login. Added "Try the interactive demo first →" link in waitlist section on homepage.
- ✅ **Trust signals optimization** — Customer logos vs. testimonial quotes effectiveness — docs/trust-signals-strategy.md (2026-03-21)
- [✅] **Mobile UX full audit** — Complete responsive design review. P0 issues fixed, P1/P2 documented at docs/mobile-ux-audit.md (2026-03-21)
- [✅] **Mobile P1/P2 UX fixes applied** — 2026-03-21. P1-1 (pricing grid minmax fix), P1-2 (CancelFlowDemo modal max-height + tap targets), P1-3 (demo code block overflow), P1-4 (pricing hero mobile padding), P1-5 (features grid fix), P1-6 (article prose mobile safety), P1-7 (footer tap targets), P1-9 (compare table min-width 500px), P2-2 (nav tap targets), P2-5 (Google Fonts preconnect). All 137 tests pass. Deployed + HTTP 200 verified.

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
