'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PortfolioData, ContactSubmission } from '@/types/portfolio';
import { initialPortfolioData } from '@/data/initialData';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

// 20 CMS Modules
import OverviewModule from '@/components/admin/modules/OverviewModule';
import ProfileModule from '@/components/admin/modules/ProfileModule';
import HeroVideoModule from '@/components/admin/modules/HeroVideoModule';
import PageManagerModule from '@/components/admin/modules/PageManagerModule';
import SectionBuilderModule from '@/components/admin/modules/SectionBuilderModule';
import ExperienceModule from '@/components/admin/modules/ExperienceModule';
import ProjectModule from '@/components/admin/modules/ProjectModule';
import LeadershipModule from '@/components/admin/modules/LeadershipModule';
import GalleryModule from '@/components/admin/modules/GalleryModule';
import SkillsModule from '@/components/admin/modules/SkillsModule';
import AchievementModule from '@/components/admin/modules/AchievementModule';
import EducationModule from '@/components/admin/modules/EducationModule';
import JournalModule from '@/components/admin/modules/JournalModule';
import DownloadCenterModule from '@/components/admin/modules/DownloadCenterModule';
import TestimonialModule from '@/components/admin/modules/TestimonialModule';
import TranslationModule from '@/components/admin/modules/TranslationModule';
import InquiryModule from '@/components/admin/modules/InquiryModule';
import DesignModule from '@/components/admin/modules/DesignModule';
import MediaLibraryModule from '@/components/admin/modules/MediaLibraryModule';
import SeoModule from '@/components/admin/modules/SeoModule';
import ActivityLogModule from '@/components/admin/modules/ActivityLogModule';
import SettingsModule from '@/components/admin/modules/SettingsModule';
import ToolsLanguagesModule from '@/components/admin/modules/ToolsLanguagesModule';

import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // CMS state
  const [activeTab, setActiveTab] = useState<string>('01_dashboard');
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [inquiries, setInquiries] = useState<ContactSubmission[]>([]);

  // Check current session
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/admin/auth/session');
        const json = await res.json();
        if (json.authenticated) {
          setIsAuthenticated(true);
          loadPortfolioData();
          loadInquiries();
        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      } catch {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    }
    checkSession();
  }, []);

  const loadPortfolioData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setData(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadInquiries = async () => {
    try {
      const res = await fetch('/api/contact', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.inquiries) {
          setInquiries(json.inquiries);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch inquiries:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsAuthenticated(true);
        loadPortfolioData();
        loadInquiries();
      } else {
        setLoginError(json.error || 'Password salah. Akses ditolak.');
      }
    } catch {
      setLoginError('Terjadi kesalahan jaringan.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSaveMessage({ type: 'success', text: 'Perubahan berhasil disimpan ke live website & basis data!' });
      } else {
        setSaveMessage({ type: 'error', text: json.error || 'Gagal menyimpan data.' });
      }
    } catch {
      setSaveMessage({ type: 'error', text: 'Kesalahan jaringan saat menyimpan.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 5000);
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string, fileName: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.success) {
        onSuccess(json.url, json.fileName);
        alert('File berhasil diunggah!');
      } else {
        alert(json.error || 'Gagal mengunggah file.');
      }
    } catch {
      alert('Error saat mengunggah file.');
    }
  };

  // Login Screen
  if (isAuthenticated === null || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-4 selection:bg-gold selection:text-obsidian">
        <div className="w-full max-w-md p-8 rounded-3xl bg-charcoal border border-hairline shadow-luxury-elevated text-ivory">
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-obsidian border border-gold/40 flex items-center justify-center text-gold shadow-luxury">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-ivory">
              Executive Admin Portal
            </h1>
            <p className="text-xs text-softGray font-sans">
              Panel Manajemen Portofolio & Konten Resmi Zefanya Zulian
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-softGray mb-1.5 font-bold">
                Kredensial Password Administrator
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin..."
                className="w-full px-4 py-3 rounded-xl bg-obsidian border border-hairline text-ivory text-sm focus:border-gold focus:outline-none transition-colors"
              />
              <p className="text-[11px] text-softGray mt-1.5 font-sans">
                Kunci default sistem: <code className="text-gold font-bold">ZefanyaExecutive2026!</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 rounded-xl bg-gold hover:bg-ivory text-obsidian font-sans font-bold uppercase tracking-widest text-xs shadow-luxury transition-all active:scale-98 disabled:opacity-50"
            >
              {loginLoading ? 'Memverifikasi...' : 'Masuk Ke Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-hairline text-center">
            <Link
              href="/"
              className="text-xs font-sans text-softGray hover:text-gold transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft size={13} />
              <span>Kembali ke Website Publik</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const counts = {
    experiences: data.experiences.length,
    projects: data.projects?.length || 0,
    leadership: data.leadership.length,
    competencies: data.competencies.length,
    achievements: data.achievements.length,
    certifications: data.certifications.length,
    articles: data.journal?.length || 0,
    gallery: data.gallery?.length || 0,
    documents: data.documents?.length || 0,
    testimonials: data.testimonials?.length || 0,
    inquiries: inquiries.length,
    logs: data.activityLogs?.length || 0,
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col selection:bg-gold selection:text-obsidian">
      {/* Top Luxury Admin Bar */}
      <AdminHeader
        portraitUrl={data.hero.portraitUrl || '/zefanya-portrait.jpg'}
        isSaving={isSaving}
        saveMessage={saveMessage}
        onSave={handleSave}
        onLogout={handleLogout}
      />

      {/* Main Workspace (Sidebar + Dynamic Module View) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Navigation */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
        />

        {/* Content Panel */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-obsidian">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* 01. Dashboard Ringkasan */}
            {activeTab === '01_dashboard' && (
              <OverviewModule
                data={data}
                inquiriesCount={inquiries.length}
                onNavigate={setActiveTab}
                onPublish={handleSave}
                isSaving={isSaving}
              />
            )}

            {/* 19. Activity Log */}
            {activeTab === '19_activity' && (
              <ActivityLogModule data={data} setData={setData} />
            )}

            {/* 15. Inquiries & Contacts */}
            {activeTab === '15_inquiries' && (
              <InquiryModule inquiries={inquiries} setInquiries={setInquiries} />
            )}

            {/* 02. Profil Eksekutif */}
            {activeTab === '02_profile' && (
              <ProfileModule data={data} setData={setData} />
            )}

            {/* 02. Hero Cover & Video */}
            {activeTab === '02_hero_cover' && (
              <HeroVideoModule data={data} setData={setData} />
            )}

            {/* 08. Kompetensi Inti */}
            {activeTab === '08_skills' && (
              <SkillsModule data={data} setData={setData} />
            )}

            {/* 09. Prestasi & Rekor */}
            {activeTab === '09_achievements' && (
              <AchievementModule data={data} setData={setData} />
            )}

            {/* 10. Pendidikan Akademik */}
            {activeTab === '10_education' && (
              <EducationModule data={data} setData={setData} />
            )}

            {/* 10. Sertifikasi Profesi */}
            {activeTab === '10_certificates' && (
              <EducationModule data={data} setData={setData} />
            )}

            {/* Alat Kerja & Bahasa */}
            {activeTab === 'tools_languages' && (
              <ToolsLanguagesModule data={data} setData={setData} />
            )}

            {/* 05. Pengalaman Kerja */}
            {activeTab === '05_experience' && (
              <ExperienceModule data={data} setData={setData} />
            )}

            {/* 06. Studi Kasus Proyek */}
            {activeTab === '06_projects' && (
              <ProjectModule data={data} setData={setData} />
            )}

            {/* 05. Kepemimpinan Organisasi */}
            {activeTab === '05_leadership' && (
              <LeadershipModule data={data} setData={setData} />
            )}

            {/* 13. Testimoni & Rekomendasi */}
            {activeTab === '13_testimonials' && (
              <TestimonialModule data={data} setData={setData} />
            )}

            {/* 07. Galeri Aktivitas */}
            {activeTab === '07_gallery' && (
              <GalleryModule data={data} setData={setData} />
            )}

            {/* 11. Jurnal & Opini */}
            {activeTab === '11_journal' && (
              <JournalModule data={data} setData={setData} />
            )}

            {/* 12. Berkas & Download Center */}
            {activeTab === '12_downloads' && (
              <DownloadCenterModule data={data} setData={setData} />
            )}

            {/* 17. Media Library */}
            {activeTab === '17_medialib' && (
              <MediaLibraryModule onFileUpload={handleFileUpload} />
            )}

            {/* 03. Manajemen Halaman */}
            {activeTab === '03_pages' && (
              <PageManagerModule />
            )}

            {/* 04. Visual Section Builder */}
            {activeTab === '04_builder' && (
              <SectionBuilderModule data={data} setData={setData} />
            )}

            {/* 14. Matriks Terjemahan */}
            {activeTab === '14_translations' && (
              <TranslationModule data={data} setData={setData} />
            )}

            {/* 16. Luxury Design System */}
            {activeTab === '16_design' && (
              <DesignModule data={data} setData={setData} />
            )}

            {/* 18. SEO & Skema JSON-LD */}
            {activeTab === '18_seo' && (
              <SeoModule data={data} setData={setData} />
            )}

            {/* 20. Pengaturan & Cadangan Data */}
            {activeTab === '20_settings' && (
              <SettingsModule data={data} setData={setData} onSave={handleSave} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
