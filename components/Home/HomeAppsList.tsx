import type { NextPage } from 'next'
import React, { CSSProperties, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { myApp, myBadge} from '../../public/utils/constants'

interface Props {
  width: number
  height: number
  isJa: boolean
}

const MyAppsList: NextPage<Props> = ({width, height, isJa}) => {

  const isSP = (width < 600);
  const isPC = (width > 1024); 
  const appNumber = myApp(width, isJa).length;
  const appRow = Math.floor(width / 300) < appNumber ? Math.floor(width / 300): appNumber;

  const [expandNumber, setIsExpandNumber] = useState(0);
  const [expandTop, setExpandTop] = useState(110);
  const handleTap = (number: number, event: React.MouseEvent<HTMLDivElement>) => {
    const touchY = (isSP) ? event.clientY - 130: 110;
    const expandHeight = 0.5474 * width + 212.59;
    const maxExpandY = height - expandHeight - 30;
    setExpandTop(!isSP ? 110: touchY > maxExpandY ? maxExpandY: touchY < 110 ? 110: touchY);
    setIsExpandNumber(number);
  };

  const stringIsJa = isJa ? "ja": "en";
  const expandImage = `/images/${myApp(width, isJa)[expandNumber].folder}/introduction_${stringIsJa}.png`;
  const viewDetail = isJa ? "詳細を見る": "View details"
  const appTitle = (i: number) => myApp(width, isJa)[i].text.menu;
  const appIconImage = (i: number) => `/images/${myApp(width, isJa)[i].folder}/icon.png`;

  const appListStyle: CSSProperties = {
    color: "white",
    display: 'grid', 
    placeItems: 'center', 
    gridTemplateColumns: `repeat(${appRow}, 1fr)`,
    padding: 30,
  }
  const appStyle: CSSProperties = {
    margin: "0 auto",
    padding: 30,
  }
  const appTitleStyle = (i: number): CSSProperties => ({
    fontSize: myApp(width, isJa)[i].size.menu,
    fontWeight: (myApp(width, isJa)[i].font == undefined) ? 'bold': 'normal', 
    textAlign: "center", 
    whiteSpace: "nowrap",
    marginBottom: '1rem',
  })
  const appIconStyle: CSSProperties = {
    width: 120,
    height: "auto",
    margin: "0 auto"
  }
  const appList = [];
  for (let i = 1; i < myApp(width, isJa).length; i++) {
    appList.push( 
      <div onClick={(event) => handleTap(i, event)} key={`apps_${i}`} style={appStyle}
        className="relative hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" 
      >
        <div className={myApp(width, isJa)[i].font.menu}>
          <h2 style={appTitleStyle(i)}>{appTitle(i)}</h2>
        </div>
        <Image src={appIconImage(i)} alt={appTitle(i)} width={300} height={300} priority={true} style={appIconStyle}/>
      </div>
    )
  }

  const expandStyle: CSSProperties = {
    position: "fixed", 
    top: expandTop, 
    left: isPC ? "15vw": "3vw",
    width: isPC ? "70vw": "94vw", 
    height: "auto", 
    borderRadius: "1rem", 
    backgroundColor: "rgba(0, 0, 0, 0.9)", 
    boxShadow: '0px 0px 50px rgba(255, 255, 255, 0.3)',
    opacity: (expandNumber != 0) ? 1: 0, 
    animation: `fadeInScale 0.5s ease-in-out`,
  }
  const expandTitleStyle: CSSProperties = {
    color: "white",
    fontSize: (myApp(width, isJa)[expandNumber].font == undefined) ? '1.5rem': '1.8rem', 
    fontWeight: "bold",
    textAlign: "center", 
    marginBottom: '1rem', 
  }
  const expandImageStyle: CSSProperties = {
    margin: "20px auto", 
    width: "auto", 
    maxHeight: 250, 
  }
  const expandBadgeStyle = (i: number): CSSProperties => ({
    width: (i == 0) ? (isSP ? "36vw": 162): (isSP ? "40vw": 180), 
    maxWidth: (i == 0) ? 162: 180, 
    height: "auto"
  });
  const expandButtonStyle: CSSProperties = { 
    height: 30, 
    margin: "15px 50px 5px 50px", 
    backgroundColor: "white", 
    borderRadius: 15,
    color: "#383635", 
    fontSize: "1.2rem", 
    fontWeight: "bold", 
    textAlign: "center"
  }

  return (<div>
    <div style={appListStyle}>{appList}</div>
    {(expandNumber != 0) && (
      <div onClick={(event) => handleTap(0, event)} className='flex_center' style={expandStyle}>
        <div style={{padding: 30}}>
          <h2 className={myApp(width, isJa)[expandNumber].font.title} style={expandTitleStyle}>{appTitle(expandNumber)}</h2>
          <Link href={myApp(width, isJa)[expandNumber].link.link} key={`appLink_${expandNumber}`}>
            <Image src={expandImage} alt={`image_${expandNumber}`} width={1920} height={1080} priority={true} style={expandImageStyle}/>
          </Link>
          <div className="flex_center" style={{gap: 20, padding: "10px 0"}}>
            <Link href={myApp(width, isJa)[expandNumber].link.ios} key={`iosBadge_${expandNumber}`}>
              <Image src={myBadge[0].image} alt={myBadge[0].title} width={162} height={80} priority={true} style={expandBadgeStyle(0)}/>
            </Link>
            <Link href={myApp(width, isJa)[expandNumber].link.android} key={`androidBadge_${expandNumber}`}>
              <Image src={myBadge[1].image} alt={myBadge[1].title} width={162} height={80} priority={true} style={expandBadgeStyle(1)}/>
            </Link>
          </div>
          <div style={expandButtonStyle}>
            <Link href={myApp(width, isJa)[expandNumber].link.link} key={`appLink_${expandNumber}`}>{viewDetail}</Link>
          </div>
        </div>
      </div>
    )}
  </div>)
}

export default MyAppsList
