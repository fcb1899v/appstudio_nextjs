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

const HomePage: NextPage = () => {
  const { windowSize, isClient } = useWindowSize();

  if (!isClient) {
    return null;
  }

  const appNumber = myAppNumber.home;
  const menuNumber = myMenuNumber.home;
  const isJa = true;
  const { width, height } = windowSize;
  const mainStyle = { background: "linear-gradient(to bottom, var(--transp), var(--black)) gray" };

  return (
    <>
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      <AnalyticsTracker 
        pageTitle="Nakajima Masao App Studio"
        pagePath="/ja"
        appName="Home"
        language={isJa ? 'ja' : 'en'}
        deviceType={width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}
      />
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      <main className="main" style={mainStyle}>
        <HomeAppsList width={width} height={height} isJa={isJa}/>
        <MyFooter width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      <CookieConsentBanner isJa={isJa} />
    </>
  );
};

export default HomePage;