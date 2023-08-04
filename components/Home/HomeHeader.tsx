import { NextPage } from "next"
import React, {CSSProperties, useState} from "react"
import Link from "next/link";
import Image from "next/image";
import MyFooter from ".././Common/MyFooter";
import { myApp, } from "../../public/utils/constants";

interface Props {
  menuNumber: number
  width: number
  isJa: boolean
}

const MyHeader: NextPage<Props> = ({ menuNumber, width, isJa }) => {
  
  const [openMenu, setOpenMenu] = useState(false);
  const toMenu = () => setOpenMenu(!openMenu);
  const appLinkStyle = (j: number): CSSProperties => ({
    textAlign: 'center', 
    fontSize: myApp(width, isJa)[j].size.menu,
    textDecoration: "none",
    padding: '8px 0', 
  });
  const app_links = [];
  if (myApp(width, isJa).length > 0) {
    for (let i = 1; i < myApp(width, isJa).length; i++) {
      app_links.push(
        <div className={myApp(width, isJa)[i].font.menu}>
          <li onClick={toMenu} key={`headerMenu_${i}`} style={appLinkStyle(i)}>
            <Link href={myApp(width, isJa)[i].link.link} key={`appLink_${i}`}>{myApp(width, isJa)[i].text.menu}</Link>
          </li>
        </div>
      )  
    }
  }

  const isPC = (width > 1024);
  const title = myApp(width, isJa)[0].text.title;
  const icon = myApp(width, isJa)[0].icon;
  const headerLogo = `/images/appstudio/header_logo.png`;
  const menuTitle = openMenu ? "close": "menu";
  const menuMargin = isPC ? "5px 0 auto 100px": "5px 0 auto 0"
  const menuIconImage = `/images/button/${menuTitle}.png`;

  const homeHeaderStyle: CSSProperties = {
    color: "white", 
    backgroundColor: "black"
  }
  const headerIconStyle: CSSProperties = {
    height: isPC ? 60: 50, 
    width: "auto",
    marginTop: 5,
  }
  const menuStyle: CSSProperties = {
    height: openMenu ? "100vh": 0, 
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  }
  const appLinksStyle: CSSProperties = {
    listStyleType: 'none', 
    padding: "20px 0 5px 0"
  }

  return (<div className="header" style={homeHeaderStyle}>
    <div className={isPC ? "flex_left": "flex_center"} style={{margin: menuMargin}}>
      <Image src={headerLogo} alt={title} width={480} height={270} priority={true} style={headerIconStyle}/>
    </div>
    {!isPC && (
      <div className="menu" style={menuStyle}>
        <div onClick={toMenu} style={{marginTop: 25, marginLeft: 25}}>
          <Image src={menuIconImage} alt="close" width={24} height={24} priority={true}/>
        </div>
        {openMenu && (
          <div>
            <div onClick={toMenu} className="flex_center" style={{padding: '10px 0'}}>
              <Image src={icon} alt={title} width={180} height={180} priority={true}/>
            </div>
            <div style={appLinksStyle}>{app_links}</div>
            <MyFooter appNumber={0} width={width} isJa={isJa} menuNumber={menuNumber} isHome={true}/>
          </div>
        )}
      </div>
    )}
  </div>);
}

export default MyHeader