import { useEffect, useRef } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsTrackerProps {
  pageTitle: string;
  pagePath: string;
  appName?: string;
  language: string;
  deviceType: string;
}

const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({
  pageTitle,
  pagePath,
  appName,
  language,
  deviceType
}) => {
  const { trackPageView, trackAppView, trackScroll, trackTimeOnPage } = useAnalytics();
  const startTime = useRef<number>(Date.now());
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    const initialStartTime = startTime.current;
    // ページビューの追跡
    trackPageView(pageTitle, pagePath, {
      app_name: appName,
      language: language,
      device_type: deviceType
    });

    // アプリビューの追跡
    if (appName) {
      trackAppView(appName, language, deviceType);
    }

    // スクロール追跡
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime.current > 1000) { // 1秒間隔で追跡
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        trackScroll(scrollDepth, pagePath);
        lastScrollTime.current = now;
      }
    };

    // ページ離脱時の滞在時間追跡
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - initialStartTime) / 1000);
      trackTimeOnPage(timeSpent, pagePath);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // コンポーネントアンマウント時の滞在時間追跡
      const timeSpent = Math.round((Date.now() - initialStartTime) / 1000);
      trackTimeOnPage(timeSpent, pagePath);
    };
  }, [pageTitle, pagePath, appName, language, deviceType, trackPageView, trackAppView, trackScroll, trackTimeOnPage]);

  return null; // このコンポーネントは表示されません
};

export default AnalyticsTracker; 