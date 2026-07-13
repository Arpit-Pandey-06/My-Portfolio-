import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// Single-page site (all sections live under "/" as anchors), so this is
// intentionally a one-entry sitemap. Add more entries here if the site
// ever grows real sub-routes (e.g. /services/[slug]).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    }
  ];
}
