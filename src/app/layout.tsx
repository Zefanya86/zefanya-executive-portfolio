import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { getPortfolioData } from '@/lib/server/portfolioStorage';
import CvModal from '@/components/ui/CvModal';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: '#090A0D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const title = data.seo.metaTitle.id || "Zefanya Zulian | Operations, Procurement & Business Management";
  const description = data.seo.metaDescription.id || "Official executive portfolio of Zefanya Zulian, General Manager with comprehensive experience in operations management, procurement, logistics, infrastructure projects, and business operations.";

  return {
    title: {
      default: title,
      template: `%s | Zefanya Zulian`,
    },
    description: description,
    keywords: data.seo.keywords,
    authors: [{ name: "Zefanya Zulian" }],
    creator: "Zefanya Zulian",
    metadataBase: new URL(data.seo.canonicalUrl || 'https://zefanyazulian.com'),
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      alternateLocale: ['en_US'],
      url: data.seo.canonicalUrl || 'https://zefanyazulian.com',
      title: title,
      description: description,
      siteName: 'Zefanya Zulian Executive Portfolio',
      images: [
        {
          url: data.seo.ogImageUrl || '/zefanya-portrait.jpg',
          width: 1200,
          height: 1500,
          alt: 'Zefanya Zulian - General Manager Operations & Procurement',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [data.seo.ogImageUrl || '/zefanya-portrait.jpg'],
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

  return (
    <html lang="id" className={`${manrope.variable} dark scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-obsidian text-warmWhite min-h-screen selection:bg-crimson selection:text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-crimson focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-white font-medium text-sm transition"
        >
          Lewati ke konten utama / Skip to main content
        </a>
        <PortfolioProvider initialData={portfolioData}>
          {children}
          <CvModal />
        </PortfolioProvider>
      </body>
    </html>
  );
}
