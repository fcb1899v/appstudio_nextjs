import { useEffect, useRef, type FC } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

/**
 * Interface for analytics tracking component props
 * Defines the properties required for analytics tracking functionality
 */
interface AnalyticsTrackerProps {
  pageTitle: string;
  pagePath: string;
  appName?: string;
  language: string;
  deviceType: string;
}

/**
 * Component for tracking user behavior and analytics data
 * Handles page views, app views, scroll tracking, and time on page
 * Provides comprehensive analytics tracking for user engagement metrics
 */

// Analytics tracking component for user behavior monitoring
const AnalyticsTracker: FC<AnalyticsTrackerProps> = ({
  pageTitle,
  pagePath,
  appName,
  language,
  deviceType
}) => {
  // Get analytics tracking functions from custom hook
  const { trackPageView, trackAppView, trackScroll, trackTimeOnPage } = useAnalytics();
  
  // Store initial page load time for time tracking
  const startTime = useRef<number>(Date.now());
  
  // Track last scroll event time for throttling
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    // Store initial start time for accurate tracking
    const initialStartTime = startTime.current;
    
    // Track page view with metadata
    trackPageView(pageTitle, pagePath, {
      app_name: appName,
      language: language,
      device_type: deviceType
    });

    // Track app-specific view if app name provided
    if (appName) {
      trackAppView(appName, language, deviceType);
    }

    // Handle scroll events for engagement tracking
    const handleScroll = () => {
      const now = Date.now();
      // Throttle scroll tracking to once per second
      if (now - lastScrollTime.current > 1000) {
        // Calculate scroll depth as percentage
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        trackScroll(scrollDepth, pagePath);
        lastScrollTime.current = now;
      }
    };

    // Track time spent on page when user leaves
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - initialStartTime) / 1000);
      trackTimeOnPage(timeSpent, pagePath);
    };

    // Add event listeners for tracking with passive option for scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove listeners and track final time
    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true } as EventListenerOptions);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Track final time spent on page
      const timeSpent = Math.round((Date.now() - initialStartTime) / 1000);
      trackTimeOnPage(timeSpent, pagePath);
    };
  }, [pageTitle, pagePath, appName, language, deviceType, trackPageView, trackAppView, trackScroll, trackTimeOnPage]);

  // Component doesn't render anything - only handles analytics
  return null;
};

export default AnalyticsTracker; 