'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import { Download, Globe, Menu, X, Shield, ChevronRight } from 'lucide-react';

export default function Navigation() {
  const { data, locale, setLocale, setIsCvModalOpen } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: locale === 'id' ? 'Profil' : 'About' },
    { href: '#experience', label: locale === 'id' ? 'Pengalaman' : 'Experience' },
    { href: '#competencies', label: locale === 'id' ? 'Kompetensi' : 'Expertise' },
    { href: '#leadership', label: locale === 'id' ? 'Kepemimpinan' : 'Leadership' },
    { href: '#education', label: locale === 'id' ? 'Pendidikan & Lisensi' : 'Credentials' },
    { href: '#achievements', label: locale === 'id' ? 'Pencapaian' : 'Achievements' },
    { href: '#contact', label: locale === 'id' ? 'Kontak' : 'Contact' },
  ];

  const toggleLanguage = () => {
    setLocale(locale === 'id' ? 'en' : 'id');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian/90 backdrop-blur-md border-b border-platinum/10 py-3 shadow-lg'
            : 'bg-gradient-to-b from-obsidian/90 via-obsidian/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-crimson rounded-lg"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-graphite-surface to-obsidian border border-platinum/20 flex items-center justify-center shadow-card-executive group-hover:border-crimson/50 transition">
              <span className="font-mono font-bold text-sm tracking-wider text-warmWhite group-hover:text-crimson transition">
                ZZ
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-wider text-warmWhite group-hover:text-platinum-bright transition uppercase">
                {data.profile.fullName}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-platinum-muted uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                <span>Executive Operations</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-platinum-muted hover:text-warmWhite hover:bg-graphite/60 rounded-md transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Language & CV Button */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language Selector */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-platinum hover:text-white bg-graphite/60 border border-platinum/15 rounded-lg hover:border-platinum/30 transition"
              title="Ganti Bahasa / Switch Language"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-crimson" />
              <span className={locale === 'id' ? 'font-bold text-white' : 'text-platinum-muted'}>ID</span>
              <span className="text-platinum-muted/50">|</span>
              <span className={locale === 'en' ? 'font-bold text-white' : 'text-platinum-muted'}>EN</span>
            </button>

            {/* CV Download Modal Button */}
            <button
              onClick={() => setIsCvModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-crimson to-crimson-dark rounded-lg hover:brightness-110 shadow-glow-crimson transition active:scale-95 border border-crimson-light/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{locale === 'id' ? 'Unduh CV' : 'Download CV'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="p-2 text-xs font-mono text-platinum bg-graphite/80 border border-platinum/15 rounded-lg"
              aria-label="Switch Language"
            >
              <span className="text-crimson font-bold">{locale.toUpperCase()}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-platinum-muted hover:text-white bg-graphite/80 border border-platinum/15 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 sm:hidden bg-obsidian/95 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-widest text-platinum-muted">
              {locale === 'id' ? 'Navigasi Portofolio' : 'Portfolio Navigation'}
            </p>
            <div className="divide-y divide-platinum/10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-base font-medium text-platinum hover:text-crimson transition"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-platinum-muted" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-platinum/15">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCvModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-crimson rounded-xl shadow-glow-crimson"
            >
              <Download className="w-4 h-4" />
              <span>{locale === 'id' ? 'Unduh Resume / CV' : 'Download Resume / CV'}</span>
            </button>

            <div className="flex items-center justify-between text-xs text-platinum-muted font-mono">
              <span>{data.profile.fullName}</span>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1 hover:text-crimson"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
