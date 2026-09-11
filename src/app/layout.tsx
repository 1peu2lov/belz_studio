import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ScrollToTopOnRoute } from "@/components/ScrollToTopOnRoute/ScrollToTopOnRoute";
import { SmoothScroll } from "@/components/SmoothScroll/SmoothScroll";
import { pirulen, supreme } from "@/fonts";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata = defaultMetadata;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={siteConfig.language}
      className={`${supreme.variable} ${pirulen.variable}`}
    >
      <body>
        <SmoothScroll />
        <ScrollToTopOnRoute />
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="main">
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
