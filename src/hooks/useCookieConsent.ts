import { useState, useEffect } from 'react';

/**
 * Interface for cookie consent preferences
 * Defines the structure for user consent to different types of cookies
 */
export interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
}

/**
 * Interface for cookie consent state management
 * Defines the complete state structure for cookie consent functionality
 */
export interface CookieConsentState {
  consent: CookieConsent;
  hasConsent: boolean;
  isOpen: boolean;
}

/**
 * Default consent settings - necessary cookies are always enabled
 * Provides initial state for cookie consent preferences
 */
const DEFAULT_CONSENT: CookieConsent = {
  analytics: false,
  marketing: false,
  necessary: true, // Necessary cookies are always enabled
};

/**
 * Custom hook for managing cookie consent
 * Handles consent storage, retrieval, and state management
 * @returns Object containing consent state and management functions
 */
export const useCookieConsent = () => {
  // State for current consent preferences
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  
  // State to track if user has provided consent
  const [hasConsent, setHasConsent] = useState(false);
  
  // State to control consent banner visibility
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Load saved consent from localStorage on component mount
   * Handles both new JSON format and legacy string format
   */
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent) {
      try {
        // Parse saved consent data
        const parsedConsent = JSON.parse(savedConsent);
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

  /**
   * Accept all cookie types (analytics, marketing, necessary)
   * Enables all cookie types and saves to localStorage
   */
  const acceptAll = () => {
    const newConsent = { ...DEFAULT_CONSENT, analytics: true, marketing: true };
    setConsent(newConsent);
    setHasConsent(true);
    setIsOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
  };

  /**
   * Accept only necessary cookies
   * Enables only necessary cookies and saves to localStorage
   */
  const acceptNecessary = () => {
    const newConsent = { ...DEFAULT_CONSENT };
    setConsent(newConsent);
    setHasConsent(true);
    setIsOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
  };

  /**
   * Update specific consent preferences
   * @param newConsent - Partial consent object to update
   */
  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = { ...consent, ...newConsent };
    setConsent(updatedConsent);
    setHasConsent(true);
    setIsOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(updatedConsent));
  };

  /**
   * Withdraw all consent and reset to default state
   * Removes all consent data and shows consent banner
   */
  const withdrawConsent = () => {
    setConsent(DEFAULT_CONSENT);
    setHasConsent(false);
    setIsOpen(true);
    localStorage.removeItem('cookie_consent');
  };

  /**
   * Return consent state and management functions
   */
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