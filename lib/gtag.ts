import { useRouter } from "next/router";
import { useEffect } from "react";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";

// PVを測定する
export const pageview = (url: string): void => {
  console.log(GA_TRACKING_ID);
  if (GA_TRACKING_ID == "") return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// GAイベントを発火させる
export const event = ({action, category, label, value,}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}): void => {
  if (GA_TRACKING_ID == "") return;
  console.log(GA_TRACKING_ID);
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const usePageView = () => {
  const router = useRouter();
  useEffect(() => {
    if (GA_TRACKING_ID != "") {
      const handleRouteChange = (url: string, { shallow }: any) => {
        if (!shallow) pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };  
    }
  }, [router.events]);
};
