'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  HeartHandshake,
  Award,
  Users2,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Megaphone,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { sound } from '@/lib/sound';

export default function CivicMentorshipSection() {
  const { locale, setIsWhatsAppModalOpen } = usePortfolio();

  const meta = {
    badge: {
      id: '09 // CIVIC LEGACY & YOUTH MENTORSHIP',
      en: '09 // CIVIC LEGACY & YOUTH MENTORSHIP',
      zh: '09 // 社会公仆担当与青年领袖导师传承',
    },
    title: {
      id: 'Dedikasi Sosial, Jejak Kebangsaan & Pembinaan Generasi Muda.',
      en: 'Civic Legacy, National Solidarity & Youth Mentorship.',
      zh: '青年家国情怀、万人奉献历程与青年领袖传承。',
    },
    subtitle: {
      id: 'Kepemimpinan sejati tidak hanya diukur dari efisiensi logistik proyek, melainkan dari keberanian mengambil tanggung jawab sosial saat bangsa membutuhkan dan komitmen membina generasi penerus.',
      en: 'True leadership transcends logistical balance sheets; it is proven through civic responsibility in moments of national crisis and a dedicated investment in the next generation.',
      zh: '真正的商业领袖不仅体现在工程供应链的精密把控，更熔铸在国家危难时刻的挺身担当，以及对青年后备力量倾注心血的无私传帮带。',
    },
  };

  const metrics = [
    {
      value: '1.100+',
      label: {
        id: 'Dosis Vaksinasi Massal Bersama Kapolri',
        en: 'Mass Vaccine Doses Distributed with National Police Chief',
        zh: '携手印尼国家警察总长落地推进的大型疫苗接种剂次',
      },
    },
    {
      value: '10.000+',
      label: {
        id: 'Mahasiswa Dinaungi (Presiden BEM Ubhara)',
        en: 'Students Represented as BEM University President',
        zh: '任总会主席期间代表并治理服务全校万余名青年学子',
      },
    },
    {
      value: 'BNSP',
      label: {
        id: 'Lisensi Resmi Public Relations Officer',
        en: 'Certified Public Relations Officer (LSP/BNSP)',
        zh: '印尼国家职业资格认证中心（BNSP）公关高管执业资格',
      },
    },
  ];

  return (
    <section
      id="mentorship"
      className="relative py-28 bg-obsidian border-t border-hairline overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-[10px] sm:text-xs font-sans text-gold tracking-widest uppercase font-semibold">
            <HeartHandshake size={13} className="text-gold" />
            <span>{meta.badge[locale] || meta.badge.id}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
            {meta.title[locale] || meta.title.id}
          </h2>

          <p className="text-base sm:text-lg text-softGray font-sans font-normal leading-relaxed max-w-3xl">
            {meta.subtitle[locale] || meta.subtitle.id}
          </p>
        </div>

        {/* Milestone Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-charcoal/60 backdrop-blur-xl border border-hairline hover:border-gold/40 transition-colors"
            >
              <span className="text-3xl sm:text-4xl font-serif font-bold text-gold block mb-2">
                {m.value}
              </span>
              <p className="text-xs sm:text-sm font-sans text-softGray leading-relaxed">
                {m.label[locale] || m.label.id}
              </p>
            </div>
          ))}
        </div>

        {/* Dual Pillar Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pillar 1: Historic Civic Leadership */}
          <div className="p-8 sm:p-9 rounded-2xl bg-charcoal/80 backdrop-blur-xl border border-gold/30 relative flex flex-col justify-between shadow-luxury-card">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-[10px] font-sans font-bold uppercase tracking-wider text-gold">
                  <ShieldCheck size={13} />
                  <span>
                    {locale === 'id' ? 'Jejak Kepemimpinan Publik' : locale === 'en' ? 'Historic Civic Track Record' : '重大历史使命历程'}
                  </span>
                </div>
                <span className="text-xs font-mono text-softGray">2021 — 2022</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-ivory">
                {locale === 'id'
                  ? 'Aksi Kemanusiaan 1.100 Dosis Vaksinasi Bersama Kapolri'
                  : locale === 'en'
                  ? '1,100-Dose Humanitarian Vaccine Drive with the National Police Chief'
                  : '携手印尼国家警察总长：1100剂抗疫爱心疫苗历史行动'}
              </h3>

              <p className="text-sm font-sans text-softGray leading-relaxed">
                {locale === 'id'
                  ? 'Di masa krisis pandemi, saat menjabat sebagai Presiden Mahasiswa BEM Universitas Bhayangkara Jakarta Raya, Zefanya menginisiasi dan memimpin langsung operasi logistik kesehatan massal yang melibatkan ribuan civitas akademika dan masyarakat umum, diapresiasi langsung oleh Kapolri Jenderal Polisi Listyo Sigit Prabowo.'
                  : locale === 'en'
                  ? 'During the height of the health crisis, while serving as President of the Student Executive Body (BEM Ubhara), Zefanya orchestrated and executed a massive logistics healthcare mobilization for thousands of citizens, officially commended by Indonesian National Police Chief General Listyo Sigit Prabowo.'
                  : '在疫情严峻吃紧时期，Zefanya以全校学生会总会主席之职，统筹协调全校各学院师生与地方卫生中枢，成功落地逾千人次接种行动，受到印尼国家警察总长李斯蒂约·西吉特·普拉博沃上将的当面视察与高度赞许。'}
              </p>

              <div className="p-4 rounded-xl bg-obsidian/70 border-l-2 border-gold space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gold block">
                  {locale === 'id' ? 'Makna Kepemimpinan' : locale === 'en' ? 'Leadership Lesson' : '领导力启示'}
                </span>
                <p className="text-xs font-serif italic text-ivory/90 leading-relaxed">
                  {locale === 'id'
                    ? '“Pengalaman memimpin ribuan orang di masa krisis adalah kawah candradimuka yang menumbuhkan ketahanan mental, kepekaan birokrasi, dan empati sosial yang mendalam.”'
                    : locale === 'en'
                    ? '“Mobilizing thousands under crisis conditions is the ultimate crucible—forging mental endurance, institutional finesse, and deep societal empathy.”'
                    : '“危局之中统帅千人安危，是淬炼大局统筹心智、沉稳应对庞杂官僚协调，以及树立对社会最深切敬畏与责任感的黄金炉火。”'}
                </p>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-hairline/60 flex items-center justify-between text-xs text-softGray">
              <span className="font-mono text-[11px]">BEM Universitas Bhayangkara</span>
              <span className="text-gold font-medium">Verified Historical Impact</span>
            </div>
          </div>

          {/* Pillar 2: Youth Mentorship & Advisory */}
          <div className="p-8 sm:p-9 rounded-2xl bg-charcoal/80 backdrop-blur-xl border border-hairline hover:border-gold/40 transition-colors relative flex flex-col justify-between shadow-luxury-card">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-sans font-bold uppercase tracking-wider text-ivory">
                  <GraduationCap size={13} className="text-gold" />
                  <span>
                    {locale === 'id' ? 'Pembinaan Generasi Muda' : locale === 'en' ? 'Youth Mentorship & Advisory' : '青年成长领路扶持'}
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400">Aktif & Berkelanjutan</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-ivory">
                {locale === 'id'
                  ? 'Mentorship Komunikasi Publik & Kepemimpinan Lapangan'
                  : locale === 'en'
                  ? 'Mentoring in Executive Communication & Operational Grit'
                  : '青年骨干实操赋能：高管公关沟通与基层铁军韧性'}
              </h3>

              <p className="text-sm font-sans text-softGray leading-relaxed">
                {locale === 'id'
                  ? 'Zefanya secara aktif mendedikasikan waktu di luar tugas korporat untuk memberikan bimbingan bagi mahasiswa dan profesional muda, membagikan wawasan mengenai diplomasi komunikasi publik (berlisensi BNSP), etika kepemimpinan organisasi, serta mentalitas bertahan di industri lapangan yang keras.'
                  : locale === 'en'
                  ? 'Beyond corporate duties, Zefanya dedicates time to mentor rising university graduates and young professionals, imparting practical insights in certified executive public relations, organizational ethics, and field resilience.'
                  : '在企业繁忙工作之余，Zefanya坚持为青年大学生及初入职场的骨干提供指导交流，倾囊传授国家认证公关素养、复杂人际组织协调及如何在艰苦工地中磨炼不折意志的实操经验。'}
              </p>

              <div className="space-y-2">
                {[
                  {
                    id: 'Public Relations Officer (BNSP): Teknik diplomasi dan resolusi konflik',
                    en: 'BNSP Certified Public Relations: Diplomacy and dispute resolution frameworks',
                    zh: '印尼国家认证公关高管：政企公关沟通与摩擦化解艺术',
                  },
                  {
                    id: 'Integrity in Leadership: Membangun budaya organisasi tanpa kompromi moral',
                    en: 'Integrity in Leadership: Cultivating moral clarity within organizational governance',
                    zh: '治企立德：坚守毫无妥协余地的清正操守与组织公信力',
                  },
                  {
                    id: 'Supply Chain Literacy: Pemahaman industri riil bagi generasi muda',
                    en: 'Supply Chain Literacy: Demystifying real-world heavy industrial operations',
                    zh: '实业认知启蒙：打破象牙塔，让青年尽早理解重工业与国家大动脉',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-softGray font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                    <span>{item[locale] || item.id}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-hairline/60">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsWhatsAppModalOpen(true);
                }}
                className="w-full py-3 rounded-full bg-charcoal hover:bg-gold hover:text-obsidian text-gold border border-gold/40 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <MessageCircle size={14} />
                <span>
                  {locale === 'id'
                    ? 'Undang Zefanya untuk Sesi Diskusi / Kuliah Tamu'
                    : locale === 'en'
                    ? 'Invite Zefanya for Academic / Youth Keynote'
                    : '邀请 Zefanya 开展学术专场/青年座谈'}
                </span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
