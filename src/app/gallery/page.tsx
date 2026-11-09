'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  Camera,
  MapPin,
  Calendar,
  Building,
  Maximize2,
  Filter,
  ShieldCheck,
  ChevronRight,
  Eye,
  Play,
  Film,
  Layers,
  Sparkles,
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { GalleryAlbum, GalleryCategory, MediaItem } from '@/types/portfolio';
import LuxuryVideoPlayer from '@/components/ui/LuxuryVideoPlayer';

interface FeaturedReel {
  id: string;
  title: { id: string; en: string; zh: string };
  subtitle: { id: string; en: string; zh: string };
  src: string;
  poster: string;
  duration: string;
  resolution: string;
  tag: string;
}

export default function GalleryPage() {
  const { data, locale, t, openLightbox } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'video' | 'image'>('all');
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);

  // Featured Executive Video Reels
  const featuredReels: FeaturedReel[] = [
    {
      id: 'reel-bridge',
      title: {
        id: 'Logistik Jembatan Maritim Kalimantan — Pulau Laut',
        en: 'Maritime Bridge Logistics: Kalimantan – Laut Island',
        zh: '加里曼丹—劳特岛特大跨海大桥物资供应链'
      },
      subtitle: {
        id: 'PT. Asri – Praya, KSO · Pengadaan Beton Tahan Korosi & Jalur Tongkang Selat',
        en: 'PT. Asri – Praya, KSO · Marine Concrete Procurement & Inter-Island Barging',
        zh: 'PT. Asri – Praya, KSO · 高性能耐腐蚀水泥钢构采购与海峡驳船联运调度'
      },
      src: '/videos/hero-cinematic.mp4',
      poster: '/preview-hero-cinematic.jpg',
      duration: '01:15',
      resolution: '4K UHD 60fps',
      tag: '🔥 FLAGSHIP WORK'
    },
    {
      id: 'reel-bayah',
      title: {
        id: 'Hauling Armada Berat & Transit Mineral Bayah',
        en: 'Bayah Mineral Flow Transport Fleet Hauling',
        zh: '巴亚赫矿产大宗物流车队全流程现场调度'
      },
      subtitle: {
        id: 'PT. Mahaputra Baruna Logistik · Monitoring Jalur Pesisir Banten & Zero Downtime',
        en: 'PT. Mahaputra Baruna Logistik · Banten Coastal Route Haulage & HSE Compliance',
        zh: 'PT. Mahaputra Baruna Logistik · 万丹沿海干线高强度运输安全点检与零停机'
      },
      src: '/videos/jakarta-logistics-flow.mp4',
      poster: '/videos/jakarta-logistics-flow-poster.jpg',
      duration: '01:30',
      resolution: '1080p 60fps',
      tag: 'MINERAL TRANSPORT'
    },
    {
      id: 'reel-leadership',
      title: {
        id: 'Kepemimpinan Mahasiswa & Dialog Kelembagaan',
        en: 'Student Body Presidency & Institutional Governance',
        zh: '全校最高学生会总会主席领导历程与重大活动'
      },
      subtitle: {
        id: 'Universitas Bhayangkara Jakarta Raya · Kolaborasi Vaksinasi 1.100 Dosis Bersama Kapolri',
        en: 'Universitas Bhayangkara Jakarta Raya · 1,100 Doses National Police Collaboration',
        zh: '雅加达拉亚·巴扬卡拉大学 · 联合国家警察总署推进1100剂新冠疫苗抗疫'
      },
      src: '/videos/hero-night-skylines.mp4',
      poster: '/preview-skylines.jpg',
      duration: '00:58',
      resolution: '1080p HD',
      tag: 'PRESIDEN MAHASISWA'
    }
  ];

  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const activeReel = featuredReels[activeReelIndex];

  const albums = (data.gallery || [])
    .filter((alb) => alb.privacyStatus === 'public' || alb.privacyStatus === 'featured')
    .sort((a, b) => a.order - b.order);

  const categories: { id: string; label: { id: string; en: string; zh: string } }[] = [
    { id: 'all', label: { id: 'Semua Kategori', en: 'All Categories', zh: '全部画廊类别' } },
    { id: 'infrastructure', label: { id: 'Infrastruktur Jembatan', en: 'Bridge Infrastructure', zh: '国家基础设施' } },
    { id: 'operations', label: { id: 'Operasional Mineral', en: 'Mineral Operations', zh: '矿产运输调度' } },
    { id: 'corporate', label: { id: 'Corporate & Real Estate', en: 'Corporate & Real Estate', zh: '企业战略运营' } },
    { id: 'leadership', label: { id: 'Leadership & Organisasi', en: 'Leadership & Civic', zh: '组织领导与公关' } },
  ];

  const filteredAlbums = albums.filter((alb) => {
    const matchCategory = selectedCategory === 'all' || alb.category === selectedCategory;
    if (!matchCategory) return false;

    if (mediaTypeFilter === 'video') {
      return alb.items.some((it) => it.type === 'video' || it.videoUrl || it.url.endsWith('.mp4'));
    }
    if (mediaTypeFilter === 'image') {
      return alb.items.some((it) => it.type !== 'video' && !it.videoUrl && !it.url.endsWith('.mp4'));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col selection:bg-gold selection:text-obsidian">
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-4xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal border border-gold/30 text-xs font-sans text-gold uppercase tracking-widest font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>EXECUTIVE CINEMATIC & MULTIMEDIA ARCHIVE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-ivory">
            {locale === 'id' ? (
              <>
                Galeri Video Sinematik & <br />
                <span className="gold-gradient-text">Dokumentasi Operasional Lapangan.</span>
              </>
            ) : locale === 'en' ? (
              <>
                Cinematic Video Showcase & <br />
                <span className="gold-gradient-text">Field Operations Documentation.</span>
              </>
            ) : (
              <>
                高清影视级动态视频与 <br />
                <span className="gold-gradient-text">现场运营全景全案纪实。</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-softGray font-sans leading-relaxed max-w-3xl">
            {locale === 'id'
              ? 'Arsip multimedia terverifikasi yang mendokumentasikan secara dinamis eksekusi logistik maritim, pengawasan armada hauling mineral, tata kelola korporat, dan kepemimpinan institusional.'
              : locale === 'en'
              ? 'Verified multimedia archive dynamically capturing maritime logistics, mineral fleet hauling surveillance, corporate governance, and institutional leadership.'
              : '真实动态多媒体档案：全景观摩海上跨岛大桥施工后勤保障、沿海高负荷运矿车队调度、高管企业运营与高校最高领导历程。'}
          </p>
        </div>

        {/* 1. FEATURED EXECUTIVE CINEMATIC VIDEO REEL (RESPONSIVE PLAYER) */}
        <section className="mb-20 p-6 sm:p-8 rounded-3xl bg-charcoal border border-gold/40 shadow-luxury-elevated relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-hairline">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-sans font-bold uppercase tracking-wider border border-gold/40 flex items-center gap-1.5">
                  <Film size={12} className="text-gold" />
                  <span>{activeReel.tag}</span>
                </span>
                <span className="text-xs font-mono text-softGray">
                  REEL 0{activeReelIndex + 1} OF 0{featuredReels.length}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-ivory">
                {activeReel.title[locale] || activeReel.title.id}
              </h2>
              <p className="text-xs sm:text-sm text-softGray font-sans mt-1">
                {activeReel.subtitle[locale] || activeReel.subtitle.id}
              </p>
            </div>

            {/* Reel Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {featuredReels.map((reel, idx) => (
                <button
                  key={reel.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveReelIndex(idx);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                    activeReelIndex === idx
                      ? 'bg-gold text-obsidian shadow-gold-subtle font-bold scale-102'
                      : 'bg-obsidian text-softGray border border-hairline hover:border-gold/40 hover:text-ivory'
                  }`}
                >
                  <Play size={11} className={activeReelIndex === idx ? 'fill-current' : ''} />
                  <span>Reel 0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dedicated Responsive Video Player Container */}
          <div className="max-w-5xl mx-auto">
            <LuxuryVideoPlayer
              key={activeReel.src}
              src={activeReel.src}
              poster={activeReel.poster}
              title={activeReel.title[locale] || activeReel.title.id}
              duration={activeReel.duration}
              resolution={activeReel.resolution}
              aspectRatio="16/9"
              autoPlay={false}
              className="w-full"
            />
          </div>
        </section>

        {/* 2. MEDIA FILTER BAR (TYPE & CATEGORY) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-hairline">
          {/* Media Type Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-charcoal border border-hairline text-xs font-sans">
            <button
              onClick={() => {
                sound.playClick();
                setMediaTypeFilter('all');
              }}
              className={`px-4 py-1.5 rounded-full transition-all ${
                mediaTypeFilter === 'all'
                  ? 'bg-gold text-obsidian font-bold shadow-xs'
                  : 'text-softGray hover:text-ivory'
              }`}
            >
              Semua Media
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setMediaTypeFilter('video');
              }}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                mediaTypeFilter === 'video'
                  ? 'bg-gold text-obsidian font-bold shadow-xs'
                  : 'text-softGray hover:text-ivory'
              }`}
            >
              <Film size={12} />
              <span>Video Dokumen</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setMediaTypeFilter('image');
              }}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                mediaTypeFilter === 'image'
                  ? 'bg-gold text-obsidian font-bold shadow-xs'
                  : 'text-softGray hover:text-ivory'
              }`}
            >
              <Camera size={12} />
              <span>Foto Lapangan</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const label = cat.label[locale] || cat.label.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-gold/20 text-gold border border-gold/50 font-bold'
                      : 'bg-charcoal text-softGray border border-hairline hover:border-gold/30 hover:text-ivory'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. ALBUMS EDITORIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlbums.map((album) => {
            const hasVideo = album.items.some(
              (it) => it.type === 'video' || it.videoUrl || it.url.endsWith('.mp4')
            );

            return (
              <div
                key={album.id}
                onClick={() => {
                  sound.playClick();
                  setActiveAlbum(album);
                }}
                className="group cursor-pointer rounded-2xl bg-charcoal border border-hairline hover:border-gold/60 shadow-luxury-card overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Cover Frame */}
                <div className="relative aspect-[16/10] bg-obsidian overflow-hidden">
                  <Image
                    src={album.coverImage}
                    alt={t(album.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-85" />

                  {/* Badges Bar */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-obsidian/90 backdrop-blur-md text-[10px] font-sans font-bold text-gold uppercase tracking-wider border border-gold/40">
                      {album.category}
                    </span>

                    {hasVideo && (
                      <span className="px-2.5 py-0.5 rounded-full bg-gold/90 text-obsidian text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_0_12px_rgba(197,164,119,0.35)]">
                        <Play size={10} className="fill-current" />
                        <span>VIDEO</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-ivory">
                    <div className="flex items-center gap-3 text-[11px] font-sans text-gold">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {album.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {album.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Album Text Details */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                    {t(album.title)}
                  </h3>

                  <p className="text-xs text-softGray font-sans leading-relaxed line-clamp-2">
                    {t(album.description)}
                  </p>

                  <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs font-sans text-gold font-semibold">
                    <span className="flex items-center gap-1">
                      <span>{locale === 'id' ? 'Buka Album & Video' : locale === 'en' ? 'Open Album & Videos' : '查阅画廊与视频'}</span>
                      <span className="text-[10px] text-softGray">({album.items.length} file)</span>
                    </span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Album Detail Modal with Video & Image Support */}
      {activeAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian/95 backdrop-blur-2xl animate-fadeIn">
          <div
            className="fixed inset-0"
            onClick={() => setActiveAlbum(null)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-5xl max-h-[92vh] bg-charcoal border border-gold/40 rounded-2xl overflow-y-auto shadow-luxury-elevated z-10 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-hairline pb-4">
              <div>
                <span className="text-[10px] font-sans text-gold font-bold uppercase tracking-wider block mb-1">
                  {activeAlbum.category} • {activeAlbum.date}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory">
                  {t(activeAlbum.title)}
                </h2>
                <p className="text-xs text-softGray font-sans mt-1">
                  {activeAlbum.location} {activeAlbum.companyOrProject ? `• ${activeAlbum.companyOrProject}` : ''}
                </p>
              </div>

              <button
                onClick={() => setActiveAlbum(null)}
                className="p-2 rounded-full text-softGray hover:text-ivory hover:bg-white/10 transition-colors"
                aria-label="Tutup Album"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-softGray leading-relaxed font-sans">
              {t(activeAlbum.description)}
            </p>

            {/* Media Items in Album (Support Video + Image) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeAlbum.items.map((item) => {
                const isVideo =
                  item.type === 'video' ||
                  Boolean(item.videoUrl) ||
                  item.url?.endsWith('.mp4') ||
                  item.url?.endsWith('.webm');

                return (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(item)}
                    className="group/item relative aspect-[16/10] rounded-xl overflow-hidden bg-obsidian border border-hairline hover:border-gold/60 cursor-pointer shadow-luxury-card transition-all"
                  >
                    <Image
                      src={item.posterUrl || item.url}
                      alt={t(item.alt)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover/item:scale-105 transition-transform duration-500 filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-85" />

                    {/* Top Right Type Tag */}
                    <div className="absolute top-3 right-3">
                      {isVideo ? (
                        <span className="px-2.5 py-1 rounded-full bg-gold text-obsidian text-[10px] font-sans font-bold flex items-center gap-1 shadow-gold-subtle">
                          <Play size={10} className="fill-current" />
                          <span>VIDEO {item.duration ? `· ${item.duration}` : ''}</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-obsidian/80 backdrop-blur text-softGray text-[10px] font-sans border border-hairline">
                          FOTO
                        </span>
                      )}
                    </div>

                    {/* Center Play Icon for Video */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-charcoal/85 border border-gold/60 text-gold flex items-center justify-center shadow-[0_0_20px_rgba(197,164,119,0.35)] group-hover/item:scale-115 group-hover/item:bg-gold group-hover/item:text-obsidian transition-all duration-300">
                          <Play size={24} className="fill-current translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 text-ivory text-xs">
                      <p className="font-serif font-bold line-clamp-1">{t(item.caption)}</p>
                      <span className="text-[10px] text-gold font-sans flex items-center gap-1 mt-0.5">
                        {isVideo ? (
                          <>
                            <Play size={10} className="fill-current" />
                            <span>Putar Video Responsif</span>
                          </>
                        ) : (
                          <>
                            <Maximize2 size={10} />
                            <span>Perbesar Gambar</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
