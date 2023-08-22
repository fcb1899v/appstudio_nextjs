import { NextPage } from "next"
import React, {CSSProperties, useState} from "react"
import Link from "next/link";
import Image from "next/image";
import MyFooter from ".././Common/MyFooter";
import { isPC, myApp, } from "../../public/utils/constants";

interface Props {
  menuNumber: number
  width: number
  isJa: boolean
}

const MyHeader: NextPage<Props> = ({ menuNumber, width, isJa }) => {
  
  const [openMenu, setOpenMenu] = useState(false);
  const toMenu = () => setOpenMenu(!openMenu);

  const title = myApp(width, isJa)[0].text.title;
  const icon = myApp(width, isJa)[0].icon;
  const headerLogo = `/images/appstudio/header_logo.png`;
  const menuTitle = openMenu ? "close": "menu";
  const menuMargin = isPC(width) ? "5px 0 auto 100px": "5px 0 auto 0"
  const menuIconImage = `/images/button/${menuTitle}.png`;

  const homeHeaderStyle: CSSProperties = {
    color: "white", 
    backgroundColor: "black"
  }
  const headerIconStyle: CSSProperties = {
    height: isPC(width) ? 60: 50, 
    width: "auto",
    marginTop: 5,
  }
  const menuStyle: CSSProperties = {
    height: openMenu ? "100vh": 0, 
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  }
  const MenuIconStyle: CSSProperties = {
    width: 25,
    height: "auto",
  }
  const appIconStyle: CSSProperties = {
    width: 180,
    height: "auto",
    padding: '10px 0',
    color: "white",
  }
  const appLinksStyle: CSSProperties = {
    listStyleType: 'none', 
    padding: "20px 0 5px 0",
  }
  const appLinkStyle = (j: number): CSSProperties => ({
    textAlign: 'center', 
    fontSize: myApp(width, isJa)[j].size.menu,
    textDecoration: "none",
    padding: '7px 0', 
  });

  return <header className="header" style={homeHeaderStyle}>
    <div className={isPC(width) ? "flex_left": "flex_center"} style={{margin: menuMargin}}>
      <Image src={headerLogo} alt={title} width={300} height={300} priority={true} style={headerIconStyle}/>
    </div>
    {!isPC(width) && <div className="menu" style={menuStyle}>
      <div onClick={toMenu} style={{marginTop: 25, marginLeft: 25}}>
        <Image src={menuIconImage} alt="close" width={50} height={50} priority={true} style={MenuIconStyle}/>
      </div>
      {openMenu && <div>
        <div onClick={toMenu} className="flex_center">
          <Image src={icon} alt={title} width={300} height={300} priority={true} style={appIconStyle}/>
        </div>
        <div style={appLinksStyle}>
          {myApp(width, isJa).map((myApp, i) => (i != 0) && 
            <div className={myApp.font.menu} key={`headerMenu_${i}`}>
              <li onClick={toMenu} style={appLinkStyle(i)}>
                <Link href={myApp.link.link}>{myApp.text.menu}</Link>
              </li>
            </div>
          )}
        </div>
        <MyFooter appNumber={0} width={width} isJa={isJa} menuNumber={menuNumber} isHome={true}/>
      </div>}
    </div>}
  </header>
}

export default MyHeader