/**
 * ChurnRecovery Widget v1.0.0
 * Embeddable cancel flow widget — pure vanilla JS, no dependencies
 * Usage: <script src="https://cdn.churnrecovery.com/widget.js" data-project="PROJECT_ID" async></script>
 */
(function() {
  'use strict';

  var API_BASE = 'https://churnrecovery.com/api';
  var VERSION = '1.0.0';

  // Find script tag to read config
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  var config = {
    projectId: currentScript.getAttribute('data-project') || '',
    apiKey: currentScript.getAttribute('data-api-key') || '',
    theme: {
      primaryColor: currentScript.getAttribute('data-color') || '#D97757',
      fontFamily: currentScript.getAttribute('data-font') || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }
  };

  // Default cancel flow config
  var defaultFlow = {
    reasons: [
      { id: 'too-expensive', label: 'Too expensive', icon: '💰', offerType: 'discount', offerValue: 30, offerDuration: 3 },
      { id: 'not-using', label: 'Not using it enough', icon: '😴', offerType: 'pause', offerValue: 2 },
      { id: 'switching', label: 'Switching to a competitor', icon: '👋', offerType: 'discount', offerValue: 50, offerDuration: 6 },
      { id: 'missing-feature', label: 'Missing a feature I need', icon: '🔧', offerType: 'human' },
      { id: 'other', label: 'Something else', icon: '💬', offerType: 'feedback' },
    ]
  };

  var flowConfig = null;
  var sessionId = 'ses_' + Math.random().toString(36).substring(2, 14);

  // Styles
  var STYLES = '\
    .cr-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:999999; display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.2s; }\
    .cr-overlay.cr-show { opacity:1; }\
    .cr-modal { background:#fff; border-radius:16px; padding:32px; max-width:420px; width:calc(100% - 32px); max-height:calc(100vh - 64px); overflow-y:auto; transform:translateY(20px); transition:transform 0.25s; box-shadow:0 20px 60px rgba(0,0,0,0.15); position:relative; }\
    .cr-overlay.cr-show .cr-modal { transform:translateY(0); }\
    .cr-close { position:absolute; top:12px; right:12px; width:32px; height:32px; border:none; background:none; cursor:pointer; font-size:18px; color:#999; border-radius:50%; display:flex; align-items:center; justify-content:center; }\
    .cr-close:hover { background:#f5f5f5; color:#333; }\
    .cr-title { font-size:1.2rem; font-weight:700; color:#191919; margin:0 0 6px; text-align:center; letter-spacing:-0.02em; }\
    .cr-subtitle { font-size:0.88rem; color:#666; margin:0 0 24px; text-align:center; line-height:1.5; }\
    .cr-reasons { display:flex; flex-direction:column; gap:8px; }\
    .cr-reason-btn { display:flex; align-items:center; gap:12px; padding:14px 16px; border-radius:10px; border:1px solid #e5e5e5; background:#fff; cursor:pointer; font-size:0.9rem; color:#191919; text-align:left; width:100%; transition:border-color 0.15s,background 0.15s; }\
    .cr-reason-btn:hover { border-color:#D97757; background:#FDF4EF; }\
    .cr-reason-icon { font-size:1.2rem; flex-shrink:0; }\
    .cr-offer-icon { font-size:3rem; text-align:center; margin-bottom:16px; }\
    .cr-offer-title { font-size:1.1rem; font-weight:700; color:#191919; text-align:center; margin:0 0 8px; }\
    .cr-offer-desc { font-size:0.88rem; color:#666; text-align:center; margin:0 0 24px; line-height:1.5; }\
    .cr-btn-row { display:flex; gap:8px; }\
    .cr-btn-primary { flex:1; padding:12px 16px; border-radius:10px; border:none; font-size:0.9rem; font-weight:600; cursor:pointer; transition:opacity 0.15s; }\
    .cr-btn-primary:hover { opacity:0.9; }\
    .cr-btn-secondary { flex:1; padding:12px 16px; border-radius:10px; border:1px solid #e5e5e5; background:#fff; color:#666; font-size:0.9rem; font-weight:500; cursor:pointer; transition:background 0.15s; }\
    .cr-btn-secondary:hover { background:#f9f9f9; }\
    .cr-textarea { width:100%; padding:12px; border-radius:10px; border:1px solid #e5e5e5; font-size:0.88rem; resize:vertical; min-height:80px; outline:none; box-sizing:border-box; margin-bottom:16px; font-family:inherit; }\
    .cr-textarea:focus { border-color:#D97757; }\
    .cr-result-icon { font-size:3rem; text-align:center; margin-bottom:12px; }\
    .cr-result-title { font-size:1.1rem; font-weight:700; text-align:center; margin:0 0 8px; }\
    .cr-result-desc { font-size:0.88rem; color:#666; text-align:center; margin:0 0 20px; line-height:1.5; }\
    .cr-powered { text-align:center; margin-top:20px; font-size:0.7rem; color:#ccc; }\
    .cr-powered a { color:#bbb; text-decoration:none; }\
    .cr-powered a:hover { color:#999; }\
  ';

  // Inject styles
  function injectStyles() {
    if (document.getElementById('cr-styles')) return;
    var style = document.createElement('style');
    style.id = 'cr-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  // Fetch flow config from API
  function fetchFlowConfig(callback) {
    if (flowConfig) return callback(flowConfig);
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_BASE + '/cancel-flow?projectId=' + encodeURIComponent(config.projectId));
    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          flowConfig = JSON.parse(xhr.responseText);
        } catch(e) {
          flowConfig = defaultFlow;
        }
      } else {
        flowConfig = defaultFlow;
      }
      callback(flowConfig);
    };
    xhr.onerror = function() {
      flowConfig = defaultFlow;
      callback(flowConfig);
    };
    xhr.send();
  }

  // Post event to API
  function postEvent(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_BASE + '/events');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(Object.assign({ projectId: config.projectId, sessionId: sessionId }, data)));
  }

  // Create and show the cancel flow modal
  function showCancelFlow(options) {
    options = options || {};
    injectStyles();

    return new Promise(function(resolve) {
      fetchFlowConfig(function(flow) {
        var reasons = flow.reasons || defaultFlow.reasons;
        var overlay = document.createElement('div');
        overlay.className = 'cr-overlay';
        overlay.innerHTML = '<div class="cr-modal"><button class="cr-close">✕</button><div id="cr-content"></div><div class="cr-powered">Powered by <a href="https://churnrecovery.com" target="_blank">ChurnRecovery</a></div></div>';
        
        var content = overlay.querySelector('#cr-content');
        var modal = overlay.querySelector('.cr-modal');
        var primaryColor = config.theme.primaryColor;

        // Apply font
        modal.style.fontFamily = config.theme.fontFamily;

        // Close handler
        function close(result) {
          overlay.classList.remove('cr-show');
          setTimeout(function() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
          }, 200);
          resolve(result || { saved: false, reason: null, sessionId: sessionId });
        }

        overlay.querySelector('.cr-close').onclick = function() { close(); };
        overlay.onclick = function(e) { if (e.target === overlay) close(); };

        // Log flow started
        postEvent({ outcome: 'flow_started', customerId: options.customerId });

        // Step 1: Reason selection
        function showReasons() {
          var html = '<h2 class="cr-title">We\'re sorry to see you go</h2>';
          html += '<p class="cr-subtitle">Before you cancel, help us understand why. We might be able to help.</p>';
          html += '<div class="cr-reasons">';
          reasons.forEach(function(r) {
            html += '<button class="cr-reason-btn" data-id="' + r.id + '"><span class="cr-reason-icon">' + r.icon + '</span><span>' + r.label + '</span></button>';
          });
          html += '</div>';
          content.innerHTML = html;

          content.querySelectorAll('.cr-reason-btn').forEach(function(btn) {
            btn.onclick = function() {
              var reasonId = btn.getAttribute('data-id');
              var reason = reasons.find(function(r) { return r.id === reasonId; });
              postEvent({ reason: reasonId, outcome: 'reason_selected', customerId: options.customerId });
              showOffer(reason);
            };
          });
        }

        // Step 2: Show offer
        function showOffer(reason) {
          var html = '';

          if (reason.offerType === 'discount') {
            html += '<div class="cr-offer-icon">🎉</div>';
            html += '<h2 class="cr-offer-title">Wait — how about ' + reason.offerValue + '% off?</h2>';
            html += '<p class="cr-offer-desc">We\'d love to keep you around. Here\'s <strong>' + reason.offerValue + '% off</strong> for the next ' + (reason.offerDuration || 3) + ' months. No strings attached.</p>';
          } else if (reason.offerType === 'pause') {
            html += '<div class="cr-offer-icon">⏸️</div>';
            html += '<h2 class="cr-offer-title">Need a break?</h2>';
            html += '<p class="cr-offer-desc">No worries. We can <strong>pause your subscription</strong> for ' + (reason.offerValue || 2) + ' months — no charge. Come back whenever you\'re ready.</p>';
          } else if (reason.offerType === 'human') {
            html += '<div class="cr-offer-icon">💬</div>';
            html += '<h2 class="cr-offer-title">Let\'s talk about it</h2>';
            html += '<p class="cr-offer-desc">We might be able to help. Our team would love to chat and find a solution that works for you.</p>';
          } else {
            html += '<div class="cr-offer-icon">📝</div>';
            html += '<h2 class="cr-offer-title">One last thing</h2>';
            html += '<p class="cr-offer-desc">Any feedback for us? We\'re always looking to improve.</p>';
            html += '<textarea class="cr-textarea" placeholder="What could we do better?" id="cr-feedback"></textarea>';
          }

          html += '<div class="cr-btn-row">';
          if (reason.offerType === 'feedback') {
            html += '<button class="cr-btn-secondary" id="cr-skip">Skip & Cancel</button>';
            html += '<button class="cr-btn-primary" id="cr-accept" style="background:' + primaryColor + ';color:#fff;">Submit Feedback</button>';
          } else {
            html += '<button class="cr-btn-secondary" id="cr-decline">No thanks, cancel</button>';
            html += '<button class="cr-btn-primary" id="cr-accept" style="background:' + primaryColor + ';color:#fff;">' + 
              (reason.offerType === 'human' ? 'Chat with us' : 'Accept Offer') + '</button>';
          }
          html += '</div>';

          content.innerHTML = html;

          var acceptBtn = content.querySelector('#cr-accept');
          var declineBtn = content.querySelector('#cr-decline') || content.querySelector('#cr-skip');

          acceptBtn.onclick = function() {
            var feedback = content.querySelector('#cr-feedback');
            postEvent({
              reason: reason.id,
              offerShown: reason.offerType,
              outcome: reason.offerType === 'feedback' ? 'feedback_submitted' : 'saved',
              feedback: feedback ? feedback.value : null,
              customerId: options.customerId,
            });
            showResult(true, reason);
          };

          declineBtn.onclick = function() {
            postEvent({
              reason: reason.id,
              offerShown: reason.offerType,
              outcome: 'cancelled',
              customerId: options.customerId,
            });
            showResult(false, reason);
          };
        }

        // Step 3: Result
        function showResult(saved, reason) {
          var html = '';
          if (saved && reason.offerType !== 'feedback') {
            html += '<div class="cr-result-icon">🎉</div>';
            html += '<h2 class="cr-result-title" style="color:#2D7A4F;">Welcome back!</h2>';
            if (reason.offerType === 'discount') {
              html += '<p class="cr-result-desc">Your ' + reason.offerValue + '% discount has been applied. You\'ll see the savings on your next invoice.</p>';
            } else if (reason.offerType === 'pause') {
              html += '<p class="cr-result-desc">Your subscription has been paused. We\'ll send you a reminder before it resumes.</p>';
            } else if (reason.offerType === 'human') {
              html += '<p class="cr-result-desc">We\'ll be in touch shortly. Check your email for next steps.</p>';
            }
            html += '<div class="cr-btn-row"><button class="cr-btn-primary" id="cr-done" style="background:' + primaryColor + ';color:#fff;">Done</button></div>';
          } else {
            html += '<div class="cr-result-icon">👋</div>';
            html += '<h2 class="cr-result-title">' + (reason.offerType === 'feedback' ? 'Thanks for the feedback' : 'We\'re sorry to see you go') + '</h2>';
            html += '<p class="cr-result-desc">Your cancellation has been processed. We hope to see you again in the future.</p>';
            html += '<div class="cr-btn-row"><button class="cr-btn-primary" id="cr-done" style="background:' + primaryColor + ';color:#fff;">Close</button></div>';
          }

          content.innerHTML = html;
          content.querySelector('#cr-done').onclick = function() {
            close({
              saved: saved && reason.offerType !== 'feedback',
              reason: reason.id,
              offer: saved ? { type: reason.offerType, value: reason.offerValue, duration: reason.offerDuration, accepted: true } : null,
              feedback: null,
              sessionId: sessionId,
            });
          };
        }

        // Start flow
        showReasons();
        document.body.appendChild(overlay);
        // Trigger animation
        requestAnimationFrame(function() {
          overlay.classList.add('cr-show');
        });
      });
    });
  }

  // Public API
  window.ChurnRecovery = {
    version: VERSION,
    config: config,
    showCancelFlow: showCancelFlow,
    init: function(opts) {
      if (opts.apiKey) config.apiKey = opts.apiKey;
      if (opts.projectId) config.projectId = opts.projectId;
      if (opts.theme) Object.assign(config.theme, opts.theme);
      return window.ChurnRecovery;
    },
  };

  // Auto-bind to elements with data-churnrecovery="cancel"
  function autobind() {
    document.querySelectorAll('[data-churnrecovery="cancel"]').forEach(function(el) {
      if (el._crBound) return;
      el._crBound = true;
      el.addEventListener('click', function(e) {
        e.preventDefault();
        var customerId = el.getAttribute('data-customer-id') || '';
        var subscriptionId = el.getAttribute('data-subscription-id') || '';
        showCancelFlow({ customerId: customerId, subscriptionId: subscriptionId });
      });
    });
  }

  // Run autobind on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autobind);
  } else {
    autobind();
  }

})();
