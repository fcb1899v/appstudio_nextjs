/**
 * Global type declarations for environment variables
 * Extends NodeJS.ProcessEnv interface to include custom environment variables
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ADSENSE?: string;
      NEXT_PUBLIC_GA_TRACKING_ID?: string;
      NEXT_PUBLIC_GTM_ID?: string;
      NEXT_PUBLIC_COOKIEBOT_ID?: string;
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY?: string;
      RECAPTCHA_SECRET_KEY?: string;
      NEXT_PUBLIC_GOOGLE_FORM?: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {}; 