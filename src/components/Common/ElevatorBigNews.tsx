import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties, useEffect, useRef } from 'react'
import { isPC, isSP, myApp, myAppNumber } from '@/utils/constants';

/**
 * Interface for elevator big news component props
 * Defines the properties required for rendering elevator news section
 */
interface Props {
  width: number
  isJa: boolean
}

/**
 * Component for displaying big news or announcements for the Elevator app
 * Shows special features and Twitter integration
 * @param width - Screen width for responsive design
 * @param isJa - Language preference (Japanese or English)
 */
const ElevatorBigNews: NextPage<Props> = ({width, isJa}) => {

  // App number for elevator app
  const appNumber = myAppNumber.elevator
  // Twitter post ID for embedding
  const twitterLinkId = "1450698944393007107"
  // Localized text for different features
  const buttonsMode = isJa ? "1000のボタンモード": "1000 Buttons Mode";
  const howtoChange = isJa ? "モード変更方法": "How to change the mode";
  const reproduceMode = isJa ? "再現！1000のボタン": "Reproduce! 1000 Buttons";
  const challenge = isJa ? "30秒チャレンジ": "30 Second Challenge";
  const bigNews = myApp(width, isJa)[appNumber].text.features;
  const bigNewsImage = myApp(width, isJa)[appNumber].image.features;
  const headerFont = myApp(width, isJa)[appNumber].font.header
  const titleFont = myApp(width, isJa)[appNumber].font.title;

  const twitterRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize Twitter embed when component mounts
   * Creates and configures Twitter widget for embedding
   */
  useEffect(() => {
    if (!twitterRef.current) return;
    // Clear existing embed
    twitterRef.current.innerHTML = '';
    // Add blockquote element
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'twitter-tweet';
    blockquote.setAttribute('data-lang', isJa ? 'ja' : 'en');
    blockquote.style.margin = 'auto';
    blockquote.style.textAlign = 'center';
    blockquote.style.display = 'block';
    blockquote.style.marginLeft = 'auto';
    blockquote.style.marginRight = 'auto';
    blockquote.style.width = '100%';
    blockquote.style.maxWidth = '550px';
    blockquote.innerHTML = `<a href='https://twitter.com/x/status/${twitterLinkId}?ref_src=twsrc%5Etfw'></a>`;
    twitterRef.current.appendChild(blockquote);
    // Add Twitter widget script
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    script.setAttribute('async', 'true');
    twitterRef.current.appendChild(script);
  }, [isJa]);

  /**
   * Style for the big news container
   * Applies dynamic colors and full width layout
   */
  const bigNewsStyle: CSSProperties = {
    width: "100vw", 
    color: myApp(width, isJa)[appNumber].color.title, 
    background: myApp(width, isJa)[appNumber].color.features, 
    padding: "20px 0"
  }
  const messageStyle: CSSProperties = {
    fontSize: (!isJa && isSP(width)) ? 16: 18, 
    textAlign: "center", 
    margin: 5
  }
  const twitterStyle: CSSProperties = {
    margin: '20px auto', 
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    textAlign: 'center',
    boxSizing: 'border-box',
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
    paddingTop: isPC(width) ? 30: 40,
  };
  const h3Style: CSSProperties = {
    fontSize: 20, 
    fontWeight: isJa ? "bold": "normal", 
    textAlign: "center", 
    textDecoration: "underline", 
    padding: isPC(width) ? "10px 0": "30px 0 10px 0",
  };
  const tallImageStyle: CSSProperties = {
    maxWidth: 540, 
    padding: "0 60px"
  }
  const imageStyle: CSSProperties = {
    maxWidth: 640, 
  };

  return <div style={bigNewsStyle}>
    <h1 className={headerFont} style={h1Style}>BIG NEWS</h1>
    {bigNews.map((news, i) => <div className="flex_center_wrap" key={`news_${i}`}>
      {news.map((_, j) => <p key={`news_${i}_${j}`} style={messageStyle}>{news[j]}</p>)}
    </div>)}
    <div style={twitterStyle} ref={twitterRef}></div>
    <h2 className={titleFont} style={h2Style}>{buttonsMode}</h2>
    <div className="flex_center_wrap" style={containerStyle(20)}>
      <Image src={bigNewsImage[0]} alt={`news_0`} width={1920} height={1080} priority={true} style={tallImageStyle} className='image'/>
      <div>
        <h3 style={h3Style}>{howtoChange}</h3>
        <Image src={bigNewsImage[1]} alt={`news_1`} width={1920} height={1080} priority={true} style={imageStyle} className='image'/>
      </div>
    </div>
    <h2 className={titleFont} style={h2Style}>{reproduceMode}</h2>
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
  </div>
}

export default ElevatorBigNews
