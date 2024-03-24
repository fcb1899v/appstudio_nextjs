"use client"
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import '../../src/app/globals.css';
import MyHead from '../../components/Common/MyHead'
import MySplash from '../../components/Common/MySplash'
import HomeHeader from '../../components/Home/HomeHeader'
import HomeAppsList from '../../components/Home/HomeAppsList'
import MyFooter from '../../components/Common/MyFooter'

const Home: NextPage = () => {

  const [windowSize, setWindowSize] = useState({width: 0, height: 0});
  useEffect(() => {
    if (window.navigator.language == "ja") {
      console.log(window.navigator.language);
      window.location.href = "/ja"
      return;
    }
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
  const menuNumber = 0
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
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={menuNumber} isHome={true}/>
      </main>
    </body>
  </>)
}

export default Home