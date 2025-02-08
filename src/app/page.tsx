"use client"
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import '../../src/app/globals.css';
import MyHead from '../../components/Common/MyHead'
import MySplash from '../../components/Common/MySplash'
import HomeHeader from '../../components/Home/HomeHeader'
import HomeAppsList from '../../components/Home/HomeAppsList'
import MyFooter from '../../components/Common/MyFooter'
import { myAppNumber, myMenuNumber } from '../../public/utils/constants';
import MyAppsOverDLTop from '../../components/Common/MyAppsOverDLTop';
import YoutubeMovie from '../../components/Common/YoutubeMovie';
import ElevatorBigNews from '../../components/Common/ElevatorBigNews';
import MyAppsHowtoUse from '../../components/Common/MyAppsHowtoUse';
import DownloadNow from '../../components/Common/DownloadNow';

const HomePage: NextPage = () => {

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
  const menuNumber = myMenuNumber.home
  const isJa = false
  const width = windowSize.width
  const height = windowSize.height
  const mainStyle = { background: "linear-gradient(to bottom, var(--transp), var(--black)) gray" }

  return (<>
    <MyHead appNumber={appNumber} width={width} isJa={isJa}/>
    <body>
      <noscript dangerouslySetInnerHTML={{
        __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T3PSBCC"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
      }}/>
      <MySplash appNumber={appNumber} width={width} isJa={isJa}/>
      <HomeHeader menuNumber={menuNumber} width={width} isJa={isJa}/>
      <main className="main" style={mainStyle}>
        <HomeAppsList width={width} height={height} isJa={isJa}/>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber}/>
      </main>
    </body>
  </>)
}

export default HomePage