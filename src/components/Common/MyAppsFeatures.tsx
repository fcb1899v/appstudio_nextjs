import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { myApp, myAppNumber, isSP } from '@/utils/constants'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const MyAppsFeatures: NextPage<Props> = ({ appNumber, width, isJa }) => {

  const isChild = (appNumber == myAppNumber.phonics || appNumber == myAppNumber.japanese)
  const isFullWidth = (appNumber == myAppNumber.elevatorNeo || appNumber == myAppNumber.signal || appNumber == myAppNumber.crossing)
  const title = (isJa && isChild) ? "＜とくちょう＞": isJa ? "＜特徴＞": "FEATURES";
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const messages = myApp(width, isJa)[appNumber].text.features!;
  const messageFont = myApp(width, isJa)[appNumber].font.message;
  const images = myApp(width, isJa)[appNumber].image.features!;

  // featuresが空または無効な場合は非表示
  if (!messages || messages.length === 0 || (messages.length === 1 && messages[0].length === 1 && messages[0][0] === "")) {
    return <div style={{ height: isSP(width) ? "30px" : "40px" }}></div>;
  }

  // features画像が空または無効な場合も非表示
  if (!images || images.length === 0 || (images.length === 1 && images[0] === "")) {
    return <div style={{ height: isSP(width) ? "30px" : "40px" }}></div>;
  }

  const explainStyle : CSSProperties = {
    color: myApp(width, isJa)[appNumber].color.title,
    background: myApp(width, isJa)[appNumber].color.features, 
    padding: isSP(width) ? "20px 0 15px 0" : "25px 0 20px 0",
    width: "100%",
    maxWidth: isFullWidth ? "100vw" : undefined
  }
  const titleStyle: CSSProperties = {    
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    fontWeight: isJa ? "bold": "normal", 
    textAlign: "center", 
    paddingBottom: isSP(width) ? 3 : 5
  }
  const messagesStyle: CSSProperties = {
    maxWidth: isSP(width) ? "95%" : 1000,
    margin: isSP(width) ? "8px auto" : "10px auto"
  }
  const messageStyle: CSSProperties = {
    fontSize: isSP(width) ? 
      Math.min(myApp(width, isJa)[appNumber].size.message || 18, 16) : 
      myApp(width, isJa)[appNumber].size.message,
    gap: isSP(width) ? 6 : 8,
    margin: isSP(width) ? "8px 15px" : "10px 20px", 
  }
  const imageStyle: CSSProperties = {
    width: "100%", 
    maxWidth: isSP(width) ? "95%" : 800, 
    maxHeight: isSP(width) ? "400px" : "600px",
    height: "auto",
    objectFit: "contain" as const, 
    margin: "0px auto",
  }

  return <div className={isFullWidth ? "" : "container"} style={explainStyle}>
    <h2 className={titleFont} style={titleStyle}>{title}</h2>
    {images.map((image, i) => <div key={`image_${i}`}>
      <div className="flex_center_wrap" style={messagesStyle}>
        {messages[i].map((message, j) => 
          <div className="flex_center_wrap" key={`message_${j}`} style={messageStyle}>
            <p className={messageFont}>{message} </p>
          </div>
        )}
      </div>
      <Image src={image} alt={`features_${appNumber}`} width={1920} height={1080} priority={true} style={imageStyle}/>
    </div>)}
  </div>
}

export default MyAppsFeatures

