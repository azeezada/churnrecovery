var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/_shared.js
var ALLOWED_ORIGINS = [
  "https://churnrecovery.com",
  "https://www.churnrecovery.com",
  "http://localhost:3000",
  "http://localhost:8788"
];
function getCorsHeaders(request, { allowAnyOrigin = false } = {}) {
  const origin = request?.headers?.get("Origin") || "";
  let allowedOrigin = "";
  if (allowAnyOrigin) {
    allowedOrigin = origin || "*";
  } else if (ALLOWED_ORIGINS.includes(origin)) {
    allowedOrigin = origin;
  }
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
    ...allowAnyOrigin ? {} : { "Vary": "Origin" }
  };
}
__name(getCorsHeaders, "getCorsHeaders");
var corsHeaders = {
  "Access-Control-Allow-Origin": "https://churnrecovery.com",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key"
};
function jsonResponse(data, status = 200, request = null, { allowAnyOrigin = false } = {}) {
  const headers = request ? { "Content-Type": "application/json", ...getCorsHeaders(request, { allowAnyOrigin }) } : { "Content-Type": "application/json", ...corsHeaders };
  return new Response(JSON.stringify(data), { status, headers });
}
__name(jsonResponse, "jsonResponse");
function generateId(prefix = "proj") {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "").substring(0, 12)}`;
}
__name(generateId, "generateId");
function generateApiKey() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `cr_live_${hex}`;
}
__name(generateApiKey, "generateApiKey");
var jwksCache = null;
var jwksCacheAt = 0;
var JWKS_TTL_MS = 60 * 60 * 1e3;
async function getJwks(env) {
  const now = Date.now();
  if (jwksCache && now - jwksCacheAt < JWKS_TTL_MS) return jwksCache;
  const jwksUrl = env?.CLERK_JWKS_URL;
  if (!jwksUrl) {
    throw new Error("CLERK_JWKS_URL env var not set");
  }
  const res = await fetch(jwksUrl, {
    headers: { "Accept": "application/json" },
    cf: { cacheTtl: 3600, cacheEverything: true }
  });
  if (!res.ok) throw new Error(`JWKS fetch failed: ${res.status}`);
  jwksCache = await res.json();
  jwksCacheAt = now;
  return jwksCache;
}
__name(getJwks, "getJwks");
function base64urlToBuffer(b64url) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64.padEnd(b64.length + (4 - b64.length % 4) % 4, "=");
  const binary = atob(padded);
  const buf = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) buf[i] = binary.charCodeAt(i);
  return buf.buffer;
}
__name(base64urlToBuffer, "base64urlToBuffer");
async function verifyJwt(token, env) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed JWT");
  const headerJson = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
  const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
  const now = Math.floor(Date.now() / 1e3);
  if (payload.exp && payload.exp < now) throw new Error("Token expired");
  if (payload.nbf && payload.nbf > now) throw new Error("Token not yet valid");
  if (!payload.sub) throw new Error("Missing sub claim");
  if (!payload.iss || !payload.iss.includes("clerk")) {
    throw new Error("Invalid issuer");
  }
  const jwks = await getJwks(env);
  const kid = headerJson.kid;
  const jwk = kid ? jwks.keys?.find((k) => k.kid === kid) : jwks.keys?.[0];
  if (!jwk) throw new Error(`JWK not found for kid: ${kid}`);
  const alg = headerJson.alg || "RS256";
  let cryptoAlg;
  if (alg.startsWith("RS")) {
    const hashBits = alg.slice(2);
    cryptoAlg = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${hashBits}` };
  } else if (alg.startsWith("ES")) {
    const hashBits = alg.slice(2);
    cryptoAlg = { name: "ECDSA", namedCurve: `P-${hashBits}`, hash: `SHA-${hashBits}` };
  } else {
    throw new Error(`Unsupported algorithm: ${alg}`);
  }
  const publicKey = await crypto.subtle.importKey(
    "jwk",
    jwk,
    cryptoAlg,
    false,
    ["verify"]
  );
  const encoder = new TextEncoder();
  const signingInput = encoder.encode(`${parts[0]}.${parts[1]}`);
  const signature = base64urlToBuffer(parts[2]);
  const valid = await crypto.subtle.verify(
    cryptoAlg,
    publicKey,
    signature,
    signingInput
  );
  if (!valid) throw new Error("Signature verification failed");
  return payload;
}
__name(verifyJwt, "verifyJwt");
async function getUserId(request, env) {
  const origin = request.headers.get("Origin") || "";
  const isLocalDev = origin.startsWith("http://localhost");
  if (isLocalDev) {
    const devUserId = request.headers.get("X-User-Id");
    if (devUserId) return devUserId;
  }
  const auth = request.headers.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  try {
    if (env?.CLERK_JWKS_URL) {
      const payload = await verifyJwt(token, env);
      return payload.sub;
    }
    console.error("[AUTH] CLERK_JWKS_URL not set \u2014 denying all JWT auth. Configure this env var in CF Pages.");
    return null;
  } catch (err) {
    console.error("[AUTH] JWT verification failed:", err.message);
    return null;
  }
}
__name(getUserId, "getUserId");
function handleCors(request, { allowAnyOrigin = false } = {}) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request, { allowAnyOrigin })
  });
}
__name(handleCors, "handleCors");
var rateLimitMap = /* @__PURE__ */ new Map();
function rateLimit(request, { maxRequests = 60, windowMs = 6e4 } = {}) {
  const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
  const now = Date.now();
  const key = ip;
  let entry = rateLimitMap.get(key);
  if (!entry || now - entry.start > windowMs) {
    entry = { count: 0, start: now };
    rateLimitMap.set(key, entry);
  }
  entry.count++;
  if (entry.count > maxRequests) {
    return { limited: true, retryAfter: Math.ceil((entry.start + windowMs - now) / 1e3) };
  }
  return { limited: false };
}
__name(rateLimit, "rateLimit");
function rateLimitResponse(retryAfter, request) {
  return new Response(JSON.stringify({ error: "Too many requests" }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(retryAfter),
      ...getCorsHeaders(request)
    }
  });
}
__name(rateLimitResponse, "rateLimitResponse");
function sanitizeString(str, maxLength = 1e3) {
  if (typeof str !== "string") return null;
  const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return cleaned.substring(0, maxLength);
}
__name(sanitizeString, "sanitizeString");
function sanitizeProject(project) {
  if (!project) return project;
  const { stripe_secret_key, stripe_webhook_secret, ...safe } = project;
  return {
    ...safe,
    has_stripe_key: !!stripe_secret_key,
    has_webhook_secret: !!stripe_webhook_secret
  };
}
__name(sanitizeProject, "sanitizeProject");
var defaultFlow = {
  reasons: [
    { id: "too-expensive", label: "Too expensive", icon: "\u{1F4B0}", offerType: "discount", offerValue: 30, offerDuration: 3 },
    { id: "not-using", label: "Not using it enough", icon: "\u{1F634}", offerType: "pause", offerValue: 2, offerDuration: null },
    { id: "switching", label: "Switching to competitor", icon: "\u{1F44B}", offerType: "discount", offerValue: 50, offerDuration: 6 },
    { id: "missing-feature", label: "Missing a feature", icon: "\u{1F527}", offerType: "human", offerValue: null, offerDuration: null },
    { id: "too-complex", label: "Too complex to use", icon: "\u{1F92F}", offerType: "human", offerValue: null, offerDuration: null },
    { id: "other", label: "Something else", icon: "\u{1F4AC}", offerType: "feedback", offerValue: null, offerDuration: null }
  ],
  active: true
};

// api/waitlist/count.js
async function onRequestOptions(context) {
  return handleCors(context.request, { allowAnyOrigin: true });
}
__name(onRequestOptions, "onRequestOptions");
async function onRequestGet(context) {
  const { request, env } = context;
  const rl = rateLimit(request, { maxRequests: 30, windowMs: 6e4 });
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request);
  try {
    const result = await env.DB.prepare("SELECT COUNT(*) as count FROM waitlist").first();
    return jsonResponse({ count: result?.count || 0 }, 200, request, { allowAnyOrigin: true });
  } catch {
    return jsonResponse({ count: 0 }, 200, request, { allowAnyOrigin: true });
  }
}
__name(onRequestGet, "onRequestGet");

// api/_email.js
var FROM_ADDRESS = "ChurnRecovery <noreply@churnrecovery.com>";
async function sendEmail({ to, subject, html, text }, env) {
  const apiKey = env?.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Email] DEV MODE \u2014 Email not sent (no RESEND_API_KEY)");
    console.log(`[Email] To: ${to}`);
    console.log(`[Email] Subject: ${subject}`);
    console.log(`[Email] Body preview: ${(text || html || "").slice(0, 200)}`);
    return { success: true, dev: true };
  }
  try {
    const payload = {
      from: FROM_ADDRESS,
      to: [to],
      subject,
      html
    };
    if (text) payload.text = text;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[Email] Resend API error ${response.status}:`, errorBody);
      return { success: false, error: errorBody, status: response.status };
    }
    const result = await response.json();
    console.log("[Email] Sent successfully via Resend:", result.id);
    return { success: true, id: result.id };
  } catch (err) {
    console.error("[Email] Failed to send:", err.message);
    return { success: false, error: err.message };
  }
}
__name(sendEmail, "sendEmail");

// api/_email-templates.js
var BRAND_COLOR = "#D97757";
var TEXT_COLOR = "#191919";
var BG_COLOR = "#FAFAFA";
var CARD_BG = "#FFFFFF";
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
</html>`;
}
__name(baseTemplate, "baseTemplate");
function paymentFailedDay0(customerEmail, updateUrl) {
  const subject = "Your payment didn't go through \u2014 quick fix needed";
  const preheader = "No worries \u2014 it happens. Here's how to fix it in 60 seconds.";
  const body = `
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      Hey there,
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      We tried to process your subscription payment, but it didn't go through. No worries \u2014 this happens sometimes, and it's usually a quick fix.
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
  `;
  const html = baseTemplate({
    preheader,
    title: "Your payment didn't go through",
    body,
    ctaText: "Update Payment Method",
    ctaUrl: updateUrl
  });
  const text = `Your payment didn't go through \u2014 quick fix needed

Hey there,

We tried to process your subscription payment, but it didn't go through. No worries \u2014 this happens sometimes, and it's usually a quick fix.

To keep your subscription active, update your payment method here:
${updateUrl}

Common reasons this happens:
- Card expired or replaced
- Insufficient funds at time of billing
- Bank flagged the charge (call them to approve)

If you have any questions, just reply to this email. We're happy to help.

\u2014 ChurnRecovery`;
  return { subject, html, text };
}
__name(paymentFailedDay0, "paymentFailedDay0");
function paymentFailedDay3(customerEmail, updateUrl) {
  const subject = "Quick reminder \u2014 your account needs attention";
  const preheader = "Your subscription is still active, but we need your updated payment info.";
  const body = `
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      Hey there,
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      We sent you a note a few days ago about your payment \u2014 just wanted to follow up in case it slipped through the cracks.
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      <strong>Your subscription is still active</strong>, but we haven't been able to process your payment yet. To avoid any interruption to your service, please update your payment method as soon as you can.
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      Updating takes less than a minute \u2014 just click the button below.
    </p>
    <p style="margin:0;font-size:14px;color:#888888;line-height:1.7;">
      Questions? Just hit reply and we'll sort it out together.
    </p>
  `;
  const html = baseTemplate({
    preheader,
    title: "Your account needs a quick update",
    body,
    ctaText: "Update Payment Method Now",
    ctaUrl: updateUrl
  });
  const text = `Quick reminder \u2014 your account needs attention

Hey there,

We sent you a note a few days ago about your payment \u2014 just wanted to follow up in case it slipped through the cracks.

Your subscription is still active, but we haven't been able to process your payment yet. To avoid any interruption to your service, please update your payment method as soon as you can.

Update your payment here (takes less than a minute):
${updateUrl}

Questions? Just hit reply and we'll sort it out together.

\u2014 ChurnRecovery`;
  return { subject, html, text };
}
__name(paymentFailedDay3, "paymentFailedDay3");
function paymentFailedDay7(customerEmail, updateUrl) {
  const subject = "Last chance \u2014 your subscription cancels tomorrow";
  const preheader = "Update your payment today to keep your account active.";
  const body = `
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      Hey there,
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      This is our final notice \u2014 <strong>your subscription is scheduled to cancel tomorrow</strong> due to an unpaid balance.
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:${TEXT_COLOR};line-height:1.7;">
      If you'd like to keep your account and everything in it, please update your payment method <strong>today</strong>.
    </p>

    <!-- Urgency box -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
      <tr>
        <td style="background-color:#FFF4EE;border-left:4px solid ${BRAND_COLOR};border-radius:4px;padding:16px 20px;">
          <p style="margin:0;font-size:15px;color:${TEXT_COLOR};line-height:1.6;">
            <strong>Act today</strong> \u2014 once your subscription is cancelled, you'll lose access to your account and all its data.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:14px;color:#888888;line-height:1.7;">
      If you've already updated your payment or no longer wish to continue, you can ignore this email. We hope to keep you with us!
    </p>
  `;
  const html = baseTemplate({
    preheader,
    title: "Your subscription cancels tomorrow",
    body,
    ctaText: "Save My Account Now",
    ctaUrl: updateUrl
  });
  const text = `Last chance \u2014 your subscription cancels tomorrow

Hey there,

This is our final notice \u2014 your subscription is scheduled to cancel tomorrow due to an unpaid balance.

If you'd like to keep your account and everything in it, please update your payment method TODAY:
${updateUrl}

Once cancelled, you'll lose access to your account and all its data.

If you've already updated your payment or no longer wish to continue, you can ignore this email.

\u2014 ChurnRecovery`;
  return { subject, html, text };
}
__name(paymentFailedDay7, "paymentFailedDay7");

// api/_dunning-scheduler.js
async function processDunningSequences(env) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const portalBaseUrl = env.STRIPE_PORTAL_URL || "https://billing.stripe.com/p/login/test";
  const pending = await env.DB.prepare(`
    SELECT * FROM dunning_sequences
    WHERE status = 'active'
      AND next_email_at IS NOT NULL
      AND next_email_at <= ?
      AND customer_email IS NOT NULL
    LIMIT 50
  `).bind(now).all();
  const results = { processed: 0, errors: 0, skipped: 0 };
  for (const seq of pending.results || []) {
    try {
      const nextDay = seq.last_email_day === 0 ? 3 : seq.last_email_day === 3 ? 7 : null;
      if (nextDay === null) {
        await env.DB.prepare(`
          UPDATE dunning_sequences SET status = 'completed', next_email_at = NULL WHERE id = ?
        `).bind(seq.id).run();
        results.skipped++;
        continue;
      }
      let emailTemplate;
      if (nextDay === 3) {
        emailTemplate = paymentFailedDay3(seq.customer_email, portalBaseUrl);
      } else if (nextDay === 7) {
        emailTemplate = paymentFailedDay7(seq.customer_email, portalBaseUrl);
      }
      const { subject, html, text } = emailTemplate;
      const emailResult = await sendEmail({ to: seq.customer_email, subject, html, text }, env);
      if (emailResult.success) {
        let nextEmailAt = null;
        let newStatus = "active";
        if (nextDay === 3) {
          nextEmailAt = new Date(Date.now() + 4 * 24 * 60 * 60 * 1e3).toISOString();
        } else if (nextDay === 7) {
          newStatus = "completed";
        }
        await env.DB.prepare(`
          UPDATE dunning_sequences
          SET last_email_day = ?, next_email_at = ?, status = ?
          WHERE id = ?
        `).bind(nextDay, nextEmailAt, newStatus, seq.id).run();
        console.log(`[Dunning] Day ${nextDay} email sent to ${seq.customer_email} (seq: ${seq.id})`);
        results.processed++;
      } else {
        console.error(`[Dunning] Failed to send Day ${nextDay} email for seq ${seq.id}:`, emailResult.error);
        results.errors++;
      }
    } catch (err) {
      console.error("[Dunning] Error processing sequence:", seq.id, err.message);
      results.errors++;
    }
  }
  console.log("[Dunning] Batch complete:", results);
  return results;
}
__name(processDunningSequences, "processDunningSequences");
async function onRequestPost(context) {
  const { request, env } = context;
  const secret = env.DUNNING_SCHEDULER_SECRET;
  if (secret) {
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (token !== secret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
  } else {
    console.warn("[Dunning] No DUNNING_SCHEDULER_SECRET set \u2014 endpoint is unprotected!");
  }
  const results = await processDunningSequences(env);
  return new Response(JSON.stringify({ ok: true, ...results }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
__name(onRequestPost, "onRequestPost");

// api/analytics.js
async function onRequestOptions2(context) {
  return handleCors(context.request);
}
__name(onRequestOptions2, "onRequestOptions");
async function onRequestGet2(context) {
  const { request, env } = context;
  const userId = await getUserId(request, env);
  if (!userId) return jsonResponse({ error: "Unauthorized" }, 401, request);
  const url = new URL(request.url);
  const projectId = url.searchParams.get("projectId");
  const days = Math.min(Math.max(parseInt(url.searchParams.get("days") || "30") || 30, 1), 365);
  if (!projectId) return jsonResponse({ error: "projectId required" }, 400, request);
  const project = await env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId).first();
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: "Forbidden" }, 403, request);
  }
  const daysStr = `-${days} days`;
  const totalEvents = await env.DB.prepare(
    "SELECT COUNT(*) as count FROM cancel_events WHERE project_id = ? AND created_at >= datetime('now', ?)"
  ).bind(projectId, daysStr).first();
  const { results: outcomeBreakdown } = await env.DB.prepare(
    "SELECT outcome, COUNT(*) as count FROM cancel_events WHERE project_id = ? AND created_at >= datetime('now', ?) GROUP BY outcome"
  ).bind(projectId, daysStr).all();
  const { results: reasonBreakdown } = await env.DB.prepare(
    "SELECT reason, COUNT(*) as count FROM cancel_events WHERE project_id = ? AND reason IS NOT NULL AND created_at >= datetime('now', ?) GROUP BY reason ORDER BY count DESC"
  ).bind(projectId, daysStr).all();
  const savedEvents = outcomeBreakdown.find((r) => r.outcome === "saved")?.count || 0;
  const cancelledEvents = outcomeBreakdown.find((r) => r.outcome === "cancelled")?.count || 0;
  const flowStarts = outcomeBreakdown.find((r) => r.outcome === "flow_started")?.count || 0;
  const total = totalEvents?.count || 0;
  const saveRate = flowStarts > 0 ? Math.round(savedEvents / flowStarts * 100) : 0;
  const revenueSaved = await env.DB.prepare(
    "SELECT COALESCE(SUM(mrr_cents), 0) as total FROM cancel_events WHERE project_id = ? AND outcome = 'saved' AND mrr_cents IS NOT NULL AND created_at >= datetime('now', ?)"
  ).bind(projectId, daysStr).first();
  const { results: dailyEvents } = await env.DB.prepare(
    "SELECT date(created_at) as date, COUNT(*) as count FROM cancel_events WHERE project_id = ? AND created_at >= datetime('now', ?) GROUP BY date(created_at) ORDER BY date"
  ).bind(projectId, daysStr).all();
  return jsonResponse({
    totalEvents: total,
    savedEvents,
    cancelledEvents,
    flowStarts,
    saveRate,
    revenueSavedCents: revenueSaved?.total || 0,
    outcomeBreakdown,
    reasonBreakdown,
    dailyEvents
  }, 200, request);
}
__name(onRequestGet2, "onRequestGet");

// api/cancel-flow.js
async function onRequestOptions3(context) {
  return handleCors(context.request, { allowAnyOrigin: true });
}
__name(onRequestOptions3, "onRequestOptions");
async function onRequestGet3(context) {
  const { request, env } = context;
  const rl = rateLimit(request, { maxRequests: 60, windowMs: 6e4 });
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request);
  const url = new URL(request.url);
  let projectId = url.searchParams.get("projectId");
  const apiKey = url.searchParams.get("apiKey");
  if (!projectId && apiKey) {
    const project = await env.DB.prepare("SELECT id FROM projects WHERE api_key = ?").bind(apiKey).first();
    if (!project) return jsonResponse({ error: "Project not found" }, 404, request, { allowAnyOrigin: true });
    projectId = project.id;
  }
  if (!projectId) {
    return jsonResponse({ error: "projectId or apiKey required" }, 400, request, { allowAnyOrigin: true });
  }
  const flow = await env.DB.prepare(
    "SELECT * FROM cancel_flows WHERE project_id = ? AND active = 1 ORDER BY updated_at DESC LIMIT 1"
  ).bind(projectId).first();
  if (!flow) return jsonResponse(defaultFlow, 200, request, { allowAnyOrigin: true });
  try {
    return jsonResponse({ ...flow, config: JSON.parse(flow.config) }, 200, request, { allowAnyOrigin: true });
  } catch {
    return jsonResponse(defaultFlow, 200, request, { allowAnyOrigin: true });
  }
}
__name(onRequestGet3, "onRequestGet");
async function onRequestPost2(context) {
  const { request, env } = context;
  const userId = await getUserId(request, env);
  if (!userId) return jsonResponse({ error: "Unauthorized" }, 401, request);
  const body = await request.json().catch(() => ({}));
  const { projectId, reasons } = body;
  if (!projectId) return jsonResponse({ error: "projectId required" }, 400, request);
  const project = await env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId).first();
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: "Project not found" }, 404, request);
  }
  let sanitizedReasons = defaultFlow.reasons;
  if (Array.isArray(reasons) && reasons.length <= 20) {
    sanitizedReasons = reasons.map((r) => ({
      id: sanitizeString(r.id, 50) || "unknown",
      label: sanitizeString(r.label, 200) || "Unknown",
      icon: sanitizeString(r.icon, 10) || "\u2753",
      offerType: ["discount", "pause", "human", "feedback"].includes(r.offerType) ? r.offerType : "feedback",
      offerValue: typeof r.offerValue === "number" ? Math.min(Math.max(r.offerValue, 0), 100) : null,
      offerDuration: typeof r.offerDuration === "number" ? Math.min(Math.max(r.offerDuration, 0), 24) : null
    }));
  }
  const config = {
    reasons: sanitizedReasons,
    active: true,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const configStr = JSON.stringify(config);
  const existing = await env.DB.prepare("SELECT id FROM cancel_flows WHERE project_id = ?").bind(projectId).first();
  if (existing) {
    await env.DB.prepare(
      "UPDATE cancel_flows SET config = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(configStr, existing.id).run();
  } else {
    const id = generateId("cf");
    await env.DB.prepare(
      "INSERT INTO cancel_flows (id, project_id, config) VALUES (?, ?, ?)"
    ).bind(id, projectId, configStr).run();
  }
  const saved = await env.DB.prepare(
    "SELECT * FROM cancel_flows WHERE project_id = ? AND active = 1 ORDER BY updated_at DESC LIMIT 1"
  ).bind(projectId).first();
  let parsedFlow = saved;
  if (saved) {
    try {
      parsedFlow = { ...saved, config: JSON.parse(saved.config) };
    } catch {
    }
  }
  return jsonResponse({ saved: true, flow: parsedFlow }, 200, request);
}
__name(onRequestPost2, "onRequestPost");

// api/events.js
async function onRequestOptions4(context) {
  return handleCors(context.request, { allowAnyOrigin: true });
}
__name(onRequestOptions4, "onRequestOptions");
async function onRequestPost3(context) {
  const { request, env } = context;
  const rl = rateLimit(request, { maxRequests: 30, windowMs: 6e4 });
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request);
  try {
    const body = await request.json().catch(() => ({}));
    const apiKey = request.headers.get("X-API-Key") || body.apiKey;
    const {
      projectId: bodyProjectId,
      sessionId,
      customerId,
      reason,
      offerShown,
      outcome,
      feedback,
      mrrCents
    } = body;
    let resolvedProjectId = bodyProjectId;
    if (!resolvedProjectId && apiKey) {
      const project = await env.DB.prepare("SELECT id FROM projects WHERE api_key = ?").bind(apiKey).first();
      if (!project) return jsonResponse({ error: "Invalid API key" }, 403, request, { allowAnyOrigin: true });
      resolvedProjectId = project.id;
    }
    if (!resolvedProjectId) {
      return jsonResponse({ error: "projectId or API key required" }, 400, request, { allowAnyOrigin: true });
    }
    const validOutcomes = ["flow_started", "reason_selected", "saved", "cancelled", "paused", "downgraded", "feedback_submitted"];
    const sanitizedOutcome = validOutcomes.includes(outcome) ? outcome : null;
    const result = await env.DB.prepare(`
      INSERT INTO cancel_events (project_id, session_id, customer_id, reason, offer_shown, outcome, feedback, mrr_cents)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      sanitizeString(resolvedProjectId, 50),
      sanitizeString(sessionId, 50) || null,
      sanitizeString(customerId, 255) || null,
      sanitizeString(reason, 100) || null,
      sanitizeString(offerShown, 50) || null,
      sanitizedOutcome,
      sanitizeString(feedback, 2e3) || null,
      mrrCents ? parseInt(mrrCents) || null : null
    ).run();
    return jsonResponse({ id: result.meta?.last_row_id, recorded: true }, 201, request, { allowAnyOrigin: true });
  } catch (e) {
    console.error("[events] POST error:", e);
    return jsonResponse({ error: "Failed to record event. Please try again." }, 500, request, { allowAnyOrigin: true });
  }
}
__name(onRequestPost3, "onRequestPost");
async function onRequestGet4(context) {
  const { request, env } = context;
  const userId = await getUserId(request, env);
  if (!userId) return jsonResponse({ error: "Unauthorized" }, 401, request);
  const url = new URL(request.url);
  const projectId = url.searchParams.get("projectId");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50") || 50, 200);
  const offset = Math.max(parseInt(url.searchParams.get("offset") || "0") || 0, 0);
  if (!projectId) return jsonResponse({ error: "projectId required" }, 400, request);
  const project = await env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId).first();
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: "Forbidden" }, 403, request);
  }
  const { results } = await env.DB.prepare(`
    SELECT * FROM cancel_events WHERE project_id = ?
    ORDER BY created_at DESC LIMIT ? OFFSET ?
  `).bind(projectId, limit, offset).all();
  return jsonResponse({ events: results }, 200, request);
}
__name(onRequestGet4, "onRequestGet");

// api/health.js
async function onRequestGet5(context) {
  return new Response(JSON.stringify({ status: "ok", timestamp: Date.now() }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
__name(onRequestGet5, "onRequestGet");

// api/projects.js
async function onRequestOptions5(context) {
  return handleCors(context.request);
}
__name(onRequestOptions5, "onRequestOptions");
async function onRequestGet6(context) {
  const { request, env } = context;
  const userId = await getUserId(request, env);
  if (!userId) return jsonResponse({ error: "Unauthorized" }, 401, request);
  const { results } = await env.DB.prepare(
    "SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC"
  ).bind(userId).all();
  return jsonResponse({ projects: results.map(sanitizeProject) }, 200, request);
}
__name(onRequestGet6, "onRequestGet");
async function onRequestPost4(context) {
  const { request, env } = context;
  const userId = await getUserId(request, env);
  if (!userId) return jsonResponse({ error: "Unauthorized" }, 401, request);
  const rl = rateLimit(request, { maxRequests: 5, windowMs: 6e4 });
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request);
  const body = await request.json().catch(() => ({}));
  const id = generateId("proj");
  const apiKey = generateApiKey();
  const name = sanitizeString(body.name, 100) || "My Project";
  await env.DB.prepare(
    "INSERT INTO projects (id, user_id, name, api_key) VALUES (?, ?, ?, ?)"
  ).bind(id, userId, name, apiKey).run();
  const project = await env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(id).first();
  return jsonResponse(sanitizeProject({ ...project, api_key: apiKey }), 201, request);
}
__name(onRequestPost4, "onRequestPost");
async function onRequestPut(context) {
  const { request, env } = context;
  const userId = await getUserId(request, env);
  if (!userId) return jsonResponse({ error: "Unauthorized" }, 401, request);
  const body = await request.json().catch(() => ({}));
  const { projectId } = body;
  const project = await env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId || "").first();
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: "Project not found" }, 404, request);
  }
  const fields = [];
  const values = [];
  if (body.name !== void 0) {
    fields.push("name = ?");
    values.push(sanitizeString(body.name, 100) || project.name);
  }
  if (body.stripe_secret_key !== void 0) {
    const key = body.stripe_secret_key;
    if (key && !key.match(/^(sk_test_|sk_live_|rk_test_|rk_live_)/)) {
      return jsonResponse({ error: "Invalid Stripe key format" }, 400, request);
    }
    fields.push("stripe_secret_key = ?");
    values.push(sanitizeString(key, 255) || null);
  }
  if (body.stripe_webhook_secret !== void 0) {
    const secret = body.stripe_webhook_secret;
    if (secret && !secret.startsWith("whsec_")) {
      return jsonResponse({ error: "Invalid webhook secret format" }, 400, request);
    }
    fields.push("stripe_webhook_secret = ?");
    values.push(sanitizeString(secret, 255) || null);
  }
  if (body.webhook_url !== void 0) {
    const url = body.webhook_url;
    if (url && !url.match(/^https:\/\//)) {
      return jsonResponse({ error: "Webhook URL must use HTTPS" }, 400, request);
    }
    fields.push("webhook_url = ?");
    values.push(sanitizeString(url, 500) || null);
  }
  if (fields.length > 0) {
    fields.push("updated_at = datetime('now')");
    values.push(projectId);
    await env.DB.prepare(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`).bind(...values).run();
  }
  const updated = await env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId).first();
  return jsonResponse(sanitizeProject(updated), 200, request);
}
__name(onRequestPut, "onRequestPut");
async function onRequestDelete(context) {
  const { request, env } = context;
  const userId = await getUserId(request, env);
  if (!userId) return jsonResponse({ error: "Unauthorized" }, 401, request);
  const body = await request.json().catch(() => ({}));
  const { projectId } = body;
  const project = await env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId || "").first();
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: "Project not found" }, 404, request);
  }
  await env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(projectId).run();
  return jsonResponse({ deleted: true }, 200, request);
}
__name(onRequestDelete, "onRequestDelete");

// api/stripe-webhook.js
async function verifyStripeSignature(rawBody, sigHeader, secret) {
  if (!sigHeader || !secret) return false;
  const elements = sigHeader.split(",").reduce((acc, part) => {
    const [key2, value] = part.split("=");
    acc[key2] = value;
    return acc;
  }, {});
  const timestamp = elements.t;
  const signature = elements.v1;
  if (!timestamp || !signature) return false;
  const tolerance = 300;
  const now = Math.floor(Date.now() / 1e3);
  if (Math.abs(now - parseInt(timestamp)) > tolerance) return false;
  const signedPayload = `${timestamp}.${rawBody}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  if (expectedSignature.length !== signature.length) return false;
  let result = 0;
  for (let i = 0; i < expectedSignature.length; i++) {
    result |= expectedSignature.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return result === 0;
}
__name(verifyStripeSignature, "verifyStripeSignature");
async function onRequestPost5(context) {
  const { request, env } = context;
  const rl = rateLimit(request, { maxRequests: 100, windowMs: 6e4 });
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request);
  try {
    const rawBody = await request.text();
    const sigHeader = request.headers.get("stripe-signature");
    const globalWebhookSecret = env.STRIPE_WEBHOOK_SECRET;
    if (globalWebhookSecret) {
      const isValid = await verifyStripeSignature(rawBody, sigHeader, globalWebhookSecret);
      if (!isValid) {
        console.error("[Stripe] Invalid webhook signature");
        return jsonResponse({ error: "Invalid signature" }, 401);
      }
    } else if (!sigHeader) {
      console.warn("[Stripe] No webhook secret configured \u2014 accepting unverified webhook");
    }
    const event = JSON.parse(rawBody);
    if (!event || !event.type || !event.data || !event.data.object) {
      return jsonResponse({ error: "Invalid event structure" }, 400);
    }
    switch (event.type) {
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("[Stripe] Subscription deleted:", subscription.id);
        if (subscription.metadata?.churnrecovery_project_id) {
          const projectId = subscription.metadata.churnrecovery_project_id;
          const project = await env.DB.prepare("SELECT id FROM projects WHERE id = ?").bind(projectId).first();
          if (project) {
            await env.DB.prepare(`
              INSERT INTO cancel_events (project_id, customer_id, outcome, reason)
              VALUES (?, ?, 'cancelled', 'stripe_churn')
            `).bind(projectId, subscription.customer || "unknown").run();
          }
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log("[Stripe] Payment failed:", invoice.id, "Amount:", invoice.amount_due);
        if (invoice.metadata?.churnrecovery_project_id) {
          const projectId = invoice.metadata.churnrecovery_project_id;
          const project = await env.DB.prepare("SELECT id FROM projects WHERE id = ?").bind(projectId).first();
          if (project) {
            await env.DB.prepare(`
              INSERT INTO failed_payments (project_id, customer_id, stripe_invoice_id, amount_cents)
              VALUES (?, ?, ?, ?)
            `).bind(
              projectId,
              invoice.customer || "unknown",
              invoice.id,
              typeof invoice.amount_due === "number" ? invoice.amount_due : 0
            ).run();
            const customerId = invoice.customer || "unknown";
            const customerEmail = invoice.customer_email || null;
            if (customerEmail) {
              const portalBaseUrl = env.STRIPE_PORTAL_URL || "https://billing.stripe.com/p/login/test";
              const updateUrl = portalBaseUrl;
              const { subject, html, text } = paymentFailedDay0(customerEmail, updateUrl);
              const emailResult = await sendEmail({ to: customerEmail, subject, html, text }, env);
              console.log("[Stripe] Day 0 dunning email sent:", emailResult);
              const sequenceId = crypto.randomUUID();
              const nowIso = (/* @__PURE__ */ new Date()).toISOString();
              const day3Date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1e3).toISOString();
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
              ).run();
              console.log("[Stripe] Dunning sequence started:", sequenceId);
            } else {
              console.warn("[Stripe] No customer email on invoice \u2014 skipping dunning emails for:", invoice.id);
              const sequenceId = crypto.randomUUID();
              const nowIso = (/* @__PURE__ */ new Date()).toISOString();
              await env.DB.prepare(`
                INSERT INTO dunning_sequences
                  (id, customer_id, customer_email, project_id, started_at, last_email_day, next_email_at, status, stripe_invoice_id)
                VALUES (?, ?, NULL, ?, ?, 0, NULL, 'active', ?)
              `).bind(sequenceId, customerId, projectId, nowIso, invoice.id).run();
            }
          }
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        if (invoice.billing_reason === "subscription_cycle") {
          console.log("[Stripe] Payment recovered:", invoice.id);
          await env.DB.prepare(`
            UPDATE failed_payments SET recovery_status = 'recovered', updated_at = datetime('now')
            WHERE stripe_invoice_id = ? AND recovery_status = 'pending'
          `).bind(invoice.id).run();
          await env.DB.prepare(`
            UPDATE dunning_sequences SET status = 'recovered'
            WHERE stripe_invoice_id = ? AND status = 'active'
          `).bind(invoice.id).run();
          console.log("[Stripe] Dunning sequence marked recovered for invoice:", invoice.id);
        }
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const previousAttributes = event.data.previous_attributes;
        if (previousAttributes?.cancel_at_period_end === false && subscription.cancel_at_period_end === true) {
          console.log("[Stripe] Subscription marked for cancellation:", subscription.id);
        }
        if (subscription.pause_collection && subscription.metadata?.churnrecovery_project_id) {
          const projectId = subscription.metadata.churnrecovery_project_id;
          const project = await env.DB.prepare("SELECT id FROM projects WHERE id = ?").bind(projectId).first();
          if (project) {
            await env.DB.prepare(`
              INSERT INTO cancel_events (project_id, customer_id, outcome)
              VALUES (?, ?, 'paused')
            `).bind(projectId, subscription.customer || "unknown").run();
          }
        }
        break;
      }
      default:
        console.log("[Stripe] Unhandled event type:", event.type);
    }
    return jsonResponse({ received: true });
  } catch (err) {
    console.error("[Stripe] Webhook error:", err.message);
    return jsonResponse({ error: "Webhook processing error" }, 400);
  }
}
__name(onRequestPost5, "onRequestPost");

// api/waitlist/index.js
var SOURCE_TAG_MAP = {
  "product-hunt": "product-hunt-waitlist",
  "producthunt": "product-hunt-waitlist",
  "reddit": "reddit-waitlist",
  "alternativeto": "alternativeto-waitlist",
  "betalist": "betalist-waitlist",
  "organic": "organic-waitlist",
  // /for/ landing page sources → mapped to most relevant tag
  "convertkit-lp": "organic-waitlist",
  "substack-lp": "organic-waitlist",
  "kajabi-lp": "organic-waitlist",
  "teachable-lp": "organic-waitlist",
  "ghost-lp": "organic-waitlist",
  "podia-lp": "organic-waitlist",
  "thinkific-lp": "organic-waitlist",
  "circle-lp": "organic-waitlist",
  "patreon-lp": "organic-waitlist",
  "beehiiv-lp": "organic-waitlist"
};
async function subscribeToConvertKit(email, source, env, referralCode = null) {
  const apiKey = env.CONVERTKIT_API_KEY;
  const formId = env.CONVERTKIT_FORM_ID;
  if (!apiKey || !formId) {
    return;
  }
  const tagName = SOURCE_TAG_MAP[source] || "organic-waitlist";
  const tags = [tagName];
  if (referralCode) {
    tags.push(`referred-by-${referralCode.toLowerCase().replace(/[^a-z0-9-]/g, "-")}`);
  }
  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email,
        tags,
        // Pass referral_code as a ConvertKit custom field
        ...referralCode ? { fields: { referral_code: referralCode } } : {}
      })
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`ConvertKit API error ${res.status}: ${body}`);
    }
  } catch (err) {
    console.error("ConvertKit subscribe failed (non-fatal):", err?.message || err);
  }
}
__name(subscribeToConvertKit, "subscribeToConvertKit");
async function onRequestOptions6(context) {
  return handleCors(context.request, { allowAnyOrigin: true });
}
__name(onRequestOptions6, "onRequestOptions");
async function onRequestPost6(context) {
  const { request, env } = context;
  const rl = rateLimit(request, { maxRequests: 3, windowMs: 36e5 });
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request);
  try {
    const body = await request.json();
    const email = sanitizeString(body.email || "", 254)?.trim().toLowerCase();
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return jsonResponse({ error: "Invalid email address" }, 400, request, { allowAnyOrigin: true });
    }
    const source = sanitizeString(body.source, 50) || "website";
    const referralCode = sanitizeString(body.referral_code, 100) || null;
    let duplicate = false;
    try {
      if (referralCode) {
        try {
          await env.DB.prepare("INSERT INTO waitlist (email, source, referral_code) VALUES (?, ?, ?)").bind(email, source, referralCode).run();
        } catch (colErr) {
          if (colErr.message && (colErr.message.includes("no column") || colErr.message.includes("table waitlist has no column"))) {
            await env.DB.prepare("INSERT INTO waitlist (email, source) VALUES (?, ?)").bind(email, `${source}|ref:${referralCode}`).run();
          } else {
            throw colErr;
          }
        }
      } else {
        await env.DB.prepare("INSERT INTO waitlist (email, source) VALUES (?, ?)").bind(email, source).run();
      }
    } catch (e) {
      if (e.message && e.message.includes("UNIQUE")) {
        duplicate = true;
      } else {
        throw e;
      }
    }
    if (duplicate) {
      return jsonResponse({ message: "Already on the waitlist!", duplicate: true }, 200, request, { allowAnyOrigin: true });
    }
    await subscribeToConvertKit(email, source, env, referralCode);
    const countResult = await env.DB.prepare("SELECT COUNT(*) as count FROM waitlist").first();
    return jsonResponse({ message: "You're on the list!", count: countResult?.count || 0 }, 201, request, { allowAnyOrigin: true });
  } catch (e) {
    console.error("Waitlist error:", e);
    return jsonResponse({ error: "Something went wrong. Please try again." }, 500, request, { allowAnyOrigin: true });
  }
}
__name(onRequestPost6, "onRequestPost");

// ../.wrangler/tmp/pages-pKcdeM/functionsRoutes-0.24037968388931574.mjs
var routes = [
  {
    routePath: "/api/waitlist/count",
    mountPath: "/api/waitlist",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/waitlist/count",
    mountPath: "/api/waitlist",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions]
  },
  {
    routePath: "/api/_dunning-scheduler",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/analytics",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/analytics",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions2]
  },
  {
    routePath: "/api/cancel-flow",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet3]
  },
  {
    routePath: "/api/cancel-flow",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions3]
  },
  {
    routePath: "/api/cancel-flow",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/events",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet4]
  },
  {
    routePath: "/api/events",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions4]
  },
  {
    routePath: "/api/events",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/health",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet5]
  },
  {
    routePath: "/api/projects",
    mountPath: "/api",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete]
  },
  {
    routePath: "/api/projects",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet6]
  },
  {
    routePath: "/api/projects",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions5]
  },
  {
    routePath: "/api/projects",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/projects",
    mountPath: "/api",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut]
  },
  {
    routePath: "/api/stripe-webhook",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost5]
  },
  {
    routePath: "/api/waitlist",
    mountPath: "/api/waitlist",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions6]
  },
  {
    routePath: "/api/waitlist",
    mountPath: "/api/waitlist",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost6]
  }
];

// ../../../../.npm/_npx/32026684e21afda6/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
