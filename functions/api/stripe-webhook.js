import { jsonResponse, rateLimit, rateLimitResponse } from './_shared.js'

/**
 * Verify Stripe webhook signature using Web Crypto API.
 * Equivalent to Stripe's signature verification without the SDK.
 */
async function verifyStripeSignature(rawBody, sigHeader, secret) {
  if (!sigHeader || !secret) return false

  const elements = sigHeader.split(',').reduce((acc, part) => {
    const [key, value] = part.split('=')
    acc[key] = value
    return acc
  }, {})

  const timestamp = elements.t
  const signature = elements.v1

  if (!timestamp || !signature) return false

  // Reject timestamps older than 5 minutes
  const tolerance = 300 // 5 minutes
  const now = Math.floor(Date.now() / 1000)
  if (Math.abs(now - parseInt(timestamp)) > tolerance) return false

  // Compute expected signature
  const signedPayload = `${timestamp}.${rawBody}`
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload))
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  // Constant-time comparison
  if (expectedSignature.length !== signature.length) return false
  let result = 0
  for (let i = 0; i < expectedSignature.length; i++) {
    result |= expectedSignature.charCodeAt(i) ^ signature.charCodeAt(i)
  }
  return result === 0
}

export async function onRequestPost(context) {
  const { request, env } = context

  // Rate limit: 100 per minute (Stripe sends bursts)
  const rl = rateLimit(request, { maxRequests: 100, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  try {
    const rawBody = await request.text()

    // Verify Stripe signature if webhook secret is configured
    const sigHeader = request.headers.get('stripe-signature')
    // Look up the webhook secret from the project or use a global one
    // For now, use env variable. Per-project secrets would require project lookup first.
    const globalWebhookSecret = env.STRIPE_WEBHOOK_SECRET

    if (globalWebhookSecret) {
      const isValid = await verifyStripeSignature(rawBody, sigHeader, globalWebhookSecret)
      if (!isValid) {
        console.error('[Stripe] Invalid webhook signature')
        return jsonResponse({ error: 'Invalid signature' }, 401)
      }
    } else if (!sigHeader) {
      // No secret configured and no signature — accept but log warning
      console.warn('[Stripe] No webhook secret configured — accepting unverified webhook')
    }

    const event = JSON.parse(rawBody)

    // Validate event structure
    if (!event || !event.type || !event.data || !event.data.object) {
      return jsonResponse({ error: 'Invalid event structure' }, 400)
    }

    switch (event.type) {
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        console.log('[Stripe] Subscription deleted:', subscription.id)

        if (subscription.metadata?.churnrecovery_project_id) {
          const projectId = subscription.metadata.churnrecovery_project_id
          // Verify project exists
          const project = await env.DB.prepare('SELECT id FROM projects WHERE id = ?').bind(projectId).first()
          if (project) {
            await env.DB.prepare(`
              INSERT INTO cancel_events (project_id, customer_id, outcome, reason)
              VALUES (?, ?, 'cancelled', 'stripe_churn')
            `).bind(projectId, subscription.customer || 'unknown').run()
          }
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        console.log('[Stripe] Payment failed:', invoice.id, 'Amount:', invoice.amount_due)

        if (invoice.metadata?.churnrecovery_project_id) {
          const projectId = invoice.metadata.churnrecovery_project_id
          const project = await env.DB.prepare('SELECT id FROM projects WHERE id = ?').bind(projectId).first()
          if (project) {
            await env.DB.prepare(`
              INSERT INTO failed_payments (project_id, customer_id, stripe_invoice_id, amount_cents)
              VALUES (?, ?, ?, ?)
            `).bind(
              projectId,
              invoice.customer || 'unknown',
              invoice.id,
              typeof invoice.amount_due === 'number' ? invoice.amount_due : 0
            ).run()
          }
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        if (invoice.billing_reason === 'subscription_cycle') {
          console.log('[Stripe] Payment recovered:', invoice.id)
          await env.DB.prepare(`
            UPDATE failed_payments SET recovery_status = 'recovered', updated_at = datetime('now')
            WHERE stripe_invoice_id = ? AND recovery_status = 'pending'
          `).bind(invoice.id).run()
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const previousAttributes = event.data.previous_attributes

        if (previousAttributes?.cancel_at_period_end === false && subscription.cancel_at_period_end === true) {
          console.log('[Stripe] Subscription marked for cancellation:', subscription.id)
        }

        if (subscription.pause_collection && subscription.metadata?.churnrecovery_project_id) {
          const projectId = subscription.metadata.churnrecovery_project_id
          const project = await env.DB.prepare('SELECT id FROM projects WHERE id = ?').bind(projectId).first()
          if (project) {
            await env.DB.prepare(`
              INSERT INTO cancel_events (project_id, customer_id, outcome)
              VALUES (?, ?, 'paused')
            `).bind(projectId, subscription.customer || 'unknown').run()
          }
        }
        break
      }

      default:
        console.log('[Stripe] Unhandled event type:', event.type)
    }

    return jsonResponse({ received: true })
  } catch (err) {
    console.error('[Stripe] Webhook error:', err.message)
    return jsonResponse({ error: 'Webhook processing error' }, 400)
  }
}
