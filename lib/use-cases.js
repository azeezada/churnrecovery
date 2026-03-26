export const useCases = [
  {
    slug: 'b2b-saas',
    icon: '🏢',
    title: 'B2B SaaS',
    subtitle: 'Recover enterprise and SMB accounts before they churn',
    heroStat: '73%',
    heroLabel: 'of B2B cancellations may be preventable',
    color: '#2563EB',
    colorBg: '#EFF6FF',
    description: 'B2B SaaS companies face unique churn dynamics. High contract values, team-based plans, and long re-acquisition cycles mean every cancellation is costly. ChurnRecovery helps you understand the real reason behind each cancellation and present the right retention offer at the right moment.',
    challenges: [
      'High contract values make each lost customer painful',
      'Procurement cycles mean re-acquiring lost customers takes months',
      'Team plans complicate the cancel flow (who authorizes?)',
      'Annual billing means you only get one chance per year',
    ],
    solutions: [
      {
        problem: 'End-user vs admin conflict',
        solution: 'Route to admin-specific messaging and offer team training',
        icon: '👥',
      },
      {
        problem: 'Price too high',
        solution: 'Offer seat-count reduction instead of full cancellation',
        icon: '💰',
      },
      {
        problem: 'Switching to competitor',
        solution: 'Trigger competitor comparison + a retention discount',
        icon: '⚔️',
      },
      {
        problem: 'Missing features',
        solution: 'Collect feedback and route to customer success for roadmap call',
        icon: '🔧',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '31%' },
      { label: 'MRR recovered', value: '$2,400/mo avg' },
      { label: 'Time to implement', value: '< 30 min' },
    ],
    quote: {
      text: 'We were losing enterprise accounts without even knowing why. ChurnRecovery helped us understand the real reason — and save 3 out of every 10 cancellations.',
      author: 'VP of Customer Success, B2B analytics platform',
    },
    codeExample: `// Install ChurnRecovery in your B2B SaaS app
import { ChurnRecovery } from '@churnrecovery/js'

const cr = new ChurnRecovery({
  projectId: 'YOUR_PROJECT_ID',
  vertical: 'b2b-saas',
})

// Intercept your cancel button
document.getElementById('cancel-subscription').addEventListener('click', async (e) => {
  e.preventDefault()
  
  const result = await cr.showCancelFlow({
    userId: currentUser.id,
    plan: currentUser.plan,
    mrr: currentUser.mrr,
    seats: currentUser.teamSize,
  })
  
  if (result.outcome !== 'cancelled') {
    console.log('Customer saved!', result)
  }
})`,
  },
  {
    slug: 'developer-tools',
    icon: '⚡',
    title: 'Developer Tools',
    subtitle: 'Keep developers subscribed through the eval-to-paid journey',
    heroStat: '58%',
    heroLabel: 'of dev tool churn is estimated to occur in the first 90 days',
    color: '#7C3AED',
    colorBg: '#F5F3FF',
    description: 'Developers are a uniquely skeptical audience. They can smell dark patterns from a mile away and will blog about your manipulative UX. ChurnRecovery\'s developer-tool flows are designed to feel like a helpful conversation, not a retention trap — leading to better saves and better word-of-mouth.',
    challenges: [
      'Developers are skeptical of "sales-y" cancel flows',
      'Usage is often tied to project cycles, not ongoing need',
      'Free tiers create strong internal competition to your paid plan',
      'Technical users have high expectations — a bad UX will backfire',
    ],
    solutions: [
      {
        problem: 'Project paused / no active use',
        solution: 'Offer a 2-month pause — developers return when projects resume',
        icon: '⏸️',
      },
      {
        problem: 'Going back to free tier',
        solution: 'Show exactly what they\'ll lose and offer a usage-based downgrade',
        icon: '📉',
      },
      {
        problem: 'API limits too restrictive',
        solution: 'Offer a temporary limit increase as a retention incentive',
        icon: '🔑',
      },
      {
        problem: 'Evaluating alternatives',
        solution: 'Provide a no-nonsense feature comparison + a trial extension',
        icon: '⚖️',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '24%' },
      { label: 'Best performing offer', value: 'Pause subscription' },
      { label: 'Conversion on pause offer', value: '67%' },
    ],
    quote: {
      text: 'As a developer myself, I was worried our cancel flow would feel manipulative. ChurnRecovery\'s flow feels like a helpful conversation, not a dark pattern.',
      author: 'CTO, developer infrastructure startup',
    },
    codeExample: `// Developer tools integration — clean API
import { ChurnRecovery } from '@churnrecovery/js'

const cr = new ChurnRecovery({ projectId: 'YOUR_PROJECT_ID' })

// Works with any framework
cr.onCancel('cancel-btn', {
  vertical: 'developer-tools',
  user: {
    id: user.id,
    plan: user.plan,
    apiCallsThisMonth: user.usage.apiCalls,
    projectsActive: user.usage.activeProjects,
  }
})`,
  },
  {
    slug: 'media-subscriptions',
    icon: '📰',
    title: 'Media & Subscriptions',
    subtitle: 'Reduce subscriber churn on newsletters, podcasts, and content platforms',
    heroStat: '41%',
    heroLabel: 'of media cancellations may cite "too busy to consume content"',
    color: '#B45309',
    colorBg: '#FFFBEB',
    description: 'Content subscription churn is uniquely driven by engagement and habit. The best interventions are empathetic — acknowledging that life gets busy — while presenting lightweight options like pause or digest mode that keep subscribers in your ecosystem.',
    challenges: [
      'Content fatigue — subscribers get overwhelmed and disengage',
      'Monthly billing means more frequent churn opportunities',
      'Competition from free alternatives (YouTube, podcasts, newsletters)',
      'Seasonal churn spikes (January budget cuts, summer slowdowns)',
    ],
    solutions: [
      {
        problem: 'Too much email / content overload',
        solution: 'Offer a digest mode — weekly summary instead of daily sends',
        icon: '📧',
      },
      {
        problem: '"I\'m too busy right now"',
        solution: 'Offer a 1-3 month pause with automatic reactivation',
        icon: '⏰',
      },
      {
        problem: 'Price sensitivity',
        solution: 'Annual plan pitch — same content, 20% cheaper',
        icon: '💵',
      },
      {
        problem: 'Not getting value from content',
        solution: 'Ask what topics they want and route to personalization flow',
        icon: '🎯',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '28%' },
      { label: 'Most effective offer', value: 'Pause subscription' },
      { label: 'Annual upgrade rate', value: '12% of cancellations' },
    ],
    quote: {
      text: 'We\'re converting 12% of cancellation attempts into annual plan upgrades. That\'s been our biggest unexpected win.',
      author: 'Growth lead, independent media publication',
    },
    codeExample: `// Media subscription cancel flow
import { ChurnRecovery } from '@churnrecovery/js'

const cr = new ChurnRecovery({ projectId: 'YOUR_PROJECT_ID' })

// Auto-bind with data attributes
// <button data-churnrecovery="cancel">Unsubscribe</button>

cr.init({
  vertical: 'media',
  offers: {
    pause: { enabled: true, durations: [1, 3] },
    annualUpgrade: { enabled: true, discount: 20 },
    digestMode: { enabled: true },
  }
})`,
  },
  {
    slug: 'ecommerce-subscriptions',
    icon: '📦',
    title: 'E-commerce & Subscriptions',
    subtitle: 'Save subscription box and replenishment customers',
    heroStat: '35%',
    heroLabel: 'of subscription box cancellations may be due to product-fit issues',
    color: '#047857',
    colorBg: '#ECFDF5',
    description: 'Physical subscription boxes and replenishment products have high unit economics — a saved customer is often worth 4-5x what it costs to acquire them. The right cancel flow offers frequency changes and skips, which address the root causes of box subscription churn without requiring a discount.',
    challenges: [
      'Physical product subscriptions have high unit economics stakes',
      'Customers often cancel when boxes pile up (receiving too frequently)',
      'Inventory is already allocated — a save is better than a refund',
      'High volume of subscribers means automation is essential',
    ],
    solutions: [
      {
        problem: '"I have too much product"',
        solution: 'Offer to skip the next 1-2 boxes instead of cancelling',
        icon: '📦',
      },
      {
        problem: 'Frequency mismatch',
        solution: 'Switch from monthly to quarterly with one click',
        icon: '📅',
      },
      {
        problem: 'Product not matching tastes',
        solution: 'Offer a preference reset + one replacement box',
        icon: '✨',
      },
      {
        problem: 'Budget constraints',
        solution: 'Downgrade to smaller box tier rather than full cancel',
        icon: '↓',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '38%' },
      { label: 'Skip offer acceptance', value: '44%' },
      { label: 'LTV uplift from saves', value: '4.2x' },
    ],
    quote: {
      text: 'The "skip boxes" offer alone saves us $14,000 in LTV every month. At $20/month for ChurnRecovery, the math is obvious.',
      author: 'Founder, monthly subscription box company',
    },
    codeExample: `// E-commerce subscription cancel flow
import { ChurnRecovery } from '@churnrecovery/js'

const cr = new ChurnRecovery({ projectId: 'YOUR_PROJECT_ID' })

cr.showCancelFlow({
  userId: customer.id,
  subscriptionId: subscription.id,
  vertical: 'ecommerce',
  context: {
    boxesShipped: customer.boxCount,
    frequency: subscription.frequency, // 'monthly', 'quarterly'
    nextShipDate: subscription.nextShipDate,
  }
})`,
  },
  {
    slug: 'professional-services',
    icon: '👔',
    title: 'Professional Services & Agencies',
    subtitle: 'Retain retainer clients and prevent project churn',
    heroStat: '62%',
    heroLabel: 'of agency client churn may be relationship-driven, not results-driven',
    color: '#6B7280',
    colorBg: '#F9FAFB',
    description: 'Agency and professional services churn is fundamentally different — it\'s about relationships, not product features. The best cancel interventions route directly to account managers and facilitate conversations that uncover the real issue before the client walks out the door.',
    challenges: [
      'Client relationships are personal — cancel flows need to feel human',
      'Churn often signals an underlying relationship issue',
      'Contract end dates create predictable churn windows',
      'High-value retainers make every cancellation expensive',
    ],
    solutions: [
      {
        problem: 'Feeling undervalued or ignored',
        solution: 'Route to account manager immediately for relationship conversation',
        icon: '🤝',
      },
      {
        problem: '"Not seeing ROI"',
        solution: 'Trigger a results report + strategy call offer',
        icon: '📊',
      },
      {
        problem: 'Scope not matching needs',
        solution: 'Offer a scope adjustment consultation instead of cancellation',
        icon: '🔄',
      },
      {
        problem: 'Budget changes',
        solution: 'Offer a reduced-scope retainer to stay in the relationship',
        icon: '💼',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '41%' },
      { label: 'Meeting request acceptance', value: '53%' },
      { label: 'Avg retainer value saved', value: '$3,800/mo' },
    ],
    quote: {
      text: 'We\'re a boutique agency. Every client matters. ChurnRecovery gives our account managers a heads up and a script before a client disappears.',
      author: 'Operations Director, digital marketing agency',
    },
    codeExample: `// Agency portal cancel flow
import { ChurnRecovery } from '@churnrecovery/js'

const cr = new ChurnRecovery({ projectId: 'YOUR_PROJECT_ID' })

// Trigger from your client portal's "End Retainer" button
document.getElementById('end-retainer').addEventListener('click', async (e) => {
  e.preventDefault()
  
  const result = await cr.showCancelFlow({
    userId: client.id,
    vertical: 'agencies',
    context: {
      retainerValue: retainer.monthlyValue,
      accountManager: retainer.csm,
      contractMonthsRemaining: retainer.monthsLeft,
    }
  })
})`,
  },
  {
    slug: 'fintech',
    icon: '💳',
    title: 'Fintech & Financial Tools',
    subtitle: 'Keep users in your financial ecosystem',
    heroStat: '47%',
    heroLabel: 'of fintech app churn is estimated to occur after the first billing cycles',
    color: '#0F766E',
    colorBg: '#F0FDFA',
    description: 'Fintech companies face a delicate balance: you need to retain users without appearing predatory or violating the trust that financial products require. ChurnRecovery\'s soft-touch approach — pause offers, onboarding reboots, and usage-based messaging — is designed to feel helpful, not desperate.',
    challenges: [
      'Regulatory constraints limit what you can offer (no cash bribes)',
      'Users compare monthly charges against perceived value frequently',
      'Trust is paramount — aggressive cancel flows can backfire badly',
      'Some churn is healthy (graduated users, changed life circumstances)',
    ],
    solutions: [
      {
        problem: '"Not using the features I pay for"',
        solution: 'Show feature usage stats and offer an onboarding refresher',
        icon: '📱',
      },
      {
        problem: 'Found a cheaper alternative',
        solution: 'Offer a loyalty discount or feature-matched downgrade',
        icon: '🔍',
      },
      {
        problem: 'Life circumstance change',
        solution: 'Acknowledge gracefully, offer pause, stay on good terms',
        icon: '🌱',
      },
      {
        problem: 'Complexity / confusion',
        solution: 'Route to dedicated onboarding support session',
        icon: '💡',
      },
    ],
    metrics: [
      { label: 'Avg save rate', value: '22%' },
      { label: 'Pause offer uptake', value: '31%' },
      { label: 'Reactivation after pause', value: '58%' },
    ],
    quote: {
      text: 'We were concerned about compliance, but ChurnRecovery\'s offer types are all soft nudges — nothing we couldn\'t have done manually. Now it\'s automated.',
      author: 'Head of Product, personal finance platform',
    },
    codeExample: `// Fintech cancel flow — trust-first approach
import { ChurnRecovery } from '@churnrecovery/js'

const cr = new ChurnRecovery({ projectId: 'YOUR_PROJECT_ID' })

cr.showCancelFlow({
  userId: user.id,
  vertical: 'fintech',
  context: {
    plan: user.plan,
    featuresUsed: user.usage.featuresUsed,
    lastActiveDate: user.lastActiveDate,
    accountAgeDays: user.accountAgeDays,
  }
})`,
  },
]

export function getUseCaseBySlug(slug) {
  return useCases.find(uc => uc.slug === slug) || null
}

export function getAllUseCaseSlugs() {
  return useCases.map(uc => uc.slug)
}
