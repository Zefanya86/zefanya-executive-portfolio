'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Save,
  Eye,
  LogOut,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  Globe,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';

interface AdminHeaderProps {
  portraitUrl: string;
  isSaving: boolean;
  saveMessage: { type: 'success' | 'error'; text: string } | null;
  onSave: () => void;
  onLogout: () => void;
  hasUnsavedChanges?: boolean;
}

export default function AdminHeader({
  portraitUrl,
  isSaving,
  saveMessage,
  onSave,
  onLogout,
  hasUnsavedChanges = false,
}: AdminHeaderProps) {
  const [wibTime, setWibTime] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setWibTime(new Intl.DateTimeFormat('id-ID', options).format(now) + ' WIB');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const previewLinks = [
    { label: 'Beranda Publik (/)', href: '/' },
    { label: 'Profil Eksekutif (/about)', href: '/about' },
    { label: 'Rekam Jejak Karir (/experience)', href: '/experience' },
    { label: 'Studi Kasus Proyek (/projects)', href: '/projects' },
    { label: 'Galeri Aktivitas (/gallery)', href: '/gallery' },
    { label: 'Jurnal & Opini (/journal)', href: '/journal' },
    { label: 'Pusat Unduhan Dokumen (/download)', href: '/download' },
    { label: 'Kartu Nama Digital (/card)', href: '/card' },
    { label: 'Kontak & Kemitraan (/contact)', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-charcoal/95 backdrop-blur-md border-b border-hairline px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Left: Brand & Portrait */}
      <div className="flex items-center gap-3.5">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/60 shrink-0 bg-obsidian shadow-luxury">
          <Image
            src={portraitUrl || '/zefanya-portrait.jpg'}
            alt="Zefanya Zulian"
            fill
            sizes="40px"
            className="object-cover object-top filter contrast-105"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-serif font-bold text-ivory tracking-wide flex items-center gap-1.5">
              <span>Zefanya Zulian</span>
              <span className="text-gold font-sans font-normal text-xs">• Executive CMS</span>
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-sans font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-softGray font-sans">
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-gold" />
              <span>{wibTime || 'Jakarta, WIB'}</span>
            </span>
            <span className="hidden sm:inline text-hairline">•</span>
            <span className="hidden sm:inline text-softGray/80">
              Modern Business Leader CMS v2.0
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {saveMessage && (
          <span
            className={`hidden md:inline-flex text-xs px-3 py-1 rounded-full font-sans font-medium transition-all ${
              saveMessage.type === 'success'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                : 'bg-red-950 text-red-300 border border-red-500/30'
            }`}
          >
            {saveMessage.text}
          </span>
        )}

        {/* Publish Changes Button */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider rounded-full shadow-luxury transition-all active:scale-95 disabled:opacity-50 ${
            hasUnsavedChanges
              ? 'bg-gold hover:bg-ivory text-obsidian ring-2 ring-gold/40'
              : 'bg-gold/90 hover:bg-gold text-obsidian'
          }`}
        >
          {isSaving ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save size={13} />
              <span>Publikasikan Perubahan</span>
            </>
          )}
        </button>

        {/* Preview Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-sans text-ivory bg-obsidian hover:border-gold/50 border border-hairline rounded-full transition-all"
          >
            <Eye size={13} className="text-gold" />
            <span className="hidden sm:inline">Pratinjau Halaman</span>
            <ChevronDown size={12} className={`transition-transform ${isPreviewOpen ? 'rotate-180' : ''}`} />
          </button>

          {isPreviewOpen && (
            <div
              className="absolute right-0 mt-2 w-64 rounded-2xl bg-charcoal border border-hairline shadow-luxury-elevated py-2 z-50 text-xs font-sans"
              onClick={() => setIsPreviewOpen(false)}
            >
              <div className="px-4 py-1.5 text-[10px] font-sans uppercase tracking-widest text-softGray font-bold border-b border-hairline">
                Pilih Halaman Publik
              </div>
              {previewLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  className="flex items-center justify-between px-4 py-2 hover:bg-obsidian hover:text-gold text-ivory transition-colors"
                >
                  <span>{link.label}</span>
                  <ExternalLink size={11} className="text-softGray" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="p-2 text-softGray hover:text-ivory hover:bg-obsidian border border-transparent hover:border-hairline rounded-full transition-all"
          title="Keluar dari Admin Portal"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
