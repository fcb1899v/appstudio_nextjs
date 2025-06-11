import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { myBadge } from '@/utils/constants'
import { CSSProperties } from 'react'

interface Props {
  width: number
}

const ShoppingButton: NextPage<Props> = ({width}) => {
  const badgesStyle: CSSProperties = {
    columnGap: 20, 
    marginBottom: 10
  }
  const appStyle: CSSProperties = {
    width: width < 600 ? "44vw": 180, 
    maxWidth: 180, 
    height: "auto",
    maxHeight: "auto"
  }

  const appLinks = [
    "https://apps.apple.com/us/app/lets-elevator/id1604124583",
    "https://play.google.com/store/apps/details?id=nakajimamasao.appstudio.letselevator"
  ];

  return <div className="flex_center" style={badgesStyle}>
    {myBadge.map((badge, i) => 
      <Link href={appLinks[i]} key={`badge_${i}`}>
        <Image src={badge.image} style={appStyle} alt={badge.title} width={360} height={160} priority={true}/>
      </Link>
    )}
  </div>
}

export default ShoppingButton