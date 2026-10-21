'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import OperationsNetwork3D from '@/components/3d/OperationsNetwork3D';
import { Network, Compass, ShieldCheck, MapPin } from 'lucide-react';

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
            <span>03 // {locale === 'id' ? 'VISUALISASI 3D OPERASIONAL' : '3D OPERATIONAL INFRASTRUCTURE GRID'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-warmWhite">
            {locale === 'id'
              ? 'Jaringan Operasi, Logistik & Pengadaan Strategis'
              : 'Integrated Operations, Logistics & Supply Chain Grid'}
          </h2>

          <p className="text-base sm:text-lg text-platinum-muted font-normal pt-1">
            {locale === 'id'
              ? 'Peta 3D interaktif yang menggambarkan 3 pusat komando operasional nyata Zefanya Zulian: Manajemen Korporat Bekasi HQ, Operasional Transportasi Mineral Bayah di Banten, dan Pengadaan Material Proyek Jembatan Maritim di Kalimantan.'
              : 'Interactive 3D model mapping Zefanya Zulian\'s actual operations: Bekasi Corporate HQ, Bayah Mineral Flow Logistics in Banten, and Maritime Bridge Material Procurement in Kalimantan.'}
          </p>
        </div>

        {/* 3D Operations Interactive Network Hub */}
        <OperationsNetwork3D />
      </div>
    </section>
  );
}
