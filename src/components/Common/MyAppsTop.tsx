import { NextPage } from "next";
import '@/app/globals.css';
import Image from "next/image"
import MyAppsBadges from "./MyAppsBadges";
import { isPC, myApp, isSP } from "@/utils/constants";
import { CSSProperties } from "react";

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}
  
const MyAppsTop: NextPage<Props> = ({appNumber, width, isJa}) => { 

  const appData = myApp(width, isJa)[appNumber];
  const isTitleImage = appData.text.title && appData.text.title.startsWith('/images/');
  const hasImageBackground = appData.image.background && appData.image.background.startsWith('/images/');

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
      <div className={isPC(width) ? "flex_center": "block_center"}>
        <div style={{
          width: "95%", 
          maxWidth: isPC(width) ? "40%" : "95%",
          margin: isPC(width) ? "0 0 0 auto" : "0 auto"
        }}>
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
          ) : (
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
          
          <Image 
            src={appData.icon} 
            alt="icon" 
            width={100} 
            height={100} 
            style={{
              margin: "30px auto 25px auto", 
              borderRadius: 22.5, 
              filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))",
              boxShadow: "0px 0px 20px 1px rgba(255, 255, 255, 0.5)"
            }}
          />
          
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
          
          {appData.text.dlnumber && (
            <div className={appData.font.header}>
              <div className="flex_center_wrap" style={{
                color: appData.color.title,
                listStyle: "none", 
                fontSize: isSP(width) ? 24 : 28,
                margin: isSP(width) ? "20px 10px 30px 10px": "20px 0 30px 0", 
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
          <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
        </div>
        
        <Image 
          src={appData.image.picture!} 
          alt="pictures" 
          width={1080} 
          height={1080} 
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
