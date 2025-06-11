export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    grecaptcha: unknown; 　// reCAPTCHA のオブジェクト
  }
}