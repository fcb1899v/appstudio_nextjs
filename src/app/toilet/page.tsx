"use client";
import type { NextPage } from 'next'
import React from 'react'
import '@/app/globals.css';
import MyHead from '@/components/Common/MyHead'
import MySplash from '@/components/Common/MySplash'
import ShoppingButton from '@/components/Common/ShoppingButton';
import MyAppsHeader from '@/components/Common/MyAppsHeader'
import MyAppsHowtoUse from '@/components/Common/MyAppsHowtoUse';
import DownloadNow from '@/components/Common/DownloadNow';
import MyFooter from '@/components/Common/MyFooter'
import MyAppsTop from '@/components/Common/MyAppsTop';
import { myApp, myAppNumber, myMenuNumber } from '@/utils/constants';
import { useWindowSize } from '@/hooks/useWindowSize';
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';
import AnalyticsTracker from '@/components/Common/AnalyticsTracker';

const ToiletPage: NextPage = () => {
  const { windowSize, isClient } = useWindowSize();

  if (!isClient) {
    return null;
  }

  const appNumber = myAppNumber.toilet;
  const menuNumber = myMenuNumber.other;
  const isJa = false;
  const { width } = windowSize;
  const appData = myApp(width, isJa)[appNumber];

  return (
    <div>
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      <AnalyticsTracker 
        pageTitle={appData.text.title}
        pagePath="/toilet"
        appName={appData.app}
        language={isJa ? 'ja' : 'en'}
        deviceType={width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}
      />
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      <ShoppingButton width={width}/>
      <main className="main">
        <MyAppsTop appNumber={appNumber} width={width} isJa={isJa}/>
        <MyAppsHowtoUse appNumber={appNumber} width={width} isJa={isJa} maxWidth={800}/>
        <DownloadNow appNumber={appNumber} width={width} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      <CookieConsentBanner isJa={isJa} />
    </div>
  );
};

export default ToiletPage;