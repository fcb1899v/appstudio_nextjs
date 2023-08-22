import type { AppProps } from 'next/app'
import { GA_TRACKING_ID, usePageView } from '../../lib/gtag';
import '../globals.css'
import 'swiper/css/bundle'

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  console.log(GA_TRACKING_ID);
  return <>
    {(GA_TRACKING_ID != "") && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });`,
        }}/>
      </>
    )}
    <Component {...pageProps} />
  </>
}

export default MyApp;
