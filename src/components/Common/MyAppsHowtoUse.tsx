import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties, useRef, useEffect } from 'react'
import { myApp, isSP } from '@/utils/constants'

/**
 * Interface for how to use component props
 * Defines the properties required for rendering how to use section
 */
interface Props {
  appNumber: number
  width: number
  isJa: boolean
  maxWidth: number
}

/**
 * Component for displaying how to use instructions
 * Shows usage guide with image for each app
 * Provides responsive layout and localized content
 */

// How to use component for app instructions
const MyAppsHowtoUse: NextPage<Props> = ({appNumber, width, isJa, maxWidth}) => {

  // Get localized title and app configuration
  const title = isJa ? "＜使い方＞": "HOW TO USE";
  const titleFont = myApp(width, isJa)[appNumber].font.title;
  const howtouse = myApp(width, isJa)[appNumber].image.howtouse;

  // Convert howtouse to array if it's a string
  const howtouseArray = Array.isArray(howtouse) ? howtouse : (howtouse ? [howtouse] : []);

  // Refs for video elements to control playback
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, howtouseArray.length);
  }, [howtouseArray.length]);

  // Handle video play event - stop other videos when one starts playing
  const handleVideoPlay = (currentIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex && !video.paused) {
        video.pause();
      }
    });
  };

  // Hide component if how to use content is not available
  if (!howtouse || howtouse === "" || howtouse === "/" || howtouseArray.length === 0) {
    return <div style={{ height: isSP(width) ? "30px" : "40px" }}></div>;
  }

  // Container style with dynamic colors and responsive padding
  const howtouseStyle = {
    color: myApp(width, isJa)[appNumber].color.title,
    backgroundColor: myApp(width, isJa)[appNumber].color.howtouse,
    padding: isSP(width) ? "15px 0" : "20px 0",
    width: "100%",
  }
  
  // Title style with responsive font size and centered alignment
  const titleStyle: CSSProperties = { 
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    fontWeight: isJa ? "bold": "normal", 
    textAlign: "center", 
    margin: "20px 0",
  };
  
  // Determine if we should use horizontal layout (PC with multiple items)
  const useHorizontalLayout = !isSP(width) && howtouseArray.length > 1;

  // Container style for multiple media items - horizontal layout on PC, vertical on mobile
  const mediaContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: useHorizontalLayout ? "row" : "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: isSP(width) ? "10px" : "20px",
    padding: isSP(width) ? "0 10px" : "0 20px",
    maxWidth: useHorizontalLayout ? maxWidth : "100%",
    margin: "0 auto",
  }

  // Image/Video style with responsive sizing and contain object fit
  const mediaStyle: CSSProperties = {
    maxWidth: useHorizontalLayout ? `calc((100% - ${(howtouseArray.length - 1) * 20}px) / ${howtouseArray.length})` : (isSP(width) ? "95%" : maxWidth),
    width: useHorizontalLayout ? "auto" : (isSP(width) ? "100%" : "100%"),
    maxHeight: isSP(width) ? "400px" : "600px",
    objectFit: "contain" as const,
    padding: isSP(width) ? "5px 0" : "10px 0",
    display: "block",
    flex: useHorizontalLayout ? "1 1 0" : "none",
    minWidth: useHorizontalLayout ? "200px" : "auto",
  }

  // Check if file is a video by extension
  const isVideo = (url: string) => {
    return url.toLowerCase().endsWith('.mp4') || 
           url.toLowerCase().endsWith('.webm') || 
           url.toLowerCase().endsWith('.ogg');
  }

  return (
    <div style={howtouseStyle}>
      {/* How to use title */}
      <h2 className={titleFont} style={titleStyle}>{title}</h2>
      
      {/* Container for multiple media items */}
      <div style={mediaContainerStyle}>
        {/* How to use instruction media (image or video) */}
        {howtouseArray.map((item, index) => {
          if (isVideo(item)) {
            return (
              <video
                key={index}
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={item}
                controls
                style={mediaStyle}
                className="howtouse-video"
                onPlay={() => handleVideoPlay(index)}
              >
                Your browser does not support the video tag.
              </video>
            );
          } else {
            return (
              <Image
                key={index}
                src={item}
                alt={`howtouse ${index + 1}`}
                width={1920}
                height={1080}
                priority={index === 0}
                className="image"
                style={mediaStyle}
              />
            );
          }
        })}
      </div>
    </div>
  )
}

export default MyAppsHowtoUse
