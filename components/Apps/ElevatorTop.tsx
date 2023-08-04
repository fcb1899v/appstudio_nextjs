import { NextPage } from "next";
import '../../src/app/globals.css';
import Image from "next/image"
import MyAppsBadges from "../Common/MyAppsBadges";
import OverDownloads from "../Common/OverDownloads";
import { myApp } from "../../public/utils/constants";
import { CSSProperties } from "react";

interface Props {
  width: number
  isJa: boolean
}
  
const ElevatorTop: NextPage<Props> = ({width, isJa}) => { 
    
  const appNumber = 1
  const isPC = width > 1024
  const title = myApp(width, isJa)[appNumber].text.title
  const icon = myApp(width, isJa)[appNumber].icon
  const picture = myApp(width, isJa)[appNumber].image.picture!
  const message = myApp(width, isJa)[appNumber].text.message

  const elevatorTopStyle: CSSProperties = {
    color: myApp(width, isJa)[appNumber].color.title
  }
  const topStyle: CSSProperties = {
    width: isPC ? 540: "100%", 
    padding: "20px 10px 0px 10px"
  }
  const titleStyle: CSSProperties = {
    textAlign: "center", 
    fontSize: myApp(width, isJa)[appNumber].size.title, 
    fontWeight: isJa ? "bold": "normal",
    lineHeight: 1.2,
  }
  const iconStyle: CSSProperties = {
    margin: "30px auto"
  }
  const imageStyle: CSSProperties = {
    width: "100%", 
    maxWidth: 500, 
    margin: isPC ? 0: "30px auto 0 auto"
  }

  return (<div className="container" style={elevatorTopStyle}>
    <div className={isPC ? "flex_center": "block_center"}>
      <div style={topStyle}>
        <h1 className={myApp(width, isJa)[appNumber].font.title} style={titleStyle}>{title}</h1>
        <Image src={icon} alt={"icon"} width={100} height={100} style={iconStyle}/>
        {message!.map((_, i) => (<div className="flex_center_wrap" key={`message_${i}`}>
          {message![i].map((_, j) => (<p key={`message_${i}_${j}`} style={{textAlign: "center", margin: 5}}>
            {message![i][j]}
          </p>))}
        </div>))}
        <OverDownloads width={width} dlNumber={"50,000"} fontFamily={myApp(width, isJa)[appNumber].font.header!} isJa={isJa} size={28}/>
        <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
      </div>
      <Image src={picture} alt={"pictures"} width={1080} height={1080} style={imageStyle}/>
    </div>
  </div>);
};

export default ElevatorTop
