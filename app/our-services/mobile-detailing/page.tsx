import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';
import { siteFeatures } from '@/lib/site-config';

const service = additionalServices.find(
  (item) => item.slug === 'mobile-detailing',
)!;

export const metadata: Metadata = {
  title: { absolute: 'Mobile Car Detailing Northern Virginia | PRO Detailing' },
  description: service.description,
  alternates: { canonical: '/our-services/mobile-detailing' },
};

export default function MobileDetailingPage() {
  if (!siteFeatures.mobileDetailing) notFound();
  return <AdditionalServicePage service={service} />;
}
