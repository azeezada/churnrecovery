import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
// In Module Workers, we must import the manifest explicitly
import manifestJSON from '__STATIC_CONTENT_MANIFEST'
const assetManifest = JSON.parse(manifestJSON)

export default {
  async fetch(request, env, ctx) {
    // We must construct a synthetic event object because getAssetFromKV
    // was designed for the Service Worker API
    const event = {
      request,
      waitUntil: (promise) => ctx.waitUntil(promise)
    }

    // Define base options passing the KV namespace and Manifest
    const options = {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: assetManifest
    }

    try {
      // Try to serve static asset directly
      return await getAssetFromKV(event, options)
    } catch (e) {
      // If not found, fallback to index.html (SPA-style)
      try {
        return await getAssetFromKV(event, {
          ...options, // Merge base options (Namespace/Manifest)
          mapRequestToAsset: req => new Request(new URL(req.url).origin + '/index.html', req)
        })
      } catch (err) {
        return new Response('Not found', { status: 404 })
      }
    }
  }
}