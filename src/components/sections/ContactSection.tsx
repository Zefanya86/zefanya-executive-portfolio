'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  Mail,
  MessageSquare,
  Linkedin,
  Download,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building2,
  Phone,
  Briefcase,
} from 'lucide-react';
import { sound } from '@/lib/sound';

export default function ContactSection() {
  const { data, locale, t, setIsCvModalOpen } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    category: 'partnership',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const inquiryCategories = [
    { id: 'career', label: { id: 'Peluang Karier & Rekrutmen', en: 'Career Opportunity', zh: '高管招募与职业机会' } },
    { id: 'partnership', label: { id: 'Kemitraan Bisnis Eksekutif', en: 'Business Partnership', zh: '企业战略商务合作' } },
    { id: 'collaboration', label: { id: 'Kolaborasi Profesional', en: 'Professional Collaboration', zh: '跨专业项目协同' } },
    { id: 'project', label: { id: 'Konsultasi / Pengelolaan Proyek', en: 'Project Management Inquiry', zh: '工程管理咨询业务' } },
    { id: 'general', label: { id: 'Kontak Umum', en: 'General Inquiry', zh: '其他综合事务接洽' } },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      sound.playClick();
      setStatus('error');
      setErrorMessage(
        locale === 'id'
          ? 'Mohon lengkapi semua kolom wajib (Nama, Email, dan Pesan).'
          : locale === 'en'
          ? 'Please complete all required fields (Name, Email, and Message).'
          : '请填写所有必填字段（姓名、电子邮箱及留言内容）。'
      );
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resJson = await res.json();
      if (res.ok && resJson.success) {
        sound.playSuccess();
        setStatus('success');
        setFormData({ name: '', email: '', organization: '', category: 'partnership', message: '' });
      } else {
        sound.playClick();
        setStatus('error');
        setErrorMessage(
          resJson.error ||
            (locale === 'id'
              ? 'Gagal mengirim pesan ke server.'
              : locale === 'en'
              ? 'Failed to send inquiry.'
              : '留言发送失败，请稍后重试。')
        );
      }
    } catch {
      sound.playClick();
      setStatus('error');
      setErrorMessage(
        locale === 'id'
          ? 'Terjadi kendala jaringan saat pengiriman.'
          : locale === 'en'
          ? 'Network error. Please try again.'
          : '网络连接异常，请重试。'
      );
    }
  };

  const email = data.contact.email || 'Zefanya.zuliann@gmail.com';
  const phone = data.contact.phone || '(+62) 896 8185 2453';
  const rawWa = data.contact.whatsapp?.replace(/[^0-9]/g, '') || '6289681852453';
  const waUrl = `https://wa.me/${rawWa}?text=Halo%20Zefanya%2C%20saya%20tertarik%20untuk%20berdiskusi%20mengenai%20peluang%20kerja%20sama.`;
  const linkedinUrl = data.contact.linkedinUrl || 'https://www.linkedin.com/in/zefanya-zulian';

  return (
    <section id="contact" className="relative py-28 bg-obsidian border-t border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels & Statement (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-gold/30 text-[10px] sm:text-xs font-sans text-gold tracking-widest uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span>08 // DIRECT STRATEGIC DIALOGUE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
              {t(data.contact.headline)}
            </h2>

            <p className="text-base sm:text-lg text-softGray leading-relaxed font-sans font-normal">
              {t(data.contact.subheadline)}
            </p>

            {/* Direct Connect Channels */}
            <div className="pt-2 space-y-3 font-sans">
              {/* Email */}
              <a
                href={`mailto:${email}`}
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="flex items-center gap-4 p-4 rounded-xl bg-charcoal border border-hairline hover:border-gold/50 transition-all duration-300 group shadow-luxury-card hover:-translate-y-0.5"
              >
                <div className="p-3 rounded-lg bg-obsidian border border-hairline text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-softGray uppercase tracking-widest block font-bold">
                    Official Executive Email
                  </span>
                  <span className="text-sm font-bold text-ivory truncate block group-hover:text-gold transition-colors">
                    {email}
                  </span>
                </div>
              </a>

              {/* WhatsApp Direct */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="flex items-center gap-4 p-4 rounded-xl bg-charcoal border border-hairline hover:border-gold/50 transition-all duration-300 group shadow-luxury-card hover:-translate-y-0.5"
              >
                <div className="p-3 rounded-lg bg-obsidian border border-hairline text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-softGray uppercase tracking-widest block font-bold">
                    Direct WhatsApp Communication
                  </span>
                  <span className="text-sm font-bold text-ivory truncate block group-hover:text-gold transition-colors">
                    {phone}
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="flex items-center gap-4 p-4 rounded-xl bg-charcoal border border-hairline hover:border-gold/50 transition-all duration-300 group shadow-luxury-card hover:-translate-y-0.5"
              >
                <div className="p-3 rounded-lg bg-obsidian border border-hairline text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-softGray uppercase tracking-widest block font-bold">
                    Professional LinkedIn Profile
                  </span>
                  <span className="text-sm font-bold text-ivory truncate block group-hover:text-gold transition-colors">
                    linkedin.com/in/zefanya-zulian
                  </span>
                </div>
              </a>
            </div>

            {/* Quick CV Download Action in Contact */}
            <div className="pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsCvModalOpen(true);
                }}
                className="w-full py-3.5 px-6 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-subtle transition-all duration-300 hover:scale-102 active:scale-98"
              >
                <Download size={14} />
                <span>DOWNLOAD CURRICULUM VITAE (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Professional Intake Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-charcoal border border-hairline shadow-luxury-card relative">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-hairline text-xs font-sans text-softGray">
                <div className="flex items-center gap-2 text-gold font-bold">
                  <ShieldCheck size={14} />
                  <span>EXECUTIVE INQUIRY DESK</span>
                </div>
                <div className="font-mono text-[11px]">STATUS: CONFIDENTIAL</div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-ivory tracking-tight">
                {locale === 'id'
                  ? 'Kirim Pesan atau Diskusi Kemitraan'
                  : locale === 'en'
                  ? 'Send a Message or Business Inquiry'
                  : '提交高管业务接洽或合作方案'}
              </h3>
              <p className="text-xs sm:text-sm text-softGray mt-1 mb-6 font-sans">
                {locale === 'id'
                  ? 'Pesan Anda akan langsung tercatat di Admin Inbox dan direspons secara profesional.'
                  : locale === 'en'
                  ? 'Your submission is securely dispatched directly to the Executive Inbox for prompt response.'
                  : '您的留言将直接加密存入高管专属消息管理系统，我们将尽快回复。'}
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-gold/15 border border-gold/40 flex items-start gap-3 text-ivory animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div className="text-sm font-sans">
                    <p className="font-bold text-gold">
                      {locale === 'id' ? 'Pesan Berhasil Terkirim!' : locale === 'en' ? 'Inquiry Successfully Sent!' : '留言已成功送达！'}
                    </p>
                    <p className="text-xs mt-1 text-softGray">
                      {locale === 'id'
                        ? 'Terima kasih atas pesan Anda. Zefanya Zulian akan segera menindaklanjuti melalui email yang Anda berikan.'
                        : locale === 'en'
                        ? 'Thank you for your inquiry. Zefanya Zulian will follow up via your specified email address.'
                        : '感谢您的联系。Zefanya Zulian 将通过您填写的电子邮箱及时跟进回复。'}
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-3 text-red-200 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm font-sans">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-softGray mb-1.5 font-bold">
                      {locale === 'id' ? 'Nama Lengkap *' : locale === 'en' ? 'Full Name *' : '您的姓名 *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ir. Budi Pratama"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian border border-hairline text-ivory placeholder-softGray/50 text-sm focus:border-gold focus:outline-none transition font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-softGray mb-1.5 font-bold">
                      {locale === 'id' ? 'Alamat Email *' : locale === 'en' ? 'Email Address *' : '电子邮箱 *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. executive@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian border border-hairline text-ivory placeholder-softGray/50 text-sm focus:border-gold focus:outline-none transition font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-softGray mb-1.5 font-bold">
                      {locale === 'id' ? 'Perusahaan / Organisasi' : locale === 'en' ? 'Company / Organization' : '所属企业 / 机构名称'}
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. PT Konstruksi Nusantara"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian border border-hairline text-ivory placeholder-softGray/50 text-sm focus:border-gold focus:outline-none transition font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-softGray mb-1.5 font-bold">
                      {locale === 'id' ? 'Kategori Kontak' : locale === 'en' ? 'Inquiry Category' : '业务接洽类别'}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian border border-hairline text-ivory text-sm focus:border-gold focus:outline-none transition font-sans"
                    >
                      {inquiryCategories.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-charcoal text-ivory">
                          {cat.label[locale] || cat.label.id}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-softGray mb-1.5 font-bold">
                    {locale === 'id' ? 'Pesan / Deskripsi Kebutuhan *' : locale === 'en' ? 'Detailed Message *' : '详细需求说明 *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      locale === 'id'
                        ? 'Tuliskan rincian agenda, ruang lingkup proyek, atau tawaran kerja sama Anda...'
                        : locale === 'en'
                        ? 'Please outline the project scope, operational challenge, or partnership proposal...'
                        : '请详细阐述项目需求、运营统筹场景或商务合作设想...'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-obsidian border border-hairline text-ivory placeholder-softGray/50 text-sm focus:border-gold focus:outline-none transition resize-none font-sans"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans font-bold tracking-wider uppercase text-xs transition-all duration-300 hover:shadow-gold-subtle disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-obsidian" />
                    <span>
                      {status === 'loading'
                        ? (locale === 'id' ? 'MENGIRIM PESAN...' : locale === 'en' ? 'TRANSMITTING...' : '正在提交...')
                        : (locale === 'id' ? 'KIRIM PESAN SEKARANG' : locale === 'en' ? 'SUBMIT INQUIRY' : '立即提交接洽留言')}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
