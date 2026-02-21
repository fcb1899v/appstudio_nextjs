/**
 * Global type declarations for environment variables
 * Extends NodeJS.ProcessEnv interface to include custom environment variables
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADSENSE_ID?: string;
      GA_TRACKING_ID?: string;
      GTM_ID?: string;
      COOKIEBOT_ID?: string;
      RECAPTCHA_V3_SITE_KEY?: string;
      RECAPTCHA_V3_SECRET_KEY?: string;
      GOOGLE_FORM_ID?: string;
      RECAPTCHA_V2_SITE_KEY?: string;
      RECAPTCHA_V2_SECRET_KEY?: string;
      GOOGLE_SITE_ID?: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {}; 