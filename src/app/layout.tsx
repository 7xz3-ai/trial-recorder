import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";

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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
