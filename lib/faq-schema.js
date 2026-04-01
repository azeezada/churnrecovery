/**
 * Generates a FAQPage JSON-LD schema from an array of {q, a} objects.
 * Used by /for/ pages to add structured data for their inline FAQs.
 */
export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  }
}
