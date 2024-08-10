import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { myApp } from '../../public/utils/constants'

interface Props {
  width: number
  isJa: boolean
}

const CrossingFeatures: NextPage<Props> = ({width, isJa}) => {

  const appNumber = 9
  const title = isJa ? "＜特徴＞": "Features";
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const messages = myApp(width, isJa)[appNumber].text.features!;
  const messageFont = myApp(width, isJa)[appNumber].font.message;
  const images = myApp(width, isJa)[appNumber].image.features!;

  const explainStyle : CSSProperties = {
    color: myApp(width, isJa)[appNumber].color.title,
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
  const imageStyle = (i: number): CSSProperties => {
    return {
      width: "100%", 
      maxWidth: (i == 0) ? 600: 1000,
      height: "auto", 
      margin: "20px auto 0px auto",
      padding: "0px 30px",

    };
  };

  return <div className="container" style={explainStyle}>
    <h2 className={titleFont} style={titleStyle}>{title}</h2>
    <div className="flex_center_wrap" style={messagesStyle}>
      {messages.map((message, j) => 
        <div className="flex_center_wrap" key={`message_${j}`} style={messageStyle}>
          {message.map((_, k) => <p key={`message_${j}_${k}`} className={messageFont}>{message[k]} </p>)}
        </div>
      )}
    </div>
    {images.map((image, i) => <div key={`image_${i}`}>
      <Image src={image} alt={`features_${appNumber}`} width={1920} height={1080} priority={true} style={imageStyle(i)}/>
    </div>)}
  </div>
}

export default CrossingFeatures