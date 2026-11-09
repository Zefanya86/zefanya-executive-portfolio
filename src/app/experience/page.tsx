'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import MediaLightbox from '@/components/ui/MediaLightbox';
import CommandPalette from '@/components/ui/CommandPalette';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowLeft, ArrowUpRight, Building, MapPin, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function ExperienceIndexPage() {
  const { data, locale, t, tList } = usePortfolio();
  const experiences = [...data.experiences]
    .filter((e) => e.isPublished !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory selection:bg-gold selection:text-obsidian transition-colors duration-300 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-softGray mb-8">
          <Link href="/" className="hover:text-gold flex items-center gap-1 transition-colors">
            <ArrowLeft size={13} />
            <span>BERANDA</span>
          </Link>
          <span>/</span>
          <span className="text-gold font-semibold">EXPERIENCE</span>
        </div>

        {/* Header Block */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal border border-gold/30 text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>OPERATIONAL TRACK RECORD</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
            {locale === 'id' ? (
              <>
                Pengalaman Profesional & <br />
                <span className="gold-gradient-text">Rekam Jejak Operasional.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Professional Experience & <br />
                <span className="gold-gradient-text">Operational Leadership.</span>
              </>
            ) : (
              <>
                专业高管履历与 <br />
                <span className="gold-gradient-text">现场运营全景实绩。</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-softGray font-sans leading-relaxed max-w-2xl">
            {locale === 'id'
              ? 'Eksplorasi mendalam atas kepemimpinan operasional perusahaan, tata kelola procurement material konstruksi skala besar, serta pengawasan armada logistik transportasi mineral.'
              : locale === 'en'
              ? 'In-depth exploration of corporate executive operations, mega-infrastructure material procurement, and mineral flow transport fleet governance.'
              : '深入查阅大型企业运营管理、国家重大基础设施大宗原材料采购供应及矿产大宗物流车队全流程调度。'}
          </p>
        </div>

        {/* Experience Cards List */}
        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const coverImg = exp.coverImage || '/preview-skylines.jpg';
            const responsibilities = tList(exp.responsibilities);

            return (
              <article
                key={exp.id}
                className="border border-hairline bg-charcoal rounded-3xl p-6 sm:p-10 shadow-luxury-card hover:border-gold/60 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Cover Preview (5 cols) */}
                  <div className="lg:col-span-5 relative h-64 sm:h-80 bg-obsidian rounded-2xl overflow-hidden border border-hairline">
                    <Image
                      src={coverImg}
                      alt={t(exp.coverImageAlt) || exp.company}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-[10px] font-sans uppercase bg-obsidian/85 backdrop-blur text-gold border border-gold/30 rounded-full font-bold">
                        EXP 0{index + 1}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-ivory">
                      <p className="text-xs font-serif font-bold line-clamp-1">{exp.company}</p>
                      <p className="text-[10px] font-sans text-gold mt-0.5">{exp.location}</p>
                    </div>
                  </div>

                  {/* Right Details (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 text-xs font-sans tracking-wider font-semibold uppercase bg-obsidian text-gold border border-gold/30 rounded-full">
                          {exp.period}
                        </span>
                        {exp.company.includes('Asri') && (
                          <span className="px-3 py-1 text-xs font-sans text-gold font-bold border border-gold/50 bg-gold/20 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(197,164,119,0.25)]">
                            <Flame size={12} className="text-gold animate-pulse" />
                            <span>🔥 TOP TRENDING // FLAGSHIP WORK</span>
                          </span>
                        )}
                        <span className="px-3 py-1 text-xs font-sans text-softGray flex items-center gap-1 border border-hairline rounded-full">
                          <MapPin size={12} className="text-gold" />
                          {exp.location}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory tracking-tight">
                        {t(exp.role)}
                      </h2>

                      <p className="text-sm font-sans font-semibold text-gold flex items-center gap-1.5">
                        <Building size={14} />
                        <span>{exp.company}</span>
                        {exp.projectContext && (
                          <span className="text-softGray font-normal">
                            — {t(exp.projectContext)}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold">
                        {locale === 'id' ? 'Tanggung Jawab Strategis & Operasional:' : 'Core Operational Responsibilities:'}
                      </p>
                      <ul className="space-y-2">
                        {responsibilities.slice(0, 3).map((resp, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-softGray leading-relaxed font-sans">
                            <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/experience/${exp.slug}`}
                        onClick={() => sound.playClick()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-obsidian border border-hairline hover:border-gold text-xs font-sans font-bold tracking-wider uppercase text-ivory hover:text-gold transition-all duration-300 shadow-sm"
                      >
                        <span>{locale === 'id' ? 'BACA REKAM JEJAK LENGKAP' : 'VIEW CASE BREAKDOWN'}</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

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
