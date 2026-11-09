'use client';

import React from 'react';
import { PortfolioData, PageSectionConfig } from '@/types/portfolio';
import { Sliders, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';

interface SectionBuilderModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function SectionBuilderModule({ data, setData }: SectionBuilderModuleProps) {
  const sections = data.sections || [];

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= sections.length) return;

    const list = [...sections];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;

    list.forEach((item, idx) => {
      item.order = idx + 1;
    });

    setData((prev) => ({
      ...prev,
      sections: list,
    }));
  };

  const toggleSection = (id: string) => {
    setData((prev) => ({
      ...prev,
      sections: (prev.sections || []).map((sec) =>
        sec.id === id ? { ...sec, isEnabled: !sec.isEnabled } : sec
      ),
    }));
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-hairline pb-4">
        <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
          <Sliders size={14} />
          <span>04. Visual Page & Section Builder</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
          Homepage Section Architecture & Reordering
        </h2>
        <p className="text-xs text-softGray font-sans mt-1">
          Atur urutan modul pada halaman beranda, aktifkan atau nonaktifkan bagian tertentu sesuai kebutuhan representasi eksekutif.
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              sec.isEnabled
                ? 'bg-charcoal border-hairline hover:border-gold/50'
                : 'bg-obsidian/60 border-hairline/40 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-obsidian border border-hairline flex items-center justify-center text-xs font-mono text-gold font-bold">
                {idx + 1}
              </span>
              <div>
                <h3 className="text-sm font-serif font-bold text-ivory flex items-center gap-2">
                  <span>{sec.title.id}</span>
                  <span className="text-[10px] font-mono text-softGray">
                    ({sec.sectionKey})
                  </span>
                </h3>
                <p className="text-[11px] text-softGray font-sans">
                  EN: {sec.title.en} • ZH: {sec.title.zh}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => moveSection(idx, 'up')}
                disabled={idx === 0}
                className="p-2 rounded-lg bg-obsidian border border-hairline text-softGray hover:text-ivory disabled:opacity-30 transition-colors"
                title="Pindah ke Atas"
              >
                <ArrowUp size={14} />
              </button>

              <button
                type="button"
                onClick={() => moveSection(idx, 'down')}
                disabled={idx === sections.length - 1}
                className="p-2 rounded-lg bg-obsidian border border-hairline text-softGray hover:text-ivory disabled:opacity-30 transition-colors"
                title="Pindah ke Bawah"
              >
                <ArrowDown size={14} />
              </button>

              <button
                type="button"
                onClick={() => toggleSection(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-colors ${
                  sec.isEnabled
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    : 'bg-obsidian text-softGray border border-hairline'
                }`}
              >
                {sec.isEnabled ? (
                  <>
                    <Eye size={13} />
                    <span>Aktif</span>
                  </>
                ) : (
                  <>
                    <EyeOff size={13} />
                    <span>Nonaktif</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
