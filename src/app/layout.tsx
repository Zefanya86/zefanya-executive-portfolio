import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope, Noto_Sans_SC } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { getPortfolioData } from '@/lib/server/portfolioStorage';
import CvModal from '@/components/ui/CvModal';
import WhatsAppVipWidget from '@/components/ui/WhatsAppVipWidget';
import ExecutivePresentationMode from '@/components/ui/ExecutivePresentationMode';
import ExecutiveAvailabilityModal from '@/components/ui/ExecutiveAvailabilityModal';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-chinese',
  weight: ['400', '500', '700'],
});

export const viewport: Viewport = {
  themeColor: '#0B0B0C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const title = data.seo?.metaTitle?.id || "Zefanya Zulian — The Modern Business Leader";
  const description = data.seo?.metaDescription?.id || "Zefanya Zulian - Executive platform in operations management, procurement strategy, logistics coordination, and business leadership.";

  return {
    title: {
      default: title,
      template: `%s | Zefanya Zulian`,
    },
    description: description,
    keywords: data.seo?.keywords || [
      'Zefanya Zulian',
      'The Modern Business Leader',
      'Operations Management',
      'Procurement Strategy',
      'Logistics Coordination',
      'PT Asri Praya KSO',
      'PT Mahaputra Baruna Logistik',
      'PT Aba Mandiri Sejahtera',
      'Universitas Bhayangkara Jakarta Raya',
      'General Manager',
      'Business Leadership',
      'Bekasi',
      'Indonesia'
    ],
    authors: [{ name: "Zefanya Zulian" }],
    creator: "Zefanya Zulian",
    metadataBase: new URL(data.seo?.canonicalUrl || 'https://zefanyazulian.com'),
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      alternateLocale: ['en_US', 'zh_CN'],
      url: data.seo?.canonicalUrl || 'https://zefanyazulian.com',
      title: title,
      description: description,
      siteName: 'Zefanya Zulian — Executive Branding Platform',
      images: [
        {
          url: data.seo?.ogImageUrl || '/zefanya-portrait.jpg',
          width: 1200,
          height: 1500,
          alt: 'Zefanya Zulian - The Modern Business Leader',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [data.seo?.ogImageUrl || '/zefanya-portrait.jpg'],
    },
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
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const portfolioData = await getPortfolioData();

  // Structured Data Schema.org (Google Knowledge Graph & Rich Results)
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://zefanyazulian.com/#person',
        name: 'Zefanya Zulian',
        givenName: 'Zefanya',
        familyName: 'Zulian',
        gender: 'Male',
        jobTitle: 'Head of Logistics & Operations Management Executive',
        description:
          'Profesional di bidang Operations Management, Procurement Strategy, dan Business Leadership dengan rekam jejak pada proyek infrastruktur maritim jembatan antar-pulau Kalimantan dan transportasi mineral.',
        url: 'https://zefanyazulian.com',
        image: 'https://zefanyazulian.com/zefanya-portrait.jpg',
        email: 'mailto:Zefanya.zuliann@gmail.com',
        telephone: '+6289681852453',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bekasi',
          addressRegion: 'Jawa Barat',
          addressCountry: 'ID',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Universitas Bhayangkara Jakarta Raya',
          sameAs: 'https://ubharajaya.ac.id',
        },
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Sarjana Ilmu Komunikasi (S.Ikom)',
            credentialCategory: 'degree',
            recognizedBy: {
              '@type': 'CollegeOrUniversity',
              name: 'Universitas Bhayangkara Jakarta Raya',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Certified Public Relations Officer',
            recognizedBy: {
              '@type': 'Organization',
              name: 'LSP Universitas Bhayangkara Jakarta Raya / BNSP',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'TOEFL Score 533 (CEFR B2 Upper Intermediate)',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Infinity English Learning',
            },
          },
        ],
        worksFor: [
          {
            '@type': 'Organization',
            name: 'PT. Asri – Praya, KSO',
            roleName: 'Head of Logistics (Material Procurement)',
          },
          {
            '@type': 'Organization',
            name: 'PT. Mahaputra Baruna Logistik',
            roleName: 'Site Operations Manager',
          },
          {
            '@type': 'Organization',
            name: 'PT. Aba Mandiri Sejahtera',
            roleName: 'General Manager',
          },
        ],
        knowsAbout: [
          'Operations Management',
          'Procurement Strategy',
          'Supply Chain Logistics',
          'Maritime Bridge Construction Logistics',
          'Mineral Bulk Haulage',
          'Vendor Management',
          'KPI Telemetry & Monitoring',
          'SOP Implementation & Compliance',
          'Corporate Governance',
        ],
        sameAs: [
          'https://www.linkedin.com/in/zefanya-zulian',
          'https://wa.me/6289681852453',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://zefanyazulian.com/#website',
        url: 'https://zefanyazulian.com',
        name: 'Zefanya Zulian — Executive Branding Platform',
        description: 'The Modern Business Leader — Building Value Through Strategy, Operations, and Leadership.',
        publisher: {
          '@id': 'https://zefanyazulian.com/#person',
        },
        inLanguage: ['id-ID', 'en-US', 'zh-CN'],
      },
    ],
  };

  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${manrope.variable} ${notoSansSC.variable} dark scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      </head>
      <body className="bg-obsidian text-ivory min-h-screen selection:bg-gold selection:text-obsidian antialiased transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-obsidian focus:font-semibold focus:outline-none focus:ring-2 focus:ring-ivory text-xs transition"
        >
          Lewati ke konten utama / Skip to main content
        </a>
        <PortfolioProvider initialData={portfolioData}>
          {children}
          <CvModal />
          <WhatsAppVipWidget />
          <ExecutivePresentationMode />
          <ExecutiveAvailabilityModal />
        </PortfolioProvider>
      </body>
    </html>
  );
}
