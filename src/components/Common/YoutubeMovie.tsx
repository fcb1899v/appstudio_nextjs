import { NextPage } from 'next';
import YouTube from 'react-youtube';
import { isSP, myApp } from '@/utils/constants';
import { CSSProperties } from 'react';

/**
 * Interface for YouTube movie component props
 * Defines the properties required for rendering YouTube videos
 */
interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

/**
 * Component for embedding a YouTube video
 * Displays YouTube video player with analytics tracking
 * @param appNumber - App identifier for dynamic content
 * @param width - Screen width for responsive design
 * @param isJa - Language preference (Japanese or English)
 */
const YoutubeMovie: NextPage<Props> = ({appNumber, width, isJa}) => {
      
  const videoId = myApp(width, isJa)[appNumber].link.youtube

  // Hide component if YouTube link is empty or invalid
  if (!videoId || videoId === "/" || videoId === "") {
    return <div style={{ height: isSP(width) ? "20px" : "40px" }}></div>;
  }

  /**
   * Style for YouTube video container
   * Responsive styling for different screen sizes
   */
  const youtubeStyle: CSSProperties = {
    margin: isSP(width) ? "10px auto": "20px auto", 
    width: "100vw", 
    maxWidth: isSP(width) ? "95%" : 600,
    padding: isSP(width) ? "0 10px" : "0"
  }

  /**
   * YouTube player configuration
   * Controls player behavior and appearance
   */
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
