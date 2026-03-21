const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12 Pro viewport
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  
  console.log('Loading homepage at mobile viewport (390x844)...');
  await page.goto('http://localhost:3050', { waitUntil: 'networkidle' });
  
  // Wait for any dynamic content to load
  await page.waitForTimeout(2000);
  
  console.log('Taking mobile screenshot...');
  await page.screenshot({ 
    path: 'mobile-homepage-screenshot.png', 
    fullPage: true 
  });
  
  console.log('✅ Mobile screenshot saved as mobile-homepage-screenshot.png');
  console.log('Viewport size: 390x844px (iPhone 12 Pro)');
  
  await browser.close();
})();