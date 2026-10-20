'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Mail, Phone, MessageSquare, Linkedin, Download, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const { data, locale, t, setIsCvModalOpen } = usePortfolio();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage(locale === 'id' ? 'Mohon lengkapi semua kolom wajib.' : 'Please fill in all required fields.');
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
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(resJson.error || (locale === 'id' ? 'Gagal mengirim pesan.' : 'Failed to send inquiry.'));
      }
    } catch {
      setStatus('error');
      setErrorMessage(locale === 'id' ? 'Terjadi kesalahan jaringan.' : 'Network error. Please try again.');
    }
  };

  const email = data.contact.email || 'Zefanya.zuliann@gmail.com';
  const phone = data.contact.phone || '+62 896 8185 2453';
  const rawWa = data.contact.whatsapp?.replace(/[^0-9]/g, '') || '6289681852453';
  const waUrl = `https://wa.me/${rawWa}?text=Halo%20Zefanya%2C%20saya%20tertarik%20untuk%20berdiskusi%20mengenai%20peluang%20kerja%20sama.`;
  const linkedinUrl = data.contact.linkedinUrl || 'https://www.linkedin.com/in/zefanya-zulian';

  return (
    <section id="contact" className="relative py-28 bg-obsidian border-t border-platinum/10 overflow-hidden">
      {/* Cinematic Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-crimson/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-platinum/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Executive Closing Statement & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson tracking-widest uppercase">
              <span className="w-6 h-px bg-crimson" />
              <span>09 // {locale === 'id' ? 'HUBUNGI SAYA' : 'GET IN TOUCH'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-warmWhite leading-[1.1]">
              {t(data.contact.headline)}
            </h2>

            <p className="text-base sm:text-lg text-platinum-muted leading-relaxed font-normal">
              {t(data.contact.subheadline)}
            </p>

            {/* Direct Connect Buttons Grid */}
            <div className="pt-4 space-y-3">
              {/* Email Button */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-graphite-surface border border-platinum/10 hover:border-crimson/50 hover:bg-graphite transition-all group"
              >
                <div className="p-3 rounded-lg bg-obsidian border border-platinum/10 text-crimson group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[11px] font-mono text-platinum-muted uppercase block">
                    Email Resmi
                  </span>
                  <span className="text-sm font-semibold text-warmWhite truncate block">
                    {email}
                  </span>
                </div>
              </a>

              {/* WhatsApp Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-graphite-surface border border-platinum/10 hover:border-emerald-500/50 hover:bg-graphite transition-all group"
              >
                <div className="p-3 rounded-lg bg-obsidian border border-platinum/10 text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-platinum-muted uppercase block">
                    WhatsApp Direct
                  </span>
                  <span className="text-sm font-semibold text-warmWhite block">
                    {phone}
                  </span>
                </div>
              </a>

              {/* Direct LinkedIn Button */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-graphite-surface border border-platinum/10 hover:border-sky-500/50 hover:bg-graphite transition-all group"
              >
                <div className="p-3 rounded-lg bg-obsidian border border-platinum/10 text-sky-400 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-platinum-muted uppercase block">
                    LinkedIn Profile
                  </span>
                  <span className="text-sm font-semibold text-warmWhite block">
                    linkedin.com/in/zefanya-zulian
                  </span>
                </div>
              </a>
            </div>

            {/* Quick CV Download Action */}
            <div className="pt-2">
              <button
                onClick={() => setIsCvModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-mono font-semibold uppercase text-platinum hover:text-white bg-graphite border border-platinum/20 hover:border-crimson rounded-xl transition shadow-sm"
              >
                <Download className="w-4 h-4 text-crimson" />
                <span>{locale === 'id' ? 'Buka & Unduh Dokumen CV' : 'Open & Download Verified CV'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-graphite-surface/90 border border-platinum/15 shadow-card-executive relative backdrop-blur-md">
              <h3 className="text-xl sm:text-2xl font-bold text-warmWhite tracking-tight">
                {locale === 'id' ? 'Kirim Pesan atau Penawaran Kerja Sama' : 'Send an Executive Inquiry'}
              </h3>
              <p className="text-xs sm:text-sm text-platinum-muted mt-1 mb-6">
                {locale === 'id'
                  ? 'Silakan isi form di bawah ini. Pesan Anda akan tersimpan langsung di sistem manajemen portofolio.'
                  : 'Please complete the form below. Your message will be logged securely in the portfolio management system.'}
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-start gap-3 text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">
                      {locale === 'id' ? 'Pesan Berhasil Terkirim!' : 'Inquiry Successfully Sent!'}
                    </p>
                    <p className="text-xs mt-1 text-emerald-300">
                      {locale === 'id'
                        ? 'Terima kasih atas pesan Anda. Zefanya Zulian akan segera merespons melalui email yang dicantumkan.'
                        : 'Thank you for reaching out. Zefanya Zulian will follow up via your provided email.'}
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-crimson-dark/40 border border-crimson/50 flex items-start gap-3 text-red-200">
                  <AlertCircle className="w-5 h-5 text-crimson-light shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-platinum-muted mb-1.5">
                      {locale === 'id' ? 'Nama Lengkap *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian border border-platinum/15 text-warmWhite placeholder-platinum-muted/40 text-sm focus:border-crimson focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-platinum-muted mb-1.5">
                      {locale === 'id' ? 'Alamat Email *' : 'Work Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian border border-platinum/15 text-warmWhite placeholder-platinum-muted/40 text-sm focus:border-crimson focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-platinum-muted mb-1.5">
                    {locale === 'id' ? 'Perusahaan / Perihal' : 'Company or Subject'}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Operations Collaboration / Executive Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-obsidian border border-platinum/15 text-warmWhite placeholder-platinum-muted/40 text-sm focus:border-crimson focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-platinum-muted mb-1.5">
                    {locale === 'id' ? 'Pesan / Catatan *' : 'Your Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      locale === 'id'
                        ? 'Jelaskan tujuan diskusi, proyek pengadaan, atau kebutuhan operasional Anda...'
                        : 'Describe your project, operations agenda, or partnership discussion...'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-obsidian border border-platinum/15 text-warmWhite placeholder-platinum-muted/40 text-sm focus:border-crimson focus:outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-crimson to-crimson-dark text-white font-semibold text-sm shadow-glow-crimson hover:brightness-110 active:scale-98 transition disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span>{locale === 'id' ? 'Mengirimkan...' : 'Sending Inquiry...'}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{locale === 'id' ? 'Kirim Pesan Sekarang' : 'Send Executive Inquiry'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
