"use client";
import type { NextPage } from 'next'
import React from 'react'
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

const ContactPage: NextPage = () => {
  const { windowSize, isClient } = useWindowSize();

  if (!isClient) {
    return null;
  }

  const appNumber = myAppNumber.home;
  const menuNumber = myMenuNumber.contact;
  const isJa = true;
  const { width } = windowSize;
  const mainStyle = { backgroundColor: "var(--black)" };

  return (
    <div className="page-transition">
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      <AnalyticsTracker 
        pageTitle="お問い合わせ"
        pagePath="/contact/ja"
        appName="Home"
        language={isJa ? 'ja' : 'en'}
        deviceType={width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}
      />
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      <main className="main" style={mainStyle}>
        <ContactBody isJa={isJa}/>
        <MyFooter width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      <CookieConsentBanner isJa={isJa} />
    </div>
  );
};

export default ContactPage;