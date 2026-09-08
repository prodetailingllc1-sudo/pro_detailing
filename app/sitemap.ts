import type { MetadataRoute } from 'next';

import { SITE_ORIGIN } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/our-services/window-tinting',
    '/our-services/ceramic-coating',
    '/our-services/paint-protection-film',
    '/our-services/auto-detailing',
    '/tint-simulator',
    '/gallery',
  ];

  return paths.map((path, index) => ({
    url: `${SITE_ORIGIN}${path}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : index < 3 ? 0.9 : 0.75,
  }));
}
