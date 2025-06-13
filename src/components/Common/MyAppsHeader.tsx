import { NextPage } from "next"
import React, { useState } from "react"
import Link from "next/link";
import Image from "next/image";
import MyFooter from "./MyFooter";
import { isSP, myApp } from "@/utils/constants";
import { useAnalytics } from '@/hooks/useAnalytics';

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const MyAppsHeader: NextPage<Props> = ({ appNumber, width, isJa}) => {
  const { trackMenuClick, trackEvent } = useAnalytics();
  const [openMenu, setOpenMenu] = useState(false);
  const appData = myApp(width, isJa)[appNumber];
  
  const toMenu = () => {
    setOpenMenu(!openMenu);
    
    trackEvent({
      action: 'menu_toggle',
      category: 'navigation',
      label: !openMenu ? 'menu_open' : 'menu_close',
      custom_parameters: {
        app_name: appData.app,
        language: isJa ? 'ja' : 'en',
        device_type: width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
      }
    });
  };

  const handleMenuClick = (targetAppName: string, targetAppLink: string) => {
    trackMenuClick(targetAppName, isJa ? 'ja' : 'en');
    
    trackEvent({
      action: 'navigation_click',
      category: 'navigation',
      label: targetAppName,
      custom_parameters: {
        from_app: appData.app,
        to_app: targetAppName,
        navigation_url: targetAppLink,
        language: isJa ? 'ja' : 'en',
        device_type: width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
      }
    });
  };

  const title = appData.text.header;
  const font = appData.font.header;
  const icon = (appNumber === 0) ? `/images/appstudio/header_logo.png` : appData.icon;
  const link = appData.link.link;
  
  const menuTitle = openMenu ? "close": "menu";
  const menuIconImage = `/images/button/${menuTitle}.png`;

  return (
    <header 
      className="header" 
      style={{
        color: "white", 
        backgroundColor: appData.color.header,
      }}
    >
      <div 
        className="flex_center" 
        style={{
          fontSize: appData.size.header, 
          textAlign: "center", 
          lineHeight: 1,
          height: 70, 
          columnGap: 20, 
          padding: "5px 40px 0 50px",
        }}
      >
        {appNumber === 0 ? (
          <Image 
            src={icon} 
            alt="logo" 
            width={300} 
            height={300} 
            priority={true} 
            style={{
              height: isSP(width) ? 50 : 60,
              width: "auto",
              marginTop: 5,
            }}
          />
        ) : (
          <>
            {!isSP(width) && (
              <Image 
                src={icon} 
                alt="logo" 
                width={50} 
                height={50} 
                priority={true} 
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 11.5,
                  border: "1px solid white",
                  marginBottom: 5
                }}
              />
            )}
            <div style={{display: "block"}}>
              {title.split("/").map((title, k) => (
                <h1 className={font} key={`title_${k}`}>{title}</h1>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div 
        className="menu" 
        style={{
          height: openMenu ? "100vh": 0, 
          backgroundColor: "rgba(0, 0, 0, 0.9)"
        }}
      >
        <div onClick={toMenu} style={{marginTop: 25, marginLeft: 25}}>
          <Image 
            src={menuIconImage} 
            alt="close" 
            width={24} 
            height={24} 
            priority={true} 
            style={{
              width: 25,
              height: "auto"
            }}
          />
        </div>
        
        {openMenu && (
          <div>
            <div onClick={toMenu} className="flex_center" style={{padding: '10px 0'}}>
              <Link href={link}>
                <Image 
                  src={icon} 
                  alt={title} 
                  width={100} 
                  height={100} 
                  priority={true} 
                  style={{
                    borderRadius: 22.5,
                    filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))",
                    boxShadow: "0px 0px 20px 1px rgba(255, 255, 255, 0.5)"
                  }}
                />
              </Link>
            </div>
            
            <div style={{
              listStyleType: 'none', 
              fontSize: '1rem', 
              padding: "20px 0 5px 0"
            }}>
              {myApp(width, isJa).map((myApp, j) => (j != appNumber) &&
                (<div key={`headerMenu_${j}`}>
                  <li style={{
                    textAlign: 'center', 
                    padding: '7px 0', 
                    fontSize: myApp.size.menu,
                    textDecoration: "none"
                  }}>
                    <a 
                      href={myApp.link.link} 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(myApp.text.menu, myApp.link.link);
                        toMenu();
                      }} 
                      className={myApp.font.menu}
                    >
                      {myApp.text.menu}
                    </a>
                  </li>
                </div>)
              )}
            </div>
            
            <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={0}/>
          </div>
        )}
      </div>
    </header>
  );
};

export default MyAppsHeader
