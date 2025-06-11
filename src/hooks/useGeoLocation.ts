import { useState, useEffect } from 'react';

// GDPRが適用される国・地域のリスト
const GDPR_COUNTRIES = [
  // EU加盟国
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // EEA加盟国（EU + ノルウェー、アイスランド、リヒテンシュタイン）
  'NO', 'IS', 'LI',
  // イギリス
  'GB'
];

interface GeoLocationData {
  country: string;
  isGDPRApplicable: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useGeoLocation = (): GeoLocationData => {
  const [data, setData] = useState<GeoLocationData>({
    country: '',
    isGDPRApplicable: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // まずlocalStorageで保存された判定結果を確認
        const savedCountry = localStorage.getItem('user_country');
        const savedGDPRStatus = localStorage.getItem('gdpr_applicable');
        
        if (savedCountry && savedGDPRStatus) {
          setData({
            country: savedCountry,
            isGDPRApplicable: savedGDPRStatus === 'true',
            isLoading: false,
            error: null
          });
          return;
        }

        // IP Geolocation APIを使用して国を判定
        const response = await fetch('https://ipapi.co/json/');
        const geoData = await response.json();
        
        const country = geoData.country_code || '';
        const isGDPRApplicable = GDPR_COUNTRIES.includes(country);
        
        // 結果をlocalStorageに保存（24時間有効）
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
        // エラーハンドリング
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

    // 24時間経過した場合は再判定
    const lastDetection = localStorage.getItem('geo_detection_time');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (!lastDetection || (now - parseInt(lastDetection)) > oneDay) {
      detectLocation();
    } else {
      // 保存されたデータを使用
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