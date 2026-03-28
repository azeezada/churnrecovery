# ChurnRecovery

**Affordable churn recovery for subscription businesses.** Cancel flow interception, smart save offers, failed payment recovery, and analytics — $20/month with a 30-day free trial.

[Website](https://churnrecovery.com) · [Live Demo](https://churnrecovery.com/demo) · [Docs](https://churnrecovery.com/docs)

---

## What it does

When a subscriber clicks "Cancel," ChurnRecovery intercepts with a personalized save flow — a pause option, discount offer, plan switch, or exit survey. It also handles failed payment recovery with smart retries and dunning emails.

- Cancel flow interception with customizable save offers
- Failed payment recovery (dunning emails, smart retries)
- Analytics dashboard — see why people leave and what saves them
- Works with Stripe, Paddle, Braintree, Chargebee, Recurly, and more
- 15-minute setup, no code required

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (Pages Router, static export) |
| UI | React 19, Tailwind CSS 3 |
| Auth | Clerk |
| Database | SQLite (better-sqlite3) |
| Hosting | Cloudflare Pages |
| Testing | Playwright (435 E2E tests) |

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/churnrecovery.git
cd churnrecovery

# Install dependencies
npm ci

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Clerk keys and other config

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

This generates a static export in the `out/` directory. The build also generates OG images, RSS feed, and sitemap.

### Test

```bash
npm test
```

Runs the full Playwright test suite (unit + integration, 435 tests).

## Project structure

```
pages/              # Next.js pages (marketing site + app)
  app/              # Authenticated app pages (dashboard, settings, etc.)
  posts/            # Blog post pages (from markdown)
  alternatives/     # Competitor comparison pages
  integrations/     # Integration-specific pages
  templates/        # Cancel flow templates
components/         # Shared React components
lib/                # Utilities, API helpers, auth config
styles/             # Global CSS (Tailwind)
public/             # Static assets, OG images, screenshots
scripts/            # Build scripts (sitemap, RSS, OG image generation)
functions/          # Cloudflare Pages Functions (API routes)
tests/              # Playwright E2E tests
src/posts/          # Blog post markdown files
```

## Deployment

The project deploys to Cloudflare Pages via GitHub Actions on push to `main`.

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `CF_PAGES_API_TOKEN` | Cloudflare Pages API token with publish permissions |
| `CF_ACCOUNT_ID` | Your Cloudflare account ID |
| `CF_PROJECT_NAME` | The Cloudflare Pages project name |

### Manual deployment

```bash
npm run build
npx wrangler pages deploy out --project-name=your-project-name
```

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Run tests (`npm test`) and build (`npm run build`) to verify
5. Commit and push
6. Open a Pull Request

Please keep PRs focused — one feature or fix per PR. All tests must pass before merge.

## License

MIT
