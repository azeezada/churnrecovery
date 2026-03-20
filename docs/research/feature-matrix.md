# Churn Recovery SaaS — Comprehensive Feature Matrix

> **Research date:** March 2026  
> **Competitors benchmarked:** Churnkey, Chargebee Retain, Churn Buster, Stunning, ProfitWell Retain, Raaft, ProsperStack, ChurnZero, Baremetrics, Intercom, Butter Payments

---

## How to Read This Matrix

| Column | Meaning |
|--------|---------|
| **Competitors** | Which products offer this (✓ = yes, ~ = partial) |
| **Build Difficulty** | Low / Med / High |
| **Priority** | MVP / V2 / V3 |
| **Revenue Impact** | $ / $$ / $$$ (relative direct impact on recovered MRR) |

---

## 1. Cancel Flow Features

> Voluntary churn represents ~60-80% of total churn. Cancel flows intercept customers at the point of cancellation and offer alternatives. Best-in-class platforms reduce voluntary churn by 30–58%.

### 1.1 Core Cancel Flow Engine

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Embeddable cancel widget** | JavaScript snippet or iFrame that intercepts the cancel action inside the customer's app | Churnkey ✓, Chargebee Retain ✓, ProsperStack ✓, Raaft ✓ | Med | **MVP** | $$$ |
| **Hosted cancel page** | Standalone URL for companies without a self-serve portal | Churnkey ✓, Chargebee Retain ✓ | Low | **MVP** | $$ |
| **No-code flow builder** | Drag-and-drop or visual editor — no engineering needed to create/edit flows | Churnkey ✓, Chargebee Retain ✓, Churn Buster ✓ | High | **MVP** | $$ |
| **Multi-step flow** | Multiple screens (reason survey → offer → confirmation) | Churnkey ✓, Chargebee Retain ✓ | Med | **MVP** | $$$ |
| **Brand customization** | Custom colors, logo, fonts, domain, CSS override | Churnkey ✓, Chargebee Retain ✓ | Low | **MVP** | $ |
| **Multi-language support** | Full page translations for global customers | Churnkey ✓, Chargebee Retain ✓ | Med | V2 | $$ |
| **FTC Click-to-Cancel compliance** | Ensures cancellation is always achievable (legally required in USA) | Chargebee Retain ✓, Churnkey ✓ | Low | **MVP** | $ |
| **Mobile-responsive design** | Works on mobile browsers/apps | Churnkey ✓, Chargebee Retain ✓ | Low | **MVP** | $$ |
| **Offer cooldown periods** | Prevent customers from gaming the system by taking multiple discounts | Churnkey ✓ | Low | **MVP** | $$ |

### 1.2 Survey & Cancellation Reason Collection

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Multiple choice survey** | Standard "why are you cancelling?" question | All major players ✓ | Low | **MVP** | $$ |
| **Open-text feedback** | Free-form comment box | Churnkey ✓, Chargebee Retain ✓ | Low | **MVP** | $$ |
| **Conditional / branching questions** | Show different follow-up questions based on answers | Churnkey ✓, Chargebee Retain ✓ | Med | V2 | $$ |
| **NPS / CSAT surveys** | Embed satisfaction scores within cancel flow | Churnkey ~ | Med | V2 | $ |
| **Reason library / taxonomy** | Pre-built cancellation reason categories with analytics | Chargebee Retain ✓ | Low | **MVP** | $$ |
| **Feedback routing** | Send specific feedback types to Slack, email, or CRM | Churnkey ✓, Chargebee Retain ✓ | Med | V2 | $ |

### 1.3 Offer Types

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Discount offer** | Fixed amount or % off — one-time or recurring | All major players ✓ | Low | **MVP** | $$$ |
| **Pause subscription** | Allow customers to pause for 1–3+ months | Churnkey ✓, Chargebee Retain ✓ | Med | **MVP** | $$$ |
| **Plan downgrade** | Offer a cheaper plan as alternative to cancellation | Churnkey ✓, Chargebee Retain ✓ | Med | **MVP** | $$$ |
| **Trial extension** | Extend free trial for trialing customers | Churnkey ✓ | Low | **MVP** | $$ |
| **Feature unlock** | Unlock a premium feature for free as retention incentive | Churnkey ~ | High | V2 | $$ |
| **Human escalation / live chat** | Route to customer success agent or live chat | Churnkey ✓ | Med | V2 | $$ |
| **Educational content** | Show how-to videos, docs, or tips to re-engage | Raaft ✓ | Low | V2 | $ |
| **Account migration / concierge** | Offer white-glove migration or onboarding help | None (custom) | High | V3 | $$ |
| **Freemium downgrade** | Drop to free plan instead of full cancel | ProsperStack ~ | Med | V2 | $$ |

### 1.4 Personalization & Segmentation

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Audience segmentation** | Route different customers to different flows based on plan, MRR, tenure, usage | Churnkey ✓, Chargebee Retain ✓, Churn Buster ✓ | Med | **MVP** | $$$ |
| **Dynamic variables** | Inject customer name, plan, MRR, usage stats into offer copy | Churnkey ✓ | Med | **MVP** | $$ |
| **Rule-based targeting** | If/then logic for offer display based on customer attributes | Chargebee Retain ✓, Churnkey ✓ | Med | **MVP** | $$$ |
| **Plan-based flows** | Different cancel experiences for monthly vs. annual plans | Churnkey ✓ | Low | **MVP** | $$ |
| **Customer lifetime value routing** | Show more aggressive offers to high-LTV customers | Chargebee Retain ~ | Med | V2 | $$$ |
| **Usage-based segmentation** | Segment by product engagement (high users vs. inactive) | Churnkey ~ | High | V2 | $$$ |

### 1.5 A/B Testing

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Random A/B split testing** | Split traffic evenly between flow variants | Churnkey ✓, Chargebee Retain ✓ | Med | **MVP** | $$ |
| **Rule-based testing** | Assign specific segments to specific variants | Chargebee Retain ✓ | Med | V2 | $$ |
| **ML-based smart targeting** | AI assigns customers to the variant with highest predicted save rate | Chargebee Retain ✓ | High | V3 | $$$ |
| **Multivariate testing** | Test multiple variables simultaneously | None (rare) | High | V3 | $$ |
| **Bypass/lift measurement** | Measure lift vs. natural recovery baseline to avoid inflated stats | Churn Buster ✓ | High | V2 | $$ |
| **Statistical significance alerts** | Notify when test has reached significance | Chargebee Retain ~ | Med | V2 | $ |

---

## 2. Failed Payment Recovery (Dunning)

> 20–40% of total churn is involuntary (failed payments). Industry data: ~5% of subscribers are past-due at any given time. Best platforms recover 80–89% of failed payments.

### 2.1 Core Dunning Engine

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Automatic retry scheduling** | Retry failed charges on a configurable cadence | Stripe built-in ✓, Churnkey ✓, Churn Buster ✓ | Med | **MVP** | $$$ |
| **Smart retry logic (ML)** | ML-based timing: retry at optimal day/time based on decline code and card type | Churnkey ✓, Churn Buster ✓ | High | **MVP** | $$$ |
| **Decline code handling** | Different retry strategies per decline code (insufficient funds vs. do not honor) | Churnkey ✓, Churn Buster ✓ | High | **MVP** | $$$ |
| **Configurable retry windows** | Set max retry duration (7, 14, 21, 28 days) before cancellation | All major players ✓ | Low | **MVP** | $$ |
| **Grace period management** | Keep subscription active during retry window without locking customer out | Churnkey ✓, Chargebee ✓ | Med | **MVP** | $$ |
| **Hard vs. soft decline differentiation** | Don't retry hard declines (stolen card, account closed) | Churnkey ✓ | Med | **MVP** | $$ |

### 2.2 Payment Update Flows

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **In-app payment wall** | Block app access until payment updated (with update link) | Churnkey ✓ | Med | **MVP** | $$$ |
| **Hosted payment update page** | Secure, branded page to update card details | Churnkey ✓, Churn Buster ✓, Stunning ✓ | Med | **MVP** | $$$ |
| **Stripe Elements integration** | Embed Stripe's card update UI seamlessly | Churnkey ✓ | Med | **MVP** | $$ |
| **One-click payment link** | Tokenized magic link in email to update payment with one click | Churnkey ✓ | Med | **MVP** | $$$ |
| **Backup payment method capture** | Prompt customers to add a second card on file | None (rare) | High | V2 | $$ |
| **PayPal / ACH as backup** | Accept alternative payment methods when card fails | Butter Payments ✓ | High | V3 | $$ |
| **Account Updater (card network)** | Auto-update expired cards via Visa/Mastercard network updater | Stripe built-in ✓ | High (infra) | V2 | $$$ |

### 2.3 Dunning Communication Campaigns

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Email dunning campaigns** | Automated email sequences for failed payment recovery | All major players ✓ | Med | **MVP** | $$$ |
| **SMS recovery messages** | Text message alerts for failed payments | Churnkey ✓, Churn Buster ✓ | Med | V2 | $$ |
| **In-app notifications** | Banner/modal inside product warning about payment failure | Churnkey ✓ | Med | **MVP** | $$$ |
| **Custom email templates** | Branded, editable email templates | All major players ✓ | Low | **MVP** | $$ |
| **Deliverability optimization** | Custom sending domain, SPF/DKIM, deliverability monitoring | Churnkey ✓ | Med | **MVP** | $$ |
| **Timezone-aware sending** | Send emails/SMS at optimal local time per customer | Churnkey ✓ | Med | V2 | $$ |
| **White-labeled sender** | Emails appear to come from customer's own domain | Churnkey ✓ | Low | **MVP** | $$ |
| **Incentive offers in dunning** | Include discount or extension offer in recovery emails | Churnkey ✓ | Med | V2 | $$ |
| **Recovery confirmation email** | Transactional confirm when payment successfully recovered | Standard | Low | **MVP** | $ |

### 2.4 Recovery Attribution & Reporting

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Recovery rate tracking** | % of failed payments successfully recovered | All major players ✓ | Low | **MVP** | $$ |
| **Incremental lift measurement** | Distinguish platform-driven recoveries from natural self-recoveries | Churn Buster ✓ | High | V2 | $$ |
| **Revenue recovered dashboard** | Total MRR/ARR saved via dunning per period | Churnkey ✓ | Low | **MVP** | $$ |
| **Campaign performance analytics** | Open rates, click rates, recovery rates per email in sequence | Churnkey ✓, Churn Buster ✓ | Med | V2 | $$ |

---

## 3. Analytics & Reporting

> Data is the product. Companies that understand their churn deeply can improve it systematically.

### 3.1 Core Churn Metrics

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **MRR churn rate** | % of MRR lost per month | Churnkey ✓, Baremetrics ✓ | Low | **MVP** | $$$ |
| **Logo/subscriber churn rate** | % of customers cancelled per period | All players ✓ | Low | **MVP** | $$$ |
| **Gross vs. net churn** | Net churn accounts for expansion MRR | Churnkey ✓, Baremetrics ✓ | Med | **MVP** | $$ |
| **Voluntary vs. involuntary churn split** | Segment churn by type | Churnkey ✓ | Med | **MVP** | $$$ |
| **New vs. old churn** | Separate churn from recent vs. long-tenure customers | Churnkey ✓ | Med | V2 | $$ |
| **Churn by plan/segment** | Break down churn rate per pricing tier, region, acquisition channel | Churnkey ~ | Med | V2 | $$$ |

### 3.2 Revenue Analytics

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **MRR tracking** | Track MRR growth, contraction, expansion | Baremetrics ✓, ProfitWell ✓ | Med | **MVP** | $$ |
| **ARR dashboard** | Annual recurring revenue view | Baremetrics ✓ | Low | V2 | $$ |
| **Retained revenue reporting** | MRR saved specifically by cancel flow / dunning interventions | Churnkey ✓, Chargebee Retain ✓ | Med | **MVP** | $$$ |
| **Recovery ROI calculator** | Platform cost vs. MRR recovered (ROI dashboard) | Churn Buster ✓ | Med | **MVP** | $$$ |
| **Expansion MRR tracking** | Revenue from upsells / upgrades | Baremetrics ✓ | Med | V2 | $$ |

### 3.3 Cohort Analysis

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Retention cohorts** | Track cohorts of customers over time by signup month | Churnkey ✓, Baremetrics ✓ | High | **MVP** | $$$ |
| **Revenue cohorts** | MRR cohort analysis showing LTV curves | Baremetrics ✓ | High | V2 | $$$ |
| **Cohort comparison** | A/B test cohorts against each other | Chargebee Retain ✓ | High | V2 | $$ |
| **Cancellation cohorts** | When customers cancel relative to their signup date | Churnkey ~ | Med | V2 | $$ |

### 3.4 Funnel Analytics

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Cancel flow funnel** | Conversion rates per step (seen → survey → offer → saved) | Churnkey ✓, Chargebee Retain ✓ | Med | **MVP** | $$$ |
| **Save rate** | % of cancellation attempts that were saved | All players ✓ | Low | **MVP** | $$$ |
| **Deflection rate** | Customers who started cancel flow but didn't complete | Chargebee Retain ✓ | Med | **MVP** | $$ |
| **Offer acceptance rate** | % who accepted specific offer type | Churnkey ✓, Chargebee Retain ✓ | Med | **MVP** | $$$ |
| **Offer-level analytics** | Which offer types have best save rates | Churnkey ✓ | Med | **MVP** | $$$ |

### 3.5 LTV & Predictive

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Customer LTV calculation** | Historical and predicted lifetime value per customer | Baremetrics ✓, ProfitWell ✓ | High | V2 | $$$ |
| **Average revenue per user (ARPU)** | MRR ÷ subscribers | Baremetrics ✓ | Low | **MVP** | $$ |
| **Payback period** | CAC vs. LTV ratio | Baremetrics ✓ | Med | V2 | $$ |
| **Churn prediction score** | ML probability score of churn for each customer | Churnkey ✓, ChurnZero ✓ | High | V2 | $$$ |

### 3.6 Reporting & Export

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Custom date ranges** | Filter all reports by any time window | All players ✓ | Low | **MVP** | $ |
| **CSV / Excel export** | Download any report | Churnkey ✓ | Low | **MVP** | $ |
| **Scheduled email reports** | Auto-email reports weekly/monthly | Chargebee Retain ~ | Med | V2 | $ |
| **Custom dashboards** | Build personalized metric views | Baremetrics ✓ | High | V3 | $$ |
| **API access to metrics** | Pull all analytics programmatically | Churnkey ✓ | Med | V2 | $$ |
| **Industry benchmarking** | Compare your save rate, churn rate vs. industry peers | Chargebee Retain ✓ | High | V2 | $$ |

---

## 4. Customer Intelligence

> Understanding customers individually is the difference between reactive and proactive retention.

### 4.1 Customer Profiles & Timelines

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Customer profile page** | Single view of a customer: plan, MRR, tenure, activity | Churnkey ✓, ChurnZero ✓ | Med | **MVP** | $$ |
| **Activity timeline** | Chronological log of all retention events for a customer | Churnkey ✓ | Med | **MVP** | $$ |
| **Cancellation history** | Previous cancel attempts, reasons, and outcomes | Churnkey ✓ | Low | **MVP** | $$ |
| **Offer history** | What offers were shown, accepted, or rejected | Churnkey ✓ | Low | **MVP** | $$ |
| **Payment history** | Failed payment events, recovery attempts, outcomes | Churnkey ✓ | Low | **MVP** | $$ |
| **Customer search & filters** | Find customers by name, email, plan, status, risk | Churnkey ✓ | Med | **MVP** | $ |

### 4.2 Health Scores & Risk Signals

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Customer health score** | Composite score based on usage, payments, engagement | Churnkey ✓, ChurnZero ✓, Involve.ai ✓ | High | V2 | $$$ |
| **Churn risk score** | ML-predicted probability this customer churns | Churnkey ✓, ChurnZero ✓ | High | V2 | $$$ |
| **Risk alerts / watchlist** | Flag high-risk customers for CS team intervention | Chargebee Retain ✓, ChurnZero ✓ | Med | V2 | $$$ |
| **Usage-based risk signals** | Detect inactivity, declining logins, feature abandonment | ChurnZero ✓, Involve.ai ✓ | High | V2 | $$$ |
| **Payment risk signals** | Track expired cards before they fail (card expiry alerts) | Churnkey ✓ | Med | **MVP** | $$$ |
| **Engagement score** | Track email open rates, in-app engagement | Churnkey ~, Intercom ✓ | High | V2 | $$ |

### 4.3 Usage & Product Analytics Integration

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Product usage ingestion** | Accept usage events via API or Segment | Churnkey ✓ (via Segment) | High | V2 | $$$ |
| **Feature adoption tracking** | Which features each customer uses | ChurnZero ✓ | High | V2 | $$ |
| **Inactivity detection** | Trigger retention flows when usage drops below threshold | Churnkey ~, ChurnZero ✓ | High | V2 | $$$ |
| **Session frequency tracking** | How often customer logs in | ChurnZero ✓ | Med | V2 | $$ |

---

## 5. AI/ML Features

> The next frontier in retention is predictive and adaptive intelligence that personalizes every interaction.

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **AI-powered feedback synthesis** | Auto-categorize, rank, and surface themes from open-text cancel feedback | Churnkey ✓ (Insights AI) | High | V2 | $$$ |
| **Sentiment analysis** | Classify feedback as positive/negative/neutral for reactivation scoring | Churnkey ✓ | High | V2 | $$ |
| **Churn prediction model** | ML model trained on your customer data to predict who will churn | Churnkey ✓, ChurnZero ✓, Involve.ai ✓ | High | V2 | $$$ |
| **Adaptive offer selection** | Automatically show the offer most likely to save each customer (no A/B, just AI) | Chargebee Retain ✓ (Smart Targeting) | High | V2 | $$$ |
| **Precision retry engine** | ML-based smart payment retry timing per customer, card type, decline code | Churnkey ✓ | High | **MVP** | $$$ |
| **Personalized email content** | AI writes personalized email copy per customer segment | None (emerging) | High | V3 | $$ |
| **Anomaly detection** | Alert when churn spikes abnormally (e.g., payment processor bug) | None (rare) | High | V3 | $$ |
| **Win-back propensity scoring** | Score churned customers on likelihood to reactivate | Churnkey ~ | High | V2 | $$ |
| **LTV prediction** | Predict future LTV per customer using ML | ProfitWell ✓ | High | V3 | $$$ |
| **Offer price optimization** | AI suggests optimal discount amount per customer | None (emerging) | High | V3 | $$$ |

---

## 6. Integrations

### 6.1 Billing / Subscription Platforms

| Integration | Notes | Competitors | Difficulty | Priority |
|------------|-------|-------------|------------|----------|
| **Stripe** | Most critical — direct API + webhooks, Stripe Elements for payment update | All players ✓ | Med | **MVP** |
| **Chargebee** | Built-in for Chargebee Retain; API for others | Churnkey ✓ | Med | **MVP** |
| **Recurly** | Mid-market subscription platform | Churnkey ~ | Med | V2 |
| **Paddle** | Growing fast with creator economy / SaaS | Churnkey ✓ | Med | V2 |
| **Braintree** | PayPal-owned; common in enterprise | Churnkey ~ | High | V2 |
| **Zuora** | Enterprise subscription management | None | High | V3 |
| **Shopify / Recharge** | eCommerce subscription; Churn Buster specializes here | Churn Buster ✓ | Med | V2 |
| **Skio / Loop / Smartrr** | DTC subscription platforms | Churn Buster ✓ | Med | V3 |

### 6.2 CRM & Customer Success

| Integration | Notes | Competitors | Difficulty | Priority |
|------------|-------|-------------|------------|----------|
| **HubSpot** | Sync customer retention events, trigger workflows | Churnkey ✓ | Med | V2 |
| **Salesforce** | Enterprise CRM; map cancel/save events to Opportunities | Chargebee Retain ✓ | High | V2 |
| **Intercom** | Customer messaging; trigger churn rescue conversations | Churnkey ~ | Med | V2 |
| **Freshdesk / Zendesk** | Support ticket context for at-risk customers | ChurnZero ✓ | Med | V3 |
| **Segment** | Customer data platform; bidirectional event routing | Churnkey ✓, Chargebee Retain ✓ | Med | V2 |

### 6.3 Messaging / Notifications

| Integration | Notes | Competitors | Difficulty | Priority |
|------------|-------|-------------|------------|----------|
| **Slack** | Real-time alerts for cancels, saves, at-risk customers | Churnkey ✓, Chargebee Retain ✓ | Low | **MVP** |
| **Email (SMTP / SendGrid / Postmark)** | Transactional email for dunning and reactivation campaigns | All players ✓ | Med | **MVP** |
| **Twilio (SMS)** | SMS dunning campaigns | Churnkey ✓ | Med | V2 |
| **Customer.io / Braze** | Advanced marketing automation for reactivation | None native | High | V3 |

### 6.4 Automation & Workflow

| Integration | Notes | Competitors | Difficulty | Priority |
|------------|-------|-------------|------------|----------|
| **Zapier** | Connect to 5,000+ apps with no-code triggers | Chargebee Retain ✓, Churnkey ✓ | Med | V2 |
| **Make (Integromat)** | Alternative automation platform | None native | Med | V3 |
| **Webhooks** | HTTP callbacks for all retention events | Churnkey ✓, Chargebee Retain ✓ | Low | **MVP** |
| **Native REST API** | Full programmable access | Churnkey ✓ | Med | **MVP** |

---

## 7. Developer Experience

### 7.1 SDK & Widget Embed

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **JavaScript SDK** | `<script>` tag drop-in for cancel flow interception | All players ✓ | Med | **MVP** | $$ |
| **React / Vue components** | Framework-specific component libraries | Raaft ✓ | Med | V2 | $ |
| **NPM package** | Installable JS library | Churnkey ✓ | Low | **MVP** | $ |
| **Server-side session auth** | Signed JWT or HMAC session token to prevent spoofing | Churnkey ✓ | Med | **MVP** | $ |
| **Single-line init** | Minimal setup — one function call to activate | Churnkey ✓ | Med | **MVP** | $$ |
| **Test/sandbox mode** | Simulate flows without affecting live subscriptions | Churnkey ✓ | Low | **MVP** | $ |

### 7.2 REST API

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Full customer API** | CRUD for customers, subscriptions, cancel events | Churnkey ✓ | Med | **MVP** | $$ |
| **Campaign management API** | Create and trigger reactivation campaigns via API | Churnkey ✓ | Med | V2 | $$ |
| **Analytics API** | Pull all metrics programmatically | Churnkey ✓ | Med | V2 | $ |
| **Webhook management API** | Register/update webhook endpoints via API | Churnkey ✓ | Low | **MVP** | $ |
| **API versioning** | Stable, versioned API endpoints | Standard | Low | **MVP** | $ |
| **API rate limiting with 429 headers** | Standard rate limit responses with Retry-After | Standard | Low | **MVP** | $ |
| **API keys per workspace** | Multiple keys with permissions scoping | Standard | Med | **MVP** | $ |

### 7.3 Webhooks

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Cancel event webhook** | Fire when customer starts cancel flow | Churnkey ✓, Chargebee Retain ✓ | Low | **MVP** | $$ |
| **Save event webhook** | Fire when customer is saved | Churnkey ✓, Chargebee Retain ✓ | Low | **MVP** | $$ |
| **Offer accept/reject webhook** | Per-offer outcome events | Churnkey ✓ | Low | **MVP** | $$ |
| **Payment recovery webhook** | Fire when failed payment recovered | Churnkey ✓ | Low | **MVP** | $$ |
| **At-risk customer webhook** | Fire when churn risk score crosses threshold | Churnkey ~ | Med | V2 | $$ |
| **Webhook signature verification** | HMAC-signed payloads for security | Churnkey ✓ | Low | **MVP** | $ |
| **Webhook retry with exponential backoff** | Retry failed deliveries automatically | Standard | Med | **MVP** | $ |
| **Webhook logs in dashboard** | View recent webhook events and retry manually | Churnkey ✓ | Med | V2 | $ |

### 7.4 Documentation & DX

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Public API documentation** | Hosted, searchable docs (Mintlify / Readme.io) | Churnkey ✓ | Med | **MVP** | $ |
| **Quickstart guides** | 5-minute integration guides per billing platform | Churnkey ✓ | Low | **MVP** | $$ |
| **Interactive API explorer** | Try API calls directly in docs | Churnkey ~ | Med | V2 | $ |
| **Changelog** | Published record of API/SDK changes | Churnkey ✓ | Low | **MVP** | $ |
| **Status page** | Real-time uptime and incident tracking | Churnkey ✓ | Low | **MVP** | $ |

---

## 8. Reactivation / Win-Back Campaigns

> Churned customers who've already paid you once are cheaper to reactivate than acquiring new customers.

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **One-time email campaigns** | Send a manual win-back email to churned segment | Churnkey ✓ | Med | V2 | $$$ |
| **Automated drip reactivation** | Time-based email series to churned customers (30, 60, 90 days) | Churnkey ✓ | Med | V2 | $$$ |
| **Sentiment-based targeting** | Send different reactivation messages based on cancel reason | Churnkey ✓ | High | V2 | $$$ |
| **One-click reactivation link** | Magic link that reactivates subscription in one click | Churnkey ✓ | High | V2 | $$$ |
| **Reactivation offer / incentive** | Include discount or bonus to win back churned customers | Churnkey ✓ | Med | V2 | $$$ |
| **Campaign scheduling** | Schedule campaigns for optimal send times | Churnkey ✓ | Med | V2 | $$ |
| **Reactivation analytics** | Track open rates, click rates, reactivation rates per campaign | Churnkey ✓ | Med | V2 | $$ |
| **Unsubscribe management** | Honor opt-outs from reactivation emails (CAN-SPAM / GDPR) | Standard | Low | V2 | $ |

---

## 9. Compliance & Security

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **SOC 2 Type II certification** | Annual third-party security audit | Chargebee Retain ✓ | High | V2 | $ (enterprise unlock) |
| **GDPR compliance** | Data residency, right to deletion, DPA agreements | Chargebee Retain ✓, Churnkey ✓ | High | **MVP** | $ |
| **PCI DSS compliance** | Never store raw card data; use tokenization | Via Stripe (passthrough) | Low (if using Stripe) | **MVP** | $ |
| **CCPA compliance** | California consumer privacy rights | Chargebee Retain ✓ | Med | V2 | $ |
| **FTC Click-to-Cancel compliance** | Cancel must always be completable in flow | Chargebee Retain ✓, Churnkey ✓ | Low | **MVP** | $ (legal risk mitigation) |
| **Data encryption at rest** | AES-256 encryption for stored customer data | Chargebee Retain ✓ | Med | **MVP** | $ |
| **Data encryption in transit** | TLS 1.2+ for all API and web traffic | Standard | Low | **MVP** | $ |
| **Data retention policies** | Configurable retention and auto-deletion of PII | Chargebee Retain ✓ | Med | V2 | $ |
| **Customer data deletion** | Right to erasure — delete customer PII on request | Chargebee Retain ✓ | Med | **MVP** | $ |
| **Audit logs** | Log all admin actions within the platform | Standard | Med | V2 | $ |
| **SSO (SAML / Google)** | Enterprise single sign-on | Chargebee Retain ✓ | High | V3 | $ (enterprise unlock) |
| **Role-based access control** | Admin vs. read-only roles per team member | Standard | Med | V2 | $ |

---

## 10. Onboarding & Support

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Setup wizard** | Step-by-step guided first-run experience | Churnkey ✓ | Med | **MVP** | $$ (reduces churn) |
| **Pre-built flow templates** | Library of proven cancel flow templates to start from | Churnkey ✓ | Med | **MVP** | $$ |
| **Billing platform auto-connect** | OAuth or API key connect to Stripe/Chargebee in 2 clicks | Churnkey ✓ | Med | **MVP** | $$$ |
| **Live preview / sandbox** | Preview cancel flow without affecting live customers | Churnkey ✓ | Med | **MVP** | $$ |
| **In-app help center** | Embedded documentation and tooltips | Standard | Low | **MVP** | $ |
| **Email support** | Async support for all tiers | All players ✓ | Low | **MVP** | $ |
| **Live chat support** | Intercom / Crisp widget for real-time help | Most players ✓ | Low | **MVP** | $ |
| **Dedicated customer success manager** | Named CSM for Performance/Enterprise tiers | Chargebee Retain ✓ | High (headcount) | V2 | $ (enterprise unlock) |
| **Technical implementation engineer** | Hands-on integration support for enterprise | Chargebee Retain ✓ | High (headcount) | V3 | $ |
| **Quarterly business reviews** | Scheduled reviews of retention performance with CSM | Chargebee Retain ✓ | Low (process) | V3 | $ |
| **Best practices library** | Published guides, benchmarks, playbooks | Churnkey ✓ | Low | V2 | $ |
| **SLA options** | 99.9% uptime SLA for enterprise contracts | Chargebee Retain ✓ | High (infra) | V3 | $ |
| **Priority support SLA** | Response time SLA (e.g., <4h for enterprise) | Chargebee Retain ✓ | Low (process) | V3 | $ |

---

## 11. Platform / Infrastructure Features

| Feature | Description | Competitors | Difficulty | Priority | Revenue Impact |
|---------|-------------|-------------|------------|----------|----------------|
| **Multi-workspace / agency mode** | Manage multiple brands or clients from one login | Raaft ✓ | High | V2 | $ |
| **Team member management** | Invite team members with roles | All players ✓ | Low | **MVP** | $ |
| **Multi-currency support** | Display offers and analytics in customer's currency | Chargebee Retain ✓ | Med | V2 | $$ |
| **White-label / reseller mode** | Full white-labeling for agency resellers | None (rare) | High | V3 | $$ |
| **99.9% uptime SLA** | High-availability infrastructure | Chargebee Retain ✓ | High (infra) | V2 | $ |
| **CDN-delivered widget** | Fast global load times for cancel flow widget | Standard (Cloudflare) | Med | **MVP** | $$ |
| **Rate limiting & abuse prevention** | Prevent API abuse, form submission spam | Standard | Med | **MVP** | $ |

---

## 12. Competitive Feature Summary

| Feature Area | Churnkey | Chargebee Retain | Churn Buster | Stunning | Raaft | ProsperStack |
|-------------|----------|------------------|--------------|----------|-------|--------------|
| Cancel Flows | ✓✓ | ✓✓ | ✓ | ✗ | ✓ | ✓ |
| Dunning / Payment Recovery | ✓✓ | ~ | ✓✓ | ✓✓ | ✗ | ✗ |
| Reactivation Campaigns | ✓✓ | ~ | ~ | ✗ | ✗ | ✗ |
| AI/ML Features | ✓✓ | ✓ (Smart Targeting) | ~ | ✗ | ✗ | ✗ |
| Cohort Analytics | ✓ | ✓ | ~ | ✗ | ✗ | ✗ |
| Customer Health Scores | ~ | ~ | ✗ | ✗ | ✗ | ✗ |
| A/B Testing | ✓ | ✓✓ | ✓ | ✗ | ✗ | ✗ |
| Segmentation | ✓ | ✓✓ | ✓ | ✗ | ✗ | ~ |
| Stripe Integration | ✓✓ | ~ | ✓✓ | ✓✓ | ✓ | ✓ |
| Salesforce CRM | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| SOC 2 | ✓ | ✓✓ | ✗ | ✗ | ✗ | ✗ |
| GDPR | ✓ | ✓✓ | ✗ | ✗ | ✗ | ✗ |
| No-code Builder | ✓ | ✓ | ✓ | ✗ | ✓ | ~ |
| Developer API/SDK | ✓✓ | ~ | ~ | ✗ | ✓ | ✓ |

---

## 13. MVP vs. Later Phases — Prioritized Build Order

### Phase 1: MVP (Launch-Ready, Month 1–3)
**Goal: Be usable and valuable on day 1 for a Stripe-based SaaS company**

1. ✅ Stripe integration (bidirectional)
2. ✅ Cancel flow widget (JavaScript SDK + embeddable)
3. ✅ No-code flow builder (surveys + 4 offer types: discount, pause, downgrade, trial extension)
4. ✅ Basic segmentation (plan type, tenure)
5. ✅ Dunning email campaigns (3-step sequence, white-labeled)
6. ✅ Hosted payment update page
7. ✅ Smart retry scheduling (basic — day 1, 3, 7, 14)
8. ✅ Core dashboard (save rate, recovery rate, MRR saved)
9. ✅ Cancel flow funnel analytics
10. ✅ Slack notifications for cancel/save events
11. ✅ Webhooks for cancel/save/payment events
12. ✅ FTC Click-to-Cancel compliance
13. ✅ GDPR basics (data deletion endpoint)
14. ✅ Brand customization
15. ✅ Setup wizard + Stripe connect

### Phase 2: Growth (Month 4–6)
**Goal: Differentiate with intelligence and expand integrations**

1. 🔄 A/B testing for cancel flows
2. 🔄 ML-powered precision retry engine
3. 🔄 Reactivation email campaigns (win-back)
4. 🔄 AI feedback synthesis (auto-categorize cancel reasons)
5. 🔄 Churn prediction score (per customer)
6. 🔄 Customer health scores
7. 🔄 Cohort retention analysis
8. 🔄 Chargebee + Paddle integrations
9. 🔄 Zapier integration
10. 🔄 HubSpot / Salesforce CRM integration
11. 🔄 SMS dunning campaigns
12. 🔄 Multi-language support
13. 🔄 Industry benchmarking

### Phase 3: Enterprise (Month 7–12)
**Goal: Enterprise readiness, advanced AI, compliance**

1. 🏢 SOC 2 Type II certification
2. 🏢 SSO (SAML / Google)
3. 🏢 Dedicated CSM tier
4. 🏢 99.9% uptime SLA
5. 🏢 Adaptive AI offer selection (no A/B, full ML)
6. 🏢 LTV prediction model
7. 🏢 Advanced anomaly detection
8. 🏢 White-label / reseller mode
9. 🏢 Zuora / Braintree integrations
10. 🏢 Custom dashboard builder

---

## 14. Revenue Impact Summary (What Drives the Money)

| Feature | Why It Drives Revenue |
|--------|----------------------|
| **Smart retry engine** | Recovers 80–89% of failed payments vs. ~30–40% with basic retries |
| **Cancel flow widget** | Reduces voluntary churn by 30–58% — biggest single lever |
| **Pause subscription offer** | Saves ~40% of customers who want a break vs. cancelling; they return |
| **Segmented offers** | High-LTV customers get more aggressive saves — preserves most MRR |
| **Reactivation campaigns** | Churned customers who were satisfied can be re-acquired at near-zero CAC |
| **Churn prediction** | Proactive intervention before customers cancel — highest LTV preservation |
| **AI feedback synthesis** | Product insights reduce root-cause churn — compound long-term impact |
| **A/B testing** | Even 5% improvement in save rate = significant MRR compounding |
| **Payment update page (magic link)** | Reduces friction = higher payment update completion rates |
| **One-click reactivation** | Every extra click drops reactivation rate ~20–30% |

---

*Document generated: March 2026 | Based on research of Churnkey, Chargebee Retain, Churn Buster, Stunning, ProfitWell, Raaft, ProsperStack, ChurnZero, Baremetrics, Intercom, Butter Payments*
