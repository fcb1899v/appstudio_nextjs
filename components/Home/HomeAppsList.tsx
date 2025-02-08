import type { NextPage } from 'next'
import React, { CSSProperties, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { isPC, isSP, myApp, myAppNumber, myBadge} from '../../public/utils/constants'
import CookieConsentBanner from './CookieConsentBanner'

interface Props {
  width: number
  height: number
  isJa: boolean
}

const MyAppsList: NextPage<Props> = ({width, height, isJa}) => {

  const [expandNumber, setIsExpandNumber] = useState(0);
  const [expandTop, setExpandTop] = useState(110);
  const handleTap = (number: number, event: React.MouseEvent<HTMLDivElement>) => {
    const touchY = isSP(width) ? event.clientY - 130: 110;
    const expandHeight = 0.5474 * width + 212.59;
    const maxExpandY = height - expandHeight - 30;
    setExpandTop(!isSP(width) ? 110: touchY > maxExpandY ? maxExpandY: touchY < 110 ? 110: touchY);
    setIsExpandNumber(number);
  };

  const appNumber = myApp(width, isJa).length;
  const appRow = Math.floor(width / 300) < appNumber ? Math.floor(width / 300): appNumber;
  const stringIsJa = isJa ? "ja": "en";

  const expandTitle = myApp(width, isJa)[expandNumber].text.menu
  const expandTitleFont = myApp(width, isJa)[expandNumber].font.title
  const expandImage = `/images/${myApp(width, isJa)[expandNumber].folder}/introduction_${stringIsJa}.png`;
  const expandLink = myApp(width, isJa)[expandNumber].link.link
  const expandIos = myApp(width, isJa)[expandNumber].link.ios
  const expandAndroid = myApp(width, isJa)[expandNumber].link.android
  const expandButton = isJa ? "詳細を見る": "View details"

  const appClass = "relative hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30";
  const appStyle: CSSProperties = {
    margin: "0 auto",
    padding: 30,
  }
  const appListStyle: CSSProperties = {
    color: "white",
    display: 'grid', 
    placeItems: 'center', 
    gridTemplateColumns: `repeat(${appRow}, 1fr)`,
    padding: isPC(width) ? "30px 100px": "30px 0",
    marginBottom: 100
  }
  const appIconStyle: CSSProperties = {
    width: 120,
    height: "auto",
    margin: "0 auto"
  }
  const appTitleStyle = (i: number): CSSProperties => ({
    fontSize: myApp(width, isJa)[i].size.menu,
    fontWeight: (myApp(width, isJa)[i].font.menu == undefined) ? 'bold': 'normal', 
    fontFamily: myApp(width, isJa)[i].font.menu,
    textAlign: "center", 
    whiteSpace: "nowrap",
    marginBottom: '1rem',
  })
  const expandStyle: CSSProperties = {
    position: "fixed", 
    top: expandTop, 
    left: isPC(width) ? "25vw": "3vw",
    width: isPC(width) ? "50vw": "94vw", 
    height: "auto", 
    borderRadius: "1rem", 
    backgroundColor: "rgba(0, 0, 0, 0.9)", 
    boxShadow: '0px 0px 50px rgba(255, 255, 255, 0.3)',
    opacity: (expandNumber != 0) ? 1: 0, 
    animation: `fadeInScale 0.5s ease-in-out`,
    padding: 30,
  }
  const expandTitleStyle: CSSProperties = {
    color: "white",
    fontSize: (myApp(width, isJa)[expandNumber].font.menu == undefined) ? '1.5rem': '1.8rem', 
    fontWeight: "bold",
    textAlign: "center", 
    marginBottom: '1rem', 
  }
  const expandImageStyle: CSSProperties = {
    margin: "20px auto", 
    width: "auto", 
    maxHeight: 250, 
  }
  const expandBadgeStyle: CSSProperties = {
    gap: 20, 
    padding: "10px 0"
  }
  const expandIosStyle: CSSProperties = {
    width: isSP(width) ? "36vw": 162, 
    maxWidth: 162, 
    height: "auto"
  }
  const expandAndroidStyle: CSSProperties = {
    width: isSP(width) ? "40vw": 180, 
    maxWidth: 180, 
    height: "auto"
  }
  const expandButtonStyle: CSSProperties = { 
    height: 30, 
    margin: "15px auto 5px auto", 
    backgroundColor: "white", 
    borderRadius: 15,
    color: "#383635", 
    fontSize: "1.2rem", 
    fontWeight: "bold", 
    textAlign: "center",
    maxWidth: 450,
  }

  return <div>
    <div style={appListStyle}>
      {myApp(width, isJa).map((myApp, i) => 
        (i != myAppNumber.home) && <div onClick={(event) => handleTap(i, event)} key={`apps_${i}`} style={appStyle} className={appClass}>
          <h2 style={appTitleStyle(i)}>{myApp.text.menu}</h2>
          <Image src={`/images/${myApp.folder}/icon.png`} alt={myApp.text.menu} width={300} height={300} priority={true} style={appIconStyle}/>
        </div>
      )}
    </div>
    {(expandNumber != myAppNumber.home) && <div onClick={(event) => handleTap(0, event)} style={expandStyle}>
      <h2 className={expandTitleFont} style={expandTitleStyle}>{expandTitle}</h2>
      <Image src={expandImage} alt={`image_${expandNumber}`} width={1920} height={1080} priority={true} style={expandImageStyle}/>
      <div className="flex_center" style={expandBadgeStyle}>
        <Link href={expandIos}>
          <Image src={myBadge[0].image} alt={myBadge[0].title} width={162} height={80} priority={true} style={expandIosStyle}/>
        </Link>
        <Link href={expandAndroid}>
          <Image src={myBadge[1].image} alt={myBadge[1].title} width={162} height={80} priority={true} style={expandAndroidStyle}/>
        </Link>
      </div>
      <Link href={expandLink}>
        <div style={expandButtonStyle}>{expandButton}</div>
      </Link>
    </div>}
  </div>
}

export default MyAppsList
