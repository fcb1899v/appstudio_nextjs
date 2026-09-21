import { useState, useEffect } from 'react';

/** User consent per cookie type. */
export interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
}

/** Cookie consent state. */
export interface CookieConsentState {
  consent: CookieConsent;
  hasConsent: boolean;
  isOpen: boolean;
}

/** Default consent: necessary cookies are always enabled. */
const DEFAULT_CONSENT: CookieConsent = {
  analytics: false,
  marketing: false,
  necessary: true, // Necessary cookies are always enabled
};

/** Manages cookie consent: storage, retrieval and state. */
export const useCookieConsent = () => {
  // State for current consent preferences
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  
  // State to track if user has provided consent
  const [hasConsent, setHasConsent] = useState(false);
  
  // State to control consent banner visibility
  const [isOpen, setIsOpen] = useState(false);

  /** Load saved consent on mount; accepts the JSON format and the legacy string format. */
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent) {
      try {
        // Parse saved consent data
        const parsedConsent = JSON.parse(savedConsent);
    /* eslint-disable-next-line react-hooks/set-state-in-effect --
       localStorage exists only after mount, so saved consent cannot be derived in render. */
        setConsent(parsedConsent);
        setHasConsent(true);
      } catch {
        // Handle legacy consent format and convert to new format
        if (savedConsent === 'accepted') {
          const newConsent = { ...DEFAULT_CONSENT, analytics: true, marketing: true };
          setConsent(newConsent);
          setHasConsent(true);
          localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
        }
      }
    } else {
      // Show consent banner if no consent data exists
      setIsOpen(true);
    }
  }, []);

  /** Enable all cookie types and save to localStorage. */
  const acceptAll = () => {
    const newConsent = { ...DEFAULT_CONSENT, analytics: true, marketing: true };
    setConsent(newConsent);
    setHasConsent(true);
    setIsOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
  };

  /** Enable only necessary cookies and save to localStorage. */
  const acceptNecessary = () => {
    const newConsent = { ...DEFAULT_CONSENT };
    setConsent(newConsent);
    setHasConsent(true);
    setIsOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
  };

  /** Merge a partial consent object into the current preferences. */
  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = { ...consent, ...newConsent };
    setConsent(updatedConsent);
    setHasConsent(true);
    setIsOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(updatedConsent));
  };

  /** Withdraw all consent, clear stored data and show the banner again. */
  const withdrawConsent = () => {
    setConsent(DEFAULT_CONSENT);
    setHasConsent(false);
    setIsOpen(true);
    localStorage.removeItem('cookie_consent');
  };

  /** Consent state and management functions. */
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