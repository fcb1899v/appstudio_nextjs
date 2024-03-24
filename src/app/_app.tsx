import type { AppProps } from 'next/app'
import { usePageView } from '../../lib/gtag';
import '../globals.css'
import 'swiper/css/bundle'

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return (<Component {...pageProps} />)
}

export default MyApp;
