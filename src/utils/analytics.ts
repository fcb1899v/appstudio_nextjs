import { CookieConsent } from '@/hooks/useCookieConsent';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

// Google Analyticsの初期化
export const initializeGA = (consent: CookieConsent) => {
  if (!GA_TRACKING_ID || !consent.analytics) {
    return;
  }

  // dataLayerの初期化
  window.dataLayer = window.dataLayer || [];
  
  // gtag関数の定義
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // GAの初期化
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
    anonymize_ip: true, // IPアドレスの匿名化
    cookie_flags: 'SameSite=None;Secure', // セキュアなCookie設定
  });
};

// ページビューの追跡
export const pageview = (url: string, consent: CookieConsent): void => {
  if (!GA_TRACKING_ID || !consent.analytics) {
    return;
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    anonymize_ip: true,
  });
};

// イベントの追跡
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

// カスタムイベントの追跡
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

// 同意状態に基づくGAの制御
export const handleConsentChange = (consent: CookieConsent) => {
  if (consent.analytics) {
    initializeGA(consent);
  } else {
    // 同意が撤回された場合、既存のCookieを削除
    if (typeof window !== 'undefined') {
      // GAのCookieを削除
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