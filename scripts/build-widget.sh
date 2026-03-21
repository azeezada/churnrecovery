#!/usr/bin/env bash
# ChurnRecovery Widget Build Script
# Minifies public/widget.js → public/widget.min.js
# Usage: bash scripts/build-widget.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SRC="$PROJECT_DIR/public/widget.js"
OUT="$PROJECT_DIR/public/widget.min.js"
DATE=$(date +%Y-%m-%d)

echo "🔧 ChurnRecovery Widget Build"
echo "  Source:  $SRC"
echo "  Output:  $OUT"
echo "  Date:    $DATE"

if [ ! -f "$SRC" ]; then
  echo "❌ Source file not found: $SRC"
  exit 1
fi

HEADER="// ChurnRecovery Widget v${DATE} - cdn.churnrecovery.com/widget.min.js"

# Try terser first (best output), then uglifyjs, then plain copy
if npx terser --version &>/dev/null 2>&1; then
  echo "✅ Using terser for minification"
  MINIFIED=$(npx terser "$SRC" \
    --compress drop_console=false,drop_debugger=true \
    --mangle \
    --output /dev/stdout 2>/dev/null)
  printf '%s\n%s\n' "$HEADER" "$MINIFIED" > "$OUT"
elif command -v uglifyjs &>/dev/null; then
  echo "✅ Using uglifyjs for minification"
  MINIFIED=$(uglifyjs "$SRC" --compress --mangle 2>/dev/null)
  printf '%s\n%s\n' "$HEADER" "$MINIFIED" > "$OUT"
else
  echo "⚠️  No minifier found — copying source as-is"
  printf '%s\n' "$HEADER" > "$OUT"
  cat "$SRC" >> "$OUT"
fi

SIZE_SRC=$(wc -c < "$SRC")
SIZE_OUT=$(wc -c < "$OUT")
echo "  Input size:  ${SIZE_SRC} bytes"
echo "  Output size: ${SIZE_OUT} bytes"
echo "✅ Done → $OUT"
