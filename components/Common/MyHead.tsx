import type {NextPage} from 'next'
import Head from 'next/head'
import { GA_TRACKING_ID } from '../../lib/gtag'
import { myApp } from '../../public/utils/constants'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const MyHead: NextPage<Props> = ({ appNumber, width, isJa })  => {

  const title = myApp(width, isJa)[appNumber].text.title!
  const folder = myApp(width, isJa)[appNumber].folder!
  const color = myApp(width, isJa)[appNumber].color.header
  const description = myApp(width, isJa)[appNumber].text.message!.map((list) => list.join('')).join(' ');
  const urlHeader = "https://nakajimamasao-appstudio.web.app"

  return (
    <Head>      
      <title>{title}</title>
      <meta http-equiv="X-UA-Compatible" content={`IE=edge,chrome=1`} />
      <meta name="description" content={description} />
      <meta name="viewport" content={`width=device-width,initial-scale=1.0`} />
      <meta name="format-detection" content={`email=no,telephone=no,address=no`} />
      <meta name="author" content={`2023 Nakajima Masao`} />
      <meta name="keywords" content="app, studio, nakajima, masao, レッツ・エレベーター, LETS ELEVATOR, 中島, 正雄" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title}/>
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${urlHeader}/${folder}`} />
      <meta property="og:image" content={`/images/${folder}/logo.png`} />
      <meta property="og:locale" content={`ja_JP`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={`${urlHeader}/${folder}`} />
      <meta name="twitter:site" content="@letselevator" />
      <meta name="twitter:creator" content="@Nakajima_Masao" />
      <meta name="twitter:image" content={`/images/${folder}/introduction_${isJa ? "ja": "en"}.png`} />
      <meta name="msapplication-square70x70logo" content={`/images/${folder}/favicons/site-tile-70x70.png`} />
      <meta name="msapplication-square150x150logo" content={`/images/${folder}/favicons/site-tile-150x150.png`} />
      <meta name="msapplication-wide310x150logo" content={`/images/${folder}/favicons/site-tile-310x150.png`} />
      <meta name="msapplication-square310x310logo" content={`/images/${folder}/favicons/site-tile-310x310.png`} />
      <meta name="msapplication-TileColor" content={color}/>
      <meta name="theme-color" content={color}/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <link rel="canonical" href={`${urlHeader}/${folder}`} />
      <link rel="icon" href={`${urlHeader}/images/${folder}/favicons/favicon.ico`}/>
      <link rel="shortcut icon" href={`${urlHeader}/images/${folder}/favicons/favicon.ico`} />
      <link rel="apple-touch-icon" sizes="57x57" href={`/images/${folder}/favicons/apple-touch-icon-57x57.png`} />
      <link rel="apple-touch-icon" sizes="60x60" href={`/images/${folder}/favicons/apple-touch-icon-60x60.png`} />
      <link rel="apple-touch-icon" sizes="72x72" href={`/images/${folder}/favicons/apple-touch-icon-72x72.png`} />
      <link rel="apple-touch-icon" sizes="76x76" href={`/images/${folder}/favicons/apple-touch-icon-76x76.png`} />
      <link rel="apple-touch-icon" sizes="114x114" href={`/images/${folder}/favicons/apple-touch-icon-114x114.png`} />
      <link rel="apple-touch-icon" sizes="120x120" href={`/images/${folder}/favicons/apple-touch-icon-120x120.png`} />
      <link rel="apple-touch-icon" sizes="144x144" href={`/images/${folder}/favicons/apple-touch-icon-144x144.png`} />
      <link rel="apple-touch-icon" sizes="152x152" href={`/images/${folder}/favicons/apple-touch-icon-152x152.png`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`/images/${folder}/favicons/apple-touch-icon-180x180.png`} />
      <link rel="apple-touch-icon" type="image/png" href={`/images/${folder}/favicons/apple-touch-icon-180x180.png`} />
      <link rel="icon" type="image/png" sizes="36x36" href={`/images/${folder}/favicons/android-chrome-36x36.png`} />
      <link rel="icon" type="image/png" sizes="48x48" href={`/images/${folder}/favicons/android-chrome-48x48.png`} />
      <link rel="icon" type="image/png" sizes="72x72" href={`/images/${folder}/favicons/android-chrome-72x72.png`} />
      <link rel="icon" type="image/png" sizes="96x96" href={`/images/${folder}/favicons/android-chrome-96x96.png`} />
      <link rel="icon" type="image/png" sizes="128x128" href={`/images/${folder}/favicons/android-chrome-128x128.png`} />
      <link rel="icon" type="image/png" sizes="144x144" href={`/images/${folder}/favicons/android-chrome-144x144.png`} />
      <link rel="icon" type="image/png" sizes="152x152" href={`/images/${folder}/favicons/android-chrome-152x152.png`} />
      <link rel="icon" type="image/png" sizes="192x192" href={`/images/${folder}/favicons/android-chrome-192x192.png`} />
      <link rel="icon" type="image/png" sizes="256x256" href={`/images/${folder}/favicons/android-chrome-256x256.png`} />
      <link rel="icon" type="image/png" sizes="384x384" href={`/images/${folder}/favicons/android-chrome-384x384.png`} />
      <link rel="icon" type="image/png" sizes="512x512" href={`/images/${folder}/favicons/android-chrome-512x512.png`} />
      <link rel="icon" type="image/png" sizes="36x36" href={`/images/${folder}/favicons/icon-36x36.png`} />
      <link rel="icon" type="image/png" sizes="48x48" href={`/images/${folder}/favicons/icon-48x48.png`} />
      <link rel="icon" type="image/png" sizes="72x72" href={`/images/${folder}/favicons/icon-72x72.png`} />
      <link rel="icon" type="image/png" sizes="96x96" href={`/images/${folder}/favicons/icon-96x96.png`} />
      <link rel="icon" type="image/png" sizes="128x128" href={`/images/${folder}/favicons/icon-128x128.png`} />
      <link rel="icon" type="image/png" sizes="144x144" href={`/images/${folder}/favicons/icon-144x144.png`} />
      <link rel="icon" type="image/png" sizes="152x152" href={`/images/${folder}/favicons/icon-152x152.png`} />
      <link rel="icon" type="image/png" sizes="160x160" href={`/images/${folder}/favicons/icon-160x160.png`} />
      <link rel="icon" type="image/png" sizes="192x192" href={`/images/${folder}/favicons/icon-192x192.png`} />
      <link rel="icon" type="image/png" sizes="196x196" href={`/images/${folder}/favicons/icon-196x196.png`} />
      <link rel="icon" type="image/png" sizes="256x256" href={`/images/${folder}/favicons/icon-256x256.png`} />
      <link rel="icon" type="image/png" sizes="384x384" href={`/images/${folder}/favicons/icon-384x384.png`} />
      <link rel="icon" type="image/png" sizes="512x512" href={`/images/${folder}/favicons/icon-512x512.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`/images/${folder}/favicons/icon-16x16.png`} />
      <link rel="icon" type="image/png" sizes="24x24" href={`/images/${folder}/favicons/icon-24x24.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`/images/${folder}/favicons/icon-32x32.png`} />
      <link rel="icon" type="image/png" href={`/images/${folder}/favicons/icon-192x192.png`} />
      <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE}`} cross-origin="anonymous"></script>
    </Head>
  )
}

export default MyHead