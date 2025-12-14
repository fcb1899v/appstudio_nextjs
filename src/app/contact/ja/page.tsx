"use client";
import type { NextPage } from 'next'
import '@/app/globals.css';
import MyHead from '@/components/Common/MyHead'
import MySplash from '@/components/Common/MySplash'
import MyAppsHeader from '@/components/Common/MyAppsHeader'
import MyFooter from '@/components/Common/MyFooter'
import ContactBody from '@/components/Home/ContactBody';
import { myAppNumber, myMenuNumber } from '@/utils/constants';
import { useWindowSize } from '@/hooks/useWindowSize';
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';
import AnalyticsTracker from '@/components/Common/AnalyticsTracker';

/**
 * Japanese Contact page component for user inquiries and feedback
 * Displays a contact form in Japanese for user inquiries and feedback.
 * Includes analytics tracking, responsive design, and user engagement
 * features to provide a complete contact experience. Handles client-side
 * rendering and provides proper SEO optimization for the contact page.
 */

// Japanese Contact page component for user inquiries and feedback
const ContactPage: NextPage = () => {
  // Get window size and client-side rendering status
  const { windowSize, isClient } = useWindowSize();

  // Return null if not on client side (SSR)
  if (!isClient) {
    return null;
  }

  // Page configuration for contact page (Japanese version)
  const appNumber = myAppNumber.home;
  const menuNumber = myMenuNumber.contact;
  const isJa = true; // Japanese language flag
  const { width } = windowSize;
  
  // Main container style with black background
  const mainStyle = { backgroundColor: "var(--black)" };

  return (
    <div className="page-transition">
      {/* Page head with SEO and meta information */}
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* Analytics tracking for user behavior */}
      <AnalyticsTracker 
        pageTitle="お問い合わせ"
        pagePath="/contact/ja"
        appName="Home"
        language={isJa ? 'ja' : 'en'}
        deviceType={width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}
      />
      
      {/* Splash screen for initial loading */}
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* App header with navigation */}
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* Main content area with contact form */}
      <main className="main" style={mainStyle}>
        {/* Contact form body */}
        <ContactBody isJa={isJa}/>
        
        {/* Footer with navigation */}
        <MyFooter width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      
      {/* Cookie consent banner for privacy compliance */}
      <CookieConsentBanner isJa={isJa} />
    </div>
  );
};

export default ContactPage;