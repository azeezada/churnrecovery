-- Add Stripe Connect OAuth columns to projects table
-- Used for "Connect with Stripe" OAuth flow (Stripe Connect Standard/Express)
ALTER TABLE projects ADD COLUMN stripe_connect_account_id TEXT DEFAULT NULL;
ALTER TABLE projects ADD COLUMN stripe_connect_access_token TEXT DEFAULT NULL;
ALTER TABLE projects ADD COLUMN stripe_connect_scope TEXT DEFAULT NULL;
ALTER TABLE projects ADD COLUMN stripe_connect_livemode INTEGER DEFAULT 0;
ALTER TABLE projects ADD COLUMN stripe_connected_at DATETIME DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_projects_stripe_account ON projects(stripe_connect_account_id);
