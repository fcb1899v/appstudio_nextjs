import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { isSP, myApp, myAppNumber, myBadge} from '@/utils/constants'
import { useAnalytics } from '@/hooks/useAnalytics'

/**
 * Interface for app badges component props
 * Defines the properties required for rendering app store badges
 */
interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

/**
 * Component for displaying app store badges
 * Shows download links for iOS and Android with analytics tracking
 * Provides responsive design and comprehensive analytics
 */

// App store badges component for download links
const MyAppsBadges: NextPage<Props> = ({appNumber, width, isJa}) => {
  // Get analytics tracking functions
  const { trackAppDownload, trackEvent } = useAnalytics();
  
  // Get app data and configuration
  const appData = myApp(width, isJa)[appNumber];
  const folder = appData.folder;
  const appName = appData.app;

  // Handle app download button click and track analytics
  const handleButtonClick = (buttonName: string, platform: 'ios' | 'android', url: string) => {
    trackAppDownload(appName, platform, isJa ? 'ja' : 'en');
    
    trackEvent({
      action: 'app_download_click',
      category: 'engagement',
      label: buttonName,
      custom_parameters: {
        app_name: appName,
        platform: platform,
        language: isJa ? 'ja' : 'en',
        device_type: width < 600 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop',
        download_url: url,
        button_name: buttonName
      }
    });

    // Additional data layer tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'button_click',
        eventCategory: 'Button',
        eventAction: 'Click',
        eventLabel: buttonName,
        app_name: appName,
        platform: platform,
        language: isJa ? 'ja' : 'en'
      });
    }
  };

  // App store links for iOS and Android
  const appLink = [appData.link.ios, appData.link.android];
  
  // Generate button name for analytics tracking
  const buttonName = (i: number): string => `${folder}_${i == 0 ? "iOS": "Android"}_${isJa ? "ja_": "_"}open`

  return (
    <div className="flex_center" style={{
      columnGap: 20,
      marginBottom: 10
    }}>
      {/* App store download badges */}
      {myBadge.map((badge, i) => (
        <Link href={appLink[i]} key={`app_${i}`} onClick={() => {
          const platform = i === 0 ? 'ios' : 'android';
          handleButtonClick(buttonName(i), platform, appLink[i]);
        }}>
          <Image 
            src={badge.image} 
            alt={badge.title} 
            width={360} 
            height={160} 
            style={{
              width: appNumber === myAppNumber.home 
                ? (isSP(width) ? "40vw" : 162)
                : (isSP(width) ? "44vw" : 180),
              maxWidth: appNumber === myAppNumber.home ? 162 : 180,
              height: "auto"
            }}
            priority={true}
          />
        </Link>
      ))}
    </div>
  );
};

export default MyAppsBadges
