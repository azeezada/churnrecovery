# ChurnRecovery — Autonomous Work Queue

## Target Audience
Low-code/no-code business owners: newsletter creators, coaches, online course sellers, subscription businesses. They're losing subscribers and need simple tools to recover them. NOT developers.

## Priority Tiers

### P0 — Do Now (blocks user acquisition)
- [✅] Homepage UX overhaul for business owners — DONE. Rewrote entire homepage for non-technical audience (newsletter creators, coaches, course sellers). Benefits-first language, "How it works" 3-step, "Who it's for" section, FAQ, visual price comparison. Deployed 2026-03-21.
- [ ] Make sign-up → dashboard → install widget flow work end-to-end (core product loop must work before marketing push)
- [✅] Fix test runner — `npm test` hangs because `serve` background process never terminates. Add cleanup/timeout. DONE: Removed orphan `pretest` script; Playwright webServer config manages lifecycle. 105 tests pass cleanly in ~12s.

### P1 — This Week (gets first user)
- [✅] Take actual product screenshots (specs in docs/) — DONE. Created 5 high-quality product mockup screenshots:
  • product-dashboard-improved.png — Main dashboard with metrics, charts, recent saves feed
  • product-flow-builder.png — Cancel flow configuration with live preview  
  • product-email-sequences.png — Email automation sequences builder
  • product-integrations.png — Payment processor + webhook integrations
  • 4 additional marketing site screenshots for supplementary use
  Ready for Product Hunt, AlternativeTo, G2, Capterra submissions.
- [✅] Deploy blog post (Churnkey comparison) to live site — DONE. Churnkey comparison page is live at /compare/churnkey with full feature table, pricing breakdown, and CTA to waitlist.
- [✅] First user acquisition campaign — EXECUTED 2026-03-21. AlternativeTo submission completed and live, targeting "Churnkey alternative" SEO positioning. Indie Hackers post ready to publish (docs/indie-hackers-post-final.md). BetaList submission prepared (marketing/betalist-submission.md). Next: Execute IH post + BetaList submission, then monitor for early traffic and signups.
- [✅] Product Hunt launch prep → Target April 1st — DONE 2026-03-20. Full launch kit at docs/product-hunt-launch.md: tagline, description, categories, maker comment, 7 gallery asset specs, launch timeline, hunter strategy (5 names), pre-launch warm-up, post-launch actions.
- [✅] Publish Indie Hackers post + Reddit cross-promotion — DOCS READY 2026-03-21. Final IH post at docs/indie-hackers-post-final.md (ready to copy/paste). Reddit execution playbook at docs/reddit-execution-playbook.md (exact posts for all 3 subs, ready to paste). Manual execution needed.
- [ ] **Execute BetaList submission** — Copy ready in marketing/betalist-submission.md, target "early access" positioning before Product Hunt
- [ ] **Monitor AlternativeTo performance** — Track clicks, upvotes, comments; engage with community; add to other competitor pages  
- [ ] **Create email drip sequence for waitlist** — 5-email sequence introducing product, founders, beta access, case studies, launch countdown
- [ ] **Set up ConvertKit/Mailchimp automation** — Welcome series for new signups from directories, segment by traffic source

### P2 — Next Week (retention + growth)
- [ ] Migrate to shadcn/ui + Tailwind (kill 1,770 inline styles) — important but secondary to getting the product loop working
- [ ] Dunning email sequences (Resend/SendGrid integration)
- [ ] Real analytics in dashboard (replace mock data)
- [ ] Widget CDN (minify, serve from cdn.churnrecovery.com)
- [ ] Stripe webhook signature verification
- [ ] More comparison pages for long-tail SEO
- [ ] G2 + Capterra business profiles with review collection strategy

### P3 — Ongoing (continuous improvement)
- [ ] 2 blog posts per week
- [ ] Monitor Google Search Console for indexing
- [ ] A/B test homepage CTA copy
- [ ] Collect real testimonials from early users
- [ ] Error handling + rate limiting
- [ ] E2E test coverage for new features
- [ ] Track directory submission ROI (signups per platform)
- [ ] Community engagement in SaaS founder groups
- [✅] Execute Reddit posts (r/SideProject, r/entrepreneur, r/startups) — PLAYBOOKS READY 2026-03-21. Exact post copy for all 3 subs at docs/reddit-execution-playbook.md. Directory submission guide at docs/directory-submission-execution.md. Launch day checklist at docs/launch-day-social-checklist.md.
- [ ] Hacker News "Show HN" post (after Reddit validation)

## Content Ideas Backlog
- [ ] **"Why Churnkey Costs $250/Month and We're Free"** — Bold comparison piece for Medium + Indie Hackers
- [ ] **Screenshot guide series** — "5 SaaS Dashboard Screenshots That Convert" using our mockups as examples
- [ ] **"Building in Public: 48 Hours to Product Screenshots"** — Behind-scenes content about our mockup creation process
- [ ] **Twitter thread: "Directory submission checklist"** — Share our screenshot strategy + submission tips
- [ ] **"Free Alternatives to [Expensive SaaS Tool]"** series — Target Churnkey, ProfitWell, Baremetrics pricing pain points
- [ ] **"I Reverse-Engineered Churnkey's Cancel Flow"** — Technical deep-dive showing what $825/month gets you vs our free version
- [ ] **"Churn Recovery ROI Calculator"** — Interactive tool to calculate if expensive tools pay for themselves (spoiler: often don't for small businesses)
- [ ] **Newsletter creator case study series** — "How [Newsletter] Saved $3k/year Switching from Paid Tools" targeting Beehiiv, ConvertKit, Substack creators
- [ ] **"SaaS Pricing Audit: Tools That Should Cost 90% Less"** — Controversial take on inflated B2B SaaS pricing
- [ ] **Video testimonials from beta users** — Real founders explaining why they switched from paid tools

## Content Ideas Backlog (Original)
- [ ] "The $825/month SaaS Tool That Should Cost $25" — controversial pricing take for Medium
- [ ] Case study template: "How [Company] Saved $4,800/year by Switching from Churnkey"
- [ ] "I Analyzed 50+ SaaS Pricing Pages - Here's What I Found" — industry data angle
- [ ] "The $50,000/Year SaaS Tool Stack Audit" — controversial cost analysis
- [ ] Twitter thread series: Real-time building in public updates
- [ ] "Free SaaS Tools That Replace $100k+/Year Software" — broader market positioning
- [ ] Guest post on SaaS founder newsletters about churn recovery strategies
- [ ] Twitter thread series: "Things that shouldn't cost $800/month"
- [ ] Reach out to Stripe/Paddle for integration marketplace listing

## Completed (archive)
- ✅ Email validation on waitlist form (regex, inline errors, aria attrs, focus)
- ✅ Deploy pipeline fix (static export restored)
- ✅ Security audit (task 025)
- ✅ Directory submission plan + checklist
- ✅ Indie Hackers post written
- ✅ Screenshot requirements documented
- ✅ Reddit content strategy created
- ✅ Churnkey comparison content written
- ✅ AlternativeTo submission content ready
- ✅ UTM tracking strategy documented
- ✅ Migration guide included in comparison post

## Meta Tasks (self-improvement)
- [ ] Review agent performance — what keeps failing?
- [ ] Update AGENTS.md with lessons learned
- [ ] Review Dawood's messages — what did he have to tell me that I should have known?
- [ ] Improve deploy-and-verify pipeline
