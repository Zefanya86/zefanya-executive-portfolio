'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  MessageSquare,
  X,
  ExternalLink,
  Briefcase,
  Building2,
  Handshake,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { sound } from '@/lib/sound';

export default function WhatsAppVipWidget() {
  const { data, locale, isWhatsAppModalOpen, setIsWhatsAppModalOpen } = usePortfolio();
  const [selectedTopic, setSelectedTopic] = useState<number>(0);
  const [senderName, setSenderName] = useState('');
  const [customNote, setCustomNote] = useState('');

  const waNumber = data.contact?.whatsappNumber || data.contact?.whatsapp || '6289681852453';

  const topics = [
    {
      id: 'infrastructure',
      icon: Building2,
      label: {
        id: 'Proyek Infrastruktur & Logistik Maritim',
        en: 'Infrastructure & Maritime Logistics Project',
        zh: '国家基础设施与海事物流项目协同'
      },
      desc: {
        id: 'Diskusi pasokan material beton, baja, barging selat, & supply chain.',
        en: 'Inquiry for marine concrete, structural steel & inter-island barging.',
        zh: '咨询海洋防腐建材采购与跨海驳船大宗联运合作。'
      },
      template: (name: string, custom: string) =>
        `Halo Pak Zefanya Zulian, saya ${name ? name : '[Nama Saya/Perusahaan]'}. Saya melihat portofolio kepemimpinan operasional Anda (terutama proyek Jembatan Kalimantan-Laut Island) dan ingin mendiskusikan peluang proyek infrastruktur / logistik operasional.${custom ? ' Catatan: ' + custom : ''}`
    },
    {
      id: 'career',
      icon: Briefcase,
      label: {
        id: 'Executive Leadership & Headhunting',
        en: 'Executive Leadership & Recruitment',
        zh: '高管猎聘与运营高层任职洽谈'
      },
      desc: {
        id: 'Peluang posisi Operations Manager, Head of Logistics, atau General Manager.',
        en: 'Exploration for Operations Manager, Head of Logistics, or GM roles.',
        zh: '沟通运营总监、大宗物资供应负责人或总经理高级职位。'
      },
      template: (name: string, custom: string) =>
        `Halo Pak Zefanya Zulian, saya ${name ? name : '[Nama Saya]'} dari [Perusahaan/Institusi]. Saya tertarik dengan rekam jejak eksekutif Anda dan ingin menjadwalkan diskusi perihal posisi kepemimpinan operasional.${custom ? ' Catatan: ' + custom : ''}`
    },
    {
      id: 'procurement',
      icon: Handshake,
      label: {
        id: 'Kemitraan Bisnis & Tata Kelola Vendor',
        en: 'Strategic Business & Vendor Partnership',
        zh: '商业拓展与大宗供应商战略合作'
      },
      desc: {
        id: 'Kolaborasi rantai pasok, efisiensi anggaran, & kemitraan korporat.',
        en: 'Procurement partnerships, cost governance & corporate alliance.',
        zh: '探讨大宗物资采购渠道共建、预算精细化管控与战略同盟。'
      },
      template: (name: string, custom: string) =>
        `Halo Pak Zefanya Zulian, saya ${name ? name : '[Nama Saya]'} ingin menjalin komunikasi profesional mengenai peluang sinergi pengadaan barang dan kemitraan bisnis strategis.${custom ? ' Catatan: ' + custom : ''}`
    }
  ];

  const handleSend = () => {
    sound.playClick();
    const activeTemplate = topics[selectedTopic].template(senderName, customNote);
    const encoded = encodeURIComponent(activeTemplate);
    const url = `https://wa.me/${waNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsWhatsAppModalOpen(false);
  };

  return (
    <>
      {/* Floating Luxury VIP WhatsApp Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center">
        <button
          onClick={() => {
            sound.playClick();
            setIsWhatsAppModalOpen(!isWhatsAppModalOpen);
          }}
          aria-label="Buka WhatsApp VIP Eksekutif"
          className="group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-charcoal/95 hover:bg-obsidian backdrop-blur-xl border border-gold/50 hover:border-gold text-ivory shadow-[0_8px_30px_rgba(0,0,0,0.65)] hover:shadow-[0_0_25px_rgba(197,164,119,0.35)] transition-all duration-300 hover:scale-103 active:scale-97"
        >
          {/* Glowing Green Pulse Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>

          <div className="p-1 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30">
            <MessageSquare size={14} className="fill-current" />
          </div>

          <div className="text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold block leading-none font-bold">
              VIP FAST-TRACK
            </span>
            <span className="text-xs font-serif font-bold text-ivory block leading-tight mt-0.5 group-hover:text-gold transition-colors">
              Chat WhatsApp
            </span>
          </div>
        </button>
      </div>

      {/* Luxury WhatsApp VIP Dialog Modal */}
      {isWhatsAppModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/90 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setIsWhatsAppModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-charcoal border border-gold/50 rounded-2xl p-6 sm:p-8 shadow-luxury-elevated space-y-6 text-ivory overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-hairline pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    DIRECT CHANNEL
                  </span>
                  <span className="text-xs font-mono text-softGray">
                    (+62) 896 8185 2453
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-ivory">
                  Executive VIP WhatsApp Sync
                </h3>
                <p className="text-xs text-softGray font-sans">
                  Pilih topik diskusi eksekutif untuk menghubungkan Anda langsung dengan Zefanya Zulian.
                </p>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsWhatsAppModalOpen(false);
                }}
                className="p-1.5 rounded-full text-softGray hover:text-ivory hover:bg-white/10 transition-colors"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            {/* Topic Selectors */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono text-gold uppercase tracking-wider font-bold block">
                1. PILIH TOPIK DISKUSI BISNIS / KARIER:
              </span>

              <div className="space-y-2">
                {topics.map((t, idx) => {
                  const Icon = t.icon;
                  const isSelected = selectedTopic === idx;

                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedTopic(idx);
                      }}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 flex items-start gap-3 ${
                        isSelected
                          ? 'bg-gold/15 border-gold shadow-[0_0_15px_rgba(197,164,119,0.15)] text-ivory'
                          : 'bg-obsidian border-hairline hover:border-gold/40 text-softGray'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          isSelected ? 'bg-gold text-obsidian font-bold' : 'bg-charcoal text-gold'
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="space-y-0.5">
                        <span className={`text-xs font-serif font-bold block ${isSelected ? 'text-gold' : 'text-ivory'}`}>
                          {t.label[locale] || t.label.id}
                        </span>
                        <span className="text-[11px] font-sans text-softGray block leading-relaxed">
                          {t.desc[locale] || t.desc.id}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs: Sender Name & Custom Note */}
            <div className="space-y-3 pt-1">
              <span className="text-[10px] font-mono text-gold uppercase tracking-wider font-bold block">
                2. INFORMASI ANDA (OPSIONAL):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nama & Perusahaan Anda..."
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory placeholder:text-softGray/50 focus:border-gold outline-none"
                />
                <input
                  type="text"
                  placeholder="Catatan singkat / agenda..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory placeholder:text-softGray/50 focus:border-gold outline-none"
                />
              </div>
            </div>

            {/* Preview Box */}
            <div className="p-3.5 rounded-xl bg-obsidian/90 border border-hairline space-y-1.5">
              <span className="text-[10px] font-mono text-softGray block">
                DRAF PESAN OTOMATIS:
              </span>
              <p className="text-xs font-sans text-ivory/90 italic leading-relaxed line-clamp-3">
                "{topics[selectedTopic].template(senderName, customNote)}"
              </p>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSend}
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-obsidian font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Buka WhatsApp Sekarang</span>
                <ExternalLink size={14} className="stroke-[2.5]" />
              </button>
              <p className="text-[10px] text-center text-softGray font-sans mt-2">
                Pesan akan langsung terbuka di aplikasi WhatsApp resmi Anda tanpa perantara.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
