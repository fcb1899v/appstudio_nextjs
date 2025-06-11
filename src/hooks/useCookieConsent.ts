import { useState, useEffect } from 'react';

export interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
}

export interface CookieConsentState {
  consent: CookieConsent;
  hasConsent: boolean;
  isOpen: boolean;
}

const DEFAULT_CONSENT: CookieConsent = {
  analytics: false,
  marketing: false,
  necessary: true, // 必要不可欠なCookieは常にtrue
};

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  const [hasConsent, setHasConsent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
        setHasConsent(true);
      } catch {
        // 古い形式の同意データがある場合は新しい形式に変換
        if (savedConsent === 'accepted') {
          const newConsent = { ...DEFAULT_CONSENT, analytics: true, marketing: true };
          setConsent(newConsent);
          setHasConsent(true);
          localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
        }
      }
    } else {
      setIsOpen(true);
    }
  }, []);

  const acceptAll = () => {
    const newConsent = { ...DEFAULT_CONSENT, analytics: true, marketing: true };
    setConsent(newConsent);
    setHasConsent(true);
    setIsOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
  };

  const acceptNecessary = () => {
    const newConsent = { ...DEFAULT_CONSENT };
    setConsent(newConsent);
    setHasConsent(true);
    setIsOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
  };

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = { ...consent, ...newConsent };
    setConsent(updatedConsent);
    setHasConsent(true);
    setIsOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(updatedConsent));
  };

  const withdrawConsent = () => {
    setConsent(DEFAULT_CONSENT);
    setHasConsent(false);
    setIsOpen(true);
    localStorage.removeItem('cookie_consent');
  };

  return {
    consent,
    hasConsent,
    isOpen,
    acceptAll,
    acceptNecessary,
    updateConsent,
    withdrawConsent,
  };
}; 