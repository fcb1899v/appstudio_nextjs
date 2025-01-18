export {};

declare global {
  interface Window {
    dataLayer: any[];
    grecaptcha: any; 　// reCAPTCHA のオブジェクト
  }
}