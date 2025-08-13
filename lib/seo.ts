export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  siteName: string;
  applicationName: string;
}

export const seoData: Record<string, SEOData> = {
  ar: {
    title: "منصة اطبع | Print وجهتك للطباعة الإلكترونية",
    description: "منصة اطبع أكبر منصة للطباعة الإلكترونية في المملكة العربية السعودية، تساعدك على طباعة كافة مستنداتك (المكتبية، الخاصة، المدرسية والجامعية، وغيرها) بمختلف الأحجام (ِA0 - A1 - A2 - A3 - A4 - A5) مع القدرة على التحكم بخيارات المطبوع وتغليفه، ومع تعدد طرق الدفع المتاحة وطريقة توصيله إليك.",
    keywords: "الطباعة الرقمية، الطباعة، الرقمية، الأوراق، الورق، المملكة العربية السعودية، طباعة، وثيقة، طباعة الوثائق، أسود، الملونة، الطابعات المهنية، ملازم، ملخصات، ملخصات جامعية، مستند، مستندات، وورد، بوربوينت، بي دي اف",
    siteName: "Print.sa",
    applicationName: "Print.sa"
  },
  en: {
    title: "Print Platform | Your Digital Printing Destination",
    description: "Print is the largest digital printing platform in Saudi Arabia. Print all your documents (office, personal, academic, and more) in various sizes (A0-A5) with full control over printing options and packaging, multiple payment methods, and delivery to your doorstep.",
    keywords: "digital printing, printing, documents, papers, Saudi Arabia, print services, black and white, color printing, professional printers, booklets, summaries, academic summaries, documents, word, powerpoint, pdf",
    siteName: "Print.sa",
    applicationName: "Print.sa"
  }
};

export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://print-sandy-seven.vercel.app";
};

export const getSEOData = (locale: string): SEOData => {
  return seoData[locale] || seoData.en;
};