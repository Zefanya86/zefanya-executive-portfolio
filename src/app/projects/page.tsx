'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  Compass,
  Zap,
  Award,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { ProjectItem } from '@/types/portfolio';

export default function ProjectsPage() {
  const { data, locale, t, tList } = usePortfolio();
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const projects = [...(data.projects || [])]
    .filter((p) => p.isPublished !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal border border-gold/30 text-xs font-sans text-gold uppercase tracking-widest font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>EXECUTIVE CASE STUDIES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-ivory">
            {locale === 'id' ? (
              <>
                Studi Kasus Proyek & <br />
                <span className="gold-gradient-text">Eksekusi Operasional Kritis.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Project Case Studies & <br />
                <span className="gold-gradient-text">Critical Operations Execution.</span>
              </>
            ) : (
              <>
                工程案例深度复盘与 <br />
                <span className="gold-gradient-text">关键运营实战纪实。</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-softGray font-sans leading-relaxed max-w-2xl">
            {locale === 'id'
              ? 'Tinjauan mendalam studi kasus operasional: tantangan lapangan, strategi manajemen, kepatuhan SOP, dan hasil terukur pada proyek maritim dan transportasi mineral.'
              : locale === 'en'
              ? 'Comprehensive deep-dives into major operational case studies: field challenges, management methodologies, SOP compliance, and documented outcomes.'
              : '深入复盘重大工程现场运营：直面一线挑战、构建管理体系、坚守标准SOP并交付高可靠量化成果。'}
          </p>
        </div>

        {/* Project Case Studies List */}
        <div className="space-y-16 sm:space-y-24">
          {projects.map((project, idx) => {
            const scope = tList(project.scopeOfResponsibility);
            const challenges = tList(project.operationalChallenges);
            const approach = tList(project.managementApproach);
            const execution = tList(project.projectExecution);
            const outcomes = tList(project.documentedOutcomes);

            return (
              <article
                key={project.id}
                className="p-6 sm:p-10 rounded-3xl bg-charcoal border border-hairline hover:border-gold/60 shadow-luxury-card transition-all duration-300 space-y-8"
              >
                {/* Case Study Top Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-hairline">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-obsidian text-gold text-xs font-sans font-bold border border-gold/30">
                        CASE STUDY 0{idx + 1}
                      </span>
                      {project.company.includes('Asri') && (
                        <span className="px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-sans font-bold border border-gold/50 flex items-center gap-1.5 shadow-[0_0_12px_rgba(197,164,119,0.25)]">
                          <Flame size={12} className="text-gold animate-pulse" />
                          <span>🔥 TOP TRENDING // FLAGSHIP WORK</span>
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-obsidian text-softGray text-xs font-sans border border-hairline">
                        {project.period}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-obsidian text-softGray text-xs font-sans border border-hairline flex items-center gap-1">
                        <MapPin size={12} className="text-gold" />
                        {project.location}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ivory tracking-tight">
                      {t(project.title)}
                    </h2>

                    <div className="flex items-center gap-2 text-sm font-sans text-gold font-semibold">
                      <Building2 size={15} />
                      <span>{project.company}</span>
                      <span className="text-softGray">•</span>
                      <span className="text-ivory font-serif font-bold">{t(project.role)}</span>
                    </div>
                  </div>

                  {/* Project Cover Preview */}
                  <div className="relative w-full lg:w-72 h-44 rounded-xl overflow-hidden border border-hairline shrink-0 bg-obsidian">
                    <Image
                      src={project.coverImage}
                      alt={t(project.title)}
                      fill
                      sizes="300px"
                      className="object-cover filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-75" />
                  </div>
                </div>

                {/* 10-Part Case Study Structural Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                  
                  {/* 1. Scope of Responsibility */}
                  <div className="p-5 rounded-2xl bg-obsidian border border-hairline space-y-3">
                    <div className="flex items-center gap-2 text-xs font-sans text-gold font-bold uppercase tracking-wider">
                      <Compass size={14} />
                      <span>{locale === 'id' ? 'Lingkup Tanggung Jawab' : locale === 'en' ? 'Scope of Role' : '核心管理权责'}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-softGray leading-relaxed font-sans">
                      {scope.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2. Operational Challenges */}
                  <div className="p-5 rounded-2xl bg-obsidian border border-hairline space-y-3">
                    <div className="flex items-center gap-2 text-xs font-sans text-amber-400 font-bold uppercase tracking-wider">
                      <ShieldAlert size={14} />
                      <span>{locale === 'id' ? 'Tantangan Lapangan' : locale === 'en' ? 'Field Challenges' : '一线难点挑战'}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-softGray leading-relaxed font-sans">
                      {challenges.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3. Management Approach */}
                  <div className="p-5 rounded-2xl bg-obsidian border border-hairline space-y-3">
                    <div className="flex items-center gap-2 text-xs font-sans text-gold font-bold uppercase tracking-wider">
                      <Zap size={14} />
                      <span>{locale === 'id' ? 'Pendekatan Solusi' : locale === 'en' ? 'Strategic Approach' : '解决策略与机制'}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-softGray leading-relaxed font-sans">
                      {approach.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-gold font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 4. Documented Outcomes */}
                  <div className="p-5 rounded-2xl bg-obsidian border border-gold/30 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-sans text-gold font-bold uppercase tracking-wider">
                      <Award size={14} />
                      <span>{locale === 'id' ? 'Hasil & Dampak Terukur' : locale === 'en' ? 'Documented Outcomes' : '可衡量的成果'}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-ivory/90 leading-relaxed font-sans">
                      {outcomes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
