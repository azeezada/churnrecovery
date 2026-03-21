/**
 * Dunning Sequence Scheduler
 *
 * Processes pending Day 3 and Day 7 dunning emails for failed payment sequences.
 *
 * SETUP (Cloudflare Cron Workers):
 * Since Cloudflare Pages doesn't support scheduled workers directly, you have two options:
 *
 * Option A — Cloudflare Workers Cron (recommended):
 *   Create a separate worker with wrangler.toml trigger:
 *   [triggers]
 *   crons = ["0 * * * *"]  # every hour
 *   Then call processDunningSequences(env) from the worker's scheduled handler.
 *
 * Option B — External cron service:
 *   Use cron-job.org, GitHub Actions, or any HTTPS cron service to hit:
 *   POST /api/process-dunning with your internal secret key.
 *
 * This file exports processDunningSequences() for use in either setup.
 */

import { sendEmail } from './_email.js'
import { paymentFailedDay3, paymentFailedDay7 } from './_email-templates.js'

/**
 * Process all pending dunning sequence emails.
 * Call this from a scheduled worker or an authenticated API endpoint.
 * @param {Object} env - Cloudflare Worker env bindings
 * @returns {Object} - Summary of processed sequences
 */
export async function processDunningSequences(env) {
  const now = new Date().toISOString()
  const portalBaseUrl = env.STRIPE_PORTAL_URL || 'https://billing.stripe.com/p/login/test'

  // Find all active sequences where next_email_at has passed
  const pending = await env.DB.prepare(`
    SELECT * FROM dunning_sequences
    WHERE status = 'active'
      AND next_email_at IS NOT NULL
      AND next_email_at <= ?
      AND customer_email IS NOT NULL
    LIMIT 50
  `).bind(now).all()

  const results = { processed: 0, errors: 0, skipped: 0 }

  for (const seq of (pending.results || [])) {
    try {
      const nextDay = seq.last_email_day === 0 ? 3 : seq.last_email_day === 3 ? 7 : null

      if (nextDay === null) {
        // Sequence complete — mark as done
        await env.DB.prepare(`
          UPDATE dunning_sequences SET status = 'completed', next_email_at = NULL WHERE id = ?
        `).bind(seq.id).run()
        results.skipped++
        continue
      }

      let emailTemplate
      if (nextDay === 3) {
        emailTemplate = paymentFailedDay3(seq.customer_email, portalBaseUrl)
      } else if (nextDay === 7) {
        emailTemplate = paymentFailedDay7(seq.customer_email, portalBaseUrl)
      }

      const { subject, html, text } = emailTemplate
      const emailResult = await sendEmail({ to: seq.customer_email, subject, html, text }, env)

      if (emailResult.success) {
        // Schedule next email or mark complete
        let nextEmailAt = null
        let newStatus = 'active'

        if (nextDay === 3) {
          // Day 7 email is 4 more days away
          nextEmailAt = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()
        } else if (nextDay === 7) {
          // No more emails after day 7
          newStatus = 'completed'
        }

        await env.DB.prepare(`
          UPDATE dunning_sequences
          SET last_email_day = ?, next_email_at = ?, status = ?
          WHERE id = ?
        `).bind(nextDay, nextEmailAt, newStatus, seq.id).run()

        console.log(`[Dunning] Day ${nextDay} email sent to ${seq.customer_email} (seq: ${seq.id})`)
        results.processed++
      } else {
        console.error(`[Dunning] Failed to send Day ${nextDay} email for seq ${seq.id}:`, emailResult.error)
        results.errors++
      }
    } catch (err) {
      console.error('[Dunning] Error processing sequence:', seq.id, err.message)
      results.errors++
    }
  }

  console.log('[Dunning] Batch complete:', results)
  return results
}

/**
 * HTTP handler for triggering dunning processing via an authenticated POST request.
 * Endpoint: POST /api/process-dunning
 * Header: Authorization: Bearer <DUNNING_SECRET>
 */
export async function onRequestPost(context) {
  const { request, env } = context

  // Require a secret to prevent unauthorized access
  const secret = env.DUNNING_SCHEDULER_SECRET
  if (secret) {
    const authHeader = request.headers.get('Authorization') || ''
    const token = authHeader.replace('Bearer ', '')
    if (token !== secret) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } else {
    console.warn('[Dunning] No DUNNING_SCHEDULER_SECRET set — endpoint is unprotected!')
  }

  const results = await processDunningSequences(env)

  return new Response(JSON.stringify({ ok: true, ...results }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
