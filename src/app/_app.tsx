import '../globals.css'
import 'swiper/css/bundle'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { usePageView } from '@/hooks/usePageView';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  // Google Analytics の PV をカウントするイベント
  usePageView();

  const router = useRouter();

  useEffect(() => {
    const userLanguage = window.navigator.language;
    console.log(userLanguage);
    if (userLanguage.startsWith('ja')) {
      router.push('/ja');
    }
  }, []);

  return <>
    {process.env.NEXT_PUBLIC_GA_ID && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });`,
        }}/>
      </>
    )}
    <Component {...pageProps} />
  </>
}

export default MyApp;
