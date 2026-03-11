'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Sets document.documentElement.lang from route (static export safe).
 * /ja/* routes -> lang="ja", otherwise lang="en". Runs after hydration.
 */
export default function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const isJa = pathname?.includes('/ja') ?? false;
    document.documentElement.lang = isJa ? 'ja' : 'en';
  }, [pathname]);

  return null;
}
