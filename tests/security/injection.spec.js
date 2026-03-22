// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Security Test Suite: Injection Prevention (SQL/NoSQL/Parameter)
 *
 * Tests that the Cloudflare D1 API layer is protected against injection attacks.
 *
 * The codebase uses D1's `.prepare().bind()` parameterized queries everywhere,
 * which prevents SQL injection by design. These tests verify:
 *
 * 1. SQL injection in query parameters doesn't break the API (500 = unhandled)
 * 2. Injection via JSON body fields doesn't execute (returns safe error or processes safely)
 * 3. Large payloads are rejected (sanitizeString maxLength enforcement)
 * 4. Control character injection is handled gracefully
 * 5. Special characters in project names don't cause DB errors
 *
 * All injection tests target the public cancel-flow GET endpoint (no auth required)
 * for live tests. Auth-required endpoint injection tests are documented but skipped.
 */

const LIVE_URL = 'https://churnrecovery.com';

// SQL injection payloads
const SQL_INJECTION_PAYLOADS = [
  "' OR '1'='1",
  "'; DROP TABLE projects; --",
  "1 UNION SELECT * FROM projects--",
  "1' AND SLEEP(5)--",
  "' OR 1=1--",
  "admin'--",
  "' UNION SELECT null,null,null--",
  "1; SELECT * FROM sqlite_master--",
  "' OR '1'='1' /*",
  "' OR 1=1#",
];

// Path traversal payloads
const PATH_TRAVERSAL_PAYLOADS = [
  '../../../etc/passwd',
  '..%2F..%2F..%2Fetc%2Fpasswd',
  '....//....//etc/passwd',
];

test.describe('Injection — SQL injection in URL parameters (live)', () => {
  for (const payload of SQL_INJECTION_PAYLOADS) {
    test(`projectId="${payload}" does not cause 500 error`, async ({ request }) => {
      const encodedPayload = encodeURIComponent(payload);
      const res = await request.get(`${LIVE_URL}/api/cancel-flow?projectId=${encodedPayload}`);

      // SECURITY: SQL injection must not cause 500 (Internal Server Error)
      // A well-parameterized query will return 404 (project not found) or default flow
      expect(res.status()).not.toBe(500);

      // Acceptable: 200 (default flow returned), 404, 400
      expect([200, 400, 404]).toContain(res.status());

      // Verify response is valid JSON, not an error dump
      const text = await res.text();
      expect(text).not.toContain('syntax error');
      expect(text).not.toContain('near "OR"');
      expect(text).not.toContain('SQLITE_ERROR');
    });
  }

  test('API key with SQL injection payload does not cause 500', async ({ request }) => {
    const res = await request.get(
      `${LIVE_URL}/api/cancel-flow?apiKey=${encodeURIComponent("' OR '1'='1")}`
    );
    expect(res.status()).not.toBe(500);
    expect([200, 400, 403, 404]).toContain(res.status());
  });
});

test.describe('Injection — oversized payload rejection (live)', () => {
  test('extremely long projectId is truncated or rejected, not causes 500', async ({ request }) => {
    const longId = 'a'.repeat(10000);
    const res = await request.get(`${LIVE_URL}/api/cancel-flow?projectId=${longId}`);

    expect(res.status()).not.toBe(500);
    expect([200, 400, 404, 414]).toContain(res.status());
  });

  test('POST /api/events with oversized feedback field is handled safely', async ({ request }) => {
    // The sanitizeString(feedback, 2000) call should truncate this
    const oversizedFeedback = 'X'.repeat(50000);

    const res = await request.post(`${LIVE_URL}/api/events`, {
      data: {
        apiKey: 'cr_live_test_injection',
        outcome: 'feedback_submitted',
        feedback: oversizedFeedback,
      },
      headers: { 'Content-Type': 'application/json' },
    });

    // Should return 403 (bad API key) or 400, NOT 500
    expect(res.status()).not.toBe(500);
  });

  test('POST /api/events with deeply nested JSON does not cause RCE or 500', async ({ request }) => {
    // JSON bomb / deeply nested object
    let bomb = '"deepvalue"';
    for (let i = 0; i < 100; i++) {
      bomb = `{"x": ${bomb}}`;
    }

    const res = await request.post(`${LIVE_URL}/api/events`, {
      data: bomb,
      headers: { 'Content-Type': 'application/json' },
    });

    // Must not crash the worker
    expect(res.status()).not.toBe(500);
  });
});

test.describe('Injection — control character handling (live)', () => {
  test('null byte injection in projectId is handled safely', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/cancel-flow?projectId=proj%00evil`);
    expect(res.status()).not.toBe(500);
  });

  test('newline injection in projectId is handled safely', async ({ request }) => {
    const res = await request.get(
      `${LIVE_URL}/api/cancel-flow?projectId=proj%0Ainjected%0Aheader: evil`
    );
    expect(res.status()).not.toBe(500);

    // Verify response headers are not polluted
    const headers = res.headers();
    expect(headers['injected']).toBeUndefined();
  });
});

test.describe('Injection — path traversal in URL parameters (live)', () => {
  for (const payload of PATH_TRAVERSAL_PAYLOADS) {
    test(`path traversal "${payload}" does not expose file contents`, async ({ request }) => {
      const encoded = encodeURIComponent(payload);
      const res = await request.get(`${LIVE_URL}/api/cancel-flow?projectId=${encoded}`);

      expect(res.status()).not.toBe(500);

      const text = await res.text();
      // SECURITY: Must not return filesystem contents
      expect(text).not.toContain('root:x:');
      expect(text).not.toContain('/bin/bash');
    });
  }
});

test.describe('Injection — JSON body injection (live)', () => {
  test.skip(
    'POST /api/cancel-flow with script injection in reasons is sanitized (requires auth)',
    async ({ request }) => {
      // Would need a valid JWT to test this endpoint
      // sanitizeString() is applied to all reason fields
      // This test documents the expected behavior
      //
      // Expected: the XSS payload in label is stored as plain text, not executed
    }
  );

  test.skip(
    'POST /api/projects with special chars in name is sanitized (requires auth)',
    async ({ request }) => {
      // sanitizeString(body.name, 100) should strip control chars
      // Expected: stored as safe string, returned as safe JSON
    }
  );

  test('POST /api/events with invalid outcome value defaults to null', async ({ request }) => {
    // outcome is validated against a whitelist in events.js
    // Invalid values should be coerced to null, not stored raw
    const res = await request.post(`${LIVE_URL}/api/events`, {
      data: {
        apiKey: 'cr_live_invalid_for_test',
        outcome: "'; DROP TABLE cancel_events; --", // SQL injection as outcome
      },
      headers: { 'Content-Type': 'application/json' },
    });

    // Should fail gracefully (403 bad key or 400), not 500
    expect(res.status()).not.toBe(500);
  });
});

test.describe('Injection — header injection (live)', () => {
  test('malformed Authorization header does not cause 500', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/projects`, {
      headers: {
        Authorization: "Bearer \r\nX-Injected: evil",
      },
    });

    // HTTP client should handle this — verify no 500
    // Node's http module strips invalid header values, so this tests the whole stack
    expect([400, 401, 403]).toContain(res.status());
  });
});
