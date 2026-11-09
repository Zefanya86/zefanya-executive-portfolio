'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import MediaLightbox from '@/components/ui/MediaLightbox';
import CommandPalette from '@/components/ui/CommandPalette';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowLeft, CheckCircle2, Download, Mail, MapPin, GraduationCap, ShieldCheck, CreditCard } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function AboutPage() {
  const { data, locale, t, tList, setIsCvModalOpen } = usePortfolio();
  const portraitSrc = data.hero.portraitUrl || '/zefanya-portrait.jpg';
  const highlights = tList(data.profile.keyHighlights);

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory selection:bg-gold selection:text-obsidian transition-colors duration-300 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-softGray mb-8">
          <Link href="/" className="hover:text-gold flex items-center gap-1 transition-colors">
            <ArrowLeft size={13} />
            <span>BERANDA</span>
          </Link>
          <span>/</span>
          <span className="text-gold font-semibold">TENTANG ZEFANYA ZULIAN</span>
        </div>

        {/* Header Block */}
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-xs font-sans text-gold uppercase tracking-widest font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>EXECUTIVE BACKGROUND & DOCTRINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
            Zefanya Zulian, <span className="text-gold text-2xl sm:text-3xl font-sans font-normal">S.Ikom</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gold font-serif font-bold">
            {t(data.profile.professionalTitle)}
          </p>

          <p className="text-base sm:text-lg text-softGray font-sans leading-relaxed pt-2 max-w-3xl">
            {t(data.profile.shortBio)}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Portrait Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-gold/40 bg-charcoal p-5 rounded-2xl shadow-luxury-elevated">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-obsidian border border-hairline">
                <Image
                  src={portraitSrc}
                  alt={data.profile.fullName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-top filter contrast-105"
                  priority
                />
              </div>

              <div className="mt-4 p-4 bg-obsidian border border-hairline rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-sans text-softGray uppercase tracking-wider font-semibold">Lokasi Domisili:</p>
                  <p className="text-xs sm:text-sm font-serif font-bold text-ivory flex items-center gap-1.5 mt-0.5">
                    <MapPin size={13} className="text-gold" />
                    <span>{t(data.profile.location)}</span>
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full border border-gold/50 bg-gold/15 flex items-center justify-center font-serif text-gold text-xs font-bold">
                  ZZ
                </div>
              </div>
            </div>

            {/* Quick Contacts */}
            <div className="p-6 border border-hairline bg-charcoal rounded-2xl shadow-luxury-card space-y-4">
              <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold">
                Kanal Komunikasi Resmi:
              </p>
              <div className="space-y-2 text-xs font-sans text-softGray">
                <p>
                  Email: <span className="text-ivory font-bold">{data.profile.email}</span>
                </p>
                <p>
                  Telepon / WA: <span className="text-ivory font-bold">{data.profile.phone}</span>
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={`mailto:${data.profile.email}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-sans font-bold uppercase tracking-wider bg-gold text-obsidian hover:bg-gold-light rounded-full transition-all duration-300 shadow-gold-subtle"
                >
                  <Mail size={14} />
                  <span>Kirim Email Langsung</span>
                </a>
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-sans font-bold uppercase tracking-wider bg-obsidian hover:bg-black text-ivory border border-hairline hover:border-gold rounded-full transition-colors"
                >
                  <Download size={14} className="text-gold" />
                  <span>Unduh Dokumen CV (PDF)</span>
                </button>
                <Link
                  href="/card"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-sans font-bold uppercase tracking-wider bg-charcoal hover:bg-obsidian text-softGray hover:text-gold border border-hairline rounded-full transition-colors"
                >
                  <CreditCard size={14} />
                  <span>Buka Digital Business Card</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Narrative Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="border border-hairline bg-charcoal p-8 sm:p-10 rounded-2xl shadow-luxury-card space-y-6">
              <h2 className="text-2xl font-serif font-bold text-ivory">
                Ringkasan Eksekutif & Pengalaman
              </h2>
              <div className="text-sm sm:text-base text-softGray leading-relaxed space-y-4 font-sans">
                {t(data.profile.fullBio).split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Key Career Highlights */}
            <div className="border border-hairline bg-charcoal p-8 rounded-2xl shadow-luxury-card space-y-4">
              <h3 className="text-xl font-serif font-bold text-ivory">
                Sorotan Kepemimpinan & Tonggak Karier
              </h3>
              <ul className="space-y-3">
                {highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-softGray font-sans">
                    <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic & Certification summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 border border-hairline bg-charcoal rounded-2xl">
                <GraduationCap className="text-gold mb-2" size={22} />
                <p className="text-xs font-sans text-softGray uppercase tracking-wider font-semibold">Pendidikan Formal:</p>
                <p className="text-base font-serif font-bold text-ivory mt-1">
                  Sarjana Ilmu Komunikasi (S.Ikom)
                </p>
                <p className="text-xs text-softGray mt-0.5 font-sans">
                  Universitas Bhayangkara Jakarta Raya • GPA 3.25
                </p>
              </div>

              <div className="p-6 border border-hairline bg-charcoal rounded-2xl">
                <ShieldCheck className="text-gold mb-2" size={22} />
                <p className="text-xs font-sans text-softGray uppercase tracking-wider font-semibold">Sertifikasi BNSP & LSP:</p>
                <p className="text-base font-serif font-bold text-ivory mt-1">
                  Certified PR Officer (2024)
                </p>
                <p className="text-xs text-softGray mt-0.5 font-sans">
                  TOEFL 533 | CEFR B2 Upper Intermediate
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <MediaLightbox />
      <CommandPalette />
    </div>
  );
}
