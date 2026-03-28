#!/usr/bin/env node

/**
 * fetch-analytics.mjs — Pull Google Search Console + GA4 analytics data
 *
 * Usage:
 *   node scripts/fetch-analytics.mjs                 # 30 days, stdout
 *   node scripts/fetch-analytics.mjs --period=7d     # 7 days
 *   node scripts/fetch-analytics.mjs --period=90d    # 90 days
 *   node scripts/fetch-analytics.mjs --save          # also write to docs/
 *   node scripts/fetch-analytics.mjs --json          # JSON output for other tools
 *
 * Requires: GA_SERVICE_ACCOUNT_KEY_PATH, GA4_PROPERTY_ID, GSC_SITE_URL in .env.local
 */

import fs from 'fs'
import path from 'path'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ROOT = process.cwd()

function loadEnv() {
  const envPath = path.join(ROOT, '.env.local')
  if (!fs.existsSync(envPath)) return
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnv()

const SERVICE_ACCOUNT_PATH = process.env.GA_SERVICE_ACCOUNT_KEY_PATH
  ? path.resolve(ROOT, process.env.GA_SERVICE_ACCOUNT_KEY_PATH)
  : null
const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID
const GSC_SITE_URL = process.env.GSC_SITE_URL

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2)
const periodArg = args.find(a => a.startsWith('--period='))
const periodDays = periodArg ? parseInt(periodArg.split('=')[1]) : 30
const shouldSave = args.includes('--save')
const jsonOutput = args.includes('--json')

// ---------------------------------------------------------------------------
// Auth — JWT-based Google API auth
// ---------------------------------------------------------------------------

async function getAccessToken(serviceAccount, scopes) {
  const { GoogleAuth } = await import('google-auth-library')
  const auth = new GoogleAuth({
    credentials: serviceAccount,
    scopes,
  })
  const client = await auth.getClient()
  const tokenResponse = await client.getAccessToken()
  return tokenResponse.token || tokenResponse.res?.data?.access_token
}

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

function formatDate(date) {
  return date.toISOString().split('T')[0]
}

function getDateRange(days) {
  const end = new Date()
  end.setDate(end.getDate() - 1) // yesterday (GSC data has 2-day delay)
  const start = new Date(end)
  start.setDate(start.getDate() - days + 1)
  return { startDate: formatDate(start), endDate: formatDate(end) }
}

// ---------------------------------------------------------------------------
// Google Search Console API
// ---------------------------------------------------------------------------

async function fetchGSCData(token, siteUrl, dateRange) {
  const baseUrl = 'https://searchconsole.googleapis.com/webmasters/v3'
  const encodedSiteUrl = encodeURIComponent(siteUrl)

  async function queryGSC(dimensions, rowLimit = 25) {
    const res = await fetch(`${baseUrl}/sites/${encodedSiteUrl}/searchAnalytics/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        dimensions,
        rowLimit,
        dataState: 'final',
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`GSC API error (${res.status}): ${err}`)
    }
    return res.json()
  }

  const [byQuery, byPage, byDevice, byDate] = await Promise.all([
    queryGSC(['query'], 50),
    queryGSC(['page'], 50),
    queryGSC(['device'], 10),
    queryGSC(['date'], periodDays),
  ])

  // Compute totals
  const rows = byQuery.rows || []
  const totals = rows.reduce(
    (acc, r) => ({
      impressions: acc.impressions + r.impressions,
      clicks: acc.clicks + r.clicks,
    }),
    { impressions: 0, clicks: 0 }
  )
  totals.ctr = totals.impressions > 0 ? totals.clicks / totals.impressions : 0
  totals.avgPosition =
    rows.length > 0
      ? rows.reduce((sum, r) => sum + r.position * r.impressions, 0) / (totals.impressions || 1)
      : 0

  // Striking-distance keywords (position 4-20)
  const strikingDistance = (byQuery.rows || [])
    .filter(r => r.position >= 4 && r.position <= 20)
    .sort((a, b) => a.position - b.position)

  // High impression / low CTR (optimization targets)
  const avgCTR = totals.ctr
  const highImpLowCTR = (byQuery.rows || [])
    .filter(r => r.impressions > 10 && r.clicks / r.impressions < avgCTR * 0.5)
    .sort((a, b) => b.impressions - a.impressions)

  // Content gaps — queries with impressions but check if page exists
  const contentGaps = (byQuery.rows || [])
    .filter(r => r.impressions > 5 && r.clicks === 0)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)

  return {
    totals,
    topQueries: (byQuery.rows || []).slice(0, 25),
    topPages: (byPage.rows || []).slice(0, 25),
    byDevice: byDevice.rows || [],
    dailyTrend: (byDate.rows || []).sort((a, b) => a.keys[0].localeCompare(b.keys[0])),
    strikingDistance: strikingDistance.slice(0, 20),
    highImpLowCTR: highImpLowCTR.slice(0, 15),
    contentGaps,
  }
}

// ---------------------------------------------------------------------------
// GA4 Data API
// ---------------------------------------------------------------------------

async function fetchGA4Data(token, propertyId, dateRange) {
  const baseUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`

  async function runReport(dimensions, metrics, limit = 25) {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
        dimensions: dimensions.map(d => ({ name: d })),
        metrics: metrics.map(m => ({ name: m })),
        limit,
        keepEmptyRows: false,
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`GA4 API error (${res.status}): ${err}`)
    }
    return res.json()
  }

  const summaryMetrics = [
    'activeUsers', 'totalUsers', 'newUsers', 'sessions',
    'screenPageViews', 'bounceRate', 'averageSessionDuration', 'engagedSessions',
  ]

  const [summary, topPages, trafficSources, referrers, devices, countries] = await Promise.all([
    runReport([], summaryMetrics, 1),
    runReport(['pagePath'], ['screenPageViews', 'activeUsers', 'averageSessionDuration'], 25),
    runReport(['sessionDefaultChannelGroup'], ['sessions', 'activeUsers', 'bounceRate'], 10),
    runReport(['sessionSource'], ['sessions', 'activeUsers'], 15),
    runReport(['deviceCategory'], ['sessions', 'activeUsers'], 5),
    runReport(['country'], ['sessions', 'activeUsers'], 15),
  ])

  function parseRows(report) {
    if (!report.rows) return []
    return report.rows.map(r => ({
      dimensions: (r.dimensionValues || []).map(d => d.value),
      metrics: (r.metricValues || []).map(m => parseFloat(m.value) || 0),
    }))
  }

  function parseSummary(report) {
    if (!report.rows || !report.rows[0]) return {}
    const values = report.rows[0].metricValues.map(m => parseFloat(m.value) || 0)
    const result = {}
    summaryMetrics.forEach((name, i) => { result[name] = values[i] })
    return result
  }

  return {
    summary: parseSummary(summary),
    topPages: parseRows(topPages),
    trafficSources: parseRows(trafficSources),
    referrers: parseRows(referrers),
    devices: parseRows(devices),
    countries: parseRows(countries),
  }
}

// ---------------------------------------------------------------------------
// Report formatting
// ---------------------------------------------------------------------------

function formatMarkdownReport(gsc, ga4, dateRange) {
  const lines = []
  const ln = (s = '') => lines.push(s)

  ln(`# ChurnRecovery Analytics Report`)
  ln(`**Period:** ${dateRange.startDate} – ${dateRange.endDate} (${periodDays} days)`)
  ln(`**Generated:** ${new Date().toISOString().split('T')[0]}`)
  ln()

  // --- GSC Section ---
  if (gsc) {
    ln(`## Search Performance (Google Search Console)`)
    ln()
    ln(`| Metric | Value |`)
    ln(`|--------|-------|`)
    ln(`| Total Impressions | ${gsc.totals.impressions.toLocaleString()} |`)
    ln(`| Total Clicks | ${gsc.totals.clicks.toLocaleString()} |`)
    ln(`| Average CTR | ${(gsc.totals.ctr * 100).toFixed(1)}% |`)
    ln(`| Average Position | ${gsc.totals.avgPosition.toFixed(1)} |`)
    ln()

    if (gsc.topQueries.length > 0) {
      ln(`### Top Search Queries (by impressions)`)
      ln()
      ln(`| Query | Impressions | Clicks | CTR | Position |`)
      ln(`|-------|------------|--------|-----|----------|`)
      for (const r of gsc.topQueries.slice(0, 20)) {
        const ctr = r.impressions > 0 ? ((r.clicks / r.impressions) * 100).toFixed(1) : '0.0'
        ln(`| ${r.keys[0]} | ${r.impressions.toLocaleString()} | ${r.clicks} | ${ctr}% | ${r.position.toFixed(1)} |`)
      }
      ln()
    }

    if (gsc.topPages.length > 0) {
      ln(`### Top Pages (by clicks)`)
      ln()
      ln(`| Page | Clicks | Impressions | CTR | Position |`)
      ln(`|------|--------|------------|-----|----------|`)
      const sorted = [...gsc.topPages].sort((a, b) => b.clicks - a.clicks)
      for (const r of sorted.slice(0, 15)) {
        const ctr = r.impressions > 0 ? ((r.clicks / r.impressions) * 100).toFixed(1) : '0.0'
        const pagePath = r.keys[0].replace('https://churnrecovery.com', '')
        ln(`| ${pagePath || '/'} | ${r.clicks} | ${r.impressions.toLocaleString()} | ${ctr}% | ${r.position.toFixed(1)} |`)
      }
      ln()
    }

    if (gsc.strikingDistance.length > 0) {
      ln(`### Striking-Distance Keywords (position 4-20 — quick wins)`)
      ln()
      ln(`These keywords are close to page 1. Small optimizations can push them up.`)
      ln()
      ln(`| Query | Position | Impressions | Clicks | CTR |`)
      ln(`|-------|----------|------------|--------|-----|`)
      for (const r of gsc.strikingDistance.slice(0, 15)) {
        const ctr = r.impressions > 0 ? ((r.clicks / r.impressions) * 100).toFixed(1) : '0.0'
        ln(`| ${r.keys[0]} | ${r.position.toFixed(1)} | ${r.impressions.toLocaleString()} | ${r.clicks} | ${ctr}% |`)
      }
      ln()
    }

    if (gsc.highImpLowCTR.length > 0) {
      ln(`### High Impressions, Low CTR (title/description optimization targets)`)
      ln()
      ln(`These queries get seen but not clicked. Improve titles and meta descriptions.`)
      ln()
      ln(`| Query | Impressions | CTR | Position |`)
      ln(`|-------|------------|-----|----------|`)
      for (const r of gsc.highImpLowCTR.slice(0, 10)) {
        const ctr = r.impressions > 0 ? ((r.clicks / r.impressions) * 100).toFixed(1) : '0.0'
        ln(`| ${r.keys[0]} | ${r.impressions.toLocaleString()} | ${ctr}% | ${r.position.toFixed(1)} |`)
      }
      ln()
    }

    if (gsc.contentGaps.length > 0) {
      ln(`### Content Gaps (impressions but zero clicks — need dedicated pages)`)
      ln()
      ln(`| Query | Impressions | Position |`)
      ln(`|-------|------------|----------|`)
      for (const r of gsc.contentGaps.slice(0, 10)) {
        ln(`| ${r.keys[0]} | ${r.impressions.toLocaleString()} | ${r.position.toFixed(1)} |`)
      }
      ln()
    }

    if (gsc.byDevice.length > 0) {
      ln(`### Device Breakdown`)
      ln()
      ln(`| Device | Clicks | Impressions | CTR | Position |`)
      ln(`|--------|--------|------------|-----|----------|`)
      for (const r of gsc.byDevice) {
        const ctr = r.impressions > 0 ? ((r.clicks / r.impressions) * 100).toFixed(1) : '0.0'
        ln(`| ${r.keys[0]} | ${r.clicks} | ${r.impressions.toLocaleString()} | ${ctr}% | ${r.position.toFixed(1)} |`)
      }
      ln()
    }
  }

  // --- GA4 Section ---
  if (ga4) {
    ln(`## Site Traffic (Google Analytics 4)`)
    ln()
    const s = ga4.summary
    ln(`| Metric | Value |`)
    ln(`|--------|-------|`)
    ln(`| Total Users | ${Math.round(s.totalUsers || 0).toLocaleString()} |`)
    ln(`| Active Users | ${Math.round(s.activeUsers || 0).toLocaleString()} |`)
    ln(`| New Users | ${Math.round(s.newUsers || 0).toLocaleString()} |`)
    ln(`| Sessions | ${Math.round(s.sessions || 0).toLocaleString()} |`)
    ln(`| Page Views | ${Math.round(s.screenPageViews || 0).toLocaleString()} |`)
    ln(`| Bounce Rate | ${((s.bounceRate || 0) * 100).toFixed(1)}% |`)
    const avgDuration = s.averageSessionDuration || 0
    const mins = Math.floor(avgDuration / 60)
    const secs = Math.round(avgDuration % 60)
    ln(`| Avg Session Duration | ${mins}:${secs.toString().padStart(2, '0')} |`)
    ln()

    if (ga4.topPages.length > 0) {
      ln(`### Top Pages by Users`)
      ln()
      ln(`| Page | Page Views | Users | Avg Duration |`)
      ln(`|------|-----------|-------|-------------|`)
      for (const r of ga4.topPages.slice(0, 15)) {
        const dur = r.metrics[2] || 0
        const m = Math.floor(dur / 60)
        const sc = Math.round(dur % 60)
        ln(`| ${r.dimensions[0]} | ${Math.round(r.metrics[0]).toLocaleString()} | ${Math.round(r.metrics[1])} | ${m}:${sc.toString().padStart(2, '0')} |`)
      }
      ln()
    }

    if (ga4.trafficSources.length > 0) {
      ln(`### Traffic Sources`)
      ln()
      const totalSessions = ga4.trafficSources.reduce((sum, r) => sum + r.metrics[0], 0)
      ln(`| Channel | Sessions | % | Users | Bounce Rate |`)
      ln(`|---------|---------|---|-------|------------|`)
      for (const r of ga4.trafficSources) {
        const pct = totalSessions > 0 ? ((r.metrics[0] / totalSessions) * 100).toFixed(1) : '0.0'
        ln(`| ${r.dimensions[0]} | ${Math.round(r.metrics[0])} | ${pct}% | ${Math.round(r.metrics[1])} | ${(r.metrics[2] * 100).toFixed(1)}% |`)
      }
      ln()
    }

    if (ga4.referrers.length > 0) {
      ln(`### Top Referrers`)
      ln()
      ln(`| Source | Sessions | Users |`)
      ln(`|-------|---------|-------|`)
      for (const r of ga4.referrers.slice(0, 10)) {
        ln(`| ${r.dimensions[0]} | ${Math.round(r.metrics[0])} | ${Math.round(r.metrics[1])} |`)
      }
      ln()
    }

    if (ga4.devices.length > 0) {
      ln(`### Device Breakdown`)
      ln()
      const totalDev = ga4.devices.reduce((sum, r) => sum + r.metrics[0], 0)
      ln(`| Device | Sessions | % |`)
      ln(`|--------|---------|---|`)
      for (const r of ga4.devices) {
        const pct = totalDev > 0 ? ((r.metrics[0] / totalDev) * 100).toFixed(1) : '0.0'
        ln(`| ${r.dimensions[0]} | ${Math.round(r.metrics[0])} | ${pct}% |`)
      }
      ln()
    }

    if (ga4.countries.length > 0) {
      ln(`### Top Countries`)
      ln()
      ln(`| Country | Sessions | Users |`)
      ln(`|---------|---------|-------|`)
      for (const r of ga4.countries.slice(0, 10)) {
        ln(`| ${r.dimensions[0]} | ${Math.round(r.metrics[0])} | ${Math.round(r.metrics[1])} |`)
      }
      ln()
    }
  }

  // --- No data ---
  if (!gsc && !ga4) {
    ln(`## No Analytics Data Available`)
    ln()
    ln(`Neither Google Search Console nor GA4 credentials are configured.`)
    ln(`See docs/analytics-credentials-setup.md for setup instructions.`)
    ln()
  }

  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const dateRange = getDateRange(periodDays)

  // Check credentials
  if (!SERVICE_ACCOUNT_PATH || !fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    if (jsonOutput) {
      console.log(JSON.stringify({ error: 'no-credentials', message: 'Service account key not found. See docs/analytics-credentials-setup.md' }))
    } else {
      console.error('❌ Service account key not found.')
      console.error(`   Expected at: ${SERVICE_ACCOUNT_PATH || '(GA_SERVICE_ACCOUNT_KEY_PATH not set)'}`)
      console.error('   See docs/analytics-credentials-setup.md for setup instructions.')
    }
    process.exit(1)
  }

  const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf-8'))

  // Fetch data from available sources
  let gscData = null
  let ga4Data = null
  const errors = []

  // GSC
  if (GSC_SITE_URL) {
    try {
      const token = await getAccessToken(serviceAccount, ['https://www.googleapis.com/auth/webmasters.readonly'])
      gscData = await fetchGSCData(token, GSC_SITE_URL, dateRange)
    } catch (err) {
      errors.push(`GSC: ${err.message}`)
    }
  } else {
    errors.push('GSC: GSC_SITE_URL not set')
  }

  // GA4
  if (GA4_PROPERTY_ID) {
    try {
      const token = await getAccessToken(serviceAccount, ['https://www.googleapis.com/auth/analytics.readonly'])
      ga4Data = await fetchGA4Data(token, GA4_PROPERTY_ID, dateRange)
    } catch (err) {
      errors.push(`GA4: ${err.message}`)
    }
  } else {
    errors.push('GA4: GA4_PROPERTY_ID not set')
  }

  // Output
  if (jsonOutput) {
    const output = {
      period: { startDate: dateRange.startDate, endDate: dateRange.endDate, days: periodDays },
      generated: new Date().toISOString(),
      gsc: gscData,
      ga4: ga4Data,
      errors: errors.length > 0 ? errors : undefined,
    }
    console.log(JSON.stringify(output, null, 2))
  } else {
    if (errors.length > 0) {
      console.error(`⚠️  Partial data (${errors.length} source(s) unavailable):`)
      for (const e of errors) console.error(`   - ${e}`)
      console.error()
    }

    const report = formatMarkdownReport(gscData, ga4Data, dateRange)
    console.log(report)

    if (shouldSave) {
      const filename = `analytics-report-${new Date().toISOString().split('T')[0]}.md`
      const outPath = path.join(ROOT, 'docs', filename)
      fs.writeFileSync(outPath, report, 'utf-8')
      console.error(`\n✅ Report saved to docs/${filename}`)
    }
  }
}

main().catch(err => {
  console.error(`Fatal error: ${err.message}`)
  process.exit(1)
})
