import { NextPage } from "next";
import '@/app/globals.css';
import Image from "next/image"
import MyAppsBadges from "./MyAppsBadges";
import { isPC, myApp } from "@/utils/constants";
import { CSSProperties } from "react";

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}
  
const ToiletTop: NextPage<Props> = ({appNumber, width, isJa}) => { 
    
  const title = myApp(width, isJa)[appNumber].text.title
  const icon = myApp(width, isJa)[appNumber].icon
  const messages = myApp(width, isJa)[appNumber].text.message
  const picture = myApp(width, isJa)[appNumber].image.picture!

  const containerStyle: CSSProperties = {
    color: myApp(width, isJa)[appNumber].color.title,
    backgroundColor: myApp(width, isJa)[appNumber].color.background
  }

  const topStyle: CSSProperties = {
    width: isPC(width) ? 540: "100%", 
    padding: "0px 10px"
  }
  const iconStyle: CSSProperties = {
    margin: "10px auto", 
    borderRadius: 22.5, 
    boxShadow: "0px 0px 20px 1px rgba(255, 255, 255, 0.5)"
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

  return <div className="container" style={containerStyle}>
    <div className={isPC(width) ? "flex_center": "block_center"}>
      <div style={topStyle}>
        <Image src={title} alt={"icon"} width={400} height={200} style={{margin: "0 auto 30px auto"}}/>
        <Image src={icon} alt={"icon"} width={100} height={100} style={iconStyle}/>
        {messages.map((message, i) => <div className="flex_center_wrap" key={`message_${i}`}>
          {message.map((_, j) => <p key={`message_${i}_${j}`} style={messageStyle}>{message[j]}</p>)}
        </div>)}
        <div style={{marginTop: 30}}>
          <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
        </div>
      </div>
      <Image src={picture} alt={"pictures"} width={1080} height={1080} style={imageStyle}/>
    </div>
  </div>
}

export default ToiletTop
