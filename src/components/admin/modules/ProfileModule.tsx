'use client';

import React from 'react';
import { PortfolioData, ProfileData } from '@/types/portfolio';
import { User, MapPin, Mail, Phone, Globe, Shield, Sparkles, Plus, Trash2 } from 'lucide-react';

interface ProfileModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function ProfileModule({ data, setData }: ProfileModuleProps) {
  const profile = data.profile;

  const updateProfile = (field: keyof ProfileData, value: any) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const updateLocalizedString = (field: keyof ProfileData, lang: 'id' | 'en' | 'zh', value: string) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: {
          ...(prev.profile[field] as any),
          [lang]: value,
        },
      },
    }));
  };

  const addHighlight = () => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        keyHighlights: {
          id: [...prev.profile.keyHighlights.id, 'Poin sorotan eksekutif baru'],
          en: [...prev.profile.keyHighlights.en, 'New executive key highlight'],
          zh: [...prev.profile.keyHighlights.zh, '新增高管核心履历要点'],
        },
      },
    }));
  };

  const removeHighlight = (index: number) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        keyHighlights: {
          id: prev.profile.keyHighlights.id.filter((_, i) => i !== index),
          en: prev.profile.keyHighlights.en.filter((_, i) => i !== index),
          zh: prev.profile.keyHighlights.zh.filter((_, i) => i !== index),
        },
      },
    }));
  };

  const updateHighlightItem = (index: number, lang: 'id' | 'en' | 'zh', value: string) => {
    setData((prev) => {
      const list = [...prev.profile.keyHighlights[lang]];
      list[index] = value;
      return {
        ...prev,
        profile: {
          ...prev.profile,
          keyHighlights: {
            ...prev.profile.keyHighlights,
            [lang]: list,
          },
        },
      };
    });
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-hairline pb-4">
        <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
          <User size={14} />
          <span>02. Profil Eksekutif & Identitas Pemimpin</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
          Executive Identity & Personal Brand
        </h2>
        <p className="text-xs text-softGray font-sans mt-1">
          Identitas resmi, gelar profesional, narasi biografi, dan filosofi operasional Zefanya Zulian.
        </p>
      </div>

      {/* Basic Identity */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-6">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold">
          Data Pribadi & Kontak Resmi
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => updateProfile('fullName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              Monogram Resmi
            </label>
            <input
              type="text"
              value={profile.monogram}
              onChange={(e) => updateProfile('monogram', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              Alamat Email Resmi
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => updateProfile('email', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              Nomor WhatsApp / Telepon
            </label>
            <input
              type="text"
              value={profile.whatsappNumber}
              onChange={(e) => {
                updateProfile('whatsappNumber', e.target.value);
                updateProfile('phone', e.target.value);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              LinkedIn Profile URL
            </label>
            <input
              type="text"
              value={profile.linkedinUrl}
              onChange={(e) => updateProfile('linkedinUrl', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-sans text-softGray mb-1 font-semibold">
              Lama Pengalaman (Years of Experience)
            </label>
            <input
              type="text"
              value={profile.yearsOfExperience}
              onChange={(e) => updateProfile('yearsOfExperience', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-hairline text-xs font-sans text-ivory focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </div>

      {/* Trilingual Title & Positioning */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-6">
        <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold">
          Judul Profesional & Posisi Karir (Trilingual)
        </h3>

        {/* Title */}
        <div className="space-y-3">
          <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
            Professional Title
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">ID (Bahasa Indonesia)</span>
              <input
                type="text"
                value={profile.professionalTitle.id}
                onChange={(e) => updateLocalizedString('professionalTitle', 'id', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
              />
            </div>
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">EN (English)</span>
              <input
                type="text"
                value={profile.professionalTitle.en}
                onChange={(e) => updateLocalizedString('professionalTitle', 'en', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
              />
            </div>
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">ZH (中文 - 简体)</span>
              <input
                type="text"
                value={profile.professionalTitle.zh}
                onChange={(e) => updateLocalizedString('professionalTitle', 'zh', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Short Bio */}
        <div className="space-y-3 pt-4 border-t border-hairline">
          <label className="block text-xs font-sans text-ivory font-bold uppercase tracking-wider">
            Biografi Singkat (Short Bio)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">ID</span>
              <textarea
                rows={4}
                value={profile.shortBio.id}
                onChange={(e) => updateLocalizedString('shortBio', 'id', e.target.value)}
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">EN</span>
              <textarea
                rows={4}
                value={profile.shortBio.en}
                onChange={(e) => updateLocalizedString('shortBio', 'en', e.target.value)}
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>
            <div>
              <span className="text-[10px] text-gold font-bold block mb-1">ZH</span>
              <textarea
                rows={4}
                value={profile.shortBio.zh}
                onChange={(e) => updateLocalizedString('shortBio', 'zh', e.target.value)}
                className="w-full p-3 rounded-xl bg-obsidian border border-hairline text-xs text-ivory focus:border-gold resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="p-6 rounded-3xl bg-charcoal border border-hairline space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-sans uppercase tracking-widest text-gold font-bold">
            Poin Sorotan Utama (Key Highlights)
          </h3>
          <button
            onClick={addHighlight}
            className="px-3 py-1.5 rounded-full bg-gold/15 text-gold border border-gold/40 text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-gold hover:text-obsidian transition-colors"
          >
            <Plus size={13} />
            <span>Tambah Poin</span>
          </button>
        </div>

        <div className="space-y-4">
          {profile.keyHighlights.id.map((_, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-obsidian border border-hairline space-y-3">
              <div className="flex items-center justify-between text-xs text-softGray">
                <span className="font-bold text-gold">Highlight #{idx + 1}</span>
                <button
                  onClick={() => removeHighlight(idx)}
                  className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                >
                  <Trash2 size={12} />
                  <span>Hapus</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="ID highlight..."
                  value={profile.keyHighlights.id[idx] || ''}
                  onChange={(e) => updateHighlightItem(idx, 'id', e.target.value)}
                  className="px-3 py-2 rounded-xl bg-charcoal border border-hairline text-xs text-ivory focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="EN highlight..."
                  value={profile.keyHighlights.en[idx] || ''}
                  onChange={(e) => updateHighlightItem(idx, 'en', e.target.value)}
                  className="px-3 py-2 rounded-xl bg-charcoal border border-hairline text-xs text-ivory focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="ZH highlight..."
                  value={profile.keyHighlights.zh[idx] || ''}
                  onChange={(e) => updateHighlightItem(idx, 'zh', e.target.value)}
                  className="px-3 py-2 rounded-xl bg-charcoal border border-hairline text-xs text-ivory focus:border-gold"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
