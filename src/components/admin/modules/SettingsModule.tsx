'use client';

import React, { useRef } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { initialPortfolioData } from '@/data/initialData';
import { Settings, Download, Upload, RotateCcw, ShieldAlert, CheckCircle2, Database } from 'lucide-react';

interface SettingsModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  onSave: () => void;
}

export default function SettingsModule({ data, setData, onSave }: SettingsModuleProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportBackupJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zefanya-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.hero && parsed.profile) {
          setData(parsed);
          alert('Data cadangan berhasil diimpor ke sistem!');
        } else {
          alert('Format berkas JSON tidak sesuai dengan skema portofolio.');
        }
      } catch (err) {
        alert('Gagal membaca berkas JSON.');
      }
    };
    reader.readAsText(file);
  };

  const resetToOfficialCvDefaults = () => {
    if (
      confirm(
        'PERINGATAN: Apakah Anda yakin ingin mereset seluruh data website ke konten awal sesuai CV resmi Zefanya Zulian?'
      )
    ) {
      setData(initialPortfolioData);
      alert('Data telah dikembalikan ke standar awal CV resmi Zefanya Zulian. Silakan klik "Publikasikan Perubahan".');
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-hairline pb-4">
        <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
          <Settings size={14} />
          <span>20. Pengaturan Sistem, Cadangan Data & Pemulihan</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
          Website Settings & Data Management
        </h2>
        <p className="text-xs text-softGray font-sans mt-1">
          Ekspor cadangan basis data lengkap, impor berkas cadangan, atau kembalikan ke setelan awal CV resmi.
        </p>
      </div>

      {/* Backup & Restore Controls */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-6 shadow-luxury-card">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold">
          Cadangan & Pemulihan Data Portofolio (JSON Engine)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-obsidian border border-hairline space-y-3">
            <h4 className="text-sm font-serif font-bold text-ivory">
              1-Click Ekspor Cadangan Lengkap
            </h4>
            <p className="text-xs text-softGray leading-relaxed">
              Unduh salinan penuh seluruh data (profil, pengalaman, proyek, galeri, artikel, dan pengaturan) dalam satu berkas JSON.
            </p>
            <button
              onClick={exportBackupJson}
              className="px-4 py-2 rounded-xl bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-2 hover:bg-ivory transition-all shadow-luxury"
            >
              <Download size={14} />
              <span>Unduh Berkas Cadangan (.JSON)</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-obsidian border border-hairline space-y-3">
            <h4 className="text-sm font-serif font-bold text-ivory">
              Impor Cadangan dari Berkas
            </h4>
            <p className="text-xs text-softGray leading-relaxed">
              Pulihkan data portofolio dari berkas JSON cadangan yang pernah diunduh sebelumnya.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-charcoal border border-hairline hover:border-gold text-xs font-sans font-bold text-ivory hover:text-gold flex items-center gap-2 transition-all"
            >
              <Upload size={14} />
              <span>Pilih Berkas JSON untuk Dipulihkan</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Reset to Seed Defaults */}
      <div className="p-6 rounded-3xl bg-charcoal border border-red-500/30 space-y-4 shadow-luxury-card">
        <div className="flex items-center gap-2 text-xs font-sans text-red-400 uppercase tracking-widest font-bold">
          <ShieldAlert size={14} />
          <span>Zona Pemulihan Standar CV Resmi</span>
        </div>

        <h3 className="text-lg font-serif font-bold text-ivory">
          Kembalikan ke Setelan Awal CV Zefanya Zulian
        </h3>

        <p className="text-xs text-softGray leading-relaxed max-w-2xl">
          Jika terjadi inkonsistensi data, tombol ini akan mengatur ulang seluruh profil, 3 pengalaman kerja utama, kepemimpinan organisasi, pendidikan S.Ikom, sertifikasi resmi, dan pencapaian sesuai data otentik CV Zefanya Zulian.
        </p>

        <button
          onClick={resetToOfficialCvDefaults}
          className="px-4 py-2.5 rounded-xl bg-red-950/60 border border-red-500/50 hover:bg-red-900/60 text-red-200 text-xs font-sans font-bold flex items-center gap-2 transition-all"
        >
          <RotateCcw size={14} />
          <span>Reset ke Standar Resmi CV</span>
        </button>
      </div>
    </div>
  );
}
