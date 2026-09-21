'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Sets document.documentElement.lang from the route after hydration (static export safe).
 * /ja/* routes get "ja", everything else "en". */
export default function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const isJa = pathname?.includes('/ja') ?? false;
    document.documentElement.lang = isJa ? 'ja' : 'en';
  }, [pathname]);

  return null;
}
