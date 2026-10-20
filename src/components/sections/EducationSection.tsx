'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { GraduationCap, Award, ShieldCheck, CheckCircle2, FileCheck } from 'lucide-react';

export default function EducationSection() {
  const { data, locale, t } = usePortfolio();

  return (
    <section id="education" className="relative py-24 bg-graphite border-t border-platinum/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson tracking-widest uppercase">
            <span className="w-6 h-px bg-crimson" />
            <span>06 // {locale === 'id' ? 'PENDIDIKAN & KREDENSIAL' : 'EDUCATION & CREDENTIALS'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-warmWhite">
            {locale === 'id' ? 'Latar Belakang Akademik & Sertifikasi' : 'Academic Foundation & Certifications'}
          </h2>

          <p className="text-base sm:text-lg text-platinum-muted font-normal pt-1">
            {locale === 'id'
              ? 'Kombinasi gelar kesarjanaan komunikasi strategis dan sertifikasi profesi nasional di bidang Public Relations, IT, dan penguasaan bahasa.'
              : 'Rigorous foundation in strategic communication combined with national professional certifications in PR, IT programming, and business English.'}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Education Primary Feature Card */}
          <div className="lg:col-span-5">
            <p className="text-xs font-mono uppercase tracking-widest text-platinum-muted mb-4">
              {locale === 'id' ? 'Pendidikan Tinggi Formal' : 'Formal Higher Education'}
            </p>

            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="p-7 sm:p-8 rounded-2xl bg-graphite-surface border border-platinum/15 shadow-card-executive relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson mb-5">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-medium text-crimson bg-crimson/10 border border-crimson/20 mb-2">
                  Lulus Tahun {edu.graduationYear}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-warmWhite tracking-tight">
                  {t(edu.degree)}
                </h3>

                <p className="text-base text-platinum font-medium mt-1">
                  {edu.institution}
                </p>

                <div className="mt-6 pt-5 border-t border-platinum/10 grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-obsidian border border-platinum/10">
                    <span className="text-[10px] font-mono text-platinum-muted uppercase block">
                      Indeks Prestasi Kumulatif
                    </span>
                    <span className="text-lg font-bold text-warmWhite font-mono mt-0.5 block">
                      GPA {edu.gpa}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-obsidian border border-platinum/10">
                    <span className="text-[10px] font-mono text-platinum-muted uppercase block">
                      Predikat Kelulusan
                    </span>
                    <span className="text-xs font-bold text-emerald-400 mt-1 block">
                      {t(edu.distinction)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Certifications Grid */}
          <div className="lg:col-span-7">
            <p className="text-xs font-mono uppercase tracking-widest text-platinum-muted mb-4">
              {locale === 'id' ? 'Sertifikasi Profesi & Lisensi' : 'Professional Certifications & Licenses'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-xl bg-obsidian-soft border border-platinum/10 hover:border-crimson/40 transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-graphite border border-platinum/10 text-crimson group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono text-platinum-muted">
                        {cert.year}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-warmWhite group-hover:text-white transition">
                      {t(cert.name)}
                    </h4>

                    <p className="text-xs text-platinum-muted mt-1 leading-normal">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-platinum/10 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Verified Credential</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
