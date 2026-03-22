/**
 * Internal Linking Script
 * Adds /for/ links to blog posts and blog links to /for/ pages
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const postsDir = join(root, 'src', 'posts')
const forDir = join(root, 'pages', 'for')

// Helper to read/write files
const readFile = (path) => readFileSync(path, 'utf8')
const writeFile = (path, content) => writeFileSync(path, content, 'utf8')

// ─── 1. BLOG POSTS → /for/ pages ─────────────────────────────────────────
// For each post, define what related /for/ pages to link to
// and where to insert the links (before the final paragraph or at end)

const postLinks = {
  'newsletter-creator-guide-reducing-churn.md': {
    links: [
      { href: '/for/substack', label: 'ChurnRecovery for Substack creators' },
      { href: '/for/ghost', label: 'ChurnRecovery for Ghost newsletters' },
      { href: '/for/convertkit', label: 'ChurnRecovery for ConvertKit creators' },
    ],
    insertBeforePattern: '*If you\'re running a paid newsletter',
    sectionTitle: 'Tools for Your Platform',
  },
  'cancellation-emails-that-win-back-subscribers.md': {
    links: [
      { href: '/for/substack', label: 'ChurnRecovery for Substack' },
      { href: '/for/ghost', label: 'ChurnRecovery for Ghost' },
      { href: '/for/memberful', label: 'ChurnRecovery for Memberful' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Using ChurnRecovery for Your Platform',
  },
  'voluntary-vs-involuntary-churn.md': {
    links: [
      { href: '/for/stripe', label: 'ChurnRecovery for Stripe businesses' },
      { href: '/for/chargebee', label: 'ChurnRecovery for Chargebee' },
      { href: '/for/kajabi', label: 'ChurnRecovery for Kajabi' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Fix Churn on Your Platform',
  },
  'subscription-business-leaking-revenue-every-month.md': {
    links: [
      { href: '/for/substack', label: 'Substack creators' },
      { href: '/for/kajabi', label: 'Kajabi course sellers' },
      { href: '/for/stripe', label: 'Stripe-powered businesses' },
    ],
    insertAtEnd: true,
    sectionTitle: 'ChurnRecovery for Your Platform',
  },
  'hidden-revenue-leak-subscription-business.md': {
    links: [
      { href: '/for/stripe', label: 'Stripe subscription businesses' },
      { href: '/for/memberful', label: 'Memberful memberships' },
      { href: '/for/kajabi', label: 'Kajabi memberships' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Works With Your Platform',
  },
  'why-subscribers-cancel.md': {
    links: [
      { href: '/for/substack', label: 'Newsletter creators on Substack' },
      { href: '/for/patreon', label: 'Patreon creators' },
      { href: '/for/circle', label: 'Community builders on Circle' },
    ],
    insertAtEnd: true,
    sectionTitle: 'See How ChurnRecovery Handles This',
  },
  'what-is-a-cancel-flow.md': {
    links: [
      { href: '/for/kajabi', label: 'Set up a cancel flow for Kajabi →' },
      { href: '/for/stripe', label: 'Cancel flows for Stripe businesses →' },
      { href: '/for/substack', label: 'Cancel flows for Substack →' },
      { href: '/for/teachable', label: 'Cancel flows for Teachable →' },
    ],
    insertBeforePattern: '*ChurnRecovery is free churn recovery',
    sectionTitle: 'Set Up a Cancel Flow on Your Platform',
  },
  'Cancel-Flow-Examples.md': {
    links: [
      { href: '/for/kajabi', label: 'Kajabi cancel flow setup (no coding)' },
      { href: '/for/stripe', label: 'Stripe cancel flow guide' },
      { href: '/for/substack', label: 'Substack cancel flow options' },
    ],
    insertBeforePattern: '*ChurnRecovery provides free, open-source',
    sectionTitle: 'Build This for Your Platform',
  },
  'Involuntary-Churn-Recovery.md': {
    links: [
      { href: '/for/stripe', label: 'Dunning & recovery for Stripe businesses' },
      { href: '/for/chargebee', label: 'ChurnRecovery for Chargebee' },
      { href: '/for/lemon-squeezy', label: 'ChurnRecovery for Lemon Squeezy' },
    ],
    insertBeforePattern: '*ChurnRecovery provides free dunning',
    sectionTitle: 'Platform-Specific Recovery Guides',
  },
  'Payment-Failure-Recovery.md': {
    links: [
      { href: '/for/stripe', label: 'Payment recovery for Stripe subscriptions' },
      { href: '/for/chargebee', label: 'ChurnRecovery for Chargebee billing' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Recovery for Your Platform',
  },
  'Ultimate-Guide-SaaS-Churn.md': {
    links: [
      { href: '/for/stripe', label: 'Stripe businesses' },
      { href: '/for/kajabi', label: 'Kajabi course creators' },
      { href: '/for/substack', label: 'Newsletter creators' },
      { href: '/for/chargebee', label: 'Chargebee billing' },
    ],
    insertAtEnd: true,
    sectionTitle: 'ChurnRecovery Works With Your Stack',
  },
  'B2B-SaaS-Churn-Benchmarks-2025.md': {
    links: [
      { href: '/for/stripe', label: 'Stripe-powered SaaS' },
      { href: '/for/chargebee', label: 'Chargebee billing' },
      { href: '/for/lemon-squeezy', label: 'Lemon Squeezy subscriptions' },
    ],
    insertAtEnd: true,
    sectionTitle: 'ChurnRecovery for Your Billing Stack',
  },
  'churnkey-alternatives-ranked.md': {
    links: [
      { href: '/for/stripe', label: 'ChurnRecovery for Stripe (free)' },
      { href: '/for/kajabi', label: 'ChurnRecovery for Kajabi (free)' },
      { href: '/for/chargebee', label: 'ChurnRecovery for Chargebee (free)' },
    ],
    insertAtEnd: true,
    sectionTitle: 'ChurnRecovery on Your Platform',
  },
  'free-alternatives-churnkey-profitwell-baremetrics.md': {
    links: [
      { href: '/for/stripe', label: 'ChurnRecovery for Stripe' },
      { href: '/for/substack', label: 'ChurnRecovery for Substack' },
      { href: '/for/kajabi', label: 'ChurnRecovery for Kajabi' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Get ChurnRecovery Free for Your Platform',
  },
  'membership-site-churn-rate.md': {
    links: [
      { href: '/for/memberful', label: 'ChurnRecovery for Memberful' },
      { href: '/for/circle', label: 'ChurnRecovery for Circle communities' },
      { href: '/for/patreon', label: 'ChurnRecovery for Patreon' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Reduce Churn on Your Membership Platform',
  },
  'online-community-churn-rate.md': {
    links: [
      { href: '/for/circle', label: 'ChurnRecovery for Circle' },
      { href: '/for/patreon', label: 'ChurnRecovery for Patreon creators' },
      { href: '/for/memberful', label: 'ChurnRecovery for Memberful communities' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Cancel Flow for Your Community Platform',
  },
  'newsletter-creator-case-study-saved-3600-year.md': {
    links: [
      { href: '/for/substack', label: 'ChurnRecovery for Substack' },
      { href: '/for/ghost', label: 'ChurnRecovery for Ghost' },
      { href: '/for/convertkit', label: 'ChurnRecovery for ConvertKit/Kit' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Set This Up for Your Newsletter',
  },
  'Why-Churn-Recovery-Is-Free.md': {
    links: [
      { href: '/for/stripe', label: 'ChurnRecovery for Stripe businesses' },
      { href: '/for/substack', label: 'ChurnRecovery for Substack' },
      { href: '/for/kajabi', label: 'ChurnRecovery for Kajabi' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Start Free on Your Platform',
  },
  'chargebee-retain-vs-churnkey-vs-churnrecovery.md': {
    links: [
      { href: '/for/chargebee', label: 'ChurnRecovery for Chargebee (free)' },
      { href: '/for/stripe', label: 'ChurnRecovery for Stripe (free)' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Try ChurnRecovery Free on Your Platform',
  },
  'dunning-management-guide-small-business.md': {
    links: [
      { href: '/for/stripe', label: 'Stripe dunning with ChurnRecovery' },
      { href: '/for/kajabi', label: 'Kajabi payment recovery' },
      { href: '/for/chargebee', label: 'Chargebee dunning guide' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Dunning Setup for Your Platform',
  },
  'building-churnrecovery-without-spending-marketing.md': {
    links: [
      { href: '/for/substack', label: 'ChurnRecovery for Substack' },
      { href: '/for/kajabi', label: 'ChurnRecovery for Kajabi' },
      { href: '/for/stripe', label: 'ChurnRecovery for Stripe businesses' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Try It on Your Platform',
  },
  'saas-pricing-audit-tools-that-should-cost-less.md': {
    links: [
      { href: '/for/stripe', label: 'ChurnRecovery for Stripe (free)' },
      { href: '/for/kajabi', label: 'ChurnRecovery for Kajabi (free)' },
    ],
    insertAtEnd: true,
    sectionTitle: 'ChurnRecovery: Free for Your Platform',
  },
  'why-churnkey-costs-250-month-and-we-are-free.md': {
    links: [
      { href: '/for/stripe', label: 'Stripe businesses' },
      { href: '/for/substack', label: 'Substack creators' },
      { href: '/for/kajabi', label: 'Kajabi course sellers' },
    ],
    insertAtEnd: true,
    sectionTitle: 'Get ChurnRecovery Free for Your Platform',
  },
}

// Build the related links block for a post
function buildPostLinksBlock(title, links) {
  const linkLines = links.map(l => `- [${l.label}](${l.href})`).join('\n')
  return `\n\n---\n\n## ${title}\n\n${linkLines}`
}

let updatedPosts = 0

for (const [filename, config] of Object.entries(postLinks)) {
  const filepath = join(postsDir, filename)
  let content
  try {
    content = readFile(filepath)
  } catch (e) {
    console.warn(`Skipping ${filename} — file not found`)
    continue
  }

  // Skip if already has /for/ links (this was already partially done for some)
  // Actually we check if it has the specific /for/ links we're adding
  const hasAnyForLink = config.links.some(l => content.includes(l.href))
  if (hasAnyForLink) {
    console.log(`Skipping ${filename} — already has /for/ links`)
    continue
  }

  const block = buildPostLinksBlock(config.sectionTitle, config.links)

  let newContent
  if (config.insertBeforePattern && content.includes(config.insertBeforePattern)) {
    newContent = content.replace(config.insertBeforePattern, block + '\n\n' + config.insertBeforePattern)
  } else {
    // Append at end
    newContent = content.trimEnd() + block + '\n'
  }

  writeFile(filepath, newContent)
  console.log(`✅ Updated ${filename}`)
  updatedPosts++
}

console.log(`\n✅ Updated ${updatedPosts} blog posts with /for/ links`)

// ─── 2. /for/ pages → blog posts ─────────────────────────────────────────

const forPageLinks = {
  'substack.js': {
    posts: [
      { href: '/posts/newsletter-creator-guide-reducing-churn', label: 'The Newsletter Creator\'s Guide to Reducing Churn', desc: '6 proven tactics for keeping paid subscribers' },
      { href: '/posts/newsletter-creator-case-study-saved-3600-year', label: 'Case Study: How to Save $3,600/Year on Churn Tools', desc: 'Real numbers from a Beehiiv newsletter operator' },
      { href: '/posts/cancellation-emails-that-win-back-subscribers', label: '5 Cancellation Emails That Actually Win Back Subscribers', desc: 'Copy-paste templates with proven win-back rates' },
    ],
  },
  'ghost.js': {
    posts: [
      { href: '/posts/ghost-vs-substack-vs-beehiiv-paid-subscribers', label: 'Ghost vs Substack vs Beehiiv: Paid Subscribers Compared', desc: 'Which platform keeps subscribers longer?' },
      { href: '/posts/newsletter-creator-guide-reducing-churn', label: 'The Newsletter Creator\'s Guide to Reducing Churn', desc: '6 tactics for newsletter creators on any platform' },
      { href: '/posts/cancellation-emails-that-win-back-subscribers', label: '5 Cancellation Emails That Actually Win Back Subscribers', desc: 'Templates proven to recover lapsed subscribers' },
    ],
  },
  'kajabi.js': {
    posts: [
      { href: '/posts/kajabi-cancel-flow-setup-without-coding', label: 'How to Set Up a Cancel Flow for Kajabi (No Coding)', desc: 'Step-by-step guide with copy-paste scripts' },
      { href: '/posts/reduce-churn-online-course-business', label: 'How to Reduce Churn in Your Online Course Business', desc: 'Tactics specific to course creators and educators' },
      { href: '/posts/what-is-a-cancel-flow', label: 'What Is a Cancel Flow? (And Why You Need One)', desc: 'The case for adding a cancel flow to any membership' },
    ],
  },
  'teachable.js': {
    posts: [
      { href: '/posts/reduce-churn-online-course-business', label: 'How to Reduce Churn in Your Online Course Business', desc: 'Retention tactics for Teachable course creators' },
      { href: '/posts/what-is-a-cancel-flow', label: 'What Is a Cancel Flow? (And Why You Need One)', desc: 'Understand the fundamentals of retention flows' },
      { href: '/posts/Cancel-Flow-Examples', label: '7 Cancel Flow Examples That Actually Save Customers', desc: 'Real patterns you can implement today' },
    ],
  },
  'stripe.js': {
    posts: [
      { href: '/posts/voluntary-vs-involuntary-churn', label: 'Voluntary vs Involuntary Churn: What\'s the Difference?', desc: 'How to tackle both types of churn for Stripe businesses' },
      { href: '/posts/Payment-Failure-Recovery', label: 'Payment Failure Recovery: The Complete Guide', desc: 'Smart retry strategies and dunning best practices' },
      { href: '/posts/Involuntary-Churn-Recovery', label: 'Involuntary Churn Recovery: What Actually Works', desc: 'Technical guide to recovering failed Stripe payments' },
    ],
  },
  'convertkit.js': {
    posts: [
      { href: '/posts/newsletter-creator-guide-reducing-churn', label: 'The Newsletter Creator\'s Guide to Reducing Churn', desc: '6 tactics including ConvertKit-specific tips' },
      { href: '/posts/cancellation-emails-that-win-back-subscribers', label: '5 Cancellation Emails That Actually Win Back Subscribers', desc: 'Templates for your win-back sequences' },
      { href: '/posts/newsletter-creator-case-study-saved-3600-year', label: 'Newsletter Case Study: Saving $3,600/Year on Churn Tools', desc: 'Real numbers from a newsletter creator\'s journey' },
    ],
  },
  'memberful.js': {
    posts: [
      { href: '/posts/how-to-retain-paying-members', label: 'How to Retain Paying Members (The Definitive Guide)', desc: 'Battle-tested tactics for membership site owners' },
      { href: '/posts/membership-site-churn-rate', label: 'Membership Site Churn Rate: What\'s Normal?', desc: 'Industry benchmarks and how to beat them' },
      { href: '/posts/discount-vs-pause-vs-cancel-what-saves-subscribers', label: 'Discount vs Pause vs Cancel: What Actually Saves Subscribers?', desc: 'Data on which offers work best for memberships' },
    ],
  },
  'patreon.js': {
    posts: [
      { href: '/posts/online-community-churn-rate', label: 'Online Community Churn: Why Members Leave', desc: 'Emotional and practical reasons creators lose patrons' },
      { href: '/posts/why-subscribers-cancel', label: '7 Reasons Subscribers Cancel (And What to Say)', desc: 'Scripts for handling each type of cancellation' },
      { href: '/posts/discount-vs-pause-vs-cancel-what-saves-subscribers', label: 'Discount vs Pause vs Cancel: What Saves Subscribers?', desc: 'What offers work best for creator memberships' },
    ],
  },
  'chargebee.js': {
    posts: [
      { href: '/posts/voluntary-vs-involuntary-churn', label: 'Voluntary vs Involuntary Churn: Fix Both', desc: 'Complete framework for Chargebee-powered businesses' },
      { href: '/posts/dunning-management-guide-small-business', label: 'Dunning Management Guide for Small Businesses', desc: 'Step-by-step dunning setup with templates' },
      { href: '/posts/chargebee-retain-vs-churnkey-vs-churnrecovery', label: 'Chargebee Retain vs Churnkey vs ChurnRecovery', desc: 'Side-by-side comparison to help you choose' },
    ],
  },
  'circle.js': {
    posts: [
      { href: '/posts/online-community-churn-rate', label: 'Online Community Churn: Why Members Leave', desc: 'Deep dive into community-specific churn patterns' },
      { href: '/posts/membership-site-churn-rate', label: 'Membership Site Churn Rate: What\'s Normal?', desc: 'Benchmarks for community platforms like Circle' },
      { href: '/posts/how-to-retain-paying-members', label: 'How to Retain Paying Members', desc: 'Tactics proven to work for online communities' },
    ],
  },
  'ghost.js': {
    posts: [
      { href: '/posts/ghost-vs-substack-vs-beehiiv-paid-subscribers', label: 'Ghost vs Substack vs Beehiiv: Paid Subscribers Compared', desc: 'How Ghost stacks up for paid newsletter retention' },
      { href: '/posts/newsletter-creator-guide-reducing-churn', label: 'The Newsletter Creator\'s Guide to Reducing Churn', desc: '6 tactics for Ghost newsletter operators' },
      { href: '/posts/cancellation-emails-that-win-back-subscribers', label: '5 Cancellation Emails That Actually Win Back Subscribers', desc: 'Win-back templates for any newsletter platform' },
    ],
  },
  'lemon-squeezy.js': {
    posts: [
      { href: '/posts/voluntary-vs-involuntary-churn', label: 'Voluntary vs Involuntary Churn: How to Fix Both', desc: 'Framework for subscription businesses on any platform' },
      { href: '/posts/what-is-a-cancel-flow', label: 'What Is a Cancel Flow?', desc: 'The basics of building a retention flow' },
      { href: '/posts/free-alternatives-churnkey-profitwell-baremetrics', label: 'Free Alternatives to Churnkey and ProfitWell', desc: 'Why paying $250/month for churn tools is optional' },
    ],
  },
  'podia.js': {
    posts: [
      { href: '/posts/reduce-churn-online-course-business', label: 'How to Reduce Churn in Your Online Course Business', desc: 'Tactics for Podia course and membership creators' },
      { href: '/posts/what-is-a-cancel-flow', label: 'What Is a Cancel Flow?', desc: 'Add a retention flow to any Stripe-powered platform' },
      { href: '/posts/discount-vs-pause-vs-cancel-what-saves-subscribers', label: 'Discount vs Pause vs Cancel: What Saves Subscribers?', desc: 'Pick the right offer for your Podia audience' },
    ],
  },
  'thinkific.js': {
    posts: [
      { href: '/posts/reduce-churn-online-course-business', label: 'How to Reduce Churn in Your Online Course Business', desc: 'Retention tactics for Thinkific course creators' },
      { href: '/posts/Cancel-Flow-Examples', label: '7 Cancel Flow Examples That Actually Save Customers', desc: 'Real patterns you can implement for any course platform' },
      { href: '/posts/churn-prevention-strategies-coaching', label: 'Churn Prevention Strategies for Coaches', desc: 'Relevant tactics for knowledge-product businesses' },
    ],
  },
  'wordpress.js': {
    posts: [
      { href: '/posts/woocommerce-subscription-cancel-flow', label: 'WooCommerce Subscription Cancel Flow: Full Setup Guide', desc: 'Step-by-step guide for WordPress/WooCommerce operators' },
      { href: '/posts/voluntary-vs-involuntary-churn', label: 'Voluntary vs Involuntary Churn: Fix Both', desc: 'Framework for WordPress subscription businesses' },
      { href: '/posts/what-is-a-cancel-flow', label: 'What Is a Cancel Flow?', desc: 'The case for adding a cancel flow to any membership' },
    ],
  },
  'wix.js': {
    posts: [
      { href: '/posts/what-is-a-cancel-flow', label: 'What Is a Cancel Flow?', desc: 'Add a retention layer to your Wix subscriptions' },
      { href: '/posts/voluntary-vs-involuntary-churn', label: 'Voluntary vs Involuntary Churn: Fix Both', desc: 'Framework for any subscription business' },
      { href: '/posts/subscription-business-leaking-revenue-every-month', label: 'Your Subscription Business Is Leaking Revenue', desc: 'The math behind monthly churn and how to stop it' },
    ],
  },
  'stan-store.js': {
    posts: [
      { href: '/posts/reduce-churn-online-course-business', label: 'How to Reduce Churn in Your Online Course Business', desc: 'Tactics for digital product creators on Stan Store' },
      { href: '/posts/why-subscribers-cancel', label: '7 Reasons Subscribers Cancel (And What to Say)', desc: 'Scripts for handling creator membership cancellations' },
      { href: '/posts/discount-vs-pause-vs-cancel-what-saves-subscribers', label: 'Discount vs Pause vs Cancel: What Saves Subscribers?', desc: 'Proven offers for creator-led memberships' },
    ],
  },
  'squarespace.js': {
    posts: [
      { href: '/posts/what-is-a-cancel-flow', label: 'What Is a Cancel Flow?', desc: 'Add a retention layer to Squarespace subscriptions' },
      { href: '/posts/subscription-business-leaking-revenue-every-month', label: 'Your Subscription Business Is Leaking Revenue', desc: 'The math on monthly churn losses' },
      { href: '/posts/hidden-revenue-leak-subscription-business', label: 'The Hidden Revenue Leak in Your Subscription Business', desc: 'Find and fix the leaks in your billing' },
    ],
  },
  'payhip.js': {
    posts: [
      { href: '/posts/reduce-churn-online-course-business', label: 'How to Reduce Churn in Your Online Course Business', desc: 'Tactics for Payhip course and product creators' },
      { href: '/posts/what-is-a-cancel-flow', label: 'What Is a Cancel Flow?', desc: 'The retention layer every subscription needs' },
      { href: '/posts/subscription-business-leaking-revenue-every-month', label: 'Your Subscription Business Is Leaking Revenue', desc: 'Why 3% monthly churn is a silent killer' },
    ],
  },
  'beehiiv.js': {
    posts: [
      { href: '/posts/newsletter-creator-guide-reducing-churn', label: 'The Newsletter Creator\'s Guide to Reducing Churn', desc: 'Beehiiv-compatible tactics to keep paid subscribers' },
      { href: '/posts/newsletter-creator-case-study-saved-3600-year', label: 'Case Study: Saving $3,600/Year on Churn Tools', desc: 'Real story of a Beehiiv newsletter operator' },
      { href: '/posts/cancellation-emails-that-win-back-subscribers', label: '5 Cancellation Emails That Win Back Subscribers', desc: 'Templates for newsletter win-back sequences' },
    ],
  },
}

// Build React JSX for the related articles section
function buildRelatedSection(posts) {
  const items = posts.map(p => `              <a
                href="${p.href}"
                className="block bg-brand-bg border border-brand-border rounded-[10px] p-5 hover:border-brand-accent/40 transition-colors no-underline group"
              >
                <div className="font-sans font-semibold text-[0.92rem] text-brand-text group-hover:text-brand-accent transition-colors mb-1">
                  ${p.label}
                </div>
                <div className="font-serif text-[0.82rem] text-brand-gray leading-[1.5]">
                  ${p.desc}
                </div>
              </a>`).join('\n')

  return `
        {/* ─── SECTION 6.5: RELATED RESOURCES ──────────────────────────── */}
        <section className="py-[60px] px-6 bg-brand-white border-t border-brand-border">
          <div className="max-w-[720px] mx-auto">
            <h2 className="font-sans font-bold text-[1.2rem] text-brand-text mb-6 tracking-[-0.01em]">
              📖 Related Reading
            </h2>
            <div className="grid gap-3">
${items}
            </div>
          </div>
        </section>
`
}

let updatedForPages = 0

for (const [filename, config] of Object.entries(forPageLinks)) {
  const filepath = join(forDir, filename)
  let content
  try {
    content = readFile(filepath)
  } catch (e) {
    console.warn(`Skipping ${filename} — file not found`)
    continue
  }

  // Check if already has related resources section
  if (content.includes('Related Reading') || content.includes('SECTION 6.5')) {
    console.log(`Skipping ${filename} — already has related section`)
    continue
  }

  // Insert before SECTION 7 (Final CTA) — handles various comment formats
  const patterns = [
    `        {/* ─── SECTION 7: FINAL CTA`,
    `        {/* FINAL CTA */}`,
    `        {/* ─── FINAL CTA`,
  ]
  const matchedPattern = patterns.find(p => content.includes(p))
  if (!matchedPattern) {
    // Try generic regex
    const genericMatch = content.match(/\s+\{\/\*[─\s]*FINAL CTA/)
    if (!genericMatch) {
      console.warn(`Skipping ${filename} — couldn't find insertion point`)
      continue
    }
  }

  const insertBefore = matchedPattern || patterns[0]
  const section = buildRelatedSection(config.posts)
  const newContent = content.replace(insertBefore, section + insertBefore)

  writeFile(filepath, newContent)
  console.log(`✅ Updated /for/${filename}`)
  updatedForPages++
}

console.log(`\n✅ Updated ${updatedForPages} /for/ pages with blog post links`)
console.log(`\nDone! Total files updated: ${updatedPosts + updatedForPages}`)
