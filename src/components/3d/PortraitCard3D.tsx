'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import { MapPin, ShieldCheck, Award } from 'lucide-react';
import { sound } from '@/lib/sound';

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

    // Smooth bounded tilt
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
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
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => sound.playClick()}
      style={{
        perspective: '1200px',
      }}
      className={`relative select-none cursor-pointer ${className}`}
    >
      {/* Outer Executive Card Frame */}
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/20 hover:border-limeAccent/60 p-3.5 sm:p-4 transition-colors duration-500 overflow-hidden group shadow-2xl hover:shadow-[0_0_35px_rgba(217,243,106,0.2)]"
      >
        {/* Dynamic Specular Glass Glare */}
        <div
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(217, 243, 106, 0.2) 0%, rgba(52, 87, 213, 0.15) 30%, transparent 60%)`
              : 'none',
          }}
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
        />

        {/* Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-limeAccent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cobalt/25 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 text-limeAccent font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-limeAccent animate-pulse" />
            <span>EXECUTIVE DOSSIER</span>
          </div>
          <div className="text-gray-400">
            ID: ZEF-2026-OPS
          </div>
        </div>

        {/* Inner Portrait Container */}
        <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/80 border border-white/15">
          <Image
            src={portraitSrc}
            alt={data.hero.portraitAlt || 'Zefanya Zulian - Operations, Procurement & Business Management'}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            priority
            className="object-cover object-top filter brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-700"
          />

          {/* Vignette Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none z-10" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-limeAccent/40 text-[10px] font-mono uppercase tracking-wider text-white">
              <span className="w-2 h-2 rounded-full bg-limeAccent animate-pulse" />
              <span>Available for Leadership</span>
            </span>
          </div>

          {/* Bottom Card Overlay */}
          <div className="absolute bottom-3 left-3 right-3 z-20 p-3 rounded-xl bg-black/85 backdrop-blur-xl border border-white/15 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold tracking-tight font-display text-white group-hover:text-limeAccent transition-colors">
                  {data.profile.fullName}, S.Ikom
                </h3>
                <p className="text-[11px] font-mono text-gray-300">
                  Operations & Business Management
                </p>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cobalt/40 border border-cobalt/60 text-white font-bold">
                IPK 3.25
              </span>
            </div>

            {/* Micro Tags Bar */}
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin size={10} className="text-limeAccent" />
                Jakarta, Indonesia
              </span>
              <span className="text-limeAccent font-bold">
                VERIFIED CV
              </span>
            </div>
          </div>
        </div>

        {/* Clean Footer Bar */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400">
          <span className="flex items-center gap-1 text-gray-300">
            <ShieldCheck size={12} className="text-limeAccent" />
            <span>BNSP & LSP Accredited</span>
          </span>
          <span className="text-limeAccent font-bold">
            2026 EDITION
          </span>
        </div>
      </div>
    </div>
  );
}
