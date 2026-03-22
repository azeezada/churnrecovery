import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const BASE = '/Users/dawoodazeeza/.openclaw/workspace/churnrecovery'

// Map: filename -> { platform source, inline form function name }
const FOR_PAGES = [
  { file: 'pages/for/beehiiv.js',       source: 'for-beehiiv',       formFn: 'BeehiivWaitlistForm'   },
  { file: 'pages/for/chargebee.js',     source: 'for-chargebee',     formFn: 'WaitlistForm'           },
  { file: 'pages/for/circle.js',        source: 'for-circle',        formFn: 'CircleWaitlistForm'     },
  { file: 'pages/for/convertkit.js',    source: 'for-convertkit',    formFn: 'KitWaitlistForm'        },
  { file: 'pages/for/ghost.js',         source: 'for-ghost',         formFn: 'GhostWaitlistForm'      },
  { file: 'pages/for/kajabi.js',        source: 'for-kajabi',        formFn: 'KajabiWaitlistForm'     },
  { file: 'pages/for/lemon-squeezy.js', source: 'for-lemon-squeezy', formFn: 'WaitlistForm'           },
  { file: 'pages/for/memberful.js',     source: 'for-memberful',     formFn: 'MemberfulWaitlistForm'  },
  { file: 'pages/for/patreon.js',       source: 'for-patreon',       formFn: 'PatreonWaitlistForm'    },
  { file: 'pages/for/payhip.js',        source: 'for-payhip',        formFn: 'PayhipWaitlistForm'     },
  { file: 'pages/for/podia.js',         source: 'for-podia',         formFn: 'PodiaWaitlistForm'      },
  { file: 'pages/for/squarespace.js',   source: 'for-squarespace',   formFn: 'WaitlistForm'           },
  { file: 'pages/for/stan-store.js',    source: 'for-stan-store',    formFn: 'StanWaitlistForm'       },
  { file: 'pages/for/stripe.js',        source: 'for-stripe',        formFn: 'StripeWaitlistForm'     },
  { file: 'pages/for/substack.js',      source: 'for-substack',      formFn: 'SubstackWaitlistForm'   },
  { file: 'pages/for/teachable.js',     source: 'for-teachable',     formFn: 'TeachableWaitlistForm'  },
  { file: 'pages/for/thinkific.js',     source: 'for-thinkific',     formFn: 'ThinkificWaitlistForm'  },
  { file: 'pages/for/wix.js',           source: 'for-wix',           formFn: 'WixWaitlistForm'        },
  { file: 'pages/for/wordpress.js',     source: 'for-wordpress',     formFn: 'WordPressWaitlistForm'  },
]

function processForPage(filePath, source, formFn) {
  let content = readFileSync(filePath, 'utf8')
  const original = content

  // 1. Add SignUpCTA import after last existing import line
  //    Find the last import line and insert after it
  const importLines = content.match(/^import .+$/mg) || []
  if (importLines.length > 0) {
    const lastImport = importLines[importLines.length - 1]
    // Check if SignUpCTA already imported
    if (!content.includes("import SignUpCTA from")) {
      content = content.replace(lastImport, lastImport + "\nimport SignUpCTA from '../../components/SignUpCTA'")
    }
  }

  // 2. Replace all JSX usages of the inline form with SignUpCTA
  //    Handle patterns like: <XxxWaitlistForm dark={true} />  or  <XxxWaitlistForm dark={true} compact={false} />
  //    We want to replace with: <SignUpCTA source="for-platform" dark={true} />
  const formJsxRegex = new RegExp(`<${formFn}[^/]*/>`,'g')
  content = content.replace(formJsxRegex, `<SignUpCTA source="${source}" dark={true} />`)

  // Also handle multi-line or compact variants
  const formJsxRegexMulti = new RegExp(`<${formFn}\\s[^>]*?/>`, 'g')
  content = content.replace(formJsxRegexMulti, `<SignUpCTA source="${source}" dark={true} />`)

  // 3. Replace href="/#waitlist" with href="/app/sign-up"
  content = content.replace(/href="\/\#waitlist"/g, 'href="/app/sign-up"')

  // 4. Replace waitlist CTA text variants (in buttons/links)
  content = content.replace(/Join Waitlist — Free/g, 'Get Started Free →')
  content = content.replace(/Join Waitlist/g, 'Get Started Free')
  content = content.replace(/Join the Waitlist/g, 'Get Started Free')
  content = content.replace(/Join the waitlist\./g, 'Sign up for free.')
  content = content.replace(/Join the waitlist/g, 'Sign up for free')

  // 5. Replace "join the waitlist" (lowercase, in FAQ text etc)
  content = content.replace(/join the waitlist/g, 'sign up for free')

  // 6. Replace "early access" references in text/descriptions
  content = content.replace(/Free beta access for/g, 'Free for')
  content = content.replace(/early access\./g, 'free access.')
  content = content.replace(/early access/g, 'free access')
  content = content.replace(/get early access/gi, 'get started for free')

  // 7. Clean up common final-CTA paragraph patterns about waitlist
  content = content.replace(
    /Be first to recover/g,
    'Start recovering'
  )
  content = content.replace(
    /Be first to stop/g,
    'Start stopping'
  )
  content = content.replace(
    /Be first to protect/g,
    'Protect'
  )
  content = content.replace(
    /Be first to add/g,
    'Add'
  )
  content = content.replace(
    /Be first to turn/g,
    'Turn'
  )
  content = content.replace(
    /who sign up today\./g,
    '.'
  )
  
  // 8. Replace "on waitlist" count badge text
  content = content.replace(/on waitlist/g, 'already signed up')

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8')
    console.log(`✅ Updated: ${filePath}`)
  } else {
    console.log(`⚠️  No changes: ${filePath}`)
  }
}

// Process all /for/ pages
for (const { file, source, formFn } of FOR_PAGES) {
  const fullPath = resolve(BASE, file)
  try {
    processForPage(fullPath, source, formFn)
  } catch (e) {
    console.error(`❌ Error processing ${file}: ${e.message}`)
  }
}

// --- Process /use-cases/[slug].js ---
{
  const filePath = resolve(BASE, 'pages/use-cases/[slug].js')
  let content = readFileSync(filePath, 'utf8')
  const original = content

  // Replace the import
  content = content.replace(
    "import WaitlistForm from '../../components/WaitlistForm'",
    "import SignUpCTA from '../../components/SignUpCTA'"
  )

  // Replace usage: <WaitlistForm source={`use-case-${useCase.slug}`} />
  content = content.replace(
    /<WaitlistForm source=\{`use-case-\$\{useCase\.slug\}`\} \/>/g,
    '<SignUpCTA source={`use-case-${useCase.slug}`} />'
  )

  // General text replacements
  content = content.replace(/href="\/\#waitlist"/g, 'href="/app/sign-up"')
  content = content.replace(/Join Waitlist — Free/g, 'Get Started Free →')
  content = content.replace(/Join Waitlist/g, 'Get Started Free')
  content = content.replace(/Join the Waitlist/g, 'Get Started Free')
  content = content.replace(/Join the waitlist/g, 'Sign up for free')
  content = content.replace(/join the waitlist/g, 'sign up for free')
  content = content.replace(/early access/g, 'free access')

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8')
    console.log(`✅ Updated: pages/use-cases/[slug].js`)
  } else {
    console.log(`⚠️  No changes: pages/use-cases/[slug].js`)
  }
}

// --- Process /tools/churn-calculator.js ---
{
  const filePath = resolve(BASE, 'pages/tools/churn-calculator.js')
  let content = readFileSync(filePath, 'utf8')
  const original = content

  content = content.replace(/href="\/\#waitlist"/g, 'href="/app/sign-up"')
  content = content.replace(/Join Waitlist — Free/g, 'Get Started Free →')
  content = content.replace(/Join Waitlist/g, 'Get Started Free')
  content = content.replace(/Join the Waitlist/g, 'Get Started Free')
  content = content.replace(/Join the waitlist/g, 'Sign up for free')
  content = content.replace(/join the waitlist/g, 'sign up for free')
  content = content.replace(/early access/g, 'free')
  content = content.replace(
    /Join the waitlist for early access to ChurnRecovery/g,
    'Get started free with ChurnRecovery'
  )
  content = content.replace(
    /the free churn recovery platform built for SaaS founders\./g,
    'the free churn recovery platform built for SaaS founders.'
  )
  // Replace tally.so link with proper CTA
  content = content.replace(
    'href="https://tally.so/r/churnrecovery"',
    'href="/app/sign-up"'
  )

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8')
    console.log(`✅ Updated: pages/tools/churn-calculator.js`)
  } else {
    console.log(`⚠️  No changes: pages/tools/churn-calculator.js`)
  }
}

// --- Process /tools/churn-rate-calculator.js ---
{
  const filePath = resolve(BASE, 'pages/tools/churn-rate-calculator.js')
  let content = readFileSync(filePath, 'utf8')
  const original = content

  content = content.replace(/href="\/\#waitlist"/g, 'href="/app/sign-up"')
  content = content.replace(/Join Waitlist — Free/g, 'Get Started Free →')
  content = content.replace(/Join Waitlist/g, 'Get Started Free')
  content = content.replace(/Join the Waitlist/g, 'Get Started Free')
  content = content.replace(/Join the waitlist/g, 'Sign up for free')
  content = content.replace(/join the waitlist/g, 'sign up for free')
  // "early access" in FAQ answer
  content = content.replace(/we're in early access/g, "we're free to use")
  content = content.replace(/early access/g, 'free access')

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8')
    console.log(`✅ Updated: pages/tools/churn-rate-calculator.js`)
  } else {
    console.log(`⚠️  No changes: pages/tools/churn-rate-calculator.js`)
  }
}

// --- Process /tools/roi-calculator.js ---
{
  const filePath = resolve(BASE, 'pages/tools/roi-calculator.js')
  let content = readFileSync(filePath, 'utf8')
  const original = content

  content = content.replace(/href="\/\#waitlist"/g, 'href="/app/sign-up"')
  content = content.replace(/Join Waitlist — Free →/g, 'Get Started Free →')
  content = content.replace(/Join Waitlist — Free/g, 'Get Started Free →')
  content = content.replace(/Join Waitlist/g, 'Get Started Free')
  content = content.replace(/Join the Waitlist/g, 'Get Started Free')
  content = content.replace(/Join the waitlist/g, 'Sign up for free')
  content = content.replace(/join the waitlist/g, 'sign up for free')
  content = content.replace(/early access/g, 'free access')

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8')
    console.log(`✅ Updated: pages/tools/roi-calculator.js`)
  } else {
    console.log(`⚠️  No changes: pages/tools/roi-calculator.js`)
  }
}

console.log('\nDone! All files processed.')
