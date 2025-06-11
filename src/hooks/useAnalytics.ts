declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

export const useAnalytics = () => {
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