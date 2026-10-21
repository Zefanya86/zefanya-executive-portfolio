'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import PortraitCard3D from '@/components/3d/PortraitCard3D';
import MonolithScene from '@/components/3d/MonolithScene';
import { Download, ArrowDown, MapPin, Play, Pause, ExternalLink } from 'lucide-react';

export default function HeroSection() {
  const { data, locale, t, setIsCvModalOpen } = usePortfolio();
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
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
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [data.hero.videoUrl]);

  const videoSrc = data.hero.videoUrl || '/videos/hero-cinematic.mp4';
  const posterSrc = data.hero.fallbackPosterUrl || 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000&auto=format&fit=crop';

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-obsidian pt-24 pb-16 lg:py-0"
    >
      {/* 1. Cinematic Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {!videoError && (
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            poster={posterSrc}
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center filter brightness-50 contrast-125 transform scale-105 transition-opacity duration-1000"
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={videoSrc} type="video/webm" />
          </video>
        )}

        {/* Video Fallback Background Image */}
        {videoError && (
          <div
            style={{ backgroundImage: `url(${posterSrc})` }}
            className="w-full h-full bg-cover bg-center filter brightness-40 contrast-120"
          />
        )}

        {/* Multi-layered Cinematic Dark Overlays */}
        <div
          style={{ opacity: data.hero.overlayOpacity ?? 0.70 }}
          className="absolute inset-0 bg-obsidian"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/75 to-transparent" />
        <div className="absolute inset-0 cinematic-vignette" />

        {/* Dynamic Subtle Lighting Accents */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crimson/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-platinum/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Accessible Video Pause/Play Control (Discrete) */}
      <div className="absolute top-24 right-6 z-20 hidden md:block">
        <button
          onClick={toggleVideo}
          className="p-2 rounded-full bg-obsidian/70 backdrop-blur-md border border-platinum/10 text-platinum-muted hover:text-white transition"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          title={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 2. Hero Content Grid Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Executive Copywriting & Calls to Action */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-graphite-surface/90 border border-platinum/15 backdrop-blur-md w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-crimson shadow-glow-crimson animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-platinum uppercase">
                {t(data.hero.eyebrow)}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-warmWhite leading-[1.08]">
                <span className="block text-gradient-platinum">
                  {t(data.hero.headlineLine1)}
                </span>
                <span className="block text-gradient-crimson mt-1">
                  {t(data.hero.headlineLine2)}
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-platinum-muted max-w-2xl leading-relaxed font-normal">
              {t(data.hero.subheadline)}
            </p>

            {/* Fast Credentials / Location Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-platinum-muted py-1">
              <div className="flex items-center gap-1.5 text-platinum">
                <MapPin className="w-4 h-4 text-crimson" />
                <span>{t(data.profile.location)}</span>
              </div>
              <span className="text-platinum-muted/40">•</span>
              <div className="flex items-center gap-1.5 text-platinum">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{locale === 'id' ? 'Aktif: General Manager PT. AMS' : 'Active: GM at PT. AMS'}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Primary CTA: Explore Portfolio */}
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-crimson via-crimson to-crimson-dark rounded-xl shadow-glow-crimson hover:brightness-110 active:scale-95 transition"
              >
                <span>{t(data.hero.primaryCtaText)}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              {/* Secondary CTA: Download CV */}
              <button
                onClick={() => setIsCvModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-warmWhite bg-graphite-surface/90 hover:bg-graphite border border-platinum/20 hover:border-platinum/40 rounded-xl backdrop-blur-md active:scale-95 transition"
              >
                <Download className="w-4 h-4 text-crimson" />
                <span>{t(data.hero.secondaryCtaText)}</span>
              </button>

              {/* Connect CTA */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-platinum-muted hover:text-white border border-transparent hover:border-platinum/20 rounded-xl transition"
              >
                <span>{t(data.hero.contactCtaText)}</span>
                <ExternalLink className="w-3.5 h-3.5 text-platinum-muted" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Signature Monolith & 3D Portrait Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
            {/* Background 3D Architectural Monolith */}
            {data.theme.enable3D && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-70 transform -translate-y-4">
                <MonolithScene className="w-full h-full max-h-[520px]" />
              </div>
            )}

            {/* 3D Portrait Card */}
            <div className="relative z-10 w-full flex justify-center">
              <PortraitCard3D />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Minimalist Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-80">
        <span className="text-[10px] font-mono uppercase tracking-widest text-platinum-muted">
          {locale === 'id' ? 'GULIR KE BAWAH' : 'SCROLL DOWN'}
        </span>
        <div className="w-5 h-9 rounded-full border border-platinum/30 flex justify-center p-1 bg-obsidian/40 backdrop-blur-sm">
          <div className="w-1.5 h-2.5 rounded-full bg-crimson animate-bounce" />
        </div>
      </div>
    </section>
  );
}
