'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import { Users, CheckCircle2, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function LeadershipSection() {
  const { data, locale, t, tList, openLightbox } = usePortfolio();
  const sortedLeadership = [...data.leadership]
    .filter((item) => item.isPublished !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="leadership" className="relative py-28 bg-obsidian border-t border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-[10px] sm:text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>03 // STRATEGIC LEADERSHIP & ORGANIZATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {locale === 'id' ? (
              <>
                Kepemimpinan Strategis & <br />
                <span className="gold-gradient-text">Rekam Jejak Organisasi.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Strategic Leadership & <br />
                <span className="gold-gradient-text">Organizational Governance.</span>
              </>
            ) : (
              <>
                战略组织领导力与 <br />
                <span className="gold-gradient-text">青年群团治理历练。</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-softGray font-sans font-normal leading-relaxed">
            {locale === 'id'
              ? 'Fondasi kepemimpinan strategis yang teruji dalam memimpin organisasi mahasiswa tingkat universitas, koordinasi birokrasi institusional, serta kepemimpinan organisasi kepemudaan tingkat kota.'
              : locale === 'en'
              ? 'Proven strategic leadership honed through commanding university-wide student bodies, institutional rectorate consultations, and municipal youth advocacy.'
              : '历经统率全校数万名学生会总会主席、校级决策机构沟通对话，以及负责市级全国青年组织分支的深厚实践沉淀。'}
          </p>
        </div>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedLeadership.map((item, idx) => {
            const highlights = tList(item.highlights);
            const responsibilities = tList(item.responsibilities);
            const coverImg = item.coverImage || (idx === 0 ? '/preview-hero-cinematic.jpg' : '/preview-skylines.jpg');

            return (
              <article
                key={item.id}
                className="border border-hairline bg-charcoal rounded-2xl shadow-luxury-card transition-all duration-300 hover:border-gold/60 flex flex-col justify-between overflow-hidden group"
              >
                {/* Media Banner */}
                <div
                  onClick={() => {
                    sound.playClick();
                    openLightbox({
                      id: `org-cover-${item.id}`,
                      url: coverImg,
                      caption: item.coverImageCaption,
                      alt: item.coverImageAlt || { id: item.organization, en: item.organization, zh: item.organization },
                      source: item.organization,
                      license: 'Official Archive',
                    });
                  }}
                  className="relative w-full h-52 sm:h-64 bg-obsidian cursor-pointer overflow-hidden"
                >
                  <Image
                    src={coverImg}
                    alt={item.organization}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-[10px] font-sans tracking-wider uppercase bg-obsidian/85 backdrop-blur-md text-gold border border-gold/40 rounded-full flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      <span>LEADERSHIP 0{idx + 1}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-ivory">
                    <p className="text-xs font-sans tracking-wider uppercase text-gold font-bold">
                      {item.period} • {item.location}
                    </p>
                    <p className="text-xs font-serif font-bold text-ivory mt-0.5 line-clamp-1">
                      {item.organization}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-ivory tracking-tight group-hover:text-gold transition-colors">
                      {t(item.role)}
                    </h3>

                    <div className="flex items-center gap-2 text-xs font-sans text-gold font-semibold uppercase tracking-wider">
                      <Users size={14} className="text-gold" />
                      <span>{item.organization}</span>
                    </div>

                    {responsibilities.length > 0 && (
                      <p className="text-xs sm:text-sm text-softGray leading-relaxed font-sans pt-1">
                        {responsibilities[0]}
                      </p>
                    )}
                  </div>

                  {highlights.length > 0 && (
                    <div className="space-y-2.5 pt-3 border-t border-hairline">
                      <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
                        <ShieldCheck size={13} className="text-gold" />
                        <span>{locale === 'id' ? 'Pencapaian & Tonggak Strategis:' : locale === 'en' ? 'Strategic Milestones:' : '战略里程碑与落地成果：'}</span>
                      </p>
                      <ul className="space-y-2">
                        {highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-softGray leading-relaxed font-sans">
                            <CheckCircle2 size={14} className="text-gold shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 border-t border-hairline flex items-center justify-between">
                    <Link
                      href={`/leadership/${item.slug}`}
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-obsidian border border-hairline hover:border-gold text-xs font-sans font-bold tracking-wider uppercase text-ivory hover:text-gold transition-all duration-300"
                    >
                      <span>{locale === 'id' ? 'BACA REKAM JEJAK LENGKAP' : locale === 'en' ? 'VIEW TRACK RECORD' : '阅读完整领导历程'}</span>
                      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    <span className="text-[10px] font-sans text-softGray uppercase">
                      OFFICIAL PEDIGREE
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
