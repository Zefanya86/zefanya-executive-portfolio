import { MetadataRoute } from 'next';
import { getPortfolioData } from '@/lib/server/portfolioStorage';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getPortfolioData();
  const baseUrl = data.seo.canonicalUrl || 'https://zefanyazulian.com';
  const currentDate = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leadership`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const experienceRoutes: MetadataRoute.Sitemap = data.experiences.map((exp) => ({
    url: `${baseUrl}/experience/${exp.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const leadershipRoutes: MetadataRoute.Sitemap = data.leadership.map((item) => ({
    url: `${baseUrl}/leadership/${item.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...experienceRoutes, ...leadershipRoutes];
}
