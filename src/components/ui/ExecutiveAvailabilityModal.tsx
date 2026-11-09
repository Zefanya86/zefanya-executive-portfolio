'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  X,
  Compass,
  CheckCircle2,
  MapPin,
  Briefcase,
  Layers,
  ShieldCheck,
  Send,
  MessageCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { sound } from '@/lib/sound';

export default function ExecutiveAvailabilityModal() {
  const {
    isAvailabilityModalOpen,
    setIsAvailabilityModalOpen,
    setIsWhatsAppModalOpen,
    locale,
  } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAvailabilityModalOpen) {
        setIsAvailabilityModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAvailabilityModalOpen, setIsAvailabilityModalOpen]);

  if (!isAvailabilityModalOpen) return null;

  const content = {
    badge: {
      id: 'STATUS RADAR EKSEKUTIF REAL-TIME',
      en: 'REAL-TIME EXECUTIVE RADAR STATUS',
      zh: '高管实时履职就位雷达状态',
    },
    title: {
      id: 'Ketersediaan Karier & Kemitraan Strategis',
      en: 'Executive Availability & Strategic Engagements',
      zh: '高层履新意向与战略联合体就位',
    },
    statusText: {
      id: '🟢 Terbuka untuk Diskusi Kepemimpinan Operasional & Kemitraan Proyek Baru',
      en: '🟢 Actively Available for Operational Leadership & New Project Partnerships',
      zh: '🟢 现正式开放探讨重大工程运营领导、采购总控及新项目战略联合体'
    },
    sections: [
      {
        icon: Briefcase,
        title: {
          id: 'Peran & Tanggung Jawab Sasaran',
          en: 'Target Roles & Leadership Scope',
          zh: '意向履职岗位与高管职责',
        },
        items: [
          {
            role: 'Head of Logistics & Procurement',
            desc: {
              id: 'Kepala divisi logistik, pengadaan material berat, manajemen rantai pasok maritim & darat.',
              en: 'Division head for heavy procurement, cross-island maritime and land logistics supply chains.',
              zh: '大宗工程材料集中采购总监、跨海海运与陆地重载供应链总控负责人。',
            },
          },
          {
            role: 'General Manager / Operations Director',
            desc: {
              id: 'Manajemen operasional korporat, monitoring KPI, tata kelola armada, dan HSE Zero-Incident.',
              en: 'Corporate operations, rigorous KPI telemetry, heavy fleet governance, and Zero-Incident HSE.',
              zh: '公司全面日常运营管理、量化KPI考核监控、大型车队规范治理与零事故生产防线。',
            },
          },
          {
            role: 'Consortium (KSO) Project Steering Lead',
            desc: {
              id: 'Kepemimpinan koordinasi kemitraan KSO (BUMN – Swasta), kepatuhan kontrak, dan mitigasi risiko.',
              en: 'KSO consortium leadership (State-Owned & Private), contract compliance, and risk mitigation.',
              zh: '联合体（KSO）工程协调总牵头人（国企—民营共建）、履约合规及现场多方风险联控。',
            },
          },
        ],
      },
      {
        icon: MapPin,
        title: {
          id: 'Radar Geografis & Mobilitas Penugasan',
          en: 'Geographic Radar & Deployment Mobility',
          zh: '地理就位坐标与全域机动就职能力',
        },
        items: [
          {
            role: 'DKI Jakarta & Jabodetabek',
            desc: {
              id: 'Kantor Pusat Korporat (HQ), kemitraan strategis, negosiasi konsorsium, dan tata kelola pengadaan.',
              en: 'Corporate HQ, strategic joint venture structuring, high-stakes vendor negotiations.',
              zh: '企业总部战略中枢、高层商务谈判、大宗采购战略签约。',
            },
          },
          {
            role: 'Proyek Strategis Nasional (Lintas Pulau)',
            desc: {
              id: '100% Siap penugasan on-site ke proyek infrastruktur jembatan/maritim & pertambangan (Kalimantan, Sumatera, Jawa).',
              en: '100% Ready for on-site national deployment across marine bridge/infrastructure & mining corridors.',
              zh: '100% 具备奔赴国家重点大型跨海桥梁、特种基建及矿区现场全职驻扎能力（加里曼丹、苏门答腊、爪哇）。',
            },
          },
        ],
      },
    ],
    fastMetrics: [
      {
        label: { id: 'Mobilitas Nasional', en: 'National Mobility', zh: '全国就位就任' },
        value: '100% Ready',
      },
      {
        label: { id: 'Rekam K3/HSE', en: 'Safety Record', zh: '安全生产记录' },
        value: 'Zero Fatalities',
      },
      {
        label: { id: 'Siklus Pasokan', en: 'Pours Continuity', zh: '混凝土浇筑保障' },
        value: '100% On-Time',
      },
    ],
    ctaWhatsApp: {
      id: 'Hubungi via WhatsApp VIP',
      en: 'Connect via WhatsApp VIP',
      zh: '直通贵宾微信/WhatsApp',
    },
    ctaEmail: {
      id: 'Kirim Agenda Penawaran Resmi',
      en: 'Send Formal Executive Inquiry',
      zh: '发送正式高管合作要约',
    },
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
    >
      {/* Backdrop */}
      <div
        onClick={() => {
          sound.playClick();
          setIsAvailabilityModalOpen(false);
        }}
        className="fixed inset-0 bg-obsidian/85 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-charcoal border border-gold/40 rounded-2xl shadow-luxury-elevated overflow-hidden z-10 my-auto text-ivory">
        {/* Top Gold Ambient Glow Bar */}
        <div className="h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />

        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-hairline/60 bg-obsidian/60 relative">
          <button
            onClick={() => {
              sound.playClick();
              setIsAvailabilityModalOpen(false);
            }}
            className="absolute top-5 right-5 p-2 rounded-full text-softGray hover:text-gold hover:bg-white/5 transition-colors"
            title="Tutup / Close (Esc)"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold">
              {content.badge[locale] || content.badge.id}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-ivory">
            {content.title[locale] || content.title.id}
          </h3>

          <div className="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-sans flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{content.statusText[locale] || content.statusText.id}</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[68vh] overflow-y-auto">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-obsidian/80 border border-gold/20 text-center">
            {content.fastMetrics.map((metric, i) => (
              <div key={i} className="space-y-0.5">
                <span className="text-xs sm:text-sm font-serif font-bold text-gold block">
                  {metric.value}
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans text-softGray block">
                  {metric.label[locale] || metric.label.id}
                </span>
              </div>
            ))}
          </div>

          {/* Sections List */}
          {content.sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2 text-gold">
                  <Icon className="w-4 h-4" />
                  <h4 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-ivory">
                    {sec.title[locale] || sec.title.id}
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {sec.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-3.5 rounded-xl bg-obsidian/50 border border-hairline/80 hover:border-gold/40 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span className="text-xs sm:text-sm font-serif font-bold text-ivory">
                          {item.role}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs font-sans text-softGray mt-1 pl-5.5 leading-relaxed">
                        {item.desc[locale] || item.desc.id}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-hairline/60 bg-obsidian/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playClick();
              setIsAvailabilityModalOpen(false);
              setIsWhatsAppModalOpen(true);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-gold-subtle"
          >
            <MessageCircle size={14} />
            <span>{content.ctaWhatsApp[locale] || content.ctaWhatsApp.id}</span>
          </button>

          <a
            href="#contact"
            onClick={() => {
              sound.playClick();
              setIsAvailabilityModalOpen(false);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-charcoal hover:bg-obsidian border border-hairline hover:border-gold/40 text-ivory font-sans text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Send size={13} className="text-gold" />
            <span>{content.ctaEmail[locale] || content.ctaEmail.id}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
