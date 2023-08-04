import { NextPage } from "next";
import '../../src/app/globals.css';
import MyAppsBadges from "./MyAppsBadges";
import { myApp } from "../../public/utils/constants";
import { CSSProperties } from "react";

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}
  
const DownloadNow: NextPage<Props> = ({appNumber, width, isJa}) => { 
    
    const downloadNow = isJa ? "今すぐダウンロード": "DOWNLOAD NOW";

    const downloadNowStyle: CSSProperties = {
      width: "100vw",
      color: "white",
      backgroundColor: "rgba(0, 0, 0 , 0.5)", 
      paddingTop: 30,
    }
    const titleStyle: CSSProperties = {
      fontSize: myApp(width, isJa)[appNumber].size.subTitle,
      fontWeight: isJa ? "bold": "normal", 
      textAlign: "center", 
      marginBottom: 20
    }

    return (<div style={downloadNowStyle}>
      <h2 className={myApp(width, isJa)[appNumber].font.title} style={titleStyle}>{downloadNow}</h2>  
      <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
    </div>
    
  );
};

export default DownloadNow
