'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { usePortfolio } from '@/context/PortfolioContext';
import { Globe, MapPin, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

// Defer Three.js client rendering so initial page loads instantaneously (<50ms)
const OperationsNetwork3D = dynamic(
  () => import('@/components/3d/OperationsNetwork3D'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-crimson border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-platinum-muted">Memuat 3D Operations Grid...</span>
      </div>
    ),
  }
);

export default function OperationsNetworkSection() {
  const { locale } = usePortfolio();

  return (
    <section id="operations-grid" className="relative py-20 bg-obsidian border-t border-platinum/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Crystal-Clear Purpose */}
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson tracking-widest uppercase">
            <span className="w-6 h-px bg-crimson" />
            <span>03 // {locale === 'id' ? 'VISUALISASI 3D OPERASIONAL & CITRA SATELIT' : '3D OPERATIONAL INFRASTRUCTURE & SATELLITE GRID'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-warmWhite">
            {locale === 'id'
              ? 'Jaringan Operasi, Logistik & Pengadaan Strategis'
              : 'Integrated Operations, Logistics & Supply Chain Grid'}
          </h2>

          <p className="text-base sm:text-lg text-platinum-muted font-normal pt-1">
            {locale === 'id'
              ? 'Eksplorasi bola dunia 3D berbasis citra satelit Google Earth yang memetakan 3 pusat komando operasional nyata Zefanya Zulian: Manajemen Korporat Bekasi HQ, Operasional Transportasi Mineral Bayah di Banten, dan Pengadaan Material Proyek Jembatan Maritim di Kalimantan — lengkap dengan tautan inspeksi langsung ke Google Earth 3D (earth.google.com).'
              : 'Interactive Google Earth 3D satellite globe mapping Zefanya Zulian\'s actual operations: Bekasi Corporate HQ, Bayah Mineral Flow Logistics in Banten, and Maritime Bridge Material Procurement in Kalimantan — with direct inspection deep-links to Google Earth 3D (earth.google.com).'}
          </p>

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-graphite-surface border border-platinum/15 text-xs font-mono text-platinum">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Earth Satellite Mode</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-graphite-surface border border-platinum/15 text-xs font-mono text-platinum">
              <Cpu className="w-3.5 h-3.5 text-crimson" />
              <span>Tactical Supply-Chain Arcs</span>
            </div>
            <a
              href="https://earth.google.com/web/@-5.5000,111.0000,1000a,2500000d,35y,0h,20t,0r"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/30 hover:bg-crimson/20 text-xs font-mono text-crimson-light transition"
            >
              <span>Explore on earth.google.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 3D Operations Interactive Network Hub */}
        <OperationsNetwork3D />
      </div>
    </section>
  );
}
