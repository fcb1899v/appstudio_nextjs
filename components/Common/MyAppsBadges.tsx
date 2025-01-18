import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { isSP, myApp, myAppNumber, myBadge} from '../../public/utils/constants'
import { CSSProperties } from 'react'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const MyAppsBadges: NextPage<Props> = ({appNumber, width, isJa}) => {

  const folder = myApp(width, isJa)[appNumber].folder;

  const handleButtonClick = (buttonName: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'button_click',
        eventCategory: 'Button',
        eventAction: 'Click',
        eventLabel: buttonName,
      });
    }
    console.log(`button_click:${buttonName}`)
  };

  const appLink = [
    myApp(width, isJa)[appNumber].link.ios,
    myApp(width, isJa)[appNumber].link.android,
  ]
  const badgesStyle: CSSProperties = {
    columnGap: 20, 
    marginBottom: 10
  }
  const appStyle = (i: number): CSSProperties => ({
    width: (i == myAppNumber.home) ? (isSP(width) ? "40vw": 162): (isSP(width) ? "44vw": 180), 
    maxWidth: (i == myAppNumber.home) ? 162: 180, 
    height: "auto",
    maxHeight: "auto"
  })

  const buttonName = (i: number): string => `${folder}_${i == 0 ? "iOS": "Android"}_${isJa ? "ja_": "_"}open`

  return <div className="flex_center" style={badgesStyle}>
    {myBadge.map((badge, i) => 
      <Link href={appLink[i]} key={`app_${i}`} onClick={(_) => {handleButtonClick(buttonName(i));}}>
        <Image src={badge.image} style={appStyle(i)} alt={badge.title} width={360} height={160} priority={true}/>
      </Link>
    )}
  </div>
}

export default MyAppsBadges
