# Deployment Commands for ChurnRecovery

Due to Cloudflare authentication requirements, these commands need to be run by Dawood with proper auth:

## 1. Create D1 Database
```bash
npx wrangler d1 create churnrecovery-db
```

After creating the database, update the `database_id` in `wrangler.toml` with the actual ID returned.

## 2. Run Database Migration
```bash
npx wrangler d1 execute churnrecovery-db --file=migrations/0001_initial.sql
```

## 3. Deploy the Worker
```bash
npx wrangler deploy
```

## 4. Test the API endpoints
After deployment:
- POST https://churnrecovery.YOUR_SUBDOMAIN.workers.dev/api/waitlist
- GET https://churnrecovery.YOUR_SUBDOMAIN.workers.dev/api/waitlist/count

The worker is already configured in `workers-site/index.js` and `wrangler.toml`.