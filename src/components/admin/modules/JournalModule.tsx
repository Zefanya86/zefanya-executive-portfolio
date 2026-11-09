'use client';

import React, { useState } from 'react';
import { PortfolioData, JournalArticle } from '@/types/portfolio';
import { BookOpen, Plus, Trash2, Calendar, Clock, Eye } from 'lucide-react';

interface JournalModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function JournalModule({ data, setData }: JournalModuleProps) {
  const articles = data.journal || [];
  const [selectedId, setSelectedId] = useState<string>(articles[0]?.id || '');

  const currentArticle = articles.find((a) => a.id === selectedId) || articles[0];

  const updateArticle = (id: string, updates: Partial<JournalArticle>) => {
    setData((prev) => ({
      ...prev,
      journal: (prev.journal || []).map((art) =>
        art.id === id ? { ...art, ...updates } : art
      ),
    }));
  };

  const addArticle = () => {
    const newId = `art_${Date.now()}`;
    const newArticle: JournalArticle = {
      id: newId,
      slug: `artikel-strategis-${Date.now()}`,
      title: {
        id: 'Judul Artikel Opini Eksekutif Baru',
        en: 'New Executive Thought Leadership Article',
        zh: '新增高管战略洞见专栏文章',
      },
      excerpt: {
        id: 'Ringkasan pandangan strategis mengenai manajemen operasional dan procurement.',
        en: 'Strategic overview of operational management and logistics governance.',
        zh: '关于运营管理、现场调度与大宗采购治理的战略洞察。',
      },
      content: {
        id: 'Tuliskan analisis komprehensif dan pandangan mendalam di sini...',
        en: 'Write comprehensive analysis and deep insights here...',
        zh: '在此撰写详尽的专业分析与高维运营洞见……',
      },
      category: 'operations',
      author: 'Zefanya Zulian',
      coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      readTime: '5 min read',
      publishedAt: '2026',
      isPublished: true,
      order: articles.length + 1,
    };

    setData((prev) => ({
      ...prev,
      journal: [...(prev.journal || []), newArticle],
    }));
    setSelectedId(newId);
  };

  const deleteArticle = (id: string) => {
    if (confirm('Hapus artikel ini?')) {
      const remaining = articles.filter((a) => a.id !== id);
      setData((prev) => ({
        ...prev,
        journal: remaining,
      }));
      if (selectedId === id && remaining.length > 0) {
        setSelectedId(remaining[0].id);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <BookOpen size={14} />
            <span>11. Jurnal, Pemikiran & Opini Eksekutif</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Executive Journal & Thought Leadership
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Kelola esai profesional, analisis operasional, artikel kepemimpinan, dan pandangan rantai pasok.
          </p>
        </div>

        <button
          onClick={addArticle}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
        >
          <Plus size={14} />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Article List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-sans uppercase tracking-widest text-softGray font-bold px-1">
            Daftar Artikel ({articles.length})
          </p>

          <div className="space-y-2">
            {articles.map((art, idx) => {
              const isSelected = art.id === currentArticle?.id;
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedId(art.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-charcoal border-gold shadow-luxury'
                      : 'bg-obsidian border-hairline hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-gold uppercase">
                      {art.category}
                    </span>
                    <span className="text-[10px] font-mono text-softGray">
                      {art.readTime}
                    </span>
                  </div>
                  <p className="text-xs font-serif font-bold text-ivory line-clamp-1 mt-1">
                    {art.title.id}
                  </p>
                  <p className="text-[11px] text-softGray font-sans truncate mt-0.5">
                    {art.publishedAt} • {art.author}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Article Editor (8 Cols) */}
        {currentArticle && (
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-charcoal border border-hairline space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <h3 className="text-lg font-serif font-bold text-ivory">
                Sunting Artikel: <span className="text-gold">{currentArticle.title.id}</span>
              </h3>
              <button
                onClick={() => deleteArticle(currentArticle.id)}
                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
              >
                <Trash2 size={13} />
                <span>Hapus Artikel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Kategori
                </label>
                <select
                  value={currentArticle.category}
                  onChange={(e) => updateArticle(currentArticle.id, { category: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                >
                  <option value="operations">Operations Strategy</option>
                  <option value="procurement">Procurement & Supply Chain</option>
                  <option value="leadership">Executive Leadership</option>
                  <option value="logistics">Logistics Flow</option>
                  <option value="business">Business Development</option>
                  <option value="insights">Insights & Industry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Estimasi Waktu Baca
                </label>
                <input
                  type="text"
                  value={currentArticle.readTime}
                  onChange={(e) => updateArticle(currentArticle.id, { readTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Tahun / Tanggal Terbit
                </label>
                <input
                  type="text"
                  value={currentArticle.publishedAt}
                  onChange={(e) => updateArticle(currentArticle.id, { publishedAt: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Slug URL (/journal/[slug])
                </label>
                <input
                  type="text"
                  value={currentArticle.slug}
                  onChange={(e) => updateArticle(currentArticle.id, { slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Trilingual Title */}
            <div className="space-y-3 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Judul Artikel (Trilingual)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="ID"
                  value={currentArticle.title.id}
                  onChange={(e) =>
                    updateArticle(currentArticle.id, {
                      title: { ...currentArticle.title, id: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="EN"
                  value={currentArticle.title.en}
                  onChange={(e) =>
                    updateArticle(currentArticle.id, {
                      title: { ...currentArticle.title, en: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="ZH"
                  value={currentArticle.title.zh}
                  onChange={(e) =>
                    updateArticle(currentArticle.id, {
                      title: { ...currentArticle.title, zh: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-3 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Ringkasan / Excerpt (Bahasa Indonesia)
              </label>
              <textarea
                rows={2}
                value={currentArticle.excerpt.id}
                onChange={(e) =>
                  updateArticle(currentArticle.id, {
                    excerpt: { ...currentArticle.excerpt, id: e.target.value },
                  })
                }
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>

            {/* Content */}
            <div className="space-y-3 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Isi Artikel Lengkap (Bahasa Indonesia)
              </label>
              <textarea
                rows={8}
                value={currentArticle.content.id}
                onChange={(e) =>
                  updateArticle(currentArticle.id, {
                    content: { ...currentArticle.content, id: e.target.value },
                  })
                }
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold font-sans leading-relaxed"
              />
            </div>

            {/* Cover Image */}
            <div className="pt-4 border-t border-hairline space-y-2">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Foto Sampul Editorial
              </label>
              <input
                type="text"
                value={currentArticle.coverImage}
                onChange={(e) => updateArticle(currentArticle.id, { coverImage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
