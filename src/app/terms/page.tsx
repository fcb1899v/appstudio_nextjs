"use client";
import type { NextPage } from 'next'
import React from 'react'
import '@/app/globals.css';
import MyHead from '@/components/Common/MyHead'
import MySplash from '@/components/Common/MySplash'
import MyAppsHeader from '@/components/Common/MyAppsHeader'
import MyFooter from '@/components/Common/MyFooter'
import { myAppNumber, myMenuNumber } from '@/utils/constants';
import { useWindowSize } from '@/hooks/useWindowSize';
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';
import AnalyticsTracker from '@/components/Common/AnalyticsTracker';
import TermsContents from '@/components/Home/TermsContents';

/**
 * Terms of Service page component for legal information
 * Displays the terms of service and legal information for the application.
 * Includes analytics tracking, responsive design, and proper legal content
 * presentation. Handles client-side rendering and provides comprehensive
 * legal information with proper SEO optimization and user experience.
 */

// Terms of Service page component for legal information
const TermsPage: NextPage = () => {
  // Get window size and client-side rendering status
  const { windowSize, isClient } = useWindowSize();

  // Return null if not on client side (SSR)
  if (!isClient) {
    return null;
  }

  // App configuration and data for terms page
  const appNumber = myAppNumber.home;
  const menuNumber = myMenuNumber.terms;
  const isJa = false; // English language flag
  const { width } = windowSize;
  
  // Main container style with black background
  const mainStyle = { backgroundColor: "var(--black)" };

  return (
    <div className="page-transition">
      {/* Page head with SEO and meta information */}
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* Analytics tracking for user behavior */}
      <AnalyticsTracker 
        pageTitle="Terms of Service"
        pagePath="/terms"
        appName="Home"
        language={isJa ? 'ja' : 'en'}
        deviceType={width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}
      />
      
      {/* Splash screen for initial loading */}
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* App header with navigation */}
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* Main content area with terms of service */}
      <main className="main" style={mainStyle}>
        {/* Terms of service content */}
        <TermsContents isJa={isJa}/>
        
        {/* Footer with navigation */}
        <MyFooter width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      
      {/* Cookie consent banner for privacy compliance */}
      <CookieConsentBanner isJa={isJa} />
    </div>
  );
};

export default TermsPage;