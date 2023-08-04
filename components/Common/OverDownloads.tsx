import { NextPage } from "next";
import '../../src/app/globals.css';
import { CSSProperties } from "react";

interface Props {
  width: number
  dlNumber: string
  fontFamily: string
  isJa: boolean
  size: number
}
  
const OverDownloads: NextPage<Props> = ({width, dlNumber, fontFamily, isJa, size}) => { 
    
    const isSmall = (width < 450)
    const download = isJa ? "ダウンロード突破！": "Downloads";
    const style: CSSProperties = {
      listStyle: "none", 
      fontSize: size, 
      margin: isSmall ? "10px 10px 20px 10px": 10, 
      columnGap: 20,
    }

    return (
      <div className={fontFamily}>
        <div className="flex_center_wrap" style={style}>
          {!isJa && (<li style={{marginBottom: -10}}>Over</li>)}
          <li style={{fontSize: 50}}>{dlNumber}</li>
          <li style={{marginBottom: -10, fontWeight: isJa ? "bold": "normal"}}>{download}</li>
        </div>
      </div>
  );
};

export default OverDownloads
