# ChurnRecovery SEO/AEO/GEO/AIO Audit Report

**Date:** 2026-03-27
**Scope:** Full audit — Technical SEO, Answer Engine Optimization, Generative Engine Optimization, AI Optimization
**Audited by:** Automated code-level + live SERP analysis

---

## Executive Summary

ChurnRecovery has strong foundational SEO infrastructure — 74 page files, canonical URLs via `_app.js`, 119-URL sitemap with `lastmod` dates, and global Organization + WebSite JSON-LD schemas. However, the site has **zero brand SERP presence** — searching "ChurnRecovery" and "churnrecovery.com" returns only competitor domains (Churn Buster, Churnkey, Churn Solution, Churnfree). The brand is not yet indexed or recognized by Google as a distinct entity. The biggest technical gaps are: 30 `/for/` platform pages have no page-level JSON-LD, blog posts lack `BlogPosting` schema entirely, and only 6 of 45 blog posts have FAQ/HowTo schemas in `lib/post-schemas.js`. The AEO/GEO foundation (answer-first structure strategy, llms.txt file, fact-dense content guidelines) is documented but not yet systematically implemented across content.

---

## Scorecard

| Category | Score | Key Strength | Key Gap |
|----------|-------|-------------|---------|
| SEO | 6/10 | All 66 content pages have title + meta desc; canonical URLs auto-generated in `_app.js`; 119-URL sitemap | Zero brand SERP presence; 30 `/for/` pages lack page-level JSON-LD; no `BlogPosting` schema on any post |
| AEO | 4/10 | 6 posts have rich FAQ/HowTo schemas; detailed AEO strategy doc exists (`docs/ai-answer-optimization.md`) | Only 6/45 posts (13%) have FAQ/HowTo schemas; no systematic answer-first content structure enforcement |
| GEO | 3/10 | Comprehensive content gap analysis with 35 keyword opportunities identified; 45 blog posts published | No G2/Capterra profiles; no Reddit/Quora presence; no backlinks from authoritative SaaS blogs; zero AI citations detected |
| AIO | 5/10 | `llms.txt` created with structured product info; Organization + WebSite schemas site-wide; `knowsAbout` populated | No AI crawler rules in `robots.txt`; `sameAs` array empty in Organization schema; no `BlogPosting` schema for AI extraction |

---

## Phase 1: Technical SEO Audit

### Title Tags

**Status: FIXED since last audit (was 58 missing, now 0 missing on content pages)**

All 66 content page files in `pages/` now have `<title>` tags. The previous audit (2026-03-21) flagged 58 missing titles — these have been addressed.

**Pages with titles (confirmed by code grep):**
- `pages/index.js` — "ChurnRecovery -- Stop Losing Subscribers You Already Earned"
- `pages/pricing.js` — "Pricing -- ChurnRecovery | $20/month, 30-Day Free Trial"
- `pages/posts/[slug].js` — Dynamic: `{meta.title} -- ChurnRecovery Blog`
- All 30 `/for/` pages — Platform-specific titles
- All `/app/` pages — Dashboard-specific titles
- `pages/integrations/[slug].js`, `pages/compare/[slug].js`, `pages/alternatives/[slug].js` — Dynamic titles
- `pages/use-cases/[slug].js`, `pages/use-cases.js` — Dynamic and static titles

**Remaining issues:**
- 7 redirect/utility pages have no titles: `changelog.js`, `press.js`, `social-proof.js`, `styles/index.js`, `styles/warm-saas.js`, `styles/developer.js`, `styles/data-forward.js` — all are redirect stubs (`router.replace('/')`) so no title is needed
- Some titles exceed 60 chars (e.g., `pages/for/shopify.js` at ~85 chars, `pages/for/saas.js` at ~82 chars)
- Duplicate title patterns: `pages/app/sign-in/[[...index]].js` renders "Sign In -- ChurnRecovery" in two conditional branches; same for sign-up

### Meta Descriptions

**Status: GOOD — all content pages have meta descriptions**

Every page file that renders content has a `<meta name="description">` tag. The only pages without descriptions are:
- `pages/app/dashboard.js` — no description (app page, acceptable)
- `pages/app/projects.js` — no description (app page, acceptable)
- `pages/app/onboarding.js` — no description (app page, acceptable)
- `pages/app/cancel-flow.js` — no description (app page, acceptable)
- `pages/app/install.js` — no description (app page, acceptable)

**Length issues to review:**
- Several `/for/` pages have descriptions exceeding 160 chars (e.g., `pages/for/shopify.js` at ~210 chars)
- App pages (`/app/*`) don't need descriptions since they're behind auth and should be noindexed

### Structured Data (JSON-LD)

**Status: PARTIAL — strong foundation, significant gaps in coverage**

**Global schemas (via `pages/_app.js`, applied to ALL pages):**
1. `Organization` schema — name, url, logo, description, `knowsAbout` (9 topics). **Gap:** `sameAs` array is empty `[]` — should include Twitter, GitHub, LinkedIn URLs when available.
2. `WebSite` schema — with `SearchAction` for sitelinks search box.

**Page-level schemas (16 files have their own JSON-LD):**

| Page | Schema Type(s) | Notes |
|------|---------------|-------|
| `pages/index.js` | `SoftwareApplication` | Price, features, category |
| `pages/about.js` | Custom (needs verification) | |
| `pages/pricing.js` | Custom (needs verification) | |
| `pages/demo.js` | Custom | |
| `pages/docs.js` | Custom | |
| `pages/features.js` | Custom | |
| `pages/compare/[slug].js` | 3 schemas per page | Competitor comparison |
| `pages/alternatives/[slug].js` | Custom | |
| `pages/integrations/[slug].js` | Custom | |
| `pages/use-cases/[slug].js` | Custom | |
| `pages/posts/[slug].js` | BreadcrumbList + post-specific schemas | Only 6 posts have schemas |
| `pages/templates/[slug].js` | Custom | |
| `pages/templates/index.js` | Custom | |
| `pages/tools/churn-calculator.js` | Custom | |
| `pages/tools/churn-rate-calculator.js` | 2 schemas | |
| `pages/resources/churn-recovery-playbook.js` | Custom | |

**Critical gaps — pages WITHOUT page-level JSON-LD:**

1. **All 30 `/for/` platform pages** — These are high-value landing pages (saas.js, kajabi.js, stripe.js, substack.js, etc.) with zero page-level structured data. They should each have a `WebPage` or `Product` schema.
2. **`pages/blog.js`** — Blog index page has no `CollectionPage` schema.
3. **`pages/integrations/index.js`** — Integrations hub page has no schema.
4. **`pages/tools/roi-calculator.js`** — Missing schema despite other tools having them.
5. **`pages/status.js`** — Could use `WebPage` schema.
6. **`pages/launch.js`** — Missing schema.

**Blog post schemas (`lib/post-schemas.js`):**
Only **6 out of 45 posts** (13%) have structured data defined:

| Post Slug | Schema Type | Question Count |
|-----------|------------|----------------|
| `why-subscribers-cancel` | FAQPage | 7 questions |
| `membership-site-churn-rate` | FAQPage | 5 questions |
| `hidden-revenue-leak-subscription-business` | FAQPage | 7 questions |
| `discount-vs-pause-vs-cancel-what-saves-subscribers` | FAQPage | 7 questions |
| `reduce-churn-online-course-business` | HowTo | 5 steps |
| `how-to-retain-paying-members` | HowTo | 5 steps |
| `kajabi-cancel-flow-setup-without-coding` | HowTo | 3 steps |

**Missing entirely:** `BlogPosting` or `Article` schema. The `pages/posts/[slug].js` template does NOT generate a `BlogPosting` schema for any post. It only injects schemas from `lib/post-schemas.js` (which only covers 6 posts) and a `BreadcrumbList`. This is a major gap — every blog post should auto-generate a `BlogPosting` schema with `headline`, `datePublished`, `dateModified`, `author`, and `publisher`.

### Sitemap & Robots

**`public/sitemap.xml`:**
- 119 URLs included
- All entries have `<lastmod>` dates
- **Gap:** 45 blog posts exist in `src/posts/` but sitemap URL count (119) suggests not all content is included. Need to verify dynamic pages (compare, alternatives, templates, use-cases) are in sitemap.

**`public/robots.txt`:**
```
User-agent: *
Allow: /
Sitemap: https://churnrecovery.com/sitemap.xml
User-agent: *
Disallow: /styles/
```

**Issues:**
1. **Duplicate `User-agent: *` blocks** — should be consolidated into one block.
2. **No AI crawler rules** — No specific rules for GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended. These should be explicitly `Allow`ed to maximize AI citation eligibility.
3. **`/app/` pages not blocked** — Dashboard pages (`/app/dashboard`, `/app/analytics`, etc.) are behind auth but not disallowed in robots.txt. They should be blocked from crawling.
4. **No `llms.txt` reference** — `robots.txt` doesn't mention `llms.txt` (though browsers/bots can discover it at the standard path).

### Internal Linking

**Strengths:**
- Homepage (`pages/index.js`) links to `/demo`, `/blog`, `/app/sign-up`, `/compare/churnkey`
- Blog post template links back to `/blog` and `/` (home)
- `/for/` pages have cross-links to related platforms in content

**Gaps:**
- No systematic internal linking audit has been performed
- Blog posts rendered via markdown (`dangerouslySetInnerHTML`) — internal links depend on manual inclusion in markdown source files
- No breadcrumb navigation on `/for/` pages, `/compare/` pages, or `/integrations/` pages (only blog posts have BreadcrumbList schema)
- No "related posts" component at the bottom of blog posts
- Homepage only shows 3 most recent posts — no topical clustering visible

### Core Web Vitals & Performance

**Strengths:**
- Next.js static export (fast TTFB)
- Images use `.webp` format (`/screenshots/homepage-hero.webp`)
- Font preconnect tags for Google Fonts, Clerk, Stripe
- Cloudflare Web Analytics (lightweight, privacy-first)
- `display=swap` on Google Fonts (prevents render blocking)

**Gaps:**
- Google Fonts loaded via external stylesheet link (render-blocking potential) — should consider self-hosting
- No `next/image` optimization visible in `pages/index.js` (using raw `<img>` tags)
- Multiple preconnect domains (fonts.googleapis.com, fonts.gstatic.com, clerk.churnrecovery.com, accounts.churnrecovery.com, js.stripe.com, m.stripe.com) — 6 preconnects may cause resource contention
- No `loading="lazy"` attribute on below-fold images in `pages/index.js`

---

## Phase 2: AEO Audit (Answer Engine Optimization)

### FAQ Schema Coverage

**Current state:** 4 out of 45 blog posts have FAQPage schema (9%)

Posts with FAQ schemas:
1. `why-subscribers-cancel` — 7 questions
2. `membership-site-churn-rate` — 5 questions
3. `hidden-revenue-leak-subscription-business` — 7 questions
4. `discount-vs-pause-vs-cancel-what-saves-subscribers` — 7 questions

**Priority posts that SHOULD have FAQ schemas but don't:**
- `what-is-a-cancel-flow` — Definitional content, perfect for FAQ
- `voluntary-vs-involuntary-churn` — Comparison/explainer content
- `Cancel-Flow-Examples` — "What" and "how" questions
- `stripe-subscription-cancellations-how-to-stop-them` — How-to queries
- `dunning-management-guide-small-business` — Definitional + how-to
- `newsletter-creator-guide-reducing-churn` — Niche audience FAQ
- `coaching-business-churn` — Niche audience FAQ
- `shopify-subscription-churn` — Platform-specific FAQ
- `woocommerce-subscription-cancel-flow` — Platform-specific FAQ

**Homepage FAQ:** The homepage (`pages/index.js`) has 5 FAQ items rendered in HTML but NO corresponding `FAQPage` JSON-LD schema. This is a high-priority miss — the homepage FAQ should have schema markup for rich snippet eligibility.

### Answer-First Content Structure

**Strategy documented:** `docs/ai-answer-optimization.md` defines the pattern:
```
## [Question-format heading]
[40-60 word direct answer paragraph]
[Supporting details, examples, data]
```

**Implementation status:** Not systematically audited across all 45 posts. The strategy doc exists but there is no enforcement mechanism. Blog posts are written in markdown (`src/posts/*.md`) and rendered via `dangerouslySetInnerHTML` — the structure depends entirely on author discipline.

**Recommendation:** Audit the top 10 highest-traffic posts for answer-first structure compliance. Add a checklist to the blog style guide (`docs/blog-style-guide.md`).

### Fact Density Assessment

**Strong in schema content:** The FAQ answers in `lib/post-schemas.js` are packed with specific numbers:
- "saves 20-35% of cancellation attempts"
- "15-25% of at-risk subscribers will choose a pause"
- "paused subscribers return at 60-70%"
- "At 6% monthly churn you lose roughly 52% of your membership base every year"

**Homepage:** Good fact density — "5-10% of payments fail every month," "~70% of failed payments can be recovered," "20-40% of cancels can be saved."

**Gap:** Cannot verify fact density across all 45 blog posts without reading each markdown file, but the pattern established in schema content is strong and should be replicated.

### Content Length Analysis

**45 blog posts** in `src/posts/`. The AEO strategy doc recommends 1,900+ words for AI citations, with 2,900+ performing even better.

**Content calendar targets** (from `docs/seo-content-gap-analysis.md`):
- Planned posts range from 800-1,500 words — several fall below the 1,900 word threshold recommended for AI citation eligibility
- Recommendation: Increase minimum target to 1,500 words, with pillar content at 2,500+

---

## Phase 3: GEO Audit (Generative Engine Optimization)

### Content Freshness

**Strengths:**
- Blog posts include `datePublished` via frontmatter and `article:published_time` meta tags
- llms.txt includes "Last updated: 2026-03-27"

**Gaps:**
- No `dateModified` in any schema markup — the AEO strategy doc explicitly calls this out as important
- No visible "last updated" dates on blog post pages (only publication date shown)
- Blog post template (`pages/posts/[slug].js`) only renders `meta.date` — no mechanism for `dateModified`
- Sitemap `<lastmod>` dates exist but may not reflect actual content updates

### Topical Authority Coverage

**Current topic clusters:**

| Cluster | Pages | Depth |
|---------|-------|-------|
| Cancel flows | ~8 posts + /demo + /templates | Strong |
| Churn prevention | ~10 posts + /features | Strong |
| Platform-specific (/for/) | 30 landing pages | Wide but shallow (no matching blog tutorials) |
| Competitor comparison | /compare/ + /alternatives/ + ~4 posts | Moderate |
| Dunning/payment recovery | ~3 posts | Thin |
| Pricing/economics | ~4 posts | Moderate |
| Newsletter churn | ~3 posts + /for/substack, /for/ghost, etc. | Moderate |

**Major gaps:**
- No "state of churn" benchmark report (competitor Churnkey publishes these)
- No case studies with real customer data
- No "churn recovery audit checklist" (competitor ProsperStack has this)
- Thin coverage of dunning/payment recovery (only ~3 posts for a core feature)

### Co-Citation Signals

**Current external presence: NONE DETECTED**

Based on SERP analysis:
- No G2 profile
- No Capterra listing
- No Product Hunt launch
- No Reddit presence (r/SaaS, r/startups)
- No Quora answers
- No guest posts on SaaS blogs
- No podcast appearances
- No Hacker News Show HN post

**Impact:** AI models weight co-citation signals heavily. Without mentions on trusted third-party platforms, ChurnRecovery will not be cited in AI answers regardless of on-site content quality.

**Organization schema `sameAs`:** Currently an empty array `[]` in `pages/_app.js` (line 91). This should be populated with all verified social/platform profiles as they're created.

### Semantic Completeness

**Keyword coverage analysis** (from `lib/target-keywords.js`):

- **Primary keywords (11):** Content exists for most, but rankings are absent from SERPs
- **Secondary keywords (14):** Partial coverage — "how to build a cancel flow," "exit survey best practices," "win-back email templates" have matching blog posts
- **Long-tail keywords (18):** Good coverage — posts targeting "what is a cancel flow," "churn rate calculator," "stripe cancel flow"
- **Competitor keywords (12):** Comparison pages exist for major competitors
- **Platform keywords (10):** All have `/for/` landing pages but most lack supporting blog content
- **Niche keywords (9):** Partially covered by blog posts

**Missing semantic coverage (no content exists):**
- "payment retry optimization"
- "smart payment retries"
- "a/b test cancellation flows"
- "customer offboarding software"
- "b2b saas churn vs b2c churn"
- "saas churn rate by company size"
- "best time to retry failed payment"

---

## Phase 4: AIO Audit (AI Optimization)

### llms.txt

**Status: CREATED** at `public/llms.txt`

**Strengths:**
- Structured with clear sections: What is ChurnRecovery, Key Features, Use Cases, Key Stats, Documentation, Comparison Pages, Contact
- Includes specific stats ("Cancel flows save 20-35% of cancellation attempts")
- Links to all major sections of the site
- Clean markdown format following the llms.txt specification

**Gaps:**
- No `llms-full.txt` with extended product documentation
- Could include more FAQ-style Q&A pairs for direct AI extraction
- Missing pricing information (important for comparison queries)

### AI Crawler Access

**`public/robots.txt` — NO AI-specific rules**

Current robots.txt does not mention any AI crawlers. The following should be explicitly allowed:

```
# AI Crawlers — explicitly allow for citation eligibility
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /
```

Many sites are now blocking AI crawlers by default. By explicitly allowing them, ChurnRecovery signals openness to AI indexing and increases citation probability.

### Schema Completeness

**What's present:**
- Organization (site-wide)
- WebSite with SearchAction (site-wide)
- SoftwareApplication (homepage)
- BreadcrumbList (blog posts)
- FAQPage (6 blog posts)
- HowTo (3 blog posts)

**What's missing:**
- `BlogPosting` / `Article` schema on ALL blog posts (critical)
- `Product` or `WebPage` schema on `/for/` platform pages (30 pages)
- `FAQPage` schema on homepage (has FAQ content but no schema)
- `ItemList` / `CollectionPage` on blog index (`pages/blog.js`)
- `SoftwareApplication` `aggregateRating` (was in strategy doc but not in current `pages/index.js`)
- `foundingDate` in Organization schema
- Populated `sameAs` in Organization schema
- `author` schema on blog posts (no `Person` or `Organization` author defined)

### Semantic HTML Structure

**Heading hierarchy audit (sampled pages):**

**`pages/index.js` (Homepage):**
- h1: "Your subscribers are leaving. Most would stay if you asked." -- GOOD, single h1
- h2: "You're losing money every single month..." -- GOOD
- h2: "Keep more subscribers without more work" -- GOOD
- h3: Benefit card titles -- GOOD, nested under h2
- h2: "Three steps. Five minutes. More revenue." -- GOOD
- h2: "Perfect for creators, coaches, and small businesses" -- GOOD
- h2: Pricing section -- GOOD
- h2: CTA section -- GOOD
- h2: FAQ section -- GOOD
- h2: Blog section -- GOOD
- **Verdict: CLEAN hierarchy, proper nesting**

**`pages/features.js`:**
- h1: Present (hero heading)
- h3: Feature cards (skips h2 in some sections) -- MINOR ISSUE
- h2: Multiple sections -- GOOD
- **Verdict: Minor skip from h1 to h3 in feature cards**

**`pages/pricing.js`:**
- h1: Present
- h3: Plan names (under h1, skipping h2) -- MINOR ISSUE
- h2: FAQ section
- h2: CTA section
- **Verdict: h1 -> h3 skip in plan cards**

**`pages/for/saas.js` (representative `/for/` page):**
- h1: Present in hero
- h2: Multiple content sections -- GOOD
- h3: Stat cards, feature items -- GOOD nesting
- **Verdict: CLEAN hierarchy**

**`pages/demo.js`:**
- h1: Present
- h2: Multiple sections -- GOOD
- h3: Feature items -- GOOD
- **Verdict: CLEAN hierarchy**

**Overall:** Heading hierarchy is generally well-structured. Minor h1->h3 skips on `features.js` and `pricing.js` feature/plan cards. Blog post heading structure depends on markdown content (not audited per-post).

---

## Phase 5: Competitive SERP Analysis

**Search Date:** 2026-03-27
**Method:** Live web search for top keywords from `lib/target-keywords.js`

| Keyword | #1 Result | #2 Result | #3 Result | ChurnRecovery Position | SERP Features |
|---------|-----------|-----------|-----------|----------------------|---------------|
| `churn recovery software` | Churn Buster (churnbuster.io) | VWO (vwo.com) | MRRSaver (mrrsaver.com) | **Not found in top 10** | Listicle results, product comparisons |
| `cancel flow software SaaS` | Userpilot (userpilot.com) | The Good (thegood.com) | Raaft (raaft.io) | **Not found in top 10** | How-to content, examples, product pages |
| `churn prevention software free` | Zendesk (zendesk.com) | Churnfree (churnfree.com) | SourceForge (sourceforge.net) | **Not found in top 10** | Listicle results, free tool comparisons |
| `churn deflection software` | SubscriptionFlow | OneBill | CloudBlue (glossary) | **Not found in top 10** | Definitions, product pages |
| `free dunning management software` | Lunos.ai | Gaviti | Churn Buster | **Not found in top 10** | Listicle results, product comparisons |
| `customer retention tool SaaS` | Chattermill | SaaSRetentionTools.com | Chargebee | **Not found in top 10** | Listicle results, guide content |
| `how to reduce SaaS churn` | Baremetrics | Revenera | Stripe | **Not found in top 10** | How-to guides, PAA boxes likely |
| `churnkey alternative free` | SaaSWorthy | G2 | Slashdot | **Not found in top 10** | Alternative/comparison listicles |
| `what is a cancel flow` | Userpilot | Raaft | HighLevel | **Not found in top 10** | Definitions, examples, how-to |
| `stripe cancel flow` | Stripe Docs | Stripe Support | Stripe Docs (overview) | **Not found in top 10** | Documentation, official guides |

### Brand SERP Analysis

| Search Query | Result |
|-------------|--------|
| `ChurnRecovery` | **NOT FOUND** — Results show Churn Buster, Gravy Solutions, Microsoft Azure, Recurly, Churnkey, Churn Solution. ChurnRecovery.com does not appear at all. |
| `churnrecovery.com` | **NOT FOUND** — Results show Churn Buster, Churn Solution, Churnkey, Churnfree. The domain itself does not appear in search results. |

**Critical finding:** ChurnRecovery has **zero presence in Google search results** for both its brand name and its domain. This suggests the site may not yet be fully indexed by Google, or it has insufficient domain authority to rank for any terms. This must be the #1 priority to resolve.

---

## Phase 6: Programmatic SEO Opportunities

Based on the `programmatic` patterns defined in `lib/target-keywords.js`, the following template-driven page types could scale content systematically:

| Pattern | Example URLs | Estimated Pages | Status |
|---------|-------------|-----------------|--------|
| `{platform} churn rate` | `/churn-rate/kajabi`, `/churn-rate/substack` | 10-15 | Not built |
| `{competitor} alternative` | `/alternatives/churnkey`, `/alternatives/profitwell` | 8-12 | Partially built (`pages/alternatives/[slug].js` exists) |
| `{competitor} vs ChurnRecovery` | `/compare/churnkey`, `/compare/profitwell` | 8-12 | Built (`pages/compare/[slug].js` exists) |
| `how to reduce churn {niche}` | `/guides/coaching`, `/guides/newsletters` | 8-10 | Not built |
| `{platform} cancel flow` | `/for/kajabi`, `/for/stripe` | 10-15 | Built (30 `/for/` pages exist) |
| `{platform} failed payment recovery` | `/guides/stripe-payment-recovery` | 6-8 | Not built |
| `cancel flow template {industry}` | `/templates/saas`, `/templates/newsletter` | 6-8 | Partially built (`pages/templates/[slug].js` exists) |
| `dunning email template {platform}` | `/guides/stripe-dunning` | 5-6 | Not built |

**Highest-impact opportunities:**
1. **`{platform} churn rate` pages** — High search volume, informational intent, perfect for data-rich landing pages with calculators. Could target: Kajabi, Substack, Teachable, Ghost, Patreon, Beehiiv, Shopify, WooCommerce, Memberful, Circle.
2. **`{platform} failed payment recovery` guides** — Each `/for/` page could link to a matching dunning guide, creating a content cluster.
3. **`how to reduce churn {niche}` guides** — Coaching, newsletters, online courses, membership sites, SaaS, e-commerce subscriptions.

---

## Phase 7: Entity SEO Assessment

### Brand SERP Analysis

**ChurnRecovery is NOT recognized as a distinct entity by Google or AI systems.**

Evidence:
- Searching "ChurnRecovery" returns zero results for the actual site
- Searching "churnrecovery.com" returns zero results for the actual domain
- No Knowledge Panel
- No Google Business Profile
- No Wikidata entry
- No Crunchbase profile found
- No G2 or Capterra listing
- Organization schema `sameAs` is an empty array

### Knowledge Panel Eligibility

**Not eligible yet.** Requirements for Knowledge Panel:

| Requirement | Status |
|-------------|--------|
| Wikipedia mention | Not present |
| Wikidata entry | Not present |
| Crunchbase profile | Not present |
| Google Business Profile | Not present |
| G2/Capterra listing | Not present |
| Social media profiles (linked via sameAs) | Empty |
| Press mentions | None found |
| Schema.org Organization markup | Present but incomplete |

### Entity Building Roadmap

1. **Immediate:** Create Crunchbase profile, G2 profile, Capterra listing
2. **Week 1-2:** Create and link social profiles (Twitter/X, LinkedIn, GitHub) — add URLs to `sameAs` in `_app.js`
3. **Week 2-4:** Submit to Wikidata once eligibility criteria are met
4. **Ongoing:** Build press mentions, guest posts, and directory listings that reference "ChurnRecovery" as a named entity

---

## Quick Wins (can fix today)

Sorted by estimated impact on search visibility:

1. **Verify Google Search Console indexing** — The site may not be fully indexed. Submit sitemap via GSC, request indexing of key pages. The `google-site-verification` meta tag is present in `_app.js` (line 68), so GSC should be accessible.

2. **Add `BlogPosting` schema to `pages/posts/[slug].js`** — Add auto-generated `BlogPosting` JSON-LD to every blog post with `headline`, `datePublished`, `author`, `publisher`, `mainEntityOfPage`. This is a single-file change that affects all 45 posts. (~30 min)

3. **Add `FAQPage` schema to homepage** — `pages/index.js` already renders 5 FAQ items (lines 448-479) but has no corresponding JSON-LD. Add the schema. (~15 min)

4. **Populate `sameAs` in Organization schema** — In `pages/_app.js` line 91, change `sameAs: []` to include any existing social/platform URLs. Even if profiles don't exist yet, create a Twitter/X and LinkedIn page and add them. (~15 min)

5. **Add AI crawler rules to `robots.txt`** — Explicitly `Allow` GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Google-Extended. Add `Disallow: /app/`. Consolidate duplicate `User-agent: *` blocks. (~10 min)

6. **Add `FAQPage` schemas to 9 more blog posts** — The posts listed in Phase 2 (what-is-a-cancel-flow, voluntary-vs-involuntary-churn, etc.) have natural FAQ content. Add schemas to `lib/post-schemas.js`. (~2 hours)

7. **Add `noindex` meta tag to `/app/` pages** — Dashboard pages behind auth should not be indexed. Add `<meta name="robots" content="noindex, nofollow" />` to app pages. (~15 min)

8. **Fix heading hierarchy on `features.js` and `pricing.js`** — Change h3 feature/plan cards to h2 or add intermediate h2 headings to maintain proper nesting. (~20 min)

---

## 30/60/90 Day Roadmap

### Days 1-30: Foundation & Indexing

**Week 1 (Critical):**
- [ ] Verify Google Search Console setup and submit sitemap
- [ ] Request indexing for top 20 pages (homepage, features, pricing, demo, top blog posts)
- [ ] Add `BlogPosting` schema to `pages/posts/[slug].js`
- [ ] Add `FAQPage` schema to homepage
- [ ] Add AI crawler rules to `robots.txt`
- [ ] Populate `sameAs` in Organization schema with Twitter/LinkedIn URLs
- [ ] Add `noindex` to `/app/` pages
- [ ] Create G2 profile and Capterra listing
- [ ] Create Crunchbase profile

**Week 2:**
- [ ] Add `FAQPage` schemas to 9 more high-priority blog posts
- [ ] Add `WebPage` schema to all 30 `/for/` platform pages
- [ ] Add `dateModified` support to blog post schema
- [ ] Fix heading hierarchy on features.js and pricing.js
- [ ] Audit and optimize meta description lengths (target 150-160 chars)
- [ ] Audit and optimize title tag lengths (target 50-60 chars)

**Week 3-4:**
- [ ] Publish 4 new blog posts from content calendar (prioritize "stripe cancel flow" and "churnkey alternatives free")
- [ ] Add `BreadcrumbList` schema to `/for/`, `/compare/`, `/integrations/` pages
- [ ] Implement "related posts" component for blog post template
- [ ] Self-host Google Fonts for better CWV
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Submit to 10 SaaS directories (documented in `docs/directory-submission-execution.md`)

### Days 31-60: Authority Building

- [ ] Publish 8 more blog posts (2/week), targeting content gap keywords
- [ ] Build first 3 case studies with real customer data
- [ ] Create Wikidata entry for ChurnRecovery
- [ ] Post to Reddit (r/SaaS, r/startups) with genuine helpful answers mentioning ChurnRecovery where relevant
- [ ] Answer 10 Quora questions related to churn/cancel flows
- [ ] Pitch 5 SaaS podcasts for founder interview
- [ ] Execute Product Hunt launch (creates permanent citation source)
- [ ] Write and publish Show HN post
- [ ] Guest post on 2-3 SaaS blogs (create authoritative backlinks)
- [ ] Build programmatic `{platform} churn rate` pages (10 pages)
- [ ] Create quarterly "State of Churn" benchmark report
- [ ] Add `CollectionPage` schema to `/blog` index page
- [ ] Expand `llms.txt` into `llms-full.txt` with extended documentation

### Days 61-90: Scale & Optimize

- [ ] Publish 8 more blog posts targeting long-tail keywords
- [ ] Build programmatic `how to reduce churn {niche}` guide pages
- [ ] Build programmatic `{platform} failed payment recovery` guide pages
- [ ] Create "Free Churn Recovery Audit Checklist" as lead magnet + blog post
- [ ] Audit top 10 posts for answer-first structure, rewrite as needed
- [ ] Build internal linking map and add 5+ internal links per post
- [ ] Monitor Google Search Console for indexed pages, impressions, clicks
- [ ] First AI visibility audit (test queries in ChatGPT, Perplexity, Claude)
- [ ] Refresh all blog posts with current year stats ("In 2026...")
- [ ] Add `aggregateRating` to SoftwareApplication schema once reviews exist on G2

---

## Content Gaps (prioritized)

Sourced from `lib/target-keywords.js` and `docs/seo-content-gap-analysis.md`, prioritized by search volume and strategic value:

| Priority | Keyword / Topic | Volume Est. | Content Status | Recommended Action |
|----------|----------------|-------------|---------------|-------------------|
| P0 | `stripe cancel flow` | High | No dedicated post | **Write immediately:** "How to Add a Cancel Flow to Stripe Billing (No Code Required)" — highest volume keyword in gap analysis |
| P0 | `churnkey alternatives free` | Medium | Post exists (`churnkey-alternatives-ranked.md`) | **Optimize existing post** — add "free" angle, update title, add FAQ schema |
| P0 | `how to reduce SaaS churn` | High | No comprehensive guide | **Write pillar content:** 2,500+ word guide targeting this exact query with answer-first structure |
| P1 | `newsletter cancel flow` | Medium | No dedicated post | Write: "Newsletter Cancel Flow: How to Stop Subscriber Churn" |
| P1 | `cancel flow best practices` | Medium | No dedicated post | Write: "Cancel Flow Best Practices: The Complete Guide" |
| P1 | `cancel flow templates` | Medium | Templates page exists but no blog content | Write supporting blog post linking to `/templates` |
| P1 | `patreon churn rate` | Medium | `/for/patreon` exists but no blog post | Write: "Patreon Churn Rate: What's Normal and How to Beat It" |
| P1 | `membership site cancel flow` | Medium | No dedicated post | Write: "Membership Site Cancel Flow Examples" |
| P2 | `reduce churn coaching business` | Low-Medium | Post exists (`coaching-business-churn.md`) | Add FAQ schema, optimize for target keyword |
| P2 | `substack churn rate` | Medium | `/for/substack` exists but no data post | Write: "What's a Good Churn Rate for a Substack Paid Newsletter?" |
| P2 | `saas churn rate benchmark 2026` | Medium | `B2B-SaaS-Churn-Benchmarks-2025.md` exists | **Update for 2026** — refresh title, stats, and dateModified |
| P2 | `dunning email templates` | Medium | `dunning-management-guide-small-business.md` exists | Add templates section + FAQ schema |
| P2 | `exit survey best practices saas` | Medium | No dedicated post | Write: "Exit Survey Best Practices: Questions That Actually Reduce Churn" |
| P2 | `win-back email templates saas` | Medium | `cancellation-emails-that-win-back-subscribers.md` exists | Optimize title, add templates, add FAQ schema |
| P3 | `payment retry optimization` | Low | No content | Write: "Smart Payment Retry Strategies: When and How to Retry Failed Payments" |
| P3 | `a/b test cancellation flows` | Low | No content | Write: "How to A/B Test Your Cancel Flow for Maximum Save Rate" |
| P3 | `saas churn rate by company size` | Low-Medium | No content | Write data-driven post with benchmarks by ARR tier |
| P3 | `shopify subscription churn` | Medium | `shopify-subscription-churn.md` exists + `/for/shopify` | Add FAQ schema to post |
| P3 | `ghost membership churn` | Low-Medium | `/for/ghost` exists, no blog post | Write: "Ghost Membership Churn: Benchmarks and How to Reduce It" |
| P3 | `kajabi churn rate` | Medium | `/for/kajabi` exists + setup tutorial | Add FAQ section to `/for/kajabi` page, add schema |

---

## Appendix: File Reference

| File | Purpose | Key Finding |
|------|---------|-------------|
| `pages/_app.js` | Global schemas, canonical URLs, analytics | `sameAs: []` empty; no AI crawler rules |
| `pages/index.js` | Homepage | Has SoftwareApplication schema; FAQ content lacks FAQPage schema |
| `pages/posts/[slug].js` | Blog post template | No `BlogPosting` schema; only BreadcrumbList + optional post-schemas |
| `lib/post-schemas.js` | Per-post FAQ/HowTo schemas | 6/45 posts covered (13%) |
| `lib/target-keywords.js` | 74+ tracked keywords across 6 tiers | Well-organized; programmatic patterns defined but not built |
| `public/robots.txt` | Crawler rules | Duplicate User-agent blocks; no AI crawler rules; `/app/` not blocked |
| `public/llms.txt` | AI crawler context file | Created; well-structured; could be expanded |
| `public/sitemap.xml` | 119 URLs with lastmod | Good coverage; verify dynamic pages included |
| `docs/seo-audit.md` | Previous audit (2026-03-21) | 58 missing titles — now fixed |
| `docs/ai-answer-optimization.md` | AEO/GEO strategy | Comprehensive strategy; implementation incomplete |
| `docs/seo-content-gap-analysis.md` | 35 keyword gaps | Priority content calendar defined; execution pending |

---

*Audit generated 2026-03-27. Next full audit recommended: 2026-04-27 (after 30-day roadmap execution).*
