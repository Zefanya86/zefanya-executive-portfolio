'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePortfolio } from '@/context/PortfolioContext';
import { Locale } from '@/types/portfolio';
import {
  Download,
  Menu,
  X,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Command,
  CreditCard,
  FileDown,
  Sparkles,
  Presentation,
  Compass,
} from 'lucide-react';
import { sound } from '@/lib/sound';

export default function Navigation() {
  const {
    data,
    locale,
    setLocale,
    theme,
    toggleTheme,
    setIsCvModalOpen,
    setIsCommandPaletteOpen,
    setIsPresentationOpen,
    setIsAvailabilityModalOpen,
    soundEnabled,
    toggleSound,
  } = usePortfolio();

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live Jakarta WIB Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('id-ID', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Multilingual Navigation Labels
  const navItems = [
    {
      href: '/#about',
      label: { id: 'TENTANG', en: 'ABOUT', zh: '关于' },
    },
    {
      href: '/experience',
      label: { id: 'PENGALAMAN', en: 'EXPERIENCE', zh: '职业履历' },
    },
    {
      href: '/projects',
      label: { id: 'PROYEK', en: 'PROJECTS', zh: '工程案例' },
    },
    {
      href: '/gallery',
      label: { id: 'GALERI', en: 'GALLERY', zh: '活动画廊' },
    },
    {
      href: '/journal',
      label: { id: 'ARTIKEL', en: 'JOURNAL', zh: '深度专栏' },
    },
    {
      href: '/card',
      label: { id: 'KARTU NAMA', en: 'CARD', zh: '数字名片' },
    },
    {
      href: '/contact',
      label: { id: 'KONTAK', en: 'CONTACT', zh: '商务接洽' },
    },
  ];

  const languages: { code: Locale; label: string }[] = [
    { code: 'id', label: 'ID' },
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中文' },
  ];

  return (
    <>
      {/* Floating Ultra Luxury Header Dock */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3.5 sm:pt-5 pointer-events-none transition-all duration-300">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 ${
            isScrolled
              ? 'bg-obsidian/90 dark:bg-obsidian/95 backdrop-blur-2xl border border-gold/30 shadow-luxury-elevated'
              : 'bg-obsidian/75 dark:bg-obsidian/85 backdrop-blur-xl border border-white/10 dark:border-gold/20 shadow-lg'
          }`}
        >
          {/* Brand Identity / Monogram */}
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Monogram Badge */}
            <div className="w-8 h-8 rounded-full border border-gold/60 bg-gold/10 flex items-center justify-center font-serif text-gold text-xs font-bold tracking-wider group-hover:scale-105 group-hover:border-gold group-hover:bg-gold/20 transition-all duration-300">
              ZZ
            </div>

            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-serif font-bold tracking-wider text-ivory group-hover:text-gold transition-colors">
                ZEFANYA ZULIAN
              </span>
              <span className="text-[9px] font-sans tracking-widest uppercase text-softGray hidden sm:inline">
                The Modern Business Leader
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-[11px] font-sans tracking-wider uppercase font-medium">
            {navItems.map((item) => {
              const labelText = item.label[locale] || item.label.id;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-gold bg-gold/15 font-semibold'
                      : 'text-softGray hover:text-ivory hover:bg-white/5'
                  }`}
                >
                  {labelText}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Language Selector, Theme, Sound, CV CTA */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsCommandPaletteOpen(true);
              }}
              title="Open Command Palette (Cmd+K / Ctrl+K)"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono text-softGray hover:text-gold hover:bg-gold/10 transition-colors border border-transparent hover:border-gold/30"
            >
              <Command size={10} className="text-gold" />
              <span>⌘K</span>
            </button>

            {/* Executive Availability Radar Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsAvailabilityModalOpen(true);
              }}
              title="Status Radar Ketersediaan Karier & Kemitraan Eksekutif"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/25 transition-all border border-emerald-500/30"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Radar</span>
            </button>

            {/* Executive Keynote Presentation Mode Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsPresentationOpen(true);
              }}
              title="Mode Presentasi Eksekutif / Keynote (Shortcut: Tekan P)"
              className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-gold bg-gold/15 hover:bg-gold hover:text-obsidian transition-all border border-gold/30 shadow-[0_0_10px_rgba(197,164,119,0.2)]"
            >
              <Presentation size={12} />
              <span>Presentasi [P]</span>
            </button>

            {/* Language Selector: ID | EN | 中文 */}
            <div className="flex items-center bg-black/40 border border-hairline/60 dark:border-gold/25 rounded-full p-0.5 text-[10px] font-sans font-semibold">
              {languages.map((lang) => {
                const isCurrent = locale === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      sound.playClick();
                      setLocale(lang.code);
                    }}
                    title={`Switch to ${lang.label}`}
                    className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
                      isCurrent
                        ? 'bg-gold text-obsidian font-bold shadow-xs'
                        : 'text-softGray hover:text-ivory'
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => toggleSound()}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              className={`p-1.5 rounded-full transition-colors ${
                soundEnabled
                  ? 'text-gold bg-gold/15'
                  : 'text-softGray hover:text-ivory hover:bg-white/5'
              }`}
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={() => {
                sound.playClick();
                toggleTheme();
              }}
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="p-1.5 rounded-full text-softGray hover:text-gold hover:bg-white/5 transition-colors"
            >
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            </button>

            {/* CV Download CTA Modal Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsCvModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold hover:bg-gold-light text-obsidian text-[11px] font-sans font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-gold-subtle hover:scale-102 active:scale-98"
            >
              <Download size={11} className="stroke-[2.5]" />
              <span className="hidden sm:inline">CV</span>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-1.5 rounded-full xl:hidden text-softGray hover:text-ivory focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Luxury Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 max-w-md mx-auto rounded-2xl bg-obsidian/95 backdrop-blur-2xl border border-gold/30 p-6 shadow-2xl text-ivory pointer-events-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-hairline/60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-gold bg-gold/15 flex items-center justify-center font-serif text-gold text-[10px] font-bold">
                  ZZ
                </div>
                <span className="text-xs font-serif font-bold text-ivory">
                  ZEFANYA ZULIAN
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-softGray hover:text-ivory"
              >
                <X size={16} />
              </button>
            </div>

            {/* Links list */}
            <div className="py-4 space-y-2 font-serif">
              {navItems.map((item, idx) => {
                const labelText = item.label[locale] || item.label.id;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      sound.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between text-base py-2 px-3 rounded-lg hover:bg-gold/10 hover:text-gold transition-colors"
                  >
                    <span>{labelText}</span>
                    <span className="text-xs font-sans text-softGray">0{idx + 1}</span>
                  </Link>
                );
              })}
            </div>

            {/* Language Switcher on Mobile Drawer */}
            <div className="pt-3 pb-4 border-t border-hairline/40 flex items-center justify-between">
              <span className="text-xs text-softGray uppercase tracking-wider font-sans">
                {locale === 'id' ? 'Pilih Bahasa' : locale === 'en' ? 'Select Language' : '选择语言'}
              </span>
              <div className="flex items-center gap-1 bg-black/50 p-1 rounded-full border border-gold/30">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      sound.playClick();
                      setLocale(lang.code);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-sans font-semibold transition-colors ${
                      locale === lang.code
                        ? 'bg-gold text-obsidian font-bold'
                        : 'text-softGray hover:text-ivory'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  setIsAvailabilityModalOpen(true);
                }}
                className="w-full py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{locale === 'id' ? 'STATUS RADAR EKSEKUTIF' : locale === 'en' ? 'EXECUTIVE RADAR STATUS' : '高管履新就职雷达'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  setIsCvModalOpen(true);
                }}
                className="w-full py-2.5 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-subtle"
              >
                <Download size={13} />
                <span>DOWNLOAD CURRICULUM VITAE</span>
              </button>

              <Link
                href="/card"
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 rounded-full border border-gold/40 hover:bg-gold/10 text-gold font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <CreditCard size={13} />
                <span>DIGITAL BUSINESS CARD</span>
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-between text-[10px] font-sans text-softGray">
              <span>BEKASI, INDONESIA</span>
              <span>JKT {currentTime} WIB</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
