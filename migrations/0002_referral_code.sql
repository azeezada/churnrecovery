-- Add referral_code column to waitlist table
-- This stores the referral code from /refer/[code] landing pages
ALTER TABLE waitlist ADD COLUMN referral_code TEXT DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_waitlist_referral ON waitlist(referral_code);
