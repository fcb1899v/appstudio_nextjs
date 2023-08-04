import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { myApp } from '../../public/utils/constants'

interface Props {
  width: number
  isJa: boolean
}

const AllowanceFeatures: NextPage<Props> = ({width, isJa}) => {

  const appNumber = 4
  const title = isJa ? "＜特徴＞": "FEATURES";
  const features = myApp(width, isJa)[appNumber].text.features
  const featuresImage = myApp(width, isJa)[appNumber].image.features

  const featuresStyle : CSSProperties = {
    color: "white", 
    backgroundColor: myApp(width, isJa)[appNumber].color.features, 
    padding: "30px 10px"
  }
  const titleStyle: CSSProperties = { 
    color: myApp(width, isJa)[appNumber].color.title, 
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    textAlign: "center", 
    paddingBottom: 30,
  }
  const messageStyle : CSSProperties = {
    color: myApp(width, isJa)[appNumber].color.message, 
    fontSize: myApp(width, isJa)[appNumber].size.message, 
    maxWidth: 800,
    columnGap: 8,
    marginBottom: 20
  }
  const imageStyle: CSSProperties = {
    width: "100%", 
    maxWidth: 800, 
    height: "auto", 
    margin: "0px auto",
  }

  return (<div className="container" style={featuresStyle}>
    <h2 className={myApp(width, isJa)[appNumber].font.title} style={titleStyle}>{title}</h2>
    <div className="flex_center_wrap">
      {features.map((_, i) => (<div className="flex_center_wrap" key={`messages_${i}`} style={messageStyle}>
        {features[i].map((_, j) => (<p key={`message_${i}_${j}`} className={myApp(width, isJa)[appNumber].font.message} style={{marginBottom: 10}}>
          {features[i][j]} 
        </p>))}
        <Image src={featuresImage[i]} key={`images_${i}`}  alt={`explain_ped`} width={1920} height={1080} priority={true} style={imageStyle}/>
      </div>))}
    </div>
  </div>)
}

export default AllowanceFeatures