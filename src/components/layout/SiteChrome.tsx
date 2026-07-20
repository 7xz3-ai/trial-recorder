'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DemoBanner from '@/components/ui/DemoBanner';
import CookieConsent from '@/components/ui/CookieConsent';
import ChatWidget from '@/components/ui/ChatWidget';
import ScrollToTop from '@/components/ui/ScrollToTop';

// Routes that render standalone, without the banking-site chrome
const BARE_ROUTES = ['/recorder'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some((r) => pathname === r || pathname?.startsWith(`${r}/`));

  if (bare) {
    return <main id="main-content" className="flex-1">{children}</main>;
  }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[200] focus:bg-barclays-teal focus:text-white focus:px-4 focus:py-2 focus:text-sm">
        Skip to main content
      </a>
      <DemoBanner />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieConsent />
      <ChatWidget />
      <ScrollToTop />
    </>
  );
}
