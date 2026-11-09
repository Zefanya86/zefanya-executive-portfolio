'use client';

import React, { useState } from 'react';
import { PortfolioData, CompetencyItem } from '@/types/portfolio';
import { Layers, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface SkillsModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function SkillsModule({ data, setData }: SkillsModuleProps) {
  const competencies = data.competencies || [];

  const updateCompetency = (id: string, updates: Partial<CompetencyItem>) => {
    setData((prev) => ({
      ...prev,
      competencies: prev.competencies.map((comp) =>
        comp.id === id ? { ...comp, ...updates } : comp
      ),
    }));
  };

  const addCompetency = () => {
    const newId = `comp_${Date.now()}`;
    const newComp: CompetencyItem = {
      id: newId,
      title: {
        id: 'Kompetensi Operasional Baru',
        en: 'New Operational Competency',
        zh: '新增运营核心专业技能',
      },
      category: 'operations',
      order: competencies.length + 1,
    };

    setData((prev) => ({
      ...prev,
      competencies: [...prev.competencies, newComp],
    }));
  };

  const deleteCompetency = (id: string) => {
    if (confirm('Hapus kompetensi ini?')) {
      setData((prev) => ({
        ...prev,
        competencies: prev.competencies.filter((c) => c.id !== id),
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <Layers size={14} />
            <span>08. Kompetensi Inti & Keahlian Manajerial</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Core Competencies & Expertise ({competencies.length})
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Keahlian operasional, pengadaan barang, koordinasi rantai pasok, dan tata kelola kepemimpinan strategis.
          </p>
        </div>

        <button
          onClick={addCompetency}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
        >
          <Plus size={14} />
          <span>Tambah Kompetensi</span>
        </button>
      </div>

      {/* Grid of Competencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competencies.map((comp, idx) => (
          <div
            key={comp.id}
            className="p-5 rounded-2xl bg-charcoal border border-hairline hover:border-gold/50 transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-obsidian text-gold border border-gold/30 uppercase">
                {comp.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-softGray">#{idx + 1}</span>
                <button
                  onClick={() => deleteCompetency(comp.id)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[10px] font-sans text-softGray block mb-0.5">ID (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={comp.title.id}
                  onChange={(e) =>
                    updateCompetency(comp.id, {
                      title: { ...comp.title, id: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="text-[10px] font-sans text-softGray block mb-0.5">EN (English)</label>
                <input
                  type="text"
                  value={comp.title.en}
                  onChange={(e) =>
                    updateCompetency(comp.id, {
                      title: { ...comp.title, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="text-[10px] font-sans text-softGray block mb-0.5">ZH (中文)</label>
                <input
                  type="text"
                  value={comp.title.zh}
                  onChange={(e) =>
                    updateCompetency(comp.id, {
                      title: { ...comp.title, zh: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-hairline flex items-center justify-between">
              <label className="text-[10px] font-sans text-softGray">Kategori:</label>
              <select
                value={comp.category}
                onChange={(e) => updateCompetency(comp.id, { category: e.target.value as any })}
                className="px-2.5 py-1 rounded-lg bg-obsidian border border-hairline text-[11px] text-ivory focus:border-gold"
              >
                <option value="operations">Operations</option>
                <option value="procurement">Procurement</option>
                <option value="logistics">Logistics</option>
                <option value="leadership">Leadership</option>
                <option value="strategy">Strategy</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
