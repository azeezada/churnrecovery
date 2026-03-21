/**
 * Structured data (JSON-LD) schemas for blog posts.
 * Keyed by post slug. Each value is an array of schema objects.
 * These are injected into <Head> via [slug].js.
 */

export const postSchemas = {
  'why-subscribers-cancel': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why do subscribers cancel memberships?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Subscribers cancel for 7 main reasons: they're not using it enough to justify the cost (the #1 reason), it's too expensive right now, they're not getting results, they found something better, they're overwhelmed, they only needed it for a specific thing, or they didn't feel part of a community.",
          },
        },
        {
          '@type': 'Question',
          name: 'What do you say to stop a subscriber from canceling?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The most effective response depends on the cancellation reason. For 'not using it enough,' offer a pause: 'Would it help to pause your membership for 30 days?' For price concerns, offer a downgrade or reduced-access plan. For overwhelm, offer a 60-day pause.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the single best intervention to reduce subscriber churn?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An automated cancel flow — a short interactive sequence that runs the moment someone tries to cancel. It asks why they\'re canceling, serves the right response based on their answer (pause, discount, or downgrade offer), and lets them confirm if they still want to cancel. Done right, a cancel flow saves 20–35% of cancellations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does a pause offer really help reduce cancellations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes. A pause offer converts 15–25% of people who say they're 'not using it enough' or who are overwhelmed. The psychology is that 'cancel' feels permanent while 'pause' feels manageable. Most paused members come back.",
          },
        },
        {
          '@type': 'Question',
          name: "What's the difference between a pause offer and a discount offer for retention?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pause offers work best when subscribers cite being busy, overwhelmed, or underusing the product. Discount offers work better for price-sensitive cancellations. A well-designed cancel flow can offer both — pause first, then a discount to those who decline the pause.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I know why my subscribers are canceling?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The best way is an exit survey served at the moment of cancellation. Ask 2–3 questions: why are you canceling, what could we have done differently, would you come back? Review the data monthly. Patterns emerge within 90 days.",
          },
        },
        {
          '@type': 'Question',
          name: 'Can I automate subscriber retention without manually responding to every cancellation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes. An automated cancel flow handles retention at scale. It runs automatically on every cancellation attempt — serving pause offers, discounts, or downgrade options without any manual work. ChurnRecovery is a free tool that sets this up for newsletters, memberships, and coaching retainers.",
          },
        },
      ],
    },
  ],

  'membership-site-churn-rate': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a normal churn rate for a membership site?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '5–8% monthly churn is common for membership sites. 2–3% is achievable with deliberate retention practices. At 6% monthly churn you lose roughly 52% of your membership base every year, so even getting to 3% has a huge impact on revenue.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you calculate membership site churn rate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Monthly Churn Rate = (Members who canceled this month ÷ Members at start of month) × 100. Example: 500 members at start of June, 30 cancel = 30 ÷ 500 × 100 = 6% monthly churn.',
          },
        },
        {
          '@type': 'Question',
          name: 'What separates low-churn membership sites from high-churn ones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Four main factors: (1) They have a community, not just content — community creates switching costs that content never will. (2) They have a cancel flow that saves 20–35% of cancellation attempts. (3) They treat onboarding as a priority, especially the first 30 days. (4) They use exit surveys to understand why people leave and act on the data.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does reducing churn actually impact revenue?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For a 500-member site at $49/month: at 7% monthly churn you lose $1,715/month and need 35 new members just to stay flat. At 3% churn you lose only $735/month and need 15 new members. The difference is $980/month — nearly $12,000/year you keep without acquiring a single new customer.',
          },
        },
        {
          '@type': 'Question',
          name: 'What exit survey questions should I ask when members cancel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Three questions work well: (1) What's the main reason you're canceling? (options: not using it enough, too expensive, not getting results, found something better, taking a break, other). (2) Is there anything we could have done differently? (open text). (3) Would you come back in the future? Review the data monthly — patterns emerge within 90 days.",
          },
        },
      ],
    },
  ],

  'reduce-churn-online-course-business': [
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Reduce Churn for Your Online Course Business',
      description: '5 concrete tactics to reduce churn for your online course or subscription membership on Kajabi, Teachable, Thinkific, or Podia.',
      totalTime: 'P1M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Add a Cancel Flow',
          text: 'Set up an automated cancel flow that intercepts the moment someone clicks cancel. Show a pause option, discount offer, or downgrade option. A well-designed cancel flow saves 20–35% of people who try to cancel. ChurnRecovery is free and connects to Stripe (which Kajabi and Teachable use under the hood) with no coding required.',
          url: 'https://churnrecovery.com/posts/reduce-churn-online-course-business#tactic-1-add-a-cancel-flow-the-highest-roi-fix',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Set Up Dunning Emails for Failed Payments',
          text: 'A large portion of course churn is involuntary — students whose cards expired got quietly dropped. Set up a 3-email dunning sequence: Day 1 friendly heads-up, Day 4 urgency ("access pauses in 3 days"), Day 7 loss framing ("your access ends today"). Even a 10% recovery rate on failed payments adds hundreds per month back.',
          url: 'https://churnrecovery.com/posts/reduce-churn-online-course-business#tactic-2-set-up-dunning-emails-for-failed-payments',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Offer a Pause Option',
          text: "Add a pause option so students who are overwhelmed or cutting expenses temporarily don't have to fully cancel. If cancel is the only option, they cancel. If you offer 30–60 day pause, many take it instead. Most paused members return after the pause period ends.",
          url: 'https://churnrecovery.com/posts/reduce-churn-online-course-business#tactic-3-offer-a-pause-option-not-just-cancel',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Send Check-In Emails at 30 and 60 Days',
          text: 'The highest-risk period for course churn is weeks 3–8. Send a proactive check-in at week 3 ("where are you in the course?") and week 6 ("here is what students usually get stuck on"). These emails re-activate engagement before students mentally check out and cancel.',
          url: 'https://churnrecovery.com/posts/reduce-churn-online-course-business#tactic-4-send-check-in-emails-at-the-30-and-60-day-mark',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Build a Community',
          text: "Students cancel courses. They don't cancel communities. Even a small active Discord or Kajabi Community of 50–200 students where you show up regularly creates a retention flywheel. Course programs with active communities have 40–60% lower churn than standalone video courses.",
          url: 'https://churnrecovery.com/posts/reduce-churn-online-course-business#tactic-5-build-a-community-even-a-small-one',
        },
      ],
    },
  ],

  'how-to-retain-paying-members': [
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Retain Paying Members: 5 Proven Tactics for Membership Sites',
      description: 'Practical steps membership site owners use to reduce churn — from cancel flows to community building — without becoming a full-time customer success team.',
      totalTime: 'P1M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Add a Cancel Flow',
          text: 'Set up an automated cancel flow that intercepts the moment a member tries to cancel. Instead of losing them immediately, the cancel flow offers alternatives: a pause option, a discount, or a downgrade. A well-designed cancel flow saves 20–35% of cancellation attempts. ChurnRecovery adds this to any Stripe-based membership site for free.',
          url: 'https://churnrecovery.com/posts/how-to-retain-paying-members#1-fix-the-moment-members-cancel-your-cancel-flow',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Offer a Pause Before a Cancel',
          text: "Add a pause option so members who are busy, overwhelmed, or temporarily short on budget can stop paying for 30–90 days and return without re-signing up. Operators who add a pause option typically see 10–20% of would-be cancelers use it. Most paused members come back.",
          url: 'https://churnrecovery.com/posts/how-to-retain-paying-members#2-offer-a-pause-before-a-cancel',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Remind Members of the Value They\'re Getting',
          text: 'Send value reminder emails: a monthly summary of what was published, anniversary emails at 3-month or 1-year milestones, and progress summaries. Help members see the invisible value so when they consider canceling, they can fill in the benefit column accurately.',
          url: 'https://churnrecovery.com/posts/how-to-retain-paying-members#3-remind-members-of-the-value-theyre-getting',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Reach Out Personally When You See Warning Signs',
          text: 'Watch for disengagement signals: no login in 30+ days, stopped opening emails, billing failure. For high-tier members showing these signs, a personal outreach — not an automated email — can turn things around. For others, an automated re-engagement sequence does lighter version of this work.',
          url: 'https://churnrecovery.com/posts/how-to-retain-paying-members#4-reach-out-personally-when-you-see-warning-signs',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Build Community, Not Just Content',
          text: "Members cancel courses. They don't cancel communities. Building an active community — even a small Discord or forum of 50–200 members where you show up regularly — creates retention through relationships. Members who are connected to other members stay longer because leaving means leaving those relationships too.",
          url: 'https://churnrecovery.com/posts/how-to-retain-paying-members#5-build-community-not-just-content',
        },
      ],
    },
  ],

  'hidden-revenue-leak-subscription-business': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the hidden revenue leak in subscription businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The hidden revenue leak is churn — subscribers who cancel every month while you're focused on acquiring new ones. At 4% monthly churn with 200 members at $50/month, you lose $400 MRR per month. But because each cancellation represents lost lifetime value (not just one month), the real annual loss can be $57,600 or more — even at that small scale.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why don\'t subscription business owners notice the revenue leak?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Churn is easy to miss for two reasons: new sign-ups mask cancellations when you're growing (the bucket looks full even as it leaks), and cancellations feel less dramatic than failed sales. Most owners focus on the revenue coming in, not the revenue walking out the door.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is voluntary churn and how do you fix it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Voluntary churn is when members consciously decide to cancel. Most voluntary cancellations happen because the timing isn't right, they're not getting recent value, or they found something cheaper — not because they hate the product. The fix is a cancel flow: an automated sequence that appears before cancellation is finalized, offering a pause, discount, or downgrade. Cancel flows save 20–35% of attempted cancellations.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is involuntary churn and how do you recover it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Involuntary churn happens when members' payments fail — expired cards, bank declines, fraud holds. These are customers who wanted to stay. The fix is dunning: an automated 3-email sequence that notifies members of failed payments, provides an easy link to update their card, and keeps the account active while they fix it. A basic dunning sequence recovers 20–40% of failed-payment churn.",
          },
        },
        {
          '@type': 'Question',
          name: 'Is it cheaper to retain customers or acquire new ones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Retaining is dramatically cheaper. Acquiring a new customer typically costs 5–10x more than keeping an existing one. If your customer acquisition cost is $150, you spend $150 to replace a canceled subscriber. The same $150 invested in a cancel flow or dunning setup might save 20–30 subscribers over the course of a year.",
          },
        },
        {
          '@type': 'Question',
          name: 'What are the three numbers every subscription business owner should track?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "1. Monthly Churn Rate: (Cancellations this month ÷ Active subscribers at start of month) × 100. Healthy is under 2%; 4–6% is damaging. 2. Failed Payment Rate: what percentage of your cancellations are due to payment failure vs. active cancellation? Above 20% means dunning is your fastest win. 3. Revenue at Risk: multiply your current MRR × your monthly churn rate to see what you're losing each month.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do I know if my subscription business has a churn problem?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Calculate your monthly churn rate: divide your cancellations last month by your active subscribers at the start of the month, then multiply by 100. If it's above 2%, you have room to improve. Above 4% is a serious business problem worth fixing before trying to grow. Use ChurnRecovery's free churn rate calculator to see the annualized impact.",
          },
        },
      ],
    },
  ],

  'discount-vs-pause-vs-cancel-what-saves-subscribers': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Should I offer a discount or a pause when a subscriber tries to cancel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It depends on why they're canceling. Offer a discount when the subscriber's reason is price or budget — they're otherwise engaged but financially stretched. Offer a pause when their reason is timing — they're busy, overwhelmed, or life got in the way. The best cancel flows ask why they're leaving first, then serve the right offer based on the answer.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the typical save rate for a discount offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "25–40% of subscribers who see a relevant discount offer will accept it. 'Relevant' is the key word — the discount needs to match their actual reason for canceling. Offering a discount to someone who says they're 'too busy to use it' solves the wrong problem and has a much lower save rate.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the typical save rate for a pause offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "15–25% of at-risk subscribers will choose a pause when offered. While this is lower than the discount save rate, the return rate is far higher: paused subscribers return at 60–70% vs. 15–20% for canceled subscribers. A paused subscriber who returns and stays for 4–6 more months is worth more than a discounted subscriber who stays at a reduced rate.",
          },
        },
        {
          '@type': 'Question',
          name: 'Is it ever right to let a subscriber cancel without making an offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes. Some subscribers should be let go cleanly: those who are genuinely done and have outgrown the product, those who are angry or frustrated (where a retention offer can make things worse), and those at a price point where a discount or pause costs more than their long-term value. A clean exit handled gracefully — with one exit survey question — leaves the door open for return and generates data that improves your business.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the risk of offering discounts to cancel subscribers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Two risks: First, your effective revenue per subscriber drops — you keep them, but at a lower price. Second, if the pattern spreads, subscribers learn that canceling gets a deal, so you'll see more manufactured cancellations. The fix is to gate discounts behind exit survey responses — only show the discount offer to subscribers who cite price or budget as their cancellation reason.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best sequence for a cancel flow?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Step 1: Show an exit survey first — ask why they're canceling. Step 2: Based on their answer, lead with the pause offer (no immediate revenue cost, non-committal). Step 3: If they decline the pause, show a time-limited discount (e.g., '25% off your next two months'). Step 4: If they decline both, accept the cancellation gracefully and give them an easy path to return. This sequence achieves the best overall save rate because it personalizes the offer.",
          },
        },
        {
          '@type': 'Question',
          name: 'What percentage of canceled subscribers typically come back?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Roughly 15–20% of canceled subscribers eventually resubscribe if the cancellation experience was positive. Paused subscribers return at a much higher rate: 60–70%. This is why the pause offer is often more valuable than it appears — the 'save rate' looks lower, but the long-term subscriber value is significantly higher than a discount that keeps someone at a reduced rate.",
          },
        },
      ],
    },
  ],

  'kajabi-cancel-flow-setup-without-coding': [
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Set Up a Cancel Flow for Your Kajabi Membership (Without Coding)',
      description: 'Set up an automated cancel flow for your Kajabi membership in 3 steps using ChurnRecovery — no coding required.',
      totalTime: 'PT15M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Connect Your Stripe Account',
          text: 'Go to churnrecovery.com and sign up for early access. Once in, click "Connect Stripe Account" and authorize ChurnRecovery to read your Stripe subscription data. This takes 3 clicks. You do not touch Kajabi at all — this connection is between ChurnRecovery and your Stripe account, which Kajabi already uses.',
          url: 'https://churnrecovery.com/posts/kajabi-cancel-flow-setup-without-coding#step-1-connect-your-stripe-account-3-clicks',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Customize Your Cancel Flow',
          text: 'Configure what happens when a member hits cancel. Set up a Pause Offer (subscriber can pause 1–3 months instead of canceling), a Discount Offer (one-time discount like 50% off for 2 months), and/or an Exit Survey (capture why they\'re leaving). You can combine all three — show pause first, then discount, then survey regardless of outcome.',
          url: 'https://churnrecovery.com/posts/kajabi-cancel-flow-setup-without-coding#step-2-customize-your-cancel-flow',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Watch Your Dashboard for Saved Members',
          text: "Once live, ChurnRecovery tracks how many members hit your cancel flow, how many accepted the pause or discount, how many canceled anyway and why, and total revenue saved per month. When a member accepts a pause, ChurnRecovery pauses their Stripe subscription automatically and resumes it on the date you set.",
          url: 'https://churnrecovery.com/posts/kajabi-cancel-flow-setup-without-coding#step-3-watch-your-dashboard-for-saved-members',
        },
      ],
    },
  ],
}
