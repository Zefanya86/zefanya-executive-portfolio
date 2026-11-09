'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { BookOpen, Quote, Sparkles, Compass, ShieldCheck, ArrowRight, Bookmark } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function ExecutiveBookshelf() {
  const { locale } = usePortfolio();

  const sectionMeta = {
    badge: {
      id: '08 // INTELLECTUAL CURATION & LEADERSHIP PRINCIPLES',
      en: '08 // INTELLECTUAL CURATION & LEADERSHIP PRINCIPLES',
      zh: '08 // 思想智库与高层治企思想渊源',
    },
    title: {
      id: 'Pustaka Pemikiran Strategis & Kepemimpinan.',
      en: 'The Executive Bookshelf & Strategic Tenets.',
      zh: '战略思想智库与领导力哲学著作。',
    },
    subtitle: {
      id: 'Karya-karya rujukan kelas dunia yang membentuk ketajaman analisis, tata kelola risiko rantai pasok, dan keteguhan integritas kepemimpinan Zefanya Zulian.',
      en: 'World-class intellectual cornerstones shaping analytical precision, supply chain governance, and steadfast executive integrity.',
      zh: '塑造Zefanya Zulian严密分析敏锐度、复杂大宗供应链抗风险决策及高度治企责任操守的全球经典著作。',
    },
  };

  const books = [
    {
      id: 'principles',
      title: 'Principles: Life and Work',
      author: 'Ray Dalio',
      year: '2017',
      category: {
        id: 'Pengambilan Keputusan & Transparansi Radikal',
        en: 'Strategic Decisions & Radical Transparency',
        zh: '战略决策与极致透明机制',
      },
      coverColor: 'from-[#1E1E24] via-[#2A2A33] to-[#141418]',
      accentColor: 'border-gold/40 text-gold',
      coreQuote: {
        id: '“Pain + Reflection = Progress. Tanpa transparansi radikal terhadap fakta lapangan, masalah kecil akan berkembang menjadi kegagalan sistemik.”',
        en: '“Pain + Reflection = Progress. Without radical truth and transparency, minor field frictions escalate into systemic failure.”',
        zh: '“痛苦 + 反思 = 进步。若脱离对现场真实数据的极致透明，细小摩擦终将演变为系统性断链。”',
      },
      operationalApplication: {
        id: 'Diimplementasikan langsung dalam manajemen pengadaan material jembatan selat maritim: mencatat setiap deviasi volume semen dan agregat secara objektif, meniadakan budaya saling menyalahkan antar-divisi, serta membangun SOP berbasis data empiris.',
        en: 'Directly applied to maritime bridge procurement: objectively logging every volume deviation across marine cement and steel, eliminating blame culture, and establishing empirical SOPs.',
        zh: '在跨海大桥特种海工材料采购中深度实践：客观记录每一批次水泥及特种钢材的偏差，打破各工区推诿壁垒，构建基于真实数据的标准作业程序。',
      },
    },
    {
      id: 'high-output-management',
      title: 'High Output Management',
      author: 'Andrew S. Grove',
      year: '1983 / 2015',
      category: {
        id: 'Efisiensi Operasional & Managerial Leverage',
        en: 'Operational Leverage & Bottleneck Elimination',
        zh: '运营杠杆率与卡脖子瓶颈破除',
      },
      coverColor: 'from-[#171A21] via-[#222733] to-[#12141C]',
      accentColor: 'border-emerald-500/40 text-emerald-400',
      coreQuote: {
        id: '“Output seorang manajer adalah total output dari seluruh tim operasional yang dipimpin atau dipengaruhinya.”',
        en: '“A manager’s output is the output of the organizational units under his or her supervision or influence.”',
        zh: '“管理者的产出，是其所领导或对其施加影响的整个组织单元的综合产出。”',
      },
      operationalApplication: {
        id: 'Diterapkan dalam tata kelola armada hauling truk tronton darat (PT MBL): setiap jam waktu tunggu (downtime) di pelabuhan atau dermaga adalah pemborosan modal. Fokus utama kepemimpinan adalah menyingkirkan bottleneck rute agar perputaran armada mencapai utilitas puncak.',
        en: 'Applied across heavy hauling dump truck operations (PT MBL): every hour of vehicle turnaround delay at the jetty incurs severe financial loss. Leadership focus is relentlessly centered on eradicating route bottlenecks.',
        zh: '全面应用于重型后八轮自卸车队调度调度中（PT MBL）：码头或矿区道路的每一次延误都伴随真金白银的损耗。领导力的核心就是精准消除各卡车周转环节的瓶颈。',
      },
    },
    {
      id: 'art-of-war',
      title: 'The Art of War (孙子兵法)',
      author: 'Sun Tzu',
      year: 'Ancient / Modern Commentary',
      category: {
        id: 'Manajemen Risiko & Perencanaan Dini',
        en: 'Pre-emptive Risk & Supply Calculus',
        zh: '先胜后战与前置风控推演',
      },
      coverColor: 'from-[#221616] via-[#332020] to-[#160E0E]',
      accentColor: 'border-amber-500/40 text-amber-400',
      coreQuote: {
        id: '“Jenderal yang memenangkan pertempuran melakukan banyak kalkulasi sebelum bertarung. Logistik adalah urat nadi setiap ekspedisi.”',
        en: '“The general who wins a battle makes many calculations in his temple ere the battle is fought. Supply lines dictate destiny.”',
        zh: '“夫未战而庙算胜者，得算多也。兵马未动，粮草先行；供给链方定胜负大局。”',
      },
      operationalApplication: {
        id: 'Kunci dalam mengatasi tantangan alam di Selat P. Laut Kotabaru: gelombang laut pasang dan angin kencang bukan kejutan mendadak, melainkan variabel terprediksi. Menghitung buffer stock material 14 hari di area pulau adalah wujud kalkulasi dini Sun Tzu.',
        en: 'Key to mastering marine elements at Pulau Laut Strait: maritime currents and monsoon swells are not sudden crises, but predictable variables. Securing a 14-day stock buffer on-site manifests this ancient calculus.',
        zh: '攻克劳特岛跨海风浪天堑的底层法宝：汹涌洋流与季风季从来不是意外，而是必须算尽的既定变量。提前两周在孤岛现场储备充足应急物料，正是前置推演的具象化。',
      },
    },
    {
      id: 'good-to-great',
      title: 'Good to Great',
      author: 'Jim Collins',
      year: '2001',
      category: {
        id: 'Level 5 Leadership & Disiplin Eksekusi',
        en: 'Level 5 Leadership & Discipline Flywheel',
        zh: '第五级领导力与严明执行飞轮',
      },
      coverColor: 'from-[#191922] via-[#242436] to-[#111118]',
      accentColor: 'border-purple-500/40 text-purple-400',
      coreQuote: {
        id: '“Kepemimpinan Level 5 memadukan kerendahan hati pribadi yang mendalam dengan keteguhan tekad profesional yang tak tergoyahkan.”',
        en: '“Level 5 leaders blend personal humility with intense professional will. They look in the mirror to apportion responsibility, and out the window to credit others.”',
        zh: '“第五级领导者将个人的谦逊包容与专业意志上的百折不挠完美融为一体；面对问题自审自省，面对荣誉归于全员。”',
      },
      operationalApplication: {
        id: 'Membimbing tim di lokasi konstruksi terpencil membutuhkan kepemimpinan yang membumi. Wibawa tidak lahir dari instruksi di atas kertas, tetapi dari kesediaan hadir bersama kru di lapangan, mendengarkan masukan para mekanik dan nakhoda tongkang secara tulus.',
        en: 'Leading teams in isolated frontier projects demands grounded authority. True leadership is not forged through paperwork, but by standing shoulder-to-shoulder with crews, listening genuinely to mechanics and barge captains.',
        zh: '在边远艰苦工程前线带队，权威绝非来自红头文件，而来自与一线施工人员并肩作业、真诚听取机修班长与拖轮船长现场意见的平实风范。',
      },
    },
  ];

  return (
    <section
      id="bookshelf"
      className="relative py-28 bg-obsidian-deep border-t border-hairline overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-[10px] sm:text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <BookOpen size={13} className="text-gold" />
            <span>{sectionMeta.badge[locale] || sectionMeta.badge.id}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {sectionMeta.title[locale] || sectionMeta.title.id}
          </h2>

          <p className="text-base sm:text-lg text-softGray font-sans font-normal leading-relaxed max-w-3xl">
            {sectionMeta.subtitle[locale] || sectionMeta.subtitle.id}
          </p>
        </div>

        {/* Bookshelf Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {books.map((book) => (
            <div
              key={book.id}
              className="group relative p-7 sm:p-8 rounded-2xl bg-charcoal/70 backdrop-blur-xl border border-hairline/80 hover:border-gold/50 transition-all duration-300 hover:shadow-luxury-card flex flex-col justify-between"
            >
              {/* Subtle Corner Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/10 transition-colors" />

              <div>
                {/* Book Header Tag & Category */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian border border-hairline text-[10px] sm:text-[11px] font-sans font-semibold text-softGray">
                    <Bookmark size={11} className="text-gold" />
                    <span>{book.category[locale] || book.category.id}</span>
                  </div>

                  <span className="text-[11px] font-mono text-softGray/70">
                    {book.year}
                  </span>
                </div>

                {/* Book Title & Author */}
                <div className="space-y-1 mb-5">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-ivory group-hover:text-gold transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-gold font-medium">
                    {book.author}
                  </p>
                </div>

                {/* Core Philosophy Quote */}
                <div className="p-4 rounded-xl bg-obsidian/70 border-l-2 border-gold/70 my-4 space-y-1">
                  <div className="flex items-center gap-1 text-gold/80 mb-1">
                    <Quote size={13} />
                    <span className="text-[9px] font-sans uppercase font-bold tracking-wider">
                      {locale === 'id' ? 'Prinsip Kunci' : locale === 'en' ? 'Core Principle' : '核心要旨'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif italic text-ivory/90 leading-relaxed">
                    {book.coreQuote[locale] || book.coreQuote.id}
                  </p>
                </div>

                {/* Operational Application by Zefanya */}
                <div className="mt-4 pt-4 border-t border-hairline/60">
                  <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-gold uppercase tracking-wider mb-2">
                    <Compass size={13} />
                    <span>
                      {locale === 'id' 
                        ? 'Refleksi Operasional Zefanya' 
                        : locale === 'en' 
                        ? 'Zefanya’s Operational Application' 
                        : 'Zefanya 现场运营实战落地'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-softGray leading-relaxed">
                    {book.operationalApplication[locale] || book.operationalApplication.id}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="mt-6 pt-3 flex items-center justify-between text-[11px] font-sans text-softGray/60 border-t border-hairline/40">
                <span className="uppercase tracking-widest text-[9px]">EXECUTIVE READING DOSSIER</span>
                <span className="text-gold/60 group-hover:text-gold transition-colors">Principles-in-Practice</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
