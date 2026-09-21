export {};

/** Third-party library objects on Window. */
declare global {
  interface Window {
    dataLayer: unknown[];
    grecaptcha: unknown;  // reCAPTCHA object
  }
}
