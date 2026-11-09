import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPortfolioData } from '@/lib/server/portfolioStorage';
import ExperienceDetailClient from './ExperienceDetailClient';

export const revalidate = 60;

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.experiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getPortfolioData();
  const exp = data.experiences.find((e) => e.slug === params.slug);

  if (!exp) {
    return {
      title: 'Pengalaman Tidak Ditemukan — Zefanya Zulian',
    };
  }

  const roleTitle = exp.role.id || exp.role.en;
  const desc = exp.responsibilities?.id?.[0] || `Rekam jejak operasional Zefanya Zulian di ${exp.company}`;

  return {
    title: `${roleTitle} di ${exp.company} — Zefanya Zulian`,
    description: desc,
    openGraph: {
      title: `${roleTitle} — ${exp.company}`,
      description: desc,
      images: exp.coverImage ? [{ url: exp.coverImage }] : undefined,
    },
  };
}

export default async function ExperienceDetailPage({ params }: { params: { slug: string } }) {
  const data = await getPortfolioData();
  const expExists = data.experiences.some((e) => e.slug === params.slug);

  if (!expExists) {
    notFound();
  }

  return <ExperienceDetailClient slug={params.slug} />;
}
