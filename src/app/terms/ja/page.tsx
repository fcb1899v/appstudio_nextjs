"use client";
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import '../../../../src/app/globals.css';
import MyHead from '../../../../components/Common/MyHead';
import MySplash from '../../../../components/Common/MySplash';
import HomeHeader from '../../../../components/Home/HomeHeader';
import PrivacyPolicy from '../../../../components/Home/PrivacyPolicy';
import MyFooter from '../../../../components/Common/MyFooter';
import { myAppNumber, myMenuNumber } from '../../../../public/utils/constants';

const TermsPage: NextPage = () => {

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

  const appNumber = myAppNumber.home
  const menuNumber = myMenuNumber.terms
  const isJa = true;
  const width = windowSize.width
  const mainStyle = {
    background: "linear-gradient(to bottom, transparent, black) gray",
  }

  return (
    <div>
      <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      <HomeHeader menuNumber={menuNumber} width={width} isJa={isJa}/>
      <main className="main" style={mainStyle}>
        <PrivacyPolicy width={width} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
    </div>
  )
}
  
export default TermsPage;