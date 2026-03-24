# Product Hunt Launch Checklist — April 7, 2026

## Status: 14 days to launch

---

## Ready (no action needed)

- [x] Landing pages — 100+ pages live, all CTAs point to /app/sign-up
- [x] Sign-up flow — Clerk production keys, onboarding funnel audited and fixed
- [x] Dashboard — settings, cancel-flow, onboarding all wired to D1 API
- [x] JWT auth — JWKS RS256/ES256 verification, forged tokens rejected
- [x] UTM tracking — first/last-touch attribution capturing
- [x] SEO — sitemap, RSS, schema markup (FAQ + HowTo), 20+ blog posts
- [x] Internal linking — 36 cross-links between blog posts and /for/ pages
- [x] PH gallery assets — 5 images at 1270x760px in `public/ph-assets/`
- [x] PH listing copy — title, tagline, description, maker comment in `docs/product-hunt-action-brief.md`
- [x] Email nurture — 5-email onboarding sequence (Day 0–21) via Resend
- [x] Security — 101 security tests, OWASP coverage, rate limiting on 13 endpoints
- [x] Performance — WebP images, ~500KB payload savings
- [x] UI — shadcn/ui + Magic UI, mobile-optimized
- [x] Tests — 325+ tests passing (Playwright)
- [x] Marketing content — IH, BetaList, Reddit, HN, Twitter threads all drafted

## Dawood Must Do Before Launch

See `docs/dawood-todo.md` for step-by-step instructions.

### By March 25 (TOMORROW)
- [ ] Create Product Hunt upcoming page
- [ ] Set up CF Web Analytics (beacon token)

### By March 27
- [ ] DM Product Hunt hunters (list in `docs/product-hunt-action-brief.md`)
- [ ] Set Clerk webhook + env vars (CLERK_WEBHOOK_SECRET, RESEND_API_KEY, CLERK_JWKS_URL)
- [ ] Verify Resend sender domain (churnrecovery.com)

### By March 31
- [ ] Submit sitemap to Google Search Console
- [ ] Create Twitter/X account, post first threads
- [ ] Post on Indie Hackers (content ready in `docs/indie-hackers-post-final.md`)
- [ ] Submit to BetaList (guide in `docs/betalist-execution-guide.md`)

### By April 4 (3 days before launch)
- [ ] Post Reddit threads (playbook in `docs/reddit-execution-playbook.md`)
- [ ] Confirm PH listing is complete (all 5 gallery images, description, first comment)
- [ ] Draft launch tweet and schedule it
- [ ] Prepare Hacker News Show HN post (content in `docs/hacker-news-show-hn.md`)

### Launch Day — April 7
- [ ] Publish PH listing at 12:01 AM PST
- [ ] Post launch tweet immediately
- [ ] Post Show HN
- [ ] Reply to every PH comment within 1 hour
- [ ] Send launch announcement email (template in `docs/launch-announcement-email.md`)
- [ ] Share in communities from `docs/community-engagement-playbook.md`

### Post-Launch Week (April 7–14)
- [ ] Monitor PH comments and respond
- [ ] Start guest post outreach (`docs/guest-post-strategy.md`)
- [ ] Begin Stripe App Marketplace submission (`docs/stripe-partner-action-brief.md`)
- [ ] Collect first testimonials (`docs/testimonial-collection-playbook.md`)
- [ ] Review analytics — which channels drive sign-ups?

---

## Risk Factors

| Risk | Mitigation |
|------|-----------|
| Zero analytics (no CF beacon) | Set up CF Web Analytics ASAP — can't measure launch success without it |
| Welcome emails not sending | Set Clerk webhook + Resend env vars before any real sign-ups |
| Google hasn't indexed site | Submit sitemap to GSC by March 31 — needs time to crawl |
| No social media presence | Create Twitter account this week, start building audience pre-launch |
| No testimonials yet | Expected — focus on getting first users from PH, collect testimonials after |

---

## What's NOT Needed for Launch

These are nice-to-have but won't block April 7:
- Video testimonials (need users first)
- Stripe App Marketplace (can submit post-launch)
- Guest posts (start outreach post-launch)
- A/B testing results (need traffic first)
