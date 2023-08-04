"use client";
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import '../../../src/app/globals.css';
import MyHead from '../../../components/Common/MyHead'
import MySplash from '../../../components/Common/MySplash'
import MyAppsHeader from '../../../components/Common/MyAppsHeader'
import MyAppsImageTop from '../../../components/Common/MyAppsImageTop';
import MyAppsFeatures from '../../../components/Common/MyAppsFeatures';
import DownloadNow from '../../../components/Common/DownloadNow';
import MyFooter from '../../../components/Common/MyFooter';
import WordWebApp from '../../../components/Common/WordWebApp';

const Elevator: NextPage = () => {

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

  const appNumber = 6;
  const menuNumber = 100;
  const isJa = false;
  const width = windowSize.width;
  const mainStyle = { background: "linear-gradient(to bottom, #03A9F4 10%, #FF69B4 70%)" }

  return (
    <div>
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      <main className="main" style={mainStyle}>
        <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
        <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
        <MyAppsImageTop appNumber={appNumber} width={width} isJa={isJa}/>
        <MyAppsFeatures appNumber={appNumber} width={width} isJa={isJa}/>
        <WordWebApp appNumber={appNumber} width={width} isJa={isJa}/>
        <DownloadNow appNumber={appNumber} width={width} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber} isHome={false}/>
      </main>
    </div>
  )
}

export default Elevator