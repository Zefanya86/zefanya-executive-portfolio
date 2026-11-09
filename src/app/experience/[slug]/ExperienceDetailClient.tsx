'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import MediaLightbox from '@/components/ui/MediaLightbox';
import CommandPalette from '@/components/ui/CommandPalette';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  ArrowLeft,
  Building,
  Calendar,
  MapPin,
  CheckCircle2,
  Info,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Briefcase,
  FileText,
  Flame,
} from 'lucide-react';
import { sound } from '@/lib/sound';

interface ExperienceDetailClientProps {
  slug: string;
}

export default function ExperienceDetailClient({ slug }: ExperienceDetailClientProps) {
  const { data, locale, t, tList, setIsCvModalOpen } = usePortfolio();

  const expIndex = data.experiences.findIndex((e) => e.slug === slug);

  if (expIndex === -1) {
    return (
      <div className="min-h-screen bg-obsidian text-ivory flex flex-col justify-center items-center">
        <p className="text-xl font-serif text-gold">Experience not found</p>
        <Link href="/experience" className="mt-4 text-xs font-sans text-softGray underline">
          Back to all experiences
        </Link>
      </div>
    );
  }

  const exp = data.experiences[expIndex];
  const nextExp = data.experiences[(expIndex + 1) % data.experiences.length];
  const prevExp = data.experiences[(expIndex - 1 + data.experiences.length) % data.experiences.length];

  const coverImg =
    exp.coverImage ||
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop';
  const gallery = exp.mediaGallery || [];
  const responsibilities = tList(exp.responsibilities);

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory selection:bg-gold selection:text-obsidian transition-colors duration-300 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-softGray mb-8">
          <Link
            href="/"
            onClick={() => sound.click()}
            className="hover:text-gold flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={13} />
            <span>{locale === 'zh' ? '首页' : locale === 'en' ? 'HOME' : 'BERANDA'}</span>
          </Link>
          <span>/</span>
          <Link
            href="/experience"
            onClick={() => sound.click()}
            className="hover:text-gold transition-colors"
          >
            <span>{locale === 'zh' ? '高管履历' : locale === 'en' ? 'EXPERIENCE' : 'PENGALAMAN'}</span>
          </Link>
          <span>/</span>
          <span className="text-gold font-semibold truncate">{exp.company}</span>
        </div>

        {/* Hero Header Block */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {exp.company.includes('Asri') && (
              <span className="px-3.5 py-1 text-xs font-sans text-gold font-bold border border-gold/50 bg-gold/20 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(197,164,119,0.25)]">
                <Flame size={12} className="text-gold animate-pulse" />
                <span>TOP TRENDING // FLAGSHIP WORK</span>
              </span>
            )}
            <span className="px-3.5 py-1 text-xs font-sans uppercase font-bold bg-charcoal text-gold border border-gold/40 rounded-full">
              {exp.period}
            </span>
            <span className="px-3 py-1 text-xs font-sans text-softGray flex items-center gap-1.5 border border-hairline bg-charcoal rounded-full">
              <MapPin size={13} className="text-gold" />
              {exp.location}
            </span>
            <span className="px-3 py-1 text-xs font-sans text-gold/80 font-bold border border-gold/20 bg-gold/10 rounded-full">
              EXECUTIVE RECORD // 0{expIndex + 1}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {t(exp.role)}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-base text-gold font-sans font-semibold">
            <Building size={16} />
            <span className="text-ivory font-bold">{exp.company}</span>
            {exp.projectContext && (
              <>
                <span className="text-softGray">•</span>
                <span className="text-softGray font-normal">{t(exp.projectContext)}</span>
              </>
            )}
          </div>
        </div>

        {/* Large Cinematic Hero Image */}
        <div className="relative w-full h-[320px] sm:h-[480px] bg-charcoal rounded-3xl overflow-hidden border border-hairline mb-12 shadow-luxury-elevated">
          <Image
            src={coverImg}
            alt={t(exp.coverImageAlt) || exp.company}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-sans tracking-wider uppercase bg-obsidian/85 backdrop-blur-md text-ivory border border-gold/30 rounded-full flex items-center gap-1.5">
              <Info size={12} className="text-gold" />
              {locale === 'zh'
                ? '项目主题与现场实景'
                : locale === 'en'
                ? 'Operational Context'
                : 'Konteks Operasional Proyek'}
            </span>
          </div>

          {exp.coverImageCaption && (
            <div className="absolute bottom-5 left-6 right-6 text-ivory">
              <p className="text-sm font-sans text-softGray">{t(exp.coverImageCaption)}</p>
            </div>
          )}
        </div>

        {/* Responsibilities Block */}
        <div className="border border-hairline bg-charcoal p-8 sm:p-12 rounded-3xl shadow-luxury-card space-y-8 mb-16">
          <div className="flex items-center gap-2 text-xs font-sans text-gold font-bold uppercase tracking-widest">
            <ShieldCheck size={16} className="text-gold" />
            <span>
              {locale === 'zh'
                ? '核心执行职责与全案交付'
                : locale === 'en'
                ? 'Core Mandate & Deliverables'
                : 'Uraian Tanggung Jawab & Implementasi'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory border-b border-hairline pb-4">
            {locale === 'zh'
              ? '日常运营监管与交付要项'
              : locale === 'en'
              ? 'Executive Responsibilities'
              : 'Tanggung Jawab Operasional Utama'}
          </h2>

          <ul className="space-y-4">
            {responsibilities.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 text-sm sm:text-base text-softGray leading-relaxed"
              >
                <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                <span className="text-ivory/90">{item}</span>
              </li>
            ))}
          </ul>

          {/* Quick CTA to download CV or contact */}
          <div className="pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-softGray font-sans">
              {locale === 'zh'
                ? '如需了解完整的项目考核指标或审计报告，欢迎联系。'
                : locale === 'en'
                ? 'For full project verification or operational audit logs, request executive review.'
                : 'Informasi verifikasi operasional lebih terperinci dapat ditinjau melalui CV resmi.'}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.click();
                  setIsCvModalOpen(true);
                }}
                className="px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-obsidian text-xs font-sans font-bold transition-all flex items-center gap-2"
              >
                <FileText size={13} />
                <span>{locale === 'zh' ? '查阅完整 CV' : locale === 'en' ? 'Review Full CV' : 'Tinjau CV Lengkap'}</span>
              </button>
              <Link
                href="/contact"
                onClick={() => sound.click()}
                className="px-4 py-2 rounded-full bg-gold text-obsidian hover:bg-ivory text-xs font-sans font-bold transition-all"
              >
                {locale === 'zh' ? '发起商务会谈' : locale === 'en' ? 'Initiate Contact' : 'Hubungi Zefanya'}
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery Section if Available */}
        {gallery.length > 0 && (
          <div className="space-y-6 mb-16">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-ivory">
                {locale === 'zh'
                  ? '现场纪实与配套图集'
                  : locale === 'en'
                  ? 'Visual Documentation Gallery'
                  : 'Dokumentasi Visual Pendukung'}
              </h3>
              <p className="text-xs font-sans text-softGray">
                {locale === 'zh'
                  ? '反映实地作业、仓储控制与物流调度的真实记录。'
                  : locale === 'en'
                  ? 'Authentic operational and supply-chain logistics records.'
                  : 'Visualisasi konteks operasional, fasilitas, dan tata kelola material.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.map((media) => (
                <div
                  key={media.id}
                  className="relative h-64 bg-charcoal rounded-2xl overflow-hidden border border-hairline group shadow-luxury-card"
                >
                  <Image
                    src={media.url}
                    alt={t(media.alt) || exp.company}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-ivory">
                    <p className="text-xs font-bold text-gold">{t(media.title)}</p>
                    <p className="text-[11px] text-softGray mt-0.5 line-clamp-1">{t(media.caption)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next / Previous Navigation */}
        <div className="border-t border-hairline pt-8 flex items-center justify-between gap-4">
          <Link
            href={`/experience/${prevExp.slug}`}
            onClick={() => sound.click()}
            className="flex items-center gap-2 text-xs font-sans text-softGray hover:text-gold transition-colors"
          >
            <ArrowLeft size={14} className="text-gold" />
            <span className="hidden sm:inline">
              {locale === 'zh' ? '上一条:' : locale === 'en' ? 'Previous:' : 'Sebelumnya:'}
            </span>
            <span className="font-bold text-ivory">{prevExp.company}</span>
          </Link>

          <Link
            href={`/experience/${nextExp.slug}`}
            onClick={() => sound.click()}
            className="flex items-center gap-2 text-xs font-sans text-softGray hover:text-gold transition-colors"
          >
            <span className="hidden sm:inline">
              {locale === 'zh' ? '下一条:' : locale === 'en' ? 'Next:' : 'Berikutnya:'}
            </span>
            <span className="font-bold text-ivory">{nextExp.company}</span>
            <ArrowRight size={14} className="text-gold" />
          </Link>
        </div>
      </main>

      <Footer />
      <MediaLightbox />
      <CommandPalette />
    </div>
  );
}
