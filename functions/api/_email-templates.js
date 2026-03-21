/**
 * Dunning email templates for ChurnRecovery.
 * Written for non-technical business owners — friendly, clear, no jargon.
 * Brand: #D97757 accent, #191919 text, clean minimal HTML.
 */

const BRAND_COLOR = '#D97757'
const TEXT_COLOR = '#191919'
const BG_COLOR = '#FAFAFA'
const CARD_BG = '#FFFFFF'

function baseTemplate({ preheader, title, body, ctaText, ctaUrl }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${BG_COLOR};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <!-- Preheader text (hidden, shows in inbox preview) -->
  <div style="display:none;max-height:0;overflow:hidden;color:${BG_COLOR};">${preheader}</div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG_COLOR};padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

          <!-- Logo / Brand -->
          <tr>
            <td style="padding-bottom:24px;text-align:center;">
              <span style="font-size:20px;font-weight:700;color:${BRAND_COLOR};letter-spacing:-0.5px;">ChurnRecovery</span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:${CARD_BG};border-radius:12px;padding:40px 48px;box-shadow:0 1px 4px rgba(0,0,0,0.06);">

              <!-- Title -->
              <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:${TEXT_COLOR};line-height:1.3;">${title}</h1>

              <!-- Body content -->
              ${body}

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="${ctaUrl}"
                       style="display:inline-block;background-color:${BRAND_COLOR};color:#FFFFFF;font-size:16px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;letter-spacing:0.2px;">
                      ${ctaText}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Link fallback -->
              <p style="margin:20px 0 0;font-size:13px;color:#888888;text-align:center;">
                Button not working? <a href="${ctaUrl}" style="color:${BRAND_COLOR};text-decoration:underline;">Click here</a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#AAAAAA;line-height:1.6;">
                You're receiving this because your subscription payment needs attention.<br />
                ChurnRecovery &mdash; helping businesses retain more customers.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * Day 0: Payment just failed — friendly, no panic.
 * @param {string} customerEmail - Customer's email (used for personalization if needed)
 * @param {string} updateUrl - Link to Stripe customer portal to update card
 */
export function paymentFailedDay0(customerEmail, updateUrl) {
  const subject = "Your payment didn't go through — quick fix needed"

  const preheader = 'No worries — it happens. Here\'s how to fix it in 60 seconds.'

  const body = `
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      Hey there,
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      We tried to process your subscription payment, but it didn't go through. No worries — this happens sometimes, and it's usually a quick fix.
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      <strong>To keep your subscription active</strong>, just click below to update your payment method. It takes less than a minute.
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      Common reasons this happens:
    </p>
    <ul style="margin:0 0 16px;padding-left:24px;font-size:16px;color:${TEXT_COLOR};line-height:1.8;">
      <li>Card expired or replaced</li>
      <li>Insufficient funds at time of billing</li>
      <li>Bank flagged the charge (call them to approve)</li>
    </ul>
    <p style="margin:0;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      If you have any questions, just reply to this email. We're happy to help.
    </p>
  `

  const html = baseTemplate({
    preheader,
    title: "Your payment didn't go through",
    body,
    ctaText: 'Update Payment Method',
    ctaUrl: updateUrl,
  })

  const text = `Your payment didn't go through — quick fix needed

Hey there,

We tried to process your subscription payment, but it didn't go through. No worries — this happens sometimes, and it's usually a quick fix.

To keep your subscription active, update your payment method here:
${updateUrl}

Common reasons this happens:
- Card expired or replaced
- Insufficient funds at time of billing
- Bank flagged the charge (call them to approve)

If you have any questions, just reply to this email. We're happy to help.

— ChurnRecovery`

  return { subject, html, text }
}

/**
 * Day 3: Friendly reminder — account at risk.
 * @param {string} customerEmail - Customer's email
 * @param {string} updateUrl - Link to Stripe customer portal
 */
export function paymentFailedDay3(customerEmail, updateUrl) {
  const subject = "Quick reminder — your account needs attention"

  const preheader = 'Your subscription is still active, but we need your updated payment info.'

  const body = `
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      Hey there,
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      We sent you a note a few days ago about your payment — just wanted to follow up in case it slipped through the cracks.
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      <strong>Your subscription is still active</strong>, but we haven't been able to process your payment yet. To avoid any interruption to your service, please update your payment method as soon as you can.
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      Updating takes less than a minute — just click the button below.
    </p>
    <p style="margin:0;font-size:14px;color:#888888;line-height:1.7;">
      Questions? Just hit reply and we'll sort it out together.
    </p>
  `

  const html = baseTemplate({
    preheader,
    title: 'Your account needs a quick update',
    body,
    ctaText: 'Update Payment Method Now',
    ctaUrl: updateUrl,
  })

  const text = `Quick reminder — your account needs attention

Hey there,

We sent you a note a few days ago about your payment — just wanted to follow up in case it slipped through the cracks.

Your subscription is still active, but we haven't been able to process your payment yet. To avoid any interruption to your service, please update your payment method as soon as you can.

Update your payment here (takes less than a minute):
${updateUrl}

Questions? Just hit reply and we'll sort it out together.

— ChurnRecovery`

  return { subject, html, text }
}

/**
 * Day 7: Final warning before cancellation.
 * @param {string} customerEmail - Customer's email
 * @param {string} updateUrl - Link to Stripe customer portal
 */
export function paymentFailedDay7(customerEmail, updateUrl) {
  const subject = "Last chance — your subscription cancels tomorrow"

  const preheader = 'Update your payment today to keep your account active.'

  const body = `
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      Hey there,
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      This is our final notice — <strong>your subscription is scheduled to cancel tomorrow</strong> due to an unpaid balance.
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      If you'd like to keep your account and everything in it, please update your payment method <strong>today</strong>.
    </p>

    <!-- Urgency box -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
      <tr>
        <td style="background-color:#FFF4EE;border-left:4px solid ${BRAND_COLOR};border-radius:4px;padding:16px 20px;">
          <p style="margin:0;font-size:15px;color:${TEXT_COLOR};line-height:1.6;">
            <strong>Act today</strong> — once your subscription is cancelled, you'll lose access to your account and all its data.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:14px;color:#888888;line-height:1.7;">
      If you've already updated your payment or no longer wish to continue, you can ignore this email. We hope to keep you with us!
    </p>
  `

  const html = baseTemplate({
    preheader,
    title: 'Your subscription cancels tomorrow',
    body,
    ctaText: 'Save My Account Now',
    ctaUrl: updateUrl,
  })

  const text = `Last chance — your subscription cancels tomorrow

Hey there,

This is our final notice — your subscription is scheduled to cancel tomorrow due to an unpaid balance.

If you'd like to keep your account and everything in it, please update your payment method TODAY:
${updateUrl}

Once cancelled, you'll lose access to your account and all its data.

If you've already updated your payment or no longer wish to continue, you can ignore this email.

— ChurnRecovery`

  return { subject, html, text }
}
