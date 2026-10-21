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
  Sparkles,
  Check,
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

  // Video presets
  const videoPresets = [
    {
      id: 'jakarta-traffic-night',
      label: 'Kemacetan Jakarta Malam Hari (1080p Local MP4)',
      url: '/videos/jakarta-traffic-night.mp4',
      badge: 'Jakarta Traffic',
    },
    {
      id: 'google-earth-satellite',
      label: 'Google Earth Satellite Orbit View (earth.google.com / NASA 4K ISS)',
      url: '/videos/google-earth-satellite.mp4',
      badge: 'Google Earth 3D',
    },
    {
      id: 'google-earth-orbit',
      label: 'Google Earth Orbital Pass Sweep (NASA 1080p Local MP4)',
      url: '/videos/google-earth-orbit.mp4',
      badge: 'Satellite Sweep',
    },
    {
      id: 'jakarta-highway-4k',
      label: 'Jakarta Highway Traffic 4K Timelapse (Local MP4)',
      url: '/videos/jakarta-highway-timelapse.mp4',
      badge: '4K Timelapse',
    },
    {
      id: 'local-cinematic',
      label: 'Cinematic City Metropolis (Local Fast 1080p)',
      url: '/videos/hero-cinematic.mp4',
      badge: 'Metropolis',
    },
    {
      id: 'local-skylines',
      label: 'Night Skylines & Architecture (Local 1080p)',
      url: '/videos/hero-night-skylines.mp4',
      badge: 'Infrastruktur',
    },
    {
      id: 'pexels-urban-flow',
      label: 'Urban Night Flow (Pexels HD CDN)',
      url: 'https://videos.pexels.com/video-files/856356/856356-hd_1920_1080_25fps.mp4',
      badge: 'HD Online',
    },
    {
      id: 'pexels-corporate-towers',
      label: 'Modern Corporate Towers (Pexels HD CDN)',
      url: 'https://videos.pexels.com/video-files/854671/854671-hd_1920_1080_25fps.mp4',
      badge: 'HD Online',
    },
  ];

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

  // 2. Authenticated Admin Dashboard Workspace with 100% Functional Tabs
  const navTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero & Video Cover', icon: Video },
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
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-crimson shrink-0 bg-obsidian">
            <Image
              src={data.hero.portraitUrl || '/zefanya-portrait.jpg'}
              alt="Zefanya"
              fill
              sizes="36px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <span>Executive CMS</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono">
                ONLINE
              </span>
            </h2>
            <p className="text-[10px] text-platinum-muted font-mono">
              Zefanya Zulian — Operations Executive
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
            Modul Konten (Semua Aktif)
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

                {/* Identity Card */}
                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-24 h-28 sm:w-28 sm:h-36 rounded-xl overflow-hidden border-2 border-crimson shrink-0 shadow-cinematic">
                    <Image
                      src={data.hero.portraitUrl || '/zefanya-portrait.jpg'}
                      alt={data.profile.fullName}
                      fill
                      sizes="120px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="text-xs font-mono text-crimson font-bold uppercase">
                      Portofolio Resmi
                    </span>
                    <h4 className="text-xl font-extrabold text-white">{data.profile.fullName}</h4>
                    <p className="text-xs text-platinum font-medium">{data.profile.professionalTitle.id}</p>
                    <p className="text-xs text-platinum-muted font-mono">{data.profile.location.id}</p>
                    <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span className="px-2.5 py-1 rounded-md bg-obsidian border border-platinum/15 text-[11px] font-mono text-emerald-400">
                        ● Live on Localhost:3000
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-obsidian border border-platinum/15 text-[11px] font-mono text-platinum">
                        Video: {data.hero.videoUrl.split('/').pop()}
                      </span>
                    </div>
                  </div>
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
                  <h4 className="text-base font-bold text-white">Pembaruan Media & Foto</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Portrait Photo Uploader */}
                    <div className="p-4 rounded-xl bg-obsidian border border-platinum/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-platinum font-semibold">Ganti Foto Portrait</span>
                        <Upload className="w-4 h-4 text-crimson" />
                      </div>
                      <p className="text-[11px] text-platinum-muted truncate">File: {data.hero.portraitUrl}</p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => handleFileUpload(e, 'portrait')}
                        className="text-xs text-platinum-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-crimson file:text-white hover:file:bg-crimson-dark cursor-pointer"
                      />
                    </div>

                    {/* CV Uploader */}
                    <div className="p-4 rounded-xl bg-obsidian border border-platinum/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-platinum font-semibold">Ganti File CV (PDF)</span>
                        <FileText className="w-4 h-4 text-crimson" />
                      </div>
                      <p className="text-[11px] text-platinum-muted truncate">File: {data.cv.cvFileName}</p>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileUpload(e, 'cv')}
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
                  <h3 className="text-xl font-bold text-white">Hero Section & Video Background</h3>
                  <p className="text-xs text-platinum-muted mt-1">
                    Pilih video background berkualitas tinggi gratis atau unggah video kustom Anda.
                  </p>
                </div>

                {/* Video Presets Selector */}
                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-crimson" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Preset Footage Sinematik Gratis (1-Click Switch)
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {videoPresets.map((preset) => {
                      const isSelected = data.hero.videoUrl === preset.url;
                      return (
                        <div
                          key={preset.id}
                          onClick={() => setData({ ...data, hero: { ...data.hero, videoUrl: preset.url } })}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-crimson/15 border-crimson shadow-glow-crimson'
                              : 'bg-obsidian border-platinum/10 hover:border-platinum/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-graphite border border-platinum/15 text-platinum-muted">
                              {preset.badge}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-crimson" />}
                          </div>
                          <p className="text-xs font-semibold text-white mt-2">{preset.label}</p>
                          <p className="text-[10px] font-mono text-platinum-muted/60 mt-1 truncate">{preset.url}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-platinum/10">
                    <label className="block text-xs font-mono text-platinum-muted mb-1">
                      Atau Masukkan URL Video Custom (MP4 / WebM):
                    </label>
                    <input
                      type="text"
                      value={data.hero.videoUrl}
                      onChange={(e) => setData({ ...data, hero: { ...data.hero, videoUrl: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-xs font-mono text-warmWhite"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-1">
                      URL Poster Fallback Image (Saat Video Loading):
                    </label>
                    <input
                      type="text"
                      value={data.hero.fallbackPosterUrl}
                      onChange={(e) => setData({ ...data, hero: { ...data.hero, fallbackPosterUrl: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-xs font-mono text-warmWhite"
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
                      className="w-full accent-crimson cursor-pointer"
                    />
                  </div>
                </div>

                {/* Hero Headlines */}
                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Copywriting & Headline
                  </h4>

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
                </div>
              </div>
            )}

            {/* 3. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Profil Eksekutif & Identitas</h3>
                  <p className="text-xs text-platinum-muted mt-1">
                    Kelola nama lengkap, gelar jabatan, lokasi, email, nomor WhatsApp, dan biografi naratif.
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
                    <label className="block text-xs font-mono text-platinum-muted mb-1">Ringkasan Singkat (Short Bio)</label>
                    <textarea
                      rows={3}
                      value={data.profile.shortBio.id}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            shortBio: { ...data.profile.shortBio, id: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                    />
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
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-crimson rounded-lg shadow-glow-crimson"
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

            {/* 5. COMPETENCIES TAB */}
            {activeTab === 'competencies' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Kompetensi Inti ({data.competencies.length})</h3>
                    <p className="text-xs text-platinum-muted mt-1">
                      Kelola daftar 15 kompetensi utama, kategori (operations, procurement, logistics, leadership, strategy).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newComp = {
                        id: `comp-${Date.now()}`,
                        title: { id: 'Kompetensi Baru', en: 'New Competency' },
                        category: 'operations' as const,
                        description: { id: 'Deskripsi kompetensi...', en: 'Description...' },
                        order: data.competencies.length + 1,
                      };
                      setData({ ...data, competencies: [...data.competencies, newComp] });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-crimson rounded-lg shadow-glow-crimson"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Kompetensi</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.competencies.map((comp, idx) => (
                    <div key={comp.id} className="p-4 rounded-xl bg-graphite-surface border border-platinum/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-crimson font-bold uppercase">
                          #{idx + 1} • {comp.category}
                        </span>
                        <button
                          onClick={() => {
                            if (confirm('Hapus kompetensi ini?')) {
                              setData({
                                ...data,
                                competencies: data.competencies.filter((c) => c.id !== comp.id),
                              });
                            }
                          }}
                          className="text-platinum-muted hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-platinum-muted block">Judul Kompetensi (ID)</label>
                        <input
                          type="text"
                          value={comp.title.id}
                          onChange={(e) => {
                            const updated = [...data.competencies];
                            updated[idx].title.id = e.target.value;
                            setData({ ...data, competencies: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-mono text-platinum-muted block">Kategori</label>
                          <select
                            value={comp.category}
                            onChange={(e: any) => {
                              const updated = [...data.competencies];
                              updated[idx].category = e.target.value;
                              setData({ ...data, competencies: updated });
                            }}
                            className="w-full px-2 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-xs text-platinum font-mono"
                          >
                            <option value="operations">operations</option>
                            <option value="procurement">procurement</option>
                            <option value="logistics">logistics</option>
                            <option value="leadership">leadership</option>
                            <option value="strategy">strategy</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-platinum-muted block">Title (EN)</label>
                          <input
                            type="text"
                            value={comp.title.en}
                            onChange={(e) => {
                              const updated = [...data.competencies];
                              updated[idx].title.en = e.target.value;
                              setData({ ...data, competencies: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-platinum-muted block">Deskripsi Ringkas</label>
                        <textarea
                          rows={2}
                          value={comp.description?.id || ''}
                          onChange={(e) => {
                            const updated = [...data.competencies];
                            updated[idx].description = {
                              id: e.target.value,
                              en: updated[idx].description?.en || e.target.value,
                            };
                            setData({ ...data, competencies: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-xs text-platinum-muted"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. LEADERSHIP TAB */}
            {activeTab === 'leadership' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Kepemimpinan Organisasi ({data.leadership.length})</h3>
                    <p className="text-xs text-platinum-muted mt-1">
                      Kelola organisasi kemahasiswaan & kepemudaan (GEMA-RI, BEM UBJ).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newLead = {
                        id: `lead-${Date.now()}`,
                        organization: 'Nama Organisasi',
                        role: { id: 'Jabatan Kepemimpinan', en: 'Leadership Role' },
                        period: '2023 - 2024',
                        location: 'Bekasi',
                        highlights: { id: ['Pencapaian utama...'], en: ['Key achievement...'] },
                        featured: true,
                        order: data.leadership.length + 1,
                      };
                      setData({ ...data, leadership: [...data.leadership, newLead] });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-crimson rounded-lg shadow-glow-crimson"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Kepemimpinan</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.leadership.map((lead, idx) => (
                    <div key={lead.id} className="p-5 rounded-xl bg-graphite-surface border border-platinum/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-crimson">
                          #{idx + 1} • {lead.organization}
                        </span>
                        <button
                          onClick={() => {
                            if (confirm('Hapus entry kepemimpinan ini?')) {
                              setData({
                                ...data,
                                leadership: data.leadership.filter((l) => l.id !== lead.id),
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
                          <label className="text-[11px] font-mono text-platinum-muted block">Nama Organisasi</label>
                          <input
                            type="text"
                            value={lead.organization}
                            onChange={(e) => {
                              const updated = [...data.leadership];
                              updated[idx].organization = e.target.value;
                              setData({ ...data, leadership: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-platinum-muted block">Jabatan (Indonesia)</label>
                          <input
                            type="text"
                            value={lead.role.id}
                            onChange={(e) => {
                              const updated = [...data.leadership];
                              updated[idx].role.id = e.target.value;
                              setData({ ...data, leadership: updated });
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
                            value={lead.period}
                            onChange={(e) => {
                              const updated = [...data.leadership];
                              updated[idx].period = e.target.value;
                              setData({ ...data, leadership: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-platinum-muted block">Lokasi</label>
                          <input
                            type="text"
                            value={lead.location}
                            onChange={(e) => {
                              const updated = [...data.leadership];
                              updated[idx].location = e.target.value;
                              setData({ ...data, leadership: updated });
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

            {/* 7. EDUCATION & CREDENTIALS TAB */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Pendidikan Tinggi & Sertifikasi Profesi</h3>
                  <p className="text-xs text-platinum-muted mt-1">
                    Kelola gelar akademik universitas, IPK, dan 4 lisensi/sertifikasi terverifikasi.
                  </p>
                </div>

                {/* Higher Education */}
                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Pendidikan Formal
                  </h4>
                  {data.education.map((edu, idx) => (
                    <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-platinum-muted block">Gelar Pendidikan</label>
                        <input
                          type="text"
                          value={edu.degree.id}
                          onChange={(e) => {
                            const updated = [...data.education];
                            updated[idx].degree.id = e.target.value;
                            setData({ ...data, education: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-platinum-muted block">Institusi / Universitas</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...data.education];
                            updated[idx].institution = e.target.value;
                            setData({ ...data, education: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-platinum-muted block">IPK (GPA)</label>
                        <input
                          type="text"
                          value={edu.gpa}
                          onChange={(e) => {
                            const updated = [...data.education];
                            updated[idx].gpa = e.target.value;
                            setData({ ...data, education: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-platinum-muted block">Predikat Kelulusan</label>
                        <input
                          type="text"
                          value={edu.distinction.id}
                          onChange={(e) => {
                            const updated = [...data.education];
                            updated[idx].distinction.id = e.target.value;
                            setData({ ...data, education: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm text-emerald-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certifications List */}
                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Sertifikasi Profesi ({data.certifications.length})
                    </h4>
                    <button
                      onClick={() => {
                        const newCert = {
                          id: `cert-${Date.now()}`,
                          name: { id: 'Nama Sertifikasi Baru', en: 'New Certification' },
                          issuer: 'Penerbit Sertifikat',
                          year: '2024',
                          order: data.certifications.length + 1,
                        };
                        setData({ ...data, certifications: [...data.certifications, newCert] });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-crimson rounded-lg shadow-glow-crimson"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Sertifikat</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.certifications.map((cert, idx) => (
                      <div key={cert.id} className="p-3.5 rounded-xl bg-obsidian border border-platinum/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-crimson font-bold">#{idx + 1}</span>
                          <button
                            onClick={() => {
                              if (confirm('Hapus sertifikasi ini?')) {
                                setData({
                                  ...data,
                                  certifications: data.certifications.filter((c) => c.id !== cert.id),
                                });
                              }
                            }}
                            className="text-platinum-muted hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-platinum-muted block">Nama Sertifikat (ID)</label>
                          <input
                            type="text"
                            value={cert.name.id}
                            onChange={(e) => {
                              const updated = [...data.certifications];
                              updated[idx].name.id = e.target.value;
                              setData({ ...data, certifications: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-graphite border border-platinum/15 text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2">
                            <label className="text-[10px] font-mono text-platinum-muted block">Lembaga Penerbit</label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) => {
                                const updated = [...data.certifications];
                                updated[idx].issuer = e.target.value;
                                setData({ ...data, certifications: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-graphite border border-platinum/15 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono text-platinum-muted block">Tahun</label>
                            <input
                              type="text"
                              value={cert.year}
                              onChange={(e) => {
                                const updated = [...data.certifications];
                                updated[idx].year = e.target.value;
                                setData({ ...data, certifications: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-graphite border border-platinum/15 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 8. ACHIEVEMENTS TAB */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Pencapaian Terpilih ({data.achievements.length})</h3>
                    <p className="text-xs text-platinum-muted mt-1">
                      Kelola dampak program vaksinasi (1.100 dosis) dan prestasi kompetitif basket.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newAch = {
                        id: `ach-${Date.now()}`,
                        title: { id: 'Judul Pencapaian Baru', en: 'New Achievement' },
                        year: '2024',
                        metric: '100%',
                        metricLabel: { id: 'Tercapai', en: 'Achieved' },
                        description: { id: 'Deskripsi pencapaian...', en: 'Description...' },
                        order: data.achievements.length + 1,
                      };
                      setData({ ...data, achievements: [...data.achievements, newAch] });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-crimson rounded-lg shadow-glow-crimson"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Pencapaian</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.achievements.map((ach, idx) => (
                    <div key={ach.id} className="p-5 rounded-xl bg-graphite-surface border border-platinum/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-crimson">#{idx + 1} • Tahun {ach.year}</span>
                        <button
                          onClick={() => {
                            if (confirm('Hapus pencapaian ini?')) {
                              setData({
                                ...data,
                                achievements: data.achievements.filter((a) => a.id !== ach.id),
                              });
                            }
                          }}
                          className="text-platinum-muted hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-mono text-platinum-muted block">Judul Pencapaian (ID)</label>
                          <input
                            type="text"
                            value={ach.title.id}
                            onChange={(e) => {
                              const updated = [...data.achievements];
                              updated[idx].title.id = e.target.value;
                              setData({ ...data, achievements: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-sm font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-mono text-platinum-muted block">Tahun</label>
                          <input
                            type="text"
                            value={ach.year}
                            onChange={(e) => {
                              const updated = [...data.achievements];
                              updated[idx].year = e.target.value;
                              setData({ ...data, achievements: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-sm font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono text-platinum-muted block">Angka / Metrik (e.g. 1,100+)</label>
                          <input
                            type="text"
                            value={ach.metric || ''}
                            onChange={(e) => {
                              const updated = [...data.achievements];
                              updated[idx].metric = e.target.value;
                              setData({ ...data, achievements: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-sm text-crimson font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-mono text-platinum-muted block">Label Metrik (ID)</label>
                          <input
                            type="text"
                            value={ach.metricLabel?.id || ''}
                            onChange={(e) => {
                              const updated = [...data.achievements];
                              updated[idx].metricLabel = {
                                id: e.target.value,
                                en: updated[idx].metricLabel?.en || e.target.value,
                              };
                              setData({ ...data, achievements: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-platinum-muted block">Deskripsi Lengkap (ID)</label>
                        <textarea
                          rows={2}
                          value={ach.description.id}
                          onChange={(e) => {
                            const updated = [...data.achievements];
                            updated[idx].description.id = e.target.value;
                            setData({ ...data, achievements: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-obsidian border border-platinum/15 text-xs text-platinum"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. TOOLS & LANGUAGES TAB */}
            {activeTab === 'tools' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Perangkat Kerja & Kompetensi Bahasa</h3>
                  <p className="text-xs text-platinum-muted mt-1">
                    Kelola ekosistem tools operasional (Word, Excel, Photoshop, CapCut) dan kemahiran bahasa.
                  </p>
                </div>

                {/* Tools CRUD */}
                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Daftar Software & Tools ({data.tools.length})
                    </h4>
                    <button
                      onClick={() => {
                        const newTool = {
                          id: `tool-${Date.now()}`,
                          name: 'Perangkat Baru',
                          category: 'office' as const,
                          order: data.tools.length + 1,
                        };
                        setData({ ...data, tools: [...data.tools, newTool] });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-crimson rounded-lg shadow-glow-crimson"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Tool</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.tools.map((tool, idx) => (
                      <div key={tool.id} className="p-3 rounded-xl bg-obsidian border border-platinum/10 flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={tool.name}
                            onChange={(e) => {
                              const updated = [...data.tools];
                              updated[idx].name = e.target.value;
                              setData({ ...data, tools: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-graphite border border-platinum/15 text-xs font-semibold text-white"
                          />
                        </div>
                        <select
                          value={tool.category}
                          onChange={(e: any) => {
                            const updated = [...data.tools];
                            updated[idx].category = e.target.value;
                            setData({ ...data, tools: updated });
                          }}
                          className="px-2 py-1 rounded bg-graphite border border-platinum/15 text-[10px] font-mono text-platinum"
                        >
                          <option value="office">office</option>
                          <option value="reporting">reporting</option>
                          <option value="creative">creative</option>
                          <option value="mobile">mobile</option>
                        </select>
                        <button
                          onClick={() => {
                            setData({ ...data, tools: data.tools.filter((t) => t.id !== tool.id) });
                          }}
                          className="text-platinum-muted hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages CRUD */}
                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Kompetensi Bahasa ({data.languages.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.languages.map((lang, idx) => (
                      <div key={lang.id} className="p-4 rounded-xl bg-obsidian border border-platinum/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{lang.name.id}</span>
                          <span className="text-xs font-mono text-crimson">{lang.badge}</span>
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-platinum-muted block">Nama Bahasa (ID)</label>
                          <input
                            type="text"
                            value={lang.name.id}
                            onChange={(e) => {
                              const updated = [...data.languages];
                              updated[idx].name.id = e.target.value;
                              setData({ ...data, languages: updated });
                            }}
                            className="w-full px-2.5 py-1 rounded bg-graphite border border-platinum/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-platinum-muted block">Tingkat Kemahiran (ID)</label>
                          <input
                            type="text"
                            value={lang.level.id}
                            onChange={(e) => {
                              const updated = [...data.languages];
                              updated[idx].level.id = e.target.value;
                              setData({ ...data, languages: updated });
                            }}
                            className="w-full px-2.5 py-1 rounded bg-graphite border border-platinum/15 text-xs text-platinum-muted"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 10. CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Kontak & Form Kolaborasi</h3>
                  <p className="text-xs text-platinum-muted mt-1">
                    Konfigurasi pesan penutup, email resmi, nomor WhatsApp, LinkedIn, dan status ketersediaan.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-graphite-surface border border-platinum/15 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Headline Penutup (ID)</label>
                      <input
                        type="text"
                        value={data.contact.headline.id}
                        onChange={(e) =>
                          setData({ ...data, contact: { ...data.contact, headline: { ...data.contact.headline, id: e.target.value } } })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Headline Penutup (EN)</label>
                      <input
                        type="text"
                        value={data.contact.headline.en}
                        onChange={(e) =>
                          setData({ ...data, contact: { ...data.contact, headline: { ...data.contact.headline, en: e.target.value } } })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-1">Subheadline Penutup (ID)</label>
                    <textarea
                      rows={2}
                      value={data.contact.subheadline.id}
                      onChange={(e) =>
                        setData({ ...data, contact: { ...data.contact, subheadline: { ...data.contact.subheadline, id: e.target.value } } })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Email Resmi</label>
                      <input
                        type="email"
                        value={data.contact.email}
                        onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-platinum-muted mb-1">Nomor WhatsApp Direct</label>
                      <input
                        type="text"
                        value={data.contact.whatsapp}
                        onChange={(e) => setData({ ...data, contact: { ...data.contact, whatsapp: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-1">URL Profil LinkedIn</label>
                    <input
                      type="text"
                      value={data.contact.linkedinUrl}
                      onChange={(e) => setData({ ...data, contact: { ...data.contact, linkedinUrl: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm font-mono text-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-1">Status Ketersediaan Eksekutif</label>
                    <input
                      type="text"
                      value={data.contact.availabilityStatus.id}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contact: {
                            ...data.contact,
                            availabilityStatus: { id: e.target.value, en: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-obsidian border border-platinum/15 text-sm text-emerald-400 font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 11. INQUIRIES TAB */}
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
                        <div className="pt-2 flex justify-end">
                          <a
                            href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || 'Executive Discussion')}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono text-white bg-crimson rounded-lg hover:bg-crimson-dark"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Balas Email</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 12. THEME & SEO TAB */}
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
