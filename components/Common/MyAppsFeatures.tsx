import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { myApp } from '../../public/utils/constants'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const MyAppsFeatures: NextPage<Props> = ({ appNumber, width, isJa, }) => {

  const isChild = (appNumber == 6 || appNumber ==7)
  const title = (isJa && isChild) ? "＜とくちょう＞": isJa ? "＜特徴＞": "FEATURES";
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const messages = myApp(width, isJa)[appNumber].text.features!;
  const messageFont = myApp(width, isJa)[appNumber].font.message;
  const images = myApp(width, isJa)[appNumber].image.features!;

  const explainStyle : CSSProperties = {
    color: "white",
    background: myApp(width, isJa)[appNumber].color.features, 
    padding: "25px 0 20px 0"
  }
  const titleStyle: CSSProperties = {    
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    fontWeight: isJa ? "bold": "normal", 
    textAlign: "center", 
    paddingBottom: 5
  }
  const messagesStyle: CSSProperties = {
    maxWidth: 1000,
    margin: "10px auto"
  }
  const messageStyle: CSSProperties = {
    fontSize: myApp(width, isJa)[appNumber].size.message,
    gap: 8,
    margin: "10px 20px", 
  }
  const imageStyle: CSSProperties = {
    width: "100%", 
    maxWidth: 800, 
    height: "auto", 
    margin: "0px auto",
  }

  return <div className="container" style={explainStyle}>
    <h2 className={titleFont} style={titleStyle}>{title}</h2>
    {images.map((image, i) => <div key={`image_${i}`}>
      <div className="flex_center_wrap" style={messagesStyle}>
        {messages.map((message, j) => 
          <div className="flex_center_wrap" key={`message_${j}`} style={messageStyle}>
            {message.map((_, k) => <p key={`message_${j}_${k}`} className={messageFont}>{message[k]} </p>)}
          </div>
        )}
      </div>
      <Image src={image} alt={`features_${appNumber}`} width={1920} height={1080} priority={true} style={imageStyle}/>
    </div>)}
  </div>
}

export default MyAppsFeatures

