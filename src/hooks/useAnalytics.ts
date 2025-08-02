/**
 * Global type declaration for Google Analytics gtag function
 * Extends Window interface to include gtag function for analytics tracking
 */
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Interface for analytics event data structure
 * Defines the structure for tracking events in Google Analytics
 */
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

/**
 * Custom hook for Google Analytics tracking functionality
 * Provides methods to track various user interactions and page events
 * @returns Object containing various tracking functions
 */
export const useAnalytics = () => {
  /**
   * Generic event tracking function that sends data to Google Analytics
   * @param event - Analytics event data to track
   */
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

  /**
   * Track page view events with custom parameters
   * @param pageTitle - Title of the page being viewed
   * @param pagePath - Path of the page being viewed
   * @param customParams - Additional parameters to include with the event
   */
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

  /**
   * Track app download events for iOS and Android platforms
   * @param appName - Name of the app being downloaded
   * @param platform - Platform (ios or android)
   * @param language - User's language preference
   */
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

  /**
   * Track when users view app-specific pages
   * @param appName - Name of the app being viewed
   * @param language - User's language preference
   * @param deviceType - Type of device being used
   */
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

  /**
   * Track navigation menu clicks
   * @param menuItem - Name of the menu item clicked
   * @param language - User's language preference
   */
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

  /**
   * Track clicks on external links (app store, social media, etc.)
   * @param url - URL of the external link
   * @param linkType - Type of external link (app store, social media, etc.)
   */
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

  /**
   * Track scroll depth to measure user engagement
   * @param scrollDepth - Percentage of page scrolled (0-100)
   * @param pagePath - Path of the page being scrolled
   */
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

  /**
   * Track time spent on page for engagement analysis
   * @param timeSpent - Time spent on page in seconds
   * @param pagePath - Path of the page being tracked
   */
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

  /**
   * Return all tracking functions for use in components
   */
  return {
    trackEvent,
    trackPageView,
    trackAppDownload,
    trackAppView,
    trackMenuClick,
    trackExternalLink,
    trackScroll,
    trackTimeOnPage
  };
}; 