import { getAuth } from '@clerk/nextjs/server'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { userId } = getAuth(req)
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { projectId, period = '30d' } = req.query

  // Mock analytics data for MVP — will be computed from D1 in production
  const analytics = {
    period,
    projectId: projectId || 'all',
    summary: {
      totalCancelAttempts: 847,
      customersSaved: 288,
      saveRate: 0.34,
      revenueAtRisk: 41503,
      revenueSaved: 14211,
      averageSaveValue: 49.34,
      failedPayments: 23,
      paymentsRecovered: 18,
      paymentRecoveryRate: 0.78,
    },
    reasonBreakdown: [
      { reason: 'too-expensive', count: 322, pct: 0.38, saveRate: 0.52 },
      { reason: 'not-using', count: 203, pct: 0.24, saveRate: 0.28 },
      { reason: 'switching', count: 153, pct: 0.18, saveRate: 0.15 },
      { reason: 'missing-feature', count: 102, pct: 0.12, saveRate: 0.35 },
      { reason: 'other', count: 67, pct: 0.08, saveRate: 0.20 },
    ],
    outcomeBreakdown: [
      { outcome: 'saved', count: 195, pct: 0.23 },
      { outcome: 'paused', count: 93, pct: 0.11 },
      { outcome: 'downgraded', count: 68, pct: 0.08 },
      { outcome: 'cancelled', count: 491, pct: 0.58 },
    ],
    weeklyTrend: [
      { week: 'W1', cancelAttempts: 198, saved: 55, saveRate: 0.28, revenueSaved: 2800 },
      { week: 'W2', cancelAttempts: 215, saved: 69, saveRate: 0.32, revenueSaved: 3400 },
      { week: 'W3', cancelAttempts: 221, saved: 77, saveRate: 0.35, revenueSaved: 4100 },
      { week: 'W4', cancelAttempts: 213, saved: 72, saveRate: 0.34, revenueSaved: 3900 },
    ],
  }

  return res.status(200).json(analytics)
}
