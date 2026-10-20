'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  Layers,
  CheckCircle,
  Truck,
  ShieldCheck,
  TrendingUp,
  Users,
  Compass,
  Briefcase,
  SlidersHorizontal,
} from 'lucide-react';

export default function CompetenciesSection() {
  const { data, locale, t } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: locale === 'id' ? 'Semua Bidang (15)' : 'All Capabilities (15)' },
    { id: 'operations', label: locale === 'id' ? 'Operations' : 'Operations' },
    { id: 'procurement', label: locale === 'id' ? 'Procurement' : 'Procurement' },
    { id: 'logistics', label: locale === 'id' ? 'Logistics & Fleet' : 'Logistics & Fleet' },
    { id: 'leadership', label: locale === 'id' ? 'Leadership' : 'Leadership' },
    { id: 'strategy', label: locale === 'id' ? 'Strategy & KPI' : 'Strategy & KPI' },
  ];

  const filteredCompetencies = selectedCategory === 'all'
    ? data.competencies
    : data.competencies.filter((c) => c.category === selectedCategory);

  return (
    <section id="competencies" className="relative py-24 bg-graphite border-t border-platinum/10 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson tracking-widest uppercase">
              <span className="w-6 h-px bg-crimson" />
              <span>04 // {locale === 'id' ? 'KOMPETENSI INTI' : 'AREAS OF EXPERTISE'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-warmWhite">
              {locale === 'id' ? 'Keahlian & Kapabilitas Eksekutif' : 'Core Executive Competencies'}
            </h2>

            <p className="text-base sm:text-lg text-platinum-muted font-normal pt-1">
              {locale === 'id'
                ? 'Struktur kompetensi komprehensif yang telah divalidasi melalui pengalaman manajerial lapangan dan tata kelola korporat.'
                : 'Comprehensive operational competencies validated through hands-on enterprise leadership and field governance.'}
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-crimson text-white font-semibold shadow-glow-crimson'
                  : 'bg-obsidian-soft text-platinum-muted border border-platinum/10 hover:border-platinum/25 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Competencies Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredCompetencies.map((comp, idx) => (
            <div
              key={comp.id}
              className="p-5 sm:p-6 rounded-2xl bg-graphite-surface border border-platinum/10 hover:border-crimson/50 hover:bg-graphite transition-all duration-300 group shadow-sm hover:shadow-card-executive relative overflow-hidden"
            >
              {/* Subtle crimson accent line on top */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-crimson/30 to-transparent group-hover:via-crimson transition-all duration-500" />

              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-mono text-crimson uppercase tracking-wider font-semibold">
                  {comp.category}
                </span>
                <span className="text-xs font-mono text-platinum-muted/50">
                  #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-warmWhite mt-2 group-hover:text-white transition">
                {t(comp.title)}
              </h3>

              {comp.description && (
                <p className="text-xs sm:text-sm text-platinum-muted mt-2 leading-relaxed">
                  {t(comp.description)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
