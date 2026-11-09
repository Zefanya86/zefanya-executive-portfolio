'use client';

import React, { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Languages, Search, CheckCircle2, Globe, Sparkles } from 'lucide-react';

interface TranslationModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function TranslationModule({ data, setData }: TranslationModuleProps) {
  const [filter, setFilter] = useState('');

  // Extract key phrases for translation overview
  const phrases = [
    {
      key: 'Hero Eyebrow',
      id: data.hero.eyebrow.id,
      en: data.hero.eyebrow.en,
      zh: data.hero.eyebrow.zh,
      section: 'Hero',
    },
    {
      key: 'Hero Tagline',
      id: data.hero.tagline.id,
      en: data.hero.tagline.en,
      zh: data.hero.tagline.zh,
      section: 'Hero',
    },
    {
      key: 'Hero Subheadline',
      id: data.hero.subheadline.id,
      en: data.hero.subheadline.en,
      zh: data.hero.subheadline.zh,
      section: 'Hero',
    },
    {
      key: 'Profile Title',
      id: data.profile.professionalTitle.id,
      en: data.profile.professionalTitle.en,
      zh: data.profile.professionalTitle.zh,
      section: 'Profile',
    },
    {
      key: 'Profile Bio',
      id: data.profile.shortBio.id,
      en: data.profile.shortBio.en,
      zh: data.profile.shortBio.zh,
      section: 'Profile',
    },
    {
      key: 'Career Philosophy',
      id: data.profile.careerPhilosophy.id,
      en: data.profile.careerPhilosophy.en,
      zh: data.profile.careerPhilosophy.zh,
      section: 'Profile',
    },
    {
      key: 'Contact Headline',
      id: data.contact.headline.id,
      en: data.contact.headline.en,
      zh: data.contact.headline.zh,
      section: 'Contact',
    },
    {
      key: 'Contact Subheadline',
      id: data.contact.subheadline.id,
      en: data.contact.subheadline.en,
      zh: data.contact.subheadline.zh,
      section: 'Contact',
    },
    {
      key: 'SEO Meta Title',
      id: data.seo.metaTitle.id,
      en: data.seo.metaTitle.en,
      zh: data.seo.metaTitle.zh,
      section: 'SEO',
    },
    {
      key: 'SEO Meta Description',
      id: data.seo.metaDescription.id,
      en: data.seo.metaDescription.en,
      zh: data.seo.metaDescription.zh,
      section: 'SEO',
    },
  ];

  const filtered = phrases.filter((p) =>
    p.key.toLowerCase().includes(filter.toLowerCase()) ||
    p.id.toLowerCase().includes(filter.toLowerCase()) ||
    p.en.toLowerCase().includes(filter.toLowerCase()) ||
    p.zh.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-hairline pb-4">
        <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
          <Languages size={14} />
          <span>14. Matriks Terjemahan Multibahasa (ID • EN • 中文)</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
          Trilingual Translation Matrix & Localization
        </h2>
        <p className="text-xs text-softGray font-sans mt-1">
          Tinjauan lengkap frasa dan terminologi di seluruh situs. Memastikan integritas copy antara Bahasa Indonesia, English, dan Mandarin.
        </p>
      </div>

      {/* Language Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-charcoal border border-hairline space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-bold text-ivory">Bahasa Indonesia</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
              DEFAULT / 100%
            </span>
          </div>
          <p className="text-xs text-softGray">
            Bahasa utama saat pengunjung pertama kali membuka website.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-charcoal border border-hairline space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-bold text-ivory">English (International)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
              100% COMPLETE
            </span>
          </div>
          <p className="text-xs text-softGray">
            Untuk recruiter multinasional, investor global, dan mitra luar negeri.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-charcoal border border-hairline space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-bold text-ivory">中文 (简体中文)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
              100% COMPLETE
            </span>
          </div>
          <p className="text-xs text-softGray">
            Karakter Simplified Chinese elegan dengan dukungan font Noto Sans SC.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-softGray" />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Cari frasa kunci terjemahan..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-charcoal border border-hairline text-xs font-sans text-ivory focus:border-gold"
        />
      </div>

      {/* Matrix Table */}
      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-charcoal border border-hairline space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-bold text-gold uppercase tracking-wider">
                {item.key} • <span className="text-softGray">{item.section}</span>
              </span>
              <span className="text-[10px] font-mono text-softGray">
                PHRASE #{idx + 1}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-obsidian border border-hairline space-y-1">
                <span className="text-[10px] text-gold font-bold block">ID (Bahasa Indonesia)</span>
                <p className="text-ivory leading-relaxed">{item.id}</p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian border border-hairline space-y-1">
                <span className="text-[10px] text-gold font-bold block">EN (English)</span>
                <p className="text-ivory leading-relaxed">{item.en}</p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian border border-hairline space-y-1">
                <span className="text-[10px] text-gold font-bold block">ZH (中文 - 简体)</span>
                <p className="text-ivory leading-relaxed">{item.zh}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
