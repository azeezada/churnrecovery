# ChurnRecovery — Agent Instructions

Every agent working on this project MUST follow these steps. No exceptions.

## Before You Start
1. Read `STATE.json` to understand current project state
2. Read `PRODUCT_ARCHITECTURE.md` for architecture decisions
3. Check what tests exist: `ls tests/`
4. **Clear stale build cache**: `rm -rf .next` before building (stale `.next` causes ENOENT rename errors during static export)

## After Every Code Change
```bash
# 1. Build
npm run build
# If it fails → fix it before anything else

# 2. Run tests
npm test
# If any of the 105 tests fail → fix them

# 3. Deploy + verify (if the change is user-facing)
CLOUDFLARE_API_TOKEN=cfut_hdShyU98O5bpfpmE9idpwlehNOVXSpo9SDoyGAjmae93c1d8 \
CLOUDFLARE_ACCOUNT_ID=8e09fc813792bf92a0427a673224e37f \
npx wrangler pages deploy out/ --project-name=churnrecovery --branch=main --commit-dirty=true

# 4. Purge cache
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/05c71901ffce261e25cb9a0b71279e0a/purge_cache" \
  -H "Authorization: Bearer cfut_hdShyU98O5bpfpmE9idpwlehNOVXSpo9SDoyGAjmae93c1d8" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}'

# 5. Verify live site
curl -s https://churnrecovery.com/build-id.txt  # must match your build
curl -s https://churnrecovery.com | grep "YOUR_CHANGE"  # verify content

# 6. Commit
git add -A && git commit -m "descriptive message"
git push origin main
```

## If You're an Orchestrator
- Break independent work into parallel sub-agents
- Each sub-agent follows the same checklist
- You synthesize results and do the final deploy + verify

## Known Issues
- **Test runner hangs**: `npm test` starts `serve` in background via `pretest` but never kills it. Tests may hang indefinitely. Workaround: run `npx serve out -p 3050 -L &` manually, run `npx playwright test`, then kill serve. Or add a timeout. UPDATE: pretest script removed, Playwright webServer config handles lifecycle now. 247 tests run in ~30s.
- **1,770 inline styles**: Migration to shadcn/ui + Tailwind is planned but not done yet. Use design tokens from `lib/design-tokens.js` for now.
- **Stale `.next` cache**: If build fails with ENOENT rename errors, run `rm -rf .next` and rebuild. This happens when pages are added/moved between builds.
- **Clerk tests**: Previously 2 flaky Clerk preload link tests. Suite now at 247/247 passing (integration tests added). If Clerk tests flake again, not a blocker.
- **Concurrent WORKQUEUE edits**: Multiple agents editing WORKQUEUE.md simultaneously causes edit failures. Agents should retry once on edit failure, or use append-only updates.

## Current Phase: DISTRIBUTION (not building)
As of 2026-03-21, we have 100+ pages, 20+ blog posts, 15+ landing pages, 247 tests (all passing), full Tailwind migration, and zero users. **STOP BUILDING NEW PAGES. START DISTRIBUTING.** Any new code work should be: analytics, conversion tracking, email automation, or fixing bugs. No more /for/ pages. No more blog posts. The content library is massive — now it needs eyeballs.

## Priority Rule
When picking work from WORKQUEUE.md, **always start with the highest-priority 🤖-tagged item**. Items marked 🤖🔥 are both agent-doable AND overdue — they MUST be done before any other work. Do not skip P0 items to work on P1/P2 items. The analytics snippet and UTM capture have been P0 for 3+ days — this is unacceptable.

## Do NOT
- Skip tests ("I'll test later" = never)
- Claim something is deployed without verifying the live URL
- Commit code that doesn't build
- Modify tests to make them pass instead of fixing the code
- Use inline styles without design tokens (use Tailwind or tokens from lib/design-tokens.js)
- Ask Dawood "what should I work on next?" — check WORKQUEUE.md and pick the highest priority item
- Give status updates that end with questions — say what's happening and what's coming next
- Create more /for/ pages or blog posts before existing ones have any traffic data
- Build features for hypothetical users — get real users first, then build what they need

## Key Files
- `STATE.json` — project state and task queue
- `PRODUCT_ARCHITECTURE.md` — architecture decisions
- `tests/` — Playwright test suite (142 tests, all passing)
- `scripts/deploy-and-verify.sh` — deploy with fingerprint verification
- `.env.local` — credentials (never commit this)
