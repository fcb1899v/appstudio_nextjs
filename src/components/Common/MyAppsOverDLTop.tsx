import { NextPage } from "next";
import '@/app/globals.css';
import Image from "next/image"
import MyAppsBadges from "./MyAppsBadges";
import { isPC, myApp } from "@/utils/constants";
import { CSSProperties } from "react";
import { isSP } from "@/utils/constants";


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
  const dlNumber = myApp(width, isJa)[appNumber].text.dlnumber;
  const icon = myApp(width, isJa)[appNumber].icon;
  const picture = myApp(width, isJa)[appNumber].image.picture!;
  const messages = myApp(width, isJa)[appNumber].text.message;
  const headerFont = myApp(width, isJa)[appNumber].font.header!;
  const download = isJa ? "ダウンロード突破！": "Downloads";

  // titleが画像パスかどうかを判定
  const isTitleImage = title && title.startsWith('/images/');

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
  const titleImageStyle: CSSProperties = {
    textAlign: "center", 
    margin: "0 auto",
    maxWidth: isSP(width) ? "90%" : "400px",
    width: "100%",
    height: "auto"
  }
  const iconStyle: CSSProperties = {
    margin: "30px auto"
  }
  const imageStyle: CSSProperties = {
    width: "100%", 
    maxWidth: isPC(width) ? 500 : "90%", 
    margin: isPC(width) ? 0: "30px auto 0 auto"
  }
  const messageStyle: CSSProperties = {
    textAlign: "center", 
    margin: 5,
    fontSize: isSP(width) ? "16px" : "18px"
  }
  const overDownloadStyle: CSSProperties = {
    listStyle: "none", 
    fontSize: isSP(width) ? 24 : 28,
    margin: isSP(width) ? "10px 10px 40px 10px": "10px 0 15px 0", 
    columnGap: isSP(width) ? 15 : 20,
  }
  const overStyle: CSSProperties = {
    marginBottom: isSP(width) ? -8 : -10
  }
  const numberStyle: CSSProperties = {
    fontSize: isSP(width) ? 40 : 50
  }
  const downloadStyle: CSSProperties = {
    marginBottom: isSP(width) ? -8 : -10, 
    fontWeight: isJa ? "bold": "normal"
  }
  const badgesContainerStyle: CSSProperties = {
    marginTop: dlNumber ? 0 : isSP(width) ? "30px" : "40px"
  }

  return <div className="container" style={elevatorTopStyle}>
    <div className={isPC(width) ? "flex_center": "block_center"}>
      <div style={topStyle}>
        {isTitleImage ? (
          <Image 
            src={title} 
            alt="title" 
            width={isSP(width) ? 300 : 400} 
            height={isSP(width) ? 75 : 100} 
            style={titleImageStyle} 
            priority={true}
          />
        ) : (
          <h1 className={titleFont} style={titleStyle}>{title}</h1>
        )}
        <Image src={icon} alt={"icon"} width={100} height={100} style={iconStyle}/>
        {messages.map((message, i) => <div className="flex_center_wrap" key={`message_${i}`}>
          {message.map((_, j) => <p key={`message_${i}_${j}`} style={messageStyle}>{message[j]}</p>)}
        </div>)}
        {dlNumber && (
          <div className={headerFont}>
            <div className="flex_center_wrap" style={overDownloadStyle}>
              {!isJa && (<li style={overStyle}>Over</li>)}
              <li style={numberStyle}>{dlNumber}</li>
              <li style={downloadStyle}>{download}</li>
            </div>
          </div>
        )}
        <div style={badgesContainerStyle}>
          <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
        </div>
      </div>
      <Image src={picture} alt={"pictures"} width={1080} height={1080} style={imageStyle}/>
    </div>
  </div>
}

export default MyAppsOverDLTop
