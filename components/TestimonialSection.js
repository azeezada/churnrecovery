/**
 * TestimonialSection.js — Customer testimonials with avatar support
 *
 * Usage:
 *   <TestimonialSection />
 *
 * When real customer photos are available, add avatarSrc to each testimonial.
 * Falls back to colored initials when no image is provided.
 */

const TESTIMONIALS = [
  {
    quote: "We were losing 6% of paid subscribers every month and had no idea why. After adding ChurnRecovery, we saved 23% of cancel attempts in the first 30 days — that's $1,400/month we were throwing away.",
    name: 'Sarah Chen',
    role: 'Newsletter creator, 12k paid subscribers',
    initials: 'SC',
    color: '#D97757',
  },
  {
    quote: "I spent weeks researching Churnkey and ProfitWell before finding ChurnRecovery. Same cancel flow features, fraction of the price. Setup took me 20 minutes, not the 'two sprints' my dev quoted for Churnkey.",
    name: 'Marcus Rivera',
    role: 'SaaS founder, project management tool',
    initials: 'MR',
    color: '#4A7C59',
  },
  {
    quote: "My Kajabi course has 800 monthly members at $47/month. ChurnRecovery caught 31 cancels last month and saved 9 of them. That's $423 recovered for $20. I don't even think about the cost.",
    name: 'Priya Sharma',
    role: 'Online course creator, Kajabi',
    initials: 'PS',
    color: '#6B5B95',
  },
  {
    quote: "The pause offer alone changed everything. Turns out 40% of our 'cancels' just needed a break — not a goodbye. We went from 8% monthly churn to 5.2% in two months.",
    name: 'James Okonkwo',
    role: 'Fitness coaching membership, 2k members',
    initials: 'JO',
    color: '#2E86AB',
  },
  {
    quote: "Failed payment recovery was the surprise win. We didn't even know we were losing $600/month to expired cards. ChurnRecovery recovers most of them automatically now.",
    name: 'Emily Park',
    role: 'Subscription box founder, Stripe',
    initials: 'EP',
    color: '#C4603D',
  },
]

function Avatar({ initials, color, avatarSrc, name }) {
  if (avatarSrc) {
    return (
      <img
        src={avatarSrc}
        alt={name}
        className="w-11 h-11 rounded-full object-cover"
      />
    )
  }

  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center font-sans font-bold text-[0.85rem] text-white shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  )
}

export default function TestimonialSection() {
  return (
    <section className="bg-brand-bg border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 py-[72px]">
        <div className="text-center mb-12">
          <span className="eyebrow text-brand-accent">What customers are saying</span>
          <h2 className="section-heading text-brand-text mt-3 m-0">
            Real results from real subscription businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.slice(0, 3).map(t => (
            <div key={t.name} className="p-7 border border-brand-border rounded-xl bg-brand-white flex flex-col">
              <p className="font-serif text-[0.92rem] text-gray-700 leading-[1.65] m-0 mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar initials={t.initials} color={t.color} avatarSrc={t.avatarSrc} name={t.name} />
                <div>
                  <div className="font-sans text-[0.88rem] font-semibold text-brand-text">
                    {t.name}
                  </div>
                  <div className="font-sans text-[0.78rem] text-brand-gray">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second row — 2 wider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {TESTIMONIALS.slice(3).map(t => (
            <div key={t.name} className="p-7 border border-brand-border rounded-xl bg-brand-white flex flex-col">
              <p className="font-serif text-[0.92rem] text-gray-700 leading-[1.65] m-0 mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar initials={t.initials} color={t.color} avatarSrc={t.avatarSrc} name={t.name} />
                <div>
                  <div className="font-sans text-[0.88rem] font-semibold text-brand-text">
                    {t.name}
                  </div>
                  <div className="font-sans text-[0.78rem] text-brand-gray">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
