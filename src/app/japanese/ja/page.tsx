"use client";
import type { NextPage } from 'next'
import React from 'react'
import '@/app/globals.css';
import MyHead from '@/components/Common/MyHead'
import MySplash from '@/components/Common/MySplash'
import MyAppsHeader from '@/components/Common/MyAppsHeader'
import MyAppsFeatures from '@/components/Common/MyAppsFeatures';
import WordWebApp from '@/components/Common/WordWebApp';
import MyAppsHowtoUse from '@/components/Common/MyAppsHowtoUse';
import MyAppsTop from '@/components/Common/MyAppsTop';
import DownloadNow from '@/components/Common/DownloadNow';
import MyFooter from '@/components/Common/MyFooter'
import { myApp, myAppNumber, myMenuNumber } from '@/utils/constants';
import { useWindowSize } from '@/hooks/useWindowSize';
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';
import AnalyticsTracker from '@/components/Common/AnalyticsTracker';

/**
 * Japanese Japanese learning app page component for app showcase and download
 * Displays comprehensive information about the Japanese learning app in Japanese including features,
 * interactive word web app, how-to-use guide, and download links. Includes analytics
 * tracking, responsive design, and user engagement features to provide a complete
 * app showcase experience. Handles client-side rendering and provides detailed
 * information about the app's functionality and download options with proper SEO optimization.
 */

// Japanese Japanese learning app page component for app showcase and download
const JapanesePage: NextPage = () => {
  // Get window size and client-side rendering status
  const { windowSize, isClient } = useWindowSize();

  // Return null if not on client side (SSR)
  if (!isClient) {
    return null;
  }

  // App configuration and data for japanese app (Japanese version)
  const appNumber = myAppNumber.japanese;
  const menuNumber = myMenuNumber.other;
  const isJa = true; // Japanese language flag
  const { width } = windowSize;
  const appData = myApp(width, isJa)[appNumber];
  
  // Main container style with app-specific background color
  const mainStyle = { background: myApp(width, isJa)[appNumber].color.background };

  return (
    <div>
      {/* Page head with SEO and meta information */}
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* Analytics tracking for user behavior */}
      <AnalyticsTracker 
        pageTitle={appData.text.title}
        pagePath="/japanese/ja"
        appName={appData.app}
        language={isJa ? 'ja' : 'en'}
        deviceType={width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}
      />
      
      {/* Splash screen for initial loading */}
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* App header with navigation */}
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* Main content area with app showcase */}
      <main className="main" style={mainStyle}>
        {/* App introduction and top section */}
        <MyAppsTop appNumber={appNumber} width={width} isJa={isJa}/>
        
        {/* App features showcase */}
        <MyAppsFeatures appNumber={appNumber} width={width} isJa={isJa}/>
        
        {/* Interactive word web app */}
        <WordWebApp appNumber={appNumber} width={width} isJa={isJa}/>
        
        {/* How to use guide */}
        <MyAppsHowtoUse appNumber={appNumber} width={width} isJa={isJa} maxWidth={800}/>
        
        {/* Download section with app store links */}
        <DownloadNow appNumber={appNumber} width={width} isJa={isJa}/>
        
        {/* Footer with navigation */}
        <MyFooter width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      
      {/* Cookie consent banner for privacy compliance */}
      <CookieConsentBanner isJa={isJa} />
    </div>
  );
};

export default JapanesePage;