const { chromium } = require('playwright');

async function takeScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport for consistent screenshots
  await page.setViewportSize({ width: 1400, height: 900 });
  
  try {
    // Screenshot 1: Homepage hero section
    console.log('Taking homepage screenshot...');
    await page.goto('https://churnrecovery.com');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'public/screenshots/homepage-hero.png',
      fullPage: false,
      clip: { x: 0, y: 0, width: 1400, height: 700 }
    });
    
    // Screenshot 2: Demo page
    console.log('Taking demo page screenshot...');
    await page.goto('https://churnrecovery.com/demo');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'public/screenshots/demo-page.png',
      fullPage: false 
    });
    
    // Screenshot 3: Comparison page
    console.log('Taking comparison page screenshot...');
    await page.goto('https://churnrecovery.com/compare/churnkey');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'public/screenshots/comparison-page.png',
      fullPage: false,
      clip: { x: 0, y: 0, width: 1400, height: 800 }
    });
    
    // Screenshot 4: Features section (from homepage)
    console.log('Taking features screenshot...');
    await page.goto('https://churnrecovery.com');
    await page.waitForLoadState('networkidle');
    // Scroll to features section
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'public/screenshots/features-section.png',
      fullPage: false,
      clip: { x: 0, y: 600, width: 1400, height: 800 }
    });
    
    console.log('Screenshots saved to public/screenshots/');
    
  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshots();