import type { NextPage } from 'next';
import Script from 'next/script';
import Head from 'next/head';
import { myApp } from '../../public/utils/constants';

interface Props {
  appNumber: number;
  width: number;
  isJa: boolean;
}

const MyHead: NextPage<Props> = ({ appNumber, width, isJa }) => {

  const appData = myApp(width, isJa)[appNumber];
  const { text, folder, color } = appData;
  const title = text.title!;
  const description = text.message!.map((list) => list.join('')).join(' ');
  const urlHeader = "https://nakajimamasao-appstudio.web.app";
  const client = process.env.NEXT_PUBLIC_ADSENSE;
  const adsenseLink = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;

  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const RECAPTCHA_SECRET_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY || "";
  
  return (
    <>
      <Head>
        {/* 基本メタ情報 */}
        <title>{title}</title>
        <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="format-detection" content="email=no,telephone=no,address=no" />
        <meta name="author" content="2023 Nakajima Masao" />
        <meta name="keywords" content="app, studio, nakajima, masao, レッツ・エレベーター, LETS ELEVATOR, 中島, 正雄" />

        {/* Open Graph & Twitter */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${urlHeader}/${folder}`} />
        <meta property="og:image" content={`/images/${folder}/logo.png`} />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={`${urlHeader}/${folder}`} />
        <meta name="twitter:site" content="@letselevator" />
        <meta name="twitter:creator" content="@Nakajima_Masao" />
        <meta name="twitter:image" content={`/images/${folder}/introduction_${isJa ? "ja" : "en"}.png`} />

        {/* Favicon & Apple Touch Icons */}
        <link rel="icon" href={`${urlHeader}/images/${folder}/favicons/favicon.ico`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`/images/${folder}/favicons/apple-touch-icon-180x180.png`} />
        <meta name="theme-color" content={color.header} />
      </Head>

      {/* Ads by Google */}
      {client && <Script async src={adsenseLink} crossOrigin="anonymous"/>}

      {/* Google Analyticsのスクリプトをnext/scriptで追加 */}
      {GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}

      {/* Google Tag Manager */}
      {GTM_ID && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}
    </>
  )
}

export default MyHead