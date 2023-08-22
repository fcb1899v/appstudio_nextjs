import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { isSP, myApp, myBadge} from '../../public/utils/constants'
import { CSSProperties } from 'react'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const MyAppsBadges: NextPage<Props> = ({appNumber, width, isJa}) => {

  const iosStyle: CSSProperties = {
    width: isSP(width) ? "40vw": 162, 
    maxWidth: 162, 
    height: "auto"
  }
  const androidStyle: CSSProperties = {
    width: isSP(width) ? "44vw": 180, 
    maxWidth: 180, 
    height: "auto"
  }

  return <div className="flex_center" style={{columnGap: 20, marginBottom: 10}}>
    <Link href={myApp(width, isJa)[appNumber].link.ios} key={`iosLink_${appNumber}`}>
      <Image src={myBadge[0].image} style={iosStyle} alt={myBadge[0].title} width={162} height={80} priority={true}/>
    </Link>
    <Link href={myApp(width, isJa)[appNumber].link.android} key={`androidLink_${appNumber}`}>
      <Image src={myBadge[1].image} style={androidStyle} alt={myBadge[1].title} width={162} height={80} priority={true}/>
    </Link>
  </div>
}

export default MyAppsBadges
