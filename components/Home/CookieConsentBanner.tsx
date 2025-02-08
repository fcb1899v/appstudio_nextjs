import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState, useEffect, CSSProperties } from 'react';
import { cookieConsentMessage, cookieLabel, cookiePolicyLink } from '../../public/utils/constants';

interface Props {
  isJa: boolean
}
  
const CookieConsentBanner: NextPage<Props> = ({isJa}) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent !== 'accepted') {
      setOpen(true);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setOpen(false);
  };
   
  if (!open) return null;

  const bannerStyle: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    background: 'linear-gradient(135deg, #383735, #444)',
    color: '#ffffff',
    padding: '30px',
    boxSizing: 'border-box',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 9999,
  };

  const textStyle: CSSProperties = {
    fontSize: '14px',
    marginBottom: '12px',
    maxWidth: '900px',
    textAlign: 'center',
    lineHeight: 1.5,
  };

  const cookieLinkTextStyle: CSSProperties = {
    ...textStyle,
    color: '#F7B249', 
    textDecoration: 'underline' 
  }

  const buttonContainerStyle: CSSProperties = {
    display: 'flex',
    gap: '12px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    margin: '12px 0px 4px 0px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
  };

  const acceptButtonStyle: CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#F7B249',
    color: '#000',
  };

  return (
    <div style={bannerStyle}>
      <p style={textStyle}>{cookieConsentMessage(isJa)[0]}</p>
      <p style={textStyle}>
        {cookieConsentMessage(isJa)[1]}
        <Link href={cookiePolicyLink(isJa)} style={cookieLinkTextStyle} target="_blank" rel="noopener noreferrer">
          {cookieLabel(isJa)}
        </Link>
        {cookieConsentMessage(isJa)[2]}
      </p>
      <div style={buttonContainerStyle}>
        <button style={acceptButtonStyle} onClick={handleAccept}>
          OK
        </button>
      </div>
    </div>
  );
}

export default CookieConsentBanner
