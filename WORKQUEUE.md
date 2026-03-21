# ChurnRecovery — Autonomous Work Queue

## Target Audience
Low-code/no-code business owners: newsletter creators, coaches, online course sellers, subscription businesses. They're losing subscribers and need simple tools to recover them. NOT developers.

## Priority Tiers

### P0 — Do Now (blocks user acquisition)
- [ ] **Execute manual marketing submissions** — IH post (docs/indie-hackers-post-final.md), BetaList (marketing/betalist-submission.md), Reddit posts (docs/reddit-execution-playbook.md) are ALL written and ready. Dawood needs to paste and publish. This is the #1 blocker to getting first users. MANUAL ACTION REQUIRED.
- [ ] **Fix stale build cache issue** — `.next` cache corruption causes ENOENT errors. Add `rm -rf .next` to build script in package.json so agents don't hit this.
- [ ] **Set up ConvertKit/Mailchimp automation** — Welcome series for new signups from directories, segment by traffic source. Email drip content ready at docs/waitlist-email-drip.md.

### P1 — This Week (gets first user)
- [ ] **Monitor AlternativeTo performance** — Track clicks, upvotes, comments; engage with community; add to other competitor pages
- [ ] **CTA clarity audit** — "Get started free" vs "Join waitlist" confusion. Streamline messaging across all pages.
- [✅] **Interactive demo** — Replace generic "Demo" with actual cancel flow preview (reduce friction before email capture)
- [ ] **Hacker News "Show HN" post** — After Reddit/IH validation, write and post
- [ ] **Product Hunt launch (April 1st target)** — Launch kit ready at docs/product-hunt-launch.md. Execute pre-launch warm-up starting ~March 25.

### P2 — Next Week (retention + growth)
- [ ] **Customer logo wall** — Get permission to display actual company logos for trust signals
- [ ] **Migrate to shadcn/ui + Tailwind** — Kill 1,770 inline styles. Important for maintainability but secondary to user acquisition.
- [ ] **Widget CDN** — Minify, serve from cdn.churnrecovery.com
- [ ] **A/B test homepage CTA copy** — Test different conversion approaches
- ✅ **Substack-specific landing page** — "Free Churn Recovery for Newsletter Creators" — docs/substack-landing-page.md (2026-03-21)

### P3 — Ongoing (continuous improvement)
- [ ] 2 blog posts per week (comparison pages, content marketing)
- [ ] Monitor Google Search Console for indexing
- [ ] Collect real testimonials from early users
- [ ] Error handling + rate limiting improvements
- [ ] E2E test coverage for new features
- [ ] Track directory submission ROI (signups per platform)
- [ ] Community engagement in SaaS founder groups
- [ ] Video testimonials from beta users

## Content Ideas Backlog
- [ ] **Screenshot guide series** — "5 SaaS Dashboard Screenshots That Convert" using our mockups as examples
- [ ] **"Building in Public: 48 Hours to Product Screenshots"** — Behind-scenes content
- [ ] **Twitter thread: "Directory submission checklist"** — Share strategy + tips
- [x] **"Free Alternatives to [Expensive SaaS Tool]"** series — Target Churnkey, ProfitWell, Baremetrics pricing pain
- [ ] **"I Reverse-Engineered Churnkey's Cancel Flow"** — Technical deep-dive
- [ ] **"Churn Recovery ROI Calculator"** — Interactive tool
- [ ] **Newsletter creator case study series** — Targeting Beehiiv, ConvertKit, Substack creators
- [x] **"SaaS Pricing Audit: Tools That Should Cost 90% Less"** — Controversial take
- [ ] Case study template: "How [Company] Saved $4,800/year by Switching from Churnkey"
- [ ] "The $50,000/Year SaaS Tool Stack Audit" — broader market positioning
- [ ] Guest post on SaaS founder newsletters about churn recovery strategies
- [ ] Reach out to Stripe/Paddle for integration marketplace listing

## UX Research Opportunities
- ✅ **User interview plan** — Newsletter creators, course sellers, small SaaS founders currently paying for churn tools — docs/user-interview-plan.md (2026-03-21)
- [ ] **Progressive disclosure test** — Let users explore demo before email capture
- ✅ **Trust signals optimization** — Customer logos vs. testimonial quotes effectiveness — docs/trust-signals-strategy.md (2026-03-21)
- [ ] **Mobile UX full audit** — Complete responsive design review

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
- ✅ Mobile nav fix (2026-03-21)
- ✅ Email validation on waitlist form
- ✅ Deploy pipeline fix (static export restored)
- ✅ Security audit
- ✅ Directory submission plan + checklist
- ✅ UTM tracking strategy

## Meta Tasks (self-improvement)
- [x] Review agent performance — concurrent edit failures documented in AGENTS.md
- [x] Update AGENTS.md with stale cache fix + known issues
- [ ] Improve deploy-and-verify pipeline (add cache-clear step)
