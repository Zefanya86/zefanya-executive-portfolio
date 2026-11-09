'use client';

import React from 'react';
import { PortfolioData, EducationItem, CertificationItem } from '@/types/portfolio';
import { GraduationCap, ShieldCheck, Plus, Trash2, Award } from 'lucide-react';

interface EducationModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function EducationModule({ data, setData }: EducationModuleProps) {
  const education = data.education || [];
  const certifications = data.certifications || [];

  const updateEducation = (id: string, updates: Partial<EducationItem>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    }));
  };

  const updateCertification = (id: string, updates: Partial<CertificationItem>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, ...updates } : cert
      ),
    }));
  };

  const addCertification = () => {
    const newId = `cert_${Date.now()}`;
    const newCert: CertificationItem = {
      id: newId,
      name: {
        id: 'Sertifikasi Profesi Baru',
        en: 'New Professional Certification',
        zh: '新增专业资格认证',
      },
      issuer: 'Lembaga Sertifikasi',
      year: '2026',
      order: certifications.length + 1,
    };

    setData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  const deleteCertification = (id: string) => {
    if (confirm('Hapus sertifikasi ini?')) {
      setData((prev) => ({
        ...prev,
        certifications: prev.certifications.filter((c) => c.id !== id),
      }));
    }
  };

  return (
    <div className="space-y-10">
      {/* Education Header */}
      <div className="border-b border-hairline pb-4">
        <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
          <GraduationCap size={14} />
          <span>10. Pendidikan Akademik & Gelar Resmi</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
          Academic Credentials & Degrees
        </h2>
        <p className="text-xs text-softGray font-sans mt-1">
          Gelar Sarjana Ilmu Komunikasi (S.Ikom) dari Universitas Bhayangkara Jakarta Raya (IPK 3.25, Lulus Baik).
        </p>
      </div>

      {/* Education List */}
      <div className="space-y-6">
        {education.map((edu, idx) => (
          <div
            key={edu.id}
            className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-4 shadow-luxury-card"
          >
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <span className="text-xs font-sans font-bold text-gold uppercase">
                Pendidikan Akademik #{idx + 1}
              </span>
              <span className="text-xs font-mono text-softGray">
                Tahun Kelulusan: {edu.graduationYear}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Nama Institusi Universitas
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Tahun Kelulusan
                </label>
                <input
                  type="text"
                  value={edu.graduationYear}
                  onChange={(e) => updateEducation(edu.id, { graduationYear: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Indeks Prestasi Kumulatif (IPK)
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-serif font-bold text-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
                  Predikat Kelulusan
                </label>
                <input
                  type="text"
                  value={edu.distinction.id}
                  onChange={(e) =>
                    updateEducation(edu.id, {
                      distinction: { ...edu.distinction, id: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>
            </div>

            {/* Trilingual Degree Name */}
            <div className="space-y-3 pt-3 border-t border-hairline">
              <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
                Gelar & Program Studi (Trilingual)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="ID"
                  value={edu.degree.id}
                  onChange={(e) =>
                    updateEducation(edu.id, {
                      degree: { ...edu.degree, id: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="EN"
                  value={edu.degree.en}
                  onChange={(e) =>
                    updateEducation(edu.id, {
                      degree: { ...edu.degree, en: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="ZH"
                  value={edu.degree.zh}
                  onChange={(e) =>
                    updateEducation(edu.id, {
                      degree: { ...edu.degree, zh: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications Section */}
      <div className="pt-8 border-t border-hairline space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
              <ShieldCheck size={14} />
              <span>Sertifikasi Profesi & Lisensi Terakreditasi</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-ivory tracking-tight mt-1">
              Professional Licenses & Certifications ({certifications.length})
            </h3>
            <p className="text-xs text-softGray font-sans mt-0.5">
              Certified Public Relations Officer (LSP), TOEFL 533 (CEFR B2), BNSP Programmer, dan Microsoft Office Training.
            </p>
          </div>

          <button
            onClick={addCertification}
            className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
          >
            <Plus size={14} />
            <span>Tambah Sertifikasi</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-charcoal border border-hairline hover:border-gold/50 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-obsidian text-gold border border-gold/30">
                  LISENSI #{idx + 1} • {cert.year}
                </span>
                <button
                  onClick={() => deleteCertification(cert.id)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div>
                <label className="text-[10px] font-sans text-softGray block mb-0.5">Nama Sertifikasi (ID)</label>
                <input
                  type="text"
                  value={cert.name.id}
                  onChange={(e) =>
                    updateCertification(cert.id, {
                      name: { ...cert.name, id: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs font-bold text-ivory focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-sans text-softGray block mb-0.5">Penerbit / Asosiasi</label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-sans text-softGray block mb-0.5">Tahun</label>
                  <input
                    type="text"
                    value={cert.year}
                    onChange={(e) => updateCertification(cert.id, { year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-sans text-softGray block mb-0.5">URL Verifikasi / Kredensial</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={cert.credentialUrl || ''}
                  onChange={(e) => updateCertification(cert.id, { credentialUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs font-mono text-softGray focus:border-gold"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
