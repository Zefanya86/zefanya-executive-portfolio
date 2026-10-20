'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Wrench, Globe2, FileSpreadsheet, Check } from 'lucide-react';

export default function ToolsSection() {
  const { data, locale, t } = usePortfolio();

  return (
    <section id="tools" className="relative py-24 bg-graphite border-t border-platinum/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson tracking-widest uppercase">
            <span className="w-6 h-px bg-crimson" />
            <span>08 // {locale === 'id' ? 'PERANGKAT & BAHASA' : 'TOOLS & CAPABILITIES'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-warmWhite">
            {locale === 'id' ? 'Perangkat Kerja & Kompetensi Bahasa' : 'Productivity Stack & Language Fluency'}
          </h2>

          <p className="text-base sm:text-lg text-platinum-muted font-normal pt-1">
            {locale === 'id'
              ? 'Penguasaan instrumen pemodelan data operasional, dokumentasi manajemen eksekutif, serta komunikasi bisnis internasional.'
              : 'Enterprise modeling software, executive reporting instruments, and certified bilingual business communication.'}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tools Grid */}
          <div className="lg:col-span-7">
            <p className="text-xs font-mono uppercase tracking-widest text-platinum-muted mb-4">
              {locale === 'id' ? 'Perangkat Lunak & Sistem Operasional' : 'Software Ecosystem & Productivity Tools'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {data.tools.map((tool) => (
                <div
                  key={tool.id}
                  className="p-4 rounded-xl bg-graphite-surface border border-platinum/10 hover:border-crimson/40 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-obsidian border border-platinum/15 flex items-center justify-center text-platinum group-hover:text-crimson transition">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-warmWhite">
                      {tool.name}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-platinum-muted px-2 py-0.5 rounded bg-obsidian border border-platinum/10">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-mono uppercase tracking-widest text-platinum-muted mb-4">
              {locale === 'id' ? 'Komunikasi Bahasa' : 'Language Proficiencies'}
            </p>

            <div className="space-y-4">
              {data.languages.map((lang) => (
                <div
                  key={lang.id}
                  className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 shadow-card-executive relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-crimson" />
                        <h4 className="text-lg font-bold text-warmWhite">
                          {t(lang.name)}
                        </h4>
                      </div>
                      <p className="text-sm text-platinum font-medium mt-1">
                        {t(lang.level)}
                      </p>
                    </div>

                    {lang.badge && (
                      <span className="px-3 py-1 rounded-full bg-crimson/15 border border-crimson/30 text-xs font-mono font-bold text-crimson">
                        {lang.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-platinum/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>
                      {lang.id === 'lang-1'
                        ? (locale === 'id' ? 'Bahasa Ibu / Komunikasi Aktif' : 'Native Fluency')
                        : (locale === 'id' ? 'Terakreditasi Tes TOEFL 533' : 'TOEFL 533 Certified')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
