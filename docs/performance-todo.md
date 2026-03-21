# Performance TODO — ChurnRecovery

_Last audited: 2026-03-21_

## Summary

Current page count: **106 static pages** (102 + 4 new /for/ pages)
Build target: Cloudflare Pages static export (`next.config.js → output: 'export'`)

---

## 🖼️ Large Images — Should Be Compressed / Converted to WebP

The following images in `public/` were identified as candidates for optimization.
None exceed 500KB but several are in the 100–460KB range. All are `.png` — should be WebP.

| File | Size | Action |
|------|------|--------|
| `public/logo.png` | 447 KB | Convert to WebP + keep PNG fallback; or compress PNG with `pngquant` |
| `public/screenshots/product-email-sequences.png` | 124 KB | Convert to WebP |
| `public/screenshots/product-integrations.png` | 121 KB | Convert to WebP |
| `public/screenshots/product-dashboard.png` | 163 KB | Convert to WebP |
| `public/screenshots/product-dashboard-improved.png` | 109 KB | Convert to WebP |
| `public/screenshots/comparison-page.png` | 87 KB | Convert to WebP |
| `public/screenshots/demo-page.png` | 84 KB | Convert to WebP |
| `public/screenshots/homepage-hero.png` | 81 KB | Convert to WebP |
| `public/screenshots/product-flow-builder.png` | 80 KB | Convert to WebP |
| `public/screenshots/features-section.png` | 27 KB | Low priority |

**Total potential savings:** ~400–600 KB across all images (WebP typically saves 25–35%)

**How to convert:**
```bash
# Install cwebp (macOS)
brew install webp

# Convert all PNGs in screenshots/
for f in public/screenshots/*.png; do
  cwebp -q 80 "$f" -o "${f%.png}.webp"
done

# Compress logo
cwebp -q 85 public/logo.png -o public/logo.webp
```

**Note:** `next.config.js` currently has `images: { unoptimized: true }` — required for static export to Cloudflare Pages. Next.js image optimization (server-side) doesn't work in static export mode. Manual WebP conversion is the right approach here.

---

## 🎨 CSS Optimization Opportunities

### 1,770 Inline Styles Issue
All pages use heavy inline styles (React style props). This is a known trade-off of the current architecture (no CSS-in-JS library, no Tailwind).

**What this means:**
- Every page ships with ~1,770 inline style declarations
- Browsers can't cache inline styles across pages
- Chrome Lighthouse will flag "Avoid excessive inline styles"

**Recommended approach:**
1. Extract shared theme tokens (`t.*`) into a CSS custom properties file
2. Move repeated component styles (cards, buttons, forms) to a `styles/components.css`
3. Or adopt Tailwind CSS (would require significant refactor)

**Quick win (no refactor):** At minimum, extract the `t` theme object into a shared module and ensure it's tree-shaken at build time. Currently duplicated across every `/for/` page.

### Shared Component File
Consider extracting `PainCard`, `HowStep`, `BenefitCard`, `FAQItem`, and `WaitlistForm` into `components/for/` shared components. Currently these are copy-pasted into each `/for/` page (~6–10 duplicates).

---

## ⚡ Preconnect Recommendations

Add `<link rel="preconnect">` tags for external domains used at runtime. Best placed in `pages/_document.js` or `pages/_app.js`:

```html
<!-- Clerk auth -->
<link rel="preconnect" href="https://clerk.churnrecovery.com" />
<link rel="preconnect" href="https://accounts.churnrecovery.com" />

<!-- Stripe (if loaded client-side) -->
<link rel="preconnect" href="https://js.stripe.com" />
<link rel="preconnect" href="https://m.stripe.com" />

<!-- Google Fonts (if using web fonts) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

**Current status:** Check `pages/_document.js` and `pages/_app.js` to see if any preconnects are already in place.

---

## 📊 Lighthouse Quick Win Checklist

- [ ] Convert `public/logo.png` to WebP (biggest single win)
- [ ] Convert `public/screenshots/*.png` to WebP
- [ ] Add `<link rel="preconnect">` for Clerk/Stripe in `_document.js`
- [ ] Extract shared `/for/` components to avoid code duplication
- [ ] Consider extracting theme tokens to CSS custom properties
- [ ] Verify no unused JS is loaded on static pages
- [ ] Check for render-blocking resources in `<head>`

---

## 🔢 Page Count Tracking

| Date | Page Count | Notes |
|------|-----------|-------|
| 2026-03-19 | ~90 | Baseline |
| 2026-03-20 | 102 | Added blog posts, /for/ pages |
| 2026-03-21 | 106 | Added /for/podia, /for/thinkific, /for/circle, /for/patreon |
