'use client';

import React, { useState } from 'react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import { usePortfolio } from '@/context/PortfolioContext';
import { Download, FileText, ShieldCheck, Eye, ArrowLeft, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/sound';
import { DownloadableDocument } from '@/types/portfolio';

export default function DownloadCenterPage() {
  const { data, locale, t } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewDoc, setPreviewDoc] = useState<DownloadableDocument | null>(null);

  const documents = (data.documents || []).filter((doc) => doc.isPublic !== false);

  const categories = [
    { id: 'all', label: { id: 'Semua Dokumen', en: 'All Documents', zh: '全部文件' } },
    { id: 'cv', label: { id: 'Curriculum Vitae', en: 'Curriculum Vitae', zh: '个人简历' } },
    { id: 'certificate', label: { id: 'Sertifikasi & Lisensi', en: 'Certificates & Licenses', zh: '资质证书' } },
  ];

  const filteredDocs =
    selectedCategory === 'all'
      ? documents
      : documents.filter((d) => d.category === selectedCategory);

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal border border-gold/30 text-xs font-sans text-gold uppercase tracking-widest font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>VERIFIED DOCUMENT REPOSITORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-ivory">
            {locale === 'id' ? (
              <>
                Pusat Unduhan Dokumen <br />
                <span className="gold-gradient-text">& Kredensial Resmi.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Official Document Center <br />
                <span className="gold-gradient-text">& Verified Credentials.</span>
              </>
            ) : (
              <>
                官方档案下载中心与 <br />
                <span className="gold-gradient-text">资质认证文件库。</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-softGray font-sans leading-relaxed max-w-2xl">
            {locale === 'id'
              ? 'Akses dan unduh berkas Curriculum Vitae resmi dalam berbagai bahasa serta sertifikat kompetensi profesional terverifikasi Zefanya Zulian.'
              : locale === 'en'
              ? 'Access and download official Curriculum Vitae files in multiple languages alongside verified professional certifications of Zefanya Zulian.'
              : '查阅并下载 Zefanya Zulian 官方多语言履历表及国家各权威机构认证资质证书。'}
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

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-6 rounded-2xl bg-charcoal border border-hairline hover:border-gold/60 shadow-luxury-card transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-hairline text-xs font-sans text-softGray">
                  <span className="px-2.5 py-0.5 rounded-full bg-obsidian border border-hairline text-gold font-bold uppercase tracking-wider text-[10px]">
                    {doc.format} • {doc.fileSize}
                  </span>
                  <div className="flex items-center gap-1 text-gold text-[10px] font-bold">
                    <ShieldCheck size={12} />
                    <span>AUTHENTIC</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-obsidian border border-hairline text-gold w-fit">
                  <FileText className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-serif font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                  {t(doc.title)}
                </h3>

                {doc.description && (
                  <p className="text-xs text-softGray font-sans leading-relaxed line-clamp-3">
                    {t(doc.description)}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between gap-2">
                {/* Preview Trigger */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setPreviewDoc(doc);
                  }}
                  className="px-3.5 py-2 rounded-full bg-obsidian border border-hairline hover:border-gold text-softGray hover:text-gold text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Eye size={13} />
                  <span>{locale === 'id' ? 'Pratinjau' : locale === 'en' ? 'Preview' : '预览'}</span>
                </button>

                {/* Direct Download */}
                <a
                  href={doc.fileUrl}
                  download={doc.fileName}
                  onClick={() => sound.playSuccess()}
                  className="px-4 py-2 rounded-full bg-gold hover:bg-gold-light text-obsidian text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-subtle transition-all duration-300 hover:scale-102"
                >
                  <Download size={13} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Document In-Browser Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian/90 backdrop-blur-2xl animate-fadeIn">
          <div
            className="fixed inset-0"
            onClick={() => setPreviewDoc(null)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-4xl h-[90vh] bg-charcoal border border-gold/40 rounded-2xl overflow-hidden shadow-luxury-elevated z-10 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 bg-obsidian border-b border-hairline">
              <div className="flex items-center gap-2 text-ivory">
                <FileText className="w-5 h-5 text-gold" />
                <span className="text-sm font-serif font-bold truncate max-w-md">
                  {t(previewDoc.title)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={previewDoc.fileUrl}
                  download={previewDoc.fileName}
                  onClick={() => sound.playSuccess()}
                  className="px-4 py-1.5 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5"
                >
                  <Download size={12} />
                  <span>Unduh File</span>
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 rounded-full text-softGray hover:text-ivory"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 w-full h-full bg-obsidian">
              <iframe
                src={`${previewDoc.fileUrl}#view=FitH`}
                title={t(previewDoc.title)}
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
