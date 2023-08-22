import { NextPage } from "next"
import React, {CSSProperties, useState} from "react"
import Link from "next/link";
import Image from "next/image";
import MyFooter from "./MyFooter";
import { isSP, myApp, myMenu } from "../../public/utils/constants";

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const MyAppsHeader: NextPage<Props> = ({ appNumber, width, isJa}) => {

  const [openMenu, setOpenMenu] = useState(false);
  const toMenu = () => setOpenMenu(!openMenu);

  const title = myApp(width, isJa)[appNumber].text.header;
  const font = myApp(width, isJa)[appNumber].font.header;
  const icon = myApp(width, isJa)[appNumber].icon;
  const link = myApp(width, isJa)[appNumber].link.link;
  const menuTitle = openMenu ? "close": "menu";
  const menuIconImage = `/images/button/${menuTitle}.png`;

  const headerStyle: CSSProperties = {
    color: "white", 
    backgroundColor: myApp(width, isJa)[appNumber].color.header,
  }
  const headerTitleStyle: CSSProperties = {
    fontSize: myApp(width, isJa)[appNumber].size.header, 
    textAlign: "center", 
    lineHeight: 1,
    height: 70, 
    columnGap: 20, 
    padding: "5px 40px 0 50px",
  }
  const iconStyle = {
    borderRadius: 11.5, 
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    marginBottom: 5,
  }
  const menuStyle: CSSProperties = {
    height: openMenu ? "100vh": 0, 
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  }
  const MenuIconStyle: CSSProperties = {
    width: 25,
    height: "auto",
  }
  const appIconSytle: CSSProperties = {
    width: 100,
    height: "auto",
  }
  const appLinksStyle: CSSProperties = {
    listStyleType: 'none', 
    fontSize: '1rem', 
    padding: "20px 0 5px 0"
  }
  const appLinkStyle = (j: number): CSSProperties => ({
    textAlign: 'center', 
    padding: '7px 0', 
    fontSize: myApp(width, isJa)[j].size.menu,
    textDecoration: "none"
  });

  return <header className="header" style={headerStyle}>
    <div className="flex_center" style={headerTitleStyle}>
      {!isSP(width) && (<Image src={icon} alt="logo" width={50} height={50} priority={true} style={iconStyle}/>)}
      <div style={{display: "block"}}>
        {title.split("/").map((title, k) => <h1 className={font} key={`title_${k}`}>{title}</h1>)}
      </div>
    </div>
    <div className="menu" style={menuStyle}>
      <div onClick={toMenu} style={{marginTop: 25, marginLeft: 25}}>
        <Image src={menuIconImage} alt="close" width={24} height={24} priority={true} style={MenuIconStyle}/>
      </div>
      {openMenu && <div>
        <div onClick={toMenu} className="flex_center" style={{padding: '10px 0'}}>
          <Link href={link}>
            <Image src={icon} alt={title} width={300} height={300} priority={true} style={appIconSytle}/>
          </Link>
        </div>
        <div style={appLinksStyle}>
          {myApp(width, isJa).map((myApp, j) => (j != appNumber) &&
            (<Link href={myApp.link.link} className={myApp.font.menu} key={`headerMenu_${j}`}>
              <li onClick={toMenu} style={appLinkStyle(j)}>{myApp.text.menu}</li>
            </Link>)
          )}
        </div>
        <MyFooter appNumber={appNumber} width={width} isJa={isJa} menuNumber={0} isHome={true}/>
      </div>}
    </div>
  </header>
}

export default MyAppsHeader
