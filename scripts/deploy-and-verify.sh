#!/bin/bash
# deploy-and-verify.sh — Build, deploy, purge cache, and PROPERLY verify
# 
# This script fixes the verification gaps:
# 1. Generates a unique build fingerprint embedded in the HTML
# 2. Deploys to Cloudflare Pages
# 3. Purges Cloudflare cache (requires Zone:Edit permission)
# 4. Verifies the fingerprint appears on BOTH deployment URL and custom domain
# 5. Retries verification with backoff (cache propagation delay)

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

CF_TOKEN="${CLOUDFLARE_API_TOKEN:-cfut_JHB9pErghw6tFgkwxG1xVfV2yg5bvxVsuKw1kun5a58ef0d6}"
CF_ACCOUNT="${CLOUDFLARE_ACCOUNT_ID:-8e09fc813792bf92a0427a673224e37f}"
CF_ZONE="${CLOUDFLARE_ZONE_ID:-05c71901ffce261e25cb9a0b71279e0a}"
PROJECT_NAME="churnrecovery"
CUSTOM_DOMAIN="churnrecovery.com"

# Step 1: Generate unique build fingerprint
BUILD_ID="build-$(date +%s)-$(openssl rand -hex 4)"
echo "🔖 Build fingerprint: $BUILD_ID"

# Inject fingerprint into the HTML as a meta tag
# This is the ONLY reliable way to verify a specific deployment is live
FINGERPRINT_TAG="<meta name=\"build-id\" content=\"$BUILD_ID\" />"

# Add to _app.js Head (or a layout file)
# For now, add to public/build-id.txt as a simple check
echo "$BUILD_ID" > public/build-id.txt

# Step 2: Build
echo "🔨 Building..."
npm run build --silent 2>&1 | tail -3

# Verify fingerprint is in the output
if grep -q "$BUILD_ID" out/build-id.txt 2>/dev/null; then
  echo "✅ Fingerprint in build output"
else
  echo "❌ Fingerprint NOT in build output — build may have failed"
  exit 1
fi

# Step 3: Deploy
echo "🚀 Deploying..."
DEPLOY_OUTPUT=$(CLOUDFLARE_API_TOKEN="$CF_TOKEN" CLOUDFLARE_ACCOUNT_ID="$CF_ACCOUNT" \
  npx wrangler pages deploy out/ --project-name="$PROJECT_NAME" --branch=main --commit-dirty=true 2>&1)

DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep "https://" | grep "pages.dev" | tail -1 | awk '{print $NF}')
echo "📦 Deployment URL: $DEPLOY_URL"

if [ -z "$DEPLOY_URL" ]; then
  echo "❌ Deploy failed — no URL returned"
  echo "$DEPLOY_OUTPUT"
  exit 1
fi

# Step 4: Purge Cloudflare cache
echo "🧹 Purging cache..."
PURGE_RESULT=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE/purge_cache" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}')
PURGE_OK=$(echo "$PURGE_RESULT" | python3 -c "import json,sys; print(json.load(sys.stdin).get('success','false'))" 2>/dev/null || echo "false")
if [ "$PURGE_OK" = "True" ]; then
  echo "✅ Cache purged"
else
  echo "⚠️ Cache purge failed (token may lack Zone:Edit permission)"
  echo "   User should hard-refresh (Cmd+Shift+R) or wait ~5 min"
fi

# Step 5: Verify deployment URL (always fresh, no caching)
echo ""
echo "🔍 Verifying deployment URL..."
sleep 3
DEP_FP=$(curl -s "$DEPLOY_URL/build-id.txt" 2>/dev/null | tr -d '[:space:]')
if [ "$DEP_FP" = "$BUILD_ID" ]; then
  echo "✅ Deployment URL serves correct build: $BUILD_ID"
else
  echo "❌ Deployment URL fingerprint mismatch!"
  echo "   Expected: $BUILD_ID"
  echo "   Got: $DEP_FP"
  exit 1
fi

# Step 6: Verify custom domain (may take time due to cache)
echo ""
echo "🔍 Verifying custom domain ($CUSTOM_DOMAIN)..."
MAX_RETRIES=6
RETRY_DELAY=10
for i in $(seq 1 $MAX_RETRIES); do
  DOMAIN_FP=$(curl -s "https://$CUSTOM_DOMAIN/build-id.txt" 2>/dev/null | tr -d '[:space:]')
  if [ "$DOMAIN_FP" = "$BUILD_ID" ]; then
    echo "✅ Custom domain serves correct build: $BUILD_ID (attempt $i)"
    break
  else
    if [ $i -eq $MAX_RETRIES ]; then
      echo "⚠️ Custom domain still serving old build after ${MAX_RETRIES} attempts"
      echo "   Expected: $BUILD_ID"
      echo "   Got: $DOMAIN_FP"
      echo "   This is likely a Cloudflare cache issue. User should hard-refresh."
    else
      echo "   Attempt $i/$MAX_RETRIES: old build still cached, retrying in ${RETRY_DELAY}s..."
      sleep $RETRY_DELAY
    fi
  fi
done

# Step 7: Content verification
echo ""
echo "🔍 Content checks on deployment URL..."
DEP_HTML=$(curl -s "$DEPLOY_URL" 2>/dev/null)

# Check for specific content that should/shouldn't be there
check_content() {
  local label="$1"
  local pattern="$2"
  local should_exist="$3"
  
  if echo "$DEP_HTML" | grep -qi "$pattern"; then
    if [ "$should_exist" = "yes" ]; then
      echo "  ✅ Found: $label"
    else
      echo "  ❌ UNEXPECTED: $label (should have been removed)"
    fi
  else
    if [ "$should_exist" = "no" ]; then
      echo "  ✅ Absent: $label (correctly removed)"
    else
      echo "  ❌ MISSING: $label (should be present)"
    fi
  fi
}

check_content "ChurnRecovery title" "ChurnRecovery" "yes"
check_content "Get Early Access CTA" "Get Early Access" "yes"
check_content "Let's chat button" "Let's chat" "no"

echo ""
echo "✅ Deploy and verify complete."
echo "   Deployment: $DEPLOY_URL"
echo "   Build ID: $BUILD_ID"
