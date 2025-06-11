import './globals.css'
import { beon, cornerStone, kodomo, pacifico, riipop, yasashisa } from '../../public/fonts/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://platform.twitter.com https://cdn.syndication.twimg.com https://pagead2.googlesyndication.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://ep2.adtrafficquality.google https://www.google.com http://www.youtube.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self' https:; connect-src 'self' https: wss: ws: https://ipapi.co; frame-src 'self' https://www.youtube.com https://platform.twitter.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://consentcdn.cookiebot.com https://ep2.adtrafficquality.google https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), interest-cohort=(), web-share=(self)" />
      </head>
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
