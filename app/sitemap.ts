import type { MetadataRoute } from 'next';

import { SITE_ORIGIN } from '@/lib/site-data';
import { allBlogArticles } from '@/lib/blog-data';
import { additionalServices } from '@/lib/expanded-content';
import { siteFeatures } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const contentUpdated = new Date('2026-09-09T00:00:00-04:00');
  const paths = [
    '',
    '/our-services',
    '/our-services/window-tinting',
    '/our-services/ceramic-coating',
    '/our-services/paint-protection-film',
    '/our-services/auto-detailing',
    '/vehicle-visualizer',
    '/tint-simulator',
    '/gallery',
    '/request-quote',
    '/booking',
    '/reviews',
    '/blog',
    '/privacy-policy',
    '/terms-conditions',
    ...additionalServices
      .filter(
        (service) =>
          service.slug !== 'mobile-detailing' || siteFeatures.mobileDetailing,
      )
      .map((service) => `/our-services/${service.slug}`),
    ...allBlogArticles.map((article) => `/blog/${article.slug}`),
  ];

  return paths.map((path, index) => ({
    url: `${SITE_ORIGIN}${path}`,
    lastModified: contentUpdated,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : index < 3 ? 0.9 : 0.75,
  }));
}
