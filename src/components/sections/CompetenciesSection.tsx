'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Layers, ShieldCheck, Check } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function CompetenciesSection() {
  const { data, locale, t } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: { id: 'Semua Kompetensi (15)', en: 'All Competencies (15)', zh: '全部核心能力 (15)' } },
    { id: 'operations', label: { id: 'Operations', en: 'Operations', zh: '运营管控' } },
    { id: 'procurement', label: { id: 'Procurement', en: 'Procurement', zh: '物资采购' } },
    { id: 'logistics', label: { id: 'Logistics', en: 'Logistics', zh: '重大物流' } },
    { id: 'leadership', label: { id: 'Leadership', en: 'Leadership', zh: '团队领导' } },
    { id: 'strategy', label: { id: 'Strategy & Compliance', en: 'Strategy & Compliance', zh: '战略与合规' } },
  ];

  const filteredCompetencies =
    selectedCategory === 'all'
      ? data.competencies
      : data.competencies.filter((c) => c.category === selectedCategory);

  return (
    <section id="competencies" className="relative py-28 bg-obsidian border-t border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-[10px] sm:text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>04 // CORE EXPERTISE & COMPETENCIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {locale === 'id' ? (
              <>
                Matriks Kompetensi & <br />
                <span className="gold-gradient-text">Keahlian Profesional.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Core Competencies & <br />
                <span className="gold-gradient-text">Professional Expertise.</span>
              </>
            ) : (
              <>
                核心胜任力矩阵与 <br />
                <span className="gold-gradient-text">专业管理技能体系。</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-softGray font-sans font-normal leading-relaxed">
            {locale === 'id'
              ? 'Seluruh kompetensi divalidasi langsung melalui pengalaman manajerial riil pada proyek konstruksi, transportasi mineral, dan pengadaan korporat.'
              : locale === 'en'
              ? 'Authentic operational and management capabilities grounded in direct leadership across heavy civil infrastructure, mineral logistics, and enterprise procurement.'
              : '所有专业能力均经过国家大型工程实战、大宗矿产调度及企业级采购管理的直接检验与真实验证。'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-10">
          {categories.map((cat) => {
            const label = cat.label[locale] || cat.label.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-gold text-obsidian font-bold shadow-gold-subtle'
                    : 'bg-charcoal text-softGray border border-hairline hover:border-gold/40 hover:text-ivory'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Competencies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompetencies.map((comp, idx) => (
            <div
              key={comp.id}
              className="p-6 rounded-2xl bg-charcoal border border-hairline hover:border-gold/50 transition-all duration-300 group shadow-luxury-card hover:shadow-gold-subtle cursor-pointer hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] font-sans text-gold uppercase tracking-widest font-bold">
                  {comp.category}
                </span>
                <span className="text-xs font-mono text-softGray/50 font-bold">
                  #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
              </div>

              <h3 className="text-base font-serif font-bold text-ivory mt-2 group-hover:text-gold transition-colors">
                {t(comp.title)}
              </h3>

              {comp.description && (
                <p className="text-xs text-softGray mt-2 font-sans leading-relaxed">
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
