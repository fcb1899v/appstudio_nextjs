import { NextPage } from 'next';
import YouTube from 'react-youtube';
import { isSP, myApp } from '@/utils/constants';
import { CSSProperties } from 'react';

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}
  
const YoutubeMovie: NextPage<Props> = ({appNumber, width, isJa}) => {
      
  const videoId = myApp(width, isJa)[appNumber].link.youtube

  // youtubeリンクが"/"または空の場合は非表示
  if (!videoId || videoId === "/" || videoId === "") {
    return <div style={{ height: isSP(width) ? "20px" : "40px" }}></div>;
  }

  const youtubeStyle: CSSProperties = {
    margin: isSP(width) ? "10px auto": "20px auto", 
    width: "100vw", 
    maxWidth: isSP(width) ? "95%" : 600,
    padding: isSP(width) ? "0 10px" : "0"
  }

  const playerVars = {
    controls: 0, 
    showinfo: 0, 
    loop: 1, 
    rel: 0, 
    enablejsapi: 1
  }
  
  return <div style={youtubeStyle}>
    <YouTube videoId={videoId} className="youtube" opts={{playerVars: playerVars}}
      onPlay={() => {gtag('event', 'youtube', { event_category: 'elevator', event_label: 'ja', value: 1 })}}
    />
  </div>
}
  


export default YoutubeMovie;
