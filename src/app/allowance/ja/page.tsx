"use client";
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import '../../../../src/app/globals.css';
import MyHead from '../../../../components/Common/MyHead'
import MySplash from '../../../../components/Common/MySplash'
import MyAppsHeader from '../../../../components/Common/MyAppsHeader'
import MyAppsTop from '../../../../components/Common/MyAppsTop';
import AllowanceFeatures from '../../../../components/Apps/AllowanceFeatures';
import DownloadNow from '../../../../components/Common/DownloadNow';
import MyFooter from '../../../../components/Common/MyFooter'

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

  const appNumber = 5
  const menuNumber = 100
  const isJa = true;
  const width = windowSize.width
  const mainStyle ={ background: "linear-gradient(to bottom right, #00FFFF 0%, #FF40FF 80%)" }

  return (
    <div>
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      <main className="main" style={mainStyle}>
        <MyAppsTop appNumber={appNumber} width={width} isJa={isJa}/>
        <AllowanceFeatures width={width} isJa={isJa}/>
        <DownloadNow appNumber={appNumber} width={width} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber} isHome={false}/>
      </main>
    </div>
  )
}

export default Elevator