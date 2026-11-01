// CommonJS, matching index.js. Pure function: no I/O, no logging.

const EXPECTED_ACTION = 'submit_form';
const MIN_SCORE = 0.5;

// v3 answers success for any token from this key, so the action, the score and the page's host are what tell a real form submit apart.
function isAcceptedVerification(verifyData, allowedHostnames) {
  return verifyData.success === true
    && verifyData.action === EXPECTED_ACTION
    && typeof verifyData.score === 'number'
    && verifyData.score >= MIN_SCORE
    && allowedHostnames.includes(verifyData.hostname);
}

module.exports = { isAcceptedVerification, EXPECTED_ACTION, MIN_SCORE };
