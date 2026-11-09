'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/ui/Navigation';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import MediaLightbox from '@/components/ui/MediaLightbox';
import CommandPalette from '@/components/ui/CommandPalette';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowLeft } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function ContactPage() {
  const { locale } = usePortfolio();

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory selection:bg-gold selection:text-obsidian transition-colors duration-300 flex flex-col">
      <Navigation />

      <main className="flex-1 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-softGray">
            <Link
              href="/"
              onClick={() => sound.click()}
              className="hover:text-gold flex items-center gap-1 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>{locale === 'zh' ? '首页' : locale === 'en' ? 'HOME' : 'BERANDA'}</span>
            </Link>
            <span>/</span>
            <span className="text-gold font-bold">
              {locale === 'zh' ? '商务联络' : locale === 'en' ? 'CONTACT' : 'KONTAK'}
            </span>
          </div>
        </div>

        <ContactSection />
      </main>

      <Footer />
      <MediaLightbox />
      <CommandPalette />
    </div>
  );
}
