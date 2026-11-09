'use client';

import React from 'react';
import { PortfolioData, TestimonialItem } from '@/types/portfolio';
import { MessageSquareQuote, Plus, Trash2, ShieldAlert } from 'lucide-react';

interface TestimonialModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function TestimonialModule({ data, setData }: TestimonialModuleProps) {
  const testimonials = data.testimonials || [];

  const updateTestimonial = (id: string, updates: Partial<TestimonialItem>) => {
    setData((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  };

  const addTestimonial = () => {
    const newId = `testi_${Date.now()}`;
    const newTesti: TestimonialItem = {
      id: newId,
      authorName: 'Nama Rekan / Pimpinan',
      authorRole: {
        id: 'Jabatan Profesional',
        en: 'Professional Title',
        zh: '专业职位',
      },
      organization: 'Nama Perusahaan / Organisasi',
      content: {
        id: 'Kutipan rekomendasi profesional.',
        en: 'Professional peer endorsement quote.',
        zh: '同行及上级专业推荐评语。',
      },
      relationship: 'Atasan / Rekan Kerja Proyek',
      isApproved: false,
      order: testimonials.length + 1,
    };

    setData((prev) => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), newTesti],
    }));
  };

  const deleteTestimonial = (id: string) => {
    if (confirm('Hapus testimoni ini?')) {
      setData((prev) => ({
        ...prev,
        testimonials: (prev.testimonials || []).filter((t) => t.id !== id),
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <MessageSquareQuote size={14} />
            <span>13. Testimoni & Rekomendasi Profesional (Peer Reviews)</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Endorsements & Executive Testimonials
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Kelola rekomendasi profesional rekan kerja dan atasan. Sesuai etika CV, draf disimpan tanpa publikasi fiktif.
          </p>
        </div>

        <button
          onClick={addTestimonial}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
        >
          <Plus size={14} />
          <span>Tambah Draf Testimoni</span>
        </button>
      </div>

      {/* Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
        <ShieldAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Standar Kredibilitas Eksekutif:</strong>
          <span>
            Hanya tampilkan testimoni yang telah dikonfirmasi dan diverifikasi langsung oleh pihak pemberi rekomendasi.
          </span>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {testimonials.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-charcoal border border-hairline text-softGray">
            <p className="text-sm font-sans">Belum ada testimoni. Klik tombol di atas untuk menyiapkan draf baru.</p>
          </div>
        ) : (
          testimonials.map((testi, idx) => (
            <div
              key={testi.id}
              className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-4"
            >
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <span className="text-xs font-sans font-bold text-gold uppercase">
                  Draf #{idx + 1} • {testi.relationship}
                </span>
                <button
                  onClick={() => deleteTestimonial(testi.id)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-sans text-softGray block mb-0.5">Nama Pemberi Rekomendasi</label>
                  <input
                    type="text"
                    value={testi.authorName}
                    onChange={(e) => updateTestimonial(testi.id, { authorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs font-bold text-ivory focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-sans text-softGray block mb-0.5">Organisasi / Perusahaan</label>
                  <input
                    type="text"
                    value={testi.organization}
                    onChange={(e) => updateTestimonial(testi.id, { organization: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-sans text-softGray block mb-0.5">Kutipan Rekomendasi (ID)</label>
                <textarea
                  rows={2}
                  value={testi.content.id}
                  onChange={(e) =>
                    updateTestimonial(testi.id, {
                      content: { ...testi.content, id: e.target.value },
                    })
                  }
                  className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-softGray">
                  <input
                    type="checkbox"
                    checked={testi.isApproved}
                    onChange={(e) => updateTestimonial(testi.id, { isApproved: e.target.checked })}
                    className="w-4 h-4 accent-gold rounded"
                  />
                  <span>Telah Diverifikasi & Siap Dipublikasikan</span>
                </label>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
