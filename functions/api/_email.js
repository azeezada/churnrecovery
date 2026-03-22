/**
 * Email sender utility for ChurnRecovery dunning sequences.
 * Uses Resend if RESEND_API_KEY is set, otherwise logs to console (dev mode).
 */

const FROM_ADDRESS = 'ChurnRecovery <noreply@churnrecovery.com>'

/**
 * Send an email via Resend or log it in dev mode.
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body
 * @param {string} [options.text] - Plain text body (optional fallback)
 * @param {string} [options.from] - Custom from address (defaults to FROM_ADDRESS)
 * @param {string} [options.scheduledAt] - ISO 8601 datetime to schedule the email
 * @param {Object} env - Cloudflare Worker env bindings
 */
export async function sendEmail({ to, subject, html, text, from, scheduledAt }, env) {
  const apiKey = env?.RESEND_API_KEY

  if (!apiKey) {
    // Dev mode — log to console, don't actually send
    console.log('[Email] DEV MODE — Email not sent (no RESEND_API_KEY)')
    console.log(`[Email] To: ${to}`)
    console.log(`[Email] Subject: ${subject}`)
    if (scheduledAt) console.log(`[Email] Scheduled at: ${scheduledAt}`)
    console.log(`[Email] Body preview: ${(text || html || '').slice(0, 200)}`)
    return { success: true, dev: true }
  }

  try {
    const payload = {
      from: from || FROM_ADDRESS,
      to: [to],
      subject,
      html,
    }
    if (text) payload.text = text
    if (scheduledAt) payload.scheduled_at = scheduledAt

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`[Email] Resend API error ${response.status}:`, errorBody)
      return { success: false, error: errorBody, status: response.status }
    }

    const result = await response.json()
    console.log('[Email] Sent successfully via Resend:', result.id, scheduledAt ? `(scheduled: ${scheduledAt})` : '')
    return { success: true, id: result.id }
  } catch (err) {
    console.error('[Email] Failed to send:', err.message)
    return { success: false, error: err.message }
  }
}
