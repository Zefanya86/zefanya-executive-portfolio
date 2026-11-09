'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import { X, ShieldCheck, Film, Calendar, MapPin, Maximize2 } from 'lucide-react';
import LuxuryVideoPlayer from './LuxuryVideoPlayer';

export default function MediaLightbox() {
  const { lightboxMedia, closeLightbox, t } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    if (lightboxMedia) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxMedia, closeLightbox]);

  if (!lightboxMedia) return null;

  const captionText = t(lightboxMedia.caption);
  const titleText = t(lightboxMedia.title);
  const altText = t(lightboxMedia.alt) || 'Visual media documentation';

  const isVideo =
    lightboxMedia.type === 'video' ||
    Boolean(lightboxMedia.videoUrl) ||
    lightboxMedia.url?.endsWith('.mp4') ||
    lightboxMedia.url?.endsWith('.webm') ||
    lightboxMedia.url?.includes('youtube.com') ||
    lightboxMedia.url?.includes('youtu.be') ||
    lightboxMedia.url?.includes('vimeo.com');

  const videoSrc = lightboxMedia.videoUrl || lightboxMedia.url;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={titleText || 'Media Lightbox'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 backdrop-blur-2xl p-3 sm:p-6 md:p-8 animate-fadeIn"
      onClick={closeLightbox}
    >
      <div
        className="relative max-w-5xl w-full bg-charcoal border border-gold/40 rounded-2xl overflow-hidden shadow-luxury-elevated flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-hairline bg-obsidian text-ivory">
          <div className="flex items-center gap-3">
            {isVideo ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-sans font-bold uppercase tracking-wider bg-gold/20 text-gold border border-gold/40 rounded-full shadow-[0_0_12px_rgba(197,164,119,0.2)]">
                <Film size={12} className="text-gold" />
                Dokumentasi Video Sinematik
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-sans font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30 rounded-full">
                <ShieldCheck size={12} />
                Dokumentasi Resmi Terverifikasi
              </span>
            )}
            {titleText && (
              <span className="text-xs sm:text-sm font-serif font-bold text-ivory line-clamp-1">
                {titleText}
              </span>
            )}
          </div>

          <button
            onClick={closeLightbox}
            aria-label="Tutup Lightbox"
            className="p-1.5 rounded-full text-softGray hover:text-ivory hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Media Frame */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] bg-obsidian flex items-center justify-center overflow-hidden">
          {isVideo ? (
            <div className="w-full h-full p-2 sm:p-4 flex items-center justify-center">
              <LuxuryVideoPlayer
                src={videoSrc}
                poster={lightboxMedia.posterUrl || (lightboxMedia.url !== videoSrc ? lightboxMedia.url : undefined)}
                title={titleText}
                duration={lightboxMedia.duration}
                resolution={lightboxMedia.resolution || '1080p 60fps'}
                aspectRatio={lightboxMedia.aspectRatio || '16/9'}
                autoPlay={true}
                className="max-h-full"
              />
            </div>
          ) : (
            <Image
              src={lightboxMedia.url}
              alt={altText}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Metadata Footer */}
        <div className="p-5 bg-charcoal border-t border-hairline text-ivory">
          {captionText && (
            <p className="text-xs sm:text-sm text-softGray leading-relaxed font-sans mb-3">
              {captionText}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-softGray font-sans">
            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              {lightboxMedia.source && (
                <span>
                  Sumber: <span className="text-gold font-semibold">{lightboxMedia.source}</span>
                </span>
              )}
              {lightboxMedia.duration && (
                <span className="px-2 py-0.5 rounded-full bg-obsidian border border-hairline text-gold font-mono">
                  Durasi: {lightboxMedia.duration}
                </span>
              )}
              {lightboxMedia.date && (
                <span className="flex items-center gap-1 text-softGray">
                  <Calendar size={12} />
                  {lightboxMedia.date}
                </span>
              )}
            </div>

            <div className="text-softGray text-[11px]">
              Tekan <kbd className="px-1.5 py-0.5 bg-obsidian border border-hairline rounded text-[10px]">Esc</kbd> untuk menutup
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
