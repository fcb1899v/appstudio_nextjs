import { CookieConsent } from '@/hooks/useCookieConsent';

/** gtag and dataLayer on Window. */
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/** Google Analytics and Tag Manager IDs from environment variables. */
export const GA_TRACKING_ID = process.env.GA_TRACKING_ID || "";
export const GTM_ID = process.env.GTM_ID || "";

/** Initialize Google Analytics with the user's consent: dataLayer plus privacy settings. */
export const initializeGA = (consent: CookieConsent) => {
  if (!GA_TRACKING_ID || !consent.analytics) {
    return;
  }

  // Initialize dataLayer array for Google Tag Manager
  window.dataLayer = window.dataLayer || [];
  
  // gtag.js is documented as pushing the arguments object; rest parameters would push an Array.
  // Nothing in the docs says the two are interchangeable.
  window.gtag = function() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  // Initialize Google Analytics with configuration
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
    anonymize_ip: true, // Anonymize IP addresses for privacy
    cookie_flags: 'SameSite=None;Secure', // Secure cookie settings
  });
};

/** Track a page view, subject to consent. */
export const pageview = (url: string, consent: CookieConsent): void => {
  if (!GA_TRACKING_ID || !consent.analytics) {
    return;
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    anonymize_ip: true,
  });
};

/** Track a custom event (action/category/label/value), subject to consent. */
export const event = ({
  action,
  category,
  label,
  value,
  consent,
  parameters,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
  consent: CookieConsent;
  parameters?: Record<string, unknown>;
}): void => {
  if (!GA_TRACKING_ID || !consent.analytics) {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    anonymize_ip: true,
    ...parameters,
  });
};

/** Track a custom event with arbitrary parameters, subject to consent. */
export const trackCustomEvent = ({
  eventName,
  parameters,
  consent,
}: {
  eventName: string;
  parameters: Record<string, unknown>;
  consent: CookieConsent;
}): void => {
  if (!GA_TRACKING_ID || !consent.analytics) {
    return;
  }

  window.gtag("event", eventName, {
    ...parameters,
    anonymize_ip: true,
  });
};

/** Apply a consent change: initialize GA when granted, remove GA cookies when withdrawn. */
export const handleConsentChange = (consent: CookieConsent) => {
  if (consent.analytics) {
    initializeGA(consent);
  } else {
    // Remove existing cookies when consent is withdrawn
    if (typeof window !== 'undefined') {
      // Remove Google Analytics cookies
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        if (name.includes('_ga') || name.includes('_gid') || name.includes('_gat')) {
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
      });
    }
  }
}; 