'use client';

import React from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import { Workflow, Truck, Users2, Layers, CheckCircle, ShieldCheck, Award, Briefcase } from 'lucide-react';

export default function ExecutiveIntro() {
  const { data, locale, t } = usePortfolio();

  const pillars = [
    {
      icon: Workflow,
      title: locale === 'id' ? 'Operations & Governance' : 'Operations & Governance',
      desc: locale === 'id'
        ? 'Standarisasi SOP menyeluruh, monitoring KPI terukur, dan mitigasi downtime operasional.'
        : 'Comprehensive SOP standardisation, measurable KPI telemetry, and operational downtime mitigation.',
    },
    {
      icon: Layers,
      title: locale === 'id' ? 'Strategic Procurement' : 'Strategic Procurement',
      desc: locale === 'id'
        ? 'Sourcing material konstruksi skala besar, evaluasi rekanan kredibel, dan inventory control.'
        : 'High-spec industrial material sourcing, verified supplier networks, and strict inventory control.',
    },
    {
      icon: Truck,
      title: locale === 'id' ? 'Logistics Coordination' : 'Logistics Coordination',
      desc: locale === 'id'
        ? 'Supervisi loading, hauling, dan delivery pengangkutan mineral serta kesiapan armada berat.'
        : 'Supervising loading, hauling, and delivery schedules for heavy mineral fleets with zero bottlenecks.',
    },
    {
      icon: Users2,
      title: locale === 'id' ? 'Cross-Functional Leadership' : 'Cross-Functional Leadership',
      desc: locale === 'id'
        ? 'Menyelaraskan tim operasional, finance, engineering, otoritas sipil, dan stakeholder kunci.'
        : 'Aligning operational, engineering, financial, civil authorities, and senior corporate stakeholders.',
    },
  ];

  const portraitSrc = data.hero.portraitUrl || '/zefanya-portrait.jpg';

  return (
    <section id="about" className="relative py-24 bg-graphite border-t border-platinum/10 overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-crimson/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-platinum/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson tracking-widest uppercase">
            <span className="w-6 h-px bg-crimson" />
            <span>02 // {locale === 'id' ? 'PROFIL EKSEKUTIF' : 'EXECUTIVE INTRODUCTION'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-warmWhite">
            {locale === 'id' ? 'More Than Managing Operations.' : 'More Than Managing Operations.'}
          </h2>

          <p className="text-lg text-platinum font-medium leading-relaxed pt-2">
            {t(data.profile.shortBio)}
          </p>
        </div>

        {/* Narrative & Portrait Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dedicated Editorial Executive Portrait Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl bg-graphite-surface border border-platinum/20 p-3 shadow-card-executive overflow-hidden group">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-obsidian border border-platinum/10">
                <Image
                  src={portraitSrc}
                  alt={data.profile.fullName}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle vignette and bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian/85 backdrop-blur-md border border-platinum/20 text-[10px] font-mono uppercase tracking-wider text-platinum">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                    <span>Verified Executive Leader</span>
                  </span>
                </div>

                {/* Bottom Signature Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-graphite/90 backdrop-blur-md border border-platinum/15">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {data.profile.fullName}, S.Ikom
                  </h3>
                  <p className="text-xs text-crimson font-mono mt-0.5">
                    General Manager | Operations & Business Management
                  </p>
                  <p className="text-[11px] text-platinum-muted mt-1 font-mono">
                    Bekasi, Jawa Barat, Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Quick credentials micro-row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-obsidian-soft border border-platinum/10 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-crimson shrink-0" />
                <div className="text-[11px]">
                  <span className="text-white font-semibold block">BNSP & LSP</span>
                  <span className="text-platinum-muted font-mono block">Certified PR Officer</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-obsidian-soft border border-platinum/10 flex items-center gap-2.5">
                <Award className="w-4 h-4 text-crimson shrink-0" />
                <div className="text-[11px]">
                  <span className="text-white font-semibold block">TOEFL 533</span>
                  <span className="text-platinum-muted font-mono block">CEFR B2 Level</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Biography Text & 4 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-graphite-surface border border-platinum/10 shadow-card-executive relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-crimson" />
              <p className="whitespace-pre-line text-platinum text-base sm:text-lg leading-relaxed font-light">
                {t(data.profile.fullBio)}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-obsidian-soft border border-platinum/10 hover:border-crimson/40 transition-all duration-300 group shadow-sm hover:shadow-card-executive"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-graphite border border-platinum/15 text-crimson group-hover:bg-crimson group-hover:text-white transition-colors duration-300 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-warmWhite tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-platinum-muted mt-1 leading-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Verified CV Source Citation */}
            <div className="flex items-center gap-2.5 text-xs text-platinum-muted font-mono px-2 pt-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {locale === 'id'
                  ? 'Berdasarkan rekam jejak resmi Curriculum Vitae Zefanya Zulian'
                  : 'Grounded in the verified Curriculum Vitae of Zefanya Zulian'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
