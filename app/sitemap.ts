import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://r1n1.com/', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://r1n1.com/privacy', changeFrequency: 'yearly', priority: 0.2 },
  ];
}
