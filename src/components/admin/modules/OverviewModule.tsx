'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortfolioData } from '@/types/portfolio';
import {
  LayoutDashboard,
  Briefcase,
  FolderGit2,
  Camera,
  BookOpen,
  FileText,
  Mail,
  Layers,
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Download,
  Database,
  Globe,
  Sparkles,
} from 'lucide-react';

interface OverviewModuleProps {
  data: PortfolioData;
  inquiriesCount: number;
  onNavigate: (tabId: string) => void;
  onPublish: () => void;
  isSaving: boolean;
}

export default function OverviewModule({
  data,
  inquiriesCount,
  onNavigate,
  onPublish,
  isSaving,
}: OverviewModuleProps) {
  const statCards = [
    {
      label: 'Pengalaman Eksekutif',
      count: data.experiences.length,
      icon: Briefcase,
      tab: '05_experience',
      desc: 'PT Aba Mandiri, Mahaputra Baruna, Asri-Praya',
    },
    {
      label: 'Studi Kasus Proyek',
      count: data.projects?.length || 0,
      icon: FolderGit2,
      tab: '06_projects',
      desc: 'Analisis 10-Bagian Operasional & Logistik',
    },
    {
      label: 'Galeri Aktivitas',
      count: data.gallery?.length || 0,
      icon: Camera,
      tab: '07_gallery',
      desc: 'Album Lapangan, Infrastruktur & Kepemimpinan',
    },
    {
      label: 'Jurnal & Opini',
      count: data.journal?.length || 0,
      icon: BookOpen,
      tab: '11_journal',
      desc: 'Artikel Strategis & Pemikiran Operasional',
    },
    {
      label: 'Dokumen & CV Resmi',
      count: data.documents?.length || 0,
      icon: FileText,
      tab: '12_downloads',
      desc: 'Berkas PDF Bahasa Indonesia, English, Mandarin',
    },
    {
      label: 'Kompetensi Terverifikasi',
      count: data.competencies.length,
      icon: Layers,
      tab: '08_skills',
      desc: 'Operations, Procurement, Logistics & Strategy',
    },
    {
      label: 'Pesan & Inquiries',
      count: inquiriesCount,
      icon: Mail,
      tab: '15_inquiries',
      desc: 'Pesan Masuk Melalui Formulir Kemitraan',
      alert: inquiriesCount > 0,
    },
    {
      label: 'Sertifikasi Profesi',
      count: data.certifications.length,
      icon: ShieldCheck,
      tab: '10_certificates',
      desc: 'LSP Ubhara, TOEFL 533, BNSP, Microsoft',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Statement */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <LayoutDashboard size={14} />
            <span>01. Dashboard Ringkasan & Status Eksekutif</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Executive Command Center
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Status penerbitan konten, sinkronisasi basis data, berkas resmi, dan keterlibatan profesional Zefanya Zulian.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-obsidian text-xs font-sans font-bold transition-all flex items-center gap-1.5"
          >
            <ExternalLink size={13} />
            <span>Kunjungi Website Live</span>
          </Link>
          <button
            onClick={onPublish}
            disabled={isSaving}
            className="px-4 py-2 rounded-full bg-gold hover:bg-ivory text-obsidian text-xs font-sans font-bold transition-all shadow-luxury"
          >
            {isSaving ? 'Menyimpan...' : 'Sinkronisasi Data'}
          </button>
        </div>
      </div>

      {/* Hero Profile Status Banner */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline shadow-luxury-card flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-24 h-32 rounded-2xl overflow-hidden border border-gold/50 shrink-0 bg-obsidian shadow-luxury">
          <Image
            src={data.hero.portraitUrl || '/zefanya-portrait.jpg'}
            alt={data.profile.fullName}
            fill
            sizes="96px"
            className="object-cover object-top filter contrast-105"
          />
        </div>

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-lg font-serif font-bold text-ivory">
              {data.profile.fullName}, S.Ikom
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-sans font-bold">
              THE MODERN BUSINESS LEADER
            </span>
          </div>

          <p className="text-xs text-gold font-sans font-semibold">
            {data.profile.professionalTitle.id}
          </p>

          <p className="text-xs text-softGray font-sans line-clamp-2 max-w-2xl leading-relaxed">
            {data.profile.shortBio.id}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px] text-softGray font-sans">
            <span className="flex items-center gap-1 text-ivory">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Domisili: {data.profile.location.id}</span>
            </span>
            <span>•</span>
            <span>Email: <strong className="text-ivory">{data.profile.email}</strong></span>
            <span>•</span>
            <span>WA: <strong className="text-ivory">{data.profile.whatsappNumber}</strong></span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-2">
          <button
            onClick={() => onNavigate('02_profile')}
            className="px-4 py-2 rounded-xl bg-obsidian border border-hairline hover:border-gold text-xs font-sans text-ivory hover:text-gold transition-colors text-center"
          >
            Edit Profil
          </button>
          <a
            href={data.cv.cvPdfUrl || '/CV_Zefanya_Zulian.pdf'}
            download
            className="px-4 py-2 rounded-xl bg-charcoal border border-hairline hover:border-gold text-xs font-sans text-softGray hover:text-ivory transition-colors flex items-center justify-center gap-1.5"
          >
            <Download size={12} className="text-gold" />
            <span>Unduh CV PDF</span>
          </a>
        </div>
      </div>

      {/* Core Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(card.tab)}
              className="p-5 rounded-2xl bg-charcoal border border-hairline hover:border-gold/50 transition-all cursor-pointer group shadow-luxury-card flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-obsidian border border-hairline flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                  <Icon size={18} />
                </div>
                <span className="text-2xl font-serif font-bold text-ivory group-hover:text-gold transition-colors">
                  {card.count}
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="text-xs font-sans font-bold text-ivory group-hover:text-gold transition-colors">
                  {card.label}
                </h3>
                <p className="text-[11px] text-softGray font-sans line-clamp-1">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture & Diagnostic Badges */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-4">
        <h3 className="text-xs font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-2">
          <Database size={14} />
          <span>Infrastruktur & Integritas Data Sistem</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-obsidian border border-hairline space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-softGray">Penyimpanan Dual-Layer</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                AKTIF
              </span>
            </div>
            <p className="text-ivory font-semibold text-[11px]">
              Local JSON Persistence + Supabase Cloud Sync
            </p>
            <p className="text-[10px] text-softGray">
              Otomatis sinkron ke berkas lokal jika Supabase tidak terhubung.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-obsidian border border-hairline space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-softGray">Dukungan 3 Bahasa</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                100% LENGKAP
              </span>
            </div>
            <p className="text-ivory font-semibold text-[11px]">
              Bahasa Indonesia (Default) • English • 中文 (简体)
            </p>
            <p className="text-[10px] text-softGray">
              Dukungan Noto Sans SC untuk tipografi Mandarin elegan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-obsidian border border-hairline space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-softGray">Integritas Riwayat Karir</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                VERIFIED
              </span>
            </div>
            <p className="text-ivory font-semibold text-[11px]">
              100% Sesuai CV Resmi Zefanya Zulian
            </p>
            <p className="text-[10px] text-softGray">
              Tidak ada data fiktif, angka palsu, atau klaim tidak berdasar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
