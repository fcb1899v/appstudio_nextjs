"use client";
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import '../../../../src/app/globals.css';
import MyHead from '../../../../components/Common/MyHead';
import MySplash from '../../../../components/Common/MySplash';
import HomeHeader from '../../../../components/Home/HomeHeader';
import PrivacyPolicy from '../../../../components/Home/PrivacyPolicy';
import MyFooter from '../../../../components/Common/MyFooter';

const ContactPage: NextPage = () => {

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

  const appNumber = 0
  const menuNumber = 1
  const isJa = true;
  const width = windowSize.width
  const mainStyle = {
    background: "linear-gradient(to bottom, transparent, black) gray",
  }

  return (
    <div>
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      <main className="main" style={mainStyle}>
        <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
        <HomeHeader menuNumber={menuNumber} width={width} isJa={isJa}/>
        <PrivacyPolicy width={width} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber} isHome={false}/>
      </main>
    </div>
  )
}
  
export default ContactPage;