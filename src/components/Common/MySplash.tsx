"use client"
import { NextPage } from "next";
import { useState, useEffect, CSSProperties } from "react"
import OptimizedImage from '@/components/Common/OptimizedImage'
import { myApp, myAppNumber } from "@/utils/constants";

/**
 * Interface for splash screen component props
 * Defines the properties required for rendering splash screen
 */
interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

/**
 * Splash screen component for the app
 * Shows a loading or introductory animation with fade effects
 * Provides smooth transition and responsive design
 */

// Splash screen component for app loading animation
const MySplash: NextPage<Props> = ({appNumber, width, isJa}) => {
  
  // Animation state management
  const [isLoad, setIsLoad] = useState(true);
  const [isVanish, setIsVanish] = useState(false)
  
  // Handle splash screen animation timing
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false)
      setTimeout(() => {setIsVanish(true)}, 1000);
    }, 1000);
  }, []);

  // Get app data for splash screen
  const title = myApp(width, isJa)[appNumber].text.title;
  const icon = myApp(width, isJa)[appNumber].icon;

  // Container style with full screen overlay and fade animation
  const splashStyle: CSSProperties = {
    position: 'fixed', 
    width: '100vw', 
    height: '100vh', 
    top: 0, 
    left: 0, 
    zIndex: 999, 
    display: isVanish ? 'none': undefined, 
    opacity: isLoad ? 1: 0, 
    transition: 'all 3s ease',    
  }

  // Same height for Home and others (100px); Home keeps aspect ratio by width
  const isHome = appNumber === myAppNumber.home;
  const iconWidth = isHome ? Math.round((1082 * 100) / 630) : 100; // 1082:630 aspect

  // Icon style: must match display size so image is not constrained by CSS
  const iconStyle: CSSProperties = {
    position: 'absolute',
    width: iconWidth,
    height: 'auto',
    zIndex: 1000,
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div className="dark_container" style={splashStyle}>
      {/* Splash screen app icon */}
      <OptimizedImage
        src={icon}
        alt={title}
        width={iconWidth}
        height={100}
        fetchPriority="high"
        style={iconStyle}
      />
    </div>
  )
}

export default MySplash


