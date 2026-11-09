'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  Search,
  FileText,
  Briefcase,
  User,
  Users2,
  Mail,
  Copy,
  Check,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  CreditCard,
  Shield,
  X,
  GraduationCap,
  Sparkles,
  Camera,
  BookOpen,
  Presentation,
  MessageSquare,
  Compass,
  HeartHandshake,
} from 'lucide-react';
import { sound } from '@/lib/sound';

export default function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    setIsCvModalOpen,
    setIsPresentationOpen,
    setIsWhatsAppModalOpen,
    setIsAvailabilityModalOpen,
    locale,
  } = usePortfolio();

  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const officialEmail = 'Zefanya.zuliann@gmail.com';

  // Global hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = [
    {
      id: 'presentation',
      category: 'Executive Mode',
      label: locale === 'id' ? 'Mode Presentasi Eksekutif / Keynote (Tekan P)' : locale === 'en' ? 'Executive Keynote Presentation Mode (Press P)' : '高管路演演讲模式 (按 P)',
      icon: Presentation,
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsPresentationOpen(true);
      },
    },
    {
      id: 'whatsapp-vip',
      category: 'Executive Direct',
      label: locale === 'id' ? 'WhatsApp VIP Fast-Track (Chat Langsung)' : locale === 'en' ? 'WhatsApp VIP Fast-Track (Direct Chat)' : '微信/WhatsApp高管直连快速通道',
      icon: MessageSquare,
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsWhatsAppModalOpen(true);
      },
    },
    {
      id: 'availability-radar',
      category: 'Executive Radar',
      label: locale === 'id' ? 'Status Radar Ketersediaan Karier & Kemitraan' : locale === 'en' ? 'Executive Availability & Strategic Radar' : '高管履职就职雷达与就任状态',
      icon: Compass,
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsAvailabilityModalOpen(true);
      },
    },
    {
      id: 'bookshelf',
      category: 'Intellectual Sources',
      label: locale === 'id' ? 'Pustaka Pemikiran & Prinsip (The Executive Bookshelf)' : locale === 'en' ? 'The Executive Bookshelf & Principles' : '高管思想智库与管理经典',
      icon: BookOpen,
      action: () => {
        setIsCommandPaletteOpen(false);
        router.push('/#bookshelf');
      },
    },
    {
      id: 'mentorship',
      category: 'Civic Legacy',
      label: locale === 'id' ? 'Dedikasi Sosial & Pembinaan Generasi Muda (1.100 Vaksin Kapolri)' : locale === 'en' ? 'Civic Legacy & Youth Mentorship (1,100 Vaccine Drive)' : '社会担当与青年传承 (1100剂警总长接种行动)',
      icon: HeartHandshake,
      action: () => {
        setIsCommandPaletteOpen(false);
        router.push('/#mentorship');
      },
    },
    {
      id: 'work',
      category: 'Navigation',
      label: locale === 'id' ? 'Buka Pengalaman Kerja' : locale === 'en' ? 'View Work & Experience' : '查阅职业履历',
      icon: Briefcase,
      action: () => {
        router.push('/experience');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'projects',
      category: 'Navigation',
      label: locale === 'id' ? 'Studi Kasus Proyek (Infrastruktur & Mineral)' : locale === 'en' ? 'Project Case Studies' : '工程项目案例复盘',
      icon: Briefcase,
      action: () => {
        router.push('/projects');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'gallery',
      category: 'Navigation',
      label: locale === 'id' ? 'Galeri Aktivitas Profesional' : locale === 'en' ? 'Professional Activity Gallery' : '高管职业纪实画廊',
      icon: Camera,
      action: () => {
        router.push('/gallery');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'journal',
      category: 'Navigation',
      label: locale === 'id' ? 'Artikel & Pemikiran Manajemen' : locale === 'en' ? 'Journal & Management Insights' : '深度专栏与高管洞见',
      icon: BookOpen,
      action: () => {
        router.push('/journal');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'card',
      category: 'Digital Card',
      label: locale === 'id' ? 'Kartu Nama Digital (vCard & QR Code)' : locale === 'en' ? 'Digital Business Card (vCard & QR)' : '数字名片 (vCard & QR码)',
      icon: CreditCard,
      action: () => {
        router.push('/card');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'download',
      category: 'Downloads',
      label: locale === 'id' ? 'Pusat Unduhan Dokumen (CV & Sertifikat)' : locale === 'en' ? 'Document Download Center' : '官方档案与证书下载中心',
      icon: FileText,
      action: () => {
        router.push('/download');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'about',
      category: 'Navigation',
      label: locale === 'id' ? 'Tentang Zefanya Zulian' : locale === 'en' ? 'About Zefanya Zulian' : '关于 Zefanya Zulian',
      icon: User,
      action: () => {
        router.push('/#about');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'contact',
      category: 'Navigation',
      label: locale === 'id' ? 'Kirim Pesan / Kontak Langsung' : locale === 'en' ? 'Direct Strategic Intake / Contact' : '高层业务沟通与留言',
      icon: Mail,
      action: () => {
        router.push('/contact');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'cv-modal',
      category: 'Actions',
      label: locale === 'id' ? 'Unduh CV Resmi (PDF Modal)' : locale === 'en' ? 'Download Official CV (PDF)' : '下载正式简历 (PDF)',
      icon: FileText,
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsCvModalOpen(true);
      },
    },
    {
      id: 'copy-email',
      category: 'Actions',
      label: copied ? `Tersalin: ${officialEmail}` : `Salin Email: ${officialEmail}`,
      icon: copied ? Check : Copy,
      badge: copied ? 'COPIED' : 'COPY',
      action: copyEmail,
    },
    {
      id: 'theme',
      category: 'Preferences',
      label: theme === 'dark' ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        sound.playClick();
      },
    },
    {
      id: 'sound',
      category: 'Preferences',
      label: soundEnabled ? 'Matikan Efek Suara Haptik' : 'Aktifkan Efek Suara Haptik UI',
      icon: soundEnabled ? VolumeX : Volume2,
      action: () => {
        toggleSound();
      },
    },
    {
      id: 'admin',
      category: 'System',
      label: 'Buka Admin Control Center (CMS)',
      icon: Shield,
      action: () => {
        router.push('/admin');
        setIsCommandPaletteOpen(false);
      },
    },
  ];

  const filteredActions = actions.filter(
    (act) =>
      act.label.toLowerCase().includes(query.toLowerCase()) ||
      act.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-obsidian/85 backdrop-blur-xl animate-fadeIn">
      <div
        className="relative w-full max-w-xl rounded-2xl border border-gold/40 bg-charcoal shadow-luxury-elevated overflow-hidden animate-scaleUp text-ivory"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Command Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-hairline bg-obsidian/70">
          <Search size={18} className="text-gold mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === 'id'
                ? 'Ketik perintah atau cari modul... (cth: CV, Kerja, Proyek, Email)'
                : locale === 'en'
                ? 'Type a command or module... (e.g., CV, Work, Projects, Email)'
                : '输入命令或查找模块... (例如：简历、履历、项目、邮箱)'
            }
            className="w-full bg-transparent text-sm font-sans text-ivory placeholder-softGray/50 focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded text-softGray hover:text-ivory transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-hairline/40">
          {filteredActions.length > 0 ? (
            filteredActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    item.action();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-left group hover:bg-gold/10 hover:border-l-2 hover:border-gold transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-obsidian text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-serif font-bold text-ivory group-hover:text-gold transition-colors">
                        {item.label}
                      </p>
                      <p className="text-[10px] font-sans text-softGray uppercase tracking-wider">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  {item.badge ? (
                    <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-gold/20 text-gold font-bold">
                      {item.badge}
                    </span>
                  ) : (
                    <span className="text-[10px] font-sans text-softGray opacity-0 group-hover:opacity-100 transition-opacity">
                      ↵ OPEN
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs font-sans text-softGray">
              Tidak ada hasil untuk &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-obsidian border-t border-hairline flex items-center justify-between text-[11px] font-sans text-softGray">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-charcoal border border-hairline text-[10px]">
              ESC
            </span>
            <span>Tutup / Close</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold font-bold">●</span>
            <span>ZEFANYA ZULIAN PLATFORM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
