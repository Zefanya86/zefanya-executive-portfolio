'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Workflow, Truck, Building2, Users2, Compass, Layers, CheckCircle } from 'lucide-react';

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

        {/* Narrative & Quote Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Detailed Biography Text */}
          <div className="lg:col-span-7 space-y-6 text-platinum-muted leading-relaxed text-base">
            <div className="p-6 sm:p-8 rounded-2xl bg-graphite-surface border border-platinum/10 shadow-card-executive relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-crimson" />
              <p className="whitespace-pre-line text-platinum text-base sm:text-lg leading-relaxed font-light">
                {t(data.profile.fullBio)}
              </p>
            </div>

            {/* Verified CV Source Citation */}
            <div className="flex items-center gap-2.5 text-xs text-platinum-muted font-mono px-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {locale === 'id'
                  ? 'Berdasarkan rekam jejak resmi Curriculum Vitae Zefanya Zulian'
                  : 'Grounded in the verified Curriculum Vitae of Zefanya Zulian'}
              </span>
            </div>
          </div>

          {/* 4 Pillars Card Rail */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-obsidian-soft border border-platinum/10 hover:border-crimson/40 transition-all duration-300 group shadow-sm hover:shadow-card-executive"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-graphite border border-platinum/15 text-crimson group-hover:bg-crimson group-hover:text-white transition-colors duration-300 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-warmWhite tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-platinum-muted mt-1 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
