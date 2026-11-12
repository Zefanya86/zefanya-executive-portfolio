'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { PortfolioData, GalleryAlbum, MediaItem, GalleryCategory, PrivacyStatus } from '@/types/portfolio';
import {
  Camera,
  Plus,
  Trash2,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Eye,
  Film,
  Play,
  Video,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  FileVideo,
  Layers
} from 'lucide-react';

interface GalleryModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function GalleryModule({ data, setData }: GalleryModuleProps) {
  const albums = data.gallery || [];
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(albums[0]?.id || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // File input refs
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const replaceItemInputRef = useRef<HTMLInputElement>(null);
  const posterItemInputRef = useRef<HTMLInputElement>(null);
  const [activeReplaceIndex, setActiveReplaceIndex] = useState<number | null>(null);
  const [activePosterIndex, setActivePosterIndex] = useState<number | null>(null);

  const currentAlbum = albums.find((a) => a.id === selectedAlbumId) || albums[0];

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 5000);
  };

  const updateAlbum = (id: string, updates: Partial<GalleryAlbum>) => {
    setData((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).map((album) =>
        album.id === id ? { ...album, ...updates } : album
      ),
    }));
  };

  const addAlbum = () => {
    const newId = `album_${Date.now()}`;
    const newAlbum: GalleryAlbum = {
      id: newId,
      slug: `album-aktivitas-${Date.now()}`,
      title: {
        id: 'Album Dokumentasi Operasional Baru',
        en: 'New Operational Documentation Album',
        zh: '新增现场作业纪实图集',
      },
      description: {
        id: 'Dokumentasi aktivitas manajerial dan pemantauan lapangan.',
        en: 'Managerial activity and on-site inspection visual log.',
        zh: '现场管理与巡检作业实录。',
      },
      coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?q=80&w=1200&auto=format&fit=crop',
      date: '2025–2026',
      location: 'Indonesia',
      category: 'operations',
      privacyStatus: 'public',
      items: [],
      order: albums.length + 1,
    };

    setData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), newAlbum],
    }));
    setSelectedAlbumId(newId);
    showToast('Album baru berhasil ditambahkan! Silakan unggah foto dan video ke album ini.');
  };

  const deleteAlbum = (id: string) => {
    if (confirm('Hapus album dokumentasi visual ini beserta seluruh kontennya?')) {
      const remaining = albums.filter((a) => a.id !== id);
      setData((prev) => ({
        ...prev,
        gallery: remaining,
      }));
      if (selectedAlbumId === id && remaining.length > 0) {
        setSelectedAlbumId(remaining[0].id);
      }
      showToast('Album berhasil dihapus.');
    }
  };

  // Upload helper to serverless/API
  const uploadSingleFile = async (file: File): Promise<{ url: string; fileName: string; mimeType: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || `Gagal mengunggah ${file.name}`);
    }
    return json;
  };

  const cleanNameForTitle = (filename: string) => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    return nameWithoutExt
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Direct Photo Upload (Multiple supported)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !currentAlbum) return;

    setIsUploading(true);
    const newItems: MediaItem[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgressText(`Mengunggah foto ${i + 1} dari ${files.length} (${file.name})...`);
        const res = await uploadSingleFile(file);
        const titleStr = cleanNameForTitle(file.name);

        newItems.push({
          id: `media_${Date.now()}_${i}`,
          type: 'image',
          url: res.url,
          title: { id: titleStr, en: titleStr, zh: titleStr },
          caption: {
            id: `Dokumentasi visual foto kegiatan: ${titleStr}`,
            en: `Visual documentation photo: ${titleStr}`,
            zh: `现场活动纪实照片：${titleStr}`,
          },
          alt: { id: titleStr, en: titleStr, zh: titleStr },
          focalPoint: '50% 50%',
        });
      }

      updateAlbum(currentAlbum.id, {
        items: [...currentAlbum.items, ...newItems],
      });

      showToast(`Sukses! ${files.length} foto berhasil diunggah langsung ke album.`);
    } catch (err: any) {
      showToast(err.message || 'Gagal mengunggah foto.', 'error');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
      if (photoInputRef.current) photoInputRef.current.value = '';
    }
  };

  // Direct Video Upload (Multiple or Single)
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !currentAlbum) return;

    setIsUploading(true);
    const newItems: MediaItem[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
        setUploadProgressText(`Mengunggah video ${i + 1} dari ${files.length} (${file.name} - ${fileSizeMB} MB)...`);
        
        const res = await uploadSingleFile(file);
        const titleStr = cleanNameForTitle(file.name);

        newItems.push({
          id: `media_${Date.now()}_${i}`,
          type: 'video',
          url: res.url,
          videoUrl: res.url,
          posterUrl: currentAlbum.coverImage || '/preview-hero-cinematic.jpg',
          duration: '01:00',
          resolution: '1080p HD',
          title: { id: titleStr, en: titleStr, zh: titleStr },
          caption: {
            id: `Rekaman video sinematik lapangan: ${titleStr}`,
            en: `Cinematic field operational video: ${titleStr}`,
            zh: `现场高清视频纪实：${titleStr}`,
          },
          alt: { id: titleStr, en: titleStr, zh: titleStr },
          focalPoint: '50% 50%',
        });
      }

      updateAlbum(currentAlbum.id, {
        items: [...currentAlbum.items, ...newItems],
      });

      showToast(`Sukses! ${files.length} rekaman video berhasil diunggah langsung ke album.`);
    } catch (err: any) {
      showToast(err.message || 'Gagal mengunggah video.', 'error');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
      if (videoInputRef.current) videoInputRef.current.value = '';
    }
  };

  // Drag and Drop files (both image and video)
  const handleDropFiles = async (files: FileList) => {
    if (!files || files.length === 0 || !currentAlbum) return;

    setIsUploading(true);
    const newItems: MediaItem[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|m4v|mkv)$/i);
        setUploadProgressText(`Mengunggah ${isVideo ? 'video' : 'foto'} ${i + 1} dari ${files.length}...`);

        const res = await uploadSingleFile(file);
        const titleStr = cleanNameForTitle(file.name);

        if (isVideo) {
          newItems.push({
            id: `media_${Date.now()}_${i}`,
            type: 'video',
            url: res.url,
            videoUrl: res.url,
            posterUrl: currentAlbum.coverImage || '/preview-hero-cinematic.jpg',
            duration: '01:00',
            resolution: '1080p HD',
            title: { id: titleStr, en: titleStr, zh: titleStr },
            caption: {
              id: `Rekaman video dokumentasi lapangan: ${titleStr}`,
              en: `Field operational video log: ${titleStr}`,
              zh: `现场作业视频：${titleStr}`,
            },
            alt: { id: titleStr, en: titleStr, zh: titleStr },
            focalPoint: '50% 50%',
          });
        } else {
          newItems.push({
            id: `media_${Date.now()}_${i}`,
            type: 'image',
            url: res.url,
            title: { id: titleStr, en: titleStr, zh: titleStr },
            caption: {
              id: `Dokumentasi foto kegiatan: ${titleStr}`,
              en: `Activity photo documentation: ${titleStr}`,
              zh: `活动纪实照片：${titleStr}`,
            },
            alt: { id: titleStr, en: titleStr, zh: titleStr },
            focalPoint: '50% 50%',
          });
        }
      }

      updateAlbum(currentAlbum.id, {
        items: [...currentAlbum.items, ...newItems],
      });

      showToast(`Sukses! ${files.length} berkas berhasil diunggah langsung ke album.`);
    } catch (err: any) {
      showToast(err.message || 'Gagal memproses berkas drag & drop.', 'error');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
    }
  };

  // Upload Album Cover
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentAlbum) return;

    setIsUploadingCover(true);
    try {
      const res = await uploadSingleFile(file);
      updateAlbum(currentAlbum.id, { coverImage: res.url });
      showToast('Foto sampul album berhasil diperbarui!');
    } catch (err: any) {
      showToast(err.message || 'Gagal mengunggah foto sampul.', 'error');
    } finally {
      setIsUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = '';
    }
  };

  // Replace existing item media
  const handleReplaceItemMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentAlbum || activeReplaceIndex === null) return;

    setIsUploading(true);
    try {
      setUploadProgressText(`Mengganti media dengan ${file.name}...`);
      const res = await uploadSingleFile(file);
      const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|m4v|mkv)$/i);

      const items = [...currentAlbum.items];
      if (isVideo) {
        items[activeReplaceIndex] = {
          ...items[activeReplaceIndex],
          type: 'video',
          url: res.url,
          videoUrl: res.url,
        };
      } else {
        items[activeReplaceIndex] = {
          ...items[activeReplaceIndex],
          type: 'image',
          url: res.url,
        };
      }

      updateAlbum(currentAlbum.id, { items });
      showToast('Media berhasil diganti dengan berkas baru!');
    } catch (err: any) {
      showToast(err.message || 'Gagal mengganti media.', 'error');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
      setActiveReplaceIndex(null);
      if (replaceItemInputRef.current) replaceItemInputRef.current.value = '';
    }
  };

  // Upload Custom Poster for Video
  const handleUploadPoster = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentAlbum || activePosterIndex === null) return;

    setIsUploading(true);
    try {
      setUploadProgressText(`Mengunggah gambar poster thumbnail...`);
      const res = await uploadSingleFile(file);

      const items = [...currentAlbum.items];
      items[activePosterIndex] = {
        ...items[activePosterIndex],
        posterUrl: res.url,
      };

      updateAlbum(currentAlbum.id, { items });
      showToast('Thumbnail poster video berhasil diperbarui!');
    } catch (err: any) {
      showToast(err.message || 'Gagal mengunggah poster.', 'error');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
      setActivePosterIndex(null);
      if (posterItemInputRef.current) posterItemInputRef.current.value = '';
    }
  };

  // Fallback manual URL placeholders
  const addManualPhotoPlaceholder = () => {
    if (!currentAlbum) return;
    const newMedia: MediaItem = {
      id: `media_${Date.now()}`,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      title: { id: 'Foto Kegiatan Baru', en: 'New Activity Photo', zh: '新增活动照片' },
      caption: { id: 'Keterangan dokumentasi kegiatan.', en: 'Activity documentation caption.', zh: '现场活动说明。' },
      alt: { id: 'Dokumentasi operasional', en: 'Operational documentation', zh: '现场实录' },
      focalPoint: '50% 50%',
    };

    updateAlbum(currentAlbum.id, {
      items: [...currentAlbum.items, newMedia],
    });
    showToast('Item foto dengan URL manual berhasil ditambahkan.');
  };

  const addManualVideoPlaceholder = () => {
    if (!currentAlbum) return;
    const newVideoMedia: MediaItem = {
      id: `media_${Date.now()}`,
      type: 'video',
      url: '/videos/hero-cinematic.mp4',
      videoUrl: '/videos/hero-cinematic.mp4',
      posterUrl: '/preview-hero-cinematic.jpg',
      duration: '01:15',
      resolution: '4K UHD 60fps',
      title: { id: 'Video Dokumentasi Lapangan Baru', en: 'New Field Video Documentation', zh: '新增现场纪实视频' },
      caption: { id: 'Keterangan rekaman operasional lapangan.', en: 'Operational field recording caption.', zh: '现场作业录像说明。' },
      alt: { id: 'Dokumentasi video operasional', en: 'Operational video documentation', zh: '现场视频实录' },
      focalPoint: '50% 50%',
    };

    updateAlbum(currentAlbum.id, {
      items: [...currentAlbum.items, newVideoMedia],
    });
    showToast('Item video dengan URL manual berhasil ditambahkan.');
  };

  return (
    <div className="space-y-8">
      {/* Hidden File Inputs */}
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handlePhotoUpload}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/*"
        multiple
        className="hidden"
        onChange={handleVideoUpload}
      />
      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCoverUpload}
      />
      <input
        ref={replaceItemInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleReplaceItemMedia}
      />
      <input
        ref={posterItemInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUploadPoster}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl border shadow-luxury flex items-center gap-3 animate-fadeIn ${
            toastMessage.type === 'success'
              ? 'bg-charcoal border-gold/50 text-ivory'
              : 'bg-red-950/90 border-red-500/50 text-red-100'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span className="text-xs font-sans font-medium">{toastMessage.text}</span>
        </div>
      )}

      {/* Uploading Overlay / Banner */}
      {isUploading && (
        <div className="p-4 rounded-2xl bg-gold/15 border border-gold/50 text-ivory flex items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-gold animate-spin" />
            <div>
              <p className="text-xs font-sans font-bold text-gold uppercase tracking-wider">
                Proses Pengunggahan Konten Berlangsung
              </p>
              <p className="text-xs font-sans text-ivory">{uploadProgressText || 'Sedang memproses dan mengunggah ke server...'}</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-gold px-2.5 py-1 rounded bg-obsidian border border-gold/30">
            MOHON TUNGGU
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <Camera size={14} />
            <span>07. Galeri Aktivitas Eksekutif & Dokumentasi Lapangan</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Activity Gallery & Visual Documentation
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Unggah langsung berkas video lapangan (.mp4, .mov, .webm) dan foto dokumen dari komputer/perangkat Anda.
          </p>
        </div>

        <button
          onClick={addAlbum}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury shrink-0"
        >
          <Plus size={14} />
          <span>Tambah Album Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Album List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-sans uppercase tracking-widest text-softGray font-bold">
              Daftar Album ({albums.length})
            </p>
            <span className="text-[10px] text-gold font-sans font-semibold">Pilih untuk sunting</span>
          </div>

          <div className="space-y-2">
            {albums.map((album) => {
              const isSelected = album.id === currentAlbum?.id;
              const videoCount = (album.items || []).filter(
                (it) => it.type === 'video' || it.videoUrl || it.url?.endsWith('.mp4')
              ).length;
              const photoCount = (album.items || []).length - videoCount;

              return (
                <div
                  key={album.id}
                  onClick={() => setSelectedAlbumId(album.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-charcoal border-gold shadow-luxury'
                      : 'bg-obsidian border-hairline hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-gold uppercase tracking-wider">
                      {album.category}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-softGray">
                      {photoCount > 0 && <span>{photoCount} Foto</span>}
                      {videoCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded bg-gold/20 text-gold border border-gold/30">
                          {videoCount} Video
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-serif font-bold text-ivory line-clamp-1 mt-1.5">
                    {album.title.id}
                  </p>
                  <p className="text-[11px] text-softGray font-sans truncate mt-0.5">
                    {album.location} • {album.date}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Album Detail Editor (8 Cols) */}
        {currentAlbum && (
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-charcoal border border-hairline space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div>
                <span className="text-[10px] font-sans text-gold uppercase tracking-widest font-bold">
                  Editing Active Album
                </span>
                <h3 className="text-lg font-serif font-bold text-ivory mt-0.5">
                  <span className="text-gold">{currentAlbum.title.id}</span>
                </h3>
              </div>
              <button
                onClick={() => deleteAlbum(currentAlbum.id)}
                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500/50 bg-red-950/20 transition-colors"
              >
                <Trash2 size={13} />
                <span>Hapus Album</span>
              </button>
            </div>

            {/* Album Metadata Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Judul Album (Bahasa Indonesia)
                </label>
                <input
                  type="text"
                  value={currentAlbum.title.id}
                  onChange={(e) =>
                    updateAlbum(currentAlbum.id, {
                      title: { ...currentAlbum.title, id: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Kategori Album
                </label>
                <select
                  value={currentAlbum.category}
                  onChange={(e) => updateAlbum(currentAlbum.id, { category: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold focus:outline-none"
                >
                  <option value="corporate">Corporate & Enterprise</option>
                  <option value="operations">Operations & Field Management</option>
                  <option value="procurement">Procurement & Material Flow</option>
                  <option value="infrastructure">Infrastructure & Engineering</option>
                  <option value="leadership">Leadership & Public Governance</option>
                  <option value="government">Government & Civic Relations</option>
                  <option value="events">Events & Assemblies</option>
                  <option value="achievements">Achievements & Milestones</option>
                  <option value="networking">Professional Networking</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Lokasi Operasional / Kegiatan
                </label>
                <input
                  type="text"
                  value={currentAlbum.location}
                  onChange={(e) => updateAlbum(currentAlbum.id, { location: e.target.value })}
                  placeholder="Misal: Kalimantan Selatan / Cilegon / Jakarta"
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Tanggal / Periode
                </label>
                <input
                  type="text"
                  value={currentAlbum.date}
                  onChange={(e) => updateAlbum(currentAlbum.id, { date: e.target.value })}
                  placeholder="Misal: 2025–2026 atau Q3 2025"
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Deskripsi Singkat Album
                </label>
                <textarea
                  rows={2}
                  value={currentAlbum.description.id}
                  onChange={(e) =>
                    updateAlbum(currentAlbum.id, {
                      description: { ...currentAlbum.description, id: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Album Cover Photo (With Direct Upload) */}
            <div className="pt-4 border-t border-hairline space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                  Foto Sampul Album (Cover Image)
                </label>
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={isUploadingCover}
                  className="px-3.5 py-1.5 rounded-full bg-gold/20 hover:bg-gold text-gold hover:text-obsidian border border-gold/40 text-xs font-sans font-bold flex items-center gap-1.5 transition-all shadow-luxury"
                >
                  {isUploadingCover ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                  <span>{isUploadingCover ? 'Mengunggah Sampul...' : 'Unggah Foto Sampul Langsung'}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-obsidian border border-hairline shrink-0">
                  {currentAlbum.coverImage ? (
                    <Image
                      src={currentAlbum.coverImage}
                      alt="Cover Preview"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-softGray text-xs font-sans">
                      Belum ada sampul
                    </div>
                  )}
                </div>

                <div className="w-full space-y-1.5">
                  <span className="text-[10px] text-softGray font-sans block">
                    URL File Sampul (otomatis terisi saat unggah, atau masukkan URL eksternal):
                  </span>
                  <input
                    type="text"
                    value={currentAlbum.coverImage}
                    onChange={(e) => updateAlbum(currentAlbum.id, { coverImage: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold focus:outline-none"
                    placeholder="/uploads/nama-file.jpg atau https://..."
                  />
                  <p className="text-[10px] text-softGray font-sans">
                    Format yang disarankan: JPG, WEBP, atau PNG rasio 16:9 beresolusi tajam.
                  </p>
                </div>
              </div>
            </div>

            {/* Media Items in Album (Photos & Videos) */}
            <div className="pt-4 border-t border-hairline space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="text-xs font-sans text-ivory font-bold uppercase tracking-wider block">
                    Koleksi Konten Media Dalam Album ({currentAlbum.items.length} Berkas)
                  </label>
                  <span className="text-[11px] text-softGray font-sans">
                    Bisa unggah foto dalam jumlah banyak sekaligus atau video durasi panjang.
                  </span>
                </div>

                {/* Primary Upload Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-3.5 py-1.5 rounded-full bg-gold text-obsidian hover:bg-ivory text-xs font-sans font-bold flex items-center gap-1.5 transition-all shadow-luxury"
                    title="Pilih satu atau beberapa foto dari komputer Anda"
                  >
                    <Upload size={13} />
                    <span>Unggah Foto Langsung</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-3.5 py-1.5 rounded-full bg-charcoal text-gold border border-gold hover:bg-gold hover:text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 transition-all shadow-luxury"
                    title="Pilih rekaman video (.mp4, .mov, .webm) dari komputer Anda"
                  >
                    <Film size={13} />
                    <span>Unggah Video Langsung</span>
                  </button>
                </div>
              </div>

              {/* Drag and Drop Upload Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files) {
                    handleDropFiles(e.dataTransfer.files);
                  }
                }}
                className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-2 ${
                  isDragging
                    ? 'border-gold bg-gold/15 scale-[1.01]'
                    : 'border-hairline bg-obsidian/60 hover:border-gold/40'
                }`}
              >
                <div className="flex items-center gap-3 text-gold">
                  <ImageIcon size={20} />
                  <span className="text-hairline">|</span>
                  <Film size={20} />
                </div>
                <p className="text-xs font-sans font-bold text-ivory">
                  Tarik & Lepas (Drag & Drop) Berkas Foto atau Video ke Sini
                </p>
                <p className="text-[11px] text-softGray font-sans">
                  Mendukung berkas foto (JPG, PNG, WEBP, HEIC) dan video lapangan (MP4, MOV, WEBM) hingga 100MB per berkas.
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <button
                    type="button"
                    onClick={addManualPhotoPlaceholder}
                    className="text-[10px] text-softGray hover:text-gold font-sans underline"
                  >
                    + Tambah URL Foto Eksternal
                  </button>
                  <span className="text-[10px] text-softGray">•</span>
                  <button
                    type="button"
                    onClick={addManualVideoPlaceholder}
                    className="text-[10px] text-softGray hover:text-gold font-sans underline"
                  >
                    + Tambah URL Video Eksternal
                  </button>
                </div>
              </div>

              {/* Media Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentAlbum.items.map((media, mIdx) => {
                  const isVideo =
                    media.type === 'video' ||
                    Boolean(media.videoUrl) ||
                    media.url?.endsWith('.mp4') ||
                    media.url?.endsWith('.webm') ||
                    media.url?.endsWith('.mov');

                  const mediaSource = media.videoUrl || media.url;

                  return (
                    <div
                      key={media.id || mIdx}
                      className="p-4 rounded-2xl bg-obsidian border border-hairline space-y-3.5 relative group/item hover:border-gold/50 transition-all shadow-luxury-card flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Header card badge & type switcher */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                              isVideo
                                ? 'bg-gold/20 text-gold border border-gold/40'
                                : 'bg-charcoal text-softGray border border-hairline'
                            }`}
                          >
                            {isVideo ? <Film size={11} /> : <ImageIcon size={11} />}
                            <span>{isVideo ? 'VIDEO LAPANGAN' : 'FOTO DOKUMEN'}</span>
                          </span>

                          <select
                            value={isVideo ? 'video' : 'image'}
                            onChange={(e) => {
                              const items = [...currentAlbum.items];
                              const newType = e.target.value as 'image' | 'video';
                              items[mIdx].type = newType;
                              if (newType === 'video' && !items[mIdx].videoUrl) {
                                items[mIdx].videoUrl = items[mIdx].url;
                              }
                              updateAlbum(currentAlbum.id, { items });
                            }}
                            className="px-2 py-0.5 rounded bg-charcoal border border-hairline text-[10px] text-softGray focus:border-gold"
                          >
                            <option value="image">Format Foto</option>
                            <option value="video">Format Video</option>
                          </select>
                        </div>

                        {/* Preview Box */}
                        <div className="relative h-36 rounded-xl overflow-hidden bg-charcoal border border-hairline flex items-center justify-center">
                          {isVideo ? (
                            mediaSource?.endsWith('.mp4') || mediaSource?.endsWith('.webm') || mediaSource?.startsWith('/uploads') || mediaSource?.startsWith('/api/uploads') ? (
                              <div className="relative w-full h-full bg-black">
                                <video
                                  src={mediaSource}
                                  poster={media.posterUrl || currentAlbum.coverImage}
                                  controls={false}
                                  muted
                                  playsInline
                                  className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-obsidian/30 flex items-center justify-center">
                                  <div className="w-10 h-10 rounded-full bg-gold/90 text-obsidian flex items-center justify-center shadow-lg">
                                    <Play size={18} className="fill-current translate-x-0.5" />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-black/60">
                                <Play size={24} className="text-gold mb-1" />
                                <span className="text-[10px] font-mono text-softGray truncate max-w-full">
                                  {mediaSource}
                                </span>
                              </div>
                            )
                          ) : (
                            <Image
                              src={media.url || 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?q=80&w=1200'}
                              alt="Thumbnail"
                              fill
                              sizes="300px"
                              className="object-cover"
                            />
                          )}

                          {/* Quick Replace Media Overlay Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveReplaceIndex(mIdx);
                              replaceItemInputRef.current?.click();
                            }}
                            className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-obsidian/85 hover:bg-gold hover:text-obsidian text-ivory text-[10px] font-sans font-bold flex items-center gap-1 border border-hairline transition-all shadow-md backdrop-blur-sm"
                            title="Ganti berkas ini dengan mengunggah berkas baru dari komputer"
                          >
                            <Upload size={11} />
                            <span>Ganti Berkas</span>
                          </button>
                        </div>

                        {/* Title & Caption */}
                        <div>
                          <label className="text-[10px] text-softGray font-sans font-semibold block mb-1">
                            Judul / Label Konten:
                          </label>
                          <input
                            type="text"
                            placeholder="Judul dokumentasi..."
                            value={media.title?.id || ''}
                            onChange={(e) => {
                              const items = [...currentAlbum.items];
                              const newTitle = e.target.value;
                              items[mIdx].title = { id: newTitle, en: newTitle, zh: newTitle };
                              items[mIdx].alt = { id: newTitle, en: newTitle, zh: newTitle };
                              updateAlbum(currentAlbum.id, { items });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-charcoal border border-hairline text-xs text-ivory focus:border-gold focus:outline-none"
                          />
                        </div>

                        {/* Video-Specific Controls */}
                        {isVideo ? (
                          <div className="space-y-2 p-2.5 rounded-xl bg-charcoal/60 border border-gold/20">
                            <div>
                              <span className="text-[10px] text-gold font-sans font-bold block mb-1">
                                URL Video Lapangan:
                              </span>
                              <input
                                type="text"
                                placeholder="/uploads/video.mp4 atau URL..."
                                value={media.videoUrl || media.url}
                                onChange={(e) => {
                                  const items = [...currentAlbum.items];
                                  items[mIdx].videoUrl = e.target.value;
                                  items[mIdx].url = e.target.value;
                                  updateAlbum(currentAlbum.id, { items });
                                }}
                                className="w-full px-2 py-1 rounded-lg bg-obsidian border border-hairline text-[10px] font-mono text-ivory focus:border-gold focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] text-softGray font-sans">
                                    Poster Thumbnail:
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActivePosterIndex(mIdx);
                                      posterItemInputRef.current?.click();
                                    }}
                                    className="text-[9px] text-gold hover:underline"
                                  >
                                    Unggah
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  placeholder="/poster.jpg..."
                                  value={media.posterUrl || ''}
                                  onChange={(e) => {
                                    const items = [...currentAlbum.items];
                                    items[mIdx].posterUrl = e.target.value;
                                    updateAlbum(currentAlbum.id, { items });
                                  }}
                                  className="w-full px-2 py-1 rounded-lg bg-obsidian border border-hairline text-[10px] font-mono text-ivory focus:border-gold"
                                />
                              </div>

                              <div>
                                <span className="text-[10px] text-softGray font-sans block mb-1">
                                  Durasi & Resolusi:
                                </span>
                                <input
                                  type="text"
                                  placeholder="01:15 · 4K UHD"
                                  value={media.duration || ''}
                                  onChange={(e) => {
                                    const items = [...currentAlbum.items];
                                    items[mIdx].duration = e.target.value;
                                    updateAlbum(currentAlbum.id, { items });
                                  }}
                                  className="w-full px-2 py-1 rounded-lg bg-obsidian border border-hairline text-[10px] text-ivory focus:border-gold"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[10px] text-softGray font-sans block mb-1">
                              URL Berkas Foto:
                            </span>
                            <input
                              type="text"
                              placeholder="/uploads/foto.jpg atau URL..."
                              value={media.url}
                              onChange={(e) => {
                                const items = [...currentAlbum.items];
                                items[mIdx].url = e.target.value;
                                updateAlbum(currentAlbum.id, { items });
                              }}
                              className="w-full px-2 py-1 rounded-lg bg-charcoal border border-hairline text-[10px] font-mono text-ivory focus:border-gold focus:outline-none"
                            />
                          </div>
                        )}

                        <div>
                          <span className="text-[10px] text-softGray font-sans block mb-1">
                            Keterangan / Caption Kegiatan:
                          </span>
                          <input
                            type="text"
                            placeholder="Keterangan singkat dokumentasi..."
                            value={media.caption?.id || ''}
                            onChange={(e) => {
                              const items = [...currentAlbum.items];
                              const newCaption = e.target.value;
                              items[mIdx].caption = { id: newCaption, en: newCaption, zh: newCaption };
                              updateAlbum(currentAlbum.id, { items });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-charcoal border border-hairline text-xs text-ivory focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2.5 border-t border-hairline flex items-center justify-between text-xs">
                        <span className="text-[10px] text-softGray font-mono">
                          ID: {media.id}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Hapus media ini dari album?')) {
                              const items = currentAlbum.items.filter((_, i) => i !== mIdx);
                              updateAlbum(currentAlbum.id, { items });
                              showToast('Media berhasil dihapus dari album.');
                            }
                          }}
                          className="text-red-400 hover:text-red-300 text-[11px] flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={12} />
                          <span>Hapus Item</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentAlbum.items.length === 0 && (
                <div className="p-8 rounded-2xl bg-obsidian border border-hairline text-center space-y-2">
                  <Camera size={28} className="mx-auto text-gold opacity-60" />
                  <p className="text-xs font-serif font-bold text-ivory">Belum ada foto atau video dalam album ini</p>
                  <p className="text-[11px] text-softGray font-sans max-w-sm mx-auto">
                    Gunakan tombol "Unggah Foto Langsung" atau "Unggah Video Langsung" di atas untuk menambahkan dokumentasi pertama Anda.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
