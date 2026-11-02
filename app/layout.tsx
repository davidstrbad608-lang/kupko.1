import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // <-- 1. Dodaj ovo na vrh
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kupko.eu - Besplatni oglasnik",
  description: "Kupi ili prodaj brzo, jednostavno i potpuno besplatno u Hrvatskoj.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="hr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 2. Dodaj Google Analytics skripte ovdje na početak tijela */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-91BMW62HP8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-91BMW62HP8');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}