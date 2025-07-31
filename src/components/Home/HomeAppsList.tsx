import type { NextPage } from 'next'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { isPC, isSP, myApp, myAppNumber, myBadge} from '@/utils/constants'

interface Props {
  width: number
  height: number
  isJa: boolean
}

const MyAppsList: NextPage<Props> = ({width, height, isJa}) => {
  const [expandNumber, setIsExpandNumber] = useState<number | null>(null);
  const [expandTop, setExpandTop] = useState(110);
  
  const handleTap = (number: number, event: React.MouseEvent<HTMLDivElement>) => {
    const touchY = isSP(width) ? event.clientY - 130: 110;
    const expandHeight = 0.5474 * width + 212.59;
    const maxExpandY = height - expandHeight - 30;
    setExpandTop(!isSP(width) ? 110: touchY > maxExpandY ? maxExpandY: touchY < 110 ? 110: touchY);
    setIsExpandNumber(number);
  };

  const appNumber = myApp(width, isJa).length;
  const appRow = Math.floor(width / 300) < appNumber ? Math.floor(width / 300): appNumber;
  const stringIsJa = isJa ? "ja": "en";

  const expandTitle = expandNumber !== null ? myApp(width, isJa)[expandNumber].text.menu : "";
  const expandTitleFont = expandNumber !== null ? myApp(width, isJa)[expandNumber].font.title : "";
  const expandImage = expandNumber !== null ? `/images/${myApp(width, isJa)[expandNumber].folder}/introduction_${stringIsJa}.png` : "";
  const expandLink = expandNumber !== null ? myApp(width, isJa)[expandNumber].link.link : "";
  const expandIos = expandNumber !== null ? myApp(width, isJa)[expandNumber].link.ios : "";
  const expandAndroid = expandNumber !== null ? myApp(width, isJa)[expandNumber].link.android : "";
  const expandButton = isJa ? "詳細を見る": "View details"

  const appClass = "relative hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30";

  return (
    <div>
      <div 
        style={{
          color: "white",
          display: "grid",
          placeItems: "center",
          padding: isPC(width) ? "30px 100px" : "30px 0",
          marginTop: 70,
          marginBottom: 100,
          gridTemplateColumns: `repeat(${appRow}, 1fr)`,
        }}
      >
        {myApp(width, isJa).map((myApp, i) => 
          (i != myAppNumber.home) && (
            <div 
              onClick={(event) => handleTap(i, event)} 
              key={`apps_${i}`} 
              className={`${appClass}`}
              style={{
                margin: "0 auto",
                padding: 30
              }}
            >
              <h2 style={{
                fontSize: myApp.size.menu,
                fontWeight: (myApp.font.menu == undefined) ? 'bold': 'normal', 
                fontFamily: myApp.font.menu,
                textAlign: "center", 
                whiteSpace: "nowrap",
                marginBottom: '1rem',
              }}>
                {myApp.text.menu}
              </h2>
              <Image 
                src={`/images/${myApp.folder}/icon.png`} 
                alt={myApp.text.menu} 
                width={300} 
                height={300} 
                priority={true} 
                style={{
                  width: 120,
                  height: "auto",
                  margin: "0 auto"
                }}
              />
            </div>
          )
        )}
      </div>
      
      {(expandNumber !== null && expandNumber !== myAppNumber.home) && (
        <div 
          onClick={(event) => handleTap(myAppNumber.home, event)} 
          style={{
            position: "fixed",
            borderRadius: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            boxShadow: "0px 0px 50px rgba(255, 255, 255, 0.3)",
            animation: "fadeInScale 0.5s ease-in-out",
            padding: 30,
            top: expandTop, 
            left: isPC(width) ? "25vw": "3vw",
            width: isPC(width) ? "50vw": "94vw", 
            height: "auto", 
            opacity: 1, 
          }}
        >
          <h2 
            className={expandTitleFont} 
            style={{
              color: "white",
              fontSize: expandNumber !== null && (myApp(width, isJa)[expandNumber].font.menu == undefined) ? '1.5rem': '1.8rem', 
              fontWeight: (myApp(width, isJa)[expandNumber].font.menu == undefined) ? 'bold': 'normal', 
              textAlign: "center", 
              marginBottom: '1rem', 
            }}
          >
            {expandTitle}
          </h2>
          
          <a href={expandLink} onClick={(e) => e.stopPropagation()}>
            <Image 
              src={expandImage} 
              alt={`image_${expandNumber}`} 
              width={1920} 
              height={1080} 
              priority={true} 
              style={{
                margin: "20px auto",
                width: "auto",
                maxHeight: 250
              }}
            />
          </a>
          
          <div className="flex_center" style={{
            gap: 20,
            padding: "10px 0"
          }}>
            <Link href={expandIos} onClick={(e) => e.stopPropagation()}>
              <Image 
                src={myBadge[0].image} 
                alt={myBadge[0].title} 
                width={162} 
                height={80} 
                priority={true} 
                style={{
                  width: isSP(width) ? "36vw": 162, 
                  maxWidth: 162, 
                  height: "auto"
                }}
              />
            </Link>
            <Link href={expandAndroid} onClick={(e) => e.stopPropagation()}>
              <Image 
                src={myBadge[1].image} 
                alt={myBadge[1].title} 
                width={162} 
                height={80} 
                priority={true} 
                style={{
                  width: isSP(width) ? "40vw": 180, 
                  maxWidth: 180, 
                  height: "auto"
                }}
              />
            </Link>
          </div>
          
          <a href={expandLink} onClick={(e) => e.stopPropagation()}>
            <div style={{
              height: 30,
              margin: "15px auto 5px auto",
              backgroundColor: "white",
              borderRadius: 15,
              color: "#383635",
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
              maxWidth: 450
            }}>
              {expandButton}
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default MyAppsList
