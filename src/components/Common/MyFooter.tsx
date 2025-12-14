import { NextPage } from 'next'
import {CSSProperties} from "react"
import Link from 'next/link';
import Image from 'next/image';
import { isPC, isSP, myMenu, mySNS } from "@/utils/constants";
import CookieConsentBanner from '@/components/Common/CookieConsentBanner';

/**
 * Interface for footer component props
 * Defines the properties required for rendering the footer
 */
interface Props {
  width: number
  isJa: boolean
  menuNumber: number
}

/**
 * Footer component
 * Displays SNS links, menu navigation, copyright, and cookie consent banner
 * Provides responsive layout and social media integration
 */

// Footer component for site navigation and social links
const MyFooter: NextPage<Props> = ({width, isJa, menuNumber}) => {
  
  // Copyright trademark text
  const trademark = "©Nakajima Masao App Studio. ALL RIGHTS RESERVED."

  // Menu link style with responsive font size
  const menuLinkStyle: CSSProperties = {
    fontSize: isSP(width) ? 14: 16,
    margin: 0, 
    padding: 0, 
  }
  
  // Footer container style with conditional background
  const footerStyle = {
    width: "100vw", 
    color: "white", 
    backgroundColor: (menuNumber == 100) ? "rgba(0, 0, 0, 0.5)": "transparent", 
    paddingBottom: 30,
    gap: isPC(width) ? 50: 0,
  }
  
  // Menu links container style
  const menuLinksStyle: CSSProperties = {
    marginBottom: 10, 
    columnGap: 5, 
    rowGap: 5,
  }
  
  // Social media icon style
  const snsStyle: CSSProperties = {
    width: 35,
    height: 35,
    margin: "30px 15px 15px 15px",
    objectFit: "contain",
  }
  
  // Trademark text style with responsive font size
  const trademarkStyle: CSSProperties = {
    fontSize: isSP(width) ? 11: 14, 
    textAlign: "center", 
  }

  return (
    <footer className={isPC(width) ? "flex_center": "block_center"} style={footerStyle}>
      {/* Social media links */}
      <div className="flex_center" style={{marginBottom: 15}}>
        {mySNS.map((sns, i) => (
          <Link href={sns.link} key={`snsLink_${i}`}>
            <Image src={sns.image} alt={sns.title} width={35} height={35} style={snsStyle}/>
          </Link>
        ))}
      </div>
      
      {/* Menu navigation and copyright */}
      <div>
        {/* Menu links with separators */}
        <div className="flex_center_wrap" style={menuLinksStyle}>
          {myMenu(isJa).map((menu, j) => (
            <div className={"flex_center"} key={`menu_${j}`} style={menuLinkStyle}>
              {(j > 0) && <span style={{marginRight: 5}}>|</span>}
              <a href={menu.link} onClick={(e) => {
                e.stopPropagation();
              }} style={{color: "var(--white)"}}>{menu.title}</a>
            </div> 
          ))}
        </div>
        
        {/* Copyright trademark */}
        <p style={trademarkStyle}>{trademark}</p>
      </div>
      
      {/* Cookie consent banner */}
      {<CookieConsentBanner isJa={isJa}/>}      
    </footer>
  )
}

export default MyFooter
