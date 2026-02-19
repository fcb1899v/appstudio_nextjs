"use client";

import type { NextPage } from "next";
import "@/app/globals.css";
import MyHead from "@/components/Common/MyHead";
import MySplash from "@/components/Common/MySplash";
import MyAppsHeader from "@/components/Common/MyAppsHeader";
import MyAppsTop from "@/components/Common/MyAppsTop";
import MyAppsFeatures from "@/components/Common/MyAppsFeatures";
import MyAppsHowtoUse from "@/components/Common/MyAppsHowtoUse";
import DownloadNow from "@/components/Common/DownloadNow";
import MyFooter from "@/components/Common/MyFooter";
import YoutubeMovie from "@/components/Common/YoutubeMovie";
import ElevatorBigNews from "@/components/Common/ElevatorBigNews";
import WordWebApp from "@/components/Common/WordWebApp";
import { myApp, myAppNumber, myMenuNumber } from "@/utils/constants";
import { useWindowSize } from "@/hooks/useWindowSize";
import CookieConsentBanner from "@/components/Common/CookieConsentBanner";
import AnalyticsTracker from "@/components/Common/AnalyticsTracker";

export interface AppPageProps {
  appNumber: number;
  isJa: boolean;
  pagePath: string;
}

/**
 * Shared app showcase page. Renders common shell and app-specific content blocks
 * based on appNumber (elevator, elevatorneo, signal, crossing, toilet, allowance,
 * transit, phonics, japanese). Used by dynamic routes [appSlug]/page and [appSlug]/ja/page.
 */
const AppPage: NextPage<AppPageProps> = ({ appNumber, isJa, pagePath }) => {
  const { windowSize, isClient } = useWindowSize();

  if (!isClient) {
    return null;
  }

  const { width } = windowSize;
  const appData = myApp(width, isJa)[appNumber];
  const menuNumber = myMenuNumber.other;
  const mainStyle =
    appNumber === myAppNumber.toilet
      ? undefined
      : { background: appData.color.background };

  const commonProps = { appNumber, width, isJa };

  return (
    <div>
      <MyHead appNumber={appNumber} width={width} isJa={isJa} />
      <AnalyticsTracker
        pageTitle={appData.text.title}
        pagePath={pagePath}
        appName={appData.app}
        language={isJa ? "ja" : "en"}
        deviceType={
          width < 600 ? "mobile" : width < 1024 ? "tablet" : "desktop"
        }
      />
      <MySplash appNumber={appNumber} width={width} isJa={isJa} />
      <MyAppsHeader appNumber={appNumber} width={width} isJa={isJa} />
      <main className="main" style={mainStyle}>
        <MyAppsTop appNumber={appNumber} width={width} isJa={isJa} />

        {appNumber === myAppNumber.elevator && (
          <>
            <YoutubeMovie {...commonProps} />
            <ElevatorBigNews width={width} isJa={isJa} />
            <MyAppsHowtoUse {...commonProps} maxWidth={800} />
            <YoutubeMovie {...commonProps} />
          </>
        )}

        {(appNumber === myAppNumber.elevatorNeo ||
          appNumber === myAppNumber.crossing) && (
          <>
            <MyAppsFeatures {...commonProps} />
            <DownloadNow {...commonProps} />
          </>
        )}

        {(appNumber === myAppNumber.signal ||
          appNumber === myAppNumber.allowance ||
          appNumber === myAppNumber.transit) && (
          <>
            <MyAppsFeatures {...commonProps} />
            <MyAppsHowtoUse {...commonProps} maxWidth={800} />
            <DownloadNow {...commonProps} />
          </>
        )}

        {appNumber === myAppNumber.toilet && (
          <>
            <MyAppsHowtoUse {...commonProps} maxWidth={800} />
            <DownloadNow {...commonProps} />
          </>
        )}

        {(appNumber === myAppNumber.phonics ||
          appNumber === myAppNumber.japanese) && (
          <>
            <MyAppsFeatures {...commonProps} />
            <WordWebApp {...commonProps} />
            <MyAppsHowtoUse {...commonProps} maxWidth={800} />
            <DownloadNow {...commonProps} />
          </>
        )}
      </main>
      <MyFooter width={width} isJa={isJa} menuNumber={menuNumber} />
      <CookieConsentBanner isJa={isJa} />
    </div>
  );
};

export default AppPage;
