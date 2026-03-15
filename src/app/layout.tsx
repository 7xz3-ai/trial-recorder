import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DemoBanner from "@/components/ui/DemoBanner";

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
        <DemoBanner />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
