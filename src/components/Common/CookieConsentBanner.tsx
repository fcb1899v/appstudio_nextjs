import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState, useEffect, CSSProperties } from 'react';
import { cookieConsentMessage, cookieLabel, cookiePolicyLink } from '@/utils/constants';
import { useGeoLocation } from '@/hooks/useGeoLocation';

interface Props {
  isJa: boolean
}

interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
}

const DEFAULT_CONSENT: CookieConsent = {
  analytics: false,
  marketing: false,
  necessary: true,
};

const CookieConsentBanner: NextPage<Props> = ({isJa}) => {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  const [open, setOpen] = useState(false);
  const { isGDPRApplicable, isLoading } = useGeoLocation();

  useEffect(() => {
    // GDPRが適用されない国・地域の場合は表示しない
    if (!isLoading && !isGDPRApplicable) {
      return;
    }

    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
      } catch {
        // 古い形式の同意データがある場合は新しい形式に変換
        if (savedConsent === 'accepted') {
          const newConsent = { ...DEFAULT_CONSENT, analytics: true, marketing: true };
          setConsent(newConsent);
          localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
        }
      }
    } else {
      setOpen(true);
    }
  }, [isGDPRApplicable, isLoading]);
  
  const handleAcceptAll = () => {
    const newConsent = { ...DEFAULT_CONSENT, analytics: true, marketing: true };
    setConsent(newConsent);
    setOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
  };

  const handleAcceptNecessary = () => {
    const newConsent = { ...DEFAULT_CONSENT };
    setConsent(newConsent);
    setOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
  };

  const handleUpdateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = { ...consent, ...newConsent };
    setConsent(updatedConsent);
    setOpen(false);
    localStorage.setItem('cookie_consent', JSON.stringify(updatedConsent));
  };
   
  // GDPRが適用されない国・地域、またはローディング中、または既に同意済みの場合は表示しない
  if (!isGDPRApplicable || isLoading || !open) return null;

  const bannerStyle: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    background: 'linear-gradient(135deg, #383735, #444)',
    color: '#ffffff',
    padding: '20px',
    boxSizing: 'border-box',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
    zIndex: 9999,
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  const containerStyle: CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const titleStyle: CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    textAlign: 'center',
  };

  const textStyle: CSSProperties = {
    fontSize: '14px',
    margin: '0 0 15px 0',
    lineHeight: 1.5,
    textAlign: 'center',
  };

  const cookieLinkTextStyle: CSSProperties = {
    color: '#F7B249',
    textDecoration: 'underline',
  };

  const checkboxContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: '15px 0',
  };

  const checkboxStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  };

  const buttonContainerStyle: CSSProperties = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const buttonStyle: CSSProperties = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    minWidth: '120px',
  };

  const acceptAllButtonStyle: CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#F7B249',
    color: '#000',
  };

  const acceptNecessaryButtonStyle: CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#666',
    color: '#fff',
  };

  const customizeButtonStyle: CSSProperties = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#F7B249',
    border: '2px solid #F7B249',
  };

  const handleCustomize = () => {
    handleUpdateConsent({ analytics: true, marketing: false });
  };

  return (
    <div style={bannerStyle}>
      <div style={containerStyle}>
        <h3 style={titleStyle}>
          {isJa ? 'Cookieの使用について' : 'Cookie Usage'}
        </h3>
        
        <p style={textStyle}>
          {cookieConsentMessage(isJa)[0]}
        </p>
        
        <p style={textStyle}>
          {cookieConsentMessage(isJa)[1]}
          <Link href={cookiePolicyLink(isJa)} style={cookieLinkTextStyle} target="_blank" rel="noopener noreferrer">
            {cookieLabel(isJa)}
          </Link>
          {cookieConsentMessage(isJa)[2]}
        </p>

        <div style={checkboxContainerStyle}>
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              checked={consent.necessary}
              disabled
            />
            {isJa ? '必要不可欠なCookie（常に有効）' : 'Necessary Cookies (Always Active)'}
          </label>
          
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(e) => handleUpdateConsent({ analytics: e.target.checked })}
            />
            {isJa ? '分析Cookie（Google Analytics）' : 'Analytics Cookies (Google Analytics)'}
          </label>
          
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) => handleUpdateConsent({ marketing: e.target.checked })}
            />
            {isJa ? 'マーケティングCookie（広告）' : 'Marketing Cookies (Advertising)'}
          </label>
        </div>

        <div style={buttonContainerStyle}>
          <button style={acceptAllButtonStyle} onClick={handleAcceptAll}>
            {isJa ? 'すべて受け入れる' : 'Accept All'}
          </button>
          
          <button style={acceptNecessaryButtonStyle} onClick={handleAcceptNecessary}>
            {isJa ? '必要不可欠のみ' : 'Necessary Only'}
          </button>
          
          <button style={customizeButtonStyle} onClick={handleCustomize}>
            {isJa ? 'カスタマイズ' : 'Customize'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
