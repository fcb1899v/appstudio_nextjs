/**
 * Test script for reCAPTCHA API route.
 * Run with dev server up: npm run dev (then in another terminal) npm run test:recaptcha
 * Verifies that /api/recaptcha returns expected status for missing/invalid token.
 */

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

async function testRecaptchaApi(): Promise<void> {
  console.log('Testing reCAPTCHA API at', BASE);
  let ok = true;

  // No token -> 400
  try {
    const res = await fetch(`${BASE}/api/recaptcha`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
    if (res.status !== 400) {
      console.error('Expected 400 for missing token, got', res.status, data);
      ok = false;
    } else {
      console.log('OK: missing token -> 400');
    }
  } catch (e) {
    console.error('Request failed (is dev server running?):', (e as Error).message);
    ok = false;
  }

  // Empty token -> 400
  try {
    const res = await fetch(`${BASE}/api/recaptcha`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: '' }),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
    if (res.status !== 400) {
      console.error('Expected 400 for empty token, got', res.status, data);
      ok = false;
    } else {
      console.log('OK: empty token -> 400');
    }
  } catch (e) {
    console.error('Request failed:', (e as Error).message);
    ok = false;
  }

  process.exit(ok ? 0 : 1);
}

testRecaptchaApi();
