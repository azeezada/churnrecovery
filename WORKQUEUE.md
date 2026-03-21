# ChurnRecovery — Autonomous Work Queue

## Target Audience
Low-code/no-code business owners: newsletter creators, coaches, online course sellers, subscription businesses. They're losing subscribers and need simple tools to recover them. NOT developers.

## Priority Tiers

### P0 — Do Now (blocks user acquisition)
- [✅] Homepage UX overhaul for business owners — DONE. Rewrote entire homepage for non-technical audience (newsletter creators, coaches, course sellers). Benefits-first language, "How it works" 3-step, "Who it's for" section, FAQ, visual price comparison. Deployed 2026-03-21.
- [ ] Make sign-up → dashboard → install widget flow work end-to-end (core product loop must work before marketing push)
- [✅] Fix test runner — `npm test` hangs because `serve` background process never terminates. Add cleanup/timeout. DONE: Removed orphan `pretest` script; Playwright webServer config manages lifecycle. 105 tests pass cleanly in ~12s.

### P1 — This Week (gets first user)
- [ ] Take actual product screenshots (specs in docs/) — needed for ALL directory submissions + Product Hunt
- [✅] Deploy blog post (Churnkey comparison) to live site — DONE. Churnkey comparison page is live at /compare/churnkey with full feature table, pricing breakdown, and CTA to waitlist.
- [ ] First user acquisition campaign — execute directory submissions (plans ready, need manual account creation)
- [✅] Product Hunt launch prep → Target April 1st — DONE 2026-03-20. Full launch kit at docs/product-hunt-launch.md: tagline, description, categories, maker comment, 7 gallery asset specs, launch timeline, hunter strategy (5 names), pre-launch warm-up, post-launch actions.
- [✅] Publish Indie Hackers post + Reddit cross-promotion — DONE 2026-03-20. Final IH post at docs/indie-hackers-post-final.md (ready to copy/paste). Reddit strategy already in marketing/reddit-strategy.md.

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
- [ ] Execute Reddit posts (r/SideProject, r/entrepreneur, r/startups)
- [ ] Hacker News "Show HN" post (after Reddit validation)

## Content Ideas Backlog
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
