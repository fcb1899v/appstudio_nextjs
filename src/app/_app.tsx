import type { AppProps } from 'next/app'
import { usePageView } from '../../lib/gtag';
import '../globals.css'
import 'swiper/css/bundle'
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return (<>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=G-R0FGZZJ71Y`}
    />
    <Script
      strategy="afterInteractive"
      id="google-analytics"
    >{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-R0FGZZJ71Y');
    `}</Script>
    <Component {...pageProps} />
  </>
)
}

export default MyApp;