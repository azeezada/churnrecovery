import { jsonResponse } from './_shared.js'

export async function onRequestPost(context) {
  const { request, env } = context

  try {
    const rawBody = await request.text()
    const event = JSON.parse(rawBody)

    // TODO: In production, verify Stripe webhook signature
    // const sig = request.headers.get('stripe-signature')

    switch (event.type) {
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        console.log('[Stripe] Subscription deleted:', subscription.id)

        if (subscription.metadata?.churnrecovery_project_id) {
          await env.DB.prepare(`
            INSERT INTO cancel_events (project_id, customer_id, outcome, reason)
            VALUES (?, ?, 'cancelled', 'stripe_churn')
          `).bind(subscription.metadata.churnrecovery_project_id, subscription.customer).run()
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        console.log('[Stripe] Payment failed:', invoice.id, 'Amount:', invoice.amount_due)

        if (invoice.metadata?.churnrecovery_project_id) {
          await env.DB.prepare(`
            INSERT INTO failed_payments (project_id, customer_id, stripe_invoice_id, amount_cents)
            VALUES (?, ?, ?, ?)
          `).bind(
            invoice.metadata.churnrecovery_project_id,
            invoice.customer,
            invoice.id,
            invoice.amount_due
          ).run()
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
          await env.DB.prepare(`
            INSERT INTO cancel_events (project_id, customer_id, outcome)
            VALUES (?, ?, 'paused')
          `).bind(subscription.metadata.churnrecovery_project_id, subscription.customer).run()
        }
        break
      }

      default:
        console.log('[Stripe] Unhandled event type:', event.type)
    }

    return jsonResponse({ received: true })
  } catch (err) {
    console.error('[Stripe] Webhook error:', err.message)
    return jsonResponse({ error: 'Webhook error: ' + err.message }, 400)
  }
}
