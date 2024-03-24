import { NextPage } from 'next'
import Link from 'next/link';
import Image from 'next/image';
import { isPC, isSP, myApp, myMenu, mySNS } from "../../public/utils/constants";
import { CSSProperties, useEffect } from 'react';

interface Props {
  appNumber: number
  width: number
  isJa: boolean
  menuNumber: number
  isHome: boolean
}

const MyFooter: NextPage<Props> = ({appNumber, width, isJa, menuNumber, isHome}) => {
  
  const trademark = "©Nakajima Masao App Studio. ALL RIGHTS RESERVED."

  const menuLinkStyle: CSSProperties = {
    fontSize: isSP(width) ? 14: 16,
    margin: 0, 
    padding: 0, 
  }
  const footerStyle = {
    width: "100vw", 
    color: "white", 
    backgroundColor: (menuNumber == 100) ? "rgba(0, 0, 0, 0.5)": "transparent", 
    paddingBottom: 30,
    gap: isPC(width) ? 50: 0,
  }
  const menuLinksStyle: CSSProperties = {
    marginBottom: 10, 
    columnGap: 5, 
    rowGap: 5,
  }
  const snsStyle: CSSProperties = {
    width: 35,
    height: "auto",
    margin: "30px 15px 15px 15px",
  }
  const trademarkStyle: CSSProperties = {
    fontSize: isSP(width) ? 11: 14, 
    textAlign: "center", 
  }

  return <footer className={isPC(width) ? "flex_center": "block_center"} style={footerStyle}>
    <div className="flex_center" style={{marginBottom: 15}}>
      {mySNS.map((sns, i) => <Link href={sns.link} key={`snsLink_${i}`}>
        <Image src={sns.image} alt={sns.title} width={100} height={100} style={snsStyle}/>
      </Link>)}
    </div>
    <div>
      <div className="flex_center_wrap" style={menuLinksStyle}>
        {myMenu(isJa).map((myMenu, j) => (j != menuNumber) && 
          <div className={"flex_center"} key={`menu_${j}`} style={menuLinkStyle}>
            {(j > (isHome ? 1: 0)) && <span style={{marginRight: 5}}>|</span>}
            <Link href={myMenu.link}>{myMenu.title}</Link>
          </div> 
        )}
      </div>
      <p style={trademarkStyle}>{trademark}</p>
    </div>        
  </footer>
}

export default MyFooter
