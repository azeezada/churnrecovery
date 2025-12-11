# Churn Recovery — Minimal Next.js Blog

This repository contains a minimal static blog scaffold using Next.js and Markdown posts stored in `src/posts/`.

Quick start (macOS, Node/npm):

```bash
# install dependencies
npm ci

# run dev server
npm run dev

# build and export static site to `out/`
npm run build
```

Deployment
- This repo includes a GitHub Actions workflow that builds and deploys the static `out/` folder to Cloudflare Pages.
- You must create the following GitHub Secrets in the repository settings:
  - `CF_PAGES_API_TOKEN` — a Pages API token with publish permissions
  - `CF_ACCOUNT_ID` — your Cloudflare account id
  - `CF_PROJECT_NAME` — the Pages project name for the site

Custom domain
- The site is intended to be used at `churnrecovery.com`. Configure the custom domain in Cloudflare Pages dashboard after deployment and point your DNS accordingly.

Posts
- Add Markdown files to `src/posts/`. Each post should have frontmatter (YAML) with `title` and optional `date` and `excerpt` fields.

Notes
- This is intentionally minimal: no search, comments, or analytics by default. If you want any extras (RSS, tags, pagination), tell me and I can add them.
# churnrecovery