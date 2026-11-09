'use client';

import React from 'react';
import { PortfolioData, ThemeSettings } from '@/types/portfolio';
import { Palette, Sparkles, Check, Sliders } from 'lucide-react';

interface DesignModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function DesignModule({ data, setData }: DesignModuleProps) {
  const theme = data.theme;

  const updateTheme = (field: keyof ThemeSettings, value: any) => {
    setData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [field]: value,
      },
    }));
  };

  const palettes = [
    {
      name: 'Ultra Luxury Executive (Official Default)',
      primary: '#0B0B0C',
      surface: '#18181B',
      gold: '#C5A477',
      ivory: '#F4F0E8',
      gray: '#A5A5A5',
      desc: 'Obsidian Black, Charcoal, Champagne Gold, Warm Ivory, Soft Gray',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-hairline pb-4">
        <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
          <Palette size={14} />
          <span>16. Luxury Design System & Visual Tokens</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
          Visual Identity, Palette & Performance
        </h2>
        <p className="text-xs text-softGray font-sans mt-1">
          Identitas warna Obsidian Black, Champagne Gold, tipografi editorial serif, dan optimasi performa grafis.
        </p>
      </div>

      {/* Luxury Color Swatches */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-6">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold">
          Palet Warna Resmi (Master Prompt Visual Identity)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-obsidian border border-hairline text-center space-y-2">
            <div className="w-10 h-10 rounded-full mx-auto bg-[#0B0B0C] border border-hairline shadow-inner" />
            <p className="text-xs font-serif font-bold text-ivory">Obsidian Black</p>
            <p className="text-[10px] font-mono text-softGray">#0B0B0C</p>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian border border-hairline text-center space-y-2">
            <div className="w-10 h-10 rounded-full mx-auto bg-[#18181B] border border-hairline shadow-inner" />
            <p className="text-xs font-serif font-bold text-ivory">Charcoal</p>
            <p className="text-[10px] font-mono text-softGray">#18181B</p>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian border border-hairline text-center space-y-2">
            <div className="w-10 h-10 rounded-full mx-auto bg-[#C5A477] border border-gold/40 shadow-luxury" />
            <p className="text-xs font-serif font-bold text-gold">Champagne Gold</p>
            <p className="text-[10px] font-mono text-gold">#C5A477</p>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian border border-hairline text-center space-y-2">
            <div className="w-10 h-10 rounded-full mx-auto bg-[#F4F0E8] border border-hairline shadow-inner" />
            <p className="text-xs font-serif font-bold text-ivory">Warm Ivory</p>
            <p className="text-[10px] font-mono text-softGray">#F4F0E8</p>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian border border-hairline text-center space-y-2">
            <div className="w-10 h-10 rounded-full mx-auto bg-[#A5A5A5] border border-hairline shadow-inner" />
            <p className="text-xs font-serif font-bold text-ivory">Soft Gray</p>
            <p className="text-[10px] font-mono text-softGray">#A5A5A5</p>
          </div>
        </div>
      </div>

      {/* Typography & Rendering Options */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-6">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold">
          Tipografi & Efek Visual Interaktif
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-sans text-softGray font-semibold block">
              Preset Tipografi Headline
            </label>
            <select
              value={theme.typographyPreset || 'editorial_serif'}
              onChange={(e) => updateTheme('typographyPreset', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory focus:border-gold"
            >
              <option value="editorial_serif">Editorial Serif (Cormorant Garamond)</option>
              <option value="modern_sans">Modern Sans (Manrope Precision)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans text-softGray font-semibold block">
              Mode Performa Grafis (Performance Mode)
            </label>
            <select
              value={theme.performanceMode || 'full'}
              onChange={(e) => updateTheme('performanceMode', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory focus:border-gold"
            >
              <option value="full">Full Cinematic Experience (60 FPS)</option>
              <option value="balanced">Balanced (Optimized for Mobile)</option>
              <option value="reduced">Reduced Motion (Maximum Battery Life)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-hairline flex flex-wrap items-center gap-6 text-xs font-sans">
          <label className="flex items-center gap-2 cursor-pointer text-ivory">
            <input
              type="checkbox"
              checked={theme.showParticles ?? true}
              onChange={(e) => updateTheme('showParticles', e.target.checked)}
              className="w-4 h-4 accent-gold rounded"
            />
            <span>Tampilkan Efek Partikel Halus (Ambient Atmosphere)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-ivory">
            <input
              type="checkbox"
              checked={theme.enableTilt ?? true}
              onChange={(e) => updateTheme('enableTilt', e.target.checked)}
              className="w-4 h-4 accent-gold rounded"
            />
            <span>Aktifkan Interaksi Tilt 3D pada Kartu Pengalaman</span>
          </label>
        </div>
      </div>
    </div>
  );
}
