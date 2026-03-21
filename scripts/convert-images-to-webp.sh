#!/usr/bin/env bash
# convert-images-to-webp.sh
# Converts all PNGs in public/screenshots/ to WebP format using cwebp.
#
# Prerequisites:
#   brew install webp
#
# Usage (from project root):
#   bash scripts/convert-images-to-webp.sh
#
# This script:
#   1. Converts each PNG in public/screenshots/ → .webp (keeps the original PNG as fallback)
#   2. Converts public/logo.png → public/logo.webp
#   3. Prints size comparison for each file
#
# After running:
#   - Update any <img> tags in your components to use .webp src
#     e.g.: src="/screenshots/product-dashboard.webp"
#   - Keep .png files as fallback for older browsers (optional)

set -e

SCREENSHOTS_DIR="public/screenshots"
QUALITY=80
LOGO_QUALITY=85

# Check cwebp is installed
if ! command -v cwebp &> /dev/null; then
  echo "❌ cwebp not found. Install with: brew install webp"
  exit 1
fi

echo "🖼️  Converting screenshots to WebP (quality: ${QUALITY})..."
echo ""

total_before=0
total_after=0

for f in "${SCREENSHOTS_DIR}"/*.png; do
  [ -f "$f" ] || continue
  out="${f%.png}.webp"

  before=$(wc -c < "$f")
  cwebp -q "${QUALITY}" "$f" -o "$out" -quiet
  after=$(wc -c < "$out")

  savings=$(( (before - after) * 100 / before ))
  echo "  ✓ $(basename "$f") → $(basename "$out")  ($(( before / 1024 ))KB → $(( after / 1024 ))KB, -${savings}%)"

  total_before=$(( total_before + before ))
  total_after=$(( total_after + after ))
done

echo ""
echo "📁 Converting logo..."
if [ -f "public/logo.png" ]; then
  cwebp -q "${LOGO_QUALITY}" public/logo.png -o public/logo.webp -quiet
  logo_before=$(wc -c < public/logo.png)
  logo_after=$(wc -c < public/logo.webp)
  logo_savings=$(( (logo_before - logo_after) * 100 / logo_before ))
  echo "  ✓ logo.png → logo.webp  ($(( logo_before / 1024 ))KB → $(( logo_after / 1024 ))KB, -${logo_savings}%)"
  total_before=$(( total_before + logo_before ))
  total_after=$(( total_after + logo_after ))
fi

total_savings=$(( (total_before - total_after) * 100 / total_before ))
echo ""
echo "✅ Done! Total: $(( total_before / 1024 ))KB → $(( total_after / 1024 ))KB, saved ${total_savings}%"
echo ""
echo "💡 Next steps:"
echo "   1. Update <img> src paths in your components to .webp"
echo "   2. Run: npm run build && npm test"
echo "   3. Deploy and verify live images load correctly"
