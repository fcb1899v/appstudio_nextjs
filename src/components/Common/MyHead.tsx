import type { NextPage } from 'next';
import Head from 'next/head';
import { myApp } from '@/utils/constants';
import { useEffect } from 'react';
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

  useEffect(() => {
    // Performance monitoring (gtag available after GTM GA4 tag loads)
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

      {/* GA4 is loaded only via GTM (Google Tag in layout.tsx container) */}
      {/* Cookiebot is loaded by GTM "Cookiebot CMP" tag (Consent Initialization); no duplicate load on site */}
    </>
  );
};

export default MyHead;