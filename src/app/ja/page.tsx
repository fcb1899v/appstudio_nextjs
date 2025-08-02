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
 * Japanese home page component for the localized landing page
 * Provides the Japanese version of the main landing page with app listings, analytics tracking,
 * and user engagement features. Includes all the same components as the English version
 * but with Japanese language settings and localized content. Maintains responsive design
 * and analytics tracking capabilities while providing a culturally appropriate experience.
 */

// Japanese home page component for the localized landing page
const HomePage: NextPage = () => {
  // Get window size and client-side rendering status
  const { windowSize, isClient } = useWindowSize();

  // Return null if not on client side (SSR)
  if (!isClient) {
    return null;
  }

  // App and menu configuration for Japanese version
  const appNumber = myAppNumber.home;
  const menuNumber = myMenuNumber.home;
  const isJa = true; // Japanese language flag
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
        pagePath="/ja"
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