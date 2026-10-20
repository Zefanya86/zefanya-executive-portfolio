'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import { ShieldCheck, Award, Briefcase } from 'lucide-react';

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

    // Subtly bounded tilt (max 8 degrees)
    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

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
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[430px] rounded-2xl bg-gradient-to-b from-graphite-surface via-obsidian-soft to-obsidian border border-platinum/20 p-2.5 sm:p-3 shadow-cinematic red-rim-glow overflow-hidden group"
      >
        {/* Dynamic Specular Glare */}
        <div
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(216, 221, 229, 0.18) 0%, transparent 60%)`
              : 'none',
          }}
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
        />

        {/* Ambient Crimson Rim Accent (Top Right & Bottom Left) */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-crimson/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-crimson/15 rounded-full blur-xl pointer-events-none" />

        {/* Inner Portrait Image Container */}
        <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-obsidian-deep border border-platinum/10">
          <Image
            src={portraitSrc}
            alt={data.hero.portraitAlt || "Zefanya Zulian - General Manager Operations & Business Management"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-cover object-top filter brightness-95 contrast-105 transition-transform duration-700 group-hover:scale-105"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/30 via-transparent to-obsidian/30 pointer-events-none" />

          {/* Top Status Pill */}
          <div className="absolute top-3 left-3 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian/80 backdrop-blur-md border border-platinum/20 text-[11px] font-mono uppercase tracking-wider text-platinum-bright">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              <span>{locale === 'id' ? 'Aktif' : 'Active'} • General Manager</span>
            </div>
          </div>

          {/* Bottom Floating Info Badge with translate-z depth */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-graphite/90 backdrop-blur-md border border-platinum/15 shadow-card-executive z-10"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-crimson font-mono font-medium">
                  {t(data.profile.location) || 'Bekasi, Jawa Barat, Indonesia'}
                </p>
                <h3 className="text-base sm:text-lg font-bold text-warmWhite tracking-tight">
                  {data.profile.fullName}
                </h3>
                <p className="text-xs text-platinum-muted mt-0.5 line-clamp-1">
                  {t(data.profile.professionalTitle)}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-crimson/15 text-crimson border border-crimson/30 shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>

            {/* Quick credentials micro-bar */}
            <div className="mt-3 pt-2.5 border-t border-platinum/10 grid grid-cols-2 gap-2 text-[10px] text-platinum-muted font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-crimson shrink-0" />
                <span>BNSP & LSP Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3 h-3 text-crimson shrink-0" />
                <span>B2 TOEFL 533</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
