const test = require('node:test');
const assert = require('node:assert');
const { isAcceptedVerification } = require('./recaptchaCheck');

const ALLOWED = ['nakajimamasao-appstudio.web.app', 'nakajimamasao-appstudio.firebaseapp.com'];
const good = {
  success: true,
  action: 'submit_form',
  score: 0.9,
  hostname: 'nakajimamasao-appstudio.web.app',
};

test('accepts a real form submit', () => {
  assert.strictEqual(isAcceptedVerification(good, ALLOWED), true);
});

test('rejects when success is false', () => {
  assert.strictEqual(isAcceptedVerification({ ...good, success: false }, ALLOWED), false);
});

test('rejects when the action is not submit_form', () => {
  assert.strictEqual(isAcceptedVerification({ ...good, action: 'login' }, ALLOWED), false);
});

test('rejects when the score is below 0.5', () => {
  assert.strictEqual(isAcceptedVerification({ ...good, score: 0.3 }, ALLOWED), false);
});

test('rejects when the score is missing', () => {
  const { score, ...withoutScore } = good;
  assert.strictEqual(isAcceptedVerification(withoutScore, ALLOWED), false);
});

test('rejects when the hostname is not allowed', () => {
  assert.strictEqual(isAcceptedVerification({ ...good, hostname: 'example.com' }, ALLOWED), false);
});
