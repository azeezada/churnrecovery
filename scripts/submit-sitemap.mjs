#!/usr/bin/env node
/**
 * submit-sitemap.mjs
 * Submits ChurnRecovery URLs via IndexNow (Bing/Yandex/others) and
 * prints instructions for Google Search Console (which removed its ping endpoint in 2023).
 *
 * Run: node scripts/submit-sitemap.mjs
 *
 * IndexNow: free, no account needed beyond a key file.
 * Google: manual submission required via GSC (see docs/gsc-submission-guide.md).
 */

const SITE_HOST = 'churnrecovery.com';
const SITEMAP_URL = `https://${SITE_HOST}/sitemap.xml`;

// IndexNow requires a key. Generate one at https://www.indexnow.org/
// Then host a file at https://churnrecovery.com/<key>.txt with just the key as content.
// Set the INDEXNOW_KEY env var or paste your key below.
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '';

// Key pages to submit via IndexNow immediately
const KEY_URLS = [
  `https://${SITE_HOST}/`,
  `https://${SITE_HOST}/pricing`,
  `https://${SITE_HOST}/demo`,
  `https://${SITE_HOST}/for/substack`,
  `https://${SITE_HOST}/for/kajabi`,
  `https://${SITE_HOST}/for/teachable`,
  `https://${SITE_HOST}/for/ghost`,
  `https://${SITE_HOST}/for/stripe`,
  `https://${SITE_HOST}/tools/roi-calculator`,
  `https://${SITE_HOST}/tools/churn-rate-calculator`,
  `https://${SITE_HOST}/compare/churnkey`,
  `https://${SITE_HOST}/compare/profitwell`,
];

async function submitIndexNow() {
  if (!INDEXNOW_KEY) {
    console.log('⏭  IndexNow: skipped (no INDEXNOW_KEY set)');
    console.log('   → Get a free key at https://www.indexnow.org/');
    console.log('   → Host it at https://churnrecovery.com/<key>.txt');
    console.log('   → Then run: INDEXNOW_KEY=<key> node scripts/submit-sitemap.mjs\n');
    return;
  }

  const body = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: KEY_URLS,
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    if (res.status === 200 || res.status === 202) {
      console.log(`✅ IndexNow: submitted ${KEY_URLS.length} URLs (${res.status})`);
    } else if (res.status === 422) {
      console.warn('⚠️  IndexNow: key not found at keyLocation URL (422). Host the key file first.');
    } else {
      console.warn(`⚠️  IndexNow: responded with status ${res.status}`);
    }
  } catch (err) {
    console.error(`❌ IndexNow: submission failed — ${err.message}`);
  }
}

console.log(`\n🗺  Sitemap: ${SITEMAP_URL}`);
console.log(`📋 Key URLs: ${KEY_URLS.length}\n`);

await submitIndexNow();

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Google Search Console — MANUAL STEP REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Google removed its sitemap ping endpoint in 2023.
To submit, Dawood must:

1. Go to https://search.google.com/search-console
2. Add Property → https://churnrecovery.com
3. Verify ownership (HTML meta tag in pages/_document.tsx)
4. Sitemaps → Enter "sitemap.xml" → Submit

Full guide: docs/gsc-submission-guide.md
`);
