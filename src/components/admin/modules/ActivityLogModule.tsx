'use client';

import React from 'react';
import { PortfolioData, ActivityLog } from '@/types/portfolio';
import { History, Trash2, Download, ShieldCheck, Clock } from 'lucide-react';

interface ActivityLogModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function ActivityLogModule({ data, setData }: ActivityLogModuleProps) {
  const logs = data.activityLogs || [];

  const clearLogs = () => {
    if (confirm('Bersihkan seluruh riwayat log aktivitas?')) {
      setData((prev) => ({
        ...prev,
        activityLogs: [],
      }));
    }
  };

  const exportLogs = () => {
    const jsonStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zefanya-activity-logs-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <History size={14} />
            <span>19. Log Aktivitas & Jejak Audit Sistem</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
            System Activity Log & Audit Trail ({logs.length})
          </h2>
          <p className="text-xs text-softGray font-sans mt-1">
            Pencatatan real-time perubahan data, riwayat publikasi, dan aksi administratif dengan stempel waktu terverifikasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportLogs}
            className="px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 transition-all"
          >
            <Download size={13} />
            <span>Unduh JSON</span>
          </button>
          <button
            onClick={clearLogs}
            className="px-4 py-2 rounded-full bg-obsidian border border-hairline text-red-400 hover:text-red-300 text-xs font-sans font-bold flex items-center gap-1.5 transition-all"
          >
            <Trash2 size={13} />
            <span>Bersihkan Log</span>
          </button>
        </div>
      </div>

      {/* Logs Table / List */}
      <div className="space-y-3">
        {logs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-charcoal border border-hairline text-softGray">
            <Clock size={32} className="mx-auto text-gold/40 mb-3" />
            <p className="text-sm font-sans">Belum ada catatan aktivitas baru.</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="p-4 sm:p-5 rounded-2xl bg-charcoal border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-sans font-bold uppercase">
                    {log.action}
                  </span>
                  <span className="text-ivory font-bold">{log.entity}</span>
                </div>
                <p className="text-softGray font-sans">{log.details}</p>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-softGray shrink-0 self-end sm:self-center">
                <span>User: <strong className="text-ivory">{log.user}</strong></span>
                <span>•</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
