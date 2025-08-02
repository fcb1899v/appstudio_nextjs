"use client";
import type { NextPage } from 'next'
import React from 'react';
import '@/app/globals.css';
import MyHead from '@/components/Common/MyHead';
import MySplash from '@/components/Common/MySplash';
import MyAppsHeader from '@/components/Common/MyAppsHeader';
import MyFooter from '@/components/Common/MyFooter';
import ContactBody from '@/components/Home/ContactBody';
import { myAppNumber, myMenuNumber } from '@/utils/constants';
import { useWindowSize } from '@/hooks/useWindowSize';
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';
import AnalyticsTracker from '@/components/Common/AnalyticsTracker';

/**
 * Contact page component for user inquiries and feedback
 * Provides a contact form and information page where users can submit inquiries,
 * feedback, or get in touch with the development team. Includes analytics tracking,
 * cookie consent banner, and responsive design to ensure proper user experience
 * across all devices. Handles form submissions and user interaction tracking.
 */

// Contact page component for user inquiries and feedback
const ContactPage: NextPage = () => {
  // Get window size and client-side rendering status
  const { windowSize, isClient } = useWindowSize();

  // Return null if not on client side (SSR)
  if (!isClient) {
    return null;
  }

  // App and menu configuration for contact page
  const appNumber = myAppNumber.home
  const menuNumber = myMenuNumber.contact
  const isJa = false; // English language flag
  const { width } = windowSize;
  
  // Main container style with gradient background
  const mainStyle = {
    background: "linear-gradient(to bottom, transparent, black) gray",
  }

  return (
    <div className="page-transition">
      {/* Page head with SEO and meta information */}
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      
      {/* Analytics tracking for user behavior */}
      <AnalyticsTracker 
        pageTitle="Contact"
        pagePath="/contact"
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
        <ContactBody isJa={isJa}/>
        <MyFooter width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      
      {/* Cookie consent banner for privacy compliance */}
      <CookieConsentBanner isJa={isJa} />
    </div>
  )
}
  
export default ContactPage;