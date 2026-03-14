import './globals.css'
import HtmlLang from '@/components/Common/HtmlLang'
import { beon, cornerStone, kodomo, pacifico, riipop } from '@/lib/fonts'
import type { ReactNode } from 'react'

/**
 * Root layout component for the entire application
 * Provides the base HTML structure, global styles, custom fonts, and security policies
 * for all pages. Sets up document head with meta tags, viewport settings, and CSP headers.
 * The body includes all custom font variables for consistent typography across the app.
 * Static export: no headers() so layout can be pre-rendered. Per-page title/description via MyHead.
 */

// Interface for root layout component props
interface RootLayoutProps {
  children: ReactNode;
}

// GTM ID from environment (e.g. GTM-T3PSBCC)
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || process.env.GTM_ID || '';

// Default SEO for static export (per-page MyHead overrides with correct language)
const DEFAULT_TITLE = 'Nakajima Masao App Studio - Mobile Apps';
const DEFAULT_DESCRIPTION = 'Nakajima Masao App Studio - Mobile apps including LETS ELEVATOR, LETS CROSSING, LETS SIGNAL, and more for Android and iOS.';

// Root layout component for the entire application
export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - place as high as possible in head */}
        {GTM_ID && (
          <script
            id="gtm-script"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        {/* Default title and description for SEO (pages may override via MyHead) */}
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />

        {/* Favicon links for different icon formats */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Critical CSS for first paint; avoids blocking on external stylesheet */}
        <style dangerouslySetInnerHTML={{ __html: `*,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;padding:0;background:#000;color:#fff;font-family:system-ui,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}` }} />

        {/* Content Security Policy for security */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://platform.twitter.com https://cdn.syndication.twimg.com https://pagead2.googlesyndication.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://ep2.adtrafficquality.google https://www.google.com https://www.gstatic.com http://www.youtube.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self' https:; connect-src 'self' https: wss: ws: https://ipapi.co; frame-src 'self' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com https://platform.twitter.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://consentcdn.cookiebot.com https://ep2.adtrafficquality.google https://www.google.com https://www.gstatic.com https://docs.google.com; object-src 'none'; base-uri 'self'; form-action 'self' https://docs.google.com" />
        
        {/* Permissions Policy for privacy */}
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), interest-cohort=(), web-share=(self)" />
      </head>
      
      {/* Body with custom font variables for consistent typography */}
      <body className={`
        ${cornerStone.variable} 
        ${beon.variable} 
        ${pacifico.variable} 
        ${kodomo.variable}
        ${riipop.variable}
      `}>
        {/* Google Tag Manager (noscript) - right after body start */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <HtmlLang />
        {children}
      </body>
    </html>
  )
}
