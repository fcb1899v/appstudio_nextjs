"use client";
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import '../../../src/app/globals.css';
import MyHead from '../../../components/Common/MyHead'
import MySplash from '../../../components/Common/MySplash'
import ShoppingButton from '../../../components/Common/ShoppingButton';
import MyAppsHeader from '../../../components/Common/MyAppsHeader'
import MyAppsHowtoUse from '../../../components/Common/MyAppsHowtoUse';
import YoutubeMovie from '../../../components/Common/YoutubeMovie';
import DownloadNow from '../../../components/Common/DownloadNow';
import MyFooter from '../../../components/Common/MyFooter'
import MyAppsOverDLTop from '../../../components/Common/MyAppsOverDLTop';
import ElevatorBigNews from '../../../components/Common/ElevatorBigNews';
import { myApp, myAppNumber, myMenuNumber } from '../../../public/utils/constants';

const ElevatorPage: NextPage = () => {

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

  const appNumber = myAppNumber.elevator
  const menuNumber = myMenuNumber.other
  const isJa = false;
  const width = windowSize.width
  const mainStyle = { backgroundColor: myApp(width, isJa)[appNumber].color.background }

  return (
    <div>
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa}/>
      <ShoppingButton appNumber={appNumber}/>
      <main className="main" style={mainStyle}>
        <MyAppsOverDLTop appNumber={appNumber} width={width} isJa={isJa}/>
        <YoutubeMovie appNumber={appNumber} width={width} isJa={isJa}/>
        <ElevatorBigNews width={width} isJa={isJa}/>
        <MyAppsHowtoUse appNumber={appNumber} width={width} isJa={isJa} maxWidth={800}/>
        <YoutubeMovie appNumber={appNumber} width={width} isJa={isJa}/>
        <DownloadNow appNumber={appNumber} width={width} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
    </div>
  )
}

export default ElevatorPage