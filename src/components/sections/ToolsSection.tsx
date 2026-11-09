'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Globe2, FileSpreadsheet, Check, ShieldCheck, Wrench } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function ToolsSection() {
  const { data, locale, t } = usePortfolio();

  return (
    <section id="tools" className="relative py-28 bg-obsidian border-t border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-[10px] sm:text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>07 // OPERATIONAL TOOLKIT & LANGUAGE FLUENCY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {locale === 'id' ? (
              <>
                Instrumen Produktivitas & <br />
                <span className="gold-gradient-text">Kemampuan Bahasa.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Productivity Instruments & <br />
                <span className="gold-gradient-text">Language Fluency.</span>
              </>
            ) : (
              <>
                数字化运营工具矩阵与 <br />
                <span className="gold-gradient-text">双语商务沟通能力。</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-softGray font-sans font-normal leading-relaxed">
            {locale === 'id'
              ? 'Penguasaan instrumen pemodelan data operasional, dokumentasi manajemen eksekutif, serta komunikasi bisnis internasional bilingual yang terakreditasi.'
              : locale === 'en'
              ? 'Mastery over operational data modeling, executive documentation systems, and certified bilingual business communication.'
              : '熟练运用运营数据处理软件、管理层高标准分析汇报工具，并具备经权威考试认证的商务双语交流水准。'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tools Grid (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-2">
              <Wrench size={13} className="text-gold" />
              <span>{locale === 'id' ? 'Perangkat Lunak Operasional' : locale === 'en' ? 'Productivity Software Suite' : '日常运营专业软件套件'}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {data.tools.map((tool) => (
                <div
                  key={tool.id}
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="p-4 rounded-xl bg-charcoal border border-hairline hover:border-gold/50 transition-all duration-300 flex items-center justify-between group shadow-luxury-card cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-obsidian border border-hairline flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-serif font-bold text-ivory group-hover:text-gold transition-colors">
                      {tool.name}
                    </span>
                  </div>

                  <span className="text-[10px] font-sans uppercase tracking-wider text-softGray px-2 py-0.5 rounded-full bg-obsidian border border-hairline">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-2">
              <Globe2 size={13} className="text-gold" />
              <span>{locale === 'id' ? 'Kemahiran Bahasa' : locale === 'en' ? 'Language Proficiencies' : '语言应用能力'}</span>
            </p>

            <div className="space-y-4">
              {data.languages.map((lang) => (
                <div
                  key={lang.id}
                  onMouseEnter={() => sound.playHover()}
                  className="p-6 rounded-2xl bg-charcoal border border-hairline shadow-luxury-card relative overflow-hidden group hover:border-gold/60 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-gold" />
                        <h4 className="text-lg font-serif font-bold text-ivory">
                          {t(lang.name)}
                        </h4>
                      </div>
                      <p className="text-sm text-softGray font-sans mt-1">
                        {t(lang.level)}
                      </p>
                    </div>

                    {lang.badge && (
                      <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-sans font-bold text-gold">
                        {lang.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-hairline flex items-center gap-2 text-xs font-sans text-gold">
                    <Check className="w-3.5 h-3.5 text-gold" />
                    <span>
                      {lang.id === 'lang-1'
                        ? (locale === 'id' ? 'Penutur Asli / Native Fluency' : locale === 'en' ? 'Native Language Fluency' : '母语级应用水准')
                        : (locale === 'id' ? 'Terakreditasi Skor TOEFL 533 (CEFR B2)' : locale === 'en' ? 'Certified TOEFL Score 533 (CEFR B2)' : '托福 533 分 (CEFR B2) 官方认证')}
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
