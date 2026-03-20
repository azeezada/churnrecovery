#!/bin/bash
# Fix catch-all routes for static hosting
# Cloudflare Pages needs index.html, not [[...index]].html

cd "$(dirname "$0")/.."

# Sign-up
if [ -f "out/app/sign-up/[[...index]].html" ]; then
  cp "out/app/sign-up/[[...index]].html" "out/app/sign-up/index.html"
  echo "✅ Fixed sign-up catch-all"
fi

# Sign-in  
if [ -f "out/app/sign-in/[[...index]].html" ]; then
  cp "out/app/sign-in/[[...index]].html" "out/app/sign-in/index.html"
  echo "✅ Fixed sign-in catch-all"
fi
