'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Copy, Check, Image as ImageIcon, ExternalLink, Sparkles } from 'lucide-react';

interface MediaLibraryModuleProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (url: string, name: string) => void) => void;
}

export default function MediaLibraryModule({ onFileUpload }: MediaLibraryModuleProps) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const defaultMediaAssets = [
    {
      name: 'Foto Potret Resmi Zefanya Zulian (Official Portrait)',
      url: '/zefanya-portrait.jpg',
      category: 'Portrait Identity',
      dimensions: 'Focal Point Adjusted',
    },
    {
      name: 'CV Zefanya Zulian (Bahasa Indonesia PDF)',
      url: '/CV_Zefanya_Zulian.pdf',
      category: 'Official Documents',
      dimensions: 'Vector PDF',
    },
    {
      name: 'CV Zefanya Zulian (English Version PDF)',
      url: '/CV_Zefanya_Zulian_English.pdf',
      category: 'Official Documents',
      dimensions: 'Vector PDF',
    },
    {
      name: 'Bayah Mineral Flow Transport (Operational Backdrop)',
      url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop',
      category: 'Project Context',
      dimensions: '1600 x 900',
    },
    {
      name: 'Bridge Construction Project Kalimantan (Infrastructure)',
      url: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=1600&auto=format&fit=crop',
      category: 'Infrastructure',
      dimensions: '1600 x 900',
    },
    {
      name: 'Video Logistik Jembatan Maritim Kalimantan — Pulau Laut (4K MP4)',
      url: '/videos/hero-cinematic.mp4',
      category: 'Cinematic Video Reel',
      dimensions: '4K UHD 60fps · 01:15',
    },
    {
      name: 'Video Hauling Armada Mineral Bayah Banten (1080p MP4)',
      url: '/videos/jakarta-logistics-flow.mp4',
      category: 'Cinematic Video Reel',
      dimensions: '1080p 60fps · 01:30',
    },
    {
      name: 'Video Manajemen Korporat & Eksekutif (1080p MP4)',
      url: '/videos/hero-night-skylines.mp4',
      category: 'Cinematic Video Reel',
      dimensions: '1080p HD · 00:58',
    },
    {
      name: 'Video Kepemimpinan Organisasi & Mahasiswa (1080p MP4)',
      url: '/videos/jakarta-traffic-night.mp4',
      category: 'Cinematic Video Reel',
      dimensions: '1080p HD · 01:10',
    },
    {
      name: 'Corporate Executive Headquarters (Bekasi)',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
      category: 'Corporate',
      dimensions: '1600 x 900',
    },
  ];

  const copyUrl = (url: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2500);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <ImageIcon size={14} />
            <span>17. Media Library & Manajemen Aset Digital</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Media Assets & Storage Engine
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Unggah foto portrait beresolusi tinggi, berkas PDF resmi, dan salin URL aset langsung ke clipboard.
          </p>
        </div>

        {/* Upload Button */}
        <label className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury cursor-pointer">
          <Upload size={14} />
          <span>Unggah Berkas Baru</span>
          <input
            type="file"
            className="hidden"
            onChange={(e) =>
              onFileUpload(e, (url, name) => {
                alert(`File berhasil diunggah: ${name}`);
              })
            }
          />
        </label>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultMediaAssets.map((asset, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-charcoal border border-hairline space-y-3 hover:border-gold/50 transition-all shadow-luxury-card flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 rounded-xl overflow-hidden bg-obsidian border border-hairline mb-3">
                {asset.url.endsWith('.pdf') ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <span className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 font-bold flex items-center justify-center text-sm font-mono mb-2">
                      PDF
                    </span>
                    <p className="text-xs font-sans font-bold text-ivory line-clamp-1">{asset.name}</p>
                  </div>
                ) : (
                  <Image
                    src={asset.url}
                    alt={asset.name}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-obsidian text-gold border border-gold/30 uppercase">
                  {asset.category}
                </span>
                <p className="text-xs font-serif font-bold text-ivory line-clamp-1 mt-1">
                  {asset.name}
                </p>
                <p className="text-[10px] font-mono text-softGray truncate">
                  {asset.url}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => copyUrl(asset.url)}
                className="px-3 py-1.5 rounded-lg bg-obsidian border border-hairline hover:border-gold text-xs font-sans text-ivory hover:text-gold flex items-center gap-1.5 transition-colors"
              >
                {copiedUrl === asset.url ? (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Salin URL</span>
                  </>
                )}
              </button>

              <a
                href={asset.url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-softGray hover:text-ivory"
                title="Buka Langsung"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
