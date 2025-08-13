import type { Metadata } from "next"
import "../globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { RecaptchaProvider } from "@/components/RecaptchaProvider"

// SEO metadata for different languages
const seoData = {
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
}

// Generate metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const seo = seoData[locale as keyof typeof seoData] || seoData.en
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.print.sa"

  return {
    title: {
      default: seo.title,
      template: `%s | ${seo.siteName}`
    },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: seo.applicationName,

    // Robots and indexing
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Open Graph
    openGraph: {
      type: 'website',
      locale: locale,
      alternateLocale: locale === 'ar' ? 'en' : 'ar',
      url: `${baseUrl}/${locale}`,
      siteName: seo.siteName,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: `${baseUrl}/ndist/images/icon/og/printdotsa_og.png`,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
        {
          url: `${baseUrl}/dist/ndist/images/icon/og/print_logo_og.png`,
          width: 800,
          height: 600,
          alt: seo.siteName,
        }
      ],
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: '@printdotsa',
      creator: '@printdotsa',
      title: seo.title,
      description: seo.description,
      images: [`${baseUrl}/dist/img/icon/og/printdotsa_og.png`],
    },

    // Icons and favicons
    icons: {
      icon: [
        { url: '/ndist/images/icon/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/ndist/images/icon/favicon-57.png', sizes: '57x57', type: 'image/png' },
        { url: '/ndist/images/icon/favicon-76.png', sizes: '76x76', type: 'image/png' },
        { url: '/ndist/images/icon/favicon-96.png', sizes: '96x96', type: 'image/png' },
        { url: '/ndist/images/icon/favicon-128.png', sizes: '128x128', type: 'image/png' },
        { url: '/ndist/images/icon/favicon-228.png', sizes: '228x228', type: 'image/png' },
      ],
      shortcut: [
        { url: '/ndist/images/icon/favicon-196.png', sizes: '196x196' }
      ],
      apple: [
        { url: '/ndist/images/icon/favicon-120.png', sizes: '120x120' },
        { url: '/ndist/images/icon/favicon-152.png', sizes: '152x152' },
        { url: '/ndist/images/icon/favicon-180.png', sizes: '180x180' },
      ],
    },

    // Apple specific
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: seo.applicationName,
    },

    // Manifest and app links
    manifest: '/manifest.json',

    // Alternative languages
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'ar': `${baseUrl}/ar`,
        'en': `${baseUrl}/en`,
      },
    },

    // Additional metadata
    other: {
      'apple-itunes-app': 'app-id=1513699123',
      'google-site-verification': 'z48IBp_z1gvaZM6-Gpnwtt3vFaj9I2bLOczR-pVk69Y',
      'msapplication-TileColor': '#5C0C7F',
      'theme-color': '#5C0C7F',
    },

    // Verification
    verification: {
      google: 'z48IBp_z1gvaZM6-Gpnwtt3vFaj9I2bLOczR-pVk69Y',
    },
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WPH6V5G');`
          }}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://www.schema.org",
              "@type": "Corporation",
              "name": locale === 'ar' ? "منصة اطبع" : "Print Platform",
              "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.print.sa'}`,
              "contactPoint": [{
                "@type": "ContactPoint",
                "email": "support@print.sa",
                "contactType": "customer service",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.print.sa'}`
              }],
              "logo": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.print.sa'}/dist/ndist/images/icon/og/print_logo_og.png`,
              "description": seoData[locale as keyof typeof seoData]?.description || seoData.en.description,
              "sameAs": [
                "https://www.facebook.com/printdotsa",
                "https://www.twitter.com/printdotsa",
                "https://www.instagram.com/printdotsa"
              ]
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://www.schema.org",
              "@type": "WebSite",
              "name": locale === 'ar' ? "منصة اطبع" : "Print Platform",
              "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.print.sa'}`,
              "description": seoData[locale as keyof typeof seoData]?.description || seoData.en.description,
              "publisher": {
                "@type": "Corporation",
                "name": locale === 'ar' ? "منصة اطبع" : "Print Platform"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.print.sa'}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>

      <body suppressHydrationWarning className={`antialiased font-rubik`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPH6V5G"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <NextIntlClientProvider>
          <RecaptchaProvider />
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}