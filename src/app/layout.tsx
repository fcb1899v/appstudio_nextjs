import './globals.css'
import { beon, cornerStone, kodomo, pacifico, riipop, yasashisa } from '@/lib/fonts'
import type { ReactNode } from 'react'

/**
 * Root layout component for the entire application
 * Provides the base HTML structure, global styles, custom fonts, and security policies
 * for all pages. Sets up document head with meta tags, viewport settings, and CSP headers.
 * The body includes all custom font variables for consistent typography across the app.
 */

// Interface for root layout component props
interface RootLayoutProps {
  children: ReactNode;
}

// Root layout component for the entire application
export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Favicon links for different icon formats */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Content Security Policy for security */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://platform.twitter.com https://cdn.syndication.twimg.com https://pagead2.googlesyndication.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://ep2.adtrafficquality.google https://www.google.com https://www.gstatic.com http://www.youtube.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self' https:; connect-src 'self' https: wss: ws: https://ipapi.co; frame-src 'self' https://www.youtube.com https://platform.twitter.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://consentcdn.cookiebot.com https://ep2.adtrafficquality.google https://www.google.com https://www.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'" />
        
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
        ${yasashisa.variable}
      `}>{children}</body>
    </html>
  )
}
