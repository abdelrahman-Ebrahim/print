import Script from 'next/script';
import { generateCorporationStructuredData, generateWebsiteStructuredData } from '@/lib/structured-data';

interface AnalyticsScriptsProps {
  locale: string;
}

export default function AnalyticsScripts({ locale }: AnalyticsScriptsProps) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WPH6V5G');`
        }}
      />

      {/* Corporation Structured Data */}
      <Script
        id="corporation-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateCorporationStructuredData(locale)
        }}
      />

      {/* Website Structured Data */}
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateWebsiteStructuredData(locale)
        }}
      />
    </>
  );
}