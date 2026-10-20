'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Trophy, Activity, Users, CheckCircle2 } from 'lucide-react';

export default function AchievementsSection() {
  const { data, locale, t } = usePortfolio();

  return (
    <section id="achievements" className="relative py-24 bg-obsidian border-t border-platinum/10 overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson tracking-widest uppercase">
            <span className="w-6 h-px bg-crimson" />
            <span>07 // {locale === 'id' ? 'PENCAPAIAN TERPILIH' : 'SELECTED ACHIEVEMENTS'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-warmWhite">
            {locale === 'id' ? 'Pencapaian & Dampak Kolaboratif' : 'Milestones & Collective Impact'}
          </h2>

          <p className="text-base sm:text-lg text-platinum-muted font-normal pt-1">
            {locale === 'id'
              ? 'Inisiatif nyata yang membuktikan dedikasi sosial kemasyarakatan serta semangat kompetitif dan kerja sama tim.'
              : 'Tangible milestones demonstrating public service dedication, community mobilization, and competitive team excellence.'}
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-8 sm:p-10 rounded-2xl bg-graphite-surface border border-platinum/15 shadow-card-executive hover:border-crimson/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
            >
              {/* Corner Watermark Number */}
              <div className="absolute -top-6 -right-6 text-7xl font-mono font-black text-platinum/[0.04] select-none pointer-events-none">
                {ach.year}
              </div>

              <div>
                {/* Year Pill & Metric */}
                <div className="flex items-center justify-between gap-4 border-b border-platinum/10 pb-5">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 rounded-xl bg-crimson/15 border border-crimson/30 text-crimson">
                      {ach.metric?.includes('Place') ? (
                        <Trophy className="w-5 h-5" />
                      ) : (
                        <Activity className="w-5 h-5" />
                      )}
                    </div>
                    <span className="px-3 py-1 rounded-md bg-graphite text-xs font-mono text-platinum-bright border border-platinum/15">
                      {ach.year}
                    </span>
                  </div>

                  {ach.metric && (
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-extrabold text-crimson font-mono tracking-tight block">
                        {ach.metric}
                      </span>
                      {ach.metricLabel && (
                        <span className="text-[10px] font-mono text-platinum-muted uppercase block">
                          {t(ach.metricLabel)}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-warmWhite mt-6 group-hover:text-white transition">
                  {t(ach.title)}
                </h3>

                <p className="text-sm sm:text-base text-platinum-muted mt-3 leading-relaxed">
                  {t(ach.description)}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-platinum/10 flex items-center gap-2 text-xs font-mono text-platinum-muted">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Historical Record</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
