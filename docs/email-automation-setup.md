# Email Automation Setup Guide — ConvertKit & Mailchimp

Complete step-by-step guide to automating the ChurnRecovery 5-email waitlist drip sequence with source-based segmentation.

---

## Overview

**Goal:** When someone signs up for the ChurnRecovery waitlist (via Product Hunt, Reddit, AlternativeTo, BetaList, or organic search), they should automatically:
1. Get tagged with their traffic source
2. Receive the 5-email drip sequence (from `docs/waitlist-email-drip.md`)
3. Be segmented so you can analyze which sources convert best

**Traffic source tags you'll create:**
- `product-hunt-waitlist`
- `reddit-waitlist`
- `alternativeto-waitlist`
- `betalist-waitlist`
- `organic-waitlist`

---

## Part 1: ConvertKit Setup (Recommended)

ConvertKit is the recommended ESP for ChurnRecovery. It's designed for creators and has the best tagging/segmentation system for this use case.

### Step 1: Create Your Tags

**Where to click:** ConvertKit dashboard → **Subscribers** (left sidebar) → **Tags** tab → **+ New Tag** button (top right)

Create these 5 tags one by one:
- `product-hunt-waitlist`
- `reddit-waitlist`
- `alternativeto-waitlist`
- `betalist-waitlist`
- `organic-waitlist`

> **Screenshot description:** You'll see a list of all existing tags. Click the orange "+ New Tag" button in the top-right corner. A text field appears inline — type the tag name and press Enter.

---

### Step 2: Create the Email Sequence

**Where to click:** ConvertKit dashboard → **Sequences** (left sidebar) → **New Sequence** button

**Sequence name:** `ChurnRecovery Waitlist Drip`

Click **New Sequence** → Name it → Click **Create Sequence**

You'll see an email editor with a default first email. Set up each email:

#### Email 1 (Immediate — delay: 0 days)

**Subject line:** `You're on the list — here's what ChurnRecovery actually does`
*(Use the A variant; you can A/B test by setting Subject B: `Welcome to ChurnRecovery (the honest version)`)*

**Preview text:** `No sales pitch. Just what this is and why I built it.`

**Body:** Copy the full text from `docs/waitlist-email-drip.md` → Email 1 section.

**Settings:**
- Click the gear icon on the email card → **Send after:** `0` days
- **From name:** `Dawood` *(personal name gets higher open rates)*
- **Reply-to:** your actual email address

> **Screenshot description:** Each email appears as a card in the sequence editor. At the top of each card you'll see fields for Subject and Preview Text. Below that is a plain-text editor area. On the right side of each card is a delay setting — set "Send after joining the sequence" to the appropriate number of days.

#### Email 2 (Day 2)
- **Delay:** 2 days after Email 1
- **Subject:** `What churn is actually costing you (the math is bad)`
- **Preview text:** `One canceled subscriber doesn't sound like much. Until you run the numbers.`
- **Body:** Copy from `docs/waitlist-email-drip.md` → Email 2 section

#### Email 3 (Day 5)
- **Delay:** 3 days after Email 2 (total: day 5 from signup)
- **Subject:** `How our cancel flows work (no tech jargon, I promise)`
- **Preview text:** `Here's the 60-second version of how this actually works.`
- **Body:** Copy from `docs/waitlist-email-drip.md` → Email 3 section

#### Email 4 (Day 10)
- **Delay:** 5 days after Email 3 (total: day 10 from signup)
- **Subject:** `How a newsletter creator would actually use ChurnRecovery`
- **Preview text:** `She almost shut down her paid newsletter. Here's what changed.`
- **Body:** Copy from `docs/waitlist-email-drip.md` → Email 4 section

#### Email 5 (Day 14)
- **Delay:** 4 days after Email 4 (total: day 14 from signup)
- **Subject:** `You're getting early access before everyone else`
- **Preview text:** `The waitlist is going live. Here's your link.`
- **Body:** Copy from `docs/waitlist-email-drip.md` → Email 5 section

**Important Email Settings for ALL emails:**
- Format: **Plain text** (not HTML) — the founder voice depends on it
- Unsubscribe footer: On (required by law)
- Click the **Publish** toggle on each email card when ready

> **Screenshot description:** After editing each email, you'll see a grey "Draft" badge. Click the toggle next to it to set the email to "Published." All 5 emails must be Published for the sequence to send.

---

### Step 3: Create Automations (One Per Traffic Source)

You'll create 5 automations — one for each traffic source tag. Each automation does the same thing: when a subscriber gets a specific tag → enroll them in the sequence.

**Where to click:** ConvertKit dashboard → **Automations** (left sidebar) → **New Automation** button

#### Automation 1: Product Hunt → Sequence

1. Click **New Automation**
2. Click **+ Add trigger** → Choose **Tag is added** → Select `product-hunt-waitlist`
3. Click the **+** button after the trigger → Choose **Add action** → **Subscribe to a sequence** → Select `ChurnRecovery Waitlist Drip`
4. Name the automation: `Product Hunt Waitlist → Drip`
5. Toggle automation to **Active**

> **Screenshot description:** The automation builder is a visual flowchart. Triggers appear on the left (blue boxes), actions on the right (orange boxes). Click the "+" icon between steps to add conditions or actions. The automation name field is at the top of the page.

Repeat this for all 5 tags:

| Automation Name | Trigger Tag | Action |
|---|---|---|
| `Product Hunt Waitlist → Drip` | `product-hunt-waitlist` | Subscribe to sequence |
| `Reddit Waitlist → Drip` | `reddit-waitlist` | Subscribe to sequence |
| `AlternativeTo Waitlist → Drip` | `alternativeto-waitlist` | Subscribe to sequence |
| `BetaList Waitlist → Drip` | `betalist-waitlist` | Subscribe to sequence |
| `Organic Waitlist → Drip` | `organic-waitlist` | Subscribe to sequence |

---

### Step 4: Create a ConvertKit Form (Backup / Direct)

If you want a ConvertKit-hosted form as a fallback:

**Where to click:** ConvertKit dashboard → **Landing Pages & Forms** → **New Form** → Choose **Form** (not landing page)

1. Name: `ChurnRecovery Waitlist`
2. Embed style: **Inline**
3. Fields: Email (required), First Name (optional)
4. After submit: Show success message → "You're on the list! Check your inbox."
5. Connect form to sequence: Form settings → **Incentive** tab → **Add subscribers to a sequence** → Select `ChurnRecovery Waitlist Drip`

> **Note:** For source tracking, use the JavaScript integration method (Part 3 below) rather than the ConvertKit-hosted form. The ConvertKit form doesn't capture UTM parameters natively.

---

### Step 5: Connect to ChurnRecovery Signup API

The waitlist API (`functions/api/waitlist/index.js`) stores signups in the D1 database. To also add subscribers to ConvertKit, you have two options:

#### Option A: Add ConvertKit API call in the waitlist handler (Recommended)

Add this to `functions/api/waitlist/index.js` after the successful D1 insert:

```javascript
// After successful D1 insert (201 response path):
const CONVERTKIT_API_KEY = env.CONVERTKIT_API_KEY;
const CONVERTKIT_FORM_ID = env.CONVERTKIT_FORM_ID; // get from ConvertKit form URL

// Map source to ConvertKit tag name
const sourceTagMap = {
  'product-hunt': 'product-hunt-waitlist',
  'reddit': 'reddit-waitlist',
  'alternativeto': 'alternativeto-waitlist',
  'betalist': 'betalist-waitlist',
  'organic': 'organic-waitlist',
};
const tagName = sourceTagMap[source] || 'organic-waitlist';

// Subscribe to ConvertKit + apply tag
const ckResponse = await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    api_key: CONVERTKIT_API_KEY,
    email: email,
    tags: [tagName], // ConvertKit will look up tag ID by name
    // Or use tag IDs: tags: [12345]
  })
});
```

**Environment variables to add to Cloudflare Workers:**
```
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_FORM_ID=your_form_id_here
```

Find these in ConvertKit: Account Settings → API → API Key (use the "API Key" not "API Secret")

#### Option B: Periodic CSV export + import

If you don't want to modify the API, export subscribers from the D1 database periodically:
1. Cloudflare dashboard → Workers → D1 → Your database → Run query:
   ```sql
   SELECT email, source, created_at FROM waitlist ORDER BY created_at DESC;
   ```
2. Export as CSV
3. ConvertKit → Subscribers → Import Subscribers → Upload CSV
4. During import, map the `source` column to tag (you'll need to import separately by source)

> This is more work. Option A is strongly recommended.

---

## Part 2: Mailchimp Setup (Alternative)

Use Mailchimp if you're already on it or prefer it. The flow is similar but the terminology differs.

### Step 1: Create Your Audience and Tags

**Where to click:** Mailchimp dashboard → **Audience** (top nav) → **Tags** → **Create Tag**

Create the same 5 tags:
- `product-hunt-waitlist`
- `reddit-waitlist`
- `alternativeto-waitlist`
- `betalist-waitlist`
- `organic-waitlist`

### Step 2: Create a Customer Journey (Email Automation)

**Where to click:** Mailchimp dashboard → **Automations** (top nav) → **Customer Journeys** → **Create Journey**

1. Name: `ChurnRecovery Waitlist Drip`
2. Select Audience: your main audience
3. **Starting Point:** Choose **Trigger** → **Contact is tagged** → Select `product-hunt-waitlist`

> **Note:** You'll need to create 5 separate Customer Journeys, one per tag. Mailchimp doesn't have a simple "any of these tags" trigger in Customer Journeys on basic plans.

### Step 3: Build the Journey Steps

Inside the Customer Journey builder:

1. Click **Add a step** → **Send email**
2. Set **When:** Immediately (0 delay)
3. Create email with Email 1 content from `docs/waitlist-email-drip.md`
4. Click **+** → **Add a step** → **Time delay** → 2 days
5. Click **+** → **Add a step** → **Send email** → Email 2 content
6. Repeat for Emails 3 (add 3 more days), 4 (add 5 more days), 5 (add 4 more days)

### Step 4: Classic Automation (Alternative to Customer Journeys)

If on Mailchimp Free plan (Customer Journeys may be limited):

**Where to click:** Automations → **Classic Automations** → **Welcome new subscribers**

1. Name: `ChurnRecovery Welcome Series`
2. Trigger: **Tag added** → select tag
3. Add 5 emails with the delays above
4. Activate automation

### Step 5: Connect Mailchimp to Your API

Replace the ConvertKit API call above with the Mailchimp API:

```javascript
const MAILCHIMP_API_KEY = env.MAILCHIMP_API_KEY; // format: key-us1
const MAILCHIMP_SERVER = env.MAILCHIMP_SERVER; // e.g., "us1"
const MAILCHIMP_LIST_ID = env.MAILCHIMP_LIST_ID;

const sourceTagMap = {
  'product-hunt': 'product-hunt-waitlist',
  'reddit': 'reddit-waitlist',
  'alternativeto': 'alternativeto-waitlist',
  'betalist': 'betalist-waitlist',
  'organic': 'organic-waitlist',
};
const tagName = sourceTagMap[source] || 'organic-waitlist';

// Add subscriber
const mcResponse = await fetch(
  `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
      tags: [tagName],
    })
  }
);
```

---

## Part 3: UTM → Subscriber Tag Integration

This is the key piece: capturing where someone came from and passing it to ConvertKit/Mailchimp as a tag.

### How It Works

```
User clicks link with ?utm_source=betalist
  → lands on churnrecovery.com
  → fills out signup form
  → hidden field captures utm_source value
  → API sends email + source to waitlist DB + ConvertKit
  → ConvertKit tags subscriber with "betalist-waitlist"
  → Automation triggers → subscriber enrolled in drip sequence
```

### Step 1: Read UTM from URL and Store in sessionStorage

Add this script to your homepage (`public/index.html` or `app/page.tsx`):

```javascript
// Capture UTM parameters on page load
(function() {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source') || '';
  const utmMedium = params.get('utm_medium') || '';
  const utmCampaign = params.get('utm_campaign') || '';
  
  if (utmSource) {
    sessionStorage.setItem('utm_source', utmSource);
    sessionStorage.setItem('utm_medium', utmMedium);
    sessionStorage.setItem('utm_campaign', utmCampaign);
  }
})();
```

### Step 2: Read UTM When Form Is Submitted

In your waitlist form submission handler:

```javascript
async function submitWaitlistForm(email) {
  const utmSource = sessionStorage.getItem('utm_source') || 'organic';
  
  // Map utm_source to your source tag categories
  const sourceMap = {
    'product-hunt': 'product-hunt',
    'producthunt': 'product-hunt',
    'betalist': 'betalist',
    'alternativeto': 'alternativeto',
    'reddit': 'reddit',
  };
  
  const source = sourceMap[utmSource.toLowerCase()] || 'organic';
  
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source }),
  });
  
  return response;
}
```

### Step 3: UTM Links for Each Channel

Use these exact links when posting to each platform:

| Channel | Link |
|---|---|
| Product Hunt | `https://churnrecovery.com?utm_source=product-hunt&utm_medium=directory&utm_campaign=launch` |
| Reddit | `https://churnrecovery.com?utm_source=reddit&utm_medium=social&utm_campaign=launch` |
| AlternativeTo | `https://churnrecovery.com?utm_source=alternativeto&utm_medium=directory&utm_campaign=launch` |
| BetaList | `https://churnrecovery.com?utm_source=betalist&utm_medium=directory&utm_campaign=early-access` |
| Organic / Direct | *(no UTM — defaults to `organic`)*  |

---

## Part 4: Verify Your Setup

Before going live, test the full flow:

### ConvertKit Test Checklist

- [ ] Sign up with a test email via: `https://churnrecovery.com?utm_source=betalist&utm_medium=directory&utm_campaign=early-access`
- [ ] Confirm the email appears in ConvertKit → Subscribers
- [ ] Confirm the subscriber has the `betalist-waitlist` tag applied
- [ ] Confirm the subscriber is enrolled in `ChurnRecovery Waitlist Drip` sequence
- [ ] Check your inbox — Email 1 should arrive within 5 minutes
- [ ] Wait 2 days (or manually advance the sequence in ConvertKit) → Email 2 arrives
- [ ] Check analytics: ConvertKit → Sequences → ChurnRecovery Waitlist Drip → view open rates

### Monitoring Open Rates (Benchmarks)

For a plain-text founder email to a warm audience:
- Email 1 open rate: **40-60%** is healthy
- Email 2: 30-45%
- Email 3-5: 25-40%

If you're below 25% on Email 1, check:
- Is the from name "Dawood" (not "ChurnRecovery")?
- Is the subject line not in spam triggers?
- Are emails sending as plain text?

---

## Quick Reference: ConvertKit Navigation

| Task | Path |
|---|---|
| Create tag | Subscribers → Tags → + New Tag |
| Create sequence | Sequences → New Sequence |
| Create automation | Automations → New Automation |
| View subscriber | Subscribers → search by email |
| Check sequence stats | Sequences → [sequence name] → click email card |
| Get API key | Account (top right) → Settings → API |
| Get form ID | Landing Pages & Forms → [form] → URL contains the ID |

---

## Troubleshooting

**Subscribers aren't getting tagged:**
- Check that the API call to ConvertKit is returning 200/201
- Verify tag names match exactly (case-sensitive)
- Check `CONVERTKIT_API_KEY` env var is set in Cloudflare Workers

**Automation isn't triggering:**
- Confirm automation status is "Active" (not Draft)
- Confirm trigger tag name matches exactly
- ConvertKit automations can have a 1-5 minute delay — wait before troubleshooting

**Emails going to spam:**
- Add your sending domain to ConvertKit: Settings → Email → Custom Domain
- Verify SPF/DKIM records (ConvertKit provides these)
- Send from `dawood@churnrecovery.com` not a free Gmail

**Duplicate enrollments:**
- ConvertKit prevents enrolling the same subscriber in a sequence twice by default
- If someone signs up from two sources, only the first tag triggers enrollment
- This is fine — they still get the emails
