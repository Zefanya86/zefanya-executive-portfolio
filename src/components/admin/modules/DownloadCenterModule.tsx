'use client';

import React from 'react';
import { PortfolioData, DownloadableDocument, CvSettings } from '@/types/portfolio';
import { FileText, Plus, Trash2, Download, Eye, ExternalLink } from 'lucide-react';

interface DownloadCenterModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function DownloadCenterModule({ data, setData }: DownloadCenterModuleProps) {
  const documents = data.documents || [];
  const cv = data.cv;

  const updateCvSettings = (field: keyof CvSettings, value: any) => {
    setData((prev) => ({
      ...prev,
      cv: {
        ...prev.cv,
        [field]: value,
      },
    }));
  };

  const updateDocument = (id: string, updates: Partial<DownloadableDocument>) => {
    setData((prev) => ({
      ...prev,
      documents: (prev.documents || []).map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    }));
  };

  const addDocument = () => {
    const newId = `doc_${Date.now()}`;
    const newDoc: DownloadableDocument = {
      id: newId,
      title: {
        id: 'Dokumen Eksekutif Baru',
        en: 'New Executive Document',
        zh: '新增高管官方文件',
      },
      description: {
        id: 'Berkas resmi portofolio atau studi kasus.',
        en: 'Official executive portfolio or case study document.',
        zh: '官方高管履历或案例汇编文件。',
      },
      category: 'portfolio',
      language: 'multi',
      fileUrl: '/CV_Zefanya_Zulian.pdf',
      fileName: 'Zefanya_Zulian_Portfolio.pdf',
      fileSize: '1.2 MB',
      format: 'PDF',
      isPublic: true,
      downloadsCount: 0,
      order: documents.length + 1,
    };

    setData((prev) => ({
      ...prev,
      documents: [...(prev.documents || []), newDoc],
    }));
  };

  const deleteDocument = (id: string) => {
    if (confirm('Hapus dokumen ini dari Download Center?')) {
      setData((prev) => ({
        ...prev,
        documents: (prev.documents || []).filter((d) => d.id !== id),
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <FileText size={14} />
            <span>12. Pusat Unduhan Dokumen & Berkas CV Resmi</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Executive Download Center & CV Assets
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Kelola berkas kurikulum vitae resmi (Bahasa Indonesia, English, Mandarin), ringkasan proyek, dan statistik unduhan.
          </p>
        </div>

        <button
          onClick={addDocument}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
        >
          <Plus size={14} />
          <span>Tambah Dokumen</span>
        </button>
      </div>

      {/* Official CV Master Files */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-6 shadow-luxury-card">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold flex items-center gap-2">
          <Download size={14} />
          <span>Konfigurasi Berkas CV Utama (PDF)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              URL CV Bahasa Indonesia (Default)
            </label>
            <input
              type="text"
              value={cv.cvPdfUrl}
              onChange={(e) => updateCvSettings('cvPdfUrl', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              URL CV English Version
            </label>
            <input
              type="text"
              value={cv.cvPdfUrlEnglish || ''}
              onChange={(e) => updateCvSettings('cvPdfUrlEnglish', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              URL CV Chinese Version (中文)
            </label>
            <input
              type="text"
              value={cv.cvPdfUrlChinese || ''}
              onChange={(e) => updateCvSettings('cvPdfUrlChinese', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-ivory cursor-pointer">
              <input
                type="checkbox"
                checked={cv.downloadEnabled}
                onChange={(e) => updateCvSettings('downloadEnabled', e.target.checked)}
                className="w-4 h-4 accent-gold rounded"
              />
              <span>Izinkan Pengunjung Mengunduh CV Secara Publik</span>
            </label>
          </div>

          <span className="text-softGray">
            Pembaruan Terakhir: <strong className="text-ivory">{cv.lastUpdated}</strong>
          </span>
        </div>
      </div>

      {/* Additional Documents List */}
      <div className="space-y-4">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold">
          Daftar Dokumen Eksekutif Tersedia ({documents.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc, idx) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-charcoal border border-hairline space-y-4 hover:border-gold/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-obsidian text-gold border border-gold/30 uppercase">
                  {doc.category} • {doc.format}
                </span>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div>
                <label className="text-[10px] font-sans text-softGray block mb-0.5">Judul Dokumen (ID)</label>
                <input
                  type="text"
                  value={doc.title.id}
                  onChange={(e) =>
                    updateDocument(doc.id, {
                      title: { ...doc.title, id: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs font-bold text-ivory focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-sans text-softGray block mb-0.5">URL Berkas</label>
                  <input
                    type="text"
                    value={doc.fileUrl}
                    onChange={(e) => updateDocument(doc.id, { fileUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-ivory focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-sans text-softGray block mb-0.5">Ukuran Berkas</label>
                  <input
                    type="text"
                    value={doc.fileSize}
                    onChange={(e) => updateDocument(doc.id, { fileSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
