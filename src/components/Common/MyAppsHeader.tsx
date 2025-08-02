import { NextPage } from "next"
import React, {CSSProperties, useState} from "react"
import Link from "next/link";
import Image from "next/image";
import MyFooter from "./MyFooter";
import { isPC, isSP, myApp } from "@/utils/constants";
import { useAnalytics } from '@/hooks/useAnalytics';

/**
 * Interface for header component props
 * Defines the properties required for rendering the app header
 */
interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

/**
 * Header component for app pages with navigation and analytics tracking
 * Displays the app title, logo, and navigation menu with responsive design.
 * Includes analytics tracking for menu interactions, navigation clicks, and user behavior.
 * Provides mobile-friendly menu overlay with app navigation links and footer integration.
 * Handles different display modes for home page vs app pages with appropriate styling.
 */

// Header component for app pages with navigation and analytics tracking
const MyAppsHeader: NextPage<Props> = ({ appNumber, width, isJa}) => {
  // Get analytics tracking functions from custom hook
  const { trackMenuClick, trackEvent } = useAnalytics();
  
  // Menu state management for mobile navigation
  const [openMenu, setOpenMenu] = useState(false);
  
  /**
   * Toggle menu visibility and track analytics
   * Handles menu open/close state and tracks user interaction
   */
  const toMenu = () => {
    setOpenMenu(!openMenu);
    
    // メニュー開閉の追跡
    trackEvent({
      action: 'menu_toggle',
      category: 'navigation',
      label: !openMenu ? 'menu_open' : 'menu_close',
      custom_parameters: {
        app_name: myApp(width, isJa)[appNumber].app,
        language: isJa ? 'ja' : 'en',
        device_type: width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
      }
    });
  };

  /**
   * Handle menu item click and track navigation analytics
   * @param targetAppName - Name of the target app being navigated to
   * @param targetAppLink - URL of the target app page
   */
  const handleMenuClick = (targetAppName: string, targetAppLink: string) => {
    // メニュークリックの追跡
    trackMenuClick(targetAppName, isJa ? 'ja' : 'en');
    
    // 詳細なナビゲーション追跡
    trackEvent({
      action: 'navigation_click',
      category: 'navigation',
      label: targetAppName,
      custom_parameters: {
        from_app: myApp(width, isJa)[appNumber].app,
        to_app: targetAppName,
        navigation_url: targetAppLink,
        language: isJa ? 'ja' : 'en',
        device_type: width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
      }
    });
  };

  // App data and configuration for header display
  const title = myApp(width, isJa)[appNumber].text.header;
  const font = myApp(width, isJa)[appNumber].font.header;
  const icon = (appNumber === 0) ? `/images/appstudio/header_logo.png` : myApp(width, isJa)[appNumber].icon;
  const link = myApp(width, isJa)[appNumber].link.link;
  const backgroundColor = myApp(width, isJa)[appNumber].color.background;
  
  // Header styling with app-specific background color
  const headerStyle: CSSProperties = {
    color: "white", 
    backgroundColor: (appNumber === 0 || isPC(width)) ? myApp(width, isJa)[appNumber].color.header: myApp(width, isJa)[appNumber].color.spHeader,
  }
  
  // Header title container styling with responsive design
  const headerTitleStyle: CSSProperties = {
    fontSize: myApp(width, isJa)[appNumber].size.header, 
    textAlign: "center", 
    lineHeight: 1,
    height: 70, 
    columnGap: 20, 
    padding: isSP(width) ? "0 40px 0 50px" : "5px 40px 0 50px",
  }
  
  // App icon styling with border and spacing
  const iconStyle = {
    borderRadius: 11.5, 
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    marginBottom: 5,
  }
  
  // Menu overlay styling with full viewport height
  const menuStyle: CSSProperties = {
    height: openMenu ? "100vh": 0, 
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  }
  
  // Menu icon styling for close button
  const MenuIconStyle: CSSProperties = {
    width: 25,
    height: 20,
    position: "relative",
    cursor: "pointer",
  }
  
  // App icon styling for menu display
  const appIconSytle: CSSProperties = {
    width: appNumber === 0 ? 150 : 100,
    height: "auto",
  }
  
  // App links container styling
  const appLinksStyle: CSSProperties = {
    listStyleType: 'none', 
    fontSize: '1rem', 
    padding: "20px 0 5px 0"
  }
  
  // Individual app link styling with dynamic font size
  const appLinkStyle = (j: number): CSSProperties => ({
    textAlign: 'center', 
    padding: '7px 0', 
    fontSize: myApp(width, isJa)[j].size.menu,
    textDecoration: "none"
  });

  return (
    <header className="header" style={headerStyle}>
      {/* Header container with app title and menu button */}
      <div className="flex_center" style={headerTitleStyle}>
        {(appNumber === 0) ? (
          // ホームアプリの場合はロゴタイトルのみ表示
          <Image src={icon} alt="logo" width={300} height={300} priority={true} style={{
            height: isSP(width) ? 50 : 60,
            width: "auto",
          }}/>
        ) : isPC(width) ? (
          // その他のアプリの場合は従来通り
          <>
            {/* Desktop app icon display */}
            {!isSP(width) && <Image src={icon} alt="logo" width={50} height={50} priority={true} style={iconStyle}/>}
            {/* App title display with font styling */}
            <div style={{display: "flex", alignItems: "center", flexDirection: title.includes("/") ? "column" : "row"}}>
              {title.includes("/") ? 
                title.split("/").map((title, k) => <h1 className={font} key={`title_${k}`} style={{fontSize: myApp(width, isJa)[appNumber].size.header, lineHeight: 1, margin: 0, transform: font === "cornerStone" ? "translateY(2px)" : "none"}}>{title}</h1>) :
                <h1 className={font} style={{fontSize: myApp(width, isJa)[appNumber].size.header, lineHeight: 1, margin: 0, transform: font === "cornerStone" ? "translateY(2px)" : "none"}}>{title}</h1>
              }
            </div>
          </>
        ): null}
      </div>
      
      {/* Menu overlay with navigation and close button */}
      <div className="menu" style={menuStyle}>
        {/* Menu toggle button with icon */}
        <div onClick={toMenu} style={{marginTop: 25, marginLeft: 25}}>
          <div style={MenuIconStyle}>
            <div style={{
              width: "100%",
              height: "3px",
              backgroundColor: openMenu ? "#fff" : (isSP(width) && backgroundColor === "var(--white)" ? "#000" : "#fff"),
              marginBottom: "4px",
              transition: "all 0.3s ease",
              transform: openMenu ? "rotate(45deg) translate(8px, 8px)" : "none"
            }}></div>
            <div style={{
              width: "100%",
              height: "3px",
              backgroundColor: openMenu ? "#fff" : (isSP(width) && backgroundColor === "var(--white)" ? "#000" : "#fff"),
              marginBottom: "4px",
              transition: "all 0.3s ease",
              opacity: openMenu ? "0" : "1"
            }}></div>
            <div style={{
              width: "100%",
              height: "3px",
              backgroundColor: openMenu ? "#fff" : (isSP(width) && backgroundColor === "var(--white)" ? "#000" : "#fff"),
              transition: "all 0.3s ease",
              transform: openMenu ? "rotate(-45deg) translate(2px, -2px)" : "none"
            }}></div>
          </div>
        </div>
        
        {/* Menu content when open */}
        {openMenu && (
          <div>
            {/* Current app icon in menu */}
            <div onClick={toMenu} className="flex_center" style={{padding: '10px 0'}}>
              <Link href={link}>
                <Image 
                  src={appNumber === 0 ? "/images/appstudio/icon.png" : icon} 
                  alt={title} 
                  width={300} 
                  height={300} 
                  priority={true} 
                  style={appIconSytle}
                />
              </Link>
            </div>
            
            {/* App navigation links list */}
            <div style={appLinksStyle}>
              {myApp(width, isJa).map((myApp, j) => (j != appNumber) &&
                (<div key={`headerMenu_${j}`}>
                  <li style={appLinkStyle(j)}>
                    <a href={myApp.link.link} onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(myApp.text.menu, myApp.link.link);
                      toMenu(); // メニューを閉じる
                    }} className={myApp.font.menu} style={{color: "var(--white)"}}>{myApp.text.menu}</a>
                  </li>
                </div>)
              )}
            </div>
            
            {/* Footer component in menu */}
            <MyFooter width={width} isJa={isJa} menuNumber={0}/>
          </div>
        )}
      </div>
    </header>
  );
};

export default MyAppsHeader
