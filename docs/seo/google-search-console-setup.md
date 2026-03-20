# Google Search Console Sitemap Submission

## Current Status

✅ **Sitemap Generated**: `/public/sitemap.xml` contains 47 URLs  
✅ **Auto-Updated**: Sitemap regenerates on each build  
✅ **All Pages Included**: Blog posts, comparison pages, and main site pages

## Manual Submission Process

Since we cannot programmatically submit to Google Search Console without API access, follow these steps:

### 1. Access Google Search Console
- Go to [Google Search Console](https://search.google.com/search-console)
- Sign in with Google account that owns the domain
- Select the `churnrecovery.com` property

### 2. Submit Sitemap
- Navigate to **Sitemaps** in the left sidebar
- Click **Add a new sitemap**
- Enter: `sitemap.xml`
- Click **Submit**

### 3. Verify Submission
- Wait 24-48 hours for processing
- Check **Sitemaps** section for:
  - Status: "Success" 
  - Submitted URLs: 47
  - Indexed URLs: (will vary based on Google's indexing)

## Sitemap Contents (As of March 20, 2026)

### New Content Added
- `/posts/How-to-Build-Cancel-Flow-That-Saves-30-Percent-Churning-Customers`
- `/posts/Churnkey-Pricing-2026-Is-It-Worth-250-Month`
- `/compare/baremetrics`
- `/compare/profitwell` 
- `/compare/churn-buster`
- `/compare/raaft`

### All Comparison Pages
- `/compare/churnkey` - vs Churnkey
- `/compare/profitwell` - vs ProfitWell Retain
- `/compare/churnbuster` - vs Churn Buster  
- `/compare/stunning` - vs Stunning
- `/compare/baremetrics` - vs Baremetrics Recover
- `/compare/raaft` - vs Raaft

### Sitemap Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://churnrecovery.com/</loc>
    <lastmod>2026-03-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- 46 more URLs -->
</urlset>
```

## Automatic Updates

The sitemap regenerates automatically during the build process via `scripts/generate-sitemap.mjs`:

1. **Trigger**: Every `npm run build`
2. **Source**: Pages from `/pages/` directory + blog posts from `/src/posts/`
3. **Output**: `/public/sitemap.xml`
4. **Priority**: Homepage (1.0), key pages (0.9), blog posts (0.8)

## Monitoring

After submission, monitor these metrics in Google Search Console:

### Coverage Report
- **Valid pages**: Should see 47 URLs
- **Errors**: Monitor for 404s or server errors
- **Warnings**: Address soft 404s or redirect issues

### Index Status
- **Submitted**: 47 URLs
- **Indexed**: Monitor growth over time
- **Not indexed**: Investigate reasons (duplicate content, crawl issues, etc.)

### Performance Metrics
- **Clicks**: Track organic traffic
- **Impressions**: Monitor visibility for target keywords
- **CTR**: Optimize titles/descriptions for low-CTR pages
- **Position**: Track ranking improvements

## Target Keywords to Monitor

### Primary Keywords (High Priority)
- `churn recovery software`
- `cancel flow builder`
- `churnkey pricing`
- `churnkey alternative`
- `failed payment recovery`

### Long-tail Keywords
- `how to build cancel flow`
- `saas churn prevention tools`
- `subscription cancellation flow`
- `churnkey vs alternatives`

## Next Steps

1. **Submit sitemap** following manual process above
2. **Wait 48 hours** for initial indexing
3. **Monitor coverage** for any errors or warnings
4. **Track rankings** for target keywords
5. **Resubmit sitemap** if adding significant new content

## Troubleshooting

### Common Issues
- **"Couldn't fetch" error**: Check if sitemap.xml is accessible at `https://churnrecovery.com/sitemap.xml`
- **Parsing errors**: Validate XML syntax using [XML validator](https://www.xmlvalidation.com/)
- **0 indexed pages**: Ensure pages don't have noindex tags or robots.txt blocks

### Validation Commands
```bash
# Test sitemap accessibility
curl -I https://churnrecovery.com/sitemap.xml

# Validate XML syntax locally
xmllint --noout public/sitemap.xml
```

---

**Last Updated**: March 20, 2026  
**Sitemap URL**: https://churnrecovery.com/sitemap.xml  
**Total URLs**: 47