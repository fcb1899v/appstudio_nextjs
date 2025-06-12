import { NextPage } from "next";
import '@/app/globals.css';
import Image from "next/image"
import { isPC, myApp } from "@/utils/constants";
import { CSSProperties } from "react";

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}
  
const MyAppsTop: NextPage<Props> = ({appNumber, width, isJa}) => { 
    
  const title = myApp(width, isJa)[appNumber].text.title;
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const icon = myApp(width, isJa)[appNumber].icon;
  const messages = myApp(width, isJa)[appNumber].text.message;
  const messageFont = myApp(width, isJa)[appNumber].font.message;
  const picture = myApp(width, isJa)[appNumber].image.picture!;

  const topStyle: CSSProperties = {
    width: isPC(width) ? 540: "100%", 
    padding: isPC(width) ? "0px 10px": "25px 10px 0px 10px",
  }
  const titleStyle: CSSProperties = {
    textAlign: "center", 
    color: myApp(width, isJa)[appNumber].color.title,
    fontSize: myApp(width, isJa)[appNumber].size.title, 
    fontWeight: isJa ? "bold": "normal",
    lineHeight: 1.2,
  }
  const messageStyle: CSSProperties = {
    color: myApp(width, isJa)[appNumber].color.message,
    fontSize: myApp(width, isJa)[appNumber].size.message,
    textAlign: "center", 
    margin: 5, 
  }
  const iconStyle: CSSProperties = {
    margin: "30px auto 25px auto", 
    borderRadius: 22.5, 
    boxShadow: "0px 0px 20px 1px rgba(255, 255, 255, 0.5)"
  }
  const imageStyle: CSSProperties = {
    width: "100%", 
    maxWidth: 500, 
    margin: isPC(width) ? 0: "30px auto 0 auto"
  }

  return <div className="container">
    <div className={isPC(width) ? "flex_center": "block_center"}>
      <div style={topStyle}>
        <h1 className={titleFont} style={titleStyle}>{title}</h1>
        <Image src={icon} alt={"icon"} width={100} height={100} style={iconStyle}/>
        {messages.map((message, i) => <div className="flex_center_wrap" key={`message_${i}`}>
          {message.map((_, j) => 
            <p className={messageFont} key={`message_${i}_${j}`} style={messageStyle}>{message[j]}</p>
          )}
        </div>)}
      </div>
      <Image src={picture} alt={"pictures"} width={1080} height={1080} style={imageStyle}/>
    </div>
  </div>
}

export default MyAppsTop
