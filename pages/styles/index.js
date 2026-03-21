import Link from 'next/link'
import Head from 'next/head'

const styles = [
  {
    slug: 'developer',
    title: 'Option A: Developer / Stripe',
    description: 'Dark mode, code-forward, technical credibility. Appeals to developers who want to see the code before they believe the marketing.',
    preview: {
      bg: '#0A0A0A',
      accent: '#635BFF',
      text: '#FFFFFF',
    },
  },
  {
    slug: 'warm-saas',
    title: 'Option B: Warm SaaS',
    description: 'Friendly gradients, rounded shapes, approachable tone. For SaaS founders who want something that feels human and trustworthy.',
    preview: {
      bg: '#FFF7ED',
      accent: '#EA580C',
      text: '#1C1917',
    },
  },
  {
    slug: 'data-forward',
    title: 'Option C: Data / Dashboard',
    description: 'Numbers-first, analytical, credibility through data. For growth teams who want proof before they integrate anything.',
    preview: {
      bg: '#F8FAFC',
      accent: '#0EA5E9',
      text: '#0F172A',
    },
  },
]

export default function StylesIndex() {
  return (
    <>
      <Head>
        <title>Design Explorations — ChurnRecovery</title>
        <meta name="description" content="Explore alternative homepage designs for ChurnRecovery: developer-focused, warm SaaS, and data-forward styles." />
      </Head>

      <section className="bg-[#FAF9F5] pt-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <span className="font-sans text-[0.75rem] font-semibold text-[#D97757] tracking-[0.08em] uppercase block mb-3">Design Exploration</span>
          <h1 className="font-sans text-[clamp(2rem,4vw,3rem)] font-semibold text-[#191919] tracking-[-0.03em] mb-4 leading-[1.1]">
            Alternative Homepage Styles
          </h1>
          <p className="font-sans text-[1.1rem] text-[#666666] mb-12 max-w-[600px] leading-normal">
            Three alternative directions for ChurnRecovery's homepage. The main site uses
            <strong className="text-[#191919]"> Option D (Editorial)</strong> — these are the roads not taken.
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
            {styles.map(s => (
              <Link
                key={s.slug}
                href={`/styles/${s.slug}`}
                className="no-underline text-inherit"
              >
                <div className="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white transition-shadow duration-200">
                  {/* Preview swatch */}
                  <div
                    className="h-[140px] flex items-center justify-center gap-3 p-6"
                    style={{ background: s.preview.bg }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg"
                      style={{ background: s.preview.accent }}
                    />
                    <div
                      className="font-sans text-2xl font-semibold tracking-[-0.02em]"
                      style={{ color: s.preview.text }}
                    >
                      ChurnRecovery
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="font-sans text-[1.1rem] font-semibold text-[#191919] mb-2">{s.title}</h2>
                    <p className="font-serif text-[0.9rem] text-[#666666] m-0 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="font-sans text-[0.9rem] text-[#D97757] no-underline font-medium"
            >
              ← Back to main site (Option D)
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
