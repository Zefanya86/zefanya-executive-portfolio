import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import { Home, Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory selection:bg-gold selection:text-obsidian flex flex-col justify-between">
      <Navigation />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center py-36">
        <div className="w-16 h-16 rounded-2xl bg-charcoal border border-gold/30 flex items-center justify-center text-gold mb-6 shadow-luxury-card">
          <Compass size={32} />
        </div>

        <p className="text-xs font-sans uppercase tracking-widest text-gold font-bold mb-2">
          ERROR 404 // RESOURCE NOT FOUND
        </p>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory tracking-tight mb-4">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-base text-softGray max-w-lg mb-8 leading-relaxed font-sans">
          Tautan yang Anda tuju mungkin telah dipindahkan, diubah URL-nya, atau sedang dalam tahap pemutakhiran berkas eksekutif.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-ivory text-obsidian font-sans font-bold uppercase tracking-wider text-xs shadow-luxury transition-all"
          >
            <Home size={14} />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-charcoal border border-hairline hover:border-gold text-ivory font-sans text-xs tracking-wider uppercase transition-all"
          >
            <span>Jelajahi Pengalaman</span>
            <ArrowRight size={13} className="text-gold" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
