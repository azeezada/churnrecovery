// Stripe webhook handler
// In production, this would verify the webhook signature and interact with D1

export const config = {
  api: {
    bodyParser: false, // Stripe needs raw body for signature verification
  },
}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const rawBody = await getRawBody(req)
    const event = JSON.parse(rawBody.toString())

    // In production, verify signature:
    // const sig = req.headers['stripe-signature']
    // const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)

    switch (event.type) {
      case 'customer.subscription.deleted': {
        // Customer churned — log to D1
        const subscription = event.data.object
        console.log('[Stripe] Subscription deleted:', subscription.id)
        // TODO: Log cancel event to D1
        // TODO: Trigger win-back email sequence
        break
      }

      case 'invoice.payment_failed': {
        // Failed payment — trigger dunning
        const invoice = event.data.object
        console.log('[Stripe] Payment failed:', invoice.id, 'Amount:', invoice.amount_due)
        // TODO: Log failed payment to D1
        // TODO: Send dunning email with card update link
        // TODO: Schedule retry at optimal interval
        break
      }

      case 'customer.subscription.updated': {
        // Subscription changed — might be a save (downgrade/pause)
        const subscription = event.data.object
        const previousAttributes = event.data.previous_attributes
        
        if (previousAttributes?.cancel_at_period_end === false && subscription.cancel_at_period_end === true) {
          console.log('[Stripe] Subscription marked for cancellation:', subscription.id)
        }

        if (subscription.pause_collection) {
          console.log('[Stripe] Subscription paused:', subscription.id)
          // TODO: Log as 'paused' outcome
        }
        break
      }

      case 'invoice.payment_succeeded': {
        // Payment recovered after failed attempt
        const invoice = event.data.object
        if (invoice.billing_reason === 'subscription_cycle') {
          console.log('[Stripe] Payment recovered:', invoice.id)
          // TODO: Update failed_payments record to 'recovered'
        }
        break
      }

      default:
        console.log('[Stripe] Unhandled event type:', event.type)
    }

    return res.status(200).json({ received: true })
  } catch (err) {
    console.error('[Stripe] Webhook error:', err.message)
    return res.status(400).json({ error: 'Webhook error: ' + err.message })
  }
}
