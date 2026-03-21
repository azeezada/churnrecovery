# Reddit Execution Playbook — ChurnRecovery Launch
*Created: March 2026 | Status: Ready for manual execution*

---

## Overview

Three primary posts staggered over a weekend. Start with the smallest community to test messaging, adapt based on feedback, then hit the larger ones.

| Subreddit | Members | Post Time | Angle |
|-----------|---------|-----------|-------|
| r/SideProject | 290k | **Saturday 9–11 AM EST** | Founder building free alternative |
| r/entrepreneur | 3.2M | **Sunday 7–9 PM EST** | Business cost optimization |
| r/startups | 1.8M | **Monday 8–10 AM EST** | Industry disruption + open source |

**UTM tracking:** Append to all links:
- r/SideProject: `?utm_source=reddit&utm_medium=social&utm_campaign=launch_week&utm_content=sideproject`
- r/entrepreneur: `?utm_source=reddit&utm_medium=social&utm_campaign=launch_week&utm_content=entrepreneur`
- r/startups: `?utm_source=reddit&utm_medium=social&utm_campaign=launch_week&utm_content=startups`

---

## POST 1 — r/SideProject

**Post Saturday 9–11 AM EST**

### Title (copy exactly):
```
Built a free alternative to Churnkey after seeing their $825/month pricing 🤯
```

### Body (copy exactly):
```
Two months ago I needed churn recovery for a side project. Every failed payment was lost revenue and I needed something to automatically recover those customers.

The "industry standard" was Churnkey. But here's what almost made me spit out my coffee:

**$250–$825/month.** For what amounts to some smart cancel flows and email automation.

For a $10k MRR product, that's 2.5–8% of gross revenue just for churn recovery. Before you've recovered a single customer. That's not a tool — that's rent-seeking.

---

So I built the alternative: **ChurnRecovery** — everything Churnkey does, but free and open source.

🔗 churnrecovery.com  
🐙 github.com/dawoodazeeza/churnrecovery (MIT licensed)

**What it does:**
- Smart cancel flows — show the right offer at cancellation (pause, discount, plan change)
- Automated dunning sequences for failed payments
- Exit surveys — know exactly why customers are leaving
- One-line integration with Stripe, Paddle, Lemon Squeezy
- Churn analytics + cohort analysis

**The honest comparison:**

| Feature | ChurnRecovery | Churnkey |
|---|---|---|
| Monthly cost | **$0** | $250–$825 |
| Cancel flows | ✅ | ✅ |
| Failed payment recovery | ✅ | ✅ |
| Exit surveys | ✅ | ✅ |
| Open source | ✅ MIT | ❌ |
| Self-hosted option | ✅ | ❌ |

**Integration is one script tag:**
```js
<script src="https://cdn.churnrecovery.com/widget.js" 
        data-site-id="your-site-id">
</script>
```

**Why free?** The tech isn't revolutionary — React components, email APIs, webhook handling. What Churnkey charges $825/month for should cost maybe $25. I'm betting on volume over margin: 10,000 users instead of 100 paying customers.

**Early traction:** 200+ signups in the first week, 15 founders in private beta. The #1 email I get: "What's the catch?"

Happy to answer any technical questions about the implementation. Full code is on GitHub.

What do you think — does the community need more free alternatives to expensive SaaS tools?
```

### r/SideProject Rules to Follow:
- ✅ Show what you built — include GitHub link, demo screenshots
- ✅ Be conversational and founder-to-founder
- ✅ Ask a genuine question at the end (engagement signal)
- ✅ Respond to EVERY comment within 2 hours, especially first 4 hours
- ❌ Don't spam multiple posts in the same sub
- ❌ Don't only talk about your product — engage with others' posts too
- ❌ Don't beg for upvotes/stars

---

## POST 2 — r/entrepreneur

**Post Sunday 7–9 PM EST** (after digesting r/SideProject feedback)

### Title (copy exactly):
```
How one SaaS tool was quietly costing bootstrapped founders $10K/year — so I built a free version
```

### Body (copy exactly):
```
Quick math check for anyone using churn recovery tools:

If you're paying Churnkey $400/month on a $15k MRR business, that's **3.2% of gross revenue** just for one churn tool. 

On a $5k MRR business? That $250/month minimum is **5% of gross revenue** — before you've recovered a single customer.

That's a real business expense problem. Not a minor inconvenience.

---

I spent a week auditing SaaS tool costs for bootstrapped businesses. The pattern was consistent: **churn recovery tools are among the most overpriced products in the stack**, precisely because they sit close to revenue and founders feel like they can't afford NOT to have them.

That's not pricing based on value delivered. That's pricing based on psychological leverage.

So I built the alternative: **ChurnRecovery** — free churn recovery for SaaS businesses.

🔗 churnrecovery.com

**What it does:**
- Shows smart cancel offers when customers try to leave (pause, discount, plan change)
- Automatically retries failed payments and sends recovery emails
- Surveys customers on their way out (so you actually know why people leave)
- Integrates with Stripe, Paddle, Lemon Squeezy — setup in under 15 minutes
- Full analytics dashboard: recovery rates, cancellation reasons, cohort data

**Honest ROI calculation:**

If you recover just 2 customers/month at $50 average LTV:
- Monthly recovery value: $100
- Cost of Churnkey: $250–$825
- **Net loss using Churnkey on a small business: -$150 to -$725/month**

With ChurnRecovery at $0:
- Same $100 recovered
- Tool cost: $0
- **Net gain: $100/month**

At some point, the tool that's supposed to help you keep revenue is costing more than the revenue it recovers. That's the trap.

---

**Why am I giving it away free?**

Partly philosophical: I think tools that sit this close to the money are too important to be gated behind enterprise pricing. Partly strategic: I'm betting volume over margin. If we can sign up 10,000 small businesses that Churnkey ignores, we can monetize the edges (premium analytics, managed hosting, professional services) without punishing the base product.

**Early numbers:** 200+ signups in first week, 15 in private beta. The feedback has been consistently: "Why is this free? What's the catch?" Which tells me everything about how broken tool pricing has become.

---

**Questions for this community:**

1. What other SaaS categories are running this playbook — charging 5–8% of gross revenue for something that should cost $20?
2. Would you trust a free tool with your billing data, or does free = red flag for you?
3. Anyone here done the math on what percentage of your MRR goes to tools? Curious how bad it actually is.

Happy to discuss the business model, the tech stack, or the pricing philosophy. This one's worth having a real conversation about.

---

*GitHub: github.com/dawoodazeeza/churnrecovery (MIT licensed, fully open source)*
```

### r/entrepreneur Rules to Follow:
- ✅ Lead with data and ROI math — this audience responds to numbers
- ✅ Frame as a business problem, not a tech project
- ✅ Ask questions that invite genuine discussion (not "check out my product")
- ✅ Be prepared to explain the free business model — this crowd is skeptical
- ❌ Don't make it sound like a product pitch — make it a business discussion
- ❌ Avoid excessive emojis — this sub skews more professional
- ❌ Don't copy-paste the SideProject post — adapt the angle

---

## POST 3 — r/startups

**Post Monday 8–10 AM EST** (incorporate best-performing elements from posts 1 & 2)

### Title (copy exactly):
```
Churn recovery tools cost $250–825/month. Here's why I'm giving mine away free.
```

### Body (copy exactly):
```
Hot take: most SaaS tools in the "sit close to revenue" category are overpriced by 10–30x. The pricing isn't based on development cost or value delivered — it's based on psychological proximity to money.

Churn recovery is the clearest example. You're losing customers, every lost customer feels urgent, so you'll pay almost anything for a tool that promises to fix it. Churnkey understood this and priced accordingly: $250–$825/month.

For a bootstrapped startup at $10k MRR, that's potentially 8% of gross revenue. For one tool.

I decided to prove the point by building the alternative and giving it away.

---

**ChurnRecovery** — free, open source churn recovery for SaaS.

🔗 churnrecovery.com  
🐙 github.com/dawoodazeeza/churnrecovery

**Feature parity with Churnkey:**
- ✅ Smart cancel flows (customizable offers: pause, discount, plan change)
- ✅ Automated dunning + failed payment recovery
- ✅ Exit surveys + cancellation reason tracking  
- ✅ Churn analytics and cohort analysis
- ✅ One-line integration (Stripe, Paddle, Lemon Squeezy, Chargebee)

**What they don't have:**
- ✅ Open source (MIT licensed)
- ✅ Self-hosted option
- ✅ No minimum MRR requirement
- ✅ $0/month

---

**The business model argument:**

This is the ProfitWell playbook. Free core product → volume → premium features and services on top.

ProfitWell (Paddle) figured out that giving away retention analytics for free built massive distribution, which funded the real business. Baremetrics went freemium. Barua did it with Hello Bar.

The pattern: when you democratize a tool that was previously gated by price, you build a moat through distribution that established players can't easily replicate. Their entire business is built on the assumption that businesses will pay $800/month. Mine is built on the assumption that 10,000 businesses × $0 + premium upsell is more defensible than 500 businesses × $500.

**Risk:** Maybe the business model doesn't work and it stays a free tool forever. But even then — this tool existing saves the community something like $3–6M/year in Churnkey fees at scale. Worth doing.

---

**The industry disruption angle:**

Churnkey's pricing model is increasingly vulnerable. Here's why:

1. **AI is commoditizing the "intelligence" layer** — the "smart" cancel flow suggestions they charge a premium for are getting cheaper to build
2. **Open source is eating SaaS** — in every category, the OSS alternative eventually captures the low/mid market
3. **Founder sophistication is rising** — the "just pay the SaaS bill" era is ending; founders are auditing their stacks

The $800/month churn recovery tool is a business model from 2018. It's not where this category is going.

---

**What I'm watching:**

- Will Churnkey respond? (They have the resources to build a free tier and kill us on brand)
- Will open source contributors improve it faster than I can internally? (Early signs: yes)
- Does the volume bet pay off, or do 10,000 free users cost more in infrastructure than they're worth?

Early results: 200+ signups in week 1, 15 in private beta, GitHub gaining stars organically.

**Curious what the startup community thinks:**

1. Is the "free core + premium edges" model sustainable for developer tools that sit this close to billing?
2. Which other SaaS categories are ripe for this treatment?
3. What's the moat if Churnkey just builds a free tier?

Let's have the real conversation about this.

---

*MIT licensed. Full source at github.com/dawoodazeeza/churnrecovery.*
```

### r/startups Rules to Follow:
- ✅ Engage with the business strategy angle — this community loves market analysis
- ✅ Acknowledge risks and counterarguments openly (builds credibility)
- ✅ Use the Indie Hackers and SideProject performance data if you have it
- ✅ Frame as industry disruption narrative, not product launch
- ❌ Don't just repost the same content — r/startups has seen this before
- ❌ Avoid overselling — this crowd is savvy, they'll push back on hype
- ❌ Don't ignore the "what's your moat?" questions — address them head-on

---

## Cross-Promotion Strategy

### Stagger Logic
- **Day 1 (Sat):** r/SideProject — test messaging, find what resonates
- **Day 2 (Sun):** r/entrepreneur — adapt successful points from Day 1 comments
- **Day 3 (Mon):** r/startups — incorporate best-performing arguments from both

### Cross-Linking
Once all three are up, add a comment to each pointing to the others:

> *"Also discussed the business model angle in r/startups if you're curious about the free tier strategy: [link]"*

Don't cross-link on Day 1 — it looks spam-y before the thread has traction.

### Timing After Indie Hackers
If you've already published the Indie Hackers post, reference it naturally:

> *"I wrote up the full story on Indie Hackers earlier this week — happy to link if that's okay here — but the short version is..."*

---

## Comment Reply Templates

### "What's the catch? / How do you make money?"
```
Honestly, the catch is that it's early and some features are still in beta. The business model is open source → volume → premium edges (advanced analytics, managed hosting, professional services later). 

The ProfitWell playbook: give away the core tool, monetize the edges. Even if we never get there, the tool existing saves people real money. I'm okay with that outcome.
```

### "Churnkey is better because [X]"
```
Fair point on [X] — they've been at this longer and have [specific advantage]. We're not there yet on [X], it's on the roadmap for Q2. 

What I'd push back on: for businesses under $15k MRR, Churnkey's minimum pricing is genuinely prohibitive. We're solving for that segment first.
```

### "This will get shut down / acquisition risk"
```
MIT licensed and fully open source — even if I shut down the hosted version, the code is public and forkable. That's intentional. The goal is for churn recovery tooling to be commoditized, not for ChurnRecovery-the-company to be irreplaceable.
```

### "I tried this and [bug/issue]"
```
Really sorry about that. Can you DM me the details or open an issue on GitHub? I'm actively fixing bugs in beta. This kind of feedback is exactly why I'm posting here.
```

### "Have you considered charging for [feature]?"
```
Yes — the plan is premium analytics, managed hosting, and professional services are the monetization path. The core recovery flows stay free. The goal is to make the basic product a commodity and compete on service quality and analytics depth.
```

### "What's your tech stack?"
```
Next.js 14 + TypeScript frontend, Node/Express backend, PostgreSQL, Resend for email delivery, hosted on Vercel. Full details in the README on GitHub. Happy to go deep on any of the architecture decisions.
```

### "Why not just use [competitor]?"
```
[Competitor] is great for [their use case]. The gap we're filling is specifically the sub-$15k MRR segment — businesses where Churnkey's $250/month minimum isn't justified. If you're at that scale and need enterprise features, [competitor] might genuinely be the better call.
```

---

## Engagement Protocol

### First 4 Hours (Critical)
- Check the post every 30 minutes
- Reply to every comment, no matter how short
- Upvote helpful questions (they boost thread visibility)
- Don't get defensive — treat criticism as feedback

### Hours 4–24
- Continue monitoring but check every 2–3 hours
- For long discussions, provide substantive responses
- If thread is gaining momentum, share to Twitter/LinkedIn

### After 24 Hours
- Thread is effectively done for engagement
- Export any standout feedback to a notes file
- Screenshot high-performing posts for social proof

---

## What to Watch For

**Good signs:**
- Technical questions → developer interest
- "How is this sustainable?" → business audience engagement
- Competitor comparisons → market validation
- "I'm going to try this" → conversion signal

**Warning signs:**
- Multiple downvotes early → messaging may not fit this sub
- "Spam" comments → may need to provide more value-first context
- No engagement after 2 hours → post timing was off, not the content

**If post underperforms:** Wait 2 weeks before posting in that sub again. Don't repost the same content.
