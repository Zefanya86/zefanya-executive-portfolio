import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import { getPortfolioData } from '@/lib/server/portfolioStorage';
import { Calendar, Clock, User, ArrowLeft, Share2, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return (data.journal || []).map((art) => ({
    slug: art.slug,
  }));
}

export default async function JournalArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPortfolioData();
  const article = (data.journal || []).find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Fallback title / content resolving
  const title = article.title.id || article.title.en;
  const excerpt = article.excerpt.id || article.excerpt.en;
  const content = article.content.id || article.content.en;

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Top Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-softGray hover:text-gold transition-colors py-1.5 px-4 rounded-full bg-charcoal border border-hairline mb-8"
        >
          <ArrowLeft size={13} />
          <span>Kembali ke Artikel / Back to Journal</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-charcoal text-gold text-xs font-sans font-bold border border-gold/30 uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-softGray">•</span>
            <span className="text-softGray text-xs font-sans flex items-center gap-1.5">
              <Calendar size={12} className="text-gold" />
              {article.publishedAt}
            </span>
            <span className="text-softGray">•</span>
            <span className="text-softGray text-xs font-sans flex items-center gap-1.5">
              <Clock size={12} className="text-gold" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-xl text-softGray font-serif italic border-l-2 border-gold/60 pl-4 py-1 leading-relaxed">
            "{excerpt}"
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full border border-gold/60 bg-gold/10 flex items-center justify-center font-serif text-gold font-bold text-sm">
              ZZ
            </div>
            <div>
              <span className="text-sm font-serif font-bold text-ivory block">
                {article.author}
              </span>
              <span className="text-[10px] font-sans text-gold uppercase tracking-wider">
                The Modern Business Leader · Operations Specialist
              </span>
            </div>
          </div>
        </div>

        {/* Article Cover Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-charcoal border border-hairline shadow-luxury-elevated mb-12">
          <Image
            src={article.coverImage}
            alt={title}
            fill
            priority
            sizes="900px"
            className="object-cover filter contrast-105"
          />
        </div>

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-none text-softGray font-sans leading-relaxed space-y-6 text-base sm:text-lg">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Bottom Author Signature */}
        <div className="mt-16 pt-8 border-t border-hairline p-6 rounded-2xl bg-charcoal flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-gold bg-gold/15 flex items-center justify-center font-serif text-gold font-bold text-base shrink-0">
              ZZ
            </div>
            <div>
              <h4 className="text-base font-serif font-bold text-ivory">Zefanya Zulian, S.Ikom</h4>
              <p className="text-xs text-softGray font-sans">
                General Manager · Operations, Procurement & Business Management
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-light text-obsidian text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300"
          >
            Hubungi Penulis
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
