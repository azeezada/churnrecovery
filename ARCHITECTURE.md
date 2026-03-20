# ChurnRecovery — Architecture & Project Plan

## Overview
ChurnRecovery is a free churn recovery platform for SaaS companies, competing with Churnkey ($250-825/mo). Our wedge: completely free, developer-first, open-source components.

## Tech Stack
- **Frontend:** Next.js 14 (static export + API routes via Workers)
- **Hosting:** Cloudflare Pages (free tier)
- **Database:** Cloudflare D1 (SQLite, free tier)
- **API:** Cloudflare Workers (free tier)
- **CI/CD:** GitHub Actions → Cloudflare Pages deploy
- **Domain:** churnrecovery.com (Cloudflare DNS)

## Design System
- **Style:** Option D — Editorial/Content-First (Anthropic-inspired, evolved)
- **Fonts:** Instrument Sans (headings/UI) + Merriweather (body/editorial)
- **Colors:** Warm neutral background (#FAF9F5), dark text (#191919), accent (#D97757)
- **Layout:** Magazine-style grid, strong typography, content-forward
- **Mobile:** Responsive, mobile-first where possible

## Directory Structure
```
churnrecovery/
├── .github/workflows/deploy.yml    # CI/CD
├── components/                     # React components
│   ├── Header.js                   # Site header/nav
│   ├── Footer.js                   # Site footer
│   ├── CancelFlowDemo.js          # Interactive demo widget
│   ├── ChurnCalculator.js         # Interactive calculator tool
│   ├── WaitlistForm.js            # Email capture
│   └── DesignExplorer/            # Style alternatives (A/B/C)
├── docs/research/                  # Research docs (not deployed)
├── lib/
│   ├── posts.js                   # Blog post utilities
│   └── design-tokens.js           # Design system tokens
├── pages/
│   ├── _app.js                    # App wrapper
│   ├── index.js                   # Homepage (Option D style)
│   ├── features.js                # Features page
│   ├── docs.js                    # Developer docs
│   ├── blog/                      # Blog listing
│   ├── posts/[slug].js            # Individual blog posts
│   ├── compare/[slug].js          # Comparison pages (programmatic)
│   ├── alternatives/[slug].js     # Alternative pages
│   ├── templates/                 # Template gallery pages
│   ├── tools/churn-calculator.js  # Interactive churn calculator
│   └── styles/                    # Design exploration pages
│       ├── index.js               # Style picker overview
│       ├── developer.js           # Option A: Developer/Stripe vibe
│       ├── warm-saas.js           # Option B: Warm SaaS vibe
│       └── data-forward.js        # Option C: Data/Dashboard vibe
├── public/
│   ├── logo.png
│   ├── googlec29b6325358ee156.html  # GSC verification
│   └── og/                        # Open Graph images
├── src/posts/                     # Markdown blog posts
├── styles/globals.css             # Global styles
├── workers-site/index.js          # Cloudflare Worker
├── wrangler.toml                  # Cloudflare config
├── next.config.js                 # Next.js config
└── package.json
```

## Conventions
- Components are PascalCase `.js` files
- Pages use kebab-case
- Blog posts are Markdown in `src/posts/` with YAML frontmatter
- CSS uses CSS variables from design tokens
- All pages must have proper `<Head>` with title, description, OG tags
- `npm run build` must pass before committing
- One feature per commit, descriptive messages

## API Routes (Workers)
- `POST /api/waitlist` — email capture → D1
- `GET /api/waitlist/count` — public counter for social proof

## D1 Schema
```sql
CREATE TABLE waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'website',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  referrer TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## SEO Requirements
Every page must have:
- Unique `<title>` (50-60 chars)
- `<meta name="description">` (150-160 chars)
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Canonical URL
- Structured data (JSON-LD) where applicable

Site-level:
- `/sitemap.xml` auto-generated
- `/robots.txt` configured
- Google site verification meta tag in `_app.js`
- Fast load times (static = instant)

## Quality Gates
Before committing any UI change:
1. `npm run build` passes
2. No console errors
3. Screenshot captured at 1440px and 390px widths
4. Vision model scores ≥ 7/10 on all dimensions
