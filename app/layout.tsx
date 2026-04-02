import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";

import "@/app/globals.css";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

const heading = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: "Invitely | Wedding invitation website builder",
    template: "%s | Invitely",
  },
  description: siteConfig.description,
  openGraph: {
    title: "Invitely",
    description: siteConfig.description,
    siteName: "Invitely",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invitely",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

