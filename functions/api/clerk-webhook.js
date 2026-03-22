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

const NURTURE_FROM = 'Dawood from ChurnRecovery <dawood@churnrecovery.com>'

/**
 * Compute an ISO 8601 datetime string offset by `days` from now.
 */
function scheduledAt(days) {
  const d = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  return d.toISOString()
}

/**
 * Shared email wrapper: plain div with founder-to-founder styling.
 */
function wrap(bodyHtml) {
  return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; color: #1a1a1a; line-height: 1.6; font-size: 16px;">${bodyHtml}</div>`
}

function ctaButton(label, url) {
  return `<p><a href="${url}" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 8px 0;">${label}</a></p>`
}

/* ── Email 2 — Day 3: Mini Case Study ─────────────────────────── */
function buildEmail2(firstName) {
  const name = firstName || 'there'
  const html = wrap(`
  <p>Hey ${name},</p>
  <p>Let me tell you about a situation I hear a lot from newsletter creators.</p>
  <p>Sarah runs a paid newsletter. 400 subscribers at $12/month — $4,800/month in recurring revenue she built over 18 months of consistent publishing. Solid. Life-changing, actually.</p>
  <p>Last December, she had a rough month. She published less. A few subscribers emailed asking where she'd been. Then, over two weeks, 34 subscribers canceled.</p>
  <p>That's $408/month gone. In two weeks.</p>
  <p>She almost shut the paid tier down entirely. Decided the pressure wasn't worth it.</p>
  <p>Here's what she didn't know:</p>
  <p><strong>12 of those 34 cancellations were failed payments.</strong> Cards expired over the holidays. She didn't have dunning emails set up, so nobody got a "hey, update your card" message. Those subscribers probably would have stayed — they just weren't asked.</p>
  <p><strong>Of the remaining 22 cancellations, she had no cancel flow.</strong> No offer to pause. No discount. No "why are you leaving?" question. They clicked Cancel, confirmed it, and were gone in 10 seconds.</p>
  <p>We ran the numbers together: if a cancel flow had saved even 5 of those 22 subscribers, and dunning emails had recovered 8 of the 12 failed payments — that's 13 subscribers kept. $156/month. <strong>$1,872 over a year.</strong></p>
  <p>Then we found the real number. A properly configured cancel flow typically saves 20–35% of people who try to cancel. For Sarah's volume, that's 4–7 people per month. At $12/month each, that's $576–$1,008/year just from the cancel flow alone. Add recovered failed payments: her annual recovery number crossed <strong>$3,600</strong>.</p>
  <p>Not life-changing for a large business. For a 400-subscriber newsletter that nearly shut down, it's the difference between "is this worth it?" and "yes, this is worth it."</p>
  <p>The tools that make this happen aren't complicated. They're just not built for creators at Sarah's scale. That's what ChurnRecovery is trying to change.</p>
  <p>More on the mechanics in a few days.</p>
  <p>— Dawood<br/><span style="color: #6b7280;">ChurnRecovery</span></p>
  ${ctaButton('See a real cancel flow demo →', 'https://churnrecovery.com/demo')}
`)
  const text = `Hey ${name},

Let me tell you about a situation I hear a lot from newsletter creators.

Sarah runs a paid newsletter. 400 subscribers at $12/month — $4,800/month in recurring revenue she built over 18 months of consistent publishing. Solid. Life-changing, actually.

Last December, she had a rough month. She published less. A few subscribers emailed asking where she'd been. Then, over two weeks, 34 subscribers canceled.

That's $408/month gone. In two weeks.

She almost shut the paid tier down entirely. Decided the pressure wasn't worth it.

Here's what she didn't know:

12 of those 34 cancellations were failed payments. Cards expired over the holidays. She didn't have dunning emails set up, so nobody got a "hey, update your card" message. Those subscribers probably would have stayed — they just weren't asked.

Of the remaining 22 cancellations, she had no cancel flow. No offer to pause. No discount. No "why are you leaving?" question. They clicked Cancel, confirmed it, and were gone in 10 seconds.

We ran the numbers together: if a cancel flow had saved even 5 of those 22 subscribers, and dunning emails had recovered 8 of the 12 failed payments — that's 13 subscribers kept. $156/month. $1,872 over a year.

Then we found the real number. A properly configured cancel flow typically saves 20-35% of people who try to cancel. For Sarah's volume, that's 4-7 people per month. At $12/month each, that's $576-$1,008/year just from the cancel flow alone. Add recovered failed payments: her annual recovery number crossed $3,600.

Not life-changing for a large business. For a 400-subscriber newsletter that nearly shut down, it's the difference between "is this worth it?" and "yes, this is worth it."

The tools that make this happen aren't complicated. They're just not built for creators at Sarah's scale. That's what ChurnRecovery is trying to change.

More on the mechanics in a few days.

— Dawood
ChurnRecovery

See a real cancel flow demo: https://churnrecovery.com/demo`

  return { html, text }
}

/* ── Email 3 — Day 7: Cancel Flow Walk-through ────────────────── */
function buildEmail3(firstName) {
  const name = firstName || 'there'
  const html = wrap(`
  <p>Hey ${name},</p>
  <p>I want to show you what ChurnRecovery actually looks like in practice, because "cancel flow software" sounds more complicated than it is.</p>
  <p>Here's the step-by-step of what happens.</p>
  <p><strong>Before ChurnRecovery:</strong><br/>A subscriber on your newsletter (or course, or membership) decides they want to cancel. They find the cancel button, click it, confirm it. Gone. You find out in your Stripe dashboard a day or two later. There's nothing you could have done.</p>
  <p><strong>After ChurnRecovery:</strong><br/>Same scenario. Subscriber clicks Cancel. Instead of the immediate confirmation screen, they see a short page — one you control.</p>
  <p>The page asks one question: <em>"Before you go, what's going on?"</em></p>
  <p>And gives a few options:</p>
  <ul>
    <li>"I'm not using it enough right now"</li>
    <li>"It's too expensive right now"</li>
    <li>"I need a break"</li>
    <li>"I found something else"</li>
    <li>"Other"</li>
  </ul>
  <p>Based on what they pick, they see a tailored response:</p>
  <ul>
    <li><strong>"Need a break"</strong> → "Want to pause for 30 days instead? You won't be charged, and your access picks right back up when you're ready."</li>
    <li><strong>"Too expensive"</strong> → "Here's 50% off for the next 3 months — want to stay?"</li>
    <li><strong>"Not using it enough"</strong> → "Totally fair. Here's what you might not know is inside: [quick value reminder]."</li>
  </ul>
  <p>If they take an offer, they stay. Revenue kept.<br/>If they decline, they cancel cleanly — same as before. No extra friction. No dark patterns.</p>
  <p><strong>Setting this up takes about 10 minutes.</strong> Connect your Stripe account, write the offer text you want to show, pick which offers to display. That's it. No coding, no developer, no waiting for IT.</p>
  <p>The payment failure side works similarly. When a payment fails, ChurnRecovery sends up to 3 emails over 7 days:</p>
  <ol>
    <li>Day 1: "Quick heads up — your payment didn't go through. Update your card in 2 clicks."</li>
    <li>Day 4: "Your access pauses in 3 days unless you update your card."</li>
    <li>Day 7: "Last chance to keep your subscription access."</li>
  </ol>
  <p>You customize the tone. Most businesses recover 10–20% of failed payments that would otherwise silently lapse.</p>
  <p>That's the whole product. Nothing else hidden behind a paywall. No features you have to upgrade to unlock.</p>
  <p>If you want to see a live version before setting it up, we have a demo at the link below.</p>
  <p>— Dawood<br/><span style="color: #6b7280;">ChurnRecovery</span></p>
  ${ctaButton('Try the live demo →', 'https://churnrecovery.com/demo')}
`)
  const text = `Hey ${name},

I want to show you what ChurnRecovery actually looks like in practice, because "cancel flow software" sounds more complicated than it is.

Here's the step-by-step of what happens.

Before ChurnRecovery:
A subscriber on your newsletter (or course, or membership) decides they want to cancel. They find the cancel button, click it, confirm it. Gone. You find out in your Stripe dashboard a day or two later. There's nothing you could have done.

After ChurnRecovery:
Same scenario. Subscriber clicks Cancel. Instead of the immediate confirmation screen, they see a short page — one you control.

The page asks one question: "Before you go, what's going on?"

And gives a few options:
- "I'm not using it enough right now"
- "It's too expensive right now"
- "I need a break"
- "I found something else"
- "Other"

Based on what they pick, they see a tailored response:
- "Need a break" → "Want to pause for 30 days instead? You won't be charged, and your access picks right back up when you're ready."
- "Too expensive" → "Here's 50% off for the next 3 months — want to stay?"
- "Not using it enough" → "Totally fair. Here's what you might not know is inside: [quick value reminder]."

If they take an offer, they stay. Revenue kept.
If they decline, they cancel cleanly — same as before. No extra friction. No dark patterns.

Setting this up takes about 10 minutes. Connect your Stripe account, write the offer text you want to show, pick which offers to display. That's it. No coding, no developer, no waiting for IT.

The payment failure side works similarly. When a payment fails, ChurnRecovery sends up to 3 emails over 7 days:
1. Day 1: "Quick heads up — your payment didn't go through. Update your card in 2 clicks."
2. Day 4: "Your access pauses in 3 days unless you update your card."
3. Day 7: "Last chance to keep your subscription access."

You customize the tone. Most businesses recover 10-20% of failed payments that would otherwise silently lapse.

That's the whole product. Nothing else hidden behind a paywall. No features you have to upgrade to unlock.

If you want to see a live version before setting it up, we have a demo at the link below.

— Dawood
ChurnRecovery

Try the live demo: https://churnrecovery.com/demo`

  return { html, text }
}

/* ── Email 4 — Day 14: Why It's Free ──────────────────────────── */
function buildEmail4(firstName) {
  const name = firstName || 'there'
  const html = wrap(`
  <p>Hey ${name},</p>
  <p>I've gotten some version of this question a lot: <em>"It's free? What's the catch?"</em></p>
  <p>Totally fair question. Free software for business use doesn't make obvious sense. So let me explain our actual thinking.</p>
  <p><strong>The reason it exists:</strong> Churn recovery tools — cancel flows, dunning emails, retention analytics — have been around for years. The problem is they're priced for enterprise SaaS. Churnkey starts at $250/month. ProfitWell Retain is similar pricing. Chargebee Retain is even more expensive.</p>
  <p>For a newsletter creator with 500 subscribers, that's pricing that doesn't make sense. Your entire recurring revenue might be $5,000/month. Spending $250 of it on retention software is 5% of MRR — a hard sell when you're not sure it'll work.</p>
  <p>But the tools themselves aren't complicated. Cancel flows and dunning emails are not enterprise-grade technology. They're automations that have been locked behind enterprise pricing because the market let it happen.</p>
  <p><strong>So our answer is: give it away free.</strong> Genuinely, no trial, no freemium limit, no "free up to 100 subscribers" gate. Free.</p>
  <p><strong>How does ChurnRecovery make money?</strong> Eventually, through optional premium features — things like advanced analytics, A/B testing cancel flow variants, team access, priority support. The core product — cancel flow, payment failure recovery, basic dashboard — will remain free.</p>
  <p>We're early. The premium features aren't fully built yet. So right now, everything is free because that's what it actually is.</p>
  <p><strong>What we need from you:</strong> Honest feedback. When you set it up, tell us what doesn't work. What's confusing. What you wish it did. Early users who tell us what's broken are the most valuable thing we have right now.</p>
  <p>That's the whole model. No hidden agenda, no "we'll raise prices once we have lock-in." We want to be the free version of tools that cost too much — and make the premium version worth paying for when you need it.</p>
  <p>If anything about that sounds off, reply to this email. I read every message.</p>
  <p>— Dawood<br/><span style="color: #6b7280;">ChurnRecovery</span></p>
  ${ctaButton("Get early access (it's actually free) →", 'https://churnrecovery.com')}
`)
  const text = `Hey ${name},

I've gotten some version of this question a lot: "It's free? What's the catch?"

Totally fair question. Free software for business use doesn't make obvious sense. So let me explain our actual thinking.

The reason it exists: Churn recovery tools — cancel flows, dunning emails, retention analytics — have been around for years. The problem is they're priced for enterprise SaaS. Churnkey starts at $250/month. ProfitWell Retain is similar pricing. Chargebee Retain is even more expensive.

For a newsletter creator with 500 subscribers, that's pricing that doesn't make sense. Your entire recurring revenue might be $5,000/month. Spending $250 of it on retention software is 5% of MRR — a hard sell when you're not sure it'll work.

But the tools themselves aren't complicated. Cancel flows and dunning emails are not enterprise-grade technology. They're automations that have been locked behind enterprise pricing because the market let it happen.

So our answer is: give it away free. Genuinely, no trial, no freemium limit, no "free up to 100 subscribers" gate. Free.

How does ChurnRecovery make money? Eventually, through optional premium features — things like advanced analytics, A/B testing cancel flow variants, team access, priority support. The core product — cancel flow, payment failure recovery, basic dashboard — will remain free.

We're early. The premium features aren't fully built yet. So right now, everything is free because that's what it actually is.

What we need from you: Honest feedback. When you set it up, tell us what doesn't work. What's confusing. What you wish it did. Early users who tell us what's broken are the most valuable thing we have right now.

That's the whole model. No hidden agenda, no "we'll raise prices once we have lock-in." We want to be the free version of tools that cost too much — and make the premium version worth paying for when you need it.

If anything about that sounds off, reply to this email. I read every message.

— Dawood
ChurnRecovery

Get early access (it's actually free): https://churnrecovery.com`

  return { html, text }
}

/* ── Email 5 — Day 21: Early Access CTA ───────────────────────── */
function buildEmail5(firstName) {
  const name = firstName || 'there'
  const html = wrap(`
  <p>Hey ${name},</p>
  <p>We're open.</p>
  <p>Early access is live, and you're in the first group. That means no queue, no waitlist page, no "we'll email you when your spot opens." You can create an account and be up and running today.</p>
  <p><strong>Here's what to do:</strong></p>
  <ol>
    <li>Go to churnrecovery.com and create your account</li>
    <li>Connect your Stripe account (takes about 2 minutes — read-only access, no payment permissions needed)</li>
    <li>Set up your first cancel flow — pick your offer, customize the language, turn it on</li>
    <li>Optional: turn on payment failure recovery emails</li>
  </ol>
  <p>The whole setup is 10–15 minutes. If you get stuck anywhere, reply to this email directly.</p>
  <p><strong>What you get as an early-access member:</strong></p>
  <p>Everything in ChurnRecovery is free — cancel flows, dunning emails, analytics, all of it. As a waitlist member who joined before launch, you also get:</p>
  <ul>
    <li><strong>Priority support:</strong> I'll personally respond to questions from early members. Not a help desk, not a ticket system — just email me.</li>
    <li><strong>Input on what we build next:</strong> Early members get to vote on the feature roadmap. If there's something specific you need, you have a real shot at influencing it.</li>
    <li><strong>Locked free tier:</strong> If we ever introduce pricing limits, early members are grandfathered in at what they have now.</li>
  </ul>
  <p>I want to be honest about where we are: this is v1. It works — we've tested it thoroughly, and the core flows are solid. But there will be rough edges. If you find something broken or confusing, please tell me. That feedback is genuinely how we make this better.</p>
  <p>We're a small team building something we believe in. Not trying to flip this to a VC or raise a round — trying to build a tool that makes subscription businesses more sustainable for the people running them.</p>
  <p>You signed up because something about that resonated. Now's your chance to see if it's as useful as it sounds.</p>
  <p>Thank you for being here from the beginning.</p>
  <p>— Dawood<br/><span style="color: #6b7280;">ChurnRecovery</span></p>
  ${ctaButton('Set up ChurnRecovery now →', 'https://churnrecovery.com')}
`)
  const text = `Hey ${name},

We're open.

Early access is live, and you're in the first group. That means no queue, no waitlist page, no "we'll email you when your spot opens." You can create an account and be up and running today.

Here's what to do:

1. Go to churnrecovery.com and create your account
2. Connect your Stripe account (takes about 2 minutes — read-only access, no payment permissions needed)
3. Set up your first cancel flow — pick your offer, customize the language, turn it on
4. Optional: turn on payment failure recovery emails

The whole setup is 10-15 minutes. If you get stuck anywhere, reply to this email directly.

What you get as an early-access member:

Everything in ChurnRecovery is free — cancel flows, dunning emails, analytics, all of it. As a waitlist member who joined before launch, you also get:

- Priority support: I'll personally respond to questions from early members. Not a help desk, not a ticket system — just email me.
- Input on what we build next: Early members get to vote on the feature roadmap. If there's something specific you need, you have a real shot at influencing it.
- Locked free tier: If we ever introduce pricing limits, early members are grandfathered in at what they have now.

I want to be honest about where we are: this is v1. It works — we've tested it thoroughly, and the core flows are solid. But there will be rough edges. If you find something broken or confusing, please tell me. That feedback is genuinely how we make this better.

We're a small team building something we believe in. Not trying to flip this to a VC or raise a round — trying to build a tool that makes subscription businesses more sustainable for the people running them.

You signed up because something about that resonated. Now's your chance to see if it's as useful as it sounds.

Thank you for being here from the beginning.

— Dawood
ChurnRecovery

Set up ChurnRecovery now: https://churnrecovery.com`

  return { html, text }
}

/**
 * Schedule the onboarding nurture sequence (Emails #2–5) via Resend scheduled sends.
 * Email #1 (welcome) is sent immediately; this handles the rest.
 */
async function scheduleNurtureSequence(email, firstName, env) {
  const sequence = [
    { builder: buildEmail2, subject: 'How one newsletter creator saved $3,600/year she almost left on the table', days: 3 },
    { builder: buildEmail3, subject: 'What actually happens when your subscriber clicks "Cancel"', days: 7 },
    { builder: buildEmail4, subject: 'Why ChurnRecovery is free (the real reason, not marketing speak)', days: 14 },
    { builder: buildEmail5, subject: 'Early access is open — your spot is waiting', days: 21 },
  ]

  const results = []
  for (const { builder, subject, days } of sequence) {
    const { html, text } = builder(firstName)
    const result = await sendEmail({
      to: email,
      subject,
      html,
      text,
      from: NURTURE_FROM,
      scheduledAt: scheduledAt(days),
    }, env)
    results.push({ subject, days, success: result.success, id: result.id })
  }

  return results
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

        // Schedule nurture emails #2–5
        const nurtureResults = await scheduleNurtureSequence(email, firstName, env)
        console.log('[Clerk] Nurture sequence scheduled:', JSON.stringify(nurtureResults.map(r => ({ days: r.days, ok: r.success }))))
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
