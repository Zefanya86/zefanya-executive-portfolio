'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { GraduationCap, ShieldCheck, Award } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function EducationSection() {
  const { data, locale, t } = usePortfolio();

  return (
    <section id="education" className="relative py-28 bg-obsidian border-t border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-[10px] sm:text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>05 // ACADEMIC FOUNDATION & CERTIFICATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {locale === 'id' ? (
              <>
                Pendidikan Akademik & <br />
                <span className="gold-gradient-text">Sertifikasi Kompetensi Resmi.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Higher Education & <br />
                <span className="gold-gradient-text">Official Professional Certifications.</span>
              </>
            ) : (
              <>
                高等教育学历背景与 <br />
                <span className="gold-gradient-text">国家权威执业资质认证。</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-softGray font-sans font-normal leading-relaxed">
            {locale === 'id'
              ? 'Landasan akademik komunikasi strategis berpadu dengan lisensi sertifikasi profesi nasional di bidang kehumasan, bahasa internasional, dan teknologi informasi.'
              : locale === 'en'
              ? 'A disciplined foundation in strategic communication combined with accredited national certifications in public relations, international languages, and computer programming.'
              : '严谨的战略传播学学术底蕴，深度融合国家公关专员资格、国际语言等级及计算机技术认证。'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Education Primary Feature Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-2">
              <GraduationCap size={14} className="text-gold" />
              <span>{locale === 'id' ? 'Pendidikan Tinggi Formal' : locale === 'en' ? 'Higher Education' : '正规高等学历'}</span>
            </p>

            {data.education.map((edu) => (
              <div
                key={edu.id}
                onMouseEnter={() => sound.playHover()}
                className="p-8 rounded-2xl bg-charcoal border border-hairline shadow-luxury-card relative overflow-hidden group hover:border-gold/60 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold text-gold bg-gold/10 border border-gold/30 mb-3 uppercase tracking-wider">
                  Lulus {edu.graduationYear}
                </span>

                <h3 className="text-2xl font-serif font-bold text-ivory tracking-tight group-hover:text-gold transition-colors">
                  {t(edu.degree)}
                </h3>

                <p className="text-sm font-sans text-softGray mt-1">
                  {edu.institution}
                </p>

                <div className="mt-8 pt-6 border-t border-hairline grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-obsidian border border-hairline">
                    <span className="text-[10px] font-sans text-softGray uppercase block font-semibold tracking-wider">
                      Indeks Prestasi Kumulatif
                    </span>
                    <span className="text-2xl font-serif font-bold text-gold mt-1 block">
                      GPA {edu.gpa}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-obsidian border border-hairline">
                    <span className="text-[10px] font-sans text-softGray uppercase block font-semibold tracking-wider">
                      Predikat Kelulusan
                    </span>
                    <span className="text-sm font-serif font-bold text-ivory mt-1.5 block">
                      {t(edu.distinction)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Certifications Grid (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-2">
              <ShieldCheck size={14} className="text-gold" />
              <span>{locale === 'id' ? 'Sertifikasi & Lisensi Resmi' : locale === 'en' ? 'Official Licenses & Accreditations' : '官方执业资格与认证'}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="p-6 rounded-2xl bg-charcoal border border-hairline shadow-luxury-card hover:border-gold/50 transition-all duration-300 group flex flex-col justify-between cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-sans text-softGray">
                      <span className="px-2.5 py-0.5 rounded-full bg-obsidian border border-hairline text-gold font-bold">
                        {cert.year}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-gold" />
                    </div>

                    <h4 className="text-base font-serif font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                      {t(cert.name)}
                    </h4>

                    <p className="text-xs text-softGray font-sans">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-hairline/60 flex items-center justify-between text-[11px] font-sans text-gold">
                    <span className="font-semibold uppercase tracking-wider">VERIFIED CREDENTIAL</span>
                    <Award size={13} />
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
