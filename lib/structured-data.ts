import { getSEOData, getBaseUrl } from "./seo";

export function generateCorporationStructuredData(locale: string): string {
  const seo = getSEOData(locale);
  const baseUrl = getBaseUrl();
  
  const structuredData = {
    "@context": "https://www.schema.org",
    "@type": "Corporation",
    "name": locale === 'ar' ? "منصة اطبع" : "Print Platform",
    "url": baseUrl,
    "contactPoint": [{
      "@type": "ContactPoint",
      "email": "support@print.sa",
      "contactType": "customer service",
      "url": baseUrl
    }],
    "logo": `${baseUrl}/ndist/images/icon/og/print_logo_og.png`,
    "description": seo.description,
    "sameAs": [
      "https://www.facebook.com/printdotsa",
      "https://www.twitter.com/printdotsa",
      "https://www.instagram.com/printdotsa"
    ]
  };

  return JSON.stringify(structuredData);
}

export function generateWebsiteStructuredData(locale: string): string {
  const seo = getSEOData(locale);
  const baseUrl = getBaseUrl();
  
  const structuredData = {
    "@context": "https://www.schema.org",
    "@type": "WebSite",
    "name": locale === 'ar' ? "منصة اطبع" : "Print Platform",
    "url": baseUrl,
    "description": seo.description,
    "publisher": {
      "@type": "Corporation",
      "name": locale === 'ar' ? "منصة اطبع" : "Print Platform"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return JSON.stringify(structuredData);
}

export function generateServiceProviderStructuredData(locale: string): string {
  const baseUrl = getBaseUrl();
  
  const structuredData = {
    "@context": "https://www.schema.org",
    "@type": "Service",
    "name": locale === 'ar' ? "خدمات مقدمي الطباعة" : "Printing Service Provider Program",
    "description": locale === 'ar' 
      ? "انضم إلى شبكة مقدمي خدمات الطباعة في منصة اطبع وقدم خدمات الطباعة الرقمية لعملائك"
      : "Join Print Platform's network of printing service providers and offer digital printing services to your customers",
    "provider": {
      "@type": "Corporation",
      "name": locale === 'ar' ? "منصة اطبع" : "Print Platform",
      "url": baseUrl
    },
    "serviceType": locale === 'ar' ? "خدمات الطباعة التجارية" : "Commercial Printing Services",
    "areaServed": {
      "@type": "Country",
      "name": locale === 'ar' ? "المملكة العربية السعودية" : "Saudi Arabia"
    }
  };

  return JSON.stringify(structuredData);
}