'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import MediaLightbox from '@/components/ui/MediaLightbox';
import CommandPalette from '@/components/ui/CommandPalette';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  Info,
  ArrowRight,
  ShieldCheck,
  Award,
  FileText,
} from 'lucide-react';
import { sound } from '@/lib/sound';

interface LeadershipDetailClientProps {
  slug: string;
}

export default function LeadershipDetailClient({ slug }: LeadershipDetailClientProps) {
  const { data, locale, t, tList, setIsCvModalOpen } = usePortfolio();

  const itemIndex = data.leadership.findIndex((l) => l.slug === slug);

  if (itemIndex === -1) {
    return (
      <div className="min-h-screen bg-obsidian text-ivory flex flex-col justify-center items-center">
        <p className="text-xl font-serif text-gold">Leadership record not found</p>
        <Link href="/leadership" className="mt-4 text-xs font-sans text-softGray underline">
          Back to all leadership
        </Link>
      </div>
    );
  }

  const item = data.leadership[itemIndex];
  const nextItem = data.leadership[(itemIndex + 1) % data.leadership.length];
  const prevItem = data.leadership[(itemIndex - 1 + data.leadership.length) % data.leadership.length];

  const coverImg =
    item.coverImage ||
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1600&auto=format&fit=crop';
  const highlights = tList(item.highlights);
  const responsibilities = item.responsibilities ? tList(item.responsibilities) : [];

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
            href="/leadership"
            onClick={() => sound.click()}
            className="hover:text-gold transition-colors"
          >
            <span>{locale === 'zh' ? '领导力治理' : locale === 'en' ? 'LEADERSHIP' : 'KEPEMIMPINAN'}</span>
          </Link>
          <span>/</span>
          <span className="text-gold font-semibold truncate">{item.organization}</span>
        </div>

        {/* Hero Header Block */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 text-xs font-sans uppercase font-bold bg-charcoal text-gold border border-gold/40 rounded-full">
              {item.period}
            </span>
            <span className="px-3 py-1 text-xs font-sans text-softGray flex items-center gap-1.5 border border-hairline bg-charcoal rounded-full">
              <MapPin size={13} className="text-gold" />
              {item.location}
            </span>
            <span className="px-3 py-1 text-xs font-sans text-gold/80 font-bold border border-gold/20 bg-gold/10 rounded-full">
              CIVIC LEADERSHIP // 0{itemIndex + 1}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {t(item.role)}
          </h1>

          <div className="flex items-center gap-2 text-base text-gold font-sans font-semibold">
            <Users size={16} />
            <span className="text-ivory font-bold">{item.organization}</span>
          </div>
        </div>

        {/* Cinematic Cover Banner */}
        <div className="relative w-full h-[320px] sm:h-[460px] bg-charcoal rounded-3xl overflow-hidden border border-hairline mb-12 shadow-luxury-elevated">
          <Image
            src={coverImg}
            alt={t(item.coverImageAlt) || item.organization}
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
                ? '领导力背景与治理实录'
                : locale === 'en'
                ? 'Leadership Context'
                : 'Konteks Kepemimpinan & Tata Kelola'}
            </span>
          </div>

          {item.coverImageCaption && (
            <div className="absolute bottom-5 left-6 right-6 text-ivory">
              <p className="text-sm font-sans text-softGray">{t(item.coverImageCaption)}</p>
            </div>
          )}
        </div>

        {/* Highlights & Scope Card */}
        <div className="border border-hairline bg-charcoal p-8 sm:p-12 rounded-3xl shadow-luxury-card space-y-8 mb-16">
          <div className="flex items-center gap-2 text-xs font-sans text-gold font-bold uppercase tracking-widest">
            <ShieldCheck size={16} className="text-gold" />
            <span>
              {locale === 'zh'
                ? '核心治理里程碑与战略影响'
                : locale === 'en'
                ? 'Core Milestones & Public Impact'
                : 'Pilar Tata Kelola & Dampak Organisasi'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory border-b border-hairline pb-4">
            {locale === 'zh'
              ? '关键治理成果与统筹举措'
              : locale === 'en'
              ? 'Key Strategic Initiatives'
              : 'Inisiatif Strategis & Pencapaian Kepemimpinan'}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xs font-sans uppercase tracking-widest text-softGray font-bold">
              {locale === 'zh' ? '治理亮点:' : locale === 'en' ? 'Governance Highlights:' : 'Sorotan Utama:'}
            </h3>
            <ul className="space-y-3">
              {highlights.map((hl, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3.5 text-sm sm:text-base text-softGray leading-relaxed"
                >
                  <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-ivory/90">{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {responsibilities.length > 0 && (
            <div className="pt-6 border-t border-hairline space-y-4">
              <h3 className="text-xs font-sans uppercase tracking-widest text-softGray font-bold">
                {locale === 'zh' ? '职责范围:' : locale === 'en' ? 'Operational Mandate:' : 'Ruang Lingkup Tanggung Jawab:'}
              </h3>
              <ul className="space-y-3">
                {responsibilities.map((resp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 text-sm sm:text-base text-softGray leading-relaxed"
                  >
                    <Award size={18} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-ivory/90">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-softGray font-sans">
              {locale === 'zh'
                ? '青年领袖与大学治理阶段沉淀了成熟的公共沟通、利益相关方协同与突发危机决策能力。'
                : locale === 'en'
                ? 'Organizational governance honed high-stakes stakeholder alignment, crisis mitigation, and executive communication.'
                : 'Pengalaman kepemimpinan ini membentuk kemampuan negosiasi, tata kelola krisis, dan komunikasi strategis lintas institusi.'}
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
                <span>{locale === 'zh' ? '查阅官方 CV' : locale === 'en' ? 'View Official CV' : 'Tinjau CV Resmi'}</span>
              </button>
              <Link
                href="/contact"
                onClick={() => sound.click()}
                className="px-4 py-2 rounded-full bg-gold text-obsidian hover:bg-ivory text-xs font-sans font-bold transition-all"
              >
                {locale === 'zh' ? '发起交流' : locale === 'en' ? 'Connect' : 'Inisiasi Diskusi'}
              </Link>
            </div>
          </div>
        </div>

        {/* Next / Previous Navigation */}
        <div className="border-t border-hairline pt-8 flex items-center justify-between gap-4">
          <Link
            href={`/leadership/${prevItem.slug}`}
            onClick={() => sound.click()}
            className="flex items-center gap-2 text-xs font-sans text-softGray hover:text-gold transition-colors"
          >
            <ArrowLeft size={14} className="text-gold" />
            <span className="hidden sm:inline">
              {locale === 'zh' ? '上一项:' : locale === 'en' ? 'Previous:' : 'Sebelumnya:'}
            </span>
            <span className="font-bold text-ivory">{prevItem.organization}</span>
          </Link>

          <Link
            href={`/leadership/${nextItem.slug}`}
            onClick={() => sound.click()}
            className="flex items-center gap-2 text-xs font-sans text-softGray hover:text-gold transition-colors"
          >
            <span className="hidden sm:inline">
              {locale === 'zh' ? '下一项:' : locale === 'en' ? 'Next:' : 'Berikutnya:'}
            </span>
            <span className="font-bold text-ivory">{nextItem.organization}</span>
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
