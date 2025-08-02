import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { myApp, myAppNumber, isSP } from '@/utils/constants'

/**
 * Interface for app features component props
 * Defines the properties required for rendering app features
 */
interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

/**
 * Component for displaying app features
 * Shows a list of features with icons and descriptions
 * Provides responsive layout and localized content
 */

// App features component for showcasing app capabilities
const MyAppsFeatures: NextPage<Props> = ({ appNumber, width, isJa }) => {

  // Check app type for layout configuration
  const isChild = (appNumber == myAppNumber.phonics || appNumber == myAppNumber.japanese)
  const isFullWidth = (appNumber == myAppNumber.elevatorNeo || appNumber == myAppNumber.signal || appNumber == myAppNumber.crossing)
  
  // Get localized title and app data
  const title = (isJa && isChild) ? "＜とくちょう＞": isJa ? "＜特徴＞": "FEATURES";
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const messages = myApp(width, isJa)[appNumber].text.features!;
  const messageFont = myApp(width, isJa)[appNumber].font.message;
  const images = myApp(width, isJa)[appNumber].image.features!;

  // Hide component if features messages are not available
  if (!messages || messages.length === 0 || (messages.length === 1 && messages[0].length === 1 && messages[0][0] === "")) {
    return <div style={{ height: isSP(width) ? "30px" : "40px" }}></div>;
  }

  // Hide component if features images are not available
  if (!images || images.length === 0 || (images.length === 1 && images[0] === "")) {
    return <div style={{ height: isSP(width) ? "30px" : "40px" }}></div>;
  }

  // Container style with dynamic colors and responsive padding
  const explainStyle : CSSProperties = {
    color: myApp(width, isJa)[appNumber].color.title,
    background: myApp(width, isJa)[appNumber].color.features, 
    padding: isSP(width) ? "10px 0 10px 0" : "15px 0 15px 0",
    width: "100%",
    maxWidth: isFullWidth ? "100vw" : undefined
  }
  
  // Title style with responsive font size and centered alignment
  const titleStyle: CSSProperties = {    
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    fontWeight: isJa ? "bold": "normal", 
    textAlign: "center", 
    margin: "20px 0",
  }
  
  // Messages container style with responsive max width
  const messagesStyle: CSSProperties = {
    maxWidth: isSP(width) ? "95%" : 1000,
    margin: isSP(width) ? "8px auto" : "10px auto"
  }
  
  // Individual message style with responsive font size
  const messageStyle: CSSProperties = {
    fontSize: isSP(width) ? 
      Math.min(myApp(width, isJa)[appNumber].size.message || 18, 16) : 
      myApp(width, isJa)[appNumber].size.message,
    gap: isSP(width) ? 6 : 8,
    margin: isSP(width) ? "0px 15px 5px 15px" : "0px 20px 5px 15px", 
    lineHeight: 0.0,
  }
  
  // Image style with responsive sizing and contain object fit
  const imageStyle: CSSProperties = {
    width: "95%", 
    maxWidth: 800, 
    maxHeight: isSP(width) ? "400px" : "600px",
    height: "auto",
    objectFit: "contain" as const, 
    margin: "0px auto",
  }

  return (
    <div className={isFullWidth ? "" : "container"} style={explainStyle}>
      {/* Features section title */}
      <h2 className={titleFont} style={titleStyle}>{title}</h2>
      
      {/* Features content with images and descriptions */}
      {images.map((image, i) => (
        <div key={`image_${i}`}>
          {/* Feature descriptions */}
          <div className="flex_center_wrap" style={messagesStyle}>
            {messages[i].map((message, j) => (
              <div className="flex_center_wrap" key={`message_${j}`} style={messageStyle}>
                <p className={messageFont}>{message} </p>
              </div>
            ))}
          </div>
          
          {/* Feature image */}
          <Image src={image} alt={`features_${appNumber}`} width={1920} height={1080} priority={true} style={imageStyle}/>
        </div>
      ))}
    </div>
  )
}

export default MyAppsFeatures

