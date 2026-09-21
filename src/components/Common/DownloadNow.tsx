import { NextPage } from 'next'
import {CSSProperties} from "react"
import '@/app/globals.css';
import MyAppsBadges from "./MyAppsBadges";
import { myApp } from "@/utils/constants";

/** Props for DownloadNow. */
interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

/** Download section with localized app store badges. */

// Download now component for app store links
const DownloadNow: NextPage<Props> = ({appNumber, width, isJa}) => { 
    
  // Get localized download button text and font
  const downloadNow = isJa ? "今すぐダウンロード": "DOWNLOAD NOW";
  const titleFont = myApp(width, isJa)[appNumber].font.title;

  // Container style with dark background and full width layout
  const downloadNowStyle: CSSProperties = {
    width: "100vw",
    color: "white",
    backgroundColor: "rgba(0, 0, 0 , 0.5)", 
    paddingTop: 15,
  }
  
  // Title style with responsive font size and centered alignment
  const titleStyle: CSSProperties = {
    fontSize: myApp(width, isJa)[appNumber].size.subTitle,
    fontWeight: isJa ? "bold": "normal", 
    textAlign: "center", 
    margin: "20px 0 10px 0",
  }

  return (
    <div style={downloadNowStyle}>
      {/* Download now title */}
      <h2 className={titleFont} style={titleStyle}>{downloadNow}</h2>  
      
      {/* App store download badges */}
      <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
    </div>
  )
}

export default DownloadNow
