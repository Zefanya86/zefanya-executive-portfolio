'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

export default function CvModal() {
  const { isCvModalOpen, setIsCvModalOpen, data, locale } = usePortfolio();
  const cvUrl = data.cv.cvPdfUrl || '/CV_Zefanya_Zulian.pdf';
  const cvFileName = data.cv.cvFileName || 'CV_Zefanya_Zulian_Operations_Executive.pdf';

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCvModalOpen) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0"
        onClick={() => setIsCvModalOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col bg-graphite-surface border border-platinum/15 rounded-xl shadow-cinematic overflow-hidden z-10">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-platinum/10 bg-graphite/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-crimson/15 border border-crimson/30 text-crimson">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cv-modal-title" className="text-base sm:text-lg font-semibold text-warmWhite">
                {locale === 'id' ? 'Curriculum Vitae Resmi' : 'Official Curriculum Vitae'}
              </h2>
              <p className="text-xs text-platinum-muted flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-crimson" />
                <span>Zefanya Zulian — {data.profile.fullName}</span>
                <span className="hidden sm:inline">• {data.cv.lastUpdated}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-platinum bg-graphite border border-platinum/15 rounded-lg hover:border-platinum/30 hover:text-white transition"
              title="Open in new window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{locale === 'id' ? 'Tab Baru' : 'New Tab'}</span>
            </a>

            <a
              href={cvUrl}
              download={cvFileName}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-crimson rounded-lg hover:bg-crimson-light shadow-glow-crimson transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{locale === 'id' ? 'Unduh PDF' : 'Download PDF'}</span>
            </a>

            <button
              onClick={() => setIsCvModalOpen(false)}
              className="p-1.5 text-platinum-muted hover:text-white hover:bg-graphite rounded-lg transition"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="relative flex-1 bg-obsidian-deep overflow-hidden">
          <iframe
            src={`${cvUrl}#toolbar=1&navpanes=0`}
            className="w-full h-full border-0"
            title="CV Zefanya Zulian"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-platinum/10 bg-graphite flex items-center justify-between text-xs text-platinum-muted">
          <span>{cvFileName}</span>
          <span>{locale === 'id' ? 'Format Resmi Dokumen PDF' : 'Official PDF Document Format'}</span>
        </div>
      </div>
    </div>
  );
}
