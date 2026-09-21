import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { pageview } from '@/utils/analytics';

/** Tracks page views in Google Analytics on route change, when analytics consent is given. */
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