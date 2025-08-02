"use client"
import type { NextPage } from 'next'
import '@/app/globals.css';
import MyHead from '@/components/Common/MyHead'
import MySplash from '@/components/Common/MySplash'
import HomeAppsList from '@/components/Home/HomeAppsList'
import MyFooter from '@/components/Common/MyFooter'
import { myAppNumber, myMenuNumber } from '@/utils/constants';
import { useWindowSize } from '@/hooks/useWindowSize';
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';
import AnalyticsTracker from '@/components/Common/AnalyticsTracker';
import MyAppsHeader from '@/components/Common/MyAppsHeader';

/**
 * Home page component for the main landing page
 * Displays the primary landing page with app listings, analytics tracking, and user engagement features.
 * Includes splash screen, app header, app list, footer, and cookie consent banner.
 * Designed to showcase all available applications with responsive design and proper analytics tracking.
 */

// Home page component for the main landing page
const HomePage: NextPage = () => {
  // Get window size and client-side rendering status
  const { windowSize, isClient } = useWindowSize();

  // Return null if not on client side (SSR)
  if (!isClient) {
    return null;
  }
    
  // App and menu configuration for home page
  const appNumber = myAppNumber.home;
  const menuNumber = myMenuNumber.home;
  const isJa = false; // English language flag
  const { width, height } = windowSize;
  
  // Main container style with gradient background
  const mainStyle = { background: "linear-gradient(to bottom, var(--transp), var(--black)) gray" };

  return (
    <>
      {/* Page head with SEO and meta information */}
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* Analytics tracking for user behavior */}
      <AnalyticsTracker 
        pageTitle="Nakajima Masao App Studio"
        pagePath="/"
        appName="Home"
        language={isJa ? 'ja' : 'en'}
        deviceType={width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}
      />
      
      {/* Splash screen for initial loading */}
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* App header with navigation */}
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* Main content area with app list */}
      <main className="main" style={mainStyle}>
        <HomeAppsList width={width} height={height} isJa={isJa}/>
        <MyFooter width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      
      {/* Cookie consent banner for privacy compliance */}
      <CookieConsentBanner isJa={isJa} />
    </>
  );
};

export default HomePage;