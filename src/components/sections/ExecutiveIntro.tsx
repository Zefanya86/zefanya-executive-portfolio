'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  Workflow,
  Truck,
  Users2,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Award,
  GraduationCap,
  Sparkles,
  MapPin,
  Building2,
} from 'lucide-react';
import { sound } from '@/lib/sound';

export default function ExecutiveIntro() {
  const { data, locale, t } = usePortfolio();

  const pillars = [
    {
      icon: Workflow,
      code: 'PILLAR 01',
      title: {
        id: 'Operations Management',
        en: 'Operations Management',
        zh: '精益运营管理'
      },
      desc: {
        id: 'Pengelolaan operasional menyeluruh, implementasi SOP ketat, monitoring KPI terukur, dan mitigasi downtime.',
        en: 'Comprehensive operational governance, SOP implementation, measurable KPI telemetry, and downtime reduction.',
        zh: '统筹企业与现场日常运营全流程，严抓作业标准规范（SOP）落实与量化KPI监控，切实杜绝停机延误。'
      },
      tag: 'OPERATIONS',
    },
    {
      icon: Layers,
      code: 'PILLAR 02',
      title: {
        id: 'Procurement Strategy',
        en: 'Strategic Procurement',
        zh: '战略物资采购'
      },
      desc: {
        id: 'End-to-end material procurement proyek infrastruktur skala besar, evaluasi rekanan, dan stock control.',
        en: 'End-to-end heavy construction procurement, accredited vendor management, and stock control systems.',
        zh: '特大型工程原材料全周期集中采购供应、严选源头高资质供应商，建立精细化动态库存盘点机制。'
      },
      tag: 'SUPPLY CHAIN',
    },
    {
      icon: Truck,
      code: 'PILLAR 03',
      title: {
        id: 'Logistics Coordination',
        en: 'Logistics Coordination',
        zh: '重大物流调度'
      },
      desc: {
        id: 'Supervisi loading, hauling, dan delivery pengangkutan mineral serta kesiapan armada berat di lapangan.',
        en: 'Managing heavy mineral flow logistics, hauling dispatch, turnaround speed, and fleet safety readiness.',
        zh: '统领矿产大宗转运装载、长途重卡运输与现场交付全链条调度，确保车队高负荷出勤与零安全隐患。'
      },
      tag: 'HAULING & FREIGHT',
    },
    {
      icon: Users2,
      code: 'PILLAR 04',
      title: {
        id: 'Executive Leadership',
        en: 'Executive Leadership',
        zh: '高管组织领导力'
      },
      desc: {
        id: 'Pengalaman memimpin BEM Universitas, organisasi kepemudaan GEMA-RI, dan manajemen perusahaan.',
        en: 'University Student Body Presidency, GEMA-RI municipal branch leadership, and corporate governance.',
        zh: '历经全校最高学生会总会主席、市级全国青年组织领袖及现代企业总经理历练，具备果断战略执行力。'
      },
      tag: 'GOVERNANCE',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-28 bg-obsidian border-t border-hairline overflow-hidden">
      {/* Background subtle gold glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-[10px] sm:text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>01 // EXECUTIVE PROFILE & CREDENTIALS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {locale === 'id' ? (
              <>
                Kredibilitas Operasional & <br />
                <span className="gold-gradient-text">Kepemimpinan Teruji.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Operational Credibility & <br />
                <span className="gold-gradient-text">Proven Leadership.</span>
              </>
            ) : (
              <>
                过硬的现场运营实力与 <br />
                <span className="gold-gradient-text">经受考验的领导格局。</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-softGray font-sans font-normal leading-relaxed">
            {t(data.profile.shortBio)}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Bento Card 1: Narrative & Biography (Col 8) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-charcoal border border-hairline shadow-luxury-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-hairline text-xs font-sans text-softGray">
                <span className="text-gold font-bold tracking-wider uppercase">PROFESSIONAL SUMMARY</span>
                <span className="font-mono">VERIFIED BY OFFICIAL CV</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-ivory">
                {locale === 'id'
                  ? 'Pengalaman Lintas Sektor & Tanggung Jawab Operasional'
                  : locale === 'en'
                  ? 'Cross-Sector Experience & Operational Scope'
                  : '跨行业管理历练与全面运营统筹'}
              </h3>

              <div className="text-softGray text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                <p>{t(data.profile.fullBio)}</p>
              </div>

              {/* Career & Leadership Philosophy Callout */}
              <div className="mt-4 p-4 rounded-xl bg-obsidian/70 border border-gold/30">
                <span className="text-[10px] font-sans uppercase tracking-widest text-gold font-bold block mb-1">
                  {locale === 'id' ? 'Filosofi Kepemimpinan' : locale === 'en' ? 'Leadership Philosophy' : '高管领导哲学'}
                </span>
                <blockquote className="text-xs sm:text-sm font-serif italic text-ivory/90 leading-relaxed">
                  "{t(data.profile.leadershipPhilosophy)}"
                </blockquote>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-softGray">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Zefanya Zulian, S.Ikom — Universitas Bhayangkara Jakarta Raya</span>
              </div>
              <span className="text-gold font-bold">
                BEKASI · BANTEN · KALIMANTAN
              </span>
            </div>
          </div>

          {/* Bento Card 2: Verified Key Credentials & Certifications (Col 4) */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-charcoal border border-hairline shadow-luxury-card flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-hairline text-xs font-sans text-softGray">
                <span className="text-gold font-bold tracking-wider uppercase">VERIFIED CREDENTIALS</span>
                <span>4 CERTIFICATIONS</span>
              </div>

              <div className="space-y-3 font-sans">
                {/* Degree Badge */}
                <div className="p-3.5 rounded-xl bg-obsidian border border-hairline flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-ivory block">S.Ikom (Ilmu Komunikasi)</span>
                      <span className="text-[10px] text-softGray block">Universitas Bhayangkara (2024)</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 shrink-0">
                    GPA 3.25
                  </span>
                </div>

                {/* PR Officer LSP Ubhara */}
                <div className="p-3.5 rounded-xl bg-obsidian border border-hairline flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-ivory block">Certified PR Officer</span>
                      <span className="text-[10px] text-softGray block">LSP Ubhara Jaya (2024)</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/30 shrink-0">
                    LSP / BNSP
                  </span>
                </div>

                {/* TOEFL CEFR B2 */}
                <div className="p-3.5 rounded-xl bg-obsidian border border-hairline flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-ivory block">TOEFL Score 533</span>
                      <span className="text-[10px] text-softGray block">CEFR B2 Upper Intermediate (2023)</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 shrink-0">
                    B2
                  </span>
                </div>

                {/* COVID-19 1,100 Doses Milestones */}
                <div className="p-3.5 rounded-xl bg-obsidian border border-hairline">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ivory">COVID-19 Vaccination Drive</span>
                    <span className="text-xs font-bold text-gold">1,100 DOSES</span>
                  </div>
                  <p className="text-[10px] text-softGray mt-1">
                    Kolaborasi Kapolri & BEM Universitas Bhayangkara Jakarta Raya (2021).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-sans text-softGray text-center border-t border-hairline/60">
              {locale === 'id'
                ? 'Seluruh data disinkronkan dengan CV resmi'
                : locale === 'en'
                ? 'All credentials verified against official records'
                : '全部履历信息均与官方档案核验一致'}
            </div>
          </div>

          {/* 4 Systems Cards (Grid across 12 columns) */}
          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="p-6 rounded-2xl bg-charcoal border border-hairline hover:border-gold/60 transition-all duration-300 group cursor-pointer shadow-luxury-card hover:shadow-gold-subtle"
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-hairline text-xs font-sans text-softGray">
                    <span className="text-gold font-bold">{item.code}</span>
                    <span className="text-[9px] uppercase tracking-wider">{item.tag}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-obsidian border border-hairline text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors duration-300 w-fit mb-3">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h4 className="text-base font-serif font-bold text-ivory tracking-tight group-hover:text-gold transition-colors">
                    {item.title[locale] || item.title.id}
                  </h4>

                  <p className="text-xs text-softGray mt-2 leading-relaxed font-sans">
                    {item.desc[locale] || item.desc.id}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
