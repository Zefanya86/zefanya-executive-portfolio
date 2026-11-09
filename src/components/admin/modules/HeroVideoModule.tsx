'use client';

import React from 'react';
import { PortfolioData, HeroData } from '@/types/portfolio';
import { Video, Sparkles, Check, Image as ImageIcon, Sliders } from 'lucide-react';

interface HeroVideoModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function HeroVideoModule({ data, setData }: HeroVideoModuleProps) {
  const hero = data.hero;

  const videoPresets = [
    {
      id: 'jakarta-logistics-flow',
      label: 'Jakarta Highway & Logistics Flow (1080p Daylight)',
      url: '/videos/jakarta-logistics-flow.mp4',
      badge: 'Logistics Flow (Primary)',
    },
    {
      id: 'local-skylines',
      label: 'Metropolis Night Skyline Aerial (1080p Cinematic)',
      url: '/videos/hero-night-skylines.mp4',
      badge: 'Metropolis Skyline',
    },
    {
      id: 'google-earth-satellite',
      label: 'Google Earth Satellite Orbit View (NASA 4K)',
      url: '/videos/google-earth-satellite.mp4',
      badge: 'Google Earth 3D',
    },
    {
      id: 'jakarta-traffic-night',
      label: 'Kemacetan Jakarta Malam Hari (1080p Local MP4)',
      url: '/videos/jakarta-traffic-night.mp4',
      badge: 'Jakarta Traffic',
    },
    {
      id: 'google-earth-orbit',
      label: 'Google Earth Orbital Pass Sweep (NASA 1080p)',
      url: '/videos/google-earth-orbit.mp4',
      badge: 'Satellite Sweep',
    },
    {
      id: 'local-cinematic',
      label: 'Cinematic City Architecture (Local Fast 720p)',
      url: '/videos/hero-cinematic.mp4',
      badge: 'Architecture',
    },
  ];

  const updateHero = (field: keyof HeroData, value: any) => {
    setData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  const updateLocalizedString = (field: keyof HeroData, lang: 'id' | 'en' | 'zh', value: string) => {
    setData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: {
          ...(prev.hero[field] as any),
          [lang]: value,
        },
      },
    }));
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-hairline pb-4">
        <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
          <Video size={14} />
          <span>Hero Cover, Video & Editorial Headlines</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
          Hero Section & Cinematic Backdrop
        </h2>
        <p className="text-xs text-softGray font-sans mt-1">
          Pengaturan video latar belakang bergerak, tingkat opasitas overlay, headline editorial, dan foto potret eksekutif.
        </p>
      </div>

      {/* Video Presets Selector */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-4">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-2">
          <Sparkles size={14} />
          <span>Pilihan Video Latar Belakang Presets</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {videoPresets.map((preset) => {
            const isSelected = hero.videoUrl === preset.url;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => updateHero('videoUrl', preset.url)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-gold/15 border-gold shadow-luxury'
                    : 'bg-obsidian border-hairline hover:border-gold/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-charcoal border border-hairline text-gold">
                    {preset.badge}
                  </span>
                  {isSelected && <Check size={14} className="text-gold" />}
                </div>
                <p className="text-xs font-sans font-bold text-ivory line-clamp-1">
                  {preset.label}
                </p>
                <p className="text-[10px] text-softGray font-mono mt-1 truncate">
                  {preset.url}
                </p>
              </button>
            );
          })}
        </div>

        {/* Custom Video Input */}
        <div className="pt-4 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              URL Video Kustom (MP4 / WebM)
            </label>
            <input
              type="text"
              value={hero.videoUrl}
              onChange={(e) => updateHero('videoUrl', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              URL Poster Cadangan (Fallback Poster)
            </label>
            <input
              type="text"
              value={hero.fallbackPosterUrl}
              onChange={(e) => updateHero('fallbackPosterUrl', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
            />
          </div>
        </div>

        {/* Opacity Slider */}
        <div className="pt-4 border-t border-hairline space-y-2">
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="text-softGray font-semibold">Tingkat Opasitas Overlay Hitam:</span>
            <span className="text-gold font-bold">{Math.round(hero.overlayOpacity * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.3}
            max={0.95}
            step={0.05}
            value={hero.overlayOpacity}
            onChange={(e) => updateHero('overlayOpacity', parseFloat(e.target.value))}
            className="w-full accent-gold cursor-pointer"
          />
        </div>
      </div>

      {/* Trilingual Editorial Headline */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-6">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold">
          Editorial Headlines (Trilingual ID / EN / ZH)
        </h3>

        {/* Tagline */}
        <div className="space-y-3">
          <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
            Tagline Utama
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">ID</span>
              <input
                type="text"
                value={hero.tagline.id}
                onChange={(e) => updateLocalizedString('tagline', 'id', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
              />
            </div>
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">EN</span>
              <input
                type="text"
                value={hero.tagline.en}
                onChange={(e) => updateLocalizedString('tagline', 'en', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
              />
            </div>
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">ZH</span>
              <input
                type="text"
                value={hero.tagline.zh}
                onChange={(e) => updateLocalizedString('tagline', 'zh', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Subheadline */}
        <div className="space-y-3 pt-4 border-t border-hairline">
          <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
            Subheadline / Credo
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">ID</span>
              <textarea
                rows={3}
                value={hero.subheadline.id}
                onChange={(e) => updateLocalizedString('subheadline', 'id', e.target.value)}
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">EN</span>
              <textarea
                rows={3}
                value={hero.subheadline.en}
                onChange={(e) => updateLocalizedString('subheadline', 'en', e.target.value)}
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">ZH</span>
              <textarea
                rows={3}
                value={hero.subheadline.zh}
                onChange={(e) => updateLocalizedString('subheadline', 'zh', e.target.value)}
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
