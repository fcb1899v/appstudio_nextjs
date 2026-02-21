import { useState, useEffect } from 'react';

/**
 * EU/EEA/UK country codes for GDPR applicability.
 */
const GDPR_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'NO', 'IS', 'LI',
  'GB',
];

export interface GeoLocationData {
  country: string;
  isGDPRApplicable: boolean;
  isLoading: boolean;
  error: string | null;
}

const STORAGE_KEY_COUNTRY = 'user_country';
const STORAGE_KEY_GDPR = 'gdpr_applicable';
const STORAGE_KEY_TIME = 'geo_detection_time';
const CACHE_MS = 24 * 60 * 60 * 1000;

/**
 * Detects if the user is in a GDPR-applicable region (EU/EEA/UK) via IP geolocation.
 * Uses ipinfo.io (CORS-enabled for browser). Results cached in localStorage for 24h.
 */
export function useGeoLocation(): GeoLocationData {
  const [data, setData] = useState<GeoLocationData>({
    country: '',
    isGDPRApplicable: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const run = async () => {
      const savedTime = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_TIME) : null;
      const now = Date.now();
      if (savedTime && now - parseInt(savedTime, 10) < CACHE_MS) {
        const country = localStorage.getItem(STORAGE_KEY_COUNTRY) || '';
        const gdpr = localStorage.getItem(STORAGE_KEY_GDPR) === 'true';
        setData({ country, isGDPRApplicable: gdpr, isLoading: false, error: null });
        return;
      }

      try {
        const res = await fetch('https://ipinfo.io/json');
        const json = await res.json();
        const country = (json.country && String(json.country).toUpperCase().slice(0, 2)) || '';
        const isGDPRApplicable = GDPR_COUNTRIES.includes(country);

        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY_COUNTRY, country);
          localStorage.setItem(STORAGE_KEY_GDPR, String(isGDPRApplicable));
          localStorage.setItem(STORAGE_KEY_TIME, String(now));
        }

        setData({ country, isGDPRApplicable, isLoading: false, error: null });
      } catch {
        setData({
          country: '',
          isGDPRApplicable: true,
          isLoading: false,
          error: 'Geolocation failed',
        });
      }
    };

    run();
  }, []);

  return data;
}
