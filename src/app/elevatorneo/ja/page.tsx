"use client";
import type { NextPage } from 'next'
import '@/app/globals.css';
import MyHead from '@/components/Common/MyHead'
import MySplash from '@/components/Common/MySplash'
import MyAppsHeader from '@/components/Common/MyAppsHeader'
import DownloadNow from '@/components/Common/DownloadNow';
import MyFooter from '@/components/Common/MyFooter'
import MyAppsTop from '@/components/Common/MyAppsTop';
import MyAppsFeatures from '@/components/Common/MyAppsFeatures';
import { myApp, myAppNumber, myMenuNumber } from '@/utils/constants';
import { useWindowSize } from '@/hooks/useWindowSize';
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';
import AnalyticsTracker from '@/components/Common/AnalyticsTracker';

/**
 * Japanese Elevator Neo page component
 * Displays the Japanese version of the Elevator Neo app showcase page with features,
 * download links, and analytics tracking. Includes splash screen, header, top section,
 * features display, download section, footer, and cookie consent banner.
 * Designed to showcase the Elevator Neo app with Japanese localization and responsive design.
 * @returns Japanese Elevator Neo page component
 */
const ElevatorNeoPage: NextPage = () => {
  // Get window size and client-side rendering status
  const { windowSize, isClient } = useWindowSize();

  // Return null if not on client side (SSR)
  if (!isClient) {
    return null;
  }

  // App and menu configuration for Japanese Elevator Neo page
  const appNumber = myAppNumber.elevatorNeo;
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
        pagePath="/elevatorneo/ja"
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
        {/* Top section with app introduction */}
        <MyAppsTop appNumber={appNumber} width={width} isJa={isJa}/>
        
        {/* Features section displaying app capabilities */}
        <MyAppsFeatures appNumber={appNumber} width={width} isJa={isJa}/>
        
        {/* Download section with app store links */}
        <DownloadNow appNumber={appNumber} width={width} isJa={isJa}/>
        
        {/* Footer with navigation and links */}
        <MyFooter width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      
      {/* Cookie consent banner for privacy compliance */}
      <CookieConsentBanner isJa={isJa} />
    </div>
  );
};

export default ElevatorNeoPage;