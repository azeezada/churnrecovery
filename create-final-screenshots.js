const { chromium } = require('playwright');

async function createFinalScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport for browser chrome simulation
  await page.setViewportSize({ width: 1440, height: 1024 });
  
  try {
    // Create Integrations Page
    console.log('Creating integrations page...');
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; background: #fafaf5; }
          .dashboard { display: flex; min-height: 100vh; }
          .sidebar { width: 240px; background: #fff; border-right: 1px solid #e5e5e5; padding: 24px 0; }
          .main { flex: 1; padding: 32px 40px; max-width: 1000px; }
          .nav-item { padding: 8px 24px; color: #666; border-left: 3px solid transparent; font-size: 0.9rem; }
          .nav-item.active { color: #d97757; border-left-color: #d97757; background: #fdf8f5; }
          .integration-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
          .integration-card { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; }
          .integration-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
          .integration-logo { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; }
          .stripe-logo { background: linear-gradient(135deg, #635bff, #4c44e0); }
          .paddle-logo { background: linear-gradient(135deg, #7c3aed, #5b21b6); }
          .zapier-logo { background: linear-gradient(135deg, #ff4f00, #ff6b1a); }
          .webhook-logo { background: linear-gradient(135deg, #374151, #1f2937); }
          .integration-status { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
          .status-dot { width: 8px; height: 8px; border-radius: 50%; }
          .status-connected { background: #2d7a4f; }
          .status-available { background: #e5e5e5; }
          .config-field { margin-bottom: 16px; }
          .config-label { display: block; margin-bottom: 6px; font-weight: 600; color: #191919; font-size: 0.9rem; }
          .config-input { width: 100%; padding: 10px; border: 1px solid #e5e5e5; border-radius: 6px; font-size: 0.9rem; }
          .config-button { background: #d97757; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; }
          .config-button.secondary { background: #e5e5e5; color: #191919; }
          .logo { display: flex; align-items: center; gap: 8px; padding: 0 24px 16px; border-bottom: 1px solid #e5e5e5; margin-bottom: 16px; }
          .logo-icon { width: 24px; height: 24px; background: #d97757; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 12px; }
          .help-text { font-size: 0.8rem; color: #666; margin-top: 8px; }
        </style>
      </head>
      <body>
        <div class="dashboard">
          <div class="sidebar">
            <div class="logo">
              <div class="logo-icon">C</div>
              <span style="font-weight: 600; color: #191919; font-size: 0.95rem;">ChurnRecovery</span>
            </div>
            <div class="nav-item">📊 Dashboard</div>
            <div class="nav-item">🔧 Cancel Flows</div>
            <div class="nav-item">📧 Email Sequences</div>
            <div class="nav-item">💳 Payments</div>
            <div class="nav-item active">⚡ Integrations</div>
            <div class="nav-item">👥 Customers</div>
            <div class="nav-item">⚙️ Settings</div>
          </div>
          <div class="main">
            <h1 style="margin: 0 0 28px 0; color: #191919; font-size: 1.6rem; font-weight: 700;">Integrations</h1>
            <div class="integration-grid">
              <div class="integration-card">
                <div class="integration-header">
                  <div class="integration-logo stripe-logo">S</div>
                  <div>
                    <div style="font-weight: 600; color: #191919; margin-bottom: 4px;">Stripe</div>
                    <div style="font-size: 0.8rem; color: #666;">Payment processor</div>
                  </div>
                </div>
                <div class="integration-status">
                  <div class="status-dot status-connected"></div>
                  <span style="font-size: 0.9rem; font-weight: 600; color: #2d7a4f;">Connected</span>
                </div>
                <div class="config-field">
                  <label class="config-label">Webhook Endpoint</label>
                  <input class="config-input" value="https://api.churnrecovery.com/stripe/hooks" readonly />
                  <div class="help-text">Add this to your Stripe dashboard webhook endpoints</div>
                </div>
                <div class="config-field">
                  <label class="config-label">Events</label>
                  <div style="font-size: 0.85rem; color: #191919; padding: 8px 0;">
                    ✓ customer.subscription.deleted<br>
                    ✓ invoice.payment_failed<br>
                    ✓ customer.subscription.updated
                  </div>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="config-button secondary">Test Connection</button>
                  <button class="config-button secondary">Disconnect</button>
                </div>
              </div>
              
              <div class="integration-card">
                <div class="integration-header">
                  <div class="integration-logo paddle-logo">P</div>
                  <div>
                    <div style="font-weight: 600; color: #191919; margin-bottom: 4px;">Paddle</div>
                    <div style="font-size: 0.8rem; color: #666;">Payment processor</div>
                  </div>
                </div>
                <div class="integration-status">
                  <div class="status-dot status-available"></div>
                  <span style="font-size: 0.9rem; color: #666;">Available</span>
                </div>
                <div class="config-field">
                  <label class="config-label">Vendor ID</label>
                  <input class="config-input" placeholder="Enter your Paddle vendor ID" />
                </div>
                <div class="config-field">
                  <label class="config-label">API Key</label>
                  <input class="config-input" placeholder="Enter your Paddle API key" type="password" />
                </div>
                <button class="config-button">Connect Paddle</button>
              </div>
              
              <div class="integration-card">
                <div class="integration-header">
                  <div class="integration-logo zapier-logo">Z</div>
                  <div>
                    <div style="font-weight: 600; color: #191919; margin-bottom: 4px;">Zapier</div>
                    <div style="font-size: 0.8rem; color: #666;">Automation platform</div>
                  </div>
                </div>
                <div class="integration-status">
                  <div class="status-dot status-connected"></div>
                  <span style="font-size: 0.9rem; font-weight: 600; color: #2d7a4f;">Connected</span>
                </div>
                <div style="font-size: 0.85rem; color: #191919; margin-bottom: 16px;">
                  <strong>Active Zaps:</strong><br>
                  • Save event → Slack notification<br>
                  • Failed recovery → Update CRM<br>
                  • New cancellation → Email team
                </div>
                <button class="config-button secondary">Manage Zaps</button>
              </div>
              
              <div class="integration-card">
                <div class="integration-header">
                  <div class="integration-logo webhook-logo">W</div>
                  <div>
                    <div style="font-weight: 600; color: #191919; margin-bottom: 4px;">Custom Webhooks</div>
                    <div style="font-size: 0.8rem; color: #666;">Send events to your app</div>
                  </div>
                </div>
                <div class="integration-status">
                  <div class="status-dot status-connected"></div>
                  <span style="font-size: 0.9rem; font-weight: 600; color: #2d7a4f;">2 Active</span>
                </div>
                <div class="config-field">
                  <label class="config-label">Endpoint URL</label>
                  <input class="config-input" placeholder="https://yourapp.com/webhooks/churnrecovery" />
                </div>
                <div class="config-field">
                  <label class="config-label">Events to Send</label>
                  <div style="font-size: 0.85rem; color: #191919; padding: 8px 0;">
                    ☑ customer.saved<br>
                    ☑ cancellation.prevented<br>
                    ☐ offer.rejected
                  </div>
                </div>
                <button class="config-button">Add Webhook</button>
              </div>
            </div>
            
            <div style="background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px;">
              <h3 style="margin: 0 0 16px 0; color: #191919; font-size: 1.1rem;">Need Another Integration?</h3>
              <p style="margin: 0 0 16px 0; color: #666; font-size: 0.9rem;">We're always adding new integrations. Let us know what you need!</p>
              <div style="display: flex; gap: 12px;">
                <button class="config-button">Request Integration</button>
                <button class="config-button secondary">View API Docs</button>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    
    await page.screenshot({ 
      path: 'public/screenshots/product-integrations.png',
      fullPage: false
    });

    // Now wrap the best screenshots in browser chrome
    console.log('Creating browser-framed versions...');
    
    // Frame the improved dashboard
    await page.setViewportSize({ width: 1600, height: 1200 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; background: #f0f0f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
          .browser { background: #fff; border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.15); overflow: hidden; }
          .browser-header { height: 36px; background: #e8e8e8; display: flex; align-items: center; padding: 0 16px; border-bottom: 1px solid #d0d0d0; }
          .browser-buttons { display: flex; gap: 8px; }
          .browser-button { width: 12px; height: 12px; border-radius: 50%; }
          .close { background: #ff5f57; }
          .minimize { background: #ffbd2e; }
          .maximize { background: #28ca42; }
          .address-bar { flex: 1; margin: 0 20px; height: 22px; background: #fff; border: 1px solid #c0c0c0; border-radius: 4px; display: flex; align-items: center; padding: 0 8px; font-size: 11px; color: #666; }
          .browser-content { width: 1400px; height: 900px; background: #fafaf5; }
        </style>
      </head>
      <body>
        <div class="browser">
          <div class="browser-header">
            <div class="browser-buttons">
              <div class="browser-button close"></div>
              <div class="browser-button minimize"></div>
              <div class="browser-button maximize"></div>
            </div>
            <div class="address-bar">https://app.churnrecovery.com/dashboard</div>
          </div>
          <div class="browser-content">
            <iframe src="data:text/html,${encodeURIComponent(await page.content())}" width="1400" height="900" frameborder="0"></iframe>
          </div>
        </div>
      </body>
      </html>
    `);
    
    console.log('Final screenshot package created successfully!');
    
  } catch (error) {
    console.error('Error creating final screenshots:', error);
  } finally {
    await browser.close();
  }
}

createFinalScreenshots();