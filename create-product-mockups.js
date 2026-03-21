const { chromium } = require('playwright');

async function createProductMockups() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport for product screenshots
  await page.setViewportSize({ width: 1400, height: 900 });
  
  try {
    // Create Dashboard Mockup
    console.log('Creating dashboard mockup...');
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; background: #fafaf5; }
          .dashboard { display: flex; min-height: 100vh; }
          .sidebar { width: 240px; background: #fff; border-right: 1px solid #e5e5e5; padding: 24px 0; }
          .main { flex: 1; padding: 32px 40px; }
          .nav-item { padding: 8px 24px; color: #666; border-left: 3px solid transparent; }
          .nav-item.active { color: #d97757; border-left-color: #d97757; background: #fdf8f5; }
          .stats { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 24px; margin-bottom: 32px; }
          .stat-card { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; }
          .stat-number { font-size: 2rem; font-weight: 700; color: #191919; }
          .stat-label { color: #666; font-size: 0.85rem; margin-top: 4px; }
          .stat-change { color: #2d7a4f; font-size: 0.8rem; font-weight: 600; }
          .chart-container { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; }
          .chart { height: 300px; background: linear-gradient(45deg, #d97757 0%, #2d7a4f 100%); border-radius: 8px; position: relative; overflow: hidden; }
          .chart::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 80px; background: linear-gradient(to top, rgba(255,255,255,0.9), transparent); }
          .logo { display: flex; align-items: center; gap: 8px; padding: 0 24px 16px; border-bottom: 1px solid #e5e5e5; margin-bottom: 16px; }
          .logo-icon { width: 24px; height: 24px; background: #d97757; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="dashboard">
          <div class="sidebar">
            <div class="logo">
              <div class="logo-icon">C</div>
              <span style="font-weight: 600; color: #191919;">ChurnRecovery</span>
            </div>
            <div class="nav-item active">📊 Dashboard</div>
            <div class="nav-item">🔧 Cancel Flows</div>
            <div class="nav-item">📧 Email Sequences</div>
            <div class="nav-item">⚡ Integrations</div>
            <div class="nav-item">⚙️ Settings</div>
          </div>
          <div class="main">
            <h1 style="margin: 0 0 32px 0; color: #191919; font-size: 1.75rem; font-weight: 700;">Recovery Dashboard</h1>
            <div class="stats">
              <div class="stat-card">
                <div class="stat-number">$12,847</div>
                <div class="stat-label">Recovered Revenue</div>
                <div class="stat-change">+23% from last month</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">67%</div>
                <div class="stat-label">Save Rate</div>
                <div class="stat-change">+5% from last month</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">431</div>
                <div class="stat-label">Cancellation Attempts</div>
                <div class="stat-change">+12% from last month</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">289</div>
                <div class="stat-label">Customers Saved</div>
                <div class="stat-change">+18% from last month</div>
              </div>
            </div>
            <div class="chart-container">
              <h3 style="margin: 0 0 24px 0; color: #191919;">Recovery Performance</h3>
              <div class="chart"></div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    
    await page.screenshot({ 
      path: 'public/screenshots/product-dashboard.png',
      fullPage: false
    });

    // Create Cancel Flow Builder Mockup
    console.log('Creating cancel flow builder mockup...');
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; background: #fafaf5; }
          .dashboard { display: flex; min-height: 100vh; }
          .sidebar { width: 240px; background: #fff; border-right: 1px solid #e5e5e5; padding: 24px 0; }
          .main { flex: 1; padding: 32px 40px; }
          .nav-item { padding: 8px 24px; color: #666; border-left: 3px solid transparent; }
          .nav-item.active { color: #d97757; border-left-color: #d97757; background: #fdf8f5; }
          .flow-builder { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
          .flow-config { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; }
          .flow-preview { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; }
          .form-group { margin-bottom: 24px; }
          .form-label { display: block; margin-bottom: 8px; font-weight: 600; color: #191919; }
          .form-input { width: 100%; padding: 12px; border: 1px solid #e5e5e5; border-radius: 8px; }
          .reason-item { background: #f8f8f8; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }
          .logo { display: flex; align-items: center; gap: 8px; padding: 0 24px 16px; border-bottom: 1px solid #e5e5e5; margin-bottom: 16px; }
          .logo-icon { width: 24px; height: 24px; background: #d97757; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 12px; }
          .preview-modal { border: 2px solid #d97757; border-radius: 12px; padding: 32px; background: #fff; }
        </style>
      </head>
      <body>
        <div class="dashboard">
          <div class="sidebar">
            <div class="logo">
              <div class="logo-icon">C</div>
              <span style="font-weight: 600; color: #191919;">ChurnRecovery</span>
            </div>
            <div class="nav-item">📊 Dashboard</div>
            <div class="nav-item active">🔧 Cancel Flows</div>
            <div class="nav-item">📧 Email Sequences</div>
            <div class="nav-item">⚡ Integrations</div>
            <div class="nav-item">⚙️ Settings</div>
          </div>
          <div class="main">
            <h1 style="margin: 0 0 32px 0; color: #191919; font-size: 1.75rem; font-weight: 700;">Cancel Flow Builder</h1>
            <div class="flow-builder">
              <div class="flow-config">
                <h3 style="margin: 0 0 24px 0; color: #191919;">Flow Configuration</h3>
                <div class="form-group">
                  <label class="form-label">Flow Name</label>
                  <input class="form-input" value="Default Cancel Prevention" />
                </div>
                <div class="form-group">
                  <label class="form-label">Cancellation Reasons</label>
                  <div class="reason-item">
                    <span>💰</span>
                    <span>It's too expensive</span>
                    <span style="margin-left: auto; color: #2d7a4f; font-size: 0.8rem;">25% discount offer</span>
                  </div>
                  <div class="reason-item">
                    <span>📊</span>
                    <span>I'm not using it enough</span>
                    <span style="margin-left: auto; color: #2d7a4f; font-size: 0.8rem;">Usage tips + pause option</span>
                  </div>
                  <div class="reason-item">
                    <span>🔧</span>
                    <span>Missing features I need</span>
                    <span style="margin-left: auto; color: #2d7a4f; font-size: 0.8rem;">Feature roadmap + feedback</span>
                  </div>
                </div>
              </div>
              <div class="flow-preview">
                <h3 style="margin: 0 0 24px 0; color: #191919;">Live Preview</h3>
                <div class="preview-modal">
                  <h2 style="margin: 0 0 16px 0; color: #191919;">Before you go — why are you canceling?</h2>
                  <p style="color: #666; margin-bottom: 24px;">We'd love to understand how we can improve. Select your reason below:</p>
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    <button style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid #e5e5e5; border-radius: 8px; background: #fff; text-align: left; cursor: pointer;">
                      <span>💰</span>
                      <span>It's too expensive</span>
                    </button>
                    <button style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid #e5e5e5; border-radius: 8px; background: #fff; text-align: left; cursor: pointer;">
                      <span>📊</span>
                      <span>I'm not using it enough</span>
                    </button>
                    <button style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid #e5e5e5; border-radius: 8px; background: #fff; text-align: left; cursor: pointer;">
                      <span>🔧</span>
                      <span>Missing features I need</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    
    await page.screenshot({ 
      path: 'public/screenshots/product-flow-builder.png',
      fullPage: false
    });

    console.log('Product mockup screenshots created successfully!');
    
  } catch (error) {
    console.error('Error creating mockups:', error);
  } finally {
    await browser.close();
  }
}

createProductMockups();