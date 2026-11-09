'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import { usePortfolio } from '@/context/PortfolioContext';
import { Calendar, Clock, User, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function JournalPage() {
  const { data, locale, t } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const articles = (data.journal || []).filter((art) => art.isPublished !== false);

  const categories = [
    { id: 'all', label: { id: 'Semua Kategori', en: 'All Categories', zh: '全部专栏' } },
    { id: 'operations', label: { id: 'Operations', en: 'Operations', zh: '精益运营' } },
    { id: 'procurement', label: { id: 'Procurement', en: 'Procurement', zh: '物资采购' } },
    { id: 'logistics', label: { id: 'Logistics', en: 'Logistics', zh: '重大物流' } },
    { id: 'leadership', label: { id: 'Leadership', en: 'Leadership', zh: '战略领导' } },
  ];

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal border border-gold/30 text-xs font-sans text-gold uppercase tracking-widest font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>EXECUTIVE INSIGHTS & JOURNAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-ivory">
            {locale === 'id' ? (
              <>
                Perspektif Strategis & <br />
                <span className="gold-gradient-text">Pemikiran Manajemen.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Strategic Perspectives & <br />
                <span className="gold-gradient-text">Management Insights.</span>
              </>
            ) : (
              <>
                战略管理洞见与 <br />
                <span className="gold-gradient-text">现代商业高管思考。</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-softGray font-sans leading-relaxed max-w-2xl">
            {locale === 'id'
              ? 'Artikel profesional dan analisis praktis seputar manajemen operasional, tata kelola pengadaan, resiliensi rantai pasok, dan kepemimpinan eksekutif.'
              : locale === 'en'
              ? 'Professional articles and practical analyses on operational governance, procurement strategy, supply chain resilience, and executive leadership.'
              : '围绕大型现场运营治理、企业大宗采购策略、复杂供应链韧性及高管领导力撰写的深度专业分析。'}
          </p>
        </div>

        {/* Category Filter Pills */}
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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              onClick={() => sound.playClick()}
              className="p-6 sm:p-8 rounded-3xl bg-charcoal border border-hairline hover:border-gold/60 shadow-luxury-card transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Cover Image */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-obsidian">
                  <Image
                    src={article.coverImage}
                    alt={t(article.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-75" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-obsidian/85 backdrop-blur-md text-[10px] font-sans font-bold text-gold uppercase tracking-wider border border-gold/30">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs font-sans text-softGray">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-gold" />
                    {article.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-gold" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                  {t(article.title)}
                </h2>

                <p className="text-xs sm:text-sm text-softGray font-sans leading-relaxed line-clamp-3">
                  {t(article.excerpt)}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs font-sans text-gold font-semibold">
                <span>{locale === 'id' ? 'Baca Selengkapnya' : locale === 'en' ? 'Read Full Article' : '阅读完整专栏'}</span>
                <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
