import { NextPage } from "next"
import React, { useState } from "react"
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import MyFooter from "./MyFooter";
import { isSP, myApp, isPC } from "@/utils/constants";
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
  const title = appData.text.header;
  const icon = (appNumber === 0) ? `/images/appstudio/icon.png` : appData.icon;
  const link = appData.link.link;  
  const homeHeaderLogo = `/images/appstudio/header_logo.png`;

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

  return (
    <header 
      className="header" 
      style={{
        backgroundColor: appNumber === 0 ? "var(--black)": "var(--transparent)",
      }}
    >
      <div 
        className="flex_center" 
        style={{
          height: 70, 
          padding: isSP(width) ? "5px 20px 0 30px" : "5px 40px 0 50px",
          justifyContent: "flex-end",
        }}
      >
        {appNumber === 0 && (
          <div style={{
            display: "flex",
            justifyContent: isPC(width) ? "flex-start" : "center",
            flex: 1,
          }}>
            <Link href={myApp(width, isJa)[0].link.link}>
              <Image 
                src={homeHeaderLogo} 
                alt={myApp(width, isJa)[0].text.title} 
                width={300} 
                height={300} 
                priority={true} 
                style={{
                  height: isPC(width) ? 60: 50, 
                  width: "auto",
                  marginBottom: 5,
                }}
              />
            </Link>
          </div>
        )}
        
        <div onClick={toMenu} style={{cursor: "pointer"}}>
          <HiMenu 
            size={isSP(width) ? 30: 40}
            color={appData.color.title}
          />
        </div>
      </div>
      
      <div 
        className="menu" 
        style={{
          height: openMenu ? "100vh": 0, 
          backgroundColor: "rgba(0, 0, 0, 0.9)"
        }}
      >
        
        {openMenu && (
          <div>
            <div onClick={toMenu} style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: 70, 
              padding: isSP(width) ? "5px 20px 0 30px" : "5px 40px 0 50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              cursor: "pointer",
              zIndex: 1000
            }}>
              <HiX 
                size={isSP(width) ? 30: 40} 
                color={"var(--white)"}
              />
            </div>

            <div onClick={toMenu} className="flex_center" style={{padding: '10px 0'}}>
              <Link href={link}>
                <Image 
                  src={icon} 
                  alt={title} 
                  width={(appNumber === 0) ? 165: 96} 
                  height={100} 
                  priority={true} 
                  style={{
                    marginTop: 70,
                    borderRadius: 22.5,
                    filter: (appNumber === 0) ? "none": "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))",
                    boxShadow: (appNumber === 0) ? "none": "0px 0px 20px 1px rgba(255, 255, 255, 0.5)",
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
                      style={{
                        color: "var(--white)"
                      }}
                    >
                      {myApp.text.menu}
                    </a>
                  </li>
                </div>)
              )}
            </div>
            
            <MyFooter width={width} isJa={isJa} menuNumber={0}/>
          </div>
        )}
      </div>
      
    </header>
  );
};

export default MyAppsHeader
