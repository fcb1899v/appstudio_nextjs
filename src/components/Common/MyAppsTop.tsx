import { NextPage } from "next";
import '@/app/globals.css';
import Image from "next/image"
import MyAppsBadges from "./MyAppsBadges";
import { isPC, myApp, isSP } from "@/utils/constants";
import { CSSProperties } from "react";

/**
 * Interface for top section component props
 * Defines the properties required for rendering the app top section
 */
interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

/**
 * Top section component for app pages
 * Shows the main visual, app title, and download buttons
 * Displays app icon, title, description, and download badges
 */

// Top section component for app pages
const MyAppsTop: NextPage<Props> = ({appNumber, width, isJa}) => { 

  // Get app data and configuration
  const appData = myApp(width, isJa)[appNumber];
  const isTitleImage = appData.text.title && appData.text.title.startsWith('/images/');
  const hasImageBackground = appData.image.background && appData.image.background.startsWith('/images/');

  // Container style with dynamic background configuration
  const containerStyle: CSSProperties = {
    backgroundColor: appData.color.background,
    paddingTop: '70px',
    ...(hasImageBackground && {
      backgroundImage: `url('${appData.image.background}')`,
      backgroundSize: 'auto 100%',
      backgroundPosition: 'center bottom',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'scroll',
    })
  };

  return (
    <div style={containerStyle}>
      {/* Main content container */}
      <div className={isPC(width) ? "flex_center": "block_center"}>
        {/* Left content area with title and description */}
        <div style={{
          width: "95%", 
          maxWidth: isPC(width) ? "40%" : "95%",
          margin: isPC(width) ? "0 0 0 auto" : "0 auto"
        }}>
          {/* App title - image or text */}
          {isTitleImage ? (
            <Image 
              src={appData.text.title} 
              alt="title" 
              width={isSP(width) ? 300 : 400} 
              height={isSP(width) ? 75 : 100} 
              style={{
                textAlign: "center", 
                margin: "0 auto",
                maxWidth: isSP(width) ? "90%" : "400px",
                width: "100%",
                height: "auto"
              }} 
              priority={true}
            />
          ): (
            <h1 className={appData.font.title} 
              style={{
                textAlign: "center", 
                color: appData.color.title,
                fontSize: appData.size.title, 
                fontWeight: isJa ? "bold": "normal",
                lineHeight: 1.2,
              }}
            >
              {appData.text.title}
            </h1>
          )}
          
          {/* App icon with shadow effects */}
          <Image 
            src={appData.icon} 
            alt="icon" 
            width={100} 
            height={100} 
            priority={true}
            style={{
              margin: "30px auto 25px auto", 
              borderRadius: 22.5, 
              filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))",
              boxShadow: "0px 0px 20px 1px rgba(255, 255, 255, 0.5)"
            }}
          />
          
          {/* App description messages */}
          {appData.text.message.map((message, i) => (
            <div className="flex_center_wrap" key={`message_${i}`}>
              {message.map((_, j) => (
                <p className={appData.font.message} 
                  key={`message_${i}_${j}`} 
                  style={{
                    color: appData.color.title,
                    fontSize: appData.size.message,
                    textAlign: "center", 
                    margin: 5, 
                  }}
                >
                  {message[j]}
                </p>
              ))}
            </div>
          ))}
          
          {/* Download number display */}
          {appData.text.dlnumber && (
            <div className={appData.font.header}>
              <div className="flex_center_wrap" style={{
                color: appData.color.title,
                listStyle: "none", 
                fontSize: isSP(width) ? 24 : 28,
                margin: isSP(width) ? "10px 10px 10px 10px": "10px 0 10px 0", 
                columnGap: isSP(width) ? 15 : 20,
              }}>
                {!isJa && <li style={{ marginBottom: isSP(width) ? -8 : -10 }}>Over</li>}
                <li style={{ fontSize: isSP(width) ? 40 : 50 }}>{appData.text.dlnumber}</li>
                <li style={{ 
                  marginBottom: isSP(width) ? -8 : -10, 
                  fontWeight: isJa ? "bold": "normal"
                }}>
                  {isJa ? "ダウンロード突破！": "Downloads"}
                </li>
              </div>
            </div>
          )}
          
          {/* Download badges */}
          <div style={{ marginTop: !appData.text.dlnumber ? 20 : 0 }}>
            <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
          </div>
        </div>
        
        {/* App screenshot image */}
        <Image 
          src={appData.image.picture!} 
          alt="pictures" 
          width={1080} 
          height={1080} 
          priority={true}
          style={{
            width: "95%", 
            maxWidth: isPC(width) ? "40%" : "95%",
            maxHeight: "600px",
            height: "auto",
            objectFit: "contain",
            margin: isPC(width) ? "10px auto 20px 0" : "20px auto"
          }}
        />
      </div>
    </div>
  );
};

export default MyAppsTop;
