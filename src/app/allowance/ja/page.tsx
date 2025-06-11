"use client";
import type { NextPage } from 'next'
import React from 'react'
import '@/app/globals.css';
import MyHead from '@/components/Common/MyHead'
import MySplash from '@/components/Common/MySplash'
import MyAppsHeader from '@/components/Common/MyAppsHeader'
import MyAppsTop from '@/components/Common/MyAppsTop';
import MyAppsFeatures from '@/components/Common/MyAppsFeatures';
import DownloadNow from '@/components/Common/DownloadNow';
import MyFooter from '@/components/Common/MyFooter'
import { myAppNumber, myMenuNumber } from '@/utils/constants';
import { useWindowSize } from '@/hooks/useWindowSize';
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';

const AllowancePage: NextPage = () => {
  const { windowSize, isClient } = useWindowSize();

  if (!isClient) {
    return null;
  }

  const appNumber = myAppNumber.allowance;
  const menuNumber = myMenuNumber.other;
  const isJa = true;
  const { width } = windowSize;
  const mainStyle = { background: "linear-gradient(to bottom right, #00FFFF 0%, #FF40FF 80%)" };

  return (
    <div>
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      <main className="main" style={mainStyle}>
        <MyAppsTop appNumber={appNumber} width={width} isJa={isJa}/>
        <MyAppsFeatures appNumber={appNumber} width={width} isJa={isJa}/>
        <DownloadNow appNumber={appNumber} width={width} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
      <CookieConsentBanner isJa={isJa} />
    </div>
  );
};

export default AllowancePage;