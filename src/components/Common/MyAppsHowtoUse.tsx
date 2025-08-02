import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { myApp, isSP } from '@/utils/constants'

/**
 * Interface for how to use component props
 * Defines the properties required for rendering how to use section
 */
interface Props {
  appNumber: number
  width: number
  isJa: boolean
  maxWidth: number
}

/**
 * Component for displaying how to use instructions
 * Shows usage guide with image for each app
 * Provides responsive layout and localized content
 */

// How to use component for app instructions
const MyAppsHowtoUse: NextPage<Props> = ({appNumber, width, isJa, maxWidth}) => {

  // Get localized title and app configuration
  const title = isJa ? "＜使い方＞": "HOW TO USE";
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const image = myApp(width, isJa)[appNumber].image.howtouse;

  // Hide component if how to use image is not available
  if (!image || image === "" || image === "/") {
    return <div style={{ height: isSP(width) ? "30px" : "40px" }}></div>;
  }

  // Container style with dynamic colors and responsive padding
  const howtouseStyle = {
    color: myApp(width, isJa)[appNumber].color.title,
    backgroundColor: myApp(width, isJa)[appNumber].color.howtouse,
    padding: isSP(width) ? "15px 0" : "20px 0",
    width: "100%",
  }
  
  // Title style with responsive font size and centered alignment
  const titleStyle: CSSProperties = { 
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    fontWeight: isJa ? "bold": "normal", 
    textAlign: "center", 
    margin: "20px 0",
  };
  
  // Image style with responsive sizing and contain object fit
  const imageStyle: CSSProperties = {
    maxWidth: isSP(width) ? "95%" : maxWidth, 
    width: "100%",
    maxHeight: isSP(width) ? "400px" : "600px",
    objectFit: "contain" as const,
    margin: "0 auto",
    padding: isSP(width) ? "5px 0" : "10px 0",
  }

  return (
    <div style={howtouseStyle}>
      {/* How to use title */}
      <h2 className={titleFont} style={titleStyle}>{title}</h2>
      
      {/* How to use instruction image */}
      <Image src={image} alt={`howtouse`} width={1920} height={1080} priority={true} className="image" style={imageStyle}/>
    </div>
  )
}

export default MyAppsHowtoUse
