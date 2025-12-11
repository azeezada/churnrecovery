import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  // Try to serve static asset directly
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    // If not found, fallback to index.html (SPA-style)
    try {
      return await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(new URL(req.url).origin + '/index.html', req)
      })
    } catch (err) {
      return new Response('Not found', { status: 404 })
    }
  }
}
