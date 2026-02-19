import { notFound } from "next/navigation";
import AppPage from "@/components/Common/AppPage";
import { APP_SLUG_TO_NUMBER, APP_SLUGS } from "@/utils/constants";

export interface PageProps {
  params: Promise<{ appSlug: string }>;
}

/** Required for static export: pre-generate all app slug /ja pages at build time. */
export function generateStaticParams() {
  return APP_SLUGS.map((appSlug) => ({ appSlug }));
}

/**
 * Dynamic app page (Japanese). Handles /elevator/ja, /signal/ja, etc.
 */
export default async function AppSlugJaPage({ params }: PageProps) {
  const { appSlug } = await params;
  const appNumber = APP_SLUG_TO_NUMBER[appSlug];
  if (appNumber === undefined) {
    notFound();
  }
  return (
    <AppPage
      appNumber={appNumber}
      isJa={true}
      pagePath={`/${appSlug}/ja`}
    />
  );
}
