# ChurnRecovery — UX Research & Alternative Design Proposals

*Prepared: March 20, 2026*

---

## Table of Contents
1. [UX Research: Best SaaS Landing Pages](#1-ux-research-best-saas-landing-pages)
2. [Competitor Deep-Dive](#2-competitor-deep-dive)
3. [Current Site Critique](#3-current-site-critique)
4. [Alternative A: "Linear/Vercel Dark Mode"](#4-alternative-a-linearvercel-dark-mode)
5. [Alternative B: "Stripe Clean"](#5-alternative-b-stripe-clean)
6. [Alternative C: "Bold & Playful"](#6-alternative-c-bold--playful)
7. [Technical Recommendations](#7-technical-recommendations)
8. [Conversion Optimization](#8-conversion-optimization)

---

## 1. UX Research: Best SaaS Landing Pages

### Key 2025–2026 Trends

| Trend | What It Means | Who Does It Well |
|-------|--------------|------------------|
| Story-driven hero sections | Narrative headlines, not generic taglines. Problem → solution in 3 seconds. | Linear, Monday.com |
| Immersive product previews | Embedded demos, interactive walkthroughs, not static screenshots | Notion, Datadog |
| Single dominant CTA | One action per page. Kill competing links. | Stripe, Calendly |
| Real customer contexts | Actual UI screenshots > abstract 3D illustrations | Vercel, Linear |
| Conversion-focused minimalism | Less nav, sticky CTAs, fewer distractions | Stripe, Betterstack |
| Specific outcome metrics | "54% fewer cancellations" not "reduce churn" | Churnkey, Fathom, Deel |
| Dark mode as maturity signal | Dark backgrounds with gradients/glows = premium feel | Linear, Vercel |
| Social proof above the fold | Logos and metrics visible before scrolling | Stripe ($1.9T processed), Linear (25K teams) |

### Conversion Benchmarks
- **Median SaaS landing page**: 3.8% conversion rate
- **Top performers**: 8–12%
- **Best-in-class**: 20%+
- **Key lever**: Single CTA + specific outcome metric above fold → highest conversion lift

### What the Best Pages All Share
1. **Value prop in ≤8 words** — "Financial infrastructure to grow your revenue" (Stripe)
2. **Proof immediately** — logos, metrics, or social proof within first viewport
3. **One primary CTA** — no competing actions
4. **Product shown, not described** — real UI, not illustrations
5. **Mobile-first** — responsive isn't enough; mobile must be the primary design target

---

## 2. Competitor Deep-Dive

### Churnkey (churnkey.co) — Direct Competitor
**What they do well:**
- **Specific metrics above the fold**: "Lowers cancellation volume by 54%", "Recovers up to 89% of failed payments"
- **Baseline experience stats**: Voluntary churn drop 32%, time to integrate 35 mins, avg LTV increase 14%, recovered payments 72%
- **Named customer testimonials** with specific praise
- **"Go ahead. See how we do it."** — confident, challenging CTA tone

**What they do poorly:**
- Page is text-heavy with limited visual hierarchy
- No product screenshots or UI preview
- Pricing isn't on the homepage (friction for comparison shoppers)
- Design feels dated compared to Linear/Vercel aesthetic

**Key takeaway for ChurnRecovery:** Churnkey leads with *metrics*. ChurnRecovery leads with *price*. Both are valid — but ChurnRecovery needs metrics too once they exist.

### ProsperStack (prosperstack.com) — Direct Competitor
**What they do well:**
- **Clear product categories**: Cancel flows, conversion incentives, winback, revenue recovery — each with its own section
- **"Over $50 million revenue saved"** — massive trust signal
- **"Over 6 million happy cancellation sessions"** — social proof at scale
- **Feature-rich sections** with specific capabilities (AI Autopilot, A/B testing, segmentation)
- **G2 reviews** embedded directly
- **Guaranteed ROI** messaging

**What they do poorly:**
- Visually busy — too many sections fighting for attention
- Hero headline uses rotating text ("Boost retention / Slash churn / Accelerate growth") which dilutes the message
- No pricing transparency on homepage

**Key takeaway for ChurnRecovery:** ProsperStack shows what mature looks like. ChurnRecovery should aim for this level of specificity but with a cleaner visual execution.

### Linear (linear.app) — Design Benchmark
**What makes it effective:**
- **Dark background** with subtle light effects and gradients
- **Product is THE hero** — actual Linear UI shown, not described
- **Inter font family** — clean sans-serif, professional
- **"Bento box" grid layouts** for features
- **Micro-animations** that enhance without distracting
- **Social proof**: "25,000+ product teams" + named quotes from OpenAI, Ramp, Opendoor
- **Confident, minimal copy**: "The product development system for teams and agents"

**Design specifics:**
- Colors: Dark gray/black (#0A0A0A), white text, accent gradients (purple-blue-pink)
- Typography: Inter, clean hierarchy, generous spacing
- Layout: Single column hero → bento grid → testimonials → CTA
- Thin borders, glassmorphism, subtle noise textures

### Vercel (vercel.com) — Design Benchmark
**What makes it effective:**
- **Dark theme** with high contrast
- **Massive social proof**: Build times, page load reductions, specific customer wins
- **Framework logos** as visual trust signals
- **Product-first**: Shows actual deployment flow, AI gateway stats
- **Sparse copy**: Every word earns its place

**Design specifics:**
- Colors: Black (#000), white (#FFF), accent gradients
- Typography: Geist (custom), monospace for code
- Layout: Hero → social proof metrics → product demos → features grid

### Stripe (stripe.com) — Design Benchmark
**What makes it effective:**
- **"Financial infrastructure to grow your revenue"** — 7 words, crystal clear
- **Massive proof immediately**: "$1.9T in payments volume", "99.999% uptime", "200M+ subscriptions"
- **Customer stories** from recognizable brands (Substack, Lightspeed, Jobber)
- **Developer-focused** but accessible to non-technical buyers
- **White/light background** with gradient accents

**Design specifics:**
- Colors: White bg, #635BFF (Stripe purple), gradient accents
- Typography: Custom sans-serif (clean, generous letter-spacing)
- Layout: Hero with CTA → massive metrics bar → customer stories → product sections → CTA
- Navigation: Clean, minimal, with clear product categories

---

## 3. Current Site Critique (churnrecovery.com)

### What the Page Has

**Hero section:**
> "Stop losing customers. Recover them."
> Subtext about free platform, Churnkey comparison, no credit card

**Stats bar:** 5–10% charges fail monthly, ~70% recoverable, $250/mo Churnkey cost, $0 ChurnRecovery cost

**Features grid:** 6 cards (Cancel Flows, Dunning, Analytics, Integration, Free Forever, Open Source)

**Comparison table:** ChurnRecovery vs Churnkey

**Testimonials:** 3 quotes from named individuals

**CTA section:** Email capture with "Get early access"

### Critique

#### ✅ What Works
1. **"Stop losing customers. Recover them."** — Clear, punchy headline. Good.
2. **$0 vs $250/mo framing** — Instantly communicates the value prop. Strong differentiator.
3. **Comparison table** — Smart move for a challenger brand. Makes the decision concrete.
4. **"Free Forever" and "Open Source"** — Trust-building differentiators that competitors can't match.
5. **Named testimonials** with roles — Better than anonymous quotes.

#### ❌ What Needs Work

**1. Value prop clarity (7/10)**
- The headline is good but the subtext is too long. "ChurnRecovery is a free churn recovery platform for SaaS companies. Recover failed payments, reduce voluntary cancellations, and keep your MRR growing — without paying $250–$825/month for Churnkey." — This is 30+ words. Should be ≤15.
- **Fix:** Break into headline + one-line subtext + CTA. Move the Churnkey comparison below.

**2. No product preview (Critical gap)**
- Zero screenshots, demos, or UI mockups anywhere on the page
- Visitors can't visualize what they're signing up for
- Every top competitor shows their product above the fold
- **Fix:** Add a product screenshot or demo video as the hero visual

**3. CTA is weak (Critical gap)**
- "Get early access" with email field at the BOTTOM of the page
- No CTA button above the fold
- "We're onboarding SaaS teams in batches" sounds exclusive but also uncertain
- **Fix:** Primary CTA button in hero. Repeat at every section break. Use "Join Free — No Credit Card" or "Start Recovering Revenue"

**4. Social proof is thin**
- 3 testimonials from people with no company names, no logos, no metrics
- No "X companies saved $Y in revenue" type proof
- No recognizable brand logos
- **Fix:** Even if early stage, add "Join 50+ SaaS teams on the waitlist" or similar. Add company/product names to testimonials.

**5. Stats bar is backwards**
- Current order: fail rate → recovery rate → Churnkey cost → CR cost
- This leads with the PROBLEM, not the SOLUTION
- **Fix:** Lead with "$0 forever" then "70% of failures recovered" then "vs $250/mo alternatives"

**6. Features section is generic**
- "Smart Cancel Flows", "Dunning & Payment Recovery" — these are table-stakes features, not differentiators
- Nothing specific about HOW ChurnRecovery does these differently
- **Fix:** Tie each feature to a specific outcome. "Smart Cancel Flows → Retain 30-40% of canceling customers"

**7. No above-the-fold CTA**
- User must scroll to the very bottom to take action
- Top SaaS pages have CTA visible in the first viewport
- **Fix:** Email input + CTA button directly in the hero section

**8. Testimonials feel fabricated**
- "Marc Köhler · SaaS founder", "Priya Nair · Indie hacker", "James Walters · B2B SaaS"
- No company names, no photos, no links — reads as placeholder content
- **Fix:** Either get real testimonials with company names + headshots, or remove and replace with a different trust signal (waitlist count, GitHub stars, etc.)

**9. Mobile experience concerns**
- Comparison table will likely be hard to read on mobile
- No sticky CTA on mobile
- Long page with no way to jump to sections

**10. Weakest section: Features grid**
- Six identical cards with no visual differentiation
- No icons or illustrations to break up the text
- Generic descriptions that could describe any competitor

### Overall Grade: **C+**
- Good *positioning* (free alternative to Churnkey)
- Weak *execution* (no product visuals, buried CTA, thin social proof)
- The page tells you what ChurnRecovery does but doesn't SHOW you or make you FEEL it

---

## 4. Alternative A: "Linear/Vercel Dark Mode"

### Concept
Premium developer-focused aesthetic. Dark background, subtle glows, monospace accents. Positions ChurnRecovery as a *technical tool built by developers, for developers*. Think: "We're the open-source alternative that actually looks better than the paid competition."

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#0A0A0B` | Main background |
| `bg-elevated` | `#141415` | Cards, sections |
| `bg-hover` | `#1C1C1E` | Hover states, borders |
| `text-primary` | `#FAFAFA` | Headlines, body text |
| `text-secondary` | `#A1A1AA` | Subtext, labels |
| `text-tertiary` | `#52525B` | Disabled, muted |
| `accent-primary` | `#8B5CF6` | Primary CTA, links (violet) |
| `accent-glow` | `#A78BFA` | Glow effects, gradients |
| `accent-green` | `#22C55E` | Success states, "$0" |
| `accent-red` | `#EF4444` | Churn indicators, "$250/mo" |
| `border` | `#27272A` | Card borders, dividers |

### Typography
- **Headlines:** Inter (700, 800 weight) — clean, authoritative
- **Body:** Inter (400, 500) — highly readable on dark backgrounds
- **Code/Metrics:** JetBrains Mono — monospace for stats, code snippets, pricing
- **Scale:** 64px hero → 40px section heads → 20px body → 14px labels

### Layout Structure (Section by Section)

**Section 1: Hero (100vh)**
```
┌─────────────────────────────────────────────┐
│  [Logo]                    [Docs] [GitHub ★] │
│                                              │
│        Stop losing revenue.                  │
│        Recover it — for $0.                  │
│                                              │
│   Free, open-source churn recovery           │
│   for SaaS teams on Stripe.                  │
│                                              │
│   [email input] [Get Early Access →]         │
│                                              │
│   ┌─ Subtle gradient glow behind ──────┐     │
│   │   [ Product UI screenshot/mockup ] │     │
│   │   showing cancel flow builder      │     │
│   └────────────────────────────────────┘     │
│                                              │
│   "Free forever · Open source · MIT license" │
└─────────────────────────────────────────────┘
```
- Gradient glow (violet→blue) behind product screenshot
- Subtle grid pattern on background (like Linear)
- CTA button: violet (#8B5CF6) with hover glow effect

**Section 2: Metrics Bar**
```
┌──────────┬──────────┬──────────┬──────────┐
│  $0/mo   │ ~70%     │ <5 min   │ MIT      │
│  forever  │ recovery │ setup    │ licensed │
└──────────┴──────────┴──────────┴──────────┘
```
- Dark cards with thin borders
- Numbers in JetBrains Mono, large (48px)
- Labels in Inter, muted (#A1A1AA)

**Section 3: Product Showcase (Bento Grid)**
```
┌─────────────────────┬──────────────┐
│                     │  Cancel Flow │
│  Dashboard view     │  Builder     │
│  (large card)       │  (card)      │
│                     ├──────────────┤
│                     │  Dunning     │
│                     │  Sequences   │
├──────────┬──────────┴──────────────┤
│ Analytics│  Code snippet:          │
│ (card)   │  <script src="..."/>    │
└──────────┴─────────────────────────┘
```
- Bento-box grid (like Linear/Apple)
- Each card shows actual UI or code
- Subtle hover animation (slight scale + border glow)

**Section 4: Comparison (Side by Side)**
```
┌─────────────────┬─────────────────┐
│ ChurnRecovery   │  Churnkey       │
│                 │                 │
│ $0/mo     ✓    │  $250–825  ✗   │
│ Open source ✓   │  Proprietary ✗  │
│ Self-host   ✓   │  Cloud only  ✗  │
│ No fees     ✓   │  High base   ✗  │
└─────────────────┴─────────────────┘
```
- Left side: green accents (#22C55E)
- Right side: muted/red accents (#EF4444)
- Clean two-column card layout, not a table

**Section 5: Testimonials**
```
┌─────────────────────────────────────────┐
│  "Quote text here..."                    │
│                                          │
│  [Avatar] Name · Company · Role          │
│                                          │
│  ← →  (carousel or 3-column grid)       │
└─────────────────────────────────────────┘
```
- Dark cards with subtle gradient borders
- Quote marks in accent violet
- If no real headshots: use initials in colored circles

**Section 6: Final CTA (full-width)**
```
┌─────────────────────────────────────────┐
│                                          │
│   Start recovering revenue today.        │
│   It's free. It's open source.           │
│   It always will be.                     │
│                                          │
│   [email input] [Join Free →]            │
│                                          │
│   Subtle gradient bg (violet → blue)     │
└─────────────────────────────────────────┘
```

### Key Differentiators from Current
- Dark theme = instant perception of "modern, premium, technical"
- Product UI is central — shows, doesn't just tell
- Developer-focused aesthetic matches the open-source positioning
- Bento grid layout feels current (Linear/Apple style)
- Monospace metrics feel data-driven and trustworthy

### Target Audience
- Technical founders and developers
- DevTools/SaaS builders who appreciate open source
- People who visit Linear, Vercel, Raycast, and want that vibe
- Indie hackers who value transparency and self-hosting

---

## 5. Alternative B: "Stripe Clean"

### Concept
White, airy, professional. Gradient accents for warmth. Positions ChurnRecovery as *reliable financial infrastructure* — like a mini-Stripe for churn. The design says "we take your money seriously" through whitespace and clarity.

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#FFFFFF` | Main background |
| `bg-section` | `#F7F7F8` | Alternate sections |
| `bg-card` | `#FFFFFF` | Cards with shadow |
| `text-primary` | `#0A2540` | Headlines (Stripe dark blue) |
| `text-secondary` | `#425466` | Body text |
| `text-tertiary` | `#8898AA` | Labels, captions |
| `accent-gradient-start` | `#635BFF` | Gradient start (purple) |
| `accent-gradient-end` | `#0073E6` | Gradient end (blue) |
| `accent-success` | `#00D4AA` | Success, savings, $0 |
| `accent-warning` | `#FF6B35` | Competitor pricing |
| `border` | `#E3E8EE` | Card borders, dividers |

### Typography
- **Headlines:** Inter (600, 700) or Söhne — clean, geometric
- **Body:** Inter (400) — maximum readability on white
- **Metrics:** Inter Tight (700) — dense numbers that command attention
- **Scale:** 56px hero → 36px section heads → 18px body → 13px labels

### Layout Structure (Section by Section)

**Section 1: Hero**
```
┌─────────────────────────────────────────────┐
│  [Logo]                [Features] [Pricing]  │
│                        [Docs] [Get Started]  │
│                                              │
│  Recover churned revenue.                    │
│  For free, forever.                          │
│                                              │
│  The open-source platform that recovers      │
│  failed payments and reduces cancellations   │
│  — without the $250/mo price tag.            │
│                                              │
│  [Start Free →]   [View on GitHub]           │
│                                              │
│  ┌─ Floating cards with gentle shadows ─┐    │
│  │  [Payment recovered: $847]            │    │
│  │  [Cancellation prevented ✓]           │    │
│  │  [MRR saved: $12,340]                │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Trusted by SaaS teams at [logo] [logo]      │
└─────────────────────────────────────────────┘
```
- Clean white background
- Gradient text on "For free, forever" (purple→blue)
- Floating UI cards as hero visual (animated, gentle float)
- Trust logos below hero

**Section 2: Three-Column Value Props**
```
┌───────────────┬───────────────┬───────────────┐
│  💰 $0/mo     │  ⚡ 5 min     │  🔓 MIT       │
│  No hidden    │  One script   │  Open source  │
│  fees, ever   │  tag setup    │  & self-host  │
└───────────────┴───────────────┴───────────────┘
```
- White cards with subtle border and shadow
- Icons from Lucide or similar
- Clean, scannable

**Section 3: How It Works (3-Step)**
```
1. Add one line of code
   [Code snippet card]
   
2. Configure your cancel flows  
   [Screenshot of flow builder]
   
3. Watch your MRR grow
   [Dashboard screenshot with chart]
```
- Left-aligned steps with right-aligned visuals
- Alternating layout (left-right-left)
- Each step has a numbered circle with gradient fill

**Section 4: Feature Cards (Grid)**
```
┌──────────────────┬──────────────────┐
│  Cancel Flows    │  Payment Recovery │
│  [icon + desc    │  [icon + desc     │
│   + screenshot]  │   + screenshot]   │
├──────────────────┼──────────────────┤
│  Churn Analytics │  Integrations    │
│  [icon + desc    │  [Stripe, Paddle  │
│   + screenshot]  │   logos + desc]   │
└──────────────────┴──────────────────┘
```
- White cards on #F7F7F8 section background
- Each card includes a mini-screenshot or illustration
- Hover: subtle shadow increase

**Section 5: Comparison**
- Clean side-by-side cards (not a table)
- ChurnRecovery card: green accents, checkmarks
- Churnkey card: muted, X marks
- "Save $3,000–$9,900/year" callout in gradient text

**Section 6: Testimonials**
- Large quote cards with gradient left border
- Company name + logo + person name
- 3-column on desktop, carousel on mobile

**Section 7: Final CTA**
```
┌─────────────────────────────────────────┐
│  ┌─ Gradient background card ────────┐  │
│  │                                   │  │
│  │  Your MRR deserves better.        │  │
│  │                                   │  │
│  │  [email] [Start Free →]           │  │
│  │                                   │  │
│  │  No credit card · Free forever    │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Key Differentiators from Current
- White background = clean, trustworthy, "financial infrastructure" feel
- Gradient accents add warmth without clutter
- Card-based layout with shadows = clear visual hierarchy
- "How it works" section reduces uncertainty
- Logo bar + specific metrics build trust

### Target Audience
- Non-technical SaaS founders and ops leads
- People who trust Stripe's aesthetic = trust financial tools that look like Stripe
- B2B SaaS teams evaluating tools for the first time
- Users who value clarity and professionalism over "cool"

---

## 6. Alternative C: "Bold & Playful"

### Concept
Bright, friendly, approachable. Think Notion's warmth meets Figma's playfulness. Positions ChurnRecovery as *the tool that makes churn recovery feel less scary and more accessible*. Illustrations, rounded corners, and casual copy.

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#FFFDF7` | Warm off-white background |
| `bg-section` | `#FFF4E6` | Feature sections (warm peach) |
| `bg-accent-section` | `#F0E6FF` | Highlight sections (light purple) |
| `text-primary` | `#1A1A2E` | Dark navy headlines |
| `text-secondary` | `#4A4A68` | Body text |
| `accent-primary` | `#FF6B35` | Primary CTA (warm orange) |
| `accent-secondary` | `#7C3AED` | Secondary accents (purple) |
| `accent-green` | `#10B981` | Success, savings |
| `accent-yellow` | `#FBBF24` | Highlights, badges |
| `accent-pink` | `#EC4899` | Special callouts |
| `border` | `#E5E0D8` | Soft borders |

### Typography
- **Headlines:** Outfit (700, 800) or Plus Jakarta Sans — rounded, friendly, modern
- **Body:** Plus Jakarta Sans (400, 500) — warm and readable
- **Accent:** Space Grotesk (600) — for stats and metrics
- **Scale:** 60px hero → 38px section heads → 18px body → 13px labels

### Layout Structure (Section by Section)

**Section 1: Hero**
```
┌─────────────────────────────────────────────┐
│  [Logo 🎉]                     [Get Started]│
│                                              │
│  Churn sucks. 😤                             │
│  We fix it. For free.                        │
│                                              │
│  Recover failed payments, prevent            │
│  cancellations, and keep your MRR            │
│  growing — without spending a dime.          │
│                                              │
│  [email] [Join Free — It's Actually Free 🎉] │
│                                              │
│   ┌──────────────────────────────────┐       │
│   │ [Illustrated dashboard mockup    │       │
│   │  with floating elements:         │       │
│   │  recovered $, happy faces,       │       │
│   │  upward chart arrows]            │       │
│   └──────────────────────────────────┘       │
│                                              │
│  Already saving money for 50+ SaaS teams 💪  │
└─────────────────────────────────────────────┘
```
- Playful emoji in copy (sparingly)
- Illustrated hero visual with floating UI elements
- Rounded button (16px border-radius) with orange CTA
- Subtle background blobs (soft gradients, organic shapes)

**Section 2: "The Math is Simple" Counter**
```
┌─────────────────────────────────────────┐
│  🧮 The math is simple                  │
│                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │Churnkey│  │ You    │  │ Saved  │    │
│  │$250/mo │→ │ $0/mo  │= │$3000/yr│    │
│  └────────┘  └────────┘  └────────┘    │
│                                          │
│  That's a lot of coffee. ☕               │
└─────────────────────────────────────────┘
```
- Fun illustrations around the math
- Animated counter for savings
- Light purple (#F0E6FF) background section

**Section 3: Feature Cards (Rounded)**
```
┌──────────────────────────────────────────┐
│  🛡️ Cancel Flows                         │
│  Show the right offer at the right time. │
│  Pause plans, offer discounts, switch    │
│  tiers — all without code.               │
│  [Mini illustration]                     │
│                       border-radius: 24px│
└──────────────────────────────────────────┘
```
- Large rounded corners (24px)
- Colored top border (each card a different accent color)
- Simple line illustrations for each feature
- Alternating warm background colors

**Section 4: "How It Works" Steps**
```
   ① Copy one line of code
       ↓
   ② Customize your cancel flow  
       ↓
   ③ Start saving money 💰
```
- Vertical timeline layout
- Each step in a rounded card
- Illustrations between steps
- Progress indicator animation on scroll

**Section 5: Comparison (Fun version)**
```
┌─────────────────────────────────────────┐
│  🥊 The Honest Comparison               │
│                                          │
│  ChurnRecovery        vs     Churnkey    │
│  😊 Free                    😰 $250+/mo  │
│  😊 Open source             😰 Black box │
│  😊 Self-host option        😰 Nope      │
│  😊 No per-recovery fees    😰 High base │
│                                          │
│  [See Full Comparison →]                 │
└─────────────────────────────────────────┘
```
- Emoji instead of checkmarks/X marks
- Playful but still informative
- Card-based, not a rigid table

**Section 6: Testimonials (Card Carousel)**
- Rounded cards with pastel backgrounds
- Rotating testimonials
- Star ratings if available
- "Join them →" CTA after

**Section 7: Final CTA**
```
┌─────────────────────────────────────────┐
│  Warm gradient background (orange→pink)  │
│                                          │
│  Ready to stop losing money?             │
│                                          │
│  [email] [Yes, Let's Go! 🚀]            │
│                                          │
│  Free forever · No credit card · Pinky   │
│  promise 🤞                              │
└─────────────────────────────────────────┘
```

### Key Differentiators from Current
- Warm, approachable — less "enterprise", more "indie hacker friend"
- Illustrations and emoji make churn recovery feel less intimidating
- Playful copy tone matches the "free" positioning
- Large rounded corners = modern, friendly
- Color variety creates visual interest and section differentiation

### Target Audience
- Indie hackers and solo founders
- Non-technical SaaS operators
- Early-stage startups who appreciate personality
- People who love Notion, Figma, Loom aesthetics
- Those who find "enterprise" design intimidating

---

## 7. Technical Recommendations

### Current State: Inline Styles with Design Tokens

The site uses `style={{...}}` on React components with values from `lib/design-tokens.js`, despite Tailwind CSS being installed and configured.

### Recommendation: Migrate to Tailwind

**Verdict: Switch to Tailwind classes. The effort is moderate and the benefits are significant.**

### Pros of Switching to Tailwind

| Benefit | Impact |
|---------|--------|
| **Smaller CSS bundle** | Tailwind purges unused styles; inline styles ship everything |
| **Consistent design system** | Tailwind config = single source of truth for spacing, colors, typography |
| **Responsive design** | `md:`, `lg:` prefixes make responsive trivial; inline styles need JS media queries |
| **Dark mode support** | `dark:` prefix enables theme switching with zero JS |
| **Hover/focus states** | `hover:`, `focus:` prefixes in markup; inline styles can't do pseudo-classes |
| **Developer experience** | Autocomplete, class utilities, less typing |
| **Community & ecosystem** | shadcn/ui, Headless UI, etc. all assume Tailwind |
| **Animation** | `animate-*`, `transition-*` classes; inline styles need separate CSS |
| **Server components** | Tailwind works perfectly with RSC; inline styles add client-side overhead |

### Pros of Keeping Inline Styles + Tokens

| Benefit | Impact |
|---------|--------|
| **No migration cost** | It's already working |
| **Design tokens are co-located** | Style values live next to the components |
| **No class name conflicts** | Inline styles have highest specificity |
| **Familiar to non-Tailwind developers** | Lower learning curve |

### Why Tailwind Wins for ChurnRecovery

1. **You already have Tailwind installed** — you're paying the dependency cost without the benefits
2. **Responsive design is critical** — the comparison table on mobile needs responsive utilities
3. **Dark mode** — if you pursue Alternative A, Tailwind's `dark:` makes it trivial
4. **Animation/hover states** — inline styles can't handle `:hover` or transitions without JS
5. **Future components** — any UI library you add (shadcn, Radix) expects Tailwind

### Migration Plan

**Phase 1: Configure Tailwind theme (1–2 hours)**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: { primary: '#FAF9F5', elevated: '#F2F0EA' },
        accent: { DEFAULT: '#D97757', hover: '#C4684A' },
        text: { primary: '#191919', secondary: '#666' },
      },
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
}
```

**Phase 2: Migrate component by component (4–8 hours)**
- Start with layout components (Header, Footer, Section wrappers)
- Then content components (Hero, Features, Comparison)
- Then interactive components (CTA, forms)
- Use find-and-replace: `style={{ backgroundColor: tokens.bg }}` → `className="bg-bg-primary"`

**Phase 3: Remove design-tokens.js (30 min)**
- Verify all values are in tailwind.config.js
- Delete design-tokens.js
- Remove CSS variable declarations that duplicate Tailwind values

**Total estimated effort: 6–12 hours** for a developer familiar with Tailwind.

### Hybrid Option (Not Recommended)
You *could* keep design tokens for dynamic values (e.g., values that change based on API data) and use Tailwind for everything else. But for a marketing landing page with no dynamic theming, pure Tailwind is simpler and more maintainable.

---

## 8. Conversion Optimization

### What Would Increase Waitlist Signups

#### 1. Move CTA Above the Fold (HIGH IMPACT)
**Current:** Email input is at the very bottom of the page
**Fix:** Add email capture directly in the hero section

```
Hero headline → one-line subtext → [email input] [CTA button]
```

**Expected lift:** 30–50% more signups. Most visitors never scroll to the bottom.

#### 2. Add a Product Screenshot/Demo (HIGH IMPACT)
**Current:** Zero visuals of the actual product
**Fix:** Even a mockup/prototype screenshot of the cancel flow builder

**Why:** "Seeing is believing" — visitors who see the product UI are 2–3x more likely to convert because it makes the value tangible.

#### 3. Add Urgency/Scarcity to CTA (MEDIUM IMPACT)
**Current:** "We're onboarding SaaS teams in batches"
**Fix options:**
- "Join 127 teams on the waitlist" (social proof + FOMO)
- "Next batch: April 2026" (time pressure)
- "First 100 teams get lifetime priority support" (scarcity)

#### 4. Sticky CTA on Mobile (MEDIUM IMPACT)
**Fix:** Fixed bottom bar on mobile with email input and CTA button, always visible while scrolling.

#### 5. Add Exit-Intent Popup (LOW-MEDIUM IMPACT)
On desktop, show a popup when cursor moves to close the tab:
> "Wait — before you go. Join 100+ SaaS teams saving $3,000+/year on churn recovery. [email] [Join Free]"

### What's Missing from the Homepage

| Missing Element | Priority | Why It Matters |
|----------------|----------|----------------|
| **Product UI/screenshots** | 🔴 Critical | Can't convert without showing the product |
| **Above-the-fold CTA** | 🔴 Critical | Most visitors don't scroll |
| **Integration logos** (Stripe, Paddle, etc.) | 🟡 High | Builds confidence it works with their stack |
| **"How it works" section** | 🟡 High | Reduces uncertainty about setup |
| **Specific metrics** (when available) | 🟡 High | "Recovered $X for Y teams" |
| **GitHub stars badge** | 🟢 Medium | Trust signal for open-source positioning |
| **FAQ section** | 🟢 Medium | Handles objections (Is it really free? What's the catch?) |
| **Security/compliance info** | 🟢 Medium | "Your data never touches our servers" (if self-hosted) |
| **Founder story** | 🟢 Medium | "Why we built this" creates emotional connection |

### Above the Fold vs Below

**Above the fold (first viewport):**
1. Headline + subtext
2. Email capture + CTA button
3. Product screenshot/mockup
4. Trust badges (Stripe logo, "Open Source", "MIT Licensed")

**Below the fold (scrolling):**
1. Metrics bar ($0, recovery rate, setup time)
2. "How it works" (3 steps)
3. Feature cards with screenshots
4. Comparison table (ChurnRecovery vs Churnkey)
5. Testimonials
6. FAQ
7. Final CTA (repeat email capture)

### Recommended CTA Copy (A/B Test Ideas)

| Variant | CTA Button Text | Hypothesis |
|---------|----------------|------------|
| **A (Current)** | "Get early access" | Baseline |
| **B (Action)** | "Start Recovering Revenue" | Action-oriented, outcome-focused |
| **C (Free emphasis)** | "Join Free — No Credit Card" | Removes friction/risk perception |
| **D (Social proof)** | "Join 100+ SaaS Teams" | Social proof in the CTA |
| **E (Specific)** | "Save $3,000/Year →" | Quantified benefit |
| **F (Casual)** | "Let's Fix Your Churn" | Conversational, approachable |

**Prediction:** Variant E or C will win. Specific savings ($3,000/year) create instant value framing, and "No Credit Card" removes the #1 signup objection.

### Trust Signals We're Missing

1. **"What's the catch?" answer** — People don't trust free. Add a section: "Why is it free?" with honest answers (open source model, community-driven, future premium features, etc.)
2. **Security messaging** — If self-hosted, emphasize "Your data stays on your servers"
3. **GitHub activity** — Show recent commits, stars, contributors
4. **Stripe partnership/verified** — If applicable, show Stripe verified app badge
5. **Real company names** in testimonials — "Marc Köhler, SaaS founder" needs to be "Marc Köhler, Founder at [ProductName]"
6. **Waitlist counter** — "Join 247 SaaS teams" (update dynamically)
7. **Media mentions** — If any blog/newsletter covered it, show the logos
8. **Compliance badges** — SOC 2, GDPR, if applicable

---

## Summary: Recommended Next Steps

### Immediate (This Week)
1. **Add CTA to hero section** — email input + button above the fold
2. **Create a product mockup** — even a Figma screenshot of what the cancel flow builder will look like
3. **Add integration logos** — Stripe, Paddle, Lemon Squeezy logos in the hero area
4. **Fix testimonials** — add company names or replace with waitlist count

### Short-term (Next 2 Weeks)
5. **Choose a design direction** — we recommend **Alternative A (Dark Mode)** if targeting developers, or **Alternative B (Stripe Clean)** if targeting non-technical SaaS operators
6. **Begin Tailwind migration** — configure theme, migrate component by component
7. **Add "How it works" section** — 3-step flow with visuals
8. **Add FAQ section** — "Is it really free?", "What's the catch?", "How is this different from Churnkey?"

### Medium-term (Next Month)
9. **Implement chosen design alternative** — full redesign
10. **Set up A/B testing** on CTA copy (use Vercel's built-in A/B or PostHog)
11. **Add real metrics** as they become available
12. **Mobile optimization pass** — sticky CTA, responsive comparison, touch targets

### Design Direction Recommendation

**For ChurnRecovery's current positioning (free, open-source, developer-friendly), Alternative A (Dark Mode) is the strongest choice.** It:
- Matches the open-source/developer audience
- Creates instant perception of premium quality (despite being free)
- Differentiates sharply from Churnkey's dated design and ProsperStack's busy layout
- Is on-trend for 2025–2026 SaaS design
- Tailwind's `dark:` prefix makes implementation straightforward

**Alternative B (Stripe Clean)** is the safe second choice if you want to appeal to a broader, less technical audience.

**Alternative C (Bold & Playful)** works if the brand voice is casual and the target is solo indie hackers — but may undermine trust for larger SaaS teams evaluating the tool.
