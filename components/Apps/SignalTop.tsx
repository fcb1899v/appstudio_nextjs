import { NextPage } from "next";
import '../../src/app/globals.css';
import Image from "next/image"
import MyAppsBadges from "../Common/MyAppsBadges";
import OverDownloads from "../Common/OverDownloads";
import { isPC, myApp } from "../../public/utils/constants";
import { CSSProperties } from "react";

interface Props {
  width: number
  isJa: boolean
}
  
const SignalTop: NextPage<Props> = ({width, isJa}) => { 
    
  const appNumber = 3;
  const title = myApp(width, isJa)[appNumber].text.title;
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const titleColor = myApp(width, isJa)[appNumber].color.title;
  const icon = myApp(width, isJa)[appNumber].icon;
  const picture = myApp(width, isJa)[appNumber].image.picture!;
  const messages = myApp(width, isJa)[appNumber].text.message;

  const signalTop: CSSProperties = {
    color: titleColor
  }
  const topStyle: CSSProperties = {
    width: isPC(width) ? 540: "100%", 
    padding: "10px 10px 0px 10px"
  }
  const titleStyle: CSSProperties = {
    textAlign: "center", 
    fontSize: isJa ? 32: 48, 
    fontWeight: isJa ? "bold": "normal",
  }
  const iconStyle: CSSProperties = {
    margin: "25px auto",
  }
  const imageStyle: CSSProperties = {
    width: "100%", 
    maxWidth: 500, 
    margin: isPC(width) ? 0: "30px auto 0 auto"
  }

  return <div className="container" style={signalTop}>
    <div className={isPC(width) ? "flex_center": "block_center"} >
      <div style={topStyle}>
        <h1 className={titleFont} style={titleStyle}>{title}</h1>
        <Image src={icon} alt={"icon"} width={100} height={100} style={iconStyle}/>
        {messages.map((message, i) => <div className="flex_center_wrap" key={`message_${i}`}>
          {message.map((_, j) => <p key={`message_${i}_${j}`} style={{margin: 5}}>{message[j]}</p>)}
        </div>)}
        <OverDownloads width={width} dlNumber={"10,000"} fontFamily={"beon"} isJa={isJa} size={26}/>
        <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
      </div>
      <Image src={picture} alt={"pictures"} width={1080} height={1080} style={imageStyle}/>
    </div>
  </div>
}

export default SignalTop
