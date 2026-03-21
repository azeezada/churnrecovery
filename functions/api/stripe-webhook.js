import { jsonResponse, rateLimit, rateLimitResponse } from './_shared.js'
import { sendEmail } from './_email.js'
import { paymentFailedDay0, paymentFailedDay3, paymentFailedDay7 } from './_email-templates.js'

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
            // Record the failed payment
            await env.DB.prepare(`
              INSERT INTO failed_payments (project_id, customer_id, stripe_invoice_id, amount_cents)
              VALUES (?, ?, ?, ?)
            `).bind(
              projectId,
              invoice.customer || 'unknown',
              invoice.id,
              typeof invoice.amount_due === 'number' ? invoice.amount_due : 0
            ).run()

            // Kick off dunning sequence — send Day 0 email immediately
            const customerId = invoice.customer || 'unknown'
            const customerEmail = invoice.customer_email || null

            if (customerEmail) {
              // Generate the Stripe customer portal URL (or use configured portal URL)
              // The actual portal URL is created via Stripe API; we use a generic fallback here
              // In production, this should be a real Stripe Billing Portal session URL
              const portalBaseUrl = env.STRIPE_PORTAL_URL || 'https://billing.stripe.com/p/login/test'
              const updateUrl = portalBaseUrl

              const { subject, html, text } = paymentFailedDay0(customerEmail, updateUrl)
              const emailResult = await sendEmail({ to: customerEmail, subject, html, text }, env)
              console.log('[Stripe] Day 0 dunning email sent:', emailResult)

              // Store the dunning sequence record in D1
              const sequenceId = crypto.randomUUID()
              const nowIso = new Date().toISOString()
              // Next email at Day 3 (72 hours from now)
              const day3Date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()

              await env.DB.prepare(`
                INSERT INTO dunning_sequences
                  (id, customer_id, customer_email, project_id, started_at, last_email_day, next_email_at, status, stripe_invoice_id)
                VALUES (?, ?, ?, ?, ?, 0, ?, 'active', ?)
              `).bind(
                sequenceId,
                customerId,
                customerEmail,
                projectId,
                nowIso,
                day3Date,
                invoice.id
              ).run()

              console.log('[Stripe] Dunning sequence started:', sequenceId)
            } else {
              console.warn('[Stripe] No customer email on invoice — skipping dunning emails for:', invoice.id)

              // Still record the sequence without email
              const sequenceId = crypto.randomUUID()
              const nowIso = new Date().toISOString()
              await env.DB.prepare(`
                INSERT INTO dunning_sequences
                  (id, customer_id, customer_email, project_id, started_at, last_email_day, next_email_at, status, stripe_invoice_id)
                VALUES (?, ?, NULL, ?, ?, 0, NULL, 'active', ?)
              `).bind(sequenceId, customerId, projectId, nowIso, invoice.id).run()
            }

            // NOTE: Day 3 and Day 7 emails are processed by a Cloudflare Cron Worker.
            // Configure a scheduled worker (wrangler.toml crons) to call processDunningSequences()
            // which queries: SELECT * FROM dunning_sequences WHERE status='active' AND next_email_at <= datetime('now')
            // Then sends the appropriate email based on last_email_day (0→3→7) and updates the record.
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

          // Mark any active dunning sequence for this invoice as recovered
          await env.DB.prepare(`
            UPDATE dunning_sequences SET status = 'recovered'
            WHERE stripe_invoice_id = ? AND status = 'active'
          `).bind(invoice.id).run()

          console.log('[Stripe] Dunning sequence marked recovered for invoice:', invoice.id)
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
