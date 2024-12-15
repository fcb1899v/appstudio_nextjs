import type { AppProps } from 'next/app'
import '../globals.css'
import 'swiper/css/bundle'
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  <Component {...pageProps} />
}

export default MyApp;