'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  Download,
  ArrowDown,
  Play,
  Pause,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Briefcase,
  Sparkles,
  Flame,
  Compass,
} from 'lucide-react';
import { sound } from '@/lib/sound';

export default function HeroSection() {
  const { data, locale, t, setIsCvModalOpen, setIsAvailabilityModalOpen } = usePortfolio();
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [canLoadVideo, setCanLoadVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>(
    data.hero.videoUrl || '/videos/jakarta-logistics-flow.mp4'
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsPlaying(false);
      }
    }
    const timer = setTimeout(() => setCanLoadVideo(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const toggleVideo = () => {
    sound.playClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (data.hero.videoUrl) {
      setSelectedVideo(data.hero.videoUrl);
    }
  }, [data.hero.videoUrl]);

  const videoSrc = selectedVideo;
  const posterSrc = data.hero.fallbackPosterUrl || '/videos/jakarta-logistics-flow-poster.jpg';
  const portraitSrc = data.hero.portraitUrl || '/zefanya-portrait.jpg';

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-obsidian pt-24 sm:pt-28 pb-16 lg:py-24"
    >
      {/* 1. Cinematic Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {canLoadVideo && !videoError ? (
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center filter brightness-50 contrast-110 saturate-90 transform scale-100 transition-opacity duration-1000"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div
            style={{ backgroundImage: `url(${posterSrc})` }}
            className="w-full h-full bg-cover bg-center filter brightness-45 contrast-105"
          />
        )}

        {/* Multi-layered Luxury Overlays */}
        <div
          style={{ opacity: Math.min(data.hero.overlayOpacity ?? 0.45, 0.6) }}
          className="absolute inset-0 bg-obsidian"
        />

        {/* Directional text-protection scrim: protects typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/80 via-50% to-obsidian/60 pointer-events-none" />

        {/* Top & bottom subtle gradient blend */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-obsidian to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />

        {/* Champagne Gold Ambient Light Accents */}
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* Main Luxury Container — Asymmetric Editorial Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Statement & Typography (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            
            {/* Fine Eyebrow Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal/80 border border-gold/40 shadow-gold-subtle backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] sm:text-xs font-sans tracking-widest uppercase font-bold text-gold">
                {t(data.profile.positioning) || "THE MODERN BUSINESS LEADER"}
              </span>
            </div>

            {/* Grand Editorial Headline with Cormorant Garamond */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-bold text-ivory tracking-tight leading-[1.12]">
                {t(data.hero.headlineLine1)} <br />
                <span className="gold-gradient-text">
                  {t(data.hero.headlineLine2)}
                </span>
              </h1>
            </div>

            {/* Subheadline / Executive Summary */}
            <p className="text-sm sm:text-base lg:text-lg text-softGray font-sans font-normal max-w-2xl leading-relaxed">
              {t(data.hero.subheadline)}
            </p>

            {/* Live Role & Metric Capsule (Flagship PT Asri Praya KSO) */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-charcoal/90 backdrop-blur-xl border border-gold/30 max-w-xl flex items-center justify-between gap-3 shadow-luxury-card hover:border-gold/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gold/15 border border-gold/30 text-gold shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-serif font-bold text-ivory block">
                      PT. Asri – Praya, KSO
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-gold/20 text-gold text-[9px] font-sans font-bold uppercase tracking-wider">
                      {locale === 'id' ? 'Proyek Unggulan' : locale === 'en' ? 'Flagship Project' : '旗舰标杆工程'}
                    </span>
                  </div>
                  <span className="text-[11px] font-sans text-softGray block mt-0.5">
                    {locale === 'id' 
                      ? 'Head of Logistics (Material Procurement) · Pembangunan Jembatan P. Kalimantan – P. Laut' 
                      : locale === 'en' 
                      ? 'Head of Logistics (Material Procurement) · Kalimantan – Laut Island Bridge Project' 
                      : '材料采购与物流负责人 · 加里曼丹—劳特岛跨海大桥建设工程'}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-[10px] font-sans font-bold text-gold shrink-0 shadow-[0_0_12px_rgba(197,164,119,0.25)]">
                <Flame size={12} className="text-gold animate-pulse" />
                <span>TOP TRENDING</span>
              </div>
            </div>

            {/* Executive Availability & Strategic Radar Capsule (Locked Point 3) */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsAvailabilityModalOpen(true);
              }}
              className="w-full max-w-xl p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-charcoal/80 to-charcoal/90 border border-emerald-500/30 hover:border-emerald-400/60 backdrop-blur-xl flex items-center justify-between gap-3 text-left transition-all duration-300 group hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-400">
                      {locale === 'id' ? 'STATUS RADAR EKSEKUTIF' : locale === 'en' ? 'EXECUTIVE RADAR STATUS' : '高管履新就职雷达'}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-semibold">
                      LIVE
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-serif font-bold text-ivory group-hover:text-emerald-300 transition-colors mt-0.5 line-clamp-1">
                    {locale === 'id'
                      ? 'Terbuka untuk Diskusi Kepemimpinan Operasional & Kemitraan Proyek'
                      : locale === 'en'
                      ? 'Open for Strategic Operations Leadership & Joint Ventures'
                      : '现正式开放重大运营领导与新项目战略联合体探讨'}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-[11px] font-sans font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0">
                <span>{locale === 'id' ? 'Detail Radar' : locale === 'en' ? 'Radar Intel' : '雷达详情'}</span>
                <ChevronRight size={13} />
              </div>
            </button>

            {/* Luxury Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#experience"
                onClick={() => sound.playClick()}
                className="px-6 sm:px-7 py-3 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-gold-subtle hover:scale-102 active:scale-98 flex items-center gap-2"
              >
                <span>{t(data.hero.primaryCtaText)}</span>
                <ChevronRight size={14} className="stroke-[2.5]" />
              </a>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsCvModalOpen(true);
                }}
                className="px-6 sm:px-7 py-3 rounded-full bg-charcoal/80 hover:bg-charcoal backdrop-blur-md border border-hairline hover:border-gold text-ivory font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-102 active:scale-98 flex items-center gap-2"
              >
                <Download size={13} className="text-gold" />
                <span>{t(data.hero.secondaryCtaText)}</span>
              </button>

              <Link
                href="/card"
                onClick={() => sound.playClick()}
                className="px-4 py-3 rounded-full bg-black/40 hover:bg-black/60 border border-hairline hover:border-gold/40 text-softGray hover:text-gold font-sans text-xs transition-all duration-300 flex items-center gap-1.5"
                title="Digital Business Card"
              >
                <CreditCard size={13} />
                <span className="hidden sm:inline">vCard</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Authentic Executive Portrait (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-gold/40 shadow-luxury-elevated bg-charcoal group">
              
              {/* Authentic Photo of Zefanya Zulian */}
              <Image
                src={portraitSrc}
                alt="Zefanya Zulian - The Modern Business Leader"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                className="object-cover object-top filter contrast-105 group-hover:scale-102 transition-transform duration-700"
              />

              {/* Fine Luxury Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-80" />
              
              {/* Delicate Gold Border Inner Glow */}
              <div className="absolute inset-0 border border-gold/20 rounded-2xl pointer-events-none" />

              {/* Bottom Portrait Floating Caption */}
              <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-obsidian/90 backdrop-blur-xl border border-gold/30 flex items-center justify-between">
                <div>
                  <span className="text-sm font-serif font-bold text-ivory block">
                    Zefanya Zulian, S.Ikom
                  </span>
                  <span className="text-[11px] font-sans text-gold block mt-0.5 font-medium">
                    {locale === 'id' 
                      ? 'The Modern Business Leader' 
                      : locale === 'en' 
                      ? 'The Modern Business Leader' 
                      : '现代商业领军者'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-[10px] font-sans text-gold">
                  <ShieldCheck size={12} />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Floating Control Bar (Video Switcher & Scroll Indicator) */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-20 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        {/* Scroll Indicator */}
        <a
          href="#about"
          className="hidden md:flex items-center gap-2 text-[10px] font-sans tracking-widest uppercase text-softGray pointer-events-auto hover:text-gold transition-colors"
        >
          <ArrowDown size={12} className="animate-bounce text-gold" />
          <span>SCROLL TO EXPLORE</span>
        </a>

        {/* Video Mode Switcher */}
        <div className="ml-auto pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-obsidian/80 backdrop-blur-xl border border-hairline text-[10px] font-sans shadow-lg">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedVideo('/videos/jakarta-logistics-flow.mp4');
              setVideoError(false);
            }}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedVideo === '/videos/jakarta-logistics-flow.mp4'
                ? 'bg-gold text-obsidian font-bold'
                : 'text-softGray hover:text-ivory'
            }`}
          >
            LOGISTICS
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setSelectedVideo('/videos/hero-night-skylines.mp4');
              setVideoError(false);
            }}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedVideo === '/videos/hero-night-skylines.mp4'
                ? 'bg-gold text-obsidian font-bold'
                : 'text-softGray hover:text-ivory'
            }`}
          >
            METROPOLIS
          </button>

          <button
            onClick={toggleVideo}
            title={isPlaying ? 'Pause Video' : 'Play Video'}
            className="p-1.5 rounded-full text-softGray hover:text-gold transition-colors"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
        </div>
      </div>
    </section>
  );
}
