import { jsonResponse, rateLimit, rateLimitResponse } from './_shared.js'
import { sendEmail } from './_email.js'

/**
 * Verify Clerk webhook signature (Svix).
 * Clerk uses Svix under the hood — the signature is HMAC-SHA256 of
 * `${svix-id}.${svix-timestamp}.${body}` with the webhook secret.
 * The secret from Clerk starts with "whsec_" followed by base64-encoded key.
 */
async function verifyClerkWebhook(rawBody, headers, secret) {
  const svixId = headers.get('svix-id')
  const svixTimestamp = headers.get('svix-timestamp')
  const svixSignature = headers.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature || !secret) return false

  // Reject timestamps older than 5 minutes
  const now = Math.floor(Date.now() / 1000)
  const ts = parseInt(svixTimestamp, 10)
  if (isNaN(ts) || Math.abs(now - ts) > 300) return false

  // Decode the secret — strip "whsec_" prefix, then base64-decode
  const secretStr = secret.startsWith('whsec_') ? secret.slice(6) : secret
  const secretBytes = Uint8Array.from(atob(secretStr), c => c.charCodeAt(0))

  // Compute HMAC-SHA256 of "${svix-id}.${svix-timestamp}.${body}"
  const encoder = new TextEncoder()
  const signedContent = encoder.encode(`${svixId}.${svixTimestamp}.${rawBody}`)

  const key = await crypto.subtle.importKey(
    'raw',
    secretBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, signedContent)
  const expectedSig = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)))

  // svix-signature header can contain multiple signatures separated by spaces
  // Each signature is prefixed with "v1,"
  const signatures = svixSignature.split(' ')
  for (const sig of signatures) {
    const sigValue = sig.startsWith('v1,') ? sig.slice(3) : null
    if (!sigValue) continue

    // Constant-time comparison
    if (sigValue.length !== expectedSig.length) continue
    let result = 0
    for (let i = 0; i < sigValue.length; i++) {
      result |= sigValue.charCodeAt(i) ^ expectedSig.charCodeAt(i)
    }
    if (result === 0) return true
  }

  return false
}

/**
 * Build the welcome email HTML.
 * Plain, founder-to-founder style matching the project's email voice.
 */
function buildWelcomeEmail(firstName) {
  const name = firstName || 'there'
  const dashboardUrl = 'https://churnrecovery.app/app/dashboard'

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; color: #1a1a1a; line-height: 1.6; font-size: 16px;">
  <p>Hey ${name},</p>

  <p>Welcome to ChurnRecovery — glad you're here.</p>

  <p>ChurnRecovery helps subscription businesses recover churned revenue with cancel flows, payment failure recovery emails, and simple retention analytics. It's free — no trial, no limits.</p>

  <p>Here's how to get started:</p>

  <p><strong>1. Connect your payment processor</strong><br/>
  Link your Stripe account so we can monitor subscriptions and trigger recovery flows when needed. Takes about 2 minutes.</p>

  <p><strong>2. Install the cancel flow widget</strong><br/>
  Add a short code snippet to your site. When a subscriber clicks "Cancel," they'll see a customizable screen with save offers before anything happens.</p>

  <p><strong>3. Watch your first recovery happen</strong><br/>
  Once you're set up, ChurnRecovery works automatically. Check your dashboard to see saves and recovered revenue in real time.</p>

  <p><a href="${dashboardUrl}" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 8px 0;">Go to your dashboard →</a></p>

  <p>If you get stuck or have questions, just reply to this email. I read every message.</p>

  <p>— Dawood<br/>
  <span style="color: #6b7280;">ChurnRecovery</span></p>
</div>
`.trim()

  const text = `Hey ${name},

Welcome to ChurnRecovery — glad you're here.

ChurnRecovery helps subscription businesses recover churned revenue with cancel flows, payment failure recovery emails, and simple retention analytics. It's free — no trial, no limits.

Here's how to get started:

1. Connect your payment processor
Link your Stripe account so we can monitor subscriptions and trigger recovery flows when needed. Takes about 2 minutes.

2. Install the cancel flow widget
Add a short code snippet to your site. When a subscriber clicks "Cancel," they'll see a customizable screen with save offers before anything happens.

3. Watch your first recovery happen
Once you're set up, ChurnRecovery works automatically. Check your dashboard to see saves and recovered revenue in real time.

Go to your dashboard: ${dashboardUrl}

If you get stuck or have questions, just reply to this email. I read every message.

— Dawood
ChurnRecovery`

  return { html, text }
}

export async function onRequestPost(context) {
  const { request, env } = context

  // Rate limit: 50 per minute
  const rl = rateLimit(request, { maxRequests: 50, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  try {
    const rawBody = await request.text()

    // Verify webhook signature
    const webhookSecret = env.CLERK_WEBHOOK_SECRET
    if (webhookSecret) {
      const isValid = await verifyClerkWebhook(rawBody, request.headers, webhookSecret)
      if (!isValid) {
        console.error('[Clerk] Invalid webhook signature')
        return jsonResponse({ error: 'Invalid signature' }, 401)
      }
    } else {
      console.warn('[Clerk] No CLERK_WEBHOOK_SECRET configured — accepting unverified webhook')
    }

    const event = JSON.parse(rawBody)

    if (!event || !event.type || !event.data) {
      return jsonResponse({ error: 'Invalid event structure' }, 400)
    }

    switch (event.type) {
      case 'user.created': {
        const user = event.data
        const email = user.email_addresses?.find(e => e.id === user.primary_email_address_id)?.email_address
        const firstName = user.first_name || null

        if (!email) {
          console.warn('[Clerk] user.created event with no email — skipping welcome email')
          break
        }

        console.log('[Clerk] New user created:', email)

        const { html, text } = buildWelcomeEmail(firstName)
        const emailResult = await sendEmail({
          to: email,
          subject: 'Welcome to ChurnRecovery 🎉 — here\'s how to get started',
          html,
          text,
        }, env)

        console.log('[Clerk] Welcome email result:', emailResult.success ? 'sent' : 'failed')
        break
      }

      default:
        console.log('[Clerk] Unhandled event type:', event.type)
    }

    return jsonResponse({ received: true })
  } catch (err) {
    console.error('[Clerk] Webhook error:', err.message)
    return jsonResponse({ error: 'Webhook processing error' }, 400)
  }
}
