#!/bin/bash
# Fix catch-all routes for static hosting
# Cloudflare Pages needs index.html, not [[...index]].html
# Also creates sub-path directories for Clerk OAuth callbacks

cd "$(dirname "$0")/.."

# Clerk callback sub-paths that need to resolve to the sign-up/sign-in SPA shell
CLERK_SUBPATHS=(
  "sso-callback"
  "verify-email-address"
  "verify-phone-number"
  "verify"
  "continue"
  "factor-one"
  "factor-two"
  "reset-password"
  "choose-strategy"
)

# Sign-up
if [ -f "out/app/sign-up/[[...index]].html" ]; then
  cp "out/app/sign-up/[[...index]].html" "out/app/sign-up/index.html"
  echo "✅ Fixed sign-up catch-all"
  for subpath in "${CLERK_SUBPATHS[@]}"; do
    mkdir -p "out/app/sign-up/$subpath"
    cp "out/app/sign-up/index.html" "out/app/sign-up/$subpath/index.html"
  done
  echo "✅ Created sign-up Clerk sub-path files (${#CLERK_SUBPATHS[@]} paths)"
fi

# Sign-in  
if [ -f "out/app/sign-in/[[...index]].html" ]; then
  cp "out/app/sign-in/[[...index]].html" "out/app/sign-in/index.html"
  echo "✅ Fixed sign-in catch-all"
  for subpath in "${CLERK_SUBPATHS[@]}"; do
    mkdir -p "out/app/sign-in/$subpath"
    cp "out/app/sign-in/index.html" "out/app/sign-in/$subpath/index.html"
  done
  echo "✅ Created sign-in Clerk sub-path files (${#CLERK_SUBPATHS[@]} paths)"
fi
