"use client"
import { NextPage } from "next";
import React, { useState, useEffect, CSSProperties } from "react"
import Image from "next/image"
import { myApp } from "../../public/utils/constants";

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const MySplash: NextPage<Props> = ({appNumber, width, isJa}) => {
  
  const [isLoad, setIsLoad] = useState(true);
  const [isVanish, setIsVanish] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false)
      setTimeout(() => {setIsVanish(true)}, 1000);
    }, 1000);
  }, []);

  const title = myApp(width, isJa)[appNumber].text.title;
  const icon = myApp(width, isJa)[appNumber].icon;

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

  const iconStyle: CSSProperties = {
    position: 'absolute', 
    width: (appNumber == 0) ? 200: 100,
    height: "auto",
    zIndex: 1000, 
    top: '45%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)'
  }

  return <div className="dark_container" style={splashStyle}>
    <Image src={icon} alt={title} width={256} height={256} priority={true} style={iconStyle}/>
  </div>
}

export default MySplash


