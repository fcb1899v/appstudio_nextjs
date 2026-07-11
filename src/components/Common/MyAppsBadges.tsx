import type { NextPage } from 'next'
import Link from 'next/link'
import OptimizedImage from '@/components/Common/OptimizedImage'
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

  // App store badge intrinsic sizes (width x height)
  const appStoreBadgeWidth = appNumber === myAppNumber.home ? 180 : 200;
  const googlePlayBadgeWidth = appNumber === myAppNumber.home ? 200 : 220;
  const appStoreBadgeHeight = Math.round((appStoreBadgeWidth * 40) / 119.66407);
  const googlePlayBadgeHeight = Math.round((googlePlayBadgeWidth * 167) / 563);
  const badgeSizes = [
    { width: appStoreBadgeWidth, height: appStoreBadgeHeight },
    { width: googlePlayBadgeWidth, height: googlePlayBadgeHeight },
  ];

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
          <OptimizedImage
            src={badge.image}
            alt={badge.title}
            width={badgeSizes[i].width}
            height={badgeSizes[i].height}
            style={{
              width: isSP(width)
                ? (appNumber === myAppNumber.home ? '40vw' : '44vw')
                : badgeSizes[i].width,
              maxWidth: badgeSizes[i].width,
              height: 'auto',
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default MyAppsBadges
