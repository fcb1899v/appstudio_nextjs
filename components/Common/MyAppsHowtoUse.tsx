import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { myApp } from '../../public/utils/constants'

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

  const howtouseStyle = {
    color: myApp(width, isJa)[appNumber].color.title,
    backgroundColor: myApp(width, isJa)[appNumber].color.howtouse,
    padding: "20px 0",
    width: "100vw",
  }
  const titleStyle: CSSProperties = { 
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    fontWeight: isJa ? "bold": "normal", 
    textAlign: "center", 
    padding: 10,
  };
  const imageStyle: CSSProperties = {
    maxWidth: maxWidth, 
    margin: "0 auto",
    padding: "10px 0",
  }

  return <div style={howtouseStyle}>
    <h2 className={titleFont} style={titleStyle}>{title}</h2>
    <Image src={image} alt={`howtouse`} width={1920} height={1080} priority={true} className="image" style={imageStyle}/>
  </div>
}

export default MyAppsHowtoUse
