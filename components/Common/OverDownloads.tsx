import { NextPage } from "next";
import '../../src/app/globals.css';
import { CSSProperties } from "react";
import { isSP } from "../../public/utils/constants";

interface Props {
  width: number
  dlNumber: string
  fontFamily: string
  isJa: boolean
  size: number
}
  
const OverDownloads: NextPage<Props> = ({width, dlNumber, fontFamily, isJa, size}) => { 
    
  const download = isJa ? "ダウンロード突破！": "Downloads";
  
  const overDownloadStyle: CSSProperties = {
    listStyle: "none", 
    fontSize: size, 
    margin: isSP(width) ? "10px 10px 40px 10px": "10px 0 15px 0", 
    columnGap: 20,
  }
  const overStyle: CSSProperties = {
    marginBottom: -10
  }
  const numberStyle: CSSProperties = {
    fontSize: 50
  }
  const downloadStyle: CSSProperties = {
    marginBottom: -10, 
    fontWeight: isJa ? "bold": "normal"
  }

  return <div className={fontFamily}>
    <div className="flex_center_wrap" style={overDownloadStyle}>
      {!isJa && (<li style={overStyle}>Over</li>)}
      <li style={numberStyle}>{dlNumber}</li>
      <li style={downloadStyle}>{download}</li>
    </div>
  </div>
}

export default OverDownloads
