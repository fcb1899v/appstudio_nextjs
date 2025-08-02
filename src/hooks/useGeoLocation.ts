import { useState, useEffect } from 'react';

/**
 * List of countries and regions where GDPR is applicable
 * Includes EU member states, EEA member states, and the United Kingdom
 */
const GDPR_COUNTRIES = [
  // EU member states
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // EEA member states (EU + Norway, Iceland, Liechtenstein)
  'NO', 'IS', 'LI',
  // United Kingdom
  'GB'
];

/**
 * Interface for geolocation data structure
 * Defines the structure for user location and GDPR compliance data
 */
interface GeoLocationData {
  country: string;
  isGDPRApplicable: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for detecting user's geographic location and GDPR compliance
 * Uses IP geolocation API to determine user's country and GDPR applicability
 * @returns GeoLocationData object containing country and GDPR status
 */
export const useGeoLocation = (): GeoLocationData => {
  // State for storing geolocation data
  const [data, setData] = useState<GeoLocationData>({
    country: '',
    isGDPRApplicable: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    /**
     * Function to detect user's location using IP geolocation
     * Fetches location data from IP Geolocation API and caches results
     */
    const detectLocation = async () => {
      try {
        // First check for saved detection results in localStorage
        const savedCountry = localStorage.getItem('user_country');
        const savedGDPRStatus = localStorage.getItem('gdpr_applicable');
        
        // Use saved data if available to avoid unnecessary API calls
        if (savedCountry && savedGDPRStatus) {
          setData({
            country: savedCountry,
            isGDPRApplicable: savedGDPRStatus === 'true',
            isLoading: false,
            error: null
          });
          return;
        }

        // Use IP Geolocation API to determine country
        const response = await fetch('https://ipapi.co/json/');
        const geoData = await response.json();
        
        const country = geoData.country_code || '';
        const isGDPRApplicable = GDPR_COUNTRIES.includes(country);
        
        // Save results to localStorage (valid for 24 hours)
        // This reduces API calls and improves performance
        localStorage.setItem('user_country', country);
        localStorage.setItem('gdpr_applicable', isGDPRApplicable.toString());
        localStorage.setItem('geo_detection_time', Date.now().toString());
        
        setData({
          country,
          isGDPRApplicable,
          isLoading: false,
          error: null
        });
      } catch {
        // Error handling - default to Japan if detection fails
        // This ensures the app continues to work even if geolocation fails
        setData({
          country: 'JP',
          isGDPRApplicable: false,
          isLoading: false,
          error: 'Geolocation detection failed'
        });
      } finally {
        setData(prevData => ({ ...prevData, isLoading: false }));
      }
    };

    // Re-detect location if 24 hours have passed since last detection
    // This ensures location data stays relatively current
    const lastDetection = localStorage.getItem('geo_detection_time');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (!lastDetection || (now - parseInt(lastDetection)) > oneDay) {
      detectLocation();
    } else {
      // Use saved data if within 24-hour window
      // This avoids unnecessary API calls for recent detections
      const savedCountry = localStorage.getItem('user_country') || 'JP';
      const savedGDPRStatus = localStorage.getItem('gdpr_applicable') === 'true';
      
      setData({
        country: savedCountry,
        isGDPRApplicable: savedGDPRStatus,
        isLoading: false,
        error: null
      });
    }
  }, []);

  return data;
}; 