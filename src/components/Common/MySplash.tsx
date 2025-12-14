"use client"
import { NextPage } from "next";
import { useState, useEffect, CSSProperties } from "react"
import Image from "next/image"
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

  // Icon style with centered positioning and responsive size
  const iconStyle: CSSProperties = {
    position: 'absolute', 
    width: (appNumber == myAppNumber.home) ? 200: 100,
    height: "auto",
    zIndex: 1000, 
    top: '45%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)'
  }

  return (
    <div className="dark_container" style={splashStyle}>
      {/* Splash screen app icon */}
      <Image src={icon} alt={title} width={256} height={256} priority={true} style={iconStyle}/>
    </div>
  )
}

export default MySplash


