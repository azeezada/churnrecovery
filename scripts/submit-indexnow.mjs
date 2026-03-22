/**
 * IndexNow submission script for churnrecovery.com
 * Reads URLs live from the production sitemap and submits to IndexNow.
 *
 * Key file hosted at: https://churnrecovery.com/53da5a2d961e77fce328e7c99c55c7b8.txt
 * Run after any deploy that adds/changes pages.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs
 */

const KEY = '53da5a2d961e77fce328e7c99c55c7b8';
const HOST = 'churnrecovery.com';
const BASE_URL = `https://${HOST}`;

async function main() {
  // Verify key file is live
  const keyCheck = await fetch(`${BASE_URL}/${KEY}.txt`).catch(e => ({ status: 0 }));
  if (keyCheck.status !== 200) {
    console.error(`❌ Key file not accessible (HTTP ${keyCheck.status}). Deploy first.`);
    process.exit(1);
  }
  console.log('✅ Key file live');

  // Pull URLs from live sitemap
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapText = await sitemapRes.text();
  const urls = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log(`Submitting ${urls.length} URLs from sitemap...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE_URL}/${KEY}.txt`,
    urlList: urls,
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',  // distributes to all participating engines
    'https://www.bing.com/indexnow',
  ];

  for (const endpoint of endpoints) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const status = `${res.status} ${res.statusText}`;
    console.log(`${endpoint} → ${status}`);
  }

  console.log('\nDone. api.indexnow.org distributes to all participating engines (Yandex, Seznam, etc.)');
  console.log('For Bing: register at https://www.bing.com/webmasters if 403 persists.');
}

main().catch(console.error);
