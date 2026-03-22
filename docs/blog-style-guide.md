# Blog Style Guide — ChurnRecovery

> Mandatory guidelines for any agent or human writing blog posts for ChurnRecovery.
> Follow these rules to produce content that looks professional, not AI-generated.

Last updated: 2026-03-22

---

## The Core Problem: AI-Generated Content Looks Like AI-Generated Content

Readers can spot AI content instantly. Here's what gives it away:

| AI-Generated Tells ❌ | Professional Content ✅ |
|------------------------|------------------------|
| Opens with "In today's fast-paced world..." | Opens with a specific scenario or data point |
| Generic headers ("Understanding X", "The Importance of Y") | Specific, opinionated headers ("Why 73% of pause offers fail") |
| Wall of bullet points | Narrative paragraphs with occasional lists |
| Perfect grammar, zero personality | Conversational tone with deliberate style choices |
| No images, screenshots, or visuals | Screenshots, diagrams, data visualizations |
| "In conclusion..." ending | Ends with an action step or provocative thought |
| Every section same length and structure | Varied section lengths, some long, some short |
| Hedging everything ("It's important to note that...") | Making claims and backing them with data |
| Repeating the keyword in every sentence | Natural language with varied terminology |
| "Let's dive in!" / "Without further ado" | Just... starts the content |

---

## Voice & Tone

### We Sound Like:
- A smart friend who works in SaaS and knows their stuff
- Direct, specific, a little opinionated
- Someone who's actually built cancel flows, not just read about them

### We Don't Sound Like:
- A corporate blog written by committee
- An AI trying to be helpful
- A textbook
- A hype machine

### Specific Rules:
1. **Never start a post with:** "In today's...", "In the ever-evolving...", "Are you struggling with...", "Let's dive in"
2. **Never end a post with:** "In conclusion...", "To sum up...", "By following these steps..."
3. **Never use:** "game-changer", "leverage", "unlock", "harness the power of", "it's important to note", "without further ado", "at the end of the day", "dive deep", "navigate the landscape"
4. **Use contractions:** "don't" not "do not", "we're" not "we are"
5. **Be specific:** "reduces churn by 23%" not "significantly reduces churn"
6. **Have opinions:** "Discount offers are overused. Here's why pause offers work better." not "Both discount and pause offers have their merits."

---

## Post Structure

### Opening (First 150 Words)

The opening must do ONE of these:
- **Start with a number:** "73% of SaaS companies don't have a cancel flow. The ones that do save 20-35% of cancellations."
- **Start with a scenario:** "A subscriber hits 'Cancel.' Your cancel page says 'Are you sure?' They click yes. You just lost $1,200 in lifetime value."
- **Start with a contrarian take:** "Most churn reduction advice is wrong. Here's what actually works."
- **Start with a question that has a surprising answer:** "What's the #1 reason subscribers cancel? It's not price."

**Never** open with throat-clearing ("Churn is a major challenge facing SaaS companies today...").

### Body

**Vary your section structure.** Not every section should be:
```
## Heading
Paragraph
- Bullet
- Bullet
- Bullet
Paragraph
```

Mix it up:
- Some sections are 2-3 paragraphs of narrative with no lists
- Some sections are a short paragraph + a comparison table
- Some sections are a single impactful stat with context
- Some sections include a code snippet or configuration example
- Some sections show a before/after screenshot

### Section Headers

Headers should be **specific and interesting**, not generic:

| ❌ Generic | ✅ Specific |
|-----------|------------|
| "Understanding Churn" | "The Real Cost: What 5% Monthly Churn Looks Like Over 2 Years" |
| "Benefits of Cancel Flows" | "Cancel Flows Save 20-35% of Cancellations. Here's the Data." |
| "Best Practices" | "3 Offers That Actually Work (and 2 That Backfire)" |
| "How to Get Started" | "Set Up Your First Cancel Flow in 12 Minutes" |
| "Common Mistakes" | "The Discount Trap: Why 50%-Off Offers Attract the Wrong Customers" |

### Closing (Last 150 Words)

End with ONE of these:
- **An action step:** "Here's what to do next: [specific thing]"
- **A provocative question:** "If 30% of your cancellations are preventable, what's that worth per year?"
- **A forward-looking statement:** "In 6 months, every serious SaaS will have a cancel flow. The question is whether yours will be good."

**Never** summarize the entire post. The reader just read it.

---

## Formatting Rules

### Paragraphs
- **Max 3 sentences per paragraph** on content sections
- **Max 5 sentences** for narrative/story sections
- One idea per paragraph
- If a paragraph is doing two things, split it

### Lists
- Use bullet lists for **3-7 items** that don't have a sequence
- Use numbered lists for **steps or ranked items**
- **Never** use more than 2 bullet lists per section
- After a list, always have at least one narrative paragraph before the next list
- Lists should not be the primary content — they supplement narrative

### Bold & Emphasis
- Bold the **first use of a key term** in a section
- Bold **specific numbers and stats** worth remembering
- Don't bold full sentences (bold a phrase within a sentence)
- Use *italics* sparingly for emphasis or asides
- Never use ALL CAPS for emphasis

### Images & Visuals
Every post over 800 words should include at least ONE of:
- Screenshot of the ChurnRecovery UI
- Data visualization / chart
- Comparison table
- Diagram or flowchart
- Real example (anonymized customer data)

**Image rules:**
- Alt text is mandatory (descriptive, not "image1.png")
- Use WebP format, under 200KB
- Captions should add context, not just describe what's visible
- No generic stock photos. Ever. A post without images is better than one with stock photos.

### Code Blocks
- Use fenced code blocks with language hints (```javascript, ```json, etc.)
- Add a brief comment above or below explaining what the code does
- Keep snippets under 20 lines — link to full examples if longer

### Tables
- Use tables for comparisons (features, pricing, tools)
- Keep tables to 3-5 columns max
- Always include a header row
- Left-align text columns, right-align number columns

---

## SEO & AI Citability

Every post must be optimized for both search engines and AI answer engines:

### Title
- Include primary keyword naturally
- Under 60 characters
- Include a number or specific claim when possible
- Examples: "Cancel Flow Guide: Save 20-35% of Cancellations" not "The Ultimate Guide to Cancel Flows"

### Meta Description
- 150-160 characters
- Includes primary keyword
- Contains a specific number or claim
- Written as a sentence, not a keyword list

### Headings
- H1: Post title (one per page, auto-generated)
- H2: Major sections (4-8 per post)
- H3: Subsections (as needed)
- Use question format for at least 2-3 H2s (helps AI extraction)

### FAQ Section
- Every post should end with an FAQ section (5-8 questions)
- Questions should match real search queries
- Answers should be 40-75 words (optimal for AI extraction)
- Must have FAQPage schema markup (add to `lib/post-schemas.js`)

### Internal Links
- Link to at least 3 other ChurnRecovery pages per post
- Use descriptive anchor text (not "click here")
- Link to relevant tool pages (calculators, etc.)

### External Links
- Cite sources for all stats (link to the original study/report)
- 2-5 external links per post to authoritative sources
- Opens in new tab

---

## Content Types & Templates

### 1. How-To Guide
```
[Specific opening with what they'll accomplish]
[Prerequisites / what you'll need]
[Step 1 with screenshot]
[Step 2 with screenshot]
...
[Result / what it looks like when done]
[FAQ]
```

### 2. Data/Research Post
```
[Key finding upfront — the headline stat]
[Methodology (brief)]
[Finding 1 with chart]
[Finding 2 with chart]
[Finding 3 with chart]
[What this means for your SaaS]
[FAQ]
```

### 3. Comparison Post
```
[What we're comparing and why it matters]
[Comparison table]
[Detailed breakdown of each option]
[When to use each one]
[Our recommendation (have an opinion!)]
[FAQ]
```

### 4. Strategy/Opinion Post
```
[Contrarian or specific opening]
[The problem with the current approach]
[What actually works (with data)]
[How to implement it]
[Real example or case study]
[FAQ]
```

---

## Pre-Publish Checklist

Before any post goes live:

- [ ] Title under 60 characters with keyword
- [ ] Meta description 150-160 characters
- [ ] Opening doesn't use any banned phrases
- [ ] No section uses generic headers
- [ ] At least one visual element (screenshot, chart, table)
- [ ] No more than 2 consecutive bullet lists
- [ ] All stats have cited sources
- [ ] 3+ internal links to other ChurnRecovery pages
- [ ] FAQ section with 5-8 questions
- [ ] FAQPage schema added to `lib/post-schemas.js`
- [ ] No stock photos
- [ ] Read aloud test: does it sound like a person or a robot?
- [ ] Spell check (but don't over-correct to sterile perfection)
- [ ] Word count: 1,500-3,500 words (sweet spot for AI citability)

---

## Examples of What Good Looks Like

### Good Opening:
> Last month, we analyzed 12,000 cancellation attempts across 47 SaaS companies using ChurnRecovery. The cancel flows that offered a pause option saved 24% more subscribers than those offering only a discount. Here's what separated the winners from the rest.

### Good Section:
> ## Why Pause Offers Beat Discounts (Most of the Time)
>
> When a subscriber says "I'm not using this enough," a 20% discount doesn't solve their problem. They're still not using it. A pause offer — "take 30 days off, come back when you're ready" — addresses the actual objection.
>
> In our data, pause offers converted 22% of "not using it" cancellations. Discounts only converted 8% of the same group. The difference? Pause feels temporary. Cancel feels permanent. Discount feels like a bribe.

### Bad Opening:
> In today's competitive SaaS landscape, customer churn is one of the biggest challenges facing subscription-based businesses. Understanding why customers cancel and implementing effective retention strategies is crucial for long-term success. In this comprehensive guide, we'll explore everything you need to know about reducing churn.

### Bad Section:
> ## Understanding the Importance of Customer Retention
>
> Customer retention is vital for SaaS companies. Here are some reasons why:
> - It costs more to acquire new customers than retain existing ones
> - Retained customers have higher lifetime value
> - Loyal customers refer others
> - Churn impacts revenue growth
> - Retention improves unit economics
>
> As you can see, retention is an important metric that every SaaS company should focus on improving.

---

*This guide is a living document. Update it when you discover new patterns that work or anti-patterns to avoid.*
