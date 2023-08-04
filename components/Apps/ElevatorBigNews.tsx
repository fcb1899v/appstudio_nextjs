import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { myApp } from '../../public/utils/constants';

interface Props {
  width: number
  isJa: boolean
}

const ElevatorBigNews: NextPage<Props> = ({width, isJa}) => {

  const appNumber = 1
  const isPC = (width > 1024); 
  const isSP = (width < 600); 

  const twitterLinkId = "1450698944393007107"
  const buttonsMode = isJa ? "1000のボタンモード": "1000 Buttons Mode";
  const howtoChange = isJa ? "モード変更方法": "How to change the mode";
  const reproduceMode = isJa ? "再現！1000のボタン": "Reproduce! 1000 Buttons";
  const challenge = isJa ? "30秒チャレンジ": "30 Second Challenge";
  const bigNews = myApp(width, isJa)[appNumber].text.features;
  const bigNewsImage = myApp(width, isJa)[appNumber].image.features;

  const twitterOption = {
    jang: isJa ? "ja": "en", 
    conversation: 'none', 
    align: 'center'
  }
  const bigNewsStyle: CSSProperties = {
    width: "100vw", 
    color: myApp(width, isJa)[appNumber].color.background, 
    backgroundColor: myApp(width, isJa)[appNumber].color.title, 
    padding: "40px 0"
  }
  const messageStyle: CSSProperties = {
    fontSize: (!isJa && isSP) ? 16: 18, 
    textAlign: "center", 
    margin: 5
  }
  const twitterStyle: CSSProperties = {
    margin: 20, 
    paddingTop: 10
  }
  const containerStyle = (gap: number): CSSProperties => ({
    padding: 5, 
    columnGap: gap
  });
  const h1Style: CSSProperties = {
    color: myApp(width, isJa)[appNumber].color.header, 
    fontSize: 48, 
    textAlign: "center", 
    marginBottom: 20,
  };
  const h2Style: CSSProperties = {
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    textAlign: "center", 
    fontWeight: isJa ? "bold": "normal", 
    paddingTop: isPC ? 30: 40,
  };
  const h3Style: CSSProperties = {
    fontSize: 20, 
    fontWeight: isJa ? "bold": "normal", 
    textAlign: "center", 
    textDecoration: "underline", 
    padding: isPC ? "10px 0": "30px 0 10px 0",
  };
  const tallImageStyle: CSSProperties = {
    maxWidth: 540, 
    padding: "0 60px"
  }
  const imageStyle: CSSProperties = {
    maxWidth: 640, 
  };

  return (<div style={bigNewsStyle}>
    <h1 className={myApp(width, isJa)[appNumber].font.header} style={h1Style}>BIG NEWS</h1>
    {bigNews.map((_, i) => (<div className="flex_center_wrap" key={`message_${i}`}>
      {bigNews[i].map((_, j) => (<p key={`message_${i}_${j}`} style={messageStyle}>
        {bigNews[i][j]}
      </p>))}
    </div>))}
    <div style={twitterStyle}>
      <TwitterTweetEmbed tweetId={twitterLinkId} options={twitterOption}/>
    </div>
    <h2 className={myApp(width, isJa)[appNumber].font.title} style={h2Style}>{buttonsMode}</h2>
    <div className="flex_center_wrap" style={containerStyle(20)}>
      <Image src={bigNewsImage[0]} alt={`news_0`} width={1920} height={1080} priority={true} style={tallImageStyle} className='image'/>
      <div>
        <h3 style={h3Style}>{howtoChange}</h3>
        <Image src={bigNewsImage[1]} alt={`news_1`} width={1920} height={1080} priority={true} style={imageStyle} className='image'/>
      </div>
    </div>
    <h2 className={myApp(width, isJa)[appNumber].font.title} style={h2Style}>{reproduceMode}</h2>
    <div className="flex_center_wrap" style={containerStyle(0)}>
      <div>
        <h3 style={h3Style}>{challenge}</h3>
        <Image src={bigNewsImage[2]} alt={`news_2`} width={1920} height={1080} priority={true} style={imageStyle} className='image'/>
      </div>
      <div>
        <h3 style={h3Style}>{howtoChange}</h3>
        <Image src={bigNewsImage[3]} alt={`news_3`} width={1920} height={1080} priority={true} style={imageStyle} className='image'/>
      </div>
    </div>
  </div>)
}

export default ElevatorBigNews
