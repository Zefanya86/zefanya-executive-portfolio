'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Building,
  Truck,
  Award,
  Users2,
  Briefcase,
  CheckCircle2,
  Compass,
  Zap,
  Phone,
  Flame,
  Layers,
} from 'lucide-react';
import { sound } from '@/lib/sound';

export default function ExecutivePresentationMode() {
  const { data, locale, t, tList, isPresentationOpen, setIsPresentationOpen } = usePortfolio();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = 6;

  const nextSlide = useCallback(() => {
    sound.playClick();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    sound.playClick();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isPresentationOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        sound.playClick();
        setIsPresentationOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isPresentationOpen, nextSlide, prevSlide, setIsPresentationOpen]);

  if (!isPresentationOpen) return null;

  const toggleFullscreen = () => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Executive Keynote Presentation Mode"
      className="fixed inset-0 z-50 bg-obsidian text-ivory flex flex-col justify-between overflow-hidden select-none animate-fadeIn"
    >
      {/* Background Subtle Luxury Ambience */}
      <div className="absolute inset-0 bg-luxury-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header Telemetry Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-hairline/60 bg-obsidian/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full border border-gold/60 bg-gold/15 flex items-center justify-center font-serif text-gold text-xs font-bold">
            ZZ
          </span>
          <div>
            <span className="text-xs font-serif font-bold tracking-wider text-ivory block">
              ZEFANYA ZULIAN
            </span>
            <span className="text-[10px] font-sans text-gold font-semibold tracking-widest uppercase">
              EXECUTIVE KEYNOTE PRESENTATION
            </span>
          </div>
        </div>

        {/* Slide Progress Dots */}
        <div className="hidden sm:flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setCurrentSlide(idx);
              }}
              title={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-gold shadow-[0_0_8px_rgba(197,164,119,0.5)]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono text-softGray px-3 py-1 rounded-full bg-charcoal border border-hairline">
            SLIDE 0{currentSlide + 1} / 0{totalSlides}
          </span>

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Keluar Fullscreen' : 'Layar Penuh'}
            className="p-2 rounded-full bg-charcoal border border-hairline text-softGray hover:text-ivory hover:border-gold transition-colors"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsPresentationOpen(false);
            }}
            aria-label="Tutup Mode Presentasi"
            className="p-2 rounded-full bg-gold text-obsidian hover:bg-gold-light font-bold transition-all flex items-center gap-1.5"
          >
            <X size={15} />
            <span className="text-[11px] font-sans font-bold uppercase hidden sm:inline">Tutup [ESC]</span>
          </button>
        </div>
      </header>

      {/* Main Slide Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-12 max-w-6xl mx-auto w-full">
        {/* SLIDE 01: TITLE & POSITIONING */}
        {currentSlide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full animate-fadeIn">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span>THE MODERN BUSINESS LEADER</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
                Zefanya Zulian
              </h1>

              <p className="text-lg sm:text-2xl font-serif text-gold italic font-normal leading-relaxed">
                "Membangun Nilai Melalui Strategi, Operasional, dan Kepemimpinan."
              </p>

              <p className="text-sm sm:text-base text-softGray font-sans leading-relaxed max-w-xl">
                Profesional terverifikasi di bidang Operations Management, Procurement Strategy, dan Supply Chain Logistics dengan rekam jejak pada proyek infrastruktur maritim antar-pulau dan armada transportasi mineral.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="px-3.5 py-1.5 rounded-full bg-obsidian border border-hairline text-xs font-sans text-ivory flex items-center gap-2">
                  <ShieldCheck size={14} className="text-gold" />
                  <span>S.Ikom (IPK 3.25) · Ubhara Jaya</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-obsidian border border-hairline text-xs font-sans text-ivory flex items-center gap-2">
                  <Award size={14} className="text-gold" />
                  <span>Certified PR Officer (LSP/BNSP)</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-obsidian border border-hairline text-xs font-sans text-ivory flex items-center gap-2">
                  <Award size={14} className="text-gold" />
                  <span>TOEFL 533 (CEFR B2)</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-80 h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-gold/40 shadow-[0_0_40px_rgba(197,164,119,0.25)] bg-charcoal">
                <Image
                  src="/zefanya-portrait.jpg"
                  alt="Zefanya Zulian"
                  fill
                  sizes="400px"
                  className="object-cover filter contrast-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 02: FLAGSHIP WORK - PT. ASRI - PRAYA, KSO */}
        {currentSlide === 1 && (
          <div className="space-y-8 w-full animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-mono font-bold uppercase tracking-wider border border-gold/40 inline-flex items-center gap-1.5 mb-2">
                  <Flame size={13} className="text-gold" />
                  <span>FLAGSHIP OPERATIONAL RECORD</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ivory">
                  Bridge Construction Project: Kalimantan Island – Laut Island
                </h2>
                <p className="text-sm text-gold font-sans font-semibold mt-1">
                  PT. Asri – Praya, KSO · Head of Logistics (Material Procurement) · 2024 — 2025
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 bg-obsidian rounded-full border border-hairline text-softGray">
                LOCATION: KALIMANTAN, INDONESIA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-charcoal border border-hairline space-y-3">
                <span className="text-xs font-mono text-gold font-bold uppercase block">
                  01 // LINGKUP TANGGUNG JAWAB
                </span>
                <ul className="space-y-2 text-xs text-softGray font-sans leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-gold shrink-0 mt-0.5" />
                    <span>End-to-end procurement material konstruksi berat laut (marine concrete & structural steel).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-gold shrink-0 mt-0.5" />
                    <span>Koordinasi rantai pasok multi-modal via darat dan tongkang jalur perairan selat.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-charcoal border border-hairline space-y-3">
                <span className="text-xs font-mono text-gold font-bold uppercase block">
                  02 // TANTANGAN OPERASIONAL
                </span>
                <ul className="space-y-2 text-xs text-softGray font-sans leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Zap size={14} className="text-gold shrink-0 mt-0.5" />
                    <span>Lead-time logistik panjang antara produsen pulau utama ke pulau terluar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap size={14} className="text-gold shrink-0 mt-0.5" />
                    <span>Spesifikasi ketat beton dan baja anti-korosi standar kelautan maritim.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-charcoal border border-gold/40 shadow-luxury-card space-y-3">
                <span className="text-xs font-mono text-gold font-bold uppercase block">
                  03 // HASIL PENCAPAIAN TERVERIFIKASI
                </span>
                <div className="space-y-2 text-xs text-softGray font-sans leading-relaxed">
                  <p className="text-2xl font-serif font-bold text-ivory">100% On-Time</p>
                  <p>Ketersediaan material 100% terjaga tanpa delay pada jadwal pengecoran pilar jembatan kritis.</p>
                  <p className="text-gold font-semibold">Audit administrasi logistik lolos kepatuhan konsorsium BUMN/KSO.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 03: MINERAL HAULING - PT. MAHAPUTRA BARUNA LOGISTIK */}
        {currentSlide === 2 && (
          <div className="space-y-8 w-full animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-charcoal text-gold text-xs font-mono font-bold uppercase tracking-wider border border-hairline inline-flex items-center gap-1.5 mb-2">
                  <Truck size={13} className="text-gold" />
                  <span>HEAVY FLEET & MINERAL LOGISTICS</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ivory">
                  Bayah Mineral Flow Transport Project
                </h2>
                <p className="text-sm text-gold font-sans font-semibold mt-1">
                  PT. Mahaputra Baruna Logistik · Site Operations Manager · 2025
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 bg-obsidian rounded-full border border-hairline text-softGray">
                LOCATION: BAYAH, BANTEN
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-charcoal border border-hairline space-y-3">
                <span className="text-xs font-mono text-gold font-bold uppercase block">
                  01 // DAILY OPERATIONS & DISPATCH
                </span>
                <p className="text-xs text-softGray leading-relaxed font-sans">
                  Manajemen armada hauling harian, pembagian shift pengemudi, pemantauan kapasitas tonase jalan raya, serta penegakan protokol keselamatan (HSE).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-charcoal border border-hairline space-y-3">
                <span className="text-xs font-mono text-gold font-bold uppercase block">
                  02 // MITIGASI JALUR PESISIR
                </span>
                <p className="text-xs text-softGray leading-relaxed font-sans">
                  Menghadapi topografi berbukit pesisir Banten dan cuaca ekstrem melalui checklist inspeksi pra-keberangkatan serta radio dispatch titik transit real-time.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-charcoal border border-gold/40 shadow-luxury-card space-y-3">
                <span className="text-xs font-mono text-gold font-bold uppercase block">
                  03 // HASIL OPERASIONAL
                </span>
                <p className="text-2xl font-serif font-bold text-ivory">Zero Fatal Incidents</p>
                <p className="text-xs text-softGray leading-relaxed font-sans">
                  Kelancaran ribuan ritase transportasi mineral tanpa insiden fatal dan minimalisasi downtime unit armada secara signifikan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 04: CORPORATE OPERATIONS - PT. ABA MANDIRI SEJAHTERA */}
        {currentSlide === 3 && (
          <div className="space-y-8 w-full animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-charcoal text-softGray text-xs font-mono font-bold uppercase tracking-wider border border-hairline inline-flex items-center gap-1.5 mb-2">
                  <Building size={13} className="text-gold" />
                  <span>CORPORATE OPERATIONS & GOVERNANCE</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ivory">
                  Corporate Governance & Procurement Management
                </h2>
                <p className="text-sm text-gold font-sans font-semibold mt-1">
                  PT. Aba Mandiri Sejahtera · General Manager · 2025 — 2026
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 bg-obsidian rounded-full border border-hairline text-softGray">
                BEKASI, INDONESIA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-charcoal border border-hairline space-y-2">
                <span className="text-xs font-mono text-gold font-bold uppercase block">STRATEGI OPERASIONAL</span>
                <p className="text-xs text-softGray font-sans leading-relaxed">
                  Memimpin operasional perusahaan, standardisasi SOP divisi, pemantauan KPI tim, dan pelaporan berkala ke dewan direksi.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-charcoal border border-hairline space-y-2">
                <span className="text-xs font-mono text-gold font-bold uppercase block">VENDOR GOVERNANCE</span>
                <p className="text-xs text-softGray font-sans leading-relaxed">
                  Negosiasi kontrak vendor, pembentukan matriks skor performa rekanan, dan akurasi alokasi anggaran proyek komersial.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-charcoal border border-gold/40 space-y-2">
                <span className="text-xs font-mono text-gold font-bold uppercase block">EFISIENSI BIAYA</span>
                <p className="text-xs text-softGray font-sans leading-relaxed">
                  Peningkatan efisiensi perputaran logistik operasional dan penguatan tata kelola akuntansi proyek yang transparan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 05: CIVIC LEADERSHIP & BEM PRESIDENCY */}
        {currentSlide === 4 && (
          <div className="space-y-8 w-full animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-charcoal text-gold text-xs font-mono font-bold uppercase tracking-wider border border-hairline inline-flex items-center gap-1.5 mb-2">
                  <Users2 size={13} className="text-gold" />
                  <span>ORGANIZATIONAL & PUBLIC LEADERSHIP</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ivory">
                  Student Presidency & Civic Governance
                </h2>
                <p className="text-sm text-gold font-sans font-semibold mt-1">
                  BEM Universitas Bhayangkara Jakarta Raya & GEMA-RI Bekasi
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-charcoal border border-hairline space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gold font-bold uppercase">PRESIDEN MAHASISWA BEM UBJ</span>
                    <span className="text-xs font-mono text-softGray">2021 — 2022</span>
                  </div>
                  <p className="text-xs text-softGray font-sans leading-relaxed">
                    Memimpin Badan Eksekutif Mahasiswa tingkat universitas, advokasi kebijakan sivitas akademika, dan dialog institusional bersama pimpinan rektorat.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-charcoal border border-hairline space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gold font-bold uppercase">BRANCH LEADER GEMA-RI BEKASI</span>
                    <span className="text-xs font-mono text-softGray">2022 — 2024</span>
                  </div>
                  <p className="text-xs text-softGray font-sans leading-relaxed">
                    Memimpin kepengurusan cabang kota ormas kepemudaan Generasi Muda Republik Indonesia, penggerak inisiatif sosial dan kaderisasi.
                  </p>
                </div>
              </div>

              {/* Highlight Box: 1,100 Doses */}
              <div className="p-8 rounded-3xl bg-charcoal border border-gold/50 shadow-luxury-elevated space-y-4 text-center">
                <span className="px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-mono font-bold uppercase tracking-wider border border-gold/40">
                  NATIONAL CIVIC COLLABORATION
                </span>
                <h3 className="text-4xl sm:text-5xl font-serif font-bold text-gold">
                  1.100 DOSIS
                </h3>
                <p className="text-sm text-ivory font-serif font-semibold">
                  Program Vaksinasi Massal COVID-19 (2021)
                </p>
                <p className="text-xs text-softGray font-sans leading-relaxed max-w-sm mx-auto">
                  Sinergi kolaborasi resmi antara Kapolri dan BEM Universitas Bhayangkara Jakarta Raya yang tersalurkan sukses kepada masyarakat luas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 06: CORE EXPERTISE & EXECUTIVE CONTACT */}
        {currentSlide === 5 && (
          <div className="space-y-8 w-full animate-fadeIn text-center max-w-4xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-charcoal border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider">
              STRATEGIC EXECUTIVE SUMMARY
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
              Siap Menghadirkan Nilai Nyata pada Operasional Perusahaan Anda.
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left pt-4">
              <div className="p-4 rounded-xl bg-charcoal border border-hairline">
                <span className="text-xs font-serif font-bold text-gold block mb-1">OPERATIONS</span>
                <p className="text-[11px] text-softGray font-sans leading-relaxed">Standardisasi SOP, kontrol KPI, mitigasi risiko lapangan.</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal border border-hairline">
                <span className="text-xs font-serif font-bold text-gold block mb-1">PROCUREMENT</span>
                <p className="text-[11px] text-softGray font-sans leading-relaxed">Pengadaan material konstruksi skala mega & manajemen vendor.</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal border border-hairline">
                <span className="text-xs font-serif font-bold text-gold block mb-1">LOGISTICS</span>
                <p className="text-[11px] text-softGray font-sans leading-relaxed">Inter-island barging, armada hauling mineral & rute transit.</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal border border-hairline">
                <span className="text-xs font-serif font-bold text-gold block mb-1">LEADERSHIP</span>
                <p className="text-[11px] text-softGray font-sans leading-relaxed">Kepemimpinan tim lintas divisi, sinergi stakeholder & BUMN.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-hairline flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/6289681852453"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-6 py-3 rounded-full bg-[#25D366] text-obsidian text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#20ba5a] transition-all shadow-lg flex items-center gap-2"
              >
                <span>WhatsApp: (+62) 896 8185 2453</span>
              </a>

              <a
                href="mailto:Zefanya.zuliann@gmail.com"
                onClick={() => sound.playClick()}
                className="px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-obsidian text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-gold-subtle"
              >
                <span>Email: Zefanya.zuliann@gmail.com</span>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Footer Navigation Bar */}
      <footer className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-4 border-t border-hairline/60 bg-obsidian/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-softGray">
          <span className="hidden sm:inline">Navigasi: Gunakan tombol</span>
          <kbd className="px-1.5 py-0.5 rounded bg-charcoal border border-hairline text-gold text-[10px]">←</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-charcoal border border-hairline text-gold text-[10px]">→</kbd>
          <span className="hidden sm:inline">atau</span>
          <kbd className="px-2 py-0.5 rounded bg-charcoal border border-hairline text-gold text-[10px]">Spasi</kbd>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Slide Sebelumnya"
            className="px-4 py-2 rounded-full bg-charcoal border border-hairline hover:border-gold text-ivory text-xs font-sans font-semibold transition-all flex items-center gap-1.5 hover:scale-103"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <button
            onClick={nextSlide}
            aria-label="Slide Selanjutnya"
            className="px-5 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold transition-all flex items-center gap-1.5 hover:bg-gold-light hover:scale-103 shadow-gold-subtle"
          >
            <span>{currentSlide === totalSlides - 1 ? 'Mulai Lagi' : 'Selanjutnya'}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
