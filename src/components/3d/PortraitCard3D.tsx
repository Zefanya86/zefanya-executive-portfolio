'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import { ShieldCheck, Award, Briefcase, Sparkles, MapPin } from 'lucide-react';

interface PortraitCard3DProps {
  className?: string;
}

export default function PortraitCard3D({ className = '' }: PortraitCard3DProps) {
  const { data, locale, t } = usePortfolio();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth bounded tilt (max 6 degrees for executive elegance)
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const portraitSrc = data.hero.portraitUrl || '/zefanya-portrait.jpg';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
      }}
      className={`relative select-none ${className}`}
    >
      {/* Outer Clear Glassmorphic Card Frame */}
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 20px 50px rgba(0, 0, 0, 0.45), 0 0 40px rgba(215, 46, 67, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.4), inset 0 -1px 1px rgba(255, 255, 255, 0.15)'
            : '0 12px 35px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 1px rgba(255, 255, 255, 0.1)',
        }}
        className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[430px] rounded-3xl bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-2xl backdrop-saturate-150 border border-white/20 hover:border-white/35 p-3 sm:p-3.5 transition-colors duration-500 overflow-hidden group"
      >
        {/* Dynamic Specular Glass Glare / Light Refraction */}
        <div
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 35%, transparent 65%)`
              : 'none',
          }}
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
        />

        {/* Diagonal Glass Sheen Reflection */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-white/5 rotate-12 pointer-events-none z-10" />

        {/* Subtle Ambient Crimson Edge Accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-crimson/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-crimson/15 rounded-full blur-xl pointer-events-none" />

        {/* Inner Portrait Image Container with Clean Glass Bevel */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/30 border border-white/15 shadow-inner">
          <Image
            src={portraitSrc}
            alt={data.hero.portraitAlt || 'Zefanya Zulian - General Manager Operations & Business Management'}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-cover object-top filter brightness-95 contrast-105 transition-transform duration-700 group-hover:scale-104"
          />

          {/* Clean Glass Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 pointer-events-none" />

          {/* Top Status Pill - Clear Glass Morph */}
          <div className="absolute top-3.5 left-3.5 z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/55 backdrop-blur-xl border border-white/25 text-[11px] font-mono tracking-wider text-white shadow-lg transition">
              <span className="w-2 h-2 rounded-full bg-crimson shadow-glow-crimson animate-pulse" />
              <span>{locale === 'id' ? 'Aktif' : 'Active'} • General Manager</span>
            </div>
          </div>

          {/* Bottom Floating Info Badge with 3D Depth & Clean Glassmorphism */}
          <div
            style={{ transform: 'translateZ(24px)' }}
            className="absolute bottom-3.5 left-3.5 right-3.5 p-4 rounded-2xl bg-black/45 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] z-20"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-crimson-light font-mono font-medium">
                  <MapPin className="w-3 h-3 text-crimson" />
                  <span>{t(data.profile.location) || 'Bekasi, Jawa Barat, Indonesia'}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                  {data.profile.fullName}
                </h3>
                <p className="text-xs text-platinum-muted mt-0.5 line-clamp-1">
                  {t(data.profile.professionalTitle)}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 text-crimson-light border border-white/15 backdrop-blur-md shrink-0 shadow-sm">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>

            {/* Quick Credentials Micro-Bar with Frosted Glass Chips */}
            <div className="mt-3 pt-2.5 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] text-platinum font-mono">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                <ShieldCheck className="w-3 h-3 text-crimson-light shrink-0" />
                <span className="truncate">BNSP & LSP Certified</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                <Award className="w-3 h-3 text-crimson-light shrink-0" />
                <span className="truncate">TOEFL 533 (B2)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
