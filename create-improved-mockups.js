const { chromium } = require('playwright');

async function createImprovedMockups() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport for product screenshots with browser chrome
  await page.setViewportSize({ width: 1440, height: 1024 });
  
  try {
    // Improved Dashboard with Real Chart
    console.log('Creating improved dashboard with real chart...');
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
          .stats { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 20px; margin-bottom: 32px; }
          .stat-card { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; }
          .stat-number { font-size: 1.8rem; font-weight: 700; color: #191919; }
          .stat-label { color: #666; font-size: 0.8rem; margin-top: 4px; }
          .stat-change { color: #2d7a4f; font-size: 0.75rem; font-weight: 600; margin-top: 4px; }
          .widgets { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px; }
          .chart-container { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; }
          .chart { height: 240px; position: relative; display: flex; align-items: end; justify-content: space-between; padding: 20px 0; }
          .chart-bar { background: linear-gradient(to top, #d97757, #f4a983); border-radius: 4px 4px 0 0; position: relative; width: 32px; }
          .chart-label { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #666; }
          .recent-events { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; }
          .event { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
          .event:last-child { border-bottom: none; }
          .event-icon { width: 8px; height: 8px; border-radius: 50%; background: #2d7a4f; }
          .event-text { font-size: 0.85rem; color: #191919; }
          .event-time { font-size: 0.75rem; color: #666; margin-left: auto; }
          .logo { display: flex; align-items: center; gap: 8px; padding: 0 24px 16px; border-bottom: 1px solid #e5e5e5; margin-bottom: 16px; }
          .logo-icon { width: 24px; height: 24px; background: #d97757; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 12px; }
          .bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
          .quick-stats { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; }
          .pie-chart { width: 120px; height: 120px; border-radius: 50%; background: conic-gradient(#d97757 0deg 144deg, #f4a983 144deg 216deg, #2d7a4f 216deg 288deg, #e5e5e5 288deg 360deg); margin: 0 auto 16px; position: relative; }
          .pie-legend { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
          .legend-item { display: flex; align-items: center; gap: 4px; font-size: 0.75rem; }
          .legend-color { width: 12px; height: 12px; border-radius: 2px; }
        </style>
      </head>
      <body>
        <div class="dashboard">
          <div class="sidebar">
            <div class="logo">
              <div class="logo-icon">C</div>
              <span style="font-weight: 600; color: #191919; font-size: 0.95rem;">ChurnRecovery</span>
            </div>
            <div class="nav-item active">📊 Dashboard</div>
            <div class="nav-item">🔧 Cancel Flows</div>
            <div class="nav-item">📧 Email Sequences</div>
            <div class="nav-item">💳 Payments</div>
            <div class="nav-item">⚡ Integrations</div>
            <div class="nav-item">👥 Customers</div>
            <div class="nav-item">⚙️ Settings</div>
          </div>
          <div class="main">
            <h1 style="margin: 0 0 28px 0; color: #191919; font-size: 1.6rem; font-weight: 700;">Recovery Dashboard</h1>
            <div class="stats">
              <div class="stat-card">
                <div class="stat-number">$12,847</div>
                <div class="stat-label">Recovered Revenue (30d)</div>
                <div class="stat-change">+23% vs last month</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">67%</div>
                <div class="stat-label">Save Rate</div>
                <div class="stat-change">+5% vs last month</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">431</div>
                <div class="stat-label">Cancellation Attempts</div>
                <div class="stat-change">+12% vs last month</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">289</div>
                <div class="stat-label">Customers Saved</div>
                <div class="stat-change">+18% vs last month</div>
              </div>
            </div>
            <div class="widgets">
              <div class="chart-container">
                <h3 style="margin: 0 0 20px 0; color: #191919; font-size: 1.1rem;">Recovery Performance (6 months)</h3>
                <div class="chart">
                  <div class="chart-bar" style="height: 45%;">
                    <div class="chart-label">Oct</div>
                  </div>
                  <div class="chart-bar" style="height: 60%;">
                    <div class="chart-label">Nov</div>
                  </div>
                  <div class="chart-bar" style="height: 55%;">
                    <div class="chart-label">Dec</div>
                  </div>
                  <div class="chart-bar" style="height: 70%;">
                    <div class="chart-label">Jan</div>
                  </div>
                  <div class="chart-bar" style="height: 85%;">
                    <div class="chart-label">Feb</div>
                  </div>
                  <div class="chart-bar" style="height: 100%;">
                    <div class="chart-label">Mar</div>
                  </div>
                </div>
                <div style="text-align: center; margin-top: 8px; font-size: 0.75rem; color: #666;">Monthly Revenue Recovered ($)</div>
              </div>
              <div class="recent-events">
                <h3 style="margin: 0 0 16px 0; color: #191919; font-size: 1.1rem;">Recent Saves</h3>
                <div class="event">
                  <div class="event-icon"></div>
                  <div class="event-text">Sarah M. accepted 25% discount</div>
                  <div class="event-time">2m ago</div>
                </div>
                <div class="event">
                  <div class="event-icon"></div>
                  <div class="event-text">Mike R. paused for 2 months</div>
                  <div class="event-time">5m ago</div>
                </div>
                <div class="event">
                  <div class="event-icon"></div>
                  <div class="event-text">Lisa K. upgraded to annual</div>
                  <div class="event-time">12m ago</div>
                </div>
                <div class="event">
                  <div class="event-icon"></div>
                  <div class="event-text">Tom B. requested feature demo</div>
                  <div class="event-time">18m ago</div>
                </div>
                <div class="event">
                  <div class="event-icon"></div>
                  <div class="event-text">Jenny W. accepted pause offer</div>
                  <div class="event-time">23m ago</div>
                </div>
              </div>
            </div>
            <div class="bottom-row">
              <div class="quick-stats">
                <h3 style="margin: 0 0 16px 0; color: #191919; font-size: 1.1rem;">Recovery Rate by Plan</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 0.85rem;">
                  <div>Starter: <strong>62%</strong></div>
                  <div>Pro: <strong>71%</strong></div>
                  <div>Business: <strong>89%</strong></div>
                  <div>Enterprise: <strong>94%</strong></div>
                </div>
              </div>
              <div class="chart-container">
                <h3 style="margin: 0 0 16px 0; color: #191919; font-size: 1.1rem;">Top Reasons</h3>
                <div class="pie-chart"></div>
                <div class="pie-legend">
                  <div class="legend-item">
                    <div class="legend-color" style="background: #d97757;"></div>
                    <span>Too expensive (40%)</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color" style="background: #f4a983;"></div>
                    <span>Not using (20%)</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color" style="background: #2d7a4f;"></div>
                    <span>Missing features (20%)</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color" style="background: #e5e5e5;"></div>
                    <span>Other (20%)</span>
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
      path: 'public/screenshots/product-dashboard-improved.png',
      fullPage: false
    });

    // Create Email Sequences Builder
    console.log('Creating email sequences builder...');
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
          .sequence-builder { display: grid; grid-template-columns: 300px 1fr; gap: 32px; }
          .sequence-list { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; }
          .sequence-editor { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; }
          .sequence-item { background: #f8f8f8; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; margin-bottom: 12px; cursor: pointer; }
          .sequence-item.active { border-color: #d97757; background: #fdf8f5; }
          .email-timeline { display: flex; flex-direction: column; gap: 24px; }
          .email-step { display: flex; gap: 16px; }
          .step-connector { width: 2px; background: #e5e5e5; margin: 20px 0; }
          .step-number { width: 32px; height: 32px; border-radius: 50%; background: #d97757; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; flex-shrink: 0; }
          .step-content { flex: 1; }
          .email-preview { background: #f8f8f8; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; margin-top: 12px; }
          .email-header { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.8rem; color: #666; }
          .email-subject { font-weight: 600; color: #191919; margin-bottom: 8px; }
          .email-body { font-size: 0.85rem; line-height: 1.5; color: #191919; }
          .logo { display: flex; align-items: center; gap: 8px; padding: 0 24px 16px; border-bottom: 1px solid #e5e5e5; margin-bottom: 16px; }
          .logo-icon { width: 24px; height: 24px; background: #d97757; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 12px; }
          .add-email { border: 2px dashed #d97757; border-radius: 8px; padding: 20px; text-align: center; color: #d97757; font-weight: 600; cursor: pointer; }
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
            <div class="nav-item active">📧 Email Sequences</div>
            <div class="nav-item">💳 Payments</div>
            <div class="nav-item">⚡ Integrations</div>
            <div class="nav-item">👥 Customers</div>
            <div class="nav-item">⚙️ Settings</div>
          </div>
          <div class="main">
            <h1 style="margin: 0 0 28px 0; color: #191919; font-size: 1.6rem; font-weight: 700;">Email Sequences</h1>
            <div class="sequence-builder">
              <div class="sequence-list">
                <h3 style="margin: 0 0 16px 0; color: #191919; font-size: 1.1rem;">Active Sequences</h3>
                <div class="sequence-item active">
                  <div style="font-weight: 600; margin-bottom: 4px;">Price Objection</div>
                  <div style="font-size: 0.8rem; color: #666;">3 emails • 45% open rate</div>
                </div>
                <div class="sequence-item">
                  <div style="font-weight: 600; margin-bottom: 4px;">Feature Request</div>
                  <div style="font-size: 0.8rem; color: #666;">2 emails • 38% open rate</div>
                </div>
                <div class="sequence-item">
                  <div style="font-weight: 600; margin-bottom: 4px;">Usage Drop</div>
                  <div style="font-size: 0.8rem; color: #666;">4 emails • 52% open rate</div>
                </div>
                <div class="sequence-item">
                  <div style="font-weight: 600; margin-bottom: 4px;">Failed Payment</div>
                  <div style="font-size: 0.8rem; color: #666;">2 emails • 67% open rate</div>
                </div>
              </div>
              <div class="sequence-editor">
                <h3 style="margin: 0 0 20px 0; color: #191919; font-size: 1.1rem;">Price Objection Sequence</h3>
                <div class="email-timeline">
                  <div class="email-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <div style="font-weight: 600; margin-bottom: 8px;">Immediate Response (Trigger: Price objection)</div>
                      <div class="email-preview">
                        <div class="email-header">
                          <span>To: {{customer.email}}</span>
                          <span>Sent immediately</span>
                        </div>
                        <div class="email-subject">We heard you — let's find a solution that works</div>
                        <div class="email-body">Hi {{customer.first_name}},<br><br>I saw you mentioned pricing as a concern. We totally understand — every dollar counts when running a business...<br><br><strong>How about 25% off for the next 3 months?</strong></div>
                      </div>
                    </div>
                  </div>
                  <div class="step-connector"></div>
                  <div class="email-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <div style="font-weight: 600; margin-bottom: 8px;">Follow-up (3 days later)</div>
                      <div class="email-preview">
                        <div class="email-header">
                          <span>To: {{customer.email}}</span>
                          <span>3 days after email 1</span>
                        </div>
                        <div class="email-subject">One more idea for you...</div>
                        <div class="email-body">Hey {{customer.first_name}},<br><br>Still thinking about the discount? I have another idea that might work better...<br><br><strong>What about switching to annual billing for 2 months free?</strong></div>
                      </div>
                    </div>
                  </div>
                  <div class="step-connector"></div>
                  <div class="email-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <div style="font-weight: 600; margin-bottom: 8px;">Final Outreach (7 days later)</div>
                      <div class="email-preview">
                        <div class="email-header">
                          <span>To: {{customer.email}}</span>
                          <span>7 days after email 2</span>
                        </div>
                        <div class="email-subject">Before you go — one last thought</div>
                        <div class="email-body">{{customer.first_name}},<br><br>I wanted to reach out personally. Losing customers hurts, especially when it's about pricing...<br><br><strong>Can we schedule a 10-minute call to find something that works?</strong></div>
                      </div>
                    </div>
                  </div>
                  <div class="step-connector"></div>
                  <div class="add-email">+ Add Another Email</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    
    await page.screenshot({ 
      path: 'public/screenshots/product-email-sequences.png',
      fullPage: false
    });

    console.log('Improved product mockups created successfully!');
    
  } catch (error) {
    console.error('Error creating improved mockups:', error);
  } finally {
    await browser.close();
  }
}

createImprovedMockups();