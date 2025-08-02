export {};

/**
 * Global type declarations for external libraries
 * Extends Window interface to include third-party library objects
 */
declare global {
  interface Window {
    dataLayer: unknown[];
    grecaptcha: unknown;  // reCAPTCHA object
  }
}