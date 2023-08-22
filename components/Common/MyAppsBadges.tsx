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

  const appLink = [
    myApp(width, isJa)[appNumber].link.ios,
    myApp(width, isJa)[appNumber].link.android,
  ]
  const badgesStyle: CSSProperties = {
    columnGap: 20, 
    marginBottom: 10
  }
  const appStyle = (i: number): CSSProperties => ({
    width: (i == 0) ? (isSP(width) ? "40vw": 162): (isSP(width) ? "44vw": 180), 
    maxWidth: (i == 0) ? 162: 180, 
    height: "auto"
  })

  return <div className="flex_center" style={badgesStyle}>
    {myBadge.map((badge, i) => <Link href={appLink[i]} key={`app_${i}`}>
      <Image src={badge.image} style={appStyle(i)} alt={badge.title} width={162} height={80} priority={true}/>
    </Link>)}
  </div>
}

export default MyAppsBadges
