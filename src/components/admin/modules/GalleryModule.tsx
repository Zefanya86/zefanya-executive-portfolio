'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PortfolioData, GalleryAlbum, MediaItem, GalleryCategory, PrivacyStatus } from '@/types/portfolio';
import { Camera, Plus, Trash2, MapPin, Calendar, Image as ImageIcon, Eye, Film, Play, Video } from 'lucide-react';

interface GalleryModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function GalleryModule({ data, setData }: GalleryModuleProps) {
  const albums = data.gallery || [];
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(albums[0]?.id || '');

  const currentAlbum = albums.find((a) => a.id === selectedAlbumId) || albums[0];

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
  };

  const deleteAlbum = (id: string) => {
    if (confirm('Hapus album dokumentasi visual ini?')) {
      const remaining = albums.filter((a) => a.id !== id);
      setData((prev) => ({
        ...prev,
        gallery: remaining,
      }));
      if (selectedAlbumId === id && remaining.length > 0) {
        setSelectedAlbumId(remaining[0].id);
      }
    }
  };

  const addPhotoToAlbum = () => {
    if (!currentAlbum) return;
    const newMedia: MediaItem = {
      id: `media_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      title: { id: 'Foto Kegiatan Baru', en: 'New Activity Photo', zh: '新增活动照片' },
      caption: { id: 'Keterangan dokumentasi kegiatan.', en: 'Activity documentation caption.', zh: '现场活动说明。' },
      alt: { id: 'Dokumentasi operasional', en: 'Operational documentation', zh: '现场实录' },
      focalPoint: '50% 50%',
    };

    updateAlbum(currentAlbum.id, {
      items: [...currentAlbum.items, newMedia],
    });
  };

  const addVideoToAlbum = () => {
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
  };

  return (
    <div className="space-y-8">
      {/* Title */}
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
            Kelola album foto, kategori (Corporate, Operations, Infrastructure, Leadership, dll.), dan focal point tampilan.
          </p>
        </div>

        <button
          onClick={addAlbum}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
        >
          <Plus size={14} />
          <span>Tambah Album</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Album List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-sans uppercase tracking-widest text-softGray font-bold px-1">
            Daftar Album ({albums.length})
          </p>

          <div className="space-y-2">
            {albums.map((album, idx) => {
              const isSelected = album.id === currentAlbum?.id;
              return (
                <div
                  key={album.id}
                  onClick={() => setSelectedAlbumId(album.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-charcoal border-gold shadow-luxury'
                      : 'bg-obsidian border-hairline hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-gold uppercase">
                      {album.category}
                    </span>
                    <span className="text-[10px] font-mono text-softGray">
                      {album.items.length} Foto
                    </span>
                  </div>
                  <p className="text-xs font-serif font-bold text-ivory line-clamp-1 mt-1">
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
              <h3 className="text-lg font-serif font-bold text-ivory">
                Sunting Album: <span className="text-gold">{currentAlbum.title.id}</span>
              </h3>
              <button
                onClick={() => deleteAlbum(currentAlbum.id)}
                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
              >
                <Trash2 size={13} />
                <span>Hapus Album</span>
              </button>
            </div>

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
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Kategori
                </label>
                <select
                  value={currentAlbum.category}
                  onChange={(e) => updateAlbum(currentAlbum.id, { category: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
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
                  Lokasi
                </label>
                <input
                  type="text"
                  value={currentAlbum.location}
                  onChange={(e) => updateAlbum(currentAlbum.id, { location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="pt-4 border-t border-hairline space-y-2">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Foto Sampul Album
              </label>
              <input
                type="text"
                value={currentAlbum.coverImage}
                onChange={(e) => updateAlbum(currentAlbum.id, { coverImage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
              />
            </div>

            {/* Media Items in Album (Photos & Videos) */}
            <div className="pt-4 border-t border-hairline space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                  Koleksi Media Dalam Album ({currentAlbum.items.length} Foto & Video)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={addPhotoToAlbum}
                    className="px-3 py-1 rounded-full bg-obsidian text-softGray hover:text-ivory border border-hairline text-xs font-sans font-bold hover:border-gold/40 transition-colors flex items-center gap-1.5"
                  >
                    <ImageIcon size={12} />
                    <span>+ Tambah Foto</span>
                  </button>
                  <button
                    type="button"
                    onClick={addVideoToAlbum}
                    className="px-3.5 py-1 rounded-full bg-gold/20 text-gold border border-gold/50 text-xs font-sans font-bold hover:bg-gold hover:text-obsidian transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(197,164,119,0.2)]"
                  >
                    <Film size={12} />
                    <span>+ Tambah Video</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentAlbum.items.map((media, mIdx) => {
                  const isVideo =
                    media.type === 'video' ||
                    Boolean(media.videoUrl) ||
                    media.url?.endsWith('.mp4') ||
                    media.url?.endsWith('.webm');

                  return (
                    <div
                      key={media.id || mIdx}
                      className="p-3.5 rounded-2xl bg-obsidian border border-hairline space-y-3 relative group/item"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-1 ${
                            isVideo
                              ? 'bg-gold/20 text-gold border border-gold/40'
                              : 'bg-charcoal text-softGray border border-hairline'
                          }`}
                        >
                          {isVideo ? <Film size={10} /> : <ImageIcon size={10} />}
                          <span>{isVideo ? 'VIDEO LAPANGAN' : 'FOTO DOKUMEN'}</span>
                        </span>

                        <select
                          value={isVideo ? 'video' : 'image'}
                          onChange={(e) => {
                            const items = [...currentAlbum.items];
                            items[mIdx].type = e.target.value as 'image' | 'video';
                            updateAlbum(currentAlbum.id, { items });
                          }}
                          className="px-2 py-0.5 rounded bg-charcoal border border-hairline text-[10px] text-softGray"
                        >
                          <option value="image">Format Foto</option>
                          <option value="video">Format Video</option>
                        </select>
                      </div>

                      <div className="relative h-28 rounded-xl overflow-hidden bg-charcoal border border-hairline flex items-center justify-center">
                        <Image
                          src={media.posterUrl || media.url}
                          alt="Thumbnail"
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                        {isVideo && (
                          <div className="absolute inset-0 bg-obsidian/40 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-gold/90 text-obsidian flex items-center justify-center shadow-lg">
                              <Play size={18} className="fill-current translate-x-0.5" />
                            </div>
                          </div>
                        )}
                      </div>

                      {isVideo ? (
                        <div className="space-y-2">
                          <div>
                            <span className="text-[10px] text-gold font-sans font-bold block mb-1">
                              URL File Video (.mp4 / .webm / YouTube / Vimeo):
                            </span>
                            <input
                              type="text"
                              placeholder="/videos/nama-video.mp4..."
                              value={media.videoUrl || media.url}
                              onChange={(e) => {
                                const items = [...currentAlbum.items];
                                items[mIdx].videoUrl = e.target.value;
                                items[mIdx].url = e.target.value;
                                updateAlbum(currentAlbum.id, { items });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-charcoal border border-gold/30 text-[11px] font-mono text-ivory"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-[10px] text-softGray font-sans block mb-1">
                                Poster Thumbnail:
                              </span>
                              <input
                                type="text"
                                placeholder="/preview.jpg..."
                                value={media.posterUrl || ''}
                                onChange={(e) => {
                                  const items = [...currentAlbum.items];
                                  items[mIdx].posterUrl = e.target.value;
                                  updateAlbum(currentAlbum.id, { items });
                                }}
                                className="w-full px-2 py-1 rounded-lg bg-charcoal border border-hairline text-[10px] font-mono text-ivory"
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
                                className="w-full px-2 py-1 rounded-lg bg-charcoal border border-hairline text-[10px] text-ivory"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span className="text-[10px] text-softGray font-sans block mb-1">
                            URL Gambar:
                          </span>
                          <input
                            type="text"
                            placeholder="URL Foto..."
                            value={media.url}
                            onChange={(e) => {
                              const items = [...currentAlbum.items];
                              items[mIdx].url = e.target.value;
                              updateAlbum(currentAlbum.id, { items });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-charcoal border border-hairline text-[11px] font-mono text-ivory"
                          />
                        </div>
                      )}

                      <div>
                        <span className="text-[10px] text-softGray font-sans block mb-1">
                          Keterangan / Caption:
                        </span>
                        <input
                          type="text"
                          placeholder="Keterangan dokumentasi..."
                          value={media.caption?.id || ''}
                          onChange={(e) => {
                            const items = [...currentAlbum.items];
                            items[mIdx].caption = { ...items[mIdx].caption, id: e.target.value } as any;
                            updateAlbum(currentAlbum.id, { items });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-charcoal border border-hairline text-[11px] text-ivory"
                        />
                      </div>

                      <div className="pt-2 border-t border-hairline flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            const items = currentAlbum.items.filter((_, i) => i !== mIdx);
                            updateAlbum(currentAlbum.id, { items });
                          }}
                          className="text-red-400 hover:text-red-300 text-[10px] flex items-center gap-1"
                        >
                          <Trash2 size={11} />
                          <span>Hapus Item</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
