# SEO Fundamentals — On-Page Technical Reference

## Title Tags

- **Length:** 50-60 characters (Google truncates beyond ~60)
- **Primary keyword** must appear naturally — not forced, not at the expense of readability
- Include a **number or specific claim** when possible
- Front-load the important words — keywords closer to the beginning carry more weight

**Good examples:**
- `Cancel Flow Guide: Save 20-35% of Cancellations` (49 chars)
- `SaaS Churn Rate Benchmarks for 2026 (by Industry)` (51 chars)
- `Pause vs. Discount Offers: Which Saves More Revenue?` (54 chars)

**Bad examples:**
- `The Ultimate Comprehensive Guide to Cancel Flows for SaaS` (too long, "ultimate comprehensive" is filler)
- `Cancel Flows` (too short, no value proposition)
- `How to Reduce Churn and Improve Customer Retention in Your SaaS Business` (way too long, keyword stuffed)

## Meta Descriptions

- **Length:** 150-160 characters
- Include **primary keyword** naturally
- Contains a **specific number or claim** — this is what makes people click
- Written as a **sentence**, not a keyword list
- Should complete the thought the title starts — together they tell a story

**Good example:**
> SaaS companies using cancel flows save 20-35% of cancellation attempts. Learn how to build one that actually works, with real data from 12,000 cancellations. (158 chars)

**Bad example:**
> Cancel flow guide. SaaS churn reduction. Customer retention strategies. How to reduce churn. Cancel page optimization. Best practices for SaaS companies. (155 chars — keyword salad)

## Heading Hierarchy

### H1 — Page Title
- One per page, auto-generated from the post title
- Contains primary keyword
- Never duplicate the H1 across pages

### H2 — Major Sections
- **4-8 per post** (fewer than 4 means the post isn't comprehensive enough; more than 8 means it should be split into multiple posts)
- Use **question format for 2-3 H2s** — this directly maps to People Also Ask and AI citation
- Should be scannable: a reader who only reads H2s should understand the post's argument

### H3 — Subsections
- Use as needed under H2s
- Don't skip levels (no H2 → H4)
- Keep H3s concise — they're structural, not editorial

### Example Heading Structure
```
H1: Cancel Flow Guide: Save 20-35% of Cancellations
  H2: What Is a Cancel Flow? (And Why "Are You Sure?" Doesn't Count)
  H2: How Much Revenue Does a Cancel Flow Actually Save?
    H3: By Company Size
    H3: By Churn Reason
  H2: The 4 Components of a High-Converting Cancel Flow
    H3: Exit Survey (2-3 Questions Max)
    H3: Targeted Offer Based on Reason
    H3: Pause Option
    H3: Confirmation With Winback Hook
  H2: 3 Cancel Flow Mistakes That Backfire
  H2: How to Set Up a Cancel Flow in 12 Minutes
  H2: FAQ
```

## Structured Data (Schema Markup)

Add structured data to every page. These schemas help search engines and AI models understand your content.

### FAQPage Schema
Use for: blog posts with FAQ sections, any page with question-answer pairs.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a cancel flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cancel flow is a series of steps shown to subscribers when they attempt to cancel. Instead of a simple confirmation page, it collects the cancellation reason, presents a targeted retention offer (like a pause or discount), and gives the subscriber a reason to stay. Well-built cancel flows save 20-35% of cancellation attempts."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a cancel flow cost to implement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With ChurnRecovery, setup takes 12 minutes and costs $20/month after a 30-day free trial. Most SaaS companies see positive ROI within the first week because the revenue saved from even a few retained customers exceeds the cost."
      }
    }
  ]
}
```

### HowTo Schema
Use for: tutorial and guide posts with step-by-step instructions.

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Set Up a Cancel Flow with ChurnRecovery",
  "description": "Step-by-step guide to creating a cancel flow that saves 20-35% of cancellation attempts.",
  "totalTime": "PT12M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Connect your billing provider",
      "text": "Link your Stripe, Paddle, or Chargebee account to ChurnRecovery. This takes about 2 minutes and requires your API key.",
      "url": "https://churnrecovery.com/blog/cancel-flow-guide#step-1"
    },
    {
      "@type": "HowToStep",
      "name": "Configure your exit survey",
      "text": "Choose 3-5 cancellation reasons from our tested templates or write your own. Keep it to 2-3 questions maximum.",
      "url": "https://churnrecovery.com/blog/cancel-flow-guide#step-2"
    }
  ]
}
```

### Article Schema
Use for: all blog posts.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cancel Flow Guide: Save 20-35% of Cancellations",
  "description": "Learn how SaaS companies use cancel flows to save 20-35% of cancellation attempts, with real data from 12,000 cancellations.",
  "author": {
    "@type": "Organization",
    "name": "ChurnRecovery"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ChurnRecovery",
    "logo": {
      "@type": "ImageObject",
      "url": "https://churnrecovery.com/logo.png"
    }
  },
  "datePublished": "2026-03-27",
  "dateModified": "2026-03-27",
  "image": "https://churnrecovery.com/images/cancel-flow-guide-og.webp",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://churnrecovery.com/blog/cancel-flow-guide"
  }
}
```

### BreadcrumbList Schema
Use for: any page nested more than one level deep.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://churnrecovery.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://churnrecovery.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cancel Flow Guide",
      "item": "https://churnrecovery.com/blog/cancel-flow-guide"
    }
  ]
}
```

### SoftwareApplication Schema
Use for: homepage and product pages.

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ChurnRecovery",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Cancel flow software that helps SaaS companies save 20-35% of cancellation attempts with targeted retention offers.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free plan available for up to 100 cancellation attempts per month"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  }
}
```

### Organization Schema
Already implemented site-wide. Ensure it includes:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ChurnRecovery",
  "url": "https://churnrecovery.com",
  "logo": "https://churnrecovery.com/logo.png",
  "sameAs": [
    "https://twitter.com/churnrecovery",
    "https://linkedin.com/company/churnrecovery"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@churnrecovery.com"
  }
}
```

## Internal Linking

- **Minimum 3 internal links per post** — more is fine if natural
- Use **descriptive anchor text** that tells the reader what they'll find
  - Good: "our guide to setting up cancel flows"
  - Bad: "click here" or "read more"
- Link to **relevant tool pages** (churn calculator, ROI estimator) when they add value
- Link to **related blog posts** to build topical clusters
- Place internal links where they genuinely help the reader, not just for SEO juice
- Check for broken internal links before publishing

## External Linking

- **Cite sources for all statistics** — link to the original study, report, or data source
- **2-5 external links per post** to authoritative sources (industry reports, academic studies, trusted publications)
- External links open in a **new tab** (`target="_blank"` with `rel="noopener noreferrer"`)
- Don't link to direct competitors' product pages — link to their research or content if it's genuinely the best source
- Prefer primary sources over secondary reporting (link to the McKinsey report, not the blog post that cited the McKinsey report)

## Canonical URLs

- Set a canonical URL on **every indexable page**
- Strip query parameters from canonical URLs (no `?utm_source=...` in canonical)
- Self-referencing canonicals are fine and recommended
- For paginated content, each page gets its own canonical
- If content exists at multiple URLs (e.g., with/without trailing slash), pick one and canonicalize

```html
<link rel="canonical" href="https://churnrecovery.com/blog/cancel-flow-guide" />
```

## Open Graph and Twitter Cards

Every page needs these meta tags for social sharing:

```html
<!-- Open Graph -->
<meta property="og:title" content="Cancel Flow Guide: Save 20-35% of Cancellations" />
<meta property="og:description" content="SaaS companies using cancel flows save 20-35% of cancellation attempts. Learn how, with data from 12,000 cancellations." />
<meta property="og:image" content="https://churnrecovery.com/images/cancel-flow-guide-og.webp" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://churnrecovery.com/blog/cancel-flow-guide" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Cancel Flow Guide: Save 20-35% of Cancellations" />
<meta name="twitter:description" content="SaaS companies using cancel flows save 20-35% of cancellation attempts. Learn how, with data from 12,000 cancellations." />
<meta name="twitter:image" content="https://churnrecovery.com/images/cancel-flow-guide-og.webp" />
```

**OG Image requirements:**
- **1200 x 630 pixels** (optimal for all platforms)
- WebP or PNG format
- Include the post title or key stat as text overlay
- Brand-consistent design (use ChurnRecovery colors/fonts)
- Don't rely on the image alone to convey information — the text meta tags are what matter

## Image Optimization

- **Format:** WebP preferred, fallback to PNG for screenshots, JPEG for photos
- **File size:** Under **200KB** per image (compress aggressively)
- **Alt text:** Mandatory on every image. Descriptive of what the image shows, not the filename.
  - Good: `alt="ChurnRecovery cancel flow editor showing a 3-step exit survey configuration"`
  - Bad: `alt="screenshot1.png"` or `alt="image"` or `alt=""`
- **No stock photos.** Ever. A post without images is better than one with stock photos. Use screenshots, charts, diagrams, or nothing.
- **Lazy loading:** Add `loading="lazy"` to images below the fold
- **Dimensions:** Always specify `width` and `height` attributes to prevent layout shift

## Sitemap

- Ensure every new page is included in the next sitemap generation
- Blog posts go in the sitemap with `<lastmod>` matching the `dateModified` in the Article schema
- Use `<changefreq>` of `weekly` for blog posts, `daily` for frequently updated pages
- Exclude noindex pages from the sitemap
- Submit sitemap to Google Search Console after adding new content clusters
