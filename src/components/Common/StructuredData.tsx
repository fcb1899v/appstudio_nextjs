import { AppProps } from '@/types/common';
import { myApp } from '@/utils/constants';

interface StructuredDataProps extends AppProps {
  pageType?: 'website' | 'article' | 'product';
}

const StructuredData: React.FC<StructuredDataProps> = ({ 
  appNumber, 
  width, 
  isJa, 
  pageType = 'website' 
}) => {
  const appData = myApp(width, isJa)[appNumber];
  const { text, folder } = appData;
  const title = text.title;
  const description = text.message.map((list) => list.join('')).join(' ');
  const urlHeader = "https://nakajimamasao-appstudio.web.app";
  const currentUrl = `${urlHeader}/${folder}`;

  // 基本のWebSite構造化データ
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": title,
    "description": description,
    "url": urlHeader,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${urlHeader}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nakajima Masao App Studio",
      "url": urlHeader,
      "logo": {
        "@type": "ImageObject",
        "url": `${urlHeader}/images/${folder}/logo.png`
      }
    }
  };

  // アプリページ用のSoftwareApplication構造化データ
  const softwareApplicationStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "description": description,
    "url": currentUrl,
    "applicationCategory": "GameApplication",
    "operatingSystem": "Android, iOS",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Nakajima Masao",
      "url": urlHeader
    },
    "image": `${urlHeader}/images/${folder}/introduction_${isJa ? "ja" : "en"}.png`,
    "screenshot": `${urlHeader}/images/${folder}/pictures_${isJa ? "ja" : "en"}.png`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "100"
    }
  };

  // ページタイプに応じて構造化データを選択
  const structuredData = pageType === 'product' ? softwareApplicationStructuredData : websiteStructuredData;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
};

export default StructuredData; 