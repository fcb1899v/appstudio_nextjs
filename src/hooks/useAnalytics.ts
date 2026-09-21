/** Adds the Google Analytics gtag function to Window. */
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/** Event payload sent to Google Analytics. */
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

// Module scope: these close over nothing, and per-render identities re-ran effects.
/** Sends an event to Google Analytics. */
const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters
    });
  }
};

/** Track a page view with custom parameters. */
const trackPageView = (pageTitle: string, pagePath: string, customParams?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath,
      ...customParams
    });
  }
};

/** Track an app download for iOS or Android. */
const trackAppDownload = (appName: string, platform: 'ios' | 'android', language: string) => {
  trackEvent({
    action: 'app_download',
    category: 'engagement',
    label: `${appName}_${platform}`,
    custom_parameters: {
      app_name: appName,
      platform: platform,
      language: language
    }
  });
};

/** Track a view of an app-specific page. */
const trackAppView = (appName: string, language: string, deviceType: string) => {
  trackEvent({
    action: 'app_view',
    category: 'engagement',
    label: appName,
    custom_parameters: {
      app_name: appName,
      language: language,
      device_type: deviceType
    }
  });
};

/** Track a navigation menu click. */
const trackMenuClick = (menuItem: string, language: string) => {
  trackEvent({
    action: 'menu_click',
    category: 'navigation',
    label: menuItem,
    custom_parameters: {
      menu_item: menuItem,
      language: language
    }
  });
};

/** Track a click on an external link (app store, social media, etc.). */
const trackExternalLink = (url: string, linkType: string) => {
  trackEvent({
    action: 'external_link',
    category: 'engagement',
    label: url,
    custom_parameters: {
      link_url: url,
      link_type: linkType
    }
  });
};

/** Track scroll depth (0-100%) for engagement. */
const trackScroll = (scrollDepth: number, pagePath: string) => {
  trackEvent({
    action: 'scroll',
    category: 'engagement',
    label: pagePath,
    value: scrollDepth,
    custom_parameters: {
      scroll_depth: scrollDepth,
      page_path: pagePath
    }
  });
};

/** Track time spent on a page in seconds. */
const trackTimeOnPage = (timeSpent: number, pagePath: string) => {
  trackEvent({
    action: 'time_on_page',
    category: 'engagement',
    label: pagePath,
    value: timeSpent,
    custom_parameters: {
      time_spent: timeSpent,
      page_path: pagePath
    }
  });
};

/** Every tracking function, as one stable object. */
const analytics = {
  trackEvent,
  trackPageView,
  trackAppDownload,
  trackAppView,
  trackMenuClick,
  trackExternalLink,
  trackScroll,
  trackTimeOnPage
} as const;

/** Google Analytics hook: returns the tracking functions. */
export const useAnalytics = () => analytics;
