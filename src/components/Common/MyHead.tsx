import type { NextPage } from 'next';
import Script from 'next/script';
import Head from 'next/head';
import { myApp } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { AppProps } from '@/types/common';

const MyHead: NextPage<AppProps> = ({ appNumber, width, isJa }) => {
  const appData = myApp(width, isJa)[appNumber];
  const { text, folder, color } = appData;
  const title = text.title;
  const description = text.message.map((list) => list.join('')).join(' ');
  const urlHeader = "https://nakajimamasao-appstudio.web.app";
  
  // 環境変数の型安全な取得
  const client = process.env.NEXT_PUBLIC_ADSENSE || "";
  const adsenseLink = client ? `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}` : "";

  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
  const COOKIEBOT_ID = process.env.NEXT_PUBLIC_COOKIEBOT_ID || "";

  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookie_consent");
    if (saved === 'accepted') {
      setHasConsent(true);
    }
  }, []);

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
        <link rel="icon" type="image/x-icon" href={`/images/${folder}/favicons/favicon.ico`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/images/${folder}/favicons/icon-16x16.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/images/${folder}/favicons/icon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="48x48" href={`/images/${folder}/favicons/icon-48x48.png`} />
        <link rel="icon" type="image/png" sizes="96x96" href={`/images/${folder}/favicons/icon-96x96.png`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`/images/${folder}/favicons/icon-192x192.png`} />
        <link rel="icon" type="image/png" sizes="512x512" href={`/images/${folder}/favicons/icon-512x512.png`} />
        <link rel="apple-touch-icon" sizes="57x57" href={`/images/${folder}/favicons/apple-touch-icon-57x57.png`} />
        <link rel="apple-touch-icon" sizes="60x60" href={`/images/${folder}/favicons/apple-touch-icon-60x60.png`} />
        <link rel="apple-touch-icon" sizes="72x72" href={`/images/${folder}/favicons/apple-touch-icon-72x72.png`} />
        <link rel="apple-touch-icon" sizes="76x76" href={`/images/${folder}/favicons/apple-touch-icon-76x76.png`} />
        <link rel="apple-touch-icon" sizes="114x114" href={`/images/${folder}/favicons/apple-touch-icon-114x114.png`} />
        <link rel="apple-touch-icon" sizes="120x120" href={`/images/${folder}/favicons/apple-touch-icon-120x120.png`} />
        <link rel="apple-touch-icon" sizes="144x144" href={`/images/${folder}/favicons/apple-touch-icon-144x144.png`} />
        <link rel="apple-touch-icon" sizes="152x152" href={`/images/${folder}/favicons/apple-touch-icon-152x152.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`/images/${folder}/favicons/apple-touch-icon-180x180.png`} />
        <link rel="apple-touch-icon" href={`/images/${folder}/favicons/apple-touch-icon.png`} />
        <link rel="manifest" href={`/images/${folder}/favicons/manifest.json`} />
        <meta name="msapplication-TileColor" content={color.header} />
        <meta name="msapplication-TileImage" content={`/images/${folder}/favicons/site-tile-150x150.png`} />
        <meta name="theme-color" content={color.header} />
      </Head>

      {/* Ads by Google */}
      {client && <Script async src={adsenseLink} crossOrigin="anonymous" strategy="lazyOnload"/>}

      {/* Google Analyticsのスクリプトをnext/scriptで追加 */}
      {GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              
              // 基本設定
              gtag('config', '${GA_TRACKING_ID}', {
                page_title: '${title}',
                page_location: window.location.href,
                page_path: window.location.pathname,
                custom_map: {
                  'custom_parameter_1': 'app_name',
                  'custom_parameter_2': 'language',
                  'custom_parameter_3': 'device_type'
                }
              });
              
              // カスタムパラメータを送信
              gtag('event', 'page_view', {
                app_name: '${appData.app}',
                language: '${isJa ? 'ja' : 'en'}',
                device_type: '${width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}',
                page_title: '${title}',
                page_location: window.location.href,
                page_path: window.location.pathname
              });
              
              // ページビューの詳細追跡
              gtag('event', 'page_view', {
                send_to: '${GA_TRACKING_ID}',
                page_title: '${title}',
                page_location: window.location.href,
                page_path: window.location.pathname,
                app_name: '${appData.app}',
                language: '${isJa ? 'ja' : 'en'}',
                device_type: '${width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}'
              });
            `}          
          </Script>          
        </>
      )}

      {/* Google Tag Manager */}
      {hasConsent && GTM_ID && (
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

      <Script 
        id="Cookiebot" 
        src="https://consent.cookiebot.com/uc.js" 
        data-cbid={COOKIEBOT_ID}
        data-blockingmode="auto" 
        type="text/javascript"
      />
    </>
  );
};

export default MyHead;