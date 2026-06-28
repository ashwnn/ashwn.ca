import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import SiteShell from "@/components/layout/SiteShell";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.titleShort,
    template: `%s - ${siteConfig.titleShort}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "464x464" },
    ],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${jetbrainsMono.variable} ${inter.variable}`}>
        <SiteShell>{children}</SiteShell>
        {siteConfig.umami.enabled ? (
          <Script
            src={siteConfig.umami.scriptUrl}
            data-website-id={siteConfig.umami.websiteId}
            data-domains={siteConfig.umami.domains.join(",")}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
