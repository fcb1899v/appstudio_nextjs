import { NextPage } from "next";
import '@/app/globals.css';
import OptimizedImage from "./OptimizedImage";
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

/** Top section for app pages: main visual, title, icon, description, download badges */
const MyAppsTop: NextPage<Props> = ({ appNumber, width, isJa }) => { 

  // Get app data and configuration
  const appData = myApp(width, isJa)[appNumber];
  const isTitleImage = appData.text.title && appData.text.title.startsWith('/images/');
  const hasImageBackground = appData.image.background && appData.image.background.startsWith('/images/');

  // Container style with dynamic background configuration
  // When using image background, set width 100% so .main align-items:center does not shrink it
  const containerStyle: CSSProperties = {
    backgroundColor: appData.color.background,
    paddingTop: '70px',
    ...(hasImageBackground && {
      width: '100%',
      boxSizing: 'border-box',
      backgroundImage: `url('${appData.image.background}')`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
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
          width: isPC(width) ? "50%" : "95%", 
          maxWidth: isPC(width) ? "50%" : "95%",
          margin: "0 auto"
        }}>
          {/* App title - image or text */}
          {isTitleImage ? (
            <OptimizedImage
              src={appData.text.title}
              alt="App title"
              width={isSP(width) ? 300 : 400}
              height={isSP(width) ? 75 : 100}
              style={{
                textAlign: "center",
                margin: "0 auto",
                maxWidth: isSP(width) ? "90%" : "400px",
                width: "100%",
                height: "auto"
              }}
              fetchPriority="high"
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
          <OptimizedImage
            src={appData.icon}
            alt="App icon"
            width={100}
            height={100}
            fetchPriority="high"
            style={{
              margin: "30px auto 25px auto",
              borderRadius: 22.5,
              filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))",
              boxShadow: "0px 0px 20px 1px rgba(255, 255, 255, 0.5)"
            }}
          />
          
          {/* App description messages: [[a,b],[c,d]] → on PC 2 rows with a,b and c,d side by side; segments share row and wrap text inside */}
          {appData.text.message.map((lines, i) => (
            <div
              className="flex_center_wrap"
              key={`message_${i}`}
              style={{
                rowGap: 4,
                columnGap: 6,
                flexWrap: isPC(width) ? "nowrap" : "wrap",
              }}
            >
              {lines.map((line, j) => (
                <p
                  className={appData.font.message}
                  key={`message_${i}_${j}`}
                  style={{
                    color: appData.color.title,
                    fontSize: appData.size.message,
                    textAlign: "center",
                    margin: "5px 0",
                    minWidth: 0,
                    flex: isPC(width) ? "0 0 auto" : undefined,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
          
          {/* Download number display */}
          {appData.text.dlnumber && (
            <div className={appData.font.header}>
              <ul className="flex_center_wrap" style={{
                color: appData.color.title,
                listStyle: "none",
                margin: isSP(width) ? "10px 10px 10px 10px" : "10px 0 10px 0",
                padding: 0,
                fontSize: isSP(width) ? 24 : 28,
                columnGap: isSP(width) ? 15 : 20,
              }}>
                {!isJa && <li style={{ marginBottom: isSP(width) ? -8 : -10 }}>Over</li>}
                <li style={{ fontSize: isSP(width) ? 40 : 50 }}>{appData.text.dlnumber}</li>
                <li style={{
                  marginBottom: isSP(width) ? -8 : -10,
                  fontWeight: isJa ? "bold" : "normal",
                }}>
                  {isJa ? "ダウンロード突破！" : "Downloads"}
                </li>
              </ul>
            </div>
          )}
          
          {/* Download badges */}
          <div style={{ marginTop: !appData.text.dlnumber ? 20 : 0 }}>
            <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
          </div>
        </div>
        
        <div style={{
          width: isPC(width) ? "50%" : "95%", 
          maxWidth: isPC(width) ? "50%" : "95%",
          margin: "0 auto"
          }}>
            {/* App screenshot image (WebP when available; larger on PC) */}
            {appData.image.picture && (
            <OptimizedImage
              src={appData.image.picture}
              alt="App screenshot"
              width={isPC(width) ? 1080 : 600}
              height={800}
              fetchPriority="high"
              style={{
                width: "95%",
                maxWidth: "95%",
                maxHeight: "640px",
                height: "auto",
                objectFit: "contain",
                margin: isPC(width) ? "10px auto 20px 0" : "20px auto"
              }}
            />
            )}
        </div>
      </div>
    </div>
  );
};

export default MyAppsTop;
