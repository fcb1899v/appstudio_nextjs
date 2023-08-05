import { NextPage } from 'next'
import Link from 'next/link';
import Image from 'next/image';
import { myApp, myMenu, mySNS } from "../../public/utils/constants";
import { CSSProperties, useEffect } from 'react';

interface Props {
  appNumber: number
  width: number
  isJa: boolean
  menuNumber: number
  isHome: boolean
}

const MyFooter: NextPage<Props> = ({appNumber, width, isJa, menuNumber, isHome}) => {
  
  const isSP = (width < 600);
  const isPC = (width > 1024);
  const trademark = "©Nakajima Masao App Studio. ALL RIGHTS RESERVED."

  const sns_list = [];
  for (let i = 0; i < mySNS.length; i++) {
    sns_list.push( 
      <div key={`snsLink_${i}`}>
        <Link href={mySNS[i].link}>
          <Image src={mySNS[i].image} alt={mySNS[i].title} width={35} height={35} style={{margin: "30px 15px 15px 15px"}}/>
        </Link>
      </div>
    )
  }
 
  const menuLinkStyle: CSSProperties = {
    fontSize: isSP ? 14: 16,
    margin: 0, 
    padding: 0, 
  }
  const menu_links = [];
  if (myMenu(isJa).length > 0) {
    for (let i = 0; i < myMenu(isJa).length; i++) {
      if (i != menuNumber) {
        menu_links.push(
          <div className={"flex_center"} key={`menu_${i}`} style={menuLinkStyle}>
            {(i > (isHome ? 1: 0)) && <span style={{marginRight: 5}}>|</span>}
            <Link href={myMenu(isJa)[i].link} key={`menuLink_${i}`}>{myMenu(isJa)[i].title}</Link>
          </div>
        )  
      }
    }  
  }

  const footerStyle = {
    width: "100vw", 
    color: "white", 
    backgroundColor: (menuNumber == 100) ? "rgba(0, 0, 0, 0.5)": "transparent", 
    paddingBottom: 30,
  }
  const menuLinksStyle: CSSProperties = {
    marginBottom: 10, 
    columnGap: 5, 
    rowGap: 5,
  }
  const trademarkStyle: CSSProperties = {
    fontSize: isSP ? 11: 14, 
    textAlign: "center", 
  }

  return (
    <div style={footerStyle}> 
      <div className={isPC ? "flex_center": "block_center"} style={{gap: isPC ? 50: 0}}>
        <div className="flex_center" style={{marginBottom: 15}}>{sns_list}</div>
        <div>
          <div className="flex_center_wrap" style={menuLinksStyle}>{menu_links}</div>        
          <p style={trademarkStyle}>{trademark}</p>
        </div>
      </div>
    </div>
  );
};

export default MyFooter
