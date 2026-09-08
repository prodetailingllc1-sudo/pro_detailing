import type { MetadataRoute } from 'next';

import { SITE_ORIGIN } from '@/lib/site-data';
import { featuredArticles } from '@/lib/blog-data';
import { additionalServices } from '@/lib/expanded-content';
import { siteFeatures } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/our-services',
    '/our-services/window-tinting',
    '/our-services/ceramic-coating',
    '/our-services/paint-protection-film',
    '/our-services/auto-detailing',
    '/tint-simulator',
    '/gallery',
    '/request-quote',
    '/reviews',
    '/blog',
    ...additionalServices
      .filter(
        (service) =>
          service.slug !== 'mobile-detailing' || siteFeatures.mobileDetailing,
      )
      .map((service) => `/our-services/${service.slug}`),
    ...featuredArticles.map((article) => `/blog/${article.slug}`),
  ];

  return paths.map((path, index) => ({
    url: `${SITE_ORIGIN}${path}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : index < 3 ? 0.9 : 0.75,
  }));
}
