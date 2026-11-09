'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowUp, Lock, ShieldCheck, CreditCard, FileDown, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function Footer() {
  const { data, locale, t } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '/#about', label: { id: 'Tentang', en: 'About', zh: '关于' } },
    { href: '/experience', label: { id: 'Pengalaman', en: 'Experience', zh: '职业履历' } },
    { href: '/projects', label: { id: 'Proyek', en: 'Projects', zh: '工程案例' } },
    { href: '/gallery', label: { id: 'Galeri', en: 'Gallery', zh: '活动画廊' } },
    { href: '/journal', label: { id: 'Artikel', en: 'Journal', zh: '深度专栏' } },
    { href: '/card', label: { id: 'Kartu Nama Digital', en: 'Digital Card', zh: '数字名片' } },
    { href: '/download', label: { id: 'Unduh Dokumen', en: 'Download Center', zh: '文档下载' } },
    { href: '/contact', label: { id: 'Kontak', en: 'Contact', zh: '商务接洽' } },
  ];

  return (
    <footer className="relative bg-obsidian border-t border-hairline py-16 text-softGray overflow-hidden">
      {/* Top subtle gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 border-b border-hairline/60">
          {/* Identity Lockup with Monogram */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-gold/60 bg-gold/10 flex items-center justify-center font-serif text-gold text-sm font-bold">
                ZZ
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-ivory tracking-wide block">
                  {data.profile.fullName}
                </span>
                <span className="text-[10px] font-sans text-gold uppercase tracking-widest font-semibold">
                  {t(data.profile.positioning)}
                </span>
              </div>
            </div>
            <p className="text-xs text-softGray max-w-md font-sans pt-1">
              {t(data.hero.tagline)}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-sans font-medium uppercase tracking-wider text-softGray">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => sound.playClick()}
                className="hover:text-gold transition-colors"
              >
                {item.label[locale] || item.label.id}
              </Link>
            ))}
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-charcoal border border-hairline hover:border-gold text-ivory hover:text-gold transition-all duration-300 group hover:shadow-gold-subtle"
            aria-label="Kembali ke atas / Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-softGray">
          <p>
            © {currentYear} {data.profile.fullName}.{' '}
            {locale === 'id'
              ? 'Hak Cipta Dilindungi Undang-Undang.'
              : locale === 'en'
              ? 'All Rights Reserved.'
              : '保留所有权利。'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 text-gold font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span>BEKASI, WEST JAVA, INDONESIA</span>
            </span>
            <span>•</span>
            <Link
              href="/card"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1 hover:text-gold transition-colors"
            >
              <CreditCard size={12} />
              <span>vCard</span>
            </Link>
            <span>•</span>
            <Link
              href="/download"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1 hover:text-gold transition-colors"
            >
              <FileDown size={12} />
              <span>CV PDF</span>
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 text-softGray/70 hover:text-gold transition-colors"
              title="Admin Control Center"
            >
              <Lock className="w-3 h-3" />
              <span>CMS Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
