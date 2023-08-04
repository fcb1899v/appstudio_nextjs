import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { myApp } from '../../public/utils/constants'

interface Props {
  width: number
  isJa: boolean
}

const TransitExplain: NextPage<Props> = ({width, isJa}) => {

  const appNumber = 5;
  const title = isJa ? "＜特徴＞": "FEATURES";
  const features = myApp(width, isJa)[appNumber].text.features;
  const featuresImage = myApp(width, isJa)[appNumber].image.features[0];
  const back = `/images/transit/back.png`

  const explainStyle : CSSProperties = {
    color: myApp(width, isJa)[appNumber].color.title,
    backgroundColor: myApp(width, isJa)[appNumber].color.background, 
    paddingBottom: 20
  }
  const titleStyle: CSSProperties = {    
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    textAlign: "center", 
    padding: 10,
  }
  const messagesStyle : CSSProperties = {
    maxWidth: 1024,
    margin: "10px auto"
  }
  const messageStyle : CSSProperties = {
    margin: 10, 
    columnGap: 5,
  }
  const imageStyle: CSSProperties = {
    width: "100%", 
    maxWidth: 1024, 
    height: "auto", 
    margin: "0px auto",
  }
  const backImageStyle: CSSProperties = {
    width: "100vw",
  }

  return (<div className="container" style={explainStyle}>
    <h2 className={myApp(width, isJa)[appNumber].font.title} style={titleStyle}>{title}</h2>
    <div className="flex_center_wrap" style={messagesStyle}>
      {features.map((_, i) => (<div className="flex_center_wrap" key={`message_${i}`} style={messageStyle}>
        {features[i].map((_, j) => (<p key={`message_${i}_${j}`}>
          {features[i][j]} 
        </p>))}
      </div>))}
    </div>
    <Image src={featuresImage} alt={`explain_ped`} width={1920} height={1080} priority={true} style={imageStyle}/>
  </div>)
}

export default TransitExplain

