import { AppProps } from '@/types/app';
import { myApp } from '@/utils/constants';
import type { FC } from 'react';

/** Props for StructuredData: AppProps plus the page type. */
interface StructuredDataProps extends AppProps {
  pageType?: 'website' | 'article' | 'product';
}

/** Emits schema.org JSON-LD for the app page. */
const StructuredData: FC<StructuredDataProps> = ({ 
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

  // Basic WebSite structured data for general pages
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

  // SoftwareApplication structured data for app pages
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

  // Select structured data based on page type
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