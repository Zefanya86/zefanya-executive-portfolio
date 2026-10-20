'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, Locale, LocalizedString, LocalizedStringList } from '@/types/portfolio';
import { initialPortfolioData } from '@/data/initialData';

interface PortfolioContextType {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isCvModalOpen: boolean;
  setIsCvModalOpen: (open: boolean) => void;
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
  const [locale, setLocaleState] = useState<Locale>('id');
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Load locale preference from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('zefanya_locale') as Locale;
      if (savedLocale === 'id' || savedLocale === 'en') {
        setLocaleState(savedLocale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('zefanya_locale', newLocale);
    }
  };

  const t = (val: LocalizedString | undefined): string => {
    if (!val) return '';
    return val[locale] || val.id || val.en || '';
  };

  const tList = (val: LocalizedStringList | undefined): string[] => {
    if (!val) return [];
    return val[locale] || val.id || val.en || [];
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
        isCvModalOpen,
        setIsCvModalOpen,
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
