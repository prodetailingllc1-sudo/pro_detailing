import { notFound } from 'next/navigation';

import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';
import { siteFeatures } from '@/lib/site-config';
import { createPageMetadata } from '@/lib/metadata';

const service = additionalServices.find(
  (item) => item.slug === 'mobile-detailing',
)!;

export const metadata = createPageMetadata({
  title: 'Mobile Car Detailing Northern Virginia | PRO Detailing',
  description:
    'Request mobile interior and exterior detailing for a suitable home, office or fleet location in Northern Virginia. Access and availability are confirmed first.',
  path: '/our-services/mobile-detailing',
});

export default function MobileDetailingPage() {
  if (!siteFeatures.mobileDetailing) notFound();
  return <AdditionalServicePage service={service} />;
}
