/**
 * generate-ph-assets.mjs
 * Generates Product Hunt gallery assets at 1270x760px using Playwright.
 * Run: node scripts/generate-ph-assets.mjs
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'ph-assets');

async function generateExitSurveyAnalytics(page) {
  await page.setViewportSize({ width: 1270, height: 760 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; 
          background: #fafaf5; 
          width: 1270px; height: 760px; overflow: hidden;
        }
        .wrapper { display: flex; height: 100vh; }
        .sidebar { 
          width: 220px; background: #fff; border-right: 1px solid #e5e5e5; 
          padding: 24px 0; flex-shrink: 0;
        }
        .logo { padding: 0 24px 20px; font-weight: 800; font-size: 1.1rem; color: #191919; border-bottom: 1px solid #f0f0f0; margin-bottom: 16px; }
        .nav-item { 
          padding: 9px 24px; color: #888; font-size: 0.88rem; cursor: pointer;
          border-left: 3px solid transparent;
        }
        .nav-item.active { color: #d97757; border-left-color: #d97757; background: #fdf8f5; font-weight: 600; }
        .main { flex: 1; padding: 32px 36px; overflow: hidden; background: #fafaf5; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
        .title { font-size: 1.35rem; font-weight: 800; color: #191919; letter-spacing: -0.02em; }
        .date-filter { 
          background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; 
          padding: 7px 14px; font-size: 0.82rem; color: #666; 
        }
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-bottom: 28px; }
        .stat { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 18px 22px; }
        .stat-num { font-size: 2rem; font-weight: 800; color: #191919; letter-spacing: -0.03em; }
        .stat-label { font-size: 0.8rem; color: #888; margin-top: 4px; }
        .stat-badge { 
          display: inline-block; font-size: 0.72rem; font-weight: 700; 
          padding: 2px 8px; border-radius: 20px; margin-top: 6px;
        }
        .green { background: #e6f5ee; color: #2d7a4f; }
        .red { background: #fef0ee; color: #d97757; }
        .content-row { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; }
        .card { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 22px; }
        .card-title { font-size: 0.9rem; font-weight: 700; color: #191919; margin-bottom: 18px; }
        .bar-item { margin-bottom: 14px; }
        .bar-label { display: flex; justify-content: space-between; font-size: 0.82rem; color: #555; margin-bottom: 5px; }
        .bar-label span:last-child { font-weight: 700; color: #191919; }
        .bar-track { background: #f0f0f0; border-radius: 4px; height: 8px; }
        .bar-fill { height: 8px; border-radius: 4px; }
        .reason-item { 
          display: flex; align-items: center; gap: 12px; 
          padding: 12px 0; border-bottom: 1px solid #f5f5f5;
        }
        .reason-item:last-child { border-bottom: none; }
        .reason-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .reason-text { font-size: 0.85rem; color: #333; flex: 1; }
        .reason-pct { font-size: 0.85rem; font-weight: 700; color: #191919; }
        .reason-count { font-size: 0.78rem; color: #aaa; margin-left: 6px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="sidebar">
          <div class="logo">ChurnRecovery</div>
          <div class="nav-item">Dashboard</div>
          <div class="nav-item">Cancel Flows</div>
          <div class="nav-item">Recovery Emails</div>
          <div class="nav-item active">Exit Surveys</div>
          <div class="nav-item">Integrations</div>
          <div class="nav-item">Settings</div>
        </div>
        <div class="main">
          <div class="header">
            <div class="title">Exit Survey Analytics</div>
            <div class="date-filter">Last 30 days ▾</div>
          </div>

          <div class="stats-row">
            <div class="stat">
              <div class="stat-num">247</div>
              <div class="stat-label">Surveys completed</div>
              <div class="stat-badge green">+18% vs last month</div>
            </div>
            <div class="stat">
              <div class="stat-num">73%</div>
              <div class="stat-label">Completion rate</div>
              <div class="stat-badge green">Industry avg: 42%</div>
            </div>
            <div class="stat">
              <div class="stat-num">$4,820</div>
              <div class="stat-label">Revenue at risk identified</div>
              <div class="stat-badge red">34% addressable</div>
            </div>
          </div>

          <div class="content-row">
            <div class="card">
              <div class="card-title">Top cancellation reasons</div>
              <div class="bar-item">
                <div class="bar-label"><span>Too expensive / pricing</span><span>34%</span></div>
                <div class="bar-track"><div class="bar-fill" style="width:34%; background:#d97757;"></div></div>
              </div>
              <div class="bar-item">
                <div class="bar-label"><span>Not using it enough</span><span>28%</span></div>
                <div class="bar-track"><div class="bar-fill" style="width:28%; background:#f4a76f;"></div></div>
              </div>
              <div class="bar-item">
                <div class="bar-label"><span>Found a better alternative</span><span>18%</span></div>
                <div class="bar-track"><div class="bar-fill" style="width:18%; background:#f9c8a0;"></div></div>
              </div>
              <div class="bar-item">
                <div class="bar-label"><span>Missing features</span><span>12%</span></div>
                <div class="bar-track"><div class="bar-fill" style="width:12%; background:#e5e5e5;"></div></div>
              </div>
              <div class="bar-item">
                <div class="bar-label"><span>Business closing / pausing</span><span>8%</span></div>
                <div class="bar-track"><div class="bar-fill" style="width:8%; background:#e5e5e5;"></div></div>
              </div>
            </div>

            <div class="card">
              <div class="card-title">Actionable insights</div>
              <div class="reason-item">
                <div class="reason-dot" style="background:#d97757;"></div>
                <div class="reason-text">Offer a pause or discount to "too expensive" segment</div>
                <div>
                  <div class="reason-pct">84 users</div>
                  <div class="reason-count">~$1,640/mo at risk</div>
                </div>
              </div>
              <div class="reason-item">
                <div class="reason-dot" style="background:#f4a76f;"></div>
                <div class="reason-text">Re-engagement email for "not using it" segment</div>
                <div>
                  <div class="reason-pct">69 users</div>
                  <div class="reason-count">~$1,340/mo at risk</div>
                </div>
              </div>
              <div class="reason-item">
                <div class="reason-dot" style="background:#e5e5e5;"></div>
                <div class="reason-text">Product feedback loop for feature gaps</div>
                <div>
                  <div class="reason-pct">30 users</div>
                  <div class="reason-count">~$580/mo at risk</div>
                </div>
              </div>
              <div style="margin-top:16px; padding:14px; background:#fdf8f5; border-radius:8px; border:1px solid #f0e8e0;">
                <div style="font-size:0.8rem; font-weight:700; color:#d97757; margin-bottom:4px;">💡 AI Suggestion</div>
                <div style="font-size:0.8rem; color:#555; line-height:1.5;">Your pause offer converts 41% of "too expensive" cancellations. Consider testing a 2-month free extension for high-LTV users.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(OUT_DIR, '05-exit-survey-analytics.png'), fullPage: false });
  console.log('✅ Asset 5: Exit survey analytics generated');
}

async function generateCancelFlowPreview(page) {
  await page.setViewportSize({ width: 1270, height: 760 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; 
          background: #fafaf5; 
          width: 1270px; height: 760px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .scene {
          display: flex; gap: 48px; align-items: center; padding: 48px;
          width: 100%;
        }
        .browser-frame {
          background: #fff; border: 1px solid #e5e5e5; border-radius: 12px;
          overflow: hidden; flex: 1; box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .browser-bar {
          background: #f5f5f5; border-bottom: 1px solid #e5e5e5;
          padding: 10px 16px; display: flex; gap: 8px; align-items: center;
        }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .url { 
          flex: 1; background: #fff; border: 1px solid #e5e5e5; border-radius: 6px;
          padding: 5px 12px; font-size: 0.78rem; color: #888; margin-left: 8px;
        }
        .app-content { padding: 40px; }
        .app-title { font-size: 1.5rem; font-weight: 800; color: #191919; margin-bottom: 8px; }
        .app-sub { color: #888; font-size: 0.9rem; margin-bottom: 32px; }
        .cancel-btn {
          display: inline-block; background: #fff; border: 1px solid #e5e5e5;
          color: #888; padding: 10px 20px; border-radius: 8px; font-size: 0.88rem;
          cursor: pointer;
        }

        .modal-container {
          width: 420px; flex-shrink: 0;
        }
        .modal {
          background: #fff; border-radius: 16px; padding: 36px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.14); border: 1px solid #e5e5e5;
          position: relative;
        }
        .modal-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fdf8f5; border: 1px solid #f0e0d0; border-radius: 20px;
          padding: 4px 12px; font-size: 0.75rem; color: #d97757; font-weight: 700;
          margin-bottom: 16px;
        }
        .modal-title { font-size: 1.3rem; font-weight: 800; color: #191919; margin-bottom: 8px; line-height: 1.3; }
        .modal-body { font-size: 0.88rem; color: #666; line-height: 1.6; margin-bottom: 24px; }
        .offer-card {
          background: linear-gradient(135deg, #d97757 0%, #e89070 100%);
          border-radius: 12px; padding: 20px; color: #fff; margin-bottom: 20px;
          text-align: center;
        }
        .offer-title { font-size: 1.2rem; font-weight: 800; margin-bottom: 4px; }
        .offer-sub { font-size: 0.82rem; opacity: 0.85; }
        .btn-primary {
          display: block; width: 100%; background: #d97757; color: #fff;
          border: none; border-radius: 10px; padding: 14px;
          font-size: 0.95rem; font-weight: 700; cursor: pointer;
          text-align: center; margin-bottom: 10px;
        }
        .btn-secondary {
          display: block; width: 100%; background: transparent; color: #999;
          border: none; padding: 10px; font-size: 0.82rem; cursor: pointer;
          text-align: center; text-decoration: underline;
        }
        .powered-by {
          text-align: center; font-size: 0.72rem; color: #bbb; margin-top: 16px;
        }
        .arrow {
          font-size: 2rem; color: #d97757; flex-shrink: 0;
        }
      </style>
    </head>
    <body>
      <div class="scene">
        <!-- Left: app with cancel button -->
        <div class="browser-frame">
          <div class="browser-bar">
            <div class="dot" style="background:#FF5F57;"></div>
            <div class="dot" style="background:#FEBC2E;"></div>
            <div class="dot" style="background:#28C840;"></div>
            <div class="url">app.yourservice.com/settings/billing</div>
          </div>
          <div class="app-content">
            <div class="app-title">Account Settings</div>
            <div class="app-sub">Manage your subscription and billing</div>
            <div style="background:#f9f9f9; border-radius:10px; padding:20px; margin-bottom:20px; border:1px solid #eee;">
              <div style="font-weight:600; color:#191919; margin-bottom:4px;">Pro Plan</div>
              <div style="font-size:0.85rem; color:#888; margin-bottom:12px;">$49/month · Next billing March 31</div>
              <div class="cancel-btn" style="color:#e55; border-color:#fdd;">Cancel subscription →</div>
            </div>
            <div style="font-size:0.82rem; color:#bbb; text-align:center; margin-top:40px;">↑ Customer clicked "Cancel subscription"</div>
          </div>
        </div>

        <div class="arrow">→</div>

        <!-- Right: ChurnRecovery modal fires -->
        <div class="modal-container">
          <div class="modal">
            <div class="modal-badge">⚡ ChurnRecovery</div>
            <div class="modal-title">Wait — before you go!</div>
            <div class="modal-body">
              We'd hate to see you leave. As a valued customer, we'd like to offer you something special.
            </div>
            <div class="offer-card">
              <div class="offer-title">Pause for 2 months free</div>
              <div class="offer-sub">Come back when you're ready — no charge, no cancellation</div>
            </div>
            <button class="btn-primary">Yes, pause my account →</button>
            <button class="btn-secondary">I still want to cancel</button>
            <div class="powered-by">Powered by ChurnRecovery</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(OUT_DIR, '02-cancel-flow-modal.png'), fullPage: false });
  console.log('✅ Asset 2: Cancel flow modal generated (static version for PH)');
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await generateExitSurveyAnalytics(page);
    await generateCancelFlowPreview(page);
    console.log('\n🎉 All generated assets:');
    console.log('  01-dashboard.png           (resized from screenshots)');
    console.log('  02-cancel-flow-modal.png   (NEW — cancel flow modal scene)');
    console.log('  03-cancel-flow-builder.png (resized from screenshots)');
    console.log('  04-email-sequences.png     (resized from screenshots)');
    console.log('  05-exit-survey-analytics.png (NEW — analytics dashboard)');
    console.log('  06-pricing-comparison.png  (resized from screenshots)');
    console.log('  07-integration-setup.png   (resized from screenshots)');
    console.log('\n📁 Output: public/ph-assets/');
    console.log('📐 Size: 1270x760px (Product Hunt standard)');
    console.log('\n⚠️  NOTE: Asset 2 is a static PNG. For the GIF, record a Loom of /demo and convert with Gifski.');
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
