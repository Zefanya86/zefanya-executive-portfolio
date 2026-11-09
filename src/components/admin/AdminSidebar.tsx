'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  History,
  Mail,
  User,
  Video,
  Layers,
  Trophy,
  GraduationCap,
  ShieldCheck,
  Wrench,
  Briefcase,
  FolderGit2,
  Award,
  MessageSquareQuote,
  Camera,
  BookOpen,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  Sliders,
  Languages,
  Palette,
  Search,
  Settings,
  X,
} from 'lucide-react';

export interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  counts: {
    experiences: number;
    projects: number;
    leadership: number;
    competencies: number;
    achievements: number;
    certifications: number;
    articles: number;
    gallery: number;
    documents: number;
    testimonials: number;
    inquiries: number;
    logs: number;
  };
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  counts,
}: AdminSidebarProps) {
  const [searchFilter, setSearchFilter] = useState('');

  const groups = [
    {
      title: 'Kontrol Utama & Analitik',
      items: [
        { id: '01_dashboard', label: '01. Dashboard Ringkasan', icon: LayoutDashboard, count: null },
        { id: '19_activity', label: '19. Log Aktivitas & Audit', icon: History, count: counts.logs },
        { id: '15_inquiries', label: '15. Kontak & Pesan Masuk', icon: Mail, count: counts.inquiries, alert: counts.inquiries > 0 },
      ],
    },
    {
      title: 'Identitas & Kredensial',
      items: [
        { id: '02_profile', label: '02. Profil Eksekutif', icon: User, count: null },
        { id: '02_hero_cover', label: 'Hero Cover & Video', icon: Video, count: null },
        { id: '08_skills', label: '08. Kompetensi Inti', icon: Layers, count: counts.competencies },
        { id: '09_achievements', label: '09. Prestasi & Rekor', icon: Trophy, count: counts.achievements },
        { id: '10_education', label: '10. Pendidikan & Gelar', icon: GraduationCap, count: null },
        { id: '10_certificates', label: '10. Sertifikasi Profesi', icon: ShieldCheck, count: counts.certifications },
        { id: 'tools_languages', label: 'Alat Kerja & Bahasa', icon: Wrench, count: null },
      ],
    },
    {
      title: 'Karir & Portofolio Strategis',
      items: [
        { id: '05_experience', label: '05. Pengalaman Eksekutif', icon: Briefcase, count: counts.experiences },
        { id: '06_projects', label: '06. Studi Kasus Proyek', icon: FolderGit2, count: counts.projects },
        { id: '05_leadership', label: 'Kepemimpinan Organisasi', icon: Award, count: counts.leadership },
        { id: '13_testimonials', label: '13. Testimoni & Rekomendasi', icon: MessageSquareQuote, count: counts.testimonials },
      ],
    },
    {
      title: 'Publikasi & Media',
      items: [
        { id: '07_gallery', label: '07. Galeri Aktivitas', icon: Camera, count: counts.gallery },
        { id: '11_journal', label: '11. Jurnal & Opini', icon: BookOpen, count: counts.articles },
        { id: '12_downloads', label: '12. Berkas & Download', icon: FileText, count: counts.documents },
        { id: '17_medialib', label: '17. Media Library & Aset', icon: ImageIcon, count: null },
      ],
    },
    {
      title: 'Tata Letak & Terjemahan',
      items: [
        { id: '03_pages', label: '03. Manajemen Halaman', icon: FileSpreadsheet, count: null },
        { id: '04_builder', label: '04. Visual Section Builder', icon: Sliders, count: null },
        { id: '14_translations', label: '14. Matriks Terjemahan', icon: Languages, count: null },
        { id: '16_design', label: '16. Luxury Design System', icon: Palette, count: null },
      ],
    },
    {
      title: 'Sistem & Mesin Pencari',
      items: [
        { id: '18_seo', label: '18. SEO & Skema JSON-LD', icon: Search, count: null },
        { id: '20_settings', label: '20. Pengaturan & Cadangan', icon: Settings, count: null },
      ],
    },
  ];

  const filteredGroups = groups
    .map((grp) => ({
      ...grp,
      items: grp.items.filter((item) =>
        item.label.toLowerCase().includes(searchFilter.toLowerCase())
      ),
    }))
    .filter((grp) => grp.items.length > 0);

  return (
    <aside className="w-full md:w-72 bg-charcoal border-r border-hairline flex flex-col shrink-0 h-full overflow-hidden select-none">
      {/* Search Filter Header */}
      <div className="p-3.5 border-b border-hairline">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-softGray" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Cari 20 modul CMS..."
            className="w-full pl-8 pr-7 py-2 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory placeholder:text-softGray/50 focus:outline-none focus:border-gold/60 transition-colors"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-softGray hover:text-ivory"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {filteredGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            <h2 className="px-3 text-[10px] font-sans uppercase tracking-widest text-softGray font-bold">
              {group.title}
            </h2>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sans transition-all text-left ${
                      isActive
                        ? 'bg-gold text-obsidian font-bold shadow-luxury'
                        : 'text-softGray hover:text-ivory hover:bg-obsidian/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        size={15}
                        className={`shrink-0 ${isActive ? 'text-obsidian' : 'text-gold'}`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.count !== null && item.count !== undefined && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-sans font-bold shrink-0 ${
                          isActive
                            ? 'bg-obsidian/20 text-obsidian'
                            : item.alert
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                            : 'bg-obsidian text-softGray border border-hairline'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Meta */}
      <div className="p-3.5 border-t border-hairline bg-obsidian/40 flex items-center justify-between text-[11px] font-sans text-softGray">
        <span className="truncate">Zefanya Executive CMS</span>
        <span className="text-gold font-bold">20 Modul Aktif</span>
      </div>
    </aside>
  );
}
