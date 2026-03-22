// @ts-check

/**
 * Mock Auth Helper — intercepts Clerk at the network level.
 *
 * Since ChurnRecovery uses a static export served by `serve`, auth is handled
 * entirely client-side by Clerk JS. We intercept the Clerk script and session
 * endpoints to simulate signed-in / signed-out states without real credentials.
 */

const CLERK_SCRIPT_PATTERN = /clerk.*\.js/;
const CLERK_API_PATTERN = /clerk\.(accounts|churnrecovery)/;

/**
 * Mock a signed-in Clerk session.
 * Intercepts Clerk JS + session endpoints to return a fake authenticated user.
 */
async function mockSignedIn(page, user = {
  id: 'test_user_123',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
}) {
  // Block real Clerk JS from loading and replace with a mock
  await page.route('**/*clerk*/**', async (route) => {
    const url = route.request().url();

    // Clerk JS bundle — replace with mock that sets window.__clerk_mock
    if (url.includes('/clerk-js@') || url.includes('clerk.browser.js') || url.includes('/clerk/ui')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: getMockClerkScript(user),
      });
    }

    // Clerk session / client endpoints — return mock session
    if (url.includes('/v1/client') || url.includes('/v1/me') || url.includes('/v1/sessions')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(getMockSessionResponse(user)),
      });
    }

    // Clerk environment / well-known
    if (url.includes('/v1/environment') || url.includes('/.well-known')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ auth_config: { single_session_mode: true } }),
      });
    }

    // Let other Clerk requests through (fonts, etc.)
    return route.fulfill({ status: 200, body: '' });
  });

  // Set mock session cookie before navigation
  await page.context().addCookies([
    {
      name: '__session',
      value: 'mock_session_token_' + user.id,
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    },
    {
      name: '__clerk_db_jwt',
      value: 'mock_jwt_' + user.id,
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    },
  ]);

  // Inject mock user data via addInitScript (runs before page scripts)
  await page.addInitScript((mockUser) => {
    window.__clerk_mock = true;
    window.__clerk_mock_user = mockUser;

    // Override Clerk's loaded state
    Object.defineProperty(window, 'Clerk', {
      configurable: true,
      get() {
        return {
          loaded: true,
          user: {
            id: mockUser.id,
            primaryEmailAddress: { emailAddress: mockUser.email },
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            fullName: `${mockUser.firstName} ${mockUser.lastName}`,
          },
          session: {
            id: 'sess_mock_' + mockUser.id,
            status: 'active',
            user: { id: mockUser.id },
          },
          signOut: async () => {},
          addListener: () => {},
          __unstable__onBeforeRequest: () => {},
          __unstable__onAfterResponse: () => {},
        };
      },
    });
  }, user);
}

/**
 * Mock a signed-out Clerk session.
 * Intercepts Clerk JS and returns unauthenticated state.
 */
async function mockSignedOut(page) {
  // Clear all auth-related cookies
  await page.context().clearCookies();

  // Block Clerk JS and return mock that signals signed-out
  await page.route('**/*clerk*/**', async (route) => {
    const url = route.request().url();

    if (url.includes('/clerk-js@') || url.includes('clerk.browser.js') || url.includes('/clerk/ui')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: getMockClerkScriptSignedOut(),
      });
    }

    if (url.includes('/v1/client') || url.includes('/v1/sessions')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ response: { sessions: [] }, client: { sessions: [] } }),
      });
    }

    if (url.includes('/v1/environment') || url.includes('/.well-known')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ auth_config: { single_session_mode: true } }),
      });
    }

    return route.fulfill({ status: 200, body: '' });
  });

  // Inject signed-out state
  await page.addInitScript(() => {
    window.__clerk_mock = true;
    window.__clerk_mock_user = null;

    Object.defineProperty(window, 'Clerk', {
      configurable: true,
      get() {
        return {
          loaded: true,
          user: null,
          session: null,
          signOut: async () => {},
          addListener: () => {},
          __unstable__onBeforeRequest: () => {},
          __unstable__onAfterResponse: () => {},
        };
      },
    });
  });
}

/**
 * Generate mock Clerk JS script for signed-in state
 */
function getMockClerkScript(user) {
  return `
    (function() {
      window.__clerk_mock = true;
      window.Clerk = {
        loaded: true,
        user: {
          id: "${user.id}",
          primaryEmailAddress: { emailAddress: "${user.email}" },
          firstName: "${user.firstName}",
          lastName: "${user.lastName}",
          fullName: "${user.firstName} ${user.lastName}",
        },
        session: {
          id: "sess_mock_${user.id}",
          status: "active",
          user: { id: "${user.id}" },
          getToken: async () => "mock_token_${user.id}",
        },
        signOut: async function() { window.location.href = '/'; },
        addListener: function() {},
        navigate: function(to) { window.location.href = to; },
        redirectToSignIn: function() { window.location.href = '/app/sign-in'; },
        redirectToSignUp: function() { window.location.href = '/app/sign-up'; },
        __unstable__onBeforeRequest: function() {},
        __unstable__onAfterResponse: function() {},
        mountSignIn: function(el) { if(el) el.innerHTML = '<div data-clerk-component="SignIn">Mock Sign In</div>'; },
        mountSignUp: function(el) { if(el) el.innerHTML = '<div data-clerk-component="SignUp">Mock Sign Up</div>'; },
      };
      // Fire Clerk loaded event
      document.dispatchEvent(new CustomEvent('clerk:loaded'));
      // Also try the callback pattern
      if (window.__clerk_frontend_api_loaded) window.__clerk_frontend_api_loaded();
    })();
  `;
}

/**
 * Generate mock Clerk JS script for signed-out state
 */
function getMockClerkScriptSignedOut() {
  return `
    (function() {
      window.__clerk_mock = true;
      window.Clerk = {
        loaded: true,
        user: null,
        session: null,
        signOut: async function() {},
        addListener: function() {},
        navigate: function(to) { window.location.href = to; },
        redirectToSignIn: function() { window.location.href = '/app/sign-in'; },
        redirectToSignUp: function() { window.location.href = '/app/sign-up'; },
        __unstable__onBeforeRequest: function() {},
        __unstable__onAfterResponse: function() {},
        mountSignIn: function(el) { if(el) el.innerHTML = '<div data-clerk-component="SignIn">Mock Sign In</div>'; },
        mountSignUp: function(el) { if(el) el.innerHTML = '<div data-clerk-component="SignUp">Mock Sign Up</div>'; },
      };
      document.dispatchEvent(new CustomEvent('clerk:loaded'));
      if (window.__clerk_frontend_api_loaded) window.__clerk_frontend_api_loaded();
    })();
  `;
}

/**
 * Generate mock session response for Clerk API
 */
function getMockSessionResponse(user) {
  return {
    response: {
      sessions: [{
        id: 'sess_mock_' + user.id,
        status: 'active',
        user: {
          id: user.id,
          email_addresses: [{ email_address: user.email, id: 'email_mock' }],
          primary_email_address_id: 'email_mock',
          first_name: user.firstName,
          last_name: user.lastName,
        },
      }],
    },
    client: {
      sessions: [{
        id: 'sess_mock_' + user.id,
        status: 'active',
      }],
    },
  };
}

module.exports = { mockSignedIn, mockSignedOut };
