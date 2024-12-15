"use client";
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import '../../../src/app/globals.css';
import MyHead from '../../../components/Common/MyHead'
import MySplash from '../../../components/Common/MySplash'
import MyAppsHeader from '../../../components/Common/MyAppsHeader'
import MyAppsTop from '../../../components/Common/MyAppsTop';
import MyAppsFeatures from '../../../components/Common/MyAppsFeatures';
import DownloadNow from '../../../components/Common/DownloadNow';
import MyFooter from '../../../components/Common/MyFooter'
import { myApp, myAppNumber, myMenuNumber } from '../../../public/utils/constants';

const CrossingPage: NextPage = () => {

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) {
    return null;
  }

  const appNumber = myAppNumber.crossing
  const menuNumber = myMenuNumber.other
  const isJa = false;
  const width = windowSize.width
  const mainStyle ={ backgroundColor: myApp(width, isJa)[appNumber].color.background }

  return (
    <div>
      <MyHead appNumber={appNumber} width={width}isJa={isJa}/>
      <MySplash appNumber={appNumber} width={width}isJa={isJa}/>
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      <main className="main" style={mainStyle}>
        <MyAppsTop appNumber={appNumber} width={width} isJa={isJa}/>
        <MyAppsFeatures appNumber={appNumber} width={width} isJa={isJa}/>
        <DownloadNow appNumber={appNumber} width={width} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
    </div>
  )
}

export default CrossingPage