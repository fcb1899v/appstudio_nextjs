import { CookieConsent } from '@/hooks/useCookieConsent';

/**
 * Global type declarations for Google Analytics and Google Tag Manager
 * Extends the Window interface to include gtag and dataLayer properties
 */
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Environment variables for Google Analytics and Google Tag Manager IDs
 * These are loaded from environment variables and used for tracking configuration
 */
export const GA_TRACKING_ID = process.env.GA_TRACKING_ID || "";
export const GTM_ID = process.env.GTM_ID || "";

/**
 * Initialize Google Analytics with user consent
 * Sets up dataLayer and configures GA with privacy settings
 * @param consent - User's cookie consent preferences
 */
export const initializeGA = (consent: CookieConsent) => {
  if (!GA_TRACKING_ID || !consent.analytics) {
    return;
  }

  // Initialize dataLayer array for Google Tag Manager
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function for Google Analytics
  window.gtag = function() {
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

/**
 * Track page views in Google Analytics
 * @param url - The URL of the page being tracked
 * @param consent - User's cookie consent preferences
 */
export const pageview = (url: string, consent: CookieConsent): void => {
  if (!GA_TRACKING_ID || !consent.analytics) {
    return;
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    anonymize_ip: true,
  });
};

/**
 * Track custom events in Google Analytics
 * @param action - The action being tracked
 * @param category - The category of the event
 * @param label - The label for the event
 * @param value - Optional numeric value for the event
 * @param consent - User's cookie consent preferences
 * @param parameters - Additional parameters to include with the event
 */
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

/**
 * Track custom events with flexible parameters
 * @param eventName - The name of the event to track
 * @param parameters - Parameters to include with the event
 * @param consent - User's cookie consent preferences
 */
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

/**
 * Handle consent changes for Google Analytics
 * Initializes GA when consent is given, removes cookies when consent is withdrawn
 * @param consent - User's cookie consent preferences
 */
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