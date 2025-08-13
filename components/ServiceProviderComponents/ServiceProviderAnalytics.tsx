import Script from 'next/script';
import { generateCorporationStructuredData, generateServiceProviderStructuredData } from '@/lib/structured-data';

interface ServiceProviderAnalyticsProps {
  locale: string;
}

export default function ServiceProviderAnalytics({ locale }: ServiceProviderAnalyticsProps) {
  return (
    <>
      {/* Corporation Structured Data */}
      <Script
        id="corporation-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateCorporationStructuredData(locale)
        }}
      />

      {/* Service Provider Structured Data */}
      <Script
        id="service-provider-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateServiceProviderStructuredData(locale)
        }}
      />
    </>
  );
}