import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'
const assetManifest = JSON.parse(manifestJSON)

// CORS headers for API routes
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// Handle waitlist signup
async function handleWaitlistPost(request, env) {
  try {
    const body = await request.json()
    const email = (body.email || '').trim().toLowerCase()

    if (!email || !email.includes('@') || !email.includes('.')) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const source = body.source || 'website'

    // Insert into D1 (UNIQUE constraint handles duplicates)
    try {
      await env.DB.prepare(
        'INSERT INTO waitlist (email, source) VALUES (?, ?)'
      ).bind(email, source).run()
    } catch (e) {
      if (e.message && e.message.includes('UNIQUE')) {
        return new Response(JSON.stringify({ message: 'Already on the waitlist!', duplicate: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        })
      }
      throw e
    }

    // Get current count
    const countResult = await env.DB.prepare('SELECT COUNT(*) as count FROM waitlist').first()

    return new Response(JSON.stringify({
      message: "You're on the list!",
      count: countResult?.count || 0,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (e) {
    console.error('Waitlist error:', e)
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
}

// Handle waitlist count
async function handleWaitlistCount(env) {
  try {
    const result = await env.DB.prepare('SELECT COUNT(*) as count FROM waitlist').first()
    return new Response(JSON.stringify({ count: result?.count || 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (e) {
    return new Response(JSON.stringify({ count: 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    // API routes
    if (url.pathname === '/api/waitlist' && request.method === 'POST') {
      return handleWaitlistPost(request, env)
    }

    if (url.pathname === '/api/waitlist/count' && request.method === 'GET') {
      return handleWaitlistCount(env)
    }

    // Static asset serving
    const event = {
      request,
      waitUntil: (promise) => ctx.waitUntil(promise),
    }

    const options = {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: assetManifest,
    }

    try {
      return await getAssetFromKV(event, options)
    } catch (e) {
      try {
        return await getAssetFromKV(event, {
          ...options,
          mapRequestToAsset: req => new Request(new URL(req.url).origin + '/index.html', req),
        })
      } catch (err) {
        return new Response('Not found', { status: 404 })
      }
    }
  },
}
