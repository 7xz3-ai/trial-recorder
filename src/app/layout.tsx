import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DemoBanner from "@/components/ui/DemoBanner";
import CookieConsent from "@/components/ui/CookieConsent";
import ChatWidget from "@/components/ui/ChatWidget";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "Barclays — Personal & Corporate Banking",
  description: "Barclays offers bank accounts, mortgages, credit cards, loans, savings and investment products in the UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        {/* Skip to content - accessibility */}
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
      </body>
    </html>
  );
}
