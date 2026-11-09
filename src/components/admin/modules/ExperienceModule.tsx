'use client';

import React, { useState } from 'react';
import { PortfolioData, ExperienceItem } from '@/types/portfolio';
import { Briefcase, Plus, Trash2, ArrowUp, ArrowDown, Building, MapPin, CheckCircle2 } from 'lucide-react';

interface ExperienceModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function ExperienceModule({ data, setData }: ExperienceModuleProps) {
  const [selectedId, setSelectedId] = useState<string>(data.experiences[0]?.id || '');

  const experiences = data.experiences;
  const currentExp = experiences.find((e) => e.id === selectedId) || experiences[0];

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    }));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= experiences.length) return;

    const list = [...experiences];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;

    // re-assign orders
    list.forEach((item, idx) => {
      item.order = idx + 1;
    });

    setData((prev) => ({
      ...prev,
      experiences: list,
    }));
  };

  const addExperience = () => {
    const newId = `exp_${Date.now()}`;
    const newExp: ExperienceItem = {
      id: newId,
      slug: `posisi-baru-${Date.now()}`,
      company: 'PT. Baru Mandiri',
      role: {
        id: 'Operations Manager',
        en: 'Operations Manager',
        zh: '运营经理',
      },
      period: '2026–Sekarang',
      location: 'Jakarta, Indonesia',
      responsibilities: {
        id: ['Memimpin operasional dan koordinasi tim.'],
        en: ['Leading operations and cross-team coordination.'],
        zh: ['领导日常运营及跨部门协同。'],
      },
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
      featured: true,
      isPublished: true,
      order: experiences.length + 1,
    };

    setData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
    setSelectedId(newId);
  };

  const deleteExperience = (id: string) => {
    if (confirm('Yakin ingin menghapus pengalaman kerja ini?')) {
      const remaining = experiences.filter((e) => e.id !== id);
      setData((prev) => ({
        ...prev,
        experiences: remaining,
      }));
      if (selectedId === id && remaining.length > 0) {
        setSelectedId(remaining[0].id);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <Briefcase size={14} />
            <span>05. Pengalaman Kerja & Rekam Jejak Operasional</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Executive Experience Manager
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Kelola posisi manajerial, perusahaan, deskripsi tugas, dan dokumentasi visual operasional.
          </p>
        </div>

        <button
          onClick={addExperience}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
        >
          <Plus size={14} />
          <span>Tambah Pengalaman</span>
        </button>
      </div>

      {/* Main Experience Layout: List (Left) + Detail Editor (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* List of Experiences (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-sans uppercase tracking-widest text-softGray font-bold px-1">
            Daftar Posisi ({experiences.length})
          </p>

          <div className="space-y-2">
            {experiences.map((exp, idx) => {
              const isSelected = exp.id === currentExp?.id;
              return (
                <div
                  key={exp.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-charcoal border-gold shadow-luxury'
                      : 'bg-obsidian border-hairline hover:border-gold/40'
                  }`}
                >
                  <div
                    onClick={() => setSelectedId(exp.id)}
                    className="cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-sans font-bold text-gold uppercase">
                        {exp.period}
                      </span>
                      <span className="text-[10px] font-mono text-softGray">
                        #{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs font-serif font-bold text-ivory line-clamp-1">
                      {exp.role.id}
                    </p>
                    <p className="text-[11px] text-softGray font-sans flex items-center gap-1">
                      <Building size={11} className="text-gold" />
                      <span className="truncate">{exp.company}</span>
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-hairline flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveExperience(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-softGray hover:text-ivory disabled:opacity-30"
                        title="Geser ke atas"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        onClick={() => moveExperience(idx, 'down')}
                        disabled={idx === experiences.length - 1}
                        className="p-1 text-softGray hover:text-ivory disabled:opacity-30"
                        title="Geser ke bawah"
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="text-red-400 hover:text-red-300 text-[11px] flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Editor Form (8 Cols) */}
        {currentExp && (
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-charcoal border border-hairline space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <h3 className="text-lg font-serif font-bold text-ivory">
                Sunting Posisi: <span className="text-gold">{currentExp.company}</span>
              </h3>
              <span className="text-xs font-mono text-softGray">
                ID: {currentExp.id}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Nama Perusahaan
                </label>
                <input
                  type="text"
                  value={currentExp.company}
                  onChange={(e) => updateExperience(currentExp.id, { company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Periode Jabatan
                </label>
                <input
                  type="text"
                  value={currentExp.period}
                  onChange={(e) => updateExperience(currentExp.id, { period: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Lokasi Kerja
                </label>
                <input
                  type="text"
                  value={currentExp.location}
                  onChange={(e) => updateExperience(currentExp.id, { location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Slug URL Detail (/experience/[slug])
                </label>
                <input
                  type="text"
                  value={currentExp.slug}
                  onChange={(e) => updateExperience(currentExp.id, { slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Role Title in 3 Languages */}
            <div className="space-y-3 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Nama Jabatan (Trilingual)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[10px] text-gold font-bold block mb-1">ID</span>
                  <input
                    type="text"
                    value={currentExp.role.id}
                    onChange={(e) =>
                      updateExperience(currentExp.id, {
                        role: { ...currentExp.role, id: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gold font-bold block mb-1">EN</span>
                  <input
                    type="text"
                    value={currentExp.role.en}
                    onChange={(e) =>
                      updateExperience(currentExp.id, {
                        role: { ...currentExp.role, en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gold font-bold block mb-1">ZH</span>
                  <input
                    type="text"
                    value={currentExp.role.zh}
                    onChange={(e) =>
                      updateExperience(currentExp.id, {
                        role: { ...currentExp.role, zh: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                  />
                </div>
              </div>
            </div>

            {/* Responsibilities list editor */}
            <div className="space-y-4 pt-4 border-t border-hairline">
              <div className="flex items-center justify-between">
                <label className="text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                  Daftar Tanggung Jawab (Bahasa Indonesia)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newIdList = [...currentExp.responsibilities.id, 'Tugas baru'];
                    const newEnList = [...currentExp.responsibilities.en, 'New duty'];
                    const newZhList = [...currentExp.responsibilities.zh, '新职责'];
                    updateExperience(currentExp.id, {
                      responsibilities: { id: newIdList, en: newEnList, zh: newZhList },
                    });
                  }}
                  className="px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/40 text-[11px] font-sans font-bold hover:bg-gold hover:text-obsidian transition-colors"
                >
                  + Tambah Poin
                </button>
              </div>

              <div className="space-y-2">
                {currentExp.responsibilities.id.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => {
                        const newList = [...currentExp.responsibilities.id];
                        newList[rIdx] = e.target.value;
                        updateExperience(currentExp.id, {
                          responsibilities: { ...currentExp.responsibilities, id: newList },
                        });
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newIdList = currentExp.responsibilities.id.filter((_, i) => i !== rIdx);
                        const newEnList = currentExp.responsibilities.en.filter((_, i) => i !== rIdx);
                        const newZhList = currentExp.responsibilities.zh.filter((_, i) => i !== rIdx);
                        updateExperience(currentExp.id, {
                          responsibilities: { id: newIdList, en: newEnList, zh: newZhList },
                        });
                      }}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cover Image */}
            <div className="pt-4 border-t border-hairline space-y-3">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Foto Sampul Tematik
              </label>
              <input
                type="text"
                value={currentExp.coverImage || ''}
                onChange={(e) => updateExperience(currentExp.id, { coverImage: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
