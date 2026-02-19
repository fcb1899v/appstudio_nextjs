import { notFound } from "next/navigation";
import AppPage from "@/components/Common/AppPage";
import { APP_SLUG_TO_NUMBER, APP_SLUGS } from "@/utils/constants";

export interface PageProps {
  params: Promise<{ appSlug: string }>;
}

/** Required for static export: pre-generate all app slug pages at build time. */
export function generateStaticParams() {
  return APP_SLUGS.map((appSlug) => ({ appSlug }));
}

/**
 * Dynamic app page (English). Handles /elevator, /signal, /phonics, etc.
 */
export default async function AppSlugPage({ params }: PageProps) {
  const { appSlug } = await params;
  const appNumber = APP_SLUG_TO_NUMBER[appSlug];
  if (appNumber === undefined) {
    notFound();
  }
  return (
    <AppPage
      appNumber={appNumber}
      isJa={false}
      pagePath={`/${appSlug}`}
    />
  );
}
