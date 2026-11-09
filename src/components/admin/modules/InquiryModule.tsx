'use client';

import React, { useState } from 'react';
import { ContactSubmission } from '@/types/portfolio';
import { Mail, Search, Download, Trash2, CheckCircle2, Clock, Building, User } from 'lucide-react';

interface InquiryModuleProps {
  inquiries: ContactSubmission[];
  setInquiries: React.Dispatch<React.SetStateAction<ContactSubmission[]>>;
}

export default function InquiryModule({ inquiries, setInquiries }: InquiryModuleProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.message.toLowerCase().includes(search.toLowerCase()) ||
      (inq.organization && inq.organization.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, status: 'new' | 'read' | 'replied' | 'archived') => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    if (confirm('Hapus pesan masuk ini?')) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) {
      alert('Belum ada pesan masuk untuk diekspor.');
      return;
    }

    const headers = ['ID', 'Nama', 'Email', 'Organisasi', 'Kategori', 'Status', 'Tanggal', 'Pesan'];
    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${inq.name}"`,
      `"${inq.email}"`,
      `"${inq.organization || ''}"`,
      `"${inq.category}"`,
      `"${inq.status}"`,
      `"${inq.receivedAt}"`,
      `"${inq.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zefanya-inquiries-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <Mail size={14} />
            <span>15. Manajemen Pesan Masuk & Inisiasi Kemitraan</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            Executive Inquiries & Contact Submissions ({inquiries.length})
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Daftar pesan masuk dari recruiter, calon mitra bisnis, investor, dan stakeholders profesional.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 transition-all"
        >
          <Download size={13} />
          <span>Ekspor CSV</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-charcoal border border-hairline flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-softGray" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pengirim, organisasi, atau kata kunci pesan..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory focus:border-gold"
          >
            <option value="all">Semua Status</option>
            <option value="new">Baru (Unread)</option>
            <option value="read">Dibaca (Read)</option>
            <option value="replied">Sudah Dibalas</option>
            <option value="archived">Diarsipkan</option>
          </select>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-charcoal border border-hairline text-softGray">
            <Mail size={32} className="mx-auto text-gold/40 mb-3" />
            <p className="text-sm font-sans">Tidak ada pesan masuk yang cocok dengan kriteria pencarian.</p>
          </div>
        ) : (
          filtered.map((inq) => (
            <div
              key={inq.id}
              className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-4 hover:border-gold/50 transition-all shadow-luxury-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-hairline pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-obsidian border border-hairline flex items-center justify-center text-gold font-bold text-xs">
                    {inq.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-ivory">{inq.name}</h3>
                    <p className="text-[11px] text-softGray font-sans">
                      {inq.email} {inq.organization ? `• ${inq.organization}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-obsidian text-gold border border-gold/30 uppercase font-bold">
                    {inq.category}
                  </span>
                  <span className="text-[11px] font-mono text-softGray">
                    {inq.receivedAt}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian border border-hairline text-xs font-sans text-ivory/90 leading-relaxed">
                "{inq.message}"
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <label className="text-[11px] font-sans text-softGray">Status:</label>
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value as any)}
                    className="px-2.5 py-1 rounded-lg bg-obsidian border border-hairline text-[11px] text-ivory focus:border-gold"
                  >
                    <option value="new">Baru (New)</option>
                    <option value="read">Dibaca (Read)</option>
                    <option value="replied">Sudah Dibalas (Replied)</option>
                    <option value="archived">Diarsipkan (Archived)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${inq.email}?subject=Balasan%20Kemitraan%20Zefanya%20Zulian`}
                    className="px-3 py-1.5 rounded-full bg-gold/15 text-gold border border-gold/40 text-xs font-sans font-bold hover:bg-gold hover:text-obsidian transition-colors"
                  >
                    Balas via Email
                  </a>
                  <button
                    onClick={() => deleteInquiry(inq.id)}
                    className="p-1.5 text-red-400 hover:text-red-300"
                    title="Hapus Pesan"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
