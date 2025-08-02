import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { pageview } from '@/utils/analytics';

/**
 * Custom hook for tracking page views in Google Analytics
 * Automatically tracks page changes when user has consented to analytics
 * Uses Next.js router and custom cookie consent hook
 */
export const usePageTracking = () => {
  // Get current pathname from Next.js router
  const pathname = usePathname();
  
  // Get user's cookie consent status
  const { consent, hasConsent } = useCookieConsent();

  useEffect(() => {
    // Track page view only if user has consented to analytics
    // Respects user privacy by checking consent before tracking
    if (hasConsent && consent.analytics && pathname) {
      pageview(pathname, consent);
    }
  }, [pathname, hasConsent, consent.analytics, consent]);
}; 