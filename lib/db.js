/**
 * SQLite database layer using better-sqlite3.
 * Data is persisted to db/data.sqlite in development.
 * In production (Cloudflare Workers), use D1 instead.
 *
 * This module is server-only. Never import from client components.
 */

import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

let _db = null

function getDb() {
  if (_db) return _db

  // Store DB in project root db/ directory
  const dbDir = path.join(process.cwd(), 'db')
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
  }
  const dbPath = path.join(dbDir, 'data.sqlite')

  _db = new Database(dbPath)

  // Enable WAL mode for better performance
  _db.pragma('journal_mode = WAL')
  _db.pragma('foreign_keys = ON')

  // Create tables if they don't exist
  _db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      api_key TEXT UNIQUE NOT NULL,
      stripe_secret_key TEXT,
      stripe_webhook_secret TEXT,
      webhook_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
    CREATE INDEX IF NOT EXISTS idx_projects_api_key ON projects(api_key);

    CREATE TABLE IF NOT EXISTS cancel_flows (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      config TEXT NOT NULL,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_cancel_flows_project_id ON cancel_flows(project_id);

    CREATE TABLE IF NOT EXISTS cancel_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id TEXT NOT NULL,
      session_id TEXT,
      customer_id TEXT,
      reason TEXT,
      offer_shown TEXT,
      outcome TEXT,
      feedback TEXT,
      mrr_cents INTEGER,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_cancel_events_project_id ON cancel_events(project_id);
    CREATE INDEX IF NOT EXISTS idx_cancel_events_created_at ON cancel_events(created_at);
    CREATE INDEX IF NOT EXISTS idx_cancel_events_outcome ON cancel_events(outcome);

    CREATE TABLE IF NOT EXISTS failed_payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id TEXT NOT NULL,
      customer_id TEXT,
      stripe_invoice_id TEXT,
      amount_cents INTEGER,
      recovery_status TEXT DEFAULT 'pending',
      dunning_emails_sent INTEGER DEFAULT 0,
      last_retry_at TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_failed_payments_project_id ON failed_payments(project_id);
    CREATE INDEX IF NOT EXISTS idx_failed_payments_status ON failed_payments(recovery_status);
  `)

  return _db
}

// --- Projects ---

export function getProjectsByUser(userId) {
  const db = getDb()
  return db.prepare('SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC').all(userId)
}

export function getProjectById(id) {
  const db = getDb()
  return db.prepare('SELECT * FROM projects WHERE id = ?').get(id)
}

export function getProjectByApiKey(apiKey) {
  const db = getDb()
  return db.prepare('SELECT * FROM projects WHERE api_key = ?').get(apiKey)
}

export function createProject({ id, userId, name, apiKey }) {
  const db = getDb()
  db.prepare(`
    INSERT INTO projects (id, user_id, name, api_key) VALUES (?, ?, ?, ?)
  `).run(id, userId, name, apiKey)
  return db.prepare('SELECT * FROM projects WHERE id = ?').get(id)
}

export function updateProject(id, updates) {
  const db = getDb()
  const fields = []
  const values = []
  for (const [key, val] of Object.entries(updates)) {
    if (['name', 'stripe_secret_key', 'stripe_webhook_secret', 'webhook_url'].includes(key)) {
      fields.push(`${key} = ?`)
      values.push(val)
    }
  }
  if (fields.length === 0) return getProjectById(id)
  fields.push("updated_at = datetime('now')")
  values.push(id)
  db.prepare(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`).run(...values)
  return db.prepare('SELECT * FROM projects WHERE id = ?').get(id)
}

export function deleteProject(id) {
  const db = getDb()
  db.prepare('DELETE FROM projects WHERE id = ?').run(id)
}

// --- Cancel Flows ---

export function getCancelFlowByProject(projectId) {
  const db = getDb()
  const row = db.prepare('SELECT * FROM cancel_flows WHERE project_id = ? AND active = 1 ORDER BY updated_at DESC LIMIT 1').get(projectId)
  if (!row) return null
  return { ...row, config: JSON.parse(row.config) }
}

export function upsertCancelFlow({ projectId, config }) {
  const db = getDb()
  const existing = db.prepare('SELECT id FROM cancel_flows WHERE project_id = ?').get(projectId)
  const configStr = JSON.stringify(config)
  const id = existing ? existing.id : `cf_${Math.random().toString(36).substring(2, 14)}`
  if (existing) {
    db.prepare(`UPDATE cancel_flows SET config = ?, updated_at = datetime('now') WHERE id = ?`).run(configStr, id)
  } else {
    db.prepare(`INSERT INTO cancel_flows (id, project_id, config) VALUES (?, ?, ?)`).run(id, projectId, configStr)
  }
  return getCancelFlowByProject(projectId)
}

// --- Cancel Events ---

export function insertCancelEvent({ projectId, sessionId, customerId, reason, offerShown, outcome, feedback, mrrCents }) {
  const db = getDb()
  const result = db.prepare(`
    INSERT INTO cancel_events (project_id, session_id, customer_id, reason, offer_shown, outcome, feedback, mrr_cents)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(projectId, sessionId || null, customerId || null, reason || null, offerShown || null, outcome || null, feedback || null, mrrCents || null)
  return result.lastInsertRowid
}

export function getCancelEventsByProject(projectId, { limit = 50, offset = 0 } = {}) {
  const db = getDb()
  return db.prepare(`
    SELECT * FROM cancel_events WHERE project_id = ?
    ORDER BY created_at DESC LIMIT ? OFFSET ?
  `).all(projectId, limit, offset)
}

export function getAnalyticsByProject(projectId, { days = 30 } = {}) {
  const db = getDb()

  const totalEvents = db.prepare(`
    SELECT COUNT(*) as count FROM cancel_events
    WHERE project_id = ? AND created_at >= datetime('now', '-${days} days')
  `).get(projectId)

  const outcomeBreakdown = db.prepare(`
    SELECT outcome, COUNT(*) as count FROM cancel_events
    WHERE project_id = ? AND created_at >= datetime('now', '-${days} days')
    GROUP BY outcome
  `).all(projectId)

  const reasonBreakdown = db.prepare(`
    SELECT reason, COUNT(*) as count FROM cancel_events
    WHERE project_id = ? AND reason IS NOT NULL AND created_at >= datetime('now', '-${days} days')
    GROUP BY reason ORDER BY count DESC
  `).all(projectId)

  const savedEvents = outcomeBreakdown.find(r => r.outcome === 'saved')?.count || 0
  const cancelledEvents = outcomeBreakdown.find(r => r.outcome === 'cancelled')?.count || 0
  const flowStarts = outcomeBreakdown.find(r => r.outcome === 'flow_started')?.count || 0
  const total = totalEvents.count || 0
  const saveRate = flowStarts > 0 ? Math.round((savedEvents / flowStarts) * 100) : 0

  // Revenue saved (sum of mrr_cents for saved outcomes)
  const revenueSaved = db.prepare(`
    SELECT COALESCE(SUM(mrr_cents), 0) as total FROM cancel_events
    WHERE project_id = ? AND outcome = 'saved' AND mrr_cents IS NOT NULL
    AND created_at >= datetime('now', '-${days} days')
  `).get(projectId)

  // Daily event counts for chart
  const dailyEvents = db.prepare(`
    SELECT date(created_at) as date, COUNT(*) as count FROM cancel_events
    WHERE project_id = ? AND created_at >= datetime('now', '-${days} days')
    GROUP BY date(created_at) ORDER BY date
  `).all(projectId)

  return {
    totalEvents: total,
    savedEvents,
    cancelledEvents,
    flowStarts,
    saveRate,
    revenueSavedCents: revenueSaved.total,
    outcomeBreakdown,
    reasonBreakdown,
    dailyEvents,
  }
}

export { getDb }
