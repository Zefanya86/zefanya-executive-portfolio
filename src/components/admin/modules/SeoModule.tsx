'use client';

import React from 'react';
import { PortfolioData, SeoSettings } from '@/types/portfolio';
import { Search, Globe, ShieldCheck, Code, CheckCircle2 } from 'lucide-react';

interface SeoModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function SeoModule({ data, setData }: SeoModuleProps) {
  const seo = data.seo;

  const updateSeo = (field: keyof SeoSettings, value: any) => {
    setData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value,
      },
    }));
  };

  const updateLocalizedString = (field: keyof SeoSettings, lang: 'id' | 'en' | 'zh', value: string) => {
    setData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: {
          ...(prev.seo[field] as any),
          [lang]: value,
        },
      },
    }));
  };

  const jsonLdPreview = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.profile.fullName,
    jobTitle: data.profile.professionalTitle.id,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bekasi',
      addressRegion: 'Jawa Barat',
      addressCountry: 'ID',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universitas Bhayangkara Jakarta Raya',
    },
    url: seo.canonicalUrl,
    sameAs: [data.profile.linkedinUrl],
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-hairline pb-4">
        <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
          <Search size={14} />
          <span>18. SEO & Skema Data Terstruktur (JSON-LD)</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
          Search Engine Optimization & Social Sharing
        </h2>
        <p className="text-xs text-softGray font-sans mt-1">
          Konfigurasi metadata penelusuran Google, kartu pratinjau media sosial (OpenGraph), dan skema Schema.org Person.
        </p>
      </div>

      {/* Meta Titles */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-6">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold">
          Judul Meta Pencarian (Meta Titles)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <span className="text-[10px] text-gold font-bold block mb-1">ID (Bahasa Indonesia)</span>
            <input
              type="text"
              value={seo.metaTitle.id}
              onChange={(e) => updateLocalizedString('metaTitle', 'id', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
            />
          </div>
          <div>
            <span className="text-[10px] text-gold font-bold block mb-1">EN (English)</span>
            <input
              type="text"
              value={seo.metaTitle.en}
              onChange={(e) => updateLocalizedString('metaTitle', 'en', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
            />
          </div>
          <div>
            <span className="text-[10px] text-gold font-bold block mb-1">ZH (中文)</span>
            <input
              type="text"
              value={seo.metaTitle.zh}
              onChange={(e) => updateLocalizedString('metaTitle', 'zh', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
            />
          </div>
        </div>

        {/* Canonical & OG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-hairline">
          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              Canonical URL
            </label>
            <input
              type="text"
              value={seo.canonicalUrl}
              onChange={(e) => updateSeo('canonicalUrl', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              URL Gambar OpenGraph (og:image)
            </label>
            <input
              type="text"
              value={seo.ogImageUrl}
              onChange={(e) => updateSeo('ogImageUrl', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
            />
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data Preview */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-4">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-2">
          <Code size={14} />
          <span>Skema Terstruktur Schema.org (JSON-LD Preview)</span>
        </h3>

        <pre className="p-4 rounded-2xl bg-obsidian border border-hairline text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
          {JSON.stringify(jsonLdPreview, null, 2)}
        </pre>
      </div>
    </div>
  );
}
