'use client';

import React from 'react';
import { PortfolioData, AchievementItem } from '@/types/portfolio';
import { Trophy, Plus, Trash2 } from 'lucide-react';

interface AchievementModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function AchievementModule({ data, setData }: AchievementModuleProps) {
  const achievements = data.achievements || [];

  const updateAchievement = (id: string, updates: Partial<AchievementItem>) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((ach) =>
        ach.id === id ? { ...ach, ...updates } : ach
      ),
    }));
  };

  const addAchievement = () => {
    const newId = `ach_${Date.now()}`;
    const newAch: AchievementItem = {
      id: newId,
      title: {
        id: 'Pencapaian Eksekutif Baru',
        en: 'New Executive Achievement',
        zh: '新增高管荣誉与里程碑',
      },
      year: '2026',
      description: {
        id: 'Deskripsi pencapaian dan dampak kepemimpinan.',
        en: 'Achievement description and leadership impact.',
        zh: '成果说明与领导力影响。',
      },
      metric: '100%',
      metricLabel: {
        id: 'Target Efisiensi',
        en: 'Efficiency Target',
        zh: '效率达标',
      },
      order: achievements.length + 1,
    };

    setData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAch],
    }));
  };

  const deleteAchievement = (id: string) => {
    if (confirm('Hapus rekor pencapaian ini?')) {
      setData((prev) => ({
        ...prev,
        achievements: prev.achievements.filter((a) => a.id !== id),
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <Trophy size={14} />
            <span>09. Pencapaian, Rekor & Kolaborasi Publik</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Achievements & Public Milestones
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Rekam jejak program vaksinasi massal (Kapolri & BEM), kejuaraan olahraga, dan penghargaan terukur.
          </p>
        </div>

        <button
          onClick={addAchievement}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
        >
          <Plus size={14} />
          <span>Tambah Pencapaian</span>
        </button>
      </div>

      <div className="space-y-6">
        {achievements.map((ach, idx) => (
          <div
            key={ach.id}
            className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-4 shadow-luxury-card"
          >
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <span className="text-xs font-sans font-bold text-gold uppercase">
                Rekor #{idx + 1} • Tahun {ach.year}
              </span>
              <button
                onClick={() => deleteAchievement(ach.id)}
                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
              >
                <Trash2 size={13} />
                <span>Hapus</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Judul Pencapaian (Bahasa Indonesia)
                </label>
                <input
                  type="text"
                  value={ach.title.id}
                  onChange={(e) =>
                    updateAchievement(ach.id, {
                      title: { ...ach.title, id: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Tahun Pelaksanaan
                </label>
                <input
                  type="text"
                  value={ach.year}
                  onChange={(e) => updateAchievement(ach.id, { year: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Metric & Label */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Angka Metrik (Contoh: 1.100 Dosis / Juara 1)
                </label>
                <input
                  type="text"
                  value={ach.metric || ''}
                  onChange={(e) => updateAchievement(ach.id, { metric: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-serif font-bold text-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Label Metrik
                </label>
                <input
                  type="text"
                  value={ach.metricLabel?.id || ''}
                  onChange={(e) =>
                    updateAchievement(ach.id, {
                      metricLabel: { ...ach.metricLabel, id: e.target.value } as any,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Description Trilingual */}
            <div className="space-y-3 pt-3 border-t border-hairline">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Uraian Fakta Pencapaian (Trilingual)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <textarea
                  rows={3}
                  placeholder="ID"
                  value={ach.description.id}
                  onChange={(e) =>
                    updateAchievement(ach.id, {
                      description: { ...ach.description, id: e.target.value },
                    })
                  }
                  className="p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
                />
                <textarea
                  rows={3}
                  placeholder="EN"
                  value={ach.description.en}
                  onChange={(e) =>
                    updateAchievement(ach.id, {
                      description: { ...ach.description, en: e.target.value },
                    })
                  }
                  className="p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
                />
                <textarea
                  rows={3}
                  placeholder="ZH"
                  value={ach.description.zh}
                  onChange={(e) =>
                    updateAchievement(ach.id, {
                      description: { ...ach.description, zh: e.target.value },
                    })
                  }
                  className="p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
