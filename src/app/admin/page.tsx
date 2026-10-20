'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PortfolioData } from '@/types/portfolio';
import { initialPortfolioData } from '@/data/initialData';
import {
  Shield,
  Lock,
  LogOut,
  Save,
  ExternalLink,
  LayoutDashboard,
  Video,
  User,
  Briefcase,
  Layers,
  Award,
  GraduationCap,
  Trophy,
  Wrench,
  Mail,
  Palette,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  Trash2,
  Eye,
  RefreshCw,
  MessageSquare,
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // CMS state
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);

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
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      console.error('Failed to load portfolio in admin:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadInquiries = async () => {
    try {
      const res = await fetch('/api/contact');
      const json = await res.json();
      if (json.inquiries) {
        setInquiries(json.inquiries);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

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
        setLoginError(json.error || 'Password salah.');
      }
    } catch {
      setLoginError('Terjadi kesalahan jaringan.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setPassword('');
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
        setSaveMessage({ type: 'success', text: 'Perubahan berhasil disimpan dan dipublikasikan secara persisten!' });
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

  // Upload helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
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
        if (targetField === 'portrait') {
          setData({
            ...data,
            hero: { ...data.hero, portraitUrl: json.url },
          });
        } else if (targetField === 'video') {
          setData({
            ...data,
            hero: { ...data.hero, videoUrl: json.url },
          });
        } else if (targetField === 'cv') {
          setData({
            ...data,
            cv: {
              ...data.cv,
              cvPdfUrl: json.url,
              cvFileName: json.fileName,
              lastUpdated: new Date().toISOString().split('T')[0],
            },
          });
        }
        alert('File berhasil diunggah!');
      } else {
        alert(json.error || 'Gagal mengunggah file.');
      }
    } catch (err) {
      alert('Error saat mengunggah file.');
    }
  };

  // 1. If checking auth or not authenticated: Render Login Screen
  if (isAuthenticated === null || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-graphite-surface border border-platinum/15 shadow-cinematic text-warmWhite">
          <div className="text-center space-y-3 mb-8">
            <div className="w-12 h-12 mx-auto rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson shadow-glow-crimson">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Executive Admin Portal</h1>
            <p className="text-xs text-platinum-muted">
              Panel Manajemen Portofolio & Konten Resmi Zefanya Zulian
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-crimson/15 border border-crimson/30 text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-crimson-light" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-platinum-muted mb-1.5">
                Kredensial Password Administrator
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin..."
                className="w-full px-4 py-3 rounded-xl bg-obsidian border border-platinum/20 text-white text-sm focus:border-crimson focus:outline-none transition"
              />
              <p className="text-[11px] text-platinum-muted/60 mt-1 font-mono">
                Default setup: <code className="text-crimson">ZefanyaExecutive2026!</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-semibold text-sm shadow-glow-crimson transition active:scale-98 disabled:opacity-50"
            >
              {loginLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-platinum/10 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-platinum-muted hover:text-white transition inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Kembali ke Website Publik</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard Workspace
  const navTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero & Media', icon: Video },
    { id: 'profile', label: 'Profil Eksekutif', icon: User },
    { id: 'experiences', label: 'Pengalaman Kerja', icon: Briefcase },
    { id: 'competencies', label: 'Kompetensi (15)', icon: Layers },
    { id: 'leadership', label: 'Kepemimpinan', icon: Award },
    { id: 'education', label: 'Pendidikan & Lisensi', icon: GraduationCap },
    { id: 'achievements', label: 'Pencapaian', icon: Trophy },
    { id: 'tools', label: 'Tools & Bahasa', icon: Wrench },
    { id: 'contact', label: 'Kontak & Form', icon: Mail },
    { id: 'inquiries', label: `Pesan Masuk (${inquiries.length})`, icon: MessageSquare },
    { id: 'theme_seo', label: 'Tema & SEO', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-warmWhite flex flex-col">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-graphite border-b border-platinum/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-crimson/15 text-crimson border border-crimson/30">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <span>CMS Admin</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono">
                ONLINE
              </span>
            </h2>
            <p className="text-[10px] text-platinum-muted font-mono">
              Zefanya Zulian Executive Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {saveMessage && (
            <span
              className={`text-xs px-3 py-1 rounded-md font-mono ${
                saveMessage.type === 'success'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                  : 'bg-red-900/60 text-red-300 border border-red-500/30'
              }`}
            >
              {saveMessage.text}
            </span>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-crimson hover:bg-crimson-light rounded-lg shadow-glow-crimson transition active:scale-95 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-platinum bg-graphite-surface hover:text-white border border-platinum/15 rounded-lg transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 text-platinum-muted hover:text-white hover:bg-graphite-surface rounded-lg transition"
            title="Keluar"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-graphite-surface border-r border-platinum/10 p-3 md:p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
          <div className="hidden md:block text-[11px] font-mono uppercase tracking-widest text-platinum-muted px-3 py-2">
            Modul Konten
          </div>
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-crimson text-white font-semibold shadow-glow-crimson'
                    : 'text-platinum-muted hover:text-warmWhite hover:bg-graphite'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Panel Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-obsidian">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Ringkasan Sistem & Status Publikasi</h3>
                  <p className="text-xs text-platinum-muted mt-1">
                    Status terkini data, video hero, file CV, dan metrik publikasi portofolio.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-graphite-surface border border-platinum/10">
                    <span className="text-xs font-mono text-platinum-muted uppercase block">Status Portofolio</span>
                    <span className="text-xl font-bold text-emerald-400 mt-1 block">Telah Dipublikasikan</span>
                    <span className="text-[11px] text-platinum-muted font-mono mt-1 block">Live & Accessible</span>
                  </div>

                  <div className="p-5 rounded-xl bg-graphite-surface border border-platinum/10">
                    <span className="text-xs font-mono text-platinum-muted uppercase block">Status Dokumen CV</span>
                    <span className="text-xl font-bold text-warmWhite mt-1 block">Tersedia (PDF)</span>
                    <span className="text-[11px] text-platinum-muted font-mono mt-1 block">{data.cv.cvFileName}</span>
                  </div>

                  <div className="p-5 rounded-xl bg-graphite-surface border border-platinum/10">
                    <span className="text-xs font-mono text-platinum-muted uppercase block">Pesan Inquiries</span>
                    <span className="text-xl font-bold text-crimson mt-1 block">{inquiries.length} Pesan Masuk</span>
                    <span className="text-[11px] text-platinum-muted font-mono mt-1 block">Real-time Form Logs</span>
                  </div>
                </div>

                {/* Quick File Update Actions */}
                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <h4 className="text-base font-bold text-white">Pembaruan Media Cepat</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* CV Uploader */}
                    <div className="p-4 rounded-xl bg-obsidian border border-platinum/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-platinum font-semibold">Ganti File CV (PDF)</span>
                        <FileText className="w-4 h-4 text-crimson" />
                      </div>
                      <p className="text-[11px] text-platinum-muted">File saat ini: {data.cv.cvFileName}</p>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileUpload(e, 'cv')}
                        className="text-xs text-platinum-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-crimson file:text-white hover:file:bg-crimson-dark cursor-pointer"
                      />
                    </div>

                    {/* Portrait Photo Uploader */}
                    <div className="p-4 rounded-xl bg-obsidian border border-platinum/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-platinum font-semibold">Ganti Foto Portrait</span>
                        <Upload className="w-4 h-4 text-crimson" />
                      </div>
                      <p className="text-[11px] text-platinum-muted">File saat ini: {data.hero.portraitUrl}</p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => handleFileUpload(e, 'portrait')}
                        className="text-xs text-platinum-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-crimson file:text-white hover:file:bg-crimson-dark cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. HERO TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Hero Section & Video Cover</h3>
                  <p className="text-xs text-platinum-muted mt-1">
                    Konfigurasi teks bilingual, video cover sinematik, poster fallback, dan posisi portrait.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Eyebrow (Indonesia)</label>
                      <input
                        type="text"
                        value={data.hero.eyebrow.id}
                        onChange={(e) =>
                          setData({ ...data, hero: { ...data.hero, eyebrow: { ...data.hero.eyebrow, id: e.target.value } } })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Eyebrow (English)</label>
                      <input
                        type="text"
                        value={data.hero.eyebrow.en}
                        onChange={(e) =>
                          setData({ ...data, hero: { ...data.hero, eyebrow: { ...data.hero.eyebrow, en: e.target.value } } })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Headline Baris 1 (ID)</label>
                      <input
                        type="text"
                        value={data.hero.headlineLine1.id}
                        onChange={(e) =>
                          setData({ ...data, hero: { ...data.hero, headlineLine1: { ...data.hero.headlineLine1, id: e.target.value } } })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Headline Baris 1 (EN)</label>
                      <input
                        type="text"
                        value={data.hero.headlineLine1.en}
                        onChange={(e) =>
                          setData({ ...data, hero: { ...data.hero, headlineLine1: { ...data.hero.headlineLine1, en: e.target.value } } })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Headline Baris 2 (ID)</label>
                      <input
                        type="text"
                        value={data.hero.headlineLine2.id}
                        onChange={(e) =>
                          setData({ ...data, hero: { ...data.hero, headlineLine2: { ...data.hero.headlineLine2, id: e.target.value } } })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-bold text-crimson"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Headline Baris 2 (EN)</label>
                      <input
                        type="text"
                        value={data.hero.headlineLine2.en}
                        onChange={(e) =>
                          setData({ ...data, hero: { ...data.hero, headlineLine2: { ...data.hero.headlineLine2, en: e.target.value } } })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-bold text-crimson"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-1">Subheadline (Indonesia)</label>
                    <textarea
                      rows={2}
                      value={data.hero.subheadline.id}
                      onChange={(e) =>
                        setData({ ...data, hero: { ...data.hero, subheadline: { ...data.hero.subheadline, id: e.target.value } } })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-1">Subheadline (English)</label>
                    <textarea
                      rows={2}
                      value={data.hero.subheadline.en}
                      onChange={(e) =>
                        setData({ ...data, hero: { ...data.hero, subheadline: { ...data.hero.subheadline, en: e.target.value } } })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                    />
                  </div>

                  {/* Video & Poster Config */}
                  <div className="pt-4 border-t border-platinum/10 space-y-4">
                    <h5 className="text-sm font-bold text-white">Video Background & Poster</h5>
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">URL Video Background (MP4)</label>
                      <input
                        type="text"
                        value={data.hero.videoUrl}
                        onChange={(e) => setData({ ...data, hero: { ...data.hero, videoUrl: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">URL Poster Fallback Image</label>
                      <input
                        type="text"
                        value={data.hero.fallbackPosterUrl}
                        onChange={(e) => setData({ ...data, hero: { ...data.hero, fallbackPosterUrl: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">
                        Dark Overlay Opacity: {data.hero.overlayOpacity}
                      </label>
                      <input
                        type="range"
                        min="0.3"
                        max="0.95"
                        step="0.02"
                        value={data.hero.overlayOpacity}
                        onChange={(e) => setData({ ...data, hero: { ...data.hero, overlayOpacity: parseFloat(e.target.value) } })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Profil Profesional & Kontak</h3>
                  <p className="text-xs text-platinum-muted mt-1">
                    Kelola nama lengkap, gelar jabatan, lokasi, email, nomor WhatsApp, dan biografi.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={data.profile.fullName}
                        onChange={(e) => setData({ ...data, profile: { ...data.profile, fullName: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Jabatan Profesional</label>
                      <input
                        type="text"
                        value={data.profile.professionalTitle.id}
                        onChange={(e) =>
                          setData({
                            ...data,
                            profile: {
                              ...data.profile,
                              professionalTitle: { id: e.target.value, en: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Email Resmi</label>
                      <input
                        type="email"
                        value={data.profile.email}
                        onChange={(e) => setData({ ...data, profile: { ...data.profile, email: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Telepon</label>
                      <input
                        type="text"
                        value={data.profile.phone}
                        onChange={(e) => setData({ ...data, profile: { ...data.profile, phone: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">WhatsApp (Format: 628...)</label>
                      <input
                        type="text"
                        value={data.profile.whatsappNumber}
                        onChange={(e) => setData({ ...data, profile: { ...data.profile, whatsappNumber: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-1">Biografi Lengkap (Indonesia)</label>
                    <textarea
                      rows={6}
                      value={data.profile.fullBio.id}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            fullBio: { ...data.profile.fullBio, id: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-1">Biografi Lengkap (English)</label>
                    <textarea
                      rows={6}
                      value={data.profile.fullBio.en}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            fullBio: { ...data.profile.fullBio, en: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. EXPERIENCES TAB */}
            {activeTab === 'experiences' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Pengalaman Kerja & Manajemen Proyek</h3>
                    <p className="text-xs text-platinum-muted mt-1">
                      Kelola daftar perusahaan, peran, periode, dan tanggung jawab.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newExp = {
                        id: `exp-${Date.now()}`,
                        company: 'Nama Perusahaan Baru',
                        role: { id: 'Jabatan', en: 'Role' },
                        period: '2026',
                        location: 'Bekasi, Indonesia',
                        projectContext: { id: 'Konteks Proyek', en: 'Project Context' },
                        responsibilities: { id: ['Tanggung jawab utama...'], en: ['Key responsibility...'] },
                        featured: true,
                        order: data.experiences.length + 1,
                      };
                      setData({ ...data, experiences: [...data.experiences, newExp] });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-crimson rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Posisi</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.experiences.map((exp, idx) => (
                    <div key={exp.id} className="p-5 rounded-xl bg-graphite-surface border border-platinum/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-crimson">#{idx + 1} • {exp.period}</span>
                        <button
                          onClick={() => {
                            if (confirm('Hapus pengalaman ini?')) {
                              setData({
                                ...data,
                                experiences: data.experiences.filter((e) => e.id !== exp.id),
                              });
                            }
                          }}
                          className="text-platinum-muted hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono text-platinum-muted block">Nama Perusahaan</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...data.experiences];
                              updated[idx].company = e.target.value;
                              setData({ ...data, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-platinum-muted block">Jabatan (Indonesia)</label>
                          <input
                            type="text"
                            value={exp.role.id}
                            onChange={(e) => {
                              const updated = [...data.experiences];
                              updated[idx].role.id = e.target.value;
                              setData({ ...data, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono text-platinum-muted block">Periode</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => {
                              const updated = [...data.experiences];
                              updated[idx].period = e.target.value;
                              setData({ ...data, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-platinum-muted block">Lokasi</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => {
                              const updated = [...data.experiences];
                              updated[idx].location = e.target.value;
                              setData({ ...data, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Daftar Pesan Masuk (Executive Inquiries)</h3>
                  <p className="text-xs text-platinum-muted mt-1">
                    Pesan yang dikirimkan oleh recruiter dan mitra bisnis melalui form kontak publik.
                  </p>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-graphite-surface border border-platinum/10 text-center text-platinum-muted">
                    <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-medium">Belum ada pesan baru.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((inq: any) => (
                      <div
                        key={inq.id}
                        className="p-5 rounded-xl bg-graphite-surface border border-platinum/10 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs text-platinum-muted">
                          <span className="font-mono text-crimson font-bold">{inq.name}</span>
                          <span className="font-mono">{new Date(inq.receivedAt).toLocaleString()}</span>
                        </div>
                        <p className="text-xs font-mono text-platinum">{inq.email}</p>
                        <p className="text-xs text-warmWhite font-semibold">{inq.subject}</p>
                        <p className="text-xs text-platinum-muted bg-obsidian p-3 rounded-lg border border-platinum/10">
                          {inq.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 6. THEME & SEO TAB */}
            {activeTab === 'theme_seo' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Pengaturan Desain & SEO</h3>
                  <p className="text-xs text-platinum-muted mt-1">
                    Konfigurasi warna aksen, engine 3D, dan metadata pencarian Google.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-obsidian border border-platinum/10">
                    <div>
                      <span className="text-sm font-bold text-white block">Aktifkan 3D Three.js Engine</span>
                      <span className="text-xs text-platinum-muted block">
                        Renders the 3D Monolith signature element on desktop and supported devices.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={data.theme.enable3D}
                      onChange={(e) => setData({ ...data, theme: { ...data.theme, enable3D: e.target.checked } })}
                      className="w-5 h-5 accent-crimson cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-1">Warna Aksen Crimson</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={data.theme.primaryAccent}
                        onChange={(e) => setData({ ...data, theme: { ...data.theme, primaryAccent: e.target.value } })}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-platinum/20"
                      />
                      <span className="text-xs font-mono text-platinum">{data.theme.primaryAccent}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-platinum/10 space-y-3">
                    <h5 className="text-sm font-bold text-white">SEO Meta Tags</h5>
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Meta Title</label>
                      <input
                        type="text"
                        value={data.seo.metaTitle.id}
                        onChange={(e) =>
                          setData({
                            ...data,
                            seo: { ...data.seo, metaTitle: { id: e.target.value, en: e.target.value } },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Meta Description</label>
                      <textarea
                        rows={3}
                        value={data.seo.metaDescription.id}
                        onChange={(e) =>
                          setData({
                            ...data,
                            seo: { ...data.seo, metaDescription: { id: e.target.value, en: e.target.value } },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
