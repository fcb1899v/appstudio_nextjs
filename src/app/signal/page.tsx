"use client";
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import '../../../src/app/globals.css';
import MyHead from '../../../components/Common/MyHead'
import MySplash from '../../../components/Common/MySplash'
import MyAppsHeader from '../../../components/Common/MyAppsHeader'
import MyAppsFeatures from '../../../components/Common/MyAppsFeatures';
import MyAppsHowtoUse from '../../../components/Common/MyAppsHowtoUse';
import DownloadNow from '../../../components/Common/DownloadNow';
import MyFooter from '../../../components/Common/MyFooter'
import SignalTop from '../../../components/Apps/SignalTop';
import { myApp } from '../../../public/utils/constants';
import { beon } from '../../../public/fonts/fonts';

const Signal: NextPage = () => {

  const [windowSize, setWindowSize] = useState({width: 0, height: 0});
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {setWindowSize({ 
        width: window.innerWidth,
        height: window.innerHeight,
      });};
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    } else {
      return;
    }
  }, []);

  const appNumber = 2
  const menuNumber = 100
  const isJa = false;
  const width = windowSize.width
  const mainStyle ={ backgroundColor: myApp(width, isJa)[appNumber].color.background }

  return (
    <div>
      <MyHead appNumber={appNumber} width={width}isJa={isJa}/>
      <MySplash appNumber={appNumber} width={width}isJa={isJa}/>
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      <main className="main" style={mainStyle}>
        <SignalTop width={width} isJa={isJa}/>
        <MyAppsFeatures appNumber={appNumber} width={width} isJa={isJa}/>
        <MyAppsHowtoUse appNumber={appNumber} width={width} isJa={isJa} maxWidth={800}/>
        <DownloadNow appNumber={appNumber} width={width} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber} isHome={false}/>
      </main>
    </div>
  )
}

export default Signal