// CommonJS, not ESM: the deploy analyzer failed on an ESM source with "Cannot determine backend specification" before any code ran.
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');

// Held in Secret Manager, never in the repository or the bundle.
// Set it with: firebase functions:secrets:set RECAPTCHA_V3_SECRET_KEY
const recaptchaSecret = defineSecret('RECAPTCHA_V3_SECRET_KEY');

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

/**
 * Verifies a reCAPTCHA v3 token for the contact form.
 *
 * Same contract as the Next.js route handler it replaces: POST { token },
 * answer { ok, message }. The site builds with output: 'export', which writes
 * no route handlers, so that path answered 404 on Hosting and the check had
 * nowhere to run. firebase.json rewrites /api/recaptcha here.
 */
exports.recaptcha = onRequest({ secrets: [recaptchaSecret] }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' });
    return;
  }

  const secret = recaptchaSecret.value();
  if (!secret) {
    res.status(500).json({ ok: false, message: 'Server configuration error' });
    return;
  }

  try {
    // Hosting parses JSON bodies, so req.body is already an object.
    const token = req.body?.token;
    if (!token) {
      res.status(400).json({ ok: false, message: 'No reCAPTCHA token provided' });
      return;
    }

    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);

    const verifyRes = await fetch(VERIFY_URL, { method: 'POST', body: params });
    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      res.status(400).json({ ok: false, message: 'Invalid reCAPTCHA' });
      return;
    }

    res.status(200).json({ ok: true, message: 'Recaptcha verified!' });
  } catch {
    // Nothing about the failure goes back to the caller, on purpose.
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});
