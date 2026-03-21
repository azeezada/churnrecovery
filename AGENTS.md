# ChurnRecovery — Agent Instructions

Every agent working on this project MUST follow these steps. No exceptions.

## Before You Start
1. Read `STATE.json` to understand current project state
2. Read `PRODUCT_ARCHITECTURE.md` for architecture decisions
3. Check what tests exist: `ls tests/`

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

## Do NOT
- Skip tests ("I'll test later" = never)
- Claim something is deployed without verifying the live URL
- Commit code that doesn't build
- Modify tests to make them pass instead of fixing the code
- Use inline styles without design tokens (use Tailwind or tokens from lib/design-tokens.js)

## Key Files
- `STATE.json` — project state and task queue
- `PRODUCT_ARCHITECTURE.md` — architecture decisions
- `tests/` — Playwright test suite (105 tests)
- `scripts/deploy-and-verify.sh` — deploy with fingerprint verification
- `.env.local` — credentials (never commit this)
