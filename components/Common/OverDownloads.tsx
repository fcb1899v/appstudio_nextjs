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
  
  const downloadStyle: CSSProperties = {
    listStyle: "none", 
    fontSize: size, 
    margin: isSP(width) ? "10px 10px 40px 10px": "10px 0 15px 0", 
    columnGap: 20,
  }

  return <div className={fontFamily}>
    <div className="flex_center_wrap" style={downloadStyle}>
      {!isJa && (<li style={{marginBottom: -10}}>Over</li>)}
      <li style={{fontSize: 50}}>{dlNumber}</li>
      <li style={{marginBottom: -10, fontWeight: isJa ? "bold": "normal"}}>{download}</li>
    </div>
  </div>
}

export default OverDownloads
