"use client";
import type { NextPage } from 'next'
import React from 'react'
import '@/app/globals.css';
import MyHead from '@/components/Common/MyHead'
import MySplash from '@/components/Common/MySplash'
import ShoppingButton from '@/components/Common/ShoppingButton';
import MyAppsHeader from '@/components/Common/MyAppsHeader'
import MyAppsHowtoUse from '@/components/Common/MyAppsHowtoUse';
import YoutubeMovie from '@/components/Common/YoutubeMovie';
import DownloadNow from '@/components/Common/DownloadNow';
import MyFooter from '@/components/Common/MyFooter'
import MyAppsOverDLTop from '@/components/Common/MyAppsOverDLTop';
import ElevatorBigNews from '@/components/Common/ElevatorBigNews';
import { myApp, myAppNumber, myMenuNumber } from '@/utils/constants';
import { useWindowSize } from '@/hooks/useWindowSize';
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';
import AnalyticsTracker from '@/components/Common/AnalyticsTracker';

const ElevatorPage: NextPage = () => {
  const { windowSize, isClient } = useWindowSize();

  if (!isClient) {
    return null;
  }

  const appNumber = myAppNumber.elevator;
  const menuNumber = myMenuNumber.other;
  const isJa = true;
  const { width } = windowSize;
  const appData = myApp(width, isJa)[appNumber];
  const mainStyle = { background: myApp(width, isJa)[appNumber].color.background };

  return (
    <div>
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      <AnalyticsTracker 
        pageTitle={appData.text.title}
        pagePath="/elevator/ja"
        appName={appData.app}
        language={isJa ? 'ja' : 'en'}
        deviceType={width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}
      />
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      <ShoppingButton width={width}/>
      <main className="main" style={mainStyle}>
        <MyAppsOverDLTop appNumber={appNumber} width={width} isJa={isJa}/>
        <YoutubeMovie appNumber={appNumber} width={width} isJa={isJa}/>
        <ElevatorBigNews width={width} isJa={isJa}/>
        <MyAppsHowtoUse appNumber={appNumber} width={width} isJa={isJa} maxWidth={800}/>
        <YoutubeMovie appNumber={appNumber} width={width} isJa={isJa}/>
        <DownloadNow appNumber={appNumber} width={width} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      <CookieConsentBanner isJa={isJa} />
    </div>
  );
};

export default ElevatorPage;