import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { isPC, myApp } from '@/utils/constants'
import MyAppsBadges from './MyAppsBadges'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const MyAppsTop: NextPage<Props> = ({appNumber, width, isJa}) => {

  const stringIsJa = isJa ? "ja": "en";
  const introImage = `/images/${myApp(width, isJa)[appNumber].folder}/introduction_${stringIsJa}.png`;
  const introLink = myApp(width, isJa)[appNumber].link.link
  const introWidth = isPC(width) ? 964: undefined

  return <div>
    <Link href={introLink} key={`appLink`}>
      <Image src={introImage} alt={`applogo`} width={1920} height={1080} priority={true} style={{width: introWidth}}/>
    </Link>
    <MyAppsBadges appNumber={appNumber} width={width} isJa={isJa}/>
  </div>
}

export default MyAppsTop
