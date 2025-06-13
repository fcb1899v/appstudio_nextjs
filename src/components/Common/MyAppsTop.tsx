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
    ...(hasImageBackground && {
      backgroundImage: `url('${appData.image.background}')`,
      backgroundSize: 'auto 100%',
      backgroundPosition: 'center bottom',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'scroll',
      paddingBottom: '40px'
    })
  };

  return (
    <div className="container" style={containerStyle}>
      <div className={isPC(width) ? "flex_center": "block_center"}>
        <div style={{
          width: isPC(width) ? 540: "100%", 
          padding: isPC(width) ? "0px 10px": "25px 10px 0px 10px",
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
                marginTop: 30,
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
                margin: isSP(width) ? "10px 10px 40px 10px": "10px 0 15px 0", 
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
          
          <div style={{
            marginTop: appData.text.dlnumber ? 0 : isSP(width) ? "30px" : "40px"
          }}>
            <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
          </div>
        </div>
        
        <Image 
          src={appData.image.picture!} 
          alt="pictures" 
          width={1080} 
          height={1080} 
          style={{
            width: "100%", 
            maxWidth: 500, 
            margin: "30px auto"
          }}
        />
      </div>
    </div>
  );
};

export default MyAppsTop;
