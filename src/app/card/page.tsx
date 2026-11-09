'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  Phone,
  Mail,
  MessageSquare,
  Linkedin,
  Globe,
  Download,
  Share2,
  Check,
  QrCode,
  ArrowLeft,
  Building,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { sound } from '@/lib/sound';

export default function DigitalBusinessCardPage() {
  const { data, locale, setLocale, t } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const fullName = data.profile.fullName || 'Zefanya Zulian';
  const title = t(data.profile.professionalTitle) || 'General Manager & Operations Specialist';
  const company = 'PT. Aba Mandiri Sejahtera';
  const email = data.profile.email || 'Zefanya.zuliann@gmail.com';
  const phone = data.profile.phone || '(+62) 896 8185 2453';
  const rawPhone = phone.replace(/[^0-9]/g, '');
  const location = t(data.profile.location) || 'Bekasi, Jawa Barat, Indonesia';
  const website = 'https://zefanyazulian.com';
  const linkedin = data.profile.linkedinUrl || 'https://www.linkedin.com/in/zefanya-zulian';
  const portraitUrl = data.hero.portraitUrl || '/zefanya-portrait.jpg';

  // Standardized vCard 3.0 generation
  const downloadVCard = () => {
    sound.playSuccess();
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:Zulian;Zefanya;;;S.Ikom`,
      `FN:${fullName}, S.Ikom`,
      `ORG:${company}`,
      `TITLE:${title}`,
      `TEL;TYPE=CELL,VOICE:${phone}`,
      `EMAIL;TYPE=WORK,INTERNET:${email}`,
      `URL:${website}`,
      `ADR;TYPE=WORK:;;Bekasi;Jawa Barat;;Indonesia`,
      `NOTE:${t(data.profile.positioning)} — Operations, Procurement & Business Management`,
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Zefanya_Zulian.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share profile using native Web Share or clipboard fallback
  const handleShare = async () => {
    sound.playClick();
    const shareUrl = typeof window !== 'undefined' ? window.location.href : website;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${fullName} — The Modern Business Leader`,
          text: `${fullName} | ${title} at ${company}`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-obsidian text-ivory py-10 px-4 sm:px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Back Nav */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between mb-6 z-10">
        <Link
          href="/"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-softGray hover:text-gold transition-colors py-1.5 px-3 rounded-full bg-charcoal/80 border border-hairline"
        >
          <ArrowLeft size={13} />
          <span>{locale === 'id' ? 'Kembali ke Web' : locale === 'en' ? 'Back to Site' : '返回首页'}</span>
        </Link>

        {/* Mini Language Switcher */}
        <div className="flex items-center gap-1 bg-charcoal/80 border border-gold/30 rounded-full p-0.5 text-[10px] font-sans font-semibold">
          {(['id', 'en', 'zh'] as const).map((l) => (
            <button
              key={l}
              onClick={() => {
                sound.playClick();
                setLocale(l);
              }}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                locale === l ? 'bg-gold text-obsidian font-bold' : 'text-softGray hover:text-ivory'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Executive Card Container */}
      <div className="w-full max-w-md bg-charcoal border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-luxury-elevated relative z-10 space-y-6">
        
        {/* Top Header Card Lockup */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            {/* Portrait with Gold Border */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-gold/60 shadow-gold-subtle shrink-0 bg-obsidian">
              <Image
                src={portraitUrl}
                alt={fullName}
                fill
                priority
                sizes="80px"
                className="object-cover object-top"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-[9px] font-sans font-bold text-gold uppercase tracking-wider mb-1">
                <ShieldCheck size={10} />
                <span>VERIFIED EXECUTIVE</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-ivory tracking-tight leading-snug">
                {fullName}, <span className="text-gold text-sm font-normal">S.Ikom</span>
              </h1>
              <p className="text-xs font-sans text-softGray font-medium mt-0.5">
                {title}
              </p>
            </div>
          </div>

          {/* Monogram Badge */}
          <div className="w-9 h-9 rounded-full border border-gold/60 bg-gold/10 flex items-center justify-center font-serif text-gold text-xs font-bold shrink-0">
            ZZ
          </div>
        </div>

        {/* Company & Positioning Banner */}
        <div className="p-3.5 rounded-xl bg-obsidian border border-hairline space-y-1">
          <div className="flex items-center gap-2 text-xs font-serif font-bold text-gold">
            <Building size={14} className="text-gold shrink-0" />
            <span>{company}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-sans text-softGray">
            <MapPin size={12} className="text-gold shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        {/* Short Executive Credo */}
        <p className="text-xs text-softGray leading-relaxed font-sans italic border-l-2 border-gold/60 pl-3">
          "{t(data.profile.shortBio)}"
        </p>

        {/* Direct Action Hub Grid */}
        <div className="grid grid-cols-4 gap-2 pt-1 font-sans">
          {/* Call */}
          <a
            href={`tel:${rawPhone}`}
            onClick={() => sound.playClick()}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-obsidian border border-hairline hover:border-gold/50 text-softGray hover:text-gold transition-all duration-300 group"
          >
            <Phone size={16} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${rawPhone}?text=Halo%20Zefanya%2C%20saya%20terhubung%20melalui%20Digital%20Business%20Card.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-obsidian border border-hairline hover:border-gold/50 text-softGray hover:text-gold transition-all duration-300 group"
          >
            <MessageSquare size={16} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium uppercase tracking-wider">WhatsApp</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            onClick={() => sound.playClick()}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-obsidian border border-hairline hover:border-gold/50 text-softGray hover:text-gold transition-all duration-300 group"
          >
            <Mail size={16} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Email</span>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-obsidian border border-hairline hover:border-gold/50 text-softGray hover:text-gold transition-all duration-300 group"
          >
            <Linkedin size={16} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium uppercase tracking-wider">LinkedIn</span>
          </a>
        </div>

        {/* Primary CTA: Save Contact to Phone (vCard) */}
        <div className="space-y-2.5 pt-2 font-sans">
          <button
            onClick={downloadVCard}
            className="w-full py-3.5 px-6 rounded-full bg-gold hover:bg-gold-light text-obsidian font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-subtle transition-all duration-300 hover:scale-102 active:scale-98"
          >
            <Download size={15} />
            <span>{locale === 'id' ? 'Simpan Kontak ke HP (vCard)' : locale === 'en' ? 'Save Contact to Phone (vCard)' : '保存联系人至手机 (vCard)'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* Share Profile */}
            <button
              onClick={handleShare}
              className="py-2.5 px-4 rounded-full bg-obsidian hover:bg-black border border-hairline hover:border-gold/50 text-softGray hover:text-ivory text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check size={14} className="text-gold" /> : <Share2 size={14} className="text-gold" />}
              <span>{copied ? (locale === 'id' ? 'Tersalin!' : 'Copied!') : (locale === 'id' ? 'Bagikan' : 'Share')}</span>
            </button>

            {/* View QR Code */}
            <button
              onClick={() => {
                sound.playClick();
                setShowQrModal(true);
              }}
              className="py-2.5 px-4 rounded-full bg-obsidian hover:bg-black border border-hairline hover:border-gold/50 text-softGray hover:text-ivory text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <QrCode size={14} className="text-gold" />
              <span>QR Code</span>
            </button>
          </div>
        </div>

        {/* Card Footer Tag */}
        <div className="pt-4 border-t border-hairline flex items-center justify-between text-[10px] font-sans text-softGray">
          <span>THE MODERN BUSINESS LEADER</span>
          <span className="text-gold font-semibold">JAKARTA · BEKASI</span>
        </div>
      </div>

      {/* QR Code Modal for In-Person Phone Scanning */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-xl animate-fadeIn">
          <div
            className="fixed inset-0"
            onClick={() => setShowQrModal(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-xs bg-charcoal border border-gold/40 rounded-2xl p-6 text-center space-y-4 shadow-luxury-elevated z-10">
            <h3 className="text-lg font-serif font-bold text-ivory">
              {locale === 'id' ? 'Pindai Kartu Digital' : locale === 'en' ? 'Scan Digital Card' : '扫码查阅名片'}
            </h3>
            <p className="text-xs text-softGray font-sans">
              {locale === 'id'
                ? 'Pindai dengan kamera smartphone untuk membuka profil eksekutif.'
                : 'Scan with any smartphone camera to open the executive profile.'}
            </p>

            {/* Generated QR Code Representation */}
            <div className="p-4 bg-white rounded-xl mx-auto w-fit shadow-md">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  website + '/card'
                )}&color=0B0B0C&bgcolor=FFFFFF`}
                alt="QR Code Zefanya Zulian Digital Card"
                width={180}
                height={180}
                className="w-44 h-44 object-contain"
              />
            </div>

            <p className="text-[11px] font-sans text-gold font-semibold">
              zefanyazulian.com/card
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-full bg-obsidian border border-hairline hover:border-gold text-xs font-sans font-bold uppercase tracking-wider text-ivory transition-colors"
            >
              {locale === 'id' ? 'Tutup' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
