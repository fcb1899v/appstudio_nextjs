import type { NextPage } from 'next';
import Script from 'next/script';
import Head from 'next/head';
import { myApp } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { AppProps } from '@/types/app';
import StructuredData from './StructuredData';

/**
 * Head component for managing page metadata and external scripts
 * Handles SEO, social media tags, analytics, and performance monitoring
 * for all app pages. Provides comprehensive meta information including
 * Open Graph tags, Twitter cards, favicons, and analytics integration.
 * Manages cookie consent and conditional script loading for optimal performance.
 */

// Head component for managing page metadata and external scripts
const MyHead: NextPage<AppProps> = ({ appNumber, width, isJa }) => {
  // Get app data and configuration
  const appData = myApp(width, isJa)[appNumber];
  const { text, folder, color } = appData;
  const title = text.title;
  const description = text.message.map((list) => list.join('')).join(' ');
  const urlHeader = "https://nakajimamasao-appstudio.web.app";
  
  // Environment variables for external services
  const client = process.env.ADSENSE_ID || "";
  const adsenseLink = client ? `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}` : "";

  const GA_TRACKING_ID = process.env.GA_TRACKING_ID || "";
  const GTM_ID = process.env.GTM_ID || "";
  const COOKIEBOT_ID = process.env.COOKIEBOT_ID || "";

  // Cookie consent state management
  const [hasConsent, setHasConsent] = useState(false);
  const [isAuthorizedDomain, setIsAuthorizedDomain] = useState(true);

  useEffect(() => {
    // Check if current domain is authorized for Cookiebot
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      // Skip Cookiebot for preview domains (.web.app) and localhost
      const isPreviewDomain = hostname.includes('.web.app') || hostname === 'localhost' || hostname === '127.0.0.1';
      setIsAuthorizedDomain(!isPreviewDomain);
    }

    // Check for existing cookie consent
    const saved = localStorage.getItem("cookie_consent");
    if (saved === 'accepted') {
      setHasConsent(true);
    }

    // Performance monitoring setup
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'performance_timing', {
                event_category: 'performance',
                event_label: 'page_load',
                value: Math.round(navEntry.loadEventEnd - navEntry.loadEventStart),
                custom_parameter_1: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
                custom_parameter_2: navEntry.loadEventEnd - navEntry.fetchStart
              });
            }
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  }, []);

  return (
    <>
      {/* Page head with meta information and SEO */}
      <Head>
        {/* Basic meta information */}
        <title>{title}</title>
        <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="format-detection" content="email=no,telephone=no,address=no" />
        <meta name="author" content="2023 Nakajima Masao" />
        <meta name="keywords" content="app, studio, nakajima, masao, レッツ・エレベーター, LETS ELEVATOR, 中島, 正雄" />

        {/* Open Graph and Twitter meta tags */}
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

        {/* Favicon and Apple touch icons */}
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

        {/* LCP optimization - preload important images */}
        {appNumber === 0 && (
          <link rel="preload" as="image" href="/images/appstudio/icon.png" />
        )}
        <link rel="preload" as="image" href={`/images/${folder}/icon.png`} />

        {/* Structured data for SEO */}
        <StructuredData 
          appNumber={appNumber} 
          width={width} 
          isJa={isJa} 
          pageType={appNumber > 0 ? 'product' : 'website'} 
        />
      </Head>

      {/* Google AdSense with lazy loading */}
      {client && (
        <script 
          async 
          src={adsenseLink} 
          crossOrigin="anonymous"
          onLoad={() => {
            // Track ad loading completion
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'adsense_loaded', {
                event_category: 'performance',
                event_label: 'adsense'
              });
            }
          }}
        />
      )}

      {/* Google Analytics with optimized configuration */}
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
              
              // Optimized configuration
              gtag('config', '${GA_TRACKING_ID}', {
                page_title: '${title}',
                page_location: window.location.href,
                page_path: window.location.pathname,
                // Performance optimization settings
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                // Disable unnecessary features
                send_page_view: false,
                custom_map: {
                  'custom_parameter_1': 'app_name',
                  'custom_parameter_2': 'language',
                  'custom_parameter_3': 'device_type'
                }
              });
              
              // Custom page view (only when needed)
              gtag('event', 'page_view', {
                app_name: '${appData.app}',
                language: '${isJa ? 'ja' : 'en'}',
                device_type: '${width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'}',
                page_title: '${title}',
                page_location: window.location.href,
                page_path: window.location.pathname
              });
            `}          
          </Script>          
        </>
      )}

      {/* Google Tag Manager with conditional loading */}
      {hasConsent && GTM_ID && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}

      {/* Cookiebot consent management - only load in production on authorized domains */}
      {process.env.NODE_ENV !== 'development' && COOKIEBOT_ID && isAuthorizedDomain && (
        <Script 
          id="Cookiebot" 
          src="https://consent.cookiebot.com/uc.js" 
          data-cbid={COOKIEBOT_ID}
          data-blockingmode="auto" 
          type="text/javascript"
        />
      )}
    </>
  );
};

export default MyHead;