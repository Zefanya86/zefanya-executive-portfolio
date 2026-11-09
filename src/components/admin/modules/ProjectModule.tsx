'use client';

import React, { useState } from 'react';
import { PortfolioData, ProjectItem } from '@/types/portfolio';
import { FolderGit2, Plus, Trash2, ArrowUp, ArrowDown, Building, MapPin, CheckCircle2 } from 'lucide-react';

interface ProjectModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function ProjectModule({ data, setData }: ProjectModuleProps) {
  const projects = data.projects || [];
  const [selectedId, setSelectedId] = useState<string>(projects[0]?.id || '');

  const currentProject = projects.find((p) => p.id === selectedId) || projects[0];

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: (prev.projects || []).map((proj) =>
        proj.id === id ? { ...proj, ...updates } : proj
      ),
    }));
  };

  const addProject = () => {
    const newId = `proj_${Date.now()}`;
    const newProject: ProjectItem = {
      id: newId,
      slug: `proyek-studi-kasus-${Date.now()}`,
      title: {
        id: 'Studi Kasus Proyek Operasional Baru',
        en: 'New Operational Project Case Study',
        zh: '新增运营项目全景案例',
      },
      company: 'PT. Mahaputra Baruna Logistik',
      location: 'Indonesia',
      role: {
        id: 'Operations Manager',
        en: 'Operations Manager',
        zh: '运营负责人',
      },
      period: '2025',
      category: 'operations' as any,
      scopeOfResponsibility: {
        id: ['Perencanaan alur operasional dan jadwal pengiriman harian.'],
        en: ['Operational flow planning and delivery schedule oversight.'],
        zh: ['全流程作业规划与每日调度统筹。'],
      },
      operationalChallenges: {
        id: ['Kondisi medan geografis dan fluktuasi cuaca.'],
        en: ['Geographical terrain constraints and weather volatility.'],
        zh: ['复杂地理路况与气象波动挑战。'],
      },
      managementApproach: {
        id: ['Penerapan SOP ketat dan komunikasi lintas tim.'],
        en: ['Strict SOP enforcement and cross-team communication.'],
        zh: ['严格执行作业规程与跨团队紧密联动。'],
      },
      projectExecution: {
        id: ['Koordinasi harian armada dan pemantauan kualitas material.'],
        en: ['Daily fleet dispatching and material quality monitoring.'],
        zh: ['每日车队调度与物料质量全程监控。'],
      },
      documentedOutcomes: {
        id: ['Tercapainya target pengiriman sesuai jadwal tanpa insiden.'],
        en: ['On-time delivery milestone achieved with zero safety incidents.'],
        zh: ['保质保量如期完成交付，无重大安全责任事故。'],
      },
      coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop',
      gallery: [],
      featured: true,
      isPublished: true,
      order: projects.length + 1,
    };

    setData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProject],
    }));
    setSelectedId(newId);
  };

  const deleteProject = (id: string) => {
    if (confirm('Yakin ingin menghapus studi kasus proyek ini?')) {
      const remaining = projects.filter((p) => p.id !== id);
      setData((prev) => ({
        ...prev,
        projects: remaining,
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
            <FolderGit2 size={14} />
            <span>06. Studi Kasus Proyek (Struktur Analisis 10-Bagian)</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Project Case Studies Manager
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Kelola studi kasus mendalam: tantangan operasional, pendekatan manajerial, eksekusi lapangan, dan hasil terukur.
          </p>
        </div>

        <button
          onClick={addProject}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
        >
          <Plus size={14} />
          <span>Tambah Studi Kasus</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Project List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-sans uppercase tracking-widest text-softGray font-bold px-1">
            Daftar Proyek ({projects.length})
          </p>

          <div className="space-y-2">
            {projects.map((proj, idx) => {
              const isSelected = proj.id === currentProject?.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedId(proj.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-charcoal border-gold shadow-luxury'
                      : 'bg-obsidian border-hairline hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-gold uppercase">
                      {proj.period}
                    </span>
                    <span className="text-[10px] font-mono text-softGray">
                      CASE #{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs font-serif font-bold text-ivory line-clamp-1 mt-1">
                    {proj.title.id}
                  </p>
                  <p className="text-[11px] text-softGray font-sans truncate mt-0.5">
                    {proj.company} • {proj.location}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Detail Editor (8 Cols) */}
        {currentProject && (
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-charcoal border border-hairline space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <h3 className="text-lg font-serif font-bold text-ivory">
                Studi Kasus: <span className="text-gold">{currentProject.company}</span>
              </h3>
              <button
                onClick={() => deleteProject(currentProject.id)}
                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
              >
                <Trash2 size={13} />
                <span>Hapus Proyek</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Nama Perusahaan Terkait
                </label>
                <input
                  type="text"
                  value={currentProject.company}
                  onChange={(e) => updateProject(currentProject.id, { company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Lokasi Operasi
                </label>
                <input
                  type="text"
                  value={currentProject.location}
                  onChange={(e) => updateProject(currentProject.id, { location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Periode Proyek
                </label>
                <input
                  type="text"
                  value={currentProject.period}
                  onChange={(e) => updateProject(currentProject.id, { period: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Slug URL Detail (/projects/[slug])
                </label>
                <input
                  type="text"
                  value={currentProject.slug}
                  onChange={(e) => updateProject(currentProject.id, { slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Trilingual Title */}
            <div className="space-y-3 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Judul Studi Kasus (Trilingual)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="ID"
                  value={currentProject.title.id}
                  onChange={(e) =>
                    updateProject(currentProject.id, {
                      title: { ...currentProject.title, id: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="EN"
                  value={currentProject.title.en}
                  onChange={(e) =>
                    updateProject(currentProject.id, {
                      title: { ...currentProject.title, en: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="ZH"
                  value={currentProject.title.zh}
                  onChange={(e) =>
                    updateProject(currentProject.id, {
                      title: { ...currentProject.title, zh: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Scope of Responsibility */}
            <div className="space-y-3 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-gold font-bold uppercase tracking-wider">
                1. Ruang Lingkup Tanggung Jawab (Scope)
              </label>
              <textarea
                rows={2}
                value={currentProject.scopeOfResponsibility?.id?.[0] || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  updateProject(currentProject.id, {
                    scopeOfResponsibility: {
                      ...currentProject.scopeOfResponsibility,
                      id: [val],
                    },
                  });
                }}
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>

            {/* Operational Challenges */}
            <div className="space-y-3 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-gold font-bold uppercase tracking-wider">
                2. Tantangan Operasional (Operational Challenges)
              </label>
              <textarea
                rows={2}
                value={currentProject.operationalChallenges?.id?.[0] || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  updateProject(currentProject.id, {
                    operationalChallenges: {
                      ...currentProject.operationalChallenges,
                      id: [val],
                    },
                  });
                }}
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>

            {/* Management Approach */}
            <div className="space-y-3 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-gold font-bold uppercase tracking-wider">
                3. Pendekatan Manajemen (Management Approach)
              </label>
              <textarea
                rows={2}
                value={currentProject.managementApproach?.id?.[0] || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  updateProject(currentProject.id, {
                    managementApproach: {
                      ...currentProject.managementApproach,
                      id: [val],
                    },
                  });
                }}
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>

            {/* Documented Outcomes */}
            <div className="space-y-3 pt-4 border-t border-hairline">
              <label className="block text-xs font-sans text-gold font-bold uppercase tracking-wider">
                4. Hasil & Metrik Terdokumentasi (Documented Outcomes)
              </label>
              <textarea
                rows={2}
                value={currentProject.documentedOutcomes?.id?.[0] || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  updateProject(currentProject.id, {
                    documentedOutcomes: {
                      ...currentProject.documentedOutcomes,
                      id: [val],
                    },
                  });
                }}
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>

            {/* Cover Image */}
            <div className="pt-4 border-t border-hairline space-y-2">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Foto Sampul Proyek
              </label>
              <input
                type="text"
                value={currentProject.coverImage}
                onChange={(e) => updateProject(currentProject.id, { coverImage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
