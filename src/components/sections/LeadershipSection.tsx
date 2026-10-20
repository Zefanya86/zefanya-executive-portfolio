'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Award, Users, Calendar, MapPin, CheckCircle2, Flag } from 'lucide-react';

export default function LeadershipSection() {
  const { data, locale, t, tList } = usePortfolio();
  const sortedLeadership = [...data.leadership].sort((a, b) => a.order - b.order);

  return (
    <section id="leadership" className="relative py-24 bg-obsidian border-t border-platinum/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson tracking-widest uppercase">
            <span className="w-6 h-px bg-crimson" />
            <span>05 // {locale === 'id' ? 'KEPEMIMPINAN ORGANISASI' : 'ORGANIZATIONAL LEADERSHIP'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-warmWhite">
            {locale === 'id' ? 'Strategic Leadership & Kepemimpinan Publik' : 'Strategic Governance & Public Leadership'}
          </h2>

          <p className="text-base sm:text-lg text-platinum-muted font-normal pt-1">
            {locale === 'id'
              ? 'Fondasi kepemimpinan strategis yang teruji dalam memimpin ribuan mahasiswa, koordinasi birokrasi institusional, serta advokasi kepemudaan tingkat kota.'
              : 'Strategic leadership honed through commanding university-wide student bodies, institutional diplomacy, and municipal youth advocacy.'}
          </p>
        </div>

        {/* Leadership Cards Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedLeadership.map((item, idx) => {
            const highlights = tList(item.highlights);

            return (
              <div
                key={item.id}
                className="p-7 sm:p-9 rounded-2xl bg-graphite-surface border border-platinum/15 shadow-card-executive relative flex flex-col justify-between hover:border-crimson/40 transition-all duration-300 group"
              >
                {/* Crimson top accent bar */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-crimson via-crimson to-transparent opacity-80" />

                <div>
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-platinum/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-graphite border border-platinum/15 text-xs font-mono text-platinum-bright">
                        <Calendar className="w-3.5 h-3.5 text-crimson" />
                        <span>{item.period}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-obsidian text-xs font-mono text-platinum-muted border border-platinum/10">
                        <MapPin className="w-3.5 h-3.5 text-platinum-muted" />
                        <span>{item.location}</span>
                      </span>
                    </div>

                    <span className="text-xs font-mono text-platinum-muted/60 font-semibold">
                      LEADERSHIP #{idx + 1}
                    </span>
                  </div>

                  {/* Role & Org */}
                  <div className="mt-5">
                    <h3 className="text-xl sm:text-2xl font-bold text-warmWhite group-hover:text-white transition">
                      {t(item.role)}
                    </h3>
                    <p className="text-base text-crimson font-medium mt-1">
                      {item.organization}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-mono uppercase tracking-wider text-platinum-muted">
                      {locale === 'id' ? 'Capaian & Koordinasi Strategis:' : 'Key Highlights & Governance:'}
                    </p>
                    <ul className="space-y-2.5">
                      {highlights.map((bullet, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3 text-sm text-platinum leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-platinum/10 flex items-center justify-between text-xs text-platinum-muted font-mono">
                  <span>{item.organization.split(' ')[0]} Verified Record</span>
                  <Flag className="w-4 h-4 text-crimson" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
