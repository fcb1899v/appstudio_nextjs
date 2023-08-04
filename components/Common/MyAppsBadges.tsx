import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { myApp, myBadge} from '../../public/utils/constants'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const MyAppsBadges: NextPage<Props> = ({appNumber, width, isJa}) => {

  const isSP = (width < 540);
  const badgeWidth = [(isSP ? "40vw": 162), (isSP ? "44vw": 180)];
  const badgeMaxWidth = [162, 180];

  return (<div>
    <div className="flex_center" style={{columnGap: 20, marginBottom: 10}}>
      <Link href={myApp(width, isJa)[appNumber].link.ios} key={`iosLink_${appNumber}`}>
        <Image src={myBadge[0].image} alt={myBadge[0].title} width={162} height={80} priority={true}
          style={{width: badgeWidth[0], maxWidth: badgeMaxWidth[0], height: "auto"}} key={`iosImage_${appNumber}`}
        />
      </Link>
      <Link href={myApp(width, isJa)[appNumber].link.android} key={`androidLink_${appNumber}`}>
        <Image src={myBadge[1].image} alt={myBadge[1].title} width={162} height={80} priority={true}
          style={{width: badgeWidth[1], maxWidth: badgeMaxWidth[1], height: "auto"}} key={`androidImage_${appNumber}`}
        />
      </Link>
    </div>
  </div>)
}

export default MyAppsBadges
