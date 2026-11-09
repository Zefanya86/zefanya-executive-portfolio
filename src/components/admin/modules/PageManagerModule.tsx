'use client';

import React from 'react';
import Link from 'next/link';
import { FileSpreadsheet, ExternalLink, Globe, ShieldCheck } from 'lucide-react';

export default function PageManagerModule() {
  const routes = [
    {
      path: '/',
      name: 'Beranda Utama (Executive Landing)',
      desc: 'Hero Video, Credo, 4 Core Pillars, Rekam Jejak, Kompetensi & Formulir Kontak',
      status: 'Published',
      type: 'Dynamic ISR (60s)',
    },
    {
      path: '/about',
      name: 'Tentang Zefanya Zulian (Profile & Philosophy)',
      desc: 'Biografi komprehensif, filosofi kepemimpinan, dan riwayat akademik S.Ikom',
      status: 'Published',
      type: 'SSG + Client Context',
    },
    {
      path: '/experience',
      name: 'Direktori Pengalaman Kerja (Career History)',
      desc: 'Katalog terperinci PT Aba Mandiri, PT Mahaputra Baruna, dan PT Asri-Praya',
      status: 'Published',
      type: 'SSG + Dynamic Filters',
    },
    {
      path: '/projects',
      name: 'Studi Kasus Proyek (Project Case Studies)',
      desc: 'Analisis 10-bagian operasional, logistik, material procurement, dan KPI',
      status: 'Published',
      type: 'SSG + Dynamic Filters',
    },
    {
      path: '/gallery',
      name: 'Galeri Visual & Dokumentasi Lapangan',
      desc: 'Koleksi album foto aktivitas proyek, armada logistik, dan advokasi kepemudaan',
      status: 'Published',
      type: 'SSG + Media Lightbox',
    },
    {
      path: '/journal',
      name: 'Jurnal, Pemikiran & Opini Eksekutif',
      desc: 'Kumpulan artikel dan wawasan strategis di bidang operasional dan supply chain',
      status: 'Published',
      type: 'SSG + Markdown Reader',
    },
    {
      path: '/download',
      name: 'Pusat Unduhan Dokumen Resmi',
      desc: 'Akses berkas resmi CV PDF dalam 3 bahasa (ID, EN, ZH) dan ringkasan portofolio',
      status: 'Published',
      type: 'SSG + In-Browser PDF Modal',
    },
    {
      path: '/card',
      name: 'Kartu Nama Digital (Digital Business Card)',
      desc: 'vCard 3.0 interaktif, QR Code real-time, Web Share API, dan tautan komunikasi',
      status: 'Published',
      type: 'Client PWA Ready',
    },
    {
      path: '/contact',
      name: 'Inisiasi Kontak & Kemitraan Strategis',
      desc: 'Formulir validasi 5 kategori, saluran WA langsung, dan alamat email resmi',
      status: 'Published',
      type: 'Client Form + API Route',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-hairline pb-4">
        <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
          <FileSpreadsheet size={14} />
          <span>03. Manajemen Halaman & Rute Publik</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
          Public Pages & Routing Architecture
        </h2>
        <p className="text-xs text-softGray font-sans mt-1">
          Daftar seluruh halaman publik yang aktif, status rendering (SSG/ISR), dan akses langsung ke pratinjau live.
        </p>
      </div>

      <div className="space-y-3">
        {routes.map((route, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-charcoal border border-hairline hover:border-gold/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-gold px-2 py-0.5 rounded-md bg-obsidian border border-hairline">
                  {route.path}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  {route.status}
                </span>
                <span className="text-[10px] font-sans text-softGray">
                  {route.type}
                </span>
              </div>
              <h3 className="text-sm font-serif font-bold text-ivory">{route.name}</h3>
              <p className="text-xs text-softGray font-sans max-w-2xl">{route.desc}</p>
            </div>

            <Link
              href={route.path}
              target="_blank"
              className="px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 transition-all self-start sm:self-center shrink-0"
            >
              <span>Buka Halaman</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
