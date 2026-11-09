'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Trophy, Activity, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function AchievementsSection() {
  const { data, locale, t } = usePortfolio();

  return (
    <section id="achievements" className="relative py-28 bg-obsidian border-t border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-[10px] sm:text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>06 // SELECTED ACHIEVEMENTS & SOCIAL IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {locale === 'id' ? (
              <>
                Pencapaian Terpilih & <br />
                <span className="gold-gradient-text">Dampak Nyata Sosial.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Selected Achievements & <br />
                <span className="gold-gradient-text">Tangible Social Impact.</span>
              </>
            ) : (
              <>
                代表性重大荣誉与 <br />
                <span className="gold-gradient-text">社会公共治理成效。</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-softGray font-sans font-normal leading-relaxed">
            {locale === 'id'
              ? 'Inisiatif nyata yang membuktikan dedikasi kepemimpinan sipil, mobilisasi kesehatan masyarakat, serta kedisiplinan kompetitif tim.'
              : locale === 'en'
              ? 'Tangible milestones demonstrating civic executive stewardship, public health mobilization, and disciplined team leadership.'
              : '以具体成果印证高管组织动员力、公共卫生危机联合攻坚力以及团队协作进取精神。'}
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.achievements.map((ach, idx) => (
            <div
              key={ach.id}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="p-8 sm:p-10 rounded-2xl bg-charcoal border border-hairline shadow-luxury-card hover:border-gold/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Year Pill & Metric */}
                <div className="flex items-center justify-between gap-4 border-b border-hairline pb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gold/10 border border-gold/30 text-gold">
                      {ach.title.id.includes('Basket') || ach.title.en.includes('Basket') ? (
                        <Trophy className="w-5 h-5" />
                      ) : (
                        <Activity className="w-5 h-5" />
                      )}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-obsidian text-xs font-sans font-bold text-gold border border-hairline">
                      {ach.year}
                    </span>
                  </div>

                  {ach.metric && (
                    <div className="text-right">
                      <span className="text-3xl sm:text-4xl font-serif font-bold text-gold tracking-tight block">
                        {ach.metric}
                      </span>
                      {ach.metricLabel && (
                        <span className="text-[10px] font-sans text-softGray uppercase tracking-wider block font-semibold">
                          {t(ach.metricLabel)}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-[10px] font-sans text-gold font-bold uppercase tracking-widest mt-6">
                  MILESTONE 0{idx + 1}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-ivory mt-1 group-hover:text-gold transition-colors">
                  {t(ach.title)}
                </h3>

                <p className="text-sm text-softGray mt-3 leading-relaxed font-sans">
                  {t(ach.description)}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-xs font-sans text-softGray">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>Dokumentasi Resmi Terverifikasi</span>
                </div>
                <span className="text-gold font-bold font-sans text-[11px]">
                  VERIFIED ✦
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
