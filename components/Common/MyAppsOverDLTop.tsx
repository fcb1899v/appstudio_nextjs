import { NextPage } from "next";
import '../../src/app/globals.css';
import Image from "next/image"
import MyAppsBadges from "./MyAppsBadges";
import { isPC, myApp } from "../../public/utils/constants";
import { CSSProperties } from "react";
import { isSP } from "../../public/utils/constants";


interface Props {
  appNumber: number
  width: number
  isJa: boolean
}
  
const MyAppsOverDLTop: NextPage<Props> = ({appNumber, width, isJa}) => { 
    
  const title = myApp(width, isJa)[appNumber].text.title;
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const titleColor = myApp(width, isJa)[appNumber].color.title;
  const titleSize = myApp(width, isJa)[appNumber].size.title;
  const dlNumber = myApp(width, isJa)[appNumber].text.dlnumber!;
  const icon = myApp(width, isJa)[appNumber].icon;
  const picture = myApp(width, isJa)[appNumber].image.picture!;
  const messages = myApp(width, isJa)[appNumber].text.message;
  const headerFont = myApp(width, isJa)[appNumber].font.header!;
  const download = isJa ? "ダウンロード突破！": "Downloads";

  const elevatorTopStyle: CSSProperties = {
    color: titleColor
  }
  const topStyle: CSSProperties = {
    width: isPC(width) ? 540: "100%", 
    padding: "20px 10px 0px 10px"
  }
  const titleStyle: CSSProperties = {
    textAlign: "center", 
    fontSize: titleSize, 
    fontWeight: isJa ? "bold": "normal",
    lineHeight: 1.2,
  }
  const iconStyle: CSSProperties = {
    margin: "30px auto"
  }
  const imageStyle: CSSProperties = {
    width: "100%", 
    maxWidth: 500, 
    margin: isPC(width) ? 0: "30px auto 0 auto"
  }
  const messageStyle: CSSProperties = {
    textAlign: "center", 
    margin: 5
  }
  const overDownloadStyle: CSSProperties = {
    listStyle: "none", 
    fontSize: 28,
    margin: isSP(width) ? "10px 10px 40px 10px": "10px 0 15px 0", 
    columnGap: 20,
  }
  const overStyle: CSSProperties = {
    marginBottom: -10
  }
  const numberStyle: CSSProperties = {
    fontSize: 50
  }
  const downloadStyle: CSSProperties = {
    marginBottom: -10, 
    fontWeight: isJa ? "bold": "normal"
  }

  return <div className="container" style={elevatorTopStyle}>
    <div className={isPC(width) ? "flex_center": "block_center"}>
      <div style={topStyle}>
        <h1 className={titleFont} style={titleStyle}>{title}</h1>
        <Image src={icon} alt={"icon"} width={100} height={100} style={iconStyle}/>
        {messages.map((message, i) => <div className="flex_center_wrap" key={`message_${i}`}>
          {message.map((_, j) => <p key={`message_${i}_${j}`} style={messageStyle}>{message[j]}</p>)}
        </div>)}
        <div className={headerFont}>
          <div className="flex_center_wrap" style={overDownloadStyle}>
            {!isJa && (<li style={overStyle}>Over</li>)}
            <li style={numberStyle}>{dlNumber}</li>
            <li style={downloadStyle}>{download}</li>
          </div>
        </div>
        <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
      </div>
      <Image src={picture} alt={"pictures"} width={1080} height={1080} style={imageStyle}/>
    </div>
  </div>
}

export default MyAppsOverDLTop
