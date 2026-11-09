'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, Locale, LocalizedString, LocalizedStringList, MediaItem } from '@/types/portfolio';
import { initialPortfolioData } from '@/data/initialData';
import { sound } from '@/lib/sound';

export type ThemeMode = 'light' | 'dark';

interface PortfolioContextType {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isCvModalOpen: boolean;
  setIsCvModalOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isPresentationOpen: boolean;
  setIsPresentationOpen: (open: boolean) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  isAvailabilityModalOpen: boolean;
  setIsAvailabilityModalOpen: (open: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  lightboxMedia: MediaItem | null;
  openLightbox: (media: MediaItem) => void;
  closeLightbox: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  t: (val: LocalizedString | undefined) => string;
  tList: (val: LocalizedStringList | undefined) => string[];
  refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: PortfolioData;
}) {
  const [data, setData] = useState<PortfolioData>(initialData || initialPortfolioData);
  // Default language is strictly Bahasa Indonesia ('id') per Master Prompt specification
  const [locale, setLocaleState] = useState<Locale>('id');
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  // Load preferences from localStorage and cookies on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for URL query param e.g. ?lang=zh or ?lang=en
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang') as Locale;
      if (urlLang && (urlLang === 'id' || urlLang === 'en' || urlLang === 'zh')) {
        setLocaleState(urlLang);
        localStorage.setItem('zefanya_locale', urlLang);
        document.cookie = `zefanya_locale=${urlLang};path=/;max-age=31536000;SameSite=Lax`;
      } else {
        const savedLocale = localStorage.getItem('zefanya_locale') as Locale;
        if (savedLocale === 'id' || savedLocale === 'en' || savedLocale === 'zh') {
          setLocaleState(savedLocale);
        } else {
          // Default to 'id' on initial visit
          setLocaleState('id');
        }
      }

      const savedTheme = localStorage.getItem('zefanya_theme') as ThemeMode;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
        applyThemeClass(savedTheme);
      } else {
        // Master Prompt: Luxury Dark Mode as primary default
        applyThemeClass('dark');
      }

      const handleKey = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) {
          return;
        }
        if ((e.key === 'p' || e.key === 'P') && !e.metaKey && !e.ctrlKey) {
          setIsPresentationOpen((prev) => !prev);
        }
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, []);

  const applyThemeClass = (targetTheme: ThemeMode) => {
    if (typeof document !== 'undefined') {
      if (targetTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    applyThemeClass(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('zefanya_theme', newTheme);
      document.cookie = `zefanya_theme=${newTheme};path=/;max-age=31536000;SameSite=Lax`;
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('zefanya_locale', newLocale);
      document.cookie = `zefanya_locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
      // Update HTML lang attribute
      document.documentElement.lang = newLocale;
    }
  };

  const openLightbox = (media: MediaItem) => {
    setLightboxMedia(media);
  };

  const closeLightbox = () => {
    setLightboxMedia(null);
  };

  // Trilingual string resolver with 'id' as priority fallback
  const t = (val: LocalizedString | undefined): string => {
    if (!val) return '';
    return val[locale] || val.id || val.en || val.zh || '';
  };

  const tList = (val: LocalizedStringList | undefined): string[] => {
    if (!val) return [];
    return val[locale] || val.id || val.en || val.zh || [];
  };

  const refreshData = async () => {
    try {
      const res = await fetch('/api/portfolio', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setData(json.data);
        }
      }
    } catch (err) {
      console.error('Error refreshing portfolio data:', err);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        setData,
        locale,
        setLocale,
        theme,
        setTheme,
        toggleTheme,
        isCvModalOpen,
        setIsCvModalOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isPresentationOpen,
        setIsPresentationOpen,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        isAvailabilityModalOpen,
        setIsAvailabilityModalOpen,
        soundEnabled,
        toggleSound,
        lightboxMedia,
        openLightbox,
        closeLightbox,
        activeSection,
        setActiveSection,
        t,
        tList,
        refreshData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
