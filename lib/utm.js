/**
 * UTM Parameter Capture
 *
 * Captures UTM params from the URL on page load and stores in localStorage.
 * These are later attached to Clerk sign-up metadata and/or sent to D1
 * so we can attribute which marketing channels drive sign-ups.
 *
 * Supported params: utm_source, utm_medium, utm_campaign, utm_term, utm_content
 * Also captures: ref (referral code), landing_page (first page visited)
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
const STORAGE_KEY = 'cr_utm'

/**
 * Capture UTM params from current URL and store in localStorage.
 * Only overwrites if new UTM params are present (preserves first-touch attribution).
 * Also stores the referring URL and landing page.
 */
export function captureUTM() {
  if (typeof window === 'undefined') return

  try {
    const params = new URLSearchParams(window.location.search)
    const utmData = {}
    let hasUTM = false

    for (const key of UTM_KEYS) {
      const value = params.get(key)
      if (value) {
        utmData[key] = value
        hasUTM = true
      }
    }

    // Also capture ref param (for referral tracking)
    const ref = params.get('ref')
    if (ref) {
      utmData.ref = ref
      hasUTM = true
    }

    if (!hasUTM) return // No UTM params in this URL

    // Add metadata
    utmData.landing_page = window.location.pathname
    utmData.referrer = document.referrer || ''
    utmData.captured_at = new Date().toISOString()

    // First-touch attribution: don't overwrite if we already have UTM data
    const existing = getUTM()
    if (existing && existing.utm_source) {
      // Store as last-touch instead
      localStorage.setItem(STORAGE_KEY + '_last', JSON.stringify(utmData))
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(utmData))
    }
  } catch (e) {
    // localStorage might be unavailable (private browsing, etc.)
    console.warn('[UTM] Failed to capture:', e)
  }
}

/**
 * Get stored UTM data (first-touch attribution).
 * Returns null if no UTM data stored.
 */
export function getUTM() {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Get last-touch UTM data (most recent visit with UTM params).
 */
export function getLastTouchUTM() {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(STORAGE_KEY + '_last')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Get UTM data formatted for Clerk unsafeMetadata.
 * Returns an object suitable for passing to Clerk's sign-up.
 */
export function getUTMForClerk() {
  const utm = getUTM()
  if (!utm) return {}

  return {
    utm_source: utm.utm_source || '',
    utm_medium: utm.utm_medium || '',
    utm_campaign: utm.utm_campaign || '',
    utm_term: utm.utm_term || '',
    utm_content: utm.utm_content || '',
    ref: utm.ref || '',
    landing_page: utm.landing_page || '',
    referrer: utm.referrer || '',
  }
}

/**
 * Clear stored UTM data (e.g., after successful attribution to a user).
 */
export function clearUTM() {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_KEY + '_last')
  } catch {
    // ignore
  }
}
