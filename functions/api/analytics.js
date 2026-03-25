/**
 * /api/analytics
 *
 * Aggregate stats for a project: cancellation attempts, saves, MRR recovered.
 * Used by the dashboard and by the Stripe App Marketplace listing demo.
 *
 * GET /api/analytics?projectId=...&period=30d
 *
 * Response:
 * {
 *   period: "30d",
 *   cancellationAttempts: 142,
 *   subscribersSaved: 38,
 *   subscribersCancelled: 104,
 *   saveRate: 0.268,
 *   mrrRecoveredCents: 110200,
 *   paymentFailures: 12,
 *   paused: 8,
 *   downgraded: 3,
 *   topCancelReasons: [
 *     { reason: "too-expensive", count: 45 },
 *     ...
 *   ],
 *   topRetentionOffers: [
 *     { offerShown: "discount_30", count: 22, savedCount: 18 },
 *     ...
 *   ],
 *   dailyTrend: [
 *     { date: "2026-03-01", attempts: 5, saved: 2 },
 *     ...
 *   ]
 * }
 */

import {
  jsonResponse,
  handleCors,
  getUserId,
  rateLimit,
  rateLimitResponse,
  withErrorHandling,
} from './_shared.js'

const VALID_PERIODS = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
  'all': null,
}

export async function onRequestOptions(context) {
  return handleCors(context.request)
}

export const onRequestGet = withErrorHandling(async (context) => {
  const { request, env } = context
  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, 401, request)

  const rl = rateLimit(request, { maxRequests: 60, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  const url = new URL(request.url)
  const projectId = url.searchParams.get('projectId')
  const period = url.searchParams.get('period') || '30d'

  if (!projectId) return jsonResponse({ error: 'projectId required', code: 'VALIDATION_ERROR' }, 400, request)
  if (!(period in VALID_PERIODS)) {
    return jsonResponse({ error: 'Invalid period. Must be one of: 7d, 30d, 90d, all', code: 'VALIDATION_ERROR' }, 400, request)
  }

  // Verify project ownership
  const project = await env.DB.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').bind(projectId, userId).first()
  if (!project) return jsonResponse({ error: 'Project not found', code: 'NOT_FOUND' }, 404, request)

  const days = VALID_PERIODS[period]
  const dateFilter = days
    ? `AND created_at >= datetime('now', '-${days} days')`
    : ''

  // Summary counts
  const summary = await env.DB.prepare(`
    SELECT
      COUNT(*) AS totalAttempts,
      SUM(CASE WHEN outcome = 'saved' THEN 1 ELSE 0 END) AS saved,
      SUM(CASE WHEN outcome = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,
      SUM(CASE WHEN outcome = 'paused' THEN 1 ELSE 0 END) AS paused,
      SUM(CASE WHEN outcome = 'downgraded' THEN 1 ELSE 0 END) AS downgraded,
      SUM(CASE WHEN outcome IN ('flow_started', 'reason_selected') THEN 1 ELSE 0 END) AS inProgress,
      SUM(CASE WHEN outcome = 'saved' AND mrr_cents IS NOT NULL THEN mrr_cents ELSE 0 END) AS mrrRecoveredCents
    FROM cancel_events
    WHERE project_id = ? ${dateFilter}
  `).bind(projectId).first()

  // Payment failures from failed_payments table
  let paymentFailures = 0
  try {
    const pf = await env.DB.prepare(`
      SELECT COUNT(*) AS count FROM failed_payments
      WHERE project_id = ? ${dateFilter}
    `).bind(projectId).first()
    paymentFailures = pf?.count || 0
  } catch {
    // Table may not exist in older deployments — graceful degradation
  }

  // Top cancel reasons
  const { results: reasonRows } = await env.DB.prepare(`
    SELECT reason, COUNT(*) AS count
    FROM cancel_events
    WHERE project_id = ? AND reason IS NOT NULL ${dateFilter}
    GROUP BY reason
    ORDER BY count DESC
    LIMIT 10
  `).bind(projectId).all()

  // Top retention offers (shows which offers are most common + most effective)
  const { results: offerRows } = await env.DB.prepare(`
    SELECT
      offer_shown AS offerShown,
      COUNT(*) AS totalShown,
      SUM(CASE WHEN outcome = 'saved' THEN 1 ELSE 0 END) AS savedCount
    FROM cancel_events
    WHERE project_id = ? AND offer_shown IS NOT NULL ${dateFilter}
    GROUP BY offer_shown
    ORDER BY totalShown DESC
    LIMIT 10
  `).bind(projectId).all()

  // Daily trend (attempts + saves per day for the period)
  let dailyTrend = []
  if (days && days <= 90) {
    const { results: trendRows } = await env.DB.prepare(`
      SELECT
        date(created_at) AS date,
        COUNT(*) AS attempts,
        SUM(CASE WHEN outcome = 'saved' THEN 1 ELSE 0 END) AS saved
      FROM cancel_events
      WHERE project_id = ? ${dateFilter}
      GROUP BY date(created_at)
      ORDER BY date ASC
    `).bind(projectId).all()
    dailyTrend = trendRows || []
  }

  const attempts = summary?.totalAttempts || 0
  const savedCount = summary?.saved || 0
  const saveRate = attempts > 0 ? Math.round((savedCount / attempts) * 1000) / 1000 : 0

  return jsonResponse({
    period,
    cancellationAttempts: attempts,
    subscribersSaved: savedCount,
    subscribersCancelled: summary?.cancelled || 0,
    paused: summary?.paused || 0,
    downgraded: summary?.downgraded || 0,
    inProgress: summary?.inProgress || 0,
    saveRate,
    mrrRecoveredCents: summary?.mrrRecoveredCents || 0,
    paymentFailures,
    topCancelReasons: (reasonRows || []).map(r => ({ reason: r.reason, count: r.count })),
    topRetentionOffers: (offerRows || []).map(r => ({
      offerShown: r.offerShown,
      totalShown: r.totalShown,
      savedCount: r.savedCount,
      conversionRate: r.totalShown > 0 ? Math.round((r.savedCount / r.totalShown) * 1000) / 1000 : 0,
    })),
    dailyTrend,
  }, 200, request)
})
