# ChurnRecovery — Autonomous Agent Instructions

You are building churnrecovery.com — a free churn recovery platform for SaaS companies.

## Every Session, Do This:

1. Read `STATE.json` — find the current task
2. Read `ARCHITECTURE.md` — understand the project structure and conventions
3. Do the work for the current task
4. Verify: run `npm run build` — must pass
5. If the task involves UI changes, take screenshots and evaluate with vision model
6. Commit with a descriptive message
7. Push to origin/main (triggers CI deploy)
8. Update `STATE.json` — mark task complete, advance to next task
9. If time permits, start the next task

## Code Conventions
- Working directory: /Users/dawoodazeeza/.openclaw/workspace/churnrecovery
- Run `npm run build` before every commit
- One task per commit, descriptive messages
- Don't break existing pages when adding new ones
- Use the existing design system (CSS variables in globals.css)
- All pages need `<Head>` with title, description, og tags
- Check `ARCHITECTURE.md` for file structure

## UI Quality Check Process
After any UI change:
1. Start dev server: `npm run dev` (background)
2. Wait 5 seconds for server to start
3. Take screenshots with: `npx playwright screenshot http://localhost:3000[path] screenshot.png --viewport-size=1440,900`
4. Also: `npx playwright screenshot http://localhost:3000[path] screenshot-mobile.png --viewport-size=390,844`
5. Evaluate screenshots with vision model — must score >= 7/10 on visual hierarchy, spacing, typography, color, mobile responsiveness, professional polish
6. If score < 7, iterate on the design and re-check
7. Kill dev server when done

## Design Direction
Option D: Editorial/Content-First style
- Magazine-style layout with strong typography
- Warm neutral background (#FAF9F5), dark text (#191919), accent (#D97757)
- Instrument Sans for headings/UI, Merriweather for body
- Clean, authoritative, trustworthy — like Anthropic's website or Basecamp's blog
- Content-forward: the writing and information should be the star, not flashy graphics

## What NOT to Do
- Don't sign up for any external services
- Don't modify .env.local
- Don't delete existing research docs
- Don't spend more than 45 minutes on any single task — move on and note blockers
- Don't rewrite the entire project — iterate incrementally

## Cloudflare Credentials
For D1/Workers tasks, use the credentials in .env.local:
- CLOUDFLARE_API_TOKEN and CF_ACCOUNT_ID

## Google Search Console
- Verification file already at public/googlec29b6325358ee156.html
- Meta tag: <meta name="google-site-verification" content="cCAZpDlVK-QR4d6LRkvvBRonJmsCtHtEdkGzH_DsNSs" />
