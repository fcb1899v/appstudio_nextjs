import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties, useState } from 'react'
import { isPC, myApp, myAppNumber } from '@/utils/constants'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const AppScreenshots: NextPage<Props> = ({appNumber, width, isJa}) => {
  const [selectedImage, setSelectedImage] = useState(0)
  
  // 各アプリのスクリーンショット配列
  const getScreenshots = () => {
    const screenshots = {
      [myAppNumber.elevator]: [
        '/images/elevator/screenshots/screen1.png',
        '/images/elevator/screenshots/screen2.png',
        '/images/elevator/screenshots/screen3.png',
        '/images/elevator/screenshots/screen4.png',
        '/images/elevator/screenshots/screen5.png',
      ],
      [myAppNumber.elevatorNeo]: [
        '/images/elevatorneo/screenshots/screen1.png',
        '/images/elevatorneo/screenshots/screen2.png',
        '/images/elevatorneo/screenshots/screen3.png',
        '/images/elevatorneo/screenshots/screen4.png',
      ],
      [myAppNumber.crossing]: [
        '/images/crossing/screenshots/screen1.png',
        '/images/crossing/screenshots/screen2.png',
        '/images/crossing/screenshots/screen3.png',
      ],
      [myAppNumber.signal]: [
        '/images/signal/screenshots/screen1.png',
        '/images/signal/screenshots/screen2.png',
        '/images/signal/screenshots/screen3.png',
      ],
      [myAppNumber.toilet]: [
        '/images/toilet/screenshots/w0.png',
        '/images/toilet/screenshots/w1.png',
        '/images/toilet/screenshots/w5.png',
      ],
      [myAppNumber.allowance]: [
        '/images/allowance/screenshots/screen1.png',
        '/images/allowance/screenshots/screen2.png',
        '/images/allowance/screenshots/screen3.png',
      ],
      [myAppNumber.phonics]: [
        '/images/phonics/screenshots/screen1.png',
        '/images/phonics/screenshots/screen2.png',
        '/images/phonics/screenshots/screen3.png',
      ],
      [myAppNumber.japanese]: [
        '/images/japanese/screenshots/screen1.png',
        '/images/japanese/screenshots/screen2.png',
        '/images/japanese/screenshots/screen3.png',
      ],
    }
    
    return screenshots[appNumber] || []
  }

  const screenshots = getScreenshots()
  
  if (screenshots.length === 0) {
    return null
  }

  const containerStyle: CSSProperties = {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: myApp(width, isJa)[appNumber].color.features,
  }

  const titleStyle: CSSProperties = {
    textAlign: 'center',
    fontSize: isPC(width) ? 32 : 24,
    fontWeight: 'bold',
    color: myApp(width, isJa)[appNumber].color.title,
    marginBottom: 30,
  }

  const mainImageStyle: CSSProperties = {
    width: '100%',
    maxWidth: isPC(width) ? 400 : 300,
    height: 'auto',
    borderRadius: 20,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    margin: '0 auto 20px auto',
    display: 'block',
    transition: 'transform 0.3s ease',
  }

  const thumbnailContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: 15,
    flexWrap: 'wrap',
    marginTop: 20,
  }

  const thumbnailStyle = (index: number): CSSProperties => ({
    width: isPC(width) ? 80 : 60,
    height: isPC(width) ? 160 : 120,
    borderRadius: 10,
    cursor: 'pointer',
    border: selectedImage === index ? '3px solid #007AFF' : '2px solid transparent',
    transition: 'all 0.3s ease',
    opacity: selectedImage === index ? 1 : 0.7,
  })

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index)
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        {isJa ? 'スクリーンショット' : 'Screenshots'}
      </h2>
      
      <Image 
        src={screenshots[selectedImage]} 
        alt={`Screenshot ${selectedImage + 1}`}
        width={400} 
        height={800} 
        priority={true}
        style={mainImageStyle}
        className="hover:scale-105 transition-transform duration-300"
      />
      
      <div style={thumbnailContainerStyle}>
        {screenshots.map((screenshot, index) => (
          <Image
            key={index}
            src={screenshot}
            alt={`Thumbnail ${index + 1}`}
            width={80}
            height={160}
            style={thumbnailStyle(index)}
            onClick={() => handleThumbnailClick(index)}
            className="hover:scale-110 transition-transform duration-200"
          />
        ))}
      </div>
    </div>
  )
}

export default AppScreenshots 