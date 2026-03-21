# Submit Sitemap to Google Search Console

## Steps

1. **Go to Google Search Console**
   - Visit: https://search.google.com/search-console

2. **Add Property**
   - Click "Add property"
   - Choose "URL prefix" method
   - Enter: `https://churnrecovery.com`

3. **Verify Ownership**
   - Select "HTML tag" verification method
   - The meta tag is already in our HTML:
     ```html
     <meta name="google-site-verification" content="cCAZpDlVK-QR4d6LRkvvBRonJmsCtHtEdkGzH_DsNSs" />
     ```
   - This is in `pages/_app.js` and deployed to all pages
   - Click "Verify"

4. **Submit Sitemap**
   - In the left sidebar, click "Sitemaps"
   - Enter: `sitemap.xml`
   - Click "Submit"
   - URL submitted: `https://churnrecovery.com/sitemap.xml`

5. **Verify Submission**
   - Status should show "Success" or "Pending"
   - Google will begin crawling pages listed in the sitemap
   - Initial indexing can take days to weeks

## Notes
- The sitemap is auto-generated at build time
- It includes all pages, blog posts, and landing pages
- After major content changes (like date updates), redeploy and re-submit
