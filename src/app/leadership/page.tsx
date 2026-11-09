'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import MediaLightbox from '@/components/ui/MediaLightbox';
import CommandPalette from '@/components/ui/CommandPalette';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowLeft, ArrowUpRight, Users, Calendar, MapPin, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function LeadershipIndexPage() {
  const { data, locale, t, tList } = usePortfolio();
  const leadership = [...data.leadership]
    .filter((item) => item.isPublished !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory selection:bg-gold selection:text-obsidian transition-colors duration-300 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
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
          <span className="text-gold font-semibold">
            {locale === 'zh' ? '领导力治理' : locale === 'en' ? 'LEADERSHIP' : 'KEPEMIMPINAN'}
          </span>
        </div>

        {/* Header Block */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal border border-gold/30 text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>EXECUTIVE GOVERNANCE & CIVIC LEADERSHIP</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
            {locale === 'id' ? (
              <>
                Tata Kelola Kepemimpinan & <br />
                <span className="gold-gradient-text">Advokasi Strategis Publik.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Executive Governance & <br />
                <span className="gold-gradient-text">Strategic Civic Leadership.</span>
              </>
            ) : (
              <>
                高维领导力治理与 <br />
                <span className="gold-gradient-text">战略性公共倡导。</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-softGray font-sans leading-relaxed max-w-2xl">
            {locale === 'id'
              ? 'Fondasi kepemimpinan strategis yang dibentuk melalui tanggung jawab kepresidenan mahasiswa tingkat universitas, koordinasi lintas fakultas, serta inisiatif pemberdayaan sosial tingkat kota.'
              : locale === 'en'
              ? 'Strategic governance forged through University Student Body Presidency, cross-faculty stakeholder orchestration, and urban youth civic initiatives.'
              : '通过大学学生会主席的全面统筹、跨学院多学科团队协调以及城市青年社会倡导行动奠定的战略领导力基石。'}
          </p>
        </div>

        {/* Leadership List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leadership.map((item, idx) => {
            const coverImg =
              item.coverImage ||
              'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1600&auto=format&fit=crop';
            const highlights = tList(item.highlights);

            return (
              <article
                key={item.id}
                className="border border-hairline bg-charcoal rounded-3xl p-6 sm:p-8 shadow-luxury-card hover:border-gold/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 bg-obsidian rounded-2xl overflow-hidden border border-hairline mb-6">
                    <Image
                      src={coverImg}
                      alt={item.organization}
                      fill
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-[11px] font-sans uppercase font-bold bg-obsidian/85 text-gold border border-gold/30 rounded-full">
                        {item.period}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-ivory">
                      <p className="text-xs font-sans text-softGray flex items-center gap-1.5">
                        <MapPin size={12} className="text-gold" />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-sans text-gold font-bold uppercase tracking-wider">
                      <Users size={14} className="text-gold" />
                      <span>{item.organization}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory tracking-tight">
                      {t(item.role)}
                    </h2>

                    <div className="pt-2 space-y-3">
                      <p className="text-xs font-sans uppercase tracking-widest text-softGray font-bold">
                        {locale === 'zh'
                          ? '治理要项与领导力里程碑:'
                          : locale === 'en'
                          ? 'Key Governance Milestones:'
                          : 'Sorotan Kepemimpinan & Tata Kelola:'}
                      </p>
                      <ul className="space-y-2.5">
                        {highlights.map((hl, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-softGray leading-relaxed"
                          >
                            <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                            <span className="text-ivory/90">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-hairline flex items-center justify-between">
                  <span className="text-[11px] font-sans text-softGray">
                    RECORD 0{idx + 1} // CIVIC
                  </span>

                  <Link
                    href={`/leadership/${item.slug}`}
                    onClick={() => sound.click()}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-bold tracking-widest uppercase text-gold hover:text-ivory group transition-colors"
                  >
                    <span>
                      {locale === 'zh'
                        ? '查看详细治理记录'
                        : locale === 'en'
                        ? 'View Leadership Profile'
                        : 'Lihat Rincian Kepemimpinan'}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <Footer />
      <MediaLightbox />
      <CommandPalette />
    </div>
  );
}
