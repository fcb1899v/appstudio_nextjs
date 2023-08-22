"use client";
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import '../../../src/app/globals.css';
import MyHead from '../../../components/Common/MyHead';
import MySplash from '../../../components/Common/MySplash';
import MyFooter from '../../../components/Common/MyFooter';
import HomeHeader from '../../../components/Home/HomeHeader';
import ContactBody from '../../../components/Home/ContactBody';

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
  const menuNumber = 2
  const isJa = false;
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
        <ContactBody isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber} isHome={false}/>
      </main>
    </div>
  )
}
  
export default ContactPage;