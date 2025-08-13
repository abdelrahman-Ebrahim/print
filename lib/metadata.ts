import type { Metadata } from "next";
import { getSEOData, getBaseUrl } from "./seo";

export interface MetadataOptions {
  locale: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
  customPath?: string;
  noIndex?: boolean;
}

export function generateSEOMetadata({
  locale,
  customTitle,
  customDescription,
  customKeywords,
  customPath = "",
  noIndex = false,
}: MetadataOptions): Metadata {
  const seo = getSEOData(locale);
  const baseUrl = getBaseUrl();
  const alternateLocale = locale === "ar" ? "en" : "ar";

  const title = customTitle || seo.title;
  const description = customDescription || seo.description;
  const keywords = customKeywords || seo.keywords;
  const url = `${baseUrl}/${locale}${customPath}`;

  return {
    title: {
      default: title,
      template: `%s | ${seo.siteName}`,
    },
    description,
    keywords,
    applicationName: seo.applicationName,

    // Robots configuration
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Open Graph
    openGraph: {
      type: "website",
      locale: locale,
      alternateLocale: alternateLocale,
      url: url,
      siteName: seo.siteName,
      title: title,
      description: description,
      images: [
        {
          url: `${baseUrl}/ndist/images/icon/og/printdotsa_og.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      site: "@printdotsa",
      creator: "@printdotsa",
      title: title,
      description: description,
      images: [`${baseUrl}/ndist/images/icon/og/printdotsa_og.png`],
    },

    // Icons and favicons
    icons: {
      icon: [
        {
          url: "/ndist/images/icon/favicon-32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/ndist/images/icon/favicon-57.png",
          sizes: "57x57",
          type: "image/png",
        },
        {
          url: "/ndist/images/icon/favicon-76.png",
          sizes: "76x76",
          type: "image/png",
        },
        {
          url: "/ndist/images/icon/favicon-96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          url: "/ndist/images/icon/favicon-128.png",
          sizes: "128x128",
          type: "image/png",
        },
        {
          url: "/ndist/images/icon/favicon-228.png",
          sizes: "228x228",
          type: "image/png",
        },
      ],
      shortcut: [
        { url: "/ndist/images/icon/favicon-196.png", sizes: "196x196" },
      ],
      apple: [
        { url: "/ndist/images/icon/favicon-120.png", sizes: "120x120" },
        { url: "/ndist/images/icon/favicon-152.png", sizes: "152x152" },
        { url: "/ndist/images/icon/favicon-180.png", sizes: "180x180" },
      ],
    },

    // Apple Web App
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: seo.applicationName,
    },

    // Manifest
    manifest: "/manifest.json",

    // Alternative languages
    alternates: {
      canonical: url,
      languages: {
        ar: `${baseUrl}/ar${customPath}`,
        en: `${baseUrl}/en${customPath}`,
      },
    },

    // Additional metadata
    other: {
      "apple-itunes-app": "app-id=1513699123",
      "google-site-verification": "z48IBp_z1gvaZM6-Gpnwtt3vFaj9I2bLOczR-pVk69Y",
      "msapplication-TileColor": "#5C0C7F",
      "theme-color": "#5C0C7F",
    },

    // Verification
    verification: {
      google: "z48IBp_z1gvaZM6-Gpnwtt3vFaj9I2bLOczR-pVk69Y",
    },
  };
}
