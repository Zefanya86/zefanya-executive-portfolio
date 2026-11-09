import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPortfolioData } from '@/lib/server/portfolioStorage';
import LeadershipDetailClient from './LeadershipDetailClient';

export const revalidate = 60;

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.leadership.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getPortfolioData();
  const item = data.leadership.find((l) => l.slug === params.slug);

  if (!item) {
    return {
      title: 'Kepemimpinan Tidak Ditemukan — Zefanya Zulian',
    };
  }

  const roleTitle = item.role.id || item.role.en;
  const desc = item.highlights?.id?.[0] || `Rekam jejak kepemimpinan Zefanya Zulian di ${item.organization}`;

  return {
    title: `${roleTitle} — ${item.organization} — Zefanya Zulian`,
    description: desc,
    openGraph: {
      title: `${roleTitle} — ${item.organization}`,
      description: desc,
      images: item.coverImage ? [{ url: item.coverImage }] : undefined,
    },
  };
}

export default async function LeadershipDetailPage({ params }: { params: { slug: string } }) {
  const data = await getPortfolioData();
  const itemExists = data.leadership.some((l) => l.slug === params.slug);

  if (!itemExists) {
    notFound();
  }

  return <LeadershipDetailClient slug={params.slug} />;
}
