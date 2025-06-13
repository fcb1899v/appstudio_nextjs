import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { myApp, isSP } from '@/utils/constants'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
  maxWidth: number
}

const MyAppsHowtoUse: NextPage<Props> = ({appNumber, width, isJa, maxWidth}) => {

  const title = isJa ? "＜使い方＞": "HOW TO USE";
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const image = myApp(width, isJa)[appNumber].image.howtouse;

  // howtouseが空または無効な場合は非表示
  if (!image || image === "" || image === "/") {
    return <div style={{ height: isSP(width) ? "30px" : "40px" }}></div>;
  }

  const howtouseStyle = {
    color: myApp(width, isJa)[appNumber].color.title,
    backgroundColor: myApp(width, isJa)[appNumber].color.howtouse,
    padding: isSP(width) ? "15px 0" : "20px 0",
    width: "100%",
  }
  const titleStyle: CSSProperties = { 
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    fontWeight: isJa ? "bold": "normal", 
    textAlign: "center", 
    padding: isSP(width) ? "5px 10px" : "10px",
  };
  const imageStyle: CSSProperties = {
    maxWidth: isSP(width) ? "95%" : maxWidth, 
    width: "100%",
    maxHeight: isSP(width) ? "400px" : "600px",
    objectFit: "contain" as const,
    margin: "0 auto",
    padding: isSP(width) ? "5px 0" : "10px 0",
  }

  return <div style={howtouseStyle}>
    <h2 className={titleFont} style={titleStyle}>{title}</h2>
    <Image src={image} alt={`howtouse`} width={1920} height={1080} priority={true} className="image" style={imageStyle}/>
  </div>
}

export default MyAppsHowtoUse
