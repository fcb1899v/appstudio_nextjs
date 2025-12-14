"use client";
import type { NextPage } from 'next'
import '@/app/globals.css';
import MyHead from '@/components/Common/MyHead'
import MySplash from '@/components/Common/MySplash'
import MyAppsHeader from '@/components/Common/MyAppsHeader'
import MyAppsHowtoUse from '@/components/Common/MyAppsHowtoUse';
import YoutubeMovie from '@/components/Common/YoutubeMovie';
import DownloadNow from '@/components/Common/DownloadNow';
import MyFooter from '@/components/Common/MyFooter'
import MyAppsTop from '@/components/Common/MyAppsTop';
import ElevatorBigNews from '@/components/Common/ElevatorBigNews';
import { myApp, myAppNumber, myMenuNumber } from '@/utils/constants';
import { useWindowSize } from '@/hooks/useWindowSize';
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';
import AnalyticsTracker from '@/components/Common/AnalyticsTracker';

/**
 * Elevator app page component for app showcase and download
 * Displays comprehensive information about the Elevator app including features,
 * screenshots, YouTube videos, how-to-use guide, and download links.
 * Includes analytics tracking, responsive design, and user engagement features
 * to provide a complete app showcase experience. Handles client-side rendering
 * and provides detailed information about the app's functionality and download options.
 */

// Elevator app page component for app showcase and download
const ElevatorPage: NextPage = () => {
  // Get window size and client-side rendering status
  const { windowSize, isClient } = useWindowSize();

  // Return null if not on client side (SSR)
  if (!isClient) {
    return null;
  }

  // App configuration and data for elevator app
  const appNumber = myAppNumber.elevator;
  const menuNumber = myMenuNumber.other;
  const isJa = false; // English language flag
  const { width } = windowSize;
  const appData = myApp(width, isJa)[appNumber];
  
  // Main container style with app-specific background color
  const mainStyle = { backgroundColor: myApp(width, isJa)[appNumber].color.background };

  return (
    <div>
      {/* Page head with SEO and meta information */}
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* Analytics tracking for user behavior */}
      <AnalyticsTracker 
        pageTitle={appData.text.title}
        pagePath="/elevator"
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
        
        {/* YouTube video showcase */}
        <YoutubeMovie appNumber={appNumber} width={width} isJa={isJa}/>
        
        {/* Big news section for app updates */}
        <ElevatorBigNews width={width} isJa={isJa}/>
        
        {/* How to use guide */}
        <MyAppsHowtoUse appNumber={appNumber} width={width} isJa={isJa} maxWidth={800}/>
        
        {/* Additional YouTube video */}
        <YoutubeMovie appNumber={appNumber} width={width} isJa={isJa}/>
        
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

export default ElevatorPage;