import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { pageview } from '@/utils/analytics';

export const usePageTracking = () => {
  const pathname = usePathname();
  const { consent, hasConsent } = useCookieConsent();

  useEffect(() => {
    if (hasConsent && consent.analytics && pathname) {
      pageview(pathname, consent);
    }
  }, [pathname, hasConsent, consent.analytics, consent]);
}; 