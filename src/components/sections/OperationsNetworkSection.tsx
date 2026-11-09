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
      <div className="w-full h-[400px] rounded-2xl bg-white/5 border border-hairline dark:border-white/10 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-cobalt border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-mutedGray">Memuat 3D Operations Grid...</span>
      </div>
    ),
  }
);

export default function OperationsNetworkSection() {
  const { locale } = usePortfolio();

  return (
    <section id="operations-grid" className="relative py-24 bg-white dark:bg-ink border-t border-hairline dark:border-hairline-dark overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cobalt/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Clean Hierarchy */}
        <div className="max-w-4xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-hairline dark:border-white/10 text-[10px] sm:text-xs font-mono text-cobalt dark:text-limeAccent tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-limeAccent animate-pulse" />
            <span>[03 // 3D TACTICAL OPERATIONS & SATELLITE GRID]</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink dark:text-ivory leading-tight font-display">
            {locale === 'id'
              ? 'Jaringan Operasi, Logistik & Pengadaan Strategis'
              : 'Integrated Operations, Logistics & Supply Chain Grid'}
          </h2>

          <p className="text-base sm:text-lg text-mutedGray dark:text-gray-300 font-normal leading-relaxed">
            {locale === 'id'
              ? 'Pemetaan geospasial 3D berbasis koordinat satelit yang merepresentasikan 3 pusat komando operasional nyata Zefanya Zulian: Manajemen Korporat Bekasi HQ, Operasional Transportasi Mineral Bayah di Banten, dan Pengadaan Material Proyek Jembatan Maritim di Kalimantan.'
              : 'Interactive 3D geospatial network mapping Zefanya Zulian\'s actual operations: Bekasi Corporate HQ, Bayah Mineral Flow Logistics in Banten, and Maritime Bridge Material Procurement in Kalimantan.'}
          </p>

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory dark:bg-black/60 border border-hairline dark:border-white/10 text-xs font-mono text-graphite dark:text-gray-300">
              <Globe className="w-3.5 h-3.5 text-limeAccent" />
              <span>Google Earth Satellite Mode</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory dark:bg-black/60 border border-hairline dark:border-white/10 text-xs font-mono text-graphite dark:text-gray-300">
              <Cpu className="w-3.5 h-3.5 text-cobalt" />
              <span>Tactical Supply-Chain Arcs</span>
            </div>
            <a
              href="https://earth.google.com/web/@-5.5000,111.0000,1000a,2500000d,35y,0h,20t,0r"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cobalt/10 border border-cobalt/30 hover:bg-cobalt/20 text-xs font-mono text-cobalt dark:text-limeAccent transition"
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
