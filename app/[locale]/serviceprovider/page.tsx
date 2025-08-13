import type { Metadata } from "next";
import ServiceProvider from "@/components/ServiceProviderComponents/ServiceProvider";
import { generateSEOMetadata } from "@/lib/metadata";
import ServiceProviderAnalytics from "@/components/ServiceProviderComponents/ServiceProviderAnalytics";

// Define types for your page
type GenerateMetadataProps = {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = params;
  
  const serviceProviderSEO = {
    ar: {
      title: "مقدم الخدمة - اطبع | Print",
      description: "إذا كنت مقدم خدمات طباعة ونسخ وتصوير فنحن سعداء بزيارتك لنا ويسرنا أن نعمل سويا لتقديم خدمات الطباعة اون لاين لعملائنا وعملائك بشكل أفضل وأسرع",
      keywords: "مقدم خدمة طباعة، شراكة طباعة، خدمات طباعة تجارية، طباعة اون لاين، شبكة طابعات، مقدمي الخدمات، الطباعة الرقمية، الطباعة، الرقمية، الأوراق، الورق، المملكة العربية السعودية، طباعة، وثيقة، طباعة الوثائق، أسود، الملونة، الطابعات المهنية، ملازم، ملخصات، ملخصات جامعية، مستند، مستندات، وورد، بوربوينت، بي دي اف"
    },
    en: {
      title: "Service Provider - Print Platform",
      description: "If you are a printing, copying and photocopying service provider, we are happy to have you visit us and we are pleased to work together to provide online printing services to our customers and yours better and faster",
      keywords: "printing service provider, printing partnership, commercial printing services, online printing, printer network, service providers, digital printing, printing, documents, papers, Saudi Arabia, print services, black and white, color printing, professional printers, booklets, summaries, academic summaries, documents, word, powerpoint, pdf"
    }
  };

  const seoData = serviceProviderSEO[locale as keyof typeof serviceProviderSEO] || serviceProviderSEO.en;
  
  return generateSEOMetadata({
    locale,
    customTitle: seoData.title,
    customDescription: seoData.description,
    customKeywords: seoData.keywords,
    customPath: '/serviceprovider'
  });
}

// Define page component props
interface PageProps {
  params: { locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ServiceProviderPage({ params }: PageProps) {
  const { locale } = params;

  return (
    <>
      <ServiceProviderAnalytics locale={locale} />
      <ServiceProvider />
    </>
  );
}