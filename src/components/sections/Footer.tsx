'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowUp, Shield, Lock } from 'lucide-react';

export default function Footer() {
  const { data, locale } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-obsidian-deep border-t border-platinum/10 py-12 text-platinum-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-platinum/10">
          {/* Identity Lockup */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-base sm:text-lg font-bold text-warmWhite tracking-tight uppercase">
              {data.profile.fullName}
            </span>
            <span className="text-xs font-mono text-platinum-muted uppercase tracking-wider mt-0.5">
              Operations · Procurement · Business Management
            </span>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#experience" className="hover:text-white transition">Experience</a>
            <a href="#competencies" className="hover:text-white transition">Expertise</a>
            <a href="#leadership" className="hover:text-white transition">Leadership</a>
            <a href="#education" className="hover:text-white transition">Credentials</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-graphite border border-platinum/10 hover:border-crimson text-platinum hover:text-white transition group"
            aria-label="Kembali ke atas / Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-platinum-muted/60">
          <p>
            © {currentYear} {data.profile.fullName}. {locale === 'id' ? 'Hak cipta dilindungi.' : 'All rights reserved.'}
          </p>

          <div className="flex items-center gap-4">
            <span>Bekasi, West Java, Indonesia</span>
            <span>•</span>
            {/* Discrete Admin Link */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-platinum-muted hover:text-crimson transition opacity-60 hover:opacity-100"
              title="Executive Admin CMS"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
