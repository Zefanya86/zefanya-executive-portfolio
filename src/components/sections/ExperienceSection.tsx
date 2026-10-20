'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Briefcase, Calendar, MapPin, Building, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function ExperienceSection() {
  const { data, locale, t, tList } = usePortfolio();
  const sortedExperiences = [...data.experiences].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="relative py-24 bg-obsidian border-t border-platinum/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson tracking-widest uppercase">
            <span className="w-6 h-px bg-crimson" />
            <span>03 // {locale === 'id' ? 'REKAM JEJAK PROFESIONAL' : 'PROFESSIONAL EXPERIENCE'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-warmWhite">
            {locale === 'id' ? 'Pengalaman Kerja & Manajemen Proyek' : 'Executive Career & Project Operations'}
          </h2>

          <p className="text-base sm:text-lg text-platinum-muted font-normal pt-1">
            {locale === 'id'
              ? 'Kepemimpinan operasional pada sektor pengadaan barang, real estate komersial, logistik mineral, serta infrastruktur jembatan skala nasional.'
              : 'Proven leadership overseeing commercial procurement, real estate operations, bulk mineral logistics, and large-scale maritime bridge infrastructure.'}
          </p>
        </div>

        {/* Timeline Rail */}
        <div className="mt-16 relative">
          {/* Vertical Center Line for Desktop */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-6 md:left-8 w-px bg-gradient-to-b from-crimson via-platinum/20 to-transparent" />

          <div className="space-y-12">
            {sortedExperiences.map((exp, index) => {
              const responsibilities = tList(exp.responsibilities);

              return (
                <div
                  key={exp.id}
                  className="relative pl-12 sm:pl-16 md:pl-20 group"
                >
                  {/* Timeline Node Marker */}
                  <div className="absolute left-4 sm:left-6 md:left-8 top-1.5 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-obsidian border-2 border-crimson flex items-center justify-center shadow-glow-crimson group-hover:scale-125 transition-transform duration-300">
                      <div className="w-2 h-2 rounded-full bg-crimson" />
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-graphite-surface/90 border border-platinum/15 shadow-card-executive hover:border-crimson/40 transition-all duration-300">
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-platinum/10 pb-5">
                      <div>
                        {/* Period & Status Badge */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-graphite border border-platinum/15 text-xs font-mono text-platinum-bright">
                            <Calendar className="w-3.5 h-3.5 text-crimson" />
                            <span>{exp.period}</span>
                          </span>

                          {exp.period.includes('Present') && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-crimson/20 border border-crimson/40 text-[11px] font-mono font-medium text-crimson-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                              <span>{locale === 'id' ? 'Posisi Saat Ini' : 'Current Role'}</span>
                            </span>
                          )}

                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-obsidian text-xs font-mono text-platinum-muted border border-platinum/10">
                            <MapPin className="w-3.5 h-3.5 text-platinum-muted" />
                            <span>{exp.location}</span>
                          </span>
                        </div>

                        {/* Role Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-warmWhite tracking-tight">
                          {t(exp.role)}
                        </h3>

                        {/* Company & Project Context */}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-base font-semibold text-platinum flex items-center gap-1.5">
                            <Building className="w-4 h-4 text-crimson" />
                            <span>{exp.company}</span>
                          </span>
                          {exp.projectContext && (
                            <>
                              <span className="text-platinum-muted/50 hidden sm:inline">•</span>
                              <span className="text-sm text-platinum-muted italic">
                                {t(exp.projectContext)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Index Monogram Badge */}
                      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-obsidian border border-platinum/15 text-sm font-mono text-platinum-muted font-bold">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Responsibilities Bullets */}
                    <div className="mt-5 space-y-3">
                      <p className="text-xs font-mono uppercase tracking-wider text-platinum-muted">
                        {locale === 'id' ? 'Tanggung Jawab & Kontribusi Kunci:' : 'Core Responsibilities & Deliverables:'}
                      </p>
                      <ul className="space-y-2.5">
                        {responsibilities.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-platinum leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-crimson mt-1 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
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
