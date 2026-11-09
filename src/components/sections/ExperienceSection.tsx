'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import { Calendar, MapPin, Building, ArrowUpRight, CheckCircle2, ShieldCheck, Briefcase, Flame } from 'lucide-react';
import { ExperienceItem } from '@/types/portfolio';
import { sound } from '@/lib/sound';

export default function ExperienceSection() {
  const { data, locale, t, tList, openLightbox } = usePortfolio();
  const sortedExperiences = [...data.experiences]
    .filter((exp) => exp.isPublished !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="relative py-28 bg-obsidian border-t border-hairline overflow-hidden">
      {/* Background subtle luxury grid */}
      <div className="absolute inset-0 bg-luxury-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-[10px] sm:text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>02 // PROFESSIONAL EXPERIENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {locale === 'id' ? (
              <>
                Karier Eksekutif & <br />
                <span className="gold-gradient-text">Kepemimpinan Operasional.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Executive Career & <br />
                <span className="gold-gradient-text">Project Operations.</span>
              </>
            ) : (
              <>
                高管职业生涯与 <br />
                <span className="gold-gradient-text">重大项目现场统筹。</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-softGray font-sans font-normal leading-relaxed">
            {locale === 'id'
              ? 'Kepemimpinan operasional pada sektor pengadaan barang, real estate komersial, transportasi mineral, serta logistik material infrastruktur jembatan skala nasional.'
              : locale === 'en'
              ? 'Executive operational leadership overseeing enterprise procurement, real estate, mineral transport logistics, and heavy construction materials for national infrastructure.'
              : '全面领导企业采购管道、商业地产开发、大宗矿产长途转运及国家重大跨海大桥建设原材料供应链。'}
          </p>
        </div>

        {/* Experience Flow: Dynamic Multi-Layout Visual Storytelling */}
        <div className="space-y-16 sm:space-y-20">
          {sortedExperiences.map((exp, index) => {
            const layout = exp.layoutStyle || (index === 0 ? 'editorial-split' : index === 1 ? 'cinematic-full' : 'asymmetric-gallery');

            if (layout === 'editorial-split') {
              return <EditorialSplitLayout key={exp.id} exp={exp} index={index} />;
            } else if (layout === 'cinematic-full') {
              return <CinematicFullLayout key={exp.id} exp={exp} index={index} />;
            } else {
              return <AsymmetricGalleryLayout key={exp.id} exp={exp} index={index} />;
            }
          })}
        </div>
      </div>
    </section>
  );
}

// Layout A: Editorial Split (Text Left, Landscape Media Right)
function EditorialSplitLayout({ exp, index }: { exp: ExperienceItem; index: number }) {
  const { locale, t, tList, openLightbox } = usePortfolio();
  const responsibilities = tList(exp.responsibilities);
  const coverImg = exp.coverImage || '/preview-skylines.jpg';
  const isFlagship = exp.company.includes('Asri') || (index === 0 && exp.featured);

  return (
    <article className={`border ${isFlagship ? 'border-gold/50 shadow-[0_0_25px_rgba(197,164,119,0.12)]' : 'border-hairline'} bg-charcoal p-6 sm:p-10 rounded-2xl shadow-luxury-card transition-all duration-300 hover:border-gold/60 group`}>
      {/* Card Header Telemetry */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-hairline text-xs font-sans text-softGray">
        <div className="flex items-center gap-2">
          <span className="text-gold font-bold">● EXP 0{index + 1}</span>
          <span className="uppercase">// {exp.company}</span>
        </div>
        {isFlagship ? (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/40 text-[11px] font-mono font-bold text-gold shadow-[0_0_12px_rgba(197,164,119,0.25)]">
            <Flame size={12} className="text-gold animate-pulse" />
            <span>🔥 TOP TRENDING // FLAGSHIP WORK</span>
          </div>
        ) : (
          <div className="text-softGray text-[11px] font-mono">
            {exp.period.includes('Present') ? 'STATUS: ACTIVE ROLE' : 'STATUS: EXECUTIVE ARCHIVE'}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Context & Responsibilities */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-sans tracking-wider font-semibold uppercase bg-obsidian text-softGray border border-hairline rounded-full">
                {exp.period}
              </span>
              {isFlagship && (
                <span className="px-3 py-1 text-xs font-sans tracking-wider uppercase bg-gold/20 text-gold font-bold border border-gold/50 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(197,164,119,0.2)]">
                  <Flame size={12} className="text-gold" />
                  {locale === 'id' ? 'Karier Teratas & Berdampak' : locale === 'en' ? 'Flagship Trending Work' : '重点代表性标杆经历'}
                </span>
              )}
              {exp.period.includes('Present') && !isFlagship && (
                <span className="px-3 py-1 text-xs font-sans tracking-wider uppercase bg-gold/15 text-gold font-bold border border-gold/40 rounded-full">
                  {locale === 'id' ? 'Posisi Saat Ini' : locale === 'en' ? 'Current Position' : '现任职位'}
                </span>
              )}
              <span className="px-3 py-1 text-xs font-sans text-softGray flex items-center gap-1.5 border border-hairline rounded-full">
                <MapPin size={12} className="text-gold" />
                {exp.location}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory tracking-tight group-hover:text-gold transition-colors">
              {t(exp.role)}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-sm font-sans">
              <span className="font-semibold text-gold flex items-center gap-1.5">
                <Building size={15} />
                {exp.company}
              </span>
              {exp.projectContext && (
                <>
                  <span className="text-softGray">•</span>
                  <span className="text-softGray">{t(exp.projectContext)}</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
              <Briefcase size={13} className="text-gold" />
              <span>
                {locale === 'id'
                  ? 'Tanggung Jawab Strategis & Operasional:'
                  : locale === 'en'
                  ? 'Strategic & Operational Responsibilities:'
                  : '核心管理职责与统筹：'}
              </span>
            </p>
            <ul className="space-y-2.5">
              {responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-softGray leading-relaxed font-sans">
                  <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href={`/experience/${exp.slug}`}
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-obsidian border border-hairline hover:border-gold text-xs font-sans font-bold tracking-wider uppercase text-ivory hover:text-gold transition-all duration-300 shadow-sm"
            >
              <span>{locale === 'id' ? 'BACA RINCIAN PENGALAMAN' : locale === 'en' ? 'VIEW CASE BREAKDOWN' : '查看完整履历详情'}</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Landscape Cover */}
        <div className="lg:col-span-6 space-y-4">
          <div
            onClick={() => {
              sound.playClick();
              openLightbox({
                id: `cover-${exp.id}`,
                url: coverImg,
                caption: exp.coverImageCaption,
                alt: exp.coverImageAlt || { id: exp.company, en: exp.company, zh: exp.company },
                source: exp.company,
                license: 'Official Archive',
              });
            }}
            className="group/img relative w-full h-[280px] sm:h-[360px] bg-obsidian border border-hairline rounded-xl overflow-hidden cursor-pointer"
          >
            <Image
              src={coverImg}
              alt={t(exp.coverImageAlt) || exp.company}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover/img:scale-105 transition-transform duration-700 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />

            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-[10px] font-sans tracking-wider uppercase bg-obsidian/85 backdrop-blur-md text-gold border border-gold/40 rounded-full flex items-center gap-1.5 font-semibold">
                <ShieldCheck size={11} className="text-gold" />
                <span>{exp.company}</span>
              </span>
            </div>

            <div className="absolute bottom-3 left-4 right-4 text-ivory">
              <p className="text-xs font-serif font-bold line-clamp-1">{t(exp.role)} — {exp.location}</p>
              <p className="text-[10px] font-sans text-softGray mt-0.5">
                {locale === 'id' ? 'Klik untuk memperbesar gambar' : locale === 'en' ? 'Click to inspect in high-resolution' : '点击放大查阅高清图'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// Layout B: Full-Width Cinematic (Banner Image Above, Content Below)
function CinematicFullLayout({ exp, index }: { exp: ExperienceItem; index: number }) {
  const { locale, t, tList, openLightbox } = usePortfolio();
  const responsibilities = tList(exp.responsibilities);
  const coverImg = exp.coverImage || '/preview-highway.jpg';

  return (
    <article className="border border-hairline bg-charcoal rounded-2xl shadow-luxury-card transition-all duration-300 hover:border-gold/60 overflow-hidden group">
      {/* Top Full-Width Cinematic Image */}
      <div
        onClick={() => {
          sound.playClick();
          openLightbox({
            id: `cover-${exp.id}`,
            url: coverImg,
            caption: exp.coverImageCaption,
            alt: exp.coverImageAlt || { id: exp.company, en: exp.company, zh: exp.company },
            source: exp.company,
            license: 'Official Archive',
          });
        }}
        className="group/img relative w-full h-[280px] sm:h-[400px] bg-obsidian cursor-pointer overflow-hidden"
      >
        <Image
          src={coverImg}
          alt={t(exp.coverImageAlt) || exp.company}
          fill
          sizes="100vw"
          className="object-cover group-hover/img:scale-105 transition-transform duration-700 filter contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/20" />

        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
          <span className="px-3 py-1 text-[10px] font-sans tracking-wider uppercase bg-obsidian/85 backdrop-blur-md text-gold border border-gold/40 rounded-full flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>EXP 0{index + 1} // {exp.company.toUpperCase()}</span>
          </span>
          <span className="px-3 py-1 text-[10px] font-sans tracking-wider uppercase bg-obsidian/85 backdrop-blur-md text-ivory border border-hairline rounded-full">
            {exp.location}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-ivory max-w-4xl">
          <p className="text-xs font-sans tracking-widest uppercase text-gold font-bold mb-1">
            {exp.period} • {exp.location}
          </p>
          <h3 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight mb-1 text-ivory">
            {t(exp.role)} — <span className="text-gold">{exp.company}</span>
          </h3>
          {exp.projectContext && (
            <p className="text-xs sm:text-sm font-sans text-softGray">{t(exp.projectContext)}</p>
          )}
        </div>
      </div>

      {/* Content Area Below */}
      <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 space-y-4">
          <h4 className="text-lg font-serif font-bold text-ivory">
            {locale === 'id' ? 'Ringkasan & Lingkup Operasional' : locale === 'en' ? 'Operational Scope & Focus' : '运营范围与执行重点'}
          </h4>
          <p className="text-xs sm:text-sm text-softGray leading-relaxed font-sans">
            {locale === 'id'
              ? 'Memastikan kesinambungan operasional harian, kepatuhan SOP lapangan, koordinasi lintas fungsi antara logistik, pengadaan, dan HSE untuk mencapai efisiensi alur distribusi mineral.'
              : locale === 'en'
              ? 'Securing daily operational continuity, field SOP governance, and multi-team synchronization across logistics, procurement, and HSE to drive bulk mineral flow distribution.'
              : '全面保障现场每日大宗矿产转运作业持续不间断、严格落实安全标准作业程序（SOP），深度联动后勤、物资采购与HSE安全团队。'}
          </p>

          <div className="pt-2">
            <Link
              href={`/experience/${exp.slug}`}
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-obsidian border border-hairline hover:border-gold text-xs font-sans font-bold tracking-wider uppercase text-ivory hover:text-gold transition-all duration-300"
            >
              <span>{locale === 'id' ? 'LIHAT DETAIL PROYEK' : locale === 'en' ? 'VIEW PROJECT DETAILS' : '查看重点项目详情'}</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="md:col-span-7 space-y-2.5">
          <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
            <Briefcase size={12} className="text-gold" />
            <span>{locale === 'id' ? 'Detail Pelaksanaan & Tanggung Jawab:' : locale === 'en' ? 'Key Execution Responsibilities:' : '核心工作职责与具体落地：'}</span>
          </p>
          <ul className="space-y-2.5">
            {responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-softGray leading-relaxed font-sans">
                <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

// Layout C: Asymmetric Gallery
function AsymmetricGalleryLayout({ exp, index }: { exp: ExperienceItem; index: number }) {
  const { locale, t, tList, openLightbox } = usePortfolio();
  const responsibilities = tList(exp.responsibilities);
  const coverImg = exp.coverImage || '/preview-hero-cinematic.jpg';

  return (
    <article className="border border-hairline bg-charcoal p-6 sm:p-10 rounded-2xl shadow-luxury-card transition-all duration-300 hover:border-gold/60 group">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-hairline text-xs font-sans text-softGray">
        <div className="flex items-center gap-2">
          <span className="text-gold font-bold">● EXP 0{index + 1}</span>
          <span className="uppercase">// {exp.company}</span>
        </div>
        <div className="text-softGray text-[11px] font-mono">
          INFRASTRUCTURE LOGISTICS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image */}
        <div className="lg:col-span-6 space-y-3 order-2 lg:order-1">
          <div
            onClick={() => {
              sound.playClick();
              openLightbox({
                id: `cover-${exp.id}`,
                url: coverImg,
                caption: exp.coverImageCaption,
                alt: exp.coverImageAlt || { id: exp.company, en: exp.company, zh: exp.company },
                source: exp.company,
                license: 'Official Archive',
              });
            }}
            className="group/img relative w-full h-[260px] sm:h-[320px] bg-obsidian border border-hairline rounded-xl overflow-hidden cursor-pointer"
          >
            <Image
              src={coverImg}
              alt={t(exp.coverImageAlt) || exp.company}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover/img:scale-105 transition-transform duration-700 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-ivory">
              <span className="px-2.5 py-0.5 text-[10px] font-sans tracking-wider uppercase bg-obsidian/85 text-gold border border-gold/40 rounded-full font-semibold">
                {exp.company}
              </span>
              <p className="text-xs font-serif font-bold line-clamp-1 mt-1 text-ivory">
                {t(exp.role)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Text & Details */}
        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-sans tracking-wider font-semibold uppercase bg-obsidian text-softGray border border-hairline rounded-full">
                {exp.period}
              </span>
              <span className="px-3 py-1 text-xs font-sans text-softGray flex items-center gap-1.5 border border-hairline rounded-full">
                <MapPin size={12} className="text-gold" />
                {exp.location}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory tracking-tight group-hover:text-gold transition-colors">
              {t(exp.role)}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-sm font-sans">
              <span className="font-semibold text-gold flex items-center gap-1.5">
                <Building size={15} />
                {exp.company}
              </span>
              {exp.projectContext && (
                <>
                  <span className="text-softGray">•</span>
                  <span className="text-softGray">{t(exp.projectContext)}</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
              <Briefcase size={12} className="text-gold" />
              <span>
                {locale === 'id'
                  ? 'Tanggung Jawab Pengadaan & Logistik Material:'
                  : locale === 'en'
                  ? 'Procurement & Logistics Execution:'
                  : '原材料采购与供应链物流责任：'}
              </span>
            </p>
            <ul className="space-y-2.5">
              {responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-softGray leading-relaxed font-sans">
                  <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <Link
              href={`/experience/${exp.slug}`}
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-obsidian border border-hairline hover:border-gold text-xs font-sans font-bold tracking-wider uppercase text-ivory hover:text-gold transition-all duration-300"
            >
              <span>{locale === 'id' ? 'BACA DETAIL PROYEK' : locale === 'en' ? 'VIEW PROJECT CASE STUDY' : '查看跨海工程案例详情'}</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
