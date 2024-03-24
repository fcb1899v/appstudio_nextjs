import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { myApp } from '../../public/utils/constants'

interface Props {
  width: number
  isJa: boolean
}

const SignalFeatures: NextPage<Props> = ({width, isJa}) => {

  const appNumber = 3
  const title = isJa ? "＜特徴＞": "Features";
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const textColor = myApp(width, isJa)[appNumber].color.background;
  const backgroundColor = myApp(width, isJa)[appNumber].color.title;
  const featuresImages = myApp(width, isJa)[appNumber].image.features!;
  const features = myApp(width, isJa)[appNumber].text.features;

  const featuresStyle : CSSProperties = {
    color: textColor, 
    backgroundColor: backgroundColor, 
    padding: "30px 10px"
  }
  const titleStyle: CSSProperties = {    
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    fontWeight: "bold", 
    textAlign: "center", 
    padding: 10,
  }
  const imageStyle: CSSProperties = {
    width: "100%", 
    maxWidth: 800, 
    height: "auto", 
    margin: "0px auto",
  }

  return <div className="container" style={featuresStyle}>
    <h2 className={titleFont} style={titleStyle}>{title}</h2>
    <div className="flex_center_wrap" style={{maxWidth: 800}}>
      {features.map((feature, i) => 
        <div className="flex_center_wrap" key={`messages_${i}`} style={{marginBottom: 15}}>
          {feature.map((_, j) => <p key={`message_${i}_${j}`}>{feature[j]} </p>)}
          <Image src={featuresImages[i]} alt={`image_${i}`} width={1920} height={1080} priority={true} style={imageStyle}/>
        </div>
      )}
    </div>
  </div>
}

export default SignalFeatures