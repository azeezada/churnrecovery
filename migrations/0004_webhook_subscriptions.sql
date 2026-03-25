-- Outbound webhook subscriptions (REST Hooks pattern for Zapier/Make.com integration)
-- Each row represents a registered callback URL for a specific event type + project

CREATE TABLE IF NOT EXISTS webhook_subscriptions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  target_url TEXT NOT NULL,
  event_type TEXT NOT NULL,
  secret TEXT NOT NULL,
  active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_triggered_at DATETIME DEFAULT NULL,
  last_status_code INTEGER DEFAULT NULL,
  failure_count INTEGER DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_webhook_subs_project ON webhook_subscriptions(project_id);
CREATE INDEX IF NOT EXISTS idx_webhook_subs_event ON webhook_subscriptions(event_type);
CREATE INDEX IF NOT EXISTS idx_webhook_subs_active ON webhook_subscriptions(active);
