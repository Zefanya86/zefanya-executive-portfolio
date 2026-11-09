'use client';

import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { X, Download, ExternalLink, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { sound } from '@/lib/sound';
import { Locale } from '@/types/portfolio';

export default function CvModal() {
  const { isCvModalOpen, setIsCvModalOpen, data, locale } = usePortfolio();
  const [selectedVersion, setSelectedVersion] = useState<Locale>(locale);

  useEffect(() => {
    if (isCvModalOpen) {
      setSelectedVersion(locale);
    }
  }, [isCvModalOpen, locale]);

  const cvUrlId = data.cv?.cvPdfUrl || '/CV_Zefanya_Zulian.pdf';
  const cvUrlEn = data.cv?.cvPdfUrlEnglish || '/CV_Zefanya_Zulian_English.pdf';
  const cvUrlZh = data.cv?.cvPdfUrlChinese || '/CV_Zefanya_Zulian_English.pdf';

  const activeCvUrl = selectedVersion === 'en' ? cvUrlEn : selectedVersion === 'zh' ? cvUrlZh : cvUrlId;
  const cvFileName =
    selectedVersion === 'en'
      ? 'Resume_Zefanya_Zulian_EN.pdf'
      : selectedVersion === 'zh'
      ? 'Resume_Zefanya_Zulian_ZH.pdf'
      : 'CV_Zefanya_Zulian_ID.pdf';

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCvModalOpen) {
        sound.playClick();
        setIsCvModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCvModalOpen, setIsCvModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isCvModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCvModalOpen]);

  if (!isCvModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian/90 backdrop-blur-2xl animate-fadeIn"
    >
      <div
        className="fixed inset-0"
        onClick={() => {
          sound.playClick();
          setIsCvModalOpen(false);
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col bg-charcoal border border-gold/40 rounded-xl shadow-luxury-elevated overflow-hidden z-10 text-ivory">
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-hairline bg-obsidian/80 gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-gold/10 border border-gold/30 text-gold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cv-modal-title" className="text-base font-serif font-bold text-ivory">
                {locale === 'id'
                  ? 'Curriculum Vitae Resmi'
                  : locale === 'en'
                  ? 'Official Curriculum Vitae'
                  : '官方正式简历'}
              </h2>
              <p className="text-xs text-softGray flex items-center gap-1.5 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>Zefanya Zulian (S.Ikom) — 100% Verified Authentic Document</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Version Switcher (ID | EN | 中文) */}
            <div className="flex items-center p-0.5 rounded-full bg-black/60 border border-gold/30 text-xs font-sans">
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedVersion('id');
                }}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedVersion === 'id'
                    ? 'bg-gold text-obsidian font-bold shadow-xs'
                    : 'text-softGray hover:text-ivory'
                }`}
              >
                Indonesia (ID)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedVersion('en');
                }}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedVersion === 'en'
                    ? 'bg-gold text-obsidian font-bold shadow-xs'
                    : 'text-softGray hover:text-ivory'
                }`}
              >
                English (EN)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedVersion('zh');
                }}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedVersion === 'zh'
                    ? 'bg-gold text-obsidian font-bold shadow-xs'
                    : 'text-softGray hover:text-ivory'
                }`}
              >
                中文 (ZH)
              </button>
            </div>

            <a
              href={activeCvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              title="Open in new tab"
              className="p-2 rounded-full border border-hairline hover:border-gold text-softGray hover:text-gold transition-colors"
            >
              <ExternalLink size={15} />
            </a>

            <a
              href={activeCvUrl}
              download={cvFileName}
              onClick={() => sound.playSuccess()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold hover:bg-gold-light text-obsidian text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-gold-subtle"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <button
              onClick={() => {
                sound.playClick();
                setIsCvModalOpen(false);
              }}
              className="p-2 rounded-full text-softGray hover:text-ivory transition-colors"
              aria-label="Tutup / Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* In-Browser PDF Preview Iframe */}
        <div className="flex-1 w-full h-full bg-obsidian relative">
          <iframe
            src={`${activeCvUrl}#view=FitH`}
            title={`CV Zefanya Zulian - ${selectedVersion.toUpperCase()}`}
            className="w-full h-full border-none"
          />

          {/* Mobile Fallback Overlay if Iframe is Blocked on mobile */}
          <div className="sm:hidden absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-obsidian/95 backdrop-blur-md text-ivory text-center border border-gold/30">
            <p className="text-xs font-medium mb-2">
              {locale === 'id'
                ? 'Buka file langsung di smartphone Anda:'
                : locale === 'en'
                ? 'Open document directly on your smartphone:'
                : '在手机端直接查阅此文件：'}
            </p>
            <a
              href={activeCvUrl}
              download={cvFileName}
              onClick={() => sound.playSuccess()}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-gold text-obsidian font-sans text-xs font-bold uppercase tracking-wider shadow-gold-subtle"
            >
              <Download size={14} />
              <span>Unduh CV ({selectedVersion.toUpperCase()})</span>
            </a>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-5 py-2.5 bg-obsidian/90 border-t border-hairline flex items-center justify-between text-[11px] font-sans text-softGray">
          <span className="flex items-center gap-1.5">
            <span className="text-gold font-bold">●</span>
            <span>Dokumen Otentik Terverifikasi — S.Ikom Universitas Bhayangkara Jakarta Raya</span>
          </span>
          <span className="hidden sm:inline">Tekan ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
}
