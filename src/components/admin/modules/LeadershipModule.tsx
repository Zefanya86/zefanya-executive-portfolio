'use client';

import React, { useState } from 'react';
import { PortfolioData, LeadershipItem } from '@/types/portfolio';
import { Award, Plus, Trash2, ArrowUp, ArrowDown, Users, MapPin } from 'lucide-react';

interface LeadershipModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function LeadershipModule({ data, setData }: LeadershipModuleProps) {
  const leadership = data.leadership || [];
  const [selectedId, setSelectedId] = useState<string>(leadership[0]?.id || '');

  const currentItem = leadership.find((l) => l.id === selectedId) || leadership[0];

  const updateLeadership = (id: string, updates: Partial<LeadershipItem>) => {
    setData((prev) => ({
      ...prev,
      leadership: prev.leadership.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const addLeadership = () => {
    const newId = `lead_${Date.now()}`;
    const newItem: LeadershipItem = {
      id: newId,
      slug: `kepemimpinan-baru-${Date.now()}`,
      organization: 'Nama Organisasi Baru',
      role: {
        id: 'Ketua / Pimpinan Organisasi',
        en: 'Organization Leader',
        zh: '组织负责人',
      },
      period: '2024–2025',
      location: 'Bekasi, Indonesia',
      highlights: {
        id: ['Mengkoordinasikan inisiatif strategis dan tata kelola program.'],
        en: ['Coordinating strategic initiatives and program governance.'],
        zh: ['统筹推进战略行动与治理项目。'],
      },
      featured: true,
      isPublished: true,
      order: leadership.length + 1,
    };

    setData((prev) => ({
      ...prev,
      leadership: [...prev.leadership, newItem],
    }));
    setSelectedId(newId);
  };

  const deleteLeadership = (id: string) => {
    if (confirm('Hapus riwayat kepemimpinan ini?')) {
      const remaining = leadership.filter((l) => l.id !== id);
      setData((prev) => ({
        ...prev,
        leadership: remaining,
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
            <Award size={14} />
            <span>Kepemimpinan Organisasi & Tata Kelola Publik</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Civic Leadership & Student Body Governance
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Rekam jejak kepemimpinan mahasiswa tingkat universitas (Presma BEM Ubhara) dan advokasi kepemudaan (GEMA-RI Bekasi).
          </p>
        </div>

        <button
          onClick={addLeadership}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
        >
          <Plus size={14} />
          <span>Tambah Kepemimpinan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-sans uppercase tracking-widest text-softGray font-bold px-1">
            Daftar Amanah ({leadership.length})
          </p>

          <div className="space-y-2">
            {leadership.map((item, idx) => {
              const isSelected = item.id === currentItem?.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-charcoal border-gold shadow-luxury'
                      : 'bg-obsidian border-hairline hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-gold uppercase">
                      {item.period}
                    </span>
                    <span className="text-[10px] font-mono text-softGray">
                      LEAD #{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs font-serif font-bold text-ivory line-clamp-1 mt-1">
                    {item.role.id}
                  </p>
                  <p className="text-[11px] text-softGray font-sans truncate mt-0.5">
                    {item.organization}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editor (8 Cols) */}
        {currentItem && (
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-charcoal border border-hairline space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <h3 className="text-lg font-serif font-bold text-ivory">
                Sunting: <span className="text-gold">{currentItem.organization}</span>
              </h3>
              <button
                onClick={() => deleteLeadership(currentItem.id)}
                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
              >
                <Trash2 size={13} />
                <span>Hapus</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Nama Organisasi
                </label>
                <input
                  type="text"
                  value={currentItem.organization}
                  onChange={(e) => updateLeadership(currentItem.id, { organization: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Periode Kepemimpinan
                </label>
                <input
                  type="text"
                  value={currentItem.period}
                  onChange={(e) => updateLeadership(currentItem.id, { period: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={currentItem.location}
                  onChange={(e) => updateLeadership(currentItem.id, { location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Slug URL (/leadership/[slug])
                </label>
                <input
                  type="text"
                  value={currentItem.slug}
                  onChange={(e) => updateLeadership(currentItem.id, { slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Trilingual Role */}
            <div className="space-y-3 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Nama Jabatan / Mandat (Trilingual)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="ID"
                  value={currentItem.role.id}
                  onChange={(e) =>
                    updateLeadership(currentItem.id, {
                      role: { ...currentItem.role, id: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="EN"
                  value={currentItem.role.en}
                  onChange={(e) =>
                    updateLeadership(currentItem.id, {
                      role: { ...currentItem.role, en: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="ZH"
                  value={currentItem.role.zh}
                  onChange={(e) =>
                    updateLeadership(currentItem.id, {
                      role: { ...currentItem.role, zh: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-4 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Sorotan Utama Tata Kelola (Bahasa Indonesia)
              </label>
              <div className="space-y-2">
                {currentItem.highlights.id.map((hl, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={hl}
                      onChange={(e) => {
                        const newList = [...currentItem.highlights.id];
                        newList[hIdx] = e.target.value;
                        updateLeadership(currentItem.id, {
                          highlights: { ...currentItem.highlights, id: newList },
                        });
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
