-- ChurnRecovery D1 Database Schema
-- Run: wrangler d1 execute churnrecovery-db --file=./db/schema.sql

-- Existing tables (from marketing site)
CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'website',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  referrer TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Product tables

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  api_key TEXT UNIQUE NOT NULL,
  stripe_secret_key TEXT,
  stripe_webhook_secret TEXT,
  webhook_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_api_key ON projects(api_key);

CREATE TABLE IF NOT EXISTS cancel_flows (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  config JSON NOT NULL,
  active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
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
  outcome TEXT, -- 'saved', 'cancelled', 'paused', 'downgraded', 'flow_started', 'reason_selected', 'feedback_submitted'
  feedback TEXT,
  mrr_cents INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
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
  recovery_status TEXT DEFAULT 'pending', -- 'pending', 'recovered', 'lost'
  dunning_emails_sent INTEGER DEFAULT 0,
  last_retry_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_failed_payments_project_id ON failed_payments(project_id);
CREATE INDEX IF NOT EXISTS idx_failed_payments_status ON failed_payments(recovery_status);

-- Dunning sequences: tracks multi-day email sequences for failed payments
CREATE TABLE IF NOT EXISTS dunning_sequences (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  customer_email TEXT,
  project_id TEXT NOT NULL,
  started_at TEXT DEFAULT (datetime('now')),
  last_email_day INTEGER DEFAULT 0,
  next_email_at TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'cancelled', 'recovered'
  stripe_invoice_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_dunning_sequences_project_id ON dunning_sequences(project_id);
CREATE INDEX IF NOT EXISTS idx_dunning_sequences_status ON dunning_sequences(status);
CREATE INDEX IF NOT EXISTS idx_dunning_sequences_next_email ON dunning_sequences(next_email_at);
